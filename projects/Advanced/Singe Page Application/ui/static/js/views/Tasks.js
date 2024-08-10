import Main from "./Main.js";

export default class extends Main {
    constructor() {
        super();
        this.setViewTitle("Tasks");
    }

    /**
     * Renders the HTML content for the Tasks view.
     * @returns {Promise<string>} - The HTML content as a string.
     */
    async getViewHtml() {
        return `
        <div class="container mt-5 p-5 rounded shadow" style="background-color: #e3f2fd;">
            <div class="text-center bg-light p-3 rounded">
                <p class="fs-3 fw-bold">Tasks</p>
                <p class="fst-italic">Write, pursue and follow your goals. New day, new hunt!</p>
            </div>
            <ul class="mt-3">
                <li class="fs-5 bg-light p-3">Task 1</li>
            </ul>
        </div>
        `;
    }
}
