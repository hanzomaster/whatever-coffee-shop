<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>Login - Coffee Shop</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-coffee-50 px-4">
	<div class="w-full max-w-md">
		<div class="rounded-lg border border-coffee-200 bg-white p-8 shadow-lg">
			<div class="mb-8 text-center">
				<h1 class="text-3xl font-bold text-coffee-900">Coffee Shop</h1>
				<p class="mt-2 text-coffee-600">Sign in to your account</p>
			</div>

			{#if form?.error}
				<div class="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
					{form.error}
				</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ update }) => {
						await update();
						isSubmitting = false;
					};
				}}
				class="space-y-6"
			>
				<input type="hidden" name="redirect" value={data.redirect} />

				<div>
					<label for="username" class="block text-sm font-medium text-coffee-700">
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={form?.username ?? ''}
						required
						autocomplete="username"
						class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
						placeholder="Enter your username"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-coffee-700">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						autocomplete="current-password"
						class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
						placeholder="Enter your password"
					/>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full rounded-md bg-coffee-600 px-4 py-2 font-medium text-white transition-colors hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? 'Signing in...' : 'Sign in'}
				</button>
			</form>

			<div class="mt-6 text-center text-sm text-coffee-600">
				Don't have an account?
				<a href="/register" class="font-medium text-coffee-700 hover:text-coffee-800 hover:underline">
					Register here
				</a>
			</div>
		</div>
	</div>
</div>
