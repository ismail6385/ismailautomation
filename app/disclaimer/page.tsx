import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Disclaimer - IsmailAutomation',
    description: 'Disclaimer for IsmailAutomation. Important information about the educational nature of our content and limitations of liability.',
};

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                        <AlertTriangle className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-gray-300">Important Notice</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Disclaimer
                    </h1>

                    <p className="text-gray-400 text-lg">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {/* Content */}
                <div className="glass-effect rounded-3xl p-8 md:p-12 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">General Information</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The information provided by IsmailAutomation ("we," "us," or "our") on ismailautomation.com (the "Website") is for general
                            informational and educational purposes only. All information on the Website is provided in good faith; however, we make no
                            representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability,
                            or completeness of any information on the Website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Educational Purpose Only</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            All tutorials, guides, code examples, and automation workflows provided on this Website are intended for educational purposes only.
                            They are designed to help you learn about automation tools, programming concepts, and workflow optimization techniques.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            The content is not intended to be a substitute for professional advice, consultation, or services. Before implementing any automation
                            solution in a production environment or business setting, you should consult with qualified professionals and thoroughly test the
                            implementation in a safe environment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">No Professional Advice</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The content on this Website does not constitute professional, legal, financial, or technical advice. We are not responsible for any
                            decisions you make based on the information provided on our Website. You should always conduct your own research and seek professional
                            advice when necessary.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Use at Your Own Risk</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the
                            Website or reliance on any information provided on the Website. Your use of the Website and your reliance on any information on the
                            Website is solely at your own risk.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            This includes but is not limited to:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-2">
                            <li>Data loss or corruption</li>
                            <li>System failures or downtime</li>
                            <li>Security breaches or vulnerabilities</li>
                            <li>Financial losses</li>
                            <li>Business interruptions</li>
                            <li>Violation of third-party terms of service</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Third-Party Tools and Services</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Our tutorials and guides often reference third-party automation tools, platforms, and services (such as Zapier, Make, n8n, Python libraries, APIs, etc.).
                            We are not affiliated with, endorsed by, or sponsored by these third-party services unless explicitly stated.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Each third-party service has its own terms of service, privacy policy, and usage limitations. You are responsible for:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Reading and complying with the terms of service of any third-party tools you use</li>
                            <li>Understanding the pricing, limitations, and restrictions of third-party services</li>
                            <li>Ensuring your use of automation complies with all applicable terms and policies</li>
                            <li>Maintaining the security of your accounts and API credentials</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Code Examples and Scripts</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            All code examples, scripts, and automation workflows provided on this Website are for educational demonstration purposes.
                            While we strive to provide working examples, we cannot guarantee that:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>The code will work in all environments or configurations</li>
                            <li>The code is free from bugs or errors</li>
                            <li>The code follows all best practices for production use</li>
                            <li>The code is optimized for performance or security</li>
                            <li>The code will remain compatible with future updates to third-party services</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            You should always review, test, and modify code examples before using them in any production environment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">External Links Disclaimer</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The Website may contain links to external websites that are not provided or maintained by or in any way affiliated with IsmailAutomation.
                            We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                            We are not responsible for the content, privacy policies, or practices of any third-party websites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Affiliate Links Disclaimer</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Some links on this Website may be affiliate links. This means we may earn a commission if you click on the link and make a purchase,
                            at no additional cost to you. We only recommend products and services that we genuinely believe will provide value to our readers.
                            Our affiliate relationships do not influence our editorial content or recommendations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Accuracy of Information</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The automation and technology landscape is constantly evolving. While we make every effort to keep our content up-to-date and accurate,
                            tools, APIs, and services may change their features, pricing, or terms of service without notice. We cannot guarantee that all information
                            on the Website is current or accurate at the time you access it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">No Guarantee of Results</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We do not guarantee any specific results from implementing the automation techniques, workflows, or strategies described on our Website.
                            Results may vary based on numerous factors including your technical skills, the tools you use, your specific use case, and external factors
                            beyond our control.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Testimonials and Case Studies</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Any testimonials, case studies, or success stories shared on this Website represent individual experiences and results.
                            They are not guarantees that you will achieve similar results. Your results may vary.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Changes to Content</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We reserve the right to modify, update, or remove any content on the Website at any time without prior notice.
                            We are not obligated to update information or correct errors.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            If you have any questions about this Disclaimer, please contact us:
                        </p>
                        <ul className="text-gray-300 space-y-2">
                            <li><strong>Email:</strong> <a href="mailto:contact@ismailautomation.com" className="text-cyan-400 hover:text-cyan-300">contact@ismailautomation.com</a></li>
                            <li><strong>Website:</strong> <a href="/" className="text-cyan-400 hover:text-cyan-300">ismailautomation.com</a></li>
                        </ul>
                    </section>

                    <div className="mt-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <p className="text-gray-300 text-sm leading-relaxed">
                            <strong className="text-amber-400">Important:</strong> By using IsmailAutomation, you acknowledge that you have read and understood this Disclaimer
                            and agree to its terms. If you do not agree with this Disclaimer, please do not use our Website or implement any of the tutorials or code examples provided.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
