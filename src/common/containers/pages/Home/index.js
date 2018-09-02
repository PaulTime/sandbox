import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bemDecorator from 'cn-decorator';
import { withRouter } from 'react-router-dom';

import fetchAPI from 'common/redux/api';

@withRouter
@connect(null, dispatch => ({
  testAPI() {
    dispatch(fetchAPI({
      endpoint: '/api/test-service/test',
      method: 'GET',
      type: 'TEST',
    }));

    dispatch(fetchAPI({
      endpoint: '/api/test-service/test_2',
      method: 'GET',
      type: 'TEST',
    }));
  }
}))
@bemDecorator('home-page')
export default class Home extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    testAPI: PropTypes.func,
  };

  static defaultProps = {
    location: undefined,
    testAPI: undefined,
  };

  componentDidMount() {
    const { location, testAPI } = this.props;

    if(location.pathname.includes('/media')) {
      testAPI();
    }
  }

  render(bem) {
    return (
      <main>
        <h1>Home</h1>

        <img src="/static/img/googlelogo.png" alt="GoogleLogo"/>
        <img src="/static/img/logo.svg" alt="logo"/>

        <div className={bem('test-div')} />
      </main>
    );
  }
}
