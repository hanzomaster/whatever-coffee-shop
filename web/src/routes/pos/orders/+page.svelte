<script lang="ts">
	import { formatCurrency, formatDate } from '$lib/utils';
	import type { Order } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let showAllOrders = $state(false);

	const displayOrders = $derived(showAllOrders ? data.allOrders : data.orders);

	const todayTotal = $derived(
		data.orders.reduce((sum: number, order: Order) => {
			const orderTotal = order.orderDetails?.reduce((s: number, d: { unitPrice?: string | null; quantity?: string | null }) => {
				return s + Number(d.unitPrice || 0) * Number(d.quantity || 0);
			}, 0) || 0;
			return sum + orderTotal;
		}, 0)
	);

	function getOrderTotal(order: Order): number {
		return order.orderDetails?.reduce((sum: number, detail: { unitPrice?: string | null; quantity?: string | null }) => {
			return sum + Number(detail.unitPrice || 0) * Number(detail.quantity || 0);
		}, 0) || 0;
	}
</script>

<svelte:head>
	<title>Orders - POS - Coffee Shop</title>
</svelte:head>

<div class="h-full overflow-auto p-6">
	<div class="mx-auto max-w-4xl space-y-6">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-2xl font-bold text-coffee-900">
					{showAllOrders ? 'All Orders' : "Today's Orders"}
				</h2>
				<p class="text-coffee-600">
					{showAllOrders ? 'Complete order history' : 'Orders placed today'}
				</p>
			</div>
			<button
				onclick={() => (showAllOrders = !showAllOrders)}
				class="rounded-md border border-coffee-300 px-4 py-2 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
			>
				{showAllOrders ? "Show Today's Only" : 'Show All Orders'}
			</button>
		</div>

		{#if data.error}
			<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
				{data.error}
			</div>
		{/if}

		{#if !showAllOrders}
			<div class="grid gap-4 md:grid-cols-3">
				<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
					<p class="text-xs font-medium uppercase text-coffee-500">Today's Orders</p>
					<p class="text-2xl font-bold text-coffee-900">{data.orders.length}</p>
				</div>
				<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
					<p class="text-xs font-medium uppercase text-coffee-500">Today's Revenue</p>
					<p class="text-2xl font-bold text-coffee-900">{formatCurrency(todayTotal)}</p>
				</div>
				<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
					<p class="text-xs font-medium uppercase text-coffee-500">Avg Order Value</p>
					<p class="text-2xl font-bold text-coffee-900">
						{formatCurrency(data.orders.length > 0 ? todayTotal / data.orders.length : 0)}
					</p>
				</div>
			</div>
		{/if}

		<div class="rounded-lg border border-coffee-200 bg-white shadow-sm">
			{#if displayOrders.length === 0}
				<p class="p-8 text-center text-coffee-500">
					{showAllOrders ? 'No orders found.' : 'No orders today.'}
				</p>
			{:else}
				<div class="divide-y divide-coffee-100">
					{#each displayOrders as order}
						<div class="p-4">
							<div class="flex items-start justify-between">
								<div>
									<div class="flex items-center gap-2">
										<span class="font-semibold text-coffee-900">Order #{order.id}</span>
										<span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
											Completed
										</span>
									</div>
									<p class="mt-1 text-sm text-coffee-600">
										{order.customer?.name || 'Unknown Customer'}
									</p>
									<p class="text-xs text-coffee-500">
										{formatDate(order.date || '')} - {order.store?.location || 'Unknown Store'}
									</p>
								</div>
								<p class="text-lg font-bold text-coffee-900">
									{formatCurrency(getOrderTotal(order))}
								</p>
							</div>

							{#if order.orderDetails && order.orderDetails.length > 0}
								<div class="mt-3 flex flex-wrap gap-2">
									{#each order.orderDetails as detail}
										<span class="rounded-md bg-coffee-100 px-2 py-1 text-xs text-coffee-700">
											{detail.product?.name || 'Unknown'} x {detail.quantity}
										</span>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
