const PRODUCTION = process.env.NODE_ENV === "production" || false; //  for toggle convenience
import path from "path";

let config = {
	screen: { width: 1280, height: 800 },
	production: PRODUCTION, // disable cache, disable images, disable styles
	url: {
		login: "https://facebook.com/login",
		tinder: "https://tinder.com/",
	},
	settings: {
		devtools: false,
		headless: true,
		// userDataDir: `./cache`,
		defaultViewport: null,
		args: ["--lang=en-US,en;q=0.9"] as any,
	},
	credentials: require(path.join(process.cwd(), "./credentials.json")) as { email: string; password: string },
};

config.settings.args = [`--window-size=${config.screen.width},${config.screen.height}`, `--disable-search-geolocation-disclosure`];

export default config;
