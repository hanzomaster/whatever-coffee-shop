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

	const orderTotal = $derived(
		data.order.orderDetails?.reduce(
			(sum: number, d: { unitPrice?: string | null; quantity?: string | null }) =>
				sum + Number(d.unitPrice || 0) * Number(d.quantity || 0),
			0
		) || 0
	);
</script>

<svelte:head>
	<title>Order #{data.order.id} - Coffee Shop</title>
</svelte:head>

<div class="py-12">
	<div class="mx-auto max-w-3xl px-4">
		<div class="mb-6">
			<a
				href="/customer/orders"
				class="inline-flex items-center gap-2 text-coffee-600 transition-colors hover:text-coffee-800"
			>
				&#8592; Back to Orders
			</a>
		</div>

		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<div class="mb-6 flex flex-wrap items-start justify-between gap-4">
				<div>
					<h1 class="text-2xl font-bold text-coffee-900">Order #{data.order.id}</h1>
					<p class="mt-1 text-coffee-600">{formatDate(data.order.createdAt)}</p>
				</div>
				<span
					class="inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize {getStatusColor(
						data.order.status
					)}"
				>
					{data.order.status}
				</span>
			</div>

			{#if data.order.store}
				<div class="mb-6 rounded-md bg-coffee-50 p-4">
					<h2 class="mb-2 font-semibold text-coffee-900">Pickup Location</h2>
					<p class="text-coffee-700">{data.order.store.name}</p>
					{#if data.order.store.address}
						<p class="text-sm text-coffee-600">{data.order.store.address}</p>
					{/if}
					{#if data.order.store.phone}
						<p class="mt-1 text-sm text-coffee-600">Phone: {data.order.store.phone}</p>
					{/if}
				</div>
			{/if}

			<div class="mb-6">
				<h2 class="mb-4 font-semibold text-coffee-900">Order Items</h2>
				<div class="divide-y divide-coffee-100">
					{#each data.order.orderDetails || [] as detail}
						<div class="flex items-center gap-4 py-4">
							{#if detail.product?.imgPath}
								<img
									src={detail.product.imgPath}
									alt={detail.product.name}
									class="h-16 w-16 rounded-md object-cover"
								/>
							{:else}
								<div
									class="flex h-16 w-16 items-center justify-center rounded-md bg-coffee-100 text-2xl"
								>
									&#9749;
								</div>
							{/if}
							<div class="flex-1">
								<p class="font-medium text-coffee-900">
									{detail.product?.name || 'Product'}
								</p>
								<p class="text-sm text-coffee-600">
									{formatCurrency(Number(detail.unitPrice || 0))} x {detail.quantity}
								</p>
							</div>
							<p class="font-semibold text-coffee-900">
								{formatCurrency(Number(detail.unitPrice || 0) * Number(detail.quantity || 0))}
							</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="border-t border-coffee-200 pt-4">
				<div class="flex justify-between text-lg font-semibold">
					<span class="text-coffee-900">Total</span>
					<span class="text-coffee-900">{formatCurrency(orderTotal)}</span>
				</div>
			</div>

			{#if data.order.customer}
				<div class="mt-6 border-t border-coffee-200 pt-4">
					<h2 class="mb-2 font-semibold text-coffee-900">Customer Details</h2>
					<p class="text-coffee-700">{data.order.customer.name}</p>
					{#if data.order.customer.phone}
						<p class="text-sm text-coffee-600">Phone: {data.order.customer.phone}</p>
					{/if}
				</div>
			{/if}
		</div>

		<div class="mt-6 text-center">
			<a
				href="/customer/menu"
				class="inline-block rounded-md bg-coffee-600 px-6 py-3 font-medium text-white transition-colors hover:bg-coffee-700"
			>
				Order Again
			</a>
		</div>
	</div>
</div>
