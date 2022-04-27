<script lang="ts">
	import { onMount } from 'svelte';

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

<main class="z-40 min-h-[484px] text-base">
	<slot />
</main>
