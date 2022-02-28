import { Writable, writable } from 'svelte/store';

// types
import type KeepaProduct from '$types/KeepaProduct';

export const status: Writable<'loading' | 'idle' | 'error'> =
	writable('loading');

export const data: Writable<KeepaProduct> = writable();
