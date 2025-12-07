/* ========================================
   WOOD CAMP PHARMA - MAIN JAVASCRIPT
   Navbar, forms, animations, interactions
   ======================================== */

// ============ NAVBAR SCROLL BEHAVIOR ============
const header = document.querySelector('header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile nav toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close nav when link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// ============ HERO FORM SUBMISSION ============
const heroForm = document.getElementById('userInfoForm');
if (heroForm) {
  heroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      country: document.getElementById('country').value,
      interest: document.getElementById('interest').value,
      timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    let leads = JSON.parse(localStorage.getItem('userLeads')) || [];
    leads.push(formData);
    localStorage.setItem('userLeads', JSON.stringify(leads));

    // Show success message
    const successMsg = document.getElementById('formSuccess');
    successMsg.classList.add('show');

    // Reset form
    heroForm.reset();

    // Hide success message after 4 seconds
    setTimeout(() => {
      successMsg.classList.remove('show');
    }, 4000);
  });
}

// ============ SCROLL ANIMATIONS WITH GSAP ============
// Check if GSAP is loaded, if not provide fallback
if (typeof gsap !== 'undefined') {
  // Animate hero section on load
  gsap.from('.hero-text h1', {
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power2.out'
  });

  gsap.from('.hero-text p', {
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power2.out',
    delay: 0.2
  });

  gsap.from('.hero-form', {
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power2.out',
    delay: 0.4
  });

  // Scroll animations for cards
  const cards = document.querySelectorAll('.card, .stat, .feature-card');
  cards.forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 0.6,
      opacity: 0,
      y: 30,
      ease: 'power2.out'
    });
  });

  // Scroll animation for section headings
  const headings = document.querySelectorAll('section h2');
  headings.forEach((heading) => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      duration: 0.6,
      opacity: 0,
      y: 20,
      ease: 'power2.out'
    });
  });
}

// ============ COUNTER ANIMATION ============
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Observe stats section to start counter
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target')) || 0;
          animateCounter(stat, target);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

// ============ SMOOTH SCROLL TO SECTIONS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============ CARD HOVER EFFECTS ============
const allCards = document.querySelectorAll('.card, .stat, .feature-card, .contact-item');
allCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// ============ MODAL HANDLING ============
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
});

// ============ CONTACT FORM SUBMISSION ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const contactData = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      message: document.getElementById('contactMessage').value,
      timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    let contacts = JSON.parse(localStorage.getItem('contactMessages')) || [];
    contacts.push(contactData);
    localStorage.setItem('contactMessages', JSON.stringify(contacts));

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
}

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Initialize body opacity for fade in
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ============ PRODUCT PAGE FILTERING ============
function filterProducts(category) {
  const allCards = document.querySelectorAll('[data-category]');
  
  // Update active filter
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.classList.remove('active');
  });
  event.target.classList.add('active');

  // Filter products
  allCards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'grid';
      // Animate in
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease';
        card.style.opacity = '1';
      }, 10);
    } else {
      card.style.display = 'none';
    }
  });
}

// ============ QUOTE REQUEST MODAL ============
function openQuoteModal(productName) {
  const modal = document.getElementById('quoteModal');
  if (modal) {
    document.getElementById('quoteProductName').value = productName;
    openModal('quoteModal');
  }
}

// Quote form submission
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const quoteData = {
      productName: document.getElementById('quoteProductName').value,
      companyName: document.getElementById('quoteCompanyName').value,
      email: document.getElementById('quoteEmail').value,
      phone: document.getElementById('quotePhone').value,
      quantity: document.getElementById('quoteQuantity').value,
      timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    let quotes = JSON.parse(localStorage.getItem('quoteRequests')) || [];
    quotes.push(quoteData);
    localStorage.setItem('quoteRequests', JSON.stringify(quotes));

    alert('Quote request submitted! Our team will contact you soon.');
    quoteForm.reset();
    closeModal('quoteModal');
  });
}

// ============ UTILITY FUNCTIONS ============
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Log initialization
console.log('Wood Camp Pharma - Main JavaScript loaded');
