"use client";

import { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface CommentFormProps {
    postSlug: string;
    postTitle: string;
}

export default function CommentForm({ postSlug, postTitle }: CommentFormProps) {
    const [formData, setFormData] = useState({
        author: '',
        email: '',
        content: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Get existing comments
            const comments = JSON.parse(localStorage.getItem('comments') || '[]');

            // Add new comment
            const newComment = {
                id: Date.now().toString(),
                author: formData.author,
                email: formData.email,
                content: formData.content,
                postTitle,
                postSlug,
                date: new Date().toISOString().split('T')[0],
                status: 'pending',
                likes: 0,
            };

            comments.push(newComment);
            localStorage.setItem('comments', JSON.stringify(comments));

            // Success
            setIsSuccess(true);
            setFormData({ author: '', email: '', content: '' });

            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        } catch (err) {
            console.error('Error submitting comment:', err);
        }

        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="glass-effect rounded-2xl p-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Leave a Comment</h3>
            </div>

            {isSuccess ? (
                <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="text-green-400 font-bold mb-2">Comment Submitted! ✅</h4>
                    <p className="text-gray-300 text-sm">
                        Your comment has been submitted and is pending approval. Thank you!
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white font-semibold mb-2">Name *</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">Comment *</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none resize-none"
                            placeholder="Share your thoughts..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 flex items-center gap-2 disabled:opacity-50"
                    >
                        <Send className="w-5 h-5" />
                        {isSubmitting ? 'Submitting...' : 'Post Comment'}
                    </button>

                    <p className="text-gray-400 text-sm">
                        Your email will not be published. All fields are required.
                    </p>
                </form>
            )}
        </div>
    );
}
