export async function POST() {
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
}
