<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { LineChart, BarChart, DoughnutChart } from '$lib/components/charts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const salesChartData = $derived({
		labels: data.salesByDay.labels,
		datasets: [
			{
				label: 'Sales',
				data: data.salesByDay.data,
				borderColor: '#78350f',
				backgroundColor: 'rgba(120, 53, 15, 0.1)',
				tension: 0.3,
				fill: true
			}
		]
	});

	const categoryChartData = $derived({
		labels: data.salesByCategory.labels,
		datasets: [
			{
				data: data.salesByCategory.data,
				backgroundColor: ['#78350f', '#92400e', '#b45309', '#d97706', '#f59e0b']
			}
		]
	});

	const storeChartData = $derived({
		labels: data.revenueByStore.labels,
		datasets: [
			{
				label: 'Revenue',
				data: data.revenueByStore.data,
				backgroundColor: '#78350f'
			}
		]
	});
</script>

<svelte:head>
	<title>Dashboard - Admin - Coffee Shop</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h2 class="text-2xl font-bold text-coffee-900">Dashboard</h2>
		<p class="text-coffee-600">Overview of your coffee shop performance.</p>
	</div>

	<!-- KPI Cards -->
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<p class="text-sm font-medium text-coffee-600">Total Revenue</p>
				<span class="text-2xl">&#128176;</span>
			</div>
			<p class="mt-2 text-3xl font-bold text-coffee-900">
				{formatCurrency(data.kpis.totalRevenue)}
			</p>
			<p class="mt-1 text-xs text-coffee-500">All time</p>
		</div>

		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<p class="text-sm font-medium text-coffee-600">Orders Today</p>
				<span class="text-2xl">&#128203;</span>
			</div>
			<p class="mt-2 text-3xl font-bold text-coffee-900">{data.kpis.ordersToday}</p>
			<p class="mt-1 text-xs text-coffee-500">Orders received</p>
		</div>

		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<p class="text-sm font-medium text-coffee-600">Products</p>
				<span class="text-2xl">&#128230;</span>
			</div>
			<p class="mt-2 text-3xl font-bold text-coffee-900">{data.kpis.totalProducts}</p>
			<p class="mt-1 text-xs text-coffee-500">
				{#if data.kpis.lowStockCount > 0}
					<span class="text-amber-600">{data.kpis.lowStockCount} low stock</span>
				{:else}
					All in stock
				{/if}
			</p>
		</div>

		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<p class="text-sm font-medium text-coffee-600">Customers</p>
				<span class="text-2xl">&#128101;</span>
			</div>
			<p class="mt-2 text-3xl font-bold text-coffee-900">{data.kpis.totalCustomers}</p>
			<p class="mt-1 text-xs text-coffee-500">Registered</p>
		</div>
	</div>

	<!-- Charts Row -->
	<div class="grid gap-6 lg:grid-cols-2">
		<!-- Sales Chart -->
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Sales Last 7 Days</h3>
			<LineChart data={salesChartData} />
		</div>

		<!-- Category Distribution -->
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Sales by Category</h3>
			{#if data.salesByCategory.labels.length > 0}
				<DoughnutChart data={categoryChartData} />
			{:else}
				<p class="py-8 text-center text-coffee-500">No sales data available</p>
			{/if}
		</div>
	</div>

	<!-- Revenue by Store & Top Products -->
	<div class="grid gap-6 lg:grid-cols-2">
		<!-- Revenue by Store -->
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Revenue by Store</h3>
			{#if data.revenueByStore.labels.length > 0}
				<BarChart data={storeChartData} horizontal />
			{:else}
				<p class="py-8 text-center text-coffee-500">No store data available</p>
			{/if}
		</div>

		<!-- Top Selling Products -->
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Top Selling Products</h3>
			{#if data.topProducts.length > 0}
				<div class="space-y-3">
					{#each data.topProducts as product, i}
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3">
								<span
									class="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-100 text-sm font-semibold text-coffee-700"
								>
									{i + 1}
								</span>
								<span class="font-medium text-coffee-900">{product.name}</span>
							</div>
							<span class="text-sm text-coffee-600">{product.quantity} sold</span>
						</div>
					{/each}
				</div>
			{:else}
				<p class="py-8 text-center text-coffee-500">No sales data available</p>
			{/if}
		</div>
	</div>

	<!-- Quick Actions & Recent Orders -->
	<div class="grid gap-6 lg:grid-cols-2">
		<!-- Quick Actions -->
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Quick Actions</h3>
			<div class="grid grid-cols-2 gap-3">
				<a
					href="/admin/products/new"
					class="flex items-center gap-2 rounded-md border border-coffee-200 p-3 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
				>
					<span class="text-lg">&#10133;</span>
					New Product
				</a>
				<a
					href="/admin/orders"
					class="flex items-center gap-2 rounded-md border border-coffee-200 p-3 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
				>
					<span class="text-lg">&#128203;</span>
					View Orders
				</a>
				<a
					href="/admin/customers/new"
					class="flex items-center gap-2 rounded-md border border-coffee-200 p-3 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
				>
					<span class="text-lg">&#128100;</span>
					Add Customer
				</a>
				<a
					href="/admin/reports"
					class="flex items-center gap-2 rounded-md border border-coffee-200 p-3 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
				>
					<span class="text-lg">&#128200;</span>
					View Reports
				</a>
			</div>
		</div>

		<!-- Recent Orders -->
		<div class="rounded-lg border border-coffee-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-coffee-900">Recent Orders</h3>
			{#if data.recentOrders.length > 0}
				<div class="space-y-3">
					{#each data.recentOrders.slice(0, 5) as order}
						<a
							href="/admin/orders/{order.id}"
							class="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-coffee-50"
						>
							<div>
								<span class="font-medium text-coffee-900">#{order.id}</span>
								<span class="ml-2 text-sm text-coffee-600">
									{order.customer?.name || 'Walk-in'}
								</span>
							</div>
							<span
								class="rounded-full px-2 py-0.5 text-xs font-medium capitalize
								{order.status === 'completed'
									? 'bg-green-100 text-green-800'
									: order.status === 'pending'
										? 'bg-yellow-100 text-yellow-800'
										: 'bg-gray-100 text-gray-800'}"
							>
								{order.status}
							</span>
						</a>
					{/each}
				</div>
				<a
					href="/admin/orders"
					class="mt-4 block text-center text-sm text-coffee-600 hover:text-coffee-800"
				>
					View all orders
				</a>
			{:else}
				<p class="py-4 text-center text-coffee-500">No orders yet.</p>
			{/if}
		</div>
	</div>
</div>
