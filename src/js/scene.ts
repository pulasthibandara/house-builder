import { 
    Scene, 
    WebGLRenderer, 
    AmbientLight,
    DirectionalLight,
    Renderer, 
    PerspectiveCamera, 
    MeshLambertMaterial,
    MeshBasicMaterial,
    Mesh, 
    GridHelper,
    Vector3,
    Vector2,
    Color,
    Raycaster,
    PlaneBufferGeometry,
    BoxGeometry } from 'three';

import { OrbitControls } from 'three-orbitcontrols-ts';

import { buildingMaterials } from './material';

import { sceneController } from './scene-controller';

import { sceneState } from './scene-state-store';

export const scene = new Scene(),
    renderer = new WebGLRenderer( { antialias: true } ),
    ambientLight = new AmbientLight(0xffffff, .4),
    directionalLight = new DirectionalLight(0xFFFFFF, .6),
    camera = 
        new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 10000 ),
    stage = <HTMLElement> document.getElementById('scene-stage');

export let rollOverMesh: Mesh, 
    cubeGeo: BoxGeometry, 
    cubeMaterial: MeshBasicMaterial, 
    gridHelper: GridHelper, 
    raycaster: Raycaster, 
    controls: OrbitControls,
    plane: Mesh;


/**
 * initialize THREEjs scene
 */
export function initScene()
{
    // setup renderer / stage/ scene
    renderer.setClearColor( 0xf0f0f0 );
	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    stage.appendChild(renderer.domElement);
    scene.background = new Color(0xffffff);

    // setup ambient
    scene.add( ambientLight );

    // setup directional light
    directionalLight.position.set(1, 2, 1).normalize();
    scene.add( directionalLight );

    // setup camera
    camera.position.set(0, 750, 1000);
    camera.lookAt( new Vector3(0, 0, 0) );
    scene.add(camera);

    // setup controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 0;
    controls.maxDistance = Infinity;
    this.enableZoom = true; 
    this.zoomSpeed = 1.0;

    // rollover box
    rollOverMesh = new Mesh( 
        new BoxGeometry( 50, 50, 50 ), 
        new MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ) );
    scene.add( rollOverMesh );
    
    // grid
    gridHelper = new GridHelper( 1000, 20 );
    scene.add( gridHelper );

    let geometry = new PlaneBufferGeometry( 1000, 1000 );
    geometry.rotateX( - Math.PI / 2 );
    plane = new Mesh( geometry, new MeshBasicMaterial( { color: 0x00ff00, visible: true } ) );
    scene.add( plane );
    sceneState.sceneObjects.push( plane );

    // set interactive helpers
    raycaster = new Raycaster();
    
    registerEvents();
    render();
}

/**
 * register global event listeners
 */
function registerEvents () 
{
    // register events
    document.addEventListener( 
        'mousemove', 
        sceneController.placeMousePointer.bind( sceneController ) );

    document.addEventListener( 
        'mousedown', 
        sceneController.onMouseClick.bind( sceneController ) );

    document.addEventListener( 
        'keydown', 
        sceneController.handleKeydown.bind( sceneController ) );

    document.addEventListener( 
        'keyup', 
        sceneController.handleKeyup.bind( sceneController ) );
}

function render()
{
    renderer.render(scene,camera);
    window.requestAnimationFrame(render);
}