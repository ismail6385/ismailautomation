"use client";

import { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Eye, Edit, Save } from 'lucide-react';

interface Page {
    id: string;
    title: string;
    slug: string;
    content: string;
    status: 'published' | 'draft';
    createdAt: string;
}

export default function PagesPage() {
    const [pages, setPages] = useState<Page[]>([]);
    const [editing, setEditing] = useState<Page | null>(null);
    const [formData, setFormData] = useState({ title: '', content: '', status: 'published' as 'published' | 'draft' });

    useEffect(() => {
        const saved = localStorage.getItem('staticPages');
        if (saved) {
            setPages(JSON.parse(saved));
        } else {
            // Default pages
            const defaults: Page[] = [
                {
                    id: '1',
                    title: 'About Us',
                    slug: 'about',
                    content: '# About IsmailAutomation\n\nWelcome to IsmailAutomation - your ultimate resource for learning AI automation.',
                    status: 'published',
                    createdAt: new Date().toISOString(),
                },
                {
                    id: '2',
                    title: 'Contact',
                    slug: 'contact',
                    content: '# Contact Us\n\nGet in touch with us!',
                    status: 'published',
                    createdAt: new Date().toISOString(),
                },
            ];
            setPages(defaults);
            localStorage.setItem('staticPages', JSON.stringify(defaults));
        }
    }, []);

    const handleSave = () => {
        if (!formData.title || !formData.content) {
            alert('Please fill all fields');
            return;
        }

        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        if (editing) {
            // Update
            const updated = pages.map(p =>
                p.id === editing.id
                    ? { ...p, title: formData.title, content: formData.content, status: formData.status }
                    : p
            );
            setPages(updated);
            localStorage.setItem('staticPages', JSON.stringify(updated));
            setEditing(null);
        } else {
            // Create new
            const newPage: Page = {
                id: Date.now().toString(),
                title: formData.title,
                slug,
                content: formData.content,
                status: formData.status,
                createdAt: new Date().toISOString(),
            };
            const updated = [...pages, newPage];
            setPages(updated);
            localStorage.setItem('staticPages', JSON.stringify(updated));
        }

        setFormData({ title: '', content: '', status: 'published' });
        alert('Page saved successfully!');
    };

    const handleEdit = (page: Page) => {
        setEditing(page);
        setFormData({
            title: page.title,
            content: page.content,
            status: page.status,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: string) => {
        if (!confirm('Delete this page?')) return;
        const updated = pages.filter(p => p.id !== id);
        setPages(updated);
        localStorage.setItem('staticPages', JSON.stringify(updated));
    };

    const cancelEdit = () => {
        setEditing(null);
        setFormData({ title: '', content: '', status: 'published' });
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Pages Manager</h1>
                <p className="text-gray-400">Create and manage static pages</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="glass-effect rounded-2xl p-6">
                    <p className="text-gray-400 mb-2">Total Pages</p>
                    <p className="text-3xl font-bold text-white">{pages.length}</p>
                </div>
                <div className="glass-effect rounded-2xl p-6">
                    <p className="text-gray-400 mb-2">Published</p>
                    <p className="text-3xl font-bold text-green-400">{pages.filter(p => p.status === 'published').length}</p>
                </div>
                <div className="glass-effect rounded-2xl p-6">
                    <p className="text-gray-400 mb-2">Drafts</p>
                    <p className="text-3xl font-bold text-amber-400">{pages.filter(p => p.status === 'draft').length}</p>
                </div>
            </div>

            {/* Editor */}
            <div className="glass-effect rounded-2xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                    {editing ? 'Edit Page' : 'Create New Page'}
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-white font-semibold mb-2">Page Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            placeholder="e.g., About Us, Privacy Policy"
                        />
                        {formData.title && (
                            <p className="text-sm text-gray-400 mt-2">
                                Slug: <code className="text-cyan-400">/{formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</code>
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">Content (Markdown)</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                            rows={15}
                            placeholder="Write page content in Markdown format..."
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                        >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            className="px-8 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            {editing ? 'Update Page' : 'Create Page'}
                        </button>
                        {editing && (
                            <button
                                onClick={cancelEdit}
                                className="px-8 py-3 rounded-full font-bold glass-effect text-white hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Pages List */}
            <div className="glass-effect rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">All Pages ({pages.length})</h2>

                {pages.length === 0 ? (
                    <p className="text-gray-400 text-center py-12">
                        No pages yet. Create your first page above! 📄
                    </p>
                ) : (
                    <div className="space-y-4">
                        {pages.map((page) => (
                            <div key={page.id} className="glass-effect rounded-xl p-6 hover:border-cyan-500/30 border border-white/10 transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-white">{page.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${page.status === 'published'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-amber-500/20 text-amber-400'
                                                }`}>
                                                {page.status}
                                            </span>
                                        </div>
                                        <code className="text-sm text-cyan-400">/{page.slug}</code>
                                        <p className="text-gray-400 text-sm mt-2">
                                            {page.content.substring(0, 150)}...
                                        </p>
                                        <p className="text-gray-500 text-xs mt-2">
                                            Created: {new Date(page.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`/${page.slug}`}
                                            target="_blank"
                                            className="p-2 rounded-lg hover:bg-cyan-500/20 text-cyan-400 transition-colors"
                                            title="View"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleEdit(page)}
                                            className="p-2 rounded-lg hover:bg-purple-500/20 text-purple-400 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(page.id)}
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

            {/* Common Pages */}
            <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">💡 Recommended Pages:</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-300">
                    <div>
                        <p className="font-semibold text-white mb-2">Essential:</p>
                        <ul className="space-y-1">
                            <li>• About Us</li>
                            <li>• Contact</li>
                            <li>• Privacy Policy (AdSense required)</li>
                            <li>• Terms & Conditions</li>
                            <li>• Disclaimer</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-white mb-2">Optional:</p>
                        <ul className="space-y-1">
                            <li>• FAQ</li>
                            <li>• Advertise With Us</li>
                            <li>• Resources</li>
                            <li>• Affiliate Disclosure</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
