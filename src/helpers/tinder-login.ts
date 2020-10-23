import puppeteer from "puppeteer";
import { waitAndClick } from "./wait-and-click";

export async function tinderLogin(page: puppeteer.Page) {
	const nodeDetachedHandler = async (error: Error) => {
		if (error.message.includes("Node is detached from document")) {
			// this error is so annoying!
			await page.reload();
			return await tinderLogin(page); // try again
		}
	};

	page.on("error", nodeDetachedHandler);

	const LOGIN = `//*[@id="content"]/div/div[1]/div/main/div[1]/div/div/header/div[1]/div[2]/div/button`;
	const LOGIN_WITH_FACEBOOK = `//*[@id="modal-manager"]/div/div/div[1]/div/div[3]/span/div[2]/button`;

	const COOKIES = `//*[@id="content"]/div/div[2]/div/div/div[1]/button`;
	const ACCEPT_ALL = `//*[@id="modal-manager"]/div/div/div/div[3]/div[1]/button`;

	await waitAndClick(COOKIES, page).catch(() => console.log(`...allow cookies ok`));

	await waitAndClick(LOGIN, page);
	await waitAndClick(LOGIN_WITH_FACEBOOK, page).catch(async () => await waitAndClick(LOGIN_WITH_FACEBOOK, page)); // try again
	console.log("waiting to login to tinder...");
	await page.waitForNavigation();
	console.log("logged into tinder!");

	page.removeListener("error", nodeDetachedHandler);
}
