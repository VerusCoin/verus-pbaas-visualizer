import {
  SET_NETWORK_GRAPH,
  SET_CHAIN_INFO
} from "./graph.types";

export const graph = (state = {
  graph: null,
  chainInfo: null
}, action) => {
  switch (action.type) {
    case SET_NETWORK_GRAPH:
      return {
        ...state,
        graph: action.payload.graph
      }
    case SET_CHAIN_INFO:
      return {
        ...state,
        chainInfo: action.payload.info
      }
    default:
      return state;
  }
}