/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _ConfigManager = __webpack_require__(1);

	var _ConfigManager2 = _interopRequireDefault(_ConfigManager);

	var _Gui = __webpack_require__(3);

	var _Gui2 = _interopRequireDefault(_Gui);

	var _Menu = __webpack_require__(10);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _menus = __webpack_require__(13);

	var _menus2 = _interopRequireDefault(_menus);

	var _KeyBoardManager = __webpack_require__(2);

	var _KeyBoardManager2 = _interopRequireDefault(_KeyBoardManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Game() {
	  this.loop = 0;
	  this.score = 0;
	  this.paused = false;
	  this.current_screen = {};
	  this.skipped_frames = 0;
	};
	Game.prototype = {
	  init: function init() {
	    var game = this;

	    if (!localStorage.getItem('maxlevel')) {
	      localStorage.setItem('maxlevel', 1);
	    }
	    if (localStorage.getItem('highscores')) {
	      window.env.highscores = JSON.parse(localStorage.getItem('highscores'));
	    }
	    window.env.config.load();
	    this.current_screen = new _Menu2.default();
	    this.current_screen.load(_menus2.default['main']);

	    window.env.gui.init();
	    this.current_screen.start();
	  }
	};

	window.env = {
	  config: new _ConfigManager2.default(),
	  highscores: [],
	  game: null,
	  gui: new _Gui2.default(),
	  init: function init() {
	    this.game = new Game();
	    this.gui = new _Gui2.default();
	    this.game.init();
	  }
	};

	window.addEventListener('keyup', function (event) {
	  _KeyBoardManager2.default.onKeyup(event);
	}, false);
	window.addEventListener('keydown', function (event) {
	  _KeyBoardManager2.default.onKeydown(event);
	}, false);

	window.onload = function () {
	  window.env.init();
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _KeyBoardManager = __webpack_require__(2);

	var _KeyBoardManager2 = _interopRequireDefault(_KeyBoardManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function ConfigManager() {
	    this.values = {
	        players: [{
	            name: 'Player 1',
	            keys: {
	                left: _KeyBoardManager2.default.LEFT,
	                right: _KeyBoardManager2.default.RIGHT,
	                up: _KeyBoardManager2.default.UP,
	                down: _KeyBoardManager2.default.DOWN
	            }
	        }, {
	            name: 'Player 2',
	            keys: {
	                left: _KeyBoardManager2.default.Q,
	                right: _KeyBoardManager2.default.D,
	                up: _KeyBoardManager2.default.Z,
	                down: _KeyBoardManager2.default.S
	            }
	        }],
	        audio: {
	            musicVolume: 50,
	            soundVolume: 50
	        }
	    };
	}

	ConfigManager.prototype = {
	    save: function save() {
	        localStorage.setItem('config', JSON.stringify(this.values));
	    },
	    load: function load() {
	        if (localStorage.getItem('config')) {
	            var config = JSON.parse(localStorage.getItem('config'));

	            for (var key in config) {
	                this.values[key] = config[key];
	            }
	        }
	    },
	    variable: function variable(key) {
	        var keys = key.split('.');
	        var val = this.values;
	        for (var k in keys) {
	            if (k == keys.length - 1) {
	                return val[keys[k]];
	            }
	            if (val[keys[k]] == undefined) {
	                return undefined;
	            }
	            val = val[keys[k]];
	        }
	    },
	    setVariable: function setVariable(key, value) {
	        var keys = key.split('.');
	        var val = this.values;
	        for (var k in keys) {
	            if (k == keys.length - 1) {
	                val[keys[k]] = value;
	                return true;
	            }
	            if (val[keys[k]] == undefined) {
	                val[keys[k]] = {};
	            }
	            val = val[keys[k]];
	        }
	        return false;
	    }
	};

	exports.default = ConfigManager;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _KeyBoardManager;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var KeyBoardManager = (_KeyBoardManager = {
	  _down: [],
	  _pressed: [],
	  _lastPressed: null,

	  BACKSPACE: 8,
	  ENTER: 13,
	  ESC: 27,
	  SPACE: 32,

	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40,

	  SHIFT: 16,
	  CTRL: 17,
	  ALT: 18,

	  A: 65,
	  Z: 90,
	  E: 69,
	  R: 83,

	  Q: 81,
	  D: 68
	}, _defineProperty(_KeyBoardManager, 'Z', 90), _defineProperty(_KeyBoardManager, 'S', 83), _defineProperty(_KeyBoardManager, 'isDown', function isDown(keyCode) {
	  if (this._down[keyCode]) {
	    return true;
	  }
	  return false;
	}), _defineProperty(_KeyBoardManager, 'isPressed', function isPressed(keyCode) {
	  if (this._pressed[keyCode]) {
	    this._pressed[keyCode] = false;
	    this._lastPressed = null;
	    return true;
	  }
	  return false;
	}), _defineProperty(_KeyBoardManager, 'onKeydown', function onKeydown(event) {
	  this._down[event.keyCode] = true;
	  this._pressed[event.keyCode] = true;
	}), _defineProperty(_KeyBoardManager, 'onKeyup', function onKeyup(event) {
	  if (this._down[event.keyCode]) {
	    this._lastPressed = event.keyCode;
	  }
	  this._down[event.keyCode] = false;
	  this._pressed[event.keyCode] = false;
	}), _defineProperty(_KeyBoardManager, 'lastPressed', function lastPressed() {
	  var keyCode = this._lastPressed;
	  this._lastPressed = null;
	  return keyCode;
	}), _defineProperty(_KeyBoardManager, 'reset', function reset() {
	  this._lastPressed = null;
	  for (var i in this._down) {
	    this._down[i] = false;
	  }
	  for (var i in this._pressed) {
	    this._pressed[i] = false;
	  }
	}), _defineProperty(_KeyBoardManager, 'keys', {

	  8: 'BackSpace',
	  13: 'Enter',

	  16: 'Shift',
	  17: 'Ctrl',
	  18: 'Alt',

	  27: 'Escape',

	  32: 'Space',

	  33: 'Page Up',
	  34: 'Page Down',
	  35: 'End',
	  36: 'Home',

	  37: 'Arrow Left',
	  38: 'Arrow Up',
	  39: 'Arrow Right',
	  40: 'Arrow Down',

	  65: 'A',
	  66: 'B',
	  67: 'C',
	  68: 'D',
	  69: 'E',
	  70: 'F',
	  71: 'G',
	  72: 'H',
	  73: 'I',
	  74: 'J',
	  75: 'K',
	  76: 'L',
	  77: 'M',
	  78: 'N',
	  79: 'O',
	  80: 'P',
	  81: 'Q',
	  82: 'R',
	  83: 'S',
	  84: 'T',
	  85: 'U',
	  86: 'V',
	  87: 'W',
	  88: 'X',
	  89: 'Y',
	  90: 'Z',

	  96: '0',
	  97: '1',
	  98: '2',
	  99: '3',
	  100: '4',
	  101: '5',
	  102: '6',
	  103: '7',
	  104: '8',
	  105: '9',
	  106: '*',
	  107: '+',
	  109: '-',
	  110: '.',
	  111: '/'
	}), _KeyBoardManager);

	exports.default = KeyBoardManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AudioManager = __webpack_require__(4);

	var _AudioManager2 = _interopRequireDefault(_AudioManager);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	var _Loader = __webpack_require__(6);

	var _Loader2 = _interopRequireDefault(_Loader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Gui() {
	  this.display = {
	    mainarea: null,
	    context: null,
	    width: 512,
	    height: 384,
	    offset_x: 0,
	    offset_y: 0,
	    logbox: null,
	    tilesize: 32,
	    zoom: 1,
	    viewport: {
	      width: 512,
	      height: 384
	    }
	  };
	  this.buffers = {
	    main: document.createElement('canvas'),
	    background: document.createElement('canvas'),
	    level: document.createElement('canvas'),
	    players: [document.createElement('canvas'), document.createElement('canvas')]
	  };
	  this.graphics = {
	    lives: new Image()
	  };
	  this.audio = new _AudioManager2.default();
	}

	Gui.prototype = {
	  init: function init() {
	    this.buffers.main.width = this.display.width;
	    this.buffers.main.height = this.display.height;
	    var bufferContext = this.buffers.main.getContext('2d');
	    bufferContext['imageSmoothingEnabled'] = false;

	    this.buffers.players[0].width = this.display.width;
	    this.buffers.players[0].height = this.display.height;
	    bufferContext = this.buffers.players[0].getContext('2d');
	    bufferContext['imageSmoothingEnabled'] = false;

	    this.buffers.players[1].width = this.display.width;
	    this.buffers.players[1].height = this.display.height;
	    bufferContext = this.buffers.players[1].getContext('2d');
	    bufferContext['imageSmoothingEnabled'] = false;

	    this.display.mainarea = document.createElement('canvas');
	    document.body.appendChild(this.display.mainarea);

	    var gui = this;
	    this.display.context = this.resizeViewport();

	    window.onresize = function () {
	      gui.display.context = gui.resizeViewport();
	    };

	    this.audio.init();

	    var loader = new _Loader2.default();
	    var gui = this;
	    loader.onload = function () {
	      gui.graphics.lives = _ImageRepository2.default.get('img/head.png');
	    };
	    loader.preload({ images: ['img/head.png'], audio: ['audio/Jump.ogg'] });
	  },
	  resizeViewport: function resizeViewport() {
	    if (document.body.clientWidth / this.display.width > document.body.clientHeight / this.display.height) {
	      this.display.viewport.height = document.body.clientHeight;
	      this.display.viewport.width = this.display.width * (document.body.clientHeight / this.display.height);
	    } else {
	      this.display.viewport.width = document.body.clientWidth;
	      this.display.viewport.height = this.display.height * (document.body.clientWidth / this.display.width);
	    }
	    if (this.display.viewport.width > this.display.width && this.display.viewport.width <= this.display.width * 1.2) {
	      this.display.viewport.width = this.display.width;
	      this.display.viewport.height = this.display.height;
	    }

	    this.display.mainarea.style.width = this.display.viewport.width + 'px';
	    this.display.mainarea.style.height = this.display.viewport.height + 'px';
	    this.display.mainarea.setAttribute('width', this.display.viewport.width);
	    this.display.mainarea.setAttribute('height', this.display.viewport.height);

	    var context = this.display.mainarea.getContext('2d');

	    context['imageSmoothingEnabled'] = false;
	    context['mozImageSmoothingEnabled'] = false;
	    context['oImageSmoothingEnabled'] = false;
	    //context['webkitImageSmoothingEnabled'] = false;
	    context['msImageSmoothingEnabled'] = false;

	    return context;
	  }
	};

	exports.default = Gui;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function AudioManager() {
	  this.context = null;
	  this.library = {};
	  this.musicSource = null;
	  this.soundSource = [];
	  this.volume = {
	    sound: null,
	    music: null
	  };
	}

	AudioManager.prototype = {
	  playMusic: function playMusic(url) {
	    if (this.musicSource == null) {
	      this.musicSource = this.context.createBufferSource();
	    } else {
	      this.musicSource.stop(0);
	      this.musicSource = this.context.createBufferSource();
	    }
	    this.musicSource.loop = true;

	    this.musicSource.connect(this.volume.music);

	    this.play(url, this.musicSource, window.env.config.variable('audio').musicVolume);
	  },
	  playSound: function playSound(url) {
	    var source = this.context.createBufferSource();
	    this.soundSource.push(source);

	    source.connect(this.volume.sound);
	    this.play(url, source);
	  },
	  play: function play(url, source) {
	    if (this.library[url] != undefined) {
	      source.buffer = this.library[url];
	      source.connect(this.context.destination);

	      source.start(0);
	    }
	  },
	  init: function init() {
	    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	    this.context = new AudioContext();

	    this.volume.sound = this.context.createGain();
	    this.volume.sound.connect(this.context.destination);
	    this.volume.sound.gain.value = window.env.config.variable('audio').soundVolume / 50 - 1;

	    this.volume.music = this.context.createGain();
	    this.volume.music.connect(this.context.destination);
	    this.volume.music.gain.value = window.env.config.variable('audio').musicVolume / 50 - 1;
	  }
	};

	exports.default = AudioManager;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImageRepository = function () {
	  function ImageRepository() {
	    _classCallCheck(this, ImageRepository);

	    this._images = [];
	  }

	  _createClass(ImageRepository, [{
	    key: 'get',
	    value: function get(src) {
	      if (image = this._images.find(function (img) {
	        return img.src === src;
	      })) {
	        return image.img;
	      }

	      var tmpImage = new Image();
	      tmpImage.src = src;

	      var image = document.createElement('canvas');
	      image.width = tmpImage.width;
	      image.height = tmpImage.height;

	      image.getContext('2d').drawImage(tmpImage, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
	      this._images.push({
	        src: src,
	        img: image
	      });

	      return image;
	    }
	  }]);

	  return ImageRepository;
	}();

	var instance = new ImageRepository();
	Object.freeze(instance);

	exports.default = instance;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ImageResource = __webpack_require__(7);

	var _ImageResource2 = _interopRequireDefault(_ImageResource);

	var _SoundResource = __webpack_require__(9);

	var _SoundResource2 = _interopRequireDefault(_SoundResource);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Loader = function () {
	  function Loader() {
	    _classCallCheck(this, Loader);

	    this._resources = [];
	    this._loaded = 0;
	    this._total = 0;
	  }

	  _createClass(Loader, [{
	    key: 'preload',
	    value: function preload(resources) {
	      for (var i in resources) {
	        this._total += resources[i].length;
	      }
	      if (resources.images != undefined && resources.images.length > 0) {
	        for (var i in resources.images) {
	          var resource = new _ImageResource2.default(resources.images[i], this);
	          this._resources.push(resource);
	        }
	      }
	      if (resources.audio != undefined && resources.audio.length > 0) {
	        for (var i in resources.audio) {
	          var resource = new _SoundResource2.default(resources.audio[i], this);
	          this._resources.push(resource);
	        }
	      }
	    }
	  }, {
	    key: 'resourceLoaded',
	    value: function resourceLoaded() {
	      this._loaded++;
	      if (this.getPercentLoaded() == 100) {
	        this.onload();
	      }
	    }
	  }, {
	    key: 'getLoaded',
	    value: function getLoaded() {
	      return this._loaded;
	    }
	  }, {
	    key: 'getTotal',
	    value: function getTotal() {
	      return this._total;
	    }
	  }, {
	    key: 'getPercentLoaded',
	    value: function getPercentLoaded() {
	      if (this._resources.length > 0) {
	        return Math.floor(this._loaded / this._total * 100);
	      } else {
	        return 0;
	      }
	    }
	  }, {
	    key: 'onload',
	    value: function onload() {}
	  }]);

	  return Loader;
	}();

	exports.default = Loader;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Resource = __webpack_require__(8);

	var _Resource2 = _interopRequireDefault(_Resource);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function ImageResource(url, loader) {
	  _Resource2.default.call(this);

	  var thatResource = this;
	  this.loader = loader;
	  this.image = new Image();
	  this.image.src = url;
	  this.type = 'image';
	  this.loaded = false;

	  this.image.onload = function () {
	    _ImageRepository2.default.get(this.src);
	    thatResource.loaded = true;
	    thatResource.loader.resourceLoaded();
	  };
	}

	exports.default = ImageResource;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function Resource() {}

	Resource.prototype = {
	  loader: null,
	  type: 'resource',
	  loaded: false
	};

	exports.default = Resource;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Resource = __webpack_require__(8);

	var _Resource2 = _interopRequireDefault(_Resource);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function SoundResource(url, loader) {
	  _Resource2.default.call(this);

	  var thatResource = this;
	  this.loader = loader;
	  this.type = 'sound';
	  this.loaded = false;
	  this.url = url;

	  var request = new XMLHttpRequest();
	  request.open('GET', url, true);
	  request.responseType = 'arraybuffer';

	  request.onload = function () {
	    window.env.gui.audio.context.decodeAudioData(request.response, function (buffer) {
	      window.env.gui.audio.library[thatResource.url] = buffer;
	      thatResource.loaded = true;
	      thatResource.loader.resourceLoaded();
	    }, function (error) {
	      thatResource.loaded = true;
	      thatResource.loader.resourceLoaded();
	      console.log(error);
	    });
	  };
	  request.send();
	}

	exports.default = SoundResource;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Screen = __webpack_require__(11);

	var _Screen2 = _interopRequireDefault(_Screen);

	var _MenuItem = __webpack_require__(12);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _Loader = __webpack_require__(6);

	var _Loader2 = _interopRequireDefault(_Loader);

	var _KeyBoardManager = __webpack_require__(2);

	var _KeyBoardManager2 = _interopRequireDefault(_KeyBoardManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Menu = function Menu() {
	  _Screen2.default.call(this);
	  this.items = [];
	  this.title = '';
	  this.selected = 0;
	  this.focus = null;
	};
	Menu.prototype = new _Screen2.default();
	Menu.prototype.load = function (menu) {
	  this.title = menu.title;
	  for (var i in menu.items) {
	    this.items[i] = new _MenuItem2.default();
	    this.items[i].load(menu.items[i]);
	  }
	  this.selected = 0;
	  /*if (menu.music != undefined){
	    var loader = new Loader();
	    loader.onload = function(){
	      window.env.gui.audio.playMusic('audio/music/'+menu.music);
	    }
	    loader.preload({'audio':['audio/music/'+menu.music]});
	  }*/
	  if (menu.onLoad != undefined) {
	    this.onLoad = menu.onLoad;
	    this.onLoad();
	  }
	  if (menu.afterDraw != undefined) {
	    this.afterDraw = menu.afterDraw;
	  }
	};
	Menu.prototype.draw = function () {
	  var context = window.env.gui.buffers.main.getContext('2d');
	  context.fillStyle = '#000';
	  context.globalAlpha = 1;
	  context.fillRect(0, 0, window.env.gui.display.width, window.env.gui.display.height);

	  context.textAlign = 'center';

	  context.fillStyle = '#33800d';
	  context.strokeStyle = '#105904';
	  context.font = 'bold 18px monospace';
	  context.strokeText(this.title, window.env.gui.display.width / 2, 50);
	  context.fillText(this.title, window.env.gui.display.width / 2, 50);

	  context.textAlign = 'left';
	  context.fillStyle = '#e6e0a1';
	  context.font = 'bold 12px monospace';
	  for (var i in this.items) {
	    context.fillText(this.items[i].title, window.env.gui.display.width / 2 - 48, 120 + i * 16);
	    if (i == this.selected) {
	      context.fillText('>', window.env.gui.display.width / 2 - 64, 120 + i * 16);
	    }
	  }
	  this.afterDraw(context);
	  window.env.gui.display.context.drawImage(window.env.gui.buffers.main, 0, 0, window.env.gui.display.width, window.env.gui.display.height, 0, 0, window.env.gui.display.viewport.width, window.env.gui.display.viewport.height);
	};
	Menu.prototype.run = function () {
	  if (this.focus == null) {
	    var key_down = _KeyBoardManager2.default.isPressed(_KeyBoardManager2.default.DOWN);
	    var key_up = _KeyBoardManager2.default.isPressed(_KeyBoardManager2.default.UP);
	    var key_enter = _KeyBoardManager2.default.isPressed(_KeyBoardManager2.default.ENTER);

	    if (key_enter) {
	      this.items[this.selected].callback();
	    }

	    if (key_down) {
	      this.selected++;
	    }
	    if (key_up) {
	      this.selected--;
	    }
	    if (this.selected >= this.items.length) {
	      this.selected = 0;
	    }
	    if (this.selected < 0) {
	      this.selected = this.items.length - 1;
	    }
	  } else {
	    var lastPressedKey = _KeyBoardManager2.default.lastPressed();
	    if (lastPressedKey != null) {
	      this.focus.onAction(lastPressedKey);
	    }
	  }
	};
	Menu.prototype.afterDraw = function (context) {};

	exports.default = Menu;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function Screen() {
	    this.stopped = false;
	}
	Screen.prototype.run = function () {};
	Screen.prototype.init = function () {};
	Screen.prototype.load = function () {};
	Screen.prototype.draw = function () {};
	Screen.prototype.process = function () {
	    this.frameStart = new Date().getTime();

	    var thisScreen = this;

	    this.frameskip = Math.floor((this.frameStart - this.previousFrameStart) / (1000 / 50));

	    for (var i = 0; i < this.frameskip; i++) {
	        this.run();
	    }

	    this.run();
	    this.draw();

	    this.previousFrameStart = this.frameStart;
	    this.previousFrameEnd = new Date().getTime();

	    if (!this.stopped) {
	        window.requestAnimationFrame(function () {
	            thisScreen.process();
	        });
	    }
	};
	Screen.prototype.start = function () {
	    var thisScreen = this;
	    window.requestAnimationFrame(function () {
	        thisScreen.process();
	    });
	};
	Screen.prototype.stop = function () {
	    this.stopped = true;
	};

	exports.default = Screen;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function MenuItem() {
	  this.title = '';
	  this.callback = function () {};
	}
	MenuItem.prototype.load = function (item) {
	  this.title = item.title;
	  this.callback = item.callback;
	  if (item.onLoad != undefined) {
	    this.onLoad = item.onLoad;
	  }
	  if (item.onAction != undefined) {
	    this.onAction = item.onAction;
	  }
	  this.onLoad();
	};
	MenuItem.prototype.takeFocus = function () {
	  window.env.game.current_screen.focus = this;
	};
	MenuItem.prototype.removeFocus = function () {
	  window.env.game.current_screen.focus = null;
	};

	MenuItem.prototype.draw = function () {};
	MenuItem.prototype.onLoad = function () {};
	MenuItem.prototype.onAction = function () {};

	exports.default = MenuItem;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Menu = __webpack_require__(10);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _ControlMenu = __webpack_require__(14);

	var _ControlMenu2 = _interopRequireDefault(_ControlMenu);

	var _Level = __webpack_require__(15);

	var _Level2 = _interopRequireDefault(_Level);

	var _KeyBoardManager = __webpack_require__(2);

	var _KeyBoardManager2 = _interopRequireDefault(_KeyBoardManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var menus = {
	  main: {
	    title: 'Main menu',
	    music: 'A Friendly Encounter.mp3',
	    items: [{
	      title: '1 Player',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Level2.default();
	        env.game.current_screen.loadSingle(0);
	        env.game.current_screen.start();
	      }
	    }, {
	      title: '2 Players',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Level2.default();
	        env.game.current_screen.loadMulti(0);
	        env.game.current_screen.start();
	      }
	    }, {
	      title: 'High Scores',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Menu2.default();
	        env.game.current_screen.load(menus['highscores']);
	        env.game.current_screen.start();
	      }
	    }, {
	      title: 'Options',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Menu2.default();
	        env.game.current_screen.load(menus['options']);
	        env.game.current_screen.start();
	      }
	    }]
	  },
	  options: {
	    title: 'Options',
	    items: [{
	      title: 'Player name',
	      callback: function callback() {
	        this.title = 'Player name: _';
	        env.config.setVariable('player.name', '');
	        _KeyBoardManager2.default.reset();
	        this.takeFocus();
	      },
	      onLoad: function onLoad() {
	        this.title = 'Player name: ' + env.config.variable('player.name');
	      },
	      onAction: function onAction(key) {
	        if (key == _KeyBoardManager2.default.ENTER && env.config.variable('player.name') != '') {
	          this.title = 'Player name: ' + env.config.variable('player.name');
	          env.config.save();
	          this.removeFocus();
	        } else if (key >= 65 && key <= 90 || key >= 96 && key <= 105) {
	          if (_KeyBoardManager2.default.isDown(_KeyBoardManager2.default.SHIFT)) {
	            env.config.setVariable('player.name', env.config.variable('player.name') + _KeyBoardManager2.default.keys[key]);
	          } else {
	            env.config.setVariable('player.name', env.config.variable('player.name') + _KeyBoardManager2.default.keys[key].toLowerCase());
	          }

	          this.title = 'Player name: ' + env.config.variable('player.name') + '_';
	        } else if (key == _KeyBoardManager2.default.SPACE) {
	          env.config.setVariable('player.name', env.config.variable('player.name') + ' ');
	          this.title = 'Player name: ' + env.config.variable('player.name') + '_';
	        } else if (key == _KeyBoardManager2.default.BACKSPACE) {
	          env.config.setVariable('player.name', env.config.variable('player.name').substr(0, env.config.variable('player.name').length - 1));
	          this.title = 'Player name: ' + env.config.variable('player.name') + '_';
	        }
	      }
	    }, {
	      title: 'Controls Player 1',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Menu2.default();
	        env.game.current_screen.load(menus['controls1']);
	        env.game.current_screen.start();
	      }
	    }, {
	      title: 'Controls Player 2',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Menu2.default();
	        env.game.current_screen.load(menus['controls2']);
	        env.game.current_screen.start();
	      }
	    }, {
	      title: 'Audio',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Menu2.default();
	        env.game.current_screen.load(menus['audio']);
	        env.game.current_screen.start();
	      }
	    }, {
	      title: 'Back',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Menu2.default();
	        env.game.current_screen.load(menus['main']);
	        env.game.current_screen.start();
	      }
	    }]
	  },
	  gameover: {
	    title: 'Continue?',
	    items: [{
	      title: 'Continue',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Level2.default();
	        env.game.current_screen.load(0);
	        env.game.current_screen.start();
	      }
	    }, {
	      title: 'Exit to main menu',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Menu2.default();
	        env.game.current_screen.load(menus.main);
	        env.game.current_screen.init();
	        env.game.current_screen.start();
	      }
	    }]
	  },
	  controls1: new _ControlMenu2.default(0),
	  controls2: new _ControlMenu2.default(1),
	  audio: {
	    title: 'Audio',
	    items: [{
	      title: 'Music volume',
	      callback: function callback() {
	        this.title = 'Music volume: -' + env.config.values.audio.musicVolume + '-%';
	        _KeyBoardManager2.default.reset();
	        this.takeFocus();
	      },
	      onLoad: function onLoad() {
	        this.title = 'Music volume: ' + env.config.values.audio.musicVolume + '%';
	      },
	      onAction: function onAction(key) {
	        if (key == _KeyBoardManager2.default.ENTER && env.config.values.player.name != '') {
	          this.title = 'Music volume: ' + env.config.values.audio.musicVolume + '%';
	          env.config.save();
	          this.removeFocus();
	        } else if (key == _KeyBoardManager2.default.LEFT || key == _KeyBoardManager2.default.DOWN) {
	          if (env.config.values.audio.musicVolume > 0) {
	            env.config.values.audio.musicVolume -= 10;
	            env.gui.audio.volume.music.gain.value = env.config.values.audio.musicVolume / 50 - 1;
	          }
	          this.title = 'Music volume: -' + env.config.values.audio.musicVolume + '-%';
	        } else if (key == _KeyBoardManager2.default.UP || key == _KeyBoardManager2.default.RIGHT) {
	          if (env.config.values.audio.musicVolume < 100) {
	            env.config.values.audio.musicVolume += 10;
	            env.gui.audio.volume.music.gain.value = env.config.values.audio.musicVolume / 50 - 1;
	          }
	          this.title = 'Music volume: -' + env.config.values.audio.musicVolume + '-%';
	        }
	      }
	    }, {
	      title: 'Sound volume',
	      callback: function callback() {
	        this.title = 'Sound volume: -' + env.config.values.audio.soundVolume + '-%';
	        _KeyBoardManager2.default.reset();
	        this.takeFocus();
	      },
	      onLoad: function onLoad() {
	        this.title = 'Sound volume: ' + env.config.values.audio.soundVolume + '%';
	      },
	      onAction: function onAction(key) {
	        if (key == _KeyBoardManager2.default.ENTER && env.config.values.player.name != '') {
	          this.title = 'Sound volume: ' + env.config.values.audio.soundVolume + '%';
	          env.config.save();
	          this.removeFocus();
	        } else if (key == _KeyBoardManager2.default.LEFT || key == _KeyBoardManager2.default.DOWN) {
	          if (env.config.values.audio.soundVolume > 0) {
	            env.config.values.audio.soundVolume -= 10;
	            env.gui.audio.volume.sound.gain.value = env.config.values.audio.soundVolume / 50 - 1;
	          }
	          this.title = 'Sound volume: -' + env.config.values.audio.soundVolume + '-%';
	        } else if (key == _KeyBoardManager2.default.UP || key == _KeyBoardManager2.default.RIGHT) {
	          if (env.config.values.audio.soundVolume < 100) {
	            env.config.values.audio.soundVolume += 10;
	            env.gui.audio.volume.sound.gain.value = env.config.values.audio.soundVolume / 50 - 1;
	          }
	          this.title = 'Sound volume: -' + env.config.values.audio.soundVolume + '-%';
	        }
	      }
	    }, {
	      title: 'Save Changes',
	      callback: function callback() {
	        env.config.save();
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Menu2.default();
	        env.game.current_screen.load(menus['options']);
	        env.game.current_screen.start();
	      }
	    }, {
	      title: 'Cancel',
	      callback: function callback() {
	        env.config.load();
	        env.gui.audio.volume.music.gain.value = env.config.values.audio.musicVolume / 50 - 1;
	        env.gui.audio.volume.sound.gain.value = env.config.values.audio.soundVolume / 50 - 1;
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Menu2.default();
	        env.game.current_screen.load(menus['options']);
	        env.game.current_screen.start();
	      }
	    }]
	  },
	  highscores: {
	    title: 'High Scores',
	    items: [{
	      title: 'Back',
	      callback: function callback() {
	        env.game.current_screen.stop();
	        env.game.current_screen = new _Menu2.default();
	        env.game.current_screen.load(menus['main']);
	        env.game.current_screen.start();
	      }
	    }],
	    afterDraw: function afterDraw(context) {
	      for (var i in env.highscores) {
	        context.fillText(env.highscores[i].name, env.gui.display.width / 2 - 48, 140 + i * 16);
	        context.fillText(env.highscores[i].score, env.gui.display.width / 2 + 48, 140 + i * 16);
	      }
	    }
	  }
	};

	exports.default = menus;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _KeyBoardManager = __webpack_require__(2);

	var _KeyBoardManager2 = _interopRequireDefault(_KeyBoardManager);

	var _Menu = __webpack_require__(10);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _menus = __webpack_require__(13);

	var _menus2 = _interopRequireDefault(_menus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 *  Submenu for controls configuration
	 */
	var ControlMenu = function ControlMenu(playerNumber) {
	  this.playerNumber = playerNumber;
	  this.title = 'Controls Player ' + (playerNumber + 1);
	  var thatControlMenu = this;
	  this.items = [{
	    title: 'Up key',
	    callback: function callback() {
	      this.title = 'Up key: _';
	      _KeyBoardManager2.default.reset();
	      this.takeFocus();
	    },
	    onLoad: function onLoad() {
	      this.title = 'Up key: ' + _KeyBoardManager2.default.keys[window.env.config.values.players[thatControlMenu.playerNumber].keys.up];
	    },
	    onAction: function onAction(key) {
	      if (_KeyBoardManager2.default.keys[key] != undefined) {
	        this.title = 'Up key: ' + _KeyBoardManager2.default.keys[key];
	        window.env.config.values.players[thatControlMenu.playerNumber].keys.up = key;
	        this.removeFocus();
	      }
	    }
	  }, {
	    title: 'Down key',
	    callback: function callback() {
	      this.title = 'Down key: _';
	      _KeyBoardManager2.default.reset();
	      this.takeFocus();
	    },
	    onLoad: function onLoad() {
	      this.title = 'Down key: ' + _KeyBoardManager2.default.keys[window.env.config.values.players[thatControlMenu.playerNumber].keys.down];
	    },
	    onAction: function onAction(key) {
	      if (_KeyBoardManager2.default.keys[key] != undefined) {
	        this.title = 'Down key: ' + _KeyBoardManager2.default.keys[key];
	        window.env.config.values.players[thatControlMenu.playerNumber].keys.down = key;
	        this.removeFocus();
	      }
	    }
	  }, {
	    title: 'Left key',
	    callback: function callback() {
	      this.title = 'Left key: _';
	      _KeyBoardManager2.default.reset();
	      this.takeFocus();
	    },
	    onLoad: function onLoad() {
	      this.title = 'Left key: ' + _KeyBoardManager2.default.keys[window.env.config.values.players[thatControlMenu.playerNumber].keys.left];
	    },
	    onAction: function onAction(key) {
	      if (_KeyBoardManager2.default.keys[key] != undefined) {
	        this.title = 'Left key: ' + _KeyBoardManager2.default.keys[key];
	        window.env.config.values.players[thatControlMenu.playerNumber].keys.left = key;
	        this.removeFocus();
	      }
	    }
	  }, {
	    title: 'Right key',
	    callback: function callback() {
	      this.title = 'Right key: _';
	      _KeyBoardManager2.default.reset();
	      this.takeFocus();
	    },
	    onLoad: function onLoad() {
	      this.title = 'Right key: ' + _KeyBoardManager2.default.keys[window.env.config.values.players[thatControlMenu.playerNumber].keys.right];
	    },
	    onAction: function onAction(key) {
	      if (_KeyBoardManager2.default.keys[key] != undefined) {
	        this.title = 'Right key: ' + _KeyBoardManager2.default.keys[key];
	        window.env.config.values.players[thatControlMenu.playerNumber].keys.right = key;
	        this.removeFocus();
	      }
	    }
	  }, {
	    title: 'Save Changes',
	    callback: function callback() {
	      window.env.config.save();
	      window.env.game.current_screen.stop();
	      window.env.game.current_screen = new _Menu2.default();
	      window.env.game.current_screen.load(_menus2.default['options']);
	      window.env.game.current_screen.start();
	    }
	  }, {
	    title: 'Cancel',
	    callback: function callback() {
	      window.env.config.load();
	      window.env.game.current_screen.stop();
	      window.env.game.current_screen = new _Menu2.default();
	      window.env.game.current_screen.load(_menus2.default['options']);
	      window.env.game.current_screen.start();
	    }
	  }];
	};

	exports.default = ControlMenu;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Screen2 = __webpack_require__(11);

	var _Screen3 = _interopRequireDefault(_Screen2);

	var _Loader = __webpack_require__(6);

	var _Loader2 = _interopRequireDefault(_Loader);

	var _levels = __webpack_require__(16);

	var _levels2 = _interopRequireDefault(_levels);

	var _Brick = __webpack_require__(17);

	var _Brick2 = _interopRequireDefault(_Brick);

	var _Background = __webpack_require__(21);

	var _Background2 = _interopRequireDefault(_Background);

	var _Character = __webpack_require__(22);

	var _Character2 = _interopRequireDefault(_Character);

	var _Player = __webpack_require__(40);

	var _Player2 = _interopRequireDefault(_Player);

	var _ObjectCreator = __webpack_require__(23);

	var _ObjectCreator2 = _interopRequireDefault(_ObjectCreator);

	var _KeyBoardManager = __webpack_require__(2);

	var _KeyBoardManager2 = _interopRequireDefault(_KeyBoardManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Level = function (_Screen) {
	  _inherits(Level, _Screen);

	  function Level() {
	    _classCallCheck(this, Level);

	    var _this = _possibleConstructorReturn(this, (Level.__proto__ || Object.getPrototypeOf(Level)).call(this));

	    _this.width = 0;
	    _this.height = 0;
	    _this.players = [];
	    _this.startposition = { 'x': 0, 'y': 0 };
	    _this.grid = [];
	    _this.objects = [];
	    _this.started = false;
	    _this.number = 1;
	    _this.init_time = null;
	    _this.limited_time = false;
	    _this.timeout = null;
	    _this.loader = null;
	    _this.paused = false;
	    _this.split = false;
	    _this.zoom = 1;
	    return _this;
	  }

	  _createClass(Level, [{
	    key: 'loadSingle',
	    value: function loadSingle(levelNumber) {
	      this.number = levelNumber;

	      var level = _levels2.default[levelNumber];
	      this.load(level);
	    }
	  }, {
	    key: 'loadMulti',
	    value: function loadMulti(levelNumber) {
	      var level = multiplayerLevels[levelNumber];
	      this.load(level);
	    }
	  }, {
	    key: 'load',
	    value: function load(level) {
	      this.level = level;
	      window.env.game.paused = true;
	      this.name = level.name;
	      this.grid = [];
	      this.objects = [];
	      this.started = false;
	      this.loading = false;

	      if (level.resources != undefined) {
	        this.loader = new _Loader2.default();
	        this.loading = true;
	        this.loader.preload(level.resources);
	      }

	      if (level.music != undefined) {
	        this.music = level.music;
	      }

	      this.height = level.data.length;
	      this.width = level.data[0].length;
	      if (level.timeout) {
	        this.timeout = level.timeout;
	        this.limited_time = true;
	      }
	      window.env.game.paused = false;
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      if (this.music != undefined) {
	        window.env.gui.audio.playMusic('audio/music/' + this.music);
	      }

	      window.env.gui.display.offset_y = window.env.gui.display.offset_x = 0;
	      var obj = null;
	      for (var i = 0; i < this.width; i++) {
	        this.grid[i] = [];
	        for (var j = 0; j < this.height; j++) {
	          this.grid[i][j] = [];
	        }
	      }
	      this.startposition = [];
	      for (var i = 0; i < this.width; i++) {
	        for (var j = 0; j < this.height; j++) {
	          switch (this.level.data[j][i]) {
	            case 1:
	              _ObjectCreator2.default.createBackgroundObjet(new _Brick2.default(), i, j);
	              break;
	            case 2:
	              this.startposition.push({ 'x': i, 'y': j });
	              break;
	          }
	        }
	      }
	      var characters = [];
	      for (var i in this.startposition) {
	        var character = new _Character2.default();
	        character.id = _ObjectCreator2.default.seqNext();
	        character.load(this.startposition[i]);
	        this.objects.push(character);
	        characters[i] = character;
	      }

	      for (var i in this.level.objects) {
	        _ObjectCreator2.default.createObjet(this.level.objects[i], this.level.objects[i].x * window.env.gui.display.tilesize, this.level.objects[i].y * window.env.gui.display.tilesize);
	      }

	      if (this.players.length) {
	        for (var i in this.players) {
	          var nblives = this.players[i].lives;
	          if (nblives <= 0) {
	            nblives = 3;
	          }
	          this.players[i] = new _Player2.default(i, characters[i]);
	          this.players[i].lives = nblives;
	        }
	      } else {
	        this.players = [];
	        for (var i in characters) {
	          this.players[i] = new _Player2.default(i, characters[i]);
	        }
	      }

	      window.env.gui.buffers.level.width = this.width * window.env.gui.display.tilesize;
	      window.env.gui.buffers.level.height = this.height * window.env.gui.display.tilesize;

	      window.env.gui.buffers.background.width = window.env.gui.buffers.level.width;
	      window.env.gui.buffers.background.height = window.env.gui.buffers.level.height;

	      var backgr = new _Background2.default();
	      backgr.load();
	      for (var i = 0; i <= this.width; i++) {
	        for (var j = 0; j <= this.height; j++) {
	          backgr.ingrid = { x: i, y: j };
	          backgr.coords = { x: i * window.env.gui.display.tilesize, y: j * window.env.gui.display.tilesize };
	          backgr.beforedraw();
	          backgr.draw(window.env.gui.buffers.background.getContext('2d'));
	        }
	      }

	      var ctx = window.env.gui.buffers.level.getContext('2d');
	      for (var i in this.grid) {
	        for (var j in this.grid[i]) {
	          for (var k = 0; k < this.grid[i][j].length; k++) {
	            this.grid[i][j][k].beforedraw();
	            this.grid[i][j][k].draw(ctx);
	          }
	        }
	      }

	      this.init_time = new Date().getTime();

	      this.started = true;
	      this.starttime = new Date().getTime();
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      if (this.started) {
	        if (_KeyBoardManager2.default.isPressed(_KeyBoardManager2.default.ESC)) {
	          this.paused = !this.paused;
	        }
	        if (!this.paused) {
	          //this.player.process();
	          for (var i in this.objects) {
	            //if (this.objects[i].coords.x < window.env.gui.display.width + window.env.gui.display.offset_x){
	            if (this.objects[i] != undefined) {
	              this.objects[i].process();
	            }
	            //}
	          }
	        }
	      } else {
	        if (this.loading) {
	          if (this.loader.getPercentLoaded() == 100) {
	            this.loading = false;
	          }
	        } else {
	          this.init();
	        }
	      }
	    }
	  }, {
	    key: 'getTimeLeft',
	    value: function getTimeLeft(time) {
	      return this.timeout - Math.floor((time - this.starttime) / 1000);
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      if (this.started) {
	        var time = void 0,
	            minX = void 0,
	            maxX = void 0,
	            minY = void 0,
	            maxY = void 0,
	            zoom = void 0,
	            centerX = void 0,
	            centerY = void 0,
	            vectX = void 0,
	            vectY = void 0;

	        time = new Date().getTime();

	        minX = maxX = minY = maxY = null;
	        for (var i in this.players) {
	          if (minX === null || this.players[i].character.coords.x + 16 < minX) {
	            minX = this.players[i].character.coords.x;
	          }
	          if (minY === null || this.players[i].character.coords.y + 16 < minY) {
	            minY = this.players[i].character.coords.y;
	          }
	          if (maxX === null || this.players[i].character.coords.x + 16 > maxX) {
	            maxX = this.players[i].character.coords.x;
	          }
	          if (maxY === null || this.players[i].character.coords.y + 16 > maxY) {
	            maxY = this.players[i].character.coords.y;
	          }
	        }
	        minX = Math.max(0, minX - window.env.gui.display.width / 4);
	        minY = Math.max(0, minY - window.env.gui.display.height / 4);
	        maxX = Math.min(this.width * window.env.gui.display.tilesize, maxX + window.env.gui.display.width / 4);
	        maxY = Math.min(this.height * window.env.gui.display.tilesize, maxY + window.env.gui.display.height / 4);

	        //this.zoom = window.env.gui.display.zoom = Math.min(1, window.env.gui.display.width / (maxX - minX), window.env.gui.display.height / (maxY - minY));
	        zoom = this.zoom;

	        centerX = Math.round((maxX + minX) / 2);
	        centerY = Math.round((maxY + minY) / 2);

	        window.env.gui.display.offset_x = Math.max(0, Math.floor(centerX - window.env.gui.display.width / 2 / zoom));
	        window.env.gui.display.offset_y = Math.round(Math.min(this.height * window.env.gui.display.tilesize - window.env.gui.display.height / zoom, Math.max(0, Math.floor(centerY - window.env.gui.display.height / 2 / zoom))));

	        //window.env.gui.display.offset_x = Math.round(Math.min((this.width * window.env.gui.display.tilesize) - window.env.gui.display.width, Math.max(0, (this.players[0].character.coords.x - ((window.env.gui.display.width/2) / window.env.gui.display.tilesize) * window.env.gui.display.tilesize))));
	        //window.env.gui.display.offset_y = Math.round(Math.min((this.height * window.env.gui.display.tilesize) - window.env.gui.display.height, Math.max(0, (this.players[0].character.coords.y - ((window.env.gui.display.height/2) / window.env.gui.display.tilesize) * window.env.gui.display.tilesize))));


	        if (this.players.length == 2) {
	          vectX = this.players[0].character.coords.x - this.players[1].character.coords.x;
	          vectY = this.players[0].character.coords.y - this.players[1].character.coords.y;

	          var distance = Math.sqrt(vectX * vectX + vectY * vectY); // Pythagore

	          if (distance > window.env.gui.display.height * 2 / 3) {
	            var _offset_y = void 0,
	                _offset_x = void 0;
	            this.split = true;

	            var angle = Math.atan2(vectY, vectX);
	            var split = 'V';
	            var pos = Math.tan(angle) * (window.env.gui.display.height / 2);

	            if (Math.abs(pos) > window.env.gui.display.width / 2) {
	              split = 'H';
	              angle = angle + Math.PI / 2;
	              pos = Math.tan(angle) * (window.env.gui.display.width / 2);
	              var _offset_y = window.env.gui.display.height / 3 * Math.cos(angle);
	              var _offset_x = window.env.gui.display.height / 3 * Math.sin(angle);
	            } else {
	              var _offset_x = window.env.gui.display.height / 3 * Math.cos(angle);
	              var _offset_y = 0 - window.env.gui.display.height / 3 * Math.sin(angle);
	            }

	            for (var i in this.players) {
	              _offset_x *= -1;
	              _offset_y *= -1;

	              this.drawScene(window.env.gui.buffers.players[i], this.players[i].character.coords.x + _offset_x, this.players[i].character.coords.y - _offset_y);

	              var ctx = window.env.gui.buffers.main.getContext('2d');
	              ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'; //'#bbb';
	              ctx.lineWidth = 3;
	              /*
	              if (i == 0) {
	                ctx.strokeStyle = '#f00';
	                ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
	              } else {
	                ctx.strokeStyle = '#0f0';
	                ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
	              }
	              */
	              ctx.save();
	              if (split === 'H') {
	                if (this.players[i].character.coords.y + 16 < centerY) {
	                  ctx.lineTo(0, 0);
	                  ctx.lineTo(window.env.gui.display.width, 0);
	                  ctx.closePath();
	                } else {
	                  ctx.lineTo(0, window.env.gui.display.height);
	                  ctx.lineTo(window.env.gui.display.width, window.env.gui.display.height);
	                  ctx.closePath();
	                }
	                ctx.clip();
	                ctx.drawImage(window.env.gui.buffers.players[i], 0, 0, window.env.gui.display.width, window.env.gui.display.height, 0, 0, window.env.gui.display.width, window.env.gui.display.height);

	                ctx.beginPath();
	                ctx.moveTo(window.env.gui.display.width, window.env.gui.display.height / 2 + pos);
	                ctx.lineTo(0, window.env.gui.display.height / 2 - pos);
	                ctx.stroke();
	              } else {
	                if (this.players[i].character.coords.x + 16 < centerX) {
	                  ctx.lineTo(0, 0);
	                  ctx.lineTo(0, window.env.gui.display.height);
	                  ctx.closePath();
	                  //offset_x = 0 - (window.env.gui.display.width / 4);
	                } else {
	                  ctx.lineTo(window.env.gui.display.width, 0);
	                  ctx.lineTo(window.env.gui.display.width, window.env.gui.display.height);
	                  ctx.closePath();
	                  //offset_x = 0 + (window.env.gui.display.width / 4);
	                }
	                ctx.clip();
	                ctx.drawImage(window.env.gui.buffers.players[i], 0, 0, window.env.gui.display.width, window.env.gui.display.height, 0, 0, window.env.gui.display.width, window.env.gui.display.height);

	                ctx.beginPath();
	                ctx.moveTo(window.env.gui.display.width / 2 - pos, window.env.gui.display.height);
	                ctx.lineTo(window.env.gui.display.width / 2 + pos, 0);
	                ctx.stroke();
	              }
	              ctx.restore();
	            }
	          } else {
	            this.drawScene(window.env.gui.buffers.main, centerX, centerY);
	          }
	        } else {
	          this.drawScene(window.env.gui.buffers.main, centerX, centerY);
	        }

	        //this.player.character.draw(window.env.gui.display.context);

	        for (var i in this.players) {
	          // Blink
	          if (this.players[i].lives > 1 || (time - this.starttime) % 500 < 250) {
	            for (var j = 0; j < this.players[i].lives; j++) {
	              window.env.gui.buffers.main.getContext('2d').drawImage(window.env.gui.graphics.lives, 16 * (j + 1), 8 + 8 * i);
	            }
	          }
	        }

	        window.env.gui.buffers.main.getContext('2d').font = 'bold 12px monospace';
	        window.env.gui.buffers.main.getContext('2d').fillStyle = '#e6e0a1';

	        window.env.gui.buffers.main.getContext('2d').textAlign = 'left';
	        if (this.limited_time) {
	          var timeleft = this.getTimeLeft(time);
	          // Blink again
	          if (timeleft > 10 || (time - this.starttime) % 500 < 250) {
	            window.env.gui.buffers.main.getContext('2d').fillText(Math.max(timeleft, 0), 72, 18);
	          }
	        }
	        /*
	        // Affichage des images par secondes
	        var fps = Math.floor(1000/(this.frameStart - this.previousFrameStart));
	        window.env.gui.buffers.main.getContext('2d').fillText(fps + ' fps', 72, 36);
	        window.env.gui.buffers.main.getContext('2d').fillText(this.frameStart - this.previousFrameStart, 72, 54);
	        window.env.gui.buffers.main.getContext('2d').fillText(this.frameskip, 72, 72);
	        /**/

	        window.env.gui.buffers.main.getContext('2d').textAlign = 'right';
	        window.env.gui.buffers.main.getContext('2d').fillText(window.env.game.score, window.env.gui.display.width - 16, 18);
	        window.env.gui.buffers.main.getContext('2d').textAlign = 'left';
	      } else {
	        window.env.gui.buffers.main.getContext('2d').fillStyle = '#000';
	        //window.env.gui.buffers.main.getContext('2d').globalAlpha=1;
	        window.env.gui.buffers.main.getContext('2d').fillRect(0, 0, window.env.gui.display.width, window.env.gui.display.height);
	        //window.env.gui.buffers.main.getContext('2d').globalAlpha=1;

	        if (this.players[0] != null) {
	          for (var i = 0; i < this.players[0].lives; i++) {
	            window.env.gui.buffers.main.getContext('2d').drawImage(window.env.gui.graphics.lives, 16 * (i + 1), 8);
	          }
	        }

	        window.env.gui.buffers.main.getContext('2d').textAlign = 'center';

	        window.env.gui.buffers.main.getContext('2d').fillStyle = '#e6e0a1';
	        window.env.gui.buffers.main.getContext('2d').font = 'bold 12px monospace';
	        if (this.number > 0) {
	          window.env.gui.buffers.main.getContext('2d').fillText(this.name, window.env.gui.display.width / 2, 150);
	        }

	        var percentLoaded;
	        if (this.loader != null) {
	          percentLoaded = this.loader.getPercentLoaded();
	        } else {
	          percentLoaded = 0;
	        }
	        window.env.gui.buffers.main.getContext('2d').fillText('Loading: ' + percentLoaded + '%', window.env.gui.display.width / 2, 168);

	        window.env.gui.buffers.main.getContext('2d').textAlign = 'left';
	        for (var i in this.level.text) {
	          window.env.gui.buffers.main.getContext('2d').fillText(this.level.text[i], window.env.gui.display.width / 2 - 100, 200 + i * 18);
	        }
	      }

	      window.env.gui.display.context.drawImage(window.env.gui.buffers.main, 0, 0, window.env.gui.display.width, window.env.gui.display.height, 0, 0, window.env.gui.display.viewport.width, window.env.gui.display.viewport.height);
	    }
	  }, {
	    key: 'drawScene',
	    value: function drawScene(buffer, centerX, centerY) {
	      var zoom = this.zoom;

	      window.env.gui.display.offset_x = Math.round(Math.min(this.width * window.env.gui.display.tilesize - window.env.gui.display.width / zoom, Math.max(0, Math.floor(centerX - window.env.gui.display.width / 2 / zoom))));
	      window.env.gui.display.offset_y = Math.round(Math.min(this.height * window.env.gui.display.tilesize - window.env.gui.display.height / zoom, Math.max(0, Math.floor(centerY - window.env.gui.display.height / 2 / zoom))));

	      buffer.getContext('2d').drawImage(window.env.gui.buffers.background, Math.floor(window.env.gui.display.offset_x / 2), Math.floor(window.env.gui.display.offset_y / 2), window.env.gui.display.width / zoom, window.env.gui.display.height / zoom, 0, 0, window.env.gui.display.width, window.env.gui.display.height);
	      buffer.getContext('2d').drawImage(window.env.gui.buffers.level, window.env.gui.display.offset_x, window.env.gui.display.offset_y, window.env.gui.display.width / zoom, window.env.gui.display.height / zoom, 0, 0, window.env.gui.display.width, window.env.gui.display.height);

	      for (var i in this.objects) {
	        this.objects[i].draw(buffer.getContext('2d'));
	      }
	    }
	  }]);

	  return Level;
	}(_Screen3.default);

	exports.default = Level;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var levels = [{
	  name: 'Level 1',
	  timeout: 60,
	  data: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1], [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1], [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
	  objects: [{ type: 'door', x: 22, y: 28, destination: 1 },
	  /*      {type:'platform', x:5, y:26, path:[
	            {x:5, y:26},
	            {x:3, y:26},
	            {x:3, y:24},
	            {x:5, y:24},
	          ]},
	        {type:'platform', x:6, y:26, path:[
	            {x:6, y:26},
	            {x:4, y:26},
	          ]},*/
	  { type: 'clone', x: 17, y: 23, direction: 'left', move: false }, { type: 'clone', x: 12, y: 20, direction: 'right', move: false }, { type: 'clone', x: 17, y: 17, direction: 'left', move: false }, { type: 'clone', x: 12, y: 14, direction: 'right', move: false }, { type: 'clone', x: 17, y: 11, direction: 'left', move: false }, { type: 'clone', x: 12, y: 7, direction: 'right', move: false }, { type: 'clone', x: 48, y: 7, direction: 'left', move: false }, { type: 'clone', x: 48, y: 13, direction: 'left', move: false }, { type: 'clone', x: 21, y: 13, direction: 'right', move: false }, { type: 'clone', x: 7, y: 6, direction: 'right', move: true }, { type: 'clone', x: 22, y: 22, direction: 'right', move: true }, { type: 'clone', x: 38, y: 22, direction: 'right', move: true }, { type: 'clone', x: 25, y: 26, direction: 'right', move: false }, { type: 'clone', x: 29, y: 24, direction: 'right', move: false }, { type: 'clone', x: 21, y: 28, direction: 'right', move: true }, { type: 'clone', x: 33, y: 20, direction: 'left', move: false }, { type: 'clone', x: 41, y: 20, direction: 'left', move: false }, { type: 'gem', x: 10, y: 27 }, { type: 'gem', x: 17, y: 25 }, { type: 'gem', x: 12, y: 22 }, { type: 'gem', x: 17, y: 19 }, { type: 'gem', x: 12, y: 16 }, { type: 'gem', x: 17, y: 13 }, { type: 'gem', x: 12, y: 10 }, { type: 'gem', x: 17, y: 7 }, { type: 'gem', x: 8, y: 6, value: 1000 }, { type: 'gem', x: 4, y: 4 }, { type: 'gem', x: 1, y: 7 }, { type: 'gem', x: 4, y: 10 }, { type: 'gem', x: 1, y: 13 }, { type: 'gem', x: 4, y: 16 }, { type: 'gem', x: 28, y: 12 }, { type: 'gem', x: 33, y: 12 }, { type: 'gem', x: 38, y: 12 }, { type: 'gem', x: 43, y: 12 }, { type: 'gem', x: 27, y: 6 }, { type: 'gem', x: 32, y: 6 }, { type: 'gem', x: 37, y: 6 }, { type: 'gem', x: 42, y: 6 }, { type: 'gem', x: 22, y: 17 }, { type: 'gem', x: 22, y: 18 }, { type: 'gem', x: 22, y: 19 }, { type: 'gem', x: 22, y: 20 }],
	  resources: {
	    images: ['img/bullet.png', 'img/clone.png', 'img/head.png', 'img/heros.png', 'img/items.png', 'img/scifi.png'],
	    audio: ['audio/music/king.it.ogg']
	  },
	  music: 'king.it.ogg'
	}, {
	  name: 'Level 2',
	  timeout: 60,
	  data: [
	  //                     1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 3 4 4 4
	  // 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 1
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 2
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 3
	  [1, 0, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 4
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // 5
	  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], // 6
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 7
	  [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 8
	  [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1], // 9
	  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 10
	  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 11
	  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], // 12
	  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // 13
	  [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1], // 14
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 15
	  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], // 16
	  [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], // 17
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 18
	  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // 19
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] // 20
	  ],
	  objects: [{ type: 'door', x: 41, y: 19, destination: 2 }, { type: 'clone', x: 15, y: 4, direction: 'left', move: true }, { type: 'clone', x: 18, y: 5, direction: 'right', move: false }, { type: 'clone', x: 9, y: 11, direction: 'right', move: true }, { type: 'clone', x: 25, y: 11, direction: 'left', move: false }, { type: 'clone', x: 26, y: 9, direction: 'left', move: false }, { type: 'clone', x: 27, y: 7, direction: 'left', move: false }, { type: 'clone', x: 28, y: 5, direction: 'left', move: false }, { type: 'clone', x: 41, y: 4, direction: 'left', move: false }, { type: 'clone', x: 38, y: 11, direction: 'left', move: false }, { type: 'clone', x: 38, y: 13, direction: 'left', move: false }, { type: 'clone', x: 30, y: 15, direction: 'left', move: true }, { type: 'clone', x: 24, y: 15, direction: 'left', move: true }, { type: 'clone', x: 18, y: 15, direction: 'left', move: true }, { type: 'clone', x: 7, y: 18, direction: 'left', move: false }, { type: 'clone', x: 13, y: 18, direction: 'left', move: false }, { type: 'clone', x: 19, y: 18, direction: 'left', move: false }, { type: 'clone', x: 25, y: 18, direction: 'left', move: false }, { type: 'clone', x: 31, y: 18, direction: 'left', move: false }, { type: 'clone', x: 37, y: 18, direction: 'left', move: false }, {
	    type: 'laser', x: 5, y: 13,
	    trigger: {
	      type: 'timer',
	      delay: 500,
	      coords: {
	        x: 5,
	        y: 13
	      }
	    }
	  }, {
	    type: 'laser', x: 8, y: 13,
	    trigger: {
	      type: 'timer',
	      delay: 500,
	      coords: {
	        x: 8,
	        y: 13
	      }
	    }
	  }, {
	    type: 'laser', x: 11, y: 13,
	    trigger: {
	      type: 'timer',
	      delay: 500,
	      coords: {
	        x: 11,
	        y: 13
	      }
	    }
	  }, { type: 'gem', x: 1, y: 11 }, { type: 'gem', x: 2, y: 11 }, { type: 'gem', x: 3, y: 11 }, { type: 'gem', x: 8, y: 8 }, { type: 'gem', x: 21, y: 8 }, { type: 'gem', x: 39, y: 11 }, { type: 'gem', x: 30, y: 13 }, { type: 'gem', x: 24, y: 13 }, { type: 'gem', x: 17, y: 13 }, { type: 'gem', x: 1, y: 13, value: 1000 }, { type: 'gem', x: 23, y: 17 }],
	  resources: {
	    images: ['img/bullet.png', 'img/clone.png', 'img/head.png', 'img/heros.png', 'img/items.png', 'img/scifi.png'],
	    audio: []
	  }
	}, {
	  name: 'Level 3',
	  timeout: 90,
	  data: [
	  // 0                   10                  20                  30      
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
	  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1], // 10
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], // 20
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 30
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], // 40
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], // 50
	  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1], // 60
	  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 70
	  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 80
	  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 90
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	  // 0                   10                  20                  30      
	  ],
	  objects: [{ type: 'door', x: 9, y: 8, destination: 3 }, { type: 'clone', x: 8, y: 76, direction: 'right', move: false }, { type: 'clone', x: 11, y: 67, direction: 'left', move: false }, { type: 'clone', x: 7, y: 64, direction: 'right', move: false }, { type: 'clone', x: 7, y: 70, direction: 'right', move: false }, { type: 'clone', x: 11, y: 60, direction: 'left', move: false }, { type: 'clone', x: 21, y: 62, direction: 'left', move: false }, { type: 'clone', x: 5, y: 38, direction: 'right', move: false }, { type: 'clone', x: 17, y: 24, direction: 'right', move: false }, { type: 'clone', x: 24, y: 19, direction: 'right', move: false }, { type: 'clone', x: 24, y: 16, direction: 'right', move: false }, { type: 'clone', x: 24, y: 13, direction: 'right', move: false }, { type: 'clone', x: 24, y: 10, direction: 'right', move: false }, { type: 'clone', x: 7, y: 42, direction: 'right', move: false }, { type: 'clone', x: 7, y: 45, direction: 'right', move: false }, { type: 'clone', x: 7, y: 48, direction: 'right', move: false }, { type: 'clone', x: 7, y: 51, direction: 'right', move: false }, { type: 'clone', x: 24, y: 42, direction: 'left', move: false }, { type: 'clone', x: 24, y: 45, direction: 'left', move: false }, { type: 'clone', x: 24, y: 48, direction: 'left', move: false }, { type: 'clone', x: 24, y: 51, direction: 'left', move: false }, { type: 'pike', x: 8, y: 90 }, { type: 'pike', x: 9, y: 90 }, { type: 'pike', x: 10, y: 90 }, { type: 'pike', x: 11, y: 90 }, { type: 'pike', x: 12, y: 90 }, { type: 'pike', x: 13, y: 90 }, { type: 'pike', x: 14, y: 90 }, { type: 'pike', x: 15, y: 90 }, { type: 'pike', x: 14, y: 68 }, {
	    type: 'laser', x: 22, y: 31,
	    trigger: {
	      type: 'timer',
	      delay: 500,
	      coords: {
	        x: 22,
	        y: 31
	      }
	    }
	  }, {
	    type: 'laser', x: 20, y: 31,
	    trigger: {
	      type: 'timer',
	      delay: 500,
	      coords: {
	        x: 20,
	        y: 31
	      }
	    }
	  }, {
	    type: 'laser', x: 18, y: 31,
	    trigger: {
	      type: 'timer',
	      delay: 500,
	      coords: {
	        x: 18,
	        y: 31
	      }
	    }
	  }, {
	    type: 'flyingthing', x: 12, y: 40,
	    path: [{ x: 12, y: 40 }, { x: 12, y: 47 }, { x: 20, y: 47 }, { x: 20, y: 40 }]
	  }, {
	    type: 'flyingthing', x: 12, y: 47,
	    path: [{ x: 12, y: 47 }, { x: 20, y: 47 }, { x: 20, y: 40 }, { x: 12, y: 40 }]
	  }, {
	    type: 'flyingthing', x: 20, y: 47,
	    path: [{ x: 20, y: 47 }, { x: 20, y: 40 }, { x: 12, y: 40 }, { x: 12, y: 47 }]
	  }, {
	    type: 'flyingthing', x: 20, y: 40,
	    path: [{ x: 20, y: 40 }, { x: 12, y: 40 }, { x: 12, y: 47 }, { x: 20, y: 47 }]
	  }, { type: 'gem', x: 13, y: 82 }, { type: 'gem', x: 9, y: 79 }, { type: 'gem', x: 13, y: 76 }, { type: 'gem', x: 16, y: 68, value: 1000 }, { type: 'gem', x: 17, y: 65 }, { type: 'gem', x: 26, y: 60 }, { type: 'gem', x: 11, y: 50 }, { type: 'gem', x: 19, y: 47 }, { type: 'gem', x: 20, y: 44 }, { type: 'gem', x: 12, y: 41 }, { type: 'gem', x: 16, y: 22 }, { type: 'gem', x: 26, y: 19 }, { type: 'gem', x: 27, y: 16 }, { type: 'gem', x: 28, y: 13 }, { type: 'gem', x: 29, y: 10 }, { type: 'gem', x: 30, y: 7 }, { type: 'gem', x: 10, y: 5 }, { type: 'gem', x: 12, y: 5 }, { type: 'gem', x: 14, y: 5 }, { type: 'gem', x: 16, y: 5 }, { type: 'gem', x: 18, y: 5 }, { type: 'gem', x: 20, y: 5 }, { type: 'gem', x: 22, y: 5 }],
	  resources: {
	    images: ['img/bullet.png', 'img/clone.png', 'img/head.png', 'img/heros.png', 'img/items.png', 'img/scifi.png'],
	    audio: []
	  }
	}, {
	  name: 'Level 4',
	  timeout: 60,
	  data: [
	  //                     1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3
	  // 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //5
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //10
	  [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1], [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1], //15
	  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1], //20
	  [1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1], //25
	  [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	  //                     1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3
	  // 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
	  ],
	  objects: [{ type: 'door', x: 32, y: 28, destination: 4 }, { type: 'gem', x: 24, y: 6 }, { type: 'gem', x: 25, y: 6 }, { type: 'gem', x: 26, y: 6 }, { type: 'gem', x: 27, y: 6 }, { type: 'gem', x: 28, y: 6 }, { type: 'gem', x: 29, y: 6 }, { type: 'gem', x: 30, y: 6 }, { type: 'gem', x: 31, y: 6 }, { type: 'gem', x: 1, y: 9 }, { type: 'gem', x: 1, y: 10 }, { type: 'gem', x: 1, y: 11 }, { type: 'gem', x: 1, y: 12 }, { type: 'gem', x: 1, y: 13 }, { type: 'gem', x: 1, y: 14 }, { type: 'gem', x: 1, y: 15 }, { type: 'gem', x: 1, y: 16 }, { type: 'gem', x: 1, y: 17 }, { type: 'gem', x: 1, y: 18 }, { type: 'gem', x: 1, y: 19 }, { type: 'gem', x: 1, y: 20 }, { type: 'gem', x: 1, y: 21 }, { type: 'gem', x: 2, y: 8 }, { type: 'gem', x: 3, y: 8 }, { type: 'gem', x: 6, y: 10 }, { type: 'gem', x: 7, y: 10 }, { type: 'gem', x: 10, y: 12 }, { type: 'gem', x: 11, y: 12 }, { type: 'gem', x: 14, y: 14 }, { type: 'gem', x: 15, y: 14 }, { type: 'gem', x: 3, y: 14, value: 1000 }, { type: 'gem', x: 6, y: 16 }, { type: 'gem', x: 7, y: 16 }, { type: 'gem', x: 10, y: 18 }, { type: 'gem', x: 11, y: 18 }, { type: 'gem', x: 13, y: 20 }, { type: 'gem', x: 14, y: 20 }, { type: 'gem', x: 7, y: 20 }, { type: 'gem', x: 8, y: 20 }, { type: 'gem', x: 5, y: 25 }, { type: 'gem', x: 6, y: 25 }, { type: 'gem', x: 9, y: 25 }, { type: 'gem', x: 10, y: 25 }, { type: 'gem', x: 25, y: 11 }, { type: 'gem', x: 30, y: 11 }, { type: 'gem', x: 22, y: 16 }, { type: 'gem', x: 33, y: 16 }, { type: 'pike', x: 3, y: 28 }, { type: 'pike', x: 4, y: 28 }, { type: 'pike', x: 5, y: 28 }, { type: 'pike', x: 6, y: 28 }, { type: 'pike', x: 7, y: 28 }, { type: 'pike', x: 8, y: 28 }, { type: 'pike', x: 9, y: 28 }, { type: 'pike', x: 10, y: 28 }, { type: 'pike', x: 11, y: 28 }, { type: 'pike', x: 12, y: 28 }, { type: 'flyingthing',
	    x: 23, y: 11, speed: 2,
	    path: [{ x: 23, y: 11 }, { x: 23, y: 13 }, { x: 32, y: 13 }, { x: 32, y: 11 }] }, { type: 'flyingthing',
	    x: 32, y: 13, speed: 2,
	    path: [{ x: 32, y: 13 }, { x: 32, y: 11 }, { x: 23, y: 11 }, { x: 23, y: 13 }] }, { type: 'flyingthing',
	    x: 26, y: 14, speed: 2,
	    path: [{ x: 26, y: 14 }, { x: 26, y: 16 }, { x: 29, y: 16 }, { x: 29, y: 14 }] }, { type: 'flyingthing',
	    x: 29, y: 16, speed: 2,
	    path: [{ x: 29, y: 16 }, { x: 29, y: 14 }, { x: 26, y: 14 }, { x: 26, y: 16 }] }, { type: 'flyingthing',
	    x: 24, y: 19, speed: 2,
	    path: [{ x: 24, y: 19 }, { x: 31, y: 19 }, { x: 31, y: 21 }, { x: 24, y: 21 }] }, { type: 'flyingthing',
	    x: 31, y: 21, speed: 2,
	    path: [{ x: 31, y: 21 }, { x: 24, y: 21 }, { x: 24, y: 19 }, { x: 31, y: 19 }] }, { type: 'flyingthing',
	    x: 5, y: 10, speed: 4,
	    path: [{ x: 5, y: 10 }, { x: 5, y: 18 }, { x: 8, y: 18 }, { x: 8, y: 10 }] }, { type: 'flyingthing',
	    x: 6, y: 10, speed: 4,
	    path: [{ x: 5, y: 10 }, { x: 5, y: 18 }, { x: 8, y: 18 }, { x: 8, y: 10 }] }, { type: 'flyingthing',
	    x: 8, y: 18, speed: 4,
	    path: [{ x: 8, y: 18 }, { x: 8, y: 10 }, { x: 5, y: 10 }, { x: 5, y: 18 }] }, { type: 'flyingthing',
	    x: 7, y: 18, speed: 4,
	    path: [{ x: 8, y: 18 }, { x: 8, y: 10 }, { x: 5, y: 10 }, { x: 5, y: 18 }] }, { type: 'flyingthing',
	    x: 9, y: 12, speed: 4,
	    path: [{ x: 9, y: 12 }, { x: 9, y: 20 }, { x: 12, y: 20 }, { x: 12, y: 12 }] }, { type: 'flyingthing',
	    x: 10, y: 12, speed: 4,
	    path: [{ x: 9, y: 12 }, { x: 9, y: 20 }, { x: 12, y: 20 }, { x: 12, y: 12 }] }, { type: 'flyingthing',
	    x: 12, y: 20, speed: 4,
	    path: [{ x: 12, y: 20 }, { x: 12, y: 12 }, { x: 9, y: 12 }, { x: 9, y: 20 }] }, { type: 'flyingthing',
	    x: 11, y: 20, speed: 4,
	    path: [{ x: 12, y: 20 }, { x: 12, y: 12 }, { x: 9, y: 12 }, { x: 9, y: 20 }] }, { type: 'flyingthing',
	    x: 6, y: 20, speed: 4,
	    path: [{ x: 6, y: 20 }, { x: 15, y: 20 }, { x: 15, y: 22 }, { x: 6, y: 22 }] }, { type: 'flyingthing',
	    x: 6, y: 21, speed: 4,
	    path: [{ x: 6, y: 20 }, { x: 15, y: 20 }, { x: 15, y: 22 }, { x: 6, y: 22 }] }, { type: 'flyingthing',
	    x: 15, y: 22, speed: 4,
	    path: [{ x: 15, y: 22 }, { x: 6, y: 22 }, { x: 6, y: 20 }, { x: 15, y: 20 }] }, { type: 'flyingthing',
	    x: 15, y: 21, speed: 4,
	    path: [{ x: 15, y: 22 }, { x: 6, y: 22 }, { x: 6, y: 20 }, { x: 15, y: 20 }] }, { type: 'flyingthing',
	    x: 4, y: 25, speed: 2,
	    path: [{ x: 4, y: 25 }, { x: 7, y: 25 }, { x: 7, y: 27 }, { x: 11, y: 27 }, { x: 11, y: 25 }, { x: 8, y: 25 }, { x: 8, y: 27 }, { x: 4, y: 27 }] }, { type: 'flyingthing',
	    x: 11, y: 27, speed: 2,
	    path: [{ x: 11, y: 27 }, { x: 8, y: 27 }, { x: 8, y: 25 }, { x: 4, y: 25 }, { x: 4, y: 27 }, { x: 7, y: 27 }, { x: 7, y: 25 }, { x: 11, y: 25 }] }, { type: 'clone', x: 22, y: 19, direction: 'right', move: false }, { type: 'clone', x: 33, y: 19, direction: 'left', move: false }, { type: 'clone', x: 17, y: 11, direction: 'left', move: false }, { type: 'clone', x: 17, y: 18, direction: 'left', move: false }, { type: 'clone', x: 17, y: 26, direction: 'left', move: false }, { type: 'clone', x: 19, y: 10, direction: 'left', move: false }],
	  resources: {
	    images: ['img/bullet.png', 'img/clone.png', 'img/head.png', 'img/heros.png', 'img/items.png', 'img/scifi.png'],
	    audio: []
	  }
	}, {
	  name: 'Level 5',
	  timeout: 120,
	  data: [
	  //                     1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 3 4 4 4 4 4 4 4 4 4 4 5 5 5 5 5 5 5 5 5 5 6 6 6 6 6 6 6 6 6 6 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 8 8 8 8 8 9 9 9 9 9 9 9 9 9 9
	  // 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //1
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //2
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1], //3
	  [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1], //4
	  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1], //5
	  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //6
	  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //7
	  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //8
	  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //9
	  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //10
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1], //11
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1], //12
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //13
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], //14
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], //15
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], //16
	  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], //17
	  [1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], //18
	  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] //19
	  ],
	  objects: [{ type: 'door', x: 98, y: 5, destination: 5 }, { type: 'gem', x: 1, y: 3 }, { type: 'gem', x: 83, y: 18 }, { type: 'gem', x: 84, y: 18 }, { type: 'gem', x: 85, y: 18 }, { type: 'gem', x: 86, y: 18 }, { type: 'gem', x: 87, y: 18, value: 1000 }, { type: 'gem', x: 9, y: 17 }, { type: 'gem', x: 11, y: 16 }, { type: 'gem', x: 13, y: 15 }, { type: 'gem', x: 15, y: 16 }, { type: 'gem', x: 17, y: 17 }, { type: 'gem', x: 65, y: 5 }, { type: 'gem', x: 71, y: 3 }, { type: 'gem', x: 77, y: 1 }, { type: 'gem', x: 92, y: 2 }, { type: 'gem', x: 95, y: 2 }, { type: 'gem', x: 81, y: 2 }, { type: 'gem', x: 82, y: 2 }, { type: 'gem', x: 83, y: 2 }, { type: 'gem', x: 84, y: 2 }, { type: 'gem', x: 76, y: 9 }, { type: 'gem', x: 77, y: 9 }, { type: 'gem', x: 81, y: 9 }, { type: 'gem', x: 82, y: 9 }, { type: 'gem', x: 10, y: 8 }, { type: 'gem', x: 9, y: 7 }, { type: 'gem', x: 8, y: 6 }, { type: 'gem', x: 7, y: 5 }, { type: 'gem', x: 27, y: 15 }, { type: 'gem', x: 28, y: 15 }, { type: 'laser', x: 58, y: 18 }, { type: 'laser', x: 62, y: 18 }, { type: 'laser', x: 66, y: 18 }, { type: 'laser', x: 70, y: 18 }, { type: 'laser', x: 74, y: 18 }, { type: 'laser', x: 78, y: 18 }, { type: 'laser', x: 82, y: 18 }, { type: 'laser', x: 34, y: 8 }, { type: 'laser', x: 39, y: 8 }, { type: 'laser', x: 44, y: 8 }, { type: 'pike', x: 40, y: 18 }, { type: 'pike', x: 41, y: 18 }, { type: 'pike', x: 42, y: 18 }, { type: 'pike', x: 43, y: 18 }, { type: 'pike', x: 44, y: 18 }, { type: 'pike', x: 45, y: 18 }, { type: 'pike', x: 46, y: 18 }, { type: 'pike', x: 47, y: 18 }, { type: 'pike', x: 48, y: 18 }, { type: 'pike', x: 49, y: 18 }, { type: 'pike', x: 50, y: 18 }, { type: 'pike', x: 51, y: 18 }, { type: 'pike', x: 52, y: 18 }, { type: 'pike', x: 93, y: 5 }, { type: 'pike', x: 94, y: 5 }, { type: 'pike', x: 10, y: 18 }, { type: 'pike', x: 12, y: 17 }, { type: 'pike', x: 14, y: 17 }, { type: 'pike', x: 16, y: 18 }, { type: 'pike', x: 89, y: 18 }, { type: 'pike', x: 90, y: 18 }, { type: 'pike', x: 91, y: 18 }, { type: 'pike', x: 92, y: 18 }, { type: 'pike', x: 93, y: 18 }, { type: 'laser', x: 51, y: 5 }, { type: 'laser', x: 51, y: 3 }, { type: 'laser', x: 51, y: 1 }, { type: 'laser', x: 54, y: 5 }, { type: 'laser', x: 54, y: 3 }, { type: 'laser', x: 54, y: 1 }, { type: 'laser', x: 57, y: 5 }, { type: 'laser', x: 57, y: 3 }, { type: 'laser', x: 57, y: 1 }, { type: 'laser', x: 60, y: 5 }, { type: 'laser', x: 60, y: 3 }, { type: 'laser', x: 60, y: 1 }, { type: 'laser', x: 63, y: 5 }, { type: 'laser', x: 63, y: 3 }, { type: 'laser', x: 63, y: 1 }, { type: 'laser', x: 66, y: 3 }, { type: 'laser', x: 66, y: 1 }, { type: 'laser', x: 69, y: 5 }, { type: 'laser', x: 69, y: 3 }, { type: 'laser', x: 69, y: 1 }, { type: 'laser', x: 72, y: 5 }, { type: 'laser', x: 72, y: 1 }, { type: 'laser', x: 75, y: 5 }, { type: 'laser', x: 75, y: 3 }, { type: 'laser', x: 75, y: 1 }, { type: 'laser', x: 78, y: 5 }, { type: 'laser', x: 78, y: 3 }, {
	    type: 'flyingthing',
	    x: 79, y: 3, speed: 1,
	    path: [{ x: 79, y: 3 }, { x: 74, y: 3 }, { x: 74, y: 5 }, { x: 79, y: 5 }]
	  }, {
	    type: 'flyingthing', x: 73, y: 1, speed: 1,
	    path: [{ x: 73, y: 1 }, { x: 73, y: 5 }]
	  }, {
	    type: 'flyingthing', x: 68, y: 1, speed: 1,
	    path: [{ x: 68, y: 1 }, { x: 68, y: 5 }]
	  }, {
	    type: 'flyingthing', x: 62, y: 1, speed: 1,
	    path: [{ x: 62, y: 1 }, { x: 62, y: 3 }, { x: 67, y: 3 }, { x: 67, y: 1 }]
	  }, {
	    type: 'flyingthing', x: 56, y: 1, speed: 1,
	    path: [{ x: 56, y: 1 }, { x: 61, y: 1 }, { x: 61, y: 5 }, { x: 56, y: 5 }]
	  }, {
	    type: 'flyingthing', x: 50, y: 1, speed: 1,
	    path: [{ x: 50, y: 1 }, { x: 50, y: 3 }, { x: 55, y: 3 }, { x: 55, y: 1 }]
	  }, {
	    type: 'flyingthing', x: 52, y: 9, speed: 2,
	    path: [{ x: 52, y: 9 }, { x: 56, y: 9 }]
	  }, {
	    type: 'flyingthing', x: 61, y: 9, speed: 2,
	    path: [{ x: 61, y: 9 }, { x: 57, y: 9 }]
	  }, {
	    type: 'flyingthing', x: 62, y: 9, speed: 2,
	    path: [{ x: 62, y: 9 }, { x: 66, y: 9 }]
	  }, {
	    type: 'flyingthing', x: 72, y: 9, speed: 2,
	    path: [{ x: 72, y: 9 }, { x: 67, y: 9 }]
	  }, {
	    type: 'flyingthing', x: 84, y: 7, speed: 2,
	    path: [{ x: 84, y: 7 }, { x: 84, y: 16 }]
	  }, {
	    type: 'flyingthing', x: 79, y: 7, speed: 2,
	    path: [{ x: 79, y: 7 }, { x: 79, y: 16 }]
	  }, {
	    type: 'flyingthing', x: 74, y: 7, speed: 2,
	    path: [{ x: 74, y: 7 }, { x: 74, y: 14 }]
	  }, {
	    type: 'flyingthing', x: 17, y: 7, speed: 2,
	    path: [{ x: 18, y: 7 }, { x: 18, y: 10 }]
	  }, {
	    type: 'flyingthing', x: 18, y: 7, speed: 2,
	    path: [{ x: 20, y: 7 }, { x: 20, y: 10 }]
	  }, {
	    type: 'flyingthing', x: 19, y: 7, speed: 2,
	    path: [{ x: 22, y: 7 }, { x: 22, y: 10 }]
	  }, {
	    type: 'flyingthing', x: 20, y: 7, speed: 2,
	    path: [{ x: 24, y: 7 }, { x: 24, y: 10 }]
	  }, {
	    type: 'flyingthing', x: 21, y: 7, speed: 2,
	    path: [{ x: 26, y: 7 }, { x: 26, y: 10 }]
	  }, {
	    type: 'flyingthing', x: 22, y: 7, speed: 2,
	    path: [{ x: 28, y: 7 }, { x: 28, y: 10 }]
	  }, {
	    type: 'flyingthing', x: 23, y: 7, speed: 2,
	    path: [{ x: 30, y: 7 }, { x: 30, y: 10 }]
	  }, {
	    type: 'flyingthing', x: 67, y: 16, speed: 2,
	    path: [{ x: 67, y: 16 }, { x: 70, y: 16 }, { x: 70, y: 13 }, { x: 67, y: 13 }]
	  }, {
	    type: 'flyingthing', x: 70, y: 13, speed: 2,
	    path: [{ x: 70, y: 13 }, { x: 67, y: 13 }, { x: 67, y: 16 }, { x: 70, y: 16 }]
	  }, {
	    type: 'flyingthing', x: 32, y: 1, speed: 2,
	    path: [{ x: 32, y: 1 }, { x: 32, y: 8 }, { x: 46, y: 8 }, { x: 46, y: 6 }, { x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }, { x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }]
	  }, {
	    type: 'flyingthing', x: 32, y: 7, speed: 2,
	    path: [{ x: 32, y: 8 }, { x: 46, y: 8 }, { x: 46, y: 6 }, { x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }, { x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }, { x: 32, y: 1 }]
	  }, {
	    type: 'flyingthing', x: 37, y: 8, speed: 2,
	    path: [{ x: 46, y: 8 }, { x: 46, y: 6 }, { x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }, { x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }, { x: 32, y: 1 }, { x: 32, y: 8 }]
	  }, {
	    type: 'flyingthing', x: 43, y: 8, speed: 2,
	    path: [{ x: 46, y: 8 }, { x: 46, y: 6 }, { x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }, { x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }, { x: 32, y: 1 }, { x: 32, y: 8 }]
	  }, {
	    type: 'flyingthing', x: 45, y: 6, speed: 2,
	    path: [{ x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }, { x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }, { x: 32, y: 1 }, { x: 32, y: 8 }, { x: 46, y: 8 }, { x: 46, y: 6 }]
	  }, {
	    type: 'flyingthing', x: 39, y: 6, speed: 2,
	    path: [{ x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }, { x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }, { x: 32, y: 1 }, { x: 32, y: 8 }, { x: 46, y: 8 }, { x: 46, y: 6 }]
	  }, {
	    type: 'flyingthing', x: 34, y: 5, speed: 2,
	    path: [{ x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }, { x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }, { x: 32, y: 1 }, { x: 32, y: 8 }, { x: 46, y: 8 }, { x: 46, y: 6 }, { x: 34, y: 6 }]
	  }, {
	    type: 'flyingthing', x: 38, y: 3, speed: 2,
	    path: [{ x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }, { x: 32, y: 1 }, { x: 32, y: 8 }, { x: 46, y: 8 }, { x: 46, y: 6 }, { x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }]
	  }, {
	    type: 'flyingthing', x: 44, y: 3, speed: 2,
	    path: [{ x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }, { x: 32, y: 1 }, { x: 32, y: 8 }, { x: 46, y: 8 }, { x: 46, y: 6 }, { x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }]
	  }, {
	    type: 'flyingthing', x: 48, y: 4, speed: 2,
	    path: [{ x: 48, y: 4 }, { x: 48, y: 1 }, { x: 32, y: 1 }, { x: 32, y: 8 }, { x: 46, y: 8 }, { x: 46, y: 6 }, { x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }, { x: 45, y: 3 }, { x: 45, y: 4 }]
	  }, {
	    type: 'flyingthing', x: 45, y: 1, speed: 2,
	    path: [{ x: 32, y: 1 }, { x: 32, y: 8 }, { x: 46, y: 8 }, { x: 46, y: 6 }, { x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }, { x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }]
	  }, {
	    type: 'flyingthing', x: 39, y: 1, speed: 2,
	    path: [{ x: 32, y: 1 }, { x: 32, y: 8 }, { x: 46, y: 8 }, { x: 46, y: 6 }, { x: 34, y: 6 }, { x: 34, y: 4 }, { x: 37, y: 4 }, { x: 37, y: 3 }, { x: 45, y: 3 }, { x: 45, y: 4 }, { x: 48, y: 4 }, { x: 48, y: 1 }]
	  }, {
	    type: 'flyingthing', x: 22, y: 15, speed: 2,
	    path: [{ x: 22, y: 15 }, { x: 33, y: 15 }]
	  }, {
	    type: 'flyingthing', x: 22, y: 14, speed: 2,
	    path: [{ x: 22, y: 14 }, { x: 33, y: 14 }]
	  }, {
	    type: 'flyingthing', x: 22, y: 13, speed: 2,
	    path: [{ x: 22, y: 13 }, { x: 33, y: 13 }]
	  }, { type: 'clone', x: 15, y: 5, direction: 'left', move: false }, { type: 'clone', x: 14, y: 6, direction: 'left', move: false }, { type: 'clone', x: 13, y: 7, direction: 'left', move: false }, { type: 'clone', x: 12, y: 8, direction: 'left', move: false }, { type: 'clone', x: 46, y: 15, direction: 'left', move: false }, { type: 'clone', x: 51, y: 8, direction: 'right', move: false }],
	  resources: {
	    images: ['img/bullet.png', 'img/clone.png', 'img/head.png', 'img/heros.png', 'img/items.png', 'img/scifi.png'],
	    audio: []
	  }
	}, {
	  name: 'The end',
	  text: ["You did it!", "You finally escaped from the army of evil clones!", "Congratulations, it's now time to return to your", "normal life."],
	  timeout: null,
	  tileset: 'outside',
	  data: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
	  objects: [{ type: 'clone', x: 1, y: 14, direction: 'right', move: false }, { type: 'clone', x: 2, y: 14, direction: 'right', move: false }, { type: 'clone', x: 3, y: 15, direction: 'right', move: false }, { type: 'clone', x: 4, y: 15, direction: 'right', move: false }, { type: 'clone', x: 5, y: 16, direction: 'right', move: false }, { type: 'clone', x: 6, y: 16, direction: 'right', move: false }, { type: 'clone', x: 7, y: 17, direction: 'right', move: false }, { type: 'clone', x: 8, y: 17, direction: 'right', move: false }, { type: 'clone', x: 9, y: 18, direction: 'right', move: true }, { type: 'clone', x: 10, y: 18, direction: 'right', move: true }, { type: 'clone', x: 11, y: 18, direction: 'right', move: true }, { type: 'clone', x: 12, y: 18, direction: 'right', move: true }, { type: 'clone', x: 13, y: 18, direction: 'right', move: true }, { type: 'clone', x: 14, y: 18, direction: 'right', move: true }, { type: 'clone', x: 15, y: 18, direction: 'right', move: true }, { type: 'clone', x: 16, y: 18, direction: 'right', move: true }, { type: 'clone', x: 73, y: 14, direction: 'left', move: false }, { type: 'clone', x: 72, y: 14, direction: 'left', move: false }, { type: 'clone', x: 71, y: 15, direction: 'left', move: false }, { type: 'clone', x: 70, y: 15, direction: 'left', move: false }, { type: 'clone', x: 69, y: 16, direction: 'left', move: false }, { type: 'clone', x: 68, y: 16, direction: 'left', move: false }, { type: 'clone', x: 67, y: 17, direction: 'left', move: false }, { type: 'clone', x: 66, y: 17, direction: 'left', move: false }, { type: 'clone', x: 65, y: 18, direction: 'left', move: true }, { type: 'clone', x: 64, y: 18, direction: 'left', move: true }, { type: 'clone', x: 63, y: 18, direction: 'left', move: true }, { type: 'clone', x: 62, y: 18, direction: 'left', move: true }, { type: 'clone', x: 61, y: 18, direction: 'left', move: true }, { type: 'clone', x: 60, y: 18, direction: 'left', move: true }, { type: 'clone', x: 59, y: 18, direction: 'left', move: true }, { type: 'clone', x: 58, y: 18, direction: 'left', move: true }],
	  resources: {
	    images: ['img/bullet.png', 'img/clone.png', 'img/head.png', 'img/heros.png', 'img/items.png', 'img/scifi.png'],
	    audio: []
	  }
	}];

	exports.default = levels;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject = __webpack_require__(18);

	var _GameObject2 = _interopRequireDefault(_GameObject);

	var _Block2 = __webpack_require__(20);

	var _Block3 = _interopRequireDefault(_Block2);

	var _levels = __webpack_require__(16);

	var _levels2 = _interopRequireDefault(_levels);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Brick = function (_Block) {
	    _inherits(Brick, _Block);

	    function Brick() {
	        _classCallCheck(this, Brick);

	        var _this = _possibleConstructorReturn(this, (Brick.__proto__ || Object.getPrototypeOf(Brick)).call(this));

	        _this.isbackground = true;
	        return _this;
	    }

	    _createClass(Brick, [{
	        key: 'load',
	        value: function load() {
	            var src;
	            if (_levels2.default[window.env.game.current_screen.number].tileset) {
	                src = 'img/' + _levels2.default[window.env.game.current_screen.number].tileset + '.png';
	            } else {
	                src = 'img/scifi.png';
	            }
	            this.sprite = _ImageRepository2.default.get(src);
	        }
	    }, {
	        key: 'beforedraw',
	        value: function beforedraw() {
	            var frame = 0;
	            if (this.ingrid.y == 0 || window.env.game.current_screen.grid[this.ingrid.x][this.ingrid.y - 1].length > 0) {
	                frame += 1;
	            }
	            if (this.ingrid.y + 1 == window.env.game.current_screen.height || window.env.game.current_screen.grid[this.ingrid.x][this.ingrid.y + 1].length > 0) {
	                frame += 4;
	            }
	            if (this.ingrid.x == 0 || window.env.game.current_screen.grid[this.ingrid.x - 1][this.ingrid.y].length > 0) {
	                frame += 8;
	            }
	            if (this.ingrid.x + 1 == window.env.game.current_screen.width || window.env.game.current_screen.grid[this.ingrid.x + 1][this.ingrid.y].length > 0) {
	                frame += 2;
	            }
	            this.spriteoffset.x = frame * window.env.gui.display.tilesize;
	        }
	    }, {
	        key: 'gothru',
	        value: function gothru(character) {
	            return false;
	        }
	    }]);

	    return Brick;
	}(_Block3.default);

	;

	exports.default = Brick;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Lib = __webpack_require__(19);

	var _Lib2 = _interopRequireDefault(_Lib);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameObject = function () {
	    function GameObject() {
	        _classCallCheck(this, GameObject);

	        this.type = 'object';
	        this.id = null;
	        this.isbackground = false;
	        this.coords = { x: null, y: null };
	        this.ingrid = { x: null, y: null };
	        this.oldcoords = { x: null, y: null };
	        this.movement = { x: 0, y: 0 };
	        this.sprite = new Image();
	        this.spriteoffset = { x: 0, y: 0 };
	        this.spritesize = { x: 32, y: 32 };
	        this.hitbox = {
	            top: 0,
	            left: 0,
	            height: 32,
	            width: 32
	        };
	        this.checkobjectcollision = false;
	        this.fall = true;
	        this.gravity = 1;
	    }

	    _createClass(GameObject, [{
	        key: 'load',
	        value: function load() {}
	    }, {
	        key: 'event',
	        value: function event(_event) {
	            switch (_event.type) {
	                default:
	                    break;
	            }
	        }
	    }, {
	        key: 'beforedraw',
	        value: function beforedraw() {}
	    }, {
	        key: 'draw',
	        value: function draw(context) {
	            if (this.graphicComponent == undefined) {
	                console.log(this);
	            } else {
	                this.graphicComponent.draw(context);
	            }
	        }
	    }, {
	        key: 'process',
	        value: function process() {}
	    }, {
	        key: 'move',
	        value: function move() {
	            var grav = void 0;
	            if (!window.env.game.current_screen.grid) {
	                return;
	            }
	            this.oldcoords.x = this.coords.x;
	            this.oldcoords.y = this.coords.y;

	            if (this.fall) {
	                if (this.gravity != undefined) {
	                    grav = this.gravity;
	                } else {
	                    grav = 1;
	                }
	                this.movement.y = Math.min(15, this.movement.y + grav);
	            }
	            //Si on bouge latéralement
	            if (this.movement.x != 0) {
	                this.coords.x += this.movement.x;

	                //on regarde si  on dépasse du bord
	                if (this.coords.x + this.hitbox.left < 0) {
	                    this.coords.x = 0 - this.hitbox.left;
	                    this.movement.x = 0 - this.oldcoords.x;
	                } else if (this.coords.x + this.hitbox.left + this.hitbox.width > window.env.game.current_screen.width * window.env.gui.display.tilesize) {
	                    this.coords.x = window.env.game.current_screen.width * window.env.gui.display.tilesize - this.hitbox.left - this.hitbox.width - 1;
	                    this.movement.x = window.env.game.current_screen.width * window.env.gui.display.tilesize - this.hitbox.left - this.hitbox.width - 1 - this.oldcoords.x;
	                }

	                //sinon on regarde si il y a un mur
	                else {
	                        var col_left = Math.floor((this.coords.x + this.hitbox.left) / window.env.gui.display.tilesize);
	                        var col_right = Math.floor((this.coords.x + this.hitbox.left + this.hitbox.width) / window.env.gui.display.tilesize);

	                        var row_top = Math.floor((this.coords.y + this.hitbox.top) / window.env.gui.display.tilesize);
	                        var row_bottom = Math.floor((this.coords.y + this.hitbox.top + this.hitbox.height - 1) / window.env.gui.display.tilesize);

	                        var bump = false;

	                        if (this.movement.x < 0) {
	                            for (var k in window.env.game.current_screen.grid[col_left][row_top]) {
	                                if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_left][row_top][k])) {
	                                    this.coords.x = window.env.game.current_screen.grid[col_left][row_top][k].coords.x + window.env.game.current_screen.grid[col_left][row_top][k].hitbox.left + window.env.game.current_screen.grid[col_left][row_top][k].hitbox.width - this.hitbox.left;
	                                    bump = true;
	                                }
	                            }
	                            if (this.movement.x != 0 && row_bottom != row_top) {
	                                for (var k in window.env.game.current_screen.grid[col_left][row_bottom]) {
	                                    if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_left][row_bottom][k])) {
	                                        this.coords.x = window.env.game.current_screen.grid[col_left][row_bottom][k].coords.x + window.env.game.current_screen.grid[col_left][row_bottom][k].hitbox.left + window.env.game.current_screen.grid[col_left][row_bottom][k].hitbox.width - this.hitbox.left;
	                                        bump = true;
	                                    }
	                                }
	                            }
	                        } else {
	                            for (var k in window.env.game.current_screen.grid[col_right][row_top]) {
	                                if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_right][row_top][k])) {
	                                    this.coords.x = window.env.game.current_screen.grid[col_right][row_top][k].coords.x + window.env.game.current_screen.grid[col_right][row_top][k].hitbox.left - this.hitbox.left - this.hitbox.width - 1;
	                                    bump = true;
	                                }
	                            }
	                            if (this.movement.x != 0 && row_bottom != row_top) {
	                                for (var k in window.env.game.current_screen.grid[col_right][row_bottom]) {
	                                    if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_right][row_bottom][k])) {
	                                        this.coords.x = window.env.game.current_screen.grid[col_right][row_bottom][k].coords.x + window.env.game.current_screen.grid[col_right][row_bottom][k].hitbox.left - this.hitbox.left - this.hitbox.width - 1;
	                                        bump = true;
	                                    }
	                                }
	                            }
	                        }
	                        if (this.checkobjectcollision) {
	                            for (var i in window.env.game.current_screen.objects) {
	                                if (window.env.game.current_screen.objects[i].id != this.id && window.env.game.current_screen.objects[i].checkobjectcollision && _Lib2.default.detectCollision(this, window.env.game.current_screen.objects[i])) {
	                                    this.event({ type: 'bump' });
	                                }
	                            }
	                        }

	                        if (bump) {
	                            this.event({ type: 'bump' });
	                        }
	                    }
	            }

	            //mouvement vertical
	            if (this.movement.y != 0) {
	                this.coords.y += this.movement.y;

	                if (this.coords.y + this.hitbox.top < 0) {
	                    this.movement.y = 0;
	                    this.coords.y = 0 - this.hitbox.top;
	                } else if (this.coords.y + this.hitbox.top + this.hitbox.height > window.env.game.current_screen.height * window.env.gui.display.tilesize) {
	                    this.movement.y = 0;
	                    this.coords.y = window.env.game.current_screen.height * window.env.gui.display.tilesize - this.hitbox.top - this.hitbox.height;
	                } else {
	                    var col_left = Math.floor((this.coords.x + this.hitbox.left) / window.env.gui.display.tilesize);
	                    var col_right = Math.floor((this.coords.x + this.hitbox.left + this.hitbox.width) / window.env.gui.display.tilesize);

	                    var row_top = Math.floor((this.coords.y + this.hitbox.top) / window.env.gui.display.tilesize);
	                    var row_bottom = Math.floor((this.coords.y + this.hitbox.top + this.hitbox.height) / window.env.gui.display.tilesize);

	                    //Si on tombe
	                    if (this.movement.y > 0) {
	                        for (var k in window.env.game.current_screen.grid[col_left][row_bottom]) {
	                            if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_left][row_bottom][k])) {
	                                this.coords.y = window.env.game.current_screen.grid[col_left][row_bottom][k].coords.y + window.env.game.current_screen.grid[col_left][row_bottom][k].hitbox.top - this.hitbox.top - this.hitbox.height;
	                                this.movement.y = 0;
	                                this.canjump = true;
	                            }
	                        }
	                        if (this.movement.y != 0 && col_right != col_left) {
	                            for (var k in window.env.game.current_screen.grid[col_right][row_bottom]) {
	                                if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_right][row_bottom][k])) {
	                                    this.coords.y = window.env.game.current_screen.grid[col_right][row_bottom][k].coords.y + window.env.game.current_screen.grid[col_right][row_bottom][k].hitbox.top - this.hitbox.top - this.hitbox.height;
	                                    this.movement.y = 0;
	                                    this.canjump = true;
	                                }
	                            }
	                        }
	                        if (this.checkobjectcollision) {
	                            if (this.movement.y > 0) {
	                                for (var i in window.env.game.current_screen.objects) {
	                                    if (window.env.game.current_screen.objects[i].id != this.id && _Lib2.default.detectCollision(this, window.env.game.current_screen.objects[i])) {
	                                        this.coords.y = window.env.game.current_screen.objects[i].coords.y + window.env.game.current_screen.objects[i].hitbox.top - this.hitbox.top - this.hitbox.height - 1;
	                                        this.movement.y = 0;
	                                        this.canjump = true;
	                                    }
	                                }
	                            }
	                        }
	                    }
	                    //Si on saute
	                    else if (this.movement.y < 0) {
	                            //si on tape quelque chose
	                            if (window.env.game.current_screen.grid[Math.floor((this.coords.x + this.movement.x + this.hitbox.left) / window.env.gui.display.tilesize)][Math.floor((this.coords.y + this.movement.y + this.hitbox.top) / window.env.gui.display.tilesize)].length >= 1 || window.env.game.current_screen.grid[Math.floor((this.coords.x + this.movement.x + this.hitbox.left + this.hitbox.width) / window.env.gui.display.tilesize)][Math.floor((this.coords.y + this.movement.y + this.hitbox.top) / window.env.gui.display.tilesize)].length >= 1) {

	                                this.movement.y = 0;
	                            }
	                        }
	                }
	            }
	        }
	    }, {
	        key: 'gothru',
	        value: function gothru() {}
	    }, {
	        key: 'enter',
	        value: function enter() {}
	    }, {
	        key: 'exit',
	        value: function exit() {}
	    }, {
	        key: 'remove',
	        value: function remove() {
	            if (this.isbackground) {
	                for (var k in window.env.game.current_screen.grid[this.ingrid.x][this.ingrid.y]) {
	                    if (window.env.game.current_screen.grid[this.ingrid.x][this.ingrid.y][k].id == this.id) {
	                        window.env.game.current_screen.grid[this.ingrid.x][this.ingrid.y].splice(k, 1);
	                    }
	                }
	            } else {
	                for (var k in window.env.game.current_screen.objects) {
	                    if (window.env.game.current_screen.objects[k].id == this.id) {
	                        window.env.game.current_screen.objects.splice(k, 1);
	                    }
	                }
	            }
	        }
	    }]);

	    return GameObject;
	}();

	exports.default = GameObject;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var detectCollision = function detectCollision(object1, object2) {
	  var left1 = object1.coords.x + object1.hitbox.left;
	  var top1 = object1.coords.y + object1.hitbox.top;
	  var right1 = object1.coords.x + object1.hitbox.left + object1.hitbox.width;
	  var bottom1 = object1.coords.y + object1.hitbox.top + object1.hitbox.height;

	  var left2 = object2.coords.x + object2.hitbox.left;
	  var top2 = object2.coords.y + object2.hitbox.top;
	  var right2 = object2.coords.x + object2.hitbox.left + object2.hitbox.width;
	  var bottom2 = object2.coords.y + object2.hitbox.top + object2.hitbox.height;

	  if (left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1) {
	    return false;
	  } else {
	    return true;
	  }
	};

	var isFacing = function isFacing(object1, object2) {
	  var left1 = object1.coords.x + object1.hitbox.left;
	  var top1 = object1.coords.y + object1.hitbox.top;
	  var right1 = object1.coords.x + object1.hitbox.left + object1.hitbox.width;
	  var bottom1 = object1.coords.y + object1.hitbox.top + object1.hitbox.height;

	  var left2 = object2.coords.x + object2.hitbox.left;
	  var top2 = object2.coords.y + object2.hitbox.top;
	  var right2 = object2.coords.x + object2.hitbox.left + object2.hitbox.width;
	  var bottom2 = object2.coords.y + object2.hitbox.top + object2.hitbox.height;

	  if (top1 <= bottom2 && top2 <= bottom1) {
	    if (object1.direction == 'left' && right2 < left1 || object1.direction == 'right' && right1 < left2) {
	      return true;
	    }
	  }
	  return false;
	};

	exports.default = { detectCollision: detectCollision, isFacing: isFacing };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Block = function (_GameObject) {
	    _inherits(Block, _GameObject);

	    function Block() {
	        _classCallCheck(this, Block);

	        var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this));

	        _this.type = 'block';
	        return _this;
	    }

	    return Block;
	}(_GameObject3.default);

	exports.default = Block;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject = __webpack_require__(18);

	var _GameObject2 = _interopRequireDefault(_GameObject);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	var _Block2 = __webpack_require__(20);

	var _Block3 = _interopRequireDefault(_Block2);

	var _levels = __webpack_require__(16);

	var _levels2 = _interopRequireDefault(_levels);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Background = function (_Block) {
	    _inherits(Background, _Block);

	    function Background() {
	        _classCallCheck(this, Background);

	        var _this = _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this));

	        _this.type = 'background';
	        _this.isbackground = true;
	        _this.spriteoffset = { 'x': 0, 'y': 32 };
	        return _this;
	    }

	    _createClass(Background, [{
	        key: 'load',
	        value: function load() {
	            var src;
	            if (_levels2.default[window.env.game.current_screen.number].tileset) {
	                src = 'img/' + _levels2.default[window.env.game.current_screen.number].tileset + '.png';
	            } else {
	                src = 'img/scifi.png';
	            }
	            this.sprite = _ImageRepository2.default.get(src);
	        }
	    }, {
	        key: 'gothru',
	        value: function gothru(character) {
	            return true;
	        }
	    }, {
	        key: 'beforedraw',
	        value: function beforedraw() {
	            var rand = Math.random();
	            if (_levels2.default[window.env.game.current_screen.number].tileset) {
	                if (rand > 0.98) {
	                    this.spriteoffset.x = 32;
	                } else {
	                    this.spriteoffset.x = 0;
	                }
	            } else {
	                if (rand > 0.9) {
	                    this.spriteoffset.x = 32;
	                } else if (rand > 0.88) {
	                    this.spriteoffset.x = 64;
	                } else {
	                    this.spriteoffset.x = 0;
	                }
	            }
	        }
	    }, {
	        key: 'draw',
	        value: function draw(context) {
	            var display_x = this.coords.x;
	            var display_y = this.coords.y;
	            context.drawImage(this.sprite, this.spriteoffset.x, this.spriteoffset.y, this.spritesize.x, this.spritesize.y, display_x, display_y, this.spritesize.x, this.spritesize.y);
	        }
	    }]);

	    return Background;
	}(_Block3.default);

	exports.default = Background;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	var _ObjectCreator = __webpack_require__(23);

	var _ObjectCreator2 = _interopRequireDefault(_ObjectCreator);

	var _AiInputComponent = __webpack_require__(27);

	var _AiInputComponent2 = _interopRequireDefault(_AiInputComponent);

	var _KeyBoardManager = __webpack_require__(2);

	var _KeyBoardManager2 = _interopRequireDefault(_KeyBoardManager);

	var _Lib = __webpack_require__(19);

	var _Lib2 = _interopRequireDefault(_Lib);

	var _Menu = __webpack_require__(10);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _menus = __webpack_require__(13);

	var _menus2 = _interopRequireDefault(_menus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Character = function Character() {
	  this.player = null;
	  this.id = null;
	  this.type = 'character';
	  this.coords = { 'x': 32, 'y': 32 };
	  this.oldcoords = { 'x': 32, 'y': 32 };
	  this.sprite = new Image();
	  this.lastmove = 'right';
	  this.frame = 0;
	  this.animation_step = 0;
	  this.movement = { 'x': 0, 'y': 0 };
	  this.canjump = true;
	  this.height = 32;
	  this.width = 32;
	  this.hitbox = {
	    top: 10,
	    left: 11,
	    height: 22,
	    width: 12
	  };
	  this.status = {
	    type: 'normal',
	    time: new Date().getTime()
	  };
	  this.lives = 3;
	  this.collisions = [];
	};
	Character.prototype = {
	  load: function load(startposition, player) {
	    this.sprite = _ImageRepository2.default.get('img/heros.png');

	    this.coords = {
	      'x': startposition.x * 32,
	      'y': startposition.y * 32
	    };
	    if (player != undefined) {
	      this.player = player;
	    } else {
	      this.input = new _AiInputComponent2.default(this);
	    }
	  },
	  gothru: function gothru(character) {
	    return true;
	  },
	  enter: function enter(character) {
	    return true;
	  },
	  exit: function exit(character) {
	    return true;
	  },
	  hurt: function hurt() {
	    this.status.type = 'blink';
	    this.status.time = new Date().getTime();
	    //this.status.duration = 1000;
	    this.status.duration = 0;
	    var obj = _ObjectCreator2.default.createObjet({ type: 'flyingtext' }, this.coords.x + 16, this.coords.y + 16);
	    obj.font = 'bold 10px monospace';
	    obj.text = 'OUCH';

	    for (var i = 0; i < 30; i++) {
	      var particle = _ObjectCreator2.default.createObjet({ type: 'particle' }, this.coords.x, this.coords.y + 16);
	      //particle.movement.x = Math.random()*4 - 2;
	      //particle.movement.y = 0 - Math.random()*4;

	      var speed = Math.random() * 4;
	      var angle = Math.random() * 90 - 45;

	      particle.movement.x = (0 - speed) * Math.sin(angle / 180 * Math.PI);
	      particle.movement.y = (0 - speed) * Math.cos(angle / 180 * Math.PI);
	    }
	  },
	  loselife: function loselife() {
	    if (this.player !== null) {
	      this.player.loselife();
	    } else {
	      this.die();
	    }
	  },
	  die: function die() {
	    var obj = _ObjectCreator2.default.createObjet({ type: 'flyingtext' }, this.coords.x + 16, this.coords.y + 16);
	    obj.font = 'bold 10px monospace';
	    obj.text = 'AAARGHH...';
	    obj = _ObjectCreator2.default.createObjet({ type: 'flyingtext' }, this.coords.x + 16, this.coords.y);
	    obj.text = window.env.game.score + ' PTS';
	    obj.duration = 3000;
	    this.status.type = 'dead';
	    this.status.time = new Date().getTime();

	    for (var i = 0; i < 300; i++) {
	      var particle = _ObjectCreator2.default.createObjet({ type: 'particle' }, this.coords.x, this.coords.y + 16);
	      var speed = Math.random() * 6;
	      var angle = Math.random() * 90 - 45;

	      particle.movement.x = (0 - speed) * Math.sin(angle / 180 * Math.PI);
	      particle.movement.y = (0 - speed) * Math.cos(angle / 180 * Math.PI);
	    }
	  },
	  blockMovement: function blockMovement(direction, object) {
	    switch (direction) {
	      case 'down':
	        this.canjump = true;
	        this.coords.y = object.coords.y + object.hitbox.top - (this.hitbox.top + this.hitbox.height) - 1;
	        this.movement.y = 0;
	        break;
	      case 'up':
	        this.coords.y -= this.movement.y;
	        this.movement.y = 0;
	        break;
	      case 'left':
	        this.coords.x -= this.movement.x;
	        this.movement.x = 0;
	        break;
	      case 'right':
	        this.coords.x -= this.movement.x;
	        this.movement.x = 0;
	        break;
	    }
	  },
	  move: function move() {
	    var direction;

	    this.oldcoords.x = this.coords.x;
	    this.oldcoords.y = this.coords.y;

	    // vertical movement
	    if (this.movement.y != 0) {
	      this.coords.y += this.movement.y;

	      if (this.coords.y + this.hitbox.top < 0) {
	        this.movement.y = 0;
	        this.coords.y = 0 - this.hitbox.top;
	      } else if (this.coords.y + this.hitbox.top + this.hitbox.height > window.env.game.current_screen.height * window.env.gui.display.tilesize) {
	        this.movement.y = 0;
	        this.coords.y = window.env.game.current_screen.height * window.env.gui.display.tilesize - this.hitbox.top - this.hitbox.height;
	      } else {
	        var col_left = Math.floor((this.coords.x + this.hitbox.left) / window.env.gui.display.tilesize);
	        var col_right = Math.floor((this.coords.x + this.hitbox.left + this.hitbox.width) / window.env.gui.display.tilesize);
	        var row_top = Math.floor((this.coords.y + this.hitbox.top) / window.env.gui.display.tilesize);
	        var row_bottom = Math.floor((this.coords.y + this.hitbox.top + this.hitbox.height) / window.env.gui.display.tilesize);

	        // When we’re falling
	        if (this.movement.y > 0) {
	          if (window.env.game.current_screen.grid == undefined) {
	            return;
	          }
	          for (var k in window.env.game.current_screen.grid[col_left][row_bottom]) {
	            if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_left][row_bottom][k])) {
	              this.coords.y = window.env.game.current_screen.grid[col_left][row_bottom][k].coords.y + window.env.game.current_screen.grid[col_left][row_bottom][k].hitbox.top - this.hitbox.top - this.hitbox.height;
	              this.movement.y = 0;
	            }
	          }
	          if (this.movement.y != 0 && col_right != col_left) {
	            for (var k in window.env.game.current_screen.grid[col_right][row_bottom]) {
	              if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_right][row_bottom][k])) {
	                this.coords.y = window.env.game.current_screen.grid[col_right][row_bottom][k].coords.y + window.env.game.current_screen.grid[col_right][row_bottom][k].hitbox.top - this.hitbox.top - this.hitbox.height;
	                this.movement.y = 0;
	              }
	            }
	          }

	          if (this.movement.y == 0 && !_KeyBoardManager2.default.isDown(_KeyBoardManager2.default.UP)) {
	            this.canjump = true;
	          } else if (this.movement.y > 0) {
	            this.canjump = false;
	          }
	        }
	        // When we’re jumping
	        else if (this.movement.y < 0) {
	            // Bumping into something
	            if (window.env.game.current_screen.grid[Math.floor((this.coords.x + this.hitbox.left) / window.env.gui.display.tilesize)][Math.floor((this.coords.y + this.movement.y + this.hitbox.top) / window.env.gui.display.tilesize)].length >= 1 || window.env.game.current_screen.grid[Math.floor((this.coords.x + this.hitbox.left + this.hitbox.width) / window.env.gui.display.tilesize)][Math.floor((this.coords.y + this.movement.y + this.hitbox.top) / window.env.gui.display.tilesize)].length >= 1) {

	              this.movement.y = 0; //(Math.floor((this.coords.y + this.hitbox.top)/window.env.gui.display.tilesize) * window.env.gui.display.tilesize) - (this.coords.y + this.hitbox.top);
	            }
	          }
	      }
	    }

	    if (this.movement.y > 0) {
	      direction = 'down';
	    } else if (this.movement.y < 0) {
	      direction = 'up';
	    }

	    /*if (this.status.type == 'normal'){
	      for(var i in window.env.game.current_screen.objects){
	        if (Lib.detectCollision(this, window.env.game.current_screen.objects[i])){
	          window.env.game.current_screen.objects[i].gothru(this, direction);
	        }
	      }
	    }*/

	    // Moving horizontally
	    if (this.movement.x != 0) {
	      this.coords.x += this.movement.x;

	      //on regarde si  on dépasse du bord
	      if (this.coords.x + this.hitbox.left < 0) {
	        this.coords.x = 0 - this.hitbox.left;
	        this.movement.x = 0 - this.oldcoords.x;
	      } else if (this.coords.x + this.hitbox.left + this.hitbox.width > window.env.game.current_screen.width * window.env.gui.display.tilesize) {
	        this.coords.x = window.env.game.current_screen.width * window.env.gui.display.tilesize - this.hitbox.left - this.hitbox.width - 1;
	        this.movement.x = window.env.game.current_screen.width * window.env.gui.display.tilesize - this.hitbox.left - this.hitbox.width - 1 - this.oldcoords.x;
	      }
	      //sinon on regarde si il y a un mur
	      else {
	          var col_left = Math.floor((this.coords.x + this.hitbox.left) / window.env.gui.display.tilesize);
	          var col_right = Math.floor((this.coords.x + this.hitbox.left + this.hitbox.width) / window.env.gui.display.tilesize);

	          var row_top = Math.floor((this.coords.y + this.hitbox.top) / window.env.gui.display.tilesize);
	          var row_bottom = Math.floor((this.coords.y + this.hitbox.top + this.hitbox.height - 1) / window.env.gui.display.tilesize);

	          if (this.movement.x < 0) {
	            for (var k in window.env.game.current_screen.grid[col_left][row_top]) {
	              if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_left][row_top][k])) {
	                this.coords.x = window.env.game.current_screen.grid[col_left][row_top][k].coords.x + window.env.game.current_screen.grid[col_left][row_top][k].hitbox.left + window.env.game.current_screen.grid[col_left][row_top][k].hitbox.width - this.hitbox.left;
	                this.movement.x = 0;
	              }
	            }
	            if (this.movement.x != 0 && row_bottom != row_top) {
	              for (k in window.env.game.current_screen.grid[col_left][row_bottom]) {
	                if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_left][row_bottom][k])) {
	                  this.coords.x = window.env.game.current_screen.grid[col_left][row_bottom][k].coords.x + window.env.game.current_screen.grid[col_left][row_bottom][k].hitbox.left + window.env.game.current_screen.grid[col_left][row_bottom][k].hitbox.width - this.hitbox.left;
	                  this.movement.x = 0;
	                }
	              }
	            }
	          } else {
	            for (var k in window.env.game.current_screen.grid[col_right][row_top]) {
	              if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_right][row_top][k])) {
	                this.coords.x = window.env.game.current_screen.grid[col_right][row_top][k].coords.x + window.env.game.current_screen.grid[col_right][row_top][k].hitbox.left - this.hitbox.left - this.hitbox.width - 1;
	                this.movement.x = 0;
	              }
	            }
	            if (this.movement.x != 0 && row_bottom != row_top) {
	              for (var k in window.env.game.current_screen.grid[col_right][row_bottom]) {
	                if (_Lib2.default.detectCollision(this, window.env.game.current_screen.grid[col_right][row_bottom][k])) {
	                  this.coords.x = window.env.game.current_screen.grid[col_right][row_bottom][k].coords.x + window.env.game.current_screen.grid[col_right][row_bottom][k].hitbox.left - this.hitbox.left - this.hitbox.width - 1;
	                  this.movement.x = 0;
	                }
	              }
	            }
	          }
	        }
	    }

	    if (this.movement.x < 0) {
	      direction = 'left';
	    } else if (this.movement.x > 0) {
	      direction = 'right';
	    }

	    var oldCollisions = this.collisions;
	    var newCollisions = [];

	    if (this.status.type == 'normal') {
	      for (var i in window.env.game.current_screen.objects) {
	        if (window.env.game.current_screen.objects[i].id != this.id && _Lib2.default.detectCollision(this, window.env.game.current_screen.objects[i])) {
	          newCollisions.push(window.env.game.current_screen.objects[i].id);
	          if (oldCollisions.indexOf(window.env.game.current_screen.objects[i].id) === -1) {
	            window.env.game.current_screen.objects[i].enter(this, direction);
	          }

	          window.env.game.current_screen.objects[i].gothru(this, direction);
	        }
	      }
	    }
	    this.collisions = newCollisions;

	    for (var i in oldCollisions) {
	      var objId = oldCollisions[i];
	      if (newCollisions.indexOf(objId)) {
	        var o = window.env.game.current_screen.objects.find(function (obj) {
	          return obj.id == objId;
	        });
	        // The object may have just disappeared
	        if (o != undefined) {
	          o.exit();
	        }
	      }
	    }
	  },
	  process: function process() {
	    var col_left, col_right, row_top, row_bottom;
	    var direction = 'none';
	    var time = new Date().getTime();

	    this.input.process();

	    if (window.env.game.current_screen.limited_time && this.status.type != 'dead' && Math.floor((time - window.env.game.current_screen.starttime) / 1000) > window.env.game.current_screen.timeout) {
	      this.die();
	    }

	    if (this.status.type == 'dead' && this.status.time + 3000 < time) {
	      window.env.game.score = 0;
	      window.env.game.current_screen.stop();
	      window.env.game.current_screen = new _Menu2.default();
	      window.env.game.current_screen.load(_menus2.default['gameover']);
	      window.env.game.current_screen.start();
	    }

	    if (this.status.type != 'disabled' && this.status.type != 'dead') {
	      if (this.input.goLeft) {
	        this.movement.x = Math.max(-4, this.movement.x - 1);
	        this.lastmove = 'left';
	      } else if (this.input.goRight) {
	        this.movement.x = Math.min(4, this.movement.x + 1);
	        this.lastmove = 'right';
	      } else {
	        this.movement.x = 0;
	      }

	      if (this.input.goUp && this.canjump) {
	        window.env.gui.audio.playSound('audio/Jump.ogg');
	        this.movement.y = -8;
	        this.canjump = false;
	      }

	      if (this.input.goUp && this.movement.y <= 0) {
	        this.movement.y = Math.min(15, this.movement.y + 0.3);
	      } else {
	        this.movement.y = Math.min(15, this.movement.y + 0.5);
	      }
	    } else {
	      this.movement.x = 0;
	      this.movement.y = Math.min(15, this.movement.y + 1);
	    }

	    this.move();
	  },
	  draw: function draw(context) {
	    var time = new Date().getTime();
	    if (this.status.type == 'blink') {
	      if (this.status.time + this.status.duration > time) {
	        if (time % 200 < 25) {
	          return;
	        }
	      } else {
	        this.status.type = 'normal';
	      }
	    } else if (this.status.type == 'disabled') {
	      return;
	    }

	    if (this.input.goLeft || this.input.goRight && !this.movement.y) {
	      this.animation_step = (this.animation_step + 1) % 12;
	      this.frame = Math.floor(this.animation_step / 4);
	    } else {
	      this.frame = this.animation_step = 0;
	    }

	    var h = 0;
	    switch (this.lastmove) {
	      case 'up':
	      case 'down':
	        break;
	      case 'right':
	      default:
	        if (this.movement.y) {
	          h = 4;
	          this.frame = 0;
	        } else if (this.movement.x) {
	          h = 2;
	        } else {
	          h = 0;
	          this.frame = 0;
	        }
	        break;
	      case 'left':
	        if (this.movement.y) {
	          h = 5;
	          this.frame = 0;
	        } else if (this.movement.x) {
	          h = 3;
	        } else {
	          h = 1;
	          this.frame = 0;
	        }
	        break;
	    }

	    if (this.status.type == 'dead') {
	      if (this.status.time + 200 > time) {
	        this.frame = 1;
	      } else if (this.status.time + 400 > time) {
	        this.frame = 2;
	      } else {
	        this.frame = 0;
	      }
	      switch (this.lastmove) {
	        case 'right':
	          h = 8;
	          break;
	        case 'left':
	          h = 9;
	          break;
	      }
	    }

	    var display_x = Math.round(this.coords.x);
	    var display_y = Math.round(this.coords.y);

	    context.drawImage(this.sprite, Math.floor(this.frame) * 32, h * 32, 32, 32, (display_x - window.env.gui.display.offset_x) * window.env.gui.display.zoom, (display_y - window.env.gui.display.offset_y) * window.env.gui.display.zoom, 32 * window.env.gui.display.zoom, 32 * window.env.gui.display.zoom);
	  }
	};

	exports.default = Character;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Bullet = __webpack_require__(24);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	var _Particle = __webpack_require__(25);

	var _Particle2 = _interopRequireDefault(_Particle);

	var _Clone = __webpack_require__(26);

	var _Clone2 = _interopRequireDefault(_Clone);

	var _Pike = __webpack_require__(29);

	var _Pike2 = _interopRequireDefault(_Pike);

	var _Laser = __webpack_require__(30);

	var _Laser2 = _interopRequireDefault(_Laser);

	var _Timer = __webpack_require__(31);

	var _Timer2 = _interopRequireDefault(_Timer);

	var _Switch = __webpack_require__(32);

	var _Switch2 = _interopRequireDefault(_Switch);

	var _FlyingThing = __webpack_require__(33);

	var _FlyingThing2 = _interopRequireDefault(_FlyingThing);

	var _FlyingText = __webpack_require__(34);

	var _FlyingText2 = _interopRequireDefault(_FlyingText);

	var _Gem = __webpack_require__(35);

	var _Gem2 = _interopRequireDefault(_Gem);

	var _Platform = __webpack_require__(36);

	var _Platform2 = _interopRequireDefault(_Platform);

	var _Door = __webpack_require__(37);

	var _Door2 = _interopRequireDefault(_Door);

	var _Text = __webpack_require__(38);

	var _Text2 = _interopRequireDefault(_Text);

	var _GraphicComponent = __webpack_require__(39);

	var _GraphicComponent2 = _interopRequireDefault(_GraphicComponent);

	var _levels = __webpack_require__(16);

	var _levels2 = _interopRequireDefault(_levels);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ObjectCreator = function () {
	  function ObjectCreator() {
	    _classCallCheck(this, ObjectCreator);

	    this.seqValue = 2;
	  }

	  _createClass(ObjectCreator, [{
	    key: 'seqNext',
	    value: function seqNext() {
	      return this.seqValue++;
	    }
	  }, {
	    key: 'createObjet',
	    value: function createObjet(proto, x, y) {
	      var objet = void 0,
	          maxlevel = void 0;

	      switch (proto.type) {
	        case 'bullet':
	          objet = new _Bullet2.default(proto);
	          break;
	        case 'particle':
	          objet = new _Particle2.default(proto);
	          break;
	        case 'clone':
	          objet = new _Clone2.default(proto);
	          break;
	        case 'pike':
	          objet = new _Pike2.default();
	          break;
	        case 'laser':
	          objet = new _Laser2.default(proto);
	          break;
	        case 'timer':
	          objet = new _Timer2.default(proto);
	          break;
	        case 'switch':
	          objet = new _Switch2.default(proto);
	          break;
	        case 'flyingthing':
	          objet = new _FlyingThing2.default(proto);
	          break;
	        case 'flyingtext':
	          objet = new _FlyingText2.default(proto);
	          break;
	        case 'gem':
	          objet = new _Gem2.default(proto);
	          break;
	        case 'platform':
	          objet = new _Platform2.default(proto);
	          break;
	        case 'door':
	          maxlevel = localStorage.getItem('maxlevel');
	          objet = new _Door2.default(proto);
	          break;
	        case 'text':
	          objet = new _Text2.default(proto);
	          break;
	      }

	      objet.id = this.seqNext();
	      objet.coords.x = x;
	      objet.coords.y = y;
	      objet.load();
	      objet.graphicComponent = new _GraphicComponent2.default(objet);
	      window.env.game.current_screen.objects.push(objet);
	      return objet;
	    }
	  }, {
	    key: 'createBackgroundObjet',
	    value: function createBackgroundObjet(objet, x, y) {
	      var id = this.seqNext();
	      objet.id = id;
	      objet.coords.x = x * window.env.gui.display.tilesize;
	      objet.coords.y = y * window.env.gui.display.tilesize;
	      objet.ingrid = { x: x, y: y };
	      objet.load();
	      objet.graphicComponent = new _GraphicComponent2.default(objet);
	      window.env.game.current_screen.grid[x][y].push(objet);
	    }
	  }]);

	  return ObjectCreator;
	}();

	var instance = new ObjectCreator();

	exports.default = instance;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bullet = function (_GameObject) {
	    _inherits(Bullet, _GameObject);

	    function Bullet() {
	        _classCallCheck(this, Bullet);

	        var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this));

	        _this.spriteoffset = { x: 0, y: 0 };
	        _this.hitbox = {
	            top: 0,
	            left: 1,
	            height: 3,
	            width: 4
	        };
	        _this.spritesize = { x: 6, y: 3 };
	        _this.movement = { x: 0, y: 0 };
	        _this.fall = false;
	        return _this;
	    }

	    _createClass(Bullet, [{
	        key: 'load',
	        value: function load() {
	            this.sprite = _ImageRepository2.default.get('img/bullet.png');
	        }
	    }, {
	        key: 'process',
	        value: function process() {
	            this.move();
	        }
	    }, {
	        key: 'event',
	        value: function event(_event) {
	            switch (_event.type) {
	                case 'bump':
	                    this.remove();
	            }
	        }
	    }, {
	        key: 'gothru',
	        value: function gothru(character, direction) {
	            character.movement.y *= -0.5;
	            character.movement.x *= -1;
	            character.loselife();
	            this.remove();
	        }
	    }]);

	    return Bullet;
	}(_GameObject3.default);

	;

	exports.default = Bullet;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Particle = function (_GameObject) {
	    _inherits(Particle, _GameObject);

	    function Particle() {
	        _classCallCheck(this, Particle);

	        var _this = _possibleConstructorReturn(this, (Particle.__proto__ || Object.getPrototypeOf(Particle)).call(this));

	        _this.hitbox = {
	            top: 0,
	            left: 0,
	            height: 1,
	            width: 1
	        };
	        _this.age = 0;
	        _this.maxage = 300;
	        _this.movement = { x: 0, y: 0 };
	        _this.gravity = 0.3;
	        return _this;
	    }

	    _createClass(Particle, [{
	        key: 'load',
	        value: function load() {}
	    }, {
	        key: 'process',
	        value: function process() {
	            this.age++;
	            if (this.age > this.maxage) {
	                this.remove();
	            } else {
	                this.move();
	            }
	        }
	    }, {
	        key: 'event',
	        value: function event(_event) {
	            switch (_event.type) {
	                case 'bump':
	                    this.remove();
	            }
	        }
	    }, {
	        key: 'gothru',
	        value: function gothru(character, direction) {}
	    }, {
	        key: 'draw',
	        value: function draw(context) {
	            var display_x = this.coords.x;
	            var display_y = this.coords.y;

	            context.fillStyle = 'rgba(255, 0, 0, 0.8)';

	            context.fillRect(display_x - window.env.gui.display.offset_x, display_y - window.env.gui.display.offset_y, this.hitbox.width, this.hitbox.height);
	        }
	    }]);

	    return Particle;
	}(_GameObject3.default);

	;

	exports.default = Particle;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	var _ObjectCreator = __webpack_require__(23);

	var _ObjectCreator2 = _interopRequireDefault(_ObjectCreator);

	var _AiInputComponent = __webpack_require__(27);

	var _AiInputComponent2 = _interopRequireDefault(_AiInputComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Clone = function (_GameObject) {
	    _inherits(Clone, _GameObject);

	    function Clone(proto) {
	        _classCallCheck(this, Clone);

	        var _this = _possibleConstructorReturn(this, (Clone.__proto__ || Object.getPrototypeOf(Clone)).call(this));

	        _this.spriteoffset = { 'x': 0, 'y': 0 };
	        _this.hitbox = {
	            top: 10,
	            left: 11,
	            height: 22,
	            width: 12
	        };
	        _this.frame = 0;
	        _this.animation_step = 0;
	        _this.movement = { 'x': 0, 'y': 0 };
	        _this.direction = 'right';
	        _this.looksback = false;
	        _this.lastswitch = new Date().getTime();
	        _this.lastshot = new Date().getTime();
	        _this.shooting = false;
	        _this.walks = proto.move;
	        if (proto.jumps != undefined && proto.jumps) {
	            _this.jumps = true;
	        }
	        _this.status = {
	            type: 'normal',
	            time: new Date().getTime()
	        };
	        _this.input = new _AiInputComponent2.default(_this);

	        _this.direction = proto.direction;
	        if (_this.walks) {
	            if (_this.direction == 'left') {
	                _this.movement.x = -1;
	                _this.spriteoffset.y = 224;
	            } else if (_this.direction == 'right') {
	                _this.movement.x = 1;
	                _this.spriteoffset.y = 192;
	            }
	        } else {
	            if (_this.direction == 'left') {
	                _this.spriteoffset.y = 32;
	            }
	        }
	        return _this;
	    }

	    _createClass(Clone, [{
	        key: 'load',
	        value: function load() {
	            this.sprite = _ImageRepository2.default.get('img/clone.png');
	        }
	    }, {
	        key: 'process',
	        value: function process() {
	            var time = new Date().getTime();

	            this.input.process();

	            if (this.status.type != 'disabled' && this.status.type != 'dead') {
	                if (this.walks && this.input.goLeft) {
	                    this.movement.x = -1;
	                } else if (this.walks && this.input.goRight) {
	                    this.movement.x = 1;
	                } else {
	                    this.movement.x = 0;
	                }

	                if (this.movement.x > 0) {
	                    this.spriteoffset.y = 192;
	                    this.direction = 'right';
	                } else if (this.movement.x < 0) {
	                    this.spriteoffset.y = 224;
	                    this.direction = 'left';
	                }

	                if (this.jumps) {
	                    if (this.input.goUp && this.canjump) {
	                        window.env.gui.audio.playSound('audio/Jump.ogg');
	                        this.movement.y = -10;
	                        this.canjump = false;
	                    }

	                    if (this.input.goUp && this.movement.y <= 0) {
	                        this.movement.y = Math.min(15, this.movement.y + 0.4);
	                    } else {
	                        this.movement.y = Math.min(15, this.movement.y + 1);
	                    }
	                }
	            } else {
	                this.movement.x = 0;
	                this.movement.y = Math.min(15, this.movement.y + 1);
	            }

	            this.move();

	            if (!this.shooting) {
	                //this.move();

	                if (this.movement.x != 0) {
	                    this.animation_step = (this.animation_step + 1) % 24;
	                    this.frame = Math.floor(this.animation_step / 8);
	                    this.spriteoffset.x = this.frame * this.spritesize.x;
	                }
	                /*else if ((Math.random() >= 0.90 && this.looksback && this.lastswitch + 1000 < time) || (Math.random() >= 0.95 && !this.looksback  && this.lastswitch + 2000 < time)){
	                    if (this.direction == 'right'){
	                        this.direction = 'left';
	                        this.spriteoffset.y = 32;
	                    }
	                    else{
	                        this.direction = 'right';
	                        this.spriteoffset.y = 0;
	                    }
	                    this.lastswitch = new Date().getTime();
	                    this.looksback = !this.looksback;
	                }
	                */
	            } else {
	                if (this.lastshot + 300 < time) {
	                    this.shooting = false;
	                    this.spriteoffset.x = 0;
	                    if (this.movement.x > 0) {
	                        this.spriteoffset.y = 192;
	                    } else if (this.movement.x < 0) {
	                        this.spriteoffset.y = 224;
	                    } else if (this.direction == 'right') {
	                        this.spriteoffset.y = 0;
	                    } else {
	                        this.spriteoffset.y = 32;
	                    }
	                }
	            }

	            if (window.env.game.current_screen.player != undefined) {
	                if (isFacing(this, window.env.game.current_screen.player.character)) {
	                    this.shoot();
	                }
	            }
	        }
	    }, {
	        key: 'event',
	        value: function event(_event) {
	            switch (_event.type) {
	                case 'bump':
	                    this.movement.x *= -1;
	                    if (this.movement.x > 0) {
	                        this.spriteoffset.y = 192;
	                        this.direction = 'right';
	                    } else {
	                        this.spriteoffset.y = 224;
	                        this.direction = 'left';
	                    }
	                    break;
	                default:
	                    //Do nothing
	                    break;
	            }
	        }
	    }, {
	        key: 'gothru',
	        value: function gothru(character, direction) {
	            character.movement.y *= -0.5;
	            character.movement.x *= -1;
	            character.loselife();
	        }
	    }, {
	        key: 'shoot',
	        value: function shoot() {
	            time = new Date().getTime();
	            if (this.lastshot + 1000 < time) {
	                var obj = void 0;
	                this.shooting = true;
	                this.spriteoffset.x = 32;
	                if (this.direction == 'left') {
	                    bullet = _ObjectCreator2.default.createObjet({ type: 'bullet' }, this.coords.x, this.coords.y + 16);
	                    bullet.movement.x = -3;
	                    bullet.spriteoffset.y = 3;
	                    this.spriteoffset.y = 32;
	                    obj = _ObjectCreator2.default.createObjet({ type: 'flyingtext' }, this.coords.x, this.coords.y + 16);
	                    obj.font = 'bold 10px monospace';
	                    obj.text = 'PEW';
	                } else {
	                    bullet = _ObjectCreator2.default.createObjet({ type: 'bullet' }, this.coords.x + 32, this.coords.y + 16);
	                    bullet.movement.x = 3;
	                    bullet.spriteoffset.y = 0;
	                    this.spriteoffset.y = 0;
	                    obj = _ObjectCreator2.default.createObjet({ type: 'flyingtext' }, this.coords.x + 32, this.coords.y + 16);
	                    obj.font = 'bold 10px monospace';
	                    obj.text = 'PEW';
	                }

	                this.lastshot = new Date().getTime();
	            }
	        }
	    }]);

	    return Clone;
	}(_GameObject3.default);

	;

	exports.default = Clone;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _InputComponent = __webpack_require__(28);

	var _InputComponent2 = _interopRequireDefault(_InputComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function AiInputComponent(object) {
	    _InputComponent2.default.call(this, object);
	    this.goLeft = false;
	    this.goRight = false;
	    this.goUp = false;
	    this.goDown = false;

	    this.direction = null;
	    this.jump = false;
	}
	AiInputComponent.prototype = new _InputComponent2.default();
	AiInputComponent.prototype.process = function () {
	    if (this.object.status.type == 'disabled' || this.object.status.type == 'dead') {
	        this.goLeft = false;
	        this.goRight = false;
	        this.goUp = false;
	        this.goDown = false;
	    } else {
	        var rand = Math.random();
	        if (this.direction == null) {
	            if (rand >= 0.98) {
	                this.direction = 'left';
	                this.goLeft = true;
	            } else if (rand >= 0.96) {
	                this.direction = 'right';
	                this.goRight = true;
	            }
	        } else {
	            if (rand >= 0.99) {
	                this.direction = null;
	                this.goLeft = false;
	                this.goRight = false;
	            }
	        }

	        rand = Math.random();
	        if (!this.jump && this.object.canjump) {
	            if (rand >= 0.99) {
	                this.jump = true;
	                this.goUp = true;
	            }
	        } else if (this.jump) {
	            if (rand >= 0.90) {
	                this.jump = false;
	                this.goUp = false;
	            }
	        }
	    }
	};

	exports.default = AiInputComponent;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function InputComponent(object) {
	    this.object = object;
	}
	InputComponent.prototype = {
	    process: function process() {}
	};

	function PlayerInputComponent(object, player) {
	    InputComponent.call(this, object);
	    this.player = player;
	    this.goLeft = false;
	    this.goRight = false;
	    this.goUp = false;
	    this.goDown = false;
	}
	PlayerInputComponent.prototype = new InputComponent();
	PlayerInputComponent.prototype.process = function () {
	    if (this.player.status.type == 'disabled' || this.player.status.type == 'dead') {
	        this.goLeft = false;
	        this.goRight = false;
	        this.goUp = false;
	        this.goDown = false;
	    } else {
	        this.goLeft = Key.isDown(this.player.keys.left);
	        this.goRight = Key.isDown(this.player.keys.right);
	        this.goUp = Key.isDown(this.player.keys.up);
	        //this.goDown = Key.isDown(this.player.keys.down);;
	    }
	};

	exports.default = InputComponent;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Pike = function (_GameObject) {
	    _inherits(Pike, _GameObject);

	    function Pike() {
	        _classCallCheck(this, Pike);

	        var _this = _possibleConstructorReturn(this, (Pike.__proto__ || Object.getPrototypeOf(Pike)).call(this));

	        _this.spriteoffset = { 'x': 0, 'y': 32 };
	        _this.hitbox = {
	            top: 16,
	            left: 0,
	            height: 16,
	            width: 32
	        };
	        return _this;
	    }

	    _createClass(Pike, [{
	        key: 'load',
	        value: function load() {
	            this.sprite = _ImageRepository2.default.get('img/items.png');
	        }
	    }, {
	        key: 'gothru',
	        value: function gothru(character, direction) {
	            character.die();
	        }
	    }]);

	    return Pike;
	}(_GameObject3.default);

	exports.default = Pike;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	var _ObjectCreator = __webpack_require__(23);

	var _ObjectCreator2 = _interopRequireDefault(_ObjectCreator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Laser = function (_GameObject) {
	  _inherits(Laser, _GameObject);

	  function Laser(proto) {
	    _classCallCheck(this, Laser);

	    var _this = _possibleConstructorReturn(this, (Laser.__proto__ || Object.getPrototypeOf(Laser)).call(this));

	    _this.spriteoffset = { 'x': 64, 'y': 32 };
	    _this.hitbox = {
	      top: 0,
	      left: 13,
	      height: 32,
	      width: 6
	    };
	    _this.enabled = true;

	    if (proto.trigger == undefined) {
	      proto.trigger = {
	        type: 'timer',
	        delay: 500,
	        coords: _this.coords
	      };
	    }

	    proto.trigger.callback = _this.toggle.bind(_this);

	    _this.trigger = _ObjectCreator2.default.createObjet(proto.trigger, proto.trigger.coords.x * 32, proto.trigger.coords.y * 32);
	    return _this;
	  }

	  _createClass(Laser, [{
	    key: 'load',
	    value: function load() {
	      this.sprite = _ImageRepository2.default.get('img/items.png');
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      this.enabled = true;
	      this.spriteoffset.x = 64;
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.enabled = false;
	      this.spriteoffset.x = 32;
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      if (this.enabled) {
	        this.disable();
	      } else {
	        this.enable();
	      }
	    }
	  }, {
	    key: 'gothru',
	    value: function gothru(character, direction) {
	      if (this.enabled) {
	        character.movement.y *= -0.5;
	        character.movement.x *= -1;
	        character.loselife();
	      }
	    }
	  }]);

	  return Laser;
	}(_GameObject3.default);

	;

	exports.default = Laser;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Timer = function (_GameObject) {
	  _inherits(Timer, _GameObject);

	  function Timer(proto) {
	    _classCallCheck(this, Timer);

	    var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this));

	    _this.callback = proto.callback;
	    _this.delay = proto.delay;
	    _this.lastswitch = new Date().getTime();
	    return _this;
	  }

	  _createClass(Timer, [{
	    key: 'process',
	    value: function process() {
	      var time = new Date().getTime();
	      if (this.lastswitch + this.delay < time) {
	        this.callback();
	        this.lastswitch = new Date().getTime();
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context) {}
	  }]);

	  return Timer;
	}(_GameObject3.default);

	exports.default = Timer;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Switch = function (_GameObject) {
	  _inherits(Switch, _GameObject);

	  function Switch(proto) {
	    _classCallCheck(this, Switch);

	    var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this));

	    _this.spriteoffset = { 'x': 32, 'y': 64 };
	    _this.hitbox = {
	      top: 16,
	      left: 8,
	      height: 16,
	      width: 16
	    };

	    _this.coords = proto.coords;
	    _this.fall = false;
	    _this.callback = proto.callback;
	    return _this;
	  }

	  _createClass(Switch, [{
	    key: 'move',
	    value: function move() {}
	  }, {
	    key: 'load',
	    value: function load() {
	      this.sprite = _ImageRepository2.default.get('img/items.png');
	    }
	  }, {
	    key: 'enter',
	    value: function enter() {
	      console.log('enter');
	      this.spriteoffset.x = 64;
	      this.callback();
	    }
	  }, {
	    key: 'exit',
	    value: function exit() {
	      this.spriteoffset.x = 32;
	      console.log('exit');
	      this.callback();
	    }
	  }]);

	  return Switch;
	}(_GameObject3.default);

	exports.default = Switch;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FlyingThing = function (_GameObject) {
	  _inherits(FlyingThing, _GameObject);

	  function FlyingThing(proto) {
	    _classCallCheck(this, FlyingThing);

	    var _this = _possibleConstructorReturn(this, (FlyingThing.__proto__ || Object.getPrototypeOf(FlyingThing)).call(this));

	    _this.spriteoffset = { 'x': 160, 'y': 32 };
	    _this.hitbox = {
	      top: 9,
	      left: 9,
	      height: 13,
	      width: 13
	    };
	    _this.speed = 1;
	    _this.path = [];
	    _this.movement = { 'x': 0, 'y': 0 };
	    _this.next = 0;
	    _this.fall = false;
	    _this.animation_step = 0;
	    _this.frame = 0;

	    if (proto) {
	      _this.path = proto.path;
	      if (proto.speed) {
	        _this.speed = proto.speed;
	      }
	    }
	    return _this;
	  }

	  _createClass(FlyingThing, [{
	    key: 'load',
	    value: function load() {
	      this.sprite = _ImageRepository2.default.get('img/items.png');
	    }
	  }, {
	    key: 'process',
	    value: function process() {
	      this.animation_step = (this.animation_step + 1) % 15;
	      this.frame = Math.floor(this.animation_step / 5);
	      this.spriteoffset.x = 160 + this.frame * this.spritesize.x;

	      if (this.path.length > 0) {
	        var next = { x: 0, y: 0 };
	        next.x = this.path[this.next].x * window.env.gui.display.tilesize;
	        next.y = this.path[this.next].y * window.env.gui.display.tilesize;
	        if (this.coords.x == next.x && this.coords.y == next.y) {
	          this.next++;
	          if (this.next >= this.path.length) {
	            this.next = 0;
	          }
	          this.movement = { 'x': 0, 'y': 0 };
	        } else {
	          if (this.coords.x < next.x) {
	            this.movement.x = this.speed;
	          } else if (this.coords.x > next.x) {
	            this.movement.x = -1 * this.speed;
	          }
	          if (this.coords.y < next.y) {
	            this.movement.y = this.speed;
	          } else if (this.coords.y > next.y) {
	            this.movement.y = -1 * this.speed;
	          }
	          this.move();
	        }
	      }
	    }
	  }, {
	    key: 'gothru',
	    value: function gothru(character, direction) {
	      character.movement.y *= -0.5;
	      character.movement.x *= -1;
	      character.loselife();
	    }
	  }]);

	  return FlyingThing;
	}(_GameObject3.default);

	exports.default = FlyingThing;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FlyingText = function (_GameObject) {
	    _inherits(FlyingText, _GameObject);

	    function FlyingText() {
	        _classCallCheck(this, FlyingText);

	        var _this = _possibleConstructorReturn(this, (FlyingText.__proto__ || Object.getPrototypeOf(FlyingText)).call(this));

	        _this.type = 'flyingtext';
	        _this.text = 'A';
	        _this.created = new Date().getTime();
	        _this.font = 'bold 16px monospace';
	        _this.duration = 1000;
	        return _this;
	    }

	    _createClass(FlyingText, [{
	        key: 'process',
	        value: function process() {
	            this.coords.y--;
	            var time = new Date().getTime();
	            if (this.created + this.duration < time) {
	                this.remove();
	            }
	        }
	    }, {
	        key: 'draw',
	        value: function draw(context) {
	            var time = new Date().getTime();
	            if (time - this.created > this.duration) {
	                return;
	            }
	            context.fillStyle = '#e6e0a1';
	            context.font = this.font;
	            context.textAlign = 'center';
	            context.globalAlpha = (this.duration - (time - this.created)) / this.duration;
	            context.fillText(this.text, this.coords.x - window.env.gui.display.offset_x, this.coords.y - window.env.gui.display.offset_y);
	            context.globalAlpha = 1;
	        }
	    }]);

	    return FlyingText;
	}(_GameObject3.default);

	;

	exports.default = FlyingText;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	var _ObjectCreator = __webpack_require__(23);

	var _ObjectCreator2 = _interopRequireDefault(_ObjectCreator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Gem = function (_GameObject) {
	    _inherits(Gem, _GameObject);

	    function Gem(proto) {
	        _classCallCheck(this, Gem);

	        var _this = _possibleConstructorReturn(this, (Gem.__proto__ || Object.getPrototypeOf(Gem)).call(this));

	        _this.spriteoffset = { 'x': 96, 'y': 32 };
	        _this.hitbox = {
	            top: 9,
	            left: 10,
	            height: 15,
	            width: 12
	        };
	        _this.value = 100;
	        _this.offset = 0;
	        _this.floating = 0.2;

	        if (proto.value) {
	            _this.value = proto.value;
	            if (_this.value == 1000) {
	                _this.spriteoffset.x += 32;
	                _this.hitbox = { top: 8, left: 8, height: 16, width: 16 };
	            }
	        }
	        return _this;
	    }

	    _createClass(Gem, [{
	        key: 'load',
	        value: function load() {
	            this.sprite = _ImageRepository2.default.get('img/items.png');
	        }
	    }, {
	        key: 'process',
	        value: function process() {
	            this.offset += this.floating;
	            this.coords.y += this.floating;

	            if (this.offset > 2 || this.offset < -2) {
	                this.floating *= -1;
	            }
	        }
	    }, {
	        key: 'gothru',
	        value: function gothru(character, direction) {
	            window.env.game.score += this.value;
	            var obj = _ObjectCreator2.default.createObjet({ type: 'flyingtext' }, this.coords.x + 16, this.coords.y);
	            obj.text = this.value;
	            this.remove();
	        }
	    }]);

	    return Gem;
	}(_GameObject3.default);

	exports.default = Gem;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Platform = function (_GameObject) {
	    _inherits(Platform, _GameObject);

	    function Platform(proto) {
	        _classCallCheck(this, Platform);

	        var _this = _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this));

	        _this.spriteoffset = { 'x': 0, 'y': 64 };
	        _this.hitbox = {
	            top: 24,
	            left: 0,
	            height: 8,
	            width: 32
	        };
	        _this.speed = 1;
	        _this.path = [];
	        _this.movement = { 'x': 0, 'y': 0 };
	        _this.next = 0;
	        _this.fall = false;
	        if (proto) {
	            _this.path = proto.path;
	            if (proto.speed) {
	                _this.speed = proto.speed;
	            }
	        }
	        return _this;
	    }

	    _createClass(Platform, [{
	        key: 'load',
	        value: function load() {
	            this.sprite = _ImageRepository2.default.get('img/items.png');
	        }
	    }, {
	        key: 'gothru',
	        value: function gothru(character, direction) {
	            if (direction == 'down' && character.coords.y + character.hitbox.top + character.hitbox.height - character.movement.y <= this.coords.y + this.hitbox.top) {
	                character.blockMovement(direction, this);
	                character.coords.x += this.movement.x;
	                character.coords.y += this.movement.y;
	            }
	        }
	    }, {
	        key: 'process',
	        value: function process() {
	            if (this.path.length > 0) {
	                var next = { x: 0, y: 0 };
	                next.x = this.path[this.next].x * window.env.gui.display.tilesize;
	                next.y = this.path[this.next].y * window.env.gui.display.tilesize;
	                if (this.coords.x == next.x && this.coords.y == next.y) {
	                    this.next++;
	                    if (this.next >= this.path.length) {
	                        this.next = 0;
	                    }
	                    this.movement = { 'x': 0, 'y': 0 };
	                } else {
	                    if (this.coords.x < next.x) {
	                        this.movement.x = this.speed;
	                    } else if (this.coords.x > next.x) {
	                        this.movement.x = -1 * this.speed;
	                    }
	                    if (this.coords.y < next.y) {
	                        this.movement.y = this.speed;
	                    } else if (this.coords.y > next.y) {
	                        this.movement.y = -1 * this.speed;
	                    }
	                    this.move();
	                }
	            }
	        }
	    }]);

	    return Platform;
	}(_GameObject3.default);

	exports.default = Platform;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	var _ImageRepository = __webpack_require__(5);

	var _ImageRepository2 = _interopRequireDefault(_ImageRepository);

	var _ObjectCreator = __webpack_require__(23);

	var _ObjectCreator2 = _interopRequireDefault(_ObjectCreator);

	var _Level = __webpack_require__(15);

	var _Level2 = _interopRequireDefault(_Level);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Door = function (_GameObject) {
	  _inherits(Door, _GameObject);

	  function Door(proto) {
	    _classCallCheck(this, Door);

	    var _this = _possibleConstructorReturn(this, (Door.__proto__ || Object.getPrototypeOf(Door)).call(this));

	    _this.spriteoffset = { 'x': 0, 'y': 0 };
	    _this.hitbox = {
	      top: 20,
	      left: 14,
	      height: 9,
	      width: 4
	    };
	    _this.activated = false;
	    _this.activation_date = null;
	    _this.animation_step = 0;
	    _this.destination = 0;
	    _this.frame = 0;

	    _this.destination = proto.destination;
	    return _this;
	  }

	  _createClass(Door, [{
	    key: 'load',
	    value: function load() {
	      this.sprite = _ImageRepository2.default.get('img/items.png');
	    }
	  }, {
	    key: 'process',
	    value: function process() {
	      var time = new Date().getTime();
	      if (this.activated) {
	        this.animation_step = (this.animation_step + 1) % 14;
	        this.frame = Math.floor(this.animation_step / 2) + 1;
	        this.spriteoffset.x = this.frame * this.spritesize.x;

	        if (this.activation_date + 800 < time) {
	          var maxlevel = localStorage.getItem('maxlevel');
	          if (parseInt(maxlevel) < this.destination) {
	            localStorage.setItem('maxlevel', this.destination);
	          }

	          window.env.game.current_screen.stop();
	          window.env.game.current_screen = new _Level2.default();
	          window.env.game.current_screen.loadSingle(this.destination);
	          window.env.game.current_screen.start();
	        }
	      }
	    }
	  }, {
	    key: 'gothru',
	    value: function gothru(character) {
	      var time = new Date().getTime();
	      character.status = {
	        type: 'disabled',
	        time: time
	      };
	      this.activated = true;
	      this.activation_date = time;

	      if (window.env.game.current_screen.limited_time) {
	        var bonus = window.env.game.current_screen.getTimeLeft(time) * 10;
	        window.env.game.score += bonus;
	        var obj = _ObjectCreator2.default.createObjet({ type: 'flyingtext' }, this.coords.x + 16, this.coords.y);
	        obj.text = '+' + bonus;
	      }

	      return true;
	    }
	  }]);

	  return Door;
	}(_GameObject3.default);

	exports.default = Door;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GameObject2 = __webpack_require__(18);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Text = function (_GameObject) {
	    _inherits(Text, _GameObject);

	    function Text(proto) {
	        _classCallCheck(this, Text);

	        var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

	        _this.text = proto.text;
	        _this.type = 'text';
	        _this.isbackground = true;
	        _this.font = 'bold 16px monospace';
	        return _this;
	    }

	    _createClass(Text, [{
	        key: 'draw',
	        value: function draw(context) {
	            context.fillStyle = '#888f91';
	            context.font = this.font;
	            context.textAlign = 'left';
	            //context.textBaseline = 'top';
	            context.fillText(this.text, this.coords.x + 8, this.coords.y + 23 - window.env.gui.display.offset_x);
	            context.fillStyle = '#2c2d47';
	            context.fillText(this.text, this.coords.x + 7, this.coords.y + 22 - window.env.gui.display.offset_x);
	        }
	    }]);

	    return Text;
	}(_GameObject3.default);

	exports.default = Text;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function GraphicComponent(object) {
	  this.object = object;
	}
	GraphicComponent.prototype = {
	  draw: function draw(context) {
	    var display_x = this.object.coords.x;
	    var display_y = this.object.coords.y;
	    context.drawImage(this.object.sprite, this.object.spriteoffset.x, this.object.spriteoffset.y, this.object.spritesize.x, this.object.spritesize.y, (display_x - window.env.gui.display.offset_x) * window.env.gui.display.zoom, (display_y - window.env.gui.display.offset_y) * window.env.gui.display.zoom, this.object.spritesize.x * window.env.gui.display.zoom, this.object.spritesize.y * window.env.gui.display.zoom);
	    /*
	    context.fillStyle   = 'rgba(255, 255, 255, 0.5)';
	    context.fillRect(display_x - window.env.gui.display.offset_x + this.hitbox.left, display_y - window.env.gui.display.offset_y + this.hitbox.top, this.hitbox.width, this.hitbox.height);
	    */
	  }
	};

	function TextGraphicComponent(object) {
	  GraphicComponent.call(GraphicComponent, object);
	}
	TextGraphicComponent.prototype = {
	  draw: function draw() {
	    context.fillStyle = '#888f91';
	    context.font = this.font;
	    context.textAlign = 'left';
	    //context.textBaseline = 'top';
	    context.fillText(this.text, this.coords.x + 8, this.coords.y + 23 - window.env.gui.display.offset_x);
	    context.fillStyle = '#2c2d47';
	    context.fillText(this.text, this.coords.x + 7, this.coords.y + 22 - window.env.gui.display.offset_x);
	  }
	};

	exports.default = GraphicComponent;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _PlayerInputComponent = __webpack_require__(41);

	var _PlayerInputComponent2 = _interopRequireDefault(_PlayerInputComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Player = function Player(number, character) {
	    this.number = number;
	    this.keys = window.env.config.variable('players')[number].keys;
	    this.lives = 3;
	    this.character = character;
	    this.character.player = this;
	    this.status = {
	        type: 'normal',
	        time: new Date().getTime()
	    };
	    this.character.input = new _PlayerInputComponent2.default(this.character, this);
	    //this.character.input = new AiInputComponent(this.character, this);
	};
	Player.prototype = {
	    loselife: function loselife() {
	        this.lives--;
	        if (this.lives > 0) {
	            this.character.hurt();
	        } else {
	            this.die();
	        }
	    },
	    die: function die() {
	        this.character.die();
	        this.status.type = 'dead';
	        this.status.time = new Date().getTime();
	        this.lives = 0;

	        var obj = {};
	        if (window.env.game.score > window.env.highscores[0]) {
	            obj.text = 'NEW RECORD: ' + obj.text;
	        }
	        if (window.env.highscores.length < 10 || window.env.game.score > window.env.highscores[9]) {
	            obj.text = 'NEW HIGH SCORE: ' + obj.text;
	        }
	        window.env.highscores.push({ 'name': window.env.config.variable('player').name, score: window.env.game.score });
	        window.env.highscores.sort(function (a, b) {
	            return b.score - a.score;
	        });
	        if (window.env.highscores.length > 10) {
	            window.env.highscores = window.env.highscores.slice(0, 10);
	        }
	        localStorage.setItem('highscores', JSON.stringify(window.env.highscores));
	    },
	    process: function process() {}
	};

	exports.default = Player;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _InputComponent = __webpack_require__(28);

	var _InputComponent2 = _interopRequireDefault(_InputComponent);

	var _KeyBoardManager = __webpack_require__(2);

	var _KeyBoardManager2 = _interopRequireDefault(_KeyBoardManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function PlayerInputComponent(object, player) {
	    _InputComponent2.default.call(this, object);
	    this.player = player;
	    this.goLeft = false;
	    this.goRight = false;
	    this.goUp = false;
	    this.goDown = false;
	}
	PlayerInputComponent.prototype = new _InputComponent2.default();
	PlayerInputComponent.prototype.process = function () {
	    if (this.player.status.type == 'disabled' || this.player.status.type == 'dead') {
	        this.goLeft = false;
	        this.goRight = false;
	        this.goUp = false;
	        this.goDown = false;
	    } else {
	        this.goLeft = _KeyBoardManager2.default.isDown(this.player.keys.left);
	        this.goRight = _KeyBoardManager2.default.isDown(this.player.keys.right);
	        this.goUp = _KeyBoardManager2.default.isDown(this.player.keys.up);
	        //this.goDown = KeyBoardManager.isDown(this.player.keys.down);;
	    }
	};

	exports.default = PlayerInputComponent;

/***/ })
/******/ ]);