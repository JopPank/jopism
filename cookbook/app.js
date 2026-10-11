const recipes = window.cookbookRecipes;

const recipeGrid = document.getElementById("recipeGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const recipeDialog = document.getElementById("recipeDialog");
const recipeDialogHeading = document.getElementById("recipeDialogHeading");
const recipeDialogBody = document.getElementById("recipeDialogBody");

function appendRecipeSection(container, title, items, listTag = "ul") {
    const section = document.createElement("section");
    section.appendChild(createElement(
        "h3",
        "mb-2 text-sm font-bold uppercase tracking-wider text-amber-400",
        title
    ));
    const list = document.createElement(listTag);
    list.className = listTag === "ol"
        ? "list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-200"
        : "list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-200";
    items.forEach((item) => {
        list.appendChild(createElement("li", "", item));
    });
    section.appendChild(list);
    container.appendChild(section);
}

function showRecipe(recipe) {
    recipeDialogHeading.replaceChildren(
        createElement("h2", "text-2xl font-bold text-amber-400", recipe.title),
        createElement("p", "mt-1 text-sm text-slate-400", recipe.category)
    );
    recipeDialogHeading.firstElementChild.id = "recipeDialogTitle";
    recipeDialogBody.replaceChildren();
    recipeDialogBody.appendChild(createElement("p", "text-sm leading-relaxed text-slate-300", recipe.description));

    const details = [
        ["Total time", recipe.time],
        ["Preparation", recipe.prepTime],
        ["Cooking", recipe.cookTime],
        ["Servings", recipe.servings],
        ["Temperature", recipe.temp]
    ].filter(([, value]) => value);
    if (details.length > 0) {
        const detailGrid = document.createElement("dl");
        detailGrid.className = "grid grid-cols-2 gap-3 rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:grid-cols-3";
        details.forEach(([label, value]) => {
            const detail = document.createElement("div");
            detail.appendChild(createElement("dt", "text-xs font-semibold uppercase text-slate-400", label));
            detail.appendChild(createElement("dd", "mt-1 text-sm text-slate-100", value));
            detailGrid.appendChild(detail);
        });
        recipeDialogBody.appendChild(detailGrid);
    }

    appendRecipeSection(recipeDialogBody, "Ingredients", recipe.ingredients);
    if (recipe.instructions?.length) {
        appendRecipeSection(recipeDialogBody, "Directions", recipe.instructions, "ol");
    }
    if (recipe.notes) {
        recipeDialogBody.appendChild(createElement(
            "p",
            "rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-100",
            recipe.notes
        ));
    }
    if (recipe.source) {
        recipeDialogBody.appendChild(createElement("p", "border-t border-slate-700 pt-4 text-xs text-slate-400", `Source: ${recipe.source}`));
    }
    recipeDialog.showModal();
}

function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    return element;
}

function displayRecipes(recipesToDisplay) {
    recipeGrid.replaceChildren();

    if (recipesToDisplay.length === 0) {
        const emptyMessage = createElement(
            "p",
            "col-span-full py-12 text-center text-slate-400",
            "No recipes found matching your search."
        );
        recipeGrid.appendChild(emptyMessage);
        return;
    }

    recipesToDisplay.forEach((recipe) => {
        const card = document.createElement("article");
        card.className = "overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-lg transition-all hover:border-amber-400/50";

        if (recipe.image) {
            const image = document.createElement("img");
            image.className = "recipe-card-image";
            image.src = recipe.image;
            image.alt = recipe.imageAlt || `A photo of ${recipe.title}.`;
            image.loading = "lazy";
            image.decoding = "async";
            card.appendChild(image);
        } else {
            const placeholder = createElement(
                "div",
                "recipe-photo-placeholder flex h-44 flex-col items-center justify-center gap-2 border-b border-slate-700 text-sm text-slate-400",
                ""
            );
            placeholder.setAttribute("role", "img");
            placeholder.setAttribute("aria-label", `Photo placeholder for ${recipe.title}`);
            placeholder.appendChild(createElement("span", "text-2xl", "Photo"));
            placeholder.appendChild(createElement("span", "", "Your photo will go here"));
            card.appendChild(placeholder);
        }

        const content = document.createElement("div");
        content.className = "p-6";
        const heading = document.createElement("div");
        heading.className = "mb-3 flex items-start justify-between gap-2";
        heading.appendChild(createElement("h2", "text-xl font-semibold text-slate-100", recipe.title));
        heading.appendChild(createElement(
            "span",
            "rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-400",
            recipe.category
        ));
        content.appendChild(heading);
        content.appendChild(createElement("p", "mb-4 text-sm leading-relaxed text-slate-300", recipe.description));

        const details = document.createElement("div");
        details.className = "mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-slate-700/50 bg-slate-900/50 p-2.5 text-xs text-slate-400";
        const temperature = document.createElement("span");
        temperature.appendChild(document.createTextNode("🔥 "));
        temperature.appendChild(createElement("strong", "", "Target:"));
        temperature.appendChild(document.createTextNode(` ${recipe.temp}`));
        const time = document.createElement("span");
        time.appendChild(document.createTextNode("⏱️ "));
        time.appendChild(createElement("strong", "", "Time:"));
        time.appendChild(document.createTextNode(` ${recipe.time}`));
        details.append(temperature, time);
        content.appendChild(details);

        content.appendChild(createElement("h3", "mb-2 text-xs font-bold uppercase tracking-wider text-slate-400", "Key Ingredients:"));
        const ingredients = document.createElement("ul");
        ingredients.className = "mb-6 list-inside list-disc space-y-1 text-sm text-slate-300";
        recipe.ingredients.forEach((ingredient) => {
            ingredients.appendChild(createElement("li", "", ingredient));
        });
        content.appendChild(ingredients);
        card.appendChild(content);

        const button = createElement(
            "button",
            "mx-6 mb-6 w-[calc(100%-3rem)] rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-amber-500 hover:text-slate-950",
            "View Full Recipe"
        );
        button.type = "button";
        button.addEventListener("click", () => {
            showRecipe(recipe);
        });
        card.appendChild(button);
        recipeGrid.appendChild(card);
    });
}

function filterRecipes() {
    const searchTerm = searchInput.value.trim().toLocaleLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredRecipes = recipes.filter((recipe) => {
        const matchesSearch =
            recipe.title.toLocaleLowerCase().includes(searchTerm) ||
            recipe.description.toLocaleLowerCase().includes(searchTerm) ||
            recipe.ingredients.some((ingredient) => ingredient.toLocaleLowerCase().includes(searchTerm)) ||
            recipe.notes?.toLocaleLowerCase().includes(searchTerm) ||
            recipe.instructions?.some((instruction) => instruction.toLocaleLowerCase().includes(searchTerm));
        const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayRecipes(filteredRecipes);
}

searchInput.addEventListener("input", filterRecipes);
categoryFilter.addEventListener("change", filterRecipes);
document.getElementById("closeRecipeDialog").addEventListener("click", () => recipeDialog.close());
recipeDialog.addEventListener("click", (event) => {
    if (event.target === recipeDialog) {
        recipeDialog.close();
    }
});

displayRecipes(recipes);
