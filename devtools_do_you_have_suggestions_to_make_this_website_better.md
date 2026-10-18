# Exported Chat from Chrome DevTools AI Assistance

**Export Timestamp (UTC):** 2026-10-18T02:23:55.768Z

---

## User

do you have suggestions to make this website better

## AI

### Auditing your page with Lighthouse

### Analyzing data

**Lighthouse report:**
````
# Lighthouse Report:
# Lighthouse Report Summary
URL: https://jopism.com/
Fetch Time: 2026-10-18T02:23:13.276Z
Lighthouse Version: 13.4.1

## Category Scores
- Performance: 51
- Accessibility: 96
- Best Practices: 96
- SEO: 100
# Audits for Accessibility
These checks highlight opportunities to [improve the accessibility of your web app](https://developer.chrome.com/docs/lighthouse/accessibility/). Automatic detection can only detect a subset of issues and does not guarantee the accessibility of your web app, so [manual testing](https://web.dev/articles/how-to-review) is also encouraged.

The following audits in this category have a score below 90 and may need attention:
- **List items (`<li>`) are not contained within `<ul>`, `<ol>` or `<menu>` parent elements.**: 0
  * Screen readers require list items (`<li>`) to be contained within a parent `<ul>`, `<ol>` or `<menu>` to be announced properly. [Learn more about proper list structure](https://dequeuniversity.com/rules/axe/4.12/listitem).

    - Item:
      * **Failing Elements**: Seattle Seahawks
    14
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,0,LI,0,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Denver Broncos
    17
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,0,LI,1,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Houston Texans
    0
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,1,LI,0,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Jacksonville Jaguars
    0
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,1,LI,1,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Chicago Bears
    0
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,2,LI,0,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Atlanta Falcons
    0
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,2,LI,1,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Baltimore Ravens
    0
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,3,LI,0,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Cleveland Browns
    0
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,3,LI,1,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Tennessee Titans
    0
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,4,LI,0,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Indianapolis Colts
    0
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,4,LI,1,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Edmonton Oilers
    1
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,1,ARTICLE,1,UL,0,LI,0,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Utah Mammoth
    0
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,1,ARTICLE,1,UL,0,LI,1,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Pittsburgh Penguins
    0
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,1,ARTICLE,1,UL,1,LI,0,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Vegas Golden Knights
    2
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,1,ARTICLE,1,UL,1,LI,1,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Boston Bruins
    1
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,1,ARTICLE,1,UL,2,LI,0,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Los Angeles Kings
    1
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,1,ARTICLE,1,UL,2,LI,1,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: St. Louis Blues
    2
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,1,ARTICLE,1,UL,3,LI,0,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Nashville Predators
    5
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,1,ARTICLE,1,UL,3,LI,1,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: New York Islanders
    4
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,1,ARTICLE,1,UL,4,LI,0,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
    - Item:
      * **Failing Elements**: Toronto Maple Leafs
    1
      * **Failing Elements selector**: article.sports-score-card > ul.sports-score-list > li.sports-game > li.sports-team-score
      * **Failing Elements path**: 1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,1,ARTICLE,1,UL,4,LI,1,LI
      * **Failing Elements explanation**: Fix any of the following:   List item does not have a <ul>, <ol> parent element
````

### Reading accessibility details

Checking the accessibility properties of the failing list items to understand their role and parent-child relationship in the AOM.

**Code executed:**
```
getElementAccessibilityDetails('1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,0,LI,0,LI')
```

**Data returned:**
```
{
  "role": "listitem",
  "name": "",
  "nameSource": "relatedElement",
  "properties": {
    "focusable": false,
    "hidden": false
  },
  "ariaAttributes": {},
  "isIgnored": false,
  "ignoredReasons": null,
  "backendNodeId": 1795
}
```

### Reading accessibility details

Checking the accessibility properties of the parent element to confirm the list structure.

**Code executed:**
```
getElementAccessibilityDetails('1,HTML,1,BODY,2,MAIN,1,SECTION,0,DIV,1,DIV,0,ARTICLE,1,UL,0,LI')
```

**Data returned:**
```
{
  "role": "listitem",
  "name": "",
  "nameSource": "relatedElement",
  "properties": {
    "focusable": false,
    "hidden": false
  },
  "ariaAttributes": {},
  "isIgnored": false,
  "ignoredReasons": null,
  "backendNodeId": 1800
}
```

### Answer

The Lighthouse report highlights a structural issue with how sports scores are marked up. While your accessibility score is high (96), fixing this specific error will ensure screen reader users can navigate your sports data correctly.

### Improper List Nesting
The `li.sports-team-score` elements are nested directly inside another `li.sports-game` element without a parent `<ul>` or `<ol>` to group them. Screen readers expect `<li>` tags to be direct children of a list container. When they are nested inside another `<li>` without a new list wrapper, the structural hierarchy breaks, and the relationship between the data points is lost.

**The Fix**
Wrap the internal list items in a new `<ul>` element within the parent list item.

*   **Current structure (incorrect):**
    ```html
    <li class="sports-game">
      <li class="sports-team-score">Seattle Seahawks 14</li>
      <li class="sports-team-score">Denver Broncos 17</li>
    </li>
    ```

*   **Recommended structure (correct):**
    ```html
    <li class="sports-game">
      <ul class="team-scores">
        <li class="sports-team-score">Seattle Seahawks 14</li>
        <li class="sports-team-score">Denver Broncos 17</li>
      </ul>
    </li>
    ```

### Other Observations
Your SEO and Best Practices scores are excellent. However, your **Performance score is 51**, which is quite low. While I specialize in accessibility, improving your performance (likely by optimizing images or reducing JavaScript execution time) would significantly improve the overall user experience.

Would you like me to investigate any specific elements or provide more details on these structural fixes?