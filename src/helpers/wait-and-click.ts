import puppeteer from "puppeteer";

const commonOptions = { timeout: 5000 };

export async function waitAndClick(selector: string, page: puppeteer.Page) {
	const isXPath = selector.startsWith(`/`);
	if (isXPath) {
		await page.waitForXPath(selector, commonOptions);
		const elements = await page.$x(selector);
		await elements[0].click();
	} else {
		await page.waitForSelector(selector, commonOptions);
		await page.click(selector);
	}
}
