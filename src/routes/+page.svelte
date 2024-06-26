<script>
	import 'uno.css';
	import { projects, currProject, addProject, setCurrentProject, step } from '$lib/projectStore';
	import { v4 as uuidv4 } from 'uuid';
	import ProjectEditor from '../lib/ProjectEditor.svelte';
	import ProjectCard from '../lib/ProjectCard.svelte';
	import ObjectsEditor from '../lib/ObjectsEditor.svelte';
    import Preview from '../lib/Preview.svelte';
	let newProj = $state({});

	const addNewProj = () => {
		addProject(newProj);
		setCurrentProject(newProj);
		step.set('editProject');
	};

	$effect(() => {
		console.log('initial projects', $projects);
	});

	$effect(() => {
		console.log('set current', $currProject);
	});
</script>

{#if $step === 'init'}
	{#each $projects as project}
		<ProjectCard {project} />
	{/each}

	<div class="proj-add">
		<h3>Add a new project</h3>

		<label for="name">Name:</label>
		<input type="text" id="name" name="name" bind:value={newProj.name} />

		<label for="description">Description:</label>
		<input type="text" id="description" name="description" bind:value={newProj.description} />

		<button class="btn btn-primary" onclick={addNewProj}>Add</button>
	</div>
{:else if $step === 'editProject'}
	<ProjectEditor />
{:else if $step === 'editObjects'}
	<ObjectsEditor />
{:else if $step === 'preview'}
	<Preview />
{/if}
