import fetchType from '../utils/network/fetchType'
import urlParams from '../utils/network/urlParams'
import { NATIVE, ETH, ELECTRUM, POST, GET } from '../utils/constants'
import {
  getValidityKey,
} from "./auth";
import store from '../redux/store';
const CryptoJS = require("crypto-js");

const decrypt = (data, key) => CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
const encrypt = (data, key) => CryptoJS.AES.encrypt(data, key).toString()

/**
 * Makes a blockchain call to the API depending on a number of parameters
 * @param {String} mode native || electrum || eth
 * @param {String} call Name of the api call to make, e.g. get_balances
 * @param {Object} params Parameters to pass to api call, the required parameters depend on the mode specified above
 * @param {String} reqType (Optional) 'post' || 'get' If unspecified, defaults to 'post' for native mode and 'get' for eth and electrum
 */
export const getApiData = (mode, call, params, reqType, forceEncryption) => {
  const requestFunc = reqType ? modeNameMap[reqType] : modeDefaultCallMap[mode]

  return new Promise((resolve, reject) => {
    requestFunc(`${mode}/${call}`, params, forceEncryption)
    .catch((error) => {
      console.error(error);
      reject(error)
    })
    .then(json => {
      resolve(json)
    });
  })
}

/**
 * Makes an API get request to the specified API call 
 * @param {String} callPath The full location of the specified call, e.g. electrum/get_balances
 * @param {Object} params Parameters to pass to api call
 */
export const apiGet = (callPath, params) => {
  const state = store.getState() 
  const { port, appId } = state.rpc

  return new Promise(async (resolve, reject) => {
    const secret = getValidityKey(callPath)
    const token = secret.hash 
    const time = secret.time

    let urlParamsObj = {
      ...params,
      validity_key: token,
      app_id: appId,
      builtin: true,
      path: callPath,
      time
    }

    fetch(
      `http://127.0.0.1:${port}/api/${callPath}${urlParams(urlParamsObj)}`,
      fetchType.get
    )
    .then(response => {
      return response.json()
    })
    .then(json => {
      resolve(json)
    })
    .catch(e => {
      reject(e)
    })
  })
  
}

/**
 * Makes an API post request to the specified API call 
 * @param {String} callPath The full location of the specified call, e.g. native/get_balances
 * @param {Object} params Parameters to pass to api call
 */
export const apiPost = async (callPath, params, forceEncryption) => {  
  const state = store.getState() 
  const { password, postEncryption, port, appId } = state.rpc

  const shield = postEncryption || forceEncryption

  return new Promise(async (resolve, reject) => {
    let time
    let hash
    const secret = getValidityKey(callPath)

    time = secret.time
    hash = secret.hash

    const token = hash

    fetch(
      `http://127.0.0.1:${port}/api/${callPath}`,
      fetchType(
        JSON.stringify({
          validity_key: token,
          app_id: appId,
          builtin: true,
          path: callPath,
          encrypted: shield,
          time: time,
          payload:
            params == null
              ? !shield ? {} : encrypt(JSON.stringify({}), password)
              : !shield ? params : encrypt(JSON.stringify(params), password),
        })
      ).post
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => { 
        if (shield) resolve(JSON.parse(decrypt(data.payload, password)));
        else resolve(JSON.parse(data.payload))
      })
      .catch((e) => {
        console.error(e)
        reject(e)
      });
  })
}

export const modeDefaultCallMap = {
  [NATIVE]: apiPost,
  [ETH]: apiGet,
  [ELECTRUM]: apiGet
}

export const modeNameMap = {
  [POST]: apiPost,
  [GET]: apiGet
}

