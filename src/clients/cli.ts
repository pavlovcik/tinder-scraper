import { MockLocation, TinderProfile } from "../helpers/@types/tinder";
import { main } from "../puppeteer-entry";
interface IPC {
	export: TinderProfile[];
}
export async function cli() {
	const arg = process.argv[2];

	if (arg?.includes("help")) {
		console.log(`
	TINDER SCRAPER

		you can pass in how many matches you want to export.
		argument is an integer, or you can write "all"
	`);
		process.exit(0);
	} else {
		let ipc: IPC;

		const args = require("minimist")(process.argv.slice(2));

		let location;
		const latitude = args["latitude"] || args["lat"] || process.env["LATITUDE"];
		const longitude = args["longitude"] || args["long"] || process.env["LONGITUDE"];
		if (latitude && longitude) {
			location = { latitude, longitude } as MockLocation;
		}

		if (arg == "infinity" || arg == "all") {
			ipc = await main(Infinity, location);
		} else {
			let amount = parseInt(arg);
			if (isNaN(amount)) {
				throw new Error(`couldn't parse argument into amount to scrape`);
			}

			ipc = await main(amount, location);
		}

		return ipc.export;
	}
}
