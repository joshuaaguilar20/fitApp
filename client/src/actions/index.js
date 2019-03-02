import axios from 'axios';
import streams from '../apis/streams';
import history from '../history';
import {
  FETCH_USER,

} from './types';



export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });

};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};


export const createStream = formValues => async (dispatch, getState) => {
  const response = await axios.post('/auth/login', { ...formValues })
  console.log(response);
  history.push('/Dashboard')
}

export const createUser = formValues => async dispatch => {
  const response = await axios.post('/auth/register', { ...formValues })
  history.push('/Dashboard');

};








