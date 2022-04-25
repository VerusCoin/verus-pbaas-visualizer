import { API_ENCRYPT_KEY } from "../../utils/constants"
import { apiPost } from "../callCreator"

export const encryptKey = async (pin, seed) => {
  try {
    const res = await apiPost(API_ENCRYPT_KEY, {key: pin, string: seed}, true)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    throw new Error(e.message)
  }
}