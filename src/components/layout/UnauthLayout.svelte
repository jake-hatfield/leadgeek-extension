<script lang="ts">
	import { onMount } from 'svelte';

	// components
	import Alert from '@components/utils/Alert.svelte';
	import UnauthNav from '@components/layout/navigation/UnauthNav.svelte';

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
	<UnauthNav />
	<slot />
	<Alert />
</main>
