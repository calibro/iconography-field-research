<script>
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import StepsMenu from '$lib/StepsMenu.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<header class="w-full bg-secondary h-12 font-sans fixed top-0 left-0 z-10">
		<Header />
	</header>

	<main class="container mx-auto grid grid-cols-12 pt-28 font-sans grow-1">
		<div class="col-span-3 text-secondary">
			<StepsMenu />
		</div>
		<div class="col-span-9 text-secondary">
			<slot />
		</div>
	</main>

	<footer class="shrink-0">
		<Footer />
	</footer>
</div>
