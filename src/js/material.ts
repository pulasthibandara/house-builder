/**
 * The module registers shapes and materials that are used in the scene
 */

import {
    Material,
    MeshLambertMaterial,
    MeshPhongMaterial,
    BoxGeometry,
    Geometry,
    CylinderGeometry,
    TextureLoader
} from 'three';

const buildingMaterials: Material[] = [
    new MeshLambertMaterial({ 
        color: 0xb7a205, 
        name: 'Brick', 
        map: new TextureLoader().load( require('../textures/brick.jpg') ) 
    }),
    new MeshLambertMaterial({
        name: 'Glass',
        color: 0x9eefea,
        opacity: 0.8,
        transparent: true
    }),
    new MeshLambertMaterial({ 
        name: 'Cement',
        color: 0xffffff,
    })
];

const buildingShapes: Geometry[] = [];

const cube = new BoxGeometry(50,50,50);
cube.name = 'Cube';
buildingShapes.push( cube );

const cylinder = new CylinderGeometry(25,25,50,32);
cylinder.name = 'Cylinder';
buildingShapes.push( cylinder );

export { buildingMaterials, buildingShapes }