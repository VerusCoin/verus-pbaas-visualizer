import { API_GET_PLUGIN } from "../../utils/constants"
import { apiGet } from "../callCreator"

/**
 * Attempts to get a plugin with specified id
 * @param {String} id The plugin id
 * @param {Boolean} builtin Whether or not the plugin is a builtin plugin
 */
export const getPlugin = async (id, builtin = false) => {
  try {
    const res = await apiGet(API_GET_PLUGIN, { id, search_builtin: builtin })
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}