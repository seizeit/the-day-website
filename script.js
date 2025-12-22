/**
 * THE.DAY - Interactive Scripts
 * Smooth scroll animations, header effects, and interactions
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // SCROLL REVEAL ANIMATIONS
  // ═══════════════════════════════════════════════════════════════

  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (!revealElements.length) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    revealElements.forEach(element => {
      observer.observe(element);
    });
  };

  // ═══════════════════════════════════════════════════════════════
  // HEADER SCROLL EFFECT
  // ═══════════════════════════════════════════════════════════════

  const initHeaderScroll = () => {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
  };

  // ═══════════════════════════════════════════════════════════════
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ═══════════════════════════════════════════════════════════════

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.getElementById('header')?.offsetHeight || 90;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  };

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZE ALL FEATURES
  // ═══════════════════════════════════════════════════════════════

  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initScrollReveal();
    initHeaderScroll();
    initSmoothScroll();

    console.log('the.day - All features initialized');
  };

  // Start initialization
  init();

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }

})();

