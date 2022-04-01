<script lang="ts">
	import { onMount } from 'svelte';

	// packages
	import { useNavigate, useLocation } from 'svelte-navigator';

	// components
	import Transition from '@components/utils/Transition.svelte';

	// store
	import { isAuthenticated, status } from '@stores/auth';

	//   utils
	import { authenticateUser } from '@utils/authHelpers';

	const navigate = useNavigate();
	const location = useLocation();

	let url = $location.pathname;

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
</script>

<Transition key={url}>
	<slot />
</Transition>
