import './style.css';
import { navListener, collapsibleListener } from './listeners';
import menu from './images/menu.svg';
import red from './images/red.png';
import yellow from './images/yellow.png';
import green from './images/green.png';
import remove from './images/remove.svg';
import { updateStorage } from './storagehandler';

const currentProjectContainer = document.getElementById("current-project-container");
let currentProject = null;

// Function to display toDoProject object on the screen. Input: project (obj: toDoProject)
// Called on : 1) New project added 2) New item added 3) Page Load 4) New project selected (nav)
const displayProj = (project) => {
    if(currentProjectContainer.classList.contains("invisible")) currentProjectContainer.classList.remove("invisible");
    const title = document.getElementById("current-project-title");
    // Update title
    title.textContent = project.getName();
    // Update items
    const itemsContainer = document.getElementById("current-project-items-container");
    wipeCurrentProj();
    const projectItems = project.getItems();
    for (let i = 0; i < projectItems.length; i++){
        itemsContainer.appendChild(generateItemHTML(projectItems[i]));
    }
    toggleUnderline(project);
    currentProject = project;
}

// Local function to create the HTML for each toDoItem object. (Handles the hiding, CSS classes, buttons etc)
const generateItemHTML = (item) =>{
    //container div
    const parent = document.createElement("div");
    parent.classList.add("item-parent");
    //button - what's shown on the surface
    const button = document.createElement("button");
    const img = new Image();
    switch(item.getPriority()){
        case("high"):
            img.src = red;
            break;
        case("med"):
            img.src = yellow;
            break;
        case("low"):
            img.src = green;
            break;
    }
    button.appendChild(img);
    const span = document.createElement("span");
    span.textContent = `${item.getTitle()}`;
    button.appendChild(span);

    //Create Date
    const span2 = document.createElement("span");
    span2.textContent = `${item.getDueDate()}`;
    button.appendChild(span2);

    //Create Remove Button
    const removeButton= document.createElement("button");
    removeButton.id = "remove-button";
    const removeImg = new Image();
    removeImg.src = remove;
    removeButton.appendChild(removeImg);
    //listener
    removeButton.addEventListener("click", function(){
        const itemsContainer = document.getElementById("current-project-items-container");
        for(let i = 0; i < itemsContainer.children.length; i++){
            if(itemsContainer.children[i].children[1] === this){
                itemsContainer.removeChild(itemsContainer.children[i]);
                const removed = currentProject.removeItem(i)[0];
                updateStorage(removed, currentProject, "remove");
            }
        }

    });
    button.classList.add("collapsible");
    //Add event listener to the button.
    button.addEventListener("click", collapsibleListener);

    //collapsible div.
    const collapsible = document.createElement("div");
    const collcontent = document.createElement("p");
    collapsible.classList.add("collcontent")
    collcontent.textContent = item.getDescription();
    collapsible.appendChild(collcontent);
    
    parent.appendChild(button);
    parent.appendChild(removeButton);
    parent.appendChild(collapsible);
    return parent;
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
    button.classList.add("nav-item");
    container.appendChild(button);
}


// Getter to find which project is currently being displayed on the DOM.
const getCurrentProject = () => currentProject;


// Public function to be used by listeners to clear input fields once a submit button has been clicked.
const clearInputFields = () => {
    document.querySelectorAll('input').forEach((e) => {
        e.value = "";
    })
}

// Public function that toggles the CSS for navBar.
const toggleNavBar = (action, nav) => {
    const main = document.querySelector("main");
    if(action === "show"){
        nav.style.maxWidth = "20%";
        main.style["margin-left"] = "20%";
    }
    else{
        nav.style.maxWidth = "0px";
        main.style["margin-left"] = "0";
    }

}

// Private function that toggles underline (bottom border) on currently selected toDoProject (in navbar)
const toggleUnderline = (project) => {
    //Remove from current
    const nav = document.getElementById("nav-project-container");
    if(currentProject){
        for(let i = 0; i < nav.children.length; i++){
            if(nav.children[i].textContent == currentProject.getName()){
                nav.children[i].style['border-bottom'] = null;
                break;
            }
        }
    }
    //Add to new
    for (let i = 0; i < nav.children.length; i++){
        if(nav.children[i].textContent == project.getName()){
            nav.children[i].style['border-bottom'] = "2px solid";
            break;
        }
    }

}

//Public function that handles events upon removal of project
const removeProj = (project) => {
    wipeCurrentProj();
    currentProjectContainer.classList.add("invisible");
    currentProject = null;
    const container = document.getElementById("nav-project-container");
    for(let i = 0; i < container.children.length; i++){
        if(container.children[i].textContent == project.getName()){
            container.removeChild(container.children[i]);
            break;
        }
    }
}


//add menu image
const addMenuImage = () => {
    const menuImg = new Image();
    menuImg.src = menu;
    document.getElementById("nav-button").appendChild(menuImg);
}


export{ displayProj, getCurrentProject, addToNav, clearInputFields, toggleNavBar, removeProj, addMenuImage };