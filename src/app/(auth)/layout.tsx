import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/sidebar/sidebar"
import RoleGuard from "@/components/auth/role-guard";
import {Role} from "@/model/auth";
import React, {ReactNode} from "react";
import Header from "@/components/header/header";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import BoxItem from "@/components/dashboard/box-item";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <RoleGuard roles={[Role.ADMIN, Role.MANAGER, Role.USER]}>
            <SidebarProvider>
                <AppSidebar/>
                <main className="w-full h-full bg-[#F0F6FF]">
                    <div className="flex items-center justify-start gap-1 w-full">
                        <SidebarTrigger className={'cursor-pointer transition-all z-50 bg-transparent duration-500 hover:scale-110'}/>
                        {/*Collapse*/}
                    </div>
                    <section className="w-full h-full py-4 px-10 min-h-screen">
                        {children}
                    </section>
                </main>
            </SidebarProvider>
        </RoleGuard>
    )
}
