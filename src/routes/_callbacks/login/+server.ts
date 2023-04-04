import jwt from 'jsonwebtoken';

import { PUBLIC_TWITCH_CLIENT_ID } from '$env/static/public';
import { TWITCH_CLIENT_SECRET, JWT_SECRET } from '$env/static/private';
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

		const platformJwt = jwt.sign(authToken, JWT_SECRET, {
			expiresIn: authToken.expires_in,
			issuer: 'twitch'
		});

		return new Response(
			JSON.stringify({
				redirect: true
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Set-Cookie': `platform_jwt=${platformJwt}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${authToken.expires_in}`
				}
			}
		);
	} catch (e) {
		return new Response((e as Error).message, {
			status: 500
		});
	}
}
