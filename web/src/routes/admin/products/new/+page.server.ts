import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/suppliers');
		if (!response.ok) {
			return { suppliers: [] };
		}
		const suppliers = await response.json();
		return { suppliers };
	} catch {
		return { suppliers: [] };
	}
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();

		const productData = {
			name: formData.get('name') as string,
			category: (formData.get('category') as string) || undefined,
			price: Number(formData.get('price')),
			cost: Number(formData.get('cost')),
			inventory: Number(formData.get('inventory')),
			supplierId: Number(formData.get('supplierId')),
			description: (formData.get('description') as string) || undefined,
			img_path: (formData.get('img_path') as string) || undefined
		};

		if (!productData.name || !productData.supplierId) {
			return fail(400, { error: 'Name and supplier are required' });
		}

		try {
			const response = await fetch('/api/products', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(productData)
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({ message: 'Failed to create product' }));
				return fail(400, { error: error.message });
			}

			throw redirect(303, '/admin/products');
		} catch (e) {
			if (e instanceof Response || (e as { status?: number })?.status === 303) {
				throw e;
			}
			return fail(500, { error: 'An unexpected error occurred' });
		}
	}
};
