'use client'

import React, {JSX, useState} from 'react';
import * as LucideIcons from 'lucide-react';
import { Asset } from "@/model/asset";
import { formatFileSize } from "@/utils/helper";

import {
    FileText,
    FileSpreadsheet,
    Presentation,
    Braces,
    Archive,
    Image,
    FileCode2,
    Video,
    Music,
    FileCode,
    Globe,
    File,
} from "lucide-react";
import {useRouter} from "next/navigation";

const mimeIconMap: Record<string, JSX.Element> = {
    "application/pdf": <FileText className="w-5 h-5 text-blue-500" />,
    "application/msword": <FileText className="w-5 h-5 text-blue-500" />,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <FileText className="w-5 h-5 text-blue-500" />,
    "application/vnd.ms-excel": <FileSpreadsheet className="w-5 h-5 text-green-500" />,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": <FileSpreadsheet className="w-5 h-5 text-green-500" />,
    "application/vnd.ms-powerpoint": <Presentation className="w-5 h-5 text-orange-500" />,
    "text/plain": <FileText className="w-5 h-5 text-gray-500" />,
    "text/csv": <FileSpreadsheet className="w-5 h-5 text-green-500" />,
    "application/json": <Braces className="w-5 h-5 text-purple-500" />,
    "application/zip": <Archive className="w-5 h-5 text-yellow-500" />,
    "application/x-zip-compressed": <Archive className="w-5 h-5 text-yellow-500" />,
    "image/jpeg": <Image className="w-5 h-5 text-pink-500" />,
    "image/png": <Image className="w-5 h-5 text-pink-500" />,
    "image/webp": <Image className="w-5 h-5 text-pink-500" />,
    "image/svg+xml": <FileCode2 className="w-5 h-5 text-indigo-500" />,
    "video/mp4": <Video className="w-5 h-5 text-red-500" />,
    "video/webm": <Video className="w-5 h-5 text-red-500" />,
    "audio/mpeg": <Music className="w-5 h-5 text-teal-500" />,
    "audio/wav": <Music className="w-5 h-5 text-teal-500" />,
    "application/javascript": <FileCode className="w-5 h-5 text-indigo-500" />,
    "text/html": <Globe className="w-5 h-5 text-indigo-500" />,
};

const FileIcon = ({ mimetype }: { mimetype: string }) => {
    return mimeIconMap[mimetype] ?? <File className="w-5 h-5 text-gray-400" />;
};

// Helper function to download a single file
const downloadFile = async (asset: Asset): Promise<void> => {
    const fileUrl = `${process.env.NEXT_PUBLIC_FILE_URL}${asset.url}`;

    const response = await fetch(fileUrl);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = asset.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
};

export const AssetCard = ({ asset }: { asset: Asset }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await downloadFile(asset);
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <a
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_FILE_URL}${asset.url}`}
            className="bg-white p-3 rounded-lg shadow flex items-center gap-3 w-full hover:bg-gray-50 transition">
            <FileIcon mimetype={asset.mimetype} />
            <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{asset.originalName}</p>
                <p className="text-xs text-gray-500">{formatFileSize(asset.size)}</p>
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleDownload()
                }}
                disabled={isDownloading}
                className="text-gray-500 cursor-pointer hover:text-blue-500 transition disabled:opacity-50"
                title="Download"
            >
                {isDownloading ? (
                    <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <LucideIcons.Download className="w-4 h-4" />
                )}
            </button>
        </a>
    );
};

interface AssetListProps {
    assets?: Asset[];
}

const AssetList = ({assets}: AssetListProps) => {
    const [isDownloadingAll, setIsDownloadingAll] = useState(false);

    console.log(assets)

    let content = (<p className={'text-stone-600 text-center py-2'}>No assets yet</p>)

    if (assets && assets?.length > 0) {
        content = (
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                {assets.map((asset) => (
                    <div key={asset._id} className="flex-shrink-0 w-43">
                        <AssetCard asset={asset} />
                    </div>
                ))}
            </div>)
    }


    const handleDownloadAll = async () => {
        if (!assets || assets.length === 0) return;

        setIsDownloadingAll(true);
        try {
            // Download files sequentially with a small delay to prevent overwhelming the server
            for (let i = 0; i < assets.length; i++) {
                await downloadFile(assets[i]);

                // Add a small delay between downloads (except for the last file)
                if (i < assets.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        } catch (error) {
            console.error('Download all failed:', error);
        } finally {
            setIsDownloadingAll(false);
        }
    };

    return (
        <div className=" py-4 border-b-2 border-[#DEE1E6]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <LucideIcons.Paperclip className="w-4 h-4"/>
                    <span>Attachment ({assets?.length || 0})</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDownloadAll}
                        disabled={isDownloadingAll}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDownloadingAll ? (
                            <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <LucideIcons.Download className="w-4 h-4"/>
                        )}
                        {isDownloadingAll ? 'Downloading...' : 'Download All'}
                    </button>
                </div>
            </div>
            {content}
        </div>
    );
};

export default AssetList;