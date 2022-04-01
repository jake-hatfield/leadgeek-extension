// packages
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// lib
import { cache } from '@lib/cacheHelpers';

// utils
import { getTld } from '@utils/urlHelpers';

export const keepaApi = axios.create({
	baseURL: 'https://api.keepa.com',
});
const whiteList = ['auth'];

const isURLInWhiteList = (url: string) => {
	return whiteList.includes(url.split('/')[1]);
};

const responseHandler = (response: AxiosResponse<any>): AxiosResponse<any> => {
	// eslint-disable-next-line no-constant-condition
	if (response.config.method === 'GET' || response.config.method === 'get') {
		if (response.config.url && !isURLInWhiteList(response.config.url)) {
			cache.store(response.config.url, JSON.stringify(response.data));
		}
	}
	return response;
};

const errorHandler = (error: any) => {
	if (error.headers.cached === true) {
		return Promise.resolve(error);
	}
	return Promise.reject(error);
};

const requestHandler = (request: AxiosRequestConfig) => {
	// eslint-disable-next-line no-constant-condition
	if (request.method === 'GET' || request.method === 'get') {
		const checkIsValidResponse = cache.isValid(request.url || '');
		if (checkIsValidResponse.isValid) {
			request.headers.cached = true;
			request.data = JSON.parse(checkIsValidResponse.value || '{}');
			return Promise.reject(request);
		}
	}
	return request;
};

keepaApi.interceptors.request.use((request) => requestHandler(request));
keepaApi.interceptors.response.use(
	(response) => responseHandler(response),
	(error) => errorHandler(error)
);

export const getDomainId = (url: string) => {
	// get the TLD from the full URL
	const tld = getTld(url);

	let domainId = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11;

	switch (tld) {
		case 'com':
			domainId = 1;
			break;
		case 'co.uk':
			domainId = 2;
			break;
		case 'de':
			domainId = 3;
			break;
		case 'fr':
			domainId = 4;
			break;
		case 'co.jp':
			domainId = 5;
			break;
		case 'ca':
			domainId = 6;
			break;
		//   7: Missing from Keepa docs https://keepa.com/#!discuss/t/product-object/116
		case 'it':
			domainId = 8;
			break;
		case 'es':
			domainId = 9;
			break;
		case 'in':
			domainId = 10;
			break;
		case 'com.mx':
			domainId = 11;
			break;
		default:
			`Unhandled domain: ${tld}`;
			break;
	}

	return domainId;
};
