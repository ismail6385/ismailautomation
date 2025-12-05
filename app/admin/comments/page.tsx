"use client";

import { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';

interface Comment {
    id: string;
    author: string;
    email: string;
    content: string;
    postTitle: string;
    postSlug: string;
    date: string;
    status: 'pending' | 'approved' | 'spam';
    likes: number;
}

export default function CommentsPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'spam'>('all');

    useEffect(() => {
        // Load comments from localStorage
        const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
        if (storedComments.length === 0) {
            // Sample data
            const sampleData: Comment[] = [
                {
                    id: '1',
                    author: 'John Doe',
                    email: 'john@example.com',
                    content: 'Great article! Very helpful for beginners.',
                    postTitle: 'AI Automation Guide',
                    postSlug: 'ai-automation-guide',
                    date: '2025-02-01',
                    status: 'pending',
                    likes: 5,
                },
                {
                    id: '2',
                    author: 'Jane Smith',
                    email: 'jane@example.com',
                    content: 'Thanks for sharing this tutorial. It helped me a lot!',
                    postTitle: 'Zapier Tutorial',
                    postSlug: 'zapier-tutorial',
                    date: '2025-02-02',
                    status: 'approved',
                    likes: 12,
                },
            ];
            setComments(sampleData);
            localStorage.setItem('comments', JSON.stringify(sampleData));
        } else {
            setComments(storedComments);
        }
    }, []);

    const handleStatusChange = (id: string, status: 'approved' | 'spam') => {
        const updated = comments.map(c => c.id === id ? { ...c, status } : c);
        setComments(updated);
        localStorage.setItem('comments', JSON.stringify(updated));
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            const updated = comments.filter(c => c.id !== id);
            setComments(updated);
            localStorage.setItem('comments', JSON.stringify(updated));
        }
    };

    const filteredComments = comments.filter(comment => {
        return filterStatus === 'all' || comment.status === filterStatus;
    });

    const pendingCount = comments.filter(c => c.status === 'pending').length;
    const approvedCount = comments.filter(c => c.status === 'approved').length;
    const spamCount = comments.filter(c => c.status === 'spam').length;

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Comments & Reviews</h1>
                <p className="text-gray-400">Manage user comments and feedback</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total Comments</p>
                    <p className="text-2xl font-bold text-white">{comments.length}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Pending</p>
                    <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Approved</p>
                    <p className="text-2xl font-bold text-green-400">{approvedCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Spam</p>
                    <p className="text-2xl font-bold text-red-400">{spamCount}</p>
                </div>
            </div>

            {/* Filter */}
            <div className="glass-effect rounded-2xl p-4 mb-6">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                >
                    <option value="all">All Comments</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="spam">Spam</option>
                </select>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {filteredComments.length === 0 ? (
                    <div className="glass-effect rounded-2xl p-12 text-center">
                        <p className="text-gray-400">No comments found.</p>
                    </div>
                ) : (
                    filteredComments.map((comment) => (
                        <div key={comment.id} className="glass-effect rounded-2xl p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            {comment.author.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">{comment.author}</h3>
                                            <p className="text-gray-400 text-sm">{comment.email}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-300 mb-3">{comment.content}</p>

                                    <div className="flex items-center gap-4 text-sm">
                                        <a
                                            href={`/blog/${comment.postSlug}`}
                                            target="_blank"
                                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            {comment.postTitle}
                                        </a>
                                        <span className="text-gray-500">{comment.date}</span>
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <ThumbsUp className="w-4 h-4" />
                                            {comment.likes}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${comment.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                            comment.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                            {comment.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    {comment.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusChange(comment.id, 'approved')}
                                                className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                                                title="Approve"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(comment.id, 'spam')}
                                                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                title="Mark as Spam"
                                            >
                                                <XCircle className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Moderation Tips */}
            <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">💡 Comment Moderation Tips</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• Review pending comments regularly</li>
                    <li>• Encourage constructive discussions</li>
                    <li>• Mark spam appropriately to train filters</li>
                    <li>• Respond to valuable comments to build community</li>
                    <li>• Set clear community guidelines</li>
                </ul>
            </div>
        </div>
    );
}
