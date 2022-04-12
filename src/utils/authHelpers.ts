// packages
import axios from 'axios';

// lib
import { config } from '@lib/apiHelpers';

// types
import type User from '$types/User';

// stores
import { alert } from '@stores/alert';
import { isAuthenticated, status, token, user } from '@stores/auth';
import { currentDashboard, layout } from '@stores/layout';

export const authenticateUser = () => {
	// check for a token in LS
	handleJwt(localStorage.token);

	// load the user data
	getUserData();

	// log user out from all tabs if they log out from one tab
	window.addEventListener('storage', () => {
		if (!localStorage.token) removeUserData();
	});
};

const setUserLayout = (userLayout) => {
	layout.set(userLayout);
	currentDashboard.set(layout.defaultDashboard());
	return;
};

// get a user's data
export const getUserData = async () => {
	try {
		//   make GET request to the API
		const res = await axios.get<{
			message: 'Returning user data' | 'Server error';
			user: User | null;
		}>('https://app.leadgeek.io/api/auth/');

		if (res.status !== 200) {
			return alert.create({
				type: 'danger',
				title: 'Login error',
				description:
					"There might be something wrong with Leadgeek's servers. Please try again later or contact support if the issue persists.",
			});
		}

		// return user data to store
		if (res.data.user) {
			user.set(res.data.user);
			setUserLayout(res.data.user.extension.layout);
			isAuthenticated.set(true);
		}

		return status.set('idle');
	} catch (error) {
		console.log(error.response.data.message);
		token.set(null);
		isAuthenticated.set(false);
		user.set(null);
		status.set('idle');
	}
};

// set/delete JWT
export const handleJwt = async (token: string) => {
	if (!token) {
		delete axios.defaults.headers.common['x-auth-token'];
		delete localStorage.token;
		return;
	}

	//   there's a token, so set it in headers and localStorage
	axios.defaults.headers.common['x-auth-token'] = token;
	localStorage.token = token;
	return;
};

// login user with email and password
export const login = async (email: string, password: string) => {
	try {
		if (!email || !password) {
			return alert.create({
				type: 'danger',
				title: 'Information required',
				description: "Please make sure you've entered an email and password.",
			});
		}

		status.set('loading');

		const body = JSON.stringify({
			email: email.toLowerCase(),
			password,
		});

		// make a POST request to the API
		const res = await axios.post<{
			message:
				| 'Email & password combination not correct.'
				| 'Login success'
				| 'Server error';
			token: string | null;
		}>(`https://app.leadgeek.io/api/auth/`, body, config);

		//   if status is not successful, alert user with message
		if (res.status !== 200) {
			status.set('error');

			return alert.create({
				type: 'danger',
				title: 'Login error',
				description: res.data.message,
			});
		}

		if (res.data.token) {
			// set token in store
			token.set(res.data.token);
			handleJwt(res.data.token);
			isAuthenticated.set(true);
			return getUserData();
		}

		return status.set('idle');
	} catch (error) {
		console.log(error.response.data.message);
		alert.create({
			type: 'danger',
			title: 'Login error',
			description: error.response.data.message,
		});
		token.set(null);
		isAuthenticated.set(false);
		user.set(null);
		status.set('idle');
	}
};

// remove a user's data
export const removeUserData = () => {
	localStorage.removeItem('token');
	status.set('idle');
	token.set(null);
	isAuthenticated.set(false);
	user.set(null);
};
