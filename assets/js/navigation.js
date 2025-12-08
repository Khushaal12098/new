/**
 * Section Navigation System
 * Numbered side navigation with active section tracking
 * Inspired by premium sites like ravendao.net
 */

class SectionNavigation {
  constructor() {
    this.sections = [];
    this.currentActiveSection = 0;
    this.navContainer = null;
    this.init();
  }

  /**
   * Initialize navigation system
   */
  init() {
    // Get all sections
    const sectionElements = document.querySelectorAll('[data-section]');
    if (sectionElements.length === 0) {
      console.warn('No sections found for navigation');
      return;
    }

    // Store sections
    sectionElements.forEach((section, index) => {
      const id = section.getAttribute('data-section');
      const label = section.getAttribute('data-section-label') || `Section ${index + 1}`;
      this.sections.push({ id, label, element: section, index });
    });

    // Create navigation container
    this.createNavigation();

    // Setup scroll listeners
    this.setupScrollListeners();

    // Setup click handlers
    this.setupClickHandlers();

    console.log(`✓ Section navigation initialized with ${this.sections.length} sections`);
  }

  /**
   * Create the numbered navigation rail
   */
  createNavigation() {
    // Create nav container
    this.navContainer = document.createElement('nav');
    this.navContainer.className = 'section-nav';
    this.navContainer.setAttribute('aria-label', 'Section navigation');

    // Create nav list
    const navList = document.createElement('ul');
    navList.className = 'section-nav-list';

    this.sections.forEach((section, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'section-nav-item';
      if (index === 0) listItem.classList.add('active');

      const button = document.createElement('button');
      button.className = 'section-nav-button';
      button.setAttribute('data-section-id', section.id);
      button.setAttribute('aria-label', `Navigate to ${section.label}`);
      button.setAttribute('title', section.label);
      
      // Display as zero-padded number (01, 02, 03, etc.)
      button.textContent = String(index + 1).padStart(2, '0');

      // Add click handler
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateToSection(section.id);
      });

      listItem.appendChild(button);
      navList.appendChild(listItem);
    });

    this.navContainer.appendChild(navList);
    document.body.appendChild(this.navContainer);
  }

  /**
   * Setup scroll-based active section detection
   */
  setupScrollListeners() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            this.setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.sections.forEach((section) => {
      observer.observe(section.element);
    });
  }

  /**
   * Setup navigation click handlers
   */
  setupClickHandlers() {
    // Handle page nav links with data-nav-to attribute
    document.querySelectorAll('a[data-nav-to]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-nav-to');
        this.navigateToSection(sectionId);
      });
    });
  }

  /**
   * Set active section and update UI
   */
  setActiveSection(sectionId) {
    // Update nav buttons
    const navButtons = this.navContainer.querySelectorAll('.section-nav-button');
    navButtons.forEach((btn) => {
      if (btn.getAttribute('data-section-id') === sectionId) {
        btn.classList.add('active');
        btn.parentElement.classList.add('active');
      } else {
        btn.classList.remove('active');
        btn.parentElement.classList.remove('active');
      }
    });

    // Update current active section
    const sectionIndex = this.sections.findIndex((s) => s.id === sectionId);
    if (sectionIndex >= 0) {
      this.currentActiveSection = sectionIndex;
    }
  }

  /**
   * Navigate to a specific section with smooth scroll
   */
  navigateToSection(sectionId) {
    const section = this.sections.find((s) => s.id === sectionId);
    if (!section) {
      console.warn(`Section not found: ${sectionId}`);
      return;
    }

    // Use smooth scroll manager if available
    if (window.smoothScroll) {
      window.smoothScroll.scrollTo(section.element, -80); // Offset for fixed header
    } else {
      // Fallback to native smooth scroll
      section.element.scrollIntoView({ behavior: 'smooth' });
    }

    // Update active section
    this.setActiveSection(sectionId);
  }

  /**
   * Get current active section
   */
  getCurrentSection() {
    return this.sections[this.currentActiveSection];
  }

  /**
   * Get all sections
   */
  getSections() {
    return this.sections;
  }

  /**
   * Navigate to next section
   */
  nextSection() {
    const nextIndex = Math.min(this.currentActiveSection + 1, this.sections.length - 1);
    const nextSection = this.sections[nextIndex];
    if (nextSection) {
      this.navigateToSection(nextSection.id);
    }
  }

  /**
   * Navigate to previous section
   */
  previousSection() {
    const prevIndex = Math.max(this.currentActiveSection - 1, 0);
    const prevSection = this.sections[prevIndex];
    if (prevSection) {
      this.navigateToSection(prevSection.id);
    }
  }

  /**
   * Setup keyboard navigation (arrow keys)
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextSection();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        this.previousSection();
      }
    });
  }
}

// Export to window
window.sectionNav = new SectionNavigation();

// Initialize keyboard navigation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.sectionNav.setupKeyboardNavigation();
  });
} else {
  window.sectionNav.setupKeyboardNavigation();
}
