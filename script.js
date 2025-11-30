// ============================================
// SMOOTH SCROLL & INTERSECTION OBSERVER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // Observe all work cards
    document.querySelectorAll('.work-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // Observe philosophy points
    document.querySelectorAll('.philosophy-point').forEach(point => {
        point.classList.add('fade-in');
        observer.observe(point);
    });

    // Observe gap items
    document.querySelectorAll('.gap-item').forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Add stagger animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger animation to work cards
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Sun decoration parallax effect
    const sunDecoration = document.querySelector('.sun-decoration');
    if (sunDecoration) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            sunDecoration.style.transform = `translate(${parallax}px, ${parallax}px)`;
        });
    }

    // Add hover effect to navigation links
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta)');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Email button copy functionality (optional enhancement)
    const emailButtons = document.querySelectorAll('a[href^="mailto:"]');
    emailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Log event for analytics (if implemented)
            console.log('Contact initiated via email');
        });
    });

    // Add active state to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link:not(.nav-link-cta)').forEach(link => {
                    link.style.color = '';
                });
                navLink.style.color = 'var(--orange)';
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // Initialize on load
    setActiveNav();
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

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

// Optimize scroll listeners with debounce
const optimizedScrollHandler = debounce(() => {
    // Additional scroll handling if needed
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);
