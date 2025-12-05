import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us - IsmailAutomation',
    description: 'Get in touch with us for questions, collaborations, or support.',
};

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Have a question or want to work together? We'd love to hear from you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <Mail className="h-6 w-6 text-primary mt-1 mr-4" />
                            <div>
                                <h3 className="font-medium text-gray-900">Email</h3>
                                <p className="text-gray-600">contact@ismailautomation.com</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <MapPin className="h-6 w-6 text-primary mt-1 mr-4" />
                            <div>
                                <h3 className="font-medium text-gray-900">Location</h3>
                                <p className="text-gray-600">Remote / Worldwide</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Looking for automation help?</h3>
                        <p className="text-gray-600 mb-4">
                            Check out our blog for the latest guides and tutorials before reaching out. You might find your answer there!
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors"
                                placeholder="How can we help?"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-medium py-3 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
