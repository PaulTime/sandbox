import React from 'react';
import PropTypes from 'prop-types';
import bemDecorator from 'cn-decorator';
import { NavLink } from 'react-router-dom';

import 'normalize.css/normalize.css';

import './index.scss';

@bemDecorator('app-layout')
export default class AppLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render (bem) {
    const { children } = this.props;
    return (
      <section className={bem()}>
        <nav className={bem('nav')}>
          <NavLink className={bem('link')} exact to="/">Home</NavLink>
          <NavLink className={bem('link')} exact to="/login">Login</NavLink>
          <NavLink className={bem('link')} exact to="/registration">Registration</NavLink>
        </nav>

        <div className={bem('pages-layout')}>
          {children}
        </div>
      </section>
    );
  }
}