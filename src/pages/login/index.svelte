<script lang="ts">
	// packages
	import { useNavigate, useLocation } from 'svelte-navigator';

	//   components
	import Button from '@components/utils/Button.svelte';
	import Input from '@components/utils/Input.svelte';
	import UnauthLayout from '@components/layouts/UnauthLayout.svelte';

	//   lib
	import { getCurrentTime } from '@lib/dateTimeHelpers';

	//   utils
	// import { getUserData, login } from '@utils/authHelpers';

	//   store
	import { isAuthenticated, user } from '@stores/auth';
	import { onMount } from 'svelte';
	import axios from 'axios';

	//   state
	let emailValue = '';
	let passwordValue = '';
	let welcomeText = 'Hello there!';
	const currentTime = getCurrentTime();

	//   functions
	const navigate = useNavigate();
	const location = useLocation();

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
	setWelcomeMessage(currentTime.hour);

	// onMount(async () => {
	// 	getUserData();
	// });

	$: if (!$isAuthenticated) {
		navigate('/login', {
			state: { from: $location.pathname },
			replace: true,
		});
	}

	const login = async () => {
		const body = JSON.stringify({
			email: 'jake@leadgeek.io',
			password: 'KIp@sslol7788123',
		});
		console.log(body);
		const res = await axios.post<{
			message:
				| 'Email & password combination not correct.'
				| 'Login success'
				| 'Server error';
			token: string | null;
		}>(`https://app.leadgeek.io/api/auth/`, body, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log(res);
	};
</script>

<UnauthLayout>
	<section class="all-center p-3 bg-splatter" data-testId="login-page">
		<article class="w-full card-padding-y cs-light-100 card-200">
			<header class="card-padding-x pb-3 border-b border-300">
				<h1 class="text-2xl font-bold text-300 outline-none">
					Log in to Leadgeek
				</h1>
				<p class="mt-2 text-100">
					{welcomeText} Please enter your account credentials below
					<span role="img" aria-label="Point down emoji">👇</span>
				</p>
			</header>
			<form on:submit|preventDefault class="pt-3 card-padding-x">
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
				<a
					href="/login/forgot-password"
					class="inline-block mt-3 rounded-lg link ring-gray"
					>Forgot password?</a
				>
				<Button
					title="Log in"
					class="w-full mt-6"
					action={() => {
						login();
					}}
				/>
				<p class="mt-3 text-100">
					Need a Leadgeek account? <a
						href="https://leadgeek.io/"
						target="__blank"
						rel="noopener noreferrer"
						class="rounded-lg link ring-gray">Join now</a
					>
				</p>
			</form>
		</article>
	</section>
</UnauthLayout>

<style>
	section {
		min-height: 550px;
	}
</style>