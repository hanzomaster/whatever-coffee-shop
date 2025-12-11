import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();

		const supplierData = {
			name: formData.get('name') as string
		};

		if (!supplierData.name) {
			return fail(400, { error: 'Name is required' });
		}

		try {
			const response = await fetch('/api/suppliers', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(supplierData)
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({ message: 'Failed to create supplier' }));
				return fail(400, { error: error.message });
			}

			throw redirect(303, '/admin/suppliers');
		} catch (e) {
			if (e instanceof Response || (e as { status?: number })?.status === 303) {
				throw e;
			}
			return fail(500, { error: 'An unexpected error occurred' });
		}
	}
};
