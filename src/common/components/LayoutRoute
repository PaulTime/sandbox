import React from 'react'
import { Route, Switch } from 'react-router-dom'

// function Component(props) {
//   return (
//     <section>
//       <header>
//         header
//       </header>
//
//       <main>
//         {typeof props.children === 'function' && props.children(props)}
//         {typeof props.children !== 'function' && props.children}
//       </main>
//
//       <footer>
//         footer
//       </footer>
//     </section>
//   )
// }

/**
 *  LayoutRoute
 *  Usage:
 *
 *  import { Route } from 'react-router-dom'
 *
 *  import LayoutRoute 'components/LayoutRoute'
 *  import YourLayoutComponent 'components/YourLayoutComponent'
 *  import BlockComponent 'components/BlockComponent'
 *
 *  <LayoutRoute
 *    path="/page-name"
 *    component={YourLayoutComponent}
 *  >
 *    <Route
 *      path="/sub-page#1-name"
 *      component={BlockComponent}
 *    />
 *  </LayoutRoute>
 **/
export default class LayoutRoute extends React.Component {
  static defaultProps = {
    component: React.Fragment,
  }

  render() {
    const { component: Component, path, ...rest } = this.props

    return (
      <Route
        path={path}
        render={() => (
          <Component>
            {props => (
              <Switch>
                {React.Children.map(this.props.children, child =>
                  React.cloneElement(child, {
                    path: `${path}${child.props.path}`,
                    component: undefined,
                    render: () => <child.props.component {...props} />,
                  }),
                )}
              </Switch>
            )}
          </Component>
        )}
        {...rest}
      />
    )
  }
}
