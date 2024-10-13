import { useState, useEffect } from "react";

export default function PostPage() {
    const [posts, setPosts] = useState([]);
    const [feedbackTypes, setFeedbackTypes] = useState([]);
    const [selectType, setSelectType] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const base_url = "https://reactguestbookserver-41lq.onrender.com";
    const delete_handler = async (post_id) => {
        console.log("Delete Post", post_id);
        try {
            await fetch(`${base_url}/posts/${post_id}`, {
                method: "DELETE",
            });
            fetchPosts();
        } catch (error) {
            console.error("Error deleting post", error);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${base_url}/posts`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
                setFilteredPosts(data);
            } else {
                console.error("Failed to fetch posts from server.");
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const fetchFeedbackTypes = async () => {
        try {
            const response = await fetch(`${base_url}/feedback-types`);
            if (response.ok) {
                const data = await response.json();
                setFeedbackTypes(data);
            } else {
                console.error("Error fetching feedback types", response);
            }
        } catch (error) {
            console.error("Error fetching feedback types", error);
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchFeedbackTypes();
    }, []);

    useEffect(() => {
        console.log("type selection changed")
        if (selectType) {
            const filtered = posts.filter((post) => post.feedbacktype === selectType);
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [selectType, posts]);

    return (
        <>
            <h1>My Posts</h1>
            <div>
                <label htmlFor="feedbackType">Filter by Feedback Type:</label>
                <select
                    id="feedbackTypes"
                    value={selectType}
                    onChange={(e) => setSelectType(e.target.value)}
                >
                    <option value="">All</option>
                    {feedbackTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                    <div key={post.id || index}>
                        <h2>Name: {post.name}</h2>
                        <h3>Feedback Type: {post.feedbacktype}</h3>
                        <p>Comments: {post.comments}</p>
                        <button onClick={() => delete_handler(post.id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No posts yet</p>
            )}
        </>
    );
}