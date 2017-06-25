require('./material-selector.scss');
import { sceneState } from './scene-state-store';
import { buildingMaterials } from './material';

export class MaterialSelector
{

    private selectorContainer: HTMLElement;

    constructor ( container: HTMLElement )
    {
        this.selectorContainer = container;
    }

    renderControls ()
    {
        buildingMaterials.forEach( ( material, idx ) => {
            const label = document.createElement('label'),
                radio = document.createElement('input'),
                text = document.createTextNode( material.name );

            radio.type = 'radio';
            radio.name = 'material-selector';
            radio.addEventListener('change', (e) => {
                sceneState.selectedMaterial = material;
            });

            label.appendChild( radio );
            label.appendChild( text );

            this.selectorContainer.appendChild( label );
        } );
    }
    
}