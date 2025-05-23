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
