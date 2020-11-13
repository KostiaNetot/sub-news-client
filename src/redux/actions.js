import DataService from "../services/DataService";
import axios from "axios";

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const SET_AUTH = 'SET_AUTH';

const fetchNewsRequest = () => ({
  type: FETCH_DATA_REQUEST
});

const fetchNewsSuccess = (res) => ({
  type: FETCH_DATA_SUCCESS,
  payload: res
});

const fetchNewsError = (err) => ({
  type: FETCH_DATA_ERROR,
  payload: err.response
});

const setAuth = (value) => ({
  type: SET_AUTH,
  payload: value
});

export const fetchData = () => {
  return dispatch => {
    dispatch(fetchNewsRequest());
    axios.all([
      axios.get('http://localhost:5000/categories'),
      axios.get('http://localhost:5000/news')
    ])
      .then(axios.spread((resCategs, resNews) => {
        dispatch(fetchNewsSuccess([resCategs.data, resNews.data]));
      }));
  }
};

export const setAuthorization = (val) => {
  return dispatch => {
    dispatch(setAuth(val));
  }
};
