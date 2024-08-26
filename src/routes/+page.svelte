<script>
	import axios from 'axios';

	let loading = false;
	let focusInput = false;
	let searchParam = 'Hide On Bush';
	let data = {
		user: null,
		matches: []
	};
	async function getUser() {
		loading = true;
		await axios
			.post('/api/find', {
				username: searchParam
			})
			.then((res) => {
				data = res.data;
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});

		loading = false;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="w-full flex">
	<div class="w-1/2 2xl:w-1/3 flex bg-slate-500 items-center justify-center">
		<div
			class="border-2 rounded-lg flex text-xl overflow-hidden mb-6 bg-white"
			class:border-blue-300={focusInput}
		>
			<input
				on:focus={() => (focusInput = true)}
				bind:value={searchParam}
				class="p-4 focus:outline-none focus:border-gray-500"
				placeholder="아이디"
				disabled={loading}
			/>
			<button class="px-6" on:click={getUser} disabled={loading}>Search</button>
		</div>
	</div>
	<div class="w-1/2 2xl:w-2/3 bg-white p-5">
		{#if loading}
			<div class="flex flex-col gap-4 justify-center items-center w-full h-full">
				<div
					class="ease-linear rounded-full border-8 border-t-8 border-gray-400 h-32 w-32 animate-spin"
				>
					<svg
						class="animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				</div>
				<div>Loading ...</div>
			</div>
		{/if}
		{#if data?.user}
			<div class="flex flex-wrap gap-1 flex-1 w-full h-0 justify-center text-sm">
				{#each data?.matches as match}
					<div class="flex flex-col border rounded p-3">
						<div class="flex gap-1 justify-between border-b p-2">
							<div class="font-bold">{match.info.gameMode}</div>
							<div>
								<span>{new Date(match.info.gameEndTimestamp).toLocaleString()}</span>
								<span>({Math.round(match.info.gameDuration / 60)}분)</span>
							</div>
						</div>
						<div class="flex flex-col gap-1 p-2">
							{#each match.info.participants as participant}
								<div class="flex">
									<div
										class:text-blue-800={participant.win}
										class:text-red-500={!participant.win}
										class="w-8"
									>
										{participant.win ? '승' : '패'}
									</div>
									<div class:font-bold={participant.summonerName == data?.username} class="w-40">
										{participant.summonerName}
									</div>
									<div class="w-32 flex gap-1 items-align">
										<img
											class="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
											src={`https://lolg-cdn.porofessor.gg/img/d/champion-icons/14.16/64/${participant.championId}.png`}
										/>
										<div>{participant.championName}</div>
									</div>
									<div class="w-24 flex gap-1">
										<div class="w-8">{participant.kills}</div>
										/
										<div class="w-8">{participant.deaths}</div>
										/
										<div class="w-8">{participant.assists}</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	section {
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
