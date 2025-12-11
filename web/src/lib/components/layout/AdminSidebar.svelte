<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	interface NavItem {
		href: string;
		label: string;
		icon: string;
	}

	const navItems: NavItem[] = [
		{ href: '/admin/dashboard', label: 'Dashboard', icon: 'grid' },
		{ href: '/admin/products', label: 'Products', icon: 'package' },
		{ href: '/admin/orders', label: 'Orders', icon: 'clipboard' },
		{ href: '/admin/customers', label: 'Customers', icon: 'users' },
		{ href: '/admin/stores', label: 'Stores', icon: 'store' },
		{ href: '/admin/suppliers', label: 'Suppliers', icon: 'truck' },
		{ href: '/admin/inventory', label: 'Inventory', icon: 'box' },
		{ href: '/admin/users', label: 'Users', icon: 'user' },
		{ href: '/admin/reports', label: 'Reports', icon: 'chart' }
	];

	const iconMap: Record<string, string> = {
		grid: 'M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z',
		package:
			'M20.5 7.3L12 2 3.5 7.3V16.7L12 22l8.5-5.3V7.3zM12 4.5l6 3.75-6 3.75-6-3.75 6-3.75zM5.5 9.3l5.5 3.44v6.52l-5.5-3.44V9.3zm7.5 9.96v-6.52l5.5-3.44v6.52l-5.5 3.44z',
		clipboard:
			'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
		users: 'M12 4.5C9.5 4.5 7.5 6.5 7.5 9s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zM3 19.5c0-3 6-4.5 9-4.5s9 1.5 9 4.5v1.5H3v-1.5z',
		user: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
		store: 'M3 3h18v18H3V3zm16 2H5v14h14V5zM7 7h4v4H7V7zm0 6h10v4H7v-4zm6-6h4v4h-4V7z',
		truck: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
		box: 'M20 7l-8-4-8 4v10l8 4 8-4V7zm-8-2l5.5 2.75L12 10.5 6.5 7.75 12 5zm-6 4.17l5 2.5v6.16l-5-2.5V9.17zm7 8.66v-6.16l5-2.5v6.16l-5 2.5z',
		chart:
			'M3 3v18h18v-2H5V3H3zm15.83 4.17l-4.24 4.24-3.54-3.54-4.24 4.24 1.41 1.41 2.83-2.83 3.54 3.54 5.66-5.66-1.42-1.4z'
	};

	function isActive(href: string): boolean {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<aside class="flex h-full w-64 flex-col border-r border-coffee-200 bg-white">
	<div class="flex h-16 items-center border-b border-coffee-200 px-6">
		<a href="/admin/dashboard" class="flex items-center gap-2">
			<span class="text-2xl">&#9749;</span>
			<span class="text-xl font-bold text-coffee-900">Admin</span>
		</a>
	</div>

	<nav class="flex-1 space-y-1 p-4">
		{#each navItems as item}
			<a
				href={item.href}
				class={cn(
					'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
					isActive(item.href)
						? 'bg-coffee-100 text-coffee-900'
						: 'text-coffee-600 hover:bg-coffee-50 hover:text-coffee-900'
				)}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconMap[item.icon]} />
				</svg>
				{item.label}
			</a>
		{/each}
	</nav>

	<div class="border-t border-coffee-200 p-4">
		<a
			href="/"
			class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-coffee-600 transition-colors hover:bg-coffee-50 hover:text-coffee-900"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
			</svg>
			Back to Home
		</a>
	</div>
</aside>
