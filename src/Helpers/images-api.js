const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "24421927-3704d5d5ee001c08661d65ce4";

function fetchImages(query, page) {
  return fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Ничего не найдено по данному запросу`));
  });
}

export default fetchImages;