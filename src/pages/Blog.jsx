// src/pages/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useBlogPosts } from '../utils/blogUtils';
import '../styles/Blog.scss';

export default function Blog() {
  const { posts, loading, error } = useBlogPosts();

  return (
    <div className="blog">
      <Header />
      
      <div className="page-overlay">
        <div className="blog__header">
          <h1 className="blog__title">My Blog</h1>
          <p className="blog__description">
            Thoughts, stories, and ideas about web development, technology, and my journey as a developer.
          </p>
        </div>
        
        {loading ? (
          <div className="blog__loading">Loading posts...</div>
        ) : error ? (
          <div className="blog__error">{error}</div>
        ) : (
          <div className="blog__posts">
            {posts.map((post) => (
              <div className="blog-card" key={post.slug}>
                <div className="blog-card__content">
                  <h2 className="blog-card__title">
                    <Link to={post.path}>{post.title}</Link>
                  </h2>
                  <div className="blog-card__meta">
                    <span className="blog-card__date">{post.date}</span>
                    <span className="blog-card__author">by {post.author}</span>
                  </div>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <div className="blog-card__tags">
                    {post.tags && post.tags.map((tag, index) => (
                      <span className="tag" key={index}>{tag}</span>
                    ))}
                  </div>
                  <Link to={post.path} className="blog-card__read-more">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

