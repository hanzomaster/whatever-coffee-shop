<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { cart } from '$lib/stores/cart.svelte';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const defaultStoreId = data.stores[0]?.id || null;
	let selectedStoreId = $state<number | null>(defaultStoreId);
	let customerName = $state('');
	let customerPhone = $state('');
	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>Checkout - Coffee Shop</title>
</svelte:head>

<div class="py-12">
	<div class="mx-auto max-w-4xl px-4">
		<h1 class="mb-8 text-3xl font-bold text-coffee-900">Checkout</h1>

		{#if cart.items.length === 0}
			<div class="rounded-lg border border-coffee-200 bg-white p-8 text-center">
				<div class="mb-4 text-6xl">&#128722;</div>
				<h2 class="mb-2 text-xl font-semibold text-coffee-900">Your cart is empty</h2>
				<p class="mb-6 text-coffee-600">Add some items before checking out!</p>
				<a
					href="/customer/menu"
					class="inline-block rounded-md bg-coffee-600 px-6 py-3 font-medium text-white transition-colors hover:bg-coffee-700"
				>
					Browse Menu
				</a>
			</div>
		{:else}
			<div class="grid gap-8 lg:grid-cols-2">
				<!-- Order Form -->
				<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
					<h2 class="mb-6 text-xl font-semibold text-coffee-900">Order Details</h2>

					{#if form?.error}
						<div class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
							{form.error}
						</div>
					{/if}

					<form
						method="POST"
						use:enhance={() => {
							isSubmitting = true;
							return async ({ update, result }) => {
								await update();
								isSubmitting = false;
								if (result.type === 'redirect') {
									cart.clear();
								}
							};
						}}
					>
						<input type="hidden" name="items" value={JSON.stringify(cart.items)} />

						<div class="space-y-4">
							<div>
								<label for="storeId" class="mb-1 block text-sm font-medium text-coffee-700">
									Pickup Location *
								</label>
								<select
									id="storeId"
									name="storeId"
									bind:value={selectedStoreId}
									required
									class="w-full rounded-md border border-coffee-300 px-3 py-2 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
								>
									{#each data.stores as store}
										<option value={store.id}>{store.name} - {store.address}</option>
									{/each}
								</select>
							</div>

							<div>
								<label for="customerName" class="mb-1 block text-sm font-medium text-coffee-700">
									Your Name (optional)
								</label>
								<input
									type="text"
									id="customerName"
									name="customerName"
									bind:value={customerName}
									placeholder="Enter your name"
									class="w-full rounded-md border border-coffee-300 px-3 py-2 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
								/>
							</div>

							<div>
								<label for="customerPhone" class="mb-1 block text-sm font-medium text-coffee-700">
									Phone Number (optional)
								</label>
								<input
									type="tel"
									id="customerPhone"
									name="customerPhone"
									bind:value={customerPhone}
									placeholder="Enter your phone number"
									class="w-full rounded-md border border-coffee-300 px-3 py-2 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={isSubmitting || !selectedStoreId}
							class="mt-6 w-full rounded-md bg-coffee-600 py-3 font-medium text-white transition-colors hover:bg-coffee-700 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isSubmitting ? 'Placing Order...' : `Place Order - ${formatCurrency(cart.total)}`}
						</button>
					</form>
				</div>

				<!-- Order Summary -->
				<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
					<h2 class="mb-6 text-xl font-semibold text-coffee-900">Order Summary</h2>

					<div class="space-y-4">
						{#each cart.items as item (item.id)}
							<div class="flex items-center gap-3">
								{#if item.imgPath}
									<img
										src={item.imgPath}
										alt={item.name}
										class="h-12 w-12 rounded-md object-cover"
									/>
								{:else}
									<div
										class="flex h-12 w-12 items-center justify-center rounded-md bg-coffee-100 text-xl"
									>
										&#9749;
									</div>
								{/if}
								<div class="flex-1">
									<p class="font-medium text-coffee-900">{item.name}</p>
									<p class="text-sm text-coffee-600">Qty: {item.quantity}</p>
								</div>
								<p class="font-medium text-coffee-900">
									{formatCurrency(item.price * item.quantity)}
								</p>
							</div>
						{/each}
					</div>

					<div class="mt-6 border-t border-coffee-100 pt-4">
						<div class="flex justify-between text-coffee-600">
							<span>Subtotal</span>
							<span>{formatCurrency(cart.total)}</span>
						</div>
						<div class="mt-2 flex justify-between text-lg font-semibold text-coffee-900">
							<span>Total</span>
							<span>{formatCurrency(cart.total)}</span>
						</div>
					</div>

					<a
						href="/customer/cart"
						class="mt-4 block text-center text-sm text-coffee-600 transition-colors hover:text-coffee-800"
					>
						Edit Cart
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>
