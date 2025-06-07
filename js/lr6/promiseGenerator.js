const form = document.querySelector('.promise-form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = Number(form.delay.value);
  const state = form.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  })
    .then(d => console.log(`✅ Fulfilled promise in ${d}ms`))
    .catch(d => console.log(`❌ Rejected promise in ${d}ms`))
    .finally(() => form.reset());
});
