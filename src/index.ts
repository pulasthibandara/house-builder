require('./index.scss');
import { initScene } from './js/scene';
import { MaterialSelector } from './js/material-selector';

window.onload = initScene;

// render selection control panel
let materialSlector = new MaterialSelector();
materialSlector.renderControls();