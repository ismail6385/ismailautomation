"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [blog, setBlog] = useState<any>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

    useEffect(() => {
        // Load blog from localStorage
        const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        const currentBlog = blogs.find((b: any) => b.slug === slug);
        setBlog(currentBlog);

        // Get related blogs (same category)
        if (currentBlog) {
            const related = blogs
                .filter((b: any) => b.category === currentBlog.category && b.slug !== slug)
                .slice(0, 3);
            setRelatedBlogs(related);
        }
    }, [slug]);

    if (!blog) {
        return (
            <div className="min-h-screen py-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
                    <p className="text-gray-400 mb-8">This article doesn't exist or has been removed.</p>
                    <Link href="/blog" className="px-8 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 font-semibold">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Blog
                </Link>

                {/* Article Header */}
                <article className="glass-effect rounded-3xl p-8 md:p-12 mb-12">
                    {/* Category Badge */}
                    <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold mb-6">
                        {blog.category}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                        {blog.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8 pb-8 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(blog.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {blog.readTime}
                        </div>
                        <div className="flex items-center gap-2">
                            <span>By {blog.author}</span>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                            }}
                            className="ml-auto flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-cyan max-w-none">
                        <ReactMarkdown
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,
                                p: ({ node, ...props }) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                                li: ({ node, ...props }) => <li className="text-gray-300" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                                code: ({ node, ...props }) => <code className="bg-white/10 px-2 py-1 rounded text-cyan-400 font-mono text-sm" {...props} />,
                                pre: ({ node, ...props }) => <pre className="bg-white/10 p-4 rounded-xl overflow-x-auto mb-4" {...props} />,
                                a: ({ node, ...props }) => <a className="text-cyan-400 hover:text-cyan-300 underline" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-400 my-4" {...props} />,
                            }}
                        >
                            {blog.content}
                        </ReactMarkdown>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <div className="flex items-center gap-3 flex-wrap">
                                <Tag className="w-5 h-5 text-gray-400" />
                                {blog.tags.map((tag: string, index: number) => (
                                    <span key={index} className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>

                {/* Related Articles */}
                {relatedBlogs.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedBlogs.map((related, index) => (
                                <Link key={index} href={`/blog/${related.slug}`} className="group">
                                    <div className="glass-effect rounded-xl p-6 hover-lift h-full">
                                        <div className="text-sm text-cyan-400 mb-2">{related.category}</div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                                            {related.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">{related.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Newsletter CTA */}
                <div className="glass-effect rounded-3xl p-8 md:p-12 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Want more automation tips?
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                        Subscribe to our newsletter for weekly tutorials, tool reviews, and productivity hacks.
                    </p>
                    <Link href="/#newsletter" className="inline-block px-8 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50">
                        Subscribe Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
