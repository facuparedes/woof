import { ADD_BREEDS, ADD_TEMPERAMENTS, SET_PAGINATION_INDEX, FILTER_BREEDS_BY_TEMPERAMENT, FILTER_BREEDS_BY_BREED, FILTER_BREEDS_BY_ID, RESET_BREEDS_FILTER_BY_ID } from "./actions";

const initialState = {
  breeds: {
    pagination: 1,
    data: [],
    __allData: [],
    __activeFilters: {
      temperaments: [],
      breeds: [],
      id: [],
    },
  },
  temperaments: [],
};

const filterBreeds = (breeds, filterKeyName, payload, reset = false) => {
  const activeFilters = breeds.__activeFilters;
  activeFilters[filterKeyName] = payload;

  return breeds.__allData.filter((breed) => {
    const includesAllFilterTemperaments = activeFilters.temperaments.length ? activeFilters.temperaments.every((temperament) => breed.temperaments.includes(temperament)) : true;
    const breedsIsIncludedInBreedsFilter = activeFilters.breeds.length ? activeFilters.breeds.includes(breed.name) : true;
    const idIsIncludedInIdFilter = activeFilters.id.length ? activeFilters.id.includes(breed.id) : filterKeyName === "id" && !reset ? false : true;

    return includesAllFilterTemperaments && breedsIsIncludedInBreedsFilter && idIsIncludedInIdFilter;
  });
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_BREEDS:
      return { ...state, breeds: { ...state.breeds, pagination: 1, data: payload, __allData: payload } };
    case ADD_TEMPERAMENTS:
      return { ...state, temperaments: payload };
    case SET_PAGINATION_INDEX:
      return { ...state, breeds: { ...state.breeds, pagination: payload } };
    case FILTER_BREEDS_BY_TEMPERAMENT:
      return {
        ...state,
        breeds: { ...state.breeds, pagination: 1, data: filterBreeds(state.breeds, "temperaments", payload), __activeFilters: { ...state.breeds.__activeFilters, temperaments: payload } },
      };
    case FILTER_BREEDS_BY_BREED:
      return {
        ...state,
        breeds: { ...state.breeds, pagination: 1, data: filterBreeds(state.breeds, "breeds", payload), __activeFilters: { ...state.breeds.__activeFilters, breeds: payload } },
      };
    case FILTER_BREEDS_BY_ID:
      return {
        ...state,
        breeds: { ...state.breeds, pagination: 1, data: filterBreeds(state.breeds, "id", payload), __activeFilters: { ...state.breeds.__activeFilters, id: payload } },
      };
    case RESET_BREEDS_FILTER_BY_ID:
      return {
        ...state,
        breeds: { ...state.breeds, pagination: 1, data: filterBreeds(state.breeds, "id", [], true), __activeFilters: { ...state.breeds.__activeFilters, id: [] } },
      };

    default:
      return state;
  }
}
