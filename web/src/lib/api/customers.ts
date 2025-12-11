import { api } from './client';
import type { CreateCustomerDto, Customer, UpdateCustomerDto } from './types';

export const customersAPI = {
	getAll: () => api.get<Customer[]>('/customer'),

	getById: (id: number) => api.get<Customer>(`/customer/${id}`),

	create: (data: CreateCustomerDto) => api.post<Customer>('/customer', data),

	update: (id: number, data: UpdateCustomerDto) => api.patch<Customer>(`/customer/${id}`, data),

	delete: (id: number) => api.delete<Customer>(`/customer/${id}`)
};
