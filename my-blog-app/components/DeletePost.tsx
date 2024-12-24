import React from 'react';
import { Button, Modal, message } from 'antd';
import axios from 'axios';

interface DeletePostProps {
  token: string;
  postId: number;
  onDelete: () => void;
}

const DeletePost: React.FC<DeletePostProps> = ({ token, postId, onDelete }) => {
  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this post?',
      onOk: async () => {
        try {
          await axios.delete(`https://gorest.co.in/public/v2/posts/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          message.success('Post deleted successfully');
          onDelete();
        } catch (err) {
          message.error('Failed to delete post');
        }
      },
    });
  };

return (
    <Button type="primary" danger onClick={handleDelete}>
        Delete Post
    </Button>
);
};

export default DeletePost;