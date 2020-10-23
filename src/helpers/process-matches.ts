import puppeteer from "puppeteer";
import { TinderProfile } from "./@types/tinder";
import { waitAndClick } from "./wait-and-click";

const state = {
	matchesToProcess: 9, // default, based on Tinder UI chunks
	storage: [] as any[],
};

export async function processMatches(page: puppeteer.Page, amount?: number) {
	if (amount) {
		state.matchesToProcess = amount;
	}

	// remove "likes-you" match from match per group counter
	// this makes sure to subtract one from the first group
	// in case we plan to delete groups (of nine matches per)
	page
		.waitForSelector(`a[href="/app/likes-you"]`)
		.then(() => --state.matchesToProcess)
		.catch((e) => {});

	// ATTACH PAGE HANDLERS
	page.on("error", (error) => console.error(error));
	page.on("console", (message) => console.log(message.text()));
	page.on("requestfinished", async (request) => {
		if (request.url().includes("https://api.gotinder.com/user/")) {
			await userDataReceived(request, page);
		}
	});

	// START THE CHAIN REACTION
	await waitAndClick(`a[href*="/app/messages/"]`, page);
}

async function userDataReceived(request: puppeteer.Request, page: puppeteer.Page) {
	// PROMISFY ME
	console.log(`requestfinished: `, request.url());
	const profile = await parseFromNetworkRequest(request);
	state.storage.push(profile);
	const userID = profile._id;
	console.log({ state });

	if (--state.matchesToProcess > 0) {
		// theres still more matches in the group
		await page.evaluate((id) => {
			const match = document.querySelector(`a[href*="${id}"]`) as any;
			match.href = "#scraped"; // so it wont get selected in the next line of code
			const nextMatch = document.querySelector(`a[href*="/app/messages/"]`) as any;
			nextMatch.click();
		}, userID);
	} else {
		// THIS WOULD BE PROMISE RESOLVE

		// theres no more matches in the group
		// console.log(JSON.stringify(database, null, "  "));
		console.log(state.storage);
		state.storage = [];
		// return await page.evaluate((id) => {
		// const match = document.querySelector(`a[href*="#scraped"]`) as any;
		// match.parentElement.parentElement.removeChild(match.parentElement); // remove match group!
		// const nextMatch = document.querySelector(`a[href*="/app/messages/"]`) as any;
		// nextMatch.click();
		// }, userID);
	}
}

async function parseFromNetworkRequest(request: puppeteer.Request): Promise<TinderProfile> {
	// const noQueryURL = request.url().split("?").shift() as string;
	// const userID = noQueryURL.split("/").pop() as string;
	const { results } = (await request.response()?.json()) as {
		status: number;
		results: TinderProfile;
	};
	return results;
	// storage.push(USER.results);
	// return userID;
}
