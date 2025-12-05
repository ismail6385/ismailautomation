import Link from 'next/link';
import { ArrowRight, Code2, Zap, Workflow, Blocks, GitBranch, Terminal, Sparkles, Rocket, TrendingUp, Users } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col gap-0 overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8 animate-in fade-in slide-in-from-top duration-700">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-gray-300">No Code & Code Automation Mastery</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight animate-in fade-in slide-in-from-bottom duration-1000">
                        Automate <span className="gradient-text">Everything</span>
                        <br />
                        <span className="text-white">With or Without Code</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000" style={{ animationDelay: '200ms' }}>
                        Master both No-Code platforms and Code-based automation. Build powerful workflows, integrate APIs, and automate your entire business.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom duration-1000" style={{ animationDelay: '400ms' }}>
                        <Link
                            href="/blog"
                            className="group px-8 py-4 rounded-full font-bold text-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Start Learning
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                        <Link
                            href="/tools"
                            className="px-8 py-4 rounded-full font-bold text-lg glass-effect text-white hover:bg-white/10 transition-all hover-lift"
                        >
                            Explore Tools
                        </Link>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-4xl mx-auto">
                        {[
                            { icon: Users, label: "Automation Experts", value: "10K+" },
                            { icon: Rocket, label: "Workflows Created", value: "50K+" },
                            { icon: TrendingUp, label: "Time Saved Daily", value: "1000h+" },
                        ].map((stat, index) => (
                            <div key={index} className="glass-effect rounded-2xl p-6 hover-lift">
                                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-cyan-400 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Learning Path Section */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-medium text-gray-300">Your Learning Journey</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Choose Your <span className="text-cyan-400">Path</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Start with No-Code tools and progress to advanced Python automation and AI integration
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-effect rounded-2xl p-8 hover-lift relative">
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                                BEGINNER
                            </div>
                            <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
                                <Blocks className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">No-Code Automation</h3>
                            <p className="text-gray-400 mb-6">Perfect for beginners. Start automating in minutes without writing any code.</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2 text-gray-300">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span>Zapier & Make.com tutorials</span>
                                </li>
                                <li className="flex items-start gap-2 text-gray-300">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span>Visual workflow builders</span>
                                </li>
                                <li className="flex items-start gap-2 text-gray-300">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span>100+ app integrations</span>
                                </li>
                            </ul>
                            <a href="/blog?category=nocode" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2">
                                Start Learning <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="glass-effect rounded-2xl p-8 hover-lift relative border-2 border-cyan-500/30">
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">
                                INTERMEDIATE
                            </div>
                            <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                                <Code2 className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Python Automation</h3>
                            <p className="text-gray-400 mb-6">Take control with Python scripting for powerful custom automation solutions.</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2 text-gray-300">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span>Web scraping & data extraction</span>
                                </li>
                                <li className="flex items-start gap-2 text-gray-300">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span>Excel & PDF automation</span>
                                </li>
                                <li className="flex items-start gap-2 text-gray-300">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span>Custom scripts & schedulers</span>
                                </li>
                            </ul>
                            <a href="/blog?category=python" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2">
                                Explore Tutorials <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="glass-effect rounded-2xl p-8 hover-lift relative">
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold">
                                ADVANCED
                            </div>
                            <div className="w-16 h-16 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
                                <Zap className="w-8 h-8 text-pink-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">API & AI Integration</h3>
                            <p className="text-gray-400 mb-6">Connect any service and build intelligent AI-powered automation systems.</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2 text-gray-300">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span>REST API integrations</span>
                                </li>
                                <li className="flex items-start gap-2 text-gray-300">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span>ChatGPT & AI automation</span>
                                </li>
                                <li className="flex items-start gap-2 text-gray-300">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span>Custom chatbots & webhooks</span>
                                </li>
                            </ul>
                            <a href="/blog?category=api" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2">
                                View Advanced <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Will Learn Section */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-medium text-gray-300">Automation Skills</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            What You Will <span className="gradient-text">Master</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            From drag-and-drop No-Code tools to advanced Python scripts and API integrations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Blocks, title: "No-Code Platforms", desc: "Master Zapier, Make, n8n, and other visual automation builders without writing code.", gradient: "from-cyan-500 to-teal-500" },
                            { icon: Code2, title: "Python Automation", desc: "Learn Python scripting for web scraping, data processing, and task automation.", gradient: "from-teal-500 to-emerald-500" },
                            { icon: Workflow, title: "Workflow Design", desc: "Design complex multi-step workflows combining triggers, actions, and conditions.", gradient: "from-emerald-500 to-green-500" },
                            { icon: GitBranch, title: "API Integration", desc: "Connect any app using REST APIs, webhooks, and authentication methods.", gradient: "from-purple-500 to-fuchsia-500" },
                            { icon: Terminal, title: "CLI & Scripts", desc: "Automate with command-line tools, bash scripts, and scheduled tasks.", gradient: "from-fuchsia-500 to-pink-500" },
                            { icon: Zap, title: "AI-Powered Bots", desc: "Build intelligent chatbots and AI agents using GPT, Claude, and custom models.", gradient: "from-cyan-500 to-purple-500" },
                        ].map((item, index) => (
                            <div key={index} className="group relative glass-effect rounded-2xl p-8 hover-lift overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Beginner Guides Preview */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm font-medium text-gray-300">Latest Tutorials</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Automation <span className="gradient-text">Guides</span>
                            </h2>
                            <p className="text-xl text-gray-400">Step-by-step tutorials for beginners and experts</p>
                        </div>
                        <Link href="/blog" className="group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                            View all guides
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Build Your First Zapier Workflow", category: "No-Code", date: "Dec 1, 2024", color: "cyan" },
                            { title: "Python Web Scraping for Beginners", category: "Code", date: "Dec 2, 2024", color: "purple" },
                            { title: "Automate WhatsApp with n8n", category: "Integration", date: "Dec 3, 2024", color: "teal" },
                        ].map((post, i) => (
                            <Link key={i} href={`/blog/post-${i + 1}`} className="group block">
                                <div className="glass-effect rounded-2xl overflow-hidden hover-lift h-full">
                                    <div className="relative h-56 bg-cyan-600/20 overflow-hidden">
                                        <div className="absolute inset-0 bg-cyan-500/50 group-hover:bg-cyan-500/70 transition-colors"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Sparkles className="w-16 h-16 text-white/50" />
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                                            <span className={`px-3 py-1 rounded-full bg-${post.color}-500/20 text-${post.color}-400 font-medium`}>
                                                {post.category}
                                            </span>
                                            <span>•</span>
                                            <span>{post.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all leading-snug">
                                            {post.title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recommended Tools */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-gray-300">Popular Platforms</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
                        Automation <span className="gradient-text">Tools</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
                        {['Zapier', 'Make', 'n8n', 'Python', 'Node.js'].map((tool) => (
                            <div key={tool} className="glass-effect rounded-2xl p-8 hover-lift group cursor-pointer">
                                <div className="text-3xl font-bold text-gray-400 group-hover:gradient-text transition-all">
                                    {tool}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-effect rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 mb-6">
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm font-medium text-gray-300">Weekly Tips & Tutorials</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Get Automation Tips in Your Inbox
                            </h2>

                            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                                Join 5,000+ automation enthusiasts getting weekly tutorials, tool reviews, and productivity hacks delivered straight to their inbox.
                            </p>

                            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 px-6 py-4 rounded-full glass-effect text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-white/10"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 whitespace-nowrap"
                                >
                                    Subscribe Free
                                </button>
                            </form>

                            <p className="text-sm text-gray-500 mt-4">
                                🔒 No spam. Unsubscribe anytime. We respect your privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="relative glass-effect rounded-3xl p-12 md:p-16 overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-600/10"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to <span className="gradient-text">Automate</span>?
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                                Join thousands of developers and entrepreneurs automating their workflows. Start with No-Code, level up with Code.
                            </p>
                            <Link
                                href="/blog"
                                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
                            >
                                <Rocket className="w-6 h-6" />
                                Start Your Journey Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
