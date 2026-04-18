# 202359170-leenrefka-assignment1
# Portfolio Website

A responsive personal portfolio website built using HTML, CSS, and JavaScript.
Showcases projects, skills, and contact information with interactive features and external API integrations.

---

## Features

### Assignment 1 
- Responsive design (desktop / tablet / mobile) using CSS Grid and media queries
- Dark/Light theme toggle with preference saved via `localStorage`
- Smooth scrolling navigation
- Contact form with validation and success message

### Assignment 2 
- Personalized greeting — user enters their name and receives a time-based greeting (Good morning, Good afternoon, etc.)
- Dynamic greeting banner at the top of the page
- Live project search — search by name or technology with an empty-state message
- Project filter tabs — filter by All, Machine Learning, Web, Python
- Fun Facts API — fetches random facts from a public API with loading spinner and error handling
- Scroll reveal animations — sections fade in as the user scrolls down
- Per-field form error messages

### Assignment 3 
- GitHub Repos API— fetches and displays the latest public repositories from GitHub with language badges and star counts; shows a user-friendly error if the API is unavailable
- Project sorting — sort projects A→Z, Z→A, or back to default, composable with existing filters and search
- Visit duration timer— live counter in the footer showing how long the current visitor has been on the page
- Login/logout state management — Guest / Admin mode toggle stored in `localStorage`; Admin mode reveals an admin bar with a status message
- Performance — `loading="lazy"` on images, Google Fonts loaded via `<link rel="preconnect">` for faster font rendering, bug fix for missing `id="submitBtn"` that prevented form submission feedback

---

## Project Structure

```
202359170-leenrefka-assignment1/
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
└── README.md

 How to Run Locally

1. Clone or download the repository
2. Open `index.html` directly in any modern browser  no build step or server needed


## APIs Used

| [Useless Facts API](https://uselessfacts.jsph.pl/) | Random fun facts in the Fun Facts section | User-friendly message on failure |
| [GitHub REST API](https://docs.github.com/en/rest) | Display public repos in the GitHub section | Fallback error card shown on failure |

---

## AI Usage Summary

AI tools (Claude) were used throughout all three assignments for:
- Planning structure and layout
- Generating and explaining JavaScript logic
- Debugging issues and reviewing code quality
- Writing documentation

Full details, including specific use cases, challenges, and how AI output was reviewed and modified, are in  docs/ai-usage-report.md



## Live Deployment

GitHub repository: https://github.com/leen7777/202359170-leenrefka-assignment2


## Author

Leen Refka  
Dhahran, Saudi Arabia  
Email: leen.n.refka@gmail.com
