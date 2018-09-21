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

    componentDidMount() {
      this.fetch();
    }

    componentDidUpdate() {
      this.fetch();
    }

    fetch() {
      const makeWatchProps = typeof config.watchProps === 'function' ? config.watchProps : (() => {});
      this.fetchChecksum = JSON.stringify(makeWatchProps(this.props));


      this.state.showLoader && this.props.dispatch(action(this.props))
        .then((injectedProps = {}) => {
          const watchProps = makeWatchProps(this.props);

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
          const watchProps = makeWatchProps(this.props);

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
