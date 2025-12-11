<script lang="ts">
	import { goto } from '$app/navigation';
	import DataTable from '$lib/components/shared/DataTable.svelte';
	import { formatCurrency } from '$lib/utils';
	import type { Store } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const columns = [
		{ key: 'id', header: 'ID', class: 'w-16' },
		{ key: 'location', header: 'Location' },
		{
			key: 'revenue',
			header: 'Revenue',
			render: (item: Store) => formatCurrency(Number(item.revenue || 0))
		},
		{
			key: 'fixedCost',
			header: 'Fixed Cost',
			render: (item: Store) => formatCurrency(Number(item.fixedCost || 0))
		},
		{
			key: 'orders',
			header: 'Orders',
			render: (item: Store) => (item.orders?.length || 0).toString()
		}
	];

	function handleRowClick(store: Store) {
		goto(`/admin/stores/${store.id}`);
	}
</script>

<svelte:head>
	<title>Stores - Admin - Coffee Shop</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold text-coffee-900">Stores</h2>
			<p class="text-coffee-600">Manage your store locations</p>
		</div>
		<a
			href="/admin/stores/new"
			class="flex items-center gap-2 rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700"
		>
			<span class="text-lg">+</span>
			Add Store
		</a>
	</div>

	{#if data.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{data.error}
		</div>
	{/if}

	<DataTable
		data={data.stores || []}
		{columns}
		onRowClick={handleRowClick}
		emptyMessage="No stores found. Add your first store to get started."
	/>
</div>
