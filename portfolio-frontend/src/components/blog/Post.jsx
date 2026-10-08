import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    fetch(`/blog/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Article not found");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        setError("Failed to load article");
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="loading-pulse-container">
          <div className="loading-spinner"></div>
          <p style={{ color: "var(--text-emerald)" }}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-5">
        <div className="text-center my-5 p-4" style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "14px", color: "#fca5a5" }}>
          <h4>Unable to load article</h4>
          <p className="mb-4" style={{ color: "#f87171" }}>{error || "Article could not be found."}</p>
          <Link to="/blog" className="btn-emerald-outline">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="mb-4">
              <Link to="/blog" className="btn-emerald-outline" style={{ padding: "6px 16px", fontSize: "0.85rem" }}>
                ← Back to Articles
              </Link>
            </div>

            <article className="blog-post-body">
              <header className="mb-4 pb-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <span className="blog-date">
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })
                    : ""}
                </span>
                <h1 className="mt-2 mb-3" style={{ fontSize: "2.4rem", lineHeight: 1.2 }}>
                  {post.title}
                </h1>
              </header>

              <div className="post-markdown-content" style={{ color: "var(--text-main)", lineHeight: 1.8 }}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
