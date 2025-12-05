"use client";

import { useState, useEffect } from 'react';
import { Save, Globe, Mail, Code, Share2, CheckCircle, AlertCircle } from 'lucide-react';

interface Integrations {
    googleAnalytics: string;
    googleSearchConsole: string;
    googleAdSense: string;
    sendGridApiKey: string;
    social: {
        facebook: string;
        twitter: string;
        instagram: string;
        linkedin: string;
        youtube: string;
        github: string;
    };
    customScripts: {
        header: string;
        body: string;
        footer: string;
    };
}

export default function IntegrationsPage() {
    const [data, setData] = useState<Integrations>({
        googleAnalytics: '',
        googleSearchConsole: '',
        googleAdSense: '',
        sendGridApiKey: '',
        social: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: '',
            youtube: '',
            github: '',
        },
        customScripts: {
            header: '',
            body: '',
            footer: '',
        },
    });

    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<'google' | 'social' | 'email' | 'scripts'>('google');

    useEffect(() => {
        const savedData = localStorage.getItem('siteIntegrations');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('siteIntegrations', JSON.stringify(data));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const updateSocial = (platform: keyof typeof data.social, value: string) => {
        setData({
            ...data,
            social: { ...data.social, [platform]: value }
        });
    };

    const updateScript = (location: keyof typeof data.customScripts, value: string) => {
        setData({
            ...data,
            customScripts: { ...data.customScripts, [location]: value }
        });
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Integrations Hub</h1>
                    <p className="text-gray-400">Connect third-party services and manage API keys</p>
                </div>
                <button
                    onClick={handleSave}
                    className="px-8 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2"
                >
                    {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                    {saved ? 'Settings Saved!' : 'Save Changes'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                {[
                    { id: 'google', label: 'Google Services', icon: Globe },
                    { id: 'social', label: 'Social Media', icon: Share2 },
                    { id: 'email', label: 'Email Services', icon: Mail },
                    { id: 'scripts', label: 'Custom Scripts', icon: Code },
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${activeTab === tab.id
                                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                                : 'glass-effect text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="glass-effect rounded-2xl p-8">

                {/* Google Services */}
                {activeTab === 'google' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Globe className="w-6 h-6 text-cyan-400" />
                            Google Integrations
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white font-semibold mb-2">Google Analytics (GA4)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.googleAnalytics}
                                        onChange={(e) => setData({ ...data, googleAnalytics: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="G-XXXXXXXXXX"
                                    />
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Measurement ID from Google Analytics</p>
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Google Search Console</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.googleSearchConsole}
                                        onChange={(e) => setData({ ...data, googleSearchConsole: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="Verification Code"
                                    />
                                    <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">HTML Tag verification code</p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-white font-semibold mb-2">Google AdSense</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.googleAdSense}
                                        onChange={(e) => setData({ ...data, googleAdSense: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                                    />
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">$</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Publisher ID for ads</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Social Media */}
                {activeTab === 'social' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Share2 className="w-6 h-6 text-purple-400" />
                            Social Media Links
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {Object.keys(data.social).map((platform) => (
                                <div key={platform}>
                                    <label className="block text-white font-semibold mb-2 capitalize">{platform}</label>
                                    <input
                                        type="text"
                                        value={data.social[platform as keyof typeof data.social]}
                                        onChange={(e) => updateSocial(platform as keyof typeof data.social, e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder={`https://${platform}.com/username`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Email Services */}
                {activeTab === 'email' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Mail className="w-6 h-6 text-green-400" />
                            Email Services
                        </h2>

                        <div>
                            <label className="block text-white font-semibold mb-2">SendGrid API Key</label>
                            <input
                                type="password"
                                value={data.sendGridApiKey}
                                onChange={(e) => setData({ ...data, sendGridApiKey: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxx"
                            />
                            <p className="text-xs text-gray-400 mt-1">Required for sending newsletters and system emails</p>
                        </div>
                    </div>
                )}

                {/* Custom Scripts */}
                {activeTab === 'scripts' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Code className="w-6 h-6 text-amber-400" />
                            Custom Scripts
                        </h2>

                        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-6 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-200">
                                Warning: Be careful when adding custom scripts. Invalid JavaScript can break your website.
                                Always test scripts in a safe environment first.
                            </p>
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Header Scripts {'<head>'}</label>
                            <textarea
                                value={data.customScripts.header}
                                onChange={(e) => updateScript('header', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                                rows={5}
                                placeholder="<!-- Add scripts to appear in the <head> section -->"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Body Scripts {'<body>'}</label>
                            <textarea
                                value={data.customScripts.body}
                                onChange={(e) => updateScript('body', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                                rows={5}
                                placeholder="<!-- Add scripts to appear at the start of <body> -->"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Footer Scripts {'</footer>'}</label>
                            <textarea
                                value={data.customScripts.footer}
                                onChange={(e) => updateScript('footer', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                                rows={5}
                                placeholder="<!-- Add scripts to appear before closing </body> tag -->"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
