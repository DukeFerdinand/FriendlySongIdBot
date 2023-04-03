export class TwitchClient {
	constructor(private readonly clientId: string) {}

	public getAuthorizationUrl(redirectUri: string) {
		console.log('redirectUri', redirectUri);
		return (
			`https://id.twitch.tv/oauth2/authorize` +
			`?client_id=${this.clientId}` +
			`&redirect_uri=${redirectUri}` +
			`&response_type=token+id_token` +
			`&scope=openid` +
			`&claims={"id_token":{"picture":null,"preferred_username":null}}`
		);
	}
}
