import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login?redirect=/customer/profile');
	}

	return {
		user: locals.user
	};
};

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('access_token', { path: '/' });
		throw redirect(303, '/customer');
	}
};
