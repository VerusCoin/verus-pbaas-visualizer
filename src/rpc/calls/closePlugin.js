import { API_CLOSE_PLUGIN } from "../../utils/constants"
import { apiPost } from "../callCreator"

/**
 * Attempts to close a plugin
 */
export const closePlugin = async (plugin_id, window_id, builtin, data) => {
  try {
    const res = await apiPost(API_CLOSE_PLUGIN, { app_id: plugin_id, window_id, builtin, data })
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}