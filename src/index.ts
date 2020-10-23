import { cli } from "./clients/cli";
import fsp from "fs/promises";
import path from "path";

cli()
	.then(async (data) => {
		const filepath = path.join(process.cwd(), "export.json");
		await fsp.writeFile(filepath, JSON.stringify(data), "utf8");
		process.exit(0);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
