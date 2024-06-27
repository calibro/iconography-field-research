<script>
	import {
		currProject,
		setProjectIds,
		setProjectLinks,
		step
	} from '$lib/projectStore';
	import { get } from 'svelte/store';
	import { isValidDBUrl } from '$lib/utils';
	import { untrack } from 'svelte';

	let objects = $state(null);
	let parsedObjects = $state([]);

	const parseObjects = () => {
		if ($state.is(objects, null)) return;
		let lines = objects.split('\n');
		untrack(() => {
			for (let line of lines) {
				let validatedUrl = { value: line, valid: false };
				if (isValidDBUrl(line)) validatedUrl.valid = true;
				parsedObjects.push(validatedUrl);
			}
		});
	};

	const selectImages = () => {
		let objIds = parsedObjects.filter((d) => d.valid).map((d) => d.value.split('/').pop());
		setProjectIds(objIds);
		setProjectLinks(objects);
		step.set('editObjects');
	};

	$effect(() => {
		parseObjects();
		return () => {
			parsedObjects = [];
		};
	});

	$effect(() => {
		let currP = get(currProject);
		console.log('currP', currP);
		if (currP && currP.links) objects = currP.links;
	});
</script>

<h1 class="text-3xl font-bold mb-4">Object selection</h1>
<p class="mb-2">
	Paste here the links to the objects you want to print for your research. Paste one URL per row.
	</p>
	<p class="mb-8">
	Only URLs of objects in the Digital Benin Catalogue are accepted (es:
	https://digitalbenin.org/catalogue/110_1952644)
</p>

<div class="proj-obj-list mb-4">
	<textarea
		class="w-full h-80 outline outline-1 outline-light-gray p-2"
		id="objects"
		name="objects"
		placeholder="paste a list of Digital Benin objects here, each one on a new line"
		bind:value={objects}
	></textarea>
	<!--
	{#each parsedObjects as object}
		<p class:valid={object.valid}>{object.value}</p>
	{/each}
-->
</div>

<button class="btn btn-primary" onclick={() => selectImages()}>Next</button>

<style>
	.valid {
		color: green;
	}
</style>
