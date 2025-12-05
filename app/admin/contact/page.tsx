"use client";

import { useState, useEffect } from 'react';
import { Mail, Eye, Trash2, CheckCircle, Send, UserPlus } from 'lucide-react';

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: 'unread' | 'read' | 'replied';
}

export default function ContactPage() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read' | 'replied'>('all');

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        if (stored.length === 0) {
            // Sample data
            const sampleData: ContactSubmission[] = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    subject: 'Question about automation tools',
                    message: 'Hi, I would like to know more about no-code automation tools for beginners.',
                    date: '2025-02-01',
                    status: 'unread',
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    subject: 'Partnership inquiry',
                    message: 'Interested in collaborating on automation content.',
                    date: '2025-02-02',
                    status: 'read',
                },
            ];
            setSubmissions(sampleData);
            localStorage.setItem('contactSubmissions', JSON.stringify(sampleData));
        } else {
            setSubmissions(stored);
        }
    }, []);

    const handleStatusChange = (id: string, status: 'read' | 'replied') => {
        const updated = submissions.map(s => s.id === id ? { ...s, status } : s);
        setSubmissions(updated);
        localStorage.setItem('contactSubmissions', JSON.stringify(updated));
        if (selectedSubmission?.id === id) {
            setSelectedSubmission({ ...selectedSubmission, status });
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this submission?')) {
            const updated = submissions.filter(s => s.id !== id);
            setSubmissions(updated);
            localStorage.setItem('contactSubmissions', JSON.stringify(updated));
            if (selectedSubmission?.id === id) {
                setSelectedSubmission(null);
            }
        }
    };

    const handleView = (submission: ContactSubmission) => {
        setSelectedSubmission(submission);
        if (submission.status === 'unread') {
            handleStatusChange(submission.id, 'read');
        }
    };

    const filteredSubmissions = submissions.filter(s =>
        filterStatus === 'all' || s.status === filterStatus
    );

    const unreadCount = submissions.filter(s => s.status === 'unread').length;
    const readCount = submissions.filter(s => s.status === 'read').length;
    const repliedCount = submissions.filter(s => s.status === 'replied').length;

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Contact Submissions</h1>
                <p className="text-gray-400">Manage contact form submissions</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total Messages</p>
                    <p className="text-2xl font-bold text-white">{submissions.length}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Unread</p>
                    <p className="text-2xl font-bold text-amber-400">{unreadCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Read</p>
                    <p className="text-2xl font-bold text-blue-400">{readCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Replied</p>
                    <p className="text-2xl font-bold text-green-400">{repliedCount}</p>
                </div>
            </div>

            {/* Filter */}
            <div className="glass-effect rounded-2xl p-4 mb-6">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                >
                    <option value="all">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                </select>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Submissions List */}
                <div className="lg:col-span-1 space-y-3">
                    {filteredSubmissions.map((submission) => (
                        <div
                            key={submission.id}
                            onClick={() => handleView(submission)}
                            className={`glass-effect rounded-xl p-4 cursor-pointer hover-lift ${selectedSubmission?.id === submission.id ? 'ring-2 ring-cyan-500' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                        {submission.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-sm">{submission.name}</h3>
                                        <p className="text-gray-400 text-xs">{submission.email}</p>
                                    </div>
                                </div>
                                {submission.status === 'unread' && (
                                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                                )}
                            </div>

                            <p className="text-white text-sm font-semibold mb-1 truncate">{submission.subject}</p>
                            <p className="text-gray-400 text-xs truncate mb-2">{submission.message}</p>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 text-xs">{submission.date}</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${submission.status === 'unread' ? 'bg-amber-500/20 text-amber-400' :
                                        submission.status === 'read' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-green-500/20 text-green-400'
                                    }`}>
                                    {submission.status}
                                </span>
                            </div>
                        </div>
                    ))}

                    {filteredSubmissions.length === 0 && (
                        <div className="glass-effect rounded-xl p-8 text-center">
                            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-400">No submissions found</p>
                        </div>
                    )}
                </div>

                {/* Submission Details */}
                <div className="lg:col-span-2">
                    {selectedSubmission ? (
                        <div className="glass-effect rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                        {selectedSubmission.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{selectedSubmission.name}</h2>
                                        <p className="text-gray-400 text-sm">{selectedSubmission.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {selectedSubmission.status !== 'replied' && (
                                        <button
                                            onClick={() => handleStatusChange(selectedSubmission.id, 'replied')}
                                            className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-sm font-semibold flex items-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Mark Replied
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(selectedSubmission.id)}
                                        className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-semibold"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-gray-400 text-sm">Subject</label>
                                    <p className="text-white font-semibold text-lg">{selectedSubmission.subject}</p>
                                </div>

                                <div>
                                    <label className="text-gray-400 text-sm">Message</label>
                                    <div className="mt-2 p-4 rounded-lg bg-white/5">
                                        <p className="text-white whitespace-pre-wrap">{selectedSubmission.message}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-gray-400 text-sm">Date Received</label>
                                        <p className="text-white font-semibold">{selectedSubmission.date}</p>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-sm">Status</label>
                                        <p className={`font-semibold capitalize ${selectedSubmission.status === 'unread' ? 'text-amber-400' :
                                                selectedSubmission.status === 'read' ? 'text-blue-400' :
                                                    'text-green-400'
                                            }`}>
                                            {selectedSubmission.status}
                                        </p>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="pt-4 border-t border-white/10">
                                    <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
                                    <div className="flex gap-3">
                                        <a
                                            href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                                            className="flex-1 px-4 py-3 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-semibold text-center flex items-center justify-center gap-2"
                                        >
                                            <Send className="w-4 h-4" />
                                            Reply via Email
                                        </a>
                                        <button className="flex-1 px-4 py-3 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors font-semibold flex items-center justify-center gap-2">
                                            <UserPlus className="w-4 h-4" />
                                            Add to Subscribers
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-effect rounded-2xl p-12 text-center h-full flex items-center justify-center">
                            <div>
                                <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-400">Select a submission to view details</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">📧 Contact Management</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• Submissions are automatically saved from contact form</li>
                    <li>• Mark messages as read or replied</li>
                    <li>• Quick reply via email client</li>
                    <li>• Track conversation status</li>
                    <li>• Add contacts to newsletter subscribers</li>
                </ul>
            </div>
        </div>
    );
}
