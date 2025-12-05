import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'IsmailAutomation - Master AI Automation & Workflows',
    description: 'Learn AI automation, Zapier, Make, and productivity tools with easy beginner guides and tutorials.',
    keywords: ['AI Automation', 'Zapier', 'Make', 'Productivity', 'Tutorials', 'Beginner Guides'],
    authors: [{ name: 'IsmailAutomation' }],
    openGraph: {
        title: 'IsmailAutomation - Master AI Automation & Workflows',
        description: 'Your go-to resource for learning AI automation and productivity tools.',
        type: 'website',
        locale: 'en_US',
        siteName: 'IsmailAutomation',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
