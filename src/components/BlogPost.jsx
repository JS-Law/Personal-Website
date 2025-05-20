// src/components/BlogPost.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import Header from './Header';
import { useBlogPost } from '../utils/blogUtils';
import '../styles/BlogPost.scss';

export default function BlogPost() {
  const { slug } = useParams();
  const { post, loading, error } = useBlogPost(slug);

  // Custom renderer for code blocks to enable syntax highlighting
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="blog-post-page">
      <Header />
      
      <div className="blog-post__container">
      
        {loading ? (
          <div className="blog-post__loading">Loading post...</div>
        ) : error ? (
          <div className="blog-post__error">{error}</div>
        ) : post ? (
          <>
            <div className="blog-post__navigation">
              <Link to="/blog" className="blog-post__back">
                <span className="blog-post__back-arrow">←</span> Back to Blog
              </Link>
            </div>
            
            <div className="blog-post__header">
              <h1 className="blog-post__title">{post.title}</h1>
              <div className="blog-post__meta">
                <span className="blog-post__date">{post.date}</span>
                <span className="blog-post__author">by {post.author}</span>
              </div>
              {post.tags && (
                <div className="blog-post__tags">
                  {post.tags.map((tag, index) => (
                    <span className="tag" key={index}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="blog-post__content">
              <ReactMarkdown
                components={components}
                remarkPlugins={[remarkGfm]}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </>
        ) : (
          <div className="blog-post__not-found">
            <h2>Post Not Found</h2>
            <p>Sorry, the blog post you're looking for could not be found.</p>
            <div className="blog-post__navigation">
              <Link to="/blog" className="blog-post__back blog-post__back--button">
                Return to Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

