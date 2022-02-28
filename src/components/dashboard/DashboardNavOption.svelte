<script lang="ts">
	// components
	import Icon from '@components/utils/Icon.svelte';

	// props
	export let option;

	// state
	let hoverActive = false;

	//   TODO<Jake>: Write tests to make sure that the edit/delete buttons are visible on hover
</script>

<li
	class="py-3 pl-5 pr-4 hover:bg-gray-100"
	on:mouseenter={() => (hoverActive = true)}
	on:mouseleave={() => (hoverActive = false)}
>
	<div class="center-between">
		<!-- icon and title -->
		<div class="flex items-center">
			<span class="inline-block h-2 w-2 rounded-full bg-teal-500" />
			<span class="ml-3 text-base">{option.title}</span>
		</div>
		<!-- buttons -->
		{#if hoverActive}
			<div class="flex items-center" data-testId="dashboard-nav-option-actions">
				<button>
					<Icon
						type="outline"
						title="star"
						size="sm"
						class="hover:text-purple-500"
					/>
				</button>
				<button class="ml-3">
					<Icon
						type="solid"
						title="pencil"
						size="sm"
						class="hover:text-gray-900"
					/>
				</button>
				<button class="ml-3">
					<Icon
						type="solid"
						title="trash"
						size="sm"
						class="hover:text-red-300"
					/>
				</button>
			</div>
		{/if}
	</div>
</li>
