// reducers.js
import { DELETE_SUCCESS, DELETE_FAILURE } from './actions';

const initialState = {
  deleted: false,
  error: null,
};

const deleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_SUCCESS:
      return { deleted: true, error: null };
    case DELETE_FAILURE:
      return { deleted: false, error: action.payload };
    default:
      return state;
  }
};



export default deleteReducer;
