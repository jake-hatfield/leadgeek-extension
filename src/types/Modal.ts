export default interface Modal {
	id: string;
	title: string;
	description: HTMLElement | null;
	action?: {
		primary: Function;
		secondary: Function;
	};
}
