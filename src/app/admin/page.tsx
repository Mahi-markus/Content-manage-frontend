import React, { useState, useEffect } from 'react';
import {api} from "../../utils/api"


// Define interfaces for the data structures
interface Writer {
  id: number;
  username: string;
}

interface Content {
  id: number;
  title: string;
}

const AdminDashboard: React.FC = () => {
  const [writers, setWriters] = useState<Writer[]>([]);
  const [unassignedWriters, setUnassignedWriters] = useState<Writer[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedWriter, setSelectedWriter] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const writersRes = await api.get<Writer[]>('/users/writers/');
        const unassignedWritersRes = await api.get<Writer[]>('/users/unassigned_writers/');
        const contentsRes = await api.get<Content[]>('/contents/');
        
        setWriters(writersRes.data);
        setUnassignedWriters(unassignedWritersRes.data);
        setContents(contentsRes.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const assignToWriter = async (writerId: number, contentId: number) => {
    try {
      await api.post('/users/assign_to_writer/', { writerId, contentId });
      // Refetch data after successful assignment
      const writersRes = await api.get<Writer[]>('/users/writers/');
      const unassignedWritersRes = await api.get<Writer[]>('/users/unassigned_writers/');
      const contentsRes = await api.get<Content[]>('/contents/');
      
      setWriters(writersRes.data);
      setUnassignedWriters(unassignedWritersRes.data);
      setContents(contentsRes.data);
    } catch (error) {
      console.error('Failed to assign content', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Writers</h2>
          <ul className="space-y-2">
            {writers.map((writer) => (
              <li key={writer.id} className="p-2 bg-gray-50 rounded">
                {writer.username}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Unassigned Writers</h2>
          <ul className="space-y-2">
            {unassignedWriters.map((writer) => (
              <li key={writer.id} className="p-2 bg-gray-50 rounded">
                {writer.username}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contents</h2>
          <ul className="space-y-2">
            {contents.map((content) => (
              <li key={content.id} className="p-2 bg-gray-50 rounded flex items-center justify-between">
                <span>{content.title}</span>
                <select
                  className="ml-2 p-1 border rounded"
                  onChange={(e) => {
                    const writerId = parseInt(e.target.value);
                    if (!isNaN(writerId)) {
                      assignToWriter(writerId, content.id);
                    }
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Select writer</option>
                  {unassignedWriters.map((writer) => (
                    <option key={writer.id} value={writer.id}>
                      {writer.username}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;