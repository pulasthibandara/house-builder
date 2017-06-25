webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	__webpack_require__(1);
	var scene_1 = __webpack_require__(5);
	var material_selector_1 = __webpack_require__(13);
	window.onload = scene_1.initScene;
	// render selection control panel
	var materialSlector = new material_selector_1.MaterialSelector();
	materialSlector.renderControls();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!../node_modules/extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!../node_modules/style-loader/index.js!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!../node_modules/extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!../node_modules/style-loader/index.js!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var three_1 = __webpack_require__(6);
	var three_orbitcontrols_ts_1 = __webpack_require__(7);
	var scene_controller_1 = __webpack_require__(9);
	var scene_state_store_1 = __webpack_require__(10);
	exports.scene = new three_1.Scene(), exports.renderer = new three_1.WebGLRenderer({ antialias: true }), exports.ambientLight = new three_1.AmbientLight(0xffffff, .4), exports.directionalLight = new three_1.DirectionalLight(0xFFFFFF, .6), exports.camera = new three_1.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000), exports.stage = document.getElementById('scene-stage');
	/**
	 * initialize THREEjs scene
	 */
	function initScene() {
	    // setup renderer / stage/ scene
	    exports.renderer.setClearColor(0xf0f0f0);
	    exports.renderer.setPixelRatio(window.devicePixelRatio);
	    exports.renderer.setSize(window.innerWidth, window.innerHeight);
	    exports.stage.appendChild(exports.renderer.domElement);
	    exports.scene.background = new three_1.Color(0xffffff);
	    // setup ambient
	    exports.scene.add(exports.ambientLight);
	    // setup directional light
	    exports.directionalLight.position.set(1, 2, 1).normalize();
	    exports.scene.add(exports.directionalLight);
	    // setup camera
	    exports.camera.position.set(0, 750, 1000);
	    exports.camera.lookAt(new three_1.Vector3(0, 0, 0));
	    exports.scene.add(exports.camera);
	    // setup controls
	    exports.controls = new three_orbitcontrols_ts_1.OrbitControls(exports.camera, exports.renderer.domElement);
	    exports.controls.minPolarAngle = 0;
	    exports.controls.maxPolarAngle = Math.PI / 2;
	    exports.controls.minDistance = 0;
	    exports.controls.maxDistance = Infinity;
	    this.enableZoom = true;
	    this.zoomSpeed = 1.0;
	    // rollover box
	    exports.rollOverMesh = new three_1.Mesh(new three_1.BoxGeometry(50, 50, 50), new three_1.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true }));
	    exports.scene.add(exports.rollOverMesh);
	    // grid
	    exports.gridHelper = new three_1.GridHelper(1000, 20);
	    exports.scene.add(exports.gridHelper);
	    var geometry = new three_1.PlaneBufferGeometry(1000, 1000);
	    geometry.rotateX(-Math.PI / 2);
	    exports.plane = new three_1.Mesh(geometry, new three_1.MeshBasicMaterial({ color: 0x00ff00, visible: true }));
	    exports.scene.add(exports.plane);
	    scene_state_store_1.sceneState.sceneObjects.push(exports.plane);
	    // set interactive helpers
	    exports.raycaster = new three_1.Raycaster();
	    registerEvents();
	    render();
	}
	exports.initScene = initScene;
	/**
	 * register global event listeners
	 */
	function registerEvents() {
	    // register events
	    document.addEventListener('mousemove', scene_controller_1.sceneController.placeMousePointer.bind(scene_controller_1.sceneController));
	    document.addEventListener('mousedown', scene_controller_1.sceneController.onMouseClick.bind(scene_controller_1.sceneController));
	    document.addEventListener('keydown', scene_controller_1.sceneController.handleKeydown.bind(scene_controller_1.sceneController));
	    document.addEventListener('keyup', scene_controller_1.sceneController.handleKeyup.bind(scene_controller_1.sceneController));
	}
	function render() {
	    exports.renderer.render(exports.scene, exports.camera);
	    window.requestAnimationFrame(render);
	}


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var three_1 = __webpack_require__(6);
	var scene_state_store_1 = __webpack_require__(10);
	var scene_1 = __webpack_require__(5);
	/**
	 * Main scene controller
	 */
	var SceneController = (function () {
	    function SceneController(sceneStateStore) {
	        this.sceneStateStore = sceneStateStore;
	    }
	    /**
	     * Draw rollover box on mouse position.
	     * @param event mouse move event
	     */
	    SceneController.prototype.placeMousePointer = function (event) {
	        var mouse = this.sceneStateStore.mouse;
	        event.preventDefault();
	        mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
	        scene_1.raycaster.setFromCamera(mouse, scene_1.camera);
	        var intersects = scene_1.raycaster.intersectObjects(this.sceneStateStore.sceneObjects);
	        if (intersects.length > 0) {
	            var intersect = intersects[0];
	            if (this.sceneStateStore.removeMode && !this.isPlane(intersect)) {
	                scene_1.rollOverMesh.position.copy(intersect.object.position);
	            }
	            else {
	                scene_1.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
	                scene_1.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
	            }
	        }
	    };
	    /**
	     * Insert or remove elements at the mouse click position.
	     * @param event Mouse click event
	     */
	    SceneController.prototype.onMouseClick = function (event) {
	        event.preventDefault();
	        var mouse = this.sceneStateStore.mouse;
	        // set new mouse vector
	        mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
	        scene_1.raycaster.setFromCamera(mouse, scene_1.camera);
	        var intersects = scene_1.raycaster.intersectObjects(this.sceneStateStore.sceneObjects);
	        // if the click intersetcts
	        if (intersects.length > 0) {
	            var intersect = intersects[0];
	            // if on the removel mode and the intersect is not the plane remove
	            // that voxle
	            if (this.sceneStateStore.removeMode) {
	                if (!this.isPlane(intersect)) {
	                    scene_1.scene.remove(intersect.object);
	                    this.sceneStateStore.sceneObjects.splice(this.sceneStateStore.sceneObjects.indexOf((intersect.object)), 1);
	                }
	                // insert a voxel with the selected shape and material
	            }
	            else {
	                var voxel = new three_1.Mesh(this.sceneStateStore.selectedShape, this.sceneStateStore.selectedMaterial);
	                voxel.position.copy(intersect.point).add(intersect.face.normal);
	                voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
	                scene_1.scene.add(voxel);
	                this.sceneStateStore.sceneObjects.push(voxel);
	            }
	        }
	    };
	    /**
	     * If shift key is pressed enter into removal mode by setting the global state.
	     * @param event keydown event
	     */
	    SceneController.prototype.handleKeydown = function (event) {
	        if (event.keyCode == 16) {
	            this.sceneStateStore.removeMode = true;
	        }
	    };
	    /**
	     * When shift key is released disable remove mode.
	     * @param event keyup event
	     */
	    SceneController.prototype.handleKeyup = function (event) {
	        if (event.keyCode == 16) {
	            this.sceneStateStore.removeMode = false;
	        }
	    };
	    /**
	     * Returns if the intersect onject is the plane.
	     * @param intersect interset object
	     */
	    SceneController.prototype.isPlane = function (intersect) {
	        return intersect.object == scene_1.plane;
	    };
	    return SceneController;
	}());
	var sceneController = new SceneController(scene_state_store_1.sceneState);
	exports.sceneController = sceneController;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var three_1 = __webpack_require__(6);
	var material_1 = __webpack_require__(11);
	/**
	 * The global state of the scene
	 */
	var state = {
	    mouse: new three_1.Vector2(),
	    removeMode: false,
	    sceneObjects: [],
	    selectedMaterial: material_1.buildingMaterials[0],
	    selectedShape: material_1.buildingShapes[0]
	};
	exports.sceneState = state;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * The module registers shapes and materials that are used in the scene
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	var three_1 = __webpack_require__(6);
	var buildingMaterials = [
	    new three_1.MeshLambertMaterial({
	        color: 0xb7a205,
	        name: 'Brick',
	        map: new three_1.TextureLoader().load(__webpack_require__(12))
	    }),
	    new three_1.MeshLambertMaterial({
	        name: 'Glass',
	        color: 0x9eefea,
	        opacity: 0.8,
	        transparent: true
	    }),
	    new three_1.MeshLambertMaterial({
	        name: 'Cement',
	        color: 0xffffff,
	    })
	];
	exports.buildingMaterials = buildingMaterials;
	var buildingShapes = [];
	exports.buildingShapes = buildingShapes;
	var cube = new three_1.BoxGeometry(50, 50, 50);
	cube.name = 'Cube';
	buildingShapes.push(cube);
	var cylinder = new three_1.CylinderGeometry(25, 25, 50, 32);
	cylinder.name = 'Cylinder';
	buildingShapes.push(cylinder);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/brick-c04c0effa5b4aa2c196e75b08d83c65b.jpg";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	__webpack_require__(14);
	var scene_state_store_1 = __webpack_require__(10);
	var material_1 = __webpack_require__(11);
	/**
	 * Main material selector controller.
	 */
	var MaterialSelector = (function () {
	    function MaterialSelector() {
	        this.materialSelectorContainer = document.querySelector('#control-wrapper #material-selector');
	        this.shapeSelectorContainer = document.querySelector('#control-wrapper #shape-selector');
	    }
	    /**
	     * create control inputs and register events.
	     */
	    MaterialSelector.prototype.renderControls = function () {
	        var _this = this;
	        // create material controls
	        material_1.buildingMaterials.forEach(function (material, idx) {
	            var label = document.createElement('label'), radio = document.createElement('input'), text = document.createTextNode(material.name);
	            radio.type = 'radio';
	            radio.name = 'material-selector';
	            radio.checked = idx === 0;
	            radio.addEventListener('change', function (e) {
	                scene_state_store_1.sceneState.selectedMaterial = material;
	            });
	            label.appendChild(radio);
	            label.appendChild(text);
	            _this.materialSelectorContainer.appendChild(label);
	        });
	        // create shape controls
	        material_1.buildingShapes.forEach(function (shape, idx) {
	            var label = document.createElement('label'), radio = document.createElement('input'), text = document.createTextNode(shape.name);
	            radio.type = 'radio';
	            radio.name = 'shape-selector';
	            radio.checked = idx === 0;
	            radio.addEventListener('change', function (e) {
	                scene_state_store_1.sceneState.selectedShape = shape;
	            });
	            label.appendChild(radio);
	            label.appendChild(text);
	            _this.shapeSelectorContainer.appendChild(label);
	        });
	    };
	    return MaterialSelector;
	}());
	exports.MaterialSelector = MaterialSelector;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!../../node_modules/extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!../../node_modules/style-loader/index.js!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./material-selector.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!../../node_modules/extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!../../node_modules/style-loader/index.js!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./material-selector.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ })
]);
//# sourceMappingURL=app-11822e1b8faffd166ce7.js.map