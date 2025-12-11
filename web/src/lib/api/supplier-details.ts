import { api } from './client';
import type { CreateSupplierDetailDto, SupplierDetail, UpdateSupplierDetailDto } from './types';

export const supplierDetailsAPI = {
	getAll: () => api.get<SupplierDetail[]>('/supplierdetails'),

	getById: (id: number) => api.get<SupplierDetail>(`/supplierdetails/${id}`),

	create: (data: CreateSupplierDetailDto) => api.post<SupplierDetail>('/supplierdetails', data),

	update: (id: number, data: UpdateSupplierDetailDto) =>
		api.patch<SupplierDetail>(`/supplierdetails/${id}`, data),

	delete: (id: number) => api.delete<SupplierDetail>(`/supplierdetails/${id}`)
};
