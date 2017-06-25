import {
    Vector2,
    Mesh,
    Material,
    Geometry
} from 'three';

import { buildingMaterials, buildingShapes } from './material';

export interface ISceneState {
    mouse: Vector2,
    removeMode: boolean,
    sceneObjects: Mesh[],
    selectedMaterial: Material,
    selectedShape: Geometry,
}

/**
 * The global state of the scene
 */
const state: ISceneState = {
    mouse: new Vector2(),
    removeMode: false,
    sceneObjects: [],
    selectedMaterial: buildingMaterials[0],
    selectedShape: buildingShapes[0]
}

export { state as sceneState };