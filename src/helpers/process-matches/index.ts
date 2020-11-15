import puppeteer from "puppeteer";
import { FakeLocation, StateStorage, TinderProfile } from "../@types/tinder";
import { waitAndClick } from "../wait-and-click";
import { isItMessage, switchToMessagesView, userDataReceived } from "./process-matches-helpers";

export const state = {
	matchesToProcess: 9, // default, based on Tinder UI chunks
	storage: {} as StateStorage,
	view: "matches" as "matches" | "messages",
};

export async function processMatches(page: puppeteer.Page, amount?: number, location?: FakeLocation): Promise<TinderProfile[]> {
	if (amount) {
		state.matchesToProcess = amount;
	}
	if (location) {
		await page.setGeolocation(location);
	}

	return new Promise(processor(page));
}

function processor(page: puppeteer.Page): (resolve: (value?: TinderProfile[]) => void, reject: (reason?: any) => void) => void {
	return async (resolve, reject) => {
		page
			// REMOVE "LIKES-YOU" MATCH FROM MATCH PER GROUP COUNTER
			.waitForSelector(`a[href="/app/likes-you"]`)
			.then(() => --state.matchesToProcess) // THIS MAKES SURE TO SUBTRACT ONE FROM THE FIRST GROUP
			// IN CASE WE PLAN TO DELETE GROUPS (OF NINE MATCHES PER)
			.catch((e) => {});

		// ATTACH PAGE CONSOLE HANDLERS
		page.on("error", errorHandler(reject));
		page.on("console", (message) => console.log(message.text()));
		// ATTACH PAGE REQUEST HANDLERS
		await page.setRequestInterception(true);
		page.on("request", requestHandler());
		page.on("requestfinished", requestFinishedHandler(page, resolve, reject));
		page.on("requestfailed", requestFailedHandler(page, resolve, reject));
		// START THE CHAIN REACTION
		await waitAndClick(`a[href*="/app/messages/"]`, page);
	};
}

function errorHandler(reject: (reason?: any) => void): (e: Error, ...args: any[]) => void {
	return (error) => {
		console.error(error);
		reject(error);
	};
}

function requestHandler(): (e: puppeteer.Request, ...args: any[]) => void {
	return function blacklist(request) {
		// | "document" | "stylesheet" | "image" | "media" | "font" | "script" | "texttrack" | "xhr" | "fetch" | "eventsource" | "websocket" | "manifest" | "other";
		if (["document", "script", "xhr", "fetch", "websocket"].indexOf(request.resourceType()) !== -1) {
			request.continue();
		} else {
			request.respond({ status: 200 });
		}
	};
}

function requestFinishedHandler(page: puppeteer.Page, resolve: Function, reject: Function): (e: puppeteer.Request, ...args: any[]) => void {
	return async function requestFinished(request: puppeteer.Request) {
		if (state.view === "matches") {
			// THIS IS ONLY NEEDED TO CHECK IF WE PROCESSED ALL NON MESSAGE LINKS
			const element = await page.waitForSelector(`a[href*="/app/messages/"]`);
			const isMessage = await isItMessage(element);
			if (isMessage) {
				await switchToMessagesView(state, page);
			}
		}
		if (request.url().includes("https://api.gotinder.com/user/")) {
			if (request.response()?.status() === 200) {
				// must be 200 OK
				try {
					state.storage = await userDataReceived(request, page);		return resolve(state.storage); // exit loop and return to cli
					// return resolve();
				} catch (e) {
					console.error(`caught error on userDataReceived(request, page)`, e);
					// return reject(); // reject breaks the program cause its not caught in parent fn rn
				}
			}
		}

	};
}
function requestFailedHandler(page: puppeteer.Page, resolve: { (value?: TinderProfile[] | undefined): void; (): void }, reject: (reason?: any) => void) {
	return (request: puppeteer.Request) => {
		console.error(`network issue e.g. DNS resolution failed, there's not network at all, network connection got interrupted etc.`);
	};
}
