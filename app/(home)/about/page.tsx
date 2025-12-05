import { Metadata } from 'next';
import { Sparkles, Target, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us - IsmailAutomation',
    description: 'Learn about IsmailAutomation - your trusted source for learning No-Code and Code-based automation. Discover our mission to make automation accessible to everyone.',
    keywords: ['about ismailautomation', 'automation expert', 'automation teacher', 'learn automation'],
};

export default function AboutPage() {
    return (
        <div className="min-h-screen py-20">
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-gray-300">About IsmailAutomation</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                    Making Automation <span className="text-cyan-400">Accessible</span> to Everyone
                </h1>

                <p className="text-xl text-gray-400 leading-relaxed">
                    We believe automation shouldn't be complicated. Whether you're a complete beginner or an experienced developer,
                    we're here to help you automate your workflows and boost your productivity.
                </p>
            </section>

            {/* Mission Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Our <span className="text-cyan-400">Mission</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            At IsmailAutomation, our mission is to empower individuals and businesses to save time,
                            reduce manual work, and focus on what truly matters by teaching practical automation skills.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            We provide step-by-step tutorials, real-world examples, and comprehensive guides that make
                            automation easy to understand and implement - whether you prefer No-Code tools or want to
                            dive into Python and APIs.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { icon: Target, title: "Clear Goals", desc: "Focused on practical, actionable automation" },
                            { icon: Users, title: "Community", desc: "Growing community of automation enthusiasts" },
                            { icon: Zap, title: "Fast Results", desc: "See results from day one" },
                            { icon: Sparkles, title: "Quality Content", desc: "Well-researched, tested tutorials" },
                        ].map((item, i) => (
                            <div key={i} className="glass-effect rounded-xl p-6 hover-lift">
                                <item.icon className="w-8 h-8 text-cyan-400 mb-3" />
                                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Teach Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        What We <span className="text-cyan-400">Teach</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        From beginner-friendly No-Code tools to advanced Python automation and AI integration
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "No-Code Automation",
                            desc: "Master Zapier, Make, n8n, and other visual automation tools without writing a single line of code.",
                            topics: ["Zapier Workflows", "Make.com Integration", "n8n Automation", "Airtable & Notion"]
                        },
                        {
                            title: "Python Automation",
                            desc: "Learn Python scripting for web scraping, Excel automation, email handling, and more.",
                            topics: ["Web Scraping", "Excel Automation", "Email Scripts", "File Management"]
                        },
                        {
                            title: "API & AI Integration",
                            desc: "Connect apps with APIs, build chatbots, and leverage AI for powerful automation.",
                            topics: ["REST APIs", "WhatsApp Bots", "ChatGPT Integration", "Webhook Automation"]
                        },
                    ].map((category, i) => (
                        <div key={i} className="glass-effect rounded-2xl p-8 hover-lift">
                            <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">{category.desc}</p>
                            <ul className="space-y-2">
                                {category.topics.map((topic, j) => (
                                    <li key={j} className="flex items-center gap-2 text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="glass-effect rounded-3xl p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                        Why Choose <span className="text-cyan-400">IsmailAutomation</span>?
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                title: "Beginner-Friendly Approach",
                                desc: "We break down complex automation concepts into simple, easy-to-follow steps. No prior experience needed!"
                            },
                            {
                                title: "Real-World Examples",
                                desc: "Every tutorial includes practical examples you can implement immediately in your daily work or business."
                            },
                            {
                                title: "Step-by-Step Guides",
                                desc: "Detailed screenshots, code examples, and video tutorials ensure you never get stuck."
                            },
                            {
                                title: "Free & Accessible",
                                desc: "All our tutorials are completely free. We believe automation knowledge should be accessible to everyone."
                            },
                            {
                                title: "Regular Updates",
                                desc: "New tutorials published weekly covering the latest automation tools and techniques."
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <span className="text-cyan-400 font-bold">{i + 1}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="glass-effect rounded-3xl p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Start Your Automation Journey?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join thousands of learners automating their workflows and saving hours every week.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/blog"
                            className="px-8 py-4 rounded-full font-bold text-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50"
                        >
                            Browse Tutorials
                        </a>
                        <a
                            href="/contact"
                            className="px-8 py-4 rounded-full font-bold text-lg glass-effect text-white hover:bg-white/10 transition-all"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
