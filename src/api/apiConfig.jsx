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
  let movieResults = [];
  let tvResults = [];
  let totalMovieResults = 0;
  let totalTvResults = 0;

  try {
    const movieRes = await axios.get(
      `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${page}&include_adult=false`
    );
    movieResults = movieRes?.data?.results || [];
    totalMovieResults = movieRes?.data?.total_results || 0;

    const tvRes = await axios.get(
      `${baseUrl}/search/tv?api_key=${apiKey}&query=${query}&page=${page}&include_adult=false`
    );
    tvResults = tvRes?.data?.results || [];
    totalTvResults = tvRes?.data?.total_results || 0;
  } catch (err) {
    console.error('API Error:', err.response ? err.response.data : err.message);
    return {
      results: [],
      totalResults: 0,
    };
  }

  const combinedResults = [...movieResults, ...tvResults];

  combinedResults.sort((a, b) => b.popularity - a.popularity);

  const results = combinedResults.slice(0, 20);

  const totalResults = totalMovieResults + totalTvResults;

  return {
    results,
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
