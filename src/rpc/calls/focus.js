import { API_FOCUS } from "../../utils/constants"
import { apiPost } from "../callCreator"

/**
 * Attempts to focus the Verus Desktop window
 */
export const focusVerusDesktop = async () => {
  try {
    const res = await apiPost(API_FOCUS)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}