import axios from 'axios';
import history from '../history';
import {
  FETCH_USER,
  FETCH_BLOG,
  FETCH_BLOGS

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

//Blog Actions 
export const submitBlog = (values, history) => async dispatch => {
  const res = await axios.post('/api/blogs', values);

  history.push('/blogs');
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('/api/blogs');

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`/api/blogs/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};








