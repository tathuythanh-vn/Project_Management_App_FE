'use client'

import React, {useEffect, useState} from 'react';
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {PublicUser} from "@/model/user";
import Link from "next/link";

const UserCard = () => {
    const [userData, setUserData] = useState<PublicUser | undefined>(undefined);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me/full`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setUserData(data.user);
            } catch (error) {
                console.error(error instanceof Error ? error.message : 'Something went wrong. Please try again later.')
            }
        }
        fetchUser();
    }, [])

    return (
        <SidebarMenu className="w-[--radix-sidebar-width] h-full">
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="w-full">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={`${process.env.NEXT_PUBLIC_FILE_URL}${userData?.avatar}`}/>
                                    <AvatarFallback>{userData?.fullName.slice(0,1)}</AvatarFallback>
                                </Avatar>
                                <p>{userData?.fullName}</p>
                            </div>
                            <ChevronDown className="ml-auto"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                        <DropdownMenuItem className="cursor-pointer w-full">
                            <Link href={`/profile/${userData?._id}`}>User Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>View</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default UserCard;
