"use client";

import { useState, useEffect } from 'react';
import { Save, Upload, Palette, Type, Layout, Image as ImageIcon, CheckCircle } from 'lucide-react';

export default function AppearancePage() {
    const [settings, setSettings] = useState({
        siteName: 'IsmailAutomation',
        logoUrl: '',
        faviconUrl: '',
        primaryColor: '#06b6d4', // cyan-500
        secondaryColor: '#8b5cf6', // violet-500
        fontFamily: 'Inter',
        borderRadius: '0.5rem',
        enableGlassmorphism: true,
    });

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedSettings = localStorage.getItem('siteAppearance');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('siteAppearance', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);

        // Apply CSS variables dynamically (Preview)
        document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    };

    const handleImageUpload = (field: 'logoUrl' | 'faviconUrl') => {
        const url = prompt('Enter Image URL (or use Media Library to get URL):');
        if (url) {
            setSettings({ ...settings, [field]: url });
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Appearance</h1>
                    <p className="text-gray-400">Customize your website's look and feel</p>
                </div>
                <button
                    onClick={handleSave}
                    className="px-8 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2"
                >
                    {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Branding */}
                <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <ImageIcon className="w-6 h-6 text-cyan-400" />
                        Branding
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-white font-semibold mb-2">Site Name</label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Logo</label>
                            <div className="flex gap-4 items-center">
                                {settings.logoUrl ? (
                                    <img src={settings.logoUrl} alt="Logo" className="h-12 w-auto bg-white/10 rounded p-1" />
                                ) : (
                                    <div className="h-12 w-12 bg-white/10 rounded flex items-center justify-center text-gray-500 text-xs">No Logo</div>
                                )}
                                <button
                                    onClick={() => handleImageUpload('logoUrl')}
                                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2"
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload URL
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Favicon</label>
                            <div className="flex gap-4 items-center">
                                {settings.faviconUrl ? (
                                    <img src={settings.faviconUrl} alt="Favicon" className="h-8 w-8 bg-white/10 rounded p-1" />
                                ) : (
                                    <div className="h-8 w-8 bg-white/10 rounded flex items-center justify-center text-gray-500 text-xs">No Icon</div>
                                )}
                                <button
                                    onClick={() => handleImageUpload('faviconUrl')}
                                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2"
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload URL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Colors & Style */}
                <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Palette className="w-6 h-6 text-purple-400" />
                        Colors & Style
                    </h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white font-semibold mb-2">Primary Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={settings.primaryColor}
                                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                                        className="h-10 w-10 rounded cursor-pointer bg-transparent border-0"
                                    />
                                    <input
                                        type="text"
                                        value={settings.primaryColor}
                                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                                        className="flex-1 px-3 py-2 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none uppercase"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-2">Secondary Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={settings.secondaryColor}
                                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                                        className="h-10 w-10 rounded cursor-pointer bg-transparent border-0"
                                    />
                                    <input
                                        type="text"
                                        value={settings.secondaryColor}
                                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                                        className="flex-1 px-3 py-2 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none uppercase"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Font Family</label>
                            <select
                                value={settings.fontFamily}
                                onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            >
                                <option value="Inter">Inter (Default)</option>
                                <option value="Roboto">Roboto</option>
                                <option value="Open Sans">Open Sans</option>
                                <option value="Poppins">Poppins</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                            <div>
                                <h3 className="font-semibold text-white">Glassmorphism Effect</h3>
                                <p className="text-sm text-gray-400">Enable transparent blur effects</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.enableGlassmorphism}
                                    onChange={(e) => setSettings({ ...settings, enableGlassmorphism: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
