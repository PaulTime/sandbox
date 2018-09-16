import React from 'react';
import bemDecorator from 'cn-decorator';

import fetchAPI from 'common/redux/api';
import fetch from 'common/services/fetch';
import Filter from 'common/components/Filter';

import './index.scss';

@fetch(
  props => async (dispatch) => {
    await dispatch(fetchAPI({
      endpoint: '/api/test-service/test',
      method: 'GET',
      type: 'TEST',
    }));

    return props;
  },
  {
    setPropsToWatch(propsToWatch) {
      return { prop: propsToWatch.prop };
    }
  },
)
@bemDecorator('filter-page')
export default class FilterPage extends React.PureComponent {
  static displayName = 'FilterPage';

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
