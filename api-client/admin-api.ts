import axiosConfig from '@/api-client/axios-config';

export const adminApi = {
  async getDashboardTotal() {
    return axiosConfig.get('/admin/dashboard/total');
  },
  async getAccounts() {
    return axiosConfig.get('/admin/accounts');
  },
  async getAccountById(id: number) {
    return axiosConfig.get(`/admin/accounts/${id}`);
  },
  async getPosts() {
    return axiosConfig.get('/admin/posts');
  },
  async getPostById(id: number) {
    return axiosConfig.get(`/admin/posts/${id}`);
  },
  async getCommentsById(id: number) {
    return axiosConfig.get(`/admin/comments/${id}`);
  },
};
