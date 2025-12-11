<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Coffee Shop - Choose Your Experience</title>
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-coffee-100 to-coffee-200 px-4">
	<div class="mb-12 text-center">
		<span class="text-6xl">&#9749;</span>
		<h1 class="mt-4 text-4xl font-bold text-coffee-900">Coffee Shop</h1>
		<p class="mt-2 text-lg text-coffee-700">Choose how you'd like to continue</p>
	</div>

	<div class="grid w-full max-w-4xl gap-6 md:grid-cols-3">
		<!-- Customer Portal -->
		<a
			href="/customer"
			class="group flex flex-col items-center rounded-xl border-2 border-coffee-300 bg-white p-8 text-center shadow-lg transition-all hover:border-coffee-500 hover:shadow-xl"
		>
			<div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-coffee-100 text-4xl transition-colors group-hover:bg-coffee-200">
				&#128722;
			</div>
			<h2 class="text-xl font-bold text-coffee-900">Customer</h2>
			<p class="mt-2 text-sm text-coffee-600">
				Browse our menu, place orders, and track your purchases
			</p>
			<span class="mt-4 text-coffee-600 transition-colors group-hover:text-coffee-800">
				Enter &#8594;
			</span>
		</a>

		<!-- POS Portal -->
		<a
			href="/pos"
			class="group flex flex-col items-center rounded-xl border-2 border-coffee-300 bg-white p-8 text-center shadow-lg transition-all hover:border-coffee-500 hover:shadow-xl"
		>
			<div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-coffee-100 text-4xl transition-colors group-hover:bg-coffee-200">
				&#128179;
			</div>
			<h2 class="text-xl font-bold text-coffee-900">POS System</h2>
			<p class="mt-2 text-sm text-coffee-600">
				Cashier terminal for processing orders and payments
			</p>
			<span class="mt-4 text-coffee-600 transition-colors group-hover:text-coffee-800">
				Enter &#8594;
			</span>
			{#if !data.user}
				<span class="mt-2 text-xs text-coffee-500">(Login required)</span>
			{/if}
		</a>

		<!-- Admin Portal -->
		<a
			href="/admin/dashboard"
			class="group flex flex-col items-center rounded-xl border-2 border-coffee-300 bg-white p-8 text-center shadow-lg transition-all hover:border-coffee-500 hover:shadow-xl"
		>
			<div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-coffee-100 text-4xl transition-colors group-hover:bg-coffee-200">
				&#128202;
			</div>
			<h2 class="text-xl font-bold text-coffee-900">Admin</h2>
			<p class="mt-2 text-sm text-coffee-600">
				Manage products, orders, customers, and view analytics
			</p>
			<span class="mt-4 text-coffee-600 transition-colors group-hover:text-coffee-800">
				Enter &#8594;
			</span>
			{#if !data.user || data.user.role !== 'admin'}
				<span class="mt-2 text-xs text-coffee-500">(Admin login required)</span>
			{/if}
		</a>
	</div>

	{#if data.user}
		<div class="mt-8 text-center">
			<p class="text-sm text-coffee-700">
				Logged in as <span class="font-medium">{data.user.username}</span>
				({data.user.role})
			</p>
			<form action="/logout" method="POST" class="mt-2">
				<button
					type="submit"
					class="text-sm text-coffee-600 underline transition-colors hover:text-coffee-800"
				>
					Sign out
				</button>
			</form>
		</div>
	{:else}
		<div class="mt-8 text-center">
			<a
				href="/login"
				class="text-sm text-coffee-600 underline transition-colors hover:text-coffee-800"
			>
				Sign in to your account
			</a>
		</div>
	{/if}
</div>
