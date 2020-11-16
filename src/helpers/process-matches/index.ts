import puppeteer from "puppeteer";
import { MockLocation, StateStorage, TinderProfile } from "../@types/tinder";
import { waitAndClick } from "../wait-and-click";
import { isItMessage, switchToMessagesView, userDataReceived } from "./process-matches-helpers";

export const state = {
	matchesToProcess: 9, // default, based on Tinder UI chunks
	storage: {} as StateStorage,
	view: "matches" as "matches" | "messages",
};

// process.on("beforeExit", console.trace);
// process.on("disconnect", console.trace);
// process.on("exit", console.trace);
process.on("rejectionHandled", console.trace);
process.on("uncaughtException", console.trace);
process.on("uncaughtExceptionMonitor", console.trace);
process.on("unhandledRejection", console.error);
// process.on("warning", console.trace);
process.on("message", console.trace);
// process.on("newListener", console.trace);
// process.on("removeListener", console.trace);
// process.on("multipleResolves", console.trace);

export async function tinderScraper(page: puppeteer.Page, amount?: number, location?: MockLocation): Promise<TinderProfile[]> {
	if (amount) {
		state.matchesToProcess = amount;
	}
	if (location) {
		await page.setGeolocation(location);
	}
	try {
		return new Promise(processor(page));
	} catch (scraperError) {
		console.error({ scraperError });
		throw scraperError;
	}
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
		// page.on("error", errorHandler(reject));
		page.on("error", (error) => console.error(error));
		page.on("console", (message) => console.log(message.text()));
		// ATTACH PAGE REQUEST HANDLERS
		await page.setRequestInterception(true);
		page.on("request", blackListResourceTypes());
		page.on("requestfinished", requestFinishedHandler(page, resolve));
		page.on("requestfailed", (request) => requestFailedHandler(request, page));
		// START THE CHAIN REACTION
		await waitAndClick(`a[href*="/app/messages/"]`, page, true);
	};
}

// function errorHandler(reject: (reason?: any) => void): (e: Error, ...args: any[]) => void {
// 	return (error) => {
// 		console.error(error);
// 		reject(error);
// 	};
// }

function blackListResourceTypes(): (e: puppeteer.Request, ...args: any[]) => void {
	return function blacklist(request) {
		// | "document" | "stylesheet" | "image" | "media" | "font" | "script" | "texttrack" | "xhr" | "fetch" | "eventsource" | "websocket" | "manifest" | "other";
		if (["document", "script", "xhr", "fetch", "websocket"].indexOf(request.resourceType()) !== -1) {
			request.continue();
		} else {
			request.respond({ status: 200 });
		}
	};
}

function requestFinishedHandler(page: puppeteer.Page, resolve?: Function): (e: puppeteer.Request, ...args: any[]) => void {
	return async function requestFinished(request: puppeteer.Request) {
		if (request.url().includes("https://api.gotinder.com/user/")) {
			if (state.view === "matches") {
				// THIS IS ONLY NEEDED TO CHECK IF WE PROCESSED ALL NON MESSAGE LINKS
				const element = await page.waitForSelector(`a[href*="/app/messages/"]`);
				const isMessage = await isItMessage(element);
				if (isMessage) {
					return await switchToMessagesView(state, page);
				}
			}

			if (request.response()?.status() === 500) {
				debugger;
				console.trace();
				state.storage = await userDataReceived(request, page);
				return resolve && resolve(state.storage); // exit loop and return to cli
			}

			if (request.response()?.status() === 200) {
				// must be 200 OK
				// try {
				state.storage = await userDataReceived(request, page);
				return resolve && resolve(state.storage); // exit loop and return to cli
				// return resolve();
				// } catch (e) {
				// console.error(`caught error on userDataReceived(request, page)`, e);
				// return reject(); // reject breaks the program cause its not caught in parent fn rn
				// }
			}
		}
	};
}
function requestFailedHandler(request: puppeteer.Request, page: puppeteer.Page) {
	console.error(`network issue e.g. DNS resolution failed, there's not network at all, network connection got interrupted etc.`);
	console.error(request);
	requestFinishedHandler(page);
}
