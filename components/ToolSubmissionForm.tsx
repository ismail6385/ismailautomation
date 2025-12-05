"use client";

import { useState } from 'react';
import { Plus, X, Send } from 'lucide-react';

interface ToolSubmissionFormProps {
    onSuccess?: () => void;
}

export default function ToolSubmissionForm({ onSuccess }: ToolSubmissionFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        url: '',
        pricing: 'Free',
        submittedBy: '',
        email: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Get existing tools
            const tools = JSON.parse(localStorage.getItem('tools') || '[]');

            // Add new tool with pending status
            const newTool = {
                id: Date.now().toString(),
                name: formData.name,
                description: formData.description,
                category: formData.category,
                url: formData.url,
                pricing: formData.pricing,
                status: 'pending',
                submittedBy: formData.submittedBy,
                submittedDate: new Date().toISOString().split('T')[0],
            };

            tools.push(newTool);
            localStorage.setItem('tools', JSON.stringify(tools));

            // Success!
            setIsSuccess(true);
            setFormData({
                name: '',
                description: '',
                category: '',
                url: '',
                pricing: 'Free',
                submittedBy: '',
                email: '',
            });

            setTimeout(() => {
                setIsSuccess(false);
                setIsOpen(false);
                if (onSuccess) onSuccess();
            }, 3000);
        } catch (err) {
            console.error('Error submitting tool:', err);
        }

        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 flex items-center gap-2"
            >
                <Plus className="w-5 h-5" />
                Submit a Tool
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-effect rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Submit an Automation Tool</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {isSuccess ? (
                            <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20">
                                <h3 className="text-green-400 font-bold text-lg mb-2">Submission Successful! 🎉</h3>
                                <p className="text-gray-300">
                                    Thank you for submitting! Your tool will be reviewed by our team.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-white font-semibold mb-2">Tool Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="e.g., Zapier"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="Brief description of the tool..."
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Category *</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                            placeholder="e.g., No-Code Automation"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Pricing *</label>
                                        <select
                                            name="pricing"
                                            value={formData.pricing}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        >
                                            <option value="Free">Free</option>
                                            <option value="Freemium">Freemium</option>
                                            <option value="Paid">Paid</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Website URL *</label>
                                    <input
                                        type="url"
                                        name="url"
                                        value={formData.url}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="https://example.com"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            name="submittedBy"
                                            value={formData.submittedBy}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Your Email *</label>
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

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <Send className="w-5 h-5" />
                                    {isSubmitting ? 'Submitting...' : 'Submit Tool'}
                                </button>

                                <p className="text-gray-400 text-sm text-center">
                                    Your submission will be reviewed before being published.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
