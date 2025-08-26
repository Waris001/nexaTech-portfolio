
// Mobile nav toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav){
  toggle.addEventListener('click', () => {
    // const open = nav.style.display === 'flex';
    // nav.style.display = open ? 'none' : 'flex';
    nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', (!open).toString());
  });
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Simple fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
},{ threshold: 0.1 });

document.querySelectorAll('.card, .feature, .price-card, .hero-copy, .hero-art').forEach(el => {
  el.classList.add('fade');
  observer.observe(el);
});


