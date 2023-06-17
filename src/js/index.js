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

  loadMoreButton.style.display = 'none';

  currentImages = 0;
  currentPage = 1;

  try {
    // Выполняем HTTP-запрос с помощью axios
    const { hits, total } = await getImage();

    gallery.innerHTML = '';

    if (!total) {
      return;
    }

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

let isNeedLoadMore = false;

// Обрабатываем клик по кнопке "Load more"
loadMoreButton.addEventListener('click', async () => {
  if (isNeedLoadMore) {
    loadMoreButton.style.display = 'none';
    Notiflix.Notify.info('Anything not found');
    return;
  }

  try {
    // Выполняем HTTP-запрос с помощью axios
    const { hits, total } = await getImage(currentPage + 1);

    if (!total) {
      return;
    }

    currentImages += hits.length;

    gallery.innerHTML += renderImage(hits);

    if (total === currentImages) {
      isNeedLoadMore = true;
    }

    currentPage++; // Увеличиваем значение текущей страницы
  } catch (error) {
    console.error(error);

    // Показываем уведомление об ошибке с помощью Notiflix
    Notiflix.Notify.failure('Error occurred while fetching images.');
  }
});
