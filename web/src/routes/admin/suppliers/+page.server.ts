import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/suppliers');
		if (!response.ok) {
			return { suppliers: [], error: 'Failed to fetch suppliers' };
		}
		const suppliers = await response.json();
		return { suppliers };
	} catch {
		return { suppliers: [], error: 'Failed to fetch suppliers' };
	}
};
