// sagas.js
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST_REQUEST,
  postSuccess,
  postFailure,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  GET_REQUEST,
  getSuccess,
  getFailure,
  getRequest,
  PUT_REQUEST,
} from "./actiontypes";

import api from "../axios/api";

function* handlePostRequest(action) {
  try {
    const response = yield call(
      axios.post,
      "https://650bc2aa47af3fd22f6676ec.mockapi.io/User",
      action.payload
    );
    yield put(postSuccess(response.data));
    yield put(getRequest());
  } catch (error) {
    yield put(postFailure(error.message));
  }
}

function* handleGetRequest(action) {
  try {
    const response = yield call(
      axios.get,
      "https://650bc2aa47af3fd22f6676ec.mockapi.io/User"
    );
    // console.log(response)
    yield put(getSuccess(response.data));
    // alert(response.data)
  } catch (error) {
    yield put(getFailure(error.message));
  }
}

function* handleDeleteRequest(action) {
  // alert("Action .payload"+action.payload)
  try {
    yield call(
      api.delete,
      `https://650bc2aa47af3fd22f6676ec.mockapi.io/User/${action.payload}`,
      action.payload
    );
    yield put(getRequest());
  } catch (error) {
    // Dispatch a failure action with the error
    // yield put(DELETE_FAILURE(error.message));
  }
}

function* handlePutRequest(action) {
  // alert("Action .payload"+action.payload)
  try {
    console.info("Anish" + action.payload.id);
    yield call(
      api.put,
      `https://650bc2aa47af3fd22f6676ec.mockapi.io/User/${action.payload.id}`,
      action.payload
    );
    yield put(getRequest());
  } catch (error) {}
}

export function* watchPostRequest() {
  yield takeLatest(GET_REQUEST, handleGetRequest);
  yield takeLatest(POST_REQUEST, handlePostRequest);
  yield takeLatest(DELETE_REQUEST, handleDeleteRequest);
  yield takeLatest(PUT_REQUEST, handlePutRequest);

  // yield takeLatest(DELETE_REQUEST, handleDeleteRequest);
}
