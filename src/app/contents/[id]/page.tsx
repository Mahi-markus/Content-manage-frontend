import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../../utils/api';
import ContentLayout from './layout';

interface Content {
  id: number;
  title: string;
  body: string;
}

const ContentPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    if (id) {
      const fetchContent = async () => {
        try {
          const response = await api.get<Content>(`/contents/${id}/`);
          setContent(response.data);
        } catch (error) {
          console.error('Failed to fetch content', error);
        }
      };

      fetchContent();
    }
  }, [id]);

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <ContentLayout>
      <article>
        <h1>{content.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.body }} />
      </article>
    </ContentLayout>
  );
};

export default ContentPage;