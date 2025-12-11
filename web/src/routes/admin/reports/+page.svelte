<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { LineChart, BarChart, DoughnutChart } from '$lib/components/charts';
	import type { Order, Product, Store } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const totalRevenue = $derived(
		data.stores.reduce((sum: number, store: Store) => sum + Number(store.revenue || 0), 0)
	);

	const totalOrders = $derived(data.orders.length);

	const totalCustomers = $derived(data.customers.length);

	const inventoryValue = $derived(
		data.products.reduce(
			(sum: number, p: Product) => sum + Number(p.inventory || 0) * Number(p.cost || 0),
			0
		)
	);

	const avgOrderValue = $derived(() => {
		if (data.orders.length === 0) return 0;
		const totalOrderValue = data.orders.reduce((sum: number, order: Order) => {
			const orderTotal =
				order.orderDetails?.reduce((s: number, d: { unitPrice?: string | null; quantity?: string | null }) => {
					return s + Number(d.unitPrice || 0) * Number(d.quantity || 0);
				}, 0) || 0;
			return sum + orderTotal;
		}, 0);
		return totalOrderValue / data.orders.length;
	});

	const topProducts = $derived(() => {
		const productSales: Record<number, { name: string; quantity: number; revenue: number }> = {};

		data.orders.forEach((order: Order) => {
			order.orderDetails?.forEach((detail: { productId: number; product?: { name: string }; unitPrice?: string | null; quantity?: string | null }) => {
				if (!productSales[detail.productId]) {
					productSales[detail.productId] = {
						name: detail.product?.name || 'Unknown',
						quantity: 0,
						revenue: 0
					};
				}
				productSales[detail.productId].quantity += Number(detail.quantity || 0);
				productSales[detail.productId].revenue +=
					Number(detail.unitPrice || 0) * Number(detail.quantity || 0);
			});
		});

		return Object.values(productSales)
			.sort((a, b) => b.revenue - a.revenue)
			.slice(0, 5);
	});

	const storePerformance = $derived(() => {
		return data.stores
			.map((store: Store) => ({
				id: store.id,
				location: store.location,
				revenue: Number(store.revenue || 0),
				cost: Number(store.fixedCost || 0),
				profit: Number(store.revenue || 0) - Number(store.fixedCost || 0),
				orders: store.orders?.length || 0
			}))
			.sort((a: { revenue: number }, b: { revenue: number }) => b.revenue - a.revenue);
	});

	// Chart data
	const topProductsChartData = $derived({
		labels: topProducts().map((p) => p.name),
		datasets: [
			{
				label: 'Revenue',
				data: topProducts().map((p) => p.revenue),
				backgroundColor: '#78350f'
			}
		]
	});

	const storeRevenueChartData = $derived({
		labels: storePerformance().map((s: { location: string }) => s.location),
		datasets: [
			{
				label: 'Revenue',
				data: storePerformance().map((s: { revenue: number }) => s.revenue),
				backgroundColor: ['#78350f', '#92400e', '#b45309', '#d97706', '#f59e0b']
			}
		]
	});

	const categoryDistribution = $derived(() => {
		const categories: Record<string, number> = {};
		data.products.forEach((p: Product) => {
			const cat = p.category || 'Other';
			categories[cat] = (categories[cat] || 0) + 1;
		});
		return {
			labels: Object.keys(categories),
			data: Object.values(categories)
		};
	});

	const categoryChartData = $derived({
		labels: categoryDistribution().labels,
		datasets: [
			{
				data: categoryDistribution().data,
				backgroundColor: ['#78350f', '#92400e', '#b45309', '#d97706', '#f59e0b', '#fbbf24']
			}
		]
	});
</script>

<svelte:head>
	<title>Reports - Admin - Coffee Shop</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h2 class="text-2xl font-bold text-coffee-900">Reports</h2>
		<p class="text-coffee-600">Business analytics and performance overview</p>
	</div>

	{#if data.error}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
			{data.error}
		</div>
	{/if}

	<!-- KPI Cards -->
	<div class="grid gap-4 md:grid-cols-4">
		<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-coffee-500">Total Revenue</p>
			<p class="text-2xl font-bold text-coffee-900">{formatCurrency(totalRevenue)}</p>
		</div>
		<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-coffee-500">Total Orders</p>
			<p class="text-2xl font-bold text-coffee-900">{totalOrders}</p>
		</div>
		<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-coffee-500">Avg Order Value</p>
			<p class="text-2xl font-bold text-coffee-900">{formatCurrency(avgOrderValue())}</p>
		</div>
		<div class="rounded-lg border border-coffee-200 bg-white p-4 shadow-sm">
			<p class="text-xs font-medium uppercase text-coffee-500">Inventory Value</p>
			<p class="text-2xl font-bold text-coffee-900">{formatCurrency(inventoryValue)}</p>
		</div>
	</div>

	<!-- Charts Row -->
	<div class="grid gap-6 lg:grid-cols-2">
		<!-- Top Products Chart -->
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Top Products by Revenue</h3>
			{#if topProducts().length > 0}
				<BarChart data={topProductsChartData} horizontal />
			{:else}
				<p class="py-8 text-center text-coffee-500">No sales data available</p>
			{/if}
		</div>

		<!-- Category Distribution Chart -->
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Products by Category</h3>
			{#if categoryDistribution().labels.length > 0}
				<DoughnutChart data={categoryChartData} />
			{:else}
				<p class="py-8 text-center text-coffee-500">No product data available</p>
			{/if}
		</div>
	</div>

	<!-- Store Revenue Chart -->
	<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
		<h3 class="mb-4 text-lg font-semibold text-coffee-900">Revenue by Store</h3>
		{#if storePerformance().length > 0}
			<BarChart data={storeRevenueChartData} />
		{:else}
			<p class="py-8 text-center text-coffee-500">No store data available</p>
		{/if}
	</div>

	<!-- Detailed Tables -->
	<div class="grid gap-6 md:grid-cols-2">
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Top Selling Products</h3>
			{#if topProducts().length > 0}
				<div class="space-y-3">
					{#each topProducts() as product, index}
						<div class="flex items-center justify-between rounded-md bg-coffee-50 p-3">
							<div class="flex items-center gap-3">
								<span
									class="flex h-6 w-6 items-center justify-center rounded-full bg-coffee-600 text-xs font-bold text-white"
								>
									{index + 1}
								</span>
								<div>
									<p class="font-medium text-coffee-900">{product.name}</p>
									<p class="text-sm text-coffee-600">{product.quantity} sold</p>
								</div>
							</div>
							<p class="font-semibold text-coffee-900">{formatCurrency(product.revenue)}</p>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-coffee-500">No sales data available.</p>
			{/if}
		</div>

		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Store Performance</h3>
			{#if storePerformance().length > 0}
				<div class="space-y-3">
					{#each storePerformance() as store}
						<div class="rounded-md bg-coffee-50 p-3">
							<div class="flex items-center justify-between">
								<p class="font-medium text-coffee-900">{store.location}</p>
								<p class="font-semibold {store.profit >= 0 ? 'text-green-600' : 'text-red-600'}">
									{formatCurrency(store.profit)}
								</p>
							</div>
							<div class="mt-1 flex gap-4 text-sm text-coffee-600">
								<span>Revenue: {formatCurrency(store.revenue)}</span>
								<span>Cost: {formatCurrency(store.cost)}</span>
								<span>{store.orders} orders</span>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-coffee-500">No store data available.</p>
			{/if}
		</div>
	</div>

	<!-- Summary Statistics -->
	<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
		<h3 class="mb-4 text-lg font-semibold text-coffee-900">Summary Statistics</h3>
		<div class="grid gap-4 md:grid-cols-3">
			<div class="rounded-md bg-coffee-50 p-4">
				<p class="text-sm font-medium text-coffee-500">Total Customers</p>
				<p class="text-xl font-bold text-coffee-900">{totalCustomers}</p>
			</div>
			<div class="rounded-md bg-coffee-50 p-4">
				<p class="text-sm font-medium text-coffee-500">Total Products</p>
				<p class="text-xl font-bold text-coffee-900">{data.products.length}</p>
			</div>
			<div class="rounded-md bg-coffee-50 p-4">
				<p class="text-sm font-medium text-coffee-500">Total Stores</p>
				<p class="text-xl font-bold text-coffee-900">{data.stores.length}</p>
			</div>
		</div>
	</div>
</div>
