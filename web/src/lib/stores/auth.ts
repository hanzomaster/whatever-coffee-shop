import { writable, derived } from 'svelte/store';
import type { Role } from '$lib/api/types';

export interface AuthUser {
	id: number;
	username: string;
	role: Role;
	dob: string;
	phone: string;
}

interface AuthState {
	user: AuthUser | null;
	isLoading: boolean;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		user: null,
		isLoading: true
	});

	return {
		subscribe,
		setUser: (user: AuthUser | null) =>
			update((state) => ({
				...state,
				user,
				isLoading: false
			})),
		setLoading: (isLoading: boolean) =>
			update((state) => ({
				...state,
				isLoading
			})),
		logout: () =>
			set({
				user: null,
				isLoading: false
			}),
		reset: () =>
			set({
				user: null,
				isLoading: true
			})
	};
}

export const authStore = createAuthStore();

export const isAuthenticated = derived(authStore, ($auth) => !!$auth.user && !$auth.isLoading);

export const isAdmin = derived(authStore, ($auth) => $auth.user?.role === 'admin');

export const currentUser = derived(authStore, ($auth) => $auth.user);
