<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(dateString: string | Date) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>Order Confirmed - Coffee Shop</title>
</svelte:head>

<div class="py-12">
	<div class="mx-auto max-w-2xl px-4">
		{#if data.order}
			<div class="rounded-lg border border-coffee-200 bg-white p-8 text-center shadow-sm">
				<div class="mb-4 text-6xl text-green-500">&#10003;</div>
				<h1 class="mb-2 text-3xl font-bold text-coffee-900">Order Confirmed!</h1>
				<p class="mb-6 text-coffee-600">Thank you for your order. Your order number is:</p>

				<div class="mb-8 rounded-lg bg-coffee-100 px-6 py-4">
					<span class="text-2xl font-bold text-coffee-900">#{data.order.id}</span>
				</div>

				<div class="mb-8 text-left">
					<h2 class="mb-4 text-lg font-semibold text-coffee-900">Order Details</h2>

					<div class="space-y-2 text-sm">
						<div class="flex justify-between">
							<span class="text-coffee-600">Order Date:</span>
							<span class="font-medium text-coffee-900">{formatDate(data.order.createdAt)}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-coffee-600">Status:</span>
							<span
								class="inline-flex rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium capitalize text-yellow-800"
							>
								{data.order.status}
							</span>
						</div>
						{#if data.order.store}
							<div class="flex justify-between">
								<span class="text-coffee-600">Pickup Location:</span>
								<span class="font-medium text-coffee-900">{data.order.store.name}</span>
							</div>
						{/if}
					</div>

					{#if data.order.orderDetails && data.order.orderDetails.length > 0}
						<div class="mt-6 border-t border-coffee-100 pt-4">
							<h3 class="mb-3 font-medium text-coffee-900">Items</h3>
							<div class="space-y-2">
								{#each data.order.orderDetails as detail}
									<div class="flex justify-between text-sm">
										<span class="text-coffee-600">
											{detail.product?.name || 'Product'} x {detail.quantity}
										</span>
										<span class="font-medium text-coffee-900">
											{formatCurrency(Number(detail.unitPrice || 0) * Number(detail.quantity || 0))}
										</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<div class="mt-4 border-t border-coffee-100 pt-4">
						<div class="flex justify-between text-lg font-semibold">
							<span class="text-coffee-900">Total</span>
							<span class="text-coffee-900">
								{formatCurrency(
									data.order.orderDetails?.reduce(
										(sum: number, d: { unitPrice?: string | null; quantity?: string | null }) =>
											sum + Number(d.unitPrice || 0) * Number(d.quantity || 0),
										0
									) || 0
								)}
							</span>
						</div>
					</div>
				</div>

				<div class="flex gap-4">
					<a
						href="/customer/orders"
						class="flex-1 rounded-md border border-coffee-300 py-3 font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
					>
						View Orders
					</a>
					<a
						href="/customer/menu"
						class="flex-1 rounded-md bg-coffee-600 py-3 font-medium text-white transition-colors hover:bg-coffee-700"
					>
						Continue Shopping
					</a>
				</div>
			</div>
		{:else}
			<div class="rounded-lg border border-coffee-200 bg-white p-8 text-center shadow-sm">
				<div class="mb-4 text-6xl">&#128533;</div>
				<h1 class="mb-2 text-2xl font-bold text-coffee-900">Order Not Found</h1>
				<p class="mb-6 text-coffee-600">We couldn't find the order you're looking for.</p>
				<a
					href="/customer/menu"
					class="inline-block rounded-md bg-coffee-600 px-6 py-3 font-medium text-white transition-colors hover:bg-coffee-700"
				>
					Browse Menu
				</a>
			</div>
		{/if}
	</div>
</div>
