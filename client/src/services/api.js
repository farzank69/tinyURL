import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const healthCheck = async () => {
  const response = await api.get('/healthz');
  return response.data;
};

export const createLink = async (targetUrl, customCode = '') => {
  const response = await api.post('/api/links', {
    target_url: targetUrl,
    code: customCode || undefined,
  });
  return response.data;
};

export const getAllLinks = async () => {
  const response = await api.get('/api/links');
  return response.data;
};

export const getLinkStats = async (code) => {
  const response = await api.get(`/api/links/${code}`);
  return response.data;
};

export const deleteLink = async (code) => {
  const response = await api.delete(`/api/links/${code}`);
  return response.data;
};

export default api;
