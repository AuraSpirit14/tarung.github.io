import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.4, // Smooth scroll speed
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Unique transition: Fade-in sections on scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('visible'); // For staggered animations
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((sec, index) => {
  sec.style.opacity = 0;
  sec.style.transform = 'translateY(50px)';
  sec.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
  observer.observe(sec);
});
