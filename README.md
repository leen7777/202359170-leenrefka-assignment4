# Leen Refka — Personal Portfolio Website
### SWE 363 | Assignment 4 | Student ID: 202359170

A complete, responsive personal portfolio web application built with HTML, CSS, and JavaScript — deployed and production-ready.

**Live Demo:** [GitHub Pages / Netlify link here once deployed]

---

## Features

### Assignment 1 — Foundation
- Responsive layout using CSS Grid and Flexbox
- Dark / Light theme toggle (preference saved to `localStorage`)
- Smooth scrolling navigation
- Contact form with client-side validation

### Assignment 2 — Interactivity
- Personalized greeting with time-based message (morning / afternoon / evening)
- Live project search (by name or technology)
- Project filter tabs (All / ML / Web / Python)
- Fun Facts API with loading state and error handling
- Scroll reveal animations

### Assignment 3 — APIs & Polish
- GitHub Repos API — latest public repos with language dots and star counts
- Project sorting (A→Z, Z→A, Default) composable with filters and search
- Visit duration timer in the footer
- Admin / Guest mode toggle via `localStorage`

### Assignment 4 — Final Polish & Innovation
- **Typing animation** — rotating role phrases in the hero section
- **Hamburger mobile menu** — full responsive navigation for small screens
- **Scroll progress bar** — thin gradient bar at the top indicating reading progress
- **Animated skill proficiency bars** — triggered by IntersectionObserver on scroll
- **Experience / Education timeline** — visual two-column timeline of milestones
- **Resume download button** — direct link to PDF in the hero
- **Back-to-top button** — appears after scrolling 400px, smooth scrolls back
- **Footer year** — auto-updated via JavaScript
- **Accessibility improvements** — `aria-*` attributes, `role`, `aria-live` regions, `alt` text
- **Code quality** — removed all duplicate CSS rules, consistent CSS variables, clean JS modules

---

## Project Structure

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

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/leen7777/202359170-leenrefka-assignment1.git
   ```
2. Open `index.html` in any modern browser — no build step or server required.

---

## APIs Used

| API | Purpose | Error Handling |
|-----|---------|---------------|
| [Useless Facts API](https://uselessfacts.jsph.pl/) | Random fun facts | User-friendly error message shown |
| [GitHub REST API](https://docs.github.com/en/rest) | Public repo display | Fallback error card rendered |

---

## AI Usage Summary

Claude (Anthropic) was used throughout all four assignments for:
- Planning structure and feature design
- Generating and explaining JavaScript logic
- Debugging issues and reviewing code quality
- Writing and improving documentation

Full details — tools used, challenges encountered, modifications made — are in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).

---

## Author

**Leen Refka**  
Computer Science Student — KFUPM  
Dhahran, Saudi Arabia  
Email: leen.n.refka@gmail.com  
GitHub: [github.com/leen7777](https://github.com/leen7777)
