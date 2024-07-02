<script>
	import { projects, removeProject } from '$lib/projectStore';
	import { truncate } from '$lib/utils';
	import { base } from '$app/paths';

</script>

{#if $projects.length}
	<h1 class="text-3xl font-bold mb-4">Projects</h1>

	<div id="proj-table" class="grid grid-cols-5 mb-6">
		<div class="col-span-1 col-head">Project title</div>
		<div class="col-span-1 col-head">Project description</div>
		<div class="col-span-1 col-head">Creation date</div>
		<div class="col-span-1 col-head">Number of objects</div>
		<div class="col-span-1 col-head">Actions</div>
		{#each $projects as project}
			<a class="block col-span-1 col-body font-bold underline" href="{base}/project/{project.id}">
				{project.name}
			</a>
			<div class="col-span-1 col-body">
				{project?.description ? truncate(project?.description, 100, true) : ''}
			</div>
			<div class="col-span-1 col-body">{project?.date?.substring(0, 10)}</div>
			<div class="col-span-1 col-body">{project?.ids?.length}</div>
			<div class="col-span-1 col-body">
				<a href="{base}/project/{project.id}" class="btn btn-secondary">Open</a>
				<button onclick={() => removeProject(project)} class="btn btn-alert">Delete</button>
			</div>
		{/each}
	</div>
{:else}
	<h1 class="text-3xl font-bold mb-4">No saved projects</h1>
	<p>
		You can start by creating a new project. All projects created on this device will be
		automaically saved and displayed here.
	</p>
{/if}
