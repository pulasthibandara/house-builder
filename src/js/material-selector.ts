require('./material-selector.scss');
import { sceneState } from './scene-state-store';
import { buildingMaterials, buildingShapes } from './material';

/**
 * Main material selector controller.
 */
export class MaterialSelector
{

    private materialSelectorContainer = 
        <HTMLElement>document.querySelector( '#control-wrapper #material-selector' );

    private shapeSelectorContainer = 
        <HTMLElement>document.querySelector( '#control-wrapper #shape-selector' ); 

    constructor ()
    {
    }

    /**
     * create control inputs and register events.
     */
    renderControls ()
    {
        // create material controls
        buildingMaterials.forEach( ( material, idx ) => {
            const label = document.createElement('label'),
                radio = document.createElement('input'),
                text = document.createTextNode( material.name );

            radio.type = 'radio';
            radio.name = 'material-selector';
            radio.checked = idx === 0;
            radio.addEventListener('change', (e) => {
                sceneState.selectedMaterial = material;
            });

            label.appendChild( radio );
            label.appendChild( text );

            this.materialSelectorContainer.appendChild( label );
        } );

        // create shape controls
        buildingShapes.forEach( ( shape, idx ) => {
            const label = document.createElement('label'),
                radio = document.createElement('input'),
                text = document.createTextNode( shape.name );

            radio.type = 'radio';
            radio.name = 'shape-selector';
            radio.checked = idx === 0;
            radio.addEventListener('change', (e) => {
                sceneState.selectedShape = shape;
            });

            label.appendChild( radio );
            label.appendChild( text );

            this.shapeSelectorContainer.appendChild( label );
        } );
    }
    
}