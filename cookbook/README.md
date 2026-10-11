# Jop's Master Cookbook

The recipe catalog is in [`recipes.js`](./recipes.js), separate from the page behavior in `app.js`. The page is static and works without a build step or a server-side database.

## Adding a recipe

1. Keep the original document in `Recettes/`.
2. Add a new object to the `window.cookbookRecipes` array in `recipes.js`.
3. Use the next unique numeric `id` and include `title`, `category`, `temp`, `time`, `description`, and an `ingredients` array. Add `instructions`, `servings`, `prepTime`, `cookTime`, `notes`, and `source` when available.
4. Leave missing details as `"Not specified"` or explain them in `notes`; do not guess.
5. Cards show a photo placeholder. When you have a real recipe photo, add it under `images/` and set `image` to its relative path, such as `"images/banana-bread.jpg"`. Add useful alternative text with `imageAlt`.

Cards, search, filters, and recipe dialogs are generated from this catalog. Keep recipe content in `recipes.js` and display or interaction code in `app.js`.
