<script lang="ts">
	import { fade } from 'svelte/transition';

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
	import { layout } from '@stores/layout';

	//  state
	let settingsModalActive = false;
	let settingsModalLinks: {
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

	const settingsModal = () => {
		settingsModalActive = !settingsModalActive;
	};

	//   TODO<Jake>: User nav menu
	//   TODO<Jake>: Hotkeys
</script>

{#if $status === 'loading' || !$user}
	<div class="border-b border-200">
		<Skeleton width={378} height={47}>
			<!-- user icon -->
			<rect width={30} height={30} x={10.5} y={9} rx={7} ry={7} />
			<!-- logo -->
			<rect width={49} height={33.5} x={165} y={7.5} rx={7} ry={7} />
			<!-- close icon -->
			<rect width={30} height={30} x={337.5} y={9.5} rx={7} ry={7} />
		</Skeleton>
	</div>
{:else}
	<nav class="center-between py-2 px-3 border-b border-200">
		<!-- settings modal -->
		<div
			use:handleClickOutside={{
				enabled: settingsModalActive,
				cb: () => settingsModalActive && settingsModal(),
			}}
			class="relative"
		>
			<button
				on:click={settingsModal}
				class="p-1.5 rounded-lg bg-gray-100 border border-200 ring-gray transition-main"
				data-testId="main-nav-settings-button"
			>
				<Icon type="solid" title="cog" />
			</button>

			<!-- settings modal -->
			{#if settingsModalActive}
				<div
					transition:fade={{ duration: 100 }}
					class="absolute top-12 z-40 w-72 cs-light-100 card-300"
					data-testId="main-nav-settings-modal"
				>
					<div class="relative flex items-start py-3 mx-3 border-b border-200">
						<!-- initial box -->
						<div
							class="h-11 w-11 all-center p-1.5 cs-purple rounded-lg shadow-sm transition-main ring-purple"
						>
							<span class="text-lg font-bold">{getInitial($user.name)}</span>
						</div>
						<header class="ml-3">
							<h4 class="font-bold text-sm text-200">
								{getFirstWord($user.name)}
								{' '}<span
									role="img"
									aria-label="Waving emoji"
									class="text-base">👋</span
								>
							</h4>
							<p class="text-sm text-100">{$user.email}</p>
						</header>
					</div>

					<!-- settings modal links -->
					{#if settingsModalLinks}
						<ul class="py-1.5">
							{#each settingsModalLinks as settingsModalLink}
								<li
									on:click={() => {
										settingsModal();
									}}
									class="mx-3 rounded-lg hover:bg-gray-100 hover:text-200 transition-main group"
								>
									<Link
										to={`/${settingsModalLink.link}/`}
										class="flex items-center justify-between p-3"
									>
										<span class="flex items-center">
											<Icon type="solid" title={settingsModalLink.icon} />
											<span class="ml-3">
												{settingsModalLink.title}
											</span>
										</span>
										<span
											class="all-center h-5 w-5 p-0.5 rounded-md bg-gray-200 dark:bg-darkGray-200 shadow-sm group-hover:shadow font-semibold text-sm text-100"
											>{settingsModalLink.shortcut}
										</span>
									</Link>
								</li>
							{/each}

							<!-- dark mode button -->
							<li
								class="flex items-center justify-between mx-3 p-3 rounded-lg hover:bg-gray-100 hover:text-200 transition-main group"
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
							<li
								class="mx-3 rounded-lg hover:bg-gray-100 hover:text-200 transition-main"
							>
								<button on:click={removeUserData} class="block w-full p-3">
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
			<Link
				to="/"
				class="block py-2 rounded-lg outline-none"
				data-testId="main-nav-logo-link"
			>
				<Logo class="w-14" />
			</Link>
		</div>

		<!-- close button -->
		<button
			on:click={closeExtension}
			class="p-1.5 rounded-lg bg-gray-100 border border-200 ring-gray transition-main"
			data-testId="main-nav-close-button"
		>
			<Icon type="solid" title="x" />
		</button>
	</nav>
{/if}
