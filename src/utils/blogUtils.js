import { useEffect, useState } from 'react';
import matter from 'gray-matter';

// No direct imports - we'll fetch markdown content

// Helper function to preprocess markdown content
function preprocessMarkdown(markdown) {
  // Normalize newlines to LF (Unix style)
  let processed = markdown.replace(/\r\n/g, '\n');
  
  // Ensure frontmatter has proper delimiter spacing
  if (processed.startsWith('---')) {
    // Find the end of frontmatter (second ---)
    const endOfFrontmatter = processed.indexOf('---', 3);
    if (endOfFrontmatter > 0) {
      // Extract frontmatter content
      const frontmatter = processed.substring(3, endOfFrontmatter).trim();
      
      // Normalize frontmatter: ensure each line is properly formatted for YAML
      const normalizedFrontmatter = frontmatter
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
      
      // Reconstruct markdown with normalized frontmatter
      processed = `---\n${normalizedFrontmatter}\n---\n${processed.substring(endOfFrontmatter + 3)}`;
    }
  }
  
  return processed;
}

// Function to extract metadata from markdown content
function extractMetadata(markdown, slug) {
  try {
    // console.log(`Extracting metadata for ${slug}, content length: ${markdown.length}`);
    // console.log(`First 100 chars of markdown: ${markdown.substring(0, 100)}`);
    
    if (!markdown || markdown.trim() === '') {
      throw new Error('Markdown content is empty');
    }
    
    // Preprocess the markdown to handle potential issues
    const processedMarkdown = preprocessMarkdown(markdown);
    // console.log(`Processed markdown first 100 chars: ${processedMarkdown.substring(0, 100)}`);
    
    // Check if the markdown has proper frontmatter format
    if (!processedMarkdown.startsWith('---')) {
      console.warn(`Markdown for ${slug} doesn't start with proper frontmatter delimiter`);
    }
    
    // Parse the markdown file with gray-matter with more options for robustness
    const { data, content } = matter(processedMarkdown, {
      excerpt: true,
      excerpt_separator: '\n\n',
    });
    
    // console.log(`Parsed frontmatter data:`, data);
    
    // Convert tags string to array if needed
    let tags = data.tags;
    if (tags && typeof tags === 'string') {
      tags = tags.split(',').map(tag => tag.trim());
    }
    
    return {
      slug,
      path: `/blog/${slug}`,
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Jeff Stanley',
      tags: tags || [],
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      content
    };
  } catch (error) {
    // console.error(`Error extracting metadata from ${slug}:`, error);
    // console.error(`Error stack:`, error.stack);
    
    // Try to salvage what we can
    let title = 'Error Loading Post';
    let date = new Date().toISOString().split('T')[0];
    let partialContent = '';
    
    try {
      // Try manual frontmatter extraction if gray-matter failed
      const frontmatterMatch = markdown.match(/---\n([\s\S]*?)\n---\n([\s\S]*)/);
      if (frontmatterMatch) {
        const rawFrontmatter = frontmatterMatch[1];
        partialContent = frontmatterMatch[2].trim();
        
        // Try to extract title and date from the raw frontmatter
        const titleLine = rawFrontmatter.split('\n').find(line => line.startsWith('title:'));
        if (titleLine) {
          title = titleLine.substring(6).trim();
        }
        
        const dateLine = rawFrontmatter.split('\n').find(line => line.startsWith('date:'));
        if (dateLine) {
          date = dateLine.substring(5).trim();
        }
      } else {
        // Fallback to searching for a markdown title if frontmatter parsing failed completely
        const titleMatch = markdown.match(/# (.*?)(\n|$)/);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1].trim();
        }
        
        // Get some content even if parsing failed
        partialContent = markdown.replace(/---[\s\S]*?---/, '')  // Remove frontmatter
                               .trim();
      }
    } catch (parseError) {
      console.error('Failed to extract partial content:', parseError);
    }
    
    return {
      slug,
      path: `/blog/${slug}`,
      title: title,
      date: date,
      content: partialContent || 'Error loading this post. Please try again later.'
    };
  }
}

// Blog posts information for preview
const blogPostsInfo = [
  {
    slug: 'welcome-post',
    title: 'Welcome to My Blog',
    date: '2025-05-18',
    author: 'Jeff Stanley',
    tags: ['welcome', 'introduction', 'web development'],
    excerpt: 'A brief introduction to my new blog and what you can expect to find here.',
    path: '/blog/welcome-post'
  },
  {
    slug: 'getting-started-with-react',
    title: 'Getting Started with React in 2025',
    date: '2025-05-20',
    author: 'Jeff Stanley',
    tags: ['react', 'javascript', 'web development', 'tutorial'],
    excerpt: 'A beginner-friendly guide to setting up your first React project and understanding core concepts.',
    path: '/blog/getting-started-with-react'
  }
];

// Function to load blog post metadata
export const useBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        // Sort posts by date (newest first)
        const sortedPosts = [...blogPostsInfo]
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  return { posts, loading, error };
};

// Function to load a single blog post content
export const useBlogPost = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        // Find post info in our pre-defined posts
        const postInfo = blogPostsInfo.find(p => p.slug === slug);
        
        if (!postInfo) {
          throw new Error("Post not found");
        }
        
        // Fetch markdown content from content directory
        const fetchUrl = `/content/blog/${slug}.md`;
        console.log(`Fetching markdown from: ${fetchUrl}`);
        
        const response = await fetch(fetchUrl);
        
        if (!response.ok) {
          console.error(`Fetch failed with status: ${response.status}`);
          console.error(`Response details:`, response);
          throw new Error(`Failed to load post content: ${response.status}`);
        }
        
        const markdown = await response.text();
        // console.log(`Markdown content loaded, length: ${markdown.length}`);
        // console.log('First 100 chars:', markdown.substring(0, 100) + '...');
        
        // Validate the markdown content
        if (!markdown || markdown.trim() === '') {
          throw new Error('Received empty markdown content');
        }
        
        try {
          // Extract metadata and content
          // console.log('Calling extractMetadata...');
          // console.log('Markdown sample for debugging:', markdown.substring(0, 300));
          const fullPostData = extractMetadata(markdown, slug);
          
          // Merge with known post info for better error handling
          setPost({
            ...postInfo,
            ...fullPostData
          });
          // console.log('Post data successfully set:', fullPostData.title);
        } catch (parseError) {
          console.error("Error parsing markdown content:", parseError);
          console.error("Error stack:", parseError.stack);
          
          // Try to format the markdown directly if parsing fails
          // console.log('Attempting fallback rendering of raw markdown...');
          setPost({
            ...postInfo,
            content: markdown,
            title: postInfo.title || 'Post Load Error',
            errorDetails: parseError.message
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to load blog post:", err);
        setError("Failed to load this blog post. Please try again later.");
        setLoading(false);
      }
    };

    if (slug) {
      loadBlogPost();
    }
  }, [slug]);

  return { post, loading, error };
};
