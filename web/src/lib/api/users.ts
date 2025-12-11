import { api } from './client';
import type { User } from './types';

export const usersAPI = {
	getAll: () => api.get<User[]>('/user')
};
