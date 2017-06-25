import {
    Material,
    MeshLambertMaterial,
    BoxGeometry,
    Geometry,
    TextureLoader
} from 'three';

const buildingMaterials: Material[] = [
    new MeshLambertMaterial({ 
        color: 0x00FFFF, 
        name: 'brick', 
        // map: new TextureLoader().load( "textures/square-outline-textured.png" ) 
    }),
    new MeshLambertMaterial({ color: 0x0000FF, name: 'ceeling' }),
    new MeshLambertMaterial({ color: 0xFFFF00, name: 'glass' })
];

export { buildingMaterials }