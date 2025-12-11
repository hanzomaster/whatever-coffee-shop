import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	// For now, show all orders - in a real app, this would filter by customer
	// The API would need to support filtering by customer ID

	try {
		const response = await fetch('/api/orders');
		if (!response.ok) {
			return { orders: [], error: 'Failed to load orders' };
		}
		const orders = await response.json();

		// In a real app, the API would filter orders by customer ID
		// For now, we return all orders

		return { orders };
	} catch {
		return { orders: [], error: 'Failed to load orders' };
	}
};
