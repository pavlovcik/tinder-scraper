import fs from "fs/promises";
import { StateStorage, TinderProfile } from "../@types/tinder";
export async function streamer(destination: string, appendData: TinderProfile) {
	try {
		const _buffer = await fs.readFile(destination, `utf8`);
		let buffer = JSON.parse(_buffer) as StateStorage;
		buffer[appendData._id] = appendData;
		await fs.writeFile(destination, JSON.stringify(buffer));
	} catch (error) {
		const output = { [appendData._id]: appendData };
		let stringOut = JSON.stringify(output);
		await fs.writeFile(destination, stringOut);
	}
}
