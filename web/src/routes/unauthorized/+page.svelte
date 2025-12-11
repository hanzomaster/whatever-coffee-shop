<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Unauthorized - Coffee Shop</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-coffee-50 px-4">
	<div class="text-center">
		<div class="mb-6 text-6xl">&#9888;</div>
		<h1 class="mb-2 text-3xl font-bold text-coffee-900">Access Denied</h1>
		<p class="mb-6 text-coffee-600">You don't have permission to access this page.</p>

		<div class="flex justify-center gap-4">
			<a
				href="/"
				class="rounded-md bg-coffee-600 px-6 py-2 font-medium text-white transition-colors hover:bg-coffee-700"
			>
				Go Home
			</a>
			{#if !data.user}
				<a
					href="/login"
					class="rounded-md border border-coffee-600 px-6 py-2 font-medium text-coffee-600 transition-colors hover:bg-coffee-50"
				>
					Sign In
				</a>
			{/if}
		</div>
	</div>
</div>
