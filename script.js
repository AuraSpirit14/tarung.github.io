// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Load dynamic data from JSON (replace with your GitHub-hosted data.json)
async function loadPortfolioData() {
  try {
    const response = await fetch('./data.json'); // Host this file in your repo
    if (!response.ok) throw new Error('Failed to load data');
    const data = await response.json();

    // Update headline with typing animation
    const typed = new Typed('#typed-headline', {
      strings: [data.headline],
      typeSpeed: 50,
      showCursor: false,
    });

    // Update about
    document.getElementById('about-content').textContent = data.about;

    // Update experience
    const timeline = document.getElementById('experience-timeline');
    data.experience.forEach(job => {
      const jobDiv = document.createElement('div');
      jobDiv.className = 'job';
      jobDiv.innerHTML = `
        <h3>${job.title}</h3>
        <h4>${job.company} • ${job.dates}</h4>
        <ul>${job.achievements.map(ach => `<li>${ach}</li>`).join('')}</ul>
      `;
      timeline.appendChild(jobDiv);
    });

    // Update skills
    const skillsGrid = document.getElementById('skills-grid');
    data.skills.forEach(skill => {
      const span = document.createElement('span');
      span.textContent = skill;
      skillsGrid.appendChild(span);
    });

    // Update projects
    const projectsGrid = document.getElementById('projects-grid');
    data.projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank" rel="noopener">View Project →</a>
      `;
      projectsGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    // Fallback to static content if fetch fails
    document.getElementById('about-content').textContent = 'Error loading data. Please check your connection.';
  }
}

// Theme toggle (unique feature)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

// Scroll animations
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);
sections.forEach((sec) => observer.observe(sec));

// Scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = '↑';
scrollTopBtn.className = 'scroll-top';
document.body.appendChild(scrollTopBtn);
scrollTopBtn.addEventListener('click', () => lenis.scrollTo(0));
window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Load data on page load
document.addEventListener('DOMContentLoaded', loadPortfolioData);

