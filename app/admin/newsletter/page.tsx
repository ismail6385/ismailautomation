"use client";

import { useState, useEffect } from 'react';
import { Mail, UserPlus, Download, Trash2, Search, Send } from 'lucide-react';

interface Subscriber {
    id: string;
    email: string;
    name?: string;
    subscribedDate: string;
    status: 'active' | 'unsubscribed';
    source: string;
}

export default function NewsletterPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'unsubscribed'>('all');

    useEffect(() => {
        // Load subscribers from localStorage
        const storedSubscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        if (storedSubscribers.length === 0) {
            // Add sample data
            const sampleData: Subscriber[] = [
                { id: '1', email: 'john@example.com', name: 'John Doe', subscribedDate: '2025-01-15', status: 'active', source: 'Blog Signup' },
                { id: '2', email: 'jane@example.com', name: 'Jane Smith', subscribedDate: '2025-01-20', status: 'active', source: 'Homepage' },
                { id: '3', email: 'bob@example.com', subscribedDate: '2025-02-01', status: 'active', source: 'Tools Page' },
            ];
            setSubscribers(sampleData);
            localStorage.setItem('subscribers', JSON.stringify(sampleData));
        } else {
            setSubscribers(storedSubscribers);
        }
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this subscriber?')) {
            const updated = subscribers.filter(s => s.id !== id);
            setSubscribers(updated);
            localStorage.setItem('subscribers', JSON.stringify(updated));
        }
    };

    const handleExport = () => {
        const csv = [
            ['Email', 'Name', 'Subscribed Date', 'Status', 'Source'],
            ...subscribers.map(s => [s.email, s.name || '', s.subscribedDate, s.status, s.source])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const filteredSubscribers = subscribers.filter(sub => {
        const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (sub.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
        const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const activeCount = subscribers.filter(s => s.status === 'active').length;
    const unsubscribedCount = subscribers.filter(s => s.status === 'unsubscribed').length;

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Newsletter & Subscribers</h1>
                    <p className="text-gray-400">Manage your email subscribers and campaigns</p>
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0">
                    <button
                        onClick={handleExport}
                        className="px-6 py-3 rounded-full font-bold glass-effect text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Export CSV
                    </button>
                    <button className="px-6 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Campaign
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-cyan-500/20">
                            <Mail className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="text-gray-400 font-semibold">Total Subscribers</h3>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                        {subscribers.length}
                    </p>
                </div>

                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-green-500/20">
                            <UserPlus className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="text-gray-400 font-semibold">Active</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-400">{activeCount}</p>
                </div>

                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-red-500/20">
                            <Mail className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-gray-400 font-semibold">Unsubscribed</h3>
                    </div>
                    <p className="text-3xl font-bold text-red-400">{unsubscribedCount}</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="glass-effect rounded-2xl p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search subscribers..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                    </select>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="glass-effect rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-4 text-gray-400 font-semibold">Email</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Name</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Source</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Date</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubscribers.map((subscriber) => (
                                <tr key={subscriber.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <span className="text-white font-semibold">{subscriber.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-300">{subscriber.name || '-'}</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                                            {subscriber.source}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400">{subscriber.subscribedDate}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${subscriber.status === 'active'
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {subscriber.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleDelete(subscriber.id)}
                                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredSubscribers.length === 0 && (
                <div className="glass-effect rounded-2xl p-12 text-center mt-6">
                    <p className="text-gray-400">No subscribers found.</p>
                </div>
            )}

            {/* Newsletter Tips */}
            <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">📧 Newsletter Best Practices</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• Send emails consistently (weekly or bi-weekly)</li>
                    <li>• Provide value in every email - tutorials, tips, exclusive content</li>
                    <li>• Use engaging subject lines to improve open rates</li>
                    <li>• Segment your audience for targeted campaigns</li>
                    <li>• Always include an unsubscribe option</li>
                </ul>
            </div>
        </div>
    );
}
