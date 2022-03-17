import type Widget from '$types/Widget';

export default interface Dashboard {
	id: string;
	title: string;
	color: string;
	widgets: Widget[];
}
