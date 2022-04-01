import { Writable, writable } from 'svelte/store';

// types
import type User from '$types/User';

// auth loading status
export const status: Writable<'idle' | 'loading' | 'error'> =
	writable('loading');

// auth details
export const token: Writable<string | null> = writable(null);
export const isAuthenticated: Writable<boolean> = writable(false);

// user details
export const user: Writable<User | null> = writable(null);
