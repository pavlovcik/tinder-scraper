export interface InstagramProfile {
	last_fetch_time: string;
	completed_initial_fetch: boolean;
	photos: InstagramProfilePhoto[];
	media_count: number;
	username: "Tinder";
}
interface InstagramProfilePhoto {
	image: string;
	thumbnail: string;
	ts: string;
}

export interface TinderProfile {
	_id: string;
	badges: Badge[];
	bio: string;
	birth_date_info: string;
	birth_date: string;
	city: { name: string };
	common_connections: NeedsMoreResearch[];
	common_friend_count: number;
	common_friends: NeedsMoreResearch[];
	common_interests: unknown[];
	common_like_count: number;
	common_likes: unknown[];
	connection_count: number;
	distance_mi: number;
	gender: number;
	is_tinder_u: false;
	is_travelling: boolean;
	jobs: Job[];
	name: string;
	photos: TinderProfilePhoto[];
	ping_time: string;
	s_number: number;
	schools: NeedsMoreResearch[];
	show_gender_on_profile: boolean;
	spotify_theme_track: unknown;
	teasers: NeedsMoreResearch[];
	user_interests: { selected_interests: Interest[] } | any;
	instagram: InstagramProfile;
}

type NeedsMoreResearch = unknown[] | undefined | any; // FIXME had to add "any" temporarily

interface MatchPhotoProcessedFile {
	url: string;
	height: number;
	width: number;
}

export interface Interest {
	id: string;
	name: string;
}

export interface TinderProfilePhoto {
	id: string;
	crop_info: {
		user: {
			width_pct: number;
			x_offset_pct: number;
			height_pct: number;
			y_offset_pct: number;
		};
		algo: {
			width_pct: number;
			x_offset_pct: number;
			height_pct: number;
			y_offset_pct: number;
		};
		processed_by_bullseye: boolean;
		user_customized: boolean;
	};
	url: string;
	processedFiles: MatchPhotoProcessedFile[];
	fileName: string;
	extension: string;
}
interface Job {
	title: {
		name: string;
	};
}
interface Badge {
	type: string;
}

export interface FakeLocation {
	latitude: number;
	longitude: number;
}
export interface TinderResponse {
	status: number;
	results: TinderProfile;
}
