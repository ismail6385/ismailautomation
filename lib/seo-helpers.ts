// Advanced SEO Helper Functions

// Detect FAQs from markdown content
export const detectFAQs = (content: string): Array<{ question: string; answer: string }> => {
    const faqs: Array<{ question: string; answer: string }> = [];

    // Method 1: Detect FAQ section with Q&A format
    const faqSection = content.match(/#{1,3}\s*(?:FAQ|Frequently Asked Questions|Common Questions)[\s\S]*?(?=#{1,2}\s|$)/i);

    if (faqSection) {
        const section = faqSection[0];

        // Pattern 1: **Q: Question** followed by answer
        const qaPairs = section.match(/\*\*Q:?\s*(.+?)\*\*\s*\n\s*(.+?)(?=\n\*\*Q:|$)/gi);
        if (qaPairs) {
            qaPairs.forEach(pair => {
                const match = pair.match(/\*\*Q:?\s*(.+?)\*\*\s*\n\s*(.+)/i);
                if (match) {
                    faqs.push({
                        question: match[1].trim(),
                        answer: match[2].trim().replace(/\n+/g, ' ')
                    });
                }
            });
        }

        // Pattern 2: ## Question followed by answer
        if (faqs.length === 0) {
            const headingQA = section.match(/#{3,4}\s+(.+?)\n+([\s\S]+?)(?=#{3,4}\s|$)/g);
            if (headingQA) {
                headingQA.forEach(pair => {
                    const match = pair.match(/#{3,4}\s+(.+?)\n+([\s\S]+)/);
                    if (match) {
                        const question = match[1].trim();
                        const answer = match[2].trim().replace(/\n+/g, ' ');
                        // Only include if it looks like a question
                        if (question.includes('?') || question.toLowerCase().startsWith('how') ||
                            question.toLowerCase().startsWith('what') || question.toLowerCase().startsWith('why') ||
                            question.toLowerCase().startsWith('when') || question.toLowerCase().startsWith('where')) {
                            faqs.push({ question, answer });
                        }
                    }
                });
            }
        }
    }

    // Method 2: Detect any questions in content with answers
    if (faqs.length === 0) {
        const allQuestions = content.match(/#{3,4}\s+(.+?\?)\n+([\s\S]+?)(?=#{2,4}\s|$)/g);
        if (allQuestions) {
            allQuestions.slice(0, 10).forEach(qa => {
                const match = qa.match(/#{3,4}\s+(.+?\?)\n+([\s\S]+)/);
                if (match) {
                    faqs.push({
                        question: match[1].trim(),
                        answer: match[2].trim().replace(/\n+/g, ' ').substring(0, 500)
                    });
                }
            });
        }
    }

    return faqs;
};

// Generate Complete Schema with Auto FAQ Detection
export const generateCompleteSchema = (blogData: any): string => {
    const faqs = detectFAQs(blogData.content || '');
    const schemas = [];

    // 1. Article Schema (Main)
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogData.title || "Article Title",
        "description": blogData.description || "Article description",
        "image": blogData.image || "https://yourdomain.com/default-image.jpg",
        "author": {
            "@type": "Person",
            "name": blogData.author || "IsmailAutomation",
            "url": "https://yourdomain.com/about"
        },
        "publisher": {
            "@type": "Organization",
            "name": "IsmailAutomation",
            "logo": {
                "@type": "ImageObject",
                "url": "https://yourdomain.com/logo.png"
            }
        },
        "datePublished": blogData.date || new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://yourdomain.com/blog/${blogData.slug || 'slug'}`
        },
        "keywords": blogData.tags || "",
        "articleSection": blogData.category || "Automation",
        "wordCount": blogData.content ? blogData.content.split(/\s+/).length : 0
    };

    schemas.push(articleSchema);

    // 2. FAQPage Schema (Auto-generated if FAQs detected)
    if (faqs.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        schemas.push(faqSchema);
    }

    // 3. Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://yourdomain.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://yourdomain.com/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": blogData.category || "Category",
                "item": `https://yourdomain.com/blog/category/${(blogData.category || 'category').toLowerCase().replace(/\s+/g, '-')}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": blogData.title || "Article",
                "item": `https://yourdomain.com/blog/${blogData.slug || 'slug'}`
            }
        ]
    };

    schemas.push(breadcrumbSchema);

    // Return all schemas as script tags
    return schemas.map(schema =>
        `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
    ).join('\n\n');
};

// Calculate Readability Score (Flesch Reading Ease)
export const calculateReadability = (text: string): number => {
    if (!text || text.length < 100) return 0;

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const syllables = words * 1.5; // Approximate

    if (sentences === 0 || words === 0) return 0;

    const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    return Math.max(0, Math.min(100, Math.round(score)));
};

// Generate Schema Markup (JSON-LD) - Legacy function, use generateCompleteSchema instead
export const generateSchemaMarkup = (blogData: any): string => {
    return generateCompleteSchema(blogData);
};

// Generate Open Graph & Twitter Card Meta Tags
export const generateMetaTags = (blogData: any): string => {
    return `<!-- Open Graph / Facebook -->
<meta property="og:type" content="article" />
<meta property="og:title" content="${blogData.title || 'Your Title'}" />
<meta property="og:description" content="${blogData.description || 'Your description'}" />
<meta property="og:url" content="https://yourdomain.com/blog/${blogData.slug || 'slug'}" />
<meta property="og:site_name" content="IsmailAutomation" />
<meta property="article:published_time" content="${new Date().toISOString()}" />
<meta property="article:author" content="${blogData.author}" />
<meta property="article:section" content="${blogData.category || 'Automation'}" />
<meta property="article:tag" content="${blogData.tags || ''}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${blogData.title || 'Your Title'}" />
<meta name="twitter:description" content="${blogData.description || 'Your description'}" />`;
};

// Analyze Content Structure for SEO
export const analyzeContentStructure = (content: string) => {
    const issues: string[] = [];

    // Check for images
    const imageCount = (content.match(/!\[.*?\]\(.*?\)/g) || []).length;
    if (imageCount === 0) issues.push('Add images to improve engagement and SEO');
    if (imageCount < 3) issues.push('Add more images (recommended: 5-10)');

    // Check for lists
    const listCount = (content.match(/^[-*+] /gm) || []).length;
    if (listCount < 5) issues.push('Add bullet/numbered lists for better readability');

    // Check for code blocks
    const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;

    // Check for external links
    const externalLinks = (content.match(/\[.*?\]\(http.*?\)/g) || []).length;
    if (externalLinks < 1) issues.push('Add 1-2 external authoritative links');

    // Check for bold/italics
    const boldCount = (content.match(/\*\*.*?\*\*/g) || []).length;
    if (boldCount < 5) issues.push('Use **bold** to highlight 5-10 important points');

    // Check for italics
    const italicsCount = (content.match(/\*[^*]+\*/g) || []).length;

    // Check paragraph length
    const paragraphs = content.split(/\n\n+/);
    const longParagraphs = paragraphs.filter(p => p.split(/\s+/).length > 100).length;
    if (longParagraphs > 3) issues.push('Break long paragraphs (max 100 words each)');

    // Check for questions (engagement)
    const questions = (content.match(/\?/g) || []).length;
    if (questions < 3) issues.push('Ask 3-5 questions to engage readers');

    // Check for quotes/blockquotes
    const quotes = (content.match(/^> /gm) || []).length;

    return {
        images: imageCount,
        lists: listCount,
        codeBlocks,
        externalLinks,
        bold: boldCount,
        italics: italicsCount,
        questions,
        quotes,
        longParagraphs,
        totalParagraphs: paragraphs.length,
        issues
    };
};

// Calculate Content Density Score
export const calculateContentDensity = (content: string, keyword: string): number => {
    if (!content || !keyword) return 0;

    const words = content.split(/\s+/).filter(w => w.length > 0);
    const keywordOccurrences = content.toLowerCase().split(keyword.toLowerCase()).length - 1;

    const density = (keywordOccurrences / words.length) * 100;
    return Math.round(density * 100) / 100; // 2 decimal places
};

// Generate LSI Keywords Suggestions
export const suggestLSIKeywords = (mainKeyword: string): string[] => {
    const lsiMap: { [key: string]: string[] } = {
        'automation': ['workflow automation', 'task automation', 'process automation', 'automated systems', 'automation tools'],
        'zapier': ['zap', 'workflow', 'integration', 'no-code automation', 'app integration'],
        'python': ['python script', 'python programming', 'python code', 'python automation', 'python tutorial'],
        'api': ['API integration', 'REST API', 'API endpoint', 'API documentation', 'web API'],
        'tutorial': ['guide', 'step-by-step', 'how-to', 'beginner tutorial', 'complete guide'],
    };

    const keyword = mainKeyword.toLowerCase();
    for (const [key, suggestions] of Object.entries(lsiMap)) {
        if (keyword.includes(key)) {
            return suggestions;
        }
    }

    return ['Related keywords will appear here based on your focus keyword'];
};

// Check for Mobile Friendliness Issues
export const checkMobileFriendliness = (content: string) => {
    const issues: string[] = [];

    // Check sentence length
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const longSentences = sentences.filter(s => s.split(/\s+/).length > 25).length;
    if (longSentences > 5) issues.push('Shorten sentences for mobile readers (max 25 words)');

    // Check for very long words
    const words = content.split(/\s+/);
    const longWords = words.filter(w => w.length > 15).length;
    if (longWords > 10) issues.push('Consider breaking down complex technical terms');

    return {
        longSentences,
        longWords,
        issues
    };
};
