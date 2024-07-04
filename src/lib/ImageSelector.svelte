<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { currObjects } from '$lib/objectStore';
	import { get } from 'svelte/store';

	let { i } = $props();
	let open = $state(i == 0 ? true : false);
	const toggleOpen = () => (open = !open);
	const selectAll = () => {
		let newObjs = get(currObjects);
		newObjs[i].assets.forEach((e) => (e.selected = true));
		currObjects.set(newObjs);
	};
	const deselectAll = () => {
		let newObjs = get(currObjects);
		newObjs[i].assets.forEach((e) => (e.selected = false));
		currObjects.set(newObjs);
	};
</script>

<div class:rounded-t-lg={i == 0} class="ms-1 image-selector outline outline-1 outline-light-gray">
	<button
		onclick={toggleOpen}
		class="w-full block image-selector-title text-xl px-4 my-6 flex justify-between"
	>
		<span class="text-lg font-bold">Object {$currObjects[i].db_id}</span>
		<span class={open ? 'i-mdi-light-minus' : 'i-mdi-light-plus'}></span>
	</button>
	{#if open}
		<div
			transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
			class="image-selector-body bg-gray-100 p-8 pt-2 outline outline-1 outline-light-gray"
		>
			<div class="image-selector info flex justify-between my-4">
				<p class="text-md font-bold">Select images</p>
				<div class="flex gap-2">
					<p class="text-md">
						{$currObjects[i].assets.filter((e) => e.selected).length} Images selected
					</p>
					<button class="underline" onclick={selectAll}>Select all</button>
					<button class="underline" onclick={deselectAll}>Deselect All</button>
				</div>
			</div>
			<div class="image-selector-images grid grid-cols-6 gap-2">
				{#each $currObjects[i].assets as image}
					<div class="image-selector-image col-span-1 max-h-48 relative bg-white">
						<input
							class="absolute top-2 left-2 checkbox"
							type="checkbox"
							bind:checked={image.selected}
						/>
						<div
							class="image-selector-image-overlay flex w-full h-full justify-center items-center"
						>
							<img loading="lazy" class="max-w-full max-h-full object-contain" src={image.url} alt="object" />
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
