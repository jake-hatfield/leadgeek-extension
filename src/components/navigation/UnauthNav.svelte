<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	// components
	import Icon from '@components/utils/Icon.svelte';
	import Logo from '@components/utils/Logo.svelte';
	import Skeleton from '@components/utils/Skeleton.svelte';

	//   utils
	import { handleClickOutside } from '@lib/clickHelpers';

	//   types
	import type IconTitles from '@types/Icon';

	//   props

	//   global state
	import { status } from '@stores/auth';

	//   state
	let userModalActive = false;
	let userModalSearchActive = false;
	let userModalLinks: {
		title: string;
		link: string;
		icon: IconTitles;
	}[] = [
		{ title: 'Login', link: 'login', icon: 'user' },
		{ title: 'Settings', link: 'settings', icon: 'cog' },
	];

	// functions
	const closeExtension = () => {
		return window.close();
	};

	const toggleUserModal = () => {
		userModalActive = !userModalActive;
	};

	const toggleUserModalSearch = () => {
		userModalSearchActive = !userModalSearchActive;
	};

	//   TODO<Jake>: User nav menu
	//   TODO<Jake>: User nav search
</script>

{#if $status === 'loading'}
	<div class="border-b border-300">
		<Skeleton width={400} height={49}>
			<!-- user icon -->
			<circle cx={27.5} cy={24.5} r={17.5} />
			<!-- logo -->
			<rect width={49} height={33.5} x={175.5} y={7.5} rx={7} ry={7} />
			<!-- close icon -->
			<rect width={33.5} height={33.5} x={356.5} y={7.5} rx={7} ry={7} />
		</Skeleton>
	</div>
{:else}
	<nav class="all-center py-2 px-3 border-b border-gray-300">
		<!-- logo -->
		<div>
			<a
				href="/"
				class="block py-2 rounded-lg ring-gray"
				data-testId="main-nav-logo-link"
			>
				<Logo class="w-14" />
			</a>
		</div>
	</nav>
{/if}
