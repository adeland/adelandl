import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  // Blog posts data - placeholder for future content
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Full-Stack Development",
      excerpt: "Exploring the evolving landscape of full-stack development, from microservices architecture to the rise of edge computing and how it's reshaping how we build applications.",
      date: "2024-12-19",
      readTime: "6 min read",
      category: "Development",
      slug: "future-fullstack-development"
    },
    {
      id: 2,
      title: "Building Scalable React Applications",
      excerpt: "Best practices for structuring React applications that can grow with your team and requirements. Learn about component architecture, state management, and performance optimization.",
      date: "2024-12-18",
      readTime: "8 min read",
      category: "React",
      slug: "scalable-react-applications"
    },
    {
      id: 3,
      title: "My Journey into Blockchain Development",
      excerpt: "From smart contracts to decentralized applications, sharing my experience learning Solidity and building on Ethereum. The challenges, breakthroughs, and lessons learned.",
      date: "2024-12-17",
      readTime: "7 min read",
      category: "Blockchain",
      slug: "blockchain-development-journey"
    },
    {
      id: 4,
      title: "Data Science in the Modern World",
      excerpt: "How data science is transforming industries and what it means for the future of technology. From machine learning pipelines to real-time analytics and beyond.",
      date: "2024-12-16",
      readTime: "5 min read",
      category: "Data Science",
      slug: "data-science-modern-world"
    },
    {
      id: 5,
      title: "Career Advice for New Developers",
      excerpt: "Practical tips for landing your first tech job, building a strong portfolio, and navigating the early stages of a software development career.",
      date: "2024-12-15",
      readTime: "4 min read",
      category: "Career",
      slug: "career-advice-new-developers"
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
        <h2 className="section-title">Thoughts</h2>
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
              <Link to={`/blog/${post.slug}`} className="blog-link">
                Read More
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
