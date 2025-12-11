import { api } from './client';
import type { CreateProductDto, Product, UpdateProductDto } from './types';

export const productsAPI = {
	getAll: () => api.get<Product[]>('/products'),

	getById: (id: number) => api.get<Product>(`/products/${id}`),

	create: (data: CreateProductDto) => api.post<Product>('/products', data),

	update: (id: number, data: UpdateProductDto) => api.patch<Product>(`/products/${id}`, data),

	delete: (id: number) => api.delete<Product>(`/products/${id}`)
};
