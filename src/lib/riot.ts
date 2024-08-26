import { Constants, LolApi, RiotApi } from 'twisted';

console.log(import.meta.env.VITE_RIOT_API_KEY);

const riotApi = new RiotApi({
	key: import.meta.env.VITE_RIOT_API_KEY
});
const lolApi = new LolApi({
	key: import.meta.env.VITE_RIOT_API_KEY
});

export async function getAccount(name: string, tag = 'KR1', region = Constants.Regions.KOREA) {
	// Recommended to use the nearest routing value to your server: americas, asia, europe
	const riotUser = (await riotApi.Account.getByRiotId(name, tag, Constants.RegionGroups.AMERICAS))
		.response;
	const lolUser = (await lolApi.Summoner.getByPUUID(riotUser.puuid, region)).response;
	console.log(lolUser);
	return lolUser;
}

export async function getActiveGame(puuid: string, region = Constants.Regions.KOREA) {
	const game = (await lolApi.SpectatorV5.activeGame(puuid, region)).response;
	return game;
}

export async function getUserLastGame(puuid: string, region = Constants.Regions.KOREA) {
	const game = (await lolApi.MatchV5.list(puuid, Constants.RegionGroups.ASIA, {})).response;
	return game;
}

export async function getMatcheInfoList(matchIds: string[], region = Constants.Regions.KOREA) {
	const matchInfos = await Promise.all(
		matchIds.map(async (matchId) => {
			const match = (await lolApi.MatchV5.get(matchId, Constants.RegionGroups.ASIA)).response;
			return match;
		})
	);
	return matchInfos;
}
