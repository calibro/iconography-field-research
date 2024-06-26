<script>
	import { currProject, saveProject, setProjectIds, setProjectLinks, step } from '$lib/projectStore';
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
		console.log("currP", currP)
		if(currP && currP.links) objects = currP.links;
	});

</script>

<h3>{$currProject?.name}</h3>
<p>{$currProject?.description}</p>

<div class="proj-obj-list">
	<label for="objects">Objects:</label>
	<textarea
		class="w-160 h-80"
		id="objects"
		name="objects"
		placeholder="paste a list of Digital Benin objects here, each one on a new line"
		bind:value={objects}
	></textarea>

	{#each parsedObjects as object}
		<p class:valid={object.valid}>{object.value}</p>
	{/each}
</div>

<button class="btn btn-primary" onclick={() => selectImages()}>Select Images</button>
<button class="btn btn-primary" onclick={() => saveProject($currProject)}>Save Project</button>

<style>
	.valid {
		color: green;
	}
</style>
