import './style.css';


//ToDoItem factory function - represents a single to-do item.
//input: title(string), description(string), duedate (UNDECIDED - use module?), priority(string - low/med/high)
const toDoItem = (title, description, duedate, priority) =>{

    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => duedate;
    const getPriority = () => priority;

    const isDue = () =>{
        //TODO - when decide how to implement dates.
        return true;
    }

    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
    }

}

export {toDoItem};