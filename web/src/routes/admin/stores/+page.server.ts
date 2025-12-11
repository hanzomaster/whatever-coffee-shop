import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/stores');
		if (!response.ok) {
			return { stores: [], error: 'Failed to fetch stores' };
		}
		const stores = await response.json();
		return { stores };
	} catch {
		return { stores: [], error: 'Failed to fetch stores' };
	}
};
