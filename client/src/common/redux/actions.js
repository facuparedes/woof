import axios from "axios";
import { API_URL } from "../config";

export const ADD_BREEDS = "ADD_BREEDS";
export const ADD_TEMPERAMENTS = "ADD_TEMPERAMENTS";
export const SET_PAGINATION_INDEX = "SET_PAGINATION_INDEX";
export const FILTER_BREEDS_BY_TEMPERAMENT_AND_BREEDS = "FILTER_BREEDS_BY_TEMPERAMENT_AND_BREEDS";

export const requestAll = () => async (dispatch) => Promise.all([requestBreeds()(dispatch), requestTemperaments()(dispatch)]);

export const requestBreeds = () => async (dispatch) =>
  axios.get(`${API_URL}/breeds`).then((res) => {
    dispatch(setPaginationIndex(1));
    dispatch(addBreeds(res.data));
  });

export const requestTemperaments = () => async (dispatch) => {
  axios.get(`${API_URL}/temperaments`).then((res) => {
    dispatch(addTemperaments(res.data));
  });
};

export const addBreeds = (breeds) => ({
  type: ADD_BREEDS,
  payload: breeds,
});

export const addTemperaments = (temperaments) => ({
  type: ADD_TEMPERAMENTS,
  payload: temperaments,
});

export const setPaginationIndex = (index) => ({
  type: SET_PAGINATION_INDEX,
  payload: index,
});

export const filterBreedsByTemperamentAndBreeds = (temperamentsArray, breedsArray) => ({
  type: FILTER_BREEDS_BY_TEMPERAMENT_AND_BREEDS,
  payload: { temperaments: temperamentsArray, breeds: breedsArray },
});

// export const ADD_MOVIE_DETAILS = "ADD_MOVIE_DETAILS";
// export const RESET_MOVIE_DETAILS = "RESET_MOVIE_DETAILS";
// export const ADD_MOVIE_TO_FAVORITES = "ADD_MOVIE_TO_FAVORITES";
// export const REMOVE_MOVIE_FROM_FAVORITES = "REMOVE_MOVIE_FROM_FAVORITES";

// const URL = "http://www.omdbapi.com/?apikey=4096a672";

// export const addMovies = (movies) => ({
//   type: ADD_MOVIES,
//   payload: movies,
// });

// export const addMovieDetails = (details) => ({
//   type: ADD_MOVIE_DETAILS,
//   payload: details,
// });

// export const resetMovieDetails = () => ({
//   type: RESET_MOVIE_DETAILS,
//   payload: {},
// });

// export const addMovieToFavorites = (movie) => ({
//   type: ADD_MOVIE_TO_FAVORITES,
//   payload: movie,
// });

// export const removeMovieFromFavorites = (id) => ({
//   type: REMOVE_MOVIE_FROM_FAVORITES,
//   payload: id,
// });

// export const fetchMoviesByTitle = (title) => (dispatch) => {
//   axios.get(`${URL}&s=${title}`).then(({ data }) => dispatch(addMovies(data.Search)));
// };

// export const fetchMovieDetailsById = (id) => (dispatch) => {
//   dispatch(resetMovieDetails());
//   axios.get(`${URL}&i=${id}&plot=full`).then(({ data }) => dispatch(addMovieDetails(data)));
// };
