<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatCurrency } from '$lib/utils';
	import type { Product, Customer, Store } from '$lib/api/types';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	// Get unique categories from products
	const categories = $derived(['All', ...new Set(data.products.map((p: Product) => p.category).filter(Boolean))] as string[]);
	let selectedCategory = $state<string>('All');

	// Cart state
	interface CartItem {
		id: number;
		name: string;
		price: number;
		quantity: number;
	}
	let cart = $state<CartItem[]>([]);

	// Customer and store selection
	let selectedCustomerId = $state<number | null>(null);
	const defaultStoreId = data.stores[0]?.id || null;
	let selectedStoreId = $state<number | null>(defaultStoreId);
	let showCustomerModal = $state(false);
	let customerSearch = $state('');

	// Checkout state
	let isProcessing = $state(false);
	let showReceipt = $state(false);
	let lastOrderId = $state<number | null>(null);

	const filteredProducts = $derived(
		selectedCategory === 'All'
			? data.products
			: data.products.filter((p: Product) => p.category === selectedCategory)
	);

	const filteredCustomers = $derived(
		customerSearch
			? data.customers.filter((c: Customer) =>
					c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
					(c.phone && c.phone.includes(customerSearch))
				)
			: data.customers
	);

	const selectedCustomer = $derived(
		data.customers.find((c: Customer) => c.id === selectedCustomerId)
	);

	const cartTotal = $derived(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));

	function addToCart(product: Product) {
		const existing = cart.find((item) => item.id === product.id);
		if (existing) {
			existing.quantity++;
			cart = [...cart];
		} else {
			cart = [...cart, { id: product.id, name: product.name, price: Number(product.price || 0), quantity: 1 }];
		}
	}

	function removeFromCart(id: number) {
		cart = cart.filter((item) => item.id !== id);
	}

	function updateQuantity(id: number, delta: number) {
		const item = cart.find((i) => i.id === id);
		if (item) {
			item.quantity += delta;
			if (item.quantity <= 0) {
				removeFromCart(id);
			} else {
				cart = [...cart];
			}
		}
	}

	function selectCustomer(customer: Customer) {
		selectedCustomerId = customer.id;
		showCustomerModal = false;
		customerSearch = '';
	}

	function clearCart() {
		cart = [];
		selectedCustomerId = null;
	}

	function handleCheckoutSuccess() {
		if (form?.success && form?.orderId) {
			lastOrderId = form.orderId;
			showReceipt = true;
			cart = [];
			selectedCustomerId = null;
		}
	}

	$effect(() => {
		if (form?.success) {
			handleCheckoutSuccess();
		}
	});
</script>

<svelte:head>
	<title>POS - Coffee Shop</title>
</svelte:head>

<div class="flex h-full">
	<!-- Products Section -->
	<div class="flex flex-1 flex-col overflow-hidden">
		<!-- Category Tabs -->
		<div class="flex gap-2 border-b border-coffee-200 bg-white p-3">
			{#each categories as category}
				<button
					onclick={() => (selectedCategory = category)}
					class="rounded-md px-4 py-2 text-sm font-medium transition-colors {selectedCategory === category
						? 'bg-coffee-600 text-white'
						: 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'}"
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- Product Grid -->
		<div class="flex-1 overflow-auto p-4">
			{#if data.products.length === 0}
				<p class="text-center text-coffee-500">No products available.</p>
			{:else}
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{#each filteredProducts as product}
						<button
							onclick={() => addToCart(product)}
							disabled={Number(product.inventory || 0) === 0}
							class="flex flex-col items-center rounded-lg border border-coffee-200 bg-white p-4 text-center transition-colors hover:border-coffee-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
						>
							{#if product.imgPath}
								<img src={product.imgPath} alt={product.name} class="mb-2 h-16 w-16 rounded-full object-cover" />
							{:else}
								<div class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-coffee-100 text-2xl">
									&#9749;
								</div>
							{/if}
							<span class="text-sm font-medium text-coffee-900">{product.name}</span>
							<span class="text-sm text-coffee-600">{formatCurrency(Number(product.price || 0))}</span>
							{#if Number(product.inventory || 0) === 0}
								<span class="mt-1 text-xs text-red-500">Out of stock</span>
							{:else if Number(product.inventory || 0) <= 10}
								<span class="mt-1 text-xs text-amber-500">Low stock ({product.inventory})</span>
							{/if}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Cart Section -->
	<div class="flex w-96 flex-col border-l border-coffee-200 bg-white">
		<div class="border-b border-coffee-200 p-4">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold text-coffee-900">Current Order</h2>
				{#if cart.length > 0}
					<button
						onclick={clearCart}
						class="text-sm text-red-600 hover:text-red-800"
					>
						Clear
					</button>
				{/if}
			</div>

			<!-- Customer Selection -->
			<div class="mt-3">
				<button
					onclick={() => (showCustomerModal = true)}
					class="w-full rounded-md border border-coffee-300 px-3 py-2 text-left text-sm transition-colors hover:bg-coffee-50"
				>
					{#if selectedCustomer}
						<span class="font-medium text-coffee-900">{selectedCustomer.name}</span>
						{#if selectedCustomer.phone}
							<span class="text-coffee-500"> - {selectedCustomer.phone}</span>
						{/if}
					{:else}
						<span class="text-coffee-500">Select customer...</span>
					{/if}
				</button>
			</div>

			<!-- Store Selection -->
			<div class="mt-2">
				<select
					bind:value={selectedStoreId}
					class="w-full rounded-md border border-coffee-300 px-3 py-2 text-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				>
					{#each data.stores as store}
						<option value={store.id}>{store.location}</option>
					{/each}
				</select>
			</div>
		</div>

		{#if form?.error}
			<div class="m-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
				{form.error}
			</div>
		{/if}

		<!-- Cart Items -->
		<div class="flex-1 overflow-auto p-4">
			{#if cart.length === 0}
				<p class="text-center text-sm text-coffee-500">No items in cart</p>
			{:else}
				<div class="space-y-3">
					{#each cart as item}
						<div class="flex items-center justify-between rounded-md bg-coffee-50 p-3">
							<div class="flex-1">
								<p class="text-sm font-medium text-coffee-900">{item.name}</p>
								<p class="text-xs text-coffee-600">{formatCurrency(item.price)}</p>
							</div>
							<div class="flex items-center gap-2">
								<button
									onclick={() => updateQuantity(item.id, -1)}
									class="flex h-7 w-7 items-center justify-center rounded bg-coffee-200 text-coffee-700 hover:bg-coffee-300"
								>
									-
								</button>
								<span class="w-8 text-center text-sm font-medium">{item.quantity}</span>
								<button
									onclick={() => updateQuantity(item.id, 1)}
									class="flex h-7 w-7 items-center justify-center rounded bg-coffee-200 text-coffee-700 hover:bg-coffee-300"
								>
									+
								</button>
							</div>
							<p class="ml-3 w-24 text-right text-sm font-semibold text-coffee-900">
								{formatCurrency(item.price * item.quantity)}
							</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Cart Footer -->
		<div class="border-t border-coffee-200 p-4">
			<div class="mb-4 space-y-2">
				<div class="flex justify-between text-sm text-coffee-600">
					<span>Items</span>
					<span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
				</div>
				<div class="flex justify-between text-lg font-semibold">
					<span class="text-coffee-700">Total:</span>
					<span class="text-coffee-900">{formatCurrency(cartTotal)}</span>
				</div>
			</div>
			<form
				method="POST"
				action="?/checkout"
				use:enhance={() => {
					isProcessing = true;
					return async ({ update }) => {
						await update();
						isProcessing = false;
					};
				}}
			>
				<input type="hidden" name="customerId" value={selectedCustomerId || ''} />
				<input type="hidden" name="storeId" value={selectedStoreId || ''} />
				<input type="hidden" name="cart" value={JSON.stringify(cart)} />
				<button
					type="submit"
					disabled={cart.length === 0 || !selectedCustomerId || !selectedStoreId || isProcessing}
					class="w-full rounded-md bg-coffee-600 py-3 text-center font-medium text-white transition-colors hover:bg-coffee-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isProcessing ? 'Processing...' : 'Checkout'}
				</button>
			</form>
		</div>
	</div>
</div>

<!-- Customer Selection Modal -->
{#if showCustomerModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
			<div class="border-b border-coffee-200 p-4">
				<div class="flex items-center justify-between">
					<h3 class="text-lg font-semibold text-coffee-900">Select Customer</h3>
					<button
						onclick={() => (showCustomerModal = false)}
						class="text-coffee-500 hover:text-coffee-700"
					>
						&#10005;
					</button>
				</div>
				<input
					type="text"
					bind:value={customerSearch}
					placeholder="Search by name or phone..."
					class="mt-3 w-full rounded-md border border-coffee-300 px-3 py-2 text-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				/>
			</div>
			<div class="max-h-80 overflow-auto p-2">
				{#if filteredCustomers.length === 0}
					<p class="p-4 text-center text-sm text-coffee-500">No customers found.</p>
				{:else}
					{#each filteredCustomers as customer}
						<button
							onclick={() => selectCustomer(customer)}
							class="flex w-full items-center justify-between rounded-md p-3 text-left transition-colors hover:bg-coffee-50"
						>
							<div>
								<p class="font-medium text-coffee-900">{customer.name}</p>
								<p class="text-sm text-coffee-500">{customer.phone || 'No phone'}</p>
							</div>
							<p class="text-sm text-coffee-600">
								Balance: {formatCurrency(Number(customer.balance || 0))}
							</p>
						</button>
					{/each}
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- Receipt Modal -->
{#if showReceipt}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
			<div class="text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
					<span class="text-3xl text-green-600">&#10003;</span>
				</div>
				<h3 class="text-xl font-semibold text-coffee-900">Order Complete!</h3>
				<p class="mt-2 text-coffee-600">Order #{lastOrderId} has been created successfully.</p>
			</div>
			<button
				onclick={() => (showReceipt = false)}
				class="mt-6 w-full rounded-md bg-coffee-600 py-2 font-medium text-white transition-colors hover:bg-coffee-700"
			>
				New Order
			</button>
		</div>
	</div>
{/if}
