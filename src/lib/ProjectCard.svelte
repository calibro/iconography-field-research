<script>
import { currProject, step } from '$lib/projectStore';
let {project} = $props();

const selectProject = () => {
    currProject.set(project);
    step.set('editProject');
}
</script>

<h3>{project?.name}</h3>
<p>{project?.description}</p>
<button class="btn btn-primary" onclick={() => selectProject()}>Select</button>