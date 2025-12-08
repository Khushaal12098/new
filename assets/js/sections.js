/**
 * Section Animations
 * GSAP ScrollTrigger-based animations for sections as they scroll into view
 * Creates cinematic entry/exit effects
 */

class SectionAnimations {
  constructor() {
    this.sections = [];
    this.animationTriggers = [];
    this.init();
  }

  /**
   * Initialize section animations
   */
  init() {
    // Find all sections with data-section attribute
    const sectionElements = document.querySelectorAll('[data-section]');
    
    if (sectionElements.length === 0) {
      console.warn('No [data-section] elements found');
      return;
    }

    sectionElements.forEach((section, index) => {
      this.createSectionAnimation(section, index);
    });

    console.log(`✓ Section animations initialized for ${sectionElements.length} sections`);
  }

  /**
   * Create animation for a single section
   */
  createSectionAnimation(section, index) {
    const sectionId = section.getAttribute('data-section');

    // Animate section heading
    const heading = section.querySelector('h2, h1');
    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    // Animate section content (paragraphs, text)
    const paragraphs = section.querySelectorAll('p');
    if (paragraphs.length > 0) {
      gsap.from(paragraphs, {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
      });
    }

    // Animate cards (product cards, feature cards, etc.)
    const cards = section.querySelectorAll('.card, .feature-card, [data-card]');
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
      });
    }

    // Animate forms
    const forms = section.querySelectorAll('form');
    if (forms.length > 0) {
      gsap.from(forms, {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });
    }

    // Animate buttons
    const buttons = section.querySelectorAll('button, .btn');
    if (buttons.length > 0) {
      gsap.from(buttons, {
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
      });
    }

    // Animate list items
    const listItems = section.querySelectorAll('li');
    if (listItems.length > 0) {
      gsap.from(listItems, {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
      });
    }

    // Parallax effect for section background (if exists)
    const background = section.querySelector('[data-parallax]');
    if (background) {
      gsap.to(background, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
        ease: 'none',
      });
    }

    this.sections.push({ id: sectionId, element: section, index });
  }

  /**
   * Get section by ID
   */
  getSection(sectionId) {
    return this.sections.find((s) => s.id === sectionId);
  }

  /**
   * Get all sections
   */
  getSections() {
    return this.sections;
  }

  /**
   * Refresh animations (useful after dynamic content)
   */
  refresh() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.refresh());
  }
}

// Export to window
window.sectionAnimations = new SectionAnimations();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure other scripts are ready
    setTimeout(() => window.sectionAnimations.refresh(), 500);
  });
}
