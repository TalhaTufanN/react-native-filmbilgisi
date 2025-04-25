import axios from "axios";
import { API_KEY } from "@env";

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`;

// dynamic

const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

// 'https://api.themoviedb.org/3/movie/movie_id',

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster =
  "https://r.resimlink.com/9ix-rmG3Kc.jpg?v=b4210962054a41689c8c020e9083dddc";
export const fallbackPersonImage =
  "https://r.resimlink.com/9ix-rmG3Kc.jpg?v=b4210962054a41689c8c020e9083dddc";

const apiCall = async (endpoints, params={},language = 'tr-TR') => {
  const options = {
    method: "GET",
    url: endpoints,
    params: { ...params, language },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server cevapladı fakat başarısız durum kodu döndü
      console.log("Error data:", error.response.data);
      console.log("Error status:", error.response.status);
    } else if (error.request) {
      // İstek yapıldı ancak cevap alınamadı
      console.log("Error request:", error.request);
    } else {
      // İstek oluşturulurken hata oluştu
      console.log("Error message:", error.message);
    }
    console.log("Error config:", error.config);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};
export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};
export const SearchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
