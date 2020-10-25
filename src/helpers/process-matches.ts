import puppeteer from "puppeteer";
import { TinderProfile } from "./@types/tinder";
import { waitAndClick } from "./wait-and-click";
interface TinderResponse {
	status: number;
	results: TinderProfile;
}

const state = {
	matchesToProcess: 9, // default, based on Tinder UI chunks
	storage: [] as TinderProfile[],
	view: "matches" as "matches" | "messages",
};

export async function processMatches(page: puppeteer.Page, amount?: number): Promise<TinderProfile[]> {
	return new Promise(async (resolve, reject) => {
		if (amount) {
			state.matchesToProcess = amount;
		}

		page
			// remove "likes-you" match from match per group counter
			.waitForSelector(`a[href="/app/likes-you"]`)
			.then(() => --state.matchesToProcess) // this makes sure to subtract one from the first group
			// in case we plan to delete groups (of nine matches per)
			.catch((e) => {});

		// ATTACH PAGE HANDLERS
		page.on("error", (error) => {
			console.error(error);
			reject(error); // REJECT
		});
		page.on("console", (message) => console.log(message.text()));

		await page.setRequestInterception(true);
		page.on("request", (request) => {
			if (["image", "stylesheet", "font"].indexOf(request.resourceType()) !== -1) {
				request.respond({
					status: 200,
					// body: "foo"
				});
				// request.abort();
			} else {
				request.continue();
			}
		});

		page.on("requestfinished", async (request) => {
			if (state.view === "matches") {
				const element = await page.waitForSelector(`a[href*="/app/messages/"]`);

				const isMessage = await determineIfMessage(element);
				if (isMessage) {
					await switchToMessagesView(element, page);
				}

				// await page.click(`a[href*="/app/messages/"]`); // handled in "resolve"
			}

			if (request.url().includes("https://api.gotinder.com/user/")) {
				return resolve(await userDataReceived(request, page));
			}
		});

		// START THE CHAIN REACTION
		return await waitAndClick(`a[href*="/app/messages/"]`, page);
	});
}

async function switchToMessagesView(element: puppeteer.ElementHandle<Element>, page: puppeteer.Page) {
	await waitAndClick(`//*[@id="content"]/div/div[1]/div/aside/nav/div/div/div/div[1]/div/div[2]`, page); // open "messages" view
	state.view = "messages";
	console.log(`switched to "messages" view`);
}

async function determineIfMessage(element: puppeteer.ElementHandle<Element>) {
	return await element.evaluate((e) => {
		if (e.innerHTML.includes(`messageListItem__message`)) {
			return true;
		} else {
			return false;
		}
	});
}

async function userDataReceived(request: puppeteer.Request, page: puppeteer.Page): Promise<TinderProfile[]> {
	return new Promise(async (resolve, reject) => {
		console.log(`requestfinished: `, request.url(), request.response()?.status());

		const response = await parseFromNetworkRequest(request); // FIXME signal if 403

		let profile;
		let userID;

		if (response.status !== 200) {
			// implicit 403 handler
			console.warn(`REQUEST NOT OK: `, request.url());
		} else {
			profile = response.results;
			state.storage.push(profile); //	save
			userID = profile._id;
		}

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
	const success = await page.evaluate((id?: string) => {
		if (id) {
			const match = document.querySelector(`a[href*="${id}"]`) as any;
			match.href = "#scraped"; // so it wont get selected in the next line of code
		}
		try {
			const nextMatch = document.querySelector(`a[href*="/app/messages/"]`) as any;
			nextMatch.click();
			return true;
		} catch (e) {
			return false;
		}
	}, userID || false);

	if (!success) {
		console.log("might be done scraping");
		console.log("amount requested higher than whats available");
		console.log(`checking back in "matches" view`);

		await waitAndClick(`#match-tab`, page);
		await page.evaluate(scrollToBottoms);
		try {
			await waitAndClick(`a[href*="/app/messages/"]`, page);
		} catch (e) {
			return true;
		}
	}
}

function scrollToBottoms() {
	try {
		const matchListNoMessages = document.getElementById(`matchListNoMessages`);
		// @ts-ignore
		matchListNoMessages?.scrollTop = matchListNoMessages?.lastChild.getClientRects()[0].top;
	} catch (e) {
		console.error(e);
	}
	try {
		const matchListWithMessages = document.getElementById(`matchListWithMessages`);
		const matchListWithMessagesList = matchListWithMessages?.getElementsByClassName(`messageList`)[0];
		// @ts-ignore
		matchListWithMessages?.scrollTop = matchListWithMessagesList?.lastChild.getClientRects()[0].top;
	} catch (e) {
		console.error(e);
	}
}

async function parseFromNetworkRequest(request: puppeteer.Request): Promise<TinderResponse> {
	// const noQueryURL = request.url().split("?").shift() as string;
	// const userID = noQueryURL.split("/").pop() as string;
	// const { results } =
	return (await request.response()?.json()) as TinderResponse;
	// storage.push(USER.results);
	// return userID;
}
