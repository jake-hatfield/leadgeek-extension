<script lang="ts">
	//   components
	import Button from '@components/utils/Button.svelte';
	import Input from '@components/utils/Input.svelte';

	//   lib
	import { getCurrentTime } from '@lib/dateTimeHelpers';

	//   utils
	import { getUserData, login } from '@utils/authHelpers';

	//   store
	import { isAuthenticated, user } from '@stores/auth';
	import { onMount } from 'svelte';

	//   state
	let emailValue = '';
	let passwordValue = '';
	let welcomeText = 'Hello there!';
	const currentTime = getCurrentTime();

	//   functions
	export const setWelcomeMessage = (currentHour: number) => {
		if (currentHour < 12) {
			welcomeText = 'Good morning!';
		} else if (currentHour < 18) {
			welcomeText = 'Good afternoon!';
		} else {
			welcomeText = 'Good evening!';
		}

		return welcomeText;
	};

	onMount(async () => {
		getUserData();
	});

	setWelcomeMessage(currentTime.hour);
</script>

<section class="all-center p-3 bg-splatter" data-testId="login-page">
	<article class="w-full card-padding-y cs-light-100 card-200">
		<header class="card-padding-x pb-1.5 border-b border-300">
			<h1 class="text-xl font-bold text-200">
				{welcomeText}
				{$user && $user.name}
			</h1>
			<p class="text-sm">Log in to continue</p>
		</header>
		<form on:submit|preventDefault class="card-padding-x">
			<Input
				bind:value={emailValue}
				id="login-email"
				label="Email"
				type="email"
				class="mt-3"
			/>
			<Input
				bind:value={passwordValue}
				id="login-password"
				isPassword={true}
				label="Password"
				type="password"
				class="mt-3"
			/>
			<a href="/login/forgot-password" class="block mt-3 link"
				>Forgot password?</a
			>
			<Button
				title="Log in"
				class="w-full mt-3"
				action={() => {
					login(emailValue, passwordValue);
				}}
			/>
			<p class="mt-3">
				Need a Leadgeek account? <a
					href="https://leadgeek.io/"
					target="__blank"
					rel="noopener noreferrer"
					class="link">Join now</a
				>
			</p>
		</form>
	</article>
</section>

<style>
	section {
		min-height: 550px;
	}
</style>
