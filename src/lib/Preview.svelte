<script>
	import { currObjects } from '$lib/objectStore';
	import QRCode from '@castlenine/svelte-qrcode';
	import NotesPage from './NotesPage.svelte';
</script>

<div class="prev-cont flex flex-col gap-4 mb-4 verflow-y-hidden">
	<div class="head shrink-0">
		<h1 class="text-3xl font-bold mb-4">Preview and save</h1>
		<p>Check the preview of the pdf and save it on your computer.</p>
	</div>
	<div class="proj-prev-container bg-light-gray grow-1 overflow-y-auto">
		{#each $currObjects as object}
			{#each object.assets.filter((e) => e.selected) as image}
				<div class="proj-prev-obj-cont bg-white flex flex-col m-auto mb-4">
					<h3>DIGITAL BENIN OBJECT ID: {object.db_id}</h3>
					<div class="proj-prev-img-cont flex justify-center">
						<img class="proj-prev-img" src={image.url} alt="object" />
					</div>
					<QRCode data={image.url} size="200" isJoin={true} />
				</div>
			{/each}
			<div class="proj-prev-obj-cont bg-white m-auto mb-4">
				<NotesPage objId={object.db_id} />
			</div>
		{/each}
	</div>
    <button class="btn btn-lg btn-primary shrink-0">Save the PDF</button>
</div>

<style>
    .prev-cont{
        height: calc(100vh - 18rem);
    }
	.proj-prev-obj-cont {
		height: 28cm;
		width: 20cm;
		border: 1px solid black;
		page-break-after: always;
	}
	.proj-prev-obj-cont:last-child {
		page-break-after: avoid;
	}

	.proj-prev-img-cont {
		height: 70%;
	}

	.proj-prev-img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		text-align: center;
		margin: auto;
		display: block;
	}
</style>
