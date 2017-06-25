import { Mesh, BoxGeometry } from 'three';
import { sceneState, ISceneState } from './scene-state-store';
import { raycaster, camera, rollOverMesh, scene, plane } from './scene';
import { buildingMaterials } from './material';


class SceneController {

    private voxelGeometry = new BoxGeometry(50,50,50);

    constructor ( private sceneStateStore: ISceneState ) 
    {

    }

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
        if ( intersects.length > 0 ) {
            let intersect = intersects[ 0 ];

            if ( this.sceneStateStore.removeMode ) {
                if ( !this.isPlane( intersect ) ) {
                    scene.remove( intersect.object );
                    this.sceneStateStore.sceneObjects.splice( 
                        this.sceneStateStore.sceneObjects.indexOf( <Mesh>(intersect.object) ), 1 );
                }
            } else {
                let voxel = new Mesh( this.voxelGeometry , this.sceneStateStore.selectedMaterial );
                voxel.position.copy( intersect.point ).add( intersect.face.normal );
                voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
                scene.add( voxel );
                this.sceneStateStore.sceneObjects.push( voxel );
            }
            
        }
    }

    handleKeydown ( event: KeyboardEvent )
    {
        if( event.keyCode == 16 ) {
            this.sceneStateStore.removeMode = true;
        }
    }

    handleKeyup ( event: KeyboardEvent )
    {
        if( event.keyCode == 16 ) {
            this.sceneStateStore.removeMode = false;   
        }
    }

    private isPlane ( intersect: any ): boolean
    {
        return intersect.object == plane;
    }

}

let sceneController = new SceneController( sceneState );
export { sceneController };