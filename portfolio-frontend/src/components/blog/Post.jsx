import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Post = () => {
    const [post, setPost] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        fetch(`/blog/${postId}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>{post.title}</h1>
                    <p><small className="text-muted">{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</small></p>
                    <hr />
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default Post;
