import {
  ADD_BREEDS,
  ADD_BREED_DETAILS,
  ADD_RANDOM_BREEDS_TO_DETAILS,
  ADD_TEMPERAMENTS,
  RESET_BREED_DETAILS,
  SET_PAGINATION_INDEX,
  FILTER_BREEDS_BY_TEMPERAMENT,
  FILTER_BREEDS_BY_BREED,
  FILTER_BREEDS_BY_ID,
  RESET_BREEDS_FILTER_BY_ID,
  SORT_BREEDS,
} from "./actions";

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
    __currentSort: {
      id: 0,
      keyName: "",
      asc: false,
    },
  },
  selectedBreedDetails: null,
  temperaments: [],
};

const filterBreeds = (stateBreeds, filterKeyName, payload, reset = false) => {
  const activeFilters = stateBreeds.__activeFilters;
  if (filterKeyName && payload) activeFilters[filterKeyName] = payload;

  return stateBreeds.__allData.filter((breed) => {
    const includesAllFilterTemperaments = activeFilters.temperaments.length ? activeFilters.temperaments.every((temperament) => breed.temperaments.includes(temperament)) : true;
    const breedsIsIncludedInBreedsFilter = activeFilters.breeds.length ? activeFilters.breeds.includes(breed.name) : true;
    const idIsIncludedInIdFilter = activeFilters.id.length ? activeFilters.id.includes(breed.id) : filterKeyName === "id" && !reset ? false : true;

    return includesAllFilterTemperaments && breedsIsIncludedInBreedsFilter && idIsIncludedInIdFilter;
  });
};

const sortBreeds = (breedsToSort, stateBreeds, payload) => {
  const { keyName, asc } = payload || stateBreeds.__currentSort;

  return breedsToSort.sort((a, b) => {
    if (typeof a[keyName] === "string") {
      if (asc) return a[keyName].localeCompare(b[keyName]);
      return b[keyName].localeCompare(a[keyName]);
    }
    if (asc) return a[keyName] - b[keyName];
    return b[keyName] - a[keyName];
  });
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_BREEDS:
      const filterActive = !!state.breeds.__activeFilters.id.length;
      const alreadyData = !!state.breeds.data.length;
      const newState = { ...state, breeds: { ...state.breeds, pagination: 1, data: !filterActive || !alreadyData ? payload : state.breeds.data, __allData: payload } };
      if (!alreadyData) newState.breeds.data = sortBreeds(filterBreeds(newState.breeds), newState.breeds);
      return newState;
    case ADD_BREED_DETAILS:
      return { ...state, selectedBreedDetails: payload };
    case ADD_RANDOM_BREEDS_TO_DETAILS:
      return { ...state, selectedBreedDetails: { ...state.selectedBreedDetails, randomBreeds: payload } };
    case ADD_TEMPERAMENTS:
      return { ...state, temperaments: payload };
    case RESET_BREED_DETAILS:
      return { ...state, selectedBreedDetails: null };
    case SET_PAGINATION_INDEX:
      return { ...state, breeds: { ...state.breeds, pagination: payload } };
    case FILTER_BREEDS_BY_TEMPERAMENT:
      return {
        ...state,
        breeds: {
          ...state.breeds,
          pagination: 1,
          data: sortBreeds(filterBreeds(state.breeds, "temperaments", payload), state.breeds),
          __activeFilters: { ...state.breeds.__activeFilters, temperaments: payload },
        },
      };
    case FILTER_BREEDS_BY_BREED:
      return {
        ...state,
        breeds: {
          ...state.breeds,
          pagination: 1,
          data: sortBreeds(filterBreeds(state.breeds, "breeds", payload), state.breeds),
          __activeFilters: { ...state.breeds.__activeFilters, breeds: payload },
        },
      };
    case FILTER_BREEDS_BY_ID:
      return {
        ...state,
        breeds: { ...state.breeds, pagination: 1, data: sortBreeds(filterBreeds(state.breeds, "id", payload), state.breeds), __activeFilters: { ...state.breeds.__activeFilters, id: payload } },
      };
    case RESET_BREEDS_FILTER_BY_ID:
      return {
        ...state,
        breeds: { ...state.breeds, pagination: 1, data: sortBreeds(filterBreeds(state.breeds, "id", [], true), state.breeds), __activeFilters: { ...state.breeds.__activeFilters, id: [] } },
      };
    case SORT_BREEDS:
      return {
        ...state,
        breeds: {
          ...state.breeds,
          pagination: 1,
          data: sortBreeds(filterBreeds(state.breeds, "id", [], true), state.breeds, payload),
          __currentSort: payload,
        },
      };

    default:
      return state;
  }
}
