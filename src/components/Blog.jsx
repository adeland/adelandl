import React from 'react';

const Blog = () => {
  // Sample blog posts data - in a real app, this would come from an API or CMS
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Minimalist Design",
      excerpt: "Exploring the principles of minimalist design and how they can be applied to create more meaningful user experiences.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Design",
      slug: "art-of-minimalist-design"
    },
    {
      id: 2,
      title: "Building Scalable React Applications",
      excerpt: "Best practices for structuring React applications that can grow with your team and requirements.",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Development",
      slug: "building-scalable-react-applications"
    },
    {
      id: 3,
      title: "Data Science in the Modern World",
      excerpt: "How data science is transforming industries and what it means for the future of technology.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Data Science",
      slug: "data-science-modern-world"
    },
    {
      id: 4,
      title: "The Philosophy of Zen in Technology",
      excerpt: "Applying zen principles to software development and finding balance in our digital lives.",
      date: "2024-01-01",
      readTime: "4 min read",
      category: "Philosophy",
      slug: "zen-philosophy-technology"
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="blog" className="section">
      <div className="container">
        <h2 className="section-title">thoughts</h2>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <h3 className="blog-title">{post.title}</h3>
              <div className="blog-meta">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>
              <p className="blog-excerpt">{post.excerpt}</p>
              <a href={`/blog/${post.slug}`} className="blog-link">
                read more
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
