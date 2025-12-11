<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { cart } from '$lib/stores/cart.svelte';
	import type { Product } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

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
	<title>Coffee Shop - Premium Coffee & More</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-coffee-900 py-20 text-white">
	<div class="absolute inset-0 bg-gradient-to-r from-coffee-900/90 to-coffee-800/70"></div>
	<div class="relative mx-auto max-w-7xl px-4 text-center">
		<h1 class="text-4xl font-bold md:text-5xl lg:text-6xl">Crafted with Passion</h1>
		<p class="mx-auto mt-4 max-w-2xl text-lg text-coffee-200">
			Experience the finest coffee beans sourced from around the world, expertly roasted and brewed
			to perfection.
		</p>
		<div class="mt-8 flex justify-center gap-4">
			<a
				href="/customer/menu"
				class="rounded-md bg-coffee-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-coffee-500"
			>
				View Menu
			</a>
			<a
				href="/customer/stores"
				class="rounded-md border border-white px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-white/10"
			>
				Find a Store
			</a>
		</div>
	</div>
</section>

<!-- Featured Products -->
<section class="py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-10 text-center">
			<h2 class="text-3xl font-bold text-coffee-900">Featured Picks</h2>
			<p class="mt-2 text-coffee-600">Discover our most loved items</p>
		</div>

		{#if data.featuredProducts.length > 0}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each data.featuredProducts as product}
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
							<h3 class="font-semibold text-coffee-900">{product.name}</h3>
							<p class="mt-1 text-sm text-coffee-600">
								{product.description || product.category || 'Delicious beverage'}
							</p>
							<div class="mt-4 flex items-center justify-between">
								<span class="text-lg font-bold text-coffee-800">
									{formatCurrency(Number(product.price || 0))}
								</span>
								<button
									onclick={() => addToCart(product)}
									class="rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700"
								>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center text-coffee-500">No products available yet.</p>
		{/if}

		<div class="mt-10 text-center">
			<a
				href="/customer/menu"
				class="inline-flex items-center gap-2 text-coffee-600 transition-colors hover:text-coffee-800"
			>
				View full menu
				<span>&#8594;</span>
			</a>
		</div>
	</div>
</section>

<!-- Why Choose Us -->
<section class="bg-white py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-10 text-center">
			<h2 class="text-3xl font-bold text-coffee-900">Why Coffee Shop?</h2>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-coffee-100 text-3xl"
				>
					&#127793;
				</div>
				<h3 class="font-semibold text-coffee-900">Premium Beans</h3>
				<p class="mt-2 text-sm text-coffee-600">
					Sourced from the finest farms in Vietnam, Ethiopia, and Colombia
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-coffee-100 text-3xl"
				>
					&#128293;
				</div>
				<h3 class="font-semibold text-coffee-900">Expert Roasting</h3>
				<p class="mt-2 text-sm text-coffee-600">
					Carefully roasted in small batches for optimal flavor
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-coffee-100 text-3xl"
				>
					&#10084;
				</div>
				<h3 class="font-semibold text-coffee-900">Made with Love</h3>
				<p class="mt-2 text-sm text-coffee-600">Every cup crafted by passionate baristas</p>
			</div>
		</div>
	</div>
</section>
