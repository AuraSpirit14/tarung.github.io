// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Lenis smooth scroll - FIXED VERSION
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)), // smooth easing
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 1,
  infinite: false,
  autoRaf: false // We control RAF manually for reliability
});

// RAF loop (REQUIRED for smooth scroll to work)
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Active nav link highlighting - FIXED with proper offset
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.pageYOffset || lenis.scroll;
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150; // Offset for sticky header
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  // Update active class
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Listen to Lenis scroll events
lenis.on('scroll', (e) => {
  updateActiveNav();
});

// Also listen to native scroll for safety
window.addEventListener('scroll', updateActiveNav, { passive: true });

// Update on load/resize
window.addEventListener('load', updateActiveNav);
window.addEventListener('resize', updateActiveNav);

// Smooth scroll for anchor clicks (backup)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  });
});
