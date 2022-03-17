<script lang="ts">
	import { fade } from 'svelte/transition';

	// components
	import Icon from '@components/utils/Icon.svelte';

	type HTMLInputTypes =
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week';
	// props
	export let id: string;
	export let isPassword = false;
	export let showPasswordText = false;
	export let label: string;
	export let required = false;
	export let type: HTMLInputTypes;
	export let value = '';

	//   functions
	const handleInput = (e) => {
		value = e.target.value;
	};

	const toggleShowPasswordText = () => {
		showPasswordText = !showPasswordText;
		type = showPasswordText ? 'text' : 'password';
	};
</script>

<div class="relative" data-testId="input-container">
	<input
		on:input={handleInput}
		{id}
		{type}
		{required}
		name={id}
		autocomplete="off"
		class={`w-full pt-5 pb-1 px-5 rounded-lg border border-200 focus:border-purple-500 dark:focus:border-purple-300 invalid:border-red-500 shadow-sm outline-none ring-0 transition-main peer ${
			$$props.class
		} ${
			value
				? 'cs-light-100'
				: 'bg-gray-100 dark:bg-darkGray-200 hover:bg-gray-200 dark:hover:bg-darkGray-300 focus:bg-white dark:focus:bg-darkGray-100'
		} ${showPasswordText ? '' : 'tracking-wide'}`}
	/>
	<label
		for={id}
		class={`absolute top-6 left-5 z-1 inline-block rounded-lg text-gray-300 peer-focus:-translate-y-1.5 peer-focus:text-xs dark:peer-focus:bg-purple-200 peer-focus:text-purple-500 dark:peer-focus:text-purple-900 peer-invalid:text-red-400 transition-main ${
			value ? '-translate-y-1.5 text-xs' : ''
		}`}>{label}</label
	>
	{#if isPassword && value}
		<button
			on:click={toggleShowPasswordText}
			transition:fade={{ duration: 150 }}
			class="absolute top-7 right-3 rounded-md ring-gray"
			data-testId={showPasswordText
				? 'hide-password-text'
				: 'show-password-text'}
		>
			{#if showPasswordText}
				<Icon type="solid" title="eye-off" />
			{:else}
				<Icon type="solid" title="eye" />
			{/if}
		</button>
	{/if}
</div>
