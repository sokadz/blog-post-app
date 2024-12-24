import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`https://gorest.co.in/public/v2/posts/${id}`)
        .then(response => {
          setPost(response.data);
        })
        .catch(error => {
          console.error('Error fetching post:', error);
        });
    }
  }, [id]);

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