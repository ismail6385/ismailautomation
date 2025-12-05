"use client";

import { useState } from 'react';
import { Mail, Copy, CheckCircle } from 'lucide-react';

export default function EmailTemplatesPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<string>('welcome');
    const [copied, setCopied] = useState(false);

    const templates = {
        welcome: {
            name: 'Welcome Email',
            subject: 'Welcome to IsmailAutomation! 🎉',
            body: `Hi {{name}},

Welcome to IsmailAutomation! We're excited to have you on board.

You've successfully subscribed to our newsletter. Get ready to receive:
• Weekly automation tutorials
• Latest tool reviews
• Exclusive tips & tricks
• Special offers

Start learning: {{siteUrl}}/blog

Best regards,
The IsmailAutomation Team

---
Unsubscribe: {{unsubscribeUrl}}`,
        },
        newsletter: {
            name: 'Newsletter Template',
            subject: '📧 Your Weekly Automation Digest',
            body: `Hi {{name}},

Here's what's new this week:

🔥 Featured Article
{{featuredArticleTitle}}
{{featuredArticleLink}}

🛠️ Tool of the Week
{{toolName}}
{{toolDescription}}

💡 Quick Tip
{{quickTip}}

📚 More Resources
{{moreLinks}}

Happy Automating!
IsmailAutomation Team

---
Unsubscribe: {{unsubscribeUrl}}`,
        },
        toolApproved: {
            name: 'Tool Approved',
            subject: '✅ Your Tool Submission Was Approved!',
            body: `Hi {{submitterName}},

Great news! Your tool submission has been approved.

Tool Name: {{toolName}}
Live URL: {{toolUrl}}

Your tool is now live on our directory and visible to thousands of visitors.

Thank you for contributing to our community!

Best regards,
IsmailAutomation Team`,
        },
        toolRejected: {
            name: 'Tool Rejected',
            subject: 'Tool Submission Update',
            body: `Hi {{submitterName}},

Thank you for your tool submission.

Unfortunately, we couldn't approve "{{toolName}}" at this time because:
{{rejectionReason}}

You're welcome to resubmit after making the necessary changes.

If you have questions, please contact us at {{supportEmail}}.

Best regards,
IsmailAutomation Team`,
        },
        commentReply: {
            name: 'Comment Reply',
            subject: 'New reply to your comment',
            body: `Hi {{commenterName}},

Someone replied to your comment on "{{postTitle}}":

{{replyContent}}

View the conversation: {{postUrl}}

Best regards,
IsmailAutomation Team

---
Unsubscribe from comment notifications: {{unsubscribeUrl}}`,
        },
        contactResponse: {
            name: 'Contact Response',
            subject: 'Re: {{originalSubject}}',
            body: `Hi {{name}},

Thank you for reaching out!

We've received your message and we'll get back to you within 24 hours.

Your Message:
"{{userMessage}}"

If urgent, you can also reach us at {{supportEmail}}.

Best regards,
IsmailAutomation Team`,
        },
    };

    const handleCopy = (template: string) => {
        navigator.clipboard.writeText(template);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const currentTemplate = templates[selectedTemplate as keyof typeof templates];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Email Templates</h1>
                <p className="text-gray-400">Pre-built email templates for common scenarios</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Template List */}
                <div className="lg:col-span-1 space-y-2">
                    {Object.entries(templates).map(([key, template]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedTemplate(key)}
                            className={`w-full text-left p-4 rounded-xl transition-all ${selectedTemplate === key
                                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                                : 'glass-effect text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5" />
                                <span className="font-semibold">{template.name}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Template Preview */}
                <div className="lg:col-span-2 glass-effect rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">{currentTemplate.name}</h2>
                        <button
                            onClick={() => handleCopy(`Subject: ${currentTemplate.subject}\n\n${currentTemplate.body}`)}
                            className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-semibold flex items-center gap-2"
                        >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Subject */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Subject Line</label>
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-white font-semibold">{currentTemplate.subject}</p>
                            </div>
                        </div>

                        {/* Body */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Email Body</label>
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                <pre className="text-white whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                    {currentTemplate.body}
                                </pre>
                            </div>
                        </div>

                        {/* Variables Info */}
                        <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <h3 className="text-cyan-400 font-semibold mb-2">📝 Template Variables</h3>
                            <p className="text-gray-300 text-sm mb-2">
                                Use these variables in your templates (they will be replaced with actual data):
                            </p>
                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                                <code className="text-cyan-400">{'{{name}}'}</code>
                                <code className="text-cyan-400">{'{{email}}'}</code>
                                <code className="text-cyan-400">{'{{siteUrl}}'}</code>
                                <code className="text-cyan-400">{'{{unsubscribeUrl}}'}</code>
                                <code className="text-cyan-400">{'{{toolName}}'}</code>
                                <code className="text-cyan-400">{'{{postTitle}}'}</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Integration Guide */}
            <div className="mt-8 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">📧 Email Integration</h3>
                <div className="space-y-3 text-gray-300">
                    <p>To use these templates with an email service:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li>Choose an email service (SendGrid, Mailchimp, AWS SES)</li>
                        <li>Copy the template you want to use</li>
                        <li>Create a new template in your email service</li>
                        <li>Replace {`{{variable}}`} with actual values in your code</li>
                        <li>Send emails programmatically via API</li>
                    </ol>
                    <div className="mt-4 p-3 rounded-lg bg-white/5">
                        <p className="text-white font-semibold mb-2">Example Code:</p>
                        <pre className="text-sm text-cyan-400">
                            {`// Using SendGrid
const template = templates.welcome.body
  .replace('{{name}}', user.name)
  .replace('{{siteUrl}}', 'https://ismailautomation.com');
  
await sendEmail({
  to: user.email,
  subject: templates.welcome.subject,
  body: template
});`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
