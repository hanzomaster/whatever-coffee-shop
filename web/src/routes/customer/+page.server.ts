import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/products');
		if (!response.ok) {
			return { featuredProducts: [] };
		}
		const products = await response.json();
		// Get first 4 products as featured
		const featuredProducts = products.slice(0, 4);
		return { featuredProducts };
	} catch {
		return { featuredProducts: [] };
	}
};
