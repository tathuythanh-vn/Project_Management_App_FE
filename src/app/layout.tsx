import type {Metadata} from "next";
import {Geist, Geist_Mono, Roboto, Nunito} from "next/font/google";
import "./globals.css";
import React, {ReactNode} from "react";
import AuthProvider from "@/context/auth-context";
import {Toaster} from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
})

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Plex | Project Management Tool",
    description: "Professional project management tool",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${nunito.variable} antialiased`}>
        <AuthProvider>
            {children}
            <Toaster/>
        </AuthProvider>
        </body>
        </html>
    );
}
