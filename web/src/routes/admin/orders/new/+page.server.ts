import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const [customersRes, storesRes, productsRes] = await Promise.all([
			fetch('/api/customers'),
			fetch('/api/stores'),
			fetch('/api/products')
		]);

		const customers = customersRes.ok ? await customersRes.json() : [];
		const stores = storesRes.ok ? await storesRes.json() : [];
		const products = productsRes.ok ? await productsRes.json() : [];

		return { customers, stores, products };
	} catch {
		return { customers: [], stores: [], products: [] };
	}
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
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
			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(orderData)
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({ message: 'Failed to create order' }));
				return fail(400, { error: error.message });
			}

			const order = await response.json();
			throw redirect(303, `/admin/orders/${order.id}`);
		} catch (e) {
			if (e instanceof Response || (e as { status?: number })?.status === 303) {
				throw e;
			}
			return fail(500, { error: 'An unexpected error occurred' });
		}
	}
};
