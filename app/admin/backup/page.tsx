"use client";

import { useState, useEffect } from 'react';
import { Download, Upload, Database, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

export default function BackupPage() {
    const [backupStatus, setBackupStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [restoreStatus, setRestoreStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const [dashboardData, setDashboardData] = useState({
        blogs: [],
        tools: [],
        subscribers: [],
        comments: [],
        media: [],
        categories: [],
        siteSettings: {},
    });
    const [totalItems, setTotalItems] = useState(0);

    const getAllData = () => {
        // Ensure this only runs on client
        if (typeof window === 'undefined') return {
            blogs: [], tools: [], subscribers: [], comments: [], media: [], categories: [], siteSettings: {}
        };

        return {
            blogs: JSON.parse(localStorage.getItem('blogs') || '[]'),
            tools: JSON.parse(localStorage.getItem('tools') || '[]'),
            subscribers: JSON.parse(localStorage.getItem('subscribers') || '[]'),
            comments: JSON.parse(localStorage.getItem('comments') || '[]'),
            media: JSON.parse(localStorage.getItem('media') || '[]'),
            categories: JSON.parse(localStorage.getItem('categories') || '[]'),
            siteSettings: JSON.parse(localStorage.getItem('siteSettings') || '{}'),
        };
    };

    useEffect(() => {
        const data = getAllData();
        setDashboardData(data);

        const total = Object.values(data).reduce((acc: number, val: any) => {
            if (Array.isArray(val)) return acc + val.length;
            return acc;
        }, 0);
        setTotalItems(total);
    }, []);

    const handleBackup = () => {
        try {
            const data = getAllData();
            const backup = {
                version: '1.0',
                timestamp: new Date().toISOString(),
                data: data,
            };

            const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ismailautomation-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            window.URL.revokeObjectURL(url);

            setBackupStatus('success');
            setMessage('Backup downloaded successfully! 🎉');
            setTimeout(() => setBackupStatus('idle'), 3000);
        } catch (err) {
            setBackupStatus('error');
            setMessage('Error creating backup!');
            setTimeout(() => setBackupStatus('idle'), 3000);
        }
    };

    const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const backup = JSON.parse(event.target?.result as string);

                // Validate backup structure
                if (!backup.data || !backup.version) {
                    throw new Error('Invalid backup file');
                }

                // Restore data
                Object.entries(backup.data).forEach(([key, value]) => {
                    localStorage.setItem(key, JSON.stringify(value));
                });

                setRestoreStatus('success');
                setMessage('Data restored successfully! Refresh the page. 🎉');

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (err) {
                setRestoreStatus('error');
                setMessage('Error restoring backup! Invalid file.');
                setTimeout(() => setRestoreStatus('idle'), 3000);
            }
        };
        reader.readAsText(file);
    };

    const handleClearAll = () => {
        if (!confirm('⚠️ Are you sure? This will delete ALL data! This cannot be undone.')) {
            return;
        }

        if (!confirm('⚠️ FINAL WARNING: All blogs, tools, subscribers, comments will be deleted!')) {
            return;
        }

        try {
            localStorage.clear();
            setMessage('All data cleared! Refresh the page.');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            console.error('Error clearing data:', err);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Backup & Restore</h1>
                <p className="text-gray-400">Manage your website data backups</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total Items</p>
                    <p className="text-2xl font-bold text-white">{totalItems}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Blogs</p>
                    <p className="text-2xl font-bold text-cyan-400">{dashboardData.blogs.length}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Tools</p>
                    <p className="text-2xl font-bold text-purple-400">{dashboardData.tools.length}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Subscribers</p>
                    <p className="text-2xl font-bold text-green-400">{dashboardData.subscribers.length}</p>
                </div>
            </div>

            {/* Status Messages */}
            {(backupStatus !== 'idle' || restoreStatus !== 'idle') && (
                <div className={`mb-6 p-4 rounded-xl ${backupStatus === 'success' || restoreStatus === 'success'
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-red-500/10 border border-red-500/20'
                    }`}>
                    <div className="flex items-center gap-3">
                        {(backupStatus === 'success' || restoreStatus === 'success') ? (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                            <AlertCircle className="w-6 h-6 text-red-400" />
                        )}
                        <p className={
                            backupStatus === 'success' || restoreStatus === 'success'
                                ? 'text-green-400 font-semibold'
                                : 'text-red-400 font-semibold'
                        }>
                            {message}
                        </p>
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Download Backup */}
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-cyan-500/20">
                            <Download className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Download Backup</h2>
                            <p className="text-gray-400 text-sm">Export all your data</p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="p-4 rounded-lg bg-white/5">
                            <h3 className="text-white font-semibold mb-2">What's included:</h3>
                            <ul className="space-y-1 text-gray-300 text-sm">
                                <li>✓ All blog posts and categories</li>
                                <li>✓ All tools and submissions</li>
                                <li>✓ Newsletter subscribers</li>
                                <li>✓ User comments</li>
                                <li>✓ Media files (base64)</li>
                                <li>✓ Site settings</li>
                            </ul>
                        </div>

                        <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <p className="text-cyan-400 text-sm">
                                💡 <strong>Tip:</strong> Download backups regularly to prevent data loss!
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleBackup}
                        className="w-full px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Download Backup File
                    </button>
                </div>

                {/* Restore Backup */}
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-purple-500/20">
                            <Upload className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Restore Backup</h2>
                            <p className="text-gray-400 text-sm">Import previous data</p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="p-4 rounded-lg bg-white/5">
                            <h3 className="text-white font-semibold mb-2">Instructions:</h3>
                            <ol className="space-y-1 text-gray-300 text-sm list-decimal list-inside">
                                <li>Select your backup JSON file</li>
                                <li>Data will be validated</li>
                                <li>Current data will be replaced</li>
                                <li>Page will refresh automatically</li>
                            </ol>
                        </div>

                        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <p className="text-amber-400 text-sm">
                                ⚠️ <strong>Warning:</strong> This will overwrite all existing data!
                            </p>
                        </div>
                    </div>

                    <label className="block">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleRestore}
                            className="hidden"
                            id="restore-input"
                        />
                        <div className="w-full px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2 cursor-pointer">
                            <Upload className="w-5 h-5" />
                            Select Backup File
                        </div>
                    </label>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 glass-effect rounded-2xl p-6 bg-red-500/5 border border-red-500/20">
                <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                    <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>
                </div>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
                    <p className="text-red-400 font-semibold mb-2">⚠️ Clear All Data</p>
                    <p className="text-gray-300 text-sm mb-4">
                        This will permanently delete all blogs, tools, subscribers, comments, and settings.
                        This action cannot be undone!
                    </p>
                    <button
                        onClick={handleClearAll}
                        className="px-6 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-semibold"
                    >
                        Clear All Data
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">💾 Backup Best Practices</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• Download backups before making major changes</li>
                    <li>• Keep multiple backup versions (weekly backups)</li>
                    <li>• Store backups in cloud storage (Google Drive, Dropbox)</li>
                    <li>• Test restore process periodically</li>
                    <li>• Backup file format: JSON (human-readable)</li>
                </ul>
            </div>
        </div>
    );
}
