<script lang="ts">
	import type { Customer } from '$lib/api/types';

	interface Props {
		customer?: Partial<Customer>;
		submitLabel?: string;
		isSubmitting?: boolean;
	}

	let { customer = {}, submitLabel = 'Save Customer', isSubmitting = false }: Props = $props();
</script>

<div class="space-y-6">
	<div class="grid gap-6 md:grid-cols-2">
		<div>
			<label for="name" class="block text-sm font-medium text-coffee-700">
				Customer Name <span class="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="name"
				name="name"
				value={customer.name ?? ''}
				required
				maxlength={100}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="Enter customer name"
			/>
		</div>

		<div>
			<label for="phone" class="block text-sm font-medium text-coffee-700">Phone Number</label>
			<input
				type="tel"
				id="phone"
				name="phone"
				value={customer.phone ?? ''}
				maxlength={15}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="0912345678"
			/>
			<p class="mt-1 text-xs text-coffee-500">Vietnamese format: 0XXXXXXXXX</p>
		</div>

		<div class="md:col-span-2">
			<label for="balance" class="block text-sm font-medium text-coffee-700">
				Balance (VND) <span class="text-red-500">*</span>
			</label>
			<input
				type="number"
				id="balance"
				name="balance"
				value={customer.balance ?? 0}
				required
				step={1000}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="0"
			/>
			<p class="mt-1 text-xs text-coffee-500">Customer's prepaid balance or credit</p>
		</div>
	</div>

	<div class="flex justify-end gap-3">
		<a
			href="/admin/customers"
			class="rounded-md border border-coffee-300 px-4 py-2 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
		>
			Cancel
		</a>
		<button
			type="submit"
			disabled={isSubmitting}
			class="rounded-md bg-coffee-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coffee-700 disabled:cursor-not-allowed disabled:opacity-50"
		>
			{isSubmitting ? 'Saving...' : submitLabel}
		</button>
	</div>
</div>
