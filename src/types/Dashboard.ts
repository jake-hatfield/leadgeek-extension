import type Widget from '$types/Widget';

export default interface Dashboard {
	id: string;
	default: boolean;
	title: string;
	color: string;
	widgets: Widget[];
}
