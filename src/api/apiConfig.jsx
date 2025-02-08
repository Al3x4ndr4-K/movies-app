import axios from 'axios';

export const imagePath = 'https://image.tmdb.org/t/p/w500';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = import.meta.env.VITE_API_KEY;

// TRENDING
export const fetchTrending = async (timeWindow = 'day') => {
  const { data } = await axios.get(`${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`);
  console.log(data?.results);
  return data?.results;
};

// SEARCH

export const searchData = async (query, page = 1) => {
  let results = [];
  let totalResults = 0;
  let currentPage = page;

  while (results.length < 20) {
    try {
      const res = await axios.get(
        `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${currentPage}&include_adult=false`
      );

      const filteredResults =
        res?.data?.results?.filter((item) => item.media_type === 'movie' || item.media_type === 'tv') || [];

      results = [...results, ...filteredResults];

      totalResults = res?.data?.total_results || 0;

      if (filteredResults.length < 20 || results.length >= 20 || currentPage >= Math.ceil(totalResults / 20)) {
        break;
      }

      currentPage++;
    } catch (err) {
      console.error('API Error:', err.response ? err.response.data : err.message);
      break;
    }
  }

  return {
    results: results.slice(0, 20),
    totalResults,
  };
};

// GENRES

export const fetchGenres = async () => {
  try {
    const movieGenresRes = await axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en`);
    const tvGenresRes = await axios.get(`${baseUrl}/genre/tv/list?api_key=${apiKey}&language=en`);

    const movieGenres = movieGenresRes.data.genres || [];
    const tvGenres = tvGenresRes.data.genres || [];

    return [...movieGenres, ...tvGenres].reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  } catch (error) {
    console.error('Ошибка при загрузке жанров:', error.response ? error.response.data : error.message);
    return {};
  }
};
