export default interface Issue {
	// TODO<Jake>: Change "category" to a list of set strings
	id: string;
	description: string;
	priority: number;
	sortKey: 'none' | 'urgent';
	title: string;
}
