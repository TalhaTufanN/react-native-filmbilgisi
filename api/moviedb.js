import axios from "axios";
import { API_KEY } from '@env';

const apiBaseUrl='https://api.themoviedb.org/3'
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`;

// dynamic

const movieDetailsEndpoint= id=>`${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint= id=>`${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint= id=>`${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

const personDetailsEndpoint= id=>`${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;
const personMoviesEndpoint= id=>`${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

// 'https://api.themoviedb.org/3/movie/movie_id',

export const image500= path=> path? `https://image.tmdb.org/t/p/w500${path}`:null;
export const image342= path=> path? `https://image.tmdb.org/t/p/w342${path}`:null;
export const image185= path=> path? `https://image.tmdb.org/t/p/w185${path}`:null;

export const fallbackMoviePoster="https://i.pinimg.com/474x/5e/22/82/5e22823ec81bae46cc44a2ce507e7fd4.jpg"
export const fallbackPersonImage="https://e7.pngegg.com/pngimages/813/118/png-clipart-silhouette-icon-blank-person-template-share-icon-black-and-white.png"

const apiCall = async(endpoints,params)=>{
    const options={
        method:'GET',
        url:endpoints,
        params:params?params:{}
    }
    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {}
    }
}

export const fetchTrendingMovies = ()=> {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = ()=> {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = ()=> {
    return apiCall(topRatedMoviesEndpoint);
}
export const fetchMovieDetails = id=> {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = id=> {
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovies =id=> {
    return apiCall(similarMoviesEndpoint(id));
}
export const fetchPersonDetails =id=> {
    return apiCall(personDetailsEndpoint(id));
}
export const fetchPersonMovies =id=> {
    return apiCall(personMoviesEndpoint(id));
}
export const SearchMovies =params=> {
    return apiCall(searchMoviesEndpoint,params);
}