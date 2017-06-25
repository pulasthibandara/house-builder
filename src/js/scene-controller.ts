import { Mesh, BoxGeometry } from 'three';
import { sceneState, ISceneState } from './scene-state-store';
import { raycaster, camera, rollOverMesh, scene, plane } from './scene';
import { buildingMaterials } from './material';


/**
 * Main scene controller
 */
class SceneController {

    constructor ( private sceneStateStore: ISceneState ) 
    {

    }

    /**
     * Draw rollover box on mouse position.
     * @param event mouse move event
     */
    placeMousePointer ( event: MouseEvent )
    {

        let mouse = this.sceneStateStore.mouse;

        event.preventDefault();
        mouse.set( 
            ( event.clientX / window.innerWidth ) * 2 - 1, 
            - ( event.clientY / window.innerHeight ) * 2 + 1 );

        raycaster.setFromCamera( mouse, camera );

        let intersects = raycaster.intersectObjects( this.sceneStateStore.sceneObjects );
        
        if ( intersects.length >  0 ) {
            let intersect = intersects[ 0 ];

            if( this.sceneStateStore.removeMode && !this.isPlane(intersect) )
            {
                rollOverMesh.position.copy( intersect.object.position );
            } else {
                rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
                rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
            }
        }

    }

    /**
     * Insert or remove elements at the mouse click position.
     * @param event Mouse click event
     */
    onMouseClick ( event: MouseEvent )
    {
        event.preventDefault();
        let mouse = this.sceneStateStore.mouse;

        // set new mouse vector
        mouse.set( 
            ( event.clientX / window.innerWidth ) * 2 - 1, 
            - ( event.clientY / window.innerHeight ) * 2 + 1 );

        raycaster.setFromCamera( mouse, camera );

        let intersects = raycaster.intersectObjects( this.sceneStateStore.sceneObjects );

        // if the click intersetcts
        if ( intersects.length > 0 ) {
            let intersect = intersects[ 0 ];

            // if on the removel mode and the intersect is not the plane remove
            // that voxle
            if ( this.sceneStateStore.removeMode ) {
                if ( !this.isPlane( intersect ) ) {
                    scene.remove( intersect.object );
                    this.sceneStateStore.sceneObjects.splice( 
                        this.sceneStateStore.sceneObjects.indexOf( <Mesh>(intersect.object) ), 1 );
                }

            // insert a voxel with the selected shape and material
            } else {
                let voxel = new Mesh( 
                    this.sceneStateStore.selectedShape, 
                    this.sceneStateStore.selectedMaterial );

                voxel.position.copy( intersect.point ).add( intersect.face.normal );
                voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
                scene.add( voxel );
                this.sceneStateStore.sceneObjects.push( voxel );
            }
            
        }
    }

    /**
     * If shift key is pressed enter into removal mode by setting the global state.
     * @param event keydown event
     */
    handleKeydown ( event: KeyboardEvent )
    {
        if( event.keyCode == 16 ) {
            this.sceneStateStore.removeMode = true;
        }
    }

    /**
     * When shift key is released disable remove mode.
     * @param event keyup event
     */
    handleKeyup ( event: KeyboardEvent )
    {
        if( event.keyCode == 16 ) {
            this.sceneStateStore.removeMode = false;   
        }
    }

    /**
     * Returns if the intersect onject is the plane.
     * @param intersect interset object
     */
    private isPlane ( intersect: any ): boolean
    {
        return intersect.object == plane;
    }

}

let sceneController = new SceneController( sceneState );
export { sceneController };