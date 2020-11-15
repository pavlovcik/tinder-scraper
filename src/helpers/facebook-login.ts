import puppeteer from "puppeteer";
import config from "../puppeteer-config";
import { waitAndClick } from "./wait-and-click";

export async function facebookLogin(page: puppeteer.Page) {
	await page.goto(config.url.login, { waitUntil: "networkidle2" });
	await page.type(`#email`, config.credentials.email);
	await page.type(`#pass`, config.credentials.password);
	await page.keyboard.press("Enter");
	await page.waitForNavigation();
	try {
		await waitAndClick(`//*[@id="checkpointSubmitButton"]`, page);
		await page.waitForNavigation();
	} catch (e) {}
	await page.goto(config.url.tinder, { waitUntil: "networkidle2" });
}
