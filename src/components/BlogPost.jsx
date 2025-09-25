import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPostContent } from '../data/blogPosts';
import Button from './ui/Button';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPostContent[slug];

  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="container">
          <div className="blog-post-not-found">
            <h1>Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <Button variant="primary" onClick={() => window.location.href = '/'}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="blog-post-container">
      <div className="container">
        <article className="blog-post">
          <header className="blog-post-header">
            <h1 className="blog-post-title">{post.title}</h1>
            <div className="blog-post-meta">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.category}</span>
            </div>
          </header>
          
          <div 
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <footer className="blog-post-footer">
            <Button variant="secondary" onClick={() => window.location.href = '/'}>← Back to Home</Button>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
