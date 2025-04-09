const apiKey = "efc34a021fbbfa0078319a6ec9678631";
const apiUrl =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";
//DOM handling
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");


searchBtn.addEventListener('click',()=>{
    checkRecipe(searchBox.value);
})
searchBox.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
        checkRecipe(searchBox.value);
    }
})

//fetch recipe using name
async function checkRecipe(name) {
    const response = await fetch(`${apiUrl}${name}`);
    const data = await response.json();

    if(data.meals){
        display(data.meals);
    } else {
        alert("Sorry! Recipe not available at the moment.")
    }
}

//fetch recipe using category
async function recipeCategory(name) {
    const catUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;

    const response = await fetch(catUrl);
    const data = await response.json();

    console.log(data.meals)
    if(data.meals){
    displayCat(data.meals,name);
    } else {
        alert("Sorry! No recipies found in this category");
    }
}

//display recipe using name
function display(meals){
    const result = document.querySelector(".result");
    result.innerHTML = "";

    meals.forEach((meal) => {
        console.log(meal)
        const element = document.createElement("div");
        element.classList.add("meal");

        let ingredients = "";
        for(let i = 1; i<20; i++){
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            if(ingredient && ingredient.trim() != ""){
                ingredients += `<li>${measure} ${ingredient}</li>`
            }
        }

        let instructionsList = "";
        let instArray = meal.strInstructions.split(/\r\n|\n/);

        instArray.forEach(step => {
            if(step.trim() !== ""){
                instructionsList += `<li>${step}</li>`
            };
        });

        element.innerHTML = `
        <div class="recipe">
        <h2 class="recipe-name">${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" class="recipe-img">
        <p class="recipe-category">Category: ${meal.strCategory}</p>
        <p class="recipe-ingredient">Ingredients:${ingredients}</p>
        <p class="recipe-instruction">Instructions:${instructionsList}</p>
        </div>
        `;

        result.appendChild(element);
    });
}

//display recipe using cat
function displayCat(meals, category){
    const result = document.querySelector(".result-cat");
    result.innerHTML='';

    if(!Array.isArray(meals) || meals.length ===0) {
        result.innerHTML = `<p>No recipe found!</p>`;
        return;
    }

    meals.forEach(meal => {
        let element = document.createElement('div');
        element.classList.add('meal-card');

        element.innerHTML = `
        <div class="cat">
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" class="cat-img"></img>
        </div>
        `;

        result.appendChild(element);
    });
}

//donate
function donate() {
    let response = confirm("Would you like to donate?");
    if(response){
        window.location.href= 'https://www.akshayapatra.org/donate-on-this-ugadi?utm_source=google&utm_medium=cpc&utm_campaign=Generic-Search-Ugadi-MDM&gad_source=1&gclid=Cj0KCQjwqIm_BhDnARIsAKBYcmspp6d825qQwka0uVwD1v5cFB5kJR0gQF3vNDmvs3ma4rsCyxpLTE8aAhZFEALw_wcB'; 
    } else {
        alert('Thank you for visiting')
    }
}

//scroll to top
document.querySelectorAll(".view").forEach(button => {
    button.addEventListener("click",()=>{
        window.scrollTo({top:0,behavior:"smooth"});
    })
})