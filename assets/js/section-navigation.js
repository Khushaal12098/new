/**
 * Section Navigation Manager
 * Handles section navigation and smooth scrolling between sections
 */

class SectionNavigationManager {
  constructor() {
    this.navButtons = document.querySelectorAll('.section-nav-button');
    this.sections = document.querySelectorAll('[data-section]');
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.navButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = button.getAttribute('data-target');
        this.navigateToSection(target);
      });
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        this.navigateNext();
      } else if (e.key === 'ArrowUp') {
        this.navigatePrevious();
      }
    });
  }

  navigateToSection(sectionId) {
    const section = document.querySelector(`[data-section="${sectionId}"]`);

    if (section) {
      if (window.scrollManager) {
        window.scrollManager.scrollToSection(sectionId);
      } else {
        section.scrollIntoView({ behavior: 'smooth' });
      }

      // Update active state
      this.updateActiveButton(sectionId);
    }
  }

  navigateNext() {
    const currentButton = document.querySelector('.section-nav-button.active');
    const nextButton = currentButton?.nextElementSibling;

    if (nextButton && nextButton.classList.contains('section-nav-button')) {
      nextButton.click();
    }
  }

  navigatePrevious() {
    const currentButton = document.querySelector('.section-nav-button.active');
    const prevButton = currentButton?.previousElementSibling;

    if (prevButton && prevButton.classList.contains('section-nav-button')) {
      prevButton.click();
    }
  }

  updateActiveButton(sectionId) {
    this.navButtons.forEach((btn) => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-target') === sectionId) {
        btn.classList.add('active');
      }
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.sectionNav = new SectionNavigationManager();
});
