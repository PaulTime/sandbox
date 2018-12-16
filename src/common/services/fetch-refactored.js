import React from "react";
import { connect } from 'react-redux';

export default (action = () => Promise.resolve(), config = {}) => Component => connect()(
  class FetchDecorator extends React.PureComponent {
    static displayName = 'FetchDecorator';

    state = {
      showLoader: confih.filter(this.props),
      injectedProps: {},
    }

    componentDidMount() {
      this.startFetch();
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

    startFetch() {
      this.state.showLoader && this.fetch();
    }

    render() {
      const { showLoader, injectedProps } = this.state;

      if (showLoader) {
        return <p>loading...</p>;
      }

      return (
        <Component
          {...this.props}
          {...injectedProps}
          fetch={() => { this.setState({ showLoader: confih.filter(this.props) }, this.startFetch); }}
        />
      );
    }
  }
);
