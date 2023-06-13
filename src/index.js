import Notiflix from 'notiflix';
import axios from 'axios';

// Получаем ссылку на форму и контейнер для изображений
const form = document.getElementById('search-form');
const imageContainer = document.getElementById('image-container');

// Обрабатываем событие отправки формы
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Предотвращаем перезагрузку страницы

  const searchQuery = form.searchQuery.value; // Получаем значение поискового запроса

  try {
    // Выполняем HTTP-запрос с помощью axios
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        q: searchQuery,
        page: 1,
        per_page: 10,
        key: '35106771-5ec042213d922cbd410dda217' // Замените на ваш собственный ключ доступа к Unsplash API
      }
    });

    const images = response.data.hits; // Получаем массив с результатами изображений

    console.log(images)

    // Очищаем контейнер с изображениями
    imageContainer.innerHTML = '';

    // Отображаем каждое изображение
    images.forEach((image) => {
      // const imageItem = document.createElement('div');
      // imageItem.className = 'image-item';

      // const img = document.createElement('img');
      // img.src = image.webformatURL ;

      // imageItem.appendChild(img);

      const imageItem = `
          <div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
              </p>
              <p class="info-item">
                <b>Views</b>
              </p>
            <p class="info-item">
              <b>Comments</b>
            </p>
            <p class="info-item">
              <b>Downloads</b>
            </p>
          </div>
        </div>
      `;
      imageContainer.appendChild(imageItem);
    });
  } catch (error) {
    console.error(error);
    // Показываем уведомление об ошибке с помощью notiflix
    Notiflix.Notify.failure('Error occurred while fetching images.');
  }
});
