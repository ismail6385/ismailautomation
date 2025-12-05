"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Search, Clock, Calendar } from 'lucide-react';

export default function BlogPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        // Load blogs from localStorage
        const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        setBlogs(storedBlogs);
        setFilteredBlogs(storedBlogs);

        // Load categories
        const storedCategories = JSON.parse(localStorage.getItem('categories') || '["No-Code Automation","Python Automation","API Integration","AI Automation","Productivity","Business Automation"]');
        setCategories(['All', ...storedCategories]);
    }, []);

    useEffect(() => {
        // Filter blogs based on search and category
        let filtered = blogs;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(blog => blog.category === selectedCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredBlogs(filtered);
    }, [searchQuery, selectedCategory, blogs]);

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-gray-300">Automation Tutorials</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        Learn <span className="text-cyan-400">Automation</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Step-by-step tutorials, guides, and tips to master No-Code and Code-based automation
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="mb-12">
                    {/* Search Bar */}
                    <div className="glass-effect rounded-2xl p-6 mb-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl glass-effect text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-white/10"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full font-semibold transition-colors ${selectedCategory === cat
                                        ? 'bg-cyan-500 text-white'
                                        : 'glass-effect text-gray-300 hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                <div>
                    {filteredBlogs.length === 0 ? (
                        <div className="glass-effect rounded-3xl p-12 text-center">
                            <p className="text-gray-400 text-lg">
                                {searchQuery || selectedCategory !== 'All'
                                    ? 'No articles found matching your criteria.'
                                    : 'No blog posts yet. Check back soon! 📝'}
                            </p>
                            {(searchQuery || selectedCategory !== 'All') && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('All');
                                    }}
                                    className="mt-4 text-cyan-400 hover:text-cyan-300 font-semibold"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog, index) => (
                                <Link key={index} href={`/blog/${blog.slug}`} className="group block">
                                    <div className="glass-effect rounded-2xl overflow-hidden hover-lift h-full">
                                        {/* Image Placeholder */}
                                        <div className="h-48 bg-cyan-600/20 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-cyan-500/50"></div>
                                            <Sparkles className="w-16 h-16 text-white/50 relative z-10" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Meta */}
                                            <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                                                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-medium">
                                                    {blog.category}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {blog.readTime}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-3 leading-snug">
                                                {blog.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-400 line-clamp-3 mb-4">
                                                {blog.description}
                                            </p>

                                            {/* Date */}
                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(blog.date).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                {filteredBlogs.length > 0 && (
                    <div className="mt-12 text-center text-gray-400">
                        Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
                        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                    </div>
                )}
            </div>
        </div>
    );
}
