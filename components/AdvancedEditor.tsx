"use client";

import { useState, useEffect, useRef } from 'react';
import {
    Save, Upload, Download, Search, Replace, Eye, EyeOff,
    Maximize2, Minimize2, Copy, FileText, Clock, BarChart,
    Sparkles, Table, CheckSquare, Lightbulb, Image as ImageIcon
} from 'lucide-react';
import MediaPicker from './MediaPicker';

interface AdvancedEditorProps {
    content: string;
    onChange: (content: string) => void;
    onSave: () => void;
}

export default function AdvancedEditor({ content, onChange, onSave }: AdvancedEditorProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showFindReplace, setShowFindReplace] = useState(false);
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
    const [lastSaved, setLastSaved] = useState<string>('');
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-save every 30 seconds
    useEffect(() => {
        if (!autoSaveEnabled) return;

        const timer = setTimeout(() => {
            localStorage.setItem('blogDraft', JSON.stringify({
                content,
                timestamp: new Date().toISOString(),
            }));
            setLastSaved(new Date().toLocaleTimeString());
        }, 30000);

        return () => clearTimeout(timer);
    }, [content, autoSaveEnabled]);

    // Load draft on mount
    useEffect(() => {
        const draft = localStorage.getItem('blogDraft');
        if (draft) {
            const parsed = JSON.parse(draft);
            if (confirm('Load previous draft?')) {
                onChange(parsed.content);
            }
        }
    }, []);

    // Analytics
    const words = content.split(/\s+/).filter(w => w.length > 0).length;
    const characters = content.length;
    const charactersNoSpaces = content.replace(/\s/g, '').length;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200);

    // Readability Score (Flesch Reading Ease approximation)
    const avgWordsPerSentence = sentences > 0 ? words / sentences : 0;
    const avgSyllablesPerWord = 1.5; // Simplified
    const readabilityScore = sentences > 0
        ? Math.max(0, Math.min(100, 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)))
        : 0;

    // Find & Replace
    const handleFind = () => {
        if (!findText) return;
        const textarea = textareaRef.current;
        if (!textarea) return;

        const index = textarea.value.toLowerCase().indexOf(findText.toLowerCase(), textarea.selectionStart);
        if (index !== -1) {
            textarea.setSelectionRange(index, index + findText.length);
            textarea.focus();
        } else {
            alert('No more matches found');
        }
    };

    const handleReplaceAll = () => {
        if (!findText) return;
        const regex = new RegExp(findText, 'gi');
        const newContent = content.replace(regex, replaceText);
        onChange(newContent);
        alert(`Replaced ${(content.match(regex) || []).length} occurrences`);
    };

    // Insert functions
    const insertText = (text: string) => {
        const textarea = textareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newContent = content.substring(0, start) + text + content.substring(end);
            onChange(newContent);

            // Restore cursor
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start + text.length, start + text.length);
            }, 0);
        }
    };

    const insertTable = () => {
        const rows = prompt('Number of rows:', '3');
        const cols = prompt('Number of columns:', '3');
        if (!rows || !cols) return;

        let table = '\n| ';
        for (let i = 0; i < parseInt(cols); i++) {
            table += 'Header ' + (i + 1) + ' | ';
        }
        table += '\n| ';
        for (let i = 0; i < parseInt(cols); i++) {
            table += '--- | ';
        }
        for (let r = 0; r < parseInt(rows); r++) {
            table += '\n| ';
            for (let c = 0; c < parseInt(cols); c++) {
                table += 'Cell | ';
            }
        }
        table += '\n';
        insertText(table);
    };

    const insertTOC = () => {
        const headings = content.match(/^#{1,3}\s.+$/gm) || [];
        if (headings.length === 0) {
            alert('No headings found in content');
            return;
        }

        let toc = '\n## Table of Contents\n\n';
        headings.forEach(heading => {
            const level = heading.match(/^#+/)?.[0].length || 1;
            const text = heading.replace(/^#+\s/, '');
            const link = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            toc += '  '.repeat(level - 1) + `- [${text}](#${link})\n`;
        });
        toc += '\n';

        onChange(toc + content);
    };

    const insertTaskList = () => {
        const tasks = '\n- [ ] Task 1\n- [ ] Task 2\n- [ ] Task 3\n';
        insertText(tasks);
    };

    const handleImageInsert = (url: string, alt: string) => {
        const markdown = `![${alt}](${url})`;
        insertText(markdown);
    };

    // Export
    const exportMarkdown = () => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blog-post.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportHTML = () => {
        // Simple markdown to HTML conversion
        let html = content
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code>$1</code>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^/g, '<p>')
            .replace(/$/g, '</p>');

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blog-post.html';
        a.click();
        URL.revokeObjectURL(url);
    };

    // AI Suggestions (Simulated)
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const generateSuggestions = () => {
        const sampleSuggestions = [
            'Add more examples to illustrate your points',
            'Include statistics or data to support claims',
            'Break long paragraphs into shorter ones',
            'Add subheadings to improve readability',
            'Include actionable takeaways for readers',
            'Add images or diagrams to visualize concepts',
        ];
        setSuggestions(sampleSuggestions.sort(() => 0.5 - Math.random()).slice(0, 3));
    };

    return (
        <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : ''}`}>

            <MediaPicker
                isOpen={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleImageInsert}
            />

            <div className={`${isFullscreen ? 'h-screen p-4' : ''}`}>
                {/* Advanced Toolbar */}
                <div className="glass-effect rounded-lg p-3 mb-2 sticky top-0 z-20">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        {/* Left: Main Tools */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <button
                                onClick={() => setShowFindReplace(!showFindReplace)}
                                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white text-sm flex items-center gap-2"
                                title="Find & Replace"
                            >
                                <Search className="w-4 h-4" />
                                Find
                            </button>

                            <button
                                onClick={() => setShowMediaPicker(true)}
                                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white text-sm flex items-center gap-2"
                                title="Insert Image"
                            >
                                <ImageIcon className="w-4 h-4" />
                                Image
                            </button>

                            <button
                                onClick={insertTable}
                                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white text-sm flex items-center gap-2"
                                title="Insert Table"
                            >
                                <Table className="w-4 h-4" />
                                Table
                            </button>

                            <button
                                onClick={insertTOC}
                                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white text-sm flex items-center gap-2"
                                title="Table of Contents"
                            >
                                <FileText className="w-4 h-4" />
                                TOC
                            </button>

                            <button
                                onClick={insertTaskList}
                                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white text-sm flex items-center gap-2"
                                title="Task List"
                            >
                                <CheckSquare className="w-4 h-4" />
                                Tasks
                            </button>

                            <button
                                onClick={generateSuggestions}
                                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white text-sm flex items-center gap-2"
                                title="AI Suggestions"
                            >
                                <Sparkles className="w-4 h-4" />
                                Suggest
                            </button>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white text-sm flex items-center gap-2"
                            >
                                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                Preview
                            </button>

                            <div className="relative group">
                                <button className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white text-sm flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Export
                                </button>
                                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    <button onClick={exportMarkdown} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-white">Markdown (.md)</button>
                                    <button onClick={exportHTML} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-white">HTML (.html)</button>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white text-sm"
                                title="Fullscreen"
                            >
                                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>

                            <button
                                onClick={onSave}
                                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Auto-save indicator */}
                    {autoSaveEnabled && lastSaved && (
                        <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            Auto-saved at {lastSaved}
                        </div>
                    )}
                </div>

                {/* Find & Replace Panel */}
                {showFindReplace && (
                    <div className="glass-effect rounded-lg p-4 mb-2">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Find:</label>
                                <input
                                    type="text"
                                    value={findText}
                                    onChange={(e) => setFindText(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none text-sm"
                                    placeholder="Search text..."
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Replace with:</label>
                                <input
                                    type="text"
                                    value={replaceText}
                                    onChange={(e) => setReplaceText(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none text-sm"
                                    placeholder="Replace text..."
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button onClick={handleFind} className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 text-sm font-semibold">Find Next</button>
                            <button onClick={handleReplaceAll} className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 text-sm font-semibold">Replace All</button>
                        </div>
                    </div>
                )}

                {/* AI Suggestions */}
                {suggestions.length > 0 && (
                    <div className="glass-effect rounded-lg p-4 mb-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-5 h-5 text-purple-400" />
                            <h3 className="font-semibold text-white">AI Suggestions</h3>
                        </div>
                        <ul className="space-y-2">
                            {suggestions.map((suggestion, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                    <span className="text-purple-400">•</span>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Editor Grid */}
                <div className={`grid ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-4`}>
                    {/* Editor */}
                    <div>
                        <textarea
                            ref={textareaRef}
                            value={content}
                            onChange={(e) => onChange(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none font-mono text-sm ${isFullscreen ? 'h-[calc(100vh-280px)]' : 'h-96'
                                }`}
                            placeholder="Start writing your amazing content..."
                        />

                        {/* Analytics Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-3">
                            <div className="glass-effect rounded-lg p-2 text-center">
                                <p className="text-xs text-gray-400">Words</p>
                                <p className="text-lg font-bold text-cyan-400">{words}</p>
                            </div>
                            <div className="glass-effect rounded-lg p-2 text-center">
                                <p className="text-xs text-gray-400">Characters</p>
                                <p className="text-lg font-bold text-purple-400">{characters}</p>
                            </div>
                            <div className="glass-effect rounded-lg p-2 text-center">
                                <p className="text-xs text-gray-400">Sentences</p>
                                <p className="text-lg font-bold text-green-400">{sentences}</p>
                            </div>
                            <div className="glass-effect rounded-lg p-2 text-center">
                                <p className="text-xs text-gray-400">Paragraphs</p>
                                <p className="text-lg font-bold text-amber-400">{paragraphs}</p>
                            </div>
                            <div className="glass-effect rounded-lg p-2 text-center">
                                <p className="text-xs text-gray-400">Read Time</p>
                                <p className="text-lg font-bold text-pink-400">{readingTime}m</p>
                            </div>
                            <div className="glass-effect rounded-lg p-2 text-center">
                                <p className="text-xs text-gray-400">Readability</p>
                                <p className={`text-lg font-bold ${readabilityScore >= 60 ? 'text-green-400' :
                                    readabilityScore >= 40 ? 'text-amber-400' :
                                        'text-red-400'
                                    }`}>
                                    {readabilityScore.toFixed(0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    {showPreview && (
                        <div className={`glass-effect rounded-lg p-6 overflow-auto ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-96'
                            }`}>
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                Preview
                            </h3>
                            <div className="prose prose-invert max-w-none">
                                <div dangerouslySetInnerHTML={{
                                    __html: content
                                        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                                        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                                        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/\*(.+?)\*/g, '<em>$1</em>')
                                        .replace(/`(.+?)`/g, '<code class="bg-gray-800 px-2 py-1 rounded">$1</code>')
                                        .replace(/\n/g, '<br/>')
                                }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
