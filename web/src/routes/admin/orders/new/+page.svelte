<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>New Order - Admin - Coffee Shop</title>
</svelte:head>

<div class="mx-auto max-w-2xl space-y-6">
	<div>
		<a href="/admin/orders" class="text-sm text-coffee-600 hover:text-coffee-800">
			&#8592; Back to Orders
		</a>
		<h2 class="mt-2 text-2xl font-bold text-coffee-900">Create New Order</h2>
		<p class="text-coffee-600">Create a new customer order</p>
	</div>

	{#if form?.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{form.error}
		</div>
	{/if}

	<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
		<form
			method="POST"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					isSubmitting = false;
				};
			}}
			class="space-y-6"
		>
			<div>
				<label for="date" class="block text-sm font-medium text-coffee-700">
					Date <span class="text-red-500">*</span>
				</label>
				<input
					type="datetime-local"
					id="date"
					name="date"
					value={new Date().toISOString().slice(0, 16)}
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
						<option value={customer.id}>{customer.name}</option>
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
						<option value={store.id}>{store.location}</option>
					{/each}
				</select>
			</div>

			<div class="flex justify-end gap-3">
				<a
					href="/admin/orders"
					class="rounded-md border border-coffee-300 px-4 py-2 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
				>
					Cancel
				</a>
				<button
					type="submit"
					disabled={isSubmitting}
					class="rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? 'Creating...' : 'Create Order'}
				</button>
			</div>
		</form>
	</div>
</div>
