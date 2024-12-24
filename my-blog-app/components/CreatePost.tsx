import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

interface CreatePostProps {
  token: string;
  userId: number;
}

const CreatePost: React.FC<CreatePostProps> = ({ token, userId }) => {
  const [loading, setLoading] = useState(false);

const onFinish = async (values: { title: string; body: string; }) => {
    setLoading(true);
    try {
      await axios.post(
        'https://gorest.co.in/public/v2/posts',
        { title: values.title, body: values.body, user: values.body, user_id: userId },
        { headers: { Authorization: `Bearer 545edee0e291e7948c3d714f0c3fc8143011fd476d317b9e1133be3cd0341316` } }
      );
      message.success('Post created successfully');
    } catch (err) {
      message.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="body" rules={[{ required: true, message: 'Please input the body!' }]}>
        <Input.TextArea placeholder="Body" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePost;