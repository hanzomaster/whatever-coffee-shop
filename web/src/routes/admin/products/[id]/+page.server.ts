import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const productId = Number(params.id);
	if (isNaN(productId)) {
		throw error(400, 'Invalid product ID');
	}

	try {
		const [productRes, suppliersRes] = await Promise.all([
			fetch(`/api/products/${productId}`),
			fetch('/api/suppliers')
		]);

		if (!productRes.ok) {
			throw error(404, 'Product not found');
		}

		const product = await productRes.json();
		const suppliers = suppliersRes.ok ? await suppliersRes.json() : [];

		return { product, suppliers };
	} catch (e) {
		if ((e as { status?: number })?.status) {
			throw e;
		}
		throw error(500, 'Failed to load product');
	}
};

export const actions: Actions = {
	update: async ({ params, request, fetch }) => {
		const productId = Number(params.id);
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
			const response = await fetch(`/api/products/${productId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(productData)
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({ message: 'Failed to update product' }));
				return fail(400, { error: errorData.message });
			}

			return { success: true };
		} catch (e) {
			return fail(500, { error: 'An unexpected error occurred' });
		}
	},

	delete: async ({ params, fetch }) => {
		const productId = Number(params.id);

		try {
			const response = await fetch(`/api/products/${productId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({ message: 'Failed to delete product' }));
				return fail(400, { error: errorData.message });
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
