# Shaveen Nimsara – Personal Portfolio

A modern, fully responsive personal portfolio website for **Shaveen Nimsara**, ICT Student | Software Developer | Networking Enthusiast.

---

## 🌐 Live Demo

Deploy to [GitHub Pages](https://pages.github.com/) or [Netlify](https://netlify.com/) — see instructions below.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Design** | Dark-first glassmorphism with cyan (#00C2FF) & purple (#7C3AED) accents |
| **Typography** | Poppins (Google Fonts) across all weights |
| **Particle Background** | Canvas-based animated particle network in the hero |
| **Custom Cursor** | Dot + lagging ring with hover state (desktop only) |
| **Typing Effect** | Cycling role titles in the hero section |
| **Scroll Reveal** | IntersectionObserver-powered fade-up animations |
| **Animated Counters** | Stats animate to target numbers on scroll |
| **Skill Bars** | CSS progress bars animated on scroll into view |
| **Theme Toggle** | Light / Dark mode with `localStorage` persistence |
| **Sticky Navbar** | Glassmorphic navbar with active-link highlighting |
| **Mobile Menu** | Animated hamburger menu for ≤960 px |
| **3D Project Cards** | Mouse-tracking perspective tilt effect |
| **Contact Form** | Client-side validation with live error feedback |
| **Scroll-to-Top** | Appears after 500 px of scroll |
| **Floating Social** | Fixed left-side social icon column |
| **WCAG Accessible** | `aria-label`, `role`, `alt`, keyboard-navigable |
| **SEO Optimised** | Meta description, keywords, Open Graph tags |

---

## 📁 Folder Structure

```
portfolio/
├── index.html            ← Main HTML (all sections)
├── README.md
└── assets/
    ├── css/
    │   └── style.css     ← All styles (design tokens → components)
    ├── js/
    │   └── script.js     ← All interactivity
    └── images/           ← Add profile photo & project screenshots here
```

---

## 🚀 Getting Started

### Local

1. Clone or download the repository.
2. Open `index.html` directly in any modern browser — **no build step required**.

### Add your profile photo

Replace the avatar placeholder by adding an `<img>` inside `.hero-avatar` in `index.html`:

```html
<div class="hero-avatar">
  <img src="assets/images/profile.jpg"
       alt="Shaveen Nimsara profile photo"
       loading="lazy"
       width="280" height="280"
       style="border-radius:50%;width:100%;height:100%;object-fit:cover;" />
</div>
```

### Add project screenshots

Place images in `assets/images/` and replace the `.project-img-placeholder` divs:

```html
<div class="project-img">
  <img src="assets/images/project1.jpg"
       alt="Smart Kitchen Management System screenshot"
       loading="lazy" />
  <!-- overlay stays the same -->
</div>
```

---

## 🌍 Deployment

### GitHub Pages

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
# Then enable GitHub Pages in repo Settings → Pages → Deploy from main
```

### Netlify

1. Drag-and-drop the `portfolio/` folder onto [netlify.com/drop](https://app.netlify.com/drop).
2. Your site goes live instantly at a `*.netlify.app` URL.

---

## 🛠 Tech Stack

- **HTML5** – Semantic, accessible markup
- **CSS3** – Custom properties, Grid, Flexbox, glassmorphism, keyframe animations
- **Vanilla JavaScript** – Zero dependencies; Canvas API, IntersectionObserver, localStorage

---

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Primary (Cyan) | `#00C2FF` |
| Secondary (Purple) | `#7C3AED` |
| Background (Dark) | `#080B14` |
| Background (Light) | `#F0F4FF` |
| Font | Poppins |
| Border Radius | 16 px / 24 px |

---

## 📬 Contact

- **Email:** shavee21nimsara@gmail.com
- **LinkedIn:** [linkedin.com/in/shaveen0221](https://www.linkedin.com/in/shaveen0221)
- **GitHub:** [github.com/shaveen-0221](https://github.com/shaveen-0221)

---

© 2026 Shaveen Nimsara — Built with ❤️ using HTML, CSS & JavaScript.
