import './style.css';
import { newProjectListener, newItemListener } from './listeners';
import { displayProj, addToNav, getCurrentProject } from './domhandler';
import { getStorageProjects } from './storagehandler';


//Page Load Function
const onPageLoad = () => {
    // Retrieve projects from storage
    const projects = getStorageProjects();
    console.log(projects[0]);
    if(projects.length > 0){
        // Display current project on the screen
        displayProj(projects[0]);
        for (let i = 0; i < projects.length; i++){
            addToNav(projects[i]);
        }
    }
}


const newProjectButton = document.getElementById("new-project-button");
newProjectButton.onclick = (button) =>{
    let name = document.getElementById("new-project-name").value;
    newProjectListener(name);
}


const newItemButton = document.getElementById("new-item-button");
newItemButton.onclick = (button) =>{
    let title = document.getElementById("new-item-title").value;
    let description = document.getElementById("new-item-description").value;
    let duedate = document.getElementById("new-item-duedate").value;
    let priority = document.getElementById("new-item-priority").value;
    newItemListener(title, description, duedate, priority, getCurrentProject());
}

onPageLoad();