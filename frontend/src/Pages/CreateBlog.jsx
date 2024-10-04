import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://blog-project-server-8inikd1cu-vanshdobariyas-projects.vercel.app/create', { title, description, author });
            setSuccess('Blog post created successfully!');
            navigate("/");
            setError('');
            // Optionally reset the form
            setTitle('');
            setDescription('');
            setAuthor('');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create blog post');
            setSuccess('');
        }
    };

    return (
        <div className="container mt-5 ">
            <h2 className="text-warning mb-4">Create a New Blog Post</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label text-light">Title</label>
                    <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label text-light">Description</label>
                    <textarea
                        className="form-control bg-dark text-light border-secondary"
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label text-light">Author</label>
                    <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Blog Post</button>
            </form>
        </div>
    );
};

export default CreateBlog;
