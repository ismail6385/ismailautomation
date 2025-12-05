"use client";

import { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, User, Calendar } from 'lucide-react';

interface Comment {
    id: string;
    author: string;
    email: string;
    content: string;
    date: string;
    likes: number;
}

interface CommentListProps {
    postSlug: string;
}

export default function CommentList({ postSlug }: CommentListProps) {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        // Load approved comments for this post
        const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
        const postComments = allComments.filter(
            (c: any) => c.postSlug === postSlug && c.status === 'approved'
        );
        setComments(postComments);
    }, [postSlug]);

    const handleLike = (commentId: string) => {
        const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
        const updated = allComments.map((c: any) =>
            c.id === commentId ? { ...c, likes: c.likes + 1 } : c
        );
        localStorage.setItem('comments', JSON.stringify(updated));

        // Update local state
        setComments(comments.map(c =>
            c.id === commentId ? { ...c, likes: c.likes + 1 } : c
        ));
    };

    if (comments.length === 0) {
        return (
            <div className="glass-effect rounded-2xl p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">
                Comments ({comments.length})
            </h3>

            {comments.map((comment) => (
                <div key={comment.id} className="glass-effect rounded-2xl p-6 hover-lift">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-white font-bold">{comment.author}</h4>
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {comment.date}
                                </div>
                            </div>

                            <p className="text-gray-300 mb-3">{comment.content}</p>

                            <button
                                onClick={() => handleLike(comment.id)}
                                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                            >
                                <ThumbsUp className="w-4 h-4" />
                                <span>{comment.likes} Likes</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
