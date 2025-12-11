import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('access_token');

	// Parse JWT token to get user info
	if (token) {
		try {
			// Decode JWT payload (base64)
			const parts = token.split('.');
			if (parts.length === 3) {
				const payload = JSON.parse(atob(parts[1]));
				event.locals.user = {
					id: payload.sub,
					username: payload.username,
					role: payload.role,
					dob: payload.dob || '',
					phone: payload.phone || ''
				};
			}
		} catch {
			// Invalid token - clear it
			event.cookies.delete('access_token', { path: '/' });
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	const path = event.url.pathname;

	// Route protection for admin portal
	if (path.startsWith('/admin')) {
		if (!event.locals.user) {
			throw redirect(303, '/login?redirect=' + encodeURIComponent(path));
		}
		if (event.locals.user.role !== 'admin') {
			throw redirect(303, '/unauthorized');
		}
	}

	// Route protection for POS portal
	if (path.startsWith('/pos')) {
		if (!event.locals.user) {
			throw redirect(303, '/login?redirect=' + encodeURIComponent(path));
		}
	}

	return resolve(event);
};
