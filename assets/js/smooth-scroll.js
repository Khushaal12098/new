/**
 * Smooth Scroll Manager
 * Handles smooth scrolling using Lenis library and scroll events
 */

class SmoothScrollManager {
  constructor() {
    this.lenis = null;
    this.raf = null;
    this.initLenis();
    this.setupScrollListener();
  }

  initLenis() {
    // Initialize Lenis for smooth scrolling
    // Note: Requires Lenis library to be included in HTML
    if (typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      this.raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(this.raf);
      };

      requestAnimationFrame(this.raf);
      console.log('Lenis smooth scroll initialized');
    } else {
      console.warn('Lenis library not found. Smooth scrolling may not work optimally.');
    }
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.updateActiveSection();
      this.updateNavigation();
    });
  }

  updateActiveSection() {
    const sections = document.querySelectorAll('[data-section]');
    const navButtons = document.querySelectorAll('.section-nav-button');

    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('data-section');
      }
    });

    navButtons.forEach((btn) => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-target') === current) {
        btn.classList.add('active');
      }
    });
  }

  updateNavigation() {
    // Add any additional navigation updates here
  }

  scrollToSection(sectionId) {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      if (this.lenis) {
        this.lenis.scrollTo(section, {
          offset: 0,
          duration: 1.2,
        });
      } else {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  destroy() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }
    if (this.lenis) {
      this.lenis.destroy();
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.scrollManager = new SmoothScrollManager();
});
