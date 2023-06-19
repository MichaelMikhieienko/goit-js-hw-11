import Notiflix from 'notiflix';
import { getImage } from './api';
import { renderImage } from './renderImage';

const form = document.getElementById('search-form');
// Получаем ссылку на форму и контейнер для галереи
const gallery = document.getElementById('gallery');
const loadMoreButton = document.querySelector('.load-more');
loadMoreButton.style.display = 'none';

let currentPage = 1; // Текущая страница

let currentImages = 0;

// Обрабатываем событие отправки формы
form.addEventListener('submit', async event => {
  event.preventDefault(); // Предотвращаем перезагрузку страницы

  const searchQuery = form.searchQuery.value.trim();

  loadMoreButton.style.display = 'none';

  currentImages = 0;
  currentPage = 1;

  if (!searchQuery.length) {
    Notiflix.Notify.info('Hooray! We not found anything!');
    return;
  }

  try {
    // Выполняем HTTP-запрос с помощью axios
    const { hits, totalHits: total } = await getImage(searchQuery);

    gallery.innerHTML = '';

    if (total === 0) {
      Notiflix.Notify.info('Hooray! We not found anything!');
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${total} images`);

    // Очищаем галерею

    gallery.innerHTML = renderImage(hits).join('');

    if (total > 40) {
      loadMoreButton.style.display = 'block';
    }
    currentImages = hits.length;
  } catch (error) {
    console.error(error);

    // Показываем уведомление об ошибке с помощью Notiflix
    Notiflix.Notify.failure('Error occurred while fetching images.');
  }
});

// Обрабатываем клик по кнопке "Load more"
loadMoreButton.addEventListener('click', async () => {
  try {
    const searchQuery = form.searchQuery.value;

    // Выполняем HTTP-запрос с помощью axios
    const { hits, totalHits: total } = await getImage(
      searchQuery,
      currentPage + 1
    );

    currentImages += hits.length;

    gallery.insertAdjacentHTML('beforeend', renderImage(hits).join(''));

    if (total <= currentImages) {
      loadMoreButton.style.display = 'none';
      Notiflix.Notify.info('You have reached the end of the list');
    }

    currentPage++; // Увеличиваем значение текущей страницы
  } catch (error) {
    console.error(error);

    // Показываем уведомление об ошибке с помощью Notiflix
    Notiflix.Notify.failure('Error occurred while fetching images.');
  }
});
