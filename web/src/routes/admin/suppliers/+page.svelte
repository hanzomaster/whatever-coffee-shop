<script lang="ts">
	import { goto } from '$app/navigation';
	import DataTable from '$lib/components/shared/DataTable.svelte';
	import type { Supplier } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const columns = [
		{ key: 'id', header: 'ID', class: 'w-16' },
		{ key: 'name', header: 'Name' },
		{
			key: 'products',
			header: 'Products',
			render: (item: Supplier) => (item.products?.length || 0).toString()
		},
		{
			key: 'orders',
			header: 'Supply Orders',
			render: (item: Supplier) => (item.supplierDetails?.length || 0).toString()
		}
	];

	function handleRowClick(supplier: Supplier) {
		goto(`/admin/suppliers/${supplier.id}`);
	}
</script>

<svelte:head>
	<title>Suppliers - Admin - Coffee Shop</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold text-coffee-900">Suppliers</h2>
			<p class="text-coffee-600">Manage your product suppliers</p>
		</div>
		<a
			href="/admin/suppliers/new"
			class="flex items-center gap-2 rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700"
		>
			<span class="text-lg">+</span>
			Add Supplier
		</a>
	</div>

	{#if data.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{data.error}
		</div>
	{/if}

	<DataTable
		data={data.suppliers || []}
		{columns}
		onRowClick={handleRowClick}
		emptyMessage="No suppliers found. Add your first supplier to get started."
	/>
</div>
