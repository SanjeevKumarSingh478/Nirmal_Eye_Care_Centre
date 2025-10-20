/**
 * Enhanced Animations for Nirmal Eye Care Center
 * Mobile-first approach with smooth transitions and engaging effects
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Device detection
  const isMobile = window.innerWidth <= 760 || /Mobi|Android/i.test(navigator.userAgent);
  const isTablet = window.innerWidth > 760 && window.innerWidth <= 1024;

  // Color theme variables
  const colors = {
    primary: '#0b6ef6',
    primaryDark: '#0754d1',
    accent: '#d6e9ff',
    muted: '#6b7280'
  };

  /**
   * Enhanced Hero Animation with floating elements
   */
  function initHeroAnimation() {
    if (prefersReducedMotion) return;

    const container = document.getElementById('hero-animation');
    if (!container) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.style.display = 'block';
    container.appendChild(svg);

    // Enhanced parameters for more dynamic animation
    const NUM_CIRCLES = isMobile ? 4 : 6;
    const circles = [];
    const colorVariants = [
      'rgba(11,110,246,0.2)',
      'rgba(7,84,209,0.16)',
      'rgba(14,165,233,0.12)',
      'rgba(7,197,139,0.1)',
      'rgba(6,34,77,0.08)'
    ];

    // Create floating circles
    for (let i = 0; i < NUM_CIRCLES; i++) {
      const radius = 20 + Math.random() * 60;
      const cx = 30 + Math.random() * 140;
      const cy = 20 + Math.random() * 140;
      const fill = colorVariants[i % colorVariants.length];
      
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('r', radius);
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('fill', fill);
      circle.setAttribute('opacity', 0);
      svg.appendChild(circle);

      circles.push({
        element: circle,
        baseX: cx,
        baseY: cy,
        amplitudeX: 8 + Math.random() * 25,
        amplitudeY: 8 + Math.random() * 25,
        speed: 0.15 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        baseRadius: radius,
        radiusAmplitude: radius * 0.1 + Math.random() * 8,
        opacityBase: 0.2 + Math.random() * 0.3
      });
    }

    // Animation loop
    let lastTime = performance.now();
    function animate(currentTime) {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      const time = currentTime / 1000;

      circles.forEach(circle => {
        const x = circle.baseX + Math.cos(time * circle.speed + circle.phase) * circle.amplitudeX;
        const y = circle.baseY + Math.sin(time * circle.speed * 1.3 + circle.phase * 1.7) * circle.amplitudeY;
        const r = Math.max(10, circle.baseRadius + Math.sin(time * circle.speed * 1.1 + circle.phase) * circle.radiusAmplitude);
        const opacity = Math.max(0, circle.opacityBase + Math.sin(time * circle.speed * 1.4 + circle.phase * 0.7) * 0.15);

        circle.element.setAttribute('cx', x.toFixed(2));
        circle.element.setAttribute('cy', y.toFixed(2));
        circle.element.setAttribute('r', r.toFixed(2));
        circle.element.setAttribute('opacity', opacity.toFixed(3));
      });

      requestAnimationFrame(animate);
    }

    // Fade in animation
    svg.style.opacity = 0;
    svg.style.transition = 'opacity 800ms ease-out';
    requestAnimationFrame(() => {
      svg.style.opacity = 1;
      requestAnimationFrame(animate);
    });
  }

  /**
   * Enhanced Scroll Reveal Animation
   */
  function initScrollReveal() {
    if (prefersReducedMotion) {
      // Just show all elements
      document.querySelectorAll('.card, .summary, .contact-card, .hero-grid').forEach(el => {
        el.classList.add('show');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          
          // Add staggered animation for cards
          if (entry.target.classList.contains('card')) {
            const cards = Array.from(document.querySelectorAll('.card'));
            const index = cards.indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 0.1}s`;
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements
    const elementsToReveal = document.querySelectorAll('.card, .summary, .contact-card, .hero-grid');
    elementsToReveal.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /**
   * Enhanced Card Interactions
   */
  function initCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      // Add ripple effect on touch/click
      card.addEventListener('touchstart', function(e) {
        if (prefersReducedMotion) return;
        
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.touches[0].clientX - rect.left - size / 2;
        const y = e.touches[0].clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(11,110,246,0.1);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
          z-index: 1;
        `;
        
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /**
   * Enhanced Button Interactions
   */
  function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      // Add click animation
      button.addEventListener('click', function(e) {
        if (prefersReducedMotion) return;
        
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('div');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.4s ease-out;
          pointer-events: none;
          z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 400);
      });
    });
  }

  /**
   * Enhanced Ambient Background Animation
   */
  function initAmbientBackground() {
    if (prefersReducedMotion) return;
    if (!window.requestAnimationFrame) return;

    const container = document.getElementById('ambient-bg');
    if (!container) return;

    const blobs = Array.from(container.querySelectorAll('.blob'));
    if (!blobs.length) return;

    document.body.classList.add('ambient-js-active');

    const blobParams = blobs.map((blob, index) => ({
      element: blob,
      baseX: (index - 1) * 8,
      baseY: (index - 1) * -6,
      amplitudeX: isMobile ? 30 : 80,
      amplitudeY: isMobile ? 20 : 60,
      speed: 0.02 + index * 0.008 + Math.random() * 0.01,
      phase: Math.random() * Math.PI * 2
    }));

    let startTime = performance.now();
    let rafId = null;

    function animateBlobs(currentTime) {
      const time = (currentTime - startTime) / 1000;
      
      blobParams.forEach(param => {
        const dx = Math.sin(time * param.speed + param.phase) * param.amplitudeX + 
                   param.baseX * (window.innerWidth / 100);
        const dy = Math.cos(time * param.speed * 0.9 + param.phase) * param.amplitudeY + 
                   param.baseY * (window.innerHeight / 100);
        
        param.element.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1)`;
      });
      
      rafId = requestAnimationFrame(animateBlobs);
    }

    rafId = requestAnimationFrame(animateBlobs);

    // Cleanup
    function stop() {
      if (rafId) cancelAnimationFrame(rafId);
      document.body.classList.remove('ambient-js-active');
    }
    
    window.addEventListener('pagehide', stop, { passive: true });
    window.addEventListener('beforeunload', stop, { passive: true });
  }

  /**
   * Enhanced Parallax Effect for Desktop
   */
  function initParallaxEffect() {
    if (prefersReducedMotion || isMobile) return;

    const hero = document.querySelector('.hero');
    const visual = document.querySelector('.hero-visual');
    if (!hero || !visual) return;

    let rafId = null;
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    function handleMouseMove(e) {
      const rect = hero.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX = (e.clientX - centerX) / rect.width;
      mouseY = (e.clientY - centerY) / rect.height;
      
      if (!rafId) rafId = requestAnimationFrame(updateParallax);
    }

    function updateParallax() {
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;
      
      const translateX = targetX * 15;
      const translateY = targetY * 15;
      const rotate = targetX * 3;
      
      visual.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg)`;
      rafId = null;
    }

    hero.addEventListener('pointermove', handleMouseMove, { passive: true });
    hero.addEventListener('pointerleave', () => {
      visual.style.transform = 'none';
    }, { passive: true });
  }

  /**
   * Mobile-specific pulse animation for hero badge
   */
  function initMobilePulse() {
    if (prefersReducedMotion || !isMobile) return;

    const badge = document.querySelector('.hero-badge');
    if (badge) {
      badge.classList.add('pulse');
    }
  }

  /**
   * Add CSS for ripple animation
   */
  function addRippleStyles() {
    if (prefersReducedMotion) return;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      .card:hover .card-icon {
        transform: scale(1.1) rotate(5deg);
        transition: transform 0.3s ease;
      }
      
      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(11,110,246,0.2);
      }
      
      .hero-badge {
        transition: transform 0.3s ease;
      }
      
      .hero-badge:hover {
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Mobile Menu Functionality
   */
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    
    if (!menuBtn || !nav) return;
    
    menuBtn.addEventListener('click', function() {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
      
      // Close menu when clicking on a link
      const navLinks = nav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          menuBtn.setAttribute('aria-expanded', 'false');
          nav.classList.remove('active');
        });
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuBtn.contains(e.target) && !nav.contains(e.target)) {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('active');
      }
    });
  }

  /**
   * Initialize all animations
   */
  function init() {
    // Add ripple styles first
    addRippleStyles();
    
    // Initialize all animation systems
    initHeroAnimation();
    initScrollReveal();
    initCardInteractions();
    initButtonInteractions();
    initAmbientBackground();
    initParallaxEffect();
    initMobilePulse();
    initMobileMenu();
    
    // Add loading animation
    document.body.classList.add('animations-loaded');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Reinitialize if needed
      const newIsMobile = window.innerWidth <= 760;
      if (newIsMobile !== isMobile) {
        location.reload(); // Simple approach for device change
      }
    }, 250);
  });

})();
