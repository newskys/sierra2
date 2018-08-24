import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export default function configureStore(reducer, initialState = {}) {
    const enhancers = composeWithDevTools(applyMiddleware(thunk));

    return createStore(reducer, initialState, enhancers);
}
