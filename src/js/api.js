import axios from 'axios';

const form = document.getElementById('search-form');

function trimSearchValue(value = '') {
    return value.trim();
}

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '35106771-5ec042213d922cbd410dda217';

const instance = axios.create({
    baseURL: baseUrl,
    params: {
        key: apiKey,
    },
});

export async function getImage(page = 1) {
    const searchQuery = form.searchQuery.value; // Получаем значение поискового запроса
    const trimValue = trimSearchValue(searchQuery);

    if (!trimValue.length) {
        return {};
    }

    const baseParams = {
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
        q: trimSearchValue(trimValue)
    };

    const response = await instance.get('', {
        params: { ...baseParams },
    });

    return response.data;
}
