<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatCurrency, formatDate } from '$lib/utils';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let isSubmitting = $state(false);
	let isDeleting = $state(false);
	let showDeleteConfirm = $state(false);

	const orderTotal = $derived(
		data.order.orderDetails?.reduce((sum: number, detail: { unitPrice?: string | null; quantity?: string | null }) => {
			return sum + Number(detail.unitPrice || 0) * Number(detail.quantity || 0);
		}, 0) || 0
	);
</script>

<svelte:head>
	<title>Order #{data.order.id} - Orders - Admin - Coffee Shop</title>
</svelte:head>

<div class="mx-auto max-w-4xl space-y-6">
	<div>
		<a href="/admin/orders" class="text-sm text-coffee-600 hover:text-coffee-800">
			&#8592; Back to Orders
		</a>
		<div class="mt-2 flex items-center justify-between">
			<div>
				<h2 class="text-2xl font-bold text-coffee-900">Order #{data.order.id}</h2>
				<p class="text-coffee-600">{formatDate(data.order.date || '')}</p>
			</div>
			<button
				type="button"
				onclick={() => (showDeleteConfirm = true)}
				class="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
			>
				Delete Order
			</button>
		</div>
	</div>

	{#if form?.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{form.error}
		</div>
	{/if}

	{#if form?.success}
		<div class="rounded-md bg-green-50 p-4 text-sm text-green-700">Order updated successfully!</div>
	{/if}

	<div class="grid gap-6 md:grid-cols-2">
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Order Information</h3>
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
				class="space-y-4"
			>
				<div>
					<label for="date" class="block text-sm font-medium text-coffee-700">
						Date <span class="text-red-500">*</span>
					</label>
					<input
						type="datetime-local"
						id="date"
						name="date"
						value={data.order.date ? new Date(data.order.date).toISOString().slice(0, 16) : ''}
						required
						class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
					/>
				</div>

				<div>
					<label for="customerId" class="block text-sm font-medium text-coffee-700">
						Customer <span class="text-red-500">*</span>
					</label>
					<select
						id="customerId"
						name="customerId"
						required
						class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
					>
						<option value="">Select a customer</option>
						{#each data.customers as customer}
							<option value={customer.id} selected={data.order.customerId === customer.id}>
								{customer.name}
							</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="storeId" class="block text-sm font-medium text-coffee-700">
						Store <span class="text-red-500">*</span>
					</label>
					<select
						id="storeId"
						name="storeId"
						required
						class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
					>
						<option value="">Select a store</option>
						{#each data.stores as store}
							<option value={store.id} selected={data.order.storeId === store.id}>
								{store.location}
							</option>
						{/each}
					</select>
				</div>

				<div class="flex justify-end">
					<button
						type="submit"
						disabled={isSubmitting}
						class="rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isSubmitting ? 'Saving...' : 'Update Order'}
					</button>
				</div>
			</form>
		</div>

		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-lg font-semibold text-coffee-900">Order Items</h3>
				<span class="text-lg font-bold text-coffee-900">{formatCurrency(orderTotal)}</span>
			</div>

			{#if data.order.orderDetails && data.order.orderDetails.length > 0}
				<div class="space-y-3">
					{#each data.order.orderDetails as detail}
						<div
							class="flex items-center justify-between rounded-md border border-coffee-100 bg-coffee-50 p-3"
						>
							<div>
								<p class="font-medium text-coffee-900">{detail.product?.name || 'Unknown'}</p>
								<p class="text-sm text-coffee-600">
									{formatCurrency(Number(detail.unitPrice || 0))} x {detail.quantity}
								</p>
							</div>
							<p class="font-semibold text-coffee-900">
								{formatCurrency(Number(detail.unitPrice || 0) * Number(detail.quantity || 0))}
							</p>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-coffee-500">No items in this order.</p>
			{/if}
		</div>
	</div>
</div>

{#if showDeleteConfirm}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<h3 class="text-lg font-semibold text-coffee-900">Delete Order</h3>
			<p class="mt-2 text-coffee-600">
				Are you sure you want to delete Order #{data.order.id}? This action cannot be undone.
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
