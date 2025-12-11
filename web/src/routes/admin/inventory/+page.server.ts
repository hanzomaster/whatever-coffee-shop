import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const [productsRes, suppliersRes] = await Promise.all([
			fetch('/api/products'),
			fetch('/api/suppliers')
		]);

		const products = productsRes.ok ? await productsRes.json() : [];
		const suppliers = suppliersRes.ok ? await suppliersRes.json() : [];

		return { products, suppliers };
	} catch {
		return { products: [], suppliers: [], error: 'Failed to fetch inventory data' };
	}
};
