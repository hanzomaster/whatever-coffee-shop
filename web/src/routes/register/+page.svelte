<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>Register - Coffee Shop</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-coffee-50 px-4 py-12">
	<div class="w-full max-w-md">
		<div class="rounded-lg border border-coffee-200 bg-white p-8 shadow-lg">
			<div class="mb-8 text-center">
				<h1 class="text-3xl font-bold text-coffee-900">Coffee Shop</h1>
				<p class="mt-2 text-coffee-600">Create a new account</p>
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
				class="space-y-5"
			>
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
						pattern="[a-zA-Z0-9]+"
						title="Username must contain only letters and numbers"
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
						minlength={8}
						autocomplete="new-password"
						class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
						placeholder="At least 8 characters"
					/>
				</div>

				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-coffee-700">
						Confirm Password
					</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						required
						autocomplete="new-password"
						class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
						placeholder="Confirm your password"
					/>
				</div>

				<div>
					<label for="dob" class="block text-sm font-medium text-coffee-700">
						Date of Birth
					</label>
					<input
						type="date"
						id="dob"
						name="dob"
						value={form?.dob ?? ''}
						required
						class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
					/>
				</div>

				<div>
					<label for="phone" class="block text-sm font-medium text-coffee-700">
						Phone Number
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={form?.phone ?? ''}
						required
						pattern="^(0|\+84)[3|5|7|8|9]\d{'{'}8{'}'}"
						title="Vietnamese mobile number format (e.g., 0912345678)"
						class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
						placeholder="0912345678"
					/>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full rounded-md bg-coffee-600 px-4 py-2 font-medium text-white transition-colors hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? 'Creating account...' : 'Create account'}
				</button>
			</form>

			<div class="mt-6 text-center text-sm text-coffee-600">
				Already have an account?
				<a href="/login" class="font-medium text-coffee-700 hover:text-coffee-800 hover:underline">
					Sign in here
				</a>
			</div>
		</div>
	</div>
</div>
