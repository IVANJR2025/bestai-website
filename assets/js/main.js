/* ============================================
   BESTAI — MAIN JS
   Navbar, menu mobile, animações, scroll
   ============================================ */

   document.addEventListener('DOMContentLoaded', () => {

    /* ── NAVBAR SCROLL ── */
    const navbar = document.querySelector('.navbar');
  
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      });
    }
  
    /* ── MENU MOBILE ── */
    const toggle = document.querySelector('.navbar__toggle');
    const links  = document.querySelector('.navbar__links');
  
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
  
        // Anima as barras do hamburger
        const bars = toggle.querySelectorAll('span');
        if (isOpen) {
          bars[0].style.transform = 'translateY(7px) rotate(45deg)';
          bars[1].style.opacity   = '0';
          bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
          bars[0].style.transform = '';
          bars[1].style.opacity   = '';
          bars[2].style.transform = '';
        }
      });
  
      // Fecha menu ao clicar num link
      links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          links.classList.remove('open');
          toggle.classList.remove('open');
          const bars = toggle.querySelectorAll('span');
          bars[0].style.transform = '';
          bars[1].style.opacity   = '';
          bars[2].style.transform = '';
        });
      });
    }
  
    /* ── ACTIVE LINK ── */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar__links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage ||
         (currentPage === '' && href === 'index.html') ||
         (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  
    /* ── SCROLL REVEAL ── */
    const revealElements = document.querySelectorAll(
      '.card, .section__title, .section__subtitle, .sector-tag, .stat-item'
    );
  
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
  
      revealElements.forEach((el, i) => {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(24px)';
        el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
        observer.observe(el);
      });
    }
  
    /* ── REVEALED CLASS ── */
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        .revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      </style>
    `);
  
    /* ── SMOOTH SCROLL para âncoras ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });
  
    /* ── COUNTER ANIMATION ── */
    function animateCounter(el) {
      const target  = el.getAttribute('data-target');
      const isNum   = !isNaN(target.replace('%','').replace('+','').replace('h',''));
      if (!isNum) return;
  
      const num     = parseFloat(target.replace('%','').replace('+','').replace('h',''));
      const suffix  = target.replace(/[0-9.]/g, '');
      const duration = 1800;
      const steps    = 60;
      const increment = num / steps;
      let current    = 0;
      let step       = 0;
  
      const timer = setInterval(() => {
        step++;
        current = Math.min(increment * step, num);
        el.textContent = (Number.isInteger(num)
          ? Math.floor(current)
          : current.toFixed(1)) + suffix;
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    }
  
    const statValues = document.querySelectorAll('.stat-item__value');
    if (statValues.length && 'IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
  
      statValues.forEach(el => statsObserver.observe(el));
    }
  
  });