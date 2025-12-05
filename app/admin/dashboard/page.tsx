"use client";

import { useState, useEffect } from 'react';
import { FileText, Wrench, Users, TrendingUp, Eye, Clock, Settings } from 'lucide-react';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalBlogs: 0,
        totalTools: 0,
        totalUsers: 0,
        views: 0,
    });
    const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
    const [recentTools, setRecentTools] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Load stats from localStorage
        const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        const tools = JSON.parse(localStorage.getItem('tools') || '[]');

        setStats({
            totalBlogs: blogs.length,
            totalTools: tools.length,
            totalUsers: 0, // Placeholder
            views: 0, // Placeholder
        });
        setRecentBlogs(blogs);
        setRecentTools(tools);
    }, []);

    const statCards = [
        {
            title: 'Total Blogs',
            value: stats.totalBlogs,
            icon: FileText,
            color: 'from-cyan-500 to-blue-500',
            bgColor: 'bg-cyan-500/10',
        },
        {
            title: 'Total Tools',
            value: stats.totalTools,
            icon: Wrench,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-500/10',
        },
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: Users,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-500/10',
        },
        {
            title: 'Total Views',
            value: stats.views,
            icon: Eye,
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-500/10',
        },
    ];

    if (!isMounted) {
        return null; // or loading skeleton
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome back! Here's what's happening.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="glass-effect rounded-2xl p-6 hover-lift cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <TrendingUp className="w-5 h-5 text-green-400" />
                            </div>
                            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                {stat.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Blogs */}
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Blogs</h2>
                        <a href="/admin/blogs" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">
                            View All →
                        </a>
                    </div>
                    <div className="space-y-4">
                        {recentBlogs.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">
                                No blogs yet. Create your first one! 📝
                            </p>
                        ) : (
                            recentBlogs.slice(0, 5).map((blog: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="p-2 rounded-lg bg-cyan-500/20">
                                        <FileText className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-semibold truncate">{blog.title}</h3>
                                        <p className="text-gray-400 text-sm truncate">{blog.description}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock className="w-3 h-3 text-gray-500" />
                                            <span className="text-gray-500 text-xs">{blog.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Tools */}
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Tools</h2>
                        <a href="/admin/tools" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">
                            View All →
                        </a>
                    </div>
                    <div className="space-y-4">
                        {recentTools.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">
                                No tools yet. Add your first one! 🛠️
                            </p>
                        ) : (
                            recentTools.slice(0, 5).map((tool: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="p-2 rounded-lg bg-purple-500/20">
                                        <Wrench className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-semibold truncate">{tool.name}</h3>
                                        <p className="text-gray-400 text-sm truncate">{tool.description}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">
                                                {tool.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 glass-effect rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <a
                        href="/admin/blogs"
                        className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors group"
                    >
                        <FileText className="w-8 h-8 text-cyan-400 mb-3" />
                        <h3 className="text-white font-semibold mb-1">Create Blog</h3>
                        <p className="text-gray-400 text-sm">Write a new blog post</p>
                    </a>
                    <a
                        href="/admin/tools"
                        className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors group"
                    >
                        <Wrench className="w-8 h-8 text-purple-400 mb-3" />
                        <h3 className="text-white font-semibold mb-1">Add Tool</h3>
                        <p className="text-gray-400 text-sm">Add a new automation tool</p>
                    </a>
                    <a
                        href="/admin/settings"
                        className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors group"
                    >
                        <Settings className="w-8 h-8 text-green-400 mb-3" />
                        <h3 className="text-white font-semibold mb-1">Settings</h3>
                        <p className="text-gray-400 text-sm">Configure your site</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
