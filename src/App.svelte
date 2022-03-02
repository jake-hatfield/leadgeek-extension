<script>
	// packages
	import { Router } from 'svelte-navigator';

	// routes
	import Routes from '@routes/Routes.svelte';

	// assets
	import '@fontsource/inter';
	import '../public/assets/index.css';
	import '../public/assets/global.css';

	const isProd = process.env.isProd;
</script>

<Router basepath={isProd ? '/index.html' : '/'}>
	<Routes />
</Router>
