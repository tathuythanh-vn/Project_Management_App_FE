import {SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/sidebar/sidebar"
import RoleGuard from "@/components/auth/role-guard";
import {Role} from "@/model/auth";
import {ReactNode} from "react";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <RoleGuard roles={[Role.ADMIN, Role.MANAGER, Role.USER]}>
            <SidebarProvider>
                <AppSidebar/>
                <main className="w-full h-full">
                    <section className="p-8 bg-[#F0F6FF] min-h-screen">
                        {children}
                    </section>
                </main>
            </SidebarProvider>
        </RoleGuard>
    )
}
