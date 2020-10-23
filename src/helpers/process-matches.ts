import puppeteer from "puppeteer";
import { TinderProfile } from "./@types/tinder";
import { waitAndClick } from "./wait-and-click";

const database = [] as any[];

const state = {
	matchesPerMatchGroup: 9, // default, based on Tinder UI chunks
};

export async function processMatches(page: puppeteer.Page, amount?: number) {
	if (amount) {
		state.matchesPerMatchGroup = amount;
	}

	// remove likes-you fake match from match per group counter
	page // this makes sure to subtract one from the first group in case we plan to delete groups (of nine matches per)
		.waitForSelector(`a[href="/app/likes-you"]`)
		.then(() => --state.matchesPerMatchGroup)
		.catch((e) => {});

	// ATTACH PAGE HANDLERS
	page.on("error", (error) => console.error(error));
	page.on("console", (message) => console.log(message.text()));
	page.on("requestfinished", async (request) => {
		if (request.url().includes("https://api.gotinder.com/user/")) {
			await userDataReceived(request, page);
		}
	});

	// START CHAIN REACTION
	await waitAndClick(`a[href*="/app/messages/"]`, page);
}

async function userDataReceived(request: puppeteer.Request, page: puppeteer.Page) {
	// PROMISFY ME
	console.log(`requestfinished: `, request.url());
	const userID = await processSingle(request, database);
	console.log({ state });

	if (--state.matchesPerMatchGroup > 0) {
		// theres still more matches in the group
		await page.evaluate((id) => {
			const match = document.querySelector(`a[href*="${id}"]`) as any;
			match.href = "#scraped"; // so it wont get selected in the next line of code
			const nextMatch = document.querySelector(`a[href*="/app/messages/"]`) as any;
			nextMatch.click();
		}, userID);
	} else {
		// theres no more matches in the group
		// console.log(JSON.stringify(database, null, "  "));
		console.log(database);
		// return await page.evaluate((id) => {
		// const match = document.querySelector(`a[href*="#scraped"]`) as any;
		// match.parentElement.parentElement.removeChild(match.parentElement); // remove match group!
		// const nextMatch = document.querySelector(`a[href*="/app/messages/"]`) as any;
		// nextMatch.click();
		// }, userID);
	}
}

async function processSingle(request: puppeteer.Request, storage: unknown[]) {
	const noQueryURL = request.url().split("?").shift() as string;
	const userID = noQueryURL.split("/").pop() as string;
	const USER = (await request.response()?.json()) as {
		status: number;
		results: TinderProfile;
	};
	storage.push(USER.results);
	return userID;
}
