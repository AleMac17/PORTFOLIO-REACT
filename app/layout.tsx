import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Menu } from '@/components/Menu';
import ScrollTracker from '@/components/ScrollTracker'
import CustomCursor from "@/components/CustomCursor";
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Alejandro Maciá',
    description: 'Alejandro Maciá Portfolio',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
            >
                <CustomCursor />
                <header className="px-4 flex w-full justify-between items-center pt-6">
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-300 hover:text-white transition-colors">
                        Alejandro Maciá
                    </h1>
                    <Menu />
                <ScrollTracker />
                </header>
                {children}
            </body>
        </html>
    );
}
