import { PUBLIC_LOGING_REDIRECT_URL } from '$env/static/public';

enum TwitchUrls {
	Authorize = 'https://id.twitch.tv/oauth2/authorize',
	GetAuthToken = 'https://id.twitch.tv/oauth2/token'
}

export class TwitchClient {
	constructor(private readonly clientId: string, private readonly clientSecret: string = '') {}

	public getAuthorizationUrl() {
		return (
			TwitchUrls.Authorize +
			`?client_id=${this.clientId}` +
			`&redirect_uri=${PUBLIC_LOGING_REDIRECT_URL}` +
			`&response_type=code` +
			`&scope=openid` +
			`&claims={"id_token":{"picture":null,"preferred_username":null}}`
		);
	}

	public async getAuthToken(code: string) {
		if (!this.clientSecret) {
			throw new Error('Client secret is required to get auth token');
		}

		const url =
			TwitchUrls.GetAuthToken +
			`?client_id=${this.clientId}` +
			`&client_secret=${this.clientSecret}` +
			`&code=${code}` +
			`&grant_type=authorization_code` +
			`&redirect_uri=${PUBLIC_LOGING_REDIRECT_URL}`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'www-form-urlencoded'
			}
		});

		if (response.status !== 200) {
			console.error(await response.text());
			throw new Error('Failed to get auth token');
		}

		return response.json();
	}
}
