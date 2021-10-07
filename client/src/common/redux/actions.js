import axios from "axios";
import { API_URL } from "../config";
const CancelToken = axios.CancelToken;

export const ADD_BREEDS = "ADD_BREEDS";
export const ADD_TEMPERAMENTS = "ADD_TEMPERAMENTS";
export const SET_PAGINATION_INDEX = "SET_PAGINATION_INDEX";
export const FILTER_BREEDS_BY_TEMPERAMENT = "FILTER_BREEDS_BY_TEMPERAMENT";
export const FILTER_BREEDS_BY_BREED = "FILTER_BREEDS_BY_BREED";
export const FILTER_BREEDS_BY_ID = "FILTER_BREEDS_BY_ID";
export const RESET_BREEDS_FILTER_BY_ID = "RESET_BREEDS_FILTER_BY_ID";

export const requestAll = () => async (dispatch) => Promise.all([requestBreeds()(dispatch), requestTemperaments()(dispatch)]);

export const requestBreeds = () => async (dispatch) => axios.get(`${API_URL}/breeds`).then((res) => dispatch(addBreeds(res.data)));

export const requestTemperaments = () => async (dispatch) => axios.get(`${API_URL}/temperaments`).then((res) => dispatch(addTemperaments(res.data)));

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
