'use client'

import React, { useState, useCallback, useMemo } from 'react';
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
    X
} from 'lucide-react';

// Asset interface based on your API structure
interface Asset {
    _id: string;
    filename: string;
    originalName: string;
    mimetype: string;
    url: string;
    size: number;
    uploadedBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface FileLibraryScreenProps {
    assets: Asset[];
    refetch: () => void;
}

const FileLibraryScreen = ({ assets = [], refetch }: FileLibraryScreenProps) => {
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Files');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [starredFiles, setStarredFiles] = useState<Set<string>>(new Set());

    // Helper function to format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            return <Image className="w-8 h-8 text-green-500" />;
        }
        if (mimetype.startsWith('video/')) {
            return <Video className="w-8 h-8 text-purple-500" />;
        }
        if (mimetype.startsWith('audio/')) {
            return <Music className="w-8 h-8 text-orange-500" />;
        }
        if (mimetype.includes('pdf')) {
            return <FileText className="w-8 h-8 text-red-500" />;
        }
        if (mimetype.includes('document') || mimetype.includes('text')) {
            return <FileText className="w-8 h-8 text-blue-600" />;
        }
        return <File className="w-8 h-8 text-gray-500" />;
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
            { name: 'All Files', count: processedAssets.length, icon: File },
            { name: 'Documents', count: categoryCounts['Documents'] || 0, icon: FileText },
            { name: 'Images', count: categoryCounts['Images'] || 0, icon: Image },
            { name: 'Videos', count: categoryCounts['Videos'] || 0, icon: Video },
            { name: 'Audio', count: categoryCounts['Audio'] || 0, icon: Music },
            { name: 'Other', count: categoryCounts['Other'] || 0, icon: Archive },
            { name: 'Starred', count: starredFiles.size, icon: Star }
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
        // Handle file drop logic here
        console.log('Files dropped:', e.dataTransfer.files);
        // You can implement upload logic here
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
        // refetch();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">File Library</h1>
                        <p className="text-gray-600 mt-1">Organize and manage your files</p>
                    </div>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Upload className="w-4 h-4" />
                        Upload Files
                    </button>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
                    <div className="p-4">
                        <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors">
                            <Plus className="w-5 h-5" />
                            New Folder
                        </button>
                    </div>

                    <nav className="px-4 pb-4">
                        <div className="space-y-1">
                            {categories.map((category) => {
                                const IconComponent = category.icon;
                                return (
                                    <button
                                        key={category.name}
                                        onClick={() => setSelectedCategory(category.name)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                                            selectedCategory === category.name
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <IconComponent className="w-5 h-5" />
                                            <span className="font-medium">{category.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{category.count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>

                    <div className="px-4 mt-8">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Quick Access
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">Recent</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm">Shared</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Search and Controls */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search files..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                                    >
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                                    >
                                        <List className="w-4 h-4" />
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
                                <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                                <p className="text-lg font-medium text-blue-700">Drop files here to upload</p>
                                <p className="text-blue-600 mt-2">Support for multiple file types</p>
                            </div>
                        )}

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-gray-600">Library</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 font-medium">{selectedCategory}</span>
                        </div>

                        {/* File Grid/List View */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                                {filteredAssets.map((asset) => (
                                    <div
                                        key={asset._id}
                                        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow group"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-shrink-0">
                                                {getFileIcon(asset.mimetype)}
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => toggleStar(asset._id)}
                                                    className={`p-1 rounded hover:bg-gray-100 transition-colors ${asset.starred ? 'text-yellow-500' : 'text-gray-400'}`}
                                                >
                                                    <Star className="w-4 h-4" fill={asset.starred ? 'currentColor' : 'none'} />
                                                </button>
                                                <div className="relative">
                                                    <button className="p-1 rounded hover:bg-gray-100">
                                                        <MoreVertical className="w-4 h-4 text-gray-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm" title={asset.originalName}>
                                            {asset.originalName}
                                        </h3>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{asset.formattedSize}</span>
                                            <span>{asset.formattedDate}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                                    <div className="col-span-5">Name</div>
                                    <div className="col-span-2">Size</div>
                                    <div className="col-span-2">Modified</div>
                                    <div className="col-span-2">Type</div>
                                    <div className="col-span-1">Actions</div>
                                </div>

                                {filteredAssets.map((asset) => (
                                    <div key={asset._id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 group">
                                        <div className="col-span-5 flex items-center gap-3">
                                            {getFileIcon(asset.mimetype)}
                                            <div className="min-w-0 flex-1">
                                                <div className="font-medium text-gray-900 truncate" title={asset.originalName}>
                                                    {asset.originalName}
                                                </div>
                                                {asset.starred && <Star className="w-3 h-3 text-yellow-500 mt-1" fill="currentColor" />}
                                            </div>
                                        </div>
                                        <div className="col-span-2 flex items-center text-gray-600">{asset.formattedSize}</div>
                                        <div className="col-span-2 flex items-center text-gray-600">{asset.formattedDate}</div>
                                        <div className="col-span-2 flex items-center">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {asset.category}
                      </span>
                                        </div>
                                        <div className="col-span-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => window.open(asset.url, '_blank')}
                                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                title="Preview"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDownload(asset)}
                                                className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                                title="Download"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(asset._id)}
                                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {filteredAssets.length === 0 && (
                            <div className="text-center py-12">
                                <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Upload Files</h2>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">Drag and drop files here, or</p>
                            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                browse files
                            </button>
                        </div>

                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Implement upload logic here
                                    setShowUploadModal(false);
                                    // After successful upload, refetch the data
                                    // refetch();
                                }}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileLibraryScreen;