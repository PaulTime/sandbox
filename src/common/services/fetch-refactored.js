import React from "react";
import { connect } from 'react-redux';

export default (action = () => Promise.resolve(), config = {}) => Component => connect()(
  class FetchDecorator extends React.Component {
    static displayName = 'FetchDecorator';

    state = {
      showLoader: config.filter(this.props),
      injectedProps: {},
    }

    componentDidMount() {
      this.state.showLoader && this.fetch();
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.showLoader && prevState.showLoader !== this.state.showLoader)
        this.fetch()
    }

    fetch() {
      this.props.dispatch(action(this.props))
        .then((injectedProps = {}) => {
          this.setState({
            showLoader: false,
            injectedProps,
          });
        })
        .catch((e) => {
          console.error(e);
          this.setState({ showLoader: false });
        });
    };

    render() {
      const { showLoader, injectedProps } = this.state;

      if (showLoader) {
        return <p>loading...</p>;
      }

      return (
        <Component
          {...this.props}
          {...injectedProps}
          fetch={() => { this.setState({ showLoader: config.filter(this.props) }); }}
        />
      );
    }
  }
);
