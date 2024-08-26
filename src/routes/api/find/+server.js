import { getAccount, getMatcheInfoList, getUserLastGame } from '$lib/riot';
import { json } from '@sveltejs/kit';
// import * as database from '$lib/server/database.js';

export async function POST({ request, cookies }) {
	const { username } = await request.json();
	if (!username) {
		return json({ error: 'Invalid username' }, { status: 400 });
	}

	const user = await getAccount(username);
	const matcheIds = await getUserLastGame(user.puuid);
	const matches = await getMatcheInfoList(matcheIds);

	// console.log(matches[0].info);
	return json({ username, user, matches }, { status: 200 });
}
