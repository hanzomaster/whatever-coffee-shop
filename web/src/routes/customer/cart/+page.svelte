<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { cart } from '$lib/stores/cart.svelte';
</script>

<svelte:head>
	<title>Cart - Coffee Shop</title>
</svelte:head>

<div class="py-12">
	<div class="mx-auto max-w-3xl px-4">
		<h1 class="mb-8 text-3xl font-bold text-coffee-900">Your Cart</h1>

		{#if cart.items.length === 0}
			<div class="rounded-lg border border-coffee-200 bg-white p-8 text-center">
				<div class="mb-4 text-6xl">&#128722;</div>
				<h2 class="mb-2 text-xl font-semibold text-coffee-900">Your cart is empty</h2>
				<p class="mb-6 text-coffee-600">Add some delicious items from our menu!</p>
				<a
					href="/customer/menu"
					class="inline-block rounded-md bg-coffee-600 px-6 py-3 font-medium text-white transition-colors hover:bg-coffee-700"
				>
					Browse Menu
				</a>
			</div>
		{:else}
			<div class="space-y-4">
				{#each cart.items as item (item.id)}
					<div
						class="flex items-center gap-4 rounded-lg border border-coffee-200 bg-white p-4 shadow-sm"
					>
						{#if item.imgPath}
							<img
								src={item.imgPath}
								alt={item.name}
								class="h-20 w-20 rounded-md object-cover"
							/>
						{:else}
							<div
								class="flex h-20 w-20 items-center justify-center rounded-md bg-coffee-100 text-3xl"
							>
								&#9749;
							</div>
						{/if}

						<div class="flex-1">
							<h3 class="font-semibold text-coffee-900">{item.name}</h3>
							<p class="text-coffee-600">{formatCurrency(item.price)}</p>
						</div>

						<div class="flex items-center gap-2">
							<button
								onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}
								class="flex h-8 w-8 items-center justify-center rounded-md border border-coffee-300 text-coffee-700 transition-colors hover:bg-coffee-50"
							>
								-
							</button>
							<span class="w-8 text-center font-medium">{item.quantity}</span>
							<button
								onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}
								class="flex h-8 w-8 items-center justify-center rounded-md border border-coffee-300 text-coffee-700 transition-colors hover:bg-coffee-50"
							>
								+
							</button>
						</div>

						<div class="w-24 text-right font-semibold text-coffee-900">
							{formatCurrency(item.price * item.quantity)}
						</div>

						<button
							onclick={() => cart.remove(item.id)}
							class="text-red-500 transition-colors hover:text-red-700"
							title="Remove item"
						>
							&#10005;
						</button>
					</div>
				{/each}
			</div>

			<div class="mt-8 rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
				<div class="flex items-center justify-between border-b border-coffee-100 pb-4">
					<span class="text-coffee-600">Subtotal ({cart.count} items)</span>
					<span class="font-semibold text-coffee-900">{formatCurrency(cart.total)}</span>
				</div>
				<div class="flex items-center justify-between pt-4">
					<span class="text-lg font-semibold text-coffee-900">Total</span>
					<span class="text-2xl font-bold text-coffee-900">{formatCurrency(cart.total)}</span>
				</div>

				<div class="mt-6 flex gap-4">
					<button
						onclick={() => cart.clear()}
						class="flex-1 rounded-md border border-coffee-300 py-3 font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
					>
						Clear Cart
					</button>
					<a
						href="/customer/checkout"
						class="flex-1 rounded-md bg-coffee-600 py-3 text-center font-medium text-white transition-colors hover:bg-coffee-700"
					>
						Checkout
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>
