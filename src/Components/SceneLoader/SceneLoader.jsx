import * as React from 'react';
import '@babylonjs/inspector';
import { 
	FreeCamera,
	ArcRotateCamera,
	Vector3,
	HemisphericLight,
	Mesh,
	ShadowGenerator,
	DirectionalLight,
	ActionManager,
	ExecuteCodeAction,
} from '@babylonjs/core';

import SceneComponent from '../SceneComponent/SceneComponent'; // import the component above linking to file we just created.

import {
	getRockMaterial,
	getGrassMaterial,
	getSkyBoxMaterial,
} from '../../Materials/materials';

const grassDisplacement = require('../../assets/textures/grass/Grass_001_DISP.png');
const rockDisplacement = require('../../assets/textures/rock/Rock_028_DISP.png');

class SceneLoader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fpsCounter: 0,
		}
	}

	onSceneMount = (e) => {
		const { canvas, scene, engine } = e;

		// scene.debugLayer.show({ overlay: true, showInspector: true });

		// This creates and positions a free camera (non-mesh)
		// const camera = new FreeCamera("camera1", new Vector3(0, 5, -20), scene);

		// This targets the camera to scene origin
		// camera.setTarget(Vector3.Zero());

		// Parameters: alpha, beta, radius, target position, scene
		var camera = new ArcRotateCamera("camera1", 0, 20, 40, new Vector3(0, 0, 0), scene);

		// Positions the camera overwriting alpha, beta, radius

		camera.setPosition(new Vector3(-15, 20, -15));

		// This attaches the camera to the canvas
		camera.attachControl(canvas, true, true);

		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
		// Default intensity is 1. Let's dim the light a small amount
		light.intensity = 0.7;

		var light2 = new DirectionalLight("dir01", new Vector3(-2, -1, 1), scene);
		light2.position = new Vector3(10, 10, 5);
		light2.intensity = 0.5;

		// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
		const sphere1 = Mesh.CreateSphere("sphere1", 60, 1, scene, true);
		sphere1.applyDisplacementMap(rockDisplacement, 0, 0.8);
		const sphere2 = Mesh.CreateSphere("sphere2", 60, 1, scene, true);
		sphere2.applyDisplacementMap(rockDisplacement, 0, 0.8);

		sphere1.material = getRockMaterial(scene, 3);
		sphere2.material = getRockMaterial(scene, 3);

		// Move the sphere upward 1/2 its height
		sphere1.position.y = 1;
		sphere1.position.x = 1.5;
		sphere1.rotate(new Vector3(1, 0, 0), 1);
		sphere1.rotate(new Vector3(0, 1, 0), 1);
		sphere2.position.y = 1;
		sphere2.position.x = -1;

		// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
		const ground = Mesh.CreateGroundFromHeightMap("ground1", grassDisplacement, 20, 20, 100, 0, 0.3, scene);
		ground.material = getGrassMaterial(scene, 10, 1);
		ground.receiveShadows = true;

		const shadowGenerator = new ShadowGenerator(1024, light2);
		shadowGenerator.getShadowMap().renderList.push(sphere1);
		shadowGenerator.getShadowMap().renderList.push(sphere2);

		const skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
		skybox.disableLighting = true;
		skybox.infiniteDistance = true;
		skybox.material = getSkyBoxMaterial(scene);

		// physics
		scene.gravity = new Vector3(0, -9.81, 0);
		scene.collisionsEnabled = true;
		
		// collisions
		ground.checkCollisions = true;
		camera.checkCollisions = true;
		sphere1.checkCollisions = true;
		sphere2.checkCollisions = true;

		let cameraForwardRayPosition = camera.getForwardRay().direction;

		scene.registerBeforeRender(function() {
			cameraForwardRayPosition = camera.getForwardRay().direction;
		});

		// control
		let wPress = new ExecuteCodeAction(
			{
				trigger: ActionManager.OnKeyDownTrigger,
				parameter: "w"
			},
			() => { 
				sphere1.position.x += cameraForwardRayPosition.x + 1;
				sphere1.position.z += cameraForwardRayPosition.z + 1;
			}
		)

		let aPress = new ExecuteCodeAction(
			{
				trigger: ActionManager.OnKeyDownTrigger,
				parameter: "a"
			},
			() => { 
				sphere1.position.z += 1;
			}
		)

		let sPress = new ExecuteCodeAction(
			{
				trigger: ActionManager.OnKeyDownTrigger,
				parameter: "s"
			},
			() => { 
				sphere1.position.x += cameraForwardRayPosition.x - 1;
				sphere1.position.z += cameraForwardRayPosition.z - 1;
			}
		)

		let dPress = new ExecuteCodeAction(
			{
				trigger: ActionManager.OnKeyDownTrigger,
				parameter: "d"
			},
			() => sphere1.position.z -= 1,
		)
		
		window.addEventListener("keypress", (event) => {
			if (event.key === "w") {
				wPress.execute();
			}
			if (event.key === "a") {
				aPress.execute();
			}
			if (event.key === "s") {
				sPress.execute();
			}
			if (event.key === "d") {
				dPress.execute();
			}
		});

		engine.runRenderLoop(() => {
			if (scene) {
				scene.render();
				this.setState({ fpsCounter: engine.getFps().toFixed() + " fps"});
			}
		});
	}

	render() {
		const {
			fpsCounter,
		} = this.state;   

		return <>
			<div className="fps-counter">{fpsCounter}</div>
			<SceneComponent onSceneMount={this.onSceneMount} />
		</>
	}
}

export default SceneLoader;