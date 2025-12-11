<script lang="ts">
	import DataTable from '$lib/components/shared/DataTable.svelte';
	import { formatDate, formatPhone } from '$lib/utils';
	import type { User } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const columns = [
		{ key: 'id', header: 'ID', class: 'w-16' },
		{ key: 'username', header: 'Username' },
		{
			key: 'phone',
			header: 'Phone',
			render: (item: User) => (item.phone ? formatPhone(item.phone) : '-')
		},
		{
			key: 'dob',
			header: 'Date of Birth',
			render: (item: User) => formatDate(item.dob)
		},
		{
			key: 'role',
			header: 'Role',
			render: (item: User) => `<span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${item.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-coffee-100 text-coffee-700'}">${item.role}</span>`
		},
		{
			key: 'createdAt',
			header: 'Created',
			render: (item: User) => formatDate(item.createdAt)
		}
	];
</script>

<svelte:head>
	<title>Users - Admin - Coffee Shop</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h2 class="text-2xl font-bold text-coffee-900">Users</h2>
		<p class="text-coffee-600">View system users (read-only)</p>
	</div>

	{#if data.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{data.error}
		</div>
	{/if}

	<div class="grid gap-4 md:grid-cols-3">
		<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-coffee-500">Total Users</p>
			<p class="text-2xl font-bold text-coffee-900">{data.users?.length || 0}</p>
		</div>
		<div class="rounded-lg border border-purple-200 bg-purple-50 p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-purple-600">Admins</p>
			<p class="text-2xl font-bold text-purple-600">
				{data.users?.filter((u: User) => u.role === 'admin').length || 0}
			</p>
		</div>
		<div class="rounded-lg border border-coffee-200 bg-coffee-50 p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-coffee-600">Regular Users</p>
			<p class="text-2xl font-bold text-coffee-600">
				{data.users?.filter((u: User) => u.role === 'user').length || 0}
			</p>
		</div>
	</div>

	<DataTable
		data={data.users || []}
		{columns}
		emptyMessage="No users found."
	/>
</div>
