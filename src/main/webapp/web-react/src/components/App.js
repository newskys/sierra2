import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Write from './Write';
import View from './View';
import About from './About';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Route exact path='/' component={Main} />
                <Route path='/login' component={Login} />
                <Route path='/write' component={Write} />
                <Route path='/view' component={View} />
                <Route path='/about' component={About} />
            </div>
        );
    }
}

export default App;
