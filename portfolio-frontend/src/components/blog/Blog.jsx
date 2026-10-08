import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/blog")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts");
        setLoading(false);
      });
  }, []);

  const truncateContent = (content, maxLength) => {
    if (!content) return "";
    if (content.length <= maxLength) {
      return content;
    }
    return content.substr(0, content.lastIndexOf(" ", maxLength)) + "...";
  };

  return (
    <div className="blog-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Blog</h1>
          <p className="page-subtitle">
            Articles on data engineering, machine learning pipelines, and software development.
          </p>
        </div>

        {loading && (
          <div className="loading-pulse-container">
            <div className="loading-spinner"></div>
            <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>Loading articles...</p>
          </div>
        )}

        {error && (
          <div className="text-center my-4 p-4" style={{ background: "#180d0d", border: "1px solid #4a1818", borderRadius: "8px", color: "#fca5a5" }}>
            <h4>Unable to load posts</h4>
            <p className="m-0" style={{ color: "#f87171" }}>{error}</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center my-4 p-5" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "10px" }}>
            <h3 style={{ color: "var(--text-main)", fontSize: "1.2rem" }}>No articles published yet</h3>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>Check back soon for new posts.</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="row justify-content-center">
            {posts.map((post) => (
              <div key={post.id} className="col-lg-8 mb-3">
                <div className="blog-card">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="blog-date">
                      {post.created_at
                        ? new Date(post.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })
                        : "Article"}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                      {post.read_time || "5 min read"}
                    </span>
                  </div>

                  <h2 className="mb-2" style={{ fontSize: "1.35rem" }}>
                    {post.title}
                  </h2>

                  <p className="project-description mb-3">
                    {truncateContent(post.content, 180)}
                  </p>

                  <Link to={`/blog/${post.id}`} className="btn-emerald-primary" style={{ padding: "6px 16px", fontSize: "0.85rem" }}>
                    Read Article &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
