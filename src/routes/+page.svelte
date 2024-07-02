<script>
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import ProjectList from '$lib/ProjectList.svelte';
	import { step } from '$lib/projectstore';
	import { base } from '$app/paths';
	$effect(() => {
		step.set('init');
	});
</script>

<div class="flex flex-col min-h-screen">
	<header class="w-full bg-secondary h-12 font-sans fixed top-0 left-0 z-10">
		<Header />
	</header>

	<main class="font-sans grow-1">
		<div class="home-header w-full h-96 relative">
			<img
				src="{base}/home-bg.png"
				alt="Digital Benin background"
				class="w-full h-full object-cover brightness-50"
			/>
			<div
				class="home-text flex flex-col gap-6 container mx-auto pt-28 text-white absolute top-0 left-0 right-0"
			>
				<h1 class="text-3xl font-bold">Iconography printer tool</h1>
				<p class="max-w-5xl">
					Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Fusce dapibus,
					tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit
					amet risus. Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta
					gravida at eget metus.
				</p>

				<a href="{base}/project/new" class="btn btn-lg btn-primary">Create new project</a>
			</div>
		</div>
		<div class="container mx-auto mt-8">
			<ProjectList />
		</div>
	</main>

	<footer class="shrink-0">
		<Footer />
	</footer>
</div>
