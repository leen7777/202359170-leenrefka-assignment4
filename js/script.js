/**
 * Portfolio Website - Assignment 3 JavaScript
 * Features: Theme Toggle, Time-based Greeting, Personalised Greeting,
 *           Project Filter Tabs + Sorting, Live Search, Fun Facts API,
 *           GitHub Repos API, Enhanced Form Validation, Visit Timer,
 *           Login/Logout State, Scroll Reveal, Smooth Scroll,
 *           Navbar Scroll Effect, Back to Top
 */

// ========================
// THEME TOGGLE
// ========================
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.querySelector('.theme-icon');
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    if (themeIcon) themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', next);
}

function loadTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('.theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ========================
// TIME-BASED GREETING BANNER
// ========================
function setTimeGreeting(name) {
    const hour = new Date().getHours();
    let greeting, emoji;

    if (hour < 12)      { greeting = 'Good morning';   emoji = '☀️'; }
    else if (hour < 17) { greeting = 'Good afternoon'; emoji = '🌸'; }
    else if (hour < 21) { greeting = 'Good evening';   emoji = '🌙'; }
    else                { greeting = 'Good night';      emoji = '⭐'; }

    const banner = document.getElementById('greetingBanner');
    if (!banner) return;
    const nameStr = name ? `, ${name}` : '';
    banner.textContent = `${emoji} ${greeting}${nameStr}! Welcome to Leen's portfolio.`;
}

// ========================
// PERSONALISED GREETING (Dynamic Content)
// ========================
function initPersonalisedGreeting() {
    const input = document.getElementById('visitorName');
    const btn   = document.getElementById('greetBtn');
    if (!input || !btn) return;

    // Restore saved name from localStorage
    const savedName = localStorage.getItem('visitorName');
    if (savedName) {
        input.value = savedName;
        setTimeGreeting(savedName);
    } else {
        setTimeGreeting('');
    }

    btn.addEventListener('click', () => {
        const name = input.value.trim();
        if (!name) { input.focus(); return; }
        localStorage.setItem('visitorName', name);
        setTimeGreeting(name);
        btn.textContent = '🎉 Done!';
        setTimeout(() => { btn.textContent = 'Say hi! 👋'; }, 2000);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
    });
}

// ========================
// PROJECT FILTER TABS + LIVE SEARCH + SORTING
// ========================
function initFilterTabs() {
    const tabs        = document.querySelectorAll('.filter-tab');
    const grid        = document.getElementById('projectsGrid');
    const emptyState  = document.getElementById('emptyState');
    const searchInput = document.getElementById('projectSearch');
    const clearBtn    = document.getElementById('searchClear');
    const sortBtns    = document.querySelectorAll('.sort-btn');

    // Capture original DOM order once so "Default" can restore it
    const originalOrder = Array.from(document.querySelectorAll('.project-card'));
    let currentSort = 'default';

    function getSortedCards() {
        const cards = Array.from(document.querySelectorAll('.project-card'));
        if (currentSort === 'az') {
            return cards.sort((a, b) =>
                a.getAttribute('data-title').localeCompare(b.getAttribute('data-title')));
        }
        if (currentSort === 'za') {
            return cards.sort((a, b) =>
                b.getAttribute('data-title').localeCompare(a.getAttribute('data-title')));
        }
        return originalOrder.slice(); // default: original insertion order
    }

    function applyFilters(category, query) {
        // Re-order cards in the DOM according to current sort selection
        getSortedCards().forEach(card => grid.appendChild(card));

        // Apply visibility based on active filter + search query
        let visible = 0;
        document.querySelectorAll('.project-card').forEach(card => {
            const cardCat   = card.getAttribute('data-category');
            const cardTitle = card.getAttribute('data-title').toLowerCase();
            const cardTags  = card.getAttribute('data-tags').toLowerCase();

            const matchCat   = category === 'all' || cardCat === category;
            const matchQuery = !query || cardTitle.includes(query) || cardTags.includes(query);

            if (matchCat && matchQuery) {
                card.classList.remove('hidden');
                visible++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
    }

    function getActiveCategory() {
        const active = document.querySelector('.filter-tab.active');
        return active ? active.getAttribute('data-filter') : 'all';
    }

    function getSearchQuery() {
        return searchInput ? searchInput.value.trim().toLowerCase() : '';
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            applyFilters(tab.getAttribute('data-filter'), getSearchQuery());
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyFilters(getActiveCategory(), searchInput.value.trim().toLowerCase());
        });
    }

    if (clearBtn && searchInput) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            applyFilters(getActiveCategory(), '');
            searchInput.focus();
        });
    }

    // Sort buttons — work together with active filter + search
    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sortBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.getAttribute('data-sort');
            applyFilters(getActiveCategory(), getSearchQuery());
        });
    });
}

// ========================
// FUN FACTS API
// ========================
function initFunFacts() {
    const btn          = document.getElementById('factBtn');
    const factText     = document.getElementById('factText');
    const factCategory = document.getElementById('factCategory');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        btn.disabled = true;
        btn.innerHTML = '<span class="loading-spinner"></span> Loading…';
        if (factText) factText.textContent = 'Fetching a fun fact for you…';
        if (factCategory) factCategory.textContent = '';

        try {
            const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            const data = await res.json();
            if (factText) factText.textContent = data.text;
            if (factCategory) factCategory.textContent = '📚 Random Fact';
        } catch (err) {
            if (factText) factText.textContent = 'Something went wrong. Please try again!';
            if (factCategory) factCategory.textContent = '⚠️ Error';
        } finally {
            btn.disabled = false;
            btn.innerHTML = '🎲 Get Another Fact';
        }
    });
}

// ========================
// GITHUB REPOS API
// ========================
async function initGitHubRepos() {
    const container = document.getElementById('githubRepos');
    if (!container) return;

    // A small subset of common language colours
    const langColors = {
        JavaScript: '#f1e05a',
        Python: '#3572A5',
        HTML: '#e34c26',
        CSS: '#563d7c',
        TypeScript: '#2b7489',
        Java: '#b07219',
        'C++': '#f34b7d',
        Shell: '#89e051',
        'Jupyter Notebook': '#DA5B0B'
    };

    try {
        const res = await fetch(
            'https://api.github.com/users/leen7777/repos?sort=updated&per_page=6'
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const repos = await res.json();

        if (!repos.length) {
            container.innerHTML = `<div class="github-error"><span>📂</span><p>No public repositories found.</p></div>`;
            return;
        }

        container.innerHTML = repos.map(repo => {
            const lang     = repo.language || 'N/A';
            const dotColor = langColors[lang] || 'var(--accent)';
            const desc     = repo.description || 'No description provided.';
            const stars    = repo.stargazers_count;
            return `
            <div class="repo-card">
                <div class="repo-card-header">
                    <p class="repo-name">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                    </p>
                </div>
                <p class="repo-description">${desc}</p>
                <div class="repo-meta">
                    <span class="repo-lang">
                        <span class="lang-dot" style="background:${dotColor};"></span>
                        ${lang}
                    </span>
                    ${stars > 0 ? `<span class="repo-stars">⭐ ${stars}</span>` : ''}
                </div>
            </div>`;
        }).join('');
    } catch (err) {
        container.innerHTML = `
            <div class="github-error">
                <span>⚠️</span>
                <p>Could not load repositories right now. Please check back later.</p>
            </div>`;
    }
}

// ========================
// VISIT DURATION TIMER
// ========================
function initVisitTimer() {
    const el = document.getElementById('visitTimer');
    if (!el) return;
    const start = Date.now();

    setInterval(() => {
        const secs = Math.floor((Date.now() - start) / 1000);
        const mins = Math.floor(secs / 60);
        const rem  = secs % 60;
        el.textContent = mins > 0
            ? `You've been here for ${mins}m ${rem}s`
            : `You've been here for ${secs}s`;
    }, 1000);
}

// ========================
// LOGIN / LOGOUT STATE MANAGEMENT
// ========================
function initLoginState() {
    const btn      = document.getElementById('loginBtn');
    const adminBar = document.getElementById('adminBar');
    if (!btn) return;

    function applyState(isAdmin) {
        if (isAdmin) {
            btn.textContent = '🔒 Admin';
            btn.classList.add('admin');
            if (adminBar) adminBar.style.display = 'flex';
        } else {
            btn.textContent = '👤 Guest';
            btn.classList.remove('admin');
            if (adminBar) adminBar.style.display = 'none';
        }
    }

    // Restore saved login state
    const saved = localStorage.getItem('adminMode') === 'true';
    applyState(saved);

    btn.addEventListener('click', () => {
        const next = localStorage.getItem('adminMode') !== 'true';
        localStorage.setItem('adminMode', next);
        applyState(next);
    });
}

// ========================
// CONTACT FORM — Enhanced Validation
// ========================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setFieldError(id, msg) {
        const el  = document.getElementById(id);
        const err = document.getElementById(id + 'Error');
        if (el)  el.classList.toggle('error', !!msg);
        if (err) err.textContent = msg || '';
    }

    function clearErrors() {
        ['name', 'email', 'message'].forEach(f => setFieldError(f, ''));
    }

    // Clear individual field errors on input
    ['name', 'email', 'message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => setFieldError(id, ''));
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        hideFormMessage();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let valid = true;

        if (!name)                     { setFieldError('name',    'Please enter your name.');             valid = false; }
        if (!email)                    { setFieldError('email',   'Please enter your email.');            valid = false; }
        else if (!validateEmail(email)){ setFieldError('email',   'Please enter a valid email address.'); valid = false; }
        if (!message)                  { setFieldError('message', 'Please enter a message.');             valid = false; }

        if (!valid) {
            showFormMessage('Please fix the errors above and try again.', 'error');
            return;
        }

        const btn     = document.getElementById('submitBtn');
        const btnText = document.getElementById('submitText');
        btn.disabled = true;
        btnText.innerHTML = '<span class="loading-spinner"></span> Sending…';

        // Simulate sending (replace with real backend / EmailJS in production)
        setTimeout(() => {
            showFormMessage(`Thank you, ${name}! Your message has been received. I'll get back to you soon! 💌`, 'success');
            form.reset();
            clearErrors();
            btn.disabled = false;
            btnText.textContent = 'Send Message';
            setTimeout(hideFormMessage, 6000);
        }, 1500);
    });
}

function showFormMessage(text, type) {
    const el = document.getElementById('formMessage');
    if (!el) return;
    el.textContent = text;
    el.className = `form-message ${type}`;
}

function hideFormMessage() {
    const el = document.getElementById('formMessage');
    if (!el) return;
    el.className = 'form-message';
    el.textContent = '';
}

// ========================
// SMOOTH SCROLL
// ========================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navH = document.querySelector('.navbar')?.offsetHeight || 0;
                window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
            }
        });
    });
}

// ========================
// NAVBAR SCROLL EFFECT
// ========================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        const y = window.pageYOffset;
        navbar.style.boxShadow = y > 100
            ? '0 4px 30px rgba(255,20,147,0.15)'
            : '0 2px 20px rgba(255,20,147,0.1)';
        navbar.style.padding = y > 100 ? '0.5rem 0' : '1rem 0';
    });
}

// ========================
// SCROLL REVEAL
// ========================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========================
// BACK TO TOP
// ========================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ========================
// UTILITY: DEBOUNCE
// ========================
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// ========================
// INIT
// ========================
loadTheme(); // Load theme before DOM renders

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio v3 loaded!');

    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

    initLoginState();
    initPersonalisedGreeting();
    initFilterTabs();
    initFunFacts();
    initGitHubRepos();
    initContactForm();
    initVisitTimer();
    initSmoothScroll();
    initNavbarScroll();
    initScrollReveal();
    initBackToTop();

    window.addEventListener('load', () => {
        console.log(`⚡ Page loaded in ${performance.now().toFixed(2)}ms`);
    });
});
