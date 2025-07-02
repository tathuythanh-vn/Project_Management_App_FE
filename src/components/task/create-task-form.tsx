'use client'

import React, {FormEvent, useState, useRef} from 'react';
import InputField from "@/components/form/input-field";
import SelectPriority from "@/components/select/select-priority";
import SelectStatus from '../select/select-status';
import {Button} from "@/components/ui/button";
import Modal from "@/components/popup/modal";
import {Priority, Project, Status} from "@/model/project";
import Message from "@/components/text/message";
import {toast} from "sonner";
import {ApiResponse} from "@/model/api-response";
import {createTask} from "@/service/task";
import {useRouter} from "next/navigation";
import SelectProjectMember from "@/components/select/select-project-member";
import { Upload, X, File, Image, Video, FileText, Paperclip } from 'lucide-react';

interface CreateTaskFormProps {
    onClose: () => void;
    onConfirm: () => void;
    projectId: string;
}

interface AssetFile {
    id: number;
    file: File;
    name: string;
    size: number;
    type: string;
    preview?: string;
}

const CreateTaskForm = ({onClose, onConfirm, projectId}: CreateTaskFormProps) => {
    const router = useRouter();

    const [modalIsShown, setModalIsShown] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [assets, setAssets] = useState<AssetFile[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const newAssets = Array.from(files).map(file => ({
            id: Date.now() + Math.random(),
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        }));
        setAssets(prev => [...prev, ...newAssets]);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const removeAsset = (id: number) => {
        setAssets(prev => {
            const asset = prev.find(a => a.id === id);
            if (asset && asset.preview) {
                URL.revokeObjectURL(asset.preview);
            }
            return prev.filter(a => a.id !== id);
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
        if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
        if (type.includes('pdf') || type.includes('document')) return <FileText className="w-4 h-4" />;
        return <File className="w-4 h-4" />;
    };

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try {
            const title = formData.get('title') as string;
            const startDate = new Date(formData.get('start_date') as string).toISOString() as string;
            const endDate = new Date(formData.get('end_date') as string).toISOString() as string;
            const description = formData.get('description') as string;
            const priority = formData.get('priority') as Priority;
            const status = formData.get('status') as Status;
            const assignee = formData.get('assignee') as string;

            const taskData = {
                title,
                startDate,
                endDate,
                description,
                priority: priority ? priority : 'low',
                status: status ? status : 'todo',
                projectId,
                assignee,
            };

            let response;

            if (assets.length > 0) {
                // Create new FormData for files and task data
                const submitFormData = new FormData();

                // Add files to FormData
                assets.forEach((asset) => {
                    submitFormData.append('files', asset.file);
                });

                // Call createTask with both task data and formData
                response = await createTask(taskData, submitFormData);
            } else {
                // No files, send as JSON
                response = await createTask(taskData);
            }

            const result: ApiResponse<Project> = await response.json();

            if (!response.ok) {
                setError(result.message || 'An unexpected error occurred')
                return
            }

            router.refresh();

            toast("Task has been created", {
                description: Intl.DateTimeFormat('en-US', {
                    dateStyle: "full",
                    timeStyle: "long",
                }).format(new Date()),
            })

            onClose();
            onConfirm();
        } catch (error) {
            setError('An unexpected error occurred')
        }
    }

    return (
        <>
            <Modal isOpened={modalIsShown} onClose={onClose} style={{width: '375px', maxWidth: '95%'}}>
                <p className='mb-4 text-lg'>Are you sure you want to cancel?</p>
                <div className='flex gap-2 justify-end align-center'>
                    <Button onClick={() => setModalIsShown(false)}
                            variant={'ghost'}
                            className='text-green-500 hover:text-green-700 border-0 cursor-pointer justify-start w-fit'>No
                    </Button>
                    <Button onClick={() => onClose()}
                            variant={'ghost'}
                            className='text-red-500 border-0 hover:text-red-700 cursor-pointer justify-start w-fit'>Yes
                    </Button>
                </div>
            </Modal>

            <form className='p-3' onSubmit={submitHandler}>
                <h2 className='font-bold mb-4 text-xl'>Create Task</h2>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 justify-between'>
                    <InputField name='title'>Task Title</InputField>
                    <InputField name='start_date' type='datetime-local'>Start Date</InputField>
                    <InputField name='end_date' type='datetime-local'>End Date</InputField>
                </div>
                <InputField name='description' type='textarea' placeholder='Describe about this task'>Task
                    Description</InputField>
                <div className='flex gap-2'>
                    <SelectPriority name='priority'/>
                    <SelectStatus name='status'/>
                    <SelectProjectMember projectId={projectId} name={'assignee'}/>
                </div>

                {/* Attachments Section */}
                <div className="mt-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Paperclip className="w-4 h-4 text-gray-600" />
                        <label className="text-sm font-medium text-gray-700">
                            Attachments ({assets.length} file{assets.length !== 1 ? 's' : ''})
                        </label>
                    </div>

                    {/* Drop Zone */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 ${
                            isDragOver
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                    >
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm mb-1">
                            Drag and drop files here, or{' '}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-blue-600 hover:text-blue-700 underline"
                            >
                                browse files
                            </button>
                        </p>
                        <p className="text-xs text-gray-500">
                            Support for images, documents, videos and more
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={(e) => handleFileSelect(e.target.files)}
                            className="hidden"
                        />
                    </div>

                    {/* Asset List */}
                    {assets.length > 0 && (
                        <div className="mt-3 space-y-2">
                            {assets.map((asset) => (
                                <div key={asset.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                                    {asset.preview ? (
                                        <img
                                            src={asset.preview}
                                            alt={asset.name}
                                            className="w-8 h-8 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                                            {getFileIcon(asset.type)}
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">{asset.name}</p>
                                        <p className="text-xs text-gray-500">{formatFileSize(asset.size)}</p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeAsset(asset.id)}
                                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all duration-200"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {error && <Message>{error}</Message>}
                <div className='mt-4 flex items-center justify-end gap-2'>
                    <Button type='submit' className='text-white bg-blue-600 hover:bg-blue-800'>Create</Button>
                    <Button type='button' className='text-blue-600 bg-blue-50 hover:bg-blue-200'
                            onClick={() => setModalIsShown(true)}>Cancel</Button>
                </div>
            </form>
        </>
    );
};

export default CreateTaskForm;