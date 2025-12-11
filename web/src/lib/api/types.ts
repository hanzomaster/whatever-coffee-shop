// Types matching Prisma schema from api/prisma/schema.prisma

export type Role = 'admin' | 'user';

export interface User {
	id: number;
	username: string;
	password?: string;
	dob: string;
	phone: string;
	role: Role;
	createdAt: string;
}

export interface Customer {
	id: number;
	name: string;
	balance: string; // Decimal as string
	phone: string | null;
	orders?: Order[];
}

export interface Store {
	id: number;
	location: string;
	revenue: string; // Decimal as string
	fixedCost: string | null;
	imgPath: string | null;
	orders?: Order[];
}

export interface Product {
	id: number;
	name: string;
	price: string | null; // Decimal as string
	cost: string | null;
	category: string;
	inventory: string | null;
	imgPath: string | null;
	description: string | null;
	supplierId: number | null;
	supplier?: Supplier;
	orderDetails?: OrderDetail[];
	supplierDetails?: SupplierDetail[];
}

export interface Supplier {
	id: number;
	name: string;
	products?: Product[];
	supplierDetails?: SupplierDetail[];
}

export interface Order {
	id: number;
	date: string | null;
	customerId: number;
	storeId: number;
	customer?: Customer;
	store?: Store;
	orderDetails?: OrderDetail[];
}

export interface OrderDetail {
	id: number;
	unitPrice: string | null;
	quantity: string | null;
	orderId: number;
	productId: number;
	order?: Order;
	product?: Product;
}

export interface SupplierDetail {
	id: number;
	orderDate: string | null;
	unitPrice: string | null;
	supplierQuantity: string | null;
	supplierId: number;
	productId: number;
	supplier?: Supplier;
	product?: Product;
}

// Auth types
export interface LoginCredentials {
	username: string;
	password: string;
}

export interface RegisterData {
	username: string;
	password: string;
	dob: string;
	phone: string;
	role?: Role;
}

export interface AuthResponse {
	access_token: string;
}

export interface JWTPayload {
	sub: number;
	username: string;
	role: Role;
	iat: number;
	exp: number;
}

// Create DTOs
export interface CreateProductDto {
	name: string;
	price: number;
	cost: number;
	category?: string;
	inventory: number;
	img_path?: string;
	description?: string;
	supplierId: number;
}

export interface CreateCustomerDto {
	name: string;
	balance: number;
	phone?: string;
}

export interface CreateStoreDto {
	location: string;
	revenue: number;
	fixed_cost: number;
	img_path?: string;
}

export interface CreateSupplierDto {
	name: string;
}

export interface CreateOrderDto {
	date: string;
	customerId: number;
	storeId: number;
}

export interface CreateOrderDetailDto {
	unit_price: number;
	quantity: number;
	orderId: number;
	productId: number;
}

export interface CreateSupplierDetailDto {
	orderDate: string;
	unitPrice: number;
	supplierQuantity: number;
	supplierId: number;
	productId: number;
}

// Update DTOs (all fields optional)
export type UpdateProductDto = Partial<CreateProductDto>;
export type UpdateCustomerDto = Partial<CreateCustomerDto>;
export type UpdateStoreDto = Partial<CreateStoreDto>;
export type UpdateSupplierDto = Partial<CreateSupplierDto>;
export type UpdateOrderDto = Partial<CreateOrderDto>;
export type UpdateOrderDetailDto = Partial<CreateOrderDetailDto>;
export type UpdateSupplierDetailDto = Partial<CreateSupplierDetailDto>;
