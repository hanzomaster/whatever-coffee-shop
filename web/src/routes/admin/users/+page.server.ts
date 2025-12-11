import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/users');
		if (!response.ok) {
			return { users: [], error: 'Failed to fetch users' };
		}
		const users = await response.json();
		return { users };
	} catch {
		return { users: [], error: 'Failed to fetch users' };
	}
};
