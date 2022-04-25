/*
  This reducer contains the information about users
*/
import { API_GET_CHAIN_INFO, API_GET_PBAAS_NETWORK_GRAPH } from "../../../utils/constants";
import { SET_CHAIN_INFO, SET_NETWORK_GRAPH } from "../graph/graph.types";
import {
  SET_ERROR,
  SET_API_ERROR
} from "./error.types";

export const error = (state = {
  error: null,
  apiErrors: {
    [API_GET_PBAAS_NETWORK_GRAPH]: null,
    [API_GET_CHAIN_INFO]: null
  }
}, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error
      }
    case SET_API_ERROR:
      return {
        ...state,
        apiErrors: {
          ...state.apiErrors,
          [action.payload.apiCall]: action.payload.error
        }
      }
    case SET_NETWORK_GRAPH:
      return {
        ...state,
        apiErrors: {
          ...state.apiErrors,
          [API_GET_PBAAS_NETWORK_GRAPH]: null
        }
      }
    case SET_CHAIN_INFO:
      return {
        ...state,
        apiErrors: {
          ...state.apiErrors,
          [API_GET_CHAIN_INFO]: null
        }
      }
    default:
      return state;
  }
}