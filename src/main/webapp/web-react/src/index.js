import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom'
import configureStore from './reducers/store';
import {Provider} from "react-redux";
import reducers from './reducers';

const store = configureStore(reducers);
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
    , document.getElementById('root')
);
