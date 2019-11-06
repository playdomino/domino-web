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
	PhysicsImpostor,
	Matrix,
	Quaternion,
	Tools,
} from '@babylonjs/core';

import SceneComponent from '../SceneComponent/SceneComponent'; // import the component above linking to file we just created.

import {
	getRockMaterial,
	getGrassMaterial,
	getSkyBoxMaterial,
} from '../../Materials/materials';

const grassDisplacement = require('../../assets/textures/grass/Grass_001_DISP.png');
const rockDisplacement = require('../../assets/textures/rock/Rock_028_DISP.png');
window.CANNON = require( 'cannon' );

class SceneLoader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fpsCounter: 0,
			score1: 0,
			score2: 0,
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
		const sphere1 = Mesh.CreateSphere("sphere1", 60, 2, scene, true);
		sphere1.applyDisplacementMap(rockDisplacement, -0.5, 0.2);
		const sphere2 = Mesh.CreateSphere("sphere2", 60, 2, scene, true);
		sphere2.applyDisplacementMap(rockDisplacement, -0.5, 0.2);

		sphere1.material = getRockMaterial(scene, 3);
		sphere2.material = getRockMaterial(scene, 3);

		// physics
		scene.enablePhysics();		
		scene.gravity = new Vector3(0, -9.81, 0);
		scene.collisionsEnabled = true;
		
		sphere1.physicsImpostor = new PhysicsImpostor(sphere1, PhysicsImpostor.SphereImpostor, { mass: 2, restitution: 0.8 }, scene);
		sphere2.physicsImpostor = new PhysicsImpostor(sphere2, PhysicsImpostor.SphereImpostor, { mass: 2, restitution: 0.8 }, scene);		
				
		const setInitialPosition = () => {
			// Move the sphere upward 1/2 its height
			sphere1.position.y = 4;
			sphere1.position.x = 1.5;
			sphere1.position.z = 0;
			sphere1.rotate(new Vector3(1, 0, 0), 1);
			sphere2.position.y = 4;
			sphere2.position.x = -1;
			sphere2.position.z = 0;
			sphere2.rotate(new Vector3(0, 1, 0), 1);
			sphere1.physicsImpostor.setAngularVelocity( Vector3.Zero() );
			sphere1.physicsImpostor.setLinearVelocity( Vector3.Zero() );
			sphere2.physicsImpostor.setAngularVelocity( Vector3.Zero() );
			sphere2.physicsImpostor.setLinearVelocity( Vector3.Zero() );
		}

		setInitialPosition();

		// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
		const ground = Mesh.CreateGroundFromHeightMap("ground1", grassDisplacement, 20, 20, 100, 0, 0.3, scene, false, () => {
			ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.HeightmapImpostor, { mass: 0, restitution: 0.2 }, scene);	
		});
		ground.material = getGrassMaterial(scene, 10, 1);
		ground.receiveShadows = true;

		const shadowGenerator = new ShadowGenerator(1024, light2);
		shadowGenerator.getShadowMap().renderList.push(sphere1);
		shadowGenerator.getShadowMap().renderList.push(sphere2);

		const skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
		skybox.disableLighting = true;
		skybox.infiniteDistance = true;
		skybox.material = getSkyBoxMaterial(scene);

		// collisions
		ground.checkCollisions = true;
		// sphere1.checkCollisions = true;
		// sphere2.checkCollisions = true;
		camera.checkCollisions = true;

		let cameraForwardRayPosition;

		// control
		let wPress = (mesh, impulseIntensity) => {
			mesh.applyImpulse(new Vector3(cameraForwardRayPosition.x + impulseIntensity, 0, cameraForwardRayPosition.z + impulseIntensity), 
			mesh.getAbsolutePosition());
		}
		let sPress = (mesh, impulseIntensity) => {
			mesh.applyImpulse(new Vector3(-cameraForwardRayPosition.x - impulseIntensity, 0, -cameraForwardRayPosition.z - impulseIntensity), 
			mesh.getAbsolutePosition());
		}
		let aPress = (mesh, impulseIntensity) => {
			mesh.applyImpulse(new Vector3(-cameraForwardRayPosition.x - impulseIntensity, 0, cameraForwardRayPosition.z + impulseIntensity), 
			mesh.getAbsolutePosition());
		}
		let dPress = (mesh, impulseIntensity) => {
			mesh.applyImpulse(new Vector3(cameraForwardRayPosition.x + impulseIntensity, 0, -cameraForwardRayPosition.z - impulseIntensity), 
			mesh.getAbsolutePosition());
		}
		let fPress = (mesh, impulseIntensity) => {
			if (mesh.position.y > -1 && mesh.position.y < 1.5) {
				mesh.applyImpulse(new Vector3(0, 15, 0), 
				mesh.getAbsolutePosition());
			}
		}

		
		window.addEventListener("keypress", (event) => {
			const forceIntensity = 2;

			if (event.key === "w") {
				wPress(sphere1, forceIntensity);
			}
			if (event.key === "a") {
				aPress(sphere1, forceIntensity);
			}
			if (event.key === "s") {
				sPress(sphere1, forceIntensity);
			}
			if (event.key === "d") {
				dPress(sphere1, forceIntensity);
			}
			if (event.key === "f") {
				fPress(sphere1, forceIntensity);
			}

			if (event.key === "i") {
				wPress(sphere2, forceIntensity);
			}
			if (event.key === "j") {
				aPress(sphere2, forceIntensity);
			}
			if (event.key === "k") {
				sPress(sphere2, forceIntensity);
			}
			if (event.key === "l") {
				dPress(sphere2, forceIntensity);
			}
			if (event.key === ";") {
				fPress(sphere2, forceIntensity);
			}
		});

		scene.registerBeforeRender(() => {
			const {
				score1,
				score2,
			} = this.state;

			cameraForwardRayPosition = camera.getForwardRay().direction;

			if (sphere1.position.y < -20 || sphere2.position.y < -20) {
				this.setState({
					score1: sphere2.position.y < -20 ? score1 + 1 : score1,
					score2: sphere1.position.y < -20 ? score2 + 1 : score2,
				});
				setInitialPosition();
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
			score1,
			score2,
		} = this.state;   

		return <>
			<div className="fps-counter">
				<div>{fpsCounter}</div>
				<br/>
				<div>Player 1: {score1}</div>
				<div>w a s d and f to jump</div>
				<br />
				<div>Player 2: {score2}</div>
				<div>i j k l and ; to jump</div>
			</div>
			<SceneComponent onSceneMount={this.onSceneMount} />
		</>
	}
}

export default SceneLoader;