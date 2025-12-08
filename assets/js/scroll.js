/**
 * Smooth Scroll Integration
 * Integrates Lenis smooth scrolling with GSAP ScrollTrigger
 * Creates premium inertia-based scrolling experience
 */

class SmoothScrollManager {
  constructor() {
    this.lenis = null;
    this.animationFrameId = null;
    this.init();
  }

  /**
   * Initialize Lenis smooth scroll library
   */
  init() {
    // Check if Lenis is available
    if (typeof Lenis === 'undefined') {
      console.warn('Lenis not loaded. Using native scroll.');
      return;
    }

    // Create Lenis instance
    this.lenis = new Lenis({
      duration: 1.2, // Scroll duration in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      smoothTouch: false, // Disable on touch for better mobile experience
      infinite: false,
    });

    // Connect Lenis with GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.lenis) {
        this.lenis.resize();
      }
    });

    console.log('✓ Lenis smooth scroll initialized');
  }

  /**
   * Scroll to a specific element smoothly
   */
  scrollTo(target, offset = 0) {
    if (this.lenis) {
      this.lenis.scrollTo(target, { offset });
    } else {
      // Fallback: native smooth scroll
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  /**
   * Get current scroll position
   */
  getScrollPosition() {
    return this.lenis ? this.lenis.actualScroll : window.scrollY;
  }

  /**
   * Pause/resume smooth scrolling
   */
  pause() {
    if (this.lenis) this.lenis.stop();
  }

  resume() {
    if (this.lenis) this.lenis.start();
  }
}

// Export to window
window.smoothScroll = new SmoothScrollManager();
