<script lang="ts">
	import { onMount } from 'svelte';

	// components
	import AuthNav from '@components/navigation/AuthNav.svelte';
	import Alert from '@components/utils/Alert.svelte';

	//   utils
	import { getUserData, handleJwt, removeUserData } from '@utils/authHelpers';

	//   onMount functions
	onMount(async () => {
		// check for a token in LS
		handleJwt(localStorage.token);

		// load the user data
		getUserData();

		// log user out from all tabs if they log out from one tab
		window.addEventListener('storage', () => {
			if (!localStorage.token) removeUserData();
		});
	});
</script>

<main class="relative text-base">
	<AuthNav />
	<slot />
	<Alert />
</main>
