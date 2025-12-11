import { api } from './client';
import type { CreateStoreDto, Store, UpdateStoreDto } from './types';

export const storesAPI = {
	getAll: () => api.get<Store[]>('/stores'),

	getById: (id: number) => api.get<Store>(`/stores/${id}`),

	create: (data: CreateStoreDto) => api.post<Store>('/stores', data),

	update: (id: number, data: UpdateStoreDto) => api.patch<Store>(`/stores/${id}`, data),

	delete: (id: number) => api.delete<Store>(`/stores/${id}`)
};
