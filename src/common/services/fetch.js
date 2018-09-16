import React from 'react';
import { connect } from 'react-redux';

export default (action, config, stateToProps, dispatchToProps) => Component => connect(
  stateToProps,
  (dispatch, ownProps) => {
    let selfProps = {};

    if (dispatchToProps && typeof dispatchToProps === 'function') {
      selfProps = dispatchToProps(dispatch, ownProps);
    }

    return {
      dispatchFetchAction() {
        return dispatch(action(ownProps));
      },
      ...selfProps,
    };
  },
)(
  class FetchDecorator extends React.PureComponent {
    static displayName = 'FetchDecorator';

    static getDerivedStateFromProps(nextProps, prevState) {
      const viewConfig = config || {};
      const filter = viewConfig.filter || (() => true);
      let watch = viewConfig.watch;

      if (Array.isArray(watch)) {

      }

      const fetching = !prevState.fetchedOnMount && filter(nextProps, prevState);

      return { ...prevState, fetching };
    }

    state = {
      fetchedOnMount: false,
      fetching: false,
      injectedProps: {},
      watchProps: {},
    };

    componentDidMount() {
      this.fetch();
    }

    componentDidUpdate() {
      // this.fetch();
    }

    fetch() {
      const filter = (config && config.filter) || (() => true);

      !this.state.fetching && filter(this.props) && this.props.dispatchFetchAction()
        .then((injectedProps) => { this.setState({ fetching: false, fetchedOnMount: true, injectedProps }); })
        .catch(() => { this.setState({ fetching: false, fetchedOnMount: true }); });
    }

    render() {
      const { fetching, injectedProps } = this.state;
      console.log('fetching', fetching);

      if (fetching) {
        return <p>loading...</p>;
      }

      return (
        <Component {...this.props} {...injectedProps} />
      );
    }
  }
);
