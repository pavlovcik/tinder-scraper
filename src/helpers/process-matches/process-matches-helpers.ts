import puppeteer from "puppeteer";
import { FetchApiResponse } from "../@types/tinder";
import { waitAndClick } from "../wait-and-click";
import { state } from "./index";
import { streamer } from "./stream-to-fs";

export async function switchToMessagesView(_state: typeof state, page: puppeteer.Page) {
	await waitAndClick(`//*[@id="content"]/div/div[1]/div/aside/nav/div/div/div/div[1]/div/div[2]`, page); // open "messages" view
	_state.view = "messages";
	console.log(`switched to "messages" view`);
}

export async function isItMessage(element: puppeteer.ElementHandle<Element>) {
	return await element.evaluate((e) => {
		if (e.innerHTML.includes(`messageListItem__message`)) {
			return true;
		} else {
			return false;
		}
	});
}
export async function userDataReceived(request: puppeteer.Request, page: puppeteer.Page): Promise<typeof state.storage> {
	return new Promise(userDataReceivedInner);

	async function userDataReceivedInner(resolve: (value: typeof state.storage) => void) {
		console.log(`userDataReceived: `, request.url(), request.response()?.status());

		let userID: string;

		const parsed = await parseFromNetworkRequest(request)
		.catch(function parseFailure(reason) {
			console.trace({ reason });
		});

		if (parsed) {
			const { results } = parsed;
			state.storage[results._id] = results; //	save
			streamer(`./stream.json`, state.storage[results._id]);
			userID = results._id;
		}

		await page.evaluate(scrollToBottoms);

		if (--state.matchesToProcess > 0) {
			// theres still more matches in the group
			// @ts-ignore
			const doneScraping = await checkIfDoneScraping(page, userID);
			if (doneScraping) {
				return resolve(state.storage);
			}
		} else {
			return resolve(state.storage);
		}
	}
}

async function checkIfDoneScraping(page: puppeteer.Page, userID?: string) {
	const success = await page.evaluate(innerPageScrape(), userID || false);

	if (!success) {
		console.log(`switching to "matches" view`);
		await waitAndClick(`#match-tab`, page);
		// await page.evaluate(scrollToBottoms);
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
	document.getElementById(`matchListNoMessages`)?.scrollBy(0, window.innerHeight);
	document.getElementById(`matchListWithMessages`)?.scrollBy(0, window.innerHeight);
}

async function parseFromNetworkRequest(request: puppeteer.Request): Promise<FetchApiResponse> {
	const response = request.response() as puppeteer.Response;
	const parsed = (await response.json()) as Promise<FetchApiResponse>;
	return parsed;
}
