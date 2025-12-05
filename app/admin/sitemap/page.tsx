"use client";

import { useState, useEffect } from 'react';
import { Globe, Download, RefreshCw, CheckCircle, Copy, ExternalLink } from 'lucide-react';

export default function SitemapPage() {
    const [sitemap, setSitemap] = useState('');
    const [status, setStatus] = useState<'idle' | 'generating' | 'success'>('idle');
    const [stats, setStats] = useState({ blogs: 0, tools: 0, pages: 0, total: 0 });

    useEffect(() => {
        // Calculate stats
        const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        const tools = JSON.parse(localStorage.getItem('tools') || '[]');
        const pages = 5; // Static pages (home, about, contact, etc.)

        setStats({
            blogs: blogs.length,
            tools: tools.length,
            pages: pages,
            total: blogs.length + tools.length + pages,
        });
    }, []);

    const generateSitemap = () => {
        setStatus('generating');

        const baseUrl = 'https://ismailautomation.com';
        const currentDate = new Date().toISOString().split('T')[0];

        // Get data
        const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        const tools = JSON.parse(localStorage.getItem('tools') || '[]');

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/tools</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Blog Posts -->
`;

        blogs.forEach((blog: any) => {
            xml += `  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${blog.date || currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
        });

        xml += `
  <!-- Tools -->
`;

        tools.forEach((tool: any) => {
            const slug = tool.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'tool';
            xml += `  <url>
    <loc>${baseUrl}/tools/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        });

        xml += `</urlset>`;

        setSitemap(xml);
        setStatus('success');
    };

    const downloadSitemap = () => {
        const blob = new Blob([sitemap], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        a.click();
        URL.revokeObjectURL(url);
    };

    const copySitemap = () => {
        navigator.clipboard.writeText(sitemap);
        alert('Sitemap copied to clipboard!');
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Sitemap Generator</h1>
                <p className="text-gray-400">Generate XML sitemap for search engines</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Blog Posts</span>
                        <Globe className="w-5 h-5 text-cyan-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.blogs}</p>
                </div>

                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Tools</span>
                        <Globe className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.tools}</p>
                </div>

                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Static Pages</span>
                        <Globe className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.pages}</p>
                </div>

                <div className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Total URLs</span>
                        <Globe className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
            </div>

            {/* Generator */}
            <div className="glass-effect rounded-2xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-white mb-6">Generate Sitemap</h2>

                <button
                    onClick={generateSitemap}
                    disabled={status === 'generating'}
                    className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 flex items-center gap-3"
                >
                    <RefreshCw className={`w-5 h-5 ${status === 'generating' ? 'animate-spin' : ''}`} />
                    {status === 'generating' ? 'Generating...' : 'Generate Sitemap'}
                </button>

                {status === 'success' && (
                    <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">Sitemap generated successfully!</span>
                    </div>
                )}
            </div>

            {/* Preview */}
            {sitemap && (
                <div className="glass-effect rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Preview & Download</h2>
                        <div className="flex gap-3">
                            <button
                                onClick={copySitemap}
                                className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Copy
                            </button>
                            <button
                                onClick={downloadSitemap}
                                className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>
                    </div>

                    <div className="bg-black/30 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm font-mono">{sitemap}</pre>
                    </div>

                    {/* Instructions */}
                    <div className="mt-6 p-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <h3 className="text-lg font-bold text-white mb-3">📝 Next Steps:</h3>
                        <ol className="space-y-2 text-gray-300 list-decimal list-inside">
                            <li>Download the sitemap.xml file</li>
                            <li>Upload it to your website root directory: <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">yoursite.com/sitemap.xml</code></li>
                            <li>Submit to Google Search Console: <a href="https://search.google.com/search-console" target="_blank" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">Open GSC <ExternalLink className="w-3 h-3" /></a></li>
                            <li>Submit to Bing Webmaster Tools</li>
                            <li>Update your robots.txt to include: <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">Sitemap: https://yoursite.com/sitemap.xml</code></li>
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}
