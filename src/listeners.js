import './style.css';
import { toDoProject } from './todoproject';
import { toDoItem } from './todoitem';
import { addToNav, displayProj, getCurrentProject } from './domhandler';
import { addToStorage, updateStorage } from './storagehandler';

// Listener that creates a new project.
function newProjectListener(name){
    console.log(name);
    const newProject = toDoProject(name);
    // Display new project on current screen
    displayProj(newProject);
    // Add project to navbar.
    addToNav(newProject);
    // Add new todoproject object to localStorage, so it can be retrieved later.
    addToStorage(newProject);
}

// Listener that adds a new todolist item to a project.
function newItemListener(title, description, duedate, priority, project){
    //Create a new toDoItem object.
    const newItem = toDoItem(title, description, duedate, priority);
    //Add it to the current To Do Project.
    project.addItem(newItem);
    //Update LocalStorage to reflect the new item.
    updateStorage(newItem, project, 'add');
    //Re-display todoproject.
    displayProj(project);
}

// Listener that is added to buttons on the nav - when clicked, will display that project.
function navListener(project){
    if(project != getCurrentProject()) displayProj(project);
}


export {newProjectListener, newItemListener, navListener};