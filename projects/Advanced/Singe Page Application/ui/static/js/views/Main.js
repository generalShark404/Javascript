export default class {
    /**
     * Sets the title of the current view.
     * @param {string} title - The title to set.
     */
    setViewTitle(title) {
        document.title = title;
    }

    /**
     * Returns the HTML content for the view.
     * @returns {Promise<string>} - The HTML content as a string.
     */
    async getViewHtml() {
        return "";
    }
}
