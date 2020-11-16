import pAll from "p-all";
import puppeteer from "puppeteer";
import "source-map-support/register";
import { MockLocation, TinderProfile } from "./helpers/@types/tinder";
import { browserSetup } from "./helpers/browser-setup";
import { facebookLogin } from "./helpers/facebook-login";
import { tinderScraper } from "./helpers/process-matches";
import { tinderLogin } from "./helpers/tinder-login";
import { waitAndClick } from "./helpers/wait-and-click";

export async function main(howMany?: number, location?: MockLocation): Promise<{ export: TinderProfile[] }> {
	const page: puppeteer.Page = await browserSetup();
	await facebookLogin(page);
	await tinderLogin(page);
	return {
		export: await tinderScraper(page, howMany, location)
			.catch(async () => await tinderMandetoryPrefs(page))
			.finally(async () => await tinderScraper(page, howMany, location)),
	} as { export: TinderProfile[] };
}

async function tinderMandetoryPrefs(page: puppeteer.Page) {
	const ALLOW_LOCATION = `//*[@id="modal-manager"]/div/div/div/div/div[3]/button[1]`;
	const NOTIFICATIONS = `//*[@id="content"]/div/div[2]/div/div/div[2]/button`;
	await pAll([() => waitAndClick(ALLOW_LOCATION, page).catch(() => console.log(`...allow location ok`)), () => waitAndClick(NOTIFICATIONS, page).catch(() => console.log(`...allow notifications ok`))]);
}
