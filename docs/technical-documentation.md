# Technical Documentation

## 1. Overview

This project is a responsive personal portfolio website developed using HTML, CSS, and JavaScript.  
The goal was to implement a clean, structured, and interactive web application while following best practices in file organization and code quality.

The website includes:

- About section
- Projects section
- Skills section
- Contact form
- Dark/Light theme toggle
- Smooth scrolling navigation
- Responsive layout

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



## 5. CSS Architecture

### 5.1 CSS Variables

CSS custom properties are defined under `:root` to support:

- Light theme
- Dark theme
- Consistent spacing
- Typography
- Color system

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

Responsive breakpoints:

968px

768px

480px

The layout adapts for desktop, tablet, and mobile devices.

6. JavaScript Functionality
6.1 Theme Toggle
Toggles between light and dark themes

Uses data-theme attribute on <html>

Saves preference using localStorage

Loads saved theme on page refresh

6.2 Smooth Scrolling
Navigation links:

Prevent default behavior

Scroll smoothly to target section

Adjust scroll position based on navbar height

6.3 Contact Form Handling
The contact form includes:

Required field validation

Submit button loading state

Simulated submission delay

Success message display

Form reset after submission

No backend is implemented.

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





