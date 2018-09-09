import React from 'react';
import bemDecorator from 'cn-decorator';

import './index.scss';

@bemDecorator('filter')
export default class Filter extends React.PureComponent {
  handleChange() {
    const [ file ] = this.$input.files;
    this.$audio.src = URL.createObjectURL(file);
    this.$audio.load();
    this.$audio.play();

    this.context = new AudioContext();
    this.analyser = this.context.createAnalyser();

    const src = this.context.createMediaElementSource(this.$audio);
    src.connect(this.analyser);
    this.analyser.connect(this.context.destination);

    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.8;
  }

  paintSpectrum() {
    const bufferLength = this.analyser.frequencyBinCount;
    const ctx = this.$canvas.getContext('2d');
    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = this.$canvas.width;
    const HEIGHT = this.$canvas.height;

    const barWidth = WIDTH / bufferLength;
    let barHeight;
    const self = this;

    requestAnimationFrame(function renderFrame() {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      if (self.$audio.paused) {
        return;
      }

      self.analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        const red = 250 + (barHeight / HEIGHT) * 100 * 2;
        const green = 250 - ((barHeight / HEIGHT) * 100 * 2);
        const blue = 50;

        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect((barWidth + 1) * i, HEIGHT - barHeight, barWidth, barHeight);
      }

      requestAnimationFrame(renderFrame);
    });
  }

  render(bem) {
    return (
      <section className={bem()}>
        <header className={bem('title')}>
          Just choose file to play and enjoy :)
        </header>

        <input
          ref={ref => { this.$input = ref; }}
          onChange={() => { this.handleChange(); }}
          className={bem('file')}
          type="file"
          accept="audio/*"
        />

        <audio
          ref={ref => { this.$audio = ref; }}
          onPlaying={() => { this.paintSpectrum(); }}
          className={bem('controls')}
          id="audio"
          controls
        />

        <canvas
          ref={ref => { this.$canvas = ref; }}
          className={bem('spectrum')}
          width={850}
          height={250}
        />
      </section>
    );
  }
}
