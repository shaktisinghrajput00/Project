const loginForm = document.querySelector('#login-form');
const emailInput = document.querySelector('#member-email');
const passwordInput = document.querySelector('#member-password');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const message = document.querySelector('.login-message');
const toggle = document.querySelector('.password-toggle');

function setError(input, element, text) {
  element.textContent = text;
  input.classList.toggle('input-error', Boolean(text));
}

toggle?.addEventListener('click', () => {
  const hidden = passwordInput.type === 'password';
  passwordInput.type = hidden ? 'text' : 'password';
  toggle.textContent = hidden ? 'Hide' : 'Show';
  toggle.setAttribute('aria-label', hidden ? 'Hide password' : 'Show password');
  toggle.setAttribute('aria-pressed', String(hidden));
});

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setError(emailInput, emailError, validEmail ? '' : 'Enter a valid university email address.');
  setError(passwordInput, passwordError, password.length >= 8 ? '' : 'Password must contain at least 8 characters.');
  message.textContent = '';
  if (!validEmail || password.length < 8) return;
  message.textContent = `Welcome back, ${email.split('@')[0]}. Your member portal is ready.`;
});

document.querySelector('#sso-button')?.addEventListener('click', () => {
  message.textContent = 'Google sign-in would open here in the production site.';
});

document.querySelector('#reset-link')?.addEventListener('click', (event) => {
  event.preventDefault();
  message.textContent = 'Password recovery is ready to connect to your email service.';
});
