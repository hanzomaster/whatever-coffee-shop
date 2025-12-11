import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const customerId = Number(params.id);
	if (isNaN(customerId)) {
		throw error(400, 'Invalid customer ID');
	}

	try {
		const response = await fetch(`/api/customers/${customerId}`);

		if (!response.ok) {
			throw error(404, 'Customer not found');
		}

		const customer = await response.json();
		return { customer };
	} catch (e) {
		if ((e as { status?: number })?.status) {
			throw e;
		}
		throw error(500, 'Failed to load customer');
	}
};

export const actions: Actions = {
	update: async ({ params, request, fetch }) => {
		const customerId = Number(params.id);
		const formData = await request.formData();

		const customerData = {
			name: formData.get('name') as string,
			balance: Number(formData.get('balance') || 0),
			phone: (formData.get('phone') as string) || undefined
		};

		if (!customerData.name) {
			return fail(400, { error: 'Name is required' });
		}

		try {
			const response = await fetch(`/api/customers/${customerId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(customerData)
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: 'Failed to update customer' }));
				return fail(400, { error: errorData.message });
			}

			return { success: true };
		} catch {
			return fail(500, { error: 'An unexpected error occurred' });
		}
	},

	delete: async ({ params, fetch }) => {
		const customerId = Number(params.id);

		try {
			const response = await fetch(`/api/customers/${customerId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: 'Failed to delete customer' }));
				return fail(400, { error: errorData.message });
			}

			throw redirect(303, '/admin/customers');
		} catch (e) {
			if (e instanceof Response || (e as { status?: number })?.status === 303) {
				throw e;
			}
			return fail(500, { error: 'An unexpected error occurred' });
		}
	}
};
