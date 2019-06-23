import React, { Component } from 'react';
import './ongchuSlider.css';

export class OngchuSlider extends Component {

  state = {
    dragging: false
  };
  componentDidMount() {
    this.mouseEventListner();
  }
  mouseEventListner = () => {
    document.addEventListener('mousedown', this.onMouseDown, false);
    document.addEventListener('mouseup', this.onMouseUp, false);
    document.addEventListener('mousemove', this.onMouseMove, false);
  };
  onMouseDown = e => {
    if (e.target.id === this.props.sliderName) {
      this.setState({ dragging: true });
    }
  };
  onMouseUp = () => {
    this.setState({ dragging: false });
  };
  handleClickOnProgrressBar = e => {
    let sliderContianerOffseLeft = this.sliderContainer.offsetLeft;
    let sliderContainerOffsetWidth = this.sliderContainer.offsetWidth;
    let trackProgress = e.clientX - sliderContianerOffseLeft;
    let progressBar = Math.round(
      (trackProgress / sliderContainerOffsetWidth) * 100
    );
    this.props.changeValue(progressBar, this.props.sliderName);
  };
  onMouseMove = e => {
    let sliderContianerOffseLeft = this.sliderContainer.offsetLeft;
    let sliderContainerOffsetWidth = this.sliderContainer.offsetWidth;

    if (this.state.dragging) {
      let trackProgress;
      if (e.clientX < sliderContianerOffseLeft) {
        trackProgress = 0;
      } else if (
        e.clientX >
        sliderContainerOffsetWidth + sliderContianerOffseLeft
      ) {
        trackProgress = sliderContainerOffsetWidth;
      } else {
        trackProgress = e.clientX - sliderContianerOffseLeft;
      }
      let progressBar = Math.round(
        (trackProgress / sliderContainerOffsetWidth) * 100
      );

      this.props.changeValue(progressBar, this.props.sliderName);

    }
  };

  render() {
    return (
      <div
        className="music-slider-container"
        onClick={this.handleClickOnProgrressBar}>
        <div
          className="ongchu-slider-container"
          ref={el => {
            this.sliderContainer = el;
          }}>
          <div className="ongchu-slider-track">
            <div
              className="ongchu-track-progress"
              style={{ width: this.props.value + '%' }}
            />
          </div>
          <div
            className="ongchu-thumb-container"
            style={{ marginLeft: this.props.value + '%' }}>
            <div
              className="ongchu-thumb-indicator"
              id={this.props.sliderName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default OngchuSlider;
