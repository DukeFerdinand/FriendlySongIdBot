import { PUBLIC_TWITCH_CLIENT_ID } from '$env/static/public';
import { TwitchClient } from '$lib/twitch';

import type { PageLoad } from './$types';

const twitchClient = new TwitchClient(PUBLIC_TWITCH_CLIENT_ID);

export const load: PageLoad = async () => {
	return {
		redirect: twitchClient.getAuthorizationUrl()
	};
};
