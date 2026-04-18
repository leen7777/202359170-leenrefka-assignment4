# AI Usage Report

---

## Assignment 1 & 2

### 1. Tools Used & Use Cases

**ChatGPT**

ChatGPT was used primarily for:
- Breaking down the assignment requirements and planning the overall structure.
- Generating an initial layout concept and suggesting a color scheme.
- Assisting with file structure organization.
- Explaining how to correctly add and reference images in the project folders.
- Generating a structured template for the README.md.

ChatGPT was especially helpful when I faced difficulties adding images due to incorrect file paths and folder structure. It guided me through proper relative file referencing and project organization.

**Claude**

Claude was mainly used for:
- Assisting with writing JavaScript code for interactive features.
- Explaining the logic behind the greeting banner, project filter tabs, live search, and Fun Facts API integration.
- Helping debug small JavaScript-related issues.
- Suggesting CSS animation patterns for scroll reveal and hover effects.
- Reviewing and improving code structure and readability.

### 2. Benefits & Challenges

**Benefits**
- AI tools significantly reduced repetitive setup work.
- Assisted in debugging and correcting structural issues.
- Provided guidance for documentation structure (README and reports).
- Using AI allowed me to focus more on understanding the logic and structure rather than spending excessive time on syntax errors or formatting issues.

**Challenges**
- Some AI-generated code needed adjustments to fit my specific folder structure.
- AI occasionally suggested overly complex solutions that I simplified to keep the code readable and maintainable.
- I had to verify AI explanations against the actual browser behavior.

### 3. Learning Outcomes

Through using AI tools in this assignment, I learned:
- The importance of proper project structure and file organization.
- How to better understand JavaScript logic.
- How to structure technical documentation and README files.
- More importantly, I learned to allocate my time toward understanding core concepts and improving my coding skills instead of focusing only on repetitive or mechanical tasks.

### 4. Responsible Use & Modifications

All AI-generated suggestions were reviewed and modified before final implementation. I did not copy and paste AI outputs directly without understanding them first.

---

## Assignment 3

### 1. Tools Used & Use Cases

**Claude (Anthropic)**

Claude was used for Assignment 3 to:
- **GitHub API integration** — Claude helped design the `initGitHubRepos()` function, including the async fetch logic, dynamic repo card HTML generation, language colour mapping, and graceful error handling when the API is unreachable or rate-limited.
- **Project sorting** — Claude explained how to re-order DOM nodes by appending sorted card elements back into the grid, and how to compose sorting with the existing filter+search system without duplicating logic.
- **Visit timer** — Claude suggested using `Date.now()` with `setInterval` to compute elapsed time and format it as minutes and seconds, and placing it in the footer with `aria-live` for accessibility.
- **Login/logout state** — Claude helped implement the admin mode toggle using `localStorage`, showing/hiding the admin bar, and persisting state across page reloads.
- **Performance improvements** — Claude identified the missing Google Fonts `<link>` tags (the fonts were referenced in CSS but never loaded), suggested adding `loading="lazy"` to the profile image, and spotted a bug where `submitBtn` had no `id` attribute in the HTML despite being referenced in JavaScript.
- **Code review** — Claude reviewed the existing codebase and identified duplicate CSS blocks from Assignment 2 that bloat the stylesheet.

### 2. Benefits & Challenges

**Benefits**
- Claude was effective at explaining *why* a pattern works (e.g., why DOM re-insertion is needed for visual sorting), not just providing the code snippet.
- Helped me understand async/await error handling more deeply, particularly the difference between network errors and HTTP error status codes.
- Pointed out a pre-existing bug (`submitBtn` missing `id`) that I had not noticed, which would have caused the contact form to silently fail during submission.

**Challenges**
- AI-generated language colour maps were incomplete; I had to cross-reference GitHub's own linguist data and trim the list to relevant languages.
- The suggested GitHub API endpoint needed adjustment — the default sort and `per_page` parameters had to be tuned to show the most relevant repos rather than all of them.
- I had to carefully integrate the new sort logic into the existing `initFilterTabs()` function myself, rather than accepting a full replacement, to avoid accidentally breaking the filter and search features.

### 3. Learning Outcomes

From Assignment 3, I learned:
- How to consume a real REST API (GitHub API) including reading response status codes and handling rate-limiting gracefully.
- How JavaScript's `Array.prototype.sort` with `localeCompare` handles alphabetical ordering correctly across different character sets.
- The importance of DOM order vs. visual order — re-appending elements is a valid and efficient way to reorder visible content without re-rendering.
- How `localStorage` can be used for lightweight state persistence (login state, theme, visitor name) without any backend.
- Performance fundamentals: lazy image loading, font preloading with `preconnect`, and why duplicate CSS rules increase file size and can cause unexpected specificity conflicts.

### 4. Responsible Use & Modifications

All AI-generated code was reviewed line by line before use. Key modifications I made:
- Simplified the language colour map to only the languages relevant to my own repos.
- Rewrote the sort logic to integrate cleanly with the existing filter/search state rather than duplicating the `applyFilters` call.
- Adjusted the admin bar UI to match the existing pink theme rather than using the AI's generic grey suggestion.
- Tested every new feature in Chrome DevTools including simulating a failed network request (offline mode) to verify error states work correctly.
