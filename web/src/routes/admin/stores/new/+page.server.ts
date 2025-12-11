import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();

		const storeData = {
			location: formData.get('location') as string,
			revenue: Number(formData.get('revenue') || 0),
			fixed_cost: Number(formData.get('fixedCost') || 0),
			img_path: (formData.get('imgPath') as string) || undefined
		};

		if (!storeData.location) {
			return fail(400, { error: 'Location is required' });
		}

		try {
			const response = await fetch('/api/stores', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(storeData)
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({ message: 'Failed to create store' }));
				return fail(400, { error: error.message });
			}

			throw redirect(303, '/admin/stores');
		} catch (e) {
			if (e instanceof Response || (e as { status?: number })?.status === 303) {
				throw e;
			}
			return fail(500, { error: 'An unexpected error occurred' });
		}
	}
};
