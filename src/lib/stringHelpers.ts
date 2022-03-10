export const getFirstWord = (phrase: string) => {
	return phrase.split(' ')[0];
};

export const getInitial = (name: string) => {
	return name.charAt(0).toUpperCase();
};

export const pluralize = (count: number, noun: string, suffix = 's') =>
	`${count} ${noun}${count !== 1 ? suffix : ''}`;
