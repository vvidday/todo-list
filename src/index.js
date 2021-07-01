import './style.css';
import { newProjectListener, newItemListener, navListener, navButtonListener, removeProjectListener } from './listeners';
import { displayProj, addToNav, getCurrentProject, clearInputFields } from './domhandler';
import { getStorageProjects } from './storagehandler';


//Page Load Function
const onPageLoad = () => {
    // Retrieve projects from storage
    const projects = getStorageProjects();
    if(projects.length > 0){
        // Display current project on the screen
        addToNav(projects[0]);
        displayProj(projects[0]);
        for (let i = 1; i < projects.length; i++){
            addToNav(projects[i]);
        }
    }
}

// Initializing New Project Button Listener
const newProjectButton = document.getElementById("new-project-button");
newProjectButton.onclick = (button) =>{
    let name = document.getElementById("new-project-name").value;
    if(!name) alert("Please enter a name for your project!");
    else{
    newProjectListener(name);
    clearInputFields();
}
}

// Initializing New Item Button Listener
const newItemButton = document.getElementById("new-item-button");
newItemButton.onclick = (button) =>{
    let title = document.getElementById("new-item-title").value;
    let description = document.getElementById("new-item-description").value;
    let duedate = document.getElementById("new-item-duedate").value;
    let priority = document.getElementById("new-item-priority").value;
    if(!title || !description || !duedate) alert("Please fill in all fields!");
    else{
    newItemListener(title, description, duedate, priority, getCurrentProject());
    clearInputFields();
    }
}

// Initializing Nav Button Listener
const navButton = document.getElementById("nav-button");
navButton.addEventListener("click", navButtonListener);


// Initializing RemoveProjectButton Listener
const removeProjectButton = document.getElementById("remove-project-button");
removeProjectButton.onclick = (button) => {
    removeProjectListener(getCurrentProject());
}

onPageLoad();