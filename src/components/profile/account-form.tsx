'use client'

import React, {FormEvent, useEffect, useState} from 'react';
import InputField from "@/components/form/input-field";
import {Button} from "@/components/ui/button";
import {getUser, updateUser} from "@/service/user";
import {PublicUser} from "@/model/user";
import {Input} from "@/components/ui/input"
import {toast} from "sonner";
import {capitalize} from "@/utils/helper";

interface AccountFormProps {
    slug: string
}

const AccountForm = ({slug}: AccountFormProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [userData, setUserData] = useState<PublicUser | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEdit) {
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData(e.currentTarget);

            // Only append image if one was selected
            if (image) {
                formData.append('image', image);
            }

            // Rename fields as needed
            const fullName = formData.get('name') as string;
            formData.set('fullName', fullName);
            formData.delete('name');

            const response = await updateUser(slug, formData);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // Update local state with new data
            setUserData(data.data || {...userData, fullName});
            toast.success("Account has been updated.");
            setIsEdit(false);
            setImage(null);
            setImagePreview(null);
        } catch (e) {
            console.error(e instanceof Error ? e.message : 'An error occurred.');
            toast.error(e instanceof Error ? e.message : 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await getUser(slug);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setUserData(data.data);
        } catch (e) {
            console.error(e instanceof Error ? e.message : 'An error occurred.');
            toast.error('Failed to load user data.');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [slug]); // Remove isEdit dependency to avoid unnecessary refetches

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select a valid image file.');
                return;
            }

            // Validate file size (e.g., 5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size must be less than 5MB.');
                return;
            }

            setImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setImage(null);
        setImagePreview(null);
    };

    const getAvatarSrc = () => {
        if (imagePreview) return imagePreview;
        if (userData?.avatar) return `${process.env.NEXT_PUBLIC_FILE_URL}${userData.avatar}`;

        // Generate initials from user's full name
        if (userData?.fullName) {
            const initials = userData.fullName.slice(0, 1)

            // Create a data URL for SVG with initials
            const svg = `
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="#F5F5F5"/>
                <text x="100" y="140" font-family="Arial, sans-serif" font-size="100" 
                      fill="#555" text-anchor="middle" font-weight="bold">
                    ${initials}
                </text>
            </svg>
        `;

            return `data:image/svg+xml;base64,${btoa(svg)}`;
        }

        return '/default-avatar.png'; // Final fallback
    };

    if (!userData) {
        return (
            <div className="w-fit max-w-[800px] shadow-sm rounded-lg p-10 bg-white mx-auto mt-10">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                    <div className="flex gap-10">
                        <div className="w-56 h-56 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                            <div className="h-8 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                            <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form
            className="w-fit max-w-[800px] shadow-sm rounded-lg p-10 bg-white mx-auto mt-10"
            onSubmit={submitHandler}
        >
            <h3 className="font-semibold text-2xl mb-6">Account Information</h3>
            <div className="mt-4 gap-10 flex">
                <div className="flex flex-col items-center">
                    <img
                        src={getAvatarSrc()}
                        alt="User avatar"
                        className="w-56 h-56 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                            e.currentTarget.src = '/default-avatar.png';
                        }}
                    />
                    {isEdit && (
                        <div className="w-full flex flex-col gap-2 mt-4">
                            <label htmlFor="image" className="text-sm font-medium">
                                Profile Picture
                            </label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="cursor-pointer"
                            />
                            <p className="text-xs text-gray-500">
                                Max size: 5MB. Formats: JPG, PNG, GIF
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center justify-between flex-1">
                    {isEdit ? (
                        <div className="w-full">
                            <InputField
                                defaultValue={userData.email}
                                name="email"
                                disabled={true}
                            >
                                Email
                            </InputField>
                            <InputField
                                defaultValue={capitalize(userData.role || 'Unknown')}
                                name="role"
                                disabled={true}
                            >
                                Role
                            </InputField>
                            <InputField
                                defaultValue={userData.fullName}
                                name="name"
                                isFocused={true}
                                required
                            >
                                Full Name
                            </InputField>
                            <InputField
                                defaultValue={userData.phone}
                                name="phone"
                                required
                            >
                                Phone Number
                            </InputField>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div className="flex flex-col gap-2 mb-4 min-w-60">
                                <label className="font-medium text-gray-700">Email</label>
                                <span className="text-gray-600 text-lg">{userData.email}</span>
                            </div>
                            <div className="flex flex-col gap-2 mb-4 min-w-60">
                                <label className="font-medium text-gray-700">Role</label>
                                <span className="text-gray-600 text-lg">
                                    {capitalize(userData.role || 'Unknown')}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 mb-4 min-w-60">
                                <label className="font-medium text-gray-700">Full Name</label>
                                <span className="text-gray-600 text-lg">{userData.fullName}</span>
                            </div>
                            <div className="flex flex-col gap-2 mb-4 min-w-60">
                                <label className="font-medium text-gray-700">Phone Number</label>
                                <span className="text-gray-600 text-lg">{userData.phone}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-4 w-full mt-6">
                        <Button
                            variant="destructive"
                            type="button"
                            onClick={() => {
                                // Add logout logic here
                            }}
                        >
                            Logout
                        </Button>

                        {isEdit ? (
                            <>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleCancelEdit}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </Button>
                            </>
                        ) : (
                            <Button
                                type="button"
                                onClick={() => setIsEdit(true)}
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AccountForm;