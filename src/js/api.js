import axios from 'axios';
import Notiflix from 'notiflix';

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '35106771-5ec042213d922cbd410dda217';

const instance = axios.create({
  baseURL: baseUrl,
  params: {
    key: apiKey,
  },
});

export async function getImage(params) {
  const baseParams = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40, 
       
  };

  const response = await instance.get('', {
    params: { ...baseParams, ...params },
  });

  return response.data;
}
