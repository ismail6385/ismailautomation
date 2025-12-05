"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

interface Tool {
    id: string;
    name: string;
    description: string;
    category: string;
    url: string;
    pricing: string;
    status: 'pending' | 'approved' | 'rejected';
}

export default function ToolsPage() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

    const [newTool, setNewTool] = useState({
        name: '',
        description: '',
        category: '',
        url: '',
        pricing: 'Free',
    });

    // Load tools from localStorage
    useEffect(() => {
        const storedTools = JSON.parse(localStorage.getItem('tools') || '[]');
        setTools(storedTools);
    }, []);

    const handleAddTool = () => {
        const tool: Tool = {
            id: Date.now().toString(),
            ...newTool,
            status: 'approved',
        };

        const updatedTools = [...tools, tool];
        setTools(updatedTools);
        localStorage.setItem('tools', JSON.stringify(updatedTools));

        setNewTool({
            name: '',
            description: '',
            category: '',
            url: '',
            pricing: 'Free',
        });
        setShowAddModal(false);
    };

    const handleDeleteTool = (id: string) => {
        if (confirm('Are you sure you want to delete this tool?')) {
            const updatedTools = tools.filter(t => t.id !== id);
            setTools(updatedTools);
            localStorage.setItem('tools', JSON.stringify(updatedTools));
        }
    };

    const handleStatusChange = (id: string, status: 'approved' | 'rejected') => {
        const updatedTools = tools.map(t =>
            t.id === id ? { ...t, status } : t
        );
        setTools(updatedTools);
        localStorage.setItem('tools', JSON.stringify(updatedTools));
    };

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || tool.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Tools Management</h1>
                    <p className="text-gray-400">Manage automation tools and submissions</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 sm:mt-0 px-6 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Tool
                </button>
            </div>

            {/* Search and Filter */}
            <div className="glass-effect rounded-2xl p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tools..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Tools List */}
            <div className="space-y-4">
                {filteredTools.length === 0 ? (
                    <div className="glass-effect rounded-2xl p-12 text-center">
                        <p className="text-gray-400">No tools found. Add your first tool! 🛠️</p>
                    </div>
                ) : (
                    filteredTools.map((tool) => (
                        <div key={tool.id} className="glass-effect rounded-2xl p-6 hover-lift">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tool.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                            tool.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                            {tool.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 mb-3">{tool.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                                            {tool.category}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                                            {tool.pricing}
                                        </span>
                                        <a
                                            href={tool.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm hover:bg-blue-500/30 transition-colors"
                                        >
                                            Visit Website →
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    {tool.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusChange(tool.id, 'approved')}
                                                className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-sm font-semibold"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(tool.id, 'rejected')}
                                                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-semibold"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDeleteTool(tool.id)}
                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Tool Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-effect rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-white mb-6">Add New Tool</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-white font-semibold mb-2">Tool Name</label>
                                <input
                                    type="text"
                                    value={newTool.name}
                                    onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    placeholder="e.g., Zapier"
                                />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Description</label>
                                <textarea
                                    value={newTool.description}
                                    onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    rows={3}
                                    placeholder="Brief description of the tool..."
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white font-semibold mb-2">Category</label>
                                    <input
                                        type="text"
                                        value={newTool.category}
                                        onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="e.g., No-Code Automation"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Pricing</label>
                                    <select
                                        value={newTool.pricing}
                                        onChange={(e) => setNewTool({ ...newTool, pricing: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    >
                                        <option value="Free">Free</option>
                                        <option value="Freemium">Freemium</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Website URL</label>
                                <input
                                    type="url"
                                    value={newTool.url}
                                    onChange={(e) => setNewTool({ ...newTool, url: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleAddTool}
                                className="flex-1 px-6 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors"
                            >
                                Add Tool
                            </button>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="flex-1 px-6 py-3 rounded-full font-bold glass-effect text-white hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
