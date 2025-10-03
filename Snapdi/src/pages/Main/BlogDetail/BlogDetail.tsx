import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tag, Button, message } from 'antd';
import { ArrowLeftOutlined, ShareAltOutlined, CalendarOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';
import { Helmet } from '@dr.pogodin/react-helmet';
import { getBlogById } from '../../../services/blogService';
import type { Blog } from '../../../lib/types';
import './BlogDetail.css';

const BlogDetail: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log('BlogDetail render - State:', {
    blogId,
    hasBlog: !!blog,
    error,
    blogTitle: blog?.title
  });

  useEffect(() => {
    console.log('BlogDetail useEffect triggered with blogId:', blogId);
    if (blogId) {
      fetchBlogDetail(blogId);
    } else {
      console.error('Blog ID not provided from URL params');
      setError('Blog ID not provided');
    }
  }, [blogId]);

  const fetchBlogDetail = async (id: string) => {
    try {
      setError(null); // Reset error state
      console.log('Fetching blog detail for ID:', id);

      const response = await getBlogById(id);
      console.log('Blog detail response:', response);
      console.log('Response structure analysis:', {
        hasData: !!response.data,
        responseKeys: Object.keys(response),
        dataKeys: response.data ? Object.keys(response.data) : null,
        directResponseKeys: Object.keys(response).filter(key => key !== 'data'),
        fullResponse: JSON.stringify(response, null, 2)
      });

      // Handle different response structures
      let blogData: Blog | null = null;

      // Case 1: ResponseModel<Blog> - response.data contains the blog
      if (response.data && typeof response.data === 'object') {
        blogData = response.data;
        console.log("Using ResponseModel structure - blog in response.data");
      }
      // Case 2: Direct Blog object - response is the blog itself
      else if (response && (response as any).blogId) {
        blogData = response as unknown as Blog;
        console.log("Using direct Blog structure - response is blog");
      }
      // Case 3: Wrapped in another property
      else if (response && Object.keys(response).length > 0) {
        // Try to find blog data in other properties
        const possibleBlog = Object.values(response).find((value: any) =>
          value && typeof value === 'object' && value.blogId
        );
        if (possibleBlog) {
          blogData = possibleBlog as Blog;
          console.log("Found blog in nested property");
        }
      }

      if (blogData) {
        // Validate required blog fields
        const requiredFields = ['blogId', 'title', 'content'];
        const hasRequiredFields = requiredFields.every(field => blogData[field as keyof Blog]);

        console.log('Blog validation:', {
          hasBlogData: !!blogData,
          hasRequiredFields,
          blogId: blogData.blogId,
          title: blogData.title,
          missingFields: requiredFields.filter(field => !blogData[field as keyof Blog])
        });

        if (hasRequiredFields) {
          setBlog(blogData);
          console.log('Blog loaded successfully:', blogData);
          setError(null);
        } else {
          console.error('Blog data missing required fields:', {
            blogData,
            missingFields: requiredFields.filter(field => !blogData[field as keyof Blog])
          });
          setError('Blog data incomplete');
        }
      } else {
        console.error('No valid blog data found in response:', response);
        setError('Blog not found');
      }
    } catch (error) {
      console.error('Error fetching blog detail:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        error
      });
      setError('Failed to load blog. Please try again.');
    }
  };

  const handleShare = () => {
    if (navigator.share && blog) {
      navigator.share({
        title: blog.title,
        text: `Check out this blog: ${blog.title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        message.success('Link copied to clipboard!');
      }).catch(() => {
        message.error('Failed to copy link');
      });
    }
  };

  const handleBack = () => {
    navigate('/blog');
  };


  // Error state
  if (error || !blog) {
    return (
      <div className="blog-error-container">
        <div className="error-content">
          <div className="error-icon">
            <EyeOutlined style={{ fontSize: '4rem', color: '#ff4d4f' }} />
          </div>
          <h1 className="error-title">
            {error || 'Blog not found'}
          </h1>
          <p className="error-description">
            The blog post you're looking for doesn't exist or may have been removed.
          </p>
          <div className="error-actions">
            <Button type="primary" onClick={handleBack} icon={<ArrowLeftOutlined />}>
              Back to Blogs
            </Button>
            <Button onClick={() => navigate('/')}>
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Generate SEO meta tags
  const seoKeywords = blog.keywords?.map(k => k.keyword).join(', ') || '';
  const seoDescription = blog.content
    ? blog.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...'
    : blog.title;

  // Generate canonical URL
  const canonicalUrl = `${window.location.origin}/blog/${blog.blogId}`;

  // Format dates for structured data
  const publishedDate = blog.createAt ? new Date(blog.createAt).toISOString() : '';
  const modifiedDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : publishedDate;

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{blog.title} | Snapdi Blog</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content={blog.authorName} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={blog.thumbnailUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Snapdi Blog" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SnapdiOfficial" />
        <meta name="twitter:creator" content={`@${blog.authorName}`} />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={blog.thumbnailUrl} />
        <meta name="twitter:image:alt" content={blog.title} />

        {/* Facebook Meta Tags */}
        <meta property="fb:app_id" content="your-facebook-app-id" />

        {/* Additional Open Graph Tags */}
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:section" content="Technology" />
        <meta property="article:section" content="Blog" />

        {/* Article Meta Tags */}
        <meta property="article:author" content={blog.authorName} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        {blog.keywords?.map((keyword, index) => (
          <meta key={index} property="article:tag" content={keyword.keyword} />
        ))}

        {/* Robots and SEO directives */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": seoDescription,
            "image": {
              "@type": "ImageObject",
              "url": blog.thumbnailUrl,
              "width": "1200",
              "height": "630"
            },
            "author": {
              "@type": "Person",
              "name": blog.authorName
            },
            "publisher": {
              "@type": "Organization",
              "name": "Snapdi",
              "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/logo.png`,
                "width": "200",
                "height": "60"
              }
            },
            "datePublished": publishedDate,
            "dateModified": modifiedDate,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            },
            "keywords": seoKeywords,
            "wordCount": blog.content ? blog.content.replace(/<[^>]*>/g, '').split(' ').length : 0,
            "articleBody": blog.content ? blog.content.replace(/<[^>]*>/g, '') : '',
            "url": canonicalUrl
          })}
        </script>

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `${window.location.origin}/blog`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": blog.title,
                "item": canonicalUrl
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="blog-detail-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav">
          <ol className="breadcrumb-list">
            <li>
              <button onClick={() => navigate('/')} className="breadcrumb-link">
                Home
              </button>
            </li>
            <li>
              <span className="breadcrumb-separator">/</span>
              <button onClick={() => navigate('/blog')} className="breadcrumb-link">
                Blog
              </button>
            </li>
            <li>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{blog.title}</span>
            </li>
          </ol>
        </nav>

        {/* Header Actions */}
        <div className="blog-header-actions flex flex-row items-center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="back-button"
          >
            Back to Blogs
          </Button>

          <Button
            type="text"
            icon={<ShareAltOutlined />}
            onClick={handleShare}
            className="share-button"
          >
            Share
          </Button>
        </div>

        {/* Blog Content */}
        <article className="blog-article">
          {/* Blog Header */}
          <header className="blog-header">
            <h1 className="blog-title">{blog.title}</h1>

            {/* Blog Meta */}
            <div className="blog-meta">
              <div className="meta-item">
                <UserOutlined />
                <span>By {blog.authorName}</span>
              </div>

              <div className="meta-item">
                <CalendarOutlined />
                <span>{new Date(blog.createAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>

              {blog.updatedAt && blog.updatedAt !== blog.createAt && (
                <div className="meta-item">
                  <EyeOutlined />
                  <span>Updated {new Date(blog.updatedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Keywords Tags */}
            {blog.keywords && blog.keywords.length > 0 && (
              <div className="blog-keywords">
                {blog.keywords.map((keyword, index) => (
                  <Tag key={index} color="blue" className="keyword-tag">
                    {keyword.keyword}
                  </Tag>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {blog.thumbnailUrl && (
            <figure className="blog-image-container">
              <img
                src={blog.thumbnailUrl}
                alt={blog.title}
                className="blog-featured-image"
                loading="lazy"
                width="800"
                height="400"
              />
              <figcaption className="sr-only">{blog.title}</figcaption>
            </figure>
          )}

          {/* Blog Content */}
          <div className="blog-content">
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="blog-text-content"
            />
          </div>

          {/* Blog Footer */}
          <footer className="blog-footer">
            <div className="blog-footer-actions">
              <Button
                type="primary"
                icon={<ShareAltOutlined />}
                onClick={handleShare}
              >
                Share this article
              </Button>

              <Button onClick={handleBack}>
                Read more articles
              </Button>
            </div>

            {/* Tags (Duplicate for footer) */}
            {blog.keywords && blog.keywords.length > 0 && (
              <div className="blog-footer-tags">
                <span className="tags-label">Tags:</span>
                {blog.keywords.map((keyword, index) => (
                  <Tag
                    key={index}
                    color="geekblue"
                    className="cursor-pointer hover:bg-blue-600 hover:text-white"
                    onClick={() => {
                      // Navigate to search results for this keyword
                      navigate(`/blog?keyword=${encodeURIComponent(keyword.keyword)}`);
                    }}
                  >
                    {keyword.keyword}
                  </Tag>
                ))}
              </div>
            )}

            {/* Author Info */}
            <div className="blog-author-info">
              <div className="author-card">
                <UserOutlined className="author-icon" />
                <div className="author-details">
                  <h4 className="author-name">Written by {blog.authorName}</h4>
                  <p className="author-bio">
                    Professional content creator sharing insights and stories through Snapdi Blog.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
};

export default BlogDetail;