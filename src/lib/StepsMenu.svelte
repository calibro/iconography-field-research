<script>
	import { currProject, step } from '$lib/projectStore';
</script>

<div class="sticky top-28">
	<button
		onclick={() => step.set('init')}
		class:text-primary={$step === 'init'}
		class="text-2xl font-bold my-2">1. Project details</button
	>
	<button
		onclick={() => step.set('editProject')}
		class:text-primary={$step === 'editProject'}
		disabled={!$currProject?.name}
		class:btn-disabled={!$currProject?.name}
		class="text-2xl font-bold my-2">2. Objects selection</button
	>
	<button
		onclick={() => step.set('editObjects')}
		class:text-primary={$step === 'editObjects'}
		disabled={!$currProject?.links}
		class:btn-disabled={!$currProject?.links}
		class="text-2xl font-bold my-2">3. Images selection</button
	>
	<button
		onclick={() => step.set('preview')}
		class:text-primary={$step === 'preview'}
		disabled={!$currProject?.objects}
		class:btn-disabled={!$currProject?.objects}
		class="text-2xl font-bold my-2">4. Preview and save</button
	>
</div>
