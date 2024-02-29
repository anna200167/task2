// reducers.js
import { combineReducers } from 'redux';
import { POST_SUCCESS, POST_FAILURE,DELETE_SUCCESS, DELETE_FAILURE, GET_SUCCESS } from './actiontypes';

const initialState = {
  getResponse:null,
  postResponse: null,
  deleted: false,
  error: false,
};

const postReducer = (state = initialState.postResponse, action) => {
  switch (action.type) {
    case POST_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const getReducer = (state = initialState.getResponse, action) => {
  // alert("Inside getReducer,action")
  switch (action.type) {
    case GET_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};


const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case POST_FAILURE:
      return action.payload;
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  postResponse: postReducer,
  error: errorReducer,
  getUser:getReducer,
});



export default rootReducer;
