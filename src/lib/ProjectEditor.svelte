<script>
	import { currProject, setProjectIds, setProjectLinks, setProjectObjects,step } from '$lib/projectStore';
	import {getObjects, currObjects}	from '$lib/objectStore';
	import { get } from 'svelte/store';
	import { isValidDBUrl } from '$lib/utils';
	import { untrack } from 'svelte';
	import _ from 'lodash';

	let objectLinks = $state(null);
	let parsedObjects = $state([]);
	let linkErrors = $state([]);
	let idErrors = $state([]);
	let validated = $state(false);

	const parseObjects = () => {
		if ($state.is(objectLinks, null)) return;
		let lines = objectLinks.split('\n');
		untrack(() => {
			for (let line of lines) {
				let validatedUrl = { value: line, valid: false };
				if (isValidDBUrl(line)) validatedUrl.valid = true;
				parsedObjects.push(validatedUrl);
			}
			// check for errors
			linkErrors = parsedObjects.filter((d) => !d.valid);
		});
	};

	const getAndValidate = async () => {
		console.log("triggered get and validate");
		const ids = parsedObjects.filter((d) => d.valid).map((d) => d.value.split('/').pop());
		await getObjects(ids);
		//setTimeout(()=>{
			idErrors = _.difference( ids, get(currObjects).map((d) => d?.db_id));
			if( !idErrors.length && !linkErrors.length ) validated = true;	
		//})
		
	}


	const selectImages = () => {
		let objIds = parsedObjects.filter((d) => d.valid).map((d) => d.value.split('/').pop());
		setProjectIds(objIds);
		setProjectLinks(objectLinks);
		
		//setProjectObjects(get(currObjects));
		step.set('editObjects');
	};

	$effect(() => {

		validated = false;
		linkErrors = [];
		idErrors = [];
		parseObjects();
		return () => {
			parsedObjects = [];
		};
	});

	$effect(() => {
		let currP = get(currProject);
		if (currP && currP.links) objectLinks = currP.links;
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
		bind:value={objectLinks}
	></textarea>

</div>
{#if linkErrors.length}
<div class="toast toast-alert mb-4">
	<p>The following links are not valid:</p>
	<ul>
		{#each linkErrors as error}
			<li>• {error.value}</li>
		{/each}
	</ul>
</div>
{/if} 

{#if idErrors.length}
<div class="toast toast-alert mb-4">
	<p>The following objects are not in the catalogue:</p>
	<ul>
		{#each idErrors as error}
			<li>• {error}</li>
		{/each}
	</ul>
</div>
{/if}

{#if validated}
	<div class="toast toast-success mb-4">
		<p>Great! {parsedObjects.length} objects have been added to the project.</p>
	</div>
{/if}

<div class="flex gap-4">
	<button class:btn-disabled={!objectLinks} class="btn btn-primary" onclick={async () => await getAndValidate()}
		>Get Objects</button
	>
	<button
		class:btn-disabled={!validated}
		class="btn btn-primary"
		onclick={() => selectImages()}>Next</button
	>
</div>
