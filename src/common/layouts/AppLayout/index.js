import React from 'react'
import bemDecorator from 'cn-decorator';
import { NavLink } from 'react-router-dom';

@bemDecorator('app-layout')
export default class AppLayout extends React.PureComponent {
    render (bem) {
        const { children } = this.props;
        return (
            <section className={bem()}>
                <aside className={bem('aside')}>
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink exact to="/landing-credits">landing-credits</NavLink>
                </aside>

                <div className={bem('pages-layout')}>
                    {children}
                </div>
            </section>
        )
    }
};