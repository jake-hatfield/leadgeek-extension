export type Role =
	| 'user'
	| 'grow'
	| 'pro'
	| 'bundle'
	| 'affiliate'
	| 'admin'
	| 'master';

export default interface User {
	name: string;
	email: string;
	password?: string;
	dateCreated: string;
	lastLoggedIn: string | null;
	subscription: {
		cusId?: string;
		subIds: { id: string | null; active: boolean }[];
		planIds?: string[];
	};
	billing: {
		paymentMethod: string | null;
		last4?: string;
		brand?: string;
	};
	resetPwToken: string | null;
	resetPwExpires: string | null;
	role: Role;
	referrals: {
		referred: {
			wasReferred: boolean;
			referrerlgid: string | null;
		};
		referrer: {
			isReferrer: boolean;
			pendingApplication: boolean;
			lgid: string | null;
			paypalEmail: string | null;
			dateCreated?: Date;
			clients?: { userId: string; cusId: string }[];
		};
	};
	likedLeads: { _id: string }[];
	archivedLeads: { _id: string }[];
	comments: { date: Date; leadId: string; comment: string }[];
	notifications: { _id: string }[];
	settings: {
		filterGroups: {
			_id: string;
			title: string;
			filters: {
				id: string;
				format: 'numeric' | 'text';
				type:
					| 'netProfit'
					| 'buyPrice'
					| 'sellPrice'
					| 'roi'
					| 'bsrCurrent'
					| 'monthlySales'
					| 'weight'
					| 'category'
					| 'source';
				title:
					| 'Profit'
					| 'Buy price'
					| 'Sell price'
					| 'Return on investment'
					| "Best seller's rank"
					| 'Monthly sales'
					| 'Weight'
					| 'Category'
					| 'Source';
				operator: 'gte' | 'lte' | 'eq';
				value: string | number;
			}[];
		}[];
	};
	extension: {
		dashboards: [{ id: 123 }];
	};
}
