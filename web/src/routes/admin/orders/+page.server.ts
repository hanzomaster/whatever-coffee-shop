import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/orders');
		if (!response.ok) {
			return { orders: [], error: 'Failed to fetch orders' };
		}
		const orders = await response.json();
		return { orders };
	} catch {
		return { orders: [], error: 'Failed to fetch orders' };
	}
};
