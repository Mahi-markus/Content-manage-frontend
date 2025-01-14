"use client"; // Marking the file as a client component

import React, { useEffect, useState } from 'react';
import ContentLayout from '../layout'; // Adjust the import path if necessary

interface Feedback {
  id: number;
  content: number;
  comment: string;
  manager: number;
  created_at: string;
}

interface Content {
  id: number;
  title: string;
  content: string;
  status: string;
  writter: number;
  manager: number;
  created_at: string;
  updated_at: string;
  approved_at: string;
  feedbacks: Feedback[];
}

const ContentPage: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`http://localhost:8000/api/contents/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          let errorData = {};

          if (contentType && contentType.includes('application/json')) {
            errorData = await response.json();
          }

          console.error('Error response:', errorData);
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data: Content[] = await response.json();
        setContents(data);
      } catch (error: any) {
        console.error('Failed to fetch contents', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  const handleContentClick = async (contentId: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:8000/api/contents/${contentId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorData = {};

        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        }

        console.error('Error response:', errorData);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data: Content = await response.json();
      setSelectedContent(data);
    } catch (error: any) {
      console.error('Failed to fetch content details', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ContentLayout>
      <h1>Your Contents</h1>
      {selectedContent === null ? (
        <ul>
          {contents.map(content => (
            <li key={content.id} onClick={() => handleContentClick(content.id)}>
              {content.title}
            </li>
          ))}
        </ul>
      ) : (
        <article>
          <h2>{selectedContent.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: selectedContent.content }} />
          <p>Status: {selectedContent.status}</p>
          <p>Writter ID: {selectedContent.writter}</p>
          <p>Manager ID: {selectedContent.manager}</p>
          <p>Created At: {new Date(selectedContent.created_at).toLocaleString()}</p>
          <p>Updated At: {new Date(selectedContent.updated_at).toLocaleString()}</p>
          <p>Approved At: {selectedContent.approved_at ? new Date(selectedContent.approved_at).toLocaleString() : 'Not approved yet'}</p>
          <h3>Feedbacks</h3>
          {selectedContent.feedbacks.length > 0 ? (
            <ul>
              {selectedContent.feedbacks.map(feedback => (
                <li key={feedback.id}>
                  <p>Comment: {feedback.comment}</p>
                  <p>Manager ID: {feedback.manager}</p>
                  <p>Created At: {new Date(feedback.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No feedbacks available</p>
          )}
          <button onClick={() => setSelectedContent(null)}>Back to list</button>
        </article>
      )}
    </ContentLayout>
  );
};

export default ContentPage;