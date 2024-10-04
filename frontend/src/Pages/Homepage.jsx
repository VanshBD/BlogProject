import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7890/BlogPersonalApp/blog/"
        );
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch posts");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-warning mb-4">Your Blog Posts</h2>
      {posts.length === 0 ? (
        <p className="text-light">No blog posts available.</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-md-4 mb-4">
              <div className="card bg-dark text-light border-0" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="card-header text-warning">By: {post.author}</div>
                <div className="card-body">
                  <h5 className="card-title">
                    <strong><i>Title: </i></strong>{post.title}
                  </h5>
                  <p className="card-text text-muted">
                    {post.description.length > 50
                      ? `${post.description.substring(0, 50)}...`
                      : post.description}
                  </p>
                  <Link to={`/blogs/${post._id}`} className="btn btn-primary">
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
