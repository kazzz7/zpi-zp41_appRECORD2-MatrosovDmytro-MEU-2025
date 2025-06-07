const input = document.getElementById('secret-input');
const btn = document.getElementById('toggle-btn');
let hidden = false;

btn.addEventListener('click', () => {
  if (!hidden) {
    input.type = 'password';
    btn.textContent = 'Розкрити';
  } else {
    input.type = 'text';
    btn.textContent = 'Приховати';
  }
  hidden = !hidden;
});
