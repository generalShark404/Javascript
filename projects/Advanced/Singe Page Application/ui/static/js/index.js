import Home from "./views/Home.js";
import Tasks from "./views/Tasks.js";
import AddTask from "./views/AddTask.js";

/**
 * Navigates to a given URL and updates the browser's history.
 * @param {string} url - The URL to navigate to.
 */
const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

/**
 * Router function to manage view rendering based on the current URL path.
 */
const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/tasks", view: Tasks },
        { path: "/add-tasks", view: AddTask },
    ];

    // Determine which route matches the current path
    const potentialMatches = routes.map((route) => ({
        route: route,
        isMatch: location.pathname === route.path,
    }));

    // Find the first matching route
    let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

    // If no match found, default to the home view
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true,
        };
    }

    const view = new match.route.view();
    document.querySelector("#app").innerHTML = await view.getViewHtml();
};

// Listen for page load and link clicks
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});

// Handle browser navigation (back/forward)
window.addEventListener("popstate", router);

export default navigateTo;