'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link";
import LogoutButton from "@/components/dashboard/logout-btn";
import {notFound, usePathname} from "next/navigation";
import {CheckSquare, FolderKanban, Home, Inbox, Target, Users} from "lucide-react";
import UserCard from "@/components/sidebar/user-card";
import {cn} from "@/lib/utils";
import {useAuth} from "@/context/auth-context";
import React from "react";

const items = {
    user: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "Project",
            url: "/project",
            icon: FolderKanban,
        },
        {
            title: "Task",
            url: "/task",
            icon: CheckSquare,
        },
        {
            title: "Inbox",
            url: "/inbox",
            icon: Inbox,
        },
    ],
    manager: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "Team Management",
            url: "/team",
            icon: Users,
        },
        {
            title: "Project",
            url: "/project",
            icon: FolderKanban,
        },
        {
            title: "Task",
            url: "/task",
            icon: CheckSquare,
        },
        {
            title: "Inbox",
            url: "/inbox",
            icon: Inbox,
        },
        {
            title: "Goal",
            url: "/goal",
            icon: Target,
        },
    ],
    admin: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "User Management",
            url: "/users",
            icon: Users,
        },
        {
            title: "Inbox",
            url: "/inbox",
            icon: Inbox,
        },
    ]
};

export function AppSidebar() {
    const pathname = usePathname();
    const {user} = useAuth();
    const currentUser = user!.userRole

    if (!user) {
        notFound();
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <UserCard/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className={'flex items-center justify-between'}>
                        Application
                        {/*<SidebarTrigger className={'cursor-pointer transition-all z-50 bg-transparent duration-500 hover:scale-110'}/>*/}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items[currentUser].map((item) => {
                                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={cn(
                                                isActive && "bg-gray-100 text-primary"
                                            )}
                                        >
                                            <Link href={item.url}>
                                                <item.icon className={cn(
                                                    isActive && "text-primary"
                                                )}/>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <LogoutButton/>
            </SidebarFooter>
        </Sidebar>
    )
}