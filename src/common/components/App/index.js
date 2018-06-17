import React from 'react'
import PropTypes from 'prop-types'
import bemDecorator from 'cn-decorator';
import { Switch, Route, withRouter } from 'react-router-dom';

import AppLayout from 'common/layouts/AppLayout'

import './index.css';

@withRouter
@bemDecorator('app-root')
export default class App extends React.PureComponent {
    render (bem) {
        return (
            <section className={bem()}>
                <AppLayout>
                    <Switch>
                        <Route exact path="/" component={() => <h1>header 1</h1>}/>
                        <Route exact path="/landing-credits" component={() =>
                            <div>
                                <h1>landing-credits</h1>
                                <img src="static/img/googlelogo.png" alt="GoogleLogo" />
                                <img src="static/img/logo.svg" alt="logo" />
                            </div>
                        }/>
                    </Switch>
                </AppLayout>
            </section>
        )
    }
};