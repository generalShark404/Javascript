import Main from "./Main.js";

export default class extends Main {
    constructor() {
        super();
        this.setViewTitle("Home");
    }

    /**
     * Renders the HTML content for the Home view.
     * @returns {Promise<string>} - The HTML content as a string.
     */
    async getViewHtml() {
        return `
        <div class="container mt-5 p-5 rounded" style="background-color: #e3f2fd;">
            <p class="text-center fs-3">Manage and view all your tasks.</p>
            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-primary fw-bold me-3">
                    <a href="/tasks" class="nav-link" data-link>Tasks</a>
                </button>
                <button class="btn btn-warning fw-bold">
                    <a href="/add-tasks" class="nav-link" data-link>Add Task</a>
                </button>
            </div>
        </div>
        `;
    }
}
