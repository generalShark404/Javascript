import Main from "./Main.js";
import  navigateTo  from "../index.js"; // Assuming navigateTo is exported from index.js

export default class extends Main {
    constructor() {
        super();
        this.setViewTitle("Add Task");
    }

    /**
     * Renders the HTML content for the Add Task view.
     * Includes a form to add a new task.
     * @returns {Promise<string>} - The HTML content as a string.
     */
    async getViewHtml() {
        return `
        <div class="container">
            <div class="form-group row mt-4 d-flex justify-content-center">
                <div class="text-center">
                    <p class="fw-bold fs-3">Add Your Tasks!</p>
                    <p class="fst-italic">Write, pursue and follow your goals. New day, new hunt!</p>
                </div> 
                <div class="col-sm-10">
                    <input type="text" id="taskInp" class="form-control" placeholder="Add Task..." required>
                </div>
                <button id="addTaskBtn" class="btn fs-3 mt-3 col-10 fw-bold" style="background-color: #e3f2fd;">Add Task</button>
            </div>
        </div>
        `;
    }

    /**
     * This method will be called after the view has been rendered.
     * It attaches event listeners to the form elements.
     */
    async afterRender() {
        // Attach event listener to the Add Task button
        document.getElementById('addTaskBtn').addEventListener('click', handleAddTask);
    }
}

/**
 * Handles the form submission to add a task.
 * @param {Event} event - The form submission event.
 */
function handleAddTask(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    console.log('Add Task...')
    const taskInput = document.getElementById("taskInp");
    const taskText = taskInput.value.trim();

    if (taskText) {
        // Retrieve existing tasks from local storage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Add the new task to the array
        tasks.push(taskText);

        // Store updated tasks back in local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Clear the input field
        taskInput.value = "";

        // Optionally, redirect to the tasks page or update the UI
        navigateTo('/tasks');
    }
}


// import Main from "./Main.js";
// import navigateTo from "../index.js";

// export default class extends Main {
//     constructor() {
//         super();
//         this.setViewTitle("Add Task");
//     }

//     /**
//      * Renders the HTML content for the Add Task view.
//      * Includes a form to add a new task.
//      * @returns {Promise<string>} - The HTML content as a string.
//      */
//     async getViewHtml() {
//         return `
//         <form class="container" onsubmit="handleAddTask(event)">
//             <div class="form-group row mt-4 d-flex justify-content-center">
//                 <div class="text-center">
//                     <p class="fw-bold fs-3">Add Your Tasks!</p>
//                     <p class="fst-italic">Write, pursue and follow your goals. New day, new hunt!</p>
//                 </div> 
//                 <div class="col-sm-10">
//                     <input type="text" id="taskInp" class="form-control" placeholder="Add Task..." required>
//                 </div>
//                 <button type="submit" onsubmit="handleAddTask(event)" class="btn fs-3 mt-3 col-10 fw-bold" style="background-color: #e3f2fd;">Add Task</button>
//             </div>
//         </form>
//         `;
//     }
// }

// /**
//  * Handles the form submission to add a task.
//  * @param {Event} event - The form submission event.
//  */
// function handleAddTask(event) {
//     event.preventDefault();
//     const taskInput = document.getElementById("taskInp");
//     const taskText = taskInput.value.trim();
    
//     if (taskText) {
//         // Retrieve existing tasks from local storage
//         let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//         // Add the new task to the array
//         tasks.push(taskText);

//         // Store updated tasks back in local storage
//         localStorage.setItem("tasks", JSON.stringify(tasks));

//         // Clear the input field
//         taskInput.value = "";

//         // Optionally, redirect to the tasks page or update the UI
//         navigateTo('/tasks');
//     }
// }
