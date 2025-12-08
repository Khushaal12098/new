/**
 * Page Transitions
 * Smooth transitions between pages with loading overlay
 * Creates cinematic page change effects
 */

class PageTransitions {
  constructor() {
    this.isTransitioning = false;
    this.transitionDuration = 600; // ms
    this.init();
  }

  /**
   * Initialize page transitions
   */
  init() {
    this.createTransitionOverlay();
    this.setupLinkHandlers();
    console.log('✓ Page transitions initialized');
  }

  /**
   * Create transition overlay element
   */
  createTransitionOverlay() {
    // Check if overlay already exists
    let overlay = document.querySelector('.page-transition-overlay');
    if (overlay) return;

    overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = `
      <div class="transition-content">
        <div class="transition-loader"></div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  /**
   * Setup click handlers for internal links
   */
  setupLinkHandlers() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      
      // Only handle internal links
      if (!link || !link.href || link.target === '_blank') return;

      // Check if it's an internal link
      const isInternal = link.href.includes(window.location.origin);
      const isNotHash = !link.href.startsWith('#');

      if (!isInternal || !isNotHash) return;

      // Exclude admin pages and certain URLs if needed
      if (link.href.includes('admin') && !link.classList.contains('allow-transition')) {
        return;
      }

      e.preventDefault();
      this.transitionToPage(link.href);
    });
  }

  /**
   * Perform page transition
   */
  async transitionToPage(url) {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    const overlay = document.querySelector('.page-transition-overlay');

    // Fade in overlay
    gsap.to(overlay, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.3,
      ease: 'power2.inOut',
    });

    // Wait for overlay to appear
    await new Promise((resolve) => setTimeout(resolve, this.transitionDuration / 2));

    // Navigate to new page
    window.location.href = url;
  }

  /**
   * Animate out on page unload (optional)
   */
  animateOutOnUnload() {
    const overlay = document.querySelector('.page-transition-overlay');
    if (overlay) {
      gsap.set(overlay, { opacity: 1 });
    }
  }
}

// Export to window
window.pageTransitions = new PageTransitions();

// Handle page load animation (fade in)
window.addEventListener('load', () => {
  const overlay = document.querySelector('.page-transition-overlay');
  if (overlay) {
    gsap.to(overlay, {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.5,
      delay: 0.2,
      ease: 'power2.inOut',
    });
  }

  // Animate content in
  gsap.from('body > *:not(.page-transition-overlay)', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 0.1,
    ease: 'power2.out',
  });
});

// Prepare overlay when leaving page
window.addEventListener('beforeunload', () => {
  window.pageTransitions.animateOutOnUnload();
});
