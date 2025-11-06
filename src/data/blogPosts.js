export const blogPosts = [
  {
    id: 1,
    title: "Complete Guide: Host Your Personal Website for Free with Namecheap and GitHub Pages",
    excerpt: "A step-by-step tutorial for university students on how to get a free domain through GitHub Education and host your personal website using GitHub Pages. Includes all the links and resources you need.",
    date: "2024-12-20",
    readTime: "10 min read",
    category: "Tutorial",
    slug: "free-website-namecheap-github-pages"
  }
];

export const blogPostContent = {
  'free-website-namecheap-github-pages': {
    id: 1,
    title: "Complete Guide: Host Your Personal Website for Free with Namecheap and GitHub Pages",
    date: "2024-12-20",
    readTime: "10 min read",
    category: "Tutorial",
    slug: "free-website-namecheap-github-pages",
    content: `
      <p>As a university student, having your own personal website with a custom domain is one of the best ways to showcase your projects, build your portfolio, and establish your online presence – all for free! This tutorial will walk you through exactly how to get a free domain from Namecheap through the GitHub Education program and host it on GitHub Pages.</p>

      <h2>Why University Students Should Do This</h2>
      <p>Having your own website with a custom domain (like <code>yourname.com</code>) is incredibly valuable for university students. It helps you:</p>
      <ul>
        <li>Build your professional portfolio</li>
        <li>Showcase your projects and coursework</li>
        <li>Learn industry-standard tools (Git, GitHub, domain management)</li>
        <li>Stand out to potential employers and graduate programs</li>
        <li>Create something tangible you can share with friends and family</li>
      </ul>

      <h2>Prerequisites</h2>
      <p>Before we begin, make sure you have:</p>
      <ul>
        <li>A GitHub account (create one free at <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer">github.com/signup</a>)</li>
        <li>A valid university email address (ending in .edu or your university's domain)</li>
        <li>Basic familiarity with Git (we'll cover the essentials)</li>
        <li>Basic HTML/CSS knowledge (or you can use a static site generator like Jekyll, Hugo, or even React)</li>
      </ul>

      <h2>Step 1: Apply for GitHub Student Developer Pack</h2>
      <p>The GitHub Student Developer Pack gives you free access to tons of developer tools, including a free Namecheap domain. Here's how to get it:</p>
      
      <ol>
        <li>Visit the <a href="https://education.github.com/pack" target="_blank" rel="noopener noreferrer">GitHub Education Student Developer Pack page</a></li>
        <li>Click "Get your pack" or "Get benefits"</li>
        <li>Sign in with your GitHub account</li>
        <li>Fill out the application form:
          <ul>
            <li>Select "Student" as your status</li>
            <li>Enter your university email address</li>
            <li>Upload proof of enrollment (student ID, enrollment letter, or transcript)</li>
            <li>Explain how you plan to use GitHub (e.g., "Learning web development and building projects")</li>
          </ul>
        </li>
        <li>Submit your application</li>
      </ol>

      <p><strong>Note:</strong> Verification usually takes 1-3 business days. You'll receive an email once your application is approved.</p>

      <p>Once approved, you'll have access to the <a href="https://education.github.com/pack" target="_blank" rel="noopener noreferrer">GitHub Education benefits page</a> where you can claim various offers, including the Namecheap domain.</p>

      <h2>Step 2: Claim Your Free Namecheap Domain</h2>
      <p>After your GitHub Education application is approved:</p>
      
      <ol>
        <li>Go back to your <a href="https://education.github.com/pack" target="_blank" rel="noopener noreferrer">GitHub Education benefits page</a></li>
        <li>Find the "Namecheap" offer in the list of benefits</li>
        <li>Click "Get access" or the Namecheap link</li>
        <li>You'll be redirected to Namecheap with a special education discount code</li>
        <li>Create a Namecheap account if you don't have one (free to sign up at <a href="https://www.namecheap.com/myaccount/signup/" target="_blank" rel="noopener noreferrer">namecheap.com</a>)</li>
        <li>Search for your desired domain name</li>
        <li>Add it to your cart and apply the education discount code (this makes the domain free for the first year)</li>
        <li>Complete the checkout process</li>
      </ol>

      <p><strong>Pro Tip:</strong> Keep your domain name professional and simple. Common choices include:
      <ul>
        <li><code>firstnamelastname.com</code></li>
        <li><code>yourname.dev</code></li>
        <li><code>yourname.io</code></li>
      </ul>
      </p>

      <p>For more information about the Namecheap student offer, check the <a href="https://www.namecheap.com/github-students/" target="_blank" rel="noopener noreferrer">Namecheap GitHub Student page</a>.</p>

      <h2>Step 3: Create a GitHub Repository</h2>
      <p>Now let's set up your website repository on GitHub:</p>
      
      <ol>
        <li>Go to <a href="https://github.com/new" target="_blank" rel="noopener noreferrer">github.com/new</a> to create a new repository</li>
        <li>Name your repository <code>yourusername.github.io</code> (replace "yourusername" with your actual GitHub username)
          <ul>
            <li>For example, if your username is <code>johndoe</code>, name it <code>johndoe.github.io</code></li>
            <li>This special naming convention is what makes GitHub Pages work!</li>
          </ul>
        </li>
        <li>Make the repository public (required for free GitHub Pages)</li>
        <li>Check "Add a README file"</li>
        <li>Click "Create repository"</li>
      </ol>

      <h2>Step 4: Set Up GitHub Pages</h2>
      <p>Now let's enable GitHub Pages and add your website content:</p>
      
      <ol>
        <li>In your repository, go to <strong>Settings</strong> (top right of the repository page)</li>
        <li>Scroll down to the <strong>Pages</strong> section in the left sidebar</li>
        <li>Under "Source", select <strong>Deploy from a branch</strong></li>
        <li>Choose the <code>main</code> branch (or <code>master</code> if that's your default branch)</li>
        <li>Select <code>/ (root)</code> as the folder</li>
        <li>Click <strong>Save</strong></li>
      </ol>

      <p>GitHub will now automatically build and deploy your site! It will be available at <code>https://yourusername.github.io</code> within a few minutes.</p>

      <h3>Adding Your Website Content</h3>
      <p>You can add your website files in several ways:</p>
      
      <p><strong>Option A: Using GitHub's Web Interface</strong></p>
      <ol>
        <li>In your repository, click "Add file" → "Create new file"</li>
        <li>Name it <code>index.html</code></li>
        <li>Add your HTML content (you can start with a simple template)</li>
        <li>Click "Commit new file"</li>
      </ol>

      <p><strong>Option B: Using Git (Recommended)</strong></p>
      <ol>
        <li>Clone your repository locally: <code>git clone https://github.com/yourusername/yourusername.github.io.git</code></li>
        <li>Create your HTML/CSS/JS files</li>
        <li>Add and commit: <code>git add .</code> then <code>git commit -m "Initial website"</code></li>
        <li>Push to GitHub: <code>git push origin main</code></li>
      </ol>

      <p>For detailed GitHub Pages documentation, check the <a href="https://docs.github.com/en/pages" target="_blank" rel="noopener noreferrer">official GitHub Pages docs</a>.</p>

      <h2>Step 5: Connect Your Custom Domain to GitHub Pages</h2>
      <p>Now for the exciting part – connecting your Namecheap domain to your GitHub Pages site!</p>

      <h3>5.1: Configure GitHub Pages for Custom Domain</h3>
      <ol>
        <li>In your GitHub repository, go to <strong>Settings</strong> → <strong>Pages</strong></li>
        <li>Under "Custom domain", enter your domain name (e.g., <code>yourname.com</code>)</li>
        <li>Click <strong>Save</strong></li>
        <li>GitHub will create a <code>CNAME</code> file in your repository (you can see it in your repo files)</li>
      </ol>

      <h3>5.2: Configure DNS Settings in Namecheap</h3>
      <p>Now you need to point your domain to GitHub Pages:</p>
      
      <ol>
        <li>Log into your <a href="https://www.namecheap.com/myaccount/login/" target="_blank" rel="noopener noreferrer">Namecheap account</a></li>
        <li>Go to <strong>Domain List</strong> and click <strong>Manage</strong> next to your domain</li>
        <li>Go to the <strong>Advanced DNS</strong> tab</li>
        <li>Add these DNS records:
          <ul>
            <li><strong>Type:</strong> A Record | <strong>Host:</strong> @ | <strong>Value:</strong> 185.199.108.153 | <strong>TTL:</strong> Automatic</li>
            <li><strong>Type:</strong> A Record | <strong>Host:</strong> @ | <strong>Value:</strong> 185.199.109.153 | <strong>TTL:</strong> Automatic</li>
            <li><strong>Type:</strong> A Record | <strong>Host:</strong> @ | <strong>Value:</strong> 185.199.110.153 | <strong>TTL:</strong> Automatic</li>
            <li><strong>Type:</strong> A Record | <strong>Host:</strong> @ | <strong>Value:</strong> 185.199.111.153 | <strong>TTL:</strong> Automatic</li>
            <li><strong>Type:</strong> CNAME Record | <strong>Host:</strong> www | <strong>Value:</strong> yourusername.github.io | <strong>TTL:</strong> Automatic</li>
          </ul>
        </li>
        <li>Click the checkmark to save each record</li>
      </ol>

      <p><strong>Note:</strong> Replace <code>yourusername</code> with your actual GitHub username in the CNAME record.</p>

      <p>For more detailed DNS configuration help, check <a href="https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site" target="_blank" rel="noopener noreferrer">GitHub's custom domain documentation</a>.</p>

      <h3>5.3: Enable HTTPS (Recommended)</h3>
      <ol>
        <li>Wait for DNS propagation (can take up to 48 hours, but usually 15-30 minutes)</li>
        <li>Once your domain is connected, go back to your repository <strong>Settings</strong> → <strong>Pages</strong></li>
        <li>Check <strong>Enforce HTTPS</strong> (this may take a few minutes to become available)</li>
        <li>This ensures your site is secure and uses HTTPS!</li>
      </ol>

      <h2>Step 6: Verify Everything Works</h2>
      <p>Once DNS has propagated (check with a tool like <a href="https://dnschecker.org/" target="_blank" rel="noopener noreferrer">dnschecker.org</a>):</p>
      
      <ul>
        <li>Visit your custom domain: <code>https://yourname.com</code></li>
        <li>Verify HTTPS is working (you should see a lock icon in your browser)</li>
        <li>Test both <code>yourname.com</code> and <code>www.yourname.com</code></li>
      </ul>

      <h2>Additional Resources</h2>
      <ul>
        <li><a href="https://education.github.com/pack" target="_blank" rel="noopener noreferrer">GitHub Student Developer Pack</a> – Claim all your free student benefits</li>
        <li><a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">GitHub Pages Official Site</a> – Learn more about GitHub Pages</li>
        <li><a href="https://docs.github.com/en/pages" target="_blank" rel="noopener noreferrer">GitHub Pages Documentation</a> – Comprehensive guide</li>
        <li><a href="https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-to-configure-a-records-for-your-domain/" target="_blank" rel="noopener noreferrer">Namecheap A Record Setup Guide</a> – Detailed DNS configuration</li>
        <li><a href="https://jekyllrb.com/" target="_blank" rel="noopener noreferrer">Jekyll</a> – Popular static site generator that works great with GitHub Pages</li>
      </ul>

      <h2>Troubleshooting</h2>
      <p><strong>My domain isn't working yet:</strong> DNS changes can take up to 48 hours to propagate globally. Be patient and check back later.</p>
      
      <p><strong>HTTPS isn't available:</strong> Make sure your DNS is fully propagated first. Sometimes it takes a few hours after connecting your domain for HTTPS to become available.</p>
      
      <p><strong>GitHub Education application rejected:</strong> Make sure you uploaded clear proof of enrollment. You can reapply if needed.</p>

      <h2>Next Steps</h2>
      <p>Congratulations! You now have your own custom domain and free hosting. Here's what you can do next:</p>
      <ul>
        <li>Build a personal portfolio showcasing your projects</li>
        <li>Start a blog about your coding journey</li>
        <li>Create a resume website</li>
        <li>Experiment with different web technologies and frameworks</li>
        <li>Share your site with friends, family, and potential employers!</li>
      </ul>

      <p>Remember, your domain is free for the first year through the GitHub Education program. When it's time to renew, you can continue with Namecheap at their regular student rates, or transfer it elsewhere if you prefer.</p>

      <p>Happy building! ��</p>
    `
  }
};
