import axios from 'axios';

import { handleApiError } from './apiErrorHandler.jsx';

export const imagePath = 'https://image.tmdb.org/t/p/w500';

export const baseUrl = 'https://api.themoviedb.org/3';
export const apiKey = import.meta.env.VITE_API_KEY;

// ALL MOVIES

export const fetchAllMovies = async (page = 1) => {
  try {
    if (page < 1) page = 1;
    if (page > 500) page = 500;

    const { data } = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&include_adult=false`);
    return {
      results: data?.results || [],
      totalResults: data?.total_results || 0,
    };
  } catch (error) {
    handleApiError(error, 'Ошибка загрузки фильмов');
  }
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
  } catch (error) {
    handleApiError(error, 'Ошибка поиска');
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
    handleApiError(error, 'Ошибка при загрузке жанров');
  }
};

//GUEST SESSION

export const fetchGuestSession = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/authentication/guest_session/new?api_key=${apiKey}`);
    const guestSessionId = data?.guest_session_id;

    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    localStorage.setItem('guestSessionId', guestSessionId);
    localStorage.setItem('sessionExpiresAt', expiresAt);

    return { guestSessionId, errorComponent: null };
  } catch (error) {
    handleApiError(error, 'Ошибка создания гостевой сессии');
  }
};

export const getValidGuestSession = async () => {
  const storedSessionId = localStorage.getItem('guestSessionId');
  const storedExpiresAt = localStorage.getItem('sessionExpiresAt');

  if (storedSessionId && storedExpiresAt) {
    const currentTime = Date.now();
    const expiresAt = parseInt(storedExpiresAt, 10);

    if (currentTime < expiresAt) {
      return storedSessionId;
    }
  }

  const sessionData = await fetchGuestSession();
  return sessionData?.guestSessionId || null;
};

// RATING

export const sendRating = async (movieId, rating, guestSessionId) => {
  try {
    const url = `${baseUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`;
    const body = {
      value: rating,
    };

    const { data } = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    return data;
  } catch (error) {
    handleApiError(error, 'Ошибка отправки рейтинга');
  }
};
