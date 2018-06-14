import React from 'react'
import { Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
    render () {
        return (
            <Switch>
                <Route exact path="/" component={() => <h1>header 1</h1>}/>
                <Route exact path="/landing-credits" component={() => <h1>landing-credits</h1>}/>
            </Switch>
        )
    }
};