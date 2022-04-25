import React from 'react';
import { connect } from 'react-redux';
import { setError } from '../../redux/reducers/error/error.actions';
import { checkAndUpdateAll } from '../../redux/reducers/graph/graph.actions';
import { setExternalAction, setNavigationPath } from '../../redux/reducers/navigation/navigation.actions';
import { setOriginApp } from '../../redux/reducers/origin/origin.actions';
import store from '../../redux/store';
import { closePlugin } from '../../rpc/calls/closePlugin';
import { getPlugin } from '../../rpc/calls/getPlugin';
import {
  API_GET_CHAIN_INFO,
  API_GET_PBAAS_NETWORK_GRAPH,
  EXTERNAL_ACTION,
  EXTERNAL_CHAIN_START,
  GRAPH_DISPLAY,
  VERUS_PBAAS_VISUALIZER,
} from "../../utils/constants";
import { 
  LoginConsentRender
} from './Visualizer.render';

class LoginConsent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestResult: null
    }

    this.completeVisualization = this.completeVisualization.bind(this)
    this.getRequestResult = this.getRequestResult.bind(this)
    this.canVisualizeNetwork = this.canVisualizeNetwork.bind(this)
  }

  async componentDidUpdate(lastProps) {    
    if (
      lastProps !== this.props &&
      ((lastProps.rpcPassword !== this.props.rpcPassword &&
        this.props.originAppId != null) ||
        (lastProps.originAppId !== this.props.originAppId &&
          this.props.rpcPassword != null))
    ) {
      try {
        this.props.dispatch(
          setOriginApp(
            await getPlugin(this.props.originAppId, this.props.originAppBuiltin)
          )
        );
      } catch (e) {
        this.props.dispatch(setError(e));
      }
    }

    if (
      lastProps !== this.props &&
      lastProps.visualizationRequest.request !== this.props.visualizationRequest.request
    ) {
      const { request } = this.props.visualizationRequest;

      const actions = await checkAndUpdateAll(request.chain_id);
      actions.map((action) => this.props.dispatch(action));

      if (this.canVisualizeNetwork()) {
        this.props.dispatch(setNavigationPath(GRAPH_DISPLAY));
      } else {
        this.props.dispatch(setExternalAction(EXTERNAL_CHAIN_START));
        this.props.dispatch(setNavigationPath(EXTERNAL_ACTION));
      }
    }
  }

  getRequestResult(res, cb) {
    this.setState({
      requestResult: res
    }, () => cb())
  }

  canVisualizeNetwork() {
    return (
      this.props.apiErrors[API_GET_CHAIN_INFO] === null &&
      this.props.apiErrors[API_GET_PBAAS_NETWORK_GRAPH] === null &&
      this.props.chainInfo != null &&
      this.props.chainInfo.longestchain !== 0 &&
      this.props.chainInfo.longestchain === this.props.chainInfo.blocks
    );
  }

  async completeVisualization(result = null, error = null) {
    try {
      await closePlugin(
        VERUS_PBAAS_VISUALIZER,
        this.props.windowId,
        true,
        result != null
          ? result
          : { error: error != null ? error.message : error }
      );
    } catch(e) {
      this.props.dispatch(setError(e))
    }
  } 

  render() {
    return LoginConsentRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    path: state.navigation.path,
    pathArray: state.navigation.pathArray,
    port: state.rpc.port,
    originAppId: state.origin.originAppId,
    originApp: state.origin.originApp,
    originAppBuiltin: state.origin.originAppBuiltin,
    error: state.error.error,
    rpcPassword: state.rpc.password,
    windowId: state.rpc.windowId,
    visualizationRequest: state.rpc.visualizationRequest,
    chainInfo: state.graph.chainInfo,
    apiErrors: state.error.apiErrors
  };
};

export default connect(mapStateToProps)(LoginConsent);