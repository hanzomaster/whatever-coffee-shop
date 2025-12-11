import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login?redirect=/admin/dashboard');
	}

	if (locals.user.role !== 'admin') {
		throw redirect(303, '/unauthorized');
	}

	return {
		user: locals.user
	};
};
