<script>
	import { getObjects, currObjects } from '$lib/objectStore';
    import { step } from '$lib/projectStore';

	$effect(async () => {
		await getObjects();
	});

	$effect(() => {
		console.log('curr object', currObj);
	});

	let currObj = $state(null);

	currObjects.subscribe((objects) => {
		console.log(objects);
		if (objects && currObj === null) currObj = 0;
	});
</script>

<div class="proj-obj-edit grid grid-cols-8 gap-4">
	<div class="proj-obj-list flex flex-col col-span-2">
        <h2>Object List</h2>
		{#each $currObjects as object, i}
			<button onclick={() => (currObj = i)} class="mt-4 btn proj-obj-item">{object.db_id}</button>
		{/each}
        <button onclick={() => step.set('preview')} class="mt-4 btn proj-obj-item">Go to preview</button>
	</div>

	{#if $currObjects && $currObjects[currObj] && 'assets' in $currObjects[currObj]}
		<div class="proj-obj-view col-span-6">
			<h3>{$currObjects[currObj].db_id}</h3>
			<div class="proj-obj-img-cont">
				{#each $currObjects[currObj].assets as image}
					<img class="proj-obj-img" src={image.url} alt="object" />
					<input type="checkbox" bind:checked={image.selected} />
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
    .btn{
        height:30px;
        line-height: 20px;
    }
</style>