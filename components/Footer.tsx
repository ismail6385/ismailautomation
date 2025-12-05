import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative mt-20 glass-effect border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6 text-cyan-400" />
                            <span className="text-2xl font-bold gradient-text">IsmailAutomation</span>
                        </div>
                        <p className="mt-4 text-gray-400 max-w-md leading-relaxed">
                            Master No-Code and Code automation, streamline your workflows, and boost productivity with our comprehensive guides and tutorials.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/blog" className="text-base text-gray-400 hover:text-cyan-400 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools" className="text-base text-gray-400 hover:text-cyan-400 transition-colors">
                                    Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-base text-gray-400 hover:text-cyan-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy" className="text-base text-gray-400 hover:text-cyan-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-base text-gray-400 hover:text-cyan-400 transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/disclaimer" className="text-base text-gray-400 hover:text-cyan-400 transition-colors">
                                    Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-8">
                    <p className="text-base text-gray-500 text-center">
                        &copy; {new Date().getFullYear()} IsmailAutomation. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
