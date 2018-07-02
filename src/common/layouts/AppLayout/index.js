import React from 'react';
import PropTypes from 'prop-types';
import bemDecorator from 'cn-decorator';
import { NavLink } from 'react-router-dom';

@bemDecorator('app-layout')
export default class AppLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render (bem) {
    const { children } = this.props;
    return (
      <section className={bem()}>
        <aside className={bem('aside')}>
          <NavLink exact to="/">Home</NavLink>
          <NavLink exact to="/login">login</NavLink>
        </aside>

        <div className={bem('pages-layout')}>
          {children}
        </div>
      </section>
    );
  }
}