"use client";

import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import CKEditorComponent from '@/components/CKEditorComponent'; // Ensure this path is correct

const WritersPage: React.FC = () => {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWriter, setSelectedWriter] = useState<any>(null); // State for selected writer

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await api.get('/api/users/writers/');
        setWriters(response.data);
      } catch (error) {
        console.error('Failed to fetch writers', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWriters();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleWriterClick = (writer: any) => {
    setSelectedWriter(writer); // Set the selected writer when clicked
  };

  return (
    <div>
      <h1>Writers</h1>
      
      <ul>
        {writers.map((writer: any) => (
          <li key={writer.id} onClick={() => handleWriterClick(writer)}>
            {writer.username}
          </li>
        ))}
      </ul>
      {selectedWriter && (
        <div>
          <h2>Writer Details</h2>
          <p><strong>ID:</strong> {selectedWriter.id}</p>
          <p><strong>Username:</strong> {selectedWriter.username}</p>
          <p><strong>Email:</strong> {selectedWriter.email}</p>
          <p><strong>Managed By:</strong> {selectedWriter.managed_by}</p>
          <p><strong>Assigned Contents Count:</strong> {selectedWriter.assigned_contents_count}</p>
        </div>
      )}
    </div>
  );
};

export default WritersPage;