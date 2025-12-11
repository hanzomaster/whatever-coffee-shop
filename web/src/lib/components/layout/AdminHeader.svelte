<script lang="ts">
	import { enhance } from '$app/forms';

	interface Props {
		username: string;
	}

	let { username }: Props = $props();

	let showDropdown = $state(false);
</script>

<header class="flex h-16 items-center justify-between border-b border-coffee-200 bg-white px-6">
	<div class="flex items-center gap-4">
		<h1 class="text-lg font-semibold text-coffee-900">Dashboard</h1>
	</div>

	<div class="relative">
		<button
			onclick={() => (showDropdown = !showDropdown)}
			class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-coffee-700 transition-colors hover:bg-coffee-50"
		>
			<span class="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-200 text-coffee-700">
				{username.charAt(0).toUpperCase()}
			</span>
			<span>{username}</span>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if showDropdown}
			<div class="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border border-coffee-200 bg-white py-1 shadow-lg">
				<form action="/logout" method="POST" use:enhance>
					<button
						type="submit"
						class="flex w-full items-center gap-2 px-4 py-2 text-sm text-coffee-700 transition-colors hover:bg-coffee-50"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
						</svg>
						Sign out
					</button>
				</form>
			</div>
		{/if}
	</div>
</header>
