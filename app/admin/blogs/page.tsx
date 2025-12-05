"use client";

import { useState } from 'react';
import { PenTool, FolderPlus, FileText, Save, Eye, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('write');
    const [blogData, setBlogData] = useState({
        title: '',
        description: '',
        category: '',
        tags: '',
        content: '',
        author: 'IsmailAutomation',
        readTime: '',
        slug: '',
        focusKeyword: '',
    });

    const [seoScore, setSeoScore] = useState(0);
    const [seoSuggestions, setSeoSuggestions] = useState<string[]>([]);

    const [categories, setCategories] = useState([
        'No-Code Automation',
        'Python Automation',
        'API Integration',
        'AI Automation',
        'Productivity',
        'Business Automation'
    ]);

    const [newCategory, setNewCategory] = useState('');

    // Auto-generate slug from title
    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    };

    // Calculate SEO score
    const calculateSEOScore = () => {
        let score = 0;
        const suggestions: string[] = [];

        // Title check (50-60 chars optimal)
        if (blogData.title.length >= 30 && blogData.title.length <= 60) {
            score += 20;
        } else if (blogData.title.length > 0) {
            score += 10;
            if (blogData.title.length < 30) suggestions.push('Title is too short (aim for 30-60 characters)');
            if (blogData.title.length > 60) suggestions.push('Title is too long (aim for 30-60 characters)');
        } else {
            suggestions.push('Add a title');
        }

        // Description check (150-160 chars optimal)
        if (blogData.description.length >= 120 && blogData.description.length <= 160) {
            score += 20;
        } else if (blogData.description.length > 0) {
            score += 10;
            if (blogData.description.length < 120) suggestions.push('Meta description is too short (aim for 120-160 characters)');
            if (blogData.description.length > 160) suggestions.push('Meta description is too long (aim for 120-160 characters)');
        } else {
            suggestions.push('Add meta description');
        }

        // Content length check (1000+ words)
        const wordCount = blogData.content.split(/\s+/).filter(w => w.length > 0).length;
        if (wordCount >= 1000) {
            score += 20;
        } else if (wordCount >= 500) {
            score += 10;
            suggestions.push(`Add more content (current: ${wordCount} words, target: 1000+)`);
        } else if (wordCount > 0) {
            score += 5;
            suggestions.push(`Content too short (current: ${wordCount} words, target: 1000+)`);
        } else {
            suggestions.push('Add blog content');
        }

        // Focus keyword check
        if (blogData.focusKeyword) {
            const keyword = blogData.focusKeyword.toLowerCase();
            const titleLower = blogData.title.toLowerCase();
            const contentLower = blogData.content.toLowerCase();
            const descLower = blogData.description.toLowerCase();

            let keywordScore = 0;
            if (titleLower.includes(keyword)) keywordScore += 10;
            else suggestions.push('Include focus keyword in title');

            if (descLower.includes(keyword)) keywordScore += 5;
            else suggestions.push('Include focus keyword in description');

            const keywordCount = (contentLower.match(new RegExp(keyword, 'g')) || []).length;
            if (keywordCount >= 3 && keywordCount <= 10) {
                keywordScore += 10;
            } else if (keywordCount > 0) {
                keywordScore += 5;
                if (keywordCount < 3) suggestions.push('Use focus keyword more in content');
                if (keywordCount > 10) suggestions.push('Avoid keyword stuffing');
            } else {
                suggestions.push('Use focus keyword in content');
            }

            score += keywordScore;
        } else {
            suggestions.push('Add a focus keyword');
        }

        // Category check
        if (blogData.category) {
            score += 5;
        } else {
            suggestions.push('Select a category');
        }

        // Tags check
        if (blogData.tags && blogData.tags.split(',').length >= 3) {
            score += 5;
        } else {
            suggestions.push('Add at least 3 tags');
        }

        // Heading check (H1, H2 in markdown)
        const h1Count = (blogData.content.match(/^# /gm) || []).length;
        const h2Count = (blogData.content.match(/^## /gm) || []).length;

        if (h1Count >= 1 && h2Count >= 2) {
            score += 10;
        } else if (h1Count >= 1 || h2Count >= 1) {
            score += 5;
            suggestions.push('Add more headings (H1, H2) for better structure');
        } else {
            suggestions.push('Add headings (# for H1, ## for H2) in content');
        }

        // Internal links check
        const internalLinks = (blogData.content.match(/\[.*?\]\(\/.*?\)/g) || []).length;
        if (internalLinks >= 2) {
            score += 10;
        } else if (internalLinks >= 1) {
            score += 5;
            suggestions.push('Add more internal links to other articles');
        } else {
            suggestions.push('Add internal links to other articles');
        }

        setSeoScore(score);
        setSeoSuggestions(suggestions);
        return score;
    };

    // Handle title change with auto-slug
    const handleTitleChange = (title: string) => {
        const slug = generateSlug(title);
        setBlogData({ ...blogData, title, slug });
        setTimeout(calculateSEOScore, 100);
    };

    // Calculate SEO on content change
    const handleContentChange = (field: string, value: string) => {
        setBlogData({ ...blogData, [field]: value });
        setTimeout(calculateSEOScore, 100);
    };

    const handleSaveBlog = () => {
        const blog = {
            ...blogData,
            slug: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            date: new Date().toISOString().split('T')[0],
            tags: blogData.tags.split(',').map(t => t.trim()),
        };

        // Save to localStorage for now
        const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        existingBlogs.push(blog);
        localStorage.setItem('blogs', JSON.stringify(existingBlogs));

        alert('Blog saved successfully! ✅');

        // Reset form
        setBlogData({
            title: '',
            description: '',
            category: '',
            tags: '',
            content: '',
            author: 'IsmailAutomation',
            readTime: '',
            slug: '',
            focusKeyword: '',
        });
        setSeoScore(0);
        setSeoSuggestions([]);
    };

    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);
            localStorage.setItem('categories', JSON.stringify(updatedCategories));
            setNewCategory('');
            alert(`Category "${newCategory}" added! Page created at /blog/category/${newCategory.toLowerCase().replace(/\s+/g, '-')}`);
        }
    };

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Manage your blog content and categories</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('write')}
                        className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${activeTab === 'write'
                            ? 'bg-cyan-500 text-white'
                            : 'glass-effect text-gray-300 hover:bg-white/10'
                            }`}
                    >
                        <PenTool className="w-5 h-5" />
                        Write Blog
                    </button>
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${activeTab === 'categories'
                            ? 'bg-cyan-500 text-white'
                            : 'glass-effect text-gray-300 hover:bg-white/10'
                            }`}
                    >
                        <FolderPlus className="w-5 h-5" />
                        Categories
                    </button>
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${activeTab === 'posts'
                            ? 'bg-cyan-500 text-white'
                            : 'glass-effect text-gray-300 hover:bg-white/10'
                            }`}
                    >
                        <FileText className="w-5 h-5" />
                        All Posts
                    </button>
                    <button
                        onClick={() => setActiveTab('seo')}
                        className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${activeTab === 'seo'
                            ? 'bg-cyan-500 text-white'
                            : 'glass-effect text-gray-300 hover:bg-white/10'
                            }`}
                    >
                        <TrendingUp className="w-5 h-5" />
                        SEO
                    </button>
                </div>

                {/* Write Blog Tab */}
                {activeTab === 'write' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Form - Left Side */}
                        <div className="lg:col-span-2 glass-effect rounded-3xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Write New Blog Post</h2>

                            <div className="space-y-6">
                                {/* Focus Keyword */}
                                <div>
                                    <label className="block text-white font-semibold mb-2">Focus Keyword (SEO)</label>
                                    <input
                                        type="text"
                                        value={blogData.focusKeyword}
                                        onChange={(e) => handleContentChange('focusKeyword', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="e.g., automation tutorial"
                                    />
                                    <p className="text-gray-400 text-sm mt-2">
                                        💡 Main keyword you want to rank for
                                    </p>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-white font-semibold mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={blogData.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="Enter blog title..."
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <span className={`text-sm ${blogData.title.length >= 30 && blogData.title.length <= 60 ? 'text-green-400' : 'text-gray-400'}`}>
                                            {blogData.title.length} / 60 characters
                                        </span>
                                        {blogData.title.length >= 30 && blogData.title.length <= 60 && (
                                            <span className="text-green-400 text-sm">✓ Optimal length</span>
                                        )}
                                    </div>
                                </div>

                                {/* Auto-generated Slug */}
                                <div>
                                    <label className="block text-white font-semibold mb-2">URL Slug (Auto-generated)</label>
                                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 border border-white/10">
                                        <span className="text-gray-400">yourdomain.com/blog/</span>
                                        <span className="text-cyan-400 font-mono">{blogData.slug || 'your-slug-here'}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-2">
                                        ✨ Automatically generated from title
                                    </p>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-white font-semibold mb-2">Meta Description (SEO)</label>
                                    <textarea
                                        value={blogData.description}
                                        onChange={(e) => handleContentChange('description', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        rows={3}
                                        placeholder="SEO description (120-160 characters)..."
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <span className={`text-sm ${blogData.description.length >= 120 && blogData.description.length <= 160 ? 'text-green-400' : 'text-gray-400'}`}>
                                            {blogData.description.length} / 160 characters
                                        </span>
                                        {blogData.description.length >= 120 && blogData.description.length <= 160 && (
                                            <span className="text-green-400 text-sm">✓ Perfect for SEO</span>
                                        )}
                                    </div>
                                </div>

                                {/* Category & Read Time */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Category</label>
                                        <select
                                            value={blogData.category}
                                            onChange={(e) => handleContentChange('category', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        >
                                            <option value="">Select category...</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Read Time</label>
                                        <input
                                            type="text"
                                            value={blogData.readTime}
                                            onChange={(e) => handleContentChange('readTime', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                            placeholder="e.g., 5 min read"
                                        />
                                    </div>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-white font-semibold mb-2">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={blogData.tags}
                                        onChange={(e) => handleContentChange('tags', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="e.g., automation, zapier, productivity"
                                    />
                                    <p className="text-gray-400 text-sm mt-2">
                                        {blogData.tags && blogData.tags.split(',').length >= 3
                                            ? `✓ ${blogData.tags.split(',').length} tags (good for SEO)`
                                            : '💡 Add at least 3 tags for better SEO'}
                                    </p>
                                </div>

                                {/* Content */}
                                <div>
                                    <label className="block text-white font-semibold mb-2">Content (Markdown)</label>

                                    {/* Formatting Toolbar */}
                                    <div className="glass-effect rounded-lg p-3 mb-2 sticky top-0 z-10">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {/* Formatting Tools */}
                                            <div className="flex items-center gap-1 border-r border-white/10 pr-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = textarea.value.substring(start, end) || 'bold text';
                                                        const newText = textarea.value.substring(0, start) + '**' + selectedText + '**' + textarea.value.substring(end);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="Bold"
                                                >
                                                    <strong className="text-gray-400 group-hover:text-white text-sm">B</strong>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        Bold **text**
                                                    </div>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = textarea.value.substring(start, end) || 'italic text';
                                                        const newText = textarea.value.substring(0, start) + '*' + selectedText + '*' + textarea.value.substring(end);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="Italic"
                                                >
                                                    <em className="text-gray-400 group-hover:text-white text-sm">I</em>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        Italic *text*
                                                    </div>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = textarea.value.substring(start, end) || 'Heading';
                                                        const newText = textarea.value.substring(0, start) + '# ' + selectedText + textarea.value.substring(end);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="H1"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm font-bold">H1</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        H1 # text
                                                    </div>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = textarea.value.substring(start, end) || 'Heading';
                                                        const newText = textarea.value.substring(0, start) + '## ' + selectedText + textarea.value.substring(end);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="H2"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm font-bold">H2</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        H2 ## text
                                                    </div>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = textarea.value.substring(start, end) || 'Heading';
                                                        const newText = textarea.value.substring(0, start) + '### ' + selectedText + textarea.value.substring(end);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="H3"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm font-bold">H3</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        H3 ### text
                                                    </div>
                                                </button>
                                            </div>

                                            {/* List Tools */}
                                            <div className="flex items-center gap-1 border-r border-white/10 pr-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = textarea.value.substring(start, end) || 'List item';
                                                        const newText = textarea.value.substring(0, start) + '- ' + selectedText + textarea.value.substring(end);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="Bullet List"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm">• List</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        Bullet - item
                                                    </div>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = textarea.value.substring(start, end) || 'List item';
                                                        const newText = textarea.value.substring(0, start) + '1. ' + selectedText + textarea.value.substring(end);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="Numbered List"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm">1. List</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        Numbered 1. item
                                                    </div>
                                                </button>
                                            </div>

                                            {/* Link & Media */}
                                            <div className="flex items-center gap-1 border-r border-white/10 pr-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const url = prompt('Enter URL:');
                                                        if (url) {
                                                            const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                            const start = textarea.selectionStart;
                                                            const end = textarea.selectionEnd;
                                                            const selectedText = textarea.value.substring(start, end) || 'link text';
                                                            const newText = textarea.value.substring(0, start) + '[' + selectedText + '](' + url + ')' + textarea.value.substring(end);
                                                            handleContentChange('content', newText);
                                                            setTimeout(() => textarea.focus(), 0);
                                                        }
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="Link"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm">🔗 Link</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        Link [text](url)
                                                    </div>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const url = prompt('Enter Image URL:');
                                                        const alt = prompt('Enter Alt Text:') || 'image';
                                                        if (url) {
                                                            const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                            const start = textarea.selectionStart;
                                                            const newText = textarea.value.substring(0, start) + '![' + alt + '](' + url + ')' + textarea.value.substring(start);
                                                            handleContentChange('content', newText);
                                                            setTimeout(() => textarea.focus(), 0);
                                                        }
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="Image"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm">🖼️ Image</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        Image ![alt](url)
                                                    </div>
                                                </button>
                                            </div>

                                            {/* Code & Quote */}
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = textarea.value.substring(start, end) || 'code';
                                                        const newText = textarea.value.substring(0, start) + '`' + selectedText + '`' + textarea.value.substring(end);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="Inline Code"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm font-mono">{'<>'}</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        Code `text`
                                                    </div>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = textarea.value.substring(start, end) || 'code here';
                                                        const newText = textarea.value.substring(0, start) + '```\n' + selectedText + '\n```' + textarea.value.substring(end);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="Code Block"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm font-mono">{'{}'}</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        Code Block ```
                                                    </div>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = textarea.value.substring(start, end) || 'Quote text';
                                                        const newText = textarea.value.substring(0, start) + '> ' + selectedText + textarea.value.substring(end);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="Quote"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm">"  "</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        Quote &gt; text
                                                    </div>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const newText = textarea.value.substring(0, start) + '\n---\n' + textarea.value.substring(start);
                                                        handleContentChange('content', newText);
                                                        setTimeout(() => textarea.focus(), 0);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                                    title="Divider"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white text-sm">—</span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                        Divider ---
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Markdown Quick Reference */}
                                        <div className="mt-3 pt-3 border-t border-white/10">
                                            <details>
                                                <summary className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                                                    📝 Markdown Cheatsheet
                                                </summary>
                                                <div className="mt-2 grid md:grid-cols-3 gap-4 text-xs">
                                                    <div className="space-y-1">
                                                        <p className="text-gray-500 mb-2 font-semibold">Text Formatting:</p>
                                                        <div><code className="text-cyan-400 bg-white/10 px-2 py-0.5 rounded">**bold**</code> <span className="text-gray-500">for</span> <strong className="text-white">bold</strong></div>
                                                        <div><code className="text-cyan-400 bg-white/10 px-2 py-0.5 rounded">*italic*</code> <span className="text-gray-500">for</span> <em className="text-white">italic</em></div>
                                                        <div><code className="text-cyan-400 bg-white/10 px-2 py-0.5 rounded">`code`</code> <span className="text-gray-500">for</span> <code className="text-white">code</code></div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-gray-500 mb-2 font-semibold">Headings:</p>
                                                        <div><code className="text-cyan-400 bg-white/10 px-2 py-0.5 rounded"># H1</code> <span className="text-gray-500">Heading 1</span></div>
                                                        <div><code className="text-cyan-400 bg-white/10 px-2 py-0.5 rounded">## H2</code> <span className="text-gray-500">Heading 2</span></div>
                                                        <div><code className="text-cyan-400 bg-white/10 px-2 py-0.5 rounded">### H3</code> <span className="text-gray-500">Heading 3</span></div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-gray-500 mb-2 font-semibold">Links & More:</p>
                                                        <div><code className="text-cyan-400 bg-white/10 px-2 py-0.5 rounded">[text](url)</code> <span className="text-gray-500">Link</span></div>
                                                        <div><code className="text-cyan-400 bg-white/10 px-2 py-0.5 rounded">![alt](url)</code> <span className="text-gray-500">Image</span></div>
                                                        <div><code className="text-cyan-400 bg-white/10 px-2 py-0.5 rounded">&gt; quote</code> <span className="text-gray-500">Quote</span></div>
                                                    </div>
                                                </div>
                                            </details>
                                        </div>
                                    </div>

                                    <textarea
                                        id="blog-content"
                                        value={blogData.content}
                                        onChange={(e) => handleContentChange('content', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                                        rows={20}
                                        placeholder="Write your blog content in Markdown format..."
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-gray-400 text-sm">
                                            💡 Use toolbar above for quick formatting
                                        </span>
                                        <span className={`text-sm font-semibold ${blogData.content.split(/\s+/).filter(w => w.length > 0).length >= 1000 ? 'text-green-400' : 'text-gray-400'}`}>
                                            {blogData.content.split(/\s+/).filter(w => w.length > 0).length} words
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSaveBlog}
                                        className="px-8 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2"
                                    >
                                        <Save className="w-5 h-5" />
                                        Save Blog
                                    </button>
                                    <button
                                        onClick={() => alert('Preview feature coming soon!')}
                                        className="px-8 py-3 rounded-full font-bold glass-effect text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                                    >
                                        <Eye className="w-5 h-5" />
                                        Preview
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* SEO Sidebar - Right Side */}
                        <div className="space-y-6">
                            {/* SEO Score Widget */}
                            <div className="glass-effect rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4">SEO Score</h3>
                                <div className="relative">
                                    <svg className="w-32 h-32 mx-auto">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="12"
                                            fill="none"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke={seoScore >= 80 ? '#10b981' : seoScore >= 50 ? '#f59e0b' : '#ef4444'}
                                            strokeWidth="12"
                                            fill="none"
                                            strokeDasharray={`${(seoScore / 100) * 351.86} 351.86`}
                                            strokeLinecap="round"
                                            transform="rotate(-90 64 64)"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className={`text-3xl font-bold ${seoScore >= 80 ? 'text-green-400' : seoScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                                                {seoScore}
                                            </div>
                                            <div className="text-gray-400 text-sm">/ 100</div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center text-gray-400 mt-4">
                                    {seoScore >= 80 ? '🎉 Excellent!' : seoScore >= 50 ? '👍 Good' : '⚠️ Needs work'}
                                </p>
                            </div>

                            {/* SEO Suggestions */}
                            <div className="glass-effect rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4">SEO Suggestions</h3>
                                {seoSuggestions.length === 0 ? (
                                    <p className="text-green-400 text-sm">✓ All SEO checks passed!</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {seoSuggestions.slice(0, 5).map((suggestion, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                <span className="text-amber-400 mt-1">⚠</span>
                                                <span>{suggestion}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Google Search Preview */}
                            <div className="glass-effect rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Google Preview</h3>
                                <div className="bg-black/30 rounded-lg p-4">
                                    <div className="text-blue-400 text-sm mb-1">yourdomain.com › blog › {blogData.slug || 'slug'}</div>
                                    <div className="text-blue-600 text-lg mb-1 line-clamp-1">
                                        {blogData.title || 'Your Blog Title Here'}
                                    </div>
                                    <div className="text-gray-400 text-sm line-clamp-2">
                                        {blogData.description || 'Your meta description will appear here...'}
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs mt-2">
                                    This is how your article will appear in Google search results
                                </p>
                            </div>

                            {/* Quick SEO Tips */}
                            <div className="glass-effect rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Quick SEO Tips</h3>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>• Use focus keyword in title</li>
                                    <li>• Add headings (H1, H2, H3)</li>
                                    <li>• Include internal links</li>
                                    <li>• Write 1000+ words</li>
                                    <li>• Add images with alt text</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                    <div className="glass-effect rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Manage Categories</h2>

                        {/* Add New Category */}
                        <div className="mb-8">
                            <label className="block text-white font-semibold mb-2">Add New Category</label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    placeholder="Enter category name..."
                                />
                                <button
                                    onClick={handleAddCategory}
                                    className="px-8 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors"
                                >
                                    Add Category
                                </button>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">
                                💡 A category page will be auto-created at /blog/category/[slug]
                            </p>
                        </div>

                        {/* Existing Categories */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Existing Categories</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {categories.map((cat) => (
                                    <div key={cat} className="glass-effect rounded-xl p-4 flex items-center justify-between">
                                        <span className="text-white font-medium">{cat}</span>
                                        <a
                                            href={`/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                                            target="_blank"
                                            className="text-cyan-400 hover:text-cyan-300 text-sm"
                                        >
                                            View Page →
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* All Posts Tab */}
                {activeTab === 'posts' && (
                    <div className="glass-effect rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">All Blog Posts</h2>
                        <div className="space-y-4">
                            {(() => {
                                const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
                                if (blogs.length === 0) {
                                    return (
                                        <p className="text-gray-400 text-center py-8">
                                            No blog posts yet. Create your first one! 📝
                                        </p>
                                    );
                                }
                                return blogs.map((blog: any, index: number) => (
                                    <div key={index} className="glass-effect rounded-xl p-6 hover-lift">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                                            <span className="text-sm text-gray-400">{blog.date}</span>
                                        </div>
                                        <p className="text-gray-400 mb-3">{blog.description}</p>
                                        <div className="flex gap-2 items-center">
                                            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                                                {blog.category}
                                            </span>
                                            <span className="text-gray-500 text-sm">{blog.readTime}</span>
                                            <a
                                                href={`/blog/${blog.slug}`}
                                                target="_blank"
                                                className="ml-auto text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                                            >
                                                View Post →
                                            </a>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                    <div className="space-y-8">
                        {/* AdSense Readiness Checker */}
                        <div className="glass-effect rounded-3xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Google AdSense Readiness</h2>

                            <div className="space-y-4">
                                {(() => {
                                    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
                                    const blogCount = blogs.length;

                                    const checklist = [
                                        {
                                            title: 'Essential Pages',
                                            items: [
                                                { text: 'About Page', done: true, link: '/about' as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Privacy Policy (with AdSense disclosure)', done: true, link: '/privacy' as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Terms & Conditions', done: true, link: '/terms' as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Disclaimer', done: true, link: '/disclaimer' as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Contact Page', done: true, link: '/contact' as string | undefined, progress: undefined as string | undefined },
                                            ]
                                        },
                                        {
                                            title: 'Content Requirements',
                                            items: [
                                                { text: `High-quality articles (${blogCount}/30)`, done: blogCount >= 30, progress: `${Math.min(100, Math.round(blogCount / 30 * 100))}%` as string | undefined, link: undefined as string | undefined },
                                                { text: 'Original content', done: blogCount >= 5, link: undefined as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Regular updates', done: blogCount >= 10, link: undefined as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Proper formatting', done: true, link: undefined as string | undefined, progress: undefined as string | undefined },
                                            ]
                                        },
                                        {
                                            title: 'Technical SEO',
                                            items: [
                                                { text: 'Mobile responsive', done: true, link: undefined as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Fast loading speed', done: true, link: undefined as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Clean URLs', done: true, link: undefined as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Internal linking', done: blogCount >= 5, link: undefined as string | undefined, progress: undefined as string | undefined },
                                            ]
                                        },
                                        {
                                            title: 'Traffic (Future)',
                                            items: [
                                                { text: '500-1000 daily visitors', done: false, link: undefined as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Organic search traffic', done: false, link: undefined as string | undefined, progress: undefined as string | undefined },
                                                { text: 'Low bounce rate (<60%)', done: false, link: undefined as string | undefined, progress: undefined as string | undefined },
                                            ]
                                        },
                                    ];

                                    return checklist.map((section, idx) => (
                                        <div key={idx} className="bg-white/5 rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-white mb-4">{section.title}</h3>
                                            <div className="space-y-3">
                                                {section.items.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        {item.done ? (
                                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                                        ) : (
                                                            <XCircle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                        )}
                                                        <span className={`flex-1 ${item.done ? 'text-white' : 'text-gray-400'}`}>
                                                            {item.text}
                                                        </span>
                                                        {item.progress && (
                                                            <span className="text-cyan-400 font-semibold text-sm">
                                                                {item.progress}
                                                            </span>
                                                        )}
                                                        {item.link && item.done && (
                                                            <a
                                                                href={item.link}
                                                                target="_blank"
                                                                className="text-cyan-400 hover:text-cyan-300 text-sm"
                                                            >
                                                                View →
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>

                            {/* Overall Progress */}
                            {(() => {
                                const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
                                const blogCount = blogs.length;
                                const completedItems = 9 + (blogCount >= 5 ? 1 : 0) + (blogCount >= 10 ? 1 : 0) + (blogCount >= 30 ? 1 : 0);
                                const totalItems = 15;
                                const percentage = ((completedItems / totalItems) * 100).toFixed(0);

                                return (
                                    <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white font-semibold">Overall Progress</span>
                                            <span className="text-cyan-400 font-bold">{percentage}%</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="bg-cyan-500 h-full transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-gray-400 text-sm mt-2">
                                            {blogCount < 30
                                                ? `Write ${30 - blogCount} more articles to be AdSense ready!`
                                                : percentage === '100'
                                                    ? '🎉 Ready to apply for Google AdSense!'
                                                    : 'Almost there! Build traffic and apply for AdSense.'}
                                        </p>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Google Analytics Setup */}
                        <div className="glass-effect rounded-3xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Google Analytics Setup</h2>
                            <p className="text-gray-400 mb-6">
                                Track your website traffic and user behavior with Google Analytics 4.
                            </p>

                            <div className="space-y-4">
                                <div className="bg-white/5 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">Step 1: Create GA4 Property</h3>
                                    <ol className="list-decimal list-inside text-gray-300 space-y-2">
                                        <li>Go to <a href="https://analytics.google.com" target="_blank" className="text-cyan-400 hover:text-cyan-300">analytics.google.com</a></li>
                                        <li>Click "Admin" → "Create Property"</li>
                                        <li>Enter website name: "IsmailAutomation"</li>
                                        <li>Select timezone and currency</li>
                                        <li>Get your Measurement ID (G-XXXXXXXXXX)</li>
                                    </ol>
                                </div>

                                <div className="bg-white/5 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">Step 2: Add Tracking Code</h3>
                                    <p className="text-gray-400 mb-3">Add this to your <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">app/layout.tsx</code></p>
                                    <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm">
                                        <code className="text-gray-300">{`// In <head> section
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  }
</Script>`}</code>
                                    </pre>
                                </div>

                                <div className="bg-white/5 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">Step 3: Verify Installation</h3>
                                    <p className="text-gray-400">
                                        Visit your website and check Google Analytics real-time reports to confirm tracking is working.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Google Search Console */}
                        <div className="glass-effect rounded-3xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Google Search Console</h2>
                            <p className="text-gray-400 mb-6">
                                Monitor your website's presence in Google search results.
                            </p>

                            <div className="space-y-4">
                                <div className="bg-white/5 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">Setup Steps</h3>
                                    <ol className="list-decimal list-inside text-gray-300 space-y-2">
                                        <li>Go to <a href="https://search.google.com/search-console" target="_blank" className="text-cyan-400 hover:text-cyan-300">search.google.com/search-console</a></li>
                                        <li>Click "Add Property" → Enter your domain</li>
                                        <li>Verify ownership (use HTML file method or DNS)</li>
                                        <li>Submit sitemap: <code className="text-cyan-400">yourdomain.com/sitemap.xml</code></li>
                                        <li>Monitor indexing and performance</li>
                                    </ol>
                                </div>

                                <div className="bg-white/5 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">Important Files</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-white mb-2"><code className="bg-white/10 px-2 py-1 rounded">robots.txt</code></p>
                                            <pre className="bg-black/30 p-4 rounded-lg text-sm">
                                                <code className="text-gray-300">{`User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml`}</code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Checklist */}
                        <div className="glass-effect rounded-3xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">SEO Optimization Checklist</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white/5 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">On-Page SEO</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Unique title tags (50-60 chars)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Meta descriptions (150-160 chars)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>H1, H2, H3 hierarchy</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Keyword optimization</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Internal linking</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Mobile responsive</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white/5 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Content SEO</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-cyan-400">•</span>
                                            <span>Write 1000-2500 words per article</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-cyan-400">•</span>
                                            <span>Add 5-10 images per article</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-cyan-400">•</span>
                                            <span>Use descriptive alt text</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-cyan-400">•</span>
                                            <span>Include FAQ sections</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-cyan-400">•</span>
                                            <span>Update old content regularly</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-cyan-400">•</span>
                                            <span>Add related articles</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <p className="text-amber-300 font-semibold mb-2">💡 Pro Tips:</p>
                                <ul className="text-gray-300 text-sm space-y-1">
                                    <li>• Target long-tail keywords (lower competition)</li>
                                    <li>• Answer specific questions in your content</li>
                                    <li>• Build backlinks from relevant websites</li>
                                    <li>• Share content on social media</li>
                                    <li>• Engage with your community</li>
                                </ul>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="glass-effect rounded-3xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                <a
                                    href="https://analytics.google.com"
                                    target="_blank"
                                    className="glass-effect rounded-xl p-6 hover-lift text-center"
                                >
                                    <p className="text-white font-semibold mb-2">Google Analytics</p>
                                    <p className="text-cyan-400 text-sm">Setup tracking →</p>
                                </a>
                                <a
                                    href="https://search.google.com/search-console"
                                    target="_blank"
                                    className="glass-effect rounded-xl p-6 hover-lift text-center"
                                >
                                    <p className="text-white font-semibold mb-2">Search Console</p>
                                    <p className="text-cyan-400 text-sm">Add property →</p>
                                </a>
                                <a
                                    href="https://www.google.com/adsense"
                                    target="_blank"
                                    className="glass-effect rounded-xl p-6 hover-lift text-center"
                                >
                                    <p className="text-white font-semibold mb-2">Google AdSense</p>
                                    <p className="text-cyan-400 text-sm">Apply here →</p>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
