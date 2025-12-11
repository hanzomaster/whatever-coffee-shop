<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { cart } from '$lib/stores/cart.svelte';
	import type { Product } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const categories = $derived(
		['All', ...new Set(data.products.map((p: Product) => p.category).filter(Boolean))] as string[]
	);
	let selectedCategory = $state<string>('All');

	const filteredProducts = $derived(
		selectedCategory === 'All'
			? data.products
			: data.products.filter((p: Product) => p.category === selectedCategory)
	);

	function addToCart(product: Product) {
		cart.add({
			id: product.id,
			name: product.name,
			price: Number(product.price || 0),
			imgPath: product.imgPath
		});
	}
</script>

<svelte:head>
	<title>Menu - Coffee Shop</title>
</svelte:head>

<div class="py-12">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-10 text-center">
			<h1 class="text-4xl font-bold text-coffee-900">Our Menu</h1>
			<p class="mt-2 text-coffee-600">Freshly brewed coffee and delicious treats</p>
		</div>

		{#if data.error}
			<div class="mx-auto max-w-md rounded-md bg-red-50 p-4 text-center text-sm text-red-700">
				{data.error}
			</div>
		{/if}

		<!-- Category Filters -->
		<div class="mb-8 flex flex-wrap justify-center gap-2">
			{#each categories as category}
				<button
					onclick={() => (selectedCategory = category)}
					class="rounded-full px-4 py-2 text-sm font-medium transition-colors {selectedCategory ===
					category
						? 'bg-coffee-600 text-white'
						: 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'}"
				>
					{category}
				</button>
			{/each}
		</div>

		{#if filteredProducts.length === 0}
			<p class="text-center text-coffee-500">No products available in this category.</p>
		{:else}
			<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{#each filteredProducts as product}
					<div
						class="group overflow-hidden rounded-lg border border-coffee-200 bg-white shadow-sm transition-shadow hover:shadow-md"
					>
						{#if product.imgPath}
							<img
								src={product.imgPath}
								alt={product.name}
								class="h-48 w-full object-cover transition-transform group-hover:scale-105"
							/>
						{:else}
							<div
								class="flex h-48 items-center justify-center bg-coffee-100 text-6xl transition-transform group-hover:scale-105"
							>
								&#9749;
							</div>
						{/if}
						<div class="p-4">
							<div class="flex items-start justify-between">
								<div>
									<h3 class="font-semibold text-coffee-900">{product.name}</h3>
									{#if product.category}
										<span class="text-xs text-coffee-500">{product.category}</span>
									{/if}
								</div>
								<span class="text-lg font-bold text-coffee-800">
									{formatCurrency(Number(product.price || 0))}
								</span>
							</div>
							{#if product.description}
								<p class="mt-2 text-sm text-coffee-600 line-clamp-2">{product.description}</p>
							{/if}
							<button
								onclick={() => addToCart(product)}
								disabled={Number(product.inventory || 0) === 0}
								class="mt-4 w-full rounded-md bg-coffee-600 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{Number(product.inventory || 0) === 0 ? 'Out of Stock' : 'Add to Cart'}
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
