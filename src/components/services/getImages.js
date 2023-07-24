import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37056032-0b2a95b93ecf27021c46d83a6';
const perPage = 12;

export const getImages = async ({ value, page }) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
};
