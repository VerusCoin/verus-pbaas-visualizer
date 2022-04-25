import { SET_EXTERNAL_ACTION, SET_NAVIGATION_PATH } from './navigation.types'
import { readNavigationPath } from './navigation.util'

/**
 * Sets the navigation path in the redux store
 */
export const setNavigationPath = (path) => {
  const navigationArray = readNavigationPath(path)

  return {
    type: SET_NAVIGATION_PATH,
    payload: {
      navigationPath: path,
      navigationPathArray: navigationArray
    }
  }
}

/**
 * Sets the navigation path in the redux store
 */
export const setExternalAction = (externalAction) => {
  return {
    type: SET_EXTERNAL_ACTION,
    payload: {
      externalAction
    }
  }
}