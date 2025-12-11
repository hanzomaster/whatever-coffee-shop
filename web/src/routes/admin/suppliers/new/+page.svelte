<script lang="ts">
	import { enhance } from '$app/forms';
	import SupplierForm from '$lib/components/forms/SupplierForm.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>New Supplier - Admin - Coffee Shop</title>
</svelte:head>

<div class="mx-auto max-w-2xl space-y-6">
	<div>
		<a href="/admin/suppliers" class="text-sm text-coffee-600 hover:text-coffee-800">
			&#8592; Back to Suppliers
		</a>
		<h2 class="mt-2 text-2xl font-bold text-coffee-900">Add New Supplier</h2>
		<p class="text-coffee-600">Create a new supplier record</p>
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
		>
			<SupplierForm submitLabel="Create Supplier" {isSubmitting} />
		</form>
	</div>
</div>
