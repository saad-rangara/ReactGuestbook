import { useState } from "react";

export default function FormPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        feedbacktype: "",
        comments: "",
    });

    const handleChange = (change) => {
        const { name, value} = change.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting Feedback",formData);

        const newPost = {
            name: formData.name,
            email: formData.email,
            feedbacktype:  formData.feedbacktype,
            comments: formData.comments,
        };

        try {
            const response = await fetch("https://reactguestbookserver-41lq.onrender.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                console.log("Form data successfully submitted");
                setFormData({
                    name: "",
                    email: "",
                    feedbacktype: "",
                    comments: "",
                });
            } else {
                console.log("Error submitting form data");
            }} catch (error) {
                console.error("Error submitting form data:", error);
            }
        };

    return (
        <div className="feedback-container">
            <h2>Guest Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" id="name"  name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                    <label htmlFor="email"></label>
                    <input type="email" id="email"  name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="feedbacktype"></label>
                    <select id="feedbacktype" name="feedbacktype" value={formData.feedbacktype} onChange={handleChange} required >
                    <option value="">Select a feedback type</option>
                    <option value="General">General</option>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Compliment">Compliment</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="comments"></label>
                    <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} placeholder="Enter your comments here" required />
                </div>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
}