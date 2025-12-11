import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect if already logged in
	if (locals.user) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;
		const dob = formData.get('dob') as string;
		const phone = formData.get('phone') as string;

		// Validation
		if (!username || !password || !dob || !phone) {
			return fail(400, {
				error: 'All fields are required',
				username,
				dob,
				phone
			});
		}

		if (password.length < 8) {
			return fail(400, {
				error: 'Password must be at least 8 characters',
				username,
				dob,
				phone
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				error: 'Passwords do not match',
				username,
				dob,
				phone
			});
		}

		// Validate phone format (Vietnamese)
		const phoneRegex = /^(0|\+84)[3|5|7|8|9]\d{8}$/;
		if (!phoneRegex.test(phone)) {
			return fail(400, {
				error: 'Invalid phone number format (Vietnamese mobile required)',
				username,
				dob,
				phone
			});
		}

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username,
					password,
					dob,
					phone
				})
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({ message: 'Registration failed' }));
				return fail(400, {
					error: error.message || 'Registration failed',
					username,
					dob,
					phone
				});
			}

			// Redirect to login on success
			throw redirect(303, '/login?registered=true');
		} catch (e) {
			// Re-throw redirects
			if (e instanceof Response || (e as { status?: number })?.status === 303) {
				throw e;
			}

			return fail(500, {
				error: 'An unexpected error occurred',
				username,
				dob,
				phone
			});
		}
	}
};
