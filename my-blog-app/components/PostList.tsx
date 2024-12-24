"use client";

import React, { useState, useEffect } from 'react';
import { List, Pagination, Input, Spin, Alert } from 'antd';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://gorest.co.in/public/v2/posts', {
          params: { page, search },
          headers: { Authorization: `Bearer 545edee0e291e7948c3d714f0c3fc8143011fd476d317b9e1133be3cd0341316` },
        });
        setPosts(response.data.data);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search]);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div>
      <Input.Search
        placeholder="Search posts"
        onSearch={(value) => setSearch(value)}
        style={{ marginBottom: 20 }}
      />
      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item key={post.id}>
            <List.Item.Meta title={post.title} description={post.body} />
          </List.Item>
        )}
      />
      <Pagination
        current={page}
        onChange={(page) => setPage(page)}
        total={100}
      />
    </div>
  );
};

export default PostList;