<script>
	import { currObjects } from '$lib/objectStore';
	import { currProject } from '$lib/projectStore';
	import { get } from 'svelte/store';
	import NotesPage from './NotesPage.svelte';
	import ObjectPage from './ObjectPage.svelte';
	import _ from 'lodash';

	const getPageNum = (id, i) => {
		let pgNum = 1;
		const objs = get(currObjects);
		for (const o of objs) {
			if (o.db_id != id) {
				pgNum += o.assets.filter((e) => e.selected).length + 1;
			} else break;
		}
		return pgNum + i;
	};
	let content = $state(null);
	let save = $state(false);

	let opt = {
		margin: 0,
		filename: _.kebabCase(get(currProject).name),
		//image: { type: 'jpeg', quality: 0.20 },
		html2canvas: { useCORS: true, scrollY: 0 },
		jsPDF: { unit: 'cm', format: 'a4', orientation: 'p' },
		pagebreak: { mode: 'css', avoid: '.proj-prev-cont' }
	};

	const savepdf = () => {
		save = true;
	};

	$effect(async () => {
		if ($state.is(save, true)) {
			window.scrollTo(0, 0);
			setTimeout(async ()=>{
				await html2pdf().set(opt).from(content).save();
				setTimeout(()=>{save = false}, 100);
			})
			
		}
	});
</script>

<div class="prev-cont flex flex-col gap-4 mb-4 verflow-y-hidden">
	<div class="head shrink-0">
		<h1 class="text-3xl font-bold mb-4">Preview and save</h1>
		<p>Check the preview of the pdf and save it on your computer.</p>
	</div>
	<div bind:this={content} class="proj-prev-container bg-light-gray grow-1 overflow-y-auto">
		{#each $currObjects as object, j}
			{#each object.assets.filter((e) => e.selected) as image, i}
				<div
					class:mb-4={!save}
					class="proj-prev-cont pt-2 bg-white mx-auto"
				>
					<ObjectPage {object} {image} pgNum={getPageNum(object.db_id, i)} />
				</div>
			{/each}
			<div class:mb-4={!save} class="proj-prev-cont pt-2 bg-white mx-auto">
				<NotesPage
					pgNum={getPageNum(object.db_id, object.assets.filter((e) => e.selected).length)}
				/>
			</div>
		{/each}
	</div>
	<button onclick={savepdf} class="btn btn-lg btn-primary shrink-0">Save the PDF</button>
</div>

<style>
	.prev-cont {
		height: calc(100vh - 18rem);
	}
	.proj-prev-cont {
		height: 29.7cm;
		width: 21cm;
	}
	.proj-prev-cont:last-child {
		page-break-after: avoid;
	}
</style>
