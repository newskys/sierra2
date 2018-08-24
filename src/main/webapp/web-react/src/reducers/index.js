import {combineReducers} from 'redux';
// import ReduxThunk from 'redux-thunk';
import user from './user';
// import ui from './ui';

const reducers = combineReducers({
    user
});

export default reducers;