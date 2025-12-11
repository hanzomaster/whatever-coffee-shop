const API_BASE = '/api';

export class APIError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message);
		this.name = 'APIError';
	}
}

export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const response = await fetch(`${API_BASE}${endpoint}`, {
		...options,
		credentials: 'include', // Include httpOnly cookies for auth
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		}
	});

	if (!response.ok) {
		let message = 'An error occurred';
		try {
			const error = await response.json();
			message = error.message || message;
		} catch {
			// Ignore JSON parse errors
		}
		throw new APIError(response.status, message);
	}

	// Handle empty responses
	const text = await response.text();
	if (!text) {
		return {} as T;
	}

	return JSON.parse(text);
}

export const api = {
	get: <T>(endpoint: string) => fetchAPI<T>(endpoint),

	post: <T>(endpoint: string, data?: unknown) =>
		fetchAPI<T>(endpoint, {
			method: 'POST',
			body: data ? JSON.stringify(data) : undefined
		}),

	patch: <T>(endpoint: string, data: unknown) =>
		fetchAPI<T>(endpoint, {
			method: 'PATCH',
			body: JSON.stringify(data)
		}),

	delete: <T>(endpoint: string) =>
		fetchAPI<T>(endpoint, {
			method: 'DELETE'
		})
};
