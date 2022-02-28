<script lang="ts">
	// packages
	import { useNavigate, useLocation } from 'svelte-navigator';

	// store
	import { user } from '@stores/auth';

	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$user) {
		navigate('/login', {
			state: { from: $location.pathname },
			replace: true,
		});
	}
</script>

{#if $user}
	<slot />
{/if}
