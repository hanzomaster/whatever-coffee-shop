import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const orderId = Number(params.id);
	if (isNaN(orderId)) {
		throw error(400, 'Invalid order ID');
	}

	try {
		const [orderRes, customersRes, storesRes, productsRes] = await Promise.all([
			fetch(`/api/orders/${orderId}`),
			fetch('/api/customers'),
			fetch('/api/stores'),
			fetch('/api/products')
		]);

		if (!orderRes.ok) {
			throw error(404, 'Order not found');
		}

		const order = await orderRes.json();
		const customers = customersRes.ok ? await customersRes.json() : [];
		const stores = storesRes.ok ? await storesRes.json() : [];
		const products = productsRes.ok ? await productsRes.json() : [];

		return { order, customers, stores, products };
	} catch (e) {
		if ((e as { status?: number })?.status) {
			throw e;
		}
		throw error(500, 'Failed to load order');
	}
};

export const actions: Actions = {
	update: async ({ params, request, fetch }) => {
		const orderId = Number(params.id);
		const formData = await request.formData();

		const orderData = {
			date: formData.get('date') as string,
			customerId: Number(formData.get('customerId')),
			storeId: Number(formData.get('storeId'))
		};

		if (!orderData.customerId || !orderData.storeId) {
			return fail(400, { error: 'Customer and store are required' });
		}

		try {
			const response = await fetch(`/api/orders/${orderId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(orderData)
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: 'Failed to update order' }));
				return fail(400, { error: errorData.message });
			}

			return { success: true };
		} catch {
			return fail(500, { error: 'An unexpected error occurred' });
		}
	},

	delete: async ({ params, fetch }) => {
		const orderId = Number(params.id);

		try {
			const response = await fetch(`/api/orders/${orderId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: 'Failed to delete order' }));
				return fail(400, { error: errorData.message });
			}

			throw redirect(303, '/admin/orders');
		} catch (e) {
			if (e instanceof Response || (e as { status?: number })?.status === 303) {
				throw e;
			}
			return fail(500, { error: 'An unexpected error occurred' });
		}
	}
};
