<script lang="ts">
	import type { Store } from '$lib/api/types';

	interface Props {
		store?: Partial<Store>;
		submitLabel?: string;
		isSubmitting?: boolean;
	}

	let { store = {}, submitLabel = 'Save Store', isSubmitting = false }: Props = $props();
</script>

<div class="space-y-6">
	<div class="grid gap-6 md:grid-cols-2">
		<div class="md:col-span-2">
			<label for="location" class="block text-sm font-medium text-coffee-700">
				Location <span class="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="location"
				name="location"
				value={store.location ?? ''}
				required
				maxlength={255}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="Enter store location/address"
			/>
		</div>

		<div>
			<label for="revenue" class="block text-sm font-medium text-coffee-700">
				Revenue (VND) <span class="text-red-500">*</span>
			</label>
			<input
				type="number"
				id="revenue"
				name="revenue"
				value={store.revenue ?? 0}
				required
				min={0}
				step={1000}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="0"
			/>
		</div>

		<div>
			<label for="fixedCost" class="block text-sm font-medium text-coffee-700">
				Fixed Cost (VND) <span class="text-red-500">*</span>
			</label>
			<input
				type="number"
				id="fixedCost"
				name="fixedCost"
				value={store.fixedCost ?? 0}
				required
				min={0}
				step={1000}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="0"
			/>
			<p class="mt-1 text-xs text-coffee-500">Monthly fixed operating costs (rent, utilities, etc.)</p>
		</div>

		<div class="md:col-span-2">
			<label for="imgPath" class="block text-sm font-medium text-coffee-700">Image URL</label>
			<input
				type="text"
				id="imgPath"
				name="imgPath"
				value={store.imgPath ?? ''}
				maxlength={255}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="https://example.com/store-image.jpg"
			/>
		</div>
	</div>

	<div class="flex justify-end gap-3">
		<a
			href="/admin/stores"
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
