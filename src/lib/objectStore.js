import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { currProject } from './projectStore';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

const projectId = PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_DATASET;
const client = createClient({
	dataset,
	projectId,
	apiVersion: '2023-06-28',
	useCdn: false
});

const builder = imageUrlBuilder(client);

const urlFor = (source) => {
	return builder.image(source);
};

export const objects = writable(
	browser && localStorage.getItem('objects') ? JSON.parse(localStorage.getItem('objects')) : {}
);
export const currObjects = writable({});

const objectsQuery = (objIDs) => {
	return `*[_type == "benin_object" && db_id in ${JSON.stringify(objIDs)}]{db_id,images}`;
};

export const getObjects = async () => {
	let objList = get(objects);
	let toFetch = [];
	let ids = get(currProject).ids;
	ids.forEach((id) => {
		if (!objList[id]) {
			toFetch.push(id);
		}
	});

	if (toFetch.length > 0) {
		await getRemoteObjects(toFetch);
	}
    //objList = get(objects);
	currObjects.set(ids.map((d) => objList[d]));
};

const addObjects = (newObjects) => {
	objects.update((objects) => {
		newObjects.forEach((d) => {
            d['assets'] = d['images'].map((e,i) => {
                return {
                    url:urlFor(e).width(500).url(),
                    selected: i == 0 ? true : false
                }
        });
			delete d['images'];
			objects[d['db_id']] = d;

		});
        return objects;
	});
};

const saveObjects = () => {
	localStorage.setItem('objects', JSON.stringify(get(objects)));
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
