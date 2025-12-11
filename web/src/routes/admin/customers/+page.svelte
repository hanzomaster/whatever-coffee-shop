<script lang="ts">
	import { goto } from '$app/navigation';
	import DataTable from '$lib/components/shared/DataTable.svelte';
	import { formatCurrency, formatPhone } from '$lib/utils';
	import type { Customer } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const columns = [
		{ key: 'id', header: 'ID', class: 'w-16' },
		{ key: 'name', header: 'Name' },
		{
			key: 'phone',
			header: 'Phone',
			render: (item: Customer) => (item.phone ? formatPhone(item.phone) : '-')
		},
		{
			key: 'balance',
			header: 'Balance',
			render: (item: Customer) => formatCurrency(Number(item.balance || 0))
		},
		{
			key: 'orders',
			header: 'Orders',
			render: (item: Customer) => (item.orders?.length || 0).toString()
		}
	];

	function handleRowClick(customer: Customer) {
		goto(`/admin/customers/${customer.id}`);
	}
</script>

<svelte:head>
	<title>Customers - Admin - Coffee Shop</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold text-coffee-900">Customers</h2>
			<p class="text-coffee-600">Manage your customer database</p>
		</div>
		<a
			href="/admin/customers/new"
			class="flex items-center gap-2 rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700"
		>
			<span class="text-lg">+</span>
			Add Customer
		</a>
	</div>

	{#if data.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{data.error}
		</div>
	{/if}

	<DataTable
		data={data.customers || []}
		{columns}
		onRowClick={handleRowClick}
		emptyMessage="No customers found. Add your first customer to get started."
	/>
</div>
