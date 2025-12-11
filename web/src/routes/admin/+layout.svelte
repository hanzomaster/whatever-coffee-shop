<script lang="ts">
	import AdminSidebar from '$lib/components/layout/AdminSidebar.svelte';
	import AdminHeader from '$lib/components/layout/AdminHeader.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<div class="flex h-screen bg-coffee-50">
	<AdminSidebar />
	<div class="flex flex-1 flex-col overflow-hidden">
		<AdminHeader username={data.user?.username ?? 'User'} />
		<main class="flex-1 overflow-auto p-6">
			{@render children()}
		</main>
	</div>
</div>
