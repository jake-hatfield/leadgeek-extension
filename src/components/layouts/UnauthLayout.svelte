<script lang="ts">
	import axios from 'axios';
	import type User from '$types/User';
	import { onMount } from 'svelte';

	// components
	import UnauthNav from '@components/navigation/UnauthNav.svelte';

	//   utils
	// import { getUserData, removeUserData } from '@utils/authHelpers';

	//   onMount functions
	onMount(async () => {
		// check for a token in LS
		// handleJwt(localStorage.token);
		//   make GET request to the API
		const res = await axios.get<{
			message: 'Returning user data' | 'Server error';
			user: User | null;
		}>('https://app.leadgeek.io/api/auth/');

		console.log(res);

		// load the user data
		// getUserData();

		// log user out from all tabs if they log out from one tab
		// window.addEventListener('storage', () => {
		// 	if (!localStorage.token) removeUserData();
		// });
	});
</script>

<main class="text-base">
	<UnauthNav />
	<slot />
</main>
