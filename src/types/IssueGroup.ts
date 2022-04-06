import type Issue from '$types/Issue';

export default interface IssueGroup {
	id: string;
	category: string;
	children: Issue[];
}
