"use client";

import { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, Trash2, CheckCheck } from 'lucide-react';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'info' | 'error';
    date: string;
    read: boolean;
    link?: string;
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('notifications') || '[]');
        if (stored.length === 0) {
            // Sample notifications
            const sampleData: Notification[] = [
                {
                    id: '1',
                    title: 'New tool submission',
                    message: 'A new automation tool "Zapier Clone" has been submitted for review.',
                    type: 'info',
                    date: new Date().toISOString(),
                    read: false,
                    link: '/admin/tools',
                },
                {
                    id: '2',
                    title: 'Comment pending approval',
                    message: '3 new comments are waiting for your approval.',
                    type: 'warning',
                    date: new Date(Date.now() - 3600000).toISOString(),
                    read: false,
                    link: '/admin/comments',
                },
                {
                    id: '3',
                    title: 'New subscriber',
                    message: '5 new people subscribed to your newsletter today!',
                    type: 'success',
                    date: new Date(Date.now() - 7200000).toISOString(),
                    read: true,
                    link: '/admin/newsletter',
                },
            ];
            setNotifications(sampleData);
            localStorage.setItem('notifications', JSON.stringify(sampleData));
        } else {
            setNotifications(stored);
        }
    }, []);

    const markAsRead = (id: string) => {
        const updated = notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        );
        setNotifications(updated);
        localStorage.setItem('notifications', JSON.stringify(updated));
    };

    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
        localStorage.setItem('notifications', JSON.stringify(updated));
    };

    const deleteNotification = (id: string) => {
        const updated = notifications.filter(n => n.id !== id);
        setNotifications(updated);
        localStorage.setItem('notifications', JSON.stringify(updated));
    };

    const clearAll = () => {
        if (confirm('Clear all notifications?')) {
            setNotifications([]);
            localStorage.setItem('notifications', JSON.stringify([]));
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (filterType === 'unread') return !n.read;
        if (filterType === 'read') return n.read;
        return true;
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'warning': return <AlertCircle className="w-5 h-5 text-amber-400" />;
            case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
            default: return <Info className="w-5 h-5 text-blue-400" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'success': return 'bg-green-500/20 border-green-500/30';
            case 'warning': return 'bg-amber-500/20 border-amber-500/30';
            case 'error': return 'bg-red-500/20 border-red-500/30';
            default: return 'bg-blue-500/20 border-blue-500/30';
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        return `${days} day${days > 1 ? 's' : ''} ago`;
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Notifications</h1>
                    <p className="text-gray-400">Stay updated with your admin activities</p>
                </div>
                <div className="flex gap-3">
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-semibold flex items-center gap-2"
                        >
                            <CheckCheck className="w-4 h-4" />
                            Mark all read
                        </button>
                    )}
                    <button
                        onClick={clearAll}
                        className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-semibold"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total</p>
                    <p className="text-2xl font-bold text-white">{notifications.length}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Unread</p>
                    <p className="text-2xl font-bold text-amber-400">{unreadCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Read</p>
                    <p className="text-2xl font-bold text-green-400">{notifications.length - unreadCount}</p>
                </div>
            </div>

            {/* Filter */}
            <div className="glass-effect rounded-2xl p-4 mb-6">
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                >
                    <option value="all">All Notifications</option>
                    <option value="unread">Unread Only</option>
                    <option value="read">Read Only</option>
                </select>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                    <div className="glass-effect rounded-2xl p-12 text-center">
                        <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No notifications to show</p>
                    </div>
                ) : (
                    filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`glass-effect rounded-xl p-4 border ${getTypeColor(notification.type)} ${!notification.read ? 'ring-2 ring-cyan-500/50' : ''
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                                    {getIcon(notification.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h3 className="text-white font-bold text-lg mb-1">
                                                {notification.title}
                                                {!notification.read && (
                                                    <span className="ml-2 w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                                                )}
                                            </h3>
                                            <p className="text-gray-300">{notification.message}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-red-400"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 mt-3">
                                        <span className="text-gray-500 text-sm">{formatTime(notification.date)}</span>

                                        {!notification.read && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                                            >
                                                Mark as read
                                            </button>
                                        )}

                                        {notification.link && (
                                            <a
                                                href={notification.link}
                                                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                                            >
                                                View →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Info */}
            <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">🔔 Notification Settings</h3>
                <p className="text-gray-300 mb-4">
                    Get notified about important events like new submissions, pending approvals, and system updates.
                </p>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        <span>New tool submissions</span>
                    </label>
                    <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        <span>Pending comments</span>
                    </label>
                    <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        <span>New subscribers</span>
                    </label>
                    <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        <span>Contact form submissions</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
