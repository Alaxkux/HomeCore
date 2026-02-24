/* ===== HOMECORE MAIN.JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR: scroll effect + active link ──────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Highlight active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPage.includes(href.replace('.html', ''))) {
      link.classList.add('active');
    }
    if ((currentPage === 'home.html' || currentPage === '' || currentPage === '/') && href === 'home.html') {
      link.classList.add('active');
    }
  });


  // ── 2. SCROLL ANIMATIONS (IntersectionObserver) ──────────────────────
  const animatedEls = document.querySelectorAll('.animate');
  if (animatedEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, entry.target.dataset.delay || 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animatedEls.forEach(el => observer.observe(el));
  }


  // ── 3. COUNTER ANIMATION ─────────────────────────────────────────────
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const step = 16;
    const steps = duration / step;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
    }, step);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = true;
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }


  // ── 4. CONTROL PANEL TOGGLES ─────────────────────────────────────────
  document.querySelectorAll('.toggle-switch').forEach(toggle => {
    toggle.addEventListener('click', function () {
      this.classList.toggle('on');
      const label = this.nextElementSibling;
      if (label) {
        label.textContent = this.classList.contains('on') ? 'On' : 'Off';
      }
      // Update status dot
      const card = this.closest('.device-card');
      if (card) {
        const dot = card.querySelector('.status-dot');
        if (dot) dot.classList.toggle('active', this.classList.contains('on'));
      }
    });
  });


  // ── 5. RANGE SLIDERS ─────────────────────────────────────────────────
  document.querySelectorAll('.slider-input').forEach(slider => {
    const output = document.getElementById(slider.dataset.output);
    if (output) {
      slider.addEventListener('input', () => {
        output.textContent = slider.value + (slider.dataset.unit || '');
      });
    }
  });


  // ── 6. CONTACT FORM ──────────────────────────────────────────────────
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#22c55e';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }


  // ── 7. BLOG FILTER TABS ───────────────────────────────────────────────
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      document.querySelectorAll('.blog-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // ── 8. MOBILE MENU TOGGLE ─────────────────────────────────────────────
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
  }


  // ── 9. FAQ ACCORDION ──────────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

});
