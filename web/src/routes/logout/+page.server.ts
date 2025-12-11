import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ fetch, cookies }) => {
		// Call API to logout
		await fetch('/api/auth/logout', { method: 'POST' });

		// Clear the cookie on our side too
		cookies.delete('access_token', { path: '/' });

		throw redirect(303, '/login');
	}
};
