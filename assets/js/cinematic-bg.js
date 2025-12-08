/**
 * Cinematic Background Animation
 * Premium animated background with glow, noise, and parallax
 * Inspired by high-end sites like ravendao.net
 */

class CinematicBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.time = 0;
    this.scrollY = 0;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.isAnimating = true;

    this.init();
  }

  /**
   * Initialize cinematic background
   */
  init() {
    this.createCanvas();
    this.setupParticles();
    this.setupListeners();
    this.animate();
    console.log('✓ Cinematic background initialized');
  }

  /**
   * Create canvas element
   */
  createCanvas() {
    // Check if canvas already exists
    if (document.querySelector('#cinematic-bg-canvas')) {
      this.canvas = document.querySelector('#cinematic-bg-canvas');
      this.ctx = this.canvas.getContext('2d');
      return;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'cinematic-bg-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
    `;
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d', { willReadFrequently: false });
    this.resizeCanvas();
  }

  /**
   * Resize canvas to window size
   */
  resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.scale(dpr, dpr);
  }

  /**
   * Setup particle system
   */
  setupParticles() {
    this.particles = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.getRandomColor(),
      });
    }
  }

  /**
   * Get random neon color
   */
  getRandomColor() {
    const colors = [
      'rgba(0, 217, 255, 0.3)',      // Cyan
      'rgba(179, 0, 255, 0.3)',      // Purple
      'rgba(255, 0, 255, 0.3)',      // Magenta
      'rgba(0, 255, 204, 0.3)',      // Teal
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Setup event listeners
   */
  setupListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    });
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    window.addEventListener('blur', () => {
      this.isAnimating = false;
    });
    window.addEventListener('focus', () => {
      this.isAnimating = true;
    });
  }

  /**
   * Main animation loop
   */
  animate = () => {
    if (this.isAnimating) {
      this.update();
      this.draw();
    }
    requestAnimationFrame(this.animate);
  };

  /**
   * Update particle positions
   */
  update() {
    this.time++;

    // Update particles
    this.particles.forEach((particle) => {
      // Movement
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Slight sine wave motion
      particle.y += Math.sin(this.time * 0.01 + particle.x * 0.01) * 0.1;

      // Wrap around edges
      if (particle.x > window.innerWidth) particle.x = 0;
      if (particle.x < 0) particle.x = window.innerWidth;
      if (particle.y > window.innerHeight) particle.y = 0;
      if (particle.y < 0) particle.y = window.innerHeight;

      // Opacity pulse
      particle.opacity = 0.3 + Math.sin(this.time * 0.02 + particle.x * 0.01) * 0.2;
    });
  }

  /**
   * Draw scene
   */
  draw() {
    const { width, height } = this.canvas;

    // Create animated gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    
    const hue = (this.time * 0.05) % 360;
    const hueShift = Math.sin(this.time * 0.001) * 30;

    gradient.addColorStop(0, '#050509');
    gradient.addColorStop(0.5, `hsl(${hue + hueShift}, 100%, 15%)`);
    gradient.addColorStop(1, '#0a0a0f');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);

    // Draw glow circles (distant background elements)
    this.drawGlowCircles();

    // Draw particles
    this.drawParticles();

    // Draw grid overlay (subtle)
    this.drawGrid();

    // Draw vignette (darkened edges)
    this.drawVignette();
  }

  /**
   * Draw background glow circles
   */
  drawGlowCircles() {
    const circles = [
      {
        x: window.innerWidth * 0.2,
        y: window.innerHeight * 0.3,
        r: 150,
        color: 'rgba(0, 217, 255, 0.05)',
      },
      {
        x: window.innerWidth * 0.8,
        y: window.innerHeight * 0.7,
        r: 120,
        color: 'rgba(179, 0, 255, 0.05)',
      },
      {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.5,
        r: 100,
        color: 'rgba(255, 0, 255, 0.03)',
      },
    ];

    circles.forEach((circle) => {
      // Add parallax effect based on scroll
      const parallax = this.scrollY * 0.1;

      const gradient = this.ctx.createRadialGradient(
        circle.x,
        circle.y - parallax,
        0,
        circle.x,
        circle.y - parallax,
        circle.r
      );

      gradient.addColorStop(0, circle.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    });
  }

  /**
   * Draw particles
   */
  drawParticles() {
    this.particles.forEach((particle) => {
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1;
  }

  /**
   * Draw subtle grid overlay
   */
  drawGrid() {
    this.ctx.strokeStyle = 'rgba(0, 217, 255, 0.02)';
    this.ctx.lineWidth = 1;

    const gridSize = 100;
    for (let x = 0; x < window.innerWidth; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, window.innerHeight);
      this.ctx.stroke();
    }

    for (let y = 0; y < window.innerHeight; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(window.innerWidth, y);
      this.ctx.stroke();
    }
  }

  /**
   * Draw vignette (darkened edges)
   */
  drawVignette() {
    const gradient = this.ctx.createRadialGradient(
      window.innerWidth / 2,
      window.innerHeight / 2,
      0,
      window.innerWidth / 2,
      window.innerHeight / 2,
      Math.max(window.innerWidth, window.innerHeight)
    );

    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cinematicBg = new CinematicBackground();
  });
} else {
  window.cinematicBg = new CinematicBackground();
}
