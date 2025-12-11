import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/customers');
		if (!response.ok) {
			return { customers: [], error: 'Failed to fetch customers' };
		}
		const customers = await response.json();
		return { customers };
	} catch {
		return { customers: [], error: 'Failed to fetch customers' };
	}
};
