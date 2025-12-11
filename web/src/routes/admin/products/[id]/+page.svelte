<script lang="ts">
	import { enhance } from '$app/forms';
	import ProductForm from '$lib/components/forms/ProductForm.svelte';
	import { formatCurrency } from '$lib/utils';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let isSubmitting = $state(false);
	let isDeleting = $state(false);
	let showDeleteConfirm = $state(false);
</script>

<svelte:head>
	<title>{data.product.name} - Products - Admin - Coffee Shop</title>
</svelte:head>

<div class="mx-auto max-w-2xl space-y-6">
	<div>
		<a href="/admin/products" class="text-sm text-coffee-600 hover:text-coffee-800">
			&#8592; Back to Products
		</a>
		<div class="mt-2 flex items-center justify-between">
			<div>
				<h2 class="text-2xl font-bold text-coffee-900">{data.product.name}</h2>
				<p class="text-coffee-600">Product ID: {data.product.id}</p>
			</div>
			<button
				type="button"
				onclick={() => (showDeleteConfirm = true)}
				class="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
			>
				Delete Product
			</button>
		</div>
	</div>

	{#if form?.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{form.error}
		</div>
	{/if}

	{#if form?.success}
		<div class="rounded-md bg-green-50 p-4 text-sm text-green-700">
			Product updated successfully!
		</div>
	{/if}

	<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
		<h3 class="mb-4 text-lg font-semibold text-coffee-900">Product Details</h3>
		<div class="mb-6 grid gap-4 rounded-md bg-coffee-50 p-4 md:grid-cols-3">
			<div>
				<p class="text-xs font-medium uppercase text-coffee-500">Price</p>
				<p class="text-lg font-semibold text-coffee-900">
					{formatCurrency(Number(data.product.price || 0))}
				</p>
			</div>
			<div>
				<p class="text-xs font-medium uppercase text-coffee-500">Cost</p>
				<p class="text-lg font-semibold text-coffee-900">
					{formatCurrency(Number(data.product.cost || 0))}
				</p>
			</div>
			<div>
				<p class="text-xs font-medium uppercase text-coffee-500">Stock</p>
				<p class="text-lg font-semibold text-coffee-900">{data.product.inventory || 0}</p>
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
			<ProductForm
				product={data.product}
				suppliers={data.suppliers}
				submitLabel="Update Product"
				{isSubmitting}
			/>
		</form>
	</div>
</div>

{#if showDeleteConfirm}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<h3 class="text-lg font-semibold text-coffee-900">Delete Product</h3>
			<p class="mt-2 text-coffee-600">
				Are you sure you want to delete "{data.product.name}"? This action cannot be undone.
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
