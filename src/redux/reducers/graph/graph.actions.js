import { getChainInfo } from "../../../rpc/calls/chainInfo";
import { loadNetworkGraph } from "../../../rpc/calls/loadNetworkGraph";
import { API_GET_CHAIN_INFO, API_GET_PBAAS_NETWORK_GRAPH } from "../../../utils/constants";
import { setApiError } from "../error/error.actions";
import {
  SET_NETWORK_GRAPH,
  SET_CHAIN_INFO
} from "./graph.types";

export const setNetworkGraph = (graph) => {
  return {
    type: SET_NETWORK_GRAPH,
    payload: {
      graph
    }
  }
}

export const setChainInfo = (info) => {
  return {
    type: SET_CHAIN_INFO,
    payload: {
      info
    }
  }
}

export const checkAndUpdateNetworkGraph = async (chain) => {
  try {    
    return [setNetworkGraph(await loadNetworkGraph(chain))]
  } catch (e) {
    console.error(e.message)
    return [setApiError(API_GET_PBAAS_NETWORK_GRAPH, e)]
  }
}

export const checkAndUpdateChainInfo = async (chain) => {
  try {
    const info = await getChainInfo(chain)
    
    return [setChainInfo(info)]
  } catch (e) {
    console.error(e.message)
    return [setApiError(API_GET_CHAIN_INFO, e)]
  }
}

export const checkAndUpdateAll = async (chain) => {
  return [...(await checkAndUpdateNetworkGraph(chain)), ...(await checkAndUpdateChainInfo(chain))];
}