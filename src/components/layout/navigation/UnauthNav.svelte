<script lang="ts">
	// packages
	import { Link } from 'svelte-navigator';

	// components
	import Icon from '@components/utils/Icon.svelte';
	import Logo from '@components/utils/Logo.svelte';
	import Skeleton from '@components/utils/Skeleton.svelte';

	//   global state
	import { status } from '@stores/auth';

	// functions
	const closeExtension = () => {
		return window.close();
	};

	//   TODO<Jake>: User nav menu
	//   TODO<Jake>: User nav search
</script>

{#if $status === 'loading'}
	<div class="border-b border-200">
		<Skeleton width={400} height={49}>
			<!-- logo -->
			<rect width={49} height={33.5} x={175.5} y={7.5} rx={7} ry={7} />
			<!-- close icon -->
			<rect width={33.5} height={33.5} x={356.5} y={7.5} rx={7} ry={7} />
		</Skeleton>
	</div>
{:else}
	<nav class="center-between py-2 px-3 border-b border-200">
		<div />
		<!-- logo -->
		<div>
			<Link
				to="/login"
				class="block py-2 rounded-lg ring-gray"
				data-testId="main-nav-logo-link"
			>
				<Logo class="w-14" />
			</Link>
		</div>
		<!-- close button -->
		<button
			on:click={closeExtension}
			class="p-2 rounded-lg bg-gray-100 border border-200 ring-gray transition-main"
			data-testId="main-nav-close-button"
		>
			<Icon type="solid" title="x" />
		</button>
	</nav>
{/if}
