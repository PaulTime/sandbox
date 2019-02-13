import React from 'react'

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

    fetchId = undefined

    componentDidMount() {
      this.startFetch()
    }

    startFetch = () => {
      if (!this.state.loading) return

      this.fetchId = Math.random()
      this.fetch(this.fetchId)
    }

    fetch = fetchId => {
      action({ ...this.props, ...this.state.injectedProps })
        .then((fetched = {}) => {
          if (fetchId !== this.fetchId) return

          this.setState(state => ({
            loading: false,
            injectedProps: fetched,
          }))
        })
        .catch(error => {
          if (fetchId !== this.fetchId) return

          this.setState({ loading: false })
        })
    }

    render() {
      const { loading, injectedProps } = this.state

      if (config.loader && loading) {
        return 'loading...'
      }

      return (
        <Component
          {...this.props}
          {...injectedProps}
          loading={loading}
          fetch={() => {
            this.setState(
              { loading: config.filter(this.props) },
              this.startFetch,
            )
          }}
        />
      )
    }
  }
