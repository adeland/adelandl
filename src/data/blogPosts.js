export const blogPosts = [
  {
    id: 1,
    title: "Complete Guide: Host Your Personal Website for Free with Namecheap and GitHub Pages (2025 Updated)",
    excerpt: "A comprehensive, up-to-date tutorial for university students on how to get a free domain through GitHub Education and host your personal website using GitHub Pages. Includes modern deployment options with GitHub Actions and all the resources you need.",
    date: "2025-11-09",
    readTime: "15 min read",
    category: "Tutorial",
    slug: "free-website-namecheap-github-pages"
  }
];

export const blogPostContent = {
  'free-website-namecheap-github-pages': {
    id: 1,
    title: "Host Your Website Free: GitHub Pages + Namecheap Domain (2025)",
    date: "2025-11-09",
    readTime: "8 min read",
    category: "Tutorial",
    slug: "free-website-namecheap-github-pages",
    content: `
      <div class="tldr-box">
        <h3>TL;DR</h3>
        <p>Get a free domain through GitHub Education → Create a repository → Deploy with GitHub Actions → Connect your domain. Total time: ~30 minutes (plus DNS propagation).</p>
      </div>

      <h2>What You'll Need</h2>
      <ul>
        <li>GitHub account and university email (.edu)</li>
        <li>Basic Git knowledge</li>
        <li>Your website code (HTML/CSS or React/Next.js/Vue)</li>
      </ul>

      <h2>Step 1: Get Your Free Domain (5 min)</h2>
      <ol>
        <li>Apply for <a href="https://education.github.com/pack" target="_blank">GitHub Student Developer Pack</a> (approval takes 1-3 days)</li>
        <li>Once approved, claim the Namecheap offer from your benefits page</li>
        <li>Register your domain with the education discount code (makes it free for year 1)</li>
      </ol>
      <p><strong>Tip:</strong> Use <code>yourname.com</code> or <code>yourname.dev</code> for maximum professionalism.</p>

      <h2>Step 2: Create Your Repository (2 min)</h2>
      <p>Create a new repo named <code>yourusername.github.io</code> at <a href="https://github.com/new">github.com/new</a></p>
      <ul>
        <li>Must be <strong>public</strong></li>
        <li>Repository name must match your GitHub username exactly</li>
        <li>Alternative: Use any repo name for a project site at <code>yourusername.github.io/repo-name</code></li>
      </ul>

      <h2>Step 3: Deploy Your Site</h2>
      
      <div class="deployment-tabs">
        <h3>Choose Your Deployment Method:</h3>
        
        <div class="tab-content">
          <h4>🚀 GitHub Actions (Recommended for React/Next.js/Vue)</h4>
          <p>Automatically builds and deploys on every push. No build files in your repo.</p>
          <ol>
            <li>Go to repo <strong>Settings</strong> → <strong>Pages</strong></li>
            <li>Set Source to <strong>GitHub Actions</strong></li>
            <li>Create <code>.github/workflows/deploy.yml</code> in your repo</li>
            <li>Copy the workflow for your framework from <a href="https://github.com/yourworkflows/repo">this repo</a></li>
          </ol>
          <p><strong>Quick workflow links by framework:</strong></p>
          <ul>
            <li><a href="#">React/Vite workflow →</a></li>
            <li><a href="#">Next.js workflow →</a></li>
            <li><a href="#">Vue workflow →</a></li>
            <li><a href="#">Plain HTML workflow →</a></li>
          </ul>
          
          <details>
            <summary>Show example workflow (React/Vite)</summary>
            <pre><code># See full workflow at: [link to GitHub repo]
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      # ... see full file for complete workflow</code></pre>
          </details>

          <p><strong>For Next.js:</strong> Add <code>output: 'export'</code> to your <code>next.config.js</code> (<a href="#">see example</a>)</p>
        </div>

        <div class="tab-content">
          <h4>📁 Deploy from Branch (Simple HTML sites)</h4>
          <ol>
            <li>Go to repo <strong>Settings</strong> → <strong>Pages</strong></li>
            <li>Set Source to <strong>Deploy from a branch</strong></li>
            <li>Choose <code>main</code> branch and <code>/ (root)</code> folder</li>
            <li>Push your <code>index.html</code> and other files to the repo</li>
          </ol>
        </div>
      </div>

      <p>Your site will be live at <code>https://yourusername.github.io</code> in ~2 minutes!</p>

      <h2>Step 4: Connect Your Custom Domain (10 min)</h2>
      
      <div class="warning-box">
        <strong>⚠️ Important:</strong> Do steps 4.1 and 4.2 in order to prevent security issues!
      </div>

      <h3>4.1: Add Domain to GitHub First</h3>
      <ol>
        <li>Go to repo <strong>Settings</strong> → <strong>Pages</strong></li>
        <li>Under "Custom domain", enter your domain (e.g., <code>yourname.com</code>)</li>
        <li>Click <strong>Save</strong></li>
      </ol>

      <h3>4.2: Configure DNS in Namecheap</h3>
      <ol>
        <li>Log into <a href="https://www.namecheap.com/myaccount/login/">Namecheap</a> → Domain List → Manage → <strong>Advanced DNS</strong></li>
        <li>Delete existing A/CNAME records</li>
        <li>Add these records:
          <table>
            <tr><th>Type</th><th>Host</th><th>Value</th></tr>
            <tr><td>A Record</td><td>@</td><td>185.199.108.153</td></tr>
            <tr><td>A Record</td><td>@</td><td>185.199.109.153</td></tr>
            <tr><td>A Record</td><td>@</td><td>185.199.110.153</td></tr>
            <tr><td>A Record</td><td>@</td><td>185.199.111.153</td></tr>
            <tr><td>CNAME</td><td>www</td><td>yourusername.github.io.</td></tr>
          </table>
        </li>
      </ol>

      <h3>4.3: Enable HTTPS</h3>
      <p>Wait 15-30 minutes for DNS propagation (<a href="https://dnschecker.org/">check status</a>), then:</p>
      <ol>
        <li>Return to repo <strong>Settings</strong> → <strong>Pages</strong></li>
        <li>Check <strong>Enforce HTTPS</strong></li>
      </ol>

      <p>✅ Done! Visit <code>https://yourname.com</code> to see your site live.</p>

      <h2>Common Issues</h2>
      <details>
        <summary><strong>Domain not working yet?</strong></summary>
        <p>DNS takes 15-30 minutes, up to 24 hours. Check <a href="https://dnschecker.org/">DNS propagation status</a>.</p>
      </details>

      <details>
        <summary><strong>CNAME file disappearing?</strong></summary>
        <p>Your GitHub Actions workflow needs to copy it to the build folder. <a href="#">See the fix →</a></p>
      </details>

      <details>
        <summary><strong>GitHub Actions failing?</strong></summary>
        <p>Check the Actions tab for logs. Common fixes: wrong build path (<code>build</code> vs <code>dist</code>), missing dependencies, or incorrect Node version.</p>
      </details>

      <p><a href="/troubleshooting">View all troubleshooting tips →</a></p>

      <h2>Helpful Resources</h2>
      <ul>
        <li><a href="https://github.com/yourworkflows/repo">GitHub Pages Workflow Templates</a> - Copy-paste workflows for any framework</li>
        <li><a href="https://docs.github.com/en/pages">GitHub Pages Docs</a> - Official documentation</li>
        <li><a href="https://education.github.com/pack">GitHub Student Pack</a> - Explore all your free benefits</li>
      </ul>

      <div class="next-steps-box">
        <h3>What's Next?</h3>
        <ul>
          <li>Add a contact form with <a href="#">EmailJS</a></li>
          <li>Track visitors with <a href="#">Google Analytics</a></li>
          <li>Optimize for SEO with <a href="#">this checklist</a></li>
          <li>Add a blog with <a href="#">Jekyll</a> or <a href="#">Astro</a></li>
        </ul>
      </div>

      <p><em>Your domain is free for the first year. Renewal is ~$10-15/year at student rates.</em></p>
    `
  }
};