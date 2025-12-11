import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/stores');
		if (!response.ok) {
			return { stores: [] };
		}
		const stores = await response.json();
		return { stores };
	} catch {
		return { stores: [] };
	}
};

export const actions: Actions = {
	default: async ({ request, fetch, locals }) => {
		const formData = await request.formData();
		const storeId = formData.get('storeId');
		const items = formData.get('items');
		const customerName = formData.get('customerName');
		const customerPhone = formData.get('customerPhone');

		if (!storeId || !items) {
			return fail(400, { error: 'Store and items are required' });
		}

		let parsedItems;
		try {
			parsedItems = JSON.parse(items as string);
		} catch {
			return fail(400, { error: 'Invalid items data' });
		}

		if (!parsedItems || parsedItems.length === 0) {
			return fail(400, { error: 'Cart is empty' });
		}

		// Check if user is logged in
		let customerId: number | null = null;
		if (locals.user) {
			// Try to find customer linked to this user
			try {
				const customerResponse = await fetch('/api/customers');
				if (customerResponse.ok) {
					const customers = await customerResponse.json();
					const customer = customers.find(
						(c: { userId?: number }) => c.userId === locals.user?.id
					);
					if (customer) {
						customerId = customer.id;
					}
				}
			} catch {
				// Continue without customer ID
			}
		}

		// Create order
		const orderData = {
			storeId: Number(storeId),
			customerId,
			status: 'pending',
			orderDetails: parsedItems.map((item: { id: number; quantity: number; price: number }) => ({
				productId: item.id,
				quantity: item.quantity,
				unitPrice: item.price.toString()
			}))
		};

		try {
			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(orderData)
			});

			if (!response.ok) {
				const error = await response.json();
				return fail(response.status, { error: error.message || 'Failed to create order' });
			}

			const order = await response.json();
			return redirect(303, `/customer/checkout/success?orderId=${order.id}`);
		} catch {
			return fail(500, { error: 'Failed to create order' });
		}
	}
};
