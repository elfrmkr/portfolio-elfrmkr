document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const menuToggleBtn = document.getElementById('menu-toggle');
  const headerContent = document.getElementById('header-content');

  if (!themeToggleBtn || !menuToggleBtn || !headerContent) return;

  function setTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-theme');
      themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
      body.classList.remove('light-theme');
      themeToggleBtn.textContent = '☀️ Light Mode';
    }
    localStorage.setItem('theme', theme);
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });

  // On page load, apply saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // Hamburger menu toggle
  menuToggleBtn.addEventListener('click', () => {
    const expanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
    menuToggleBtn.setAttribute('aria-expanded', String(!expanded));
    menuToggleBtn.classList.toggle('active');
    headerContent.classList.toggle('show');
  });

  // Close mobile menu when a nav link is clicked
  headerContent.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuToggleBtn.setAttribute('aria-expanded', 'false');
        menuToggleBtn.classList.remove('active');
        headerContent.classList.remove('show');
      }
    });
  });
});

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const slideWidth = slides[0].getBoundingClientRect().width + 16; // slide + margin

let currentIndex = 0;

function moveToSlide(index) {
  track.style.transform = 'translateX(-' + (slideWidth * index) + 'px)';
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveToSlide(currentIndex);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();

      const startY = window.pageYOffset;
      const endY = target.getBoundingClientRect().top + startY;
      const duration = 1200; // Adjust for slower/faster scroll (ms)
      const startTime = performance.now();

      function scrollAnimation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startY + (endY - startY) * ease);

        if (progress < 1) {
          requestAnimationFrame(scrollAnimation);
        }
      }

      function easeInOutCubic(t) {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      requestAnimationFrame(scrollAnimation);
    }
  });
});