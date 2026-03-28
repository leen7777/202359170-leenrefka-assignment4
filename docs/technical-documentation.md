# Technical Documentation

## 1. Overview

This project is a responsive personal portfolio website developed using HTML, CSS, and JavaScript.  
The goal was to implement a clean, structured, and interactive web application while following best practices in file organization and code quality.

The website includes:

About section with personalized greeting input
Dynamic greeting banner (time-based)
Projects section with filter tabs and live search
Skills section
Fun Facts section (public API)
Contact form with validation
Dark/Light theme toggle with localStorage
Smooth scrolling navigation
Scroll reveal animations
Responsive layout



---

## 2. Technologies Used

- **HTML** → Structure and semantic layout
- **CSS** → Styling, layout, responsiveness, theming
- **JavaScript ** → Interactivity and dynamic features
- **Git & GitHub** → Version control
- **GitHub Pages**  → Deployment

---

## 3. Project Structure

assignment-1/
├── index.html
├── css/
│ └── styles.css
├── js/
│ └── script.js
├── assets/
│ └── images/
├── docs/
│ ├── ai-usage-report.md
│ └── technical-documentation.md
└── README.md


### Structure Rationale

The project follows the principle of separation of concerns:

- HTML → Content structure
- CSS → Styling and layout
- JavaScript → Behavior and interactivity

This ensures maintainability and scalability.



## 4. HTML Structure

The HTML document uses semantic elements:

- `<nav>` for navigation
- `<section>` for content grouping
- `<form>` for contact form
- `<footer>` for bottom information

Each major section has an `id` to allow smooth scrolling navigation.

Accessibility considerations:
- `aria-label` attributes for icons
- `alt` text for images
- Required form inputs
-Descriptive placeholder text on all inputs




## 5. CSS Architecture

### 5.1 CSS Variables

CSS custom properties are defined under :root to support:

Light and dark themes
Consistent spacing system (--spacing-xs through --spacing-xl)
Typography (--font-body, --font-heading)
Color system (--accent, --bg-primary, --text-primary, etc.)


This makes the theme toggle efficient and scalable.

Example:

```css
:root {
  --bg-primary: #ffffff;
  --accent: #ff1493;
}
Dark theme overrides are applied using:

[data-theme="dark"] { ... }
5.2 Layout System
Flexbox → Navigation and alignment

CSS Grid → Projects and skills sections

Media queries → Responsive behavior


The layout adapts for desktop, tablet, and mobile devices.

5.3 Animations

keyframes fadeUp → Sections and content fade in upward on load
keyframes floatIn → Profile image entrance animation
keyframes spin → Loading spinner for the Fun Facts button
.reveal class + IntersectionObserver → Scroll-triggered fade-in for all major sections
CSS transitions on all interactive elements (buttons, cards, nav links, social icons)

All animations use ease or linear timing and are kept under 0.8s to avoid feeling sluggish.


6. JavaScript Functionality
6.1 Theme Toggle

Toggles data-theme="dark" on the <html> element
Saves the user's preference using localStorage
Reads the saved preference on page load and applies it automatically
Updates the toggle button icon between 🌙 and ☀️

6.2 Greeting Banner

Runs on page load
Reads the current hour using new Date().getHours()
Displays a time-appropriate greeting: Good morning / Good afternoon / Good evening / Good night
Updates the #greetingBanner element's text content dynamically

6.3 Personalized Greeting

User enters their name in the #visitorName input
On clicking the "Say hi!" button, the banner updates to include their name
Example: "✨ Good evening, Leen! Welcome to my portfolio."

6.4 Project Filter Tabs

Each project card has a data-category attribute (e.g. ml, web, python)
Clicking a filter tab adds the .active class to that tab and removes it from others
Cards not matching the selected category receive the .hidden class (display: none)
"All" tab shows all cards
If no cards are visible, the #emptyState message is displayed

6.5 Live Project Search

Listens for input events on the #projectSearch field
On each keypress, reads the search value and converts it to lowercase
Checks each card's data-title and data-tags attributes against the search value
Non-matching cards receive the .hidden class
Works in combination with the active filter tab
A clear button (✕) resets the search field and restores all cards

6.6 Fun Facts API

Fetches from a public facts API on button click
Shows a loading spinner inside the button while the request is in progress
On success: displays the fact text and category inside #factBox
On failure: displays a friendly error message so the user is never left without feedback
Button is disabled during loading to prevent duplicate requests

6.7 Contact Form Handling

Validates all required fields (name, email, message) on submit
Shows inline per-field error messages using .field-error elements
Highlights invalid inputs with a red border (.error class)
Simulates a submission delay with a loading state on the button
Displays a success message on completion and resets the form
No backend is implemented — submission is simulated client-side

6.8 Smooth Scrolling

Navigation links prevent default anchor behavior
Scroll position accounts for the sticky navbar height using offsetHeight
window.scrollTo() is called with behavior: 'smooth'

6.9 Scroll Reveal

All major sections have the .reveal class applied in HTML
An IntersectionObserver watches each .reveal element
When an element enters the viewport, the .visible class is added, triggering the CSS fade-in transition
The observer disconnects from each element after it has been revealed


7. Responsiveness & Testing
The website was tested using:

Manual browser resizing

Chrome DevTools device simulation

Multiple viewport sizes

The design ensures:

No horizontal overflow

Proper stacking on smaller screens



8. Code Quality Practices
Consistent indentation and formatting

Logical file organization

Descriptive class names

Comments explaining major sections

Removal of unused code

No console errors

9. Future Improvements
Possible enhancements:

Backend integration for contact form



10. Data Handling
MethodUsagelocalStorageSaves and retrieves dark/light theme preferencefetch() APIRetrieves fun facts from a public external APIDOM attributesdata-category and data-tags used for client-side filtering and searchForm stateManaged entirely in JavaScript with no backend



11. Known Limitations

The contact form does not send real emails — submission is simulated client-side only
The profile image must be manually added to assets/images/ as it is not included in the repository
The Fun Facts API depends on an external service — if the API is down, an error message is shown

