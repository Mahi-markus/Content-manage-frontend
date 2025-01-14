"use client";

import React, { useState } from "react";

const FeedbackNavbar: React.FC = () => {
  const [contentId, setContentId] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentId || !comment.trim()) {
      setMessage("Content ID and comment are required.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const requestBody = {
        content: contentId,
        comment: comment.trim(),
      };

      const response = await fetch("http://localhost:8000/api/feedbacks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to post feedback: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Feedback successfully posted:", responseData);
      setMessage("Feedback posted successfully!");
    } catch (error: any) {
      console.error("Error posting feedback:", error);
      setMessage(error.message || "An error occurred while posting feedback.");
    } finally {
      setLoading(false);
      setContentId(null);
      setComment("");
    }
  };

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f8f9fa" }}>
      <h2>Post Feedback</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem" }}>
        <input
          type="number"
          placeholder="Content ID"
          value={contentId || ""}
          onChange={(e) => setContentId(Number(e.target.value))}
          required
          style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Posting..." : "Post Feedback"}
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem", color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}
    </nav>
  );
};

export default FeedbackNavbar;
