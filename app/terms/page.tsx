import { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Terms & Conditions - IsmailAutomation',
    description: 'Terms and Conditions for using IsmailAutomation website. Read our terms of service, user agreements, and content usage policies.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-gray-300">Legal Terms</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Terms & Conditions
                    </h1>

                    <p className="text-gray-400 text-lg">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {/* Content */}
                <div className="glass-effect rounded-3xl p-8 md:p-12 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                        <p className="text-gray-300 leading-relaxed">
                            By accessing or using IsmailAutomation ("Website"), you agree to be bound by these Terms and Conditions ("Terms").
                            If you disagree with any part of these terms, you may not access the Website. These Terms apply to all visitors, users,
                            and others who access or use the Website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Use of Website</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            You may use our Website for lawful purposes only. You agree not to use the Website:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>In any way that violates any applicable national or international law or regulation</li>
                            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                            <li>To impersonate or attempt to impersonate IsmailAutomation, our employees, another user, or any other person or entity</li>
                            <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property Rights</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            The Website and its original content, features, and functionality are owned by IsmailAutomation and are protected by international copyright,
                            trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download,
                            store, or transmit any of the material on our Website without our prior written consent, except for personal, non-commercial use.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Content and Tutorials</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            All tutorials, guides, and educational content provided on this Website are for informational and educational purposes only.
                            We strive to provide accurate and up-to-date information, but we make no representations or warranties of any kind, express or implied,
                            about the completeness, accuracy, reliability, suitability, or availability of the content.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            You acknowledge that you use any information, tutorials, or code examples at your own risk. We are not responsible for any damages,
                            losses, or issues that may arise from implementing the automation workflows or techniques described on our Website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. User-Generated Content</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            If you submit comments, feedback, or other content to our Website, you grant us a non-exclusive, worldwide, royalty-free,
                            perpetual license to use, reproduce, modify, and display such content.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            You represent and warrant that you own or have the necessary rights to any content you submit and that such content does not
                            violate the rights of any third party.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Links and Services</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Our Website may contain links to third-party websites, services, or resources that are not owned or controlled by IsmailAutomation.
                            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            You acknowledge and agree that IsmailAutomation shall not be responsible or liable, directly or indirectly, for any damage or loss
                            caused or alleged to be caused by or in connection with the use of any such third-party content, goods, or services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Affiliate Disclosure</h2>
                        <p className="text-gray-300 leading-relaxed">
                            IsmailAutomation may participate in affiliate marketing programs. This means we may earn a commission when you click on or make
                            purchases via affiliate links on our Website. These affiliate relationships do not influence our editorial content or recommendations.
                            We only recommend products and services that we genuinely believe will provide value to our readers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Advertising</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We use Google AdSense and other advertising services to display advertisements on our Website. These third-party advertisers may use
                            cookies and other tracking technologies to collect information about your visits to our Website and other websites.
                            Please refer to our Privacy Policy for more information about how we handle your data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Disclaimer of Warranties</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            The Website is provided on an "AS IS" and "AS AVAILABLE" basis. IsmailAutomation makes no warranties, expressed or implied,
                            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability,
                            fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            We do not warrant that:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-2">
                            <li>The Website will function uninterrupted, secure, or available at any particular time or location</li>
                            <li>Any errors or defects will be corrected</li>
                            <li>The Website is free of viruses or other harmful components</li>
                            <li>The results of using the Website will meet your requirements</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
                        <p className="text-gray-300 leading-relaxed">
                            In no event shall IsmailAutomation, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect,
                            incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                            intangible losses, resulting from your access to or use of or inability to access or use the Website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Indemnification</h2>
                        <p className="text-gray-300 leading-relaxed">
                            You agree to defend, indemnify, and hold harmless IsmailAutomation and its licensors and licensees, and their employees, contractors,
                            agents, officers, and directors from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and
                            expenses arising from your use of and access to the Website, or your violation of these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide
                            at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law</h2>
                        <p className="text-gray-300 leading-relaxed">
                            These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.
                            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">14. Severability</h2>
                        <p className="text-gray-300 leading-relaxed">
                            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            If you have any questions about these Terms and Conditions, please contact us:
                        </p>
                        <ul className="text-gray-300 space-y-2">
                            <li><strong>Email:</strong> <a href="mailto:contact@ismailautomation.com" className="text-cyan-400 hover:text-cyan-300">contact@ismailautomation.com</a></li>
                            <li><strong>Website:</strong> <a href="/" className="text-cyan-400 hover:text-cyan-300">ismailautomation.com</a></li>
                        </ul>
                    </section>

                    <div className="mt-12 p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                        <p className="text-gray-300 text-sm leading-relaxed">
                            <strong className="text-white">Note:</strong> By using IsmailAutomation, you acknowledge that you have read, understood,
                            and agree to be bound by these Terms and Conditions. If you do not agree to these Terms, please do not use our Website.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
