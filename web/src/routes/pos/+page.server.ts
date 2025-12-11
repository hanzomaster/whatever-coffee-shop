import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const [productsRes, customersRes, storesRes] = await Promise.all([
			fetch('/api/products'),
			fetch('/api/customers'),
			fetch('/api/stores')
		]);

		const products = productsRes.ok ? await productsRes.json() : [];
		const customers = customersRes.ok ? await customersRes.json() : [];
		const stores = storesRes.ok ? await storesRes.json() : [];

		return { products, customers, stores };
	} catch {
		return { products: [], customers: [], stores: [], error: 'Failed to load data' };
	}
};

export const actions: Actions = {
	checkout: async ({ request, fetch }) => {
		const formData = await request.formData();

		const customerId = Number(formData.get('customerId'));
		const storeId = Number(formData.get('storeId'));
		const cartData = formData.get('cart') as string;

		if (!customerId || !storeId) {
			return fail(400, { error: 'Customer and store are required' });
		}

		let cart: { id: number; quantity: number; price: number }[];
		try {
			cart = JSON.parse(cartData);
		} catch {
			return fail(400, { error: 'Invalid cart data' });
		}

		if (!cart || cart.length === 0) {
			return fail(400, { error: 'Cart is empty' });
		}

		try {
			// Create order
			const orderResponse = await fetch('/api/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					date: new Date().toISOString(),
					customerId,
					storeId
				})
			});

			if (!orderResponse.ok) {
				const errorData = await orderResponse.json().catch(() => ({ message: 'Failed to create order' }));
				return fail(400, { error: errorData.message });
			}

			const order = await orderResponse.json();

			// Create order details
			for (const item of cart) {
				await fetch('/api/order-details', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						orderId: order.id,
						productId: item.id,
						unit_price: item.price,
						quantity: item.quantity
					})
				});
			}

			return { success: true, orderId: order.id };
		} catch {
			return fail(500, { error: 'Failed to process checkout' });
		}
	}
};
