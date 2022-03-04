<script lang="ts">
	//   components
	import Icon from '@components/utils/Icon.svelte';

	//   types
	import type IconTitles from '$types/Icon';

	export let iconTitle: IconTitles = 'exclamation-circle';
</script>

<aside class="py-5 px-3 card-100">
	<header class="flex items-start">
		<div class="p-3 rounded-lg bg-gray-900 shadow-sm">
			<Icon type="solid" title={iconTitle} class="text-teal-300" />
		</div>
		<div class="ml-3">
			<h1 class="text-lg font-bold text-200">Server error</h1>
			<p class="mt-1.5">
				Something went wrong. If this issue persists, please contact Leadgeek
				support.
			</p>
		</div>
	</header>
</aside>
