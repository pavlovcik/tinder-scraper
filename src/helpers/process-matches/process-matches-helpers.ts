import puppeteer from "puppeteer";
import { TinderProfile, TinderResponse } from "../@types/tinder";
import { waitAndClick } from "../wait-and-click";
import { state } from "./index";

export async function switchToMessagesView(element: puppeteer.ElementHandle<Element>, page: puppeteer.Page) {
	await waitAndClick(`//*[@id="content"]/div/div[1]/div/aside/nav/div/div/div/div[1]/div/div[2]`, page); // open "messages" view
	state.view = "messages";
	console.log(`switched to "messages" view`);
}
export async function determineIfMessage(element: puppeteer.ElementHandle<Element>) {
	return await element.evaluate((e) => {
		if (e.innerHTML.includes(`messageListItem__message`)) {
			return true;
		} else {
			return false;
		}
	});
}
export async function userDataReceived(request: puppeteer.Request, page: puppeteer.Page): Promise<TinderProfile[]> {
	return new Promise(async (resolve: (value: TinderProfile[]) => void) => {
		console.log(`userDataReceived: `, request.url(), request.response()?.status());

		let profile;
		let userID;

		if (request.response()?.status() !== 200) {
			console.warn(`REQUEST NOT OK: `, request.url());
			console.trace();
			return;
			// profile = response;
		}
		const response = await parseFromNetworkRequest(request);
		// else {
		profile = response.results;
		state.storage.push(profile); //	save
		userID = profile._id;
		// }

		await page.evaluate(scrollToBottoms);

		if (--state.matchesToProcess > 0) {
			// theres still more matches in the group
			const doneScraping = await continueScraping(page, userID);
			if (doneScraping) {
				return resolve(state.storage);
			}
		} else {
			return resolve(state.storage);
		}
	});
}

async function continueScraping(page: puppeteer.Page, userID?: string) {
	const success = await page.evaluate(innerPageScrape(), userID || false);

	if (!success) {
		console.log(`switching to "matches" view`);
		await waitAndClick(`#match-tab`, page);
		await page.evaluate(scrollToBottoms);
		try {
			await waitAndClick(`a[href*="/app/messages/"]`, page);
		} catch (e) {
			return true;
		}
	}

	function innerPageScrape(): (id?: string | undefined) => boolean {
		return (id?: string) => {
			if (id) {
				const match = document.querySelector(`a[href*="${id}"]`) as any;
				if (match) {
					match.href = "#scraped"; // so it wont get selected in the next line of code
				} else {
					console.error(`Unexpected: no anchor to current id ${id}`);
				}
			}
			try {
				const nextMatch = document.querySelector(`a[href*="/app/messages/"]`) as any;
				nextMatch.click();
				return true;
			} catch (e) {
				return false;
			}
		};
	}
}
function scrollToBottoms() {
	try {
		const matchListNoMessages = document.getElementById(`matchListNoMessages`);
		matchListNoMessages?.scrollBy(0, window.innerHeight);
	} catch (e) {
		console.error(e);
	}
	try {
		const matchListWithMessages = document.getElementById(`matchListWithMessages`);
		matchListWithMessages?.scrollBy(0, window.innerHeight);
	} catch (e) {
		console.error(e);
	}
}

async function parseFromNetworkRequest(request: puppeteer.Request): Promise<TinderResponse> {
	const response = request.response() as puppeteer.Response;
	return (await response.json()) as TinderResponse;
	// try {
	// 	const json = () as TinderResponse;
	// 	console.log(json);
	// 	return json;
	// } catch (e) {
	// 	const string = await response.text();
	// 	console.log({ string });
	// 	// @ts-ignore
	// 	return { status: response.status(), results: string };
	// }
}
