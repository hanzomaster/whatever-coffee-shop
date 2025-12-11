<script lang="ts">
	import { goto } from '$app/navigation';
	import DataTable from '$lib/components/shared/DataTable.svelte';
	import { formatCurrency } from '$lib/utils';
	import type { Product } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let categoryFilter = $state('');
	let supplierFilter = $state('');
	let stockFilter = $state('all');

	const LOW_STOCK_THRESHOLD = 10;

	const categories = $derived([...new Set(data.products.map((p: Product) => p.category).filter(Boolean))]);

	const filteredProducts = $derived(() => {
		let filtered = data.products;

		if (categoryFilter) {
			filtered = filtered.filter((p: Product) => p.category === categoryFilter);
		}

		if (supplierFilter) {
			filtered = filtered.filter((p: Product) => p.supplierId === Number(supplierFilter));
		}

		if (stockFilter === 'low') {
			filtered = filtered.filter((p: Product) => Number(p.inventory || 0) <= LOW_STOCK_THRESHOLD && Number(p.inventory || 0) > 0);
		} else if (stockFilter === 'out') {
			filtered = filtered.filter((p: Product) => Number(p.inventory || 0) === 0);
		} else if (stockFilter === 'in') {
			filtered = filtered.filter((p: Product) => Number(p.inventory || 0) > LOW_STOCK_THRESHOLD);
		}

		return filtered;
	});

	const inventoryStats = $derived(() => {
		const products = data.products;
		const totalItems = products.reduce((sum: number, p: Product) => sum + Number(p.inventory || 0), 0);
		const totalValue = products.reduce((sum: number, p: Product) => sum + (Number(p.inventory || 0) * Number(p.cost || 0)), 0);
		const lowStockCount = products.filter((p: Product) => Number(p.inventory || 0) <= LOW_STOCK_THRESHOLD && Number(p.inventory || 0) > 0).length;
		const outOfStockCount = products.filter((p: Product) => Number(p.inventory || 0) === 0).length;

		return { totalItems, totalValue, lowStockCount, outOfStockCount };
	});

	const columns = [
		{ key: 'id', header: 'ID', class: 'w-16' },
		{ key: 'name', header: 'Product' },
		{ key: 'category', header: 'Category' },
		{
			key: 'inventory',
			header: 'Stock',
			render: (item: Product) => {
				const stock = Number(item.inventory || 0);
				if (stock === 0) return `<span class="font-semibold text-red-600">Out of Stock</span>`;
				if (stock <= LOW_STOCK_THRESHOLD) return `<span class="font-semibold text-amber-600">${stock} (Low)</span>`;
				return stock.toString();
			}
		},
		{
			key: 'cost',
			header: 'Unit Cost',
			render: (item: Product) => formatCurrency(Number(item.cost || 0))
		},
		{
			key: 'value',
			header: 'Total Value',
			render: (item: Product) => formatCurrency(Number(item.inventory || 0) * Number(item.cost || 0))
		},
		{
			key: 'supplier',
			header: 'Supplier',
			render: (item: Product) => item.supplier?.name || 'N/A'
		}
	];

	function handleRowClick(product: Product) {
		goto(`/admin/products/${product.id}`);
	}

	function clearFilters() {
		categoryFilter = '';
		supplierFilter = '';
		stockFilter = 'all';
	}
</script>

<svelte:head>
	<title>Inventory - Admin - Coffee Shop</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h2 class="text-2xl font-bold text-coffee-900">Inventory</h2>
		<p class="text-coffee-600">Track stock levels and inventory value</p>
	</div>

	{#if data.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{data.error}
		</div>
	{/if}

	<div class="grid gap-4 md:grid-cols-4">
		<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-coffee-500">Total Items</p>
			<p class="text-2xl font-bold text-coffee-900">{inventoryStats().totalItems.toLocaleString()}</p>
		</div>
		<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-coffee-500">Total Value</p>
			<p class="text-2xl font-bold text-coffee-900">{formatCurrency(inventoryStats().totalValue)}</p>
		</div>
		<div class="rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-amber-600">Low Stock</p>
			<p class="text-2xl font-bold text-amber-600">{inventoryStats().lowStockCount}</p>
		</div>
		<div class="rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-red-600">Out of Stock</p>
			<p class="text-2xl font-bold text-red-600">{inventoryStats().outOfStockCount}</p>
		</div>
	</div>

	<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
		<div class="flex flex-wrap items-end gap-4">
			<div>
				<label for="category" class="block text-sm font-medium text-coffee-700">Category</label>
				<select
					id="category"
					bind:value={categoryFilter}
					class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 text-sm shadow-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				>
					<option value="">All Categories</option>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="supplier" class="block text-sm font-medium text-coffee-700">Supplier</label>
				<select
					id="supplier"
					bind:value={supplierFilter}
					class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 text-sm shadow-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				>
					<option value="">All Suppliers</option>
					{#each data.suppliers as supplier}
						<option value={supplier.id}>{supplier.name}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="stock" class="block text-sm font-medium text-coffee-700">Stock Status</label>
				<select
					id="stock"
					bind:value={stockFilter}
					class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 text-sm shadow-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				>
					<option value="all">All</option>
					<option value="in">In Stock</option>
					<option value="low">Low Stock</option>
					<option value="out">Out of Stock</option>
				</select>
			</div>

			<button
				type="button"
				onclick={clearFilters}
				class="rounded-md border border-coffee-300 px-4 py-2 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
			>
				Clear Filters
			</button>
		</div>
	</div>

	<DataTable
		data={filteredProducts()}
		{columns}
		onRowClick={handleRowClick}
		emptyMessage="No products match your filters."
	/>
</div>
