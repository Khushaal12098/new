/**
 * Page Transition Manager
 * Handles page transitions with overlay and loader animation
 */

class PageTransitionManager {
  constructor() {
    this.overlay = null;
    this.isTransitioning = false;
    this.transitionDuration = 300;
    this.initOverlay();
    this.setupLinkListeners();
  }

  initOverlay() {
    // Create transition overlay if it doesn't exist
    if (!document.querySelector('.page-transition-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'page-transition-overlay';
      overlay.innerHTML = `
        <div class="transition-content">
          <div class="transition-loader"></div>
          <p style="color: #00d9ff; font-size: 0.875rem;">Loading...</p>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    this.overlay = document.querySelector('.page-transition-overlay');
  }

  setupLinkListeners() {
    // Listen for navigation clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"], a[href^="./"], a[href$=".html"]');

      if (link && !link.target && link.hostname === window.location.hostname) {
        e.preventDefault();
        this.transitionTo(link.href);
      }
    });
  }

  transitionTo(url) {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.showOverlay();

    // Simulate load time
    setTimeout(() => {
      window.location.href = url;
    }, this.transitionDuration);
  }

  showOverlay() {
    if (this.overlay) {
      this.overlay.classList.add('active');
    }
  }

  hideOverlay() {
    if (this.overlay) {
      this.overlay.classList.remove('active');
    }
    this.isTransitioning = false;
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.transitionManager = new PageTransitionManager();

  // Hide overlay when page fully loads
  window.addEventListener('load', () => {
    window.transitionManager.hideOverlay();
  });
});
