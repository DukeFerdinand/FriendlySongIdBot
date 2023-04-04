import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

interface TwitchJwtPayload {
	access_token: string;
	expires_in: number;
	id_token: string;
	refresh_token: string;
	scope: [string];
	token_type: string;
	iat: number;
	exp: number;
	iss: 'twitch';
}

interface TwitchIdObject {
	aud: string;
	exp: number;
	iat: number;
	iss: string;
	sub: string;
	picture: string;
	preferred_username: string;
}

export const load = (event: ServerLoadEvent) => {
	const platformJwt = event.cookies.get('platform_jwt');

	if (!platformJwt) {
		throw redirect(302, '/');
	}

	const twitchData = jwt.verify(platformJwt, JWT_SECRET) as TwitchJwtPayload;

	// parse base64 encoded id_token
	const idObject: TwitchIdObject = JSON.parse(
		Buffer.from(twitchData.id_token.split('.')[1], 'base64').toString()
	);

	return {
		idObject
	};
};
