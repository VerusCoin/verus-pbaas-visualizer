import { apiPost } from '../callCreator'
import { API_CHECK_ZCASH_PARAMS, API_DL_ZCASH_PARAMS } from '../../utils/constants'
import { zcashParamsCheckErrors } from '../../utils/network/zcashParams'

/**
 * Checks if the zcash parameters and proving keys are installed and returns an error object.
 */
export const checkZcashParams = async () => {
  try {
    return await apiPost(API_CHECK_ZCASH_PARAMS)
  } catch (e) {
    return {
      msg: 'error',
      result: e.message
    }
  }
}

/**
 * Returns the result of checkZcashParams parsed through zcashParamsCheckErrors
 */
export const checkZcashParamsFormatted = async() => {
  const checkZcashParamsResult = await checkZcashParams()

  if (checkZcashParamsResult.msg === 'success') {
    return { msg: 'success', result: zcashParamsCheckErrors(checkZcashParamsResult.result) }
  } else return checkZcashParamsResult
}

/**
 * Calls the api to start downloading the zcash proving keys and parameters
 * @param {String} dloption The download source, specified by the download option string (in constants file)
 */
export const downloadZcashParams = async (dloption) => {
  try {
    return await apiPost(API_DL_ZCASH_PARAMS, { dloption })
  } catch (e) {
    return {
      msg: 'error',
      result: e.message
    }
  }
}