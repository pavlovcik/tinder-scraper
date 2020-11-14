import pAll from "p-all";
import puppeteer from "puppeteer";
import "source-map-support/register";
import { FakeLocation, TinderProfile } from "./helpers/@types/tinder";
import { browserSetup } from "./helpers/browser-setup";
import { facebookLogin } from "./helpers/facebook-login";
import { processMatches } from "./helpers/process-matches";
import { tinderLogin } from "./helpers/tinder-login";
import { waitAndClick } from "./helpers/wait-and-click";
process.on("unhandledRejection", console.error);

export async function main(howMany?: number, location?: FakeLocation) {
	const page: puppeteer.Page = await browserSetup();
	await facebookLogin(page);
	await tinderLogin(page);

	const envelope = { export: [] } as { export: TinderProfile[] };

	try {
		envelope.export = await processMatches(page, howMany, location);
	} catch (e) {
		await tinderMandetoryPrefs(page);
		envelope.export = await processMatches(page, howMany, location);
	}
	return envelope;
}

async function tinderMandetoryPrefs(page: puppeteer.Page) {
	const ALLOW_LOCATION = `//*[@id="modal-manager"]/div/div/div/div/div[3]/button[1]`;
	const NOTIFICATIONS = `//*[@id="content"]/div/div[2]/div/div/div[2]/button`;
	await pAll([() => waitAndClick(ALLOW_LOCATION, page).catch(() => console.log(`...allow location ok`)), () => waitAndClick(NOTIFICATIONS, page).catch(() => console.log(`...allow notifications ok`))]);
}
