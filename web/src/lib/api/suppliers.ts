import { api } from './client';
import type { CreateSupplierDto, Supplier, UpdateSupplierDto } from './types';

export const suppliersAPI = {
	getAll: () => api.get<Supplier[]>('/suppliers'),

	getById: (id: number) => api.get<Supplier>(`/suppliers/${id}`),

	create: (data: CreateSupplierDto) => api.post<Supplier>('/suppliers', data),

	update: (id: number, data: UpdateSupplierDto) => api.patch<Supplier>(`/suppliers/${id}`, data),

	delete: (id: number) => api.delete<Supplier>(`/suppliers/${id}`)
};
