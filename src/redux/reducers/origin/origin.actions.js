import { SET_ORIGIN_APP, SET_ORIGIN_APP_ID, SET_ORIGIN_APP_TYPE } from "./origin.types";

export const setOriginApp = (originApp) => {
  return {
    type: SET_ORIGIN_APP,
    payload: {
      originApp
    }
  }
}

export const setOriginAppId = (originAppId) => {
  return {
    type: SET_ORIGIN_APP_ID,
    payload: {
      originAppId
    }
  }
}

export const setOriginAppBuiltin = (originAppBuiltin) => {
  return {
    type: SET_ORIGIN_APP_TYPE,
    payload: {
      originAppBuiltin
    }
  }
}