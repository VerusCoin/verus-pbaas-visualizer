import { combineReducers } from 'redux';
import { navigation } from './reducers/navigation/navigation.reducer';
import { rpc } from './reducers/rpc/rpc.reducer';
import { graph } from './reducers/graph/graph.reducer';
import { origin } from './reducers/origin/origin.reducer';
import { error } from './reducers/error/error.reducer';

const rootReducer = combineReducers({
    navigation,
    rpc,
    graph,
    origin,
    error
});

export default rootReducer;