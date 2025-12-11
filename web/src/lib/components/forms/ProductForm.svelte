<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Product, Supplier } from '$lib/api/types';

	interface Props {
		product?: Partial<Product>;
		suppliers: Supplier[];
		submitLabel?: string;
		isSubmitting?: boolean;
	}

	let {
		product = {},
		suppliers = [],
		submitLabel = 'Save Product',
		isSubmitting = false
	}: Props = $props();
</script>

<div class="space-y-6">
	<div class="grid gap-6 md:grid-cols-2">
		<div>
			<label for="name" class="block text-sm font-medium text-coffee-700">
				Product Name <span class="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="name"
				name="name"
				value={product.name ?? ''}
				required
				maxlength={25}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="Enter product name"
			/>
		</div>

		<div>
			<label for="category" class="block text-sm font-medium text-coffee-700">
				Category
			</label>
			<input
				type="text"
				id="category"
				name="category"
				value={product.category ?? ''}
				maxlength={15}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="e.g., Coffee, Tea, Food"
			/>
		</div>

		<div>
			<label for="price" class="block text-sm font-medium text-coffee-700">
				Price (VND) <span class="text-red-500">*</span>
			</label>
			<input
				type="number"
				id="price"
				name="price"
				value={product.price ?? ''}
				required
				min={0}
				step={1000}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="0"
			/>
		</div>

		<div>
			<label for="cost" class="block text-sm font-medium text-coffee-700">
				Cost (VND) <span class="text-red-500">*</span>
			</label>
			<input
				type="number"
				id="cost"
				name="cost"
				value={product.cost ?? ''}
				required
				min={0}
				step={1000}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="0"
			/>
		</div>

		<div>
			<label for="inventory" class="block text-sm font-medium text-coffee-700">
				Inventory <span class="text-red-500">*</span>
			</label>
			<input
				type="number"
				id="inventory"
				name="inventory"
				value={product.inventory ?? ''}
				required
				min={0}
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
				placeholder="0"
			/>
		</div>

		<div>
			<label for="supplierId" class="block text-sm font-medium text-coffee-700">
				Supplier <span class="text-red-500">*</span>
			</label>
			<select
				id="supplierId"
				name="supplierId"
				required
				class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
			>
				<option value="">Select a supplier</option>
				{#each suppliers as supplier}
					<option value={supplier.id} selected={product.supplierId === supplier.id}>
						{supplier.name}
					</option>
				{/each}
			</select>
		</div>
	</div>

	<div>
		<label for="description" class="block text-sm font-medium text-coffee-700">
			Description
		</label>
		<textarea
			id="description"
			name="description"
			rows={3}
			maxlength={255}
			class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
			placeholder="Enter product description"
		>{product.description ?? ''}</textarea>
	</div>

	<div>
		<label for="img_path" class="block text-sm font-medium text-coffee-700">
			Image URL
		</label>
		<input
			type="text"
			id="img_path"
			name="img_path"
			value={product.imgPath ?? ''}
			maxlength={255}
			class="mt-1 block w-full rounded-md border border-coffee-300 px-3 py-2 shadow-sm transition-colors focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-coffee-500/20"
			placeholder="https://example.com/image.jpg"
		/>
	</div>

	<div class="flex justify-end gap-3">
		<a
			href="/admin/products"
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
