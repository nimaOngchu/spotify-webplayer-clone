import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import TokenStorere from './utility/TokenStorere';
import App from './components/App';
export class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>Hello</div>
                <Switch>
                    <Route exact path='/' component={App} />
                    <Route path ='/tokenHandler' component = {TokenStorere}/>
                </Switch>

          </BrowserRouter>
        )
    }
}

export default Root
