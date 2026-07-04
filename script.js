// ============================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// All interactive functionality
// ============================================

// ============================================
// 1. INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    removeLoadingAnimation();
    initializeParticles();
    initializeNavigation();
    initializeScrollAnimations();
    initializeTheme();
    initializeTypingEffect();
    initializeCounters();
    initializeForm();
    initializeCustomCursor();
    initializeScrollToTop();
}

// ============================================
// 2. LOADING ANIMATION
// ============================================

function removeLoadingAnimation() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
}

// ============================================
// 3. PARTICLE BACKGROUND
// ============================================

function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 100 + 20;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.top = '-100px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// 4. NAVIGATION
// ============================================

function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle Mobile Menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            updateActiveNavLink(link);
        });
    });

    // Update navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll and update active link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// ============================================
// 5. SCROLL ANIMATIONS (Intersection Observer)
// ============================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ============================================
// 6. THEME TOGGLE (Dark/Light Mode)
// ============================================

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme === 'dark' ? 'dark' : 'light');

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('light-mode');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// ============================================
// 7. TYPING EFFECT
// ============================================

function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const phrases = [
        'Creative Developer',
        'Problem Solver',
        'Tech Enthusiast',
        'Software Developer'
    ];
    
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;

    function type() {
        const phrase = phrases[currentPhrase];
        
        if (isDeleting) {
            currentChar--;
        } else {
            currentChar++;
        }

        typingText.textContent = phrase.substring(0, currentChar);

        if (!isDeleting && currentChar === phrase.length) {
            isDeleting = true;
            setTimeout(type, pauseDuration);
            return;
        }

        if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(type, 500);
            return;
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }

    type();
}

// ============================================
// 8. ANIMATED COUNTERS
// ============================================

function initializeCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// 9. CUSTOM CURSOR
// ============================================

function initializeCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        followerX += (cursorX - followerX) * 0.3;
        followerY += (cursorY - followerY) * 0.3;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }

    animateFollower();

    // Change cursor on hover
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.borderColor = 'var(--secondary-color)';
            cursorFollower.style.background = 'var(--secondary-color)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.borderColor = 'var(--primary-color)';
            cursorFollower.style.background = 'var(--primary-color)';
        });
    });
}

// ============================================
// 10. SCROLL TO TOP BUTTON
// ============================================

function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 11. CONTACT FORM HANDLING
// ============================================

function initializeForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleFormSubmit);

    // Add input validation on change
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('change', () => validateField(input));
    });
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    // Validate all fields
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!isValid) return;

    // Simulate form submission
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Clear message after 5 seconds
        setTimeout(() => {
            document.getElementById('formMessage').style.display = 'none';
        }, 5000);
    }, 1500);
}

function validateField(field) {
    const parent = field.closest('.form-group');
    const errorMessage = parent.querySelector('.error-message');
    let isValid = true;
    let message = '';

    if (field.value.trim() === '') {
        isValid = false;
        message = 'This field is required';
    } else if (field.name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid email';
        }
    } else if (field.name === 'message' && field.value.length < 10) {
        isValid = false;
        message = 'Message must be at least 10 characters';
    }

    if (isValid) {
        parent.classList.remove('error');
    } else {
        parent.classList.add('error');
        errorMessage.textContent = message;
    }

    return isValid;
}

function showFormMessage(message, type) {
    const messageEl = document.getElementById('formMessage');
    messageEl.textContent = message;
    messageEl.className = 'form-message ' + type;
    messageEl.style.display = 'block';
}

// ============================================
// 12. PAGE TRANSITION ANIMATION
// ============================================

window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0.7';
});

// ============================================
// 13. KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Home key - scroll to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // End key - scroll to bottom
    if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    // Ctrl/Cmd + / - toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        document.getElementById('themeToggle').click();
    }
});

// ============================================
// 14. ACCESSIBILITY IMPROVEMENTS
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// 15. PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce function for scroll events
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

// ============================================
// 16. ERROR HANDLING
// ============================================

window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
});

// ============================================
// 17. SERVICE WORKER (Optional PWA Support)
// ============================================

if ('serviceWorker' in navigator) {
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js');
    // });
}

// ============================================
// 18. MOBILE MENU FIX
// ============================================

// Close mobile menu when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('navToggle').classList.remove('active');
        document.getElementById('navMenu').classList.remove('active');
    }
});

// ============================================
// 19. PRINT FRIENDLY IMPROVEMENTS
// ============================================

// Hide unnecessary elements before printing
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.no-print').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.no-print').forEach(el => {
        el.style.display = '';
    });
});

// ============================================
// 20. CONSOLE MESSAGE
// ============================================

console.log('%c👋 Welcome to Shaveen Nimsara\'s Portfolio!', 
    'font-size: 20px; color: #00C2FF; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & JavaScript ✨', 
    'font-size: 14px; color: #7C3AED;');
console.log('%cFeel free to explore and get in touch!', 
    'font-size: 12px; color: #a0a0a0;');
