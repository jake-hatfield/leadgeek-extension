<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	// components
	import Icon from '@components/utils/Icon.svelte';
	import Logo from '@components/utils/Logo.svelte';
	import Skeleton from '@components/utils/Skeleton.svelte';

	//   lib
	import { handleClickOutside } from '@lib/clickHelpers';

	//   utils
	import { removeUserData } from '@utils/authHelpers';

	//   types
	import type IconTitles from '$types/Icon';

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
	<nav class="center-between py-2 px-3 border-b border-gray-300">
		<!-- user modal -->
		<div
			use:handleClickOutside={{
				enabled: userModalActive,
				cb: () => userModalActive && toggleUserModal(),
			}}
			class="relative"
		>
			<button
				on:click={toggleUserModal}
				class="h-10 w-10 all-center p-1.5 cs-purple rounded-full shadow-sm transition-main ring-purple"
				data-testId="main-nav-user-modal-button"
			>
				<span class="text-lg font-bold">S</span>
			</button>

			<!-- user modal -->
			{#if userModalActive}
				<div
					transition:fade={{ duration: 100 }}
					class="absolute top-12 z-40 w-72 cs-light-100 card-300"
					data-testId="main-nav-user-modal"
				>
					<header
						class="relative flex items-end justify-between py-3 px-3 border-b border-300"
					>
						<h4 class="text-lg font-bold text-200">
							<span role="img" aria-label="Waving emoji">👋</span>{' '}Hi, Sam
						</h4>

						<!-- user modal search -->
						<div
							use:handleClickOutside={{
								enabled: userModalSearchActive,
								cb: () => userModalSearchActive && toggleUserModalSearch(),
							}}
							class="flex items-center"
						>
							<button
								on:click={toggleUserModalSearch}
								class="p-2 rounded-lg bg-gray-100 border border-300"
								data-testId="main-nav-search-button"
							>
								<Icon type="solid" title="search" />
							</button>
							{#if userModalSearchActive}
								<div
									transition:fly={{ duration: 150, x: 15 }}
									class="absolute top-0.5 right-0 w-full py-2 px-3"
									data-testId="main-nav-search-input"
								>
									<div class="relative">
										<input
											class="w-full py-2 px-3 rounded-lg bg-gray-100 border border-300 ring-gray"
											placeholder="Search for a setting..."
										/>
										<!-- close search button -->
										<button
											on:click={toggleUserModalSearch}
											class="absolute top-1 right-1 p-2 rounded-lg bg-gray-100 hover:text-gray-500"
											data-testId="main-nav-search-button-close"
										>
											<Icon type="solid" title="x" />
										</button>
									</div>
								</div>
							{/if}
						</div>
					</header>

					<!-- user modal links -->
					{#if userModalLinks}
						<div class="pb-1.5">
							<ul>
								{#each userModalLinks as userModalLink}
									<li
										on:click={() => {
											toggleUserModal();
											toggleUserModalSearch();
										}}
										class="hover:bg-gray-100"
									>
										<a
											href={`/${userModalLink.link}/`}
											class="flex items-center p-3"
										>
											<Icon type="solid" title={userModalLink.icon} />
											<span class="ml-3">
												{userModalLink.title}
											</span>
										</a>
									</li>
								{/each}
							</ul>
							<button
								on:click={removeUserData}
								class="flex items-center w-full p-3 hover:bg-gray-100 text-left"
							>
								<Icon
									type="solid"
									title="logout"
									class="transform rotate-180"
								/>
								<span class="ml-3">Logout</span>
							</button>
						</div>
					{/if}
				</div>
			{/if}
		</div>

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

		<!-- close button -->
		<button
			on:click={closeExtension}
			class="p-2 rounded-lg bg-gray-100 border border-300 ring-gray transition-main"
			data-testId="main-nav-close-button"
		>
			<Icon type="solid" title="x" />
		</button>
	</nav>
{/if}
