import { api } from './client';
import type { CreateOrderDto, Order, UpdateOrderDto } from './types';

export const ordersAPI = {
	getAll: () => api.get<Order[]>('/orders'),

	getById: (id: number) => api.get<Order>(`/orders/${id}`),

	create: (data: CreateOrderDto) => api.post<Order>('/orders', data),

	update: (id: number, data: UpdateOrderDto) => api.patch<Order>(`/orders/${id}`, data),

	delete: (id: number) => api.delete<Order>(`/orders/${id}`)
};
