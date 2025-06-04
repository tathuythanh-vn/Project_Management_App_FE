import React from 'react';
import {SidebarTrigger} from "@/components/ui/sidebar";
import Header from "@/components/header/header";
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const InboxScreen = () => {
    return (
        <main className="w-full h-full p-4">
            <div className="flex items-center justify-start gap-4 w-full">
                <SidebarTrigger />
                <Header />
            </div>
            <section className="w-full text-[#646464]">
                <h1 className='p-4'>March</h1>
                <div className="grid grid-cols-1 w-full rounded-md overflow-hidden">
                    <div className="flex items-center justify-between bg-zinc-50 px-4 py-2 w-full">
                        <div className="flex items-center gap-4">
                            <Checkbox/>
                            <h2>Task name</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>Huy Thanh <span className='text-[#5C45D6]'>assigned this task to you</span></p>
                        </div>
                        <p>Apr 1</p>
                    </div>
                    <div className="flex items-center justify-between bg-zinc-50 px-4 py-2 w-full">
                        <div className="flex items-center gap-4">
                            <Checkbox/>
                            <h2>Task name</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>Huy Thanh</p>
                        </div>
                        <p>Apr 1</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default InboxScreen;
