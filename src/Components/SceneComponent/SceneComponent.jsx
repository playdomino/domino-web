import React from 'react';
import PropTypes from 'prop-types';
import { 
	Engine,
	Scene,
} from '@babylonjs/core';

class SceneComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  }

  componentDidMount() {
    const {
      engineOptions,
      adaptToDeviceRatio,
      onSceneMount,
    } = this.props;

    this.engine = new Engine(
      this.canvas,
      true,
      engineOptions,
      adaptToDeviceRatio,
    );

    const scene = new Scene(this.engine);
    this.scene = scene;

    if (typeof onSceneMount === 'function') {
      onSceneMount({
        scene,
        engine: this.engine,
        canvas: this.canvas,
      });
    } else {
      console.error('onSceneMount function not available');
    }

    // Resize the babylon engine when the window is resized
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onResizeWindow = (e) => {
    this.setState({ 
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });

    if (this.engine) {
      this.engine.resize();
    }
  }

  onCanvasLoaded = (c) => {
    if (c !== null) {
      this.canvas = c;
    }
  }

  render() {
    // 'rest' can contain additional properties that you can flow through to canvas:
    // (id, className, etc.)
    const { width, height } = this.state;

    const opts = {};

    if (width !== undefined && height !== undefined) {
      opts.width = width;
      opts.height = height;
    }

    return (
      <canvas
        width={width}
        height={height}
        ref={this.onCanvasLoaded}
      />
    );
  }
}

Scene.propTypes = {
  someProp: PropTypes.number.isRequired,
  onTap: PropTypes.func.isRequired,
  engineOptions: PropTypes.number.isRequired,
  adaptToDeviceRatio: PropTypes.number.isRequired,
  onSceneMount: PropTypes.func.isRequired,
};

export default SceneComponent;
