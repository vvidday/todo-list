import './style.css';
import { navListener } from './listeners';

const contentDiv = document.getElementById("content");
let currentProject = null;

// Function to display toDoProject object on the screen. Input: project (obj: toDoProject)
// Called on : 1) New project added 2) New item added 3) Page Load 4) New project selected (nav)
const displayProj = (project) => {
    console.log("domhandler");
    const title = document.getElementById("current-project-title");
    // Update title
    title.textContent = project.getName();
    // Update items
    const itemsContainer = document.getElementById("current-project-items-container");
    wipeCurrentProj();
    const projectItems = project.getItems();
    for (let i = 0; i < projectItems.length; i++){
        const new_item = document.createElement("div");
        console.log(projectItems[i]);
        new_item.textContent = projectItems[i].getTitle() + projectItems[i].getDescription() + projectItems[i].getDueDate() + projectItems[i].getPriority(); 
        itemsContainer.appendChild(new_item);
    }
    currentProject = project;
}


// Local function that clears the current toDoProject object that's currently displayed on the screen. 
const wipeCurrentProj = () => {
    const itemsContainer = document.getElementById("current-project-items-container");
    let i = 0;
    while (i < itemsContainer.children.length){
        itemsContainer.removeChild(itemsContainer.firstChild);
    }
}


// Public function that adds a project to the navbar
// Called when: 1) New project added (single) 2) On page load (retrieves projs from localstorage, iteratively calls)
const addToNav = (project) => {
    const container = document.getElementById("nav-project-container");
    //Creating new button for the project.
    const button = document.createElement("button");
    button.textContent = project.getName();
    // Add a listener to that button - if different from current Proj, will call displayProj for that project.
    button.onclick = (button) =>{
        navListener(project);
    }
    container.appendChild(button);
}


// Getter to find which project is currently being displayed on the DOM.
const getCurrentProject = () => currentProject;


export{ displayProj, getCurrentProject, addToNav };