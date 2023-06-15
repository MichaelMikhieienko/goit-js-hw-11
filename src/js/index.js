import Notiflix from 'notiflix';
import axios from 'axios';
import { getImage } from './api';
import { renderImage } from './renderImage';

function trimSearchValue(value = '') {
  return value.trim();
}

// Получаем ссылку на форму и контейнер для галереи
const form = document.getElementById('search-form');
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

  const searchQuery = form.searchQuery.value; // Получаем значение поискового запроса
  const trimValue = trimSearchValue(searchQuery);

  if (!trimValue.length) {
    return;
  }

  try {
    // Выполняем HTTP-запрос с помощью axios
    const { hits, total } = await getImage({
      q: trimSearchValue(searchQuery),
      page: 1,
      per_page: 20,
    });

    gallery.innerHTML = '';

    if (total === 0) {
      Notiflix.Notify.info(`Hooray! We not found anything!`);

      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${total} images`);

    // Очищаем галерею

    gallery.innerHTML = renderImage(hits).join('');

    if (total > 20) {
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
    const searchQuery = form.searchQuery.value; // Получаем значение поискового запроса

    // Выполняем HTTP-запрос с помощью axios
    const { hits, total } = await getImage({
      q: trimSearchValue(searchQuery),
      page: currentPage + 1, // Увеличиваем значение страницы на 1
      per_page: 40, // Изменяем количество элементов на странице на 40
    });

    currentImages += hits.length;

    gallery.innerHTML += renderImage(hits);

    currentPage++; // Увеличиваем значение текущей страницы

    if (total < currentImages) {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    console.error(error);

    // Показываем уведомление об ошибке с помощью Notiflix
    Notiflix.Notify.failure('Error occurred while fetching images.');
  }
});

// Вспомогательная функция для создания элемента информации в карточке изображения
function createInfoItem(label, value) {
  const infoItem = document.createElement('p');
  infoItem.className = 'info-item';

  const bold = document.createElement('b');
  bold.textContent = label;

  const span = document.createElement('span');
  span.textContent = value;

  infoItem.appendChild(bold);
  infoItem.appendChild(span);

  return infoItem;
}
