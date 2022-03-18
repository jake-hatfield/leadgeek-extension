import puppeteer from 'puppeteer';

// env
const extensionId = process.env.CHROME_EXTENSION_ID;

describe('test launch', () => {
	let browser;
	beforeEach(async () => {
		browser = await puppeteer.launch({
			headless: false,
			args: [
				`--disable-extensions-except=${extensionId}`,
				`--load-extensions=${extensionId}`,
			],
		});

		const extensionPage = await browser.newPage();

		await extensionPage.goto(`chrome-extension://${extensionId}/index.html`);
	});

	afterEach(async () => {
		await browser.close();
	});

	test('it loads', () => {});
});
