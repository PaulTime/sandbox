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
      <div className={bem()}>
        <h2 className={bem('title')}>Login form</h2>

        <LoginForm onSubmit={data => this.props.fetchLoginRequest(data)} />
      </div>
    );
  }
}