import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bemDecorator from 'cn-decorator';

import LoginForm from 'common/containers/forms/Login';
import { fetchLoginRequest } from 'common/redux/login';

import './index.scss';

@connect(null, { fetchLoginRequest })
@bemDecorator('login-page')
export default class LoginPage extends React.PureComponent {
    static propTypes = {
      fetchLoginRequest: PropTypes.func,
    };

    static defaultProps = {
      fetchLoginRequest: () => {},
    };

    render(bem) {
      return (
        <div className={bem()}>
          <h2 className={bem('title')}>Login form</h2>

          <LoginForm onSubmit={() => this.props.fetchLoginRequest()} />
        </div>
      );
    }
}