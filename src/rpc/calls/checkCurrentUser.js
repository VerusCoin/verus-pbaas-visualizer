import { API_GET_CURRENT_USER } from "../../utils/constants"
import { apiGet } from "../callCreator"

/**
 * Attempts to get the current user
 */
export const getCurrentUser = async () => {
  try {
    const res = await apiGet(API_GET_CURRENT_USER)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}