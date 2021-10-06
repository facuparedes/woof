import { ADD_BREEDS, ADD_TEMPERAMENTS, SET_PAGINATION_INDEX, FILTER_BREEDS_BY_TEMPERAMENT_AND_BREEDS } from "./actions";

const initialState = {
  breeds: {
    pagination: 1,
    data: [],
    __allData: [],
  },
  temperaments: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BREEDS:
      return { ...state, breeds: { ...state.breeds, data: action.payload, __allData: action.payload } };
    case ADD_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };
    case SET_PAGINATION_INDEX:
      return { ...state, breeds: { ...state.breeds, pagination: action.payload } };
    case FILTER_BREEDS_BY_TEMPERAMENT_AND_BREEDS:
      return {
        ...state,
        breeds: {
          ...state.breeds,
          data:
            !action.payload.temperaments.length && !action.payload.breeds.length
              ? state.breeds.__allData
              : state.breeds.__allData.filter((item) => {
                  const includesAllFilterTemperaments = action.payload.temperaments.length ? action.payload.temperaments.every((temperament) => item.temperaments.includes(temperament)) : true;
                  const nameIsIncludedInFilter = action.payload.breeds.length ? action.payload.breeds.includes(item.name) : true;
                  return includesAllFilterTemperaments && nameIsIncludedInFilter;
                }),
        },
      };
    // case FILTER_BREEDS_BY_TEMPERAMENT:
    //   return {
    //     ...state,
    //     breeds: {
    //       ...state.breeds,
    //       data: !action.payload.length ? state.breeds.__allData : state.breeds.__allData.filter((item) => action.payload.every((temperament) => item.temperaments.includes(temperament))),
    //     },
    //   };
    // case FILTER_BREEDS_BY_BREEDS:
    //   return {
    //     ...state,
    //     breeds: {
    //       ...state.breeds,
    //       data: !action.payload.length ? state.breeds.__allData : state.breeds.__allData.filter((item) => action.payload.includes(item.name)),
    //     },
    //   };
    default:
      return state;
  }
}
