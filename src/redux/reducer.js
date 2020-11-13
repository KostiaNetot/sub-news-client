import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR ,SET_AUTH } from "./actions";

const initialState = {
  news: null,
  categories: null,
  isLoading: false,
  isAuthorized: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_DATA_SUCCESS:
    return {
      ...state,
      categories: action.payload[0],
      news: action.payload[1],
      isLoading: false
      };

    case FETCH_DATA_ERROR:
      return {
        error: action.payload,
        isLoading: false
      };

    case SET_AUTH:
      return {
        ...state,
        isAuthorized: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
