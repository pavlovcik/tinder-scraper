type NeedsMoreResearch = unknown[] | undefined;
export interface TinderProfile {
	common_friends: NeedsMoreResearch[];
	common_friend_count: number;
	distance_mi: number;
	connection_count: number;
	common_connections: NeedsMoreResearch[];
	bio: string;
	birth_date: string;
	name: string;
	jobs: NeedsMoreResearch[];
	schools: NeedsMoreResearch[];
	teasers: NeedsMoreResearch[];
	gender: number;
	show_gender_on_profile: boolean;
	birth_date_info: string;
	ping_time: string;
	badges: NeedsMoreResearch[];
	photos: NeedsMoreResearch[];
	common_likes: unknown[];
	common_like_count: 0;
	common_interests: unknown[];
	s_number: number;
	_id: string;
	is_tinder_u: false;
}
