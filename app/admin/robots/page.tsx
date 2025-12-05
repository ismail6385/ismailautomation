"use client";

import { useState } from 'react';
import { Bot, Save, Download, Copy, CheckCircle, FileText } from 'lucide-react';

export default function RobotsPage() {
    const [content, setContent] = useState(`# robots.txt for IsmailAutomation.com

User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin/
Disallow: /api/

# Allow crawling of public content
Allow: /blog/
Allow: /tools/

# Sitemap
Sitemap: https://ismailautomation.com/sitemap.xml

# Crawl-delay (optional)
# Crawl-delay: 10
`);

    const [saved, setSaved] = useState(false);

    const presets = {
        allowAll: `User-agent: *
Allow: /
Sitemap: https://ismailautomation.com/sitemap.xml`,

        blockAdmin: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://ismailautomation.com/sitemap.xml`,

        blockAll: `User-agent: *
Disallow: /`,

        advanced: `# Advanced robots.txt

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /*.json$
Disallow: /*?

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Block bad bots
User-agent: BadBot
Disallow: /

# Sitemap
Sitemap: https://ismailautomation.com/sitemap.xml

# Crawl-delay
Crawl-delay: 10`,
    };

    const handleSave = () => {
        localStorage.setItem('robotsTxt', content);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'robots.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        alert('Copied to clipboard!');
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Robots.txt Manager</h1>
                <p className="text-gray-400">Control how search engines crawl your website</p>
            </div>

            {/* Quick Presets */}
            <div className="glass-effect rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Quick Presets</h2>
                <div className="grid md:grid-cols-4 gap-3">
                    <button
                        onClick={() => setContent(presets.allowAll)}
                        className="px-4 py-3 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors font-semibold text-sm"
                    >
                        Allow All
                    </button>
                    <button
                        onClick={() => setContent(presets.blockAdmin)}
                        className="px-4 py-3 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-semibold text-sm"
                    >
                        Block Admin Only
                    </button>
                    <button
                        onClick={() => setContent(presets.blockAll)}
                        className="px-4 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-semibold text-sm"
                    >
                        Block All
                    </button>
                    <button
                        onClick={() => setContent(presets.advanced)}
                        className="px-4 py-3 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors font-semibold text-sm"
                    >
                        Advanced
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div className="glass-effect rounded-2xl p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Bot className="w-6 h-6 text-cyan-400" />
                        robots.txt Editor
                    </h2>
                    <div className="flex gap-3">
                        <button
                            onClick={handleCopy}
                            className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors font-semibold flex items-center gap-2"
                        >
                            <Copy className="w-4 h-4" />
                            Copy
                        </button>
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors font-semibold flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors font-semibold flex items-center gap-2"
                        >
                            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                            {saved ? 'Saved!' : 'Save'}
                        </button>
                    </div>
                </div>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-96 px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                    placeholder="Enter robots.txt content..."
                />
            </div>

            {/* Documentation */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Common Directives */}
                <div className="glass-effect rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-cyan-400" />
                        Common Directives
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div>
                            <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">User-agent: *</code>
                            <p className="text-gray-400 mt-1">Applies to all bots</p>
                        </div>
                        <div>
                            <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">Allow: /</code>
                            <p className="text-gray-400 mt-1">Allow crawling all pages</p>
                        </div>
                        <div>
                            <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">Disallow: /admin/</code>
                            <p className="text-gray-400 mt-1">Block admin directory</p>
                        </div>
                        <div>
                            <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">Sitemap: URL</code>
                            <p className="text-gray-400 mt-1">Link to sitemap.xml</p>
                        </div>
                        <div>
                            <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">Crawl-delay: 10</code>
                            <p className="text-gray-400 mt-1">Delay between requests (seconds)</p>
                        </div>
                    </div>
                </div>

                {/* Best Practices */}
                <div className="glass-effect rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">📋 Best Practices</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Always include your sitemap URL</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Block admin and private areas</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Use comments (#) for documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Test in Google Search Console</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Keep it simple and clean</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-400 mt-1">⚠</span>
                            <span>Don't block pages you want indexed</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">📝 Deployment Instructions:</h3>
                <ol className="space-y-2 text-gray-300 list-decimal list-inside">
                    <li>Download the robots.txt file using the button above</li>
                    <li>Upload it to your website root directory: <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">yoursite.com/robots.txt</code></li>
                    <li>Verify it's accessible by visiting: <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">https://yoursite.com/robots.txt</code></li>
                    <li>Test in <a href="https://www.google.com/webmasters/tools/robots-testing-tool" target="_blank" className="text-cyan-400 hover:text-cyan-300">Google's robots.txt Tester</a></li>
                </ol>
            </div>
        </div>
    );
}
