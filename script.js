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
  // MOBILE MENU TOGGLE
  // ═══════════════════════════════════════════════════════════════

  const initMobileMenu = () => {
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (!menuToggle || !header) return;

    const toggleMenu = () => {
      const isOpen = header.classList.contains('menu-open');
      header.classList.toggle('menu-open');
      
      // Prevent body scroll when menu is open
      if (!isOpen) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    };

    const closeMenu = () => {
      header.classList.remove('menu-open');
      body.style.overflow = '';
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu when clicking overlay (clicking outside nav and toggle)
    document.addEventListener('click', (e) => {
      const nav = header.querySelector('.nav');
      if (header.classList.contains('menu-open') && 
          nav && !nav.contains(e.target) && 
          !menuToggle.contains(e.target) &&
          !header.querySelector('.logo-container').contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('menu-open')) {
        closeMenu();
      }
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
    initMobileMenu();

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


