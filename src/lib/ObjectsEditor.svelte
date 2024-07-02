<script>
	import { getObjects, currObjects } from '$lib/objectStore';
	import { step } from '$lib/projectStore';
	import ImageSelector from './ImageSelector.svelte';

	let currObj = $state(null);

	currObjects.subscribe((objects) => {
		//console.log(objects);
		if (objects && currObj === null) currObj = 0;
	});
</script>

<h1 class="text-3xl font-bold mb-4">Images selection</h1>
<p class="mb-8">
	Each object has multiple images. By default we will print the first one but you can add more
	images to the selection if you want. Select the object and then the images if you want to print.
	When your selection is over click on “Preview and save” to save your pdf.
</p>
<div class="proj-obj-edit flex flex-col gap-0 mb-12">
	{#if $currObjects && $currObjects[currObj] && 'assets' in $currObjects[currObj]}
		{#each $currObjects as object, i}
			<ImageSelector {i} />
		{/each}
	{/if}
	<div class="next-btn-cont mt-4 flex items-center h-20 sticky bottom-0 bg-white">
		<button class="h-8 btn btn-primary" onclick={() => step.set('preview')}>Preview</button></div>
</div>
<style>
	.next-btn-cont {
		z-index: 1;
		width:calc(100% + 2px);
		left:-2px;
		outline:1px white;
		border: 1px solid white;
	}
</style>