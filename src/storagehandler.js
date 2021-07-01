import { toDoProject } from "./todoproject";
import { toDoItem } from "./todoitem";

// Function to add projects to localstorage
const addToStorage = (project)  => {
    let primaryData = [project.getName(), []];
    let arr = getRawStorage();
    arr.push(primaryData);
    addRaw(arr);
}

// Function to remove project from localstorage
const removeFromStorage = (project) => {
    let raw = getRawStorage();
    for(let i = 0; i < raw.length; i++){
        if(raw[i][0] == project.getName()){
            raw.splice(i, 1);
            break;
        }
    }
    addRaw(raw);
}

//Function to update localstorage when a new item is added to a project.
const updateStorage = (item, project, action) => {
    const to_insert = [item.getTitle(), item.getDescription(), item.getDueDate(), item.getPriority()];
    const name = project.getName();
    let raw = getRawStorage();

    function compareArrays(arr1, arr2){
        if (arr1.length !=  arr2.length) return false;
        for(let i = 0; i < arr1.length; i++){
            if(arr1[i] != arr2[i]) return false;
        }
        return true;
    }

    for(let i = 0; i < raw.length; i++){
        if(name == raw[i][0]){
            if(action === 'add') raw[i][1].push(to_insert);
            else{
                for (let j = 0; j < raw[i][1].length; j++){
                    if(compareArrays(raw[i][1][j], to_insert)){
                        raw[i][1].splice(j, 1);
                        break;
                    }
                }
            }
            break;
        }
    }
    addRaw(raw);
}

// Function to retrieve raw localstorage
const getRawStorage = () => {
    let arr = []
    if(localStorage.getItem("ToDoProjects") != null) arr = JSON.parse(localStorage.getItem("ToDoProjects"));
    return arr;
}

// Local Function to reset localstorage
const resetStorage = () =>{
    localStorage.removeItem("ToDoProjects");
}

// Local Function to add raw unprocessed array to localstorage
const addRaw = (arr) => {
    localStorage.setItem("ToDoProjects", JSON.stringify(arr));
}



// Function to retrieve all projects in localstorage as toDoProject objects.
const getStorageProjects = () => {
    const raw = getRawStorage();
    if (raw == []) return [];
    let result = [];

    //Iterate over all arrays in localstorage
    for (let i = 0; i < raw.length; i++){
        //For each, create a new toDoProject object.
        const new_project = toDoProject(raw[i][0]);
        if(raw[i][1]) {
            let items = [];
            //Iterate over all items, create new item and add it to the toDoProject object.
            for(let j = 0; j < raw[i][1].length; j++){
                const new_item = toDoItem(raw[i][1][j][0], raw[i][1][j][1], raw[i][1][j][2], raw[i][1][j][3]);
                new_project.addItem(new_item);
            }
        }
        //Add the project object to result array.
        result.push(new_project);
    }
    return result;
}

export {addToStorage, resetStorage, getStorageProjects, updateStorage, removeFromStorage};