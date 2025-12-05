"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Wrench,
    Users,
    Settings,
    Menu,
    X,
    LogOut,
    BarChart3,
    MessageSquare,
    Mail,
    Image,
    Database,
    Activity,
    Inbox,
    Bell,
    Shield,
    MailOpen,
    Globe,
    Bot,
    ArrowRightLeft,
    Link2,
    File,
    Palette,
    List
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/blogs', icon: FileText, label: 'Blogs' },
        { href: '/admin/pages', icon: File, label: 'Pages' },
        { href: '/admin/tools', icon: Wrench, label: 'Tools' },
        { href: '/admin/media', icon: Image, label: 'Media' },
        { href: '/admin/menus', icon: List, label: 'Menus' },
        { href: '/admin/appearance', icon: Palette, label: 'Appearance' },
        { href: '/admin/comments', icon: MessageSquare, label: 'Comments' },
        { href: '/admin/newsletter', icon: Mail, label: 'Newsletter' },
        { href: '/admin/contact', icon: Inbox, label: 'Contact' },
        { href: '/admin/sitemap', icon: Globe, label: 'Sitemap' },
        { href: '/admin/robots', icon: Bot, label: 'Robots.txt' },
        { href: '/admin/redirects', icon: ArrowRightLeft, label: 'Redirects' },
        { href: '/admin/integrations', icon: Link2, label: 'Integrations' },
        { href: '/admin/notifications', icon: Bell, label: 'Notifications' },
        { href: '/admin/activity', icon: Activity, label: 'Activity' },
        { href: '/admin/health', icon: Shield, label: 'Health' },
        { href: '/admin/backup', icon: Database, label: 'Backup' },
        { href: '/admin/email-templates', icon: MailOpen, label: 'Email Templates' },
        { href: '/admin/users', icon: Users, label: 'Users' },
        { href: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === href;
        }
        return pathname?.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass-effect text-white"
            >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen w-64 glass-effect border-r border-white/10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Admin Panel
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">IsmailAutomation</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active
                                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-semibold">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-white/10">
                        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full">
                            <LogOut className="w-5 h-5" />
                            <span className="font-semibold">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="lg:ml-64 min-h-screen">
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
