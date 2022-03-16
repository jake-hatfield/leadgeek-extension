import type Dashboard from '$types/Dashboard';
import type Widget from '$types/Widget';

export default interface LayoutItem {
	id: string;
	dashboard: Dashboard;
	widgets: Widget[];
}
