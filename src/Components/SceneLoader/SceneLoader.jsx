import * as React from 'react';
import { 
	FreeCamera,
	Vector3,
	HemisphericLight,
	Mesh,
	Texture,
} from '@babylonjs/core';

import SceneComponent from '../SceneComponent/SceneComponent'; // import the component above linking to file we just created.

import {
	getRockMaterial,
	getGrassMaterial,
} from '../../Materials/materials';

const grassDisplacement = require('../../assets/materials/grass/Grass_001_DISP.png');

class SceneLoader extends React.Component {
	onSceneMount = (e) => {
		const { canvas, scene, engine } = e;

		// This creates and positions a free camera (non-mesh)
		const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

		// This targets the camera to scene origin
		camera.setTarget(Vector3.Zero());

		// This attaches the camera to the canvas
		camera.attachControl(canvas, true);

		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

		// Default intensity is 1. Let's dim the light a small amount
		light.intensity = 1;

		// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
		const sphere1 = Mesh.CreateSphere("sphere1", 16, 2, scene);
		const sphere2 = Mesh.CreateSphere("sphere2", 16, 2, scene);

		sphere1.material = getRockMaterial(scene, 1.5, Texture.EQUIRECTANGULAR_MODE);
		sphere2.material = getRockMaterial(scene, 1.5, Texture.INVCUBIC_MODE);

		// Move the sphere upward 1/2 its height
		sphere1.position.y = 1;
		sphere1.position.x = 1.5;
		sphere1.rotate(new Vector3(1, 0, 0), 1);
		sphere1.rotate(new Vector3(0, 1, 0), 1);
		sphere2.position.y = 1;
		sphere2.position.x = -1;

		// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
		const ground = Mesh.CreateGround("ground1", 12, 12, 2, scene);
		// TODO displacement map doesn't work ? why?
		ground.applyDisplacementMap(grassDisplacement, 0, 100);
		ground.material = getGrassMaterial(scene, 5);

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