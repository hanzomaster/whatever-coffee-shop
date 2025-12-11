// See https://svelte.dev/docs/kit/types#app.d.ts
import type { Role } from '$lib/api/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number;
				username: string;
				role: Role;
				dob: string;
				phone: string;
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
