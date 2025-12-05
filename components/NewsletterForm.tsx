"use client";

import { useState } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';

interface NewsletterFormProps {
    source?: string;
}

export default function NewsletterForm({ source = 'Footer' }: NewsletterFormProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Get existing subscribers
            const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');

            // Check if already subscribed
            const existingSubscriber = subscribers.find((s: any) => s.email === email);
            if (existingSubscriber) {
                setError('This email is already subscribed!');
                setIsSubmitting(false);
                return;
            }

            // Add new subscriber
            const newSubscriber = {
                id: Date.now().toString(),
                email,
                name: name || undefined,
                subscribedDate: new Date().toISOString().split('T')[0],
                status: 'active',
                source,
            };

            subscribers.push(newSubscriber);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));

            // Success!
            setIsSuccess(true);
            setEmail('');
            setName('');

            // Reset success message after 3 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }

        setIsSubmitting(false);
    };

    if (isSuccess) {
        return (
            <div className="glass-effect rounded-2xl p-6 border border-green-500/20">
                <div className="flex items-center gap-3 text-green-400">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                        <h3 className="font-bold text-lg">Successfully Subscribed! 🎉</h3>
                        <p className="text-sm text-gray-300">Check your inbox for confirmation.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                />
            </div>

            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email Address *"
                    required
                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                />
            </div>

            {error && (
                <div className="text-red-400 text-sm">{error}</div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 disabled:opacity-50"
            >
                {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
            </button>

            <p className="text-gray-400 text-xs text-center">
                We respect your privacy. Unsubscribe anytime.
            </p>
        </form>
    );
}
