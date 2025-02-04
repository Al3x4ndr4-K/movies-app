import axios from 'axios';

export const imagePath = 'https://image.tmdb.org/t/p/w500';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = import.meta.env.VITE_API_KEY;

// TRENDING
export const fetchTrending = async (timeWindow = 'day') => {
  const { data } = await axios.get(`${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`);

  return data?.results;
};

// SEARCH

export const searchData = async (query, page) => {
  const res = await axios.get(`${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`);
  return res?.data;
};

// GENRES

export const fetchGenres = async () => {
  try {
    const movieGenresRes = await axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en`);
    const tvGenresRes = await axios.get(`${baseUrl}/genre/tv/list?api_key=${apiKey}&language=en`);

    const movieGenres = movieGenresRes.data.genres || [];
    const tvGenres = tvGenresRes.data.genres || [];

    const combinedGenres = [...movieGenres, ...tvGenres].reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});

    return combinedGenres;
  } catch (error) {
    console.error('Ошибка при загрузке жанров:', error.response ? error.response.data : error.message);
    return {};
  }
};
