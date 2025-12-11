import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const supplierId = Number(params.id);
	if (isNaN(supplierId)) {
		throw error(400, 'Invalid supplier ID');
	}

	try {
		const response = await fetch(`/api/suppliers/${supplierId}`);

		if (!response.ok) {
			throw error(404, 'Supplier not found');
		}

		const supplier = await response.json();
		return { supplier };
	} catch (e) {
		if ((e as { status?: number })?.status) {
			throw e;
		}
		throw error(500, 'Failed to load supplier');
	}
};

export const actions: Actions = {
	update: async ({ params, request, fetch }) => {
		const supplierId = Number(params.id);
		const formData = await request.formData();

		const supplierData = {
			name: formData.get('name') as string
		};

		if (!supplierData.name) {
			return fail(400, { error: 'Name is required' });
		}

		try {
			const response = await fetch(`/api/suppliers/${supplierId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(supplierData)
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: 'Failed to update supplier' }));
				return fail(400, { error: errorData.message });
			}

			return { success: true };
		} catch {
			return fail(500, { error: 'An unexpected error occurred' });
		}
	},

	delete: async ({ params, fetch }) => {
		const supplierId = Number(params.id);

		try {
			const response = await fetch(`/api/suppliers/${supplierId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: 'Failed to delete supplier' }));
				return fail(400, { error: errorData.message });
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
