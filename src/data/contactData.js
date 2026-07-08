// Contact section. The "Email me" button and the Email row both use `email`
// (with optional `emailSubject` prefilled). Add/remove `links` as you like.
export const contactData = {
  title: 'Reach out',
  description:
    "I'm always interested in new opportunities and interesting projects. Feel free to reach out if you'd like to collaborate or just say hello.",
  email: 'you@example.com',
  emailSubject: "Hello from your site",
  location: '[City, Country]',
  // Drop your résumé at public/resume.pdf and set this to '/resume.pdf' to
  // enable the ⌘K "Download résumé" command. Empty hides it.
  resumeUrl: '',
  links: [
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/your-handle',
      href: 'https://linkedin.com/in/your-handle',
    },
    {
      label: 'GitHub',
      value: 'github.com/your-handle',
      href: 'https://github.com/your-handle',
    },
  ],
};
