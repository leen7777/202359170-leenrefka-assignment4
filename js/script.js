/**
 * Portfolio Website - Assignment 2 JavaScript
 * Features: Theme Toggle, Time-based Greeting, Personalised Greeting,
 *           Project Filter Tabs, Live Search, Fun Facts API,
 *           Enhanced Form Validation, Scroll Reveal, Smooth Scroll,
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
// PROJECT FILTER TABS + LIVE SEARCH
// ========================
function initFilterTabs() {
    const tabs       = document.querySelectorAll('.filter-tab');
    const cards      = document.querySelectorAll('.project-card');
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('projectSearch');
    const clearBtn    = document.getElementById('searchClear');
 
    function applyFilters(category, query) {
        let visible = 0;
        cards.forEach(card => {
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
 
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.getAttribute('data-filter');
            applyFilters(filter, searchInput ? searchInput.value.trim().toLowerCase() : '');
        });
    });
 
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const active = document.querySelector('.filter-tab.active');
            const cat = active ? active.getAttribute('data-filter') : 'all';
            applyFilters(cat, searchInput.value.trim().toLowerCase());
        });
    }
 
    if (clearBtn && searchInput) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            const active = document.querySelector('.filter-tab.active');
            const cat = active ? active.getAttribute('data-filter') : 'all';
            applyFilters(cat, '');
            searchInput.focus();
        });
    }
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
 
        if (!name)                    { setFieldError('name',    'Please enter your name.');               valid = false; }
        if (!email)                   { setFieldError('email',   'Please enter your email.');              valid = false; }
        else if (!validateEmail(email)){ setFieldError('email',  'Please enter a valid email address.');   valid = false; }
        if (!message)                 { setFieldError('message', 'Please enter a message.');               valid = false; }
 
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
            btnText.textContent = 'Send Message 💌';
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
    console.log('🚀 Portfolio v2 loaded!');
 
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
 
    initPersonalisedGreeting();
    initFilterTabs();
    initFunFacts();
    initContactForm();
    initSmoothScroll();
    initNavbarScroll();
    initScrollReveal();
    initBackToTop();
 
    window.addEventListener('load', () => {
        console.log(`⚡ Page loaded in ${performance.now().toFixed(2)}ms`);
    });
});
