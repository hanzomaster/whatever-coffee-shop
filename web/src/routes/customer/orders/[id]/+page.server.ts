import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { id } = params;

	try {
		const response = await fetch(`/api/orders/${id}`);
		if (!response.ok) {
			if (response.status === 404) {
				throw error(404, 'Order not found');
			}
			throw error(response.status, 'Failed to load order');
		}
		const order = await response.json();
		return { order };
	} catch (e) {
		if ((e as { status?: number }).status) {
			throw e;
		}
		throw error(500, 'Failed to load order');
	}
};
