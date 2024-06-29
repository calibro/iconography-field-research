<script>
	import {
		addProject,
		setCurrentProject,
		getProjectByID,
		currProject,
		step
	} from '$lib/projectStore';
	import ProjectEditor from '$lib/ProjectEditor.svelte';
	import ObjectsEditor from '$lib/ObjectsEditor.svelte';
	import { get } from 'svelte/store';
	import Preview from '$lib/Preview.svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { untrack } from 'svelte';

	let newProj = $state({});

	const addNewProj = () => {
		if ($page.params.id === 'new') {
			addProject(newProj);
			setCurrentProject(newProj);
		}

		step.set('editProject');
	};

	$effect(() => {
		let id = $page.params.id;
		untrack(() => {
			if (id !== 'new') {
				getProjectByID(id);
				newProj = get(currProject);
			}
		});
	});
</script>

{#if $step === 'init'}
	<div
		out:slide={{ duration: 300 }}
		in:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
		class="proj-add flex flex-col gap-6"
	>
		<h1 class="text-3xl font-bold mb-4">Project Details</h1>
		<div>
			<label class="block font-bold" for="name">Project title *</label>
			<input
				type="text"
				id="name"
				name="name"
				class="block border-1 rounded min-w-48 w-full max-w-100 px-2 py-1"
				bind:value={newProj.name}
			/>
		</div>
		<div>
			<label class="block font-bold" for="description">Project Description</label>
			<textarea
				rows="6"
				id="description"
				name="description"
				class="block border-1 rounded w-full px-2 py-1"
				bind:value={newProj.description}
			>
			</textarea>
		</div>
		<button class:btn-disabled={!newProj.name} class="btn btn-primary" onclick={addNewProj}
			>Next</button
		>
	</div>
{:else if $step === 'editProject'}
	<div out:slide={{ duration: 300 }} in:slide={{ duration: 300, axis: 'y' }}>
		<ProjectEditor />
	</div>
{:else if $step === 'editObjects'}
	<div out:slide={{ duration: 300 }} in:slide={{ duration: 300, axis: 'y' }}>
		<ObjectsEditor />
	</div>
{:else if $step === 'preview'}
	<div out:slide={{ duration: 300 }} in:slide={{ duration: 300, axis: 'y' }}>
		<Preview />
	</div>
{/if}
