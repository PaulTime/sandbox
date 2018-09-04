import React from 'react';
import PropTypes from 'prop-types';
import bemDecorator from 'cn-decorator';

import Header from 'common/containers/blocks/Header';

import './reset.scss';
import './index.scss';

@bemDecorator('app-layout')
export default class AppLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render (bem) {
    const { children } = this.props;

    return (
      <section className={bem()}>
        <Header />

        <div className={bem('pages-layout')}>
          {children}
        </div>
      </section>
    );
  }
}
