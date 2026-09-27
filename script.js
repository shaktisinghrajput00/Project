const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (cursorGlow) cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const stat = entry.target;
    const target = Number(stat.dataset.target);
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      stat.textContent = Math.floor(progress * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    statObserver.unobserve(stat);
  });
}, { threshold: .7 });
document.querySelectorAll('[data-target]').forEach((stat) => statObserver.observe(stat));

const form = document.querySelector('#join-form');
const message = document.querySelector('.form-message');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = new FormData(form).get('email');
  message.textContent = `You’re on the list, ${email.split('@')[0]} — see you soon.`;
  form.reset();
});

document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  const button = document.querySelector('.menu-toggle');
  const open = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!open));
  document.querySelector('.desktop-nav').classList.toggle('mobile-open', !open);
});
