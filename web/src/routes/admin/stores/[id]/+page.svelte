<script lang="ts">
	import { enhance } from '$app/forms';
	import StoreForm from '$lib/components/forms/StoreForm.svelte';
	import { formatCurrency } from '$lib/utils';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let isSubmitting = $state(false);
	let isDeleting = $state(false);
	let showDeleteConfirm = $state(false);

	const profit = $derived(Number(data.store.revenue || 0) - Number(data.store.fixedCost || 0));
</script>

<svelte:head>
	<title>{data.store.location} - Stores - Admin - Coffee Shop</title>
</svelte:head>

<div class="mx-auto max-w-2xl space-y-6">
	<div>
		<a href="/admin/stores" class="text-sm text-coffee-600 hover:text-coffee-800">
			&#8592; Back to Stores
		</a>
		<div class="mt-2 flex items-center justify-between">
			<div>
				<h2 class="text-2xl font-bold text-coffee-900">{data.store.location}</h2>
				<p class="text-coffee-600">Store ID: {data.store.id}</p>
			</div>
			<button
				type="button"
				onclick={() => (showDeleteConfirm = true)}
				class="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
			>
				Delete Store
			</button>
		</div>
	</div>

	{#if form?.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{form.error}
		</div>
	{/if}

	{#if form?.success}
		<div class="rounded-md bg-green-50 p-4 text-sm text-green-700">Store updated successfully!</div>
	{/if}

	<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
		<h3 class="mb-4 text-lg font-semibold text-coffee-900">Store Performance</h3>
		<div class="mb-6 grid gap-4 rounded-md bg-coffee-50 p-4 md:grid-cols-3">
			<div>
				<p class="text-xs font-medium uppercase text-coffee-500">Revenue</p>
				<p class="text-lg font-semibold text-coffee-900">
					{formatCurrency(Number(data.store.revenue || 0))}
				</p>
			</div>
			<div>
				<p class="text-xs font-medium uppercase text-coffee-500">Fixed Cost</p>
				<p class="text-lg font-semibold text-coffee-900">
					{formatCurrency(Number(data.store.fixedCost || 0))}
				</p>
			</div>
			<div>
				<p class="text-xs font-medium uppercase text-coffee-500">Profit</p>
				<p class="text-lg font-semibold {profit >= 0 ? 'text-green-600' : 'text-red-600'}">
					{formatCurrency(profit)}
				</p>
			</div>
		</div>

		<form
			method="POST"
			action="?/update"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					isSubmitting = false;
				};
			}}
		>
			<StoreForm store={data.store} submitLabel="Update Store" {isSubmitting} />
		</form>
	</div>

	{#if data.store.orders && data.store.orders.length > 0}
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Recent Orders</h3>
			<div class="space-y-2">
				{#each data.store.orders.slice(0, 5) as order}
					<a
						href="/admin/orders/{order.id}"
						class="flex items-center justify-between rounded-md border border-coffee-100 bg-coffee-50 p-3 transition-colors hover:bg-coffee-100"
					>
						<div>
							<p class="font-medium text-coffee-900">Order #{order.id}</p>
							<p class="text-sm text-coffee-600">{order.customer?.name || 'N/A'}</p>
						</div>
						<span class="text-coffee-600">View</span>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>

{#if showDeleteConfirm}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<h3 class="text-lg font-semibold text-coffee-900">Delete Store</h3>
			<p class="mt-2 text-coffee-600">
				Are you sure you want to delete "{data.store.location}"? This action cannot be undone.
			</p>
			<div class="mt-6 flex justify-end gap-3">
				<button
					type="button"
					onclick={() => (showDeleteConfirm = false)}
					class="rounded-md border border-coffee-300 px-4 py-2 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
				>
					Cancel
				</button>
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						isDeleting = true;
						return async ({ update }) => {
							await update();
							isDeleting = false;
						};
					}}
				>
					<button
						type="submit"
						disabled={isDeleting}
						class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isDeleting ? 'Deleting...' : 'Delete'}
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
