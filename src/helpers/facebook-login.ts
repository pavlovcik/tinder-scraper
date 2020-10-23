import puppeteer from "puppeteer";
import config from "../puppeteer-config";

export async function facebookLogin(page: puppeteer.Page) {
	await page.goto(config.url.login, { waitUntil: "networkidle2" });
	await page.type(`#email`, config.credentials.email);
	await page.type(`#pass`, config.credentials.password);
	await page.keyboard.press("Enter");
	await page.waitForNavigation();
	await page.goto(config.url.tinder, { waitUntil: "networkidle2" });
}
