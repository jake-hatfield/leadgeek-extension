import { DateTime } from 'luxon';

export const getCurrentTime = () => {
	return DateTime.now();
};
