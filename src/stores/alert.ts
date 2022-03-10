import { writable } from 'svelte/store';

// packages
import { v4 as uuidv4 } from 'uuid';

// types
import type { Alert, AlertTypes } from '$types/Alert';

const createAlert = () => {
	const { subscribe, set } = writable<Alert>({
		id: '',
		type: null,
		title: '',
		description: '',
	});

	const create = async ({
		type,
		title,
		description,
	}: {
		type: AlertTypes;
		title: string;
		description: string;
	}) => {
		alert.delete();
		set({
			id: uuidv4(),
			type,
			title,
			description,
		});
		setTimeout(() => {
			alert.delete();
		}, 4000);
	};

	const deleteAlert = () => {
		set({ id: '', type: null, title: '', description: '' });
	};

	return {
		subscribe,
		create,
		delete: deleteAlert,
	};
};

export const alert = createAlert();
