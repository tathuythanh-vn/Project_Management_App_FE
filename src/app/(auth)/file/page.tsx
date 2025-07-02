'use client'

import React, {useState, useCallback, useMemo} from 'react';
import {
    Upload,
    Search,
    Filter,
    Grid,
    List,
    MoreVertical,
    Download,
    Trash2,
    Eye,
    Share2,
    Folder,
    File,
    Image,
    FileText,
    Music,
    Video,
    Archive,
    Star,
    Clock,
    ChevronRight,
    Plus,
    X, Paperclip
} from 'lucide-react';
import useFetch from "@/hooks/use-fetch";
import {getAssets} from "@/service/asset";
import Modal from "@/components/popup/modal";
import {Asset} from "@/model/asset";
import {formatFileSize} from "@/utils/helper";

const FileLibraryScreen = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Files');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [starredFiles, setStarredFiles] = useState<Set<string>>(new Set());

    // Fixed: Get refetch function from useFetch hook
    const {dataFetched: assets, refetch} = useFetch<Asset>(getAssets, []);

    // State variables for upload
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Upload handler function
    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Using XMLHttpRequest to track upload progress
            const xhr = new XMLHttpRequest();

            // Progress tracking
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(progress);
                }
            });

            // Success handler
            xhr.addEventListener('load', () => {
                if (xhr.status === 201) {
                    const response = JSON.parse(xhr.responseText);
                    console.log('Upload successful:', response);

                    // Close modal and reset state
                    setShowUploadModal(false);
                    setSelectedFile(null);
                    setUploading(false);
                    setUploadProgress(0);

                    // Refetch data to update the list
                    if (refetch) {
                        refetch();
                    }

                    // Optional: Show success message
                    // toast.success('File uploaded successfully!');
                } else {
                    throw new Error('Upload failed');
                }
            });

            // Error handler
            xhr.addEventListener('error', () => {
                throw new Error('Upload failed');
            });

            // Send the request with credentials for authentication
            xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/asset`);
            // Add credentials header if needed
            xhr.withCredentials = true;
            xhr.send(formData);

        } catch (error) {
            console.error('Upload error:', error);
            setUploading(false);
            setUploadProgress(0);

            // Optional: Show error message
            // toast.error('Upload failed. Please try again.');
        }
    };

    // Helper function to format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    // Helper function to get file category from mimetype
    const getFileCategory = (mimetype: string): string => {
        if (mimetype.startsWith('image/')) return 'Images';
        if (mimetype.startsWith('video/')) return 'Videos';
        if (mimetype.startsWith('audio/')) return 'Audio';
        if (mimetype.includes('pdf') || mimetype.includes('document') || mimetype.includes('text')) return 'Documents';
        return 'Other';
    };

    // Helper function to get file icon based on mimetype
    const getFileIcon = (mimetype: string) => {
        if (mimetype.startsWith('image/')) {
            return <Image className="w-8 h-8 text-green-500"/>;
        }
        if (mimetype.startsWith('video/')) {
            return <Video className="w-8 h-8 text-purple-500"/>;
        }
        if (mimetype.startsWith('audio/')) {
            return <Music className="w-8 h-8 text-orange-500"/>;
        }
        if (mimetype.includes('pdf')) {
            return <FileText className="w-8 h-8 text-red-500"/>;
        }
        if (mimetype.includes('document') || mimetype.includes('text')) {
            return <FileText className="w-8 h-8 text-blue-600"/>;
        }
        return <File className="w-8 h-8 text-gray-500"/>;
    };

    // Process assets into displayable format
    const processedAssets = useMemo(() => {
        return assets.map(asset => ({
            ...asset,
            category: getFileCategory(asset.mimetype),
            formattedSize: formatFileSize(asset.size),
            formattedDate: formatDate(asset.createdAt),
            starred: starredFiles.has(asset._id)
        }));
    }, [assets, starredFiles]);

    // Calculate categories with counts
    const categories = useMemo(() => {
        const categoryCounts = processedAssets.reduce((acc, asset) => {
            acc[asset.category] = (acc[asset.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return [
            {name: 'All Files', count: processedAssets.length, icon: File},
            {name: 'Documents', count: categoryCounts['Documents'] || 0, icon: FileText},
            {name: 'Images', count: categoryCounts['Images'] || 0, icon: Image},
            {name: 'Videos', count: categoryCounts['Videos'] || 0, icon: Video},
            {name: 'Audio', count: categoryCounts['Audio'] || 0, icon: Music},
            {name: 'Other', count: categoryCounts['Other'] || 0, icon: Archive},
            {name: 'Starred', count: starredFiles.size, icon: Star}
        ];
    }, [processedAssets, starredFiles]);

    // Filter assets based on search and category
    const filteredAssets = useMemo(() => {
        return processedAssets.filter(asset => {
            const matchesSearch = asset.originalName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All Files' ||
                (selectedCategory === 'Starred' && asset.starred) ||
                asset.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [processedAssets, searchTerm, selectedCategory]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        // Handle file drop - take only the first file for single file upload
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            setSelectedFile(droppedFiles[0]);
            setShowUploadModal(true); // Open upload modal with the dropped file
        }
    }, []);

    const toggleStar = (assetId: string) => {
        setStarredFiles(prev => {
            const newSet = new Set(prev);
            if (newSet.has(assetId)) {
                newSet.delete(assetId);
            } else {
                newSet.add(assetId);
            }
            return newSet;
        });
    };

    const handleDownload = (asset: Asset) => {
        // Create download link
        const link = document.createElement('a');
        link.href = asset.url;
        link.download = asset.originalName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async (assetId: string) => {
        // Implement delete API call here
        console.log('Delete asset:', assetId);
        // After successful deletion, refetch the data
        // await deleteAsset(assetId);
        // if (refetch) refetch();
    };

    return (
        <div className="min-h-screen text-sm">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">File Library</h1>
                        <p className="text-gray-600 mt-1">Organize and manage your files</p>
                    </div>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Upload className="w-4 h-4"/>
                        Upload Files
                    </button>
                </div>
            </div>

            <div className="flex bg-white">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
                    <div className="p-4 text-stone-600 text-sm">
                        Content
                    </div>

                    <nav className="px-4 pb-4">
                        <div className="space-y-1">
                            {categories.map((category) => {
                                const IconComponent = category.icon;
                                return (
                                    <button
                                        key={category.name}
                                        onClick={() => setSelectedCategory(category.name)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors${
                                            selectedCategory === category.name
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <IconComponent className="w-5 h-5"/>
                                            <span className="font-medium text-sm">{category.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{category.count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Search and Controls */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search
                                        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                    <input
                                        type="text"
                                        placeholder="Search files..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                                    />
                                </div>
                                <button
                                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Filter className="w-4 h-4"/>
                                    Filter
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                                    >
                                        <Grid className="w-4 h-4"/>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                                    >
                                        <List className="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File Content */}
                    <div
                        className={`p-6 ${dragOver ? 'bg-blue-50' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {dragOver && (
                            <div className="border-2 border-dashed border-blue-400 rounded-lg p-12 text-center mb-6">
                                <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4"/>
                                <p className="text-lg font-medium text-blue-700">Drop files here to upload</p>
                                <p className="text-blue-600 mt-2">Support for multiple file types</p>
                            </div>
                        )}

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-gray-600">Library</span>
                            <ChevronRight className="w-4 h-4 text-gray-400"/>
                            <span className="text-gray-900 font-medium">{selectedCategory}</span>
                        </div>

                        {/* File Grid/List View */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredAssets.map((asset) => (
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_FILE_URL}${asset.url}`}
                                        target="_blank"
                                        key={asset._id}
                                        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow group"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-shrink-0">
                                                {getFileIcon(asset.mimetype)}
                                            </div>
                                            <div
                                                className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => toggleStar(asset._id)}
                                                    className={`p-1 rounded hover:bg-gray-100 transition-colors ${asset.starred ? 'text-yellow-500' : 'text-gray-400'}`}
                                                >
                                                    <Star className="w-4 h-4"
                                                          fill={asset.starred ? 'currentColor' : 'none'}/>
                                                </button>
                                                <div className="relative">
                                                    <button className="p-1 rounded hover:bg-gray-100">
                                                        <MoreVertical className="w-4 h-4 text-gray-400"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm"
                                            title={asset.originalName}>
                                            {asset.originalName}
                                        </h3>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{asset.formattedSize}</span>
                                            <span>{asset.formattedDate}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div
                                    className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                                    <div className="col-span-5">Name</div>
                                    <div className="col-span-2">Size</div>
                                    <div className="col-span-2">Modified</div>
                                    <div className="col-span-2">Type</div>
                                    <div className="col-span-1">Actions</div>
                                </div>

                                {filteredAssets.map((asset) => (
                                    <div key={asset._id}
                                         className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 group">
                                        <div className="col-span-5 flex items-center gap-3">
                                            {getFileIcon(asset.mimetype)}
                                            <div className="min-w-0 flex-1">
                                                <div className="font-medium text-gray-900 truncate"
                                                     title={asset.originalName}>
                                                    {asset.originalName}
                                                </div>
                                                {asset.starred && <Star className="w-3 h-3 text-yellow-500 mt-1"
                                                                        fill="currentColor"/>}
                                            </div>
                                        </div>
                                        <div
                                            className="col-span-2 flex items-center text-gray-600">{asset.formattedSize}</div>
                                        <div
                                            className="col-span-2 flex items-center text-gray-600">{asset.formattedDate}</div>
                                        <div className="col-span-2 flex items-center">
                                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                            {asset.category}
                                          </span>
                                        </div>
                                        <div
                                            className="col-span-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => window.open(asset.url, '_blank')}
                                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                title="Preview"
                                            >
                                                <Eye className="w-4 h-4"/>
                                            </button>
                                            <button
                                                onClick={() => handleDownload(asset)}
                                                className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                                title="Download"
                                            >
                                                <Download className="w-4 h-4"/>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(asset._id)}
                                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {filteredAssets.length === 0 && (
                            <div className="text-center py-12">
                                <File className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
                                <p className="text-gray-600">
                                    {searchTerm ? 'Try adjusting your search criteria' : 'Upload your first file to get started'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <Modal isOpened={showUploadModal} onClose={() => setShowUploadModal(false)} style={{width: '500px'}}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Upload File</h2>
                        <button
                            onClick={() => {
                                setShowUploadModal(false);
                                setSelectedFile(null);
                                setUploading(false);
                                setUploadProgress(0);
                            }}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                            <X className="w-5 h-5"/>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* File Input */}
                        <div>
                            <input
                                type="file"
                                id="file-upload"
                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        file:cursor-pointer cursor-pointer"
                            />
                        </div>

                        {/* File Preview */}
                        {selectedFile && (
                            <div className="p-3 bg-gray-50 rounded-lg border">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedFile(null)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Upload Progress */}
                        {uploading && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Uploading...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => {
                                setShowUploadModal(false);
                                setSelectedFile(null);
                                setUploading(false);
                                setUploadProgress(0);
                            }}
                            disabled={uploading}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || uploading}
                            className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                                selectedFile && !uploading
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {uploading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : (
                                'Upload File'
                            )}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FileLibraryScreen;