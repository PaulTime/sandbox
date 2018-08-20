import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { selectIsAuthorized } from 'common/selectors/auth';

@connect(state => ({
  isAuthorized: selectIsAuthorized(state),
}))
export default class PrivateLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isAuthorized: PropTypes.bool,
  };

  static defaultProps = {
    isAuthorized: false,
  };

  render () {
    const { children, isAuthorized } = this.props;

    if (isAuthorized) return children;

    return <Redirect to="/login" />;
  }
}