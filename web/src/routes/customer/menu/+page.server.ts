import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/products');
		if (!response.ok) {
			return { products: [], error: 'Failed to load menu' };
		}
		const products = await response.json();
		return { products };
	} catch {
		return { products: [], error: 'Failed to load menu' };
	}
};
