
'use strict';

/* ═══════════════════════════════════════════
   1. LOADER
═══════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1900);
});

/* ═══════════════════════════════════════════
   2. PARTICLE CANVAS
═══════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let width, height;
  const PARTICLE_COUNT = 80;

  function resize() {
    width  = canvas.width  = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function rand(a, b) { return a + Math.random() * (b - a); }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = rand(0, width);
      this.y  = rand(0, height);
      this.r  = rand(1, 2.5);
      this.vx = rand(-0.3, 0.3);
      this.vy = rand(-0.5, -0.15);
      this.alpha = rand(0.2, 0.7);
      this.color = Math.random() > 0.5 ? '0,194,255' : '124,58,237';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.0015;
      if (this.y < -10 || this.alpha <= 0) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,194,255,${0.06 * (1 - dist / 90)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();

/* ═══════════════════════════════════════════
   3. CUSTOM CURSOR
═══════════════════════════════════════════ */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Smooth ring lag
  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, input, textarea, [tabindex]';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) ring.classList.add('hovered');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) ring.classList.remove('hovered');
  });
})();

/* ═══════════════════════════════════════════
   4. TYPING EFFECT
═══════════════════════════════════════════ */
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Software Developer',
    'Networking Enthusiast',
    'Problem Solver',
    'Graphics Designer',

  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 80);
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 350);
        return;
      }
      setTimeout(type, 45);
    }
  }

  // Start after loader
  setTimeout(type, 2100);
})();

/* ═══════════════════════════════════════════
   5. ANIMATED COUNTERS
═══════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current < target) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

/* ═══════════════════════════════════════════
   6. SKILL BARS
═══════════════════════════════════════════ */
function animateSkillBars(container) {
  container.querySelectorAll('.skill-fill').forEach(fill => {
    fill.style.width = fill.dataset.width + '%';
  });
}

/* ═══════════════════════════════════════════
   7. SCROLL REVEAL + INTERSECTION OBSERVER
═══════════════════════════════════════════ */
(function initReveal() {
  const countersDone = new Set();
  const skillsDone   = new Set();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  // Hero stats counter observer
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (countersDone.has(el)) return;
      countersDone.add(el);
      animateCounter(el);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  // Skill bars observer
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (skillsDone.has(el)) return;
      skillsDone.add(el);
      animateSkillBars(el);
      skillsObserver.unobserve(el);
    });
  }, { threshold: 0.3 });

  // Stagger reveal for grid children
  document.querySelectorAll('.strengths-grid, .projects-grid, .certs-grid').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));
  document.querySelectorAll('.skills-category').forEach(el => skillsObserver.observe(el));
})();

/* ═══════════════════════════════════════════
   8. STICKY NAVBAR + ACTIVE LINK
═══════════════════════════════════════════ */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY + 80 >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveLink();
  }, { passive: true });

  updateNavbar();
  updateActiveLink();
})();

/* ═══════════════════════════════════════════
   9. HAMBURGER / MOBILE MENU
═══════════════════════════════════════════ */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    }
  });
})();

/* ═══════════════════════════════════════════
   10. SCROLL-TO-TOP BUTTON
═══════════════════════════════════════════ */
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ═══════════════════════════════════════════
   12. CONTACT FORM
═══════════════════════════════════════════ */
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');

  // simple validation
  let valid = true;
  const fields = [
    { input: 'fname', error: 'fnameError', msg: 'Please enter your name' },
    { input: 'femail', error: 'femailError', msg: 'Please enter a valid email' },
    { input: 'fsubject', error: 'fsubjectError', msg: 'Please enter a subject' },
    { input: 'fmessage', error: 'fmessageError', msg: 'Please enter a message' },
  ];

  fields.forEach(f => {
    const inputEl = document.getElementById(f.input);
    const errorEl = document.getElementById(f.error);
    if (!inputEl.value.trim()) {
      errorEl.textContent = f.msg;
      valid = false;
    } else {
      errorEl.textContent = '';
    }
  });

  if (!valid) return;

  submitBtn.classList.add('loading'); // toggle your CSS to show btn-loader

  try {
    const response = await fetch('https://formspree.io/f/mdaqnljn', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });

    if (response.ok) {
      form.reset();
      successMsg.style.display = 'block';
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (err) {
    alert('Network error. Please try again.');
  } finally {
    submitBtn.classList.remove('loading');
  }
});

/* ═══════════════════════════════════════════
   13. SMOOTH SCROLL FOR ANCHOR LINKS
═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════════════
   14. TIMELINE STAGGER ANIMATION
═══════════════════════════════════════════ */
document.querySelectorAll('.timeline-item.reveal').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.12}s`;
});

/* ═══════════════════════════════════════════
   15. EXPERIENCE RESPONSIBILITIES STAGGER
═══════════════════════════════════════════ */
document.querySelectorAll('.exp-responsibilities li').forEach((li, i) => {
  li.style.opacity = '0';
  li.style.transform = 'translateX(-20px)';
  li.style.transition = `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`;
});

const expObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.exp-responsibilities li').forEach(li => {
      li.style.opacity = '1';
      li.style.transform = 'none';
    });
    expObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.exp-card').forEach(c => expObserver.observe(c));

/* ═══════════════════════════════════════════
   16. PROJECT CARD TILT
═══════════════════════════════════════════ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    card.style.transition = 'transform 0.1s linear';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s var(--ease, ease)';
  });
});

/* ═══════════════════════════════════════════
   17. NAVBAR LOGO CLICK → SMOOTH TOP
═══════════════════════════════════════════ */
document.querySelector('.nav-logo')?.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
