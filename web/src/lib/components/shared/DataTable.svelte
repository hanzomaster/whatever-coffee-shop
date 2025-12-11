<script lang="ts" generics="T">
	import { cn } from '$lib/utils';

	interface Column<T> {
		key: keyof T | string;
		header: string;
		render?: (item: T) => string;
		class?: string;
	}

	interface Props<T> {
		data: T[];
		columns: Column<T>[];
		onRowClick?: (item: T) => void;
		loading?: boolean;
		emptyMessage?: string;
	}

	let { data, columns, onRowClick, loading = false, emptyMessage = 'No data available' }: Props<T> = $props();

	function getCellValue(item: T, column: Column<T>): string {
		if (column.render) {
			return column.render(item);
		}
		const value = (item as Record<string, unknown>)[column.key as string];
		return value?.toString() ?? '-';
	}
</script>

<div class="overflow-hidden rounded-lg border border-coffee-200 bg-white">
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr class="border-b border-coffee-200 bg-coffee-50">
					{#each columns as column}
						<th
							class={cn(
								'px-4 py-3 text-left text-sm font-semibold text-coffee-900',
								column.class
							)}
						>
							{column.header}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#if loading}
					<tr>
						<td colspan={columns.length} class="px-4 py-12 text-center">
							<div class="flex items-center justify-center gap-2">
								<div class="h-5 w-5 animate-spin rounded-full border-2 border-coffee-300 border-t-coffee-600"></div>
								<span class="text-coffee-600">Loading...</span>
							</div>
						</td>
					</tr>
				{:else if data.length === 0}
					<tr>
						<td colspan={columns.length} class="px-4 py-12 text-center text-coffee-500">
							{emptyMessage}
						</td>
					</tr>
				{:else}
					{#each data as item, index}
						<tr
							class={cn(
								'border-b border-coffee-100 transition-colors',
								onRowClick && 'cursor-pointer hover:bg-coffee-50',
								index === data.length - 1 && 'border-b-0'
							)}
							onclick={() => onRowClick?.(item)}
						>
							{#each columns as column}
								<td class={cn('px-4 py-3 text-sm text-coffee-700', column.class)}>
									{getCellValue(item, column)}
								</td>
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
