"use client";

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Clock, Calendar, Globe, Download } from 'lucide-react';

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState({
        totalViews: 0,
        uniqueVisitors: 0,
        avgTimeOnSite: '0:00',
        bounceRate: '0%',
        topPages: [] as any[],
        trafficSources: [] as any[],
        recentActivity: [] as any[],
    });

    useEffect(() => {
        // Simulate analytics data (in production, fetch from analytics service)
        setAnalytics({
            totalViews: 12547,
            uniqueVisitors: 8932,
            avgTimeOnSite: '3:24',
            bounceRate: '42%',
            topPages: [
                { path: '/blog/ai-automation-guide', views: 2340, title: 'AI Automation Guide' },
                { path: '/tools', views: 1890, title: 'Tools Directory' },
                { path: '/blog/zapier-tutorial', views: 1567, title: 'Zapier Tutorial' },
                { path: '/', views: 1234, title: 'Home' },
                { path: '/contact', views: 890, title: 'Contact' },
            ],
            trafficSources: [
                { source: 'Google Search', visitors: 5234, percentage: 58.6 },
                { source: 'Direct', visitors: 1786, percentage: 20.0 },
                { source: 'Social Media', visitors: 1250, percentage: 14.0 },
                { source: 'Referral', visitors: 662, percentage: 7.4 },
            ],
            recentActivity: [
                { action: 'New blog published', time: '2 hours ago', user: 'Admin' },
                { action: 'Tool approved', time: '5 hours ago', user: 'Admin' },
                { action: 'Comment posted', time: '1 day ago', user: 'John Doe' },
                { action: 'New subscriber', time: '2 days ago', user: 'jane@example.com' },
            ],
        });
    }, []);

    const statCards = [
        {
            title: 'Total Views',
            value: analytics.totalViews.toLocaleString(),
            icon: Eye,
            color: 'from-cyan-500 to-blue-500',
            bgColor: 'bg-cyan-500/10',
            change: '+12.5%',
        },
        {
            title: 'Unique Visitors',
            value: analytics.uniqueVisitors.toLocaleString(),
            icon: Users,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-500/10',
            change: '+8.3%',
        },
        {
            title: 'Avg. Time on Site',
            value: analytics.avgTimeOnSite,
            icon: Clock,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-500/10',
            change: '+5.2%',
        },
        {
            title: 'Bounce Rate',
            value: analytics.bounceRate,
            icon: TrendingUp,
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-500/10',
            change: '-3.1%',
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Analytics & Reports</h1>
                    <p className="text-gray-400">Track your website performance and insights</p>
                </div>
                <button className="mt-4 sm:mt-0 px-6 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Export Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    const isPositive = stat.change.startsWith('+');

                    return (
                        <div
                            key={index}
                            className="glass-effect rounded-2xl p-6 hover-lift cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                {stat.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Top Pages */}
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-cyan-500/20">
                            <BarChart3 className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Top Pages</h2>
                    </div>

                    <div className="space-y-4">
                        {analytics.topPages.map((page, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-semibold truncate">{page.title}</p>
                                    <p className="text-gray-400 text-sm truncate">{page.path}</p>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="text-cyan-400 font-bold">{page.views.toLocaleString()}</p>
                                    <p className="text-gray-500 text-xs">views</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                            <Globe className="w-5 h-5 text-purple-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Traffic Sources</h2>
                    </div>

                    <div className="space-y-4">
                        {analytics.trafficSources.map((source, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-semibold">{source.source}</span>
                                    <span className="text-gray-400 text-sm">{source.visitors.toLocaleString()} visitors</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-500"
                                        style={{ width: `${source.percentage}%` }}
                                    />
                                </div>
                                <div className="text-right mt-1">
                                    <span className="text-cyan-400 text-xs font-semibold">{source.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-green-500/20">
                        <Calendar className="w-5 h-5 text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                </div>

                <div className="space-y-3">
                    {analytics.recentActivity.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                            <div className="flex-1">
                                <p className="text-white font-semibold">{activity.action}</p>
                                <p className="text-gray-400 text-sm">{activity.user}</p>
                            </div>
                            <span className="text-gray-500 text-sm">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Integration Tips */}
            <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">💡 Analytics Integration</h3>
                <p className="text-gray-300 mb-4">
                    Connect Google Analytics or other analytics services for real-time data.
                </p>
                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-semibold">
                        Connect Google Analytics
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors font-semibold">
                        Setup Tracking
                    </button>
                </div>
            </div>
        </div>
    );
}
