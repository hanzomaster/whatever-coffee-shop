import { api } from './client';
import type { CreateOrderDetailDto, OrderDetail, UpdateOrderDetailDto } from './types';

export const orderDetailsAPI = {
	getAll: () => api.get<OrderDetail[]>('/orderdetails'),

	getById: (id: number) => api.get<OrderDetail>(`/orderdetails/${id}`),

	create: (data: CreateOrderDetailDto) => api.post<OrderDetail>('/orderdetails', data),

	update: (id: number, data: UpdateOrderDetailDto) =>
		api.patch<OrderDetail>(`/orderdetails/${id}`, data),

	delete: (id: number) => api.delete<OrderDetail>(`/orderdetails/${id}`)
};
