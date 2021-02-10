import axios from 'axios';

export const elementsPerPage = 12;

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

export default axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: API_KEY,
    limit: elementsPerPage,
    rating: 'g',
    lang: 'en',
  },
});
