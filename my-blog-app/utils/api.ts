import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gorest.co.in/public/v2',
});

api.interceptors.request.use((config) => {
    const token = '545edee0e291e7948c3d714f0c3fc8143011fd476d317b9e1133be3cd0341316';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const fetchPosts = async (page: number, search: string) => {
    const { data } = await api.get('/posts', { params: { page, search } });
    return data;
};

export const fetchPost = async (id: number) => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
};

export const createPost = async (post: { title: string; body: string }) => {
    const { data } = await api.post('/posts', post);
    return data;
};

export const updatePost = async (id: number, post: { title: string; body: string }) => {
    const { data } = await api.put(`/posts/${id}`, post);
    return data;
};

export const deletePost = async (id: number) => {
    const { data } = await api.delete(`/posts/${id}`);
    return data;
};

export default api;