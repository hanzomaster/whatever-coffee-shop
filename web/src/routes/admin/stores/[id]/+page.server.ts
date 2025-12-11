import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const storeId = Number(params.id);
	if (isNaN(storeId)) {
		throw error(400, 'Invalid store ID');
	}

	try {
		const response = await fetch(`/api/stores/${storeId}`);

		if (!response.ok) {
			throw error(404, 'Store not found');
		}

		const store = await response.json();
		return { store };
	} catch (e) {
		if ((e as { status?: number })?.status) {
			throw e;
		}
		throw error(500, 'Failed to load store');
	}
};

export const actions: Actions = {
	update: async ({ params, request, fetch }) => {
		const storeId = Number(params.id);
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
			const response = await fetch(`/api/stores/${storeId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(storeData)
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: 'Failed to update store' }));
				return fail(400, { error: errorData.message });
			}

			return { success: true };
		} catch {
			return fail(500, { error: 'An unexpected error occurred' });
		}
	},

	delete: async ({ params, fetch }) => {
		const storeId = Number(params.id);

		try {
			const response = await fetch(`/api/stores/${storeId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: 'Failed to delete store' }));
				return fail(400, { error: errorData.message });
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
