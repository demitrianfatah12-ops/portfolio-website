const header = document.querySelector('.header');
const menuToggle = document.querySelector('#menuToggle');
const navMenu = document.querySelector('#navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 30);
});

menuToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('open');
});

navLinks.forEach((link) => link.addEventListener('click', () => navMenu?.classList.remove('open')));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-fade').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  revealObserver.observe(element);
});

const filterButtons = document.querySelectorAll('.filter-btn');
const timelineItems = document.querySelectorAll('.timeline-item');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    timelineItems.forEach((item) => {
      const visible = filter === 'all' || item.dataset.category === filter;
      item.style.display = visible ? 'grid' : 'none';
    });
  });
});

const sections = document.querySelectorAll('main section[id]');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => activeObserver.observe(section));
