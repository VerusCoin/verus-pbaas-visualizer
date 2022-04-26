import { API_GET_PBAAS_NETWORK_GRAPH } from "../../utils/constants"
import { apiPost } from "../callCreator"

export const loadNetworkGraph = async (chainId) => {
  try {
    const graph = await apiPost(`native/${API_GET_PBAAS_NETWORK_GRAPH}`, { chainTicker: chainId })
    if (graph.msg !== 'success') throw new Error(graph.result)
    else return graph.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}