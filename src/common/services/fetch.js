import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default (action, config = {}) => Component => connect(
  null,
  dispatch => ({ dispatch }),
)(
  class FetchDecorator extends React.PureComponent {
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

      if (needFetch && (prevState.mounting || config.watchProps)) {
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

    fetchChecksum = '';

    makeWatchProps = typeof config.watchProps === 'function' ? config.watchProps : (() => {});

    componentDidMount() {
      const watchProps = this.makeWatchProps(this.props);

      this.fetch(watchProps);
    }

    componentDidUpdate() {
      const watchProps = this.makeWatchProps(this.props);

      this.fetch(watchProps);
    }

    fetch(watchProps) {
      this.fetchChecksum = JSON.stringify(watchProps);

      this.state.showLoader && this.props.dispatch(action(this.props))
        .then((injectedProps = {}) => {
          if (this.fetchChecksum === JSON.stringify(watchProps)) {
            this.setState({
              showLoader: false,
              mounting: false,
              injectedProps,
              watchProps,
            });
          }
        })
        .catch(() => {
          if (this.fetchChecksum === JSON.stringify(watchProps)) {
            this.setState({ showLoader: false, mounting: false });
          }
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
