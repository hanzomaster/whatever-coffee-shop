<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Store Locations - Coffee Shop</title>
</svelte:head>

<div class="py-12">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-10 text-center">
			<h1 class="text-4xl font-bold text-coffee-900">Our Stores</h1>
			<p class="mt-2 text-coffee-600">Find a Coffee Shop location near you</p>
		</div>

		{#if data.error}
			<div class="mx-auto max-w-md rounded-md bg-red-50 p-4 text-center text-sm text-red-700">
				{data.error}
			</div>
		{/if}

		{#if data.stores.length === 0}
			<div class="mx-auto max-w-md rounded-lg border border-coffee-200 bg-white p-8 text-center">
				<div class="mb-4 text-6xl">&#128205;</div>
				<h2 class="mb-2 text-xl font-semibold text-coffee-900">No stores found</h2>
				<p class="text-coffee-600">Check back later for new locations!</p>
			</div>
		{:else}
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each data.stores as store}
					<div
						class="overflow-hidden rounded-lg border border-coffee-200 bg-white shadow-sm transition-shadow hover:shadow-md"
					>
						<div class="h-48 bg-gradient-to-br from-coffee-400 to-coffee-600">
							<div class="flex h-full items-center justify-center text-6xl text-white/80">
								&#9749;
							</div>
						</div>
						<div class="p-6">
							<h3 class="text-xl font-semibold text-coffee-900">{store.name}</h3>

							{#if store.address}
								<div class="mt-3 flex items-start gap-2 text-coffee-600">
									<span class="mt-0.5">&#128205;</span>
									<p>{store.address}</p>
								</div>
							{/if}

							{#if store.phone}
								<div class="mt-2 flex items-center gap-2 text-coffee-600">
									<span>&#128222;</span>
									<a href="tel:{store.phone}" class="hover:text-coffee-800">{store.phone}</a>
								</div>
							{/if}

							<div class="mt-4 flex gap-3">
								{#if store.address}
									<a
										href="https://maps.google.com/?q={encodeURIComponent(store.address)}"
										target="_blank"
										rel="noopener noreferrer"
										class="flex-1 rounded-md border border-coffee-300 py-2 text-center text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
									>
										Get Directions
									</a>
								{/if}
								<a
									href="/customer/menu"
									class="flex-1 rounded-md bg-coffee-600 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-coffee-700"
								>
									Order Now
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Store Hours Section -->
		<div class="mt-16">
			<h2 class="mb-6 text-center text-2xl font-bold text-coffee-900">Store Hours</h2>
			<div
				class="mx-auto max-w-md rounded-lg border border-coffee-200 bg-white p-6 text-center shadow-sm"
			>
				<div class="space-y-2 text-coffee-700">
					<p><span class="font-medium">Monday - Friday:</span> 7:00 AM - 9:00 PM</p>
					<p><span class="font-medium">Saturday:</span> 8:00 AM - 10:00 PM</p>
					<p><span class="font-medium">Sunday:</span> 8:00 AM - 8:00 PM</p>
				</div>
				<p class="mt-4 text-sm text-coffee-500">Hours may vary by location</p>
			</div>
		</div>
	</div>
</div>
