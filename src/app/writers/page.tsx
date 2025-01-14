"use client";

import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import CKEditorComponent from '@/components/CKEditorComponent';

const WritersPage: React.FC = () => {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await api.get('/writers');
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

  return (
    <div>
      <h1>Writers</h1>
      <CKEditorComponent />
      <ul>
        {writers.map((writer: any) => (
          <li key={writer.id}>{writer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WritersPage;