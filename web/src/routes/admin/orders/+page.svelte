<script lang="ts">
	import { goto } from '$app/navigation';
	import DataTable from '$lib/components/shared/DataTable.svelte';
	import { formatCurrency, formatDate } from '$lib/utils';
	import type { Order } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const columns = [
		{ key: 'id', header: 'ID', class: 'w-16' },
		{
			key: 'date',
			header: 'Date',
			render: (item: Order) => formatDate(item.date || '')
		},
		{
			key: 'customer',
			header: 'Customer',
			render: (item: Order) => item.customer?.name || 'N/A'
		},
		{
			key: 'store',
			header: 'Store',
			render: (item: Order) => item.store?.location || 'N/A'
		},
		{
			key: 'items',
			header: 'Items',
			render: (item: Order) => (item.orderDetails?.length || 0).toString()
		},
		{
			key: 'total',
			header: 'Total',
			render: (item: Order) => {
				const total =
					item.orderDetails?.reduce((sum, detail) => {
						return sum + Number(detail.unitPrice || 0) * Number(detail.quantity || 0);
					}, 0) || 0;
				return formatCurrency(total);
			}
		}
	];

	function handleRowClick(order: Order) {
		goto(`/admin/orders/${order.id}`);
	}
</script>

<svelte:head>
	<title>Orders - Admin - Coffee Shop</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold text-coffee-900">Orders</h2>
			<p class="text-coffee-600">View and manage customer orders</p>
		</div>
		<a
			href="/admin/orders/new"
			class="flex items-center gap-2 rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700"
		>
			<span class="text-lg">+</span>
			New Order
		</a>
	</div>

	{#if data.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{data.error}
		</div>
	{/if}

	<DataTable
		data={data.orders || []}
		{columns}
		onRowClick={handleRowClick}
		emptyMessage="No orders found."
	/>
</div>
