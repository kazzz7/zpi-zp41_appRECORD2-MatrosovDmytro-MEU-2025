import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";

const API_KEY = 'YOUR_PIXABAY_KEY';
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
let lightbox;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const q = form.query.value.trim();
  if (!q) return;
  gallery.innerHTML = '';
  try {
    const resp = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(q)}&image_type=photo&orientation=horizontal&per_page=12&safesearch=true`);
    const data = await resp.json();
    if (data.hits.length === 0) {
      iziToast.warning({ title: 'No results', message: 'Sorry, there are no images matching your search query. Please try again!' });
      return;
    }
    const items = data.hits.map(hit => `
      <a href="${hit.largeImageURL}" class="gallery__item">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy"/>
      </a>
    `).join('');
    gallery.innerHTML = items;
    lightbox = new SimpleLightbox('.gallery a').refresh();
  } catch {
    iziToast.error({ title: 'Error', message: 'Network error, please try later.' });
  }
});
