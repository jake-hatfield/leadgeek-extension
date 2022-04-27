<script lang="ts">
	import { onMount } from 'svelte';

	// packages
	import { useNavigate, useLocation } from 'svelte-navigator';

	// store
	import { isAuthenticated, status } from '@stores/auth';

	//   utils
	import { authenticateUser } from '@utils/authHelpers';
	const navigate = useNavigate();
	const location = useLocation();

	const navigateToLogin = () => {
		navigate('/login', {
			state: { from: $location.pathname },
			replace: true,
		});
	};

	onMount(() => {
		try {
			authenticateUser();
		} catch (error) {
			navigateToLogin();
		}
	});

	$: if (!$isAuthenticated && $status === 'idle') {
		navigateToLogin();
	}
	// TODO<Jake>: Transition all colors for dark mode switching
</script>

<main class="z-30 h-[484px] w-full">
	<slot />
</main>
