import { API_DECRYPT_KEY } from "../../utils/constants"
import { apiPost } from "../callCreator"

export const decryptKey = async (pin, pubkey) => {
  try {
    const res = await apiPost(API_DECRYPT_KEY, {key: pin, pubkey}, true)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    throw new Error(e.message)
  }
}
