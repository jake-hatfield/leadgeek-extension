export interface Subfeature {
	title: string;
}

export interface Feature {
	title: string;
	icon: IconTitles;
	children: Subfeature[];
}

export interface Category {
	title: string;
	children: Feature[];
}
