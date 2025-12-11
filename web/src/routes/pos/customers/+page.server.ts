import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/customers');
		if (!response.ok) {
			return { customers: [], error: 'Failed to fetch customers' };
		}
		const customers = await response.json();
		return { customers };
	} catch {
		return { customers: [], error: 'Failed to fetch customers' };
	}
};

export const actions: Actions = {
	create: async ({ request, fetch }) => {
		const formData = await request.formData();

		const customerData = {
			name: formData.get('name') as string,
			phone: (formData.get('phone') as string) || undefined,
			balance: Number(formData.get('balance') || 0)
		};

		if (!customerData.name) {
			return fail(400, { error: 'Name is required' });
		}

		try {
			const response = await fetch('/api/customers', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(customerData)
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({ message: 'Failed to create customer' }));
				return fail(400, { error: error.message });
			}

			return { success: true };
		} catch {
			return fail(500, { error: 'An unexpected error occurred' });
		}
	}
};
