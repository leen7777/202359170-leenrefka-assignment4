/**
 * Portfolio Website — Assignment 4
 * Features: Theme Toggle, Time-based Greeting, Personalised Greeting,
 *           Typing Animation, Hamburger Menu, Scroll Progress Bar,
 *           Project Filter + Sort + Live Search, Skill Progress Bars,
 *           Fun Facts API, GitHub Repos API, Enhanced Form Validation,
 *           Visit Timer, Login State, Scroll Reveal, Back to Top.
 */

// ========================
// THEME TOGGLE
// ========================
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    document.querySelector('.theme-icon').textContent = next === 'dark' ? '☀️' : '🌙';
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
    if      (hour < 12) { greeting = 'Good morning';   emoji = '☀️'; }
    else if (hour < 17) { greeting = 'Good afternoon'; emoji = '🌸'; }
    else if (hour < 21) { greeting = 'Good evening';   emoji = '🌙'; }
    else                { greeting = 'Good night';      emoji = '⭐'; }

    const banner = document.getElementById('greetingBanner');
    if (!banner) return;
    const nameStr = name ? `, ${name}` : '';
    banner.textContent = `${emoji} ${greeting}${nameStr}! Welcome to Leen's portfolio.`;
}

// ========================
// PERSONALISED GREETING
// ========================
function initPersonalisedGreeting() {
    const input = document.getElementById('visitorName');
    const btn   = document.getElementById('greetBtn');
    if (!input || !btn) return;

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

    input.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
}

// ========================
// TYPING ANIMATION
// ========================
function initTypingAnimation() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const phrases = [
        'AI Systems Builder',
        'Founder of Reportra',
        'RAG Pipeline Engineer',
        'Full-Stack Developer',
        'CS Student @ KFUPM',
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    const TYPING_SPEED = 80;
    const DELETING_SPEED = 40;
    const PAUSE_AFTER_WORD = 1800;
    const PAUSE_BEFORE_TYPE = 400;

    function tick() {
        const phrase = phrases[phraseIdx];
        if (deleting) {
            charIdx--;
            el.textContent = phrase.slice(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(tick, PAUSE_BEFORE_TYPE);
            } else {
                setTimeout(tick, DELETING_SPEED);
            }
        } else {
            charIdx++;
            el.textContent = phrase.slice(0, charIdx);
            if (charIdx === phrase.length) {
                deleting = true;
                setTimeout(tick, PAUSE_AFTER_WORD);
            } else {
                setTimeout(tick, TYPING_SPEED);
            }
        }
    }
    setTimeout(tick, 600);
}

// ========================
// HAMBURGER MOBILE MENU
// ========================
function initHamburger() {
    const btn  = document.getElementById('hamburger');
    const menu = document.getElementById('navMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open);
    });

    // Close menu on nav link click
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
}

// ========================
// SCROLL PROGRESS BAR
// ========================
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
}

// ========================
// PROJECT FILTER + SORT + SEARCH
// ========================
function initFilterTabs() {
    const tabs       = document.querySelectorAll('.filter-tab');
    const grid       = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('projectSearch');
    const clearBtn   = document.getElementById('searchClear');
    const sortBtns   = document.querySelectorAll('.sort-btn');

    const originalOrder = Array.from(document.querySelectorAll('.project-card'));
    let currentSort = 'default';

    function getSortedCards() {
        const cards = Array.from(document.querySelectorAll('.project-card'));
        if (currentSort === 'az') return cards.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
        if (currentSort === 'za') return cards.sort((a, b) => b.dataset.title.localeCompare(a.dataset.title));
        return originalOrder.slice();
    }

    function applyFilters(category, query) {
        getSortedCards().forEach(card => grid.appendChild(card));
        let visible = 0;
        document.querySelectorAll('.project-card').forEach(card => {
            const matchCat   = category === 'all' || card.dataset.category === category;
            const matchQuery = !query || card.dataset.title.toLowerCase().includes(query) || card.dataset.tags.toLowerCase().includes(query);
            card.classList.toggle('hidden', !(matchCat && matchQuery));
            if (matchCat && matchQuery) visible++;
        });
        if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
    }

    const getActiveCategory = () => document.querySelector('.filter-tab.active')?.dataset.filter ?? 'all';
    const getQuery = () => searchInput?.value.trim().toLowerCase() ?? '';

    tabs.forEach(tab => tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        applyFilters(tab.dataset.filter, getQuery());
    }));

    searchInput?.addEventListener('input', () => applyFilters(getActiveCategory(), getQuery()));

    clearBtn?.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        applyFilters(getActiveCategory(), '');
        searchInput?.focus();
    });

    sortBtns.forEach(btn => btn.addEventListener('click', () => {
        sortBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSort = btn.dataset.sort;
        applyFilters(getActiveCategory(), getQuery());
    }));
}

// ========================
// SKILL PROGRESS BARS
// ========================
function initSkillBars() {
    const items = document.querySelectorAll('.prof-item');
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const item = entry.target;
            const level = item.dataset.level;
            const fill = item.querySelector('.prof-bar-fill');
            if (fill) fill.style.width = level + '%';
            observer.unobserve(item);
        });
    }, { threshold: 0.3 });

    items.forEach(item => observer.observe(item));
}

// ========================
// FUN FACTS API
// ========================
function initFunFacts() {
    const btn      = document.getElementById('factBtn');
    const factText = document.getElementById('factText');
    const factCat  = document.getElementById('factCategory');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        btn.disabled = true;
        btn.innerHTML = '<span class="loading-spinner"></span> Loading…';
        if (factText) factText.textContent = 'Fetching a fun fact for you…';
        if (factCat)  factCat.textContent  = '';

        try {
            const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (factText) factText.textContent = data.text;
            if (factCat)  factCat.textContent  = '📚 Random Fact';
        } catch {
            if (factText) factText.textContent = 'Something went wrong. Please try again!';
            if (factCat)  factCat.textContent  = '⚠️ Error';
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

    const langColors = {
        JavaScript: '#f1e05a', Python: '#3572A5', HTML: '#e34c26',
        CSS: '#563d7c', TypeScript: '#2b7489', Java: '#b07219',
        'C++': '#f34b7d', Shell: '#89e051', 'Jupyter Notebook': '#DA5B0B'
    };

    try {
        const res = await fetch('https://api.github.com/users/leen7777/repos?sort=updated&per_page=6');
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const repos = await res.json();

        if (!repos.length) {
            container.innerHTML = `<div class="github-error"><span>📂</span><p>No public repositories found.</p></div>`;
            return;
        }

        container.innerHTML = repos.map(repo => {
            const lang  = repo.language || 'N/A';
            const color = langColors[lang] || 'var(--accent)';
            const desc  = repo.description || 'No description provided.';
            const stars = repo.stargazers_count;
            return `
            <div class="repo-card">
                <p class="repo-name">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                </p>
                <p class="repo-description">${desc}</p>
                <div class="repo-meta">
                    <span class="repo-lang"><span class="lang-dot" style="background:${color};"></span>${lang}</span>
                    ${stars > 0 ? `<span class="repo-stars">⭐ ${stars}</span>` : ''}
                </div>
            </div>`;
        }).join('');
    } catch {
        container.innerHTML = `
            <div class="github-error">
                <span>⚠️</span>
                <p>Could not load repositories right now. Please check back later.</p>
            </div>`;
    }
}

// ========================
// VISIT TIMER
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
// LOGIN STATE
// ========================
function initLoginState() {
    const btn      = document.getElementById('loginBtn');
    const adminBar = document.getElementById('adminBar');
    if (!btn) return;

    function applyState(isAdmin) {
        btn.textContent = isAdmin ? '🔒 Admin' : '👤 Guest';
        btn.classList.toggle('admin', isAdmin);
        if (adminBar) adminBar.style.display = isAdmin ? 'flex' : 'none';
    }

    applyState(localStorage.getItem('adminMode') === 'true');

    btn.addEventListener('click', () => {
        const next = localStorage.getItem('adminMode') !== 'true';
        localStorage.setItem('adminMode', next);
        applyState(next);
    });
}

// ========================
// CONTACT FORM VALIDATION
// ========================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    function setFieldError(id, msg) {
        const el  = document.getElementById(id);
        const err = document.getElementById(id + 'Error');
        if (el)  el.classList.toggle('error', !!msg);
        if (err) err.textContent = msg || '';
    }

    function clearErrors() {
        ['name', 'email', 'message'].forEach(f => setFieldError(f, ''));
    }

    ['name', 'email', 'message'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => setFieldError(id, ''));
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        hideFormMessage();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let valid = true;

        if (!name)                      { setFieldError('name',    'Please enter your name.');             valid = false; }
        if (!email)                     { setFieldError('email',   'Please enter your email.');            valid = false; }
        else if (!validateEmail(email)) { setFieldError('email',   'Please enter a valid email address.'); valid = false; }
        if (!message)                   { setFieldError('message', 'Please enter a message.');             valid = false; }

        if (!valid) { showFormMessage('Please fix the errors above and try again.', 'error'); return; }

        const btn     = document.getElementById('submitBtn');
        const btnText = document.getElementById('submitText');
        btn.disabled = true;
        btnText.innerHTML = '<span class="loading-spinner"></span> Sending…';

        setTimeout(() => {
            showFormMessage(`Thank you, ${name}! Your message has been received. I'll get back to you soon! 💌`, 'success');
            launchConfetti();
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
        navbar.style.boxShadow = y > 100 ? '0 4px 30px rgba(255,20,147,0.2)' : '0 2px 20px rgba(255,20,147,0.1)';
        navbar.style.padding   = y > 100 ? '0.4rem 0' : '1rem 0';
    }, { passive: true });
}

// ========================
// SCROLL REVEAL
// ========================
function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========================
// BACK TO TOP
// ========================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 400);
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ========================
// CHATBOT
// ========================
function initChatbot() {
    const bubble   = document.getElementById('chatBubble');
    const window_  = document.getElementById('chatWindow');
    const closeBtn = document.getElementById('chatClose');
    const messages = document.getElementById('chatMessages');
    const form     = document.getElementById('chatForm');
    const input    = document.getElementById('chatInput');
    const chips    = document.querySelectorAll('.suggestion-chip');
    if (!bubble) return;

    const bubbleIcon  = bubble.querySelector('.chat-bubble-icon');
    const bubbleClose = bubble.querySelector('.chat-bubble-close');

    const KB = [
        {
            keys: ['reportra', 'startup', 'founder'],
            answer: "Reportra is my startup — I'm building a RAG + LLM pipeline that turns sensor CSVs and inspection photos into compliant PDF reports for O&M firms. Stack: Python, LangChain, FastAPI, React. It's actively in development! 🚀"
        },
        {
            keys: ['medical', 'healthcare', 'clinical', 'hospital'],
            answer: "I'm doing independent research on AI-driven generation of clinical documentation — applying the same pipeline concept from Reportra to healthcare records. It's about making unstructured medical data structured and compliant."
        },
        {
            keys: ['stack', 'tech', 'technology', 'tools', 'use'],
            answer: "My current stack: Python, FastAPI, LangChain, React, Next.js for building. For AI/ML: RAG pipelines, Claude & GPT-4o, Pinecone, scikit-learn. For tools: Git, Jupyter, VS Code, Figma, Postman. 🛠️"
        },
        {
            keys: ['internship', 'hire', 'available', 'opportunity', 'job', 'work', 'open'],
            answer: "Yes! I'm actively looking for internship opportunities in AI engineering, data engineering, or full-stack development. Feel free to reach out via the contact form or at leen.n.refka@gmail.com 💌"
        },
        {
            keys: ['experience', 'pwc', 'robo', 'nexus', 'lead', 'work'],
            answer: "I'm currently Outreach Team Lead at RoboNexus (KFUPM) — managing sponsorships for a global robotics competition. Last semester I was a mentee at PwC Middle East, where I learned about enterprise AI integration and aligning tech with business goals."
        },
        {
            keys: ['hackathon', 'competition', 'logistathon', 'aramco', 'mecc'],
            answer: "I reached the finals in the Logistathon and the Aramco Consulting Championship, and I co-organized the MECC Hackathon at KFUPM. Hackathons are one of my favourite ways to learn fast and build under pressure! ⚡"
        },
        {
            keys: ['education', 'study', 'kfupm', 'university', 'degree', 'cs'],
            answer: "I'm studying Computer Science at King Fahd University of Petroleum & Minerals (KFUPM), graduating in 2027. I'm focusing on AI systems, data engineering, and real-world software deployment."
        },
        {
            keys: ['cert', 'certification', 'oracle'],
            answer: "I hold the Oracle AI Foundations certification, which covers AI concepts, ML fundamentals, and Oracle's AI platform. 🏅"
        },
        {
            keys: ['community', 'mentor', 'gsr', 'ambassador', 'volunteer'],
            answer: "Outside of projects, I'm an Academic Mentor (English & Math) at KFUPM, Local Ambassadors Coordinator for the Global Student Research Conference (GSR), and I co-organized the MECC Hackathon."
        },
        {
            keys: ['contact', 'email', 'reach', 'message', 'linkedin'],
            answer: "Best ways to reach me:\n📧 leen.n.refka@gmail.com\n💼 linkedin.com/in/leenrefka\nOr use the contact form on this page — I reply within 24 hours!"
        },
        {
            keys: ['project', 'built', 'portfolio', 'work'],
            answer: "I have 5 key projects: Reportra (AI reporting startup), Medical Records Automation (research), Car Evaluation ML model, TutorLink (web platform), and this portfolio itself. Check the Projects section for details!"
        },
        {
            keys: ['skill', 'good at', 'best at', 'strong'],
            answer: "My strongest areas are Python, RAG/LLM pipelines, and full-stack development with FastAPI + React. I'm also comfortable with scikit-learn for classical ML and building production-ready APIs."
        },
        {
            keys: ['hello', 'hi', 'hey', 'sup', 'hola', 'greet'],
            answer: "Hi there! 👋 I'm Leen's virtual assistant. Ask me anything about her projects, skills, experience, or how to get in touch. You can also click the suggestion chips below!"
        },
        {
            keys: ['who', 'about', 'yourself', 'leen', 'tell me'],
            answer: "Leen Refka is a Computer Science student at KFUPM with a focus on AI Systems & Real-World Deployment. She's the founder of Reportra, an Oracle AI Foundations certified developer, and passionate about turning complex data into production-ready AI tools."
        },
    ];

    const fallback = "I'm not sure about that one! Try asking about Reportra, my tech stack, experience, or how to contact Leen. 😊";

    function getReply(q) {
        const text = q.toLowerCase();
        for (const entry of KB) {
            if (entry.keys.some(k => text.includes(k))) return entry.answer;
        }
        return fallback;
    }

    function addMsg(text, role) {
        const el = document.createElement('div');
        el.className = `chat-msg ${role}`;
        el.textContent = text;
        messages.appendChild(el);
        messages.scrollTop = messages.scrollHeight;
    }

    function botReply(q) {
        addMsg(q, 'user');
        input.value = '';
        setTimeout(() => {
            addMsg(getReply(q), 'bot');
        }, 380);
    }

    function openChat() {
        window_.hidden = false;
        bubbleIcon.hidden = true;
        bubbleClose.hidden = false;
        if (!messages.children.length) {
            setTimeout(() => addMsg("Hi! 👋 I'm Leen's assistant. Ask me anything about her projects, skills, or experience!", 'bot'), 200);
        }
        input.focus();
    }

    function closeChat() {
        window_.hidden = true;
        bubbleIcon.hidden = false;
        bubbleClose.hidden = true;
    }

    bubble.addEventListener('click', () => window_.hidden ? openChat() : closeChat());
    closeBtn.addEventListener('click', closeChat);

    form.addEventListener('submit', e => {
        e.preventDefault();
        const q = input.value.trim();
        if (q) botReply(q);
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (window_.hidden) openChat();
            setTimeout(() => botReply(chip.dataset.q), 150);
        });
    });
}

// ========================
// ANIMATED STAT COUNTERS
// ========================
function initStatCounters() {
    const items = document.querySelectorAll('.stat-number');
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const duration = 1200;
            const step = Math.ceil(duration / (target || 1));
            let current = 0;
            const timer = setInterval(() => {
                current++;
                el.textContent = current;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                }
            }, step);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    items.forEach(el => observer.observe(el));
}

// ========================
// 3D CARD TILT
// ========================
function initCardTilt() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -8;
            const rotateY = ((x - cx) / cx) * 8;
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========================
// CONFETTI ON FORM SUCCESS
// ========================
function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff1493', '#ff69b4', '#ffb6d9', '#fff', '#c71585', '#ff85c8'];
    const pieces = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        w: Math.random() * 10 + 6,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 4,
        speed: Math.random() * 3 + 2,
        drift: (Math.random() - 0.5) * 1.5,
    }));

    let frame;
    let elapsed = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.save();
            ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
            p.y += p.speed;
            p.x += p.drift;
            p.rot += p.rotSpeed;
        });
        elapsed++;
        if (elapsed < 180) {
            frame = requestAnimationFrame(draw);
        } else {
            cancelAnimationFrame(frame);
            canvas.remove();
        }
    }
    draw();
}

// ========================
// FOOTER YEAR
// ========================
function setFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
}

// ========================
// INIT
// ========================
loadTheme();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

    initChatbot();
    initLoginState();
    initPersonalisedGreeting();
    initTypingAnimation();
    initHamburger();
    initScrollProgress();
    initFilterTabs();
    initSkillBars();
    initStatCounters();
    initCardTilt();
    initFunFacts();
    initGitHubRepos();
    initContactForm();
    initVisitTimer();
    initSmoothScroll();
    initNavbarScroll();
    initScrollReveal();
    initBackToTop();
    setFooterYear();
});
