<script lang="ts">
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import '../app.css';
</script>

<div class="layout">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	main {
		display: flex;
		flex: 1;
		min-height: 0;
		width: 100%;
	}
</style>
