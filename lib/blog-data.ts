export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    author: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "getting-started-with-zapier",
        title: "Getting Started with Zapier: A Beginner's Guide",
        excerpt: "Learn how to automate your first task using Zapier. We walk you through creating a simple Zap to save you hours every week.",
        date: "October 12, 2023",
        category: "Automation",
        author: "Ismail",
        content: `
      <p>Automation is the key to scaling your productivity. In this guide, we'll explore <strong>Zapier</strong>, one of the most popular automation tools on the market.</p>
      
      <h2>What is Zapier?</h2>
      <p>Zapier is a tool that connects your favorite apps, such as Gmail, Slack, Mailchimp, and more. You can connect two or more apps to automate repetitive tasks without coding or relying on developers to build the integration.</p>
      
      <h2>How does it work?</h2>
      <p>Zapier works based on <strong>Triggers</strong> and <strong>Actions</strong>.</p>
      <ul>
        <li><strong>Trigger:</strong> An event that starts the Zap (e.g., "New Email in Gmail").</li>
        <li><strong>Action:</strong> What happens after the trigger (e.g., "Send a message to Slack").</li>
      </ul>
      
      <h2>Creating Your First Zap</h2>
      <p>1. Sign up for a free Zapier account.</p>
      <p>2. Click "Create Zap".</p>
      <p>3. Choose your trigger app (e.g., Google Forms).</p>
      <p>4. Choose your action app (e.g., Google Sheets).</p>
      <p>5. Test and turn on your Zap!</p>
      
      <p>It's that simple. Start experimenting today and see how much time you can save.</p>
    `
    },
    {
        slug: "chatgpt-google-sheets-integration",
        title: "How to Connect ChatGPT to Google Sheets",
        excerpt: "Discover how to bring the power of AI directly into your spreadsheets. Generate content, clean data, and analyze text automatically.",
        date: "October 15, 2023",
        category: "AI",
        author: "Ismail",
        content: `
      <p>Imagine having ChatGPT right inside your Google Sheets. You could generate blog post ideas, clean up messy data, or translate text in bulk. Well, it's possible!</p>
      
      <h2>Why connect ChatGPT to Sheets?</h2>
      <p>By integrating OpenAI's API with Google Sheets, you can run prompts on hundreds of rows of data simultaneously. This is a game-changer for content marketers and data analysts.</p>
      
      <h2>Steps to Integrate</h2>
      <p>There are two main ways to do this:</p>
      <ol>
        <li><strong>Using a Third-Party Extension:</strong> Tools like "GPT for Sheets" are easy to install from the Google Workspace Marketplace.</li>
        <li><strong>Using App Script:</strong> If you're tech-savvy, you can write a simple script to call the OpenAI API.</li>
      </ol>
      
      <p>We recommend starting with the "GPT for Sheets and Docs" extension. It's user-friendly and requires no coding knowledge.</p>
    `
    },
    {
        slug: "automate-email-marketing",
        title: "Automate Your Email Marketing with AI",
        excerpt: "Stop writing emails from scratch. Learn how to set up an automated email sequence that nurtures leads while you sleep.",
        date: "October 20, 2023",
        category: "Marketing",
        author: "Ismail",
        content: `
      <p>Email marketing is still one of the most effective ways to reach your audience. But writing emails manually is time-consuming.</p>
      
      <h2>The Power of Drip Campaigns</h2>
      <p>A drip campaign is a series of automated emails sent to people who take a specific action, like subscribing to your newsletter.</p>
      
      <h2>Using AI to Write Emails</h2>
      <p>You can use tools like ChatGPT or Claude to draft your email copy. Just provide the context, tone, and key points, and let the AI do the heavy lifting.</p>
      
      <p>Combine this with an email marketing platform like ConvertKit or Mailchimp, and you have a fully automated system that welcomes new subscribers and keeps them engaged.</p>
    `
    }
];
