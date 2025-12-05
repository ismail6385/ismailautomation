"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Plus, Trash2, Save, Link as LinkIcon } from 'lucide-react';

interface Redirect {
    id: string;
    from: string;
    to: string;
    type: '301' | '302';
    enabled: boolean;
}

export default function RedirectsPage() {
    const [redirects, setRedirects] = useState<Redirect[]>([]);
    const [newRedirect, setNewRedirect] = useState({ from: '', to: '', type: '301' as '301' | '302' });

    useEffect(() => {
        const saved = localStorage.getItem('redirects');
        if (saved) {
            setRedirects(JSON.parse(saved));
        }
    }, []);

    const handleAdd = () => {
        if (!newRedirect.from || !newRedirect.to) {
            alert('Please enter both FROM and TO URLs');
            return;
        }

        const redirect: Redirect = {
            id: Date.now().toString(),
            from: newRedirect.from,
            to: newRedirect.to,
            type: newRedirect.type,
            enabled: true,
        };

        const updated = [...redirects, redirect];
        setRedirects(updated);
        localStorage.setItem('redirects', JSON.stringify(updated));

        setNewRedirect({ from: '', to: '', type: '301' });
        alert('Redirect added successfully!');
    };

    const handleDelete = (id: string) => {
        if (!confirm('Delete this redirect?')) return;

        const updated = redirects.filter(r => r.id !== id);
        setRedirects(updated);
        localStorage.setItem('redirects', JSON.stringify(updated));
    };

    const toggleEnabled = (id: string) => {
        const updated = redirects.map(r =>
            r.id === id ? { ...r, enabled: !r.enabled } : r
        );
        setRedirects(updated);
        localStorage.setItem('redirects', JSON.stringify(updated));
    };

    const exportToNginx = () => {
        let config = '# Nginx redirect configuration\n\n';
        redirects.forEach(r => {
            if (r.enabled) {
                config += `rewrite ^${r.from}$ ${r.to} ${r.type === '301' ? 'permanent' : 'redirect'};\n`;
            }
        });

        const blob = new Blob([config], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nginx-redirects.conf';
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportToApache = () => {
        let config = '# Apache .htaccess redirect configuration\n\n';
        redirects.forEach(r => {
            if (r.enabled) {
                config += `Redirect ${r.type} ${r.from} ${r.to}\n`;
            }
        });

        const blob = new Blob([config], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'htaccess-redirects.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <div>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Redirect Manager</h1>
                    <p className="text-gray-400">Manage 301 & 302 redirects for SEO and URL changes</p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="glass-effect rounded-2xl p-6">
                        <p className="text-gray-400 mb-2">Total Redirects</p>
                        <p className="text-3xl font-bold text-white">{redirects.length}</p>
                    </div>
                    <div className="glass-effect rounded-2xl p-6">
                        <p className="text-gray-400 mb-2">Active</p>
                        <p className="text-3xl font-bold text-green-400">{redirects.filter(r => r.enabled).length}</p>
                    </div>
                    <div className="glass-effect rounded-2xl p-6">
                        <p className="text-gray-400 mb-2">Inactive</p>
                        <p className="text-3xl font-bold text-gray-500">{redirects.filter(r => !r.enabled).length}</p>
                    </div>
                </div>

                {/* Add New Redirect */}
                <div className="glass-effect rounded-2xl p-8 mb-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Add New Redirect</h2>

                    <div className="grid md:grid-cols-12 gap-4">
                        <div className="md:col-span-5">
                            <label className="block text-gray-400 text-sm mb-2">From (Old URL)</label>
                            <input
                                type="text"
                                value={newRedirect.from}
                                onChange={(e) => setNewRedirect({ ...newRedirect, from: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="/old-page"
                            />
                        </div>

                        <div className="md:col-span-5">
                            <label className="block text-gray-400 text-sm mb-2">To (New URL)</label>
                            <input
                                type="text"
                                value={newRedirect.to}
                                onChange={(e) => setNewRedirect({ ...newRedirect, to: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="/new-page or https://example.com"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-sm mb-2">Type</label>
                            <select
                                value={newRedirect.type}
                                onChange={(e) => setNewRedirect({ ...newRedirect, type: e.target.value as '301' | '302' })}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            >
                                <option value="301">301</option>
                                <option value="302">302</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleAdd}
                        className="mt-6 px-8 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Redirect
                    </button>

                    {/* Info */}
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <h3 className="font-semibold text-cyan-400 mb-2">301 - Permanent</h3>
                            <p className="text-sm text-gray-300">Use for permanently moved pages. Passes SEO value.</p>
                        </div>
                        <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <h3 className="font-semibold text-purple-400 mb-2">302 - Temporary</h3>
                            <p className="text-sm text-gray-300">Use for temporary redirects. Doesn't pass SEO value.</p>
                        </div>
                    </div>
                </div>

                {/* Redirects List */}
                <div className="glass-effect rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">All Redirects ({redirects.length})</h2>
                        {redirects.length > 0 && (
                            <div className="flex gap-3">
                                <button
                                    onClick={exportToNginx}
                                    className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors font-semibold text-sm"
                                >
                                    Export Nginx
                                </button>
                                <button
                                    onClick={exportToApache}
                                    className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors font-semibold text-sm"
                                >
                                    Export Apache
                                </button>
                            </div>
                        )}
                    </div>

                    {redirects.length === 0 ? (
                        <p className="text-gray-400 text-center py-12">
                            No redirects yet. Add your first redirect above! 🔗
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {redirects.map((redirect) => (
                                <div
                                    key={redirect.id}
                                    className={`p-6 rounded-xl border transition-all ${redirect.enabled
                                        ? 'glass-effect border-white/10 hover:border-cyan-500/30'
                                        : 'bg-white/5 border-white/5 opacity-50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <span className={`px-3 py-1 rounded-lg font-mono text-sm font-bold ${redirect.type === '301'
                                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                                                : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                                } text-white`}>
                                                {redirect.type}
                                            </span>

                                            <div className="flex items-center gap-3 flex-1">
                                                <code className="text-cyan-400 font-mono text-sm">{redirect.from}</code>
                                                <ArrowRight className="w-4 h-4 text-gray-500" />
                                                <code className="text-green-400 font-mono text-sm truncate">{redirect.to}</code>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={redirect.enabled}
                                                    onChange={() => toggleEnabled(redirect.id)}
                                                    className="w-4 h-4 rounded accent-cyan-500"
                                                />
                                                <span className="text-sm text-gray-400">Active</span>
                                            </label>

                                            <button
                                                onClick={() => handleDelete(redirect.id)}
                                                className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Documentation */}
                <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                    <h3 className="text-lg font-bold text-white mb-3">💡 Implementation Guide:</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-white mb-2">For Next.js:</h4>
                            <p className="text-sm text-gray-300 mb-2">Add to <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">next.config.js</code>:</p>
                            <pre className="p-4 rounded-lg bg-black/30 text-green-400 text-xs overflow-x-auto">
                                {`async redirects() {
  return [
    {
      source: '/old-page',
      destination: '/new-page',
      permanent: true, // 301
    },
  ]
}`}
                            </pre>
                        </div>
                        <p className="text-gray-400 text-sm">
                            <strong className="text-white">Note:</strong> Restart your dev server after adding redirects to next.config.js
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
