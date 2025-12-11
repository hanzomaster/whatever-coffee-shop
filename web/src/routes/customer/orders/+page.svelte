<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(dateString: string | Date) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getStatusColor(status: string) {
		switch (status) {
			case 'completed':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'cancelled':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	function calculateTotal(
		orderDetails: Array<{ unitPrice?: string | null; quantity?: string | null }> | undefined
	) {
		if (!orderDetails) return 0;
		return orderDetails.reduce(
			(sum, d) => sum + Number(d.unitPrice || 0) * Number(d.quantity || 0),
			0
		);
	}
</script>

<svelte:head>
	<title>My Orders - Coffee Shop</title>
</svelte:head>

<div class="py-12">
	<div class="mx-auto max-w-4xl px-4">
		<h1 class="mb-8 text-3xl font-bold text-coffee-900">My Orders</h1>

		{#if data.error}
			<div class="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
				{data.error}
			</div>
		{/if}

		{#if data.orders.length === 0}
			<div class="rounded-lg border border-coffee-200 bg-white p-8 text-center shadow-sm">
				<div class="mb-4 text-6xl">&#128230;</div>
				<h2 class="mb-2 text-xl font-semibold text-coffee-900">No orders yet</h2>
				<p class="mb-6 text-coffee-600">Start shopping to see your orders here!</p>
				<a
					href="/customer/menu"
					class="inline-block rounded-md bg-coffee-600 px-6 py-3 font-medium text-white transition-colors hover:bg-coffee-700"
				>
					Browse Menu
				</a>
			</div>
		{:else}
			<div class="space-y-4">
				{#each data.orders as order}
					<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
						<div class="flex flex-wrap items-start justify-between gap-4">
							<div>
								<div class="flex items-center gap-3">
									<span class="text-lg font-semibold text-coffee-900">Order #{order.id}</span>
									<span
										class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize {getStatusColor(
											order.status
										)}"
									>
										{order.status}
									</span>
								</div>
								<p class="mt-1 text-sm text-coffee-600">{formatDate(order.createdAt)}</p>
								{#if order.store}
									<p class="mt-1 text-sm text-coffee-600">
										Pickup: {order.store.name}
									</p>
								{/if}
							</div>
							<div class="text-right">
								<p class="text-lg font-semibold text-coffee-900">
									{formatCurrency(calculateTotal(order.orderDetails))}
								</p>
								<p class="text-sm text-coffee-600">
									{order.orderDetails?.length || 0} item(s)
								</p>
							</div>
						</div>

						{#if order.orderDetails && order.orderDetails.length > 0}
							<div class="mt-4 border-t border-coffee-100 pt-4">
								<div class="space-y-2">
									{#each order.orderDetails.slice(0, 3) as detail}
										<div class="flex items-center gap-3 text-sm">
											<span class="text-coffee-600">
												{detail.product?.name || 'Product'} x {detail.quantity}
											</span>
											<span class="font-medium text-coffee-900">
												{formatCurrency(
													Number(detail.unitPrice || 0) * Number(detail.quantity || 0)
												)}
											</span>
										</div>
									{/each}
									{#if order.orderDetails.length > 3}
										<p class="text-sm text-coffee-500">
											+{order.orderDetails.length - 3} more item(s)
										</p>
									{/if}
								</div>
							</div>
						{/if}

						<div class="mt-4 flex justify-end">
							<a
								href="/customer/orders/{order.id}"
								class="text-sm font-medium text-coffee-600 transition-colors hover:text-coffee-800"
							>
								View Details &#8594;
							</a>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
