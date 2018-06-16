import React from 'react'
import bemDecorator from 'cn-decorator';
import { Switch, Route } from 'react-router-dom';

import AppLayout from 'common/layouts/AppLayout'

@bemDecorator('app-root')
export default class App extends React.Component {
    render (bem) {
        return (
            <section className={bem()}>
                <AppLayout>
                    <Switch>
                        <Route exact path="/" component={() => <h1>header 1</h1>}/>
                        <Route exact path="/landing-credits" component={() => <h1>landing-credits</h1>}/>
                    </Switch>
                </AppLayout>
            </section>
        )
    }
};