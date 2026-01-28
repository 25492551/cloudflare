/**
 * HUMMAN RESEARCH homepage interactions (Phase 6)
 * - Business card inspired: metallic + tilt interactions
 * - activetheory.net inspired: smooth navigation + overlay menu + subtle parallax
 *
 * Notes:
 * - All CTA actions are intentionally disabled for now.
 * - Respects prefers-reduced-motion.
 */

/* eslint-disable no-param-reassign */

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (!yearEl) return;
  yearEl.textContent = String(new Date().getFullYear());
}

function initDisabledCtas() {
  const ctas = document.querySelectorAll('[data-cta], .card-cta');
  ctas.forEach((el) => {
    el.addEventListener('click', (e) => {
      // CTA functions are intentionally disabled for now.
      e.preventDefault();
    });
  });
}

function initOverlayMenu() {
  const btn = document.querySelector('.nav-hamburger');
  const overlay = document.getElementById('nav-menu');
  if (!btn || !overlay) return;

  const openMenu = () => {
    btn.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-menu-open');
  };

  const closeMenu = () => {
    btn.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-menu-open');
  };

  const toggleMenu = () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  };

  btn.addEventListener('click', toggleMenu);

  // Close when clicking any overlay link
  overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest('.nav-menu-link')) closeMenu();

    // Click outside the menu list closes as well
    if (!target.closest('.nav-overlay-content')) closeMenu();
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
  });

  // Close when switching to desktop layout (simple safety)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeMenu();
  });
}

function initSmoothAnchorScroll() {
  // CSS already sets scroll-behavior: smooth, but this also closes overlay menu
  // and avoids jumping when href="#" or missing targets.
  const reduced = prefersReducedMotion();

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const link = target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    if (href === '#' || href.trim() === '') {
      e.preventDefault();
      return;
    }

    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  });
}

function initPointerVars() {
  // Used by CSS for metallic shine and lighting effects.
  let raf = 0;
  let lastX = 0;
  let lastY = 0;

  const update = () => {
    raf = 0;
    const x = Math.max(0, Math.min(1, lastX / window.innerWidth));
    const y = Math.max(0, Math.min(1, lastY / window.innerHeight));
    document.documentElement.style.setProperty('--pointer-x', `${(x * 100).toFixed(2)}%`);
    document.documentElement.style.setProperty('--pointer-y', `${(y * 100).toFixed(2)}%`);
  };

  window.addEventListener(
    'pointermove',
    (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    },
    { passive: true }
  );
}

function initTiltCards() {
  const reduced = prefersReducedMotion();
  if (reduced) return;

  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach((card) => {
    if (!(card instanceof HTMLElement)) return;

    const maxTilt = 7; // degrees
    const maxTranslate = 6; // px

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotY = (px - 0.5) * (maxTilt * 2);
      const rotX = (0.5 - py) * (maxTilt * 2);

      const tx = (px - 0.5) * (maxTranslate * 2);
      const ty = (py - 0.5) * (maxTranslate * 2);

      card.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotateX(${rotX.toFixed(
        2
      )}deg) rotateY(${rotY.toFixed(2)}deg)`;
    };

    const onLeave = () => {
      card.style.transform = '';
    };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
  });
}

function initParallax() {
  const reduced = prefersReducedMotion();
  if (reduced) return;

  const items = Array.from(document.querySelectorAll('[data-parallax]')).filter(
    (el) => el instanceof HTMLElement
  );
  if (items.length === 0) return;

  let raf = 0;

  const tick = () => {
    raf = 0;
    const vh = window.innerHeight || 1;
    items.forEach((el) => {
      const speed = Number(el.getAttribute('data-parallax')) || 0;
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height * 0.5 - vh * 0.5) / vh; // roughly -1..1
      const y = -progress * 40 * speed;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    });
  };

  const onScroll = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(tick);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

function initImageLazyDefaults() {
  // Enforce good defaults even if HTML misses them.
  const imgs = document.querySelectorAll('img');
  imgs.forEach((img) => {
    if (!(img instanceof HTMLImageElement)) return;
    if (!img.getAttribute('decoding')) img.decoding = 'async';
    if (!img.getAttribute('loading')) img.loading = 'lazy';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setCurrentYear();
  initDisabledCtas();
  initOverlayMenu();
  initSmoothAnchorScroll();
  initPointerVars();
  initTiltCards();
  initParallax();
  initImageLazyDefaults();
});

