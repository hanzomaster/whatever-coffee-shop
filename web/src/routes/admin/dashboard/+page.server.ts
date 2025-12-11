import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const [productsRes, ordersRes, customersRes, storesRes] = await Promise.all([
		fetch('/api/products'),
		fetch('/api/orders'),
		fetch('/api/customers'),
		fetch('/api/stores')
	]);

	const products = productsRes.ok ? await productsRes.json() : [];
	const orders = ordersRes.ok ? await ordersRes.json() : [];
	const customers = customersRes.ok ? await customersRes.json() : [];
	const stores = storesRes.ok ? await storesRes.json() : [];

	// Calculate KPIs
	const totalRevenue = orders.reduce(
		(sum: number, order: { orderDetails?: Array<{ unitPrice?: string | null; quantity?: string | null }> }) =>
			sum +
			(order.orderDetails?.reduce(
				(orderSum: number, detail: { unitPrice?: string | null; quantity?: string | null }) =>
					orderSum + Number(detail.unitPrice || 0) * Number(detail.quantity || 0),
				0
			) || 0),
		0
	);

	// Get today's orders
	const today = new Date().toISOString().split('T')[0];
	const todayOrders = orders.filter((order: { createdAt?: string; date?: string }) => {
		const orderDate = order.createdAt || order.date;
		return orderDate && orderDate.startsWith(today);
	});

	// Products with low inventory
	const lowStockProducts = products.filter(
		(p: { inventory?: string | null }) => Number(p.inventory || 0) < 10
	);

	// Recent orders (last 10)
	const recentOrders = orders.slice(0, 10);

	// Sales by day (last 7 days)
	const salesByDay = getLast7DaysSales(orders);

	// Sales by category
	const salesByCategory = getSalesByCategory(orders);

	// Top selling products
	const topProducts = getTopSellingProducts(orders);

	// Revenue by store
	const revenueByStore = getRevenueByStore(orders, stores);

	return {
		kpis: {
			totalRevenue,
			ordersToday: todayOrders.length,
			totalProducts: products.length,
			totalCustomers: customers.length,
			lowStockCount: lowStockProducts.length
		},
		recentOrders,
		salesByDay,
		salesByCategory,
		topProducts,
		revenueByStore
	};
};

function getLast7DaysSales(orders: Array<{ createdAt?: string; date?: string; orderDetails?: Array<{ unitPrice?: string | null; quantity?: string | null }> }>) {
	const labels: string[] = [];
	const data: number[] = [];

	for (let i = 6; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		const dateStr = date.toISOString().split('T')[0];
		const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });

		const dayOrders = orders.filter((order) => {
			const orderDate = order.createdAt || order.date;
			return orderDate && orderDate.startsWith(dateStr);
		});

		const dayRevenue = dayOrders.reduce(
			(sum, order) =>
				sum +
				(order.orderDetails?.reduce(
					(orderSum, detail) =>
						orderSum + Number(detail.unitPrice || 0) * Number(detail.quantity || 0),
					0
				) || 0),
			0
		);

		labels.push(dayLabel);
		data.push(dayRevenue);
	}

	return { labels, data };
}

function getSalesByCategory(orders: Array<{ orderDetails?: Array<{ product?: { category?: string }; unitPrice?: string | null; quantity?: string | null }> }>) {
	const categoryTotals: Record<string, number> = {};

	orders.forEach((order) => {
		order.orderDetails?.forEach((detail) => {
			const category = detail.product?.category || 'Other';
			const amount = Number(detail.unitPrice || 0) * Number(detail.quantity || 0);
			categoryTotals[category] = (categoryTotals[category] || 0) + amount;
		});
	});

	const sortedCategories = Object.entries(categoryTotals)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5);

	return {
		labels: sortedCategories.map(([label]) => label),
		data: sortedCategories.map(([, value]) => value)
	};
}

function getTopSellingProducts(orders: Array<{ orderDetails?: Array<{ product?: { name?: string }; quantity?: string | null }> }>) {
	const productSales: Record<string, number> = {};

	orders.forEach((order) => {
		order.orderDetails?.forEach((detail) => {
			const name = detail.product?.name || 'Unknown';
			const qty = Number(detail.quantity || 0);
			productSales[name] = (productSales[name] || 0) + qty;
		});
	});

	return Object.entries(productSales)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([name, quantity]) => ({ name, quantity }));
}

function getRevenueByStore(
	orders: Array<{ storeId?: number; store?: { name?: string }; orderDetails?: Array<{ unitPrice?: string | null; quantity?: string | null }> }>,
	stores: Array<{ id: number; location: string }>
) {
	const storeRevenue: Record<number, { name: string; revenue: number }> = {};

	// Initialize with all stores
	stores.forEach((store) => {
		storeRevenue[store.id] = { name: store.location, revenue: 0 };
	});

	orders.forEach((order) => {
		if (order.storeId && storeRevenue[order.storeId]) {
			const revenue =
				order.orderDetails?.reduce(
					(sum, detail) => sum + Number(detail.unitPrice || 0) * Number(detail.quantity || 0),
					0
				) || 0;
			storeRevenue[order.storeId].revenue += revenue;
		}
	});

	const sorted = Object.values(storeRevenue)
		.filter((s) => s.name)
		.sort((a, b) => b.revenue - a.revenue);

	return {
		labels: sorted.map((s) => s.name),
		data: sorted.map((s) => s.revenue)
	};
}
