import puppeteer, { ElementHandle } from "puppeteer";

const commonOptions = { timeout: 5000 };

export async function waitAndClick(selector: string, page: puppeteer.Page, _delete?: Boolean): Promise<ElementHandle> {
	const isXPath = selector.startsWith(`/`);
	if (isXPath) {
		await page.waitForXPath(selector, commonOptions);
		const element = (await page.$x(selector))[0];
		await element.click();
		if (_delete) {
			await deleteElement(element);
		}
		return element;
	} else {
		const element = await page.waitForSelector(selector, commonOptions);
		await page.click(selector);
		if (_delete) {
			await deleteElement(element);
		}
		return element;
	}

	async function deleteElement(element: puppeteer.ElementHandle<Element>) {
		await element.evaluate((element) => element?.parentElement?.removeChild(element));
	}
}
