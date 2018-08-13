import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bemDecorator from 'cn-decorator';

import RegistrationForm from 'common/containers/forms/Registration';
import { fetchSignupRequest } from 'common/redux/auth';

import './index.scss';

@connect(null, { fetchSignupRequest })
@bemDecorator('registration-page')
export default class RegistrationPage extends React.PureComponent {
    static propTypes = {
      fetchSignupRequest: PropTypes.func,
    };

    static defaultProps = {
      fetchSignupRequest: () => {},
    };

    render(bem) {
      return (
        <section className={bem()}>
          <h2 className={bem('title')}>Registration form</h2>

          <RegistrationForm onSubmit={data => this.props.fetchSignupRequest(data)} />
        </section>
      );
    }
}