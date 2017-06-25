import {
    Vector2,
    Mesh,
    Material,
} from 'three';

import { buildingMaterials } from './material';

export interface ISceneState {
    mouse: Vector2,
    removeMode: boolean,
    sceneObjects: Mesh[],
    selectedMaterial: Material
}

const state: ISceneState = {
    mouse: new Vector2(),
    removeMode: false,
    sceneObjects: [],
    selectedMaterial: buildingMaterials[0]
}

export { state as sceneState };