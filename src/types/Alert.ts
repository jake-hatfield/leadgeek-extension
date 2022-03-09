export type AlertTypes = 'success' | 'warning' | 'danger';

export interface Alert {
	id: string;
	type: AlertTypes | null;
	title: string;
	description: string;
}
