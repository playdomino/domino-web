import * as React from 'react';
import { 
	FreeCamera,
	Vector3,
	HemisphericLight,
	Mesh,
} from '@babylonjs/core';
import SceneComponent from '../SceneComponent/SceneComponent'; // import the component above linking to file we just created.

class SceneLoader extends React.Component {
	onSceneMount = (e) => {
		const { canvas, scene, engine } = e;

		// This creates and positions a free camera (non-mesh)
		var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

		// This targets the camera to scene origin
		camera.setTarget(Vector3.Zero());

		// This attaches the camera to the canvas
		camera.attachControl(canvas, true);

		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

		// Default intensity is 1. Let's dim the light a small amount
		light.intensity = 0.7;

		// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
		var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

		// Move the sphere upward 1/2 its height
		sphere.position.y = 1;

		// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
		var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

		engine.runRenderLoop(() => {
			if (scene) {
				scene.render();
			}
		});
	}

	render() {               
		return (
			<div>
				<SceneComponent onSceneMount={this.onSceneMount} />
			</div>
		)
	}
}

export default SceneLoader;