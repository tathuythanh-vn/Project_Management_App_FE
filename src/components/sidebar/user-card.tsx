import React from 'react';
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const UserCard = () => {
    return (
        <SidebarMenu className="w-[--radix-sidebar-width] h-full">
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png"/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p>Huy Thanh</p>
                            </div>
                            <ChevronDown className="ml-auto"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                        <DropdownMenuItem>
                            <span>User Profile</span>
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
