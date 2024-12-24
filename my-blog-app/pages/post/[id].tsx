import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Spin, Alert } from 'antd';

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`https://gorest.co.in/public/v1/posts/${id}`);
          setPost(response.data.data);
        } catch (err) {
          setError('Failed to fetch post');
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id]);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <p>Author: {post.user_id}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetail;