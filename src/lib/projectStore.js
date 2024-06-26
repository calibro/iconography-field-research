import { writable, get } from 'svelte/store';
import { browser } from "$app/environment"
import { v4 as uuidv4 } from 'uuid';

export const projects = writable(browser && localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")) : []);
export const currProject = writable(null)
export const step = writable('init')

currProject.subscribe((project) => {
    if(project){
    console.log("autosaving")
    saveProject(project);
    }
});

export const addProject = (project) => {
    project.id = uuidv4();
    projects.update((projects) => {
        return [...projects, project];
    });
}

export const removeProject = (project) => {
    projects.update((projects) => {
        return projects.filter((p) => p !== project);
    });
}

export const setCurrentProject = (project) => {
    currProject.set(project);
}

export const setProjectIds = (ids) => {
    //console.log("updating with ids", ids)
    currProject.update((project) => {
        return { ...project, ids: ids };
    })
}

export const setProjectLinks = (links) => {
    //console.log("updating with links", links)
    currProject.update((project) => {
        return { ...project, links: links };
    })
}

export const saveProject = (project) => {
    projects.update((projects) => {
        const selPrj = projects.find((p) => p.id === project.id); // find the selected prj
        if (selPrj) {
            return projects.map((p) => (p.id === project.id ? project : p));
        }
    });
    console.log(get(projects));
    browser && localStorage.setItem("projects", JSON.stringify(get(projects)));
}