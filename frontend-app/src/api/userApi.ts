import type { User } from '../types/user';
import api from './axios';

export const fetchUsersApi = async (): Promise<User[]> => {
  const res = await api.get('/users');
  return res.data;
};
