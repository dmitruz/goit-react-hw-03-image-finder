import axios from 'axios';

const API_KEY = '24421927-3704d5d5ee001c08661d65ce4';
const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

const fetchImagesFunction = (query, page = 1) =>
  axios.get(`${URL}&q=${query}&page=${page}`);

export default fetchImagesFunction;