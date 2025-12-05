"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Clock, Calendar, ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
    const params = useParams();
    const categorySlug = params.category as string;
    const [blogs, setBlogs] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        // Load all blogs
        const allBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');

        // Load categories to get proper name
        const categories = JSON.parse(localStorage.getItem('categories') || '["No-Code Automation","Python Automation","API Integration","AI Automation","Productivity","Business Automation"]');

        // Find category name from slug
        const foundCategory = categories.find(
            (cat: string) => cat.toLowerCase().replace(/\s+/g, '-') === categorySlug
        );

        setCategoryName(foundCategory || categorySlug);

        // Filter blogs by category
        const filteredBlogs = allBlogs.filter(
            (blog: any) => blog.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
        );

        setBlogs(filteredBlogs);
    }, [categorySlug]);

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 font-semibold">
                    <ArrowLeft className="w-5 h-5" />
                    Back to All Articles
                </Link>

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-gray-300">Category</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        {categoryName}
                    </h1>

                    <p className="text-xl text-gray-400">
                        {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} in this category
                    </p>
                </div>

                {/* Blog Grid */}
                <div>
                    {blogs.length === 0 ? (
                        <div className="glass-effect rounded-3xl p-12 text-center">
                            <p className="text-gray-400 text-lg mb-4">
                                No articles in this category yet.
                            </p>
                            <Link
                                href="/blog"
                                className="text-cyan-400 hover:text-cyan-300 font-semibold"
                            >
                                Browse all articles →
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog, index) => (
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
            </div>
        </div>
    );
}
