import {
    Bold, Italic, Heading1, Heading2, Heading3,
    List, ListOrdered, Link, Image, Code, Quote,
    Minus, Eye, Save, Type
} from 'lucide-react';

interface EditorToolbarProps {
    onFormat: (action: string, value?: string) => void;
    onSave: () => void;
    onPreview: () => void;
}

export default function EditorToolbar({ onFormat, onSave, onPreview }: EditorToolbarProps) {
    const tools = [
        { icon: Bold, label: 'Bold', action: 'bold', shortcut: '**text**' },
        { icon: Italic, label: 'Italic', action: 'italic', shortcut: '*text*' },
        { icon: Heading1, label: 'H1', action: 'h1', shortcut: '# ' },
        { icon: Heading2, label: 'H2', action: 'h2', shortcut: '## ' },
        { icon: Heading3, label: 'H3', action: 'h3', shortcut: '### ' },
        { icon: List, label: 'Bullet List', action: 'list', shortcut: '- ' },
        { icon: ListOrdered, label: 'Numbered List', action: 'ordered-list', shortcut: '1. ' },
        { icon: Link, label: 'Link', action: 'link', shortcut: '[text](url)' },
        { icon: Image, label: 'Image', action: 'image', shortcut: '![alt](url)' },
        { icon: Code, label: 'Code', action: 'code', shortcut: '`code`' },
        { icon: Type, label: 'Code Block', action: 'codeblock', shortcut: '```' },
        { icon: Quote, label: 'Quote', action: 'quote', shortcut: '> ' },
        { icon: Minus, label: 'Divider', action: 'divider', shortcut: '---' },
    ];

    return (
        <div className="glass-effect rounded-lg p-3 mb-4 sticky top-0 z-10">
            <div className="flex flex-wrap items-center gap-2">
                {/* Formatting Tools */}
                <div className="flex items-center gap-1 border-r border-white/10 pr-2">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <button
                                key={tool.action}
                                onClick={() => onFormat(tool.action)}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors group relative"
                                title={`${tool.label} (${tool.shortcut})`}
                            >
                                <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {tool.label}
                                    <div className="text-gray-400">{tool.shortcut}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-auto">
                    <button
                        onClick={onPreview}
                        className="px-4 py-2 rounded-lg glass-effect text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-semibold"
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors flex items-center gap-2 text-sm font-semibold shadow-lg shadow-cyan-500/30"
                    >
                        <Save className="w-4 h-4" />
                        Save
                    </button>
                </div>
            </div>

            {/* Markdown Quick Reference */}
            <div className="mt-3 pt-3 border-t border-white/10">
                <details>
                    <summary className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                        📝 Markdown Cheatsheet
                    </summary>
                    <div className="mt-2 grid md:grid-cols-3 gap-2 text-xs">
                        <div>
                            <p className="text-gray-500 mb-1">Text Formatting:</p>
                            <code className="text-cyan-400">**bold**</code><br />
                            <code className="text-cyan-400">*italic*</code><br />
                            <code className="text-cyan-400">`code`</code>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Headings:</p>
                            <code className="text-cyan-400"># H1</code><br />
                            <code className="text-cyan-400">## H2</code><br />
                            <code className="text-cyan-400">### H3</code>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Links & Images:</p>
                            <code className="text-cyan-400">[text](url)</code><br />
                            <code className="text-cyan-400">![alt](url)</code>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
}
