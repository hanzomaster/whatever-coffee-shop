<script lang="ts">
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<div class="flex h-screen flex-col bg-coffee-50">
	<!-- POS Header -->
	<header class="flex h-14 items-center justify-between border-b border-coffee-200 bg-white px-4">
		<div class="flex items-center gap-4">
			<a href="/" class="flex items-center gap-2">
				<span class="text-xl">&#9749;</span>
				<span class="font-bold text-coffee-900">POS</span>
			</a>
			<span class="text-sm text-coffee-600">Store #1</span>
		</div>

		<nav class="flex items-center gap-2">
			<a
				href="/pos"
				class="rounded-md px-3 py-1.5 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-100"
			>
				New Order
			</a>
			<a
				href="/pos/orders"
				class="rounded-md px-3 py-1.5 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-100"
			>
				Orders
			</a>
			<a
				href="/pos/customers"
				class="rounded-md px-3 py-1.5 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-100"
			>
				Customers
			</a>
		</nav>

		<div class="flex items-center gap-3">
			<span class="text-sm text-coffee-700">{data.user?.username}</span>
			<form action="/logout" method="POST">
				<button
					type="submit"
					class="rounded-md bg-coffee-100 px-3 py-1.5 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-200"
				>
					Logout
				</button>
			</form>
		</div>
	</header>

	<!-- POS Main Content -->
	<main class="flex-1 overflow-hidden">
		{@render children()}
	</main>
</div>
