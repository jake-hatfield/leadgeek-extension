import { Writable, writable } from 'svelte/store';

export const alert: Writable<
	| {
			type: 'success' | 'error';
			title: string;
			description: string;
	  }
	| {}
> = writable({});
