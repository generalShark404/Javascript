document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const mealList = document.getElementById('meal');
    const mealDetails = document.getElementById('meal-details');
    const mealDetailsContent = document.querySelector('.meal-details-content');
    const recipeCloseBtn = document.getElementById('recipe-close-btn');
    const networkError = document.querySelector('.networkError');

    // Event listeners
    searchBtn.addEventListener('click', getMealList);
    mealList.addEventListener('click', getMealRecipe);
    recipeCloseBtn.addEventListener('click', () => {
        mealDetails.style.display = 'none';
    });

    function formatTextToNextLine(text){
        // return text.replace(/\. \s+/g, '.<br>')
        return text.replace(/\.\s+/g, '.<br>');
    }

    // Fetch and display meal list based on ingredients
    function getMealList() {
        const searchInputTxt = document.getElementById('search-input').value.trim();
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
            .then(response => response.json())
            .then(data => {
                let html = '';
                if (data.meals) {
                    data.meals.forEach(meal => {
                        html += `
                            <div class="meal-item" data-id="${meal.idMeal}">
                                <div class="meal-img">
                                    <img src="${meal.strMealThumb}" alt="Meal">
                                </div>
                                <div class="meal-name">
                                    <h3>${meal.strMeal}</h3>
                                    <a href="#" class="recipe-btn">View Recipe</a>
                                </div>
                            </div>`;
                    });
                    mealList.classList.remove('notFound');
                } else {
                    html = "Sorry, we couldn't find any meals.";
                    mealList.classList.add('notFound');
                }
                mealList.innerHTML = html;
            }).catch((error) => {
                error == 'TypeError: NetworkError when attempting to fetch resource.' ? networkError.classList.remove('hide') : networkError.classList.add('hide');
                
                console.log(error)
            });
    }

    // Fetch and display meal recipe
    function getMealRecipe(e) {
        e.preventDefault();
        if (e.target.classList.contains('recipe-btn')) {
            const mealItem = e.target.closest('.meal-item');
            const mealId = mealItem.getAttribute('data-id');
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(response => response.json())
                .then(data => mealRecipeModal(data.meals[0]))
                .catch((error) => {
                    if(error == 'TypeError: NetworkError when attempting to fetch resource.'){
                        networkError.classList.remove('hide');
                    }
                    console.log(error)
                });
        }
    }

    // Display meal recipe in a modal
    function mealRecipeModal(meal) {
        console.log(meal.strInstructions)
        let instructions = formatTextToNextLine(meal.strInstructions)
        mealDetails.style.display = 'block';
        mealDetailsContent.innerHTML = `
            <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
                <h3>Instructions:</h3>
                <p>${instructions}</p>
            </div>
            <div class="recipe-meal-img">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="recipe-link">
                <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>
        `;
    }
});
