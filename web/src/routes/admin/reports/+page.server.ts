import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const [productsRes, ordersRes, customersRes, storesRes] = await Promise.all([
			fetch('/api/products'),
			fetch('/api/orders'),
			fetch('/api/customers'),
			fetch('/api/stores')
		]);

		const products = productsRes.ok ? await productsRes.json() : [];
		const orders = ordersRes.ok ? await ordersRes.json() : [];
		const customers = customersRes.ok ? await customersRes.json() : [];
		const stores = storesRes.ok ? await storesRes.json() : [];

		return { products, orders, customers, stores };
	} catch {
		return { products: [], orders: [], customers: [], stores: [], error: 'Failed to fetch report data' };
	}
};
