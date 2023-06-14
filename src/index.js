import Notiflix from 'notiflix';
import axios from 'axios';

// Получаем ссылку на форму и контейнер для галереи
const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreButton = document.querySelector('.load-more');
loadMoreButton.style.display = 'none';

let currentPage = 1; // Текущая страница

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
        per_page: 20,
        key: '35106771-5ec042213d922cbd410dda217' // Замените на ваш собственный ключ доступа к Unsplash API
      }
    });

    const images = response.data.hits; // Получаем массив с результатами изображений

    // Очищаем галерею
    gallery.innerHTML = '';

    // Отображаем каждое изображение
    images.forEach((image) => {
      const imageItem = document.createElement('div');
      imageItem.className = 'photo-card';

      const img = document.createElement('img');
      img.src = image.webformatURL;
      img.alt = image.tags;
      img.loading = 'lazy';
      img.width = '320';
      
      

      const info = document.createElement('div');
      info.className = 'info';

      const likes = createInfoItem('Likes', image.likes);
      const views = createInfoItem('Views', image.views);
      const comments = createInfoItem('Comments', image.comments);
      const downloads = createInfoItem('Downloads', image.downloads);

      info.appendChild(likes);
      info.appendChild(views);
      info.appendChild(comments);
      info.appendChild(downloads);

      imageItem.appendChild(img);
      imageItem.appendChild(info);

      gallery.appendChild(imageItem);

      loadMoreButton.style.display = 'block';
    });
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
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        q: searchQuery,
        page: currentPage + 1, // Увеличиваем значение страницы на 1
        per_page: 40, // Изменяем количество элементов на странице на 40
        key: '35106771-5ec042213d922cbd410dda217' // Замените на ваш собственный ключ доступа к Pixabay API
      }
    });
    
    const images = response.data.hits; // Получаем массив с результатами изображений
    
    // Отображаем каждое изображение
    images.forEach((image) => {
      const imageItem = document.createElement('div');
      imageItem.className = 'photo-card';
      
      const img = document.createElement('img');
      img.src = image.webformatURL;
      img.alt = image.tags;
      img.loading = 'lazy';
      
      const info = document.createElement('div');
      info.className = 'info';
      
      const likes = createInfoItem('Likes', image.likes);
      const views = createInfoItem('Views', image.views);
      const comments = createInfoItem('Comments', image.comments);
      const downloads = createInfoItem('Downloads', image.downloads);
      
      info.appendChild(likes);
      info.appendChild(views);
      info.appendChild(comments);
      info.appendChild(downloads);
      
      imageItem.appendChild(img);
      imageItem.appendChild(info);
      
      gallery.appendChild(imageItem);
    });
    
    currentPage++; // Увеличиваем значение текущей страницы
    
    // Если количество изображений меньше 40, скрываем кнопку "Load more"
    if (images.length < 40) {
      loadMoreButton.style.display = 'none';
      
      // Показываем уведомление о достижении конца результатов поиска
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
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
