import pAll from "p-all";
import puppeteer from "puppeteer";
import "source-map-support/register";
import { browserSetup } from "./helpers/browser-setup";
import { facebookLogin } from "./helpers/facebook-login";
import { processMatches } from "./helpers/process-matches";
import { tinderLogin } from "./helpers/tinder-login";
import { waitAndClick } from "./helpers/wait-and-click";

process.on("unhandledRejection", console.error);

(async function main() {
	const page: puppeteer.Page = await browserSetup();
	await facebookLogin(page);
	await tinderLogin(page);

	await processMatches(page, 2).catch(async (e) => {
		// in case its not cached settings, must handle here.
		await tinderMandetoryPrefs(page);
		await processMatches(page, 2);
	});
})();

async function tinderMandetoryPrefs(page: puppeteer.Page) {
	const ALLOW_LOCATION = `//*[@id="modal-manager"]/div/div/div/div/div[3]/button[1]`;
	const NOTIFICATIONS = `//*[@id="content"]/div/div[2]/div/div/div[2]/button`;

	await pAll([() => waitAndClick(ALLOW_LOCATION, page).catch(() => console.log(`...allow location ok`)), () => waitAndClick(NOTIFICATIONS, page).catch(() => console.log(`...allow notifications ok`))]);
}
