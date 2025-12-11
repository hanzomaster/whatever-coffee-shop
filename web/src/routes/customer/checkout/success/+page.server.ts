import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const orderId = url.searchParams.get('orderId');

	if (!orderId) {
		return { order: null };
	}

	try {
		const response = await fetch(`/api/orders/${orderId}`);
		if (!response.ok) {
			return { order: null };
		}
		const order = await response.json();
		return { order };
	} catch {
		return { order: null };
	}
};
