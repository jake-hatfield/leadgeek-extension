<script>
	// packages
	import { Router } from 'svelte-navigator';
	// routes
	import Alert from '@components/utils/Alert.svelte';
	import Routes from '@routes/Routes.svelte';
	import Nav from '@components/layout/Nav.svelte';

	// assets
	import '../public/assets/index.css';
	import '../public/assets/global.css';

	const isProd = process.env.isProd;
</script>

<Router basepath={isProd ? '/index.html' : '/'} primary={false}>
	<Nav />
	<Routes />
	<Alert />
</Router>
