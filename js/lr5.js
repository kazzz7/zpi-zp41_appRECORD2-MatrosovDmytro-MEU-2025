// Дані для галереї (замініть на свої URL)
const images = [
    {
      preview: 'https://via.placeholder.com/150',
      original: 'https://via.placeholder.com/600',
      description: 'Placeholder image 1'
    },
    // …інші об’єкти
  ];
  
  // 1) Генеруємо розмітку та додаємо в ul.gallery
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = images.map(({preview, original, description}) =>
    `<li class="gallery__item">
       <a href="${original}">
         <img class="gallery__image" src="${preview}" alt="${description}" />
       </a>
     </li>`
  ).join('');
  
  // 2) Делегуємо клік, відкриваємо basicLightbox
  gallery.addEventListener('click', e => {
    e.preventDefault();
    const link = e.target.closest('a');
    if (!link) return;
    basicLightbox.create(`<img src="${link.href}" alt="" />`).show();
  });
  
  // 3) Web Storage для форми
  const form = document.querySelector('.feedback-form');
  const STORAGE_KEY = 'feedback-form-state';
  let formData = { email: '', message: '' };
  
  // Завантажуємо з сховища
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    formData = JSON.parse(saved);
    form.email.value   = formData.email;
    form.message.value = formData.message;
  }
  
  // Записуємо в сховище на input
  form.addEventListener('input', e => {
    formData[e.target.name] = e.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  });
  
  // Обробка submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const { email, message } = formData;
    if (!email || !message) {
      alert('Заповніть усі поля');
      return;
    }
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData = { email: '', message: '' };
  });
  