import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bemDecorator from 'cn-decorator';

import LoginForm from 'common/containers/forms/Login';
import { fetchLoginRequest } from 'common/redux/auth';

import './index.scss';

@connect(null, { fetchLoginRequest })
@bemDecorator('login-page')
export default class LoginPage extends React.PureComponent {
  static propTypes = {
    fetchLoginRequest: PropTypes.func,
  };

  static defaultProps = {
    fetchLoginRequest: undefined,
  };

  render(bem) {
    return (
      <section className={bem()}>
        <header className={bem('title')}>Login form</header>

        <LoginForm onSubmit={data => this.props.fetchLoginRequest(data)} />
      </section>
    );
  }
}
