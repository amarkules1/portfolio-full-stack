import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/blog') // Assuming the API endpoint is /api/blog
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching blog posts:', error));
    }, []);

    const truncateContent = (content, maxLength) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.substr(0, content.lastIndexOf(' ', maxLength)) + '...';
    };

    return (
        <div className="container">
            <h1 className="my-4">Blog</h1>
            <div className="row">
                {posts.map(post => (
                    <div key={post.id} className="col-md-8 offset-md-2 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">{post.title}</h2>
                                <p className="card-text"><small className="text-muted">{new Date(post.created_at).toLocaleDateString()}</small></p>
                                <p className="card-text">{truncateContent(post.content, 150)}</p>
                                <Link to={`/blog/${post.id}`} className="btn btn-primary">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
