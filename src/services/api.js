// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (userData) => API.post('/auth/login', userData),
  register: (userData) => API.post('/auth/register', userData),
  forgotPassword: (email) => API.post('/auth/forgot-password', { email }),
  resetPassword: (resetData) => API.post('/auth/reset-password', resetData),
};

// Products API
export const productsAPI = {
  getAll: () => API.get('/products'),
  getById: (id) => API.get(`/products/${id}`),
  addProduct: (productData) => API.post('/admin/products', productData),
  updateProduct: (id, productData) => API.put(`/admin/products/${id}`, productData),
  deleteProduct: (id) => API.delete(`/admin/products/${id}`)
};

// Orders API
export const ordersAPI = {
  create: (orderData) => API.post('/orders', orderData),
  getByUser: (userId) => API.get(`/orders/user/${userId}`),
  getAll: () => API.get('/admin/orders'),
};

// Admin API
export const adminAPI = {
  getUsers: () => API.get('/admin/users'),
  getOrders: () => API.get('/admin/orders'),
};

export default API;