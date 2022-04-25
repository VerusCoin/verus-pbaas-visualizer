import React from 'react';
import {
  EXTERNAL_ACTION, GRAPH_DISPLAY, LOADING_DISPLAY
} from '../../utils/constants'
import ExternalAction from './ExternalAction/ExternalAction'
import Loading from '../Loading';
import Error from './Error/Error';
import { setError } from '../../redux/reducers/error/error.actions';
import DisplayGraph from './DisplayGraph/DisplayGraph';

export const LoginConsentRender = function() {
  const COMPONENT_PROPS = {
    pathArray: this.props.pathArray,
    completeVisualization: this.completeVisualization,
    requestResult: this.state.requestResult,
    setRequestResult: this.getRequestResult,
    canVisualizeNetwork: this.canVisualizeNetwork
  }

  const COMPONENT_MAP = {
    [EXTERNAL_ACTION]: <ExternalAction {...COMPONENT_PROPS} />,
    [LOADING_DISPLAY]: <Loading />,
    [GRAPH_DISPLAY]: <DisplayGraph {...COMPONENT_PROPS} />,
  };

  return this.props.error != null ? (
    <Error
      error={this.props.error}
      clearError={() => this.props.dispatch(setError(null))}
      completeVisualization={this.completeVisualization}
    />
  ) : this.props.port != null && this.props.originApp != null ? (
    this.props.pathArray[0] ? (
      COMPONENT_MAP[this.props.pathArray[0]]
    ) : null
  ) : (
    <Loading />
  );
}


