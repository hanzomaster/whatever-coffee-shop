<script lang="ts">
	import type { Supplier } from '$lib/api/types';

	interface Props {
		supplier?: Partial<Supplier>;
		submitLabel?: string;
		isSubmitting?: boolean;
	}

	let { supplier = {}, submitLabel = 'Save Supplier', isSubmitting = false }: Props = $props();
</script>

<div class="space-y-6">
	<div>
		<label for="name" class="block text-sm font-medium text-coffee-700">
			Supplier Name <span class="text-red-500">*</span>
		</label>
		<input
			type="text"
			id="name"
			name="name"
			value={supplier.name ?? ''}
			required
			maxlength={100}
			class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
			placeholder="Enter supplier name"
		/>
	</div>

	<div class="flex justify-end gap-3">
		<a
			href="/admin/suppliers"
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
