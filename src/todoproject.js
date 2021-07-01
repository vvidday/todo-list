import './style.css';

// Project factory function - represents one To-Do-List. Can create multiple.
const toDoProject = (name) =>{
    //Array to store all of its todoitems.
    let item_list = [];

    //Public method that adds a todo item.
    //input: obj:todoitem
    const addItem = (item) =>{
        item_list.push(item);
    }

    //Public getter method that returns list of all items in this project
    const getItems = () => item_list;

    //Public getter for name
    const getName = () => name;

    return{
        addItem,
        getItems,
        getName,
    }

}

export {toDoProject};