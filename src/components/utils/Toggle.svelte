<script lang="ts">
	// props
	export let defaultChecked: boolean = false;
	export let name: string;
	export let onChange: () => void;

	// state
	let checked = defaultChecked;

	// functions
	const toggleChecked = () => (checked = !checked);
</script>

<label
	for={name}
	class="flex items-center cursor-pointer font-semibold text-sm text-100"
	data-testId={`toggle-${name}`}
>
	<slot name="itemLeft" />
	<div class="relative">
		<input
			id={name}
			type="checkbox"
			{checked}
			on:change={() => {
				toggleChecked();
				onChange();
			}}
			class={`sr-only ${$$props.class}`}
		/>
		<div
			class={`block h-6 w-11 rounded-full shadow-sm group-hover:shadow transition-colors ${
				checked ? 'bg-purple-500' : 'bg-gray-200 dark:bg-darkGray-200'
			}`}
		/>
		<div
			class={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow transition transform ${
				checked ? 'translate-x-5' : ''
			}`}
		/>
	</div>
	<slot name="itemRight" />
</label>
