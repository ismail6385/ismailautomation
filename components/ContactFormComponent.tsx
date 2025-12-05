"use client";

import { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactFormComponent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Get existing submissions
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');

            // Add new submission
            const newSubmission = {
                id: Date.now().toString(),
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                date: new Date().toISOString().split('T')[0],
                status: 'unread',
            };

            submissions.push(newSubmission);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

            // Log activity
            const activityLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
            activityLogs.push({
                id: Date.now().toString(),
                action: 'New contact form submission',
                user: formData.name,
                type: 'create',
                target: `Contact: ${formData.subject}`,
                timestamp: new Date().toISOString(),
                details: `${formData.name} (${formData.email}) submitted a contact form`,
            });
            localStorage.setItem('activityLogs', JSON.stringify(activityLogs));

            // Success
            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        } catch (err) {
            console.error('Error submitting contact form:', err);
        }

        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (isSuccess) {
        return (
            <div className="glass-effect rounded-2xl p-8 border border-green-500/20">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent! ✅</h3>
                    <p className="text-gray-300 mb-4">
                        Thank you for reaching out! We'll get back to you as soon as possible.
                    </p>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="px-6 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-semibold"
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-effect rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-cyan-500/20">
                    <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                    <p className="text-gray-400">We'll respond within 24 hours</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            <User className="w-4 h-4 inline mr-2" />
                            Your Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">
                            <Mail className="w-4 h-4 inline mr-2" />
                            Email Address *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-white font-semibold mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Subject *
                    </label>
                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                    >
                        <option value="">Select a subject...</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Tool Submission">Tool Submission</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-white font-semibold mb-2">
                        Message *
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none resize-none"
                        placeholder="Tell us how we can help you..."
                    />
                    <p className="text-gray-400 text-sm mt-2">
                        {formData.message.length} / 500 characters
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-gray-400 text-sm text-center">
                    We respect your privacy. Your information will never be shared.
                </p>
            </form>
        </div>
    );
}
