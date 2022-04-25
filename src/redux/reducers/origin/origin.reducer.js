/*
  This reducer contains the information about users
*/
import {
  SET_ORIGIN_APP,
  SET_ORIGIN_APP_ID,
  SET_ORIGIN_APP_TYPE
} from "./origin.types";

export const origin = (state = {
  originApp: null,
  originAppId: null,
  originAppBuiltin: null
}, action) => {
  switch (action.type) {
    case SET_ORIGIN_APP:
      return {
        ...state,
        originApp: action.payload.originApp
      }
    case SET_ORIGIN_APP_ID:
      return {
        ...state,
        originAppId: action.payload.originAppId
      }
    case SET_ORIGIN_APP_TYPE:
      return {
        ...state,
        originAppBuiltin: action.payload.originAppBuiltin
      }
    default:
      return state;
  }
}