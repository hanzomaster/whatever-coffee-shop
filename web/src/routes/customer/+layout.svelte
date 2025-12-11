<script lang="ts">
	import type { LayoutData } from './$types';
	import { cart } from '$lib/stores/cart.svelte';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<div class="flex min-h-screen flex-col bg-coffee-50">
	<!-- Customer Header -->
	<header class="sticky top-0 z-50 border-b border-coffee-200 bg-white shadow-sm">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
			<a href="/customer" class="flex items-center gap-2">
				<span class="text-2xl">&#9749;</span>
				<span class="text-xl font-bold text-coffee-900">Coffee Shop</span>
			</a>

			<nav class="flex items-center gap-6">
				<a href="/customer/menu" class="text-sm font-medium text-coffee-700 transition-colors hover:text-coffee-900">
					Menu
				</a>
				<a href="/customer/stores" class="text-sm font-medium text-coffee-700 transition-colors hover:text-coffee-900">
					Stores
				</a>
				{#if data.user}
					<a href="/customer/orders" class="text-sm font-medium text-coffee-700 transition-colors hover:text-coffee-900">
						My Orders
					</a>
				{/if}
			</nav>

			<div class="flex items-center gap-4">
				<a
					href="/customer/cart"
					class="relative flex items-center gap-1 rounded-md bg-coffee-100 px-3 py-2 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-200"
				>
					<span class="text-lg">&#128722;</span>
					Cart
					{#if cart.count > 0}
						<span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-coffee-600 text-xs text-white">
							{cart.count}
						</span>
					{/if}
				</a>

				{#if data.user}
					<a
						href="/customer/profile"
						class="flex items-center gap-2 text-sm font-medium text-coffee-700 transition-colors hover:text-coffee-900"
					>
						<span class="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-200 text-coffee-700">
							{data.user.username.charAt(0).toUpperCase()}
						</span>
						{data.user.username}
					</a>
				{:else}
					<a
						href="/login?redirect=/customer"
						class="rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700"
					>
						Sign In
					</a>
				{/if}
			</div>
		</div>
	</header>

	<!-- Customer Main Content -->
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-coffee-200 bg-white">
		<div class="mx-auto max-w-7xl px-4 py-8">
			<div class="grid gap-8 md:grid-cols-3">
				<div>
					<div class="flex items-center gap-2">
						<span class="text-2xl">&#9749;</span>
						<span class="text-lg font-bold text-coffee-900">Coffee Shop</span>
					</div>
					<p class="mt-2 text-sm text-coffee-600">
						Serving the finest coffee since 2024. Quality beans, expert brewing.
					</p>
				</div>
				<div>
					<h3 class="mb-3 font-semibold text-coffee-900">Quick Links</h3>
					<ul class="space-y-2 text-sm text-coffee-600">
						<li><a href="/customer/menu" class="hover:text-coffee-900">Menu</a></li>
						<li><a href="/customer/stores" class="hover:text-coffee-900">Locations</a></li>
						<li><a href="/customer/orders" class="hover:text-coffee-900">Track Order</a></li>
					</ul>
				</div>
				<div>
					<h3 class="mb-3 font-semibold text-coffee-900">Contact</h3>
					<ul class="space-y-2 text-sm text-coffee-600">
						<li>Phone: 1900 1234</li>
						<li>Email: hello@coffeeshop.vn</li>
					</ul>
				</div>
			</div>
			<div class="mt-8 border-t border-coffee-200 pt-4 text-center text-sm text-coffee-500">
				&copy; 2024 Coffee Shop. All rights reserved.
			</div>
		</div>
	</footer>
</div>
