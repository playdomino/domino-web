import { 
	StandardMaterial,
    Texture,
    CubeTexture,
    Color3,
    Vector3,
} from '@babylonjs/core';


export const getRockMaterial = (scene, textureScale, mode) => {
    textureScale = textureScale || 1;

    const diffuseTexture = require('../assets/textures/rock/Rock_028_COLOR.jpg');
    const bumpTexture = require('../assets/textures/rock/Rock_028_NORM.jpg');
    const occTexture = require('../assets/textures/rock/Rock_028_OCC.jpg');
    const roughnessTexture = require('../assets/textures/rock/Rock_028_ROUGH.jpg');

    const bumpMaterial = new StandardMaterial("rockMaterial", scene);

    bumpMaterial.diffuseTexture = new Texture(diffuseTexture, scene);
    bumpMaterial.diffuseTexture.uScale = textureScale;
    bumpMaterial.diffuseTexture.vScale = textureScale;
    bumpMaterial.diffuseTexture.coordinatesMode = mode;
    bumpMaterial.bumpTexture = new Texture(bumpTexture, scene);
    bumpMaterial.bumpTexture.uScale = textureScale;
    bumpMaterial.bumpTexture.vScale = textureScale;
    bumpMaterial.bumpTexture.coordinatesMode = mode;
    bumpMaterial.specularTexture = new Texture(roughnessTexture, scene);
    bumpMaterial.specularTexture.uScale = textureScale;
    bumpMaterial.specularTexture.vScale = textureScale;
    bumpMaterial.specularTexture.coordinatesMode = mode;
    bumpMaterial.ambientTexture = new Texture(occTexture, scene);
    bumpMaterial.ambientTexture.uScale = textureScale;
    bumpMaterial.ambientTexture.vScale = textureScale;
    bumpMaterial.ambientTexture.coordinatesMode = mode;

    return bumpMaterial;
};

export const getGrassMaterial = (scene, textureScale) => {
    textureScale = textureScale || 1;

    const diffuseTexture = require('../assets/textures/grass/Grass_001_COLOR.jpg');
    const bumpTexture = require('../assets/textures/grass/Grass_001_NORM.jpg');
    const occTexture = require('../assets/textures/grass/Grass_001_OCC.jpg');
    const roughnessTexture = require('../assets/textures/grass/Grass_001_ROUGH.jpg');

    const bumpMaterial = new StandardMaterial("grassMaterial", scene);

    bumpMaterial.diffuseTexture = new Texture(diffuseTexture, scene);
    bumpMaterial.diffuseTexture.uScale = textureScale;
    bumpMaterial.diffuseTexture.vScale = textureScale;
    bumpMaterial.bumpTexture = new Texture(bumpTexture, scene);
    bumpMaterial.bumpTexture.uScale = textureScale;
    bumpMaterial.bumpTexture.vScale = textureScale;
    bumpMaterial.specularTexture = new Texture(roughnessTexture, scene);
    bumpMaterial.specularTexture.uScale = textureScale;
    bumpMaterial.specularTexture.vScale = textureScale;
    bumpMaterial.ambientTexture = new Texture(occTexture, scene);
    bumpMaterial.ambientTexture.uScale = textureScale;
    bumpMaterial.ambientTexture.vScale = textureScale;

    return bumpMaterial;
};

export const getSkyBoxMaterial = (scene) => {
    const skyboxMaterial = new StandardMaterial("skyMaterial", scene);
    const diffuseTexture = require('../assets/textures/sky/sky_cube.jpg');
    const pxTexture = require('../assets/textures/sky/sky_cube_px.jpg');
    const pyTexture = require('../assets/textures/sky/sky_cube_py.jpg');
    const pzTexture = require('../assets/textures/sky/sky_cube_pz.jpg');
    const nxTexture = require('../assets/textures/sky/sky_cube_nx.jpg');
    const nyTexture = require('../assets/textures/sky/sky_cube_ny.jpg');
    const nzTexture = require('../assets/textures/sky/sky_cube_nz.jpg');
    
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture(
        '../assets/textures/sky/sky_cube',
        scene,
        null,
        null,
        [
            pxTexture,
            pyTexture,
            pzTexture,
            nxTexture,
            nyTexture,
            nzTexture,
        ],
    );
	skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
	skyboxMaterial.specularColor = new Color3(0, 0, 0);
    
    return skyboxMaterial;
}