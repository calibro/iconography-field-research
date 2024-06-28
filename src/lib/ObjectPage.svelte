<script>
	import QRCode from '@castlenine/svelte-qrcode';
    import { getObjectUrl } from '$lib/utils';
	let { object, image, pgNum } = $props();
</script>

<!--<h3>DIGITAL BENIN OBJECT ID: {object.db_id}</h3>
<div class="proj-prev-img-cont flex justify-center">
	<img class="proj-prev-img" src={image.url} alt="object" />
</div>
<QRCode data={image.url} size="200" isJoin={true} />
<span>{pgNum}</span>
-->
<div class="h-full">
	<div class="object-page mt-4 ms-16 me-4 border-t-1 border-b-1 pb-6 border-black">
		<div class="flex justify-between">
			<div class="flex flex-col gap-2">
				<div class="flex gap-4">
					<div class="mt-2">
						<span>Object ID </span>
					</div>
					<div class="mt-2">
						<span class="font-bold">{object.db_id}</span>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="mt-2">
						<span>Institution</span>
					</div>
					<div class="mt-2">
						<span class="font-bold">{object.institution}</span>
					</div>
				</div>
			</div>
			<div>
				<span>Object details</span>
				<QRCode data={getObjectUrl(object.db_id)} size="115" isJoin={true} />
			</div>
		</div>
		<div class="proj-prev-img-cont flex justify-center mt-4 mb-4" style="background-image:url({image.url})">
			<!--<img class="proj-prev-img" src={image.url} alt="object" />-->
		</div>
	</div>
	<div class="flex justify-between ms-16 me-4 mt-3">
		<span class="text-xs">Digital Benin FOR RESEARCH ONLY</span>
		<span class="text-xs">{pgNum}</span>
	</div>
</div>

<style>
	.proj-prev-img-cont {
		height: 85%;
        background-repeat:no-repeat;
        background-size:contain;
        background-position: center center;
	}
	.object-page {
		height: 94.5%;
	}

</style>
