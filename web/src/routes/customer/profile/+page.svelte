<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>My Profile - Coffee Shop</title>
</svelte:head>

<div class="py-12">
	<div class="mx-auto max-w-2xl px-4">
		<h1 class="mb-8 text-3xl font-bold text-coffee-900">My Profile</h1>

		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<div class="mb-6 flex items-center gap-4">
				<div
					class="flex h-20 w-20 items-center justify-center rounded-full bg-coffee-100 text-3xl font-bold text-coffee-600"
				>
					{data.user.username.charAt(0).toUpperCase()}
				</div>
				<div>
					<h2 class="text-xl font-semibold text-coffee-900">{data.user.username}</h2>
					<p class="capitalize text-coffee-600">{data.user.role}</p>
				</div>
			</div>

			<div class="space-y-4 border-t border-coffee-100 pt-6">
				<div>
					<span class="block text-sm font-medium text-coffee-700">Username</span>
					<p class="mt-1 text-coffee-900">{data.user.username}</p>
				</div>

				<div>
					<span class="block text-sm font-medium text-coffee-700">Role</span>
					<p class="mt-1 capitalize text-coffee-900">{data.user.role}</p>
				</div>

				{#if data.user.phone}
					<div>
						<span class="block text-sm font-medium text-coffee-700">Phone</span>
						<p class="mt-1 text-coffee-900">{data.user.phone}</p>
					</div>
				{/if}

				{#if data.user.dob}
					<div>
						<span class="block text-sm font-medium text-coffee-700">Date of Birth</span>
						<p class="mt-1 text-coffee-900">{data.user.dob}</p>
					</div>
				{/if}
			</div>

			<div class="mt-8 border-t border-coffee-100 pt-6">
				<h3 class="mb-4 font-semibold text-coffee-900">Quick Links</h3>
				<div class="grid gap-3 sm:grid-cols-2">
					<a
						href="/customer/orders"
						class="flex items-center gap-2 rounded-md border border-coffee-200 p-3 text-coffee-700 transition-colors hover:bg-coffee-50"
					>
						<span>&#128230;</span>
						<span>My Orders</span>
					</a>
					<a
						href="/customer/cart"
						class="flex items-center gap-2 rounded-md border border-coffee-200 p-3 text-coffee-700 transition-colors hover:bg-coffee-50"
					>
						<span>&#128722;</span>
						<span>My Cart</span>
					</a>
					<a
						href="/customer/stores"
						class="flex items-center gap-2 rounded-md border border-coffee-200 p-3 text-coffee-700 transition-colors hover:bg-coffee-50"
					>
						<span>&#128205;</span>
						<span>Store Locations</span>
					</a>
					<a
						href="/customer/menu"
						class="flex items-center gap-2 rounded-md border border-coffee-200 p-3 text-coffee-700 transition-colors hover:bg-coffee-50"
					>
						<span>&#9749;</span>
						<span>Browse Menu</span>
					</a>
				</div>
			</div>

			<div class="mt-8 border-t border-coffee-100 pt-6">
				<form method="POST" action="?/logout" use:enhance>
					<button
						type="submit"
						class="w-full rounded-md border border-red-300 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
					>
						Sign Out
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
