import { api } from './client';
import type { AuthResponse, LoginCredentials, RegisterData, User } from './types';

export const authAPI = {
	login: (credentials: LoginCredentials) => api.post<AuthResponse>('/auth/login', credentials),

	register: (data: RegisterData) => api.post<User>('/auth/register', data),

	logout: () => api.post<{ message: string }>('/auth/logout')
};
