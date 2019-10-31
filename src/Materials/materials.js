import { 
	StandardMaterial,
    Texture,
    CubeTexture,
    Color3,
} from '@babylonjs/core';


export const getRockMaterial = (scene, textureScale, mode) => {
    textureScale = textureScale || 1;

    const diffuseTexture = require('../assets/materials/rock/Rock_028_COLOR.jpg');
    const bumpTexture = require('../assets/materials/rock/Rock_028_NORM.jpg');
    const occTexture = require('../assets/materials/rock/Rock_028_OCC.jpg');
    const roughnessTexture = require('../assets/materials/rock/Rock_028_ROUGH.jpg');

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

    const diffuseTexture = require('../assets/materials/grass/Grass_001_COLOR.jpg');
    const bumpTexture = require('../assets/materials/grass/Grass_001_NORM.jpg');
    const occTexture = require('../assets/materials/grass/Grass_001_OCC.jpg');
    const roughnessTexture = require('../assets/materials/grass/Grass_001_ROUGH.jpg');

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
    const roughnessTexture = require('../assets/materials/sky/Sky-1.jpg');

    const skyboxMaterial = new StandardMaterial("skyBox", scene);
    
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new Texture(roughnessTexture, scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
	skyboxMaterial.specularColor = new Color3(0, 0, 0);
    
    return skyboxMaterial;
}