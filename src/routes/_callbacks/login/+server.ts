import { PUBLIC_TWITCH_CLIENT_ID } from '$env/static/public';
import { TWITCH_CLIENT_SECRET } from '$env/static/private';
import { TwitchClient } from '$lib/twitch';

const twitchClient = new TwitchClient(PUBLIC_TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET);

interface TwitchTokenResponse {
	code: string;
	scope: 'openid';
	token_type: 'bearer';
}

export async function POST({ request }) {
	const body: TwitchTokenResponse = await request.json();

	try {
		const authToken = await twitchClient.getAuthToken(body.code);
		console.log('authToken', authToken);

		return new Response(
			JSON.stringify({
				foo: 'bar'
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (e) {
		return new Response((e as Error).message, {
			status: 500
		});
	}
}
