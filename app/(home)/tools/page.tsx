import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Recommended Tools - IsmailAutomation',
    description: 'A curated list of the best AI and automation tools we recommend.',
};

const tools = [
    {
        name: "Zapier",
        description: "The easiest way to automate workflows between apps. Great for beginners.",
        category: "Automation",
        link: "https://zapier.com",
        popular: true,
    },
    {
        name: "Make (Integromat)",
        description: "Visual automation platform for complex workflows and data processing.",
        category: "Automation",
        link: "https://make.com",
        popular: true,
    },
    {
        name: "ChatGPT",
        description: "Advanced AI language model for content generation, coding, and analysis.",
        category: "AI",
        link: "https://chat.openai.com",
        popular: true,
    },
    {
        name: "Airtable",
        description: "Low-code platform for building collaborative apps and databases.",
        category: "Database",
        link: "https://airtable.com",
        popular: false,
    },
    {
        name: "Notion",
        description: "All-in-one workspace for notes, docs, and project management.",
        category: "Productivity",
        link: "https://notion.so",
        popular: true,
    },
    {
        name: "Claude",
        description: "Anthropic's AI assistant, great for writing and analysis.",
        category: "AI",
        link: "https://claude.ai",
        popular: false,
    },
];

export default function ToolsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Tools We Recommend</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    We've tested hundreds of tools. These are the ones we use and trust for building automation systems.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative">
                        {tool.popular && (
                            <span className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                                POPULAR
                            </span>
                        )}
                        <div className="mb-4">
                            <span className="text-sm font-medium text-primary bg-blue-50 px-2 py-1 rounded-md">
                                {tool.category}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                        <p className="text-gray-600 mb-6">{tool.description}</p>
                        <Link
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary font-medium hover:text-blue-700"
                        >
                            Visit Website <ExternalLink className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
