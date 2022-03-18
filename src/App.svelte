<script>
	// packages
	import { Router } from 'svelte-navigator';

	// routes
	import Routes from '@routes/Routes.svelte';

	// assets
	import '../public/assets/index.css';
	import '../public/assets/global.css';

	const isProd = process.env.isProd;
</script>

<!-- router without auto-focus on heading element -->
<Router basepath={isProd ? '/index.html' : '/'} primary={false}>
	<Routes />
</Router>
