<script lang="ts">
	import { onMount } from 'svelte';

	// components
	import Nav from '@components/navigation/Nav.svelte';

	//   utils
	import { getUserData, handleJwt, removeUserData } from '@utils/authHelpers';

	// props
	export let page;
	export let params;

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

<div>
	<Nav />
	<main>
		<svelte:component this={page} {params} />
	</main>
</div>
