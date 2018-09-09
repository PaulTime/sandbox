import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bemDecorator from 'cn-decorator';

import fetchAPI from 'common/redux/api';
import Filter from 'common/components/Filter';

import './index.scss';

@connect(null, dispatch => ({
  testAPI() {
    dispatch(fetchAPI({
      endpoint: '/api/test-service/test',
      method: 'GET',
      type: 'TEST',
    }));

    dispatch(fetchAPI({
      endpoint: '/api/test-service/test',
      method: 'GET',
      type: 'TEST_2',
    }));

    dispatch(fetchAPI({
      endpoint: '/api/test-service/test',
      method: 'GET',
      type: 'TEST_3',
    }));
  }
}))
@bemDecorator('filter-page')
export default class Home extends React.PureComponent {
  static propTypes = {
    testAPI: PropTypes.func,
  };

  static defaultProps = {
    testAPI: () => {},
  };

  componentDidMount() {
    this.props.testAPI();
  }

  render(bem) {
    return (
      <main className={bem()}>
        <h1 className={bem('title')}>Web Audio Fab Filter</h1>

        <article className={bem('about')}>
          <h2 className={bem('sub-title')}>Right now I am working hard on this project, so you can soon be first user to test my web app :)</h2>

          <ul className={bem('meme-list')}>
            <li className={bem('meme-item')}>
              <img className={bem('meme')} src="https://media.giphy.com/media/bAplZhiLAsNnG/giphy.gif" alt="Im working" />
            </li>

            <li className={bem('meme-item')}>
              <img className={bem('meme')} src="//i.imgur.com/vJv5y9O.gif" alt="Im working" />
            </li>
          </ul>

          <Filter />
        </article>
      </main>
    );
  }
}
