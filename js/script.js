/**
 * Portfolio Website - JavaScript
 * Features: Theme Toggle, Time-based Greeting, Form Handling, Smooth Scrolling
 */


// ========================
// THEME TOGGLE
// ========================
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.querySelector('.theme-icon');
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    html.setAttribute('data-theme', newTheme);
    
    // Update icon
    if (themeIcon) {
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

// Load saved theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ========================
// CONTACT FORM HANDLING
// ========================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate
        if (!name || !email || !message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual backend call)
        setTimeout(() => {
            // Success
            showMessage(`Thank you, ${name}! Your message has been received. I'll get back to you soon! 💌`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                hideMessage();
            }, 5000);
        }, 1500);
    });
}

function showMessage(text, type) {
    const messageElement = document.getElementById('formMessage');
    if (!messageElement) return;
    
    messageElement.textContent = text;
    messageElement.className = `form-message ${type}`;
    messageElement.style.display = 'block';
}

function hideMessage() {
    const messageElement = document.getElementById('formMessage');
    if (messageElement) {
        messageElement.style.display = 'none';
    }
}

// ========================
// FORM FIELD ANIMATIONS
// ========================
function initFormAnimations() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.2s ease, border-color 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ========================
// SMOOTH SCROLL FOR NAVIGATION
// ========================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// ========================
// NAVBAR SCROLL EFFECT
// ========================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(255, 20, 147, 0.15)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(255, 20, 147, 0.1)';
            navbar.style.padding = '1rem 0';
        }
        
        lastScroll = currentScroll;
    });
}

// ========================
// THEME TOGGLE BUTTON
// ========================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// ========================
// INITIALIZE ALL FEATURES
// ========================
function init() {
    // Load theme first (before DOM renders)
    loadTheme();
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

function initializeApp() {
    console.log('🚀 Portfolio loaded successfully!');
    
    // Initialize all features
    initThemeToggle();
    initContactForm();
    initFormAnimations();
    initSmoothScroll();
    initNavbarScroll();
    
}

// Start the application
init();

// ========================
// UTILITY FUNCTIONS
// ========================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Log performance metrics (optional)
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
});