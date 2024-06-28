<script>
	import {QRCode} from '@castlenine/svelte-qrcode';
    import { PUBLIC_AIRTABLE_PROJECT } from '$env/static/public';
    const {pgNum} = $props();
	const notesLines = 27;
</script>

<div class="notes-page">
	<div class="mt-4 ms-16 me-4 border-t-1 border-b-1 pb-6 border-black">
		<div class="grid grid-cols-5">
			<div class="col-span-1 mt-5">
				<span>Location</span>
			</div>
			<div class="col-span-4 h-9 border-b-1 border-dashed border-black"></div>

			<div class="col-span-1 mt-5">
				<span>Contributor</span>
			</div>
			<div class="col-span-4 h-9 border-b-1 border-dashed border-black"></div>
			<div class="col-span-1 mt-5">
				<span>Researcher</span>
			</div>
			<div class="col-span-4 h-9 border-b-1 border-dashed border-black"></div>

			
		</div>
        <div class="mt-8 grid grid-cols-5 gap-4">
            <div class="notes-cont col-span-1 flex flex-col justify-between">
                <span>Notes</span>
                <div>
                    <span class="text-sm">Submission form</span>
                <QRCode data={PUBLIC_AIRTABLE_PROJECT} size="115" isJoin={true} />
            </div>
            </div>
            <div class="col-span-4">
                {#each { length: notesLines } as _}
                    <div class="w-full h-8 border-b-1 border-dashed border-black"></div>
                {/each}
            </div>
        </div>
	</div>
    <div class="flex justify-between ms-16 me-4 mt-3">
        <span class="text-xs">Digital Benin FOR RESEARCH ONLY</span>
        <span class="text-xs">{pgNum}</span>
    </div>
</div>

<style>
	.notes-cont {
		height: 22.6cm;
	}
</style>
