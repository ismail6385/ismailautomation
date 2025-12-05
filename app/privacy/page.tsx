import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy - IsmailAutomation',
    description: 'Privacy Policy for IsmailAutomation. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-gray-300">Your Privacy Matters</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Privacy Policy
                    </h1>

                    <p className="text-gray-400 text-lg">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {/* Content */}
                <div className="glass-effect rounded-3xl p-8 md:p-12 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Welcome to IsmailAutomation ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ismailautomation.com.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li><strong>Contact Information:</strong> Name, email address when you contact us or subscribe to our newsletter</li>
                            <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and links clicked</li>
                            <li><strong>Device Information:</strong> Browser type, IP address, operating system, and device identifiers</li>
                            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our website</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We use the information we collect for the following purposes:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>To provide, maintain, and improve our website and services</li>
                            <li>To send you newsletters, updates, and promotional materials (with your consent)</li>
                            <li>To respond to your comments, questions, and requests</li>
                            <li>To analyze website usage and optimize user experience</li>
                            <li>To detect, prevent, and address technical issues and security threats</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Google AdSense and Advertising</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites.
                            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Google Ads Settings</a>.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website.
                            Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            However, if you do not accept cookies, you may not be able to use some portions of our website.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Types of cookies we use:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-2">
                            <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                            <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Services</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We may use third-party services that collect, monitor, and analyze data to improve our service:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li><strong>Google Analytics:</strong> Web analytics service to track and report website traffic</li>
                            <li><strong>Google AdSense:</strong> Advertising service to display ads on our website</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Data Security</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
                            While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Depending on your location, you may have the following rights regarding your personal information:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>The right to access and receive a copy of your personal data</li>
                            <li>The right to rectify or update your personal information</li>
                            <li>The right to erase your personal data</li>
                            <li>The right to restrict or object to our processing of your data</li>
                            <li>The right to data portability</li>
                            <li>The right to withdraw consent at any time</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
                            If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Privacy Policy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            You are advised to review this Privacy Policy periodically for any changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <ul className="text-gray-300 space-y-2">
                            <li><strong>Email:</strong> <a href="mailto:contact@ismailautomation.com" className="text-cyan-400 hover:text-cyan-300">contact@ismailautomation.com</a></li>
                            <li><strong>Website:</strong> <a href="/" className="text-cyan-400 hover:text-cyan-300">ismailautomation.com</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
