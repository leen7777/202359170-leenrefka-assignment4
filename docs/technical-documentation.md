# Technical Documentation
**Student:** Leen Refka | **ID:** 202359170 | **Course:** SWE 363

---

## 1. Overview

This is a fully responsive personal portfolio web application built with HTML, CSS, and JavaScript. It serves as the final submission for SWE 363, combining all features developed across four assignments into a single polished, deployed application.

**Sections:**
- About / Hero — profile, typing animation, resume download, social links
- Experience & Education — two-column timeline
- Projects — filterable, sortable, searchable grid
- Skills — category cards + animated proficiency bars
- GitHub Repos — live GitHub API integration
- Fun Facts — public API with loading/error states
- Contact — validated contact form

---

## 2. Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure, ARIA accessibility |
| CSS3 | Layout (Grid/Flex), custom properties, animations |
| Vanilla JavaScript (ES2020) | All interactivity and API calls |
| Google Fonts | Cormorant Garamond + DM Sans |
| GitHub REST API | Live repository display |
| Useless Facts API | Random fun facts |
| Git & GitHub | Version control |
| GitHub Pages / Netlify | Deployment |

---

## 3. Project Structure

```
202359170-leenrefka-assignment1/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       └── profile.jpg
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── presentation/
    ├── slides.pdf
    └── demo-video.mp4
```

**Separation of concerns:**
- `index.html` → structure and content only
- `css/styles.css` → all visual styling with CSS custom properties
- `js/script.js` → all behaviour, organized as independent `init*` functions

---

## 4. HTML Structure

Semantic elements used throughout:
- `<nav>` with `role="navigation"` and `aria-label`
- `<section>` for each content group, each with an `id` for smooth scroll targeting
- `<form>` with `novalidate` (custom JS validation) and `autocomplete` hints
- `<footer>` with visit timer and navigation links
- `<button id="backToTop">` — fixed floating action button

**Accessibility:**
- All buttons have `aria-label`
- Dynamic regions use `aria-live="polite"` (greeting banner, fact box, form message)
- Images have descriptive `alt` text
- Hamburger uses `aria-expanded` and `aria-controls`
- Form errors have `role="alert"`

---

## 5. CSS Architecture

### 5.1 Custom Properties (Variables)

All design tokens are defined once in `:root` and overridden for dark mode via `[data-theme="dark"]`:

```css
:root {
    --bg-primary: #ffffff;
    --accent:     #ff1493;
    --font-body:  'DM Sans', sans-serif;
    --spacing-md: 2rem;
    --radius:     15px;
    --transition: 0.3s ease;
}
```

This makes theme switching a single attribute change on `<html>` and ensures every component inherits consistent values.

### 5.2 Layout System

- **Flexbox** → navbar, hero actions, footer, form rows
- **CSS Grid** → projects grid, skills grid, contact content, github grid
- **`auto-fit` + `minmax`** → responsive grid columns that reflow without media queries
- **Media queries** at 968px, 768px, and 480px for targeted adjustments

### 5.3 Animations

| Animation | Trigger | Purpose |
|-----------|---------|---------|
| `fadeUp` + `floatIn` | Page load (CSS `animation`) | Hero entrance |
| `.reveal` + IntersectionObserver | Scroll | Sections fade in on viewport entry |
| `prof-bar-fill` width transition | IntersectionObserver | Skill bars animate to level |
| `blink` | CSS `animation` | Typing cursor blink |
| `spin` | CSS `animation` | Loading spinner |

All transitions are ≤ 0.8s with `ease` or `cubic-bezier` timing.

---

## 6. JavaScript Modules

Each feature is an isolated `init*` function called in `DOMContentLoaded`. `loadTheme()` runs before the DOM to prevent flash of unstyled theme.

### 6.1 Theme Toggle
Toggles `data-theme` on `<html>`, saves to `localStorage`, restores on load. Reads `prefers-color-scheme` as fallback.

### 6.2 Greeting Banner + Personalised Greeting
- `setTimeGreeting(name)` — picks morning/afternoon/evening/night based on `new Date().getHours()`
- Visitor name persisted to `localStorage` and restored on revisit

### 6.3 Typing Animation
Pure-JS typewriter: iterates through a `phrases[]` array, types character by character, pauses, then deletes before moving to the next phrase. No external library.

### 6.4 Hamburger Mobile Menu
Toggles `.open` on `<ul class="nav-menu">`, sets `aria-expanded`, and closes on outside click or nav-link click.

### 6.5 Scroll Progress Bar
`scroll` event listener calculates `(scrollY / (scrollHeight − innerHeight)) × 100` and sets the `#scrollProgress` element's `width`.

### 6.6 Project Filter + Sort + Search
All three controls are composed in a single `applyFilters(category, query)` function:
1. Re-orders cards in the DOM via `Array.sort` + `appendChild`
2. Applies `.hidden` to non-matching cards
3. Shows `#emptyState` if zero cards are visible

### 6.7 Skill Proficiency Bars
`IntersectionObserver` (threshold 0.3) watches each `.prof-item`. When it enters the viewport, the fill div's `width` is set to `data-level + '%'`, triggering the CSS transition.

### 6.8 GitHub Repos API
`fetch('https://api.github.com/users/leen7777/repos?sort=updated&per_page=6')` — renders repo cards with language colour dots and star counts. Shows a friendly error card if the API is unavailable.

### 6.9 Fun Facts API
`fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')` — disables button during request, shows spinner, renders fact or error message.

### 6.10 Contact Form
Client-side validation with per-field inline errors. Submission simulated with `setTimeout`. Uses `aria-live` for the success/error message region.

### 6.11 Scroll Reveal
`IntersectionObserver` (threshold 0.1) adds `.visible` to `.reveal` elements as they enter the viewport. Observer disconnects after first trigger for performance.

### 6.12 Back to Top
Shows `.back-to-top` button (CSS `opacity` + `pointer-events`) when `pageYOffset > 400`. Calls `window.scrollTo({ top: 0, behavior: 'smooth' })`.

---

## 7. Performance Considerations

- `loading="lazy"` on the profile image
- Google Fonts loaded via `<link rel="preconnect">` to reduce DNS lookup time
- `{ passive: true }` on scroll event listeners to avoid blocking the main thread
- `IntersectionObserver` instead of scroll polling for reveal and skill bars
- No external JS libraries — zero dependency bundle overhead
- CSS custom properties prevent style duplication across theme variants

---

## 8. Responsiveness & Testing

Tested manually using:
- Chrome DevTools device simulation (iPhone SE, iPad, 1440px desktop)
- Firefox responsive design mode
- Manual viewport resize

Breakpoints:
- `≤ 968px` → contact grid collapses, skills layout stacks
- `≤ 768px` → hamburger menu activated, timeline collapses to single column
- `≤ 480px` → font size reduced, back-to-top repositioned

---

## 9. Known Limitations

| Limitation | Status |
|------------|--------|
| Contact form doesn't send real emails | Simulated client-side; EmailJS integration is planned |
| GitHub API has rate limiting (60 req/hour unauthenticated) | Shows error card if limit hit |
| Fun Facts API is an external service | Graceful error shown if unavailable |
| Resume PDF must be manually added to `assets/` | File excluded from repo for size |

---

## 10. Future Improvements

- Add EmailJS or Formspree for real contact form submission
- Implement a blog/notes section using a headless CMS
- Add project detail modals for richer showcase
- Add multilingual support (Arabic / English toggle)
- Set up CI/CD with GitHub Actions for automatic deployment
