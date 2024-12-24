import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

interface UpdatePostProps {
  token: string;
  postId: number;
}

const UpdatePost: React.FC<UpdatePostProps> = ({ token, postId }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({ title: '', body: '' });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://gorest.co.in/public/v2/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(response.data.data);
      } catch (err) {
        message.error('Failed to fetch post');
      }
    };

    fetchPost();
  }, [postId, token]);

  const onFinish = async (values: { title: string; body: string }) => {
    setLoading(true);
    try {
      await axios.put(
        `https://gorest.co.in/public/v1/posts/${postId}`,
        { title: values.title, body: values.body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success('Post updated successfully');
    } catch (err) {
      message.error('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form initialValues={post} onFinish={onFinish}>
      <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="body" rules={[{ required: true, message: 'Please input the body!' }]}>
        <Input.TextArea placeholder="Body" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdatePost;