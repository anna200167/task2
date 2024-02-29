// actions.js
export const GET_REQUEST = 'GET_REQUEST';
export const GET_SUCCESS = 'GET_SUCCESS';
export const GET_FAILURE = 'GET_FAILURE';

export const getRequest = () => ({ type: GET_REQUEST });
export const getSuccess = (response) => ({ type: GET_SUCCESS, payload: response });
export const getFailure = (error) => ({ type: GET_FAILURE, payload: error });

export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAILURE = 'POST_FAILURE';

export const postRequest = (data) => ({ type: POST_REQUEST, payload: data });
export const postSuccess = (response) => ({ type: POST_SUCCESS, payload: response });
export const postFailure = (error) => ({ type: POST_FAILURE, payload: error });


export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = 'DELETE_FAILURE';

export const deleteRequest = (id) => ({ type: DELETE_REQUEST, payload: id });
export const deleteSuccess = () => ({ type: DELETE_SUCCESS });
export const deleteFailure = (error) => ({ type: DELETE_FAILURE, payload: error });



export const PUT_REQUEST = 'PUT_REQUEST';
export const PUT_SUCCESS = 'PUT_SUCCESS';
export const PUT_FAILURE = 'PUT_FAILURE';

export const putRequest = (data) => ({ type: PUT_REQUEST, payload: data });
export const putSuccess = () => ({ type: PUT_SUCCESS });
export const putFailure = (error) => ({ type: PUT_FAILURE, payload: error });