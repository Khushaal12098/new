/**
 * Animated Background System
 * Creates a smooth, interactive 3D particle field that reacts to scroll and mouse movement.
 * Uses Three.js for WebGL rendering with fallback to canvas gradient.
 */

class AnimatedBackground {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.canvas = null;
    this.useWebGL = true;
    this.scrollY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isAnimating = true;
    
    this.init();
  }

  /**
   * Initialize the background system.
   * Attempts Three.js WebGL, falls back to canvas gradient if unavailable.
   */
  init() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded. Using canvas fallback.');
      this.useWebGL = false;
      this.initCanvasFallback();
      return;
    }

    try {
      this.initWebGL();
    } catch (error) {
      console.error('WebGL init failed, using canvas fallback:', error);
      this.useWebGL = false;
      this.initCanvasFallback();
    }
  }

  /**
   * Initialize Three.js WebGL scene with animated particles.
   */
  initWebGL() {
    // Create container
    const container = document.getElementById('animated-bg-container');
    if (!container) return;

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050509);
    this.scene.fog = new THREE.Fog(0x050509, 100, 1000);

    // Camera setup (orthographic for 2D-like feel)
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      1000
    );
    this.camera.position.z = 50;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      precision: 'mediump'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = false;
    container.appendChild(this.renderer.domElement);

    // Create animated particle field
    this.createParticleField();

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d9ff, 1, 500);
    pointLight.position.set(width / 2, height / 2, 100);
    this.scene.add(pointLight);

    // Event listeners
    window.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('blur', () => this.isAnimating = false);
    window.addEventListener('focus', () => this.isAnimating = true);

    // Start animation loop
    this.animate();
  }

  /**
   * Create the particle field with animated geometry.
   */
  createParticleField() {
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Color palette: neon accents over dark background
    const colorPalette = [
      { r: 0.0, g: 0.85, b: 1.0 },    // Cyan #00d9ff
      { r: 0.7, g: 0.0, b: 1.0 },     // Purple #b300ff
      { r: 1.0, g: 0.0, b: 1.0 },     // Magenta #ff00ff
      { r: 0.0, g: 1.0, b: 0.8 },     // Teal #00ffcc
      { r: 0.5, g: 0.2, b: 1.0 }      // Deep purple
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Random position across viewport
      positions[i3] = (Math.random() - 0.5) * width;
      positions[i3 + 1] = (Math.random() - 0.5) * height;
      positions[i3 + 2] = Math.random() * 100 - 50;

      // Random velocity (slow movement)
      velocities[i3] = (Math.random() - 0.5) * 0.5;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    // Create geometry and material
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      fog: true
    });

    this.particles = new THREE.Points(geometry, material);
    this.particles.userData.velocities = velocities;
    this.particles.userData.initialPositions = positions.slice();
    this.scene.add(this.particles);
  }

  /**
   * Handle scroll events: create parallax effect.
   */
  onScroll() {
    this.scrollY = window.scrollY;

    if (this.particles) {
      // Subtle parallax: move background slightly opposite to scroll
      this.particles.position.y = -this.scrollY * 0.1;
      
      // Rotate particles slowly based on scroll
      this.particles.rotation.z += (this.scrollY - (this.particles.userData.lastScrollY || 0)) * 0.0001;
      this.particles.userData.lastScrollY = this.scrollY;
    }

    if (this.camera && !this.useWebGL) {
      // Canvas fallback parallax
      // (handled in canvas animation)
    }
  }

  /**
   * Handle mouse movement: shift camera and gradient.
   */
  onMouseMove(e) {
    this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    if (this.camera) {
      // Subtle camera shift based on mouse (limited range)
      this.camera.position.x = this.mouseX * 50;
      this.camera.position.y = this.mouseY * 50;
    }
  }

  /**
   * Handle window resize: update camera and renderer.
   */
  onWindowResize() {
    if (!this.useWebGL) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update camera
    this.camera.left = -width / 2;
    this.camera.right = width / 2;
    this.camera.top = height / 2;
    this.camera.bottom = -height / 2;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(width, height);
  }

  /**
   * Animation loop using requestAnimationFrame.
   */
  animate = () => {
    if (!this.isAnimating) {
      requestAnimationFrame(this.animate);
      return;
    }

    if (this.useWebGL && this.particles) {
      this.updateParticles();
      this.renderer.render(this.scene, this.camera);
    } else {
      this.updateCanvasFallback();
    }

    requestAnimationFrame(this.animate);
  };

  /**
   * Update particle positions and rotations.
   */
  updateParticles() {
    const positions = this.particles.geometry.attributes.position.array;
    const velocities = this.particles.userData.velocities;
    const initialPositions = this.particles.userData.initialPositions;
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < positions.length; i += 3) {
      const i3 = i;
      const i3_1 = i + 1;
      const i3_2 = i + 2;

      // Update position
      positions[i3] += velocities[i3] + Math.sin(Date.now() * 0.0001 + i) * 0.05;
      positions[i3_1] += velocities[i3_1] + Math.cos(Date.now() * 0.00008 + i) * 0.05;
      positions[i3_2] += velocities[i3_2];

      // Wrap around screen edges
      if (positions[i3] > width / 2) positions[i3] = -width / 2;
      if (positions[i3] < -width / 2) positions[i3] = width / 2;
      if (positions[i3_1] > height / 2) positions[i3_1] = -height / 2;
      if (positions[i3_1] < -height / 2) positions[i3_1] = height / 2;
    }

    this.particles.geometry.attributes.position.needsUpdate = true;

    // Rotate particles for depth effect
    this.particles.rotation.x += 0.0001;
    this.particles.rotation.y += 0.00015;
  }

  /**
   * Canvas fallback: animated gradient background.
   */
  initCanvasFallback() {
    this.canvas = document.getElementById('animated-bg-container');
    if (!this.canvas) return;

    // Create a canvas element
    const canvasEl = document.createElement('canvas');
    canvasEl.style.position = 'fixed';
    canvasEl.style.top = '0';
    canvasEl.style.left = '0';
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';
    canvasEl.style.zIndex = '-1';
    this.canvas.appendChild(canvasEl);

    this.canvas.canvasEl = canvasEl;
    this.canvas.ctx = canvasEl.getContext('2d');
    this.resizeCanvasFallback();

    window.addEventListener('resize', () => this.resizeCanvasFallback());
  }

  /**
   * Resize canvas fallback.
   */
  resizeCanvasFallback() {
    if (!this.canvas || !this.canvas.canvasEl) return;
    this.canvas.canvasEl.width = window.innerWidth;
    this.canvas.canvasEl.height = window.innerHeight;
  }

  /**
   * Update canvas fallback animation.
   */
  updateCanvasFallback() {
    if (!this.canvas || !this.canvas.ctx) return;

    const ctx = this.canvas.ctx;
    const width = this.canvas.canvasEl.width;
    const height = this.canvas.canvasEl.height;
    const time = Date.now() * 0.001;

    // Create animated gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    
    // Base colors
    gradient.addColorStop(0, '#050509');
    
    // Animated middle color
    const hue = (time * 20) % 360;
    gradient.addColorStop(0.5, `hsl(${hue}, 80%, 20%)`);
    
    // End color
    gradient.addColorStop(1, '#0a0a0f');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add some animated circles for visual interest
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 5; i++) {
      const x = width / 2 + Math.sin(time + i) * width * 0.3;
      const y = height / 2 + Math.cos(time + i) * height * 0.3;
      const r = 100 + Math.sin(time * 0.5 + i) * 50;
      
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = '#00d9ff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.animatedBg = new AnimatedBackground();
  });
} else {
  window.animatedBg = new AnimatedBackground();
}
