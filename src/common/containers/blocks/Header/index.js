import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bemDecorator from 'cn-decorator';
import { NavLink, Link } from 'react-router-dom';

import { selectIsAuthorized } from 'common/selectors/auth';
import { fetchLogoutRequest } from 'common/redux/auth';

import './index.scss';

@connect(state => ({
  isAuthorized: selectIsAuthorized(state),
}), { fetchLogoutRequest })
@bemDecorator('header')
export default class Header extends React.PureComponent {
  static propTypes = {
    isAuthorized: PropTypes.bool,
    fetchLogoutRequest: PropTypes.func,
  };

  static defaultProps = {
    isAuthorized: false,
    fetchLogoutRequest: () => {},
  };

  state = {
    fetching: false,
  };

  async logout() {
    await this.setState({ fetching: true });
    await this.props.fetchLogoutRequest();
    await this.setState({ fetching: false });
  }

  render (bem) {
    const { isAuthorized } = this.props;

    return (
      <header className={bem()}>
        <Link to="/" className={bem('logo-wrap')}>
          <p className={bem('logo-text')}>
            <img className={bem('logo')} src="/static/img/cassette.png" alt="Web version of well known FabFilter Plugin" />
          </p>
        </Link>

        <nav className={bem('nav')}>
          <NavLink className={bem('link')} exact to="/">Home</NavLink>

          {isAuthorized
            ? (
              <React.Fragment>
                <NavLink className={bem('link')} exact to="/filter">Filter</NavLink>

                <button
                  className={bem('button')}
                  onClick={async () => { await this.logout(); }}
                >
                  {this.state.fetching ? 'Logging out' : 'Logout'}
                </button>
              </React.Fragment>
            )
            : (
              <React.Fragment>
                <NavLink className={bem('link')} exact to="/login">Login</NavLink>
                <NavLink className={bem('link')} exact to="/registration">Registration</NavLink>
              </React.Fragment>
            )
          }
        </nav>
      </header>
    );
  }
}
