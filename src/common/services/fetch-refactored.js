import React from 'react'

import Spinner from 'components/Spinner'

const actionDefault = () => Promise.resolve()

export const configDefault = {
  filter: () => true,
  loader: true,
}

/**
 * fetch decorator
 * basic usage:
 *  fetch(async function(props) { }, configDefault - optional param)(YourReactComponent)
 *
 * runs in two steps:
 *  1. decide whether it need to fetch at all - runs configDefault.filter(props), if return true than fetch decorator
 *    will show default loader instead of mounting your wrapped component
 *    (behavior can be extended or changed, depends on config params)
 *
 *  2. after loading state has activated - and launch your async action (first argument of decorator)
 *    loader shows until your async function waiting for being resolved
 *    (object returned from async function will be merged with props of your component)
 *
 * fetching on props update:
 *  - simply call this.props.fetch() inside your wrapped component to run steps mentioned above
 */
export default (action = actionDefault, config = configDefault) => Component =>
  class FetchDecorator extends React.Component {
    static displayName = `Fetch(${Component.displayName || Component.name})`

    state = {
      loading: config.filter(this.props),
      injectedProps: {},
    }

    componentDidMount() {
      this.state.loading && this.fetch()
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.loading && prevState.loading !== this.state.loading)
        this.fetch()
    }

    fetch = () => {
      action({ ...this.props, ...this.state.injectedProps })
        .then((fetched = {}) => {
          this.setState(state => ({
            loading: false,
            injectedProps: {
              ...state.injectedProps,
              ...fetched,
            },
          }))
        })
        .catch(error => {
          console.error(error)
          this.setState({ loading: false })
        })
    }

    render() {
      const { loading, injectedProps } = this.state

      if (config.loader && loading) {
        return <Spinner />
      }

      return (
        <Component
          {...this.props}
          {...injectedProps}
          loading={loading}
          fetch={() => {
            this.setState({ loading: config.filter(this.props) })
          }}
        />
      )
    }
  }
