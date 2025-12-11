<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatCurrency, formatPhone } from '$lib/utils';
	import type { Customer } from '$lib/api/types';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let searchQuery = $state('');
	let showAddModal = $state(false);
	let isCreating = $state(false);

	const filteredCustomers = $derived(
		searchQuery
			? data.customers.filter(
					(c: Customer) =>
						c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						(c.phone && c.phone.includes(searchQuery))
				)
			: data.customers
	);

	$effect(() => {
		if (form?.success) {
			showAddModal = false;
		}
	});
</script>

<svelte:head>
	<title>Customers - POS - Coffee Shop</title>
</svelte:head>

<div class="h-full overflow-auto p-6">
	<div class="mx-auto max-w-4xl space-y-6">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-2xl font-bold text-coffee-900">Customers</h2>
				<p class="text-coffee-600">Quick customer lookup and management</p>
			</div>
			<button
				onclick={() => (showAddModal = true)}
				class="flex items-center gap-2 rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700"
			>
				<span class="text-lg">+</span>
				Add Customer
			</button>
		</div>

		{#if data.error}
			<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
				{data.error}
			</div>
		{/if}

		<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search customers by name or phone..."
				class="w-full rounded-md border border-coffee-300 px-4 py-2 text-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
			/>
		</div>

		<div class="rounded-lg border border-coffee-200 bg-white shadow-sm">
			{#if filteredCustomers.length === 0}
				<p class="p-8 text-center text-coffee-500">
					{searchQuery ? 'No customers found matching your search.' : 'No customers yet.'}
				</p>
			{:else}
				<div class="divide-y divide-coffee-100">
					{#each filteredCustomers as customer}
						<div class="flex items-center justify-between p-4">
							<div>
								<p class="font-medium text-coffee-900">{customer.name}</p>
								<p class="text-sm text-coffee-500">
									{customer.phone ? formatPhone(customer.phone) : 'No phone'}
								</p>
							</div>
							<div class="text-right">
								<p class="font-semibold text-coffee-900">
									{formatCurrency(Number(customer.balance || 0))}
								</p>
								<p class="text-xs text-coffee-500">Balance</p>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Add Customer Modal -->
{#if showAddModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
			<div class="border-b border-coffee-200 p-4">
				<div class="flex items-center justify-between">
					<h3 class="text-lg font-semibold text-coffee-900">Add New Customer</h3>
					<button
						onclick={() => (showAddModal = false)}
						class="text-coffee-500 hover:text-coffee-700"
					>
						&#10005;
					</button>
				</div>
			</div>

			<form
				method="POST"
				action="?/create"
				use:enhance={() => {
					isCreating = true;
					return async ({ update }) => {
						await update();
						isCreating = false;
					};
				}}
				class="p-4"
			>
				{#if form?.error}
					<div class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
						{form.error}
					</div>
				{/if}

				<div class="space-y-4">
					<div>
						<label for="name" class="block text-sm font-medium text-coffee-700">
							Name <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							maxlength={100}
							class="mt-1 w-full rounded-md border border-coffee-300 px-3 py-2 text-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
							placeholder="Customer name"
						/>
					</div>

					<div>
						<label for="phone" class="block text-sm font-medium text-coffee-700">Phone</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							maxlength={15}
							class="mt-1 w-full rounded-md border border-coffee-300 px-3 py-2 text-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
							placeholder="0912345678"
						/>
					</div>

					<div>
						<label for="balance" class="block text-sm font-medium text-coffee-700">
							Initial Balance (VND)
						</label>
						<input
							type="number"
							id="balance"
							name="balance"
							value={0}
							min={0}
							step={1000}
							class="mt-1 w-full rounded-md border border-coffee-300 px-3 py-2 text-sm focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
						/>
					</div>
				</div>

				<div class="mt-6 flex justify-end gap-3">
					<button
						type="button"
						onclick={() => (showAddModal = false)}
						class="rounded-md border border-coffee-300 px-4 py-2 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isCreating}
						class="rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isCreating ? 'Creating...' : 'Add Customer'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
