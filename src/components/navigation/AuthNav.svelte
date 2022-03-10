<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	//  packages
	import { Link } from 'svelte-navigator';

	//  components
	import Icon from '@components/utils/Icon.svelte';
	import Logo from '@components/utils/Logo.svelte';
	import Skeleton from '@components/utils/Skeleton.svelte';
	import Toggle from '@components/utils/Toggle.svelte';

	//  lib
	import { handleClickOutside } from '@lib/clickHelpers';
	import { getFirstWord, getInitial } from '@lib/stringHelpers';

	//  utils
	import { removeUserData } from '@utils/authHelpers';

	//  types
	import type IconTitles from '$types/Icon';

	//  stores
	import { status, user } from '@stores/auth';
	// import { alert } from '@stores/alert';
	import { layout } from '@stores/layout';

	//  state
	let userModalActive = false;
	let userModalLinks: {
		title: string;
		link: string;
		icon: IconTitles;
		shortcut: string;
	}[] = [
		{
			title: 'Issue scanner',
			link: 'issue-scanner',
			icon: 'cog',
			shortcut: 'S',
		},
	];

	//  functions
	const closeExtension = () => {
		return window.close();
	};

	const toggleUserModal = () => {
		userModalActive = !userModalActive;
	};

	//   TODO<Jake>: User nav menu
	//   TODO<Jake>: Hotkeys
</script>

{#if $status === 'loading' || !$user}
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
				class="p-2 rounded-lg bg-gray-100 border border-300 ring-gray transition-main"
				data-testId="main-nav-close-button"
			>
				<Icon type="solid" title="cog" />
			</button>

			<!-- user modal -->
			{#if userModalActive}
				<div
					transition:fade={{ duration: 100 }}
					class="absolute top-12 z-40 w-72 cs-light-100 card-300"
					data-testId="main-nav-user-modal"
				>
					<div class="relative flex items-start py-3 mx-3 border-b border-300">
						<!-- initial box -->
						<div
							class="h-10 w-10 all-center p-1.5 cs-purple rounded-lg shadow-sm transition-main ring-purple"
							data-testId="main-nav-user-modal-button"
						>
							<span class="text-lg font-bold">{getInitial($user.name)}</span>
						</div>
						<header class="ml-3">
							<h4 class="font-bold text-sm text-200">
								{getFirstWord($user.name)}
								{' '}<span role="img" aria-label="Waving emoji">👋</span>
							</h4>
							<p class="text-sm text-100">{$user.email}</p>
						</header>
					</div>

					<!-- user modal links -->
					{#if userModalLinks}
						<ul class="py-1.5">
							{#each userModalLinks as userModalLink}
								<li
									on:click={() => {
										toggleUserModal();
									}}
									class="hover:bg-gray-100 hover:text-200"
								>
									<a
										href={`/${userModalLink.link}/`}
										class="flex items-center justify-between p-3"
									>
										<span class="flex items-center">
											<Icon type="solid" title={userModalLink.icon} />
											<span class="ml-3">
												{userModalLink.title}
											</span>
										</span>
										<span
											class="all-center h-6 w-6 p-0.5 rounded-lg cs-bg-light border border-300 shadow-sm font-semibold text-sm text-100"
											>{userModalLink.shortcut}</span
										>
									</a>
								</li>
							{/each}

							<!-- dark mode button -->
							<li
								class="flex items-center justify-between p-3 hover:bg-gray-100 hover:text-200"
							>
								<span class="flex items-center">
									<Icon type="solid" title="moon" />
									<span class="ml-3">Dark mode</span>
								</span>
								<Toggle
									defaultChecked={false}
									name="dark-mode"
									onChange={() => window.document.body.classList.toggle('dark')}
								/>
							</li>

							<!-- logout button -->
							<li class="p-3 hover:bg-gray-100 hover:text-200">
								<button on:click={removeUserData} class="block w-full">
									<span class="flex items-center">
										<Icon
											type="solid"
											title="logout"
											class="transform rotate-180"
										/>
										<span class="ml-3">Logout</span>
									</span>
								</button>
							</li>
						</ul>
					{/if}
				</div>
			{/if}
		</div>

		<!-- logo -->
		<div>
			<!-- <Link
				to={`/${$layout[0].dashboard.id ? $layout[0].dashboard.id : ''}`}
				class="block py-2 rounded-lg ring-gray"
				data-testId="main-nav-logo-link"
			>
				<Logo class="w-14" />
			</Link> -->
		</div>

		<!-- close button -->
		<button
			on:click={closeExtension}
			class="p-2 rounded-lg cs-bg-light border border-300 ring-gray transition-main"
			data-testId="main-nav-close-button"
		>
			<Icon type="solid" title="x" />
		</button>
	</nav>
{/if}
