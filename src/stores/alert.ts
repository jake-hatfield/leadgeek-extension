import { writable } from 'svelte/store';

// packages
import { v4 as uuidv4 } from 'uuid';

// types
import type { Alert } from '$types/Alert';

const createAlert = () => {
	const { subscribe, set } = writable<Alert>({
		id: '',
		type: null,
		title: '',
		description: '',
	});

	return {
		subscribe,
		create: ({ type, title, description }) => {
			set({
				id: uuidv4(),
				type,
				title,
				description,
			});
		},
		delete: () => set({ id: '', type: null, title: '', description: '' }),
	};
};

export const alert = createAlert();
