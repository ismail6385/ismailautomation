"use client";

import { useState, useEffect } from 'react';
import { Activity, User, FileText, CheckCircle, XCircle, Edit, Trash2, Clock } from 'lucide-react';

interface ActivityLog {
    id: string;
    action: string;
    user: string;
    type: 'create' | 'update' | 'delete' | 'approve' | 'reject';
    target: string;
    timestamp: string;
    details?: string;
}

export default function ActivityLogsPage() {
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [filterType, setFilterType] = useState<'all' | 'create' | 'update' | 'delete' | 'approve' | 'reject'>('all');

    useEffect(() => {
        // Load activity logs
        const stored = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        setLogs(stored.reverse()); // Most recent first
    }, []);

    const filteredLogs = logs.filter(log => filterType === 'all' || log.type === filterType);

    const getIcon = (type: string) => {
        switch (type) {
            case 'create': return <FileText className="w-5 h-5 text-green-400" />;
            case 'update': return <Edit className="w-5 h-5 text-blue-400" />;
            case 'delete': return <Trash2 className="w-5 h-5 text-red-400" />;
            case 'approve': return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'reject': return <XCircle className="w-5 h-5 text-red-400" />;
            default: return <Activity className="w-5 h-5 text-gray-400" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'create': return 'bg-green-500/20 text-green-400';
            case 'update': return 'bg-blue-500/20 text-blue-400';
            case 'delete': return 'bg-red-500/20 text-red-400';
            case 'approve': return 'bg-green-500/20 text-green-400';
            case 'reject': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
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

    const createCount = logs.filter(l => l.type === 'create').length;
    const updateCount = logs.filter(l => l.type === 'update').length;
    const deleteCount = logs.filter(l => l.type === 'delete').length;
    const approveCount = logs.filter(l => l.type === 'approve').length;

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Activity Logs</h1>
                <p className="text-gray-400">Track all admin actions and changes</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-5 gap-4 mb-6">
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total Activities</p>
                    <p className="text-2xl font-bold text-white">{logs.length}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Created</p>
                    <p className="text-2xl font-bold text-green-400">{createCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Updated</p>
                    <p className="text-2xl font-bold text-blue-400">{updateCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Deleted</p>
                    <p className="text-2xl font-bold text-red-400">{deleteCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Approved</p>
                    <p className="text-2xl font-bold text-green-400">{approveCount}</p>
                </div>
            </div>

            {/* Filter */}
            <div className="glass-effect rounded-2xl p-4 mb-6">
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                >
                    <option value="all">All Activities</option>
                    <option value="create">Created Items</option>
                    <option value="update">Updated Items</option>
                    <option value="delete">Deleted Items</option>
                    <option value="approve">Approved Items</option>
                    <option value="reject">Rejected Items</option>
                </select>
            </div>

            {/* Activity Timeline */}
            <div className="space-y-3">
                {filteredLogs.length === 0 ? (
                    <div className="glass-effect rounded-2xl p-12 text-center">
                        <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No activity logs yet. Start making changes!</p>
                    </div>
                ) : (
                    filteredLogs.map((log) => (
                        <div key={log.id} className="glass-effect rounded-xl p-4 hover-lift">
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-lg ${getTypeColor(log.type).split(' ')[0]}`}>
                                    {getIcon(log.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-white font-semibold">{log.action}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(log.type)}`}>
                                            {log.type}
                                        </span>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-2">{log.target}</p>

                                    {log.details && (
                                        <p className="text-gray-500 text-xs mb-2">{log.details}</p>
                                    )}

                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {log.user}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatTime(log.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Info */}
            <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">📊 Activity Tracking</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• All admin actions are automatically logged</li>
                    <li>• Logs include: create, update, delete, approve, reject</li>
                    <li>• Track who made changes and when</li>
                    <li>• Review activity history for auditing</li>
                    <li>• Logs are stored in localStorage</li>
                </ul>
            </div>
        </div>
    );
}
