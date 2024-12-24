import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import Layout from '../../components/Layout';

const createPost = async (data) => {
  const response = await api.post('/posts', data);
  return response.data;
};

const NewPost = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              {...register('title', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Body</label>
            <textarea
              {...register('body', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
            {mutation.isLoading ? 'Creating...' : 'Create Post'}
          </button>
          {mutation.isError && <p className="text-red-500">Error creating post</p>}
          {mutation.isSuccess && <p className="text-green-500">Post created successfully</p>}
        </form>
      </div>
    </Layout>
  );
};

export default NewPost;