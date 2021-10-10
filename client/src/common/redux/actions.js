import axios from "axios";
import { API_URL } from "../config";
const CancelToken = axios.CancelToken;

export const ADD_BREEDS = "ADD_BREEDS";
export const ADD_BREED_DETAILS = "ADD_BREED_DETAILS";
export const ADD_RANDOM_BREEDS_TO_DETAILS = "ADD_RANDOM_BREEDS_TO_DETAILS";
export const ADD_TEMPERAMENTS = "ADD_TEMPERAMENTS";
export const RESET_BREED_DETAILS = "RESET_BREED_DETAILS";
export const SET_PAGINATION_INDEX = "SET_PAGINATION_INDEX";
export const FILTER_BREEDS_BY_TEMPERAMENT = "FILTER_BREEDS_BY_TEMPERAMENT";
export const FILTER_BREEDS_BY_BREED = "FILTER_BREEDS_BY_BREED";
export const FILTER_BREEDS_BY_ID = "FILTER_BREEDS_BY_ID";
export const RESET_BREEDS_FILTER_BY_ID = "RESET_BREEDS_FILTER_BY_ID";
export const SORT_BREEDS = "SORT_BREEDS";

export const requestAll = () => async (dispatch) => Promise.all([requestBreeds()(dispatch), requestTemperaments()(dispatch)]);

export const requestBreeds = () => async (dispatch) => axios.get(`${API_URL}/breeds`).then((res) => dispatch(addBreeds(res.data)));

export const requestBreedByID = (id) => async (dispatch) => dispatch(resetBreedDetails()) && axios.get(`${API_URL}/breeds/${id}`).then((res) => dispatch(addBreedDetails(res.data)));

export const requestRandomBreeds = () => async (dispatch) => axios.get(`${API_URL}/breeds/randoms`).then((res) => dispatch(addRandomBreedsToDetails(res.data)));

export const requestTemperaments = () => async (dispatch) => axios.get(`${API_URL}/temperaments`).then((res) => dispatch(addTemperaments(res.data)));

export const addBreeds = (breeds) => ({
  type: ADD_BREEDS,
  payload: breeds,
});

export const addBreedDetails = (breed) => ({
  type: ADD_BREED_DETAILS,
  payload: breed,
});

export const addRandomBreedsToDetails = (breeds) => ({
  type: ADD_RANDOM_BREEDS_TO_DETAILS,
  payload: breeds,
});

export const addTemperaments = (temperaments) => ({
  type: ADD_TEMPERAMENTS,
  payload: temperaments,
});

export const resetBreedDetails = () => ({
  type: RESET_BREED_DETAILS,
});

export const setPaginationIndex = (index) => ({
  type: SET_PAGINATION_INDEX,
  payload: index,
});

export const filterBreedsByTemperament = (temperamentsArray) => ({
  type: FILTER_BREEDS_BY_TEMPERAMENT,
  payload: temperamentsArray,
});

export const filterBreedsByBreed = (breedsArray) => ({
  type: FILTER_BREEDS_BY_BREED,
  payload: breedsArray,
});

export const filterBreedsByID = (idsArray) => ({
  type: FILTER_BREEDS_BY_ID,
  payload: idsArray,
});

let cancel;
export const searchBreedsByName = (name) => async (dispatch) => {
  cancel && cancel();
  if (!name) return dispatch(resetBreedsFilterById());
  axios
    .get(`${API_URL}/breeds?name=${name}`, { cancelToken: new CancelToken((c) => (cancel = c)) })
    .then((res) => dispatch(filterBreedsByID(res.data)))
    .catch(() => {});
};

export const resetBreedsFilterById = () => ({
  type: RESET_BREEDS_FILTER_BY_ID,
});

export const sortBreeds = (sortBy) => ({
  type: SORT_BREEDS,
  payload: sortBy,
});
