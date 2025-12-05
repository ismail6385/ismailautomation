"use client";

import { useState } from 'react';
import { Search, Code, FileText, Globe, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';

export default function SEOToolsPage() {
    const [activeTab, setActiveTab] = useState<'meta' | 'schema' | 'keywords' | 'checker'>('meta');

    // Meta Tags Generator
    const [metaTags, setMetaTags] = useState({
        title: '',
        description: '',
        keywords: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterCard: 'summary_large_image',
    });

    const generateMetaTags = () => {
        return `<!-- Primary Meta Tags -->
<title>${metaTags.title}</title>
<meta name="title" content="${metaTags.title}" />
<meta name="description" content="${metaTags.description}" />
<meta name="keywords" content="${metaTags.keywords}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${metaTags.ogTitle || metaTags.title}" />
<meta property="og:description" content="${metaTags.ogDescription || metaTags.description}" />
<meta property="og:image" content="${metaTags.ogImage}" />

<!-- Twitter -->
<meta property="twitter:card" content="${metaTags.twitterCard}" />
<meta property="twitter:title" content="${metaTags.ogTitle || metaTags.title}" />
<meta property="twitter:description" content="${metaTags.ogDescription || metaTags.description}" />
<meta property="twitter:image" content="${metaTags.ogImage}" />`;
    };

    // Schema Markup Generator
    const [schemaType, setSchemaType] = useState('Article');
    const [schemaData, setSchemaData] = useState({
        headline: '',
        author: '',
        datePublished: '',
        description: '',
        image: '',
    });

    const generateSchema = () => {
        if (schemaType === 'Article') {
            return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${schemaData.headline}",
  "author": {
    "@type": "Person",
    "name": "${schemaData.author}"
  },
  "datePublished": "${schemaData.datePublished}",
  "description": "${schemaData.description}",
  "image": "${schemaData.image}"
}
</script>`;
        } else if (schemaType === 'Organization') {
            return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "IsmailAutomation",
  "url": "https://ismailautomation.com",
  "logo": "${schemaData.image}",
  "description": "${schemaData.description}",
  "sameAs": [
    "https://facebook.com/ismailautomation",
    "https://twitter.com/ismailautomation"
  ]
}
</script>`;
        }
        return '';
    };

    // Keyword Analysis
    const [keywordText, setKeywordText] = useState('');
    const [targetKeyword, setTargetKeyword] = useState('');

    const analyzeKeywords = () => {
        const words = keywordText.toLowerCase().split(/\s+/);
        const wordCount: { [key: string]: number } = {};

        words.forEach(word => {
            if (word.length > 3) {
                wordCount[word] = (wordCount[word] || 0) + 1;
            }
        });

        const sorted = Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const density = targetKeyword ?
            ((wordCount[targetKeyword.toLowerCase()] || 0) / words.length * 100).toFixed(2) : 0;

        return { topKeywords: sorted, density };
    };

    const keywordAnalysis = analyzeKeywords();

    // SEO Checker
    const [checkUrl, setCheckUrl] = useState('');
    const [seoScore, setSeoScore] = useState<any>(null);

    const checkSEO = () => {
        // Simulate SEO check
        const score = {
            title: metaTags.title.length >= 30 && metaTags.title.length <= 60,
            description: metaTags.description.length >= 120 && metaTags.description.length <= 160,
            keywords: metaTags.keywords.split(',').length >= 3,
            ogImage: !!metaTags.ogImage,
            schema: !!schemaData.headline,
        };

        const total = Object.values(score).filter(Boolean).length;
        setSeoScore({
            score: (total / 5) * 100,
            details: score,
        });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Advanced SEO Tools</h1>
                <p className="text-gray-400">Optimize your content for search engines</p>
            </div>

            {/* Tabs */}
            <div className="glass-effect rounded-2xl p-2 mb-6 flex gap-2 overflow-x-auto">
                {[
                    { id: 'meta', label: 'Meta Tags', icon: Code },
                    { id: 'schema', label: 'Schema Markup', icon: FileText },
                    { id: 'keywords', label: 'Keywords', icon: Search },
                    { id: 'checker', label: 'SEO Checker', icon: Globe },
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === tab.id
                                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                                    : 'text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Meta Tags Generator */}
            {activeTab === 'meta' && (
                <div className="space-y-6">
                    <div className="glass-effect rounded-2xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Meta Tags Generator</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-white font-semibold mb-2">Page Title *</label>
                                <input
                                    type="text"
                                    value={metaTags.title}
                                    onChange={(e) => setMetaTags({ ...metaTags, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    placeholder="Your awesome page title"
                                />
                                <p className={`text-sm mt-1 ${metaTags.title.length >= 30 && metaTags.title.length <= 60
                                        ? 'text-green-400' : 'text-amber-400'
                                    }`}>
                                    {metaTags.title.length} / 60 characters {metaTags.title.length >= 30 && metaTags.title.length <= 60 ? '✓' : '(30-60 recommended)'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Meta Description *</label>
                                <textarea
                                    value={metaTags.description}
                                    onChange={(e) => setMetaTags({ ...metaTags, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    placeholder="Brief description of your page"
                                />
                                <p className={`text-sm mt-1 ${metaTags.description.length >= 120 && metaTags.description.length <= 160
                                        ? 'text-green-400' : 'text-amber-400'
                                    }`}>
                                    {metaTags.description.length} / 160 characters {metaTags.description.length >= 120 && metaTags.description.length <= 160 ? '✓' : '(120-160 recommended)'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Keywords (comma-separated)</label>
                                <input
                                    type="text"
                                    value={metaTags.keywords}
                                    onChange={(e) => setMetaTags({ ...metaTags, keywords: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    placeholder="automation, AI, productivity"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white font-semibold mb-2">OG Title</label>
                                    <input
                                        type="text"
                                        value={metaTags.ogTitle}
                                        onChange={(e) => setMetaTags({ ...metaTags, ogTitle: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="Leave empty to use page title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">OG Image URL</label>
                                    <input
                                        type="url"
                                        value={metaTags.ogImage}
                                        onChange={(e) => setMetaTags({ ...metaTags, ogImage: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-bold">Generated Code:</h3>
                                <button
                                    onClick={() => copyToClipboard(generateMetaTags())}
                                    className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-semibold"
                                >
                                    Copy Code
                                </button>
                            </div>
                            <pre className="p-4 rounded-lg bg-black/30 text-green-400 text-sm overflow-x-auto">
                                {generateMetaTags()}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {/* Schema Markup */}
            {activeTab === 'schema' && (
                <div className="glass-effect rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Schema Markup Generator</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-white font-semibold mb-2">Schema Type</label>
                            <select
                                value={schemaType}
                                onChange={(e) => setSchemaType(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            >
                                <option value="Article">Article</option>
                                <option value="Organization">Organization</option>
                                <option value="Product">Product</option>
                                <option value="FAQPage">FAQ Page</option>
                            </select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white font-semibold mb-2">Headline/Name</label>
                                <input
                                    type="text"
                                    value={schemaData.headline}
                                    onChange={(e) => setSchemaData({ ...schemaData, headline: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Author/Publisher</label>
                                <input
                                    type="text"
                                    value={schemaData.author}
                                    onChange={(e) => setSchemaData({ ...schemaData, author: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Date Published</label>
                                <input
                                    type="date"
                                    value={schemaData.datePublished}
                                    onChange={(e) => setSchemaData({ ...schemaData, datePublished: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Image URL</label>
                                <input
                                    type="url"
                                    value={schemaData.image}
                                    onChange={(e) => setSchemaData({ ...schemaData, image: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Description</label>
                            <textarea
                                value={schemaData.description}
                                onChange={(e) => setSchemaData({ ...schemaData, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                            />
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-bold">Generated Schema:</h3>
                                <button
                                    onClick={() => copyToClipboard(generateSchema())}
                                    className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-semibold"
                                >
                                    Copy Code
                                </button>
                            </div>
                            <pre className="p-4 rounded-lg bg-black/30 text-green-400 text-sm overflow-x-auto">
                                {generateSchema()}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {/* Keywords Analysis */}
            {activeTab === 'keywords' && (
                <div className="glass-effect rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Keyword Analysis</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-white font-semibold mb-2">Target Keyword</label>
                            <input
                                type="text"
                                value={targetKeyword}
                                onChange={(e) => setTargetKeyword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="automation"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Content to Analyze</label>
                            <textarea
                                value={keywordText}
                                onChange={(e) => setKeywordText(e.target.value)}
                                rows={10}
                                className="w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                placeholder="Paste your blog content here..."
                            />
                            <p className="text-gray-400 text-sm mt-1">
                                Word count: {keywordText.split(/\s+/).filter(w => w.length > 0).length}
                            </p>
                        </div>

                        {keywordText && (
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="p-6 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                                    <h3 className="text-cyan-400 font-bold mb-4">Top Keywords</h3>
                                    <div className="space-y-2">
                                        {keywordAnalysis.topKeywords.map(([word, count], index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="text-white">{index + 1}. {word}</span>
                                                <span className="text-cyan-400 font-bold">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {targetKeyword && (
                                    <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                        <h3 className="text-purple-400 font-bold mb-4">Keyword Density</h3>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-white mb-2">{keywordAnalysis.density}%</p>
                                            <p className="text-gray-400">"{targetKeyword}"</p>
                                            <p className={`mt-4 text-sm ${parseFloat(keywordAnalysis.density.toString()) >= 1 && parseFloat(keywordAnalysis.density.toString()) <= 3
                                                    ? 'text-green-400' : 'text-amber-400'
                                                }`}>
                                                {parseFloat(keywordAnalysis.density.toString()) >= 1 && parseFloat(keywordAnalysis.density.toString()) <= 3
                                                    ? '✓ Optimal density (1-3%)' : '⚠ Recommended: 1-3%'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* SEO Checker */}
            {activeTab === 'checker' && (
                <div className="glass-effect rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">SEO Checker</h2>

                    <div className="space-y-6">
                        <button
                            onClick={checkSEO}
                            className="w-full px-6 py-4 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50"
                        >
                            Run SEO Check
                        </button>

                        {seoScore && (
                            <div>
                                <div className="text-center mb-6">
                                    <div className={`inline-block p-6 rounded-full ${seoScore.score >= 80 ? 'bg-green-500/20' :
                                            seoScore.score >= 60 ? 'bg-amber-500/20' :
                                                'bg-red-500/20'
                                        }`}>
                                        <p className={`text-5xl font-bold ${seoScore.score >= 80 ? 'text-green-400' :
                                                seoScore.score >= 60 ? 'text-amber-400' :
                                                    'text-red-400'
                                            }`}>
                                            {seoScore.score}%
                                        </p>
                                    </div>
                                    <p className="text-white font-bold text-xl mt-4">SEO Score</p>
                                </div>

                                <div className="space-y-3">
                                    {Object.entries(seoScore.details).map(([key, value]) => (
                                        <div key={key} className={`p-4 rounded-lg flex items-center gap-3 ${value ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
                                            }`}>
                                            {value ? (
                                                <Check className="w-5 h-5 text-green-400" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 text-red-400" />
                                            )}
                                            <span className={value ? 'text-green-400' : 'text-red-400'}>
                                                {key.charAt(0).toUpperCase() + key.slice(1)}: {value ? 'Good' : 'Needs improvement'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* SEO Tips */}
            <div className="mt-6 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">🎯 SEO Best Practices</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• Title: 30-60 characters, include target keyword</li>
                    <li>• Meta description: 120-160 characters, compelling CTA</li>
                    <li>• Use Schema markup for better search appearance</li>
                    <li>• Keyword density: 1-3% is optimal</li>
                    <li>• Include OG tags for social media sharing</li>
                    <li>• Use descriptive alt text for all images</li>
                    <li>• Create XML sitemap and submit to Google</li>
                    <li>• Optimize page loading speed</li>
                </ul>
            </div>
        </div>
    );
}
