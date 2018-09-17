import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default (action, config = {}, stateToProps, dispatchToProps) => Component => connect(
  stateToProps,
  (dispatch, ownProps) => {
    let selfProps = {};

    if (dispatchToProps && typeof dispatchToProps === 'function') {
      selfProps = dispatchToProps(dispatch, ownProps);
    }

    return {
      dispatch,
      ...selfProps,
    };
  },
)(
  class FetchDecorator extends React.Component {
    static displayName = 'FetchDecorator';

    static propTypes = {
      dispatch: PropTypes.func,
    };

    static defaultProps = {
      dispatch: () => {},
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      const filter = config.filter || (() => true);
      const needFetch = filter(nextProps, prevState.watchProps);

      if ((needFetch && prevState.mounting) || (needFetch && config.watchProps)) {
        return { ...prevState, showLoader: true };
      }

      return null;
    }

    state = {
      mounting: true,
      showLoader: false,
      injectedProps: {},
      watchProps: {},
    };

    isFetching = false;

    componentDidMount() {
      this.fetch();
    }

    shouldComponentUpdate() {
      return !this.isFetching;
    }

    componentDidUpdate() {
      this.fetch();
    }

    fetch() {
      const { dispatch } = this.props;
      const { showLoader } = this.state;
      const watchProps = config.watchProps || (() => {});

      this.isFetching = showLoader;

      showLoader && dispatch(action(this.props))
        .then((injectedProps = {}) => {
          this.isFetching = false;

          this.setState({
            showLoader: false,
            mounting: false,
            injectedProps,
            watchProps: watchProps(this.props),
          });
        })
        .catch(() => {
          this.isFetching = false;

          this.setState({ showLoader: false, mounting: false });
        });
    }

    render() {
      const { showLoader, injectedProps } = this.state;

      if (showLoader) {
        return <p>loading...</p>;
      }

      return (
        <Component {...this.props} {...injectedProps} />
      );
    }
  }
);
