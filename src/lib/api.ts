import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const authApi = {
  register: (data: Record<string, unknown>) => api.post('/auth/register', data),
  login: (phone: string, password: string) => api.post('/auth/login', { phone, password }),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
  logout: () => api.post('/auth/logout'),
};

// Users
export const userApi = {
  getMe: () => api.get('/users/me'),
  updateMe: (data: Record<string, unknown>) => api.patch('/users/me', data),
  getMasterProfile: (id: string) => api.get(`/users/masters/${id}`),
};

// Categories
export const categoryApi = {
  getAll: () => api.get('/categories'),
  create: (data: Record<string, unknown>) => api.post('/categories', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

// Orders
export const orderApi = {
  create: (data: FormData | Record<string, unknown>) => api.post('/orders', data),
  getAll: (params: Record<string, unknown>) => api.get('/orders', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
  accept: (id: string, data?: { workPrice?: number }) => api.post(`/orders/${id}/accept`, data),
  reject: (id: string) => api.post(`/orders/${id}/reject`),
  complete: (id: string) => api.post(`/orders/${id}/complete`),
  cancel: (id: string, reason?: string) => api.post(`/orders/${id}/cancel`, { reason }),
  getAvailable: (params: Record<string, unknown>) => api.get('/orders/available', { params }),
};

// Reviews
export const reviewApi = {
  create: (orderId: string, data: { rating: number; comment?: string }) =>
    api.post(`/orders/${orderId}/review`, data),
  getByTarget: (targetId: string) => api.get('/reviews', { params: { targetId } }),
};

// Notifications
export const notificationApi = {
  getAll: (page = 1) => api.get('/notifications', { params: { page } }),
  markRead: (id: string) => api.patch(`/notifications/${id}/read`),
};

// Admin
export const adminApi = {
  listUsers: (params: Record<string, unknown>) => api.get('/admin/users', { params }),
  blockUser: (id: string) => api.patch(`/admin/users/${id}/block`),
  verifyMaster: (id: string, status: string) => api.patch(`/admin/users/${id}/verify`, { status }),
  getOrders: (params: Record<string, unknown>) => api.get('/admin/orders', { params }),
  getStats: () => api.get('/admin/stats'),
  getPendingReviews: () => api.get('/admin/reviews/pending'),
  moderateReview: (id: string, action: string) => api.patch(`/admin/reviews/${id}/moderate`, { action }),
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data: Record<string, unknown>) => api.patch('/admin/settings', data),
};
