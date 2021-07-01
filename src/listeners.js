import './style.css';
import { toDoProject } from './todoproject';
import { toDoItem } from './todoitem';
import { addToNav, displayProj, getCurrentProject, clearInputFields, toggleNavBar, removeProj } from './domhandler';
import { addToStorage, updateStorage, removeFromStorage } from './storagehandler';

// Listener that creates a new project.
function newProjectListener(name){
    const newProject = toDoProject(name);
    // Add project to navbar.
    addToNav(newProject);
    // Display new project on current screen
    displayProj(newProject);    
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

// Collapsible listener
function collapsibleListener(){
    const content = this.nextElementSibling.nextElementSibling;
    if(!content.style['max-height']) {
        content.style['max-height'] = content.scrollHeight + "px";
    }
    else content.style['max-height'] = null;
}

// Nav Button listener (expands)
function navButtonListener(){
    const nav = document.getElementById("navbar");
    if(nav.style["max-width"] != "20%"){
        toggleNavBar("show", nav);
    }
    else toggleNavBar("hide", nav);
    
}

function removeProjectListener(project){
    //Remove from body & nav
    removeProj(project);
    
    //Remove from storage
    removeFromStorage(project);
}


export {newProjectListener, newItemListener, navListener, collapsibleListener, navButtonListener, removeProjectListener  };