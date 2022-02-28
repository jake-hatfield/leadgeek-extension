export const getActiveUrl: () => Promise<string> = async () => {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	return tab.url;
};

export const getAsin = (url: string) => {
	const regex = RegExp(
		'https://www.amazon.com/([\\w-]+/)?(dp|gp/product|exec/obidos/asin)/(\\w+/)?(\\w{10})'
	);
	const match = url.match(regex);
	if (match) {
		return match[4];
	}
};

export const getTld = (url: string) => {
	// get the string exluding the protocol & "www."
	const domain = new URL(url).hostname.replace('www.', '');

	//   split the URL
	const splitDomainUrl = domain.split('.');

	let tld: string;

	//   if the TLD doesn't have an extra "." (e.g. .co.uk, .co.jp)
	if (splitDomainUrl.length === 2) {
		tld = splitDomainUrl[1];
	} else {
		//   concatenate the broken up pieces of the TLD
		tld = `${splitDomainUrl[1]}.${splitDomainUrl[2]}`;
	}

	return tld;
};
