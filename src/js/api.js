import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '35106771-5ec042213d922cbd410dda217';

const instance = axios.create({
  baseURL: baseUrl,
  params: {
    key: apiKey,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});

export async function getImage(searchQeury, page = 1) {
  const baseParams = {
    q: searchQeury,
    page: page,
  };

  const response = await instance.get('', {
    params: { ...baseParams },
  });

  return response.data;
}
