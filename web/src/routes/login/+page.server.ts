import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
	// Redirect if already logged in
	if (locals.user) {
		const redirectTo = url.searchParams.get('redirect') || '/';
		throw redirect(303, redirectTo);
	}

	return {
		redirect: url.searchParams.get('redirect') || '/'
	};
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies, url }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const redirectTo = (formData.get('redirect') as string) || '/';

		if (!username || !password) {
			return fail(400, {
				error: 'Username and password are required',
				username
			});
		}

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({ message: 'Login failed' }));
				return fail(400, {
					error: error.message || 'Invalid credentials',
					username
				});
			}

			// The API sets the httpOnly cookie, so we're done
			throw redirect(303, redirectTo);
		} catch (e) {
			// Re-throw redirects
			if (e instanceof Response || (e as { status?: number })?.status === 303) {
				throw e;
			}

			return fail(500, {
				error: 'An unexpected error occurred',
				username
			});
		}
	}
};
