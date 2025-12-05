// Blog Editor Helper Functions
export const editorHelpers = {
    // Insert text at cursor position
    insertText: (textarea: HTMLTextAreaElement, text: string, before = '', after = '') => {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const replacement = before + (selectedText || text) + after;

        textarea.setRangeText(replacement, start, end, 'select');
        textarea.focus();

        // Return new content
        return textarea.value;
    },

    // Format shortcuts
    makeBold: (textarea: HTMLTextAreaElement) => {
        return editorHelpers.insertText(textarea, 'bold text', '**', '**');
    },

    makeItalic: (textarea: HTMLTextAreaElement) => {
        return editorHelpers.insertText(textarea, 'italic text', '*', '*');
    },

    makeHeading: (textarea: HTMLTextAreaElement, level: number) => {
        const prefix = '#'.repeat(level) + ' ';
        return editorHelpers.insertText(textarea, 'Heading', prefix, '');
    },

    makeList: (textarea: HTMLTextAreaElement, ordered = false) => {
        const prefix = ordered ? '1. ' : '- ';
        return editorHelpers.insertText(textarea, 'List item', prefix, '');
    },

    makeLink: (textarea: HTMLTextAreaElement, url: string) => {
        return editorHelpers.insertText(textarea, 'link text', '[', `](${url})`);
    },

    makeImage: (textarea: HTMLTextAreaElement, url: string, alt: string) => {
        return editorHelpers.insertText(textarea, '', `![${alt}](${url})`, '');
    },

    makeCodeBlock: (textarea: HTMLTextAreaElement, language = '') => {
        return editorHelpers.insertText(textarea, 'code here', `\`\`\`${language}\n`, '\n\`\`\`');
    },

    makeQuote: (textarea: HTMLTextAreaElement) => {
        return editorHelpers.insertText(textarea, 'Quote text', '> ', '');
    },

    makeCode: (textarea: HTMLTextAreaElement) => {
        return editorHelpers.insertText(textarea, 'code', '`', '`');
    },

    makeDivider: (textarea: HTMLTextAreaElement) => {
        return editorHelpers.insertText(textarea, '', '\n---\n', '');
    },

    // Calculate read time
    calculateReadTime: (text: string): string => {
        const wordsPerMinute = 200;
        const words = text.split(/\s+/).filter(w => w.length > 0).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    },

    // Auto-save to localStorage
    autoSave: (data: any) => {
        localStorage.setItem('blogDraft', JSON.stringify({
            ...data,
            lastSaved: new Date().toISOString(),
        }));
    },

    // Load draft
    loadDraft: () => {
        const draft = localStorage.getItem('blogDraft');
        return draft ? JSON.parse(draft) : null;
    },

    // Clear draft
    clearDraft: () => {
        localStorage.removeItem('blogDraft');
    },
};
