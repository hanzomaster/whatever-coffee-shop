import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/orders');
		if (!response.ok) {
			return { orders: [], error: 'Failed to fetch orders' };
		}

		const orders = await response.json();

		// Filter today's orders
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const todayOrders = orders.filter((order: { date: string }) => {
			if (!order.date) return false;
			const orderDate = new Date(order.date);
			orderDate.setHours(0, 0, 0, 0);
			return orderDate.getTime() === today.getTime();
		});

		return { orders: todayOrders, allOrders: orders };
	} catch {
		return { orders: [], allOrders: [], error: 'Failed to fetch orders' };
	}
};
