"use client";

import { useState } from 'react';
import { Save, Globe, Lock, Mail, Image, Code } from 'lucide-react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        // General Settings
        siteName: 'IsmailAutomation',
        siteDescription: 'Learn AI Automation - Beginner-Friendly Guides & Tools',
        siteUrl: 'https://ismailautomation.com',
        adminEmail: 'admin@ismailautomation.com',

        // SEO Settings
        metaKeywords: 'AI automation, no-code automation, beginner guides',
        googleAnalyticsId: '',
        googleSearchConsoleId: '',

        // Social Media
        facebookUrl: '',
        twitterUrl: '',
        linkedinUrl: '',
        githubUrl: '',

        // Features
        enableComments: true,
        enableNewsletter: true,
        enableToolSubmissions: true,
        moderateTools: true,
    });

    const handleSave = () => {
        localStorage.setItem('siteSettings', JSON.stringify(settings));
        alert('Settings saved successfully! ✅');
    };

    const handleChange = (field: string, value: any) => {
        setSettings({ ...settings, [field]: value });
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-gray-400">Configure your website settings</p>
                </div>
                <button
                    onClick={handleSave}
                    className="mt-4 sm:mt-0 px-6 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    Save Changes
                </button>
            </div>

            <div className="space-y-6">
                {/* General Settings */}
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-cyan-500/20">
                            <Globe className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">General Settings</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-white font-semibold mb-2">Site Name</label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => handleChange('siteName', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Admin Email</label>
                            <input
                                type="email"
                                value={settings.adminEmail}
                                onChange={(e) => handleChange('adminEmail', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-white font-semibold mb-2">Site Description</label>
                            <textarea
                                value={settings.siteDescription}
                                onChange={(e) => handleChange('siteDescription', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                rows={3}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-white font-semibold mb-2">Site URL</label>
                            <input
                                type="url"
                                value={settings.siteUrl}
                                onChange={(e) => handleChange('siteUrl', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                            <Code className="w-5 h-5 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">SEO & Analytics</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-white font-semibold mb-2">Meta Keywords</label>
                            <input
                                type="text"
                                value={settings.metaKeywords}
                                onChange={(e) => handleChange('metaKeywords', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="keyword1, keyword2, keyword3"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white font-semibold mb-2">Google Analytics ID</label>
                                <input
                                    type="text"
                                    value={settings.googleAnalyticsId}
                                    onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    placeholder="G-XXXXXXXXXX"
                                />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Search Console ID</label>
                                <input
                                    type="text"
                                    value={settings.googleSearchConsoleId}
                                    onChange={(e) => handleChange('googleSearchConsoleId', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    placeholder="Verification code"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-pink-500/20">
                            <Mail className="w-5 h-5 text-pink-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Social Media Links</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-white font-semibold mb-2">Facebook URL</label>
                            <input
                                type="url"
                                value={settings.facebookUrl}
                                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="https://facebook.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Twitter URL</label>
                            <input
                                type="url"
                                value={settings.twitterUrl}
                                onChange={(e) => handleChange('twitterUrl', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="https://twitter.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">LinkedIn URL</label>
                            <input
                                type="url"
                                value={settings.linkedinUrl}
                                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="https://linkedin.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">GitHub URL</label>
                            <input
                                type="url"
                                value={settings.githubUrl}
                                onChange={(e) => handleChange('githubUrl', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>
                </div>

                {/* Feature Toggles */}
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-green-500/20">
                            <Lock className="w-5 h-5 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Feature Toggles</h2>
                    </div>

                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                            <div>
                                <p className="text-white font-semibold">Enable Comments</p>
                                <p className="text-gray-400 text-sm">Allow users to comment on blog posts</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.enableComments}
                                onChange={(e) => handleChange('enableComments', e.target.checked)}
                                className="w-5 h-5 text-cyan-500 rounded focus:ring-cyan-500"
                            />
                        </label>

                        <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                            <div>
                                <p className="text-white font-semibold">Enable Newsletter</p>
                                <p className="text-gray-400 text-sm">Show newsletter signup forms</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.enableNewsletter}
                                onChange={(e) => handleChange('enableNewsletter', e.target.checked)}
                                className="w-5 h-5 text-cyan-500 rounded focus:ring-cyan-500"
                            />
                        </label>

                        <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                            <div>
                                <p className="text-white font-semibold">Tool Submissions</p>
                                <p className="text-gray-400 text-sm">Allow users to submit tools</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.enableToolSubmissions}
                                onChange={(e) => handleChange('enableToolSubmissions', e.target.checked)}
                                className="w-5 h-5 text-cyan-500 rounded focus:ring-cyan-500"
                            />
                        </label>

                        <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                            <div>
                                <p className="text-white font-semibold">Moderate Tools</p>
                                <p className="text-gray-400 text-sm">Require approval before tools are published</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.moderateTools}
                                onChange={(e) => handleChange('moderateTools', e.target.checked)}
                                className="w-5 h-5 text-cyan-500 rounded focus:ring-cyan-500"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
