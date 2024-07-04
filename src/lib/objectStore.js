import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { currProject } from './projectStore';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';
import _ from 'lodash';

const projectId = PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_DATASET;
const client = createClient({
	dataset,
	projectId,
	apiVersion: '2023-06-28',
	useCdn: true
});

const builder = imageUrlBuilder(client);

const urlFor = (source) => {
	return builder.image(source);
};

export const objects = writable(
	browser && localStorage.getItem('objects') ? JSON.parse(localStorage.getItem('objects')) : {}
);
export const currObjects = derived(currProject, ($value) => $value?.objects);
currObjects.set = (newItems) => {
	currProject.update((project) => ({ ...project, objects: newItems }));
};
const objectsQuery = (objIDs) => {
	return `*[_type == "benin_object" && db_id in ${JSON.stringify(objIDs)}]{db_id,images,"institution":institution->name}`;
};

export const getObjects = async (givenIds) => {
	// se è già nel progetto aggiungi da lì. Se è in cache prendi da lì. Sennò scarica.
	let objList = get(objects);
	let toFetch = [];
	let fromLocal = [];
	let ids = [];
	let finalObjs = [];

	if (givenIds) ids = givenIds;
	else ids = get(currProject).ids;

	for (let id of ids) {
		const proj = get(currProject);
		if (proj.objects) {
			let foundObj = proj.objects.find((d) => d.db_id == id);
			if (foundObj) {
				finalObjs.push(foundObj);
				continue;
			}
		}
		fromLocal.push(id);
		if (objList && !Object.hasOwnProperty(objList, id)) toFetch.push(id);
	}
	if (toFetch.length > 0) await getRemoteObjects(toFetch);

	objList = get(objects);
	fromLocal.forEach((id) => {
		if (Object.hasOwn(objList, id)) {
			let foundObj = objList[id];
			foundObj.assets[0].selected = true;
			finalObjs.push(foundObj);
		}
	});
	currObjects.set(finalObjs);
};

const addObjects = (newObjects) => {
	objects.update((objects) => {
		newObjects.forEach((d) => {
			d['assets'] = d['images'].map((e, i) => {
				return {
					url: urlFor(e).width(2500).fit('max').url(),
					selected: i == 0 ? true : false
				};
			});
			delete d['images'];
			objects[d['db_id']] = d;
		});
		return objects;
	});
};

const saveObjects = () => {
	let objList = _.cloneDeep(get(objects));
	for (const k in objList) {
		if (objList[k].assets) {
			objList[k].assets = objList[k].assets.map((d) => {
				if (Object.keys(d).includes('selected')) delete d.selected;
				return d;
			});
		}
	}
	localStorage.setItem('objects', JSON.stringify(objList));
};

const getRemoteObjects = async (objList) => {
	const query = objectsQuery(objList);
	const data = await client.fetch(query);
	if (data) {
		addObjects(data);
		saveObjects();
	} else console.log('no data');
};

export const clearObjectsStorage = () => {
	browser && localStorage.removeItem('objects');
};
