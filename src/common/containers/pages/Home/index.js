import React from 'react';
import bemDecorator from 'cn-decorator';

import './index.scss';

@bemDecorator('home-page')
export default class Home extends React.PureComponent {
  render(bem) {
    return (
      <main className={bem()}>
        <h1 className={bem('title')}>Web Audio Fab Filter</h1>

        <article className={bem('about')}>
          This is an App for real-time customizing your audio files
        </article>
      </main>
    );
  }
}
