<script lang="ts">
	import { onMount } from 'svelte';

	// packages
	import { useLocation } from 'svelte-navigator';

	// components
	import Dashboard from '@components/dashboard/Dashboard.svelte';
	import DashboardNav from '@components/dashboard/DashboardNav.svelte';
	import InfoPanel from '@components/dashboard/InfoPanel.svelte';

	// utils
	import { keepaApi, getDomainId } from '@utils/keepaHelpers';
	import { getActiveUrl, getAsin } from '@utils/urlHelpers';

	// stores
	import { layout } from '@stores/layout';
	import { data, status } from '@stores/product';

	// global const
	const location = useLocation();

	// functions
	const getCurrentDashboardId = (location) => {
		return location.pathname.split('/')[1];
	};

	// state/reactive state
	let currentDashboardId =
		getCurrentDashboardId($location) || layout.defaultDashboardId();
	$: currentDashboardId = getCurrentDashboardId($location);

	let currentDashboard = layout.getDashboardById(currentDashboardId);
	$: currentDashboard = layout.getDashboardById(currentDashboardId);

	let nextDashboard = layout.getNextDashboardId(currentDashboardId, 1);
	$: nextDashboard = layout.getNextDashboardId(currentDashboardId, 1);

	let prevDashboard = layout.getNextDashboardId(currentDashboardId, -1);
	$: prevDashboard = layout.getNextDashboardId(currentDashboardId, -1);

	//   on mount
	onMount(async () => {
		try {
			let amzUrl = process.env.isProd
				? await getActiveUrl()
				: 'https://www.amazon.com/dp/B09B7XVWMF/';

			//   get the ASIN from the Amazon URL
			const asin = getAsin(amzUrl);

			//   get the Keepa domain ID from the Amazon URL
			const domainId = getDomainId(amzUrl);

			//   create the Keepa URL
			const keepaUrl = `/product?key=${process.env.keepaApiSecret}&domain=${domainId}&asin=${asin}`;

			//   make a GET request to Keepa
			const res = await keepaApi.get(keepaUrl);

			if (res.status === 200 && res.data.products.length > 0) {
				data.set(res.data.products[0]);
			}

			return status.set('idle');
		} catch (error) {
			return status.set('error');
		}
	});
</script>

<DashboardNav {nextDashboard} {prevDashboard} />
<Dashboard {currentDashboard} />
<InfoPanel />
