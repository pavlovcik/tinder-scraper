import puppeteer from "puppeteer";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import config from "../puppeteer-config";

export async function browserSetup() {
	const browser = await puppeteer.launch(config.settings);
	// const browser = await puppeteerExtra.use(StealthPlugin()).launch(config.settings);
	const context = browser.defaultBrowserContext();
	// const context = await browser.createIncognitoBrowserContext();
	await context.overridePermissions(config.url.tinder, ["geolocation"]);
	const page: puppeteer.Page = await context.newPage();
	return page;
}
