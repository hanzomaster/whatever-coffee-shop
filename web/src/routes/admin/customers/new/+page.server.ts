import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
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
			const response = await fetch('/api/customers', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(customerData)
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({ message: 'Failed to create customer' }));
				return fail(400, { error: error.message });
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
