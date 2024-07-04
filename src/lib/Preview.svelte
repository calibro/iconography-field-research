<script>
	import { currObjects } from '$lib/objectStore';
	import { currProject } from '$lib/projectStore';
	import { get } from 'svelte/store';
	import NotesPage from './NotesPage.svelte';
	import ObjectPage from './ObjectPage.svelte';
	import _ from 'lodash';
	import { jsPDF } from 'jspdf';
	import 'svg2pdf.js';
	import notesPageSvg from '$lib/assets/notepage.svg?raw';
	import objPageSvg from '$lib/assets/objpage.svg?raw';
	import QRCode from 'qrcode';
	import { getObjectUrl } from '$lib/utils';
	import { PUBLIC_AIRTABLE_PROJECT } from '$env/static/public';

	const parser = new DOMParser();
	const imgSize = [390,495];
	let airtableQRcode = null;

	const getImageDim = (width, height) => {
		const ratio = width / height;
		let dims, offsets;
		if(ratio > 1) {
			dims = [imgSize[0], imgSize[0] / ratio];
			offsets = [0, (imgSize[1] - imgSize[0] / ratio) / 2];
		} else {	
			dims =  [imgSize[1] * ratio, imgSize[1]];
			offsets = [(imgSize[0] - imgSize[1] * ratio) / 2, 0];
			}  

		return {dims, offsets};
	};

	QRCode.toDataURL(PUBLIC_AIRTABLE_PROJECT, function (err, code) {
		if (err) {
			return;
		}
		airtableQRcode = code;
	});

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
	let save = $state(false);

	const savepdf = () => {
		save = true;
	};

	const saveSvg2Pdf = async () => {
		const doc = new jsPDF({
			unit: 'px',
			format: 'a4',
			orientation: 'p'
		});

		let pgNum = 1;
		let objInd = 0;
		const objs = get(currObjects);
		for (const o of objs) {
			const objUrl = getObjectUrl(o.db_id);
			const QRbase64 = await QRCode.toDataURL(objUrl);

			//console.log(QRbase64);
			for (const a of o.assets) {
				if (a.selected) {
					let img = new Image();
					img.src = a.url;
					await img.decode();
					const dims = getImageDim(img.width, img.height);
					const element = _.clone(objPageSvg);
					const frag = parser.parseFromString(element, 'text/html').body.childNodes[0];
					await doc.svg(frag, {
						x: 0,
						y: 0,
						width: 450,
						height: 650
					});
					doc.setFontSize(9);
					doc.text(pgNum.toString(), 430, 620);
					doc.setFont(undefined, 'bold').text(o.db_id.toString(), 127, 33);
					doc.text(o.institution.toString(), 127, 55).setFont(undefined, 'normal');
					//doc.rect(45, 100, 390, 488);
					doc.addImage(QRbase64, 'JPEG', 367, 35, 60, 60);
					doc.addImage(img, 'JPEG', 45 + dims.offsets[0], 100 + dims.offsets[1], dims.dims[0], dims.dims[1]);
					doc.addPage();
					pgNum++;
				}
			}
			const element = _.clone(notesPageSvg);
			const frag = parser.parseFromString(element, 'text/html').body.childNodes[0];
			await doc.svg(frag, {
				x: 0,
				y: 0,
				width: 450,
				height: 650
			});
			doc.text(pgNum.toString(), 430, 620);
			doc.addImage(airtableQRcode, 'JPEG', 43, 530, 60, 60);
			objInd++;
			if(objInd <objs.length) doc.addPage();
			 pgNum++;
		}

		// save the created pdf
		doc.save('myPDF.pdf');
		setTimeout(() => {
			save = false;
		}, 100);
	};

	$effect(async () => {
		if ($state.is(save, true)) {
			window.scrollTo(0, 0);
			setTimeout(async () => {
				saveSvg2Pdf();
			});
		}
	});
</script>

<div class="prev-cont flex flex-col gap-4 mb-4 verflow-y-hidden">
	<div class="head shrink-0">
		<h1 class="text-3xl font-bold mb-4">Preview and save</h1>
		<p>Check the preview of the pdf and save it on your computer.</p>
	</div>
	<div class="pt-4 proj-prev-container bg-light-gray grow-1 overflow-y-auto">
		{#each $currObjects as object, j}
			{#each object.assets.filter((e) => e.selected) as image, i}
				<div class="mb-4 proj-prev-cont pt-2 bg-white mx-auto">
					<ObjectPage {object} {image} pgNum={getPageNum(object.db_id, i)} />
				</div>
			{/each}
			<div class="mb-4 proj-prev-cont pt-2 bg-white mx-auto">
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
		height: calc(100vh - 18rem - 2rem);
	}
	.proj-prev-cont {
		height: 29.7cm;
		width: 21cm;
	}
	.proj-prev-cont:last-child {
		page-break-after: avoid;
	}
</style>
