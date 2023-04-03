import { PUBLIC_TWITCH_CLIENT_ID } from '$env/static/public';
import { TwitchClient } from '$lib/twitch';

import type { PageLoad } from './$types';

const twitchClient = new TwitchClient(PUBLIC_TWITCH_CLIENT_ID);

export const load: PageLoad = async (page) => {
	// Get page URL host
	const host = page.url.host;
	const protocol = page.url.protocol;

	console.log('host', host);

	return {
		redirect: twitchClient.getAuthorizationUrl(`${protocol}//${host}/_callbacks/login`)
	};
};
