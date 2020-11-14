import puppeteer from "puppeteer";
import { FakeLocation, TinderProfile } from "../@types/tinder";
import { waitAndClick } from "../wait-and-click";
import { determineIfMessage, switchToMessagesView, userDataReceived } from "./process-matches-helpers";

export const state = {
	matchesToProcess: 9, // default, based on Tinder UI chunks
	storage: [] as TinderProfile[],
	view: "matches" as "matches" | "messages",
};

export async function processMatches(page: puppeteer.Page, amount?: number, location?: FakeLocation): Promise<TinderProfile[]> {
	if (amount) {
		state.matchesToProcess = amount;
	}
	if (location) {
		await page.setGeolocation(location);
	}

	return new Promise(async (resolve, reject) => {
		page
			// REMOVE "LIKES-YOU" MATCH FROM MATCH PER GROUP COUNTER
			.waitForSelector(`a[href="/app/likes-you"]`)
			.then(() => --state.matchesToProcess) // THIS MAKES SURE TO SUBTRACT ONE FROM THE FIRST GROUP
			// IN CASE WE PLAN TO DELETE GROUPS (OF NINE MATCHES PER)
			.catch((e) => {});

		// ATTACH PAGE HANDLERS
		page.on("error", errorHandler(reject));
		page.on("console", (message) => console.log(message.text()));
		await page.setRequestInterception(true);
		page.on("request", requestHandler());
		page.on("requestfinished", requestFinishedHandler(page, resolve));
		page.on("requestfailed", requestFailedHandler(page, resolve));
		// START THE CHAIN REACTION
		return await waitAndClick(`a[href*="/app/messages/"]`, page);
	});
}

function errorHandler(reject: (reason?: any) => void): (e: Error, ...args: any[]) => void {
	return (error) => {
		console.error(error);
		reject(error);
	};
}

function requestHandler(): (e: puppeteer.Request, ...args: any[]) => void {
	return (request) => {
		if (["image", "stylesheet", "font"].indexOf(request.resourceType()) !== -1) {
			request.respond({
				status: 200,
			});
			// request.abort();
		} else {
			request.continue();
		}
	};
}

function requestFinishedHandler(page: puppeteer.Page, resolve: (value: TinderProfile[]) => void): (e: puppeteer.Request, ...args: any[]) => void {
	return async (request) => {
		if (state.view === "matches") {
			const element = await page.waitForSelector(`a[href*="/app/messages/"]`);
			const isMessage = await determineIfMessage(element);

			if (isMessage) {
				await switchToMessagesView(element, page);
			}

			// await page.click(`a[href*="/app/messages/"]`); // handled in "resolve"
		}

		if (request.url().includes("https://api.gotinder.com/user/")) {
			const userData = await userDataReceived(request, page);
			return resolve(userData);
		}
	};
}
function requestFailedHandler(page: puppeteer.Page, resolve: (value: TinderProfile[]) => void) {
	// : (e: puppeteer.Request, ...args: any[]) => void
	return async (request: puppeteer.Request) => {
		if (request.url().includes("https://api.gotinder.com/user/")) {
			console.warn(`> request failed handler...skipping`);
			// 		const userData = await userDataReceived(request, page);
			// 		return resolve(userData);
		}
		// console.log({ request });

		// 	if (state.view === "matches") {
		// 		const element = await page.waitForSelector(`a[href*="/app/messages/"]`);
		// 		const isMessage = await determineIfMessage(element);

		// 		if (isMessage) {
		// 			await switchToMessagesView(element, page);
		// 		}

		// 		// await page.click(`a[href*="/app/messages/"]`); // handled in "resolve"
		// 	}
	};
}
