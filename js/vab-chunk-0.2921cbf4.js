/*!
 * vue-admin-better
 * GitHub: https://github.com/zxwk1998/vue-admin-better
 * Gitee: https://gitee.com/chu1204505056/vue-admin-better
 *
 * 版权所有 (c) 2025 vue-admin-better
 * 本项目使用 MIT 许可证
 * 构建时间: 2026-5-21 23:23:42
 */
(self["rspackChunkvue_admin_better"] = self["rspackChunkvue_admin_better"] || []).push([[3322], {
57576: (function (module) {
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 686:
/***/ (function(__unused_webpack_module, __nested_rspack_exports__, __nested_rspack_require_624_643__) {

"use strict";

// EXPORTS
__nested_rspack_require_624_643__.d(__nested_rspack_exports__, {
  "default": function() { return /* binding */ clipboard; }
});

// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
var tiny_emitter = __nested_rspack_require_624_643__(279);
var tiny_emitter_default = /*#__PURE__*/__nested_rspack_require_624_643__.n(tiny_emitter);
// EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js
var listen = __nested_rspack_require_624_643__(370);
var listen_default = /*#__PURE__*/__nested_rspack_require_624_643__.n(listen);
// EXTERNAL MODULE: ./node_modules/select/src/select.js
var src_select = __nested_rspack_require_624_643__(817);
var select_default = /*#__PURE__*/__nested_rspack_require_624_643__.n(src_select);
;// CONCATENATED MODULE: ./src/common/command.js
/**
 * Executes a given operation type.
 * @param {String} type
 * @return {Boolean}
 */
function command(type) {
  try {
    return document.execCommand(type);
  } catch (err) {
    return false;
  }
}
;// CONCATENATED MODULE: ./src/actions/cut.js


/**
 * Cut action wrapper.
 * @param {String|HTMLElement} target
 * @return {String}
 */

var ClipboardActionCut = function ClipboardActionCut(target) {
  var selectedText = select_default()(target);
  command('cut');
  return selectedText;
};

/* harmony default export */ var actions_cut = (ClipboardActionCut);
;// CONCATENATED MODULE: ./src/common/create-fake-element.js
/**
 * Creates a fake textarea element with a value.
 * @param {String} value
 * @return {HTMLElement}
 */
function createFakeElement(value) {
  var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  var fakeElement = document.createElement('textarea'); // Prevent zooming on iOS

  fakeElement.style.fontSize = '12pt'; // Reset box model

  fakeElement.style.border = '0';
  fakeElement.style.padding = '0';
  fakeElement.style.margin = '0'; // Move element out of screen horizontally

  fakeElement.style.position = 'absolute';
  fakeElement.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

  var yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElement.style.top = "".concat(yPosition, "px");
  fakeElement.setAttribute('readonly', '');
  fakeElement.value = value;
  return fakeElement;
}
;// CONCATENATED MODULE: ./src/actions/copy.js



/**
 * Create fake copy action wrapper using a fake element.
 * @param {String} target
 * @param {Object} options
 * @return {String}
 */

var fakeCopyAction = function fakeCopyAction(value, options) {
  var fakeElement = createFakeElement(value);
  options.container.appendChild(fakeElement);
  var selectedText = select_default()(fakeElement);
  command('copy');
  fakeElement.remove();
  return selectedText;
};
/**
 * Copy action wrapper.
 * @param {String|HTMLElement} target
 * @param {Object} options
 * @return {String}
 */


var ClipboardActionCopy = function ClipboardActionCopy(target) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    container: document.body
  };
  var selectedText = '';

  if (typeof target === 'string') {
    selectedText = fakeCopyAction(target, options);
  } else if (target instanceof HTMLInputElement && !['text', 'search', 'url', 'tel', 'password'].includes(target === null || target === void 0 ? void 0 : target.type)) {
    // If input type doesn't support `setSelectionRange`. Simulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    selectedText = fakeCopyAction(target.value, options);
  } else {
    selectedText = select_default()(target);
    command('copy');
  }

  return selectedText;
};

/* harmony default export */ var actions_copy = (ClipboardActionCopy);
;// CONCATENATED MODULE: ./src/actions/default.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



/**
 * Inner function which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 * @param {Object} options
 */

var ClipboardActionDefault = function ClipboardActionDefault() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // Defines base properties passed from constructor.
  var _options$action = options.action,
      action = _options$action === void 0 ? 'copy' : _options$action,
      container = options.container,
      target = options.target,
      text = options.text; // Sets the `action` to be performed which can be either 'copy' or 'cut'.

  if (action !== 'copy' && action !== 'cut') {
    throw new Error('Invalid "action" value, use either "copy" or "cut"');
  } // Sets the `target` property using an element that will be have its content copied.


  if (target !== undefined) {
    if (target && _typeof(target) === 'object' && target.nodeType === 1) {
      if (action === 'copy' && target.hasAttribute('disabled')) {
        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
      }

      if (action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
      }
    } else {
      throw new Error('Invalid "target" value, use a valid Element');
    }
  } // Define selection strategy based on `text` property.


  if (text) {
    return actions_copy(text, {
      container: container
    });
  } // Defines which selection strategy based on `target` property.


  if (target) {
    return action === 'cut' ? actions_cut(target) : actions_copy(target, {
      container: container
    });
  }
};

/* harmony default export */ var actions_default = (ClipboardActionDefault);
;// CONCATENATED MODULE: ./src/clipboard.js
function clipboard_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { clipboard_typeof = function _typeof(obj) { return typeof obj; }; } else { clipboard_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return clipboard_typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */

function getAttributeValue(suffix, element) {
  var attribute = "data-clipboard-".concat(suffix);

  if (!element.hasAttribute(attribute)) {
    return;
  }

  return element.getAttribute(attribute);
}
/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */


var Clipboard = /*#__PURE__*/function (_Emitter) {
  _inherits(Clipboard, _Emitter);

  var _super = _createSuper(Clipboard);

  /**
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   * @param {Object} options
   */
  function Clipboard(trigger, options) {
    var _this;

    _classCallCheck(this, Clipboard);

    _this = _super.call(this);

    _this.resolveOptions(options);

    _this.listenClick(trigger);

    return _this;
  }
  /**
   * Defines if attributes would be resolved using internal setter functions
   * or custom functions that were passed in the constructor.
   * @param {Object} options
   */


  _createClass(Clipboard, [{
    key: "resolveOptions",
    value: function resolveOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
      this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
      this.text = typeof options.text === 'function' ? options.text : this.defaultText;
      this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
    }
    /**
     * Adds a click event listener to the passed trigger.
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     */

  }, {
    key: "listenClick",
    value: function listenClick(trigger) {
      var _this2 = this;

      this.listener = listen_default()(trigger, 'click', function (e) {
        return _this2.onClick(e);
      });
    }
    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */

  }, {
    key: "onClick",
    value: function onClick(e) {
      var trigger = e.delegateTarget || e.currentTarget;
      var action = this.action(trigger) || 'copy';
      var text = actions_default({
        action: action,
        container: this.container,
        target: this.target(trigger),
        text: this.text(trigger)
      }); // Fires an event based on the copy operation result.

      this.emit(text ? 'success' : 'error', {
        action: action,
        text: text,
        trigger: trigger,
        clearSelection: function clearSelection() {
          if (trigger) {
            trigger.focus();
          }

          window.getSelection().removeAllRanges();
        }
      });
    }
    /**
     * Default `action` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultAction",
    value: function defaultAction(trigger) {
      return getAttributeValue('action', trigger);
    }
    /**
     * Default `target` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultTarget",
    value: function defaultTarget(trigger) {
      var selector = getAttributeValue('target', trigger);

      if (selector) {
        return document.querySelector(selector);
      }
    }
    /**
     * Allow fire programmatically a copy action
     * @param {String|HTMLElement} target
     * @param {Object} options
     * @returns Text copied.
     */

  }, {
    key: "defaultText",

    /**
     * Default `text` lookup function.
     * @param {Element} trigger
     */
    value: function defaultText(trigger) {
      return getAttributeValue('text', trigger);
    }
    /**
     * Destroy lifecycle.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.listener.destroy();
    }
  }], [{
    key: "copy",
    value: function copy(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        container: document.body
      };
      return actions_copy(target, options);
    }
    /**
     * Allow fire programmatically a cut action
     * @param {String|HTMLElement} target
     * @returns Text cutted.
     */

  }, {
    key: "cut",
    value: function cut(target) {
      return actions_cut(target);
    }
    /**
     * Returns the support of the given action, or all actions if no action is
     * given.
     * @param {String} [action]
     */

  }, {
    key: "isSupported",
    value: function isSupported() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
      var actions = typeof action === 'string' ? [action] : action;
      var support = !!document.queryCommandSupported;
      actions.forEach(function (action) {
        support = support && !!document.queryCommandSupported(action);
      });
      return support;
    }
  }]);

  return Clipboard;
}((tiny_emitter_default()));

/* harmony default export */ var clipboard = (Clipboard);

/***/ }),

/***/ 828:
/***/ (function(module) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),

/***/ 438:
/***/ (function(module, __unused_webpack_exports, __nested_rspack_require_15750_15769__) {

var closest = __nested_rspack_require_15750_15769__(828);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),

/***/ 879:
/***/ (function(__unused_webpack_module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),

/***/ 370:
/***/ (function(module, __unused_webpack_exports, __nested_rspack_require_19114_19133__) {

var is = __nested_rspack_require_19114_19133__(879);
var delegate = __nested_rspack_require_19114_19133__(438);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),

/***/ 817:
/***/ (function(module) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),

/***/ 279:
/***/ (function(module) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;
module.exports.TinyEmitter = E;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_rspack_require_24496__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_rspack_require_24496__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_rspack_require_24496__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__nested_rspack_require_24496__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_rspack_require_24496__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_rspack_require_24496__.o(definition, key) && !__nested_rspack_require_24496__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_rspack_require_24496__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __nested_rspack_require_24496__(686);
/******/ })()
.default;
});

}),
14603: (function (__unused_rspack_module, __unused_rspack_exports, __webpack_require__) {
"use strict";

var defineBuiltIn = __webpack_require__(36840);
var uncurryThis = __webpack_require__(79504);
var toString = __webpack_require__(655);
var validateArgumentsLength = __webpack_require__(22812);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var append = uncurryThis(URLSearchParamsPrototype.append);
var $delete = uncurryThis(URLSearchParamsPrototype['delete']);
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);
var push = uncurryThis([].push);
var params = new $URLSearchParams('a=1&a=2&b=3');

params['delete']('a', 1);
// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
params['delete']('b', undefined);

if (params + '' !== 'a=2') {
  defineBuiltIn(URLSearchParamsPrototype, 'delete', function (name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $delete(this, name);
    var entries = [];
    forEach(this, function (v, k) { // also validates `this`
      push(entries, { key: k, value: v });
    });
    validateArgumentsLength(length, 1);
    var key = toString(name);
    var value = toString($value);
    var index = 0;
    var entriesLength = entries.length;
    var entry;
    while (index < entriesLength) {
      entry = entries[index];
      $delete(this, entry.key);
      index++;
    }
    index = 0;
    while (index < entriesLength) {
      entry = entries[index++];
      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
    }
  }, { enumerable: true, unsafe: true });
}


}),
47566: (function (__unused_rspack_module, __unused_rspack_exports, __webpack_require__) {
"use strict";

var defineBuiltIn = __webpack_require__(36840);
var uncurryThis = __webpack_require__(79504);
var toString = __webpack_require__(655);
var validateArgumentsLength = __webpack_require__(22812);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var getAll = uncurryThis(URLSearchParamsPrototype.getAll);
var $has = uncurryThis(URLSearchParamsPrototype.has);
var params = new $URLSearchParams('a=1');

// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
if (params.has('a', 2) || !params.has('a', undefined)) {
  defineBuiltIn(URLSearchParamsPrototype, 'has', function has(name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $has(this, name);
    var values = getAll(this, name); // also validates `this`
    validateArgumentsLength(length, 1);
    var value = toString($value);
    var index = 0;
    while (index < values.length) {
      if (values[index++] === value) return true;
    } return false;
  }, { enumerable: true, unsafe: true });
}


}),
98721: (function (__unused_rspack_module, __unused_rspack_exports, __webpack_require__) {
"use strict";

var DESCRIPTORS = __webpack_require__(43724);
var uncurryThis = __webpack_require__(79504);
var defineBuiltInAccessor = __webpack_require__(62106);

var URLSearchParamsPrototype = URLSearchParams.prototype;
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {
  defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
    get: function size() {
      var count = 0;
      forEach(this, function () { count++; });
      return count;
    },
    configurable: true,
    enumerable: true
  });
}


}),
38414: (function (__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Axis: function() { return /* reexport */ core.Axis; },
  ChartView: function() { return /* reexport */ core.ChartView; },
  ComponentModel: function() { return /* reexport */ core.ComponentModel; },
  ComponentView: function() { return /* reexport */ core.ComponentView; },
  List: function() { return /* reexport */ core.List; },
  Model: function() { return /* reexport */ core.Model; },
  PRIORITY: function() { return /* reexport */ core.PRIORITY; },
  SeriesModel: function() { return /* reexport */ core.SeriesModel; },
  color: function() { return /* reexport */ core.color; },
  connect: function() { return /* reexport */ core.connect; },
  dataTool: function() { return /* reexport */ core.dataTool; },
  dependencies: function() { return /* reexport */ core.dependencies; },
  disConnect: function() { return /* reexport */ core.disConnect; },
  disconnect: function() { return /* reexport */ core.disconnect; },
  dispose: function() { return /* reexport */ core.dispose; },
  env: function() { return /* reexport */ core.env; },
  extendChartView: function() { return /* reexport */ core.extendChartView; },
  extendComponentModel: function() { return /* reexport */ core.extendComponentModel; },
  extendComponentView: function() { return /* reexport */ core.extendComponentView; },
  extendSeriesModel: function() { return /* reexport */ core.extendSeriesModel; },
  format: function() { return /* reexport */ core.format; },
  getCoordinateSystemDimensions: function() { return /* reexport */ core.getCoordinateSystemDimensions; },
  getInstanceByDom: function() { return /* reexport */ core.getInstanceByDom; },
  getInstanceById: function() { return /* reexport */ core.getInstanceById; },
  getMap: function() { return /* reexport */ core.getMap; },
  graphic: function() { return /* reexport */ core.graphic; },
  helper: function() { return /* reexport */ core.helper; },
  init: function() { return /* reexport */ core.init; },
  innerDrawElementOnCanvas: function() { return /* reexport */ core.innerDrawElementOnCanvas; },
  matrix: function() { return /* reexport */ core.matrix; },
  number: function() { return /* reexport */ core.number; },
  parseGeoJSON: function() { return /* reexport */ core.parseGeoJSON; },
  parseGeoJson: function() { return /* reexport */ core.parseGeoJson; },
  registerAction: function() { return /* reexport */ core.registerAction; },
  registerCoordinateSystem: function() { return /* reexport */ core.registerCoordinateSystem; },
  registerCustomSeries: function() { return /* reexport */ core.registerCustomSeries; },
  registerLayout: function() { return /* reexport */ core.registerLayout; },
  registerLoading: function() { return /* reexport */ core.registerLoading; },
  registerLocale: function() { return /* reexport */ core.registerLocale; },
  registerMap: function() { return /* reexport */ core.registerMap; },
  registerPostInit: function() { return /* reexport */ core.registerPostInit; },
  registerPostUpdate: function() { return /* reexport */ core.registerPostUpdate; },
  registerPreprocessor: function() { return /* reexport */ core.registerPreprocessor; },
  registerProcessor: function() { return /* reexport */ core.registerProcessor; },
  registerTheme: function() { return /* reexport */ core.registerTheme; },
  registerTransform: function() { return /* reexport */ core.registerTransform; },
  registerUpdateLifecycle: function() { return /* reexport */ core.registerUpdateLifecycle; },
  registerVisual: function() { return /* reexport */ core.registerVisual; },
  setCanvasCreator: function() { return /* reexport */ core.setCanvasCreator; },
  setPlatformAPI: function() { return /* reexport */ core.setPlatformAPI; },
  throttle: function() { return /* reexport */ core.throttle; },
  time: function() { return /* reexport */ core.time; },
  use: function() { return /* reexport */ core.use; },
  util: function() { return /* reexport */ core.util; },
  vector: function() { return /* reexport */ core.vector; },
  version: function() { return /* reexport */ core.version; },
  zrUtil: function() { return /* reexport */ core.zrUtil; },
  zrender: function() { return /* reexport */ core.zrender; }
});

// EXTERNAL MODULE: ./node_modules/echarts/lib/extension.js
var extension = __webpack_require__(3087);
// EXTERNAL MODULE: ./node_modules/echarts/lib/export/core.js + 7 modules
var core = __webpack_require__(56370);
// EXTERNAL MODULE: ./node_modules/echarts/lib/renderer/installCanvasRenderer.js
var installCanvasRenderer = __webpack_require__(89952);
// EXTERNAL MODULE: ./node_modules/echarts/lib/renderer/installSVGRenderer.js
var installSVGRenderer = __webpack_require__(83806);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/line/install.js + 4 modules
var install = __webpack_require__(95959);
// EXTERNAL MODULE: ./node_modules/zrender/lib/core/util.js
var util = __webpack_require__(98026);
// EXTERNAL MODULE: ./node_modules/echarts/lib/layout/barGrid.js
var barGrid = __webpack_require__(62536);
// EXTERNAL MODULE: ./node_modules/echarts/lib/processor/dataSample.js
var dataSample = __webpack_require__(37959);
// EXTERNAL MODULE: ./node_modules/echarts/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(74179);
// EXTERNAL MODULE: ./node_modules/echarts/lib/model/Series.js
var Series = __webpack_require__(47355);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/helper/createSeriesData.js
var createSeriesData = __webpack_require__(13637);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/bar/BaseBarSeries.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/




var BaseBarSeries_BaseBarSeriesModel = /** @class */function (_super) {
  (0,tslib_es6.__extends)(BaseBarSeriesModel, _super);
  function BaseBarSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = BaseBarSeriesModel.type;
    return _this;
  }
  BaseBarSeriesModel.prototype.getInitialData = function (option, ecModel) {
    return (0,createSeriesData["default"])(null, this, {
      useEncodeDefaulter: true
    });
  };
  BaseBarSeriesModel.prototype.getMarkerPosition = function (value, dims, startingAtTick) {
    var coordSys = this.coordinateSystem;
    if (coordSys && coordSys.clampData) {
      // PENDING if clamp ?
      var clampData_1 = coordSys.clampData(value);
      var pt_1 = coordSys.dataToPoint(clampData_1);
      if (startingAtTick) {
        (0,util.each)(coordSys.getAxes(), function (axis, idx) {
          // If axis type is category, use tick coords instead
          if (axis.type === 'category' && dims != null) {
            var tickCoords = axis.getTicksCoords();
            var alignTicksWithLabel = axis.getTickModel().get('alignWithLabel');
            var targetTickId = clampData_1[idx];
            // The index of rightmost tick of markArea is 1 larger than x1/y1 index
            var isEnd = dims[idx] === 'x1' || dims[idx] === 'y1';
            if (isEnd && !alignTicksWithLabel) {
              targetTickId += 1;
            }
            // The only contains one tick, tickCoords is
            // like [{coord: 0, tickValue: 0}, {coord: 0}]
            // to the length should always be larger than 1
            if (tickCoords.length < 2) {
              return;
            } else if (tickCoords.length === 2) {
              // The left value and right value of the axis are
              // the same. coord is 0 in both items. Use the max
              // value of the axis as the coord
              pt_1[idx] = axis.toGlobalCoord(axis.getExtent()[isEnd ? 1 : 0]);
              return;
            }
            var leftCoord = void 0;
            var coord = void 0;
            var stepTickValue = 1;
            for (var i = 0; i < tickCoords.length; i++) {
              var tickCoord = tickCoords[i].coord;
              // The last item of tickCoords doesn't contain
              // tickValue
              var tickValue = i === tickCoords.length - 1 ? tickCoords[i - 1].tickValue + stepTickValue : tickCoords[i].tickValue;
              if (tickValue === targetTickId) {
                coord = tickCoord;
                break;
              } else if (tickValue < targetTickId) {
                leftCoord = tickCoord;
              } else if (leftCoord != null && tickValue > targetTickId) {
                coord = (tickCoord + leftCoord) / 2;
                break;
              }
              if (i === 1) {
                // Here we assume the step of category axes is
                // the same
                stepTickValue = tickValue - tickCoords[0].tickValue;
              }
            }
            if (coord == null) {
              if (!leftCoord) {
                // targetTickId is smaller than all tick ids in the
                // visible area, use the leftmost tick coord
                coord = tickCoords[0].coord;
              } else if (leftCoord) {
                // targetTickId is larger than all tick ids in the
                // visible area, use the rightmost tick coord
                coord = tickCoords[tickCoords.length - 1].coord;
              }
            }
            pt_1[idx] = axis.toGlobalCoord(coord);
          }
        });
      } else {
        var data = this.getData();
        var offset = data.getLayout('offset');
        var size = data.getLayout('size');
        var offsetIndex = coordSys.getBaseAxis().isHorizontal() ? 0 : 1;
        pt_1[offsetIndex] += offset + size / 2;
      }
      return pt_1;
    }
    return [NaN, NaN];
  };
  BaseBarSeriesModel.type = 'series.__base_bar__';
  BaseBarSeriesModel.defaultOption = {
    // zlevel: 0,
    z: 2,
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    // stack: null
    // Cartesian coordinate system
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    barMinHeight: 0,
    barMinAngle: 0,
    // cursor: null,
    large: false,
    largeThreshold: 400,
    progressive: 3e3,
    progressiveChunkMode: 'mod',
    defaultBarGap: '10%'
  };
  return BaseBarSeriesModel;
}(Series["default"]);
Series["default"].registerClass(BaseBarSeries_BaseBarSeriesModel);
/* export default */ var BaseBarSeries = (BaseBarSeries_BaseBarSeriesModel);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/component.js
var component = __webpack_require__(12616);
// EXTERNAL MODULE: ./node_modules/echarts/lib/visual/tokens.js
var tokens = __webpack_require__(92857);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/bar/BarSeries.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/





var BarSeries_BarSeriesModel = /** @class */function (_super) {
  (0,tslib_es6.__extends)(BarSeriesModel, _super);
  function BarSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = BarSeriesModel.type;
    return _this;
  }
  BarSeriesModel.prototype.getInitialData = function () {
    return (0,createSeriesData["default"])(null, this, {
      useEncodeDefaulter: true,
      createInvertedIndices: !!this.get('realtimeSort', true) || null
    });
  };
  /**
   * @override
   */
  BarSeriesModel.prototype.getProgressive = function () {
    // Do not support progressive in normal mode.
    return this.get('large') ? this.get('progressive') : false;
  };
  /**
   * @override
   */
  BarSeriesModel.prototype.getProgressiveThreshold = function () {
    // Do not support progressive in normal mode.
    var progressiveThreshold = this.get('progressiveThreshold');
    var largeThreshold = this.get('largeThreshold');
    if (largeThreshold > progressiveThreshold) {
      progressiveThreshold = largeThreshold;
    }
    return progressiveThreshold;
  };
  BarSeriesModel.prototype.brushSelector = function (dataIndex, data, selectors) {
    return selectors.rect(data.getItemLayout(dataIndex));
  };
  BarSeriesModel.type = 'series.bar';
  BarSeriesModel.dependencies = ['grid', 'polar'];
  BarSeriesModel.defaultOption = (0,component.inheritDefaultOption)(BaseBarSeries.defaultOption, {
    // If clipped
    // Only available on cartesian2d
    clip: true,
    roundCap: false,
    showBackground: false,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.2)',
      borderColor: null,
      borderWidth: 0,
      borderType: 'solid',
      borderRadius: 0,
      shadowBlur: 0,
      shadowColor: null,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    },
    select: {
      itemStyle: {
        borderColor: tokens["default"].color.primary,
        borderWidth: 2
      }
    },
    realtimeSort: false
  });
  return BarSeriesModel;
}(BaseBarSeries);
/* export default */ var BarSeries = (BarSeries_BarSeriesModel);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/Path.js + 3 modules
var Path = __webpack_require__(18149);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/Group.js
var Group = __webpack_require__(43870);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/graphic.js
var graphic = __webpack_require__(43199);
// EXTERNAL MODULE: ./node_modules/echarts/lib/animation/basicTransition.js
var basicTransition = __webpack_require__(5638);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/shape/Rect.js + 1 modules
var Rect = __webpack_require__(60866);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/shape/Sector.js + 1 modules
var Sector = __webpack_require__(13818);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/innerStore.js
var innerStore = __webpack_require__(69622);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/states.js
var states = __webpack_require__(34833);
// EXTERNAL MODULE: ./node_modules/echarts/lib/label/labelStyle.js
var labelStyle = __webpack_require__(89632);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/throttle.js
var throttle = __webpack_require__(24711);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/helper/createClipPathFromCoordSys.js
var createClipPathFromCoordSys = __webpack_require__(95235);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/shape/sausage.js
var sausage = __webpack_require__(84618);
// EXTERNAL MODULE: ./node_modules/echarts/lib/view/Chart.js
var Chart = __webpack_require__(6666);
// EXTERNAL MODULE: ./node_modules/echarts/lib/coord/CoordinateSystem.js
var CoordinateSystem = __webpack_require__(41849);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/helper/labelHelper.js
var labelHelper = __webpack_require__(44532);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/log.js
var log = __webpack_require__(41025);
// EXTERNAL MODULE: ./node_modules/echarts/lib/label/sectorLabel.js
var sectorLabel = __webpack_require__(94327);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/helper/sectorHelper.js
var sectorHelper = __webpack_require__(79446);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/bar/BarView.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


















var mathMax = Math.max;
var mathMin = Math.min;
function getClipArea(coord, data) {
  var coordSysClipArea = coord.getArea && coord.getArea();
  if ((0,CoordinateSystem.isCoordinateSystemType)(coord, 'cartesian2d')) {
    var baseAxis = coord.getBaseAxis();
    // When boundaryGap is false or using time axis. bar may exceed the grid.
    // We should not clip this part.
    // See test/bar2.html
    if (baseAxis.type !== 'category' || !baseAxis.onBand) {
      var expandWidth = data.getLayout('bandWidth');
      if (baseAxis.isHorizontal()) {
        coordSysClipArea.x -= expandWidth;
        coordSysClipArea.width += expandWidth * 2;
      } else {
        coordSysClipArea.y -= expandWidth;
        coordSysClipArea.height += expandWidth * 2;
      }
    }
  }
  return coordSysClipArea;
}
var BarView_BarView = /** @class */function (_super) {
  (0,tslib_es6.__extends)(BarView, _super);
  function BarView() {
    var _this = _super.call(this) || this;
    _this.type = BarView.type;
    _this._isFirstFrame = true;
    return _this;
  }
  BarView.prototype.render = function (seriesModel, ecModel, api, payload) {
    this._model = seriesModel;
    this._removeOnRenderedListener(api);
    this._updateDrawMode(seriesModel);
    var coordinateSystemType = seriesModel.get('coordinateSystem');
    if (coordinateSystemType === 'cartesian2d' || coordinateSystemType === 'polar') {
      // Clear previously rendered progressive elements.
      this._progressiveEls = null;
      this._isLargeDraw ? this._renderLarge(seriesModel, ecModel, api) : this._renderNormal(seriesModel, ecModel, api, payload);
    } else if (true) {
      (0,log.warn)('Only cartesian2d and polar supported for bar.');
    }
  };
  BarView.prototype.incrementalPrepareRender = function (seriesModel) {
    this._clear();
    this._updateDrawMode(seriesModel);
    // incremental also need to clip, otherwise might be overlow.
    // But must not set clip in each frame, otherwise all of the children will be marked redraw.
    this._updateLargeClip(seriesModel);
  };
  BarView.prototype.incrementalRender = function (params, seriesModel) {
    // Reset
    this._progressiveEls = [];
    // Do not support progressive in normal mode.
    this._incrementalRenderLarge(params, seriesModel);
  };
  BarView.prototype.eachRendered = function (cb) {
    (0,graphic.traverseElements)(this._progressiveEls || this.group, cb);
  };
  BarView.prototype._updateDrawMode = function (seriesModel) {
    var isLargeDraw = seriesModel.pipelineContext.large;
    if (this._isLargeDraw == null || isLargeDraw !== this._isLargeDraw) {
      this._isLargeDraw = isLargeDraw;
      this._clear();
    }
  };
  BarView.prototype._renderNormal = function (seriesModel, ecModel, api, payload) {
    var group = this.group;
    var data = seriesModel.getData();
    var oldData = this._data;
    var coord = seriesModel.coordinateSystem;
    var baseAxis = coord.getBaseAxis();
    var isHorizontalOrRadial;
    if (coord.type === 'cartesian2d') {
      isHorizontalOrRadial = baseAxis.isHorizontal();
    } else if (coord.type === 'polar') {
      isHorizontalOrRadial = baseAxis.dim === 'angle';
    }
    var animationModel = seriesModel.isAnimationEnabled() ? seriesModel : null;
    var realtimeSortCfg = shouldRealtimeSort(seriesModel, coord);
    if (realtimeSortCfg) {
      this._enableRealtimeSort(realtimeSortCfg, data, api);
    }
    var needsClip = seriesModel.get('clip', true) || realtimeSortCfg;
    var coordSysClipArea = getClipArea(coord, data);
    // If there is clipPath created in large mode. Remove it.
    group.removeClipPath();
    // We don't use clipPath in normal mode because we needs a perfect animation
    // And don't want the label are clipped.
    var roundCap = seriesModel.get('roundCap', true);
    var drawBackground = seriesModel.get('showBackground', true);
    var backgroundModel = seriesModel.getModel('backgroundStyle');
    var barBorderRadius = backgroundModel.get('borderRadius') || 0;
    var bgEls = [];
    var oldBgEls = this._backgroundEls;
    var isInitSort = payload && payload.isInitSort;
    var isChangeOrder = payload && payload.type === 'changeAxisOrder';
    function createBackground(dataIndex) {
      var bgLayout = getLayout[coord.type](data, dataIndex);
      if (!bgLayout) {
        return null;
      }
      var bgEl = createBackgroundEl(coord, isHorizontalOrRadial, bgLayout);
      bgEl.useStyle(backgroundModel.getItemStyle());
      // Only cartesian2d support borderRadius.
      if (coord.type === 'cartesian2d') {
        bgEl.setShape('r', barBorderRadius);
      } else {
        bgEl.setShape('cornerRadius', barBorderRadius);
      }
      bgEls[dataIndex] = bgEl;
      return bgEl;
    }
    ;
    data.diff(oldData).add(function (dataIndex) {
      var itemModel = data.getItemModel(dataIndex);
      var layout = getLayout[coord.type](data, dataIndex, itemModel);
      if (!layout) {
        return;
      }
      if (drawBackground) {
        createBackground(dataIndex);
      }
      // If dataZoom in filteMode: 'empty', the baseValue can be set as NaN in "axisProxy".
      if (!data.hasValue(dataIndex) || !isValidLayout[coord.type](layout)) {
        return;
      }
      var isClipped = false;
      if (needsClip) {
        // Clip will modify the layout params.
        // And return a boolean to determine if the shape are fully clipped.
        isClipped = clip[coord.type](coordSysClipArea, layout);
      }
      var el = elementCreator[coord.type](seriesModel, data, dataIndex, layout, isHorizontalOrRadial, animationModel, baseAxis.model, false, roundCap);
      if (realtimeSortCfg) {
        /**
         * Force label animation because even if the element is
         * ignored because it's clipped, it may not be clipped after
         * changing order. Then, if not using forceLabelAnimation,
         * the label animation was never started, in which case,
         * the label will be the final value and doesn't have label
         * animation.
         */
        el.forceLabelAnimation = true;
      }
      updateStyle(el, data, dataIndex, itemModel, layout, seriesModel, isHorizontalOrRadial, coord.type === 'polar');
      if (isInitSort) {
        el.attr({
          shape: layout
        });
      } else if (realtimeSortCfg) {
        updateRealtimeAnimation(realtimeSortCfg, animationModel, el, layout, dataIndex, isHorizontalOrRadial, false, false);
      } else {
        (0,basicTransition.initProps)(el, {
          shape: layout
        }, seriesModel, dataIndex);
      }
      data.setItemGraphicEl(dataIndex, el);
      group.add(el);
      el.ignore = isClipped;
    }).update(function (newIndex, oldIndex) {
      var itemModel = data.getItemModel(newIndex);
      var layout = getLayout[coord.type](data, newIndex, itemModel);
      if (!layout) {
        return;
      }
      if (drawBackground) {
        var bgEl = void 0;
        if (oldBgEls.length === 0) {
          bgEl = createBackground(oldIndex);
        } else {
          bgEl = oldBgEls[oldIndex];
          bgEl.useStyle(backgroundModel.getItemStyle());
          // Only cartesian2d support borderRadius.
          if (coord.type === 'cartesian2d') {
            bgEl.setShape('r', barBorderRadius);
          } else {
            bgEl.setShape('cornerRadius', barBorderRadius);
          }
          bgEls[newIndex] = bgEl;
        }
        var bgLayout = getLayout[coord.type](data, newIndex);
        var shape = createBackgroundShape(isHorizontalOrRadial, bgLayout, coord);
        (0,basicTransition.updateProps)(bgEl, {
          shape: shape
        }, animationModel, newIndex);
      }
      var el = oldData.getItemGraphicEl(oldIndex);
      if (!data.hasValue(newIndex) || !isValidLayout[coord.type](layout)) {
        group.remove(el);
        return;
      }
      var isClipped = false;
      if (needsClip) {
        isClipped = clip[coord.type](coordSysClipArea, layout);
        if (isClipped) {
          group.remove(el);
        }
      }
      var roundCapChanged = el && (el.type === 'sector' && roundCap || el.type === 'sausage' && !roundCap);
      if (roundCapChanged) {
        // roundCap changed, there is no way to use animation from a `sector` to a `sausage` shape,
        // so remove the old one and create a new shape
        el && (0,basicTransition.removeElementWithFadeOut)(el, seriesModel, oldIndex);
        el = null;
      }
      if (!el) {
        el = elementCreator[coord.type](seriesModel, data, newIndex, layout, isHorizontalOrRadial, animationModel, baseAxis.model, true, roundCap);
      } else {
        (0,basicTransition.saveOldStyle)(el);
      }
      if (realtimeSortCfg) {
        el.forceLabelAnimation = true;
      }
      if (isChangeOrder) {
        var textEl = el.getTextContent();
        if (textEl) {
          var labelInnerStore = (0,labelStyle.labelInner)(textEl);
          if (labelInnerStore.prevValue != null) {
            /**
             * Set preValue to be value so that no new label
             * should be started, otherwise, it will take a full
             * `animationDurationUpdate` time to finish the
             * animation, which is not expected.
             */
            labelInnerStore.prevValue = labelInnerStore.value;
          }
        }
      }
      // Not change anything if only order changed.
      // Especially not change label.
      else {
        updateStyle(el, data, newIndex, itemModel, layout, seriesModel, isHorizontalOrRadial, coord.type === 'polar');
      }
      if (isInitSort) {
        el.attr({
          shape: layout
        });
      } else if (realtimeSortCfg) {
        updateRealtimeAnimation(realtimeSortCfg, animationModel, el, layout, newIndex, isHorizontalOrRadial, true, isChangeOrder);
      } else {
        (0,basicTransition.updateProps)(el, {
          shape: layout
        }, seriesModel, newIndex, null);
      }
      data.setItemGraphicEl(newIndex, el);
      el.ignore = isClipped;
      group.add(el);
    }).remove(function (dataIndex) {
      var el = oldData.getItemGraphicEl(dataIndex);
      el && (0,basicTransition.removeElementWithFadeOut)(el, seriesModel, dataIndex);
    }).execute();
    var bgGroup = this._backgroundGroup || (this._backgroundGroup = new Group["default"]());
    bgGroup.removeAll();
    for (var i = 0; i < bgEls.length; ++i) {
      bgGroup.add(bgEls[i]);
    }
    group.add(bgGroup);
    this._backgroundEls = bgEls;
    this._data = data;
  };
  BarView.prototype._renderLarge = function (seriesModel, ecModel, api) {
    this._clear();
    createLarge(seriesModel, this.group);
    this._updateLargeClip(seriesModel);
  };
  BarView.prototype._incrementalRenderLarge = function (params, seriesModel) {
    this._removeBackground();
    createLarge(seriesModel, this.group, this._progressiveEls, true);
  };
  BarView.prototype._updateLargeClip = function (seriesModel) {
    // Use clipPath in large mode.
    var clipPath = seriesModel.get('clip', true) && (0,createClipPathFromCoordSys.createClipPath)(seriesModel.coordinateSystem, false, seriesModel);
    var group = this.group;
    if (clipPath) {
      group.setClipPath(clipPath);
    } else {
      group.removeClipPath();
    }
  };
  BarView.prototype._enableRealtimeSort = function (realtimeSortCfg, data, api) {
    var _this = this;
    // If no data in the first frame, wait for data to initSort
    if (!data.count()) {
      return;
    }
    var baseAxis = realtimeSortCfg.baseAxis;
    if (this._isFirstFrame) {
      this._dispatchInitSort(data, realtimeSortCfg, api);
      this._isFirstFrame = false;
    } else {
      var orderMapping_1 = function (idx) {
        var el = data.getItemGraphicEl(idx);
        var shape = el && el.shape;
        return shape &&
        // The result should be consistent with the initial sort by data value.
        // Do not support the case that both positive and negative exist.
        Math.abs(baseAxis.isHorizontal() ? shape.height : shape.width)
        // If data is NaN, shape.xxx may be NaN, so use || 0 here in case
        || 0;
      };
      this._onRendered = function () {
        _this._updateSortWithinSameData(data, orderMapping_1, baseAxis, api);
      };
      api.getZr().on('rendered', this._onRendered);
    }
  };
  BarView.prototype._dataSort = function (data, baseAxis, orderMapping) {
    var info = [];
    data.each(data.mapDimension(baseAxis.dim), function (ordinalNumber, dataIdx) {
      var mappedValue = orderMapping(dataIdx);
      mappedValue = mappedValue == null ? NaN : mappedValue;
      info.push({
        dataIndex: dataIdx,
        mappedValue: mappedValue,
        ordinalNumber: ordinalNumber
      });
    });
    info.sort(function (a, b) {
      // If NaN, it will be treated as min val.
      return b.mappedValue - a.mappedValue;
    });
    return {
      ordinalNumbers: (0,util.map)(info, function (item) {
        return item.ordinalNumber;
      })
    };
  };
  BarView.prototype._isOrderChangedWithinSameData = function (data, orderMapping, baseAxis) {
    var scale = baseAxis.scale;
    var ordinalDataDim = data.mapDimension(baseAxis.dim);
    var lastValue = Number.MAX_VALUE;
    for (var tickNum = 0, len = scale.getOrdinalMeta().categories.length; tickNum < len; ++tickNum) {
      var rawIdx = data.rawIndexOf(ordinalDataDim, scale.getRawOrdinalNumber(tickNum));
      var value = rawIdx < 0
      // If some tick have no bar, the tick will be treated as min.
      ? Number.MIN_VALUE
      // PENDING: if dataZoom on baseAxis exits, is it a performance issue?
      : orderMapping(data.indexOfRawIndex(rawIdx));
      if (value > lastValue) {
        return true;
      }
      lastValue = value;
    }
    return false;
  };
  /*
   * Consider the case when A and B changed order, whose representing
   * bars are both out of sight, we don't wish to trigger reorder action
   * as long as the order in the view doesn't change.
   */
  BarView.prototype._isOrderDifferentInView = function (orderInfo, baseAxis) {
    var scale = baseAxis.scale;
    var extent = scale.getExtent();
    var tickNum = Math.max(0, extent[0]);
    var tickMax = Math.min(extent[1], scale.getOrdinalMeta().categories.length - 1);
    for (; tickNum <= tickMax; ++tickNum) {
      if (orderInfo.ordinalNumbers[tickNum] !== scale.getRawOrdinalNumber(tickNum)) {
        return true;
      }
    }
  };
  BarView.prototype._updateSortWithinSameData = function (data, orderMapping, baseAxis, api) {
    if (!this._isOrderChangedWithinSameData(data, orderMapping, baseAxis)) {
      return;
    }
    var sortInfo = this._dataSort(data, baseAxis, orderMapping);
    if (this._isOrderDifferentInView(sortInfo, baseAxis)) {
      this._removeOnRenderedListener(api);
      api.dispatchAction({
        type: 'changeAxisOrder',
        componentType: baseAxis.dim + 'Axis',
        axisId: baseAxis.index,
        sortInfo: sortInfo
      });
    }
  };
  BarView.prototype._dispatchInitSort = function (data, realtimeSortCfg, api) {
    var baseAxis = realtimeSortCfg.baseAxis;
    var sortResult = this._dataSort(data, baseAxis, function (dataIdx) {
      return data.get(data.mapDimension(realtimeSortCfg.otherAxis.dim), dataIdx);
    });
    api.dispatchAction({
      type: 'changeAxisOrder',
      componentType: baseAxis.dim + 'Axis',
      isInitSort: true,
      axisId: baseAxis.index,
      sortInfo: sortResult
    });
  };
  BarView.prototype.remove = function (ecModel, api) {
    this._clear(this._model);
    this._removeOnRenderedListener(api);
  };
  BarView.prototype.dispose = function (ecModel, api) {
    this._removeOnRenderedListener(api);
  };
  BarView.prototype._removeOnRenderedListener = function (api) {
    if (this._onRendered) {
      api.getZr().off('rendered', this._onRendered);
      this._onRendered = null;
    }
  };
  BarView.prototype._clear = function (model) {
    var group = this.group;
    var data = this._data;
    if (model && model.isAnimationEnabled() && data && !this._isLargeDraw) {
      this._removeBackground();
      this._backgroundEls = [];
      data.eachItemGraphicEl(function (el) {
        (0,basicTransition.removeElementWithFadeOut)(el, model, (0,innerStore.getECData)(el).dataIndex);
      });
    } else {
      group.removeAll();
    }
    this._data = null;
    this._isFirstFrame = true;
  };
  BarView.prototype._removeBackground = function () {
    this.group.remove(this._backgroundGroup);
    this._backgroundGroup = null;
  };
  BarView.type = 'bar';
  return BarView;
}(Chart["default"]);
var clip = {
  cartesian2d: function (coordSysBoundingRect, layout) {
    var signWidth = layout.width < 0 ? -1 : 1;
    var signHeight = layout.height < 0 ? -1 : 1;
    // Needs positive width and height
    if (signWidth < 0) {
      layout.x += layout.width;
      layout.width = -layout.width;
    }
    if (signHeight < 0) {
      layout.y += layout.height;
      layout.height = -layout.height;
    }
    var coordSysX2 = coordSysBoundingRect.x + coordSysBoundingRect.width;
    var coordSysY2 = coordSysBoundingRect.y + coordSysBoundingRect.height;
    var x = mathMax(layout.x, coordSysBoundingRect.x);
    var x2 = mathMin(layout.x + layout.width, coordSysX2);
    var y = mathMax(layout.y, coordSysBoundingRect.y);
    var y2 = mathMin(layout.y + layout.height, coordSysY2);
    var xClipped = x2 < x;
    var yClipped = y2 < y;
    // When xClipped or yClipped, the element will be marked as `ignore`.
    // But we should also place the element at the edge of the coord sys bounding rect.
    // Because if data changed and the bar shows again, its transition animation
    // will begin at this place.
    layout.x = xClipped && x > coordSysX2 ? x2 : x;
    layout.y = yClipped && y > coordSysY2 ? y2 : y;
    layout.width = xClipped ? 0 : x2 - x;
    layout.height = yClipped ? 0 : y2 - y;
    // Reverse back
    if (signWidth < 0) {
      layout.x += layout.width;
      layout.width = -layout.width;
    }
    if (signHeight < 0) {
      layout.y += layout.height;
      layout.height = -layout.height;
    }
    return xClipped || yClipped;
  },
  polar: function (coordSysClipArea, layout) {
    var signR = layout.r0 <= layout.r ? 1 : -1;
    // Make sure r is larger than r0
    if (signR < 0) {
      var tmp = layout.r;
      layout.r = layout.r0;
      layout.r0 = tmp;
    }
    var r = mathMin(layout.r, coordSysClipArea.r);
    var r0 = mathMax(layout.r0, coordSysClipArea.r0);
    layout.r = r;
    layout.r0 = r0;
    var clipped = r - r0 < 0;
    // Reverse back
    if (signR < 0) {
      var tmp = layout.r;
      layout.r = layout.r0;
      layout.r0 = tmp;
    }
    return clipped;
  }
};
var elementCreator = {
  cartesian2d: function (seriesModel, data, newIndex, layout, isHorizontal, animationModel, axisModel, isUpdate, roundCap) {
    var rect = new Rect["default"]({
      shape: (0,util.extend)({}, layout),
      z2: 1
    });
    rect.__dataIndex = newIndex;
    rect.name = 'item';
    if (animationModel) {
      var rectShape = rect.shape;
      var animateProperty = isHorizontal ? 'height' : 'width';
      rectShape[animateProperty] = 0;
    }
    return rect;
  },
  polar: function (seriesModel, data, newIndex, layout, isRadial, animationModel, axisModel, isUpdate, roundCap) {
    var ShapeClass = !isRadial && roundCap ? sausage["default"] : Sector["default"];
    var sector = new ShapeClass({
      shape: layout,
      z2: 1
    });
    sector.name = 'item';
    var positionMap = createPolarPositionMapping(isRadial);
    sector.calculateTextPosition = (0,sectorLabel.createSectorCalculateTextPosition)(positionMap, {
      isRoundCap: ShapeClass === sausage["default"]
    });
    // Animation
    if (animationModel) {
      var sectorShape = sector.shape;
      var animateProperty = isRadial ? 'r' : 'endAngle';
      var animateTarget = {};
      sectorShape[animateProperty] = isRadial ? layout.r0 : layout.startAngle;
      animateTarget[animateProperty] = layout[animateProperty];
      (isUpdate ? basicTransition.updateProps : basicTransition.initProps)(sector, {
        shape: animateTarget
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, animationModel);
    }
    return sector;
  }
};
function shouldRealtimeSort(seriesModel, coordSys) {
  var realtimeSortOption = seriesModel.get('realtimeSort', true);
  var baseAxis = coordSys.getBaseAxis();
  if (true) {
    if (realtimeSortOption) {
      if (baseAxis.type !== 'category') {
        (0,log.warn)('`realtimeSort` will not work because this bar series is not based on a category axis.');
      }
      if (coordSys.type !== 'cartesian2d') {
        (0,log.warn)('`realtimeSort` will not work because this bar series is not on cartesian2d.');
      }
    }
  }
  if (realtimeSortOption && baseAxis.type === 'category' && coordSys.type === 'cartesian2d') {
    return {
      baseAxis: baseAxis,
      otherAxis: coordSys.getOtherAxis(baseAxis)
    };
  }
}
function updateRealtimeAnimation(realtimeSortCfg, seriesAnimationModel, el, layout, newIndex, isHorizontal, isUpdate, isChangeOrder) {
  var seriesTarget;
  var axisTarget;
  if (isHorizontal) {
    axisTarget = {
      x: layout.x,
      width: layout.width
    };
    seriesTarget = {
      y: layout.y,
      height: layout.height
    };
  } else {
    axisTarget = {
      y: layout.y,
      height: layout.height
    };
    seriesTarget = {
      x: layout.x,
      width: layout.width
    };
  }
  if (!isChangeOrder) {
    // Keep the original growth animation if only axis order changed.
    // Not start a new animation.
    (isUpdate ? basicTransition.updateProps : basicTransition.initProps)(el, {
      shape: seriesTarget
    }, seriesAnimationModel, newIndex, null);
  }
  var axisAnimationModel = seriesAnimationModel ? realtimeSortCfg.baseAxis.model : null;
  (isUpdate ? basicTransition.updateProps : basicTransition.initProps)(el, {
    shape: axisTarget
  }, axisAnimationModel, newIndex);
}
function checkPropertiesNotValid(obj, props) {
  for (var i = 0; i < props.length; i++) {
    if (!isFinite(obj[props[i]])) {
      return true;
    }
  }
  return false;
}
var rectPropties = ['x', 'y', 'width', 'height'];
var polarPropties = ['cx', 'cy', 'r', 'startAngle', 'endAngle'];
var isValidLayout = {
  cartesian2d: function (layout) {
    return !checkPropertiesNotValid(layout, rectPropties);
  },
  polar: function (layout) {
    return !checkPropertiesNotValid(layout, polarPropties);
  }
};
var getLayout = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function (data, dataIndex, itemModel) {
    var layout = data.getItemLayout(dataIndex);
    if (!layout) {
      return null;
    }
    var fixedLineWidth = itemModel ? getLineWidth(itemModel, layout) : 0;
    // fix layout with lineWidth
    var signX = layout.width > 0 ? 1 : -1;
    var signY = layout.height > 0 ? 1 : -1;
    return {
      x: layout.x + signX * fixedLineWidth / 2,
      y: layout.y + signY * fixedLineWidth / 2,
      width: layout.width - signX * fixedLineWidth,
      height: layout.height - signY * fixedLineWidth
    };
  },
  polar: function (data, dataIndex, itemModel) {
    var layout = data.getItemLayout(dataIndex);
    return {
      cx: layout.cx,
      cy: layout.cy,
      r0: layout.r0,
      r: layout.r,
      startAngle: layout.startAngle,
      endAngle: layout.endAngle,
      clockwise: layout.clockwise
    };
  }
};
function isZeroOnPolar(layout) {
  return layout.startAngle != null && layout.endAngle != null && layout.startAngle === layout.endAngle;
}
function createPolarPositionMapping(isRadial) {
  return function (isRadial) {
    var arcOrAngle = isRadial ? 'Arc' : 'Angle';
    return function (position) {
      switch (position) {
        case 'start':
        case 'insideStart':
        case 'end':
        case 'insideEnd':
          return position + arcOrAngle;
        default:
          return position;
      }
    };
  }(isRadial);
}
function updateStyle(el, data, dataIndex, itemModel, layout, seriesModel, isHorizontalOrRadial, isPolar) {
  var style = data.getItemVisual(dataIndex, 'style');
  if (!isPolar) {
    var borderRadius = itemModel.get(['itemStyle', 'borderRadius']) || 0;
    el.setShape('r', borderRadius);
  } else if (!seriesModel.get('roundCap')) {
    var sectorShape = el.shape;
    var cornerRadius = (0,sectorHelper.getSectorCornerRadius)(itemModel.getModel('itemStyle'), sectorShape, true);
    (0,util.extend)(sectorShape, cornerRadius);
    el.setShape(sectorShape);
  }
  el.useStyle(style);
  var cursorStyle = itemModel.getShallow('cursor');
  cursorStyle && el.attr('cursor', cursorStyle);
  var labelPositionOutside = isPolar ? isHorizontalOrRadial ? layout.r >= layout.r0 ? 'endArc' : 'startArc' : layout.endAngle >= layout.startAngle ? 'endAngle' : 'startAngle' : isHorizontalOrRadial ? layout.height >= 0 ? 'bottom' : 'top' : layout.width >= 0 ? 'right' : 'left';
  var labelStatesModels = (0,labelStyle.getLabelStatesModels)(itemModel);
  (0,labelStyle.setLabelStyle)(el, labelStatesModels, {
    labelFetcher: seriesModel,
    labelDataIndex: dataIndex,
    defaultText: (0,labelHelper.getDefaultLabel)(seriesModel.getData(), dataIndex),
    inheritColor: style.fill,
    defaultOpacity: style.opacity,
    defaultOutsidePosition: labelPositionOutside
  });
  var label = el.getTextContent();
  if (isPolar && label) {
    var position = itemModel.get(['label', 'position']);
    el.textConfig.inside = position === 'middle' ? true : null;
    (0,sectorLabel.setSectorTextRotation)(el, position === 'outside' ? labelPositionOutside : position, createPolarPositionMapping(isHorizontalOrRadial), itemModel.get(['label', 'rotate']));
  }
  (0,labelStyle.setLabelValueAnimation)(label, labelStatesModels, seriesModel.getRawValue(dataIndex), function (value) {
    return (0,labelHelper.getDefaultInterpolatedLabel)(data, value);
  });
  var emphasisModel = itemModel.getModel(['emphasis']);
  (0,states.toggleHoverEmphasis)(el, emphasisModel.get('focus'), emphasisModel.get('blurScope'), emphasisModel.get('disabled'));
  (0,states.setStatesStylesFromModel)(el, itemModel);
  if (isZeroOnPolar(layout)) {
    el.style.fill = 'none';
    el.style.stroke = 'none';
    (0,util.each)(el.states, function (state) {
      if (state.style) {
        state.style.fill = state.style.stroke = 'none';
      }
    });
  }
}
// In case width or height are too small.
function getLineWidth(itemModel, rawLayout) {
  // Has no border.
  var borderColor = itemModel.get(['itemStyle', 'borderColor']);
  if (!borderColor || borderColor === 'none') {
    return 0;
  }
  var lineWidth = itemModel.get(['itemStyle', 'borderWidth']) || 0;
  // width or height may be NaN for empty data
  var width = isNaN(rawLayout.width) ? Number.MAX_VALUE : Math.abs(rawLayout.width);
  var height = isNaN(rawLayout.height) ? Number.MAX_VALUE : Math.abs(rawLayout.height);
  return Math.min(lineWidth, width, height);
}
var BarView_LagePathShape = /** @class */function () {
  function LagePathShape() {}
  return LagePathShape;
}();
var BarView_LargePath = /** @class */function (_super) {
  (0,tslib_es6.__extends)(LargePath, _super);
  function LargePath(opts) {
    var _this = _super.call(this, opts) || this;
    _this.type = 'largeBar';
    return _this;
  }
  LargePath.prototype.getDefaultShape = function () {
    return new BarView_LagePathShape();
  };
  LargePath.prototype.buildPath = function (ctx, shape) {
    // Drawing lines is more efficient than drawing
    // a whole line or drawing rects.
    var points = shape.points;
    var baseDimIdx = this.baseDimIdx;
    var valueDimIdx = 1 - this.baseDimIdx;
    var startPoint = [];
    var size = [];
    var barWidth = this.barWidth;
    for (var i = 0; i < points.length; i += 3) {
      size[baseDimIdx] = barWidth;
      size[valueDimIdx] = points[i + 2];
      startPoint[baseDimIdx] = points[i + baseDimIdx];
      startPoint[valueDimIdx] = points[i + valueDimIdx];
      ctx.rect(startPoint[0], startPoint[1], size[0], size[1]);
    }
  };
  return LargePath;
}(Path["default"]);
function createLarge(seriesModel, group, progressiveEls, incremental) {
  // TODO support polar
  var data = seriesModel.getData();
  var baseDimIdx = data.getLayout('valueAxisHorizontal') ? 1 : 0;
  var largeDataIndices = data.getLayout('largeDataIndices');
  var barWidth = data.getLayout('size');
  var backgroundModel = seriesModel.getModel('backgroundStyle');
  var bgPoints = data.getLayout('largeBackgroundPoints');
  if (bgPoints) {
    var bgEl = new BarView_LargePath({
      shape: {
        points: bgPoints
      },
      incremental: !!incremental,
      silent: true,
      z2: 0
    });
    bgEl.baseDimIdx = baseDimIdx;
    bgEl.largeDataIndices = largeDataIndices;
    bgEl.barWidth = barWidth;
    bgEl.useStyle(backgroundModel.getItemStyle());
    group.add(bgEl);
    progressiveEls && progressiveEls.push(bgEl);
  }
  var el = new BarView_LargePath({
    shape: {
      points: data.getLayout('largePoints')
    },
    incremental: !!incremental,
    ignoreCoarsePointer: true,
    z2: 1
  });
  el.baseDimIdx = baseDimIdx;
  el.largeDataIndices = largeDataIndices;
  el.barWidth = barWidth;
  group.add(el);
  el.useStyle(data.getVisual('style'));
  // Stroke is rendered first to avoid overlapping with fill
  el.style.stroke = null;
  // Enable tooltip and user mouse/touch event handlers.
  (0,innerStore.getECData)(el).seriesIndex = seriesModel.seriesIndex;
  if (!seriesModel.get('silent')) {
    el.on('mousedown', largePathUpdateDataIndex);
    el.on('mousemove', largePathUpdateDataIndex);
  }
  progressiveEls && progressiveEls.push(el);
}
// Use throttle to avoid frequently traverse to find dataIndex.
var largePathUpdateDataIndex = (0,throttle.throttle)(function (event) {
  var largePath = this;
  var dataIndex = largePathFindDataIndex(largePath, event.offsetX, event.offsetY);
  (0,innerStore.getECData)(largePath).dataIndex = dataIndex >= 0 ? dataIndex : null;
}, 30, false);
function largePathFindDataIndex(largePath, x, y) {
  var baseDimIdx = largePath.baseDimIdx;
  var valueDimIdx = 1 - baseDimIdx;
  var points = largePath.shape.points;
  var largeDataIndices = largePath.largeDataIndices;
  var startPoint = [];
  var size = [];
  var barWidth = largePath.barWidth;
  for (var i = 0, len = points.length / 3; i < len; i++) {
    var ii = i * 3;
    size[baseDimIdx] = barWidth;
    size[valueDimIdx] = points[ii + 2];
    startPoint[baseDimIdx] = points[ii + baseDimIdx];
    startPoint[valueDimIdx] = points[ii + valueDimIdx];
    if (size[valueDimIdx] < 0) {
      startPoint[valueDimIdx] += size[valueDimIdx];
      size[valueDimIdx] = -size[valueDimIdx];
    }
    if (x >= startPoint[0] && x <= startPoint[0] + size[0] && y >= startPoint[1] && y <= startPoint[1] + size[1]) {
      return largeDataIndices[i];
    }
  }
  return -1;
}
function createBackgroundShape(isHorizontalOrRadial, layout, coord) {
  if ((0,CoordinateSystem.isCoordinateSystemType)(coord, 'cartesian2d')) {
    var rectShape = layout;
    var coordLayout = coord.getArea();
    return {
      x: isHorizontalOrRadial ? rectShape.x : coordLayout.x,
      y: isHorizontalOrRadial ? coordLayout.y : rectShape.y,
      width: isHorizontalOrRadial ? rectShape.width : coordLayout.width,
      height: isHorizontalOrRadial ? coordLayout.height : rectShape.height
    };
  } else {
    var coordLayout = coord.getArea();
    var sectorShape = layout;
    return {
      cx: coordLayout.cx,
      cy: coordLayout.cy,
      r0: isHorizontalOrRadial ? coordLayout.r0 : sectorShape.r0,
      r: isHorizontalOrRadial ? coordLayout.r : sectorShape.r,
      startAngle: isHorizontalOrRadial ? sectorShape.startAngle : 0,
      endAngle: isHorizontalOrRadial ? sectorShape.endAngle : Math.PI * 2
    };
  }
}
function createBackgroundEl(coord, isHorizontalOrRadial, layout) {
  var ElementClz = coord.type === 'polar' ? Sector["default"] : Rect["default"];
  return new ElementClz({
    shape: createBackgroundShape(isHorizontalOrRadial, layout, coord),
    silent: true,
    z2: 0
  });
}
/* export default */ var bar_BarView = (BarView_BarView);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/bar/install.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/





function install_install(registers) {
  registers.registerChartView(bar_BarView);
  registers.registerSeriesModel(BarSeries);
  registers.registerLayout(registers.PRIORITY.VISUAL.LAYOUT, util.curry(barGrid.layout, 'bar'));
  // Do layout after other overall layout, which can prepare some information.
  registers.registerLayout(registers.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, (0,barGrid.createProgressiveLayout)('bar'));
  // Down sample after filter
  registers.registerProcessor(registers.PRIORITY.PROCESSOR.STATISTIC, (0,dataSample["default"])('bar'));
  /**
   * @payload
   * @property {string} [componentType=series]
   * @property {number} [dx]
   * @property {number} [dy]
   * @property {number} [zoom]
   * @property {number} [originX]
   * @property {number} [originY]
   */
  registers.registerAction({
    type: 'changeAxisOrder',
    event: 'changeAxisOrder',
    update: 'update'
  }, function (payload, ecModel) {
    var componentType = payload.componentType || 'series';
    ecModel.eachComponent({
      mainType: componentType,
      query: payload
    }, function (componentModel) {
      if (payload.sortInfo) {
        componentModel.axis.setCategorySortInfo(payload.sortInfo);
      }
    });
  });
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/pie/install.js + 4 modules
var pie_install = __webpack_require__(52926);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/scatter/install.js + 3 modules
var scatter_install = __webpack_require__(99312);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/radar/install.js + 4 modules
var radar_install = __webpack_require__(33591);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/map/install.js + 4 modules
var map_install = __webpack_require__(34184);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/tree/install.js + 7 modules
var tree_install = __webpack_require__(17180);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/treemap/install.js + 6 modules
var treemap_install = __webpack_require__(84836);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/graph/install.js + 15 modules
var graph_install = __webpack_require__(48629);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/Text.js
var Text = __webpack_require__(32322);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/chord/ChordPiece.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/







var ChordPiece_ChordPiece = /** @class */function (_super) {
  (0,tslib_es6.__extends)(ChordPiece, _super);
  function ChordPiece(data, idx, startAngle) {
    var _this = _super.call(this) || this;
    (0,innerStore.getECData)(_this).dataType = 'node';
    _this.z2 = 2;
    var text = new Text["default"]();
    _this.setTextContent(text);
    _this.updateData(data, idx, startAngle, true);
    return _this;
  }
  ChordPiece.prototype.updateData = function (data, idx, startAngle, firstCreate) {
    var sector = this;
    var node = data.graph.getNodeByIndex(idx);
    var seriesModel = data.hostModel;
    var itemModel = node.getModel();
    var emphasisModel = itemModel.getModel('emphasis');
    // layout position is the center of the sector
    var layout = data.getItemLayout(idx);
    var shape = (0,util.extend)((0,sectorHelper.getSectorCornerRadius)(itemModel.getModel('itemStyle'), layout, true), layout);
    var el = this;
    // Ignore NaN data.
    if (isNaN(shape.startAngle)) {
      // Use NaN shape to avoid drawing shape.
      el.setShape(shape);
      return;
    }
    if (firstCreate) {
      el.setShape(shape);
    } else {
      basicTransition.updateProps(el, {
        shape: shape
      }, seriesModel, idx);
    }
    var sectorShape = (0,util.extend)((0,sectorHelper.getSectorCornerRadius)(itemModel.getModel('itemStyle'), layout, true), layout);
    sector.setShape(sectorShape);
    sector.useStyle(data.getItemVisual(idx, 'style'));
    (0,states.setStatesStylesFromModel)(sector, itemModel);
    this._updateLabel(seriesModel, itemModel, node);
    data.setItemGraphicEl(idx, el);
    (0,states.setStatesStylesFromModel)(el, itemModel, 'itemStyle');
    // Add focus/blur states handling
    var focus = emphasisModel.get('focus');
    (0,states.toggleHoverEmphasis)(this, focus === 'adjacency' ? node.getAdjacentDataIndices() : focus, emphasisModel.get('blurScope'), emphasisModel.get('disabled'));
  };
  ChordPiece.prototype._updateLabel = function (seriesModel, itemModel, node) {
    var label = this.getTextContent();
    var layout = node.getLayout();
    var midAngle = (layout.startAngle + layout.endAngle) / 2;
    var dx = Math.cos(midAngle);
    var dy = Math.sin(midAngle);
    var normalLabelModel = itemModel.getModel('label');
    label.ignore = !normalLabelModel.get('show');
    // Set label style
    var labelStateModels = (0,labelStyle.getLabelStatesModels)(itemModel);
    var style = node.getVisual('style');
    (0,labelStyle.setLabelStyle)(label, labelStateModels, {
      labelFetcher: {
        getFormattedLabel: function (dataIndex, stateName, dataType, labelDimIndex, formatter, extendParams) {
          return seriesModel.getFormattedLabel(dataIndex, stateName, 'node', labelDimIndex,
          // ensure edgeLabel formatter is provided
          // to prevent the inheritance from `label.formatter` of the series
          (0,util.retrieve3)(formatter, labelStateModels.normal && labelStateModels.normal.get('formatter'), itemModel.get('name')), extendParams);
        }
      },
      labelDataIndex: node.dataIndex,
      defaultText: node.dataIndex + '',
      inheritColor: style.fill,
      defaultOpacity: style.opacity,
      defaultOutsidePosition: 'startArc'
    });
    // Set label position
    var labelPosition = normalLabelModel.get('position') || 'outside';
    var labelPadding = normalLabelModel.get('distance') || 0;
    var r;
    if (labelPosition === 'outside') {
      r = layout.r + labelPadding;
    } else {
      r = (layout.r + layout.r0) / 2;
    }
    this.textConfig = {
      inside: labelPosition !== 'outside'
    };
    var align = labelPosition !== 'outside' ? normalLabelModel.get('align') || 'center' : dx > 0 ? 'left' : 'right';
    var verticalAlign = labelPosition !== 'outside' ? normalLabelModel.get('verticalAlign') || 'middle' : dy > 0 ? 'top' : 'bottom';
    label.attr({
      x: dx * r + layout.cx,
      y: dy * r + layout.cy,
      rotation: 0,
      style: {
        align: align,
        verticalAlign: verticalAlign
      }
    });
  };
  return ChordPiece;
}(Sector["default"]);
/* export default */ var chord_ChordPiece = (ChordPiece_ChordPiece);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/LinearGradient.js
var LinearGradient = __webpack_require__(29668);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/chord/ChordEdge.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/







var ChordEdge_ChordPathShape = /** @class */function () {
  function ChordPathShape() {
    // Souce node, two points forming an arc
    this.s1 = [0, 0];
    this.s2 = [0, 0];
    this.sStartAngle = 0;
    this.sEndAngle = 0;
    // Target node, two points forming an arc
    this.t1 = [0, 0];
    this.t2 = [0, 0];
    this.tStartAngle = 0;
    this.tEndAngle = 0;
    this.cx = 0;
    this.cy = 0;
    // series.r0 of ChordSeries
    this.r = 0;
    this.clockwise = true;
  }
  return ChordPathShape;
}();

var ChordEdge_ChordEdge = /** @class */function (_super) {
  (0,tslib_es6.__extends)(ChordEdge, _super);
  function ChordEdge(nodeData, edgeData, edgeIdx, startAngle) {
    var _this = _super.call(this) || this;
    (0,innerStore.getECData)(_this).dataType = 'edge';
    _this.updateData(nodeData, edgeData, edgeIdx, startAngle, true);
    return _this;
  }
  ChordEdge.prototype.buildPath = function (ctx, shape) {
    // Start from n11
    ctx.moveTo(shape.s1[0], shape.s1[1]);
    var ratio = 0.7;
    var clockwise = shape.clockwise;
    // Draw the arc from n11 to n12
    ctx.arc(shape.cx, shape.cy, shape.r, shape.sStartAngle, shape.sEndAngle, !clockwise);
    // Bezier curve to cp1 and then to n21
    ctx.bezierCurveTo((shape.cx - shape.s2[0]) * ratio + shape.s2[0], (shape.cy - shape.s2[1]) * ratio + shape.s2[1], (shape.cx - shape.t1[0]) * ratio + shape.t1[0], (shape.cy - shape.t1[1]) * ratio + shape.t1[1], shape.t1[0], shape.t1[1]);
    // Draw the arc from n21 to n22
    ctx.arc(shape.cx, shape.cy, shape.r, shape.tStartAngle, shape.tEndAngle, !clockwise);
    // Bezier curve back to cp2 and then to n11
    ctx.bezierCurveTo((shape.cx - shape.t2[0]) * ratio + shape.t2[0], (shape.cy - shape.t2[1]) * ratio + shape.t2[1], (shape.cx - shape.s1[0]) * ratio + shape.s1[0], (shape.cy - shape.s1[1]) * ratio + shape.s1[1], shape.s1[0], shape.s1[1]);
    ctx.closePath();
  };
  ChordEdge.prototype.updateData = function (nodeData, edgeData, edgeIdx, startAngle, firstCreate) {
    var seriesModel = nodeData.hostModel;
    var edge = edgeData.graph.getEdgeByIndex(edgeIdx);
    var layout = edge.getLayout();
    var itemModel = edge.node1.getModel();
    var edgeModel = edgeData.getItemModel(edge.dataIndex);
    var lineStyle = edgeModel.getModel('lineStyle');
    var emphasisModel = edgeModel.getModel('emphasis');
    var focus = emphasisModel.get('focus');
    var shape = (0,util.extend)((0,sectorHelper.getSectorCornerRadius)(itemModel.getModel('itemStyle'), layout, true), layout);
    var el = this;
    // Ignore NaN data.
    if (isNaN(shape.sStartAngle) || isNaN(shape.tStartAngle)) {
      // Use NaN shape to avoid drawing shape.
      el.setShape(shape);
      return;
    }
    if (firstCreate) {
      el.setShape(shape);
      applyEdgeFill(el, edge, nodeData, lineStyle);
    } else {
      (0,basicTransition.saveOldStyle)(el);
      applyEdgeFill(el, edge, nodeData, lineStyle);
      basicTransition.updateProps(el, {
        shape: shape
      }, seriesModel, edgeIdx);
    }
    (0,states.toggleHoverEmphasis)(this, focus === 'adjacency' ? edge.getAdjacentDataIndices() : focus, emphasisModel.get('blurScope'), emphasisModel.get('disabled'));
    (0,states.setStatesStylesFromModel)(el, edgeModel, 'lineStyle');
    edgeData.setItemGraphicEl(edge.dataIndex, el);
  };
  return ChordEdge;
}(Path["default"]);

function applyEdgeFill(edgeShape, edge, nodeData, lineStyleModel) {
  var node1 = edge.node1;
  var node2 = edge.node2;
  var edgeStyle = edgeShape.style;
  edgeShape.setStyle(lineStyleModel.getLineStyle());
  var color = lineStyleModel.get('color');
  switch (color) {
    case 'source':
      // TODO: use visual and node1.getVisual('color');
      edgeStyle.fill = nodeData.getItemVisual(node1.dataIndex, 'style').fill;
      edgeStyle.decal = node1.getVisual('style').decal;
      break;
    case 'target':
      edgeStyle.fill = nodeData.getItemVisual(node2.dataIndex, 'style').fill;
      edgeStyle.decal = node2.getVisual('style').decal;
      break;
    case 'gradient':
      var sourceColor = nodeData.getItemVisual(node1.dataIndex, 'style').fill;
      var targetColor = nodeData.getItemVisual(node2.dataIndex, 'style').fill;
      if ((0,util.isString)(sourceColor) && (0,util.isString)(targetColor)) {
        // Gradient direction is perpendicular to the mid-angles
        // of source and target nodes.
        var shape = edgeShape.shape;
        var sMidX = (shape.s1[0] + shape.s2[0]) / 2;
        var sMidY = (shape.s1[1] + shape.s2[1]) / 2;
        var tMidX = (shape.t1[0] + shape.t2[0]) / 2;
        var tMidY = (shape.t1[1] + shape.t2[1]) / 2;
        edgeStyle.fill = new LinearGradient["default"](sMidX, sMidY, tMidX, tMidY, [{
          offset: 0,
          color: sourceColor
        }, {
          offset: 1,
          color: targetColor
        }], true);
      }
      break;
  }
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/number.js
var number = __webpack_require__(24326);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/chord/ChordView.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/







var RADIAN = Math.PI / 180;
var ChordView_ChordView = /** @class */function (_super) {
  (0,tslib_es6.__extends)(ChordView, _super);
  function ChordView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = ChordView.type;
    return _this;
  }
  ChordView.prototype.init = function (ecModel, api) {};
  ChordView.prototype.render = function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();
    var oldData = this._data;
    var group = this.group;
    var startAngle = -seriesModel.get('startAngle') * RADIAN;
    data.diff(oldData).add(function (newIdx) {
      /* Consider the case when there are only two nodes A and B,
       * and there is a link between A and B.
       * At first, they are both disselected from legend. And then
       * when A is selected, A will go into `add` method. But since
       * there are no edges to be displayed, A should not be added.
       * So we should only add A when layout is defined.
       */
      var layout = data.getItemLayout(newIdx);
      if (layout) {
        var el = new chord_ChordPiece(data, newIdx, startAngle);
        (0,innerStore.getECData)(el).dataIndex = newIdx;
        group.add(el);
      }
    }).update(function (newIdx, oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      var layout = data.getItemLayout(newIdx);
      /* Consider the case when there are only two nodes A and B,
       * and there is a link between A and B.
       * and when A is disselected from legend, there should be
       * nothing to display. But in the `data.diff` method, B will go
       * into `update` method and having no layout.
       * In this case, we need to remove B.
       */
      if (!layout) {
        el && basicTransition.removeElementWithFadeOut(el, seriesModel, oldIdx);
        return;
      }
      if (!el) {
        el = new chord_ChordPiece(data, newIdx, startAngle);
      } else {
        el.updateData(data, newIdx, startAngle);
      }
      group.add(el);
    }).remove(function (oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el && basicTransition.removeElementWithFadeOut(el, seriesModel, oldIdx);
    }).execute();
    if (!oldData) {
      var center = seriesModel.get('center');
      this.group.scaleX = 0.01;
      this.group.scaleY = 0.01;
      this.group.originX = (0,number.parsePercent)(center[0], api.getWidth());
      this.group.originY = (0,number.parsePercent)(center[1], api.getHeight());
      basicTransition.initProps(this.group, {
        scaleX: 1,
        scaleY: 1
      }, seriesModel);
    }
    this._data = data;
    this.renderEdges(seriesModel, startAngle);
  };
  ChordView.prototype.renderEdges = function (seriesModel, startAngle) {
    var nodeData = seriesModel.getData();
    var edgeData = seriesModel.getEdgeData();
    var oldData = this._edgeData;
    var group = this.group;
    edgeData.diff(oldData).add(function (newIdx) {
      var el = new ChordEdge_ChordEdge(nodeData, edgeData, newIdx, startAngle);
      (0,innerStore.getECData)(el).dataIndex = newIdx;
      group.add(el);
    }).update(function (newIdx, oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el.updateData(nodeData, edgeData, newIdx, startAngle);
      group.add(el);
    }).remove(function (oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el && basicTransition.removeElementWithFadeOut(el, seriesModel, oldIdx);
    }).execute();
    this._edgeData = edgeData;
  };
  ChordView.prototype.dispose = function () {};
  ChordView.type = 'chord';
  return ChordView;
}(Chart["default"]);
/* export default */ var chord_ChordView = (ChordView_ChordView);
// EXTERNAL MODULE: ./node_modules/echarts/lib/model/Model.js + 2 modules
var Model = __webpack_require__(35633);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/helper/createGraphFromNodeEdge.js
var createGraphFromNodeEdge = __webpack_require__(62695);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/tooltip/tooltipMarkup.js
var tooltipMarkup = __webpack_require__(3961);
// EXTERNAL MODULE: ./node_modules/echarts/lib/visual/LegendVisualProvider.js
var LegendVisualProvider = __webpack_require__(58239);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/chord/ChordSeries.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/







var ChordSeries_ChordSeriesModel = /** @class */function (_super) {
  (0,tslib_es6.__extends)(ChordSeriesModel, _super);
  function ChordSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = ChordSeriesModel.type;
    return _this;
  }
  ChordSeriesModel.prototype.init = function (option) {
    _super.prototype.init.apply(this, arguments);
    this.fillDataTextStyle(option.edges || option.links);
    // Enable legend selection for each data item
    this.legendVisualProvider = new LegendVisualProvider["default"](util.bind(this.getData, this), util.bind(this.getRawData, this));
  };
  ChordSeriesModel.prototype.mergeOption = function (option) {
    _super.prototype.mergeOption.apply(this, arguments);
    this.fillDataTextStyle(option.edges || option.links);
  };
  ChordSeriesModel.prototype.getInitialData = function (option, ecModel) {
    var edges = option.edges || option.links || [];
    var nodes = option.data || option.nodes || [];
    if (nodes && edges) {
      var graph = (0,createGraphFromNodeEdge["default"])(nodes, edges, this, true, beforeLink);
      return graph.data;
    }
    function beforeLink(nodeData, edgeData) {
      // TODO Inherit resolveParentPath by default in Model#getModel?
      var oldGetModel = Model["default"].prototype.getModel;
      function newGetModel(path, parentModel) {
        var model = oldGetModel.call(this, path, parentModel);
        model.resolveParentPath = resolveParentPath;
        return model;
      }
      edgeData.wrapMethod('getItemModel', function (model) {
        model.resolveParentPath = resolveParentPath;
        model.getModel = newGetModel;
        return model;
      });
      function resolveParentPath(pathArr) {
        if (pathArr && (pathArr[0] === 'label' || pathArr[1] === 'label')) {
          var newPathArr = pathArr.slice();
          if (pathArr[0] === 'label') {
            newPathArr[0] = 'edgeLabel';
          } else if (pathArr[1] === 'label') {
            newPathArr[1] = 'edgeLabel';
          }
          return newPathArr;
        }
        return pathArr;
      }
    }
  };
  ChordSeriesModel.prototype.getGraph = function () {
    return this.getData().graph;
  };
  ChordSeriesModel.prototype.getEdgeData = function () {
    return this.getGraph().edgeData;
  };
  ChordSeriesModel.prototype.formatTooltip = function (dataIndex, multipleSeries, dataType) {
    var params = this.getDataParams(dataIndex, dataType);
    if (dataType === 'edge') {
      var nodeData = this.getData();
      var edge = nodeData.graph.getEdgeByIndex(dataIndex);
      var sourceName = nodeData.getName(edge.node1.dataIndex);
      var targetName = nodeData.getName(edge.node2.dataIndex);
      var nameArr = [];
      sourceName != null && nameArr.push(sourceName);
      targetName != null && nameArr.push(targetName);
      return (0,tooltipMarkup.createTooltipMarkup)('nameValue', {
        name: nameArr.join(' > '),
        value: params.value,
        noValue: params.value == null
      });
    }
    // dataType === 'node' or empty
    return (0,tooltipMarkup.createTooltipMarkup)('nameValue', {
      name: params.name,
      value: params.value,
      noValue: params.value == null
    });
  };
  ChordSeriesModel.prototype.getDataParams = function (dataIndex, dataType) {
    var params = _super.prototype.getDataParams.call(this, dataIndex, dataType);
    if (dataType === 'node') {
      var nodeData = this.getData();
      var node = this.getGraph().getNodeByIndex(dataIndex);
      // Set name if not already set
      if (params.name == null) {
        params.name = nodeData.getName(dataIndex);
      }
      // Set value if not already set
      if (params.value == null) {
        var nodeValue = node.getLayout().value;
        params.value = nodeValue;
      }
    }
    return params;
  };
  ChordSeriesModel.type = 'series.chord';
  ChordSeriesModel.defaultOption = {
    // zlevel: 0,
    z: 2,
    coordinateSystem: 'none',
    legendHoverLink: true,
    colorBy: 'data',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: null,
    height: null,
    center: ['50%', '50%'],
    radius: ['70%', '80%'],
    clockwise: true,
    startAngle: 90,
    endAngle: 'auto',
    minAngle: 0,
    padAngle: 3,
    itemStyle: {
      borderRadius: [0, 0, 5, 5]
    },
    lineStyle: {
      width: 0,
      color: 'source',
      opacity: 0.2
    },
    label: {
      show: true,
      position: 'outside',
      distance: 5
    },
    emphasis: {
      focus: 'adjacency',
      lineStyle: {
        opacity: 0.5
      }
    }
  };
  return ChordSeriesModel;
}(Series["default"]);
/* export default */ var ChordSeries = (ChordSeries_ChordSeriesModel);
// EXTERNAL MODULE: ./node_modules/zrender/lib/core/PathProxy.js
var PathProxy = __webpack_require__(68717);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/layout.js
var util_layout = __webpack_require__(34253);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/chord/chordLayout.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


var chordLayout_RADIAN = Math.PI / 180;
function chordCircularLayout(ecModel, api) {
  ecModel.eachSeriesByType('chord', function (seriesModel) {
    chordLayout(seriesModel, api);
  });
}
function chordLayout(seriesModel, api) {
  var nodeData = seriesModel.getData();
  var nodeGraph = nodeData.graph;
  var edgeData = seriesModel.getEdgeData();
  var edgeCount = edgeData.count();
  if (!edgeCount) {
    return;
  }
  var _a = (0,util_layout.getCircleLayout)(seriesModel, api),
    cx = _a.cx,
    cy = _a.cy,
    r = _a.r,
    r0 = _a.r0;
  var padAngle = Math.max((seriesModel.get('padAngle') || 0) * chordLayout_RADIAN, 0);
  var minAngle = Math.max((seriesModel.get('minAngle') || 0) * chordLayout_RADIAN, 0);
  var startAngle = -seriesModel.get('startAngle') * chordLayout_RADIAN;
  var endAngle = startAngle + Math.PI * 2;
  var clockwise = seriesModel.get('clockwise');
  var dir = clockwise ? 1 : -1;
  // Normalize angles
  var angles = [startAngle, endAngle];
  (0,PathProxy.normalizeArcAngles)(angles, !clockwise);
  var normalizedStartAngle = angles[0],
    normalizedEndAngle = angles[1];
  var totalAngle = normalizedEndAngle - normalizedStartAngle;
  var allZero = nodeData.getSum('value') === 0 && edgeData.getSum('value') === 0;
  // Sum of each node's edge values
  var nodeValues = [];
  var renderedNodeCount = 0;
  nodeGraph.eachEdge(function (edge) {
    // All links use the same value 1 when allZero is true
    var value = allZero ? 1 : edge.getValue('value');
    if (allZero && (value > 0 || minAngle)) {
      // When allZero is true, angle is in direct proportion to number
      // of links both in and out of the node.
      renderedNodeCount += 2;
    }
    var node1Index = edge.node1.dataIndex;
    var node2Index = edge.node2.dataIndex;
    nodeValues[node1Index] = (nodeValues[node1Index] || 0) + value;
    nodeValues[node2Index] = (nodeValues[node2Index] || 0) + value;
  });
  // Update nodeValues with data.value if exists
  var nodeValueSum = 0;
  nodeGraph.eachNode(function (node) {
    var dataValue = node.getValue('value');
    if (!isNaN(dataValue)) {
      nodeValues[node.dataIndex] = Math.max(dataValue, nodeValues[node.dataIndex] || 0);
    }
    if (!allZero && (nodeValues[node.dataIndex] > 0 || minAngle)) {
      // When allZero is false, angle is in direct proportion to node's
      // value
      renderedNodeCount++;
    }
    nodeValueSum += nodeValues[node.dataIndex] || 0;
  });
  if (renderedNodeCount === 0 || nodeValueSum === 0) {
    return;
  }
  if (padAngle * renderedNodeCount >= Math.abs(totalAngle)) {
    // Not enough angle to render the pad, minAngle has higher priority, and padAngle takes the rest
    padAngle = Math.max(0, (Math.abs(totalAngle) - minAngle * renderedNodeCount) / renderedNodeCount);
  }
  if ((padAngle + minAngle) * renderedNodeCount >= Math.abs(totalAngle)) {
    // Not enough angle to render the minAngle, so ignore the minAngle
    minAngle = (Math.abs(totalAngle) - padAngle * renderedNodeCount) / renderedNodeCount;
  }
  var unitAngle = (totalAngle - padAngle * renderedNodeCount * dir) / nodeValueSum;
  var totalDeficit = 0; // sum of deficits of nodes with span < minAngle
  var totalSurplus = 0; // sum of (spans - minAngle) of nodes with span > minAngle
  var totalSurplusSpan = 0; // sum of spans of nodes with span > minAngle
  var minSurplus = Infinity; // min of (spans - minAngle) of nodes with span > minAngle
  nodeGraph.eachNode(function (node) {
    var value = nodeValues[node.dataIndex] || 0;
    var spanAngle = unitAngle * (nodeValueSum ? value : 1) * dir;
    if (Math.abs(spanAngle) < minAngle) {
      totalDeficit += minAngle - Math.abs(spanAngle);
    } else {
      minSurplus = Math.min(minSurplus, Math.abs(spanAngle) - minAngle);
      totalSurplus += Math.abs(spanAngle) - minAngle;
      totalSurplusSpan += Math.abs(spanAngle);
    }
    node.setLayout({
      angle: spanAngle,
      value: value
    });
  });
  var surplusAsMuchAsPossible = false;
  if (totalDeficit > totalSurplus) {
    // Not enough angle to spread the nodes, scale all
    var scale_1 = totalDeficit / totalSurplus;
    nodeGraph.eachNode(function (node) {
      var spanAngle = node.getLayout().angle;
      if (Math.abs(spanAngle) >= minAngle) {
        node.setLayout({
          angle: spanAngle * scale_1,
          ratio: scale_1
        }, true);
      } else {
        node.setLayout({
          angle: minAngle,
          ratio: minAngle === 0 ? 1 : spanAngle / minAngle
        }, true);
      }
    });
  } else {
    // For example, if totalDeficit is 60 degrees and totalSurplus is 70
    // degrees but one of the sector can only reduced by 1 degree,
    // if we decrease it with the ratio of value to other surplused nodes,
    // it will have smaller angle than minAngle itself.
    // So we need to borrow some angle from other nodes.
    nodeGraph.eachNode(function (node) {
      if (surplusAsMuchAsPossible) {
        return;
      }
      var spanAngle = node.getLayout().angle;
      var borrowRatio = Math.min(spanAngle / totalSurplusSpan, 1);
      var borrowAngle = borrowRatio * totalDeficit;
      if (spanAngle - borrowAngle < minAngle) {
        // It will have less than minAngle after borrowing
        surplusAsMuchAsPossible = true;
      }
    });
  }
  var restDeficit = totalDeficit;
  nodeGraph.eachNode(function (node) {
    if (restDeficit <= 0) {
      return;
    }
    var spanAngle = node.getLayout().angle;
    if (spanAngle > minAngle && minAngle > 0) {
      var borrowRatio = surplusAsMuchAsPossible ? 1 : Math.min(spanAngle / totalSurplusSpan, 1);
      var maxBorrowAngle = spanAngle - minAngle;
      var borrowAngle = Math.min(maxBorrowAngle, Math.min(restDeficit, totalDeficit * borrowRatio));
      restDeficit -= borrowAngle;
      node.setLayout({
        angle: spanAngle - borrowAngle,
        ratio: (spanAngle - borrowAngle) / spanAngle
      }, true);
    } else if (minAngle > 0) {
      node.setLayout({
        angle: minAngle,
        ratio: spanAngle === 0 ? 1 : minAngle / spanAngle
      }, true);
    }
  });
  var angle = normalizedStartAngle;
  var edgeAccAngle = [];
  nodeGraph.eachNode(function (node) {
    var spanAngle = Math.max(node.getLayout().angle, minAngle);
    node.setLayout({
      cx: cx,
      cy: cy,
      r0: r0,
      r: r,
      startAngle: angle,
      endAngle: angle + spanAngle * dir,
      clockwise: clockwise
    }, true);
    edgeAccAngle[node.dataIndex] = angle;
    angle += (spanAngle + padAngle) * dir;
  });
  nodeGraph.eachEdge(function (edge) {
    var value = allZero ? 1 : edge.getValue('value');
    var spanAngle = unitAngle * (nodeValueSum ? value : 1) * dir;
    var node1Index = edge.node1.dataIndex;
    var sStartAngle = edgeAccAngle[node1Index] || 0;
    var sSpan = Math.abs((edge.node1.getLayout().ratio || 1) * spanAngle);
    var sEndAngle = sStartAngle + sSpan * dir;
    var s1 = [cx + r0 * Math.cos(sStartAngle), cy + r0 * Math.sin(sStartAngle)];
    var s2 = [cx + r0 * Math.cos(sEndAngle), cy + r0 * Math.sin(sEndAngle)];
    var node2Index = edge.node2.dataIndex;
    var tStartAngle = edgeAccAngle[node2Index] || 0;
    var tSpan = Math.abs((edge.node2.getLayout().ratio || 1) * spanAngle);
    var tEndAngle = tStartAngle + tSpan * dir;
    var t1 = [cx + r0 * Math.cos(tStartAngle), cy + r0 * Math.sin(tStartAngle)];
    var t2 = [cx + r0 * Math.cos(tEndAngle), cy + r0 * Math.sin(tEndAngle)];
    edge.setLayout({
      s1: s1,
      s2: s2,
      sStartAngle: sStartAngle,
      sEndAngle: sEndAngle,
      t1: t1,
      t2: t2,
      tStartAngle: tStartAngle,
      tEndAngle: tEndAngle,
      cx: cx,
      cy: cy,
      r: r0,
      value: value,
      clockwise: clockwise
    });
    edgeAccAngle[node1Index] = sEndAngle;
    edgeAccAngle[node2Index] = tEndAngle;
  });
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/processor/dataFilter.js
var dataFilter = __webpack_require__(78587);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/chord/install.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/




function chord_install_install(registers) {
  registers.registerChartView(chord_ChordView);
  registers.registerSeriesModel(ChordSeries);
  registers.registerLayout(registers.PRIORITY.VISUAL.POST_CHART_LAYOUT, chordCircularLayout);
  // Add data filter processor
  registers.registerProcessor((0,dataFilter["default"])('chord'));
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/gauge/install.js + 3 modules
var gauge_install = __webpack_require__(43419);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/funnel/install.js + 3 modules
var funnel_install = __webpack_require__(24059);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/parallel/install.js + 3 modules
var parallel_install = __webpack_require__(39841);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/sankey/install.js + 4 modules
var sankey_install = __webpack_require__(68707);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/helper/whiskerBoxCommon.js
var whiskerBoxCommon = __webpack_require__(15501);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/boxplot/BoxplotSeries.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/





var BoxplotSeries_BoxplotSeriesModel = /** @class */function (_super) {
  (0,tslib_es6.__extends)(BoxplotSeriesModel, _super);
  function BoxplotSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = BoxplotSeriesModel.type;
    // TODO
    // box width represents group size, so dimension should have 'size'.
    /**
     * @see <https://en.wikipedia.org/wiki/Box_plot>
     * The meanings of 'min' and 'max' depend on user,
     * and echarts do not need to know it.
     * @readOnly
     */
    _this.defaultValueDimensions = [{
      name: 'min',
      defaultTooltip: true
    }, {
      name: 'Q1',
      defaultTooltip: true
    }, {
      name: 'median',
      defaultTooltip: true
    }, {
      name: 'Q3',
      defaultTooltip: true
    }, {
      name: 'max',
      defaultTooltip: true
    }];
    _this.visualDrawType = 'stroke';
    return _this;
  }
  BoxplotSeriesModel.type = 'series.boxplot';
  BoxplotSeriesModel.dependencies = ['xAxis', 'yAxis', 'grid'];
  BoxplotSeriesModel.defaultOption = {
    // zlevel: 0,
    z: 2,
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    layout: null,
    boxWidth: [7, 50],
    itemStyle: {
      color: tokens["default"].color.neutral00,
      borderWidth: 1
    },
    emphasis: {
      scale: true,
      itemStyle: {
        borderWidth: 2,
        shadowBlur: 5,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowColor: tokens["default"].color.shadow
      }
    },
    animationDuration: 800
  };
  return BoxplotSeriesModel;
}(Series["default"]);
(0,util.mixin)(BoxplotSeries_BoxplotSeriesModel, whiskerBoxCommon.WhiskerBoxCommonMixin, true);
/* export default */ var BoxplotSeries = (BoxplotSeries_BoxplotSeriesModel);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/boxplot/BoxplotView.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/







var BoxplotView_BoxplotView = /** @class */function (_super) {
  (0,tslib_es6.__extends)(BoxplotView, _super);
  function BoxplotView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = BoxplotView.type;
    return _this;
  }
  BoxplotView.prototype.render = function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();
    var group = this.group;
    var oldData = this._data;
    // There is no old data only when first rendering or switching from
    // stream mode to normal mode, where previous elements should be removed.
    if (!this._data) {
      group.removeAll();
    }
    var constDim = seriesModel.get('layout') === 'horizontal' ? 1 : 0;
    data.diff(oldData).add(function (newIdx) {
      if (data.hasValue(newIdx)) {
        var itemLayout = data.getItemLayout(newIdx);
        var symbolEl = createNormalBox(itemLayout, data, newIdx, constDim, true);
        data.setItemGraphicEl(newIdx, symbolEl);
        group.add(symbolEl);
      }
    }).update(function (newIdx, oldIdx) {
      var symbolEl = oldData.getItemGraphicEl(oldIdx);
      // Empty data
      if (!data.hasValue(newIdx)) {
        group.remove(symbolEl);
        return;
      }
      var itemLayout = data.getItemLayout(newIdx);
      if (!symbolEl) {
        symbolEl = createNormalBox(itemLayout, data, newIdx, constDim);
      } else {
        (0,basicTransition.saveOldStyle)(symbolEl);
        updateNormalBoxData(itemLayout, symbolEl, data, newIdx);
      }
      group.add(symbolEl);
      data.setItemGraphicEl(newIdx, symbolEl);
    }).remove(function (oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el && group.remove(el);
    }).execute();
    this._data = data;
  };
  BoxplotView.prototype.remove = function (ecModel) {
    var group = this.group;
    var data = this._data;
    this._data = null;
    data && data.eachItemGraphicEl(function (el) {
      el && group.remove(el);
    });
  };
  BoxplotView.type = 'boxplot';
  return BoxplotView;
}(Chart["default"]);
var BoxplotView_BoxPathShape = /** @class */function () {
  function BoxPathShape() {}
  return BoxPathShape;
}();
var BoxplotView_BoxPath = /** @class */function (_super) {
  (0,tslib_es6.__extends)(BoxPath, _super);
  function BoxPath(opts) {
    var _this = _super.call(this, opts) || this;
    _this.type = 'boxplotBoxPath';
    return _this;
  }
  BoxPath.prototype.getDefaultShape = function () {
    return new BoxplotView_BoxPathShape();
  };
  BoxPath.prototype.buildPath = function (ctx, shape) {
    var ends = shape.points;
    var i = 0;
    ctx.moveTo(ends[i][0], ends[i][1]);
    i++;
    for (; i < 4; i++) {
      ctx.lineTo(ends[i][0], ends[i][1]);
    }
    ctx.closePath();
    for (; i < ends.length; i++) {
      ctx.moveTo(ends[i][0], ends[i][1]);
      i++;
      ctx.lineTo(ends[i][0], ends[i][1]);
    }
  };
  return BoxPath;
}(Path["default"]);
function createNormalBox(itemLayout, data, dataIndex, constDim, isInit) {
  var ends = itemLayout.ends;
  var el = new BoxplotView_BoxPath({
    shape: {
      points: isInit ? transInit(ends, constDim, itemLayout) : ends
    }
  });
  updateNormalBoxData(itemLayout, el, data, dataIndex, isInit);
  return el;
}
function updateNormalBoxData(itemLayout, el, data, dataIndex, isInit) {
  var seriesModel = data.hostModel;
  var updateMethod = graphic[isInit ? 'initProps' : 'updateProps'];
  updateMethod(el, {
    shape: {
      points: itemLayout.ends
    }
  }, seriesModel, dataIndex);
  el.useStyle(data.getItemVisual(dataIndex, 'style'));
  el.style.strokeNoScale = true;
  el.z2 = 100;
  var itemModel = data.getItemModel(dataIndex);
  var emphasisModel = itemModel.getModel('emphasis');
  (0,states.setStatesStylesFromModel)(el, itemModel);
  (0,states.toggleHoverEmphasis)(el, emphasisModel.get('focus'), emphasisModel.get('blurScope'), emphasisModel.get('disabled'));
}
function transInit(points, dim, itemLayout) {
  return util.map(points, function (point) {
    point = point.slice();
    point[dim] = itemLayout.initBaseline;
    return point;
  });
}
/* export default */ var boxplot_BoxplotView = (BoxplotView_BoxplotView);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/boxplot/boxplotLayout.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


var each = util.each;
function boxplotLayout(ecModel) {
  var groupResult = groupSeriesByAxis(ecModel);
  each(groupResult, function (groupItem) {
    var seriesModels = groupItem.seriesModels;
    if (!seriesModels.length) {
      return;
    }
    calculateBase(groupItem);
    each(seriesModels, function (seriesModel, idx) {
      layoutSingleSeries(seriesModel, groupItem.boxOffsetList[idx], groupItem.boxWidthList[idx]);
    });
  });
}
/**
 * Group series by axis.
 */
function groupSeriesByAxis(ecModel) {
  var result = [];
  var axisList = [];
  ecModel.eachSeriesByType('boxplot', function (seriesModel) {
    var baseAxis = seriesModel.getBaseAxis();
    var idx = util.indexOf(axisList, baseAxis);
    if (idx < 0) {
      idx = axisList.length;
      axisList[idx] = baseAxis;
      result[idx] = {
        axis: baseAxis,
        seriesModels: []
      };
    }
    result[idx].seriesModels.push(seriesModel);
  });
  return result;
}
/**
 * Calculate offset and box width for each series.
 */
function calculateBase(groupItem) {
  var baseAxis = groupItem.axis;
  var seriesModels = groupItem.seriesModels;
  var seriesCount = seriesModels.length;
  var boxWidthList = groupItem.boxWidthList = [];
  var boxOffsetList = groupItem.boxOffsetList = [];
  var boundList = [];
  var bandWidth;
  if (baseAxis.type === 'category') {
    bandWidth = baseAxis.getBandWidth();
  } else {
    var maxDataCount_1 = 0;
    each(seriesModels, function (seriesModel) {
      maxDataCount_1 = Math.max(maxDataCount_1, seriesModel.getData().count());
    });
    var extent = baseAxis.getExtent();
    bandWidth = Math.abs(extent[1] - extent[0]) / maxDataCount_1;
  }
  each(seriesModels, function (seriesModel) {
    var boxWidthBound = seriesModel.get('boxWidth');
    if (!util.isArray(boxWidthBound)) {
      boxWidthBound = [boxWidthBound, boxWidthBound];
    }
    boundList.push([(0,number.parsePercent)(boxWidthBound[0], bandWidth) || 0, (0,number.parsePercent)(boxWidthBound[1], bandWidth) || 0]);
  });
  var availableWidth = bandWidth * 0.8 - 2;
  var boxGap = availableWidth / seriesCount * 0.3;
  var boxWidth = (availableWidth - boxGap * (seriesCount - 1)) / seriesCount;
  var base = boxWidth / 2 - availableWidth / 2;
  each(seriesModels, function (seriesModel, idx) {
    boxOffsetList.push(base);
    base += boxGap + boxWidth;
    boxWidthList.push(Math.min(Math.max(boxWidth, boundList[idx][0]), boundList[idx][1]));
  });
}
/**
 * Calculate points location for each series.
 */
function layoutSingleSeries(seriesModel, offset, boxWidth) {
  var coordSys = seriesModel.coordinateSystem;
  var data = seriesModel.getData();
  var halfWidth = boxWidth / 2;
  var cDimIdx = seriesModel.get('layout') === 'horizontal' ? 0 : 1;
  var vDimIdx = 1 - cDimIdx;
  var coordDims = ['x', 'y'];
  var cDim = data.mapDimension(coordDims[cDimIdx]);
  var vDims = data.mapDimensionsAll(coordDims[vDimIdx]);
  if (cDim == null || vDims.length < 5) {
    return;
  }
  for (var dataIndex = 0; dataIndex < data.count(); dataIndex++) {
    var axisDimVal = data.get(cDim, dataIndex);
    var median = getPoint(axisDimVal, vDims[2], dataIndex);
    var end1 = getPoint(axisDimVal, vDims[0], dataIndex);
    var end2 = getPoint(axisDimVal, vDims[1], dataIndex);
    var end4 = getPoint(axisDimVal, vDims[3], dataIndex);
    var end5 = getPoint(axisDimVal, vDims[4], dataIndex);
    var ends = [];
    addBodyEnd(ends, end2, false);
    addBodyEnd(ends, end4, true);
    ends.push(end1, end2, end5, end4);
    layEndLine(ends, end1);
    layEndLine(ends, end5);
    layEndLine(ends, median);
    data.setItemLayout(dataIndex, {
      initBaseline: median[vDimIdx],
      ends: ends
    });
  }
  function getPoint(axisDimVal, dim, dataIndex) {
    var val = data.get(dim, dataIndex);
    var p = [];
    p[cDimIdx] = axisDimVal;
    p[vDimIdx] = val;
    var point;
    if (isNaN(axisDimVal) || isNaN(val)) {
      point = [NaN, NaN];
    } else {
      point = coordSys.dataToPoint(p);
      point[cDimIdx] += offset;
    }
    return point;
  }
  function addBodyEnd(ends, point, start) {
    var point1 = point.slice();
    var point2 = point.slice();
    point1[cDimIdx] += halfWidth;
    point2[cDimIdx] -= halfWidth;
    start ? ends.push(point1, point2) : ends.push(point2, point1);
  }
  function layEndLine(ends, endCenter) {
    var from = endCenter.slice();
    var to = endCenter.slice();
    from[cDimIdx] -= halfWidth;
    to[cDimIdx] += halfWidth;
    ends.push(from, to);
  }
}
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/boxplot/prepareBoxplotData.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * See:
 *  <https://en.wikipedia.org/wiki/Box_plot#cite_note-frigge_hoaglin_iglewicz-2>
 *  <http://stat.ethz.ch/R-manual/R-devel/library/grDevices/html/boxplot.stats.html>
 *
 * Helper method for preparing data.
 *
 * @param rawData like
 *        [
 *            [12,232,443], (raw data set for the first box)
 *            [3843,5545,1232], (raw data set for the second box)
 *            ...
 *        ]
 * @param opt.boundIQR=1.5 Data less than min bound is outlier.
 *      default 1.5, means Q1 - 1.5 * (Q3 - Q1).
 *      If 'none'/0 passed, min bound will not be used.
 */
function prepareBoxplotData(rawData, opt) {
  opt = opt || {};
  var boxData = [];
  var outliers = [];
  var boundIQR = opt.boundIQR;
  var useExtreme = boundIQR === 'none' || boundIQR === 0;
  for (var i = 0; i < rawData.length; i++) {
    var ascList = (0,number.asc)(rawData[i].slice());
    var Q1 = (0,number.quantile)(ascList, 0.25);
    var Q2 = (0,number.quantile)(ascList, 0.5);
    var Q3 = (0,number.quantile)(ascList, 0.75);
    var min = ascList[0];
    var max = ascList[ascList.length - 1];
    var bound = (boundIQR == null ? 1.5 : boundIQR) * (Q3 - Q1);
    var low = useExtreme ? min : Math.max(min, Q1 - bound);
    var high = useExtreme ? max : Math.min(max, Q3 + bound);
    var itemNameFormatter = opt.itemNameFormatter;
    var itemName = (0,util.isFunction)(itemNameFormatter) ? itemNameFormatter({
      value: i
    }) : (0,util.isString)(itemNameFormatter) ? itemNameFormatter.replace('{value}', i + '') : i + '';
    boxData.push([itemName, low, Q1, Q2, Q3, high]);
    for (var j = 0; j < ascList.length; j++) {
      var dataItem = ascList[j];
      if (dataItem < low || dataItem > high) {
        var outlier = [itemName, dataItem];
        outliers.push(outlier);
      }
    }
  }
  return {
    boxData: boxData,
    outliers: outliers
  };
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/types.js
var types = __webpack_require__(13430);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/boxplot/boxplotTransform.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/



var boxplotTransform = {
  type: 'echarts:boxplot',
  transform: function transform(params) {
    var upstream = params.upstream;
    if (upstream.sourceFormat !== types.SOURCE_FORMAT_ARRAY_ROWS) {
      var errMsg = '';
      if (true) {
        errMsg = (0,log.makePrintable)('source data is not applicable for this boxplot transform. Expect number[][].');
      }
      (0,log.throwError)(errMsg);
    }
    var result = prepareBoxplotData(upstream.getRawData(), params.config);
    return [{
      dimensions: ['ItemName', 'Low', 'Q1', 'Q2', 'Q3', 'High'],
      data: result.boxData
    }, {
      data: result.outliers
    }];
  }
};
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/boxplot/install.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/




function boxplot_install_install(registers) {
  registers.registerSeriesModel(BoxplotSeries);
  registers.registerChartView(boxplot_BoxplotView);
  registers.registerLayout(boxplotLayout);
  registers.registerTransform(boxplotTransform);
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/helper/createRenderPlanner.js
var createRenderPlanner = __webpack_require__(87582);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/candlestick/candlestickVisual.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


var positiveBorderColorQuery = ['itemStyle', 'borderColor'];
var negativeBorderColorQuery = ['itemStyle', 'borderColor0'];
var dojiBorderColorQuery = ['itemStyle', 'borderColorDoji'];
var positiveColorQuery = ['itemStyle', 'color'];
var negativeColorQuery = ['itemStyle', 'color0'];
function getColor(sign, model) {
  return model.get(sign > 0 ? positiveColorQuery : negativeColorQuery);
}
function getBorderColor(sign, model) {
  return model.get(sign === 0 ? dojiBorderColorQuery : sign > 0 ? positiveBorderColorQuery : negativeBorderColorQuery);
}
var candlestickVisual = {
  seriesType: 'candlestick',
  plan: (0,createRenderPlanner["default"])(),
  // For legend.
  performRawSeries: true,
  reset: function (seriesModel, ecModel) {
    // Only visible series has each data be visual encoded
    if (ecModel.isSeriesFiltered(seriesModel)) {
      return;
    }
    var isLargeRender = seriesModel.pipelineContext.large;
    return !isLargeRender && {
      progress: function (params, data) {
        var dataIndex;
        while ((dataIndex = params.next()) != null) {
          var itemModel = data.getItemModel(dataIndex);
          var sign = data.getItemLayout(dataIndex).sign;
          var style = itemModel.getItemStyle();
          style.fill = getColor(sign, itemModel);
          style.stroke = getBorderColor(sign, itemModel) || style.fill;
          var existsStyle = data.ensureUniqueItemVisual(dataIndex, 'style');
          (0,util.extend)(existsStyle, style);
        }
      }
    };
  }
};
/* export default */ var candlestick_candlestickVisual = (candlestickVisual);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/candlestick/CandlestickView.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/









var SKIP_PROPS = ['color', 'borderColor'];
var CandlestickView_CandlestickView = /** @class */function (_super) {
  (0,tslib_es6.__extends)(CandlestickView, _super);
  function CandlestickView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = CandlestickView.type;
    return _this;
  }
  CandlestickView.prototype.render = function (seriesModel, ecModel, api) {
    // If there is clipPath created in large mode. Remove it.
    this.group.removeClipPath();
    // Clear previously rendered progressive elements.
    this._progressiveEls = null;
    this._updateDrawMode(seriesModel);
    this._isLargeDraw ? this._renderLarge(seriesModel) : this._renderNormal(seriesModel);
  };
  CandlestickView.prototype.incrementalPrepareRender = function (seriesModel, ecModel, api) {
    this._clear();
    this._updateDrawMode(seriesModel);
  };
  CandlestickView.prototype.incrementalRender = function (params, seriesModel, ecModel, api) {
    this._progressiveEls = [];
    this._isLargeDraw ? this._incrementalRenderLarge(params, seriesModel) : this._incrementalRenderNormal(params, seriesModel);
  };
  CandlestickView.prototype.eachRendered = function (cb) {
    graphic.traverseElements(this._progressiveEls || this.group, cb);
  };
  CandlestickView.prototype._updateDrawMode = function (seriesModel) {
    var isLargeDraw = seriesModel.pipelineContext.large;
    if (this._isLargeDraw == null || isLargeDraw !== this._isLargeDraw) {
      this._isLargeDraw = isLargeDraw;
      this._clear();
    }
  };
  CandlestickView.prototype._renderNormal = function (seriesModel) {
    var data = seriesModel.getData();
    var oldData = this._data;
    var group = this.group;
    var isSimpleBox = data.getLayout('isSimpleBox');
    var needsClip = seriesModel.get('clip', true);
    var coord = seriesModel.coordinateSystem;
    var clipArea = coord.getArea && coord.getArea();
    // There is no old data only when first rendering or switching from
    // stream mode to normal mode, where previous elements should be removed.
    if (!this._data) {
      group.removeAll();
    }
    data.diff(oldData).add(function (newIdx) {
      if (data.hasValue(newIdx)) {
        var itemLayout = data.getItemLayout(newIdx);
        if (needsClip && isNormalBoxClipped(clipArea, itemLayout)) {
          return;
        }
        var el = CandlestickView_createNormalBox(itemLayout, newIdx, true);
        basicTransition.initProps(el, {
          shape: {
            points: itemLayout.ends
          }
        }, seriesModel, newIdx);
        setBoxCommon(el, data, newIdx, isSimpleBox);
        group.add(el);
        data.setItemGraphicEl(newIdx, el);
      }
    }).update(function (newIdx, oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      // Empty data
      if (!data.hasValue(newIdx)) {
        group.remove(el);
        return;
      }
      var itemLayout = data.getItemLayout(newIdx);
      if (needsClip && isNormalBoxClipped(clipArea, itemLayout)) {
        group.remove(el);
        return;
      }
      if (!el) {
        el = CandlestickView_createNormalBox(itemLayout, newIdx);
      } else {
        basicTransition.updateProps(el, {
          shape: {
            points: itemLayout.ends
          }
        }, seriesModel, newIdx);
        (0,basicTransition.saveOldStyle)(el);
      }
      setBoxCommon(el, data, newIdx, isSimpleBox);
      group.add(el);
      data.setItemGraphicEl(newIdx, el);
    }).remove(function (oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el && group.remove(el);
    }).execute();
    this._data = data;
  };
  CandlestickView.prototype._renderLarge = function (seriesModel) {
    this._clear();
    CandlestickView_createLarge(seriesModel, this.group);
    var clipPath = seriesModel.get('clip', true) ? (0,createClipPathFromCoordSys.createClipPath)(seriesModel.coordinateSystem, false, seriesModel) : null;
    if (clipPath) {
      this.group.setClipPath(clipPath);
    } else {
      this.group.removeClipPath();
    }
  };
  CandlestickView.prototype._incrementalRenderNormal = function (params, seriesModel) {
    var data = seriesModel.getData();
    var isSimpleBox = data.getLayout('isSimpleBox');
    var dataIndex;
    while ((dataIndex = params.next()) != null) {
      var itemLayout = data.getItemLayout(dataIndex);
      var el = CandlestickView_createNormalBox(itemLayout, dataIndex);
      setBoxCommon(el, data, dataIndex, isSimpleBox);
      el.incremental = true;
      this.group.add(el);
      this._progressiveEls.push(el);
    }
  };
  CandlestickView.prototype._incrementalRenderLarge = function (params, seriesModel) {
    CandlestickView_createLarge(seriesModel, this.group, this._progressiveEls, true);
  };
  CandlestickView.prototype.remove = function (ecModel) {
    this._clear();
  };
  CandlestickView.prototype._clear = function () {
    this.group.removeAll();
    this._data = null;
  };
  CandlestickView.type = 'candlestick';
  return CandlestickView;
}(Chart["default"]);
var CandlestickView_NormalBoxPathShape = /** @class */function () {
  function NormalBoxPathShape() {}
  return NormalBoxPathShape;
}();
var CandlestickView_NormalBoxPath = /** @class */function (_super) {
  (0,tslib_es6.__extends)(NormalBoxPath, _super);
  function NormalBoxPath(opts) {
    var _this = _super.call(this, opts) || this;
    _this.type = 'normalCandlestickBox';
    return _this;
  }
  NormalBoxPath.prototype.getDefaultShape = function () {
    return new CandlestickView_NormalBoxPathShape();
  };
  NormalBoxPath.prototype.buildPath = function (ctx, shape) {
    var ends = shape.points;
    if (this.__simpleBox) {
      ctx.moveTo(ends[4][0], ends[4][1]);
      ctx.lineTo(ends[6][0], ends[6][1]);
    } else {
      ctx.moveTo(ends[0][0], ends[0][1]);
      ctx.lineTo(ends[1][0], ends[1][1]);
      ctx.lineTo(ends[2][0], ends[2][1]);
      ctx.lineTo(ends[3][0], ends[3][1]);
      ctx.closePath();
      ctx.moveTo(ends[4][0], ends[4][1]);
      ctx.lineTo(ends[5][0], ends[5][1]);
      ctx.moveTo(ends[6][0], ends[6][1]);
      ctx.lineTo(ends[7][0], ends[7][1]);
    }
  };
  return NormalBoxPath;
}(Path["default"]);
function CandlestickView_createNormalBox(itemLayout, dataIndex, isInit) {
  var ends = itemLayout.ends;
  return new CandlestickView_NormalBoxPath({
    shape: {
      points: isInit ? CandlestickView_transInit(ends, itemLayout) : ends
    },
    z2: 100
  });
}
function isNormalBoxClipped(clipArea, itemLayout) {
  var clipped = true;
  for (var i = 0; i < itemLayout.ends.length; i++) {
    // If any point are in the region.
    if (clipArea.contain(itemLayout.ends[i][0], itemLayout.ends[i][1])) {
      clipped = false;
      break;
    }
  }
  return clipped;
}
function setBoxCommon(el, data, dataIndex, isSimpleBox) {
  var itemModel = data.getItemModel(dataIndex);
  el.useStyle(data.getItemVisual(dataIndex, 'style'));
  el.style.strokeNoScale = true;
  el.__simpleBox = isSimpleBox;
  (0,states.setStatesStylesFromModel)(el, itemModel);
  var sign = data.getItemLayout(dataIndex).sign;
  util.each(el.states, function (state, stateName) {
    var stateModel = itemModel.getModel(stateName);
    var color = getColor(sign, stateModel);
    var borderColor = getBorderColor(sign, stateModel) || color;
    var stateStyle = state.style || (state.style = {});
    color && (stateStyle.fill = color);
    borderColor && (stateStyle.stroke = borderColor);
  });
  var emphasisModel = itemModel.getModel('emphasis');
  (0,states.toggleHoverEmphasis)(el, emphasisModel.get('focus'), emphasisModel.get('blurScope'), emphasisModel.get('disabled'));
}
function CandlestickView_transInit(points, itemLayout) {
  return util.map(points, function (point) {
    point = point.slice();
    point[1] = itemLayout.initBaseline;
    return point;
  });
}
var CandlestickView_LargeBoxPathShape = /** @class */function () {
  function LargeBoxPathShape() {}
  return LargeBoxPathShape;
}();
var CandlestickView_LargeBoxPath = /** @class */function (_super) {
  (0,tslib_es6.__extends)(LargeBoxPath, _super);
  function LargeBoxPath(opts) {
    var _this = _super.call(this, opts) || this;
    _this.type = 'largeCandlestickBox';
    return _this;
  }
  LargeBoxPath.prototype.getDefaultShape = function () {
    return new CandlestickView_LargeBoxPathShape();
  };
  LargeBoxPath.prototype.buildPath = function (ctx, shape) {
    // Drawing lines is more efficient than drawing
    // a whole line or drawing rects.
    var points = shape.points;
    for (var i = 0; i < points.length;) {
      if (this.__sign === points[i++]) {
        var x = points[i++];
        ctx.moveTo(x, points[i++]);
        ctx.lineTo(x, points[i++]);
      } else {
        i += 3;
      }
    }
  };
  return LargeBoxPath;
}(Path["default"]);
function CandlestickView_createLarge(seriesModel, group, progressiveEls, incremental) {
  var data = seriesModel.getData();
  var largePoints = data.getLayout('largePoints');
  var elP = new CandlestickView_LargeBoxPath({
    shape: {
      points: largePoints
    },
    __sign: 1,
    ignoreCoarsePointer: true
  });
  group.add(elP);
  var elN = new CandlestickView_LargeBoxPath({
    shape: {
      points: largePoints
    },
    __sign: -1,
    ignoreCoarsePointer: true
  });
  group.add(elN);
  var elDoji = new CandlestickView_LargeBoxPath({
    shape: {
      points: largePoints
    },
    __sign: 0,
    ignoreCoarsePointer: true
  });
  group.add(elDoji);
  setLargeStyle(1, elP, seriesModel, data);
  setLargeStyle(-1, elN, seriesModel, data);
  setLargeStyle(0, elDoji, seriesModel, data);
  if (incremental) {
    elP.incremental = true;
    elN.incremental = true;
  }
  if (progressiveEls) {
    progressiveEls.push(elP, elN);
  }
}
function setLargeStyle(sign, el, seriesModel, data) {
  // TODO put in visual?
  var borderColor = getBorderColor(sign, seriesModel)
  // Use color for border color by default.
  || getColor(sign, seriesModel);
  // Color must be excluded.
  // Because symbol provide setColor individually to set fill and stroke
  var itemStyle = seriesModel.getModel('itemStyle').getItemStyle(SKIP_PROPS);
  el.useStyle(itemStyle);
  el.style.fill = null;
  el.style.stroke = borderColor;
}
/* export default */ var candlestick_CandlestickView = (CandlestickView_CandlestickView);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/candlestick/CandlestickSeries.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/




var CandlestickSeries_CandlestickSeriesModel = /** @class */function (_super) {
  (0,tslib_es6.__extends)(CandlestickSeriesModel, _super);
  function CandlestickSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = CandlestickSeriesModel.type;
    _this.defaultValueDimensions = [{
      name: 'open',
      defaultTooltip: true
    }, {
      name: 'close',
      defaultTooltip: true
    }, {
      name: 'lowest',
      defaultTooltip: true
    }, {
      name: 'highest',
      defaultTooltip: true
    }];
    return _this;
  }
  /**
   * Get dimension for shadow in dataZoom
   * @return dimension name
   */
  CandlestickSeriesModel.prototype.getShadowDim = function () {
    return 'open';
  };
  CandlestickSeriesModel.prototype.brushSelector = function (dataIndex, data, selectors) {
    var itemLayout = data.getItemLayout(dataIndex);
    return itemLayout && selectors.rect(itemLayout.brushRect);
  };
  CandlestickSeriesModel.type = 'series.candlestick';
  CandlestickSeriesModel.dependencies = ['xAxis', 'yAxis', 'grid'];
  CandlestickSeriesModel.defaultOption = {
    // zlevel: 0,
    z: 2,
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    layout: null,
    clip: true,
    itemStyle: {
      color: '#eb5454',
      color0: '#47b262',
      borderColor: '#eb5454',
      borderColor0: '#47b262',
      borderColorDoji: null,
      // borderColor: '#d24040',
      // borderColor0: '#398f4f',
      borderWidth: 1
    },
    emphasis: {
      itemStyle: {
        borderWidth: 2
      }
    },
    barMaxWidth: null,
    barMinWidth: null,
    barWidth: null,
    large: true,
    largeThreshold: 600,
    progressive: 3e3,
    progressiveThreshold: 1e4,
    progressiveChunkMode: 'mod',
    animationEasing: 'linear',
    animationDuration: 300
  };
  return CandlestickSeriesModel;
}(Series["default"]);
(0,util.mixin)(CandlestickSeries_CandlestickSeriesModel, whiskerBoxCommon.WhiskerBoxCommonMixin, true);
/* export default */ var CandlestickSeries = (CandlestickSeries_CandlestickSeriesModel);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/candlestick/preprocessor.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

function candlestickPreprocessor(option) {
  if (!option || !util.isArray(option.series)) {
    return;
  }
  // Translate 'k' to 'candlestick'.
  util.each(option.series, function (seriesItem) {
    if (util.isObject(seriesItem) && seriesItem.type === 'k') {
      seriesItem.type = 'candlestick';
    }
  });
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/vendor.js
var vendor = __webpack_require__(8957);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/candlestick/candlestickLayout.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/





var candlestickLayout = {
  seriesType: 'candlestick',
  plan: (0,createRenderPlanner["default"])(),
  reset: function (seriesModel) {
    var coordSys = seriesModel.coordinateSystem;
    var data = seriesModel.getData();
    var candleWidth = calculateCandleWidth(seriesModel, data);
    var cDimIdx = 0;
    var vDimIdx = 1;
    var coordDims = ['x', 'y'];
    var cDimI = data.getDimensionIndex(data.mapDimension(coordDims[cDimIdx]));
    var vDimsI = (0,util.map)(data.mapDimensionsAll(coordDims[vDimIdx]), data.getDimensionIndex, data);
    var openDimI = vDimsI[0];
    var closeDimI = vDimsI[1];
    var lowestDimI = vDimsI[2];
    var highestDimI = vDimsI[3];
    data.setLayout({
      candleWidth: candleWidth,
      // The value is experimented visually.
      isSimpleBox: candleWidth <= 1.3
    });
    if (cDimI < 0 || vDimsI.length < 4) {
      return;
    }
    return {
      progress: seriesModel.pipelineContext.large ? largeProgress : normalProgress
    };
    function normalProgress(params, data) {
      var dataIndex;
      var store = data.getStore();
      while ((dataIndex = params.next()) != null) {
        var axisDimVal = store.get(cDimI, dataIndex);
        var openVal = store.get(openDimI, dataIndex);
        var closeVal = store.get(closeDimI, dataIndex);
        var lowestVal = store.get(lowestDimI, dataIndex);
        var highestVal = store.get(highestDimI, dataIndex);
        var ocLow = Math.min(openVal, closeVal);
        var ocHigh = Math.max(openVal, closeVal);
        var ocLowPoint = getPoint(ocLow, axisDimVal);
        var ocHighPoint = getPoint(ocHigh, axisDimVal);
        var lowestPoint = getPoint(lowestVal, axisDimVal);
        var highestPoint = getPoint(highestVal, axisDimVal);
        var ends = [];
        addBodyEnd(ends, ocHighPoint, 0);
        addBodyEnd(ends, ocLowPoint, 1);
        ends.push(subPixelOptimizePoint(highestPoint), subPixelOptimizePoint(ocHighPoint), subPixelOptimizePoint(lowestPoint), subPixelOptimizePoint(ocLowPoint));
        var itemModel = data.getItemModel(dataIndex);
        var hasDojiColor = !!itemModel.get(['itemStyle', 'borderColorDoji']);
        data.setItemLayout(dataIndex, {
          sign: getSign(store, dataIndex, openVal, closeVal, closeDimI, hasDojiColor),
          initBaseline: openVal > closeVal ? ocHighPoint[vDimIdx] : ocLowPoint[vDimIdx],
          ends: ends,
          brushRect: makeBrushRect(lowestVal, highestVal, axisDimVal)
        });
      }
      function getPoint(val, axisDimVal) {
        var p = [];
        p[cDimIdx] = axisDimVal;
        p[vDimIdx] = val;
        return isNaN(axisDimVal) || isNaN(val) ? [NaN, NaN] : coordSys.dataToPoint(p);
      }
      function addBodyEnd(ends, point, start) {
        var point1 = point.slice();
        var point2 = point.slice();
        point1[cDimIdx] = (0,graphic.subPixelOptimize)(point1[cDimIdx] + candleWidth / 2, 1, false);
        point2[cDimIdx] = (0,graphic.subPixelOptimize)(point2[cDimIdx] - candleWidth / 2, 1, true);
        start ? ends.push(point1, point2) : ends.push(point2, point1);
      }
      function makeBrushRect(lowestVal, highestVal, axisDimVal) {
        var pmin = getPoint(lowestVal, axisDimVal);
        var pmax = getPoint(highestVal, axisDimVal);
        pmin[cDimIdx] -= candleWidth / 2;
        pmax[cDimIdx] -= candleWidth / 2;
        return {
          x: pmin[0],
          y: pmin[1],
          width: vDimIdx ? candleWidth : pmax[0] - pmin[0],
          height: vDimIdx ? pmax[1] - pmin[1] : candleWidth
        };
      }
      function subPixelOptimizePoint(point) {
        point[cDimIdx] = (0,graphic.subPixelOptimize)(point[cDimIdx], 1);
        return point;
      }
    }
    function largeProgress(params, data) {
      // Structure: [sign, x, yhigh, ylow, sign, x, yhigh, ylow, ...]
      var points = (0,vendor.createFloat32Array)(params.count * 4);
      var offset = 0;
      var point;
      var tmpIn = [];
      var tmpOut = [];
      var dataIndex;
      var store = data.getStore();
      var hasDojiColor = !!seriesModel.get(['itemStyle', 'borderColorDoji']);
      while ((dataIndex = params.next()) != null) {
        var axisDimVal = store.get(cDimI, dataIndex);
        var openVal = store.get(openDimI, dataIndex);
        var closeVal = store.get(closeDimI, dataIndex);
        var lowestVal = store.get(lowestDimI, dataIndex);
        var highestVal = store.get(highestDimI, dataIndex);
        if (isNaN(axisDimVal) || isNaN(lowestVal) || isNaN(highestVal)) {
          points[offset++] = NaN;
          offset += 3;
          continue;
        }
        points[offset++] = getSign(store, dataIndex, openVal, closeVal, closeDimI, hasDojiColor);
        tmpIn[cDimIdx] = axisDimVal;
        tmpIn[vDimIdx] = lowestVal;
        point = coordSys.dataToPoint(tmpIn, null, tmpOut);
        points[offset++] = point ? point[0] : NaN;
        points[offset++] = point ? point[1] : NaN;
        tmpIn[vDimIdx] = highestVal;
        point = coordSys.dataToPoint(tmpIn, null, tmpOut);
        points[offset++] = point ? point[1] : NaN;
      }
      data.setLayout('largePoints', points);
    }
  }
};
/**
 * Get the sign of a single data.
 *
 * @returns 0 for doji with hasDojiColor: true,
 *          1 for positive,
 *          -1 for negative.
 */
function getSign(store, dataIndex, openVal, closeVal, closeDimI, hasDojiColor) {
  var sign;
  if (openVal > closeVal) {
    sign = -1;
  } else if (openVal < closeVal) {
    sign = 1;
  } else {
    sign = hasDojiColor
    // When doji color is set, use it instead of color/color0.
    ? 0 : dataIndex > 0
    // If close === open, compare with close of last record
    ? store.get(closeDimI, dataIndex - 1) <= closeVal ? 1 : -1
    // No record of previous, set to be positive
    : 1;
  }
  return sign;
}
function calculateCandleWidth(seriesModel, data) {
  var baseAxis = seriesModel.getBaseAxis();
  var extent;
  var bandWidth = baseAxis.type === 'category' ? baseAxis.getBandWidth() : (extent = baseAxis.getExtent(), Math.abs(extent[1] - extent[0]) / data.count());
  var barMaxWidth = (0,number.parsePercent)((0,util.retrieve2)(seriesModel.get('barMaxWidth'), bandWidth), bandWidth);
  var barMinWidth = (0,number.parsePercent)((0,util.retrieve2)(seriesModel.get('barMinWidth'), 1), bandWidth);
  var barWidth = seriesModel.get('barWidth');
  return barWidth != null ? (0,number.parsePercent)(barWidth, bandWidth)
  // Put max outer to ensure bar visible in spite of overlap.
  : Math.max(Math.min(bandWidth / 2, barMaxWidth), barMinWidth);
}
/* export default */ var candlestick_candlestickLayout = (candlestickLayout);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/candlestick/install.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/





function candlestick_install_install(registers) {
  registers.registerChartView(candlestick_CandlestickView);
  registers.registerSeriesModel(CandlestickSeries);
  registers.registerPreprocessor(candlestickPreprocessor);
  registers.registerVisual(candlestick_candlestickVisual);
  registers.registerLayout(candlestick_candlestickLayout);
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/effectScatter/install.js + 3 modules
var effectScatter_install = __webpack_require__(65698);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/lines/install.js + 4 modules
var lines_install = __webpack_require__(71232);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/heatmap/install.js + 3 modules
var heatmap_install = __webpack_require__(37873);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/shape/Circle.js
var Circle = __webpack_require__(31571);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/symbol.js
var symbol = __webpack_require__(62103);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/Image.js
var Image = __webpack_require__(90540);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/bar/PictorialBarView.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/












var BAR_BORDER_WIDTH_QUERY = ['itemStyle', 'borderWidth'];
// index: +isHorizontal
var LAYOUT_ATTRS = [{
  xy: 'x',
  wh: 'width',
  index: 0,
  posDesc: ['left', 'right']
}, {
  xy: 'y',
  wh: 'height',
  index: 1,
  posDesc: ['top', 'bottom']
}];
var pathForLineWidth = new Circle["default"]();
var PictorialBarView_PictorialBarView = /** @class */function (_super) {
  (0,tslib_es6.__extends)(PictorialBarView, _super);
  function PictorialBarView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = PictorialBarView.type;
    return _this;
  }
  PictorialBarView.prototype.render = function (seriesModel, ecModel, api) {
    var group = this.group;
    var data = seriesModel.getData();
    var oldData = this._data;
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();
    var isHorizontal = baseAxis.isHorizontal();
    var coordSysRect = cartesian.master.getRect();
    var opt = {
      ecSize: {
        width: api.getWidth(),
        height: api.getHeight()
      },
      seriesModel: seriesModel,
      coordSys: cartesian,
      coordSysExtent: [[coordSysRect.x, coordSysRect.x + coordSysRect.width], [coordSysRect.y, coordSysRect.y + coordSysRect.height]],
      isHorizontal: isHorizontal,
      valueDim: LAYOUT_ATTRS[+isHorizontal],
      categoryDim: LAYOUT_ATTRS[1 - +isHorizontal]
    };
    data.diff(oldData).add(function (dataIndex) {
      if (!data.hasValue(dataIndex)) {
        return;
      }
      var itemModel = PictorialBarView_getItemModel(data, dataIndex);
      var symbolMeta = getSymbolMeta(data, dataIndex, itemModel, opt);
      var bar = createBar(data, opt, symbolMeta);
      data.setItemGraphicEl(dataIndex, bar);
      group.add(bar);
      updateCommon(bar, opt, symbolMeta);
    }).update(function (newIndex, oldIndex) {
      var bar = oldData.getItemGraphicEl(oldIndex);
      if (!data.hasValue(newIndex)) {
        group.remove(bar);
        return;
      }
      var itemModel = PictorialBarView_getItemModel(data, newIndex);
      var symbolMeta = getSymbolMeta(data, newIndex, itemModel, opt);
      var pictorialShapeStr = getShapeStr(data, symbolMeta);
      if (bar && pictorialShapeStr !== bar.__pictorialShapeStr) {
        group.remove(bar);
        data.setItemGraphicEl(newIndex, null);
        bar = null;
      }
      if (bar) {
        updateBar(bar, opt, symbolMeta);
      } else {
        bar = createBar(data, opt, symbolMeta, true);
      }
      data.setItemGraphicEl(newIndex, bar);
      bar.__pictorialSymbolMeta = symbolMeta;
      // Add back
      group.add(bar);
      updateCommon(bar, opt, symbolMeta);
    }).remove(function (dataIndex) {
      var bar = oldData.getItemGraphicEl(dataIndex);
      bar && removeBar(oldData, dataIndex, bar.__pictorialSymbolMeta.animationModel, bar);
    }).execute();
    // Do clipping
    var clipPath = seriesModel.get('clip', true) ? (0,createClipPathFromCoordSys.createClipPath)(seriesModel.coordinateSystem, false, seriesModel) : null;
    if (clipPath) {
      group.setClipPath(clipPath);
    } else {
      group.removeClipPath();
    }
    this._data = data;
    return this.group;
  };
  PictorialBarView.prototype.remove = function (ecModel, api) {
    var group = this.group;
    var data = this._data;
    if (ecModel.get('animation')) {
      if (data) {
        data.eachItemGraphicEl(function (bar) {
          removeBar(data, (0,innerStore.getECData)(bar).dataIndex, ecModel, bar);
        });
      }
    } else {
      group.removeAll();
    }
  };
  PictorialBarView.type = 'pictorialBar';
  return PictorialBarView;
}(Chart["default"]);
// Set or calculate default value about symbol, and calculate layout info.
function getSymbolMeta(data, dataIndex, itemModel, opt) {
  var layout = data.getItemLayout(dataIndex);
  var symbolRepeat = itemModel.get('symbolRepeat');
  var symbolClip = itemModel.get('symbolClip');
  var symbolPosition = itemModel.get('symbolPosition') || 'start';
  var symbolRotate = itemModel.get('symbolRotate');
  var rotation = (symbolRotate || 0) * Math.PI / 180 || 0;
  var symbolPatternSize = itemModel.get('symbolPatternSize') || 2;
  var isAnimationEnabled = itemModel.isAnimationEnabled();
  var symbolMeta = {
    dataIndex: dataIndex,
    layout: layout,
    itemModel: itemModel,
    symbolType: data.getItemVisual(dataIndex, 'symbol') || 'circle',
    style: data.getItemVisual(dataIndex, 'style'),
    symbolClip: symbolClip,
    symbolRepeat: symbolRepeat,
    symbolRepeatDirection: itemModel.get('symbolRepeatDirection'),
    symbolPatternSize: symbolPatternSize,
    rotation: rotation,
    animationModel: isAnimationEnabled ? itemModel : null,
    hoverScale: isAnimationEnabled && itemModel.get(['emphasis', 'scale']),
    z2: itemModel.getShallow('z', true) || 0
  };
  prepareBarLength(itemModel, symbolRepeat, layout, opt, symbolMeta);
  prepareSymbolSize(data, dataIndex, layout, symbolRepeat, symbolClip, symbolMeta.boundingLength, symbolMeta.pxSign, symbolPatternSize, opt, symbolMeta);
  prepareLineWidth(itemModel, symbolMeta.symbolScale, rotation, opt, symbolMeta);
  var symbolSize = symbolMeta.symbolSize;
  var symbolOffset = (0,symbol.normalizeSymbolOffset)(itemModel.get('symbolOffset'), symbolSize);
  prepareLayoutInfo(itemModel, symbolSize, layout, symbolRepeat, symbolClip, symbolOffset, symbolPosition, symbolMeta.valueLineWidth, symbolMeta.boundingLength, symbolMeta.repeatCutLength, opt, symbolMeta);
  return symbolMeta;
}
// bar length can be negative.
function prepareBarLength(itemModel, symbolRepeat, layout, opt, outputSymbolMeta) {
  var valueDim = opt.valueDim;
  var symbolBoundingData = itemModel.get('symbolBoundingData');
  var valueAxis = opt.coordSys.getOtherAxis(opt.coordSys.getBaseAxis());
  var zeroPx = valueAxis.toGlobalCoord(valueAxis.dataToCoord(0));
  var pxSignIdx = 1 - +(layout[valueDim.wh] <= 0);
  var boundingLength;
  if (util.isArray(symbolBoundingData)) {
    var symbolBoundingExtent = [convertToCoordOnAxis(valueAxis, symbolBoundingData[0]) - zeroPx, convertToCoordOnAxis(valueAxis, symbolBoundingData[1]) - zeroPx];
    symbolBoundingExtent[1] < symbolBoundingExtent[0] && symbolBoundingExtent.reverse();
    boundingLength = symbolBoundingExtent[pxSignIdx];
  } else if (symbolBoundingData != null) {
    boundingLength = convertToCoordOnAxis(valueAxis, symbolBoundingData) - zeroPx;
  } else if (symbolRepeat) {
    boundingLength = opt.coordSysExtent[valueDim.index][pxSignIdx] - zeroPx;
  } else {
    boundingLength = layout[valueDim.wh];
  }
  outputSymbolMeta.boundingLength = boundingLength;
  if (symbolRepeat) {
    outputSymbolMeta.repeatCutLength = layout[valueDim.wh];
  }
  // if 'pxSign' means sign of pixel,  it can't be zero, or symbolScale will be zero
  // and when borderWidth be settled, the actual linewidth will be NaN
  var isXAxis = valueDim.xy === 'x';
  var isInverse = valueAxis.inverse;
  outputSymbolMeta.pxSign = isXAxis && !isInverse || !isXAxis && isInverse ? boundingLength >= 0 ? 1 : -1 : boundingLength > 0 ? 1 : -1;
}
function convertToCoordOnAxis(axis, value) {
  return axis.toGlobalCoord(axis.dataToCoord(axis.scale.parse(value)));
}
// Support ['100%', '100%']
function prepareSymbolSize(data, dataIndex, layout, symbolRepeat, symbolClip, boundingLength, pxSign, symbolPatternSize, opt, outputSymbolMeta) {
  var valueDim = opt.valueDim;
  var categoryDim = opt.categoryDim;
  var categorySize = Math.abs(layout[categoryDim.wh]);
  var symbolSize = data.getItemVisual(dataIndex, 'symbolSize');
  var parsedSymbolSize;
  if (util.isArray(symbolSize)) {
    parsedSymbolSize = symbolSize.slice();
  } else {
    if (symbolSize == null) {
      // will parse to number below
      parsedSymbolSize = ['100%', '100%'];
    } else {
      parsedSymbolSize = [symbolSize, symbolSize];
    }
  }
  // Note: percentage symbolSize (like '100%') do not consider lineWidth, because it is
  // to complicated to calculate real percent value if considering scaled lineWidth.
  // So the actual size will bigger than layout size if lineWidth is bigger than zero,
  // which can be tolerated in pictorial chart.
  parsedSymbolSize[categoryDim.index] = (0,number.parsePercent)(parsedSymbolSize[categoryDim.index], categorySize);
  parsedSymbolSize[valueDim.index] = (0,number.parsePercent)(parsedSymbolSize[valueDim.index], symbolRepeat ? categorySize : Math.abs(boundingLength));
  outputSymbolMeta.symbolSize = parsedSymbolSize;
  // If x or y is less than zero, show reversed shape.
  var symbolScale = outputSymbolMeta.symbolScale = [parsedSymbolSize[0] / symbolPatternSize, parsedSymbolSize[1] / symbolPatternSize];
  // Follow convention, 'right' and 'top' is the normal scale.
  symbolScale[valueDim.index] *= (opt.isHorizontal ? -1 : 1) * pxSign;
}
function prepareLineWidth(itemModel, symbolScale, rotation, opt, outputSymbolMeta) {
  // In symbols are drawn with scale, so do not need to care about the case that width
  // or height are too small. But symbol use strokeNoScale, where acture lineWidth should
  // be calculated.
  var valueLineWidth = itemModel.get(BAR_BORDER_WIDTH_QUERY) || 0;
  if (valueLineWidth) {
    pathForLineWidth.attr({
      scaleX: symbolScale[0],
      scaleY: symbolScale[1],
      rotation: rotation
    });
    pathForLineWidth.updateTransform();
    valueLineWidth /= pathForLineWidth.getLineScale();
    valueLineWidth *= symbolScale[opt.valueDim.index];
  }
  outputSymbolMeta.valueLineWidth = valueLineWidth || 0;
}
function prepareLayoutInfo(itemModel, symbolSize, layout, symbolRepeat, symbolClip, symbolOffset, symbolPosition, valueLineWidth, boundingLength, repeatCutLength, opt, outputSymbolMeta) {
  var categoryDim = opt.categoryDim;
  var valueDim = opt.valueDim;
  var pxSign = outputSymbolMeta.pxSign;
  var unitLength = Math.max(symbolSize[valueDim.index] + valueLineWidth, 0);
  var pathLen = unitLength;
  // Note: rotation will not effect the layout of symbols, because user may
  // want symbols to rotate on its center, which should not be translated
  // when rotating.
  if (symbolRepeat) {
    var absBoundingLength = Math.abs(boundingLength);
    var symbolMargin = util.retrieve(itemModel.get('symbolMargin'), '15%') + '';
    var hasEndGap = false;
    if (symbolMargin.lastIndexOf('!') === symbolMargin.length - 1) {
      hasEndGap = true;
      symbolMargin = symbolMargin.slice(0, symbolMargin.length - 1);
    }
    var symbolMarginNumeric = (0,number.parsePercent)(symbolMargin, symbolSize[valueDim.index]);
    var uLenWithMargin = Math.max(unitLength + symbolMarginNumeric * 2, 0);
    // When symbol margin is less than 0, margin at both ends will be subtracted
    // to ensure that all of the symbols will not be overflow the given area.
    var endFix = hasEndGap ? 0 : symbolMarginNumeric * 2;
    // Both final repeatTimes and final symbolMarginNumeric area calculated based on
    // boundingLength.
    var repeatSpecified = (0,number.isNumeric)(symbolRepeat);
    var repeatTimes = repeatSpecified ? symbolRepeat : toIntTimes((absBoundingLength + endFix) / uLenWithMargin);
    // Adjust calculate margin, to ensure each symbol is displayed
    // entirely in the given layout area.
    var mDiff = absBoundingLength - repeatTimes * unitLength;
    symbolMarginNumeric = mDiff / 2 / (hasEndGap ? repeatTimes : Math.max(repeatTimes - 1, 1));
    uLenWithMargin = unitLength + symbolMarginNumeric * 2;
    endFix = hasEndGap ? 0 : symbolMarginNumeric * 2;
    // Update repeatTimes when not all symbol will be shown.
    if (!repeatSpecified && symbolRepeat !== 'fixed') {
      repeatTimes = repeatCutLength ? toIntTimes((Math.abs(repeatCutLength) + endFix) / uLenWithMargin) : 0;
    }
    pathLen = repeatTimes * uLenWithMargin - endFix;
    outputSymbolMeta.repeatTimes = repeatTimes;
    outputSymbolMeta.symbolMargin = symbolMarginNumeric;
  }
  var sizeFix = pxSign * (pathLen / 2);
  var pathPosition = outputSymbolMeta.pathPosition = [];
  pathPosition[categoryDim.index] = layout[categoryDim.wh] / 2;
  pathPosition[valueDim.index] = symbolPosition === 'start' ? sizeFix : symbolPosition === 'end' ? boundingLength - sizeFix : boundingLength / 2; // 'center'
  if (symbolOffset) {
    pathPosition[0] += symbolOffset[0];
    pathPosition[1] += symbolOffset[1];
  }
  var bundlePosition = outputSymbolMeta.bundlePosition = [];
  bundlePosition[categoryDim.index] = layout[categoryDim.xy];
  bundlePosition[valueDim.index] = layout[valueDim.xy];
  var barRectShape = outputSymbolMeta.barRectShape = util.extend({}, layout);
  barRectShape[valueDim.wh] = pxSign * Math.max(Math.abs(layout[valueDim.wh]), Math.abs(pathPosition[valueDim.index] + sizeFix));
  barRectShape[categoryDim.wh] = layout[categoryDim.wh];
  var clipShape = outputSymbolMeta.clipShape = {};
  // Consider that symbol may be overflow layout rect.
  clipShape[categoryDim.xy] = -layout[categoryDim.xy];
  clipShape[categoryDim.wh] = opt.ecSize[categoryDim.wh];
  clipShape[valueDim.xy] = 0;
  clipShape[valueDim.wh] = layout[valueDim.wh];
}
function createPath(symbolMeta) {
  var symbolPatternSize = symbolMeta.symbolPatternSize;
  var path = (0,symbol.createSymbol)(
  // Consider texture img, make a big size.
  symbolMeta.symbolType, -symbolPatternSize / 2, -symbolPatternSize / 2, symbolPatternSize, symbolPatternSize);
  path.attr({
    culling: true
  });
  path.type !== 'image' && path.setStyle({
    strokeNoScale: true
  });
  return path;
}
function createOrUpdateRepeatSymbols(bar, opt, symbolMeta, isUpdate) {
  var bundle = bar.__pictorialBundle;
  var symbolSize = symbolMeta.symbolSize;
  var valueLineWidth = symbolMeta.valueLineWidth;
  var pathPosition = symbolMeta.pathPosition;
  var valueDim = opt.valueDim;
  var repeatTimes = symbolMeta.repeatTimes || 0;
  var index = 0;
  var unit = symbolSize[opt.valueDim.index] + valueLineWidth + symbolMeta.symbolMargin * 2;
  eachPath(bar, function (path) {
    path.__pictorialAnimationIndex = index;
    path.__pictorialRepeatTimes = repeatTimes;
    if (index < repeatTimes) {
      updateAttr(path, null, makeTarget(index), symbolMeta, isUpdate);
    } else {
      updateAttr(path, null, {
        scaleX: 0,
        scaleY: 0
      }, symbolMeta, isUpdate, function () {
        bundle.remove(path);
      });
    }
    // updateHoverAnimation(path, symbolMeta);
    index++;
  });
  for (; index < repeatTimes; index++) {
    var path = createPath(symbolMeta);
    path.__pictorialAnimationIndex = index;
    path.__pictorialRepeatTimes = repeatTimes;
    bundle.add(path);
    var target = makeTarget(index);
    updateAttr(path, {
      x: target.x,
      y: target.y,
      scaleX: 0,
      scaleY: 0
    }, {
      scaleX: target.scaleX,
      scaleY: target.scaleY,
      rotation: target.rotation
    }, symbolMeta, isUpdate);
  }
  function makeTarget(index) {
    var position = pathPosition.slice();
    // (start && pxSign > 0) || (end && pxSign < 0): i = repeatTimes - index
    // Otherwise: i = index;
    var pxSign = symbolMeta.pxSign;
    var i = index;
    if (symbolMeta.symbolRepeatDirection === 'start' ? pxSign > 0 : pxSign < 0) {
      i = repeatTimes - 1 - index;
    }
    position[valueDim.index] = unit * (i - repeatTimes / 2 + 0.5) + pathPosition[valueDim.index];
    return {
      x: position[0],
      y: position[1],
      scaleX: symbolMeta.symbolScale[0],
      scaleY: symbolMeta.symbolScale[1],
      rotation: symbolMeta.rotation
    };
  }
}
function createOrUpdateSingleSymbol(bar, opt, symbolMeta, isUpdate) {
  var bundle = bar.__pictorialBundle;
  var mainPath = bar.__pictorialMainPath;
  if (!mainPath) {
    mainPath = bar.__pictorialMainPath = createPath(symbolMeta);
    bundle.add(mainPath);
    updateAttr(mainPath, {
      x: symbolMeta.pathPosition[0],
      y: symbolMeta.pathPosition[1],
      scaleX: 0,
      scaleY: 0,
      rotation: symbolMeta.rotation
    }, {
      scaleX: symbolMeta.symbolScale[0],
      scaleY: symbolMeta.symbolScale[1]
    }, symbolMeta, isUpdate);
  } else {
    updateAttr(mainPath, null, {
      x: symbolMeta.pathPosition[0],
      y: symbolMeta.pathPosition[1],
      scaleX: symbolMeta.symbolScale[0],
      scaleY: symbolMeta.symbolScale[1],
      rotation: symbolMeta.rotation
    }, symbolMeta, isUpdate);
  }
}
// bar rect is used for label.
function createOrUpdateBarRect(bar, symbolMeta, isUpdate) {
  var rectShape = util.extend({}, symbolMeta.barRectShape);
  var barRect = bar.__pictorialBarRect;
  if (!barRect) {
    barRect = bar.__pictorialBarRect = new Rect["default"]({
      z2: 2,
      shape: rectShape,
      silent: true,
      style: {
        stroke: 'transparent',
        fill: 'transparent',
        lineWidth: 0
      }
    });
    barRect.disableMorphing = true;
    bar.add(barRect);
  } else {
    updateAttr(barRect, null, {
      shape: rectShape
    }, symbolMeta, isUpdate);
  }
}
function createOrUpdateClip(bar, opt, symbolMeta, isUpdate) {
  // If not clip, symbol will be remove and rebuilt.
  if (symbolMeta.symbolClip) {
    var clipPath = bar.__pictorialClipPath;
    var clipShape = util.extend({}, symbolMeta.clipShape);
    var valueDim = opt.valueDim;
    var animationModel = symbolMeta.animationModel;
    var dataIndex = symbolMeta.dataIndex;
    if (clipPath) {
      basicTransition.updateProps(clipPath, {
        shape: clipShape
      }, animationModel, dataIndex);
    } else {
      clipShape[valueDim.wh] = 0;
      clipPath = new Rect["default"]({
        shape: clipShape
      });
      bar.__pictorialBundle.setClipPath(clipPath);
      bar.__pictorialClipPath = clipPath;
      var target = {};
      target[valueDim.wh] = symbolMeta.clipShape[valueDim.wh];
      graphic[isUpdate ? 'updateProps' : 'initProps'](clipPath, {
        shape: target
      }, animationModel, dataIndex);
    }
  }
}
function PictorialBarView_getItemModel(data, dataIndex) {
  var itemModel = data.getItemModel(dataIndex);
  itemModel.getAnimationDelayParams = getAnimationDelayParams;
  itemModel.isAnimationEnabled = PictorialBarView_isAnimationEnabled;
  return itemModel;
}
function getAnimationDelayParams(path) {
  // The order is the same as the z-order, see `symbolRepeatDiretion`.
  return {
    index: path.__pictorialAnimationIndex,
    count: path.__pictorialRepeatTimes
  };
}
function PictorialBarView_isAnimationEnabled() {
  // `animation` prop can be set on itemModel in pictorial bar chart.
  return this.parentModel.isAnimationEnabled() && !!this.getShallow('animation');
}
function createBar(data, opt, symbolMeta, isUpdate) {
  // bar is the main element for each data.
  var bar = new Group["default"]();
  // bundle is used for location and clip.
  var bundle = new Group["default"]();
  bar.add(bundle);
  bar.__pictorialBundle = bundle;
  bundle.x = symbolMeta.bundlePosition[0];
  bundle.y = symbolMeta.bundlePosition[1];
  if (symbolMeta.symbolRepeat) {
    createOrUpdateRepeatSymbols(bar, opt, symbolMeta);
  } else {
    createOrUpdateSingleSymbol(bar, opt, symbolMeta);
  }
  createOrUpdateBarRect(bar, symbolMeta, isUpdate);
  createOrUpdateClip(bar, opt, symbolMeta, isUpdate);
  bar.__pictorialShapeStr = getShapeStr(data, symbolMeta);
  bar.__pictorialSymbolMeta = symbolMeta;
  return bar;
}
function updateBar(bar, opt, symbolMeta) {
  var animationModel = symbolMeta.animationModel;
  var dataIndex = symbolMeta.dataIndex;
  var bundle = bar.__pictorialBundle;
  basicTransition.updateProps(bundle, {
    x: symbolMeta.bundlePosition[0],
    y: symbolMeta.bundlePosition[1]
  }, animationModel, dataIndex);
  if (symbolMeta.symbolRepeat) {
    createOrUpdateRepeatSymbols(bar, opt, symbolMeta, true);
  } else {
    createOrUpdateSingleSymbol(bar, opt, symbolMeta, true);
  }
  createOrUpdateBarRect(bar, symbolMeta, true);
  createOrUpdateClip(bar, opt, symbolMeta, true);
}
function removeBar(data, dataIndex, animationModel, bar) {
  // Not show text when animating
  var labelRect = bar.__pictorialBarRect;
  labelRect && labelRect.removeTextContent();
  var paths = [];
  eachPath(bar, function (path) {
    paths.push(path);
  });
  bar.__pictorialMainPath && paths.push(bar.__pictorialMainPath);
  // I do not find proper remove animation for clip yet.
  bar.__pictorialClipPath && (animationModel = null);
  util.each(paths, function (path) {
    basicTransition.removeElement(path, {
      scaleX: 0,
      scaleY: 0
    }, animationModel, dataIndex, function () {
      bar.parent && bar.parent.remove(bar);
    });
  });
  data.setItemGraphicEl(dataIndex, null);
}
function getShapeStr(data, symbolMeta) {
  return [data.getItemVisual(symbolMeta.dataIndex, 'symbol') || 'none', !!symbolMeta.symbolRepeat, !!symbolMeta.symbolClip].join(':');
}
function eachPath(bar, cb, context) {
  // Do not use Group#eachChild, because it do not support remove.
  util.each(bar.__pictorialBundle.children(), function (el) {
    el !== bar.__pictorialBarRect && cb.call(context, el);
  });
}
function updateAttr(el, immediateAttrs, animationAttrs, symbolMeta, isUpdate, cb) {
  immediateAttrs && el.attr(immediateAttrs);
  // when symbolCip used, only clip path has init animation, otherwise it would be weird effect.
  if (symbolMeta.symbolClip && !isUpdate) {
    animationAttrs && el.attr(animationAttrs);
  } else {
    animationAttrs && graphic[isUpdate ? 'updateProps' : 'initProps'](el, animationAttrs, symbolMeta.animationModel, symbolMeta.dataIndex, cb);
  }
}
function updateCommon(bar, opt, symbolMeta) {
  var dataIndex = symbolMeta.dataIndex;
  var itemModel = symbolMeta.itemModel;
  // Color must be excluded.
  // Because symbol provide setColor individually to set fill and stroke
  var emphasisModel = itemModel.getModel('emphasis');
  var emphasisStyle = emphasisModel.getModel('itemStyle').getItemStyle();
  var blurStyle = itemModel.getModel(['blur', 'itemStyle']).getItemStyle();
  var selectStyle = itemModel.getModel(['select', 'itemStyle']).getItemStyle();
  var cursorStyle = itemModel.getShallow('cursor');
  var focus = emphasisModel.get('focus');
  var blurScope = emphasisModel.get('blurScope');
  var hoverScale = emphasisModel.get('scale');
  eachPath(bar, function (path) {
    if (path instanceof Image["default"]) {
      var pathStyle = path.style;
      path.useStyle(util.extend({
        // TODO other properties like dx, dy ?
        image: pathStyle.image,
        x: pathStyle.x,
        y: pathStyle.y,
        width: pathStyle.width,
        height: pathStyle.height
      }, symbolMeta.style));
    } else {
      path.useStyle(symbolMeta.style);
    }
    var emphasisState = path.ensureState('emphasis');
    emphasisState.style = emphasisStyle;
    if (hoverScale) {
      // NOTE: Must after scale is set after updateAttr
      emphasisState.scaleX = path.scaleX * 1.1;
      emphasisState.scaleY = path.scaleY * 1.1;
    }
    path.ensureState('blur').style = blurStyle;
    path.ensureState('select').style = selectStyle;
    cursorStyle && (path.cursor = cursorStyle);
    path.z2 = symbolMeta.z2;
  });
  var barPositionOutside = opt.valueDim.posDesc[+(symbolMeta.boundingLength > 0)];
  var barRect = bar.__pictorialBarRect;
  barRect.ignoreClip = true;
  (0,labelStyle.setLabelStyle)(barRect, (0,labelStyle.getLabelStatesModels)(itemModel), {
    labelFetcher: opt.seriesModel,
    labelDataIndex: dataIndex,
    defaultText: (0,labelHelper.getDefaultLabel)(opt.seriesModel.getData(), dataIndex),
    inheritColor: symbolMeta.style.fill,
    defaultOpacity: symbolMeta.style.opacity,
    defaultOutsidePosition: barPositionOutside
  });
  (0,states.toggleHoverEmphasis)(bar, focus, blurScope, emphasisModel.get('disabled'));
}
function toIntTimes(times) {
  var roundedTimes = Math.round(times);
  // Escapse accurate error
  return Math.abs(times - roundedTimes) < 1e-4 ? roundedTimes : Math.ceil(times);
}
/* export default */ var bar_PictorialBarView = (PictorialBarView_PictorialBarView);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/bar/PictorialBarSeries.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/




var PictorialBarSeries_PictorialBarSeriesModel = /** @class */function (_super) {
  (0,tslib_es6.__extends)(PictorialBarSeriesModel, _super);
  function PictorialBarSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = PictorialBarSeriesModel.type;
    _this.hasSymbolVisual = true;
    _this.defaultSymbol = 'roundRect';
    return _this;
  }
  PictorialBarSeriesModel.prototype.getInitialData = function (option) {
    // Disable stack.
    option.stack = null;
    return _super.prototype.getInitialData.apply(this, arguments);
  };
  PictorialBarSeriesModel.type = 'series.pictorialBar';
  PictorialBarSeriesModel.dependencies = ['grid'];
  PictorialBarSeriesModel.defaultOption = (0,component.inheritDefaultOption)(BaseBarSeries.defaultOption, {
    symbol: 'circle',
    symbolSize: null,
    symbolRotate: null,
    symbolPosition: null,
    symbolOffset: null,
    symbolMargin: null,
    symbolRepeat: false,
    symbolRepeatDirection: 'end',
    symbolClip: false,
    symbolBoundingData: null,
    symbolPatternSize: 400,
    barGap: '-100%',
    // Pictorial bar do not clip by default because in many cases
    // xAxis and yAxis are not displayed and it's expected not to clip
    clip: false,
    // z can be set in data item, which is z2 actually.
    // Disable progressive
    progressive: 0,
    emphasis: {
      // By default pictorialBar do not hover scale. Hover scale is not suitable
      // for the case that both has foreground and background.
      scale: false
    },
    select: {
      itemStyle: {
        borderColor: tokens["default"].color.primary
      }
    }
  });
  return PictorialBarSeriesModel;
}(BaseBarSeries);
/* export default */ var PictorialBarSeries = (PictorialBarSeries_PictorialBarSeriesModel);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/bar/installPictorialBar.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/




function installPictorialBar_install(registers) {
  registers.registerChartView(bar_PictorialBarView);
  registers.registerSeriesModel(PictorialBarSeries);
  registers.registerLayout(registers.PRIORITY.VISUAL.LAYOUT, (0,util.curry)(barGrid.layout, 'pictorialBar'));
  // Do layout after other overall layout, which can prepare some information.
  registers.registerLayout(registers.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, (0,barGrid.createProgressiveLayout)('pictorialBar'));
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/themeRiver/install.js + 3 modules
var themeRiver_install = __webpack_require__(99332);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/sunburst/install.js + 6 modules
var sunburst_install = __webpack_require__(37480);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/model.js
var util_model = __webpack_require__(48170);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/custom/CustomSeries.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/




// Also compat with ec4, where
// `visual('color') visual('borderColor')` is supported.
var STYLE_VISUAL_TYPE = {
  color: 'fill',
  borderColor: 'stroke'
};
var NON_STYLE_VISUAL_PROPS = {
  symbol: 1,
  symbolSize: 1,
  symbolKeepAspect: 1,
  legendIcon: 1,
  visualMeta: 1,
  liftZ: 1,
  decal: 1
};
;
var customInnerStore = (0,util_model.makeInner)();
var CustomSeries_CustomSeriesModel = /** @class */function (_super) {
  (0,tslib_es6.__extends)(CustomSeriesModel, _super);
  function CustomSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = CustomSeriesModel.type;
    return _this;
  }
  CustomSeriesModel.prototype.optionUpdated = function () {
    this.currentZLevel = this.get('zlevel', true);
    this.currentZ = this.get('z', true);
  };
  CustomSeriesModel.prototype.getInitialData = function (option, ecModel) {
    return (0,createSeriesData["default"])(null, this);
  };
  CustomSeriesModel.prototype.getDataParams = function (dataIndex, dataType, el) {
    var params = _super.prototype.getDataParams.call(this, dataIndex, dataType);
    el && (params.info = customInnerStore(el).info);
    return params;
  };
  CustomSeriesModel.type = 'series.custom';
  CustomSeriesModel.dependencies = ['grid', 'polar', 'geo', 'singleAxis', 'calendar', 'matrix'];
  CustomSeriesModel.defaultOption = {
    coordinateSystem: 'cartesian2d',
    // zlevel: 0,
    z: 2,
    legendHoverLink: true,
    // Custom series will not clip by default.
    // Some case will use custom series to draw label
    // For example https://echarts.apache.org/examples/en/editor.html?c=custom-gantt-flight
    clip: false
    // Cartesian coordinate system
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // Polar coordinate system
    // polarIndex: 0,
    // Geo coordinate system
    // geoIndex: 0,
  };
  return CustomSeriesModel;
}(Series["default"]);
/* export default */ var CustomSeries = (CustomSeries_CustomSeriesModel);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/CompoundPath.js
var CompoundPath = __webpack_require__(82591);
// EXTERNAL MODULE: ./node_modules/echarts/lib/data/DataDiffer.js
var DataDiffer = __webpack_require__(16563);
// EXTERNAL MODULE: ./node_modules/echarts/lib/coord/cartesian/prepareCustom.js
var prepareCustom = __webpack_require__(84557);
// EXTERNAL MODULE: ./node_modules/echarts/lib/coord/geo/prepareCustom.js
var geo_prepareCustom = __webpack_require__(79798);
// EXTERNAL MODULE: ./node_modules/echarts/lib/coord/single/prepareCustom.js
var single_prepareCustom = __webpack_require__(76953);
// EXTERNAL MODULE: ./node_modules/echarts/lib/coord/polar/prepareCustom.js
var polar_prepareCustom = __webpack_require__(68971);
// EXTERNAL MODULE: ./node_modules/echarts/lib/coord/calendar/prepareCustom.js
var calendar_prepareCustom = __webpack_require__(36915);
// EXTERNAL MODULE: ./node_modules/echarts/lib/coord/matrix/prepareCustom.js
var matrix_prepareCustom = __webpack_require__(95148);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/Displayable.js
var Displayable = __webpack_require__(71519);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/styleCompat.js
var styleCompat = __webpack_require__(9848);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/decal.js
var decal = __webpack_require__(23538);
// EXTERNAL MODULE: ./node_modules/echarts/lib/animation/customGraphicTransition.js
var customGraphicTransition = __webpack_require__(57625);
// EXTERNAL MODULE: ./node_modules/echarts/lib/animation/customGraphicKeyframeAnimation.js
var customGraphicKeyframeAnimation = __webpack_require__(92606);
// EXTERNAL MODULE: ./node_modules/echarts/lib/chart/custom/customSeriesRegister.js
var customSeriesRegister = __webpack_require__(49310);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/custom/CustomView.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

























var EMPHASIS = 'emphasis';
var NORMAL = 'normal';
var BLUR = 'blur';
var SELECT = 'select';
var STATES = [NORMAL, EMPHASIS, BLUR, SELECT];
var PATH_ITEM_STYLE = {
  normal: ['itemStyle'],
  emphasis: [EMPHASIS, 'itemStyle'],
  blur: [BLUR, 'itemStyle'],
  select: [SELECT, 'itemStyle']
};
var PATH_LABEL = {
  normal: ['label'],
  emphasis: [EMPHASIS, 'label'],
  blur: [BLUR, 'label'],
  select: [SELECT, 'label']
};
var DEFAULT_TRANSITION = ['x', 'y'];
// Use prefix to avoid index to be the same as el.name,
// which will cause weird update animation.
var GROUP_DIFF_PREFIX = 'e\0\0';
var attachedTxInfoTmp = {
  normal: {},
  emphasis: {},
  blur: {},
  select: {}
};
/**
 * FIXME: register rather than import directly, for size.
 *
 * To reduce total package size of each coordinate systems, the modules `prepareCustom`
 * of each coordinate systems are not required by each coordinate systems directly, but
 * required by the module `custom`.
 *
 * prepareInfoForCustomSeries {Function}: optional
 *     @return {Object} {coordSys: {...}, api: {
 *         coord: function (data, clamp) {}, // return point in global.
 *         size: function (dataSize, dataItem) {} // return size of each axis in coordSys.
 *     }}
 */
var prepareCustoms = {
  cartesian2d: prepareCustom["default"],
  geo: geo_prepareCustom["default"],
  single: single_prepareCustom["default"],
  polar: polar_prepareCustom["default"],
  calendar: calendar_prepareCustom["default"],
  matrix: matrix_prepareCustom["default"]
};
function isPath(el) {
  return el instanceof Path["default"];
}
function isDisplayable(el) {
  return el instanceof Displayable["default"];
}
function copyElement(sourceEl, targetEl) {
  targetEl.copyTransform(sourceEl);
  if (isDisplayable(targetEl) && isDisplayable(sourceEl)) {
    targetEl.setStyle(sourceEl.style);
    targetEl.z = sourceEl.z;
    targetEl.z2 = sourceEl.z2;
    targetEl.zlevel = sourceEl.zlevel;
    targetEl.invisible = sourceEl.invisible;
    targetEl.ignore = sourceEl.ignore;
    if (isPath(targetEl) && isPath(sourceEl)) {
      targetEl.setShape(sourceEl.shape);
    }
  }
}
var CustomView_CustomChartView = /** @class */function (_super) {
  (0,tslib_es6.__extends)(CustomChartView, _super);
  function CustomChartView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = CustomChartView.type;
    return _this;
  }
  CustomChartView.prototype.render = function (customSeries, ecModel, api, payload) {
    // Clear previously rendered progressive elements.
    this._progressiveEls = null;
    var oldData = this._data;
    var data = customSeries.getData();
    var group = this.group;
    var renderItem = makeRenderItem(customSeries, data, ecModel, api);
    if (!oldData) {
      // Previous render is incremental render or first render.
      // Needs remove the incremental rendered elements.
      group.removeAll();
    }
    data.diff(oldData).add(function (newIdx) {
      createOrUpdateItem(api, null, newIdx, renderItem(newIdx, payload), customSeries, group, data);
    }).remove(function (oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el && (0,customGraphicTransition.applyLeaveTransition)(el, customInnerStore(el).option, customSeries);
    }).update(function (newIdx, oldIdx) {
      var oldEl = oldData.getItemGraphicEl(oldIdx);
      createOrUpdateItem(api, oldEl, newIdx, renderItem(newIdx, payload), customSeries, group, data);
    }).execute();
    // Do clipping
    var clipPath = customSeries.get('clip', true) ? (0,createClipPathFromCoordSys.createClipPath)(customSeries.coordinateSystem, false, customSeries) : null;
    if (clipPath) {
      group.setClipPath(clipPath);
    } else {
      group.removeClipPath();
    }
    this._data = data;
  };
  CustomChartView.prototype.incrementalPrepareRender = function (customSeries, ecModel, api) {
    this.group.removeAll();
    this._data = null;
  };
  CustomChartView.prototype.incrementalRender = function (params, customSeries, ecModel, api, payload) {
    var data = customSeries.getData();
    var renderItem = makeRenderItem(customSeries, data, ecModel, api);
    var progressiveEls = this._progressiveEls = [];
    function setIncrementalAndHoverLayer(el) {
      if (!el.isGroup) {
        el.incremental = true;
        el.ensureState('emphasis').hoverLayer = true;
      }
    }
    for (var idx = params.start; idx < params.end; idx++) {
      var el = createOrUpdateItem(null, null, idx, renderItem(idx, payload), customSeries, this.group, data);
      if (el) {
        el.traverse(setIncrementalAndHoverLayer);
        progressiveEls.push(el);
      }
    }
  };
  CustomChartView.prototype.eachRendered = function (cb) {
    graphic.traverseElements(this._progressiveEls || this.group, cb);
  };
  CustomChartView.prototype.filterForExposedEvent = function (eventType, query, targetEl, packedEvent) {
    var elementName = query.element;
    if (elementName == null || targetEl.name === elementName) {
      return true;
    }
    // Enable to give a name on a group made by `renderItem`, and listen
    // events that are triggered by its descendents.
    while ((targetEl = targetEl.__hostTarget || targetEl.parent) && targetEl !== this.group) {
      if (targetEl.name === elementName) {
        return true;
      }
    }
    return false;
  };
  CustomChartView.type = 'custom';
  return CustomChartView;
}(Chart["default"]);
/* export default */ var CustomView = (CustomView_CustomChartView);
function createEl(elOption) {
  var graphicType = elOption.type;
  var el;
  // Those graphic elements are not shapes. They should not be
  // overwritten by users, so do them first.
  if (graphicType === 'path') {
    var shape = elOption.shape;
    // Using pathRect brings convenience to users sacle svg path.
    var pathRect = shape.width != null && shape.height != null ? {
      x: shape.x || 0,
      y: shape.y || 0,
      width: shape.width,
      height: shape.height
    } : null;
    var pathData = getPathData(shape);
    // Path is also used for icon, so layout 'center' by default.
    el = graphic.makePath(pathData, null, pathRect, shape.layout || 'center');
    customInnerStore(el).customPathData = pathData;
  } else if (graphicType === 'image') {
    el = new Image["default"]({});
    customInnerStore(el).customImagePath = elOption.style.image;
  } else if (graphicType === 'text') {
    el = new Text["default"]({});
    // customInnerStore(el).customText = (elOption.style as TextStyleProps).text;
  } else if (graphicType === 'group') {
    el = new Group["default"]();
  } else if (graphicType === 'compoundPath') {
    var shape = elOption.shape;
    if (!shape || !shape.paths) {
      var errMsg = '';
      if (true) {
        errMsg = 'shape.paths must be specified in compoundPath';
      }
      (0,log.throwError)(errMsg);
    }
    var paths = (0,util.map)(shape.paths, function (path) {
      if (path.type === 'path') {
        return graphic.makePath(path.shape.pathData, path, null);
      }
      var Clz = graphic.getShapeClass(path.type);
      if (!Clz) {
        var errMsg = '';
        if (true) {
          errMsg = 'graphic type "' + graphicType + '" can not be found.';
        }
        (0,log.throwError)(errMsg);
      }
      return new Clz();
    });
    el = new CompoundPath["default"]({
      shape: {
        paths: paths
      }
    });
  } else {
    var Clz = graphic.getShapeClass(graphicType);
    if (!Clz) {
      var errMsg = '';
      if (true) {
        errMsg = 'graphic type "' + graphicType + '" can not be found.';
      }
      (0,log.throwError)(errMsg);
    }
    el = new Clz();
  }
  customInnerStore(el).customGraphicType = graphicType;
  el.name = elOption.name;
  // Compat ec4: the default z2 lift is 1. If changing the number,
  // some cases probably be broken: hierarchy layout along z, like circle packing,
  // where emphasis only intending to modify color/border rather than lift z2.
  el.z2EmphasisLift = 1;
  el.z2SelectLift = 1;
  return el;
}
function updateElNormal(
// Can be null/undefined
api, el, dataIndex, elOption, attachedTxInfo, seriesModel, isInit) {
  // Stop and restore before update any other attributes.
  (0,customGraphicKeyframeAnimation.stopPreviousKeyframeAnimationAndRestore)(el);
  var txCfgOpt = attachedTxInfo && attachedTxInfo.normal.cfg;
  if (txCfgOpt) {
    // PENDING: whether use user object directly rather than clone?
    // TODO:5.0 textConfig transition animation?
    el.setTextConfig(txCfgOpt);
  }
  // Default transition ['x', 'y']
  if (elOption && elOption.transition == null) {
    elOption.transition = DEFAULT_TRANSITION;
  }
  // Do some normalization on style.
  var styleOpt = elOption && elOption.style;
  if (styleOpt) {
    if (el.type === 'text') {
      var textOptionStyle = styleOpt;
      // Compatible with ec4: if `textFill` or `textStroke` exists use them.
      (0,util.hasOwn)(textOptionStyle, 'textFill') && (textOptionStyle.fill = textOptionStyle.textFill);
      (0,util.hasOwn)(textOptionStyle, 'textStroke') && (textOptionStyle.stroke = textOptionStyle.textStroke);
    }
    var decalPattern = void 0;
    var decalObj = isPath(el) ? styleOpt.decal : null;
    if (api && decalObj) {
      decalObj.dirty = true;
      decalPattern = (0,decal.createOrUpdatePatternFromDecal)(decalObj, api);
    }
    // Always overwrite in case user specify this prop.
    styleOpt.__decalPattern = decalPattern;
  }
  if (isDisplayable(el)) {
    if (styleOpt) {
      var decalPattern = styleOpt.__decalPattern;
      if (decalPattern) {
        styleOpt.decal = decalPattern;
      }
    }
  }
  (0,customGraphicTransition.applyUpdateTransition)(el, elOption, seriesModel, {
    dataIndex: dataIndex,
    isInit: isInit,
    clearStyle: true
  });
  (0,customGraphicKeyframeAnimation.applyKeyframeAnimation)(el, elOption.keyframeAnimation, seriesModel);
}
function updateElOnState(state, el, elStateOpt, styleOpt, attachedTxInfo) {
  var elDisplayable = el.isGroup ? null : el;
  var txCfgOpt = attachedTxInfo && attachedTxInfo[state].cfg;
  // PENDING:5.0 support customize scale change and transition animation?
  if (elDisplayable) {
    // By default support auto lift color when hover whether `emphasis` specified.
    var stateObj = elDisplayable.ensureState(state);
    if (styleOpt === false) {
      var existingEmphasisState = elDisplayable.getState(state);
      if (existingEmphasisState) {
        existingEmphasisState.style = null;
      }
    } else {
      // style is needed to enable default emphasis.
      stateObj.style = styleOpt || null;
    }
    // If `elOption.styleEmphasis` or `elOption.emphasis.style` is `false`,
    // remove hover style.
    // If `elOption.textConfig` or `elOption.emphasis.textConfig` is null/undefined, it does not
    // make sense. So for simplicity, we do not ditinguish `hasOwnProperty` and null/undefined.
    if (txCfgOpt) {
      stateObj.textConfig = txCfgOpt;
    }
    (0,states.setDefaultStateProxy)(elDisplayable);
  }
}
function updateZ(el, elOption, seriesModel) {
  // Group not support textContent and not support z yet.
  if (el.isGroup) {
    return;
  }
  var elDisplayable = el;
  var currentZ = seriesModel.currentZ;
  var currentZLevel = seriesModel.currentZLevel;
  // Always erase.
  elDisplayable.z = currentZ;
  elDisplayable.zlevel = currentZLevel;
  // z2 must not be null/undefined, otherwise sort error may occur.
  var optZ2 = elOption.z2;
  optZ2 != null && (elDisplayable.z2 = optZ2 || 0);
  for (var i = 0; i < STATES.length; i++) {
    updateZForEachState(elDisplayable, elOption, STATES[i]);
  }
}
function updateZForEachState(elDisplayable, elOption, state) {
  var isNormal = state === NORMAL;
  var elStateOpt = isNormal ? elOption : retrieveStateOption(elOption, state);
  var optZ2 = elStateOpt ? elStateOpt.z2 : null;
  var stateObj;
  if (optZ2 != null) {
    // Do not `ensureState` until required.
    stateObj = isNormal ? elDisplayable : elDisplayable.ensureState(state);
    stateObj.z2 = optZ2 || 0;
  }
}
function makeRenderItem(customSeries, data, ecModel, api) {
  var renderItem = customSeries.get('renderItem');
  if (typeof renderItem === 'string') {
    // Find renderItem in registered custom series
    var registeredRenderItem = (0,customSeriesRegister.getCustomSeries)(renderItem);
    if (registeredRenderItem) {
      renderItem = registeredRenderItem;
    } else if (true) {
      console.warn("Custom series renderItem '" + renderItem + "' not found.\n                Call 'echarts.registerCustomSeries' to register it.");
    }
  }
  var coordSys = customSeries.coordinateSystem;
  var prepareResult = {};
  if (coordSys) {
    if (true) {
      (0,util.assert)(renderItem, 'series.render is required.');
      (0,util.assert)(coordSys.prepareCustoms || prepareCustoms[coordSys.type], 'This coordSys does not support custom series.');
    }
    // `coordSys.prepareCustoms` is used for external coord sys like bmap.
    prepareResult = coordSys.prepareCustoms ? coordSys.prepareCustoms(coordSys) : prepareCustoms[coordSys.type](coordSys);
  }
  var userAPI = (0,util.defaults)({
    getWidth: api.getWidth,
    getHeight: api.getHeight,
    getZr: api.getZr,
    getDevicePixelRatio: api.getDevicePixelRatio,
    value: value,
    style: style,
    ordinalRawValue: ordinalRawValue,
    styleEmphasis: styleEmphasis,
    visual: visual,
    barLayout: barLayout,
    currentSeriesIndices: currentSeriesIndices,
    font: font
  }, prepareResult.api || {});
  var userParams = {
    // The life cycle of context: current round of rendering.
    // The global life cycle is probably not necessary, because
    // user can store global status by themselves.
    context: {},
    seriesId: customSeries.id,
    seriesName: customSeries.name,
    seriesIndex: customSeries.seriesIndex,
    coordSys: prepareResult.coordSys,
    dataInsideLength: data.count(),
    encode: wrapEncodeDef(customSeries.getData()),
    itemPayload: customSeries.get('itemPayload') || {}
  };
  // If someday intending to refactor them to a class, should consider do not
  // break change: currently these attribute member are encapsulated in a closure
  // so that do not need to force user to call these method with a scope.
  // Do not support call `api` asynchronously without dataIndexInside input.
  var currDataIndexInside;
  var currItemModel;
  var currItemStyleModels = {};
  var currLabelModels = {};
  var seriesItemStyleModels = {};
  var seriesLabelModels = {};
  for (var i = 0; i < STATES.length; i++) {
    var stateName = STATES[i];
    seriesItemStyleModels[stateName] = customSeries.getModel(PATH_ITEM_STYLE[stateName]);
    seriesLabelModels[stateName] = customSeries.getModel(PATH_LABEL[stateName]);
  }
  function getItemModel(dataIndexInside) {
    return dataIndexInside === currDataIndexInside ? currItemModel || (currItemModel = data.getItemModel(dataIndexInside)) : data.getItemModel(dataIndexInside);
  }
  function getItemStyleModel(dataIndexInside, state) {
    return !data.hasItemOption ? seriesItemStyleModels[state] : dataIndexInside === currDataIndexInside ? currItemStyleModels[state] || (currItemStyleModels[state] = getItemModel(dataIndexInside).getModel(PATH_ITEM_STYLE[state])) : getItemModel(dataIndexInside).getModel(PATH_ITEM_STYLE[state]);
  }
  function getLabelModel(dataIndexInside, state) {
    return !data.hasItemOption ? seriesLabelModels[state] : dataIndexInside === currDataIndexInside ? currLabelModels[state] || (currLabelModels[state] = getItemModel(dataIndexInside).getModel(PATH_LABEL[state])) : getItemModel(dataIndexInside).getModel(PATH_LABEL[state]);
  }
  return function (dataIndexInside, payload) {
    currDataIndexInside = dataIndexInside;
    currItemModel = null;
    currItemStyleModels = {};
    currLabelModels = {};
    return renderItem && renderItem((0,util.defaults)({
      dataIndexInside: dataIndexInside,
      dataIndex: data.getRawIndex(dataIndexInside),
      // Can be used for optimization when zoom or roam.
      actionType: payload ? payload.type : null
    }, userParams), userAPI);
  };
  /**
   * @public
   * @param dim by default 0.
   * @param dataIndexInside by default `currDataIndexInside`.
   */
  function value(dim, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    return data.getStore().get(data.getDimensionIndex(dim || 0), dataIndexInside);
  }
  /**
   * @public
   * @param dim by default 0.
   * @param dataIndexInside by default `currDataIndexInside`.
   */
  function ordinalRawValue(dim, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    dim = dim || 0;
    var dimInfo = data.getDimensionInfo(dim);
    if (!dimInfo) {
      var dimIndex = data.getDimensionIndex(dim);
      return dimIndex >= 0 ? data.getStore().get(dimIndex, dataIndexInside) : undefined;
    }
    var val = data.get(dimInfo.name, dataIndexInside);
    var ordinalMeta = dimInfo && dimInfo.ordinalMeta;
    return ordinalMeta ? ordinalMeta.categories[val] : val;
  }
  /**
   * @deprecated The original intention of `api.style` is enable to set itemStyle
   * like other series. But it is not necessary and not easy to give a strict definition
   * of what it returns. And since echarts5 it needs to be make compat work. So
   * deprecates it since echarts5.
   *
   * By default, `visual` is applied to style (to support visualMap).
   * `visual.color` is applied at `fill`. If user want apply visual.color on `stroke`,
   * it can be implemented as:
   * `api.style({stroke: api.visual('color'), fill: null})`;
   *
   * [Compat]: since ec5, RectText has been separated from its hosts el.
   * so `api.style()` will only return the style from `itemStyle` but not handle `label`
   * any more. But `series.label` config is never published in doc.
   * We still compat it in `api.style()`. But not encourage to use it and will still not
   * to pulish it to doc.
   * @public
   * @param dataIndexInside by default `currDataIndexInside`.
   */
  function style(userProps, dataIndexInside) {
    if (true) {
      (0,styleCompat.warnDeprecated)('api.style', 'Please write literal style directly instead.');
    }
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    var style = data.getItemVisual(dataIndexInside, 'style');
    var visualColor = style && style.fill;
    var opacity = style && style.opacity;
    var itemStyle = getItemStyleModel(dataIndexInside, NORMAL).getItemStyle();
    visualColor != null && (itemStyle.fill = visualColor);
    opacity != null && (itemStyle.opacity = opacity);
    var opt = {
      inheritColor: (0,util.isString)(visualColor) ? visualColor : tokens["default"].color.neutral99
    };
    var labelModel = getLabelModel(dataIndexInside, NORMAL);
    // Now that the feature of "auto adjust text fill/stroke" has been migrated to zrender
    // since ec5, we should set `isAttached` as `false` here and make compat in
    // `convertToEC4StyleForCustomSerise`.
    var textStyle = labelStyle.createTextStyle(labelModel, null, opt, false, true);
    textStyle.text = labelModel.getShallow('show') ? (0,util.retrieve2)(customSeries.getFormattedLabel(dataIndexInside, NORMAL), (0,labelHelper.getDefaultLabel)(data, dataIndexInside)) : null;
    var textConfig = labelStyle.createTextConfig(labelModel, opt, false);
    preFetchFromExtra(userProps, itemStyle);
    itemStyle = (0,styleCompat.convertToEC4StyleForCustomSerise)(itemStyle, textStyle, textConfig);
    userProps && applyUserPropsAfter(itemStyle, userProps);
    itemStyle.legacy = true;
    return itemStyle;
  }
  /**
   * @deprecated The reason see `api.style()`
   * @public
   * @param dataIndexInside by default `currDataIndexInside`.
   */
  function styleEmphasis(userProps, dataIndexInside) {
    if (true) {
      (0,styleCompat.warnDeprecated)('api.styleEmphasis', 'Please write literal style directly instead.');
    }
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    var itemStyle = getItemStyleModel(dataIndexInside, EMPHASIS).getItemStyle();
    var labelModel = getLabelModel(dataIndexInside, EMPHASIS);
    var textStyle = labelStyle.createTextStyle(labelModel, null, null, true, true);
    textStyle.text = labelModel.getShallow('show') ? (0,util.retrieve3)(customSeries.getFormattedLabel(dataIndexInside, EMPHASIS), customSeries.getFormattedLabel(dataIndexInside, NORMAL), (0,labelHelper.getDefaultLabel)(data, dataIndexInside)) : null;
    var textConfig = labelStyle.createTextConfig(labelModel, null, true);
    preFetchFromExtra(userProps, itemStyle);
    itemStyle = (0,styleCompat.convertToEC4StyleForCustomSerise)(itemStyle, textStyle, textConfig);
    userProps && applyUserPropsAfter(itemStyle, userProps);
    itemStyle.legacy = true;
    return itemStyle;
  }
  function applyUserPropsAfter(itemStyle, extra) {
    for (var key in extra) {
      if ((0,util.hasOwn)(extra, key)) {
        itemStyle[key] = extra[key];
      }
    }
  }
  function preFetchFromExtra(extra, itemStyle) {
    // A trick to retrieve those props firstly, which are used to
    // apply auto inside fill/stroke in `convertToEC4StyleForCustomSerise`.
    // (It's not reasonable but only for a degree of compat)
    if (extra) {
      extra.textFill && (itemStyle.textFill = extra.textFill);
      extra.textPosition && (itemStyle.textPosition = extra.textPosition);
    }
  }
  /**
   * @public
   * @param dataIndexInside by default `currDataIndexInside`.
   */
  function visual(visualType, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    if ((0,util.hasOwn)(STYLE_VISUAL_TYPE, visualType)) {
      var style_1 = data.getItemVisual(dataIndexInside, 'style');
      return style_1 ? style_1[STYLE_VISUAL_TYPE[visualType]] : null;
    }
    // Only support these visuals. Other visual might be inner tricky
    // for performance (like `style`), do not expose to users.
    if ((0,util.hasOwn)(NON_STYLE_VISUAL_PROPS, visualType)) {
      return data.getItemVisual(dataIndexInside, visualType);
    }
  }
  /**
   * @public
   * @return If not support, return undefined.
   */
  function barLayout(opt) {
    if (coordSys.type === 'cartesian2d') {
      var baseAxis = coordSys.getBaseAxis();
      return (0,barGrid.getLayoutOnAxis)((0,util.defaults)({
        axis: baseAxis
      }, opt));
    }
  }
  /**
   * @public
   */
  function currentSeriesIndices() {
    return ecModel.getCurrentSeriesIndices();
  }
  /**
   * @public
   * @return font string
   */
  function font(opt) {
    return labelStyle.getFont(opt, ecModel);
  }
}
function wrapEncodeDef(data) {
  var encodeDef = {};
  (0,util.each)(data.dimensions, function (dimName) {
    var dimInfo = data.getDimensionInfo(dimName);
    if (!dimInfo.isExtraCoord) {
      var coordDim = dimInfo.coordDim;
      var dataDims = encodeDef[coordDim] = encodeDef[coordDim] || [];
      dataDims[dimInfo.coordDimIndex] = data.getDimensionIndex(dimName);
    }
  });
  return encodeDef;
}
function createOrUpdateItem(api, existsEl, dataIndex, elOption, seriesModel, group, data) {
  // [Rule]
  // If `renderItem` returns `null`/`undefined`/`false`, remove the previous el if existing.
  //     (It seems that violate the "merge" principle, but most of users probably intuitively
  //     regard "return;" as "show nothing element whatever", so make a exception to meet the
  //     most cases.)
  // The rule or "merge" see [STRATEGY_MERGE].
  // If `elOption` is `null`/`undefined`/`false` (when `renderItem` returns nothing).
  if (!elOption) {
    group.remove(existsEl);
    return;
  }
  var el = doCreateOrUpdateEl(api, existsEl, dataIndex, elOption, seriesModel, group);
  el && data.setItemGraphicEl(dataIndex, el);
  el && (0,states.toggleHoverEmphasis)(el, elOption.focus, elOption.blurScope, elOption.emphasisDisabled);
  return el;
}
function doCreateOrUpdateEl(api, existsEl, dataIndex, elOption, seriesModel, group) {
  if (true) {
    (0,util.assert)(elOption, 'should not have an null/undefined element setting');
  }
  var toBeReplacedIdx = -1;
  var oldEl = existsEl;
  if (existsEl && doesElNeedRecreate(existsEl, elOption, seriesModel)
  // || (
  //     // PENDING: even in one-to-one mapping case, if el is marked as morph,
  //     // do not sure whether the el will be mapped to another el with different
  //     // hierarchy in Group tree. So always recreate el rather than reuse the el.
  //     morphHelper && morphHelper.isOneToOneFrom(el)
  // )
  ) {
    // Should keep at the original index, otherwise "merge by index" will be incorrect.
    toBeReplacedIdx = (0,util.indexOf)(group.childrenRef(), existsEl);
    existsEl = null;
  }
  var isInit = !existsEl;
  var el = existsEl;
  if (!el) {
    el = createEl(elOption);
    if (oldEl) {
      copyElement(oldEl, el);
    }
  } else {
    // FIMXE:NEXT unified clearState?
    // If in some case the performance issue arised, consider
    // do not clearState but update cached normal state directly.
    el.clearStates();
  }
  // Need to set morph: false explictly to disable automatically morphing.
  if (elOption.morph === false) {
    el.disableMorphing = true;
  } else if (el.disableMorphing) {
    el.disableMorphing = false;
  }
  if (elOption.tooltipDisabled) {
    el.tooltipDisabled = true;
  }
  attachedTxInfoTmp.normal.cfg = attachedTxInfoTmp.normal.conOpt = attachedTxInfoTmp.emphasis.cfg = attachedTxInfoTmp.emphasis.conOpt = attachedTxInfoTmp.blur.cfg = attachedTxInfoTmp.blur.conOpt = attachedTxInfoTmp.select.cfg = attachedTxInfoTmp.select.conOpt = null;
  attachedTxInfoTmp.isLegacy = false;
  doCreateOrUpdateAttachedTx(el, dataIndex, elOption, seriesModel, isInit, attachedTxInfoTmp);
  doCreateOrUpdateClipPath(el, dataIndex, elOption, seriesModel, isInit);
  updateElNormal(api, el, dataIndex, elOption, attachedTxInfoTmp, seriesModel, isInit);
  // `elOption.info` enables user to mount some info on
  // elements and use them in event handlers.
  // Update them only when user specified, otherwise, remain.
  (0,util.hasOwn)(elOption, 'info') && (customInnerStore(el).info = elOption.info);
  for (var i = 0; i < STATES.length; i++) {
    var stateName = STATES[i];
    if (stateName !== NORMAL) {
      var otherStateOpt = retrieveStateOption(elOption, stateName);
      var otherStyleOpt = retrieveStyleOptionOnState(elOption, otherStateOpt, stateName);
      updateElOnState(stateName, el, otherStateOpt, otherStyleOpt, attachedTxInfoTmp);
    }
  }
  updateZ(el, elOption, seriesModel);
  if (elOption.type === 'group') {
    CustomView_mergeChildren(api, el, dataIndex, elOption, seriesModel);
  }
  if (toBeReplacedIdx >= 0) {
    group.replaceAt(el, toBeReplacedIdx);
  } else {
    group.add(el);
  }
  return el;
}
// `el` must not be null/undefined.
function doesElNeedRecreate(el, elOption, seriesModel) {
  var elInner = customInnerStore(el);
  var elOptionType = elOption.type;
  var elOptionShape = elOption.shape;
  var elOptionStyle = elOption.style;
  return (
    // Always create new if universal transition is enabled.
    // Because we do transition after render. It needs to know what old element is. Replacement will loose it.
    seriesModel.isUniversalTransitionEnabled()
    // If `elOptionType` is `null`, follow the merge principle.
    || elOptionType != null && elOptionType !== elInner.customGraphicType || elOptionType === 'path' && hasOwnPathData(elOptionShape) && getPathData(elOptionShape) !== elInner.customPathData || elOptionType === 'image' && (0,util.hasOwn)(elOptionStyle, 'image') && elOptionStyle.image !== elInner.customImagePath
    // // FIXME test and remove this restriction?
    // || (elOptionType === 'text'
    //     && hasOwn(elOptionStyle, 'text')
    //     && (elOptionStyle as TextStyleProps).text !== elInner.customText
    // )
  );
}
function doCreateOrUpdateClipPath(el, dataIndex, elOption, seriesModel, isInit) {
  // Based on the "merge" principle, if no clipPath provided,
  // do nothing. The exists clip will be totally removed only if
  // `el.clipPath` is `false`. Otherwise it will be merged/replaced.
  var clipPathOpt = elOption.clipPath;
  if (clipPathOpt === false) {
    if (el && el.getClipPath()) {
      el.removeClipPath();
    }
  } else if (clipPathOpt) {
    var clipPath = el.getClipPath();
    if (clipPath && doesElNeedRecreate(clipPath, clipPathOpt, seriesModel)) {
      clipPath = null;
    }
    if (!clipPath) {
      clipPath = createEl(clipPathOpt);
      if (true) {
        (0,util.assert)(isPath(clipPath), 'Only any type of `path` can be used in `clipPath`, rather than ' + clipPath.type + '.');
      }
      el.setClipPath(clipPath);
    }
    updateElNormal(null, clipPath, dataIndex, clipPathOpt, null, seriesModel, isInit);
  }
  // If not define `clipPath` in option, do nothing unnecessary.
}
function doCreateOrUpdateAttachedTx(el, dataIndex, elOption, seriesModel, isInit, attachedTxInfo) {
  // Group does not support textContent temporarily until necessary.
  if (el.isGroup || el.type === 'compoundPath') {
    return;
  }
  // Normal must be called before emphasis, for `isLegacy` detection.
  processTxInfo(elOption, null, attachedTxInfo);
  processTxInfo(elOption, EMPHASIS, attachedTxInfo);
  // If `elOption.textConfig` or `elOption.textContent` is null/undefined, it does not make sense.
  // So for simplicity, if "elOption hasOwnProperty of them but be null/undefined", we do not
  // trade them as set to null to el.
  // Especially:
  // `elOption.textContent: false` means remove textContent.
  // `elOption.textContent.emphasis.style: false` means remove the style from emphasis state.
  var txConOptNormal = attachedTxInfo.normal.conOpt;
  var txConOptEmphasis = attachedTxInfo.emphasis.conOpt;
  var txConOptBlur = attachedTxInfo.blur.conOpt;
  var txConOptSelect = attachedTxInfo.select.conOpt;
  if (txConOptNormal != null || txConOptEmphasis != null || txConOptSelect != null || txConOptBlur != null) {
    var textContent = el.getTextContent();
    if (txConOptNormal === false) {
      textContent && el.removeTextContent();
    } else {
      txConOptNormal = attachedTxInfo.normal.conOpt = txConOptNormal || {
        type: 'text'
      };
      if (!textContent) {
        textContent = createEl(txConOptNormal);
        el.setTextContent(textContent);
      } else {
        // If in some case the performance issue arised, consider
        // do not clearState but update cached normal state directly.
        textContent.clearStates();
      }
      updateElNormal(null, textContent, dataIndex, txConOptNormal, null, seriesModel, isInit);
      var txConStlOptNormal = txConOptNormal && txConOptNormal.style;
      for (var i = 0; i < STATES.length; i++) {
        var stateName = STATES[i];
        if (stateName !== NORMAL) {
          var txConOptOtherState = attachedTxInfo[stateName].conOpt;
          updateElOnState(stateName, textContent, txConOptOtherState, retrieveStyleOptionOnState(txConOptNormal, txConOptOtherState, stateName), null);
        }
      }
      txConStlOptNormal ? textContent.dirty() : textContent.markRedraw();
    }
  }
}
function processTxInfo(elOption, state, attachedTxInfo) {
  var stateOpt = !state ? elOption : retrieveStateOption(elOption, state);
  var styleOpt = !state ? elOption.style : retrieveStyleOptionOnState(elOption, stateOpt, EMPHASIS);
  var elType = elOption.type;
  var txCfg = stateOpt ? stateOpt.textConfig : null;
  var txConOptNormal = elOption.textContent;
  var txConOpt = !txConOptNormal ? null : !state ? txConOptNormal : retrieveStateOption(txConOptNormal, state);
  if (styleOpt && (
  // Because emphasis style has little info to detect legacy,
  // if normal is legacy, emphasis is trade as legacy.
  attachedTxInfo.isLegacy || (0,styleCompat.isEC4CompatibleStyle)(styleOpt, elType, !!txCfg, !!txConOpt))) {
    attachedTxInfo.isLegacy = true;
    var convertResult = (0,styleCompat.convertFromEC4CompatibleStyle)(styleOpt, elType, !state);
    // Explicitly specified `textConfig` and `textContent` has higher priority than
    // the ones generated by legacy style. Otherwise if users use them and `api.style`
    // at the same time, they not both work and hardly to known why.
    if (!txCfg && convertResult.textConfig) {
      txCfg = convertResult.textConfig;
    }
    if (!txConOpt && convertResult.textContent) {
      txConOpt = convertResult.textContent;
    }
  }
  if (!state && txConOpt) {
    var txConOptNormal_1 = txConOpt;
    // `textContent: {type: 'text'}`, the "type" is easy to be missing. So we tolerate it.
    !txConOptNormal_1.type && (txConOptNormal_1.type = 'text');
    if (true) {
      // Do not tolerate incorrcet type for forward compat.
      (0,util.assert)(txConOptNormal_1.type === 'text', 'textContent.type must be "text"');
    }
  }
  var info = !state ? attachedTxInfo.normal : attachedTxInfo[state];
  info.cfg = txCfg;
  info.conOpt = txConOpt;
}
function retrieveStateOption(elOption, state) {
  return !state ? elOption : elOption ? elOption[state] : null;
}
function retrieveStyleOptionOnState(stateOptionNormal, stateOption, state) {
  var style = stateOption && stateOption.style;
  if (style == null && state === EMPHASIS && stateOptionNormal) {
    style = stateOptionNormal.styleEmphasis;
  }
  return style;
}
// Usage:
// (1) By default, `elOption.$mergeChildren` is `'byIndex'`, which indicates
//     that the existing children will not be removed, and enables the feature
//     that update some of the props of some of the children simply by construct
//     the returned children of `renderItem` like:
//     `var children = group.children = []; children[3] = {opacity: 0.5};`
// (2) If `elOption.$mergeChildren` is `'byName'`, add/update/remove children
//     by child.name. But that might be lower performance.
// (3) If `elOption.$mergeChildren` is `false`, the existing children will be
//     replaced totally.
// (4) If `!elOption.children`, following the "merge" principle, nothing will
//     happen.
// (5) If `elOption.$mergeChildren` is not `false` neither `'byName'` and the
//     `el` is a group, and if any of the new child is null, it means to remove
//     the element at the same index, if exists. On the other hand, if the new
//     child is and empty object `{}`, it means to keep the element not changed.
//
// For implementation simpleness, do not provide a direct way to remove single
// child (otherwise the total indices of the children array have to be modified).
// User can remove a single child by setting its `ignore` to `true`.
function CustomView_mergeChildren(api, el, dataIndex, elOption, seriesModel) {
  var newChildren = elOption.children;
  var newLen = newChildren ? newChildren.length : 0;
  var mergeChildren = elOption.$mergeChildren;
  // `diffChildrenByName` has been deprecated.
  var byName = mergeChildren === 'byName' || elOption.diffChildrenByName;
  var notMerge = mergeChildren === false;
  // For better performance on roam update, only enter if necessary.
  if (!newLen && !byName && !notMerge) {
    return;
  }
  if (byName) {
    diffGroupChildren({
      api: api,
      oldChildren: el.children() || [],
      newChildren: newChildren || [],
      dataIndex: dataIndex,
      seriesModel: seriesModel,
      group: el
    });
    return;
  }
  notMerge && el.removeAll();
  // Mapping children of a group simply by index, which
  // might be better performance.
  var index = 0;
  for (; index < newLen; index++) {
    var newChild = newChildren[index];
    var oldChild = el.childAt(index);
    if (newChild) {
      if (newChild.ignore == null) {
        // The old child is set to be ignored if null (see comments
        // below). So we need to set ignore to be false back.
        newChild.ignore = false;
      }
      doCreateOrUpdateEl(api, oldChild, dataIndex, newChild, seriesModel, el);
    } else {
      if (true) {
        (0,util.assert)(oldChild, 'renderItem should not return a group containing elements' + ' as null/undefined/{} if they do not exist before.');
      }
      // If the new element option is null, it means to remove the old
      // element. But we cannot really remove the element from the group
      // directly, because the element order may not be stable when this
      // element is added back. So we set the element to be ignored.
      oldChild.ignore = true;
    }
  }
  for (var i = el.childCount() - 1; i >= index; i--) {
    var child = el.childAt(i);
    removeChildFromGroup(el, child, seriesModel);
  }
}
function removeChildFromGroup(group, child, seriesModel) {
  // Do not support leave elements that are not mentioned in the latest
  // `renderItem` return. Otherwise users may not have a clear and simple
  // concept that how to control all of the elements.
  child && (0,customGraphicTransition.applyLeaveTransition)(child, customInnerStore(group).option, seriesModel);
}
function diffGroupChildren(context) {
  new DataDiffer["default"](context.oldChildren, context.newChildren, getKey, getKey, context).add(processAddUpdate).update(processAddUpdate).remove(processRemove).execute();
}
function getKey(item, idx) {
  var name = item && item.name;
  return name != null ? name : GROUP_DIFF_PREFIX + idx;
}
function processAddUpdate(newIndex, oldIndex) {
  var context = this.context;
  var childOption = newIndex != null ? context.newChildren[newIndex] : null;
  var child = oldIndex != null ? context.oldChildren[oldIndex] : null;
  doCreateOrUpdateEl(context.api, child, context.dataIndex, childOption, context.seriesModel, context.group);
}
function processRemove(oldIndex) {
  var context = this.context;
  var child = context.oldChildren[oldIndex];
  child && (0,customGraphicTransition.applyLeaveTransition)(child, customInnerStore(child).option, context.seriesModel);
}
/**
 * @return SVG Path data.
 */
function getPathData(shape) {
  // "d" follows the SVG convention.
  return shape && (shape.pathData || shape.d);
}
function hasOwnPathData(shape) {
  return shape && ((0,util.hasOwn)(shape, 'pathData') || (0,util.hasOwn)(shape, 'd'));
}
;// CONCATENATED MODULE: ./node_modules/echarts/lib/chart/custom/install.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


function custom_install_install(registers) {
  registers.registerChartView(CustomView);
  registers.registerSeriesModel(CustomSeries);
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/grid/install.js
var grid_install = __webpack_require__(45620);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/polar/install.js
var polar_install = __webpack_require__(59166);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/geo/install.js + 1 modules
var geo_install = __webpack_require__(79503);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/singleAxis/install.js
var singleAxis_install = __webpack_require__(68241);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/parallel/install.js + 1 modules
var component_parallel_install = __webpack_require__(33206);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/calendar/install.js + 1 modules
var calendar_install = __webpack_require__(6888);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/matrix/install.js + 1 modules
var matrix_install = __webpack_require__(93084);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/graphic/install.js + 2 modules
var graphic_install = __webpack_require__(89547);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/toolbox/install.js + 7 modules
var toolbox_install = __webpack_require__(71702);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/tooltip/install.js + 5 modules
var tooltip_install = __webpack_require__(36577);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/axisPointer/install.js + 4 modules
var axisPointer_install = __webpack_require__(47961);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/brush/install.js + 5 modules
var brush_install = __webpack_require__(41351);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/title/install.js
var title_install = __webpack_require__(74064);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/timeline/install.js + 7 modules
var timeline_install = __webpack_require__(91825);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/marker/installMarkPoint.js + 2 modules
var installMarkPoint = __webpack_require__(87302);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/marker/installMarkLine.js + 2 modules
var installMarkLine = __webpack_require__(88907);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/marker/installMarkArea.js + 2 modules
var installMarkArea = __webpack_require__(37553);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/legend/install.js + 9 modules
var legend_install = __webpack_require__(52815);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/dataZoom/install.js
var dataZoom_install = __webpack_require__(45967);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/dataZoom/installDataZoomInside.js + 3 modules
var installDataZoomInside = __webpack_require__(69342);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/dataZoom/installDataZoomSlider.js + 2 modules
var installDataZoomSlider = __webpack_require__(96960);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/visualMap/install.js
var visualMap_install = __webpack_require__(28540);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/visualMap/installVisualMapContinuous.js + 2 modules
var installVisualMapContinuous = __webpack_require__(11148);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/visualMap/installVisualMapPiecewise.js + 2 modules
var installVisualMapPiecewise = __webpack_require__(67982);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/thumbnail/install.js + 3 modules
var thumbnail_install = __webpack_require__(32327);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/aria/install.js + 1 modules
var aria_install = __webpack_require__(92544);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/transform/install.js + 2 modules
var transform_install = __webpack_require__(56861);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/dataset/install.js
var dataset_install = __webpack_require__(76302);
// EXTERNAL MODULE: ./node_modules/zrender/lib/tool/morphPath.js + 2 modules
var morphPath = __webpack_require__(61293);
// EXTERNAL MODULE: ./node_modules/zrender/lib/tool/path.js + 1 modules
var tool_path = __webpack_require__(96263);
;// CONCATENATED MODULE: ./node_modules/echarts/lib/animation/morphTransitionHelper.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/





function isMultiple(elements) {
  return (0,util.isArray)(elements[0]);
}
function prepareMorphBatches(one, many) {
  var batches = [];
  var batchCount = one.length;
  for (var i = 0; i < batchCount; i++) {
    batches.push({
      one: one[i],
      many: []
    });
  }
  for (var i = 0; i < many.length; i++) {
    var len = many[i].length;
    var k = void 0;
    for (k = 0; k < len; k++) {
      batches[k % batchCount].many.push(many[i][k]);
    }
  }
  var off = 0;
  // If one has more paths than each one of many. average them.
  for (var i = batchCount - 1; i >= 0; i--) {
    if (!batches[i].many.length) {
      var moveFrom = batches[off].many;
      if (moveFrom.length <= 1) {
        // Not enough
        // Start from the first one.
        if (off) {
          off = 0;
        } else {
          return batches;
        }
      }
      var len = moveFrom.length;
      var mid = Math.ceil(len / 2);
      batches[i].many = moveFrom.slice(mid, len);
      batches[off].many = moveFrom.slice(0, mid);
      off++;
    }
  }
  return batches;
}
var pathDividers = {
  clone: function (params) {
    var ret = [];
    // Fitting the alpha
    var approxOpacity = 1 - Math.pow(1 - params.path.style.opacity, 1 / params.count);
    for (var i = 0; i < params.count; i++) {
      var cloned = (0,tool_path.clonePath)(params.path);
      cloned.setStyle('opacity', approxOpacity);
      ret.push(cloned);
    }
    return ret;
  },
  // Use the default divider
  split: null
};
function applyMorphAnimation(from, to, divideShape, seriesModel, dataIndex, animateOtherProps) {
  if (!from.length || !to.length) {
    return;
  }
  var updateAnimationCfg = (0,basicTransition.getAnimationConfig)('update', seriesModel, dataIndex);
  if (!(updateAnimationCfg && updateAnimationCfg.duration > 0)) {
    return;
  }
  var animationDelay = seriesModel.getModel('universalTransition').get('delay');
  var animationCfg = Object.assign({
    // Need to setToFinal so the further calculation based on the style can be correct.
    // Like emphasis color.
    setToFinal: true
  }, updateAnimationCfg);
  var many;
  var one;
  if (isMultiple(from)) {
    // manyToOne
    many = from;
    one = to;
  }
  if (isMultiple(to)) {
    // oneToMany
    many = to;
    one = from;
  }
  function morphOneBatch(batch, fromIsMany, animateIndex, animateCount, forceManyOne) {
    var batchMany = batch.many;
    var batchOne = batch.one;
    if (batchMany.length === 1 && !forceManyOne) {
      // Is one to one
      var batchFrom = fromIsMany ? batchMany[0] : batchOne;
      var batchTo = fromIsMany ? batchOne : batchMany[0];
      if ((0,morphPath.isCombineMorphing)(batchFrom)) {
        // Keep doing combine animation.
        morphOneBatch({
          many: [batchFrom],
          one: batchTo
        }, true, animateIndex, animateCount, true);
      } else {
        var individualAnimationCfg = animationDelay ? (0,util.defaults)({
          delay: animationDelay(animateIndex, animateCount)
        }, animationCfg) : animationCfg;
        (0,morphPath.morphPath)(batchFrom, batchTo, individualAnimationCfg);
        animateOtherProps(batchFrom, batchTo, batchFrom, batchTo, individualAnimationCfg);
      }
    } else {
      var separateAnimationCfg = (0,util.defaults)({
        dividePath: pathDividers[divideShape],
        individualDelay: animationDelay && function (idx, count, fromPath, toPath) {
          return animationDelay(idx + animateIndex, animateCount);
        }
      }, animationCfg);
      var _a = fromIsMany ? (0,morphPath.combineMorph)(batchMany, batchOne, separateAnimationCfg) : (0,morphPath.separateMorph)(batchOne, batchMany, separateAnimationCfg),
        fromIndividuals = _a.fromIndividuals,
        toIndividuals = _a.toIndividuals;
      var count = fromIndividuals.length;
      for (var k = 0; k < count; k++) {
        var individualAnimationCfg = animationDelay ? (0,util.defaults)({
          delay: animationDelay(k, count)
        }, animationCfg) : animationCfg;
        animateOtherProps(fromIndividuals[k], toIndividuals[k], fromIsMany ? batchMany[k] : batch.one, fromIsMany ? batch.one : batchMany[k], individualAnimationCfg);
      }
    }
  }
  var fromIsMany = many ? many === from
  // Is one to one. If the path number not match. also needs do merge and separate morphing.
  : from.length > to.length;
  var morphBatches = many ? prepareMorphBatches(one, many) : prepareMorphBatches(fromIsMany ? to : from, [fromIsMany ? from : to]);
  var animateCount = 0;
  for (var i = 0; i < morphBatches.length; i++) {
    animateCount += morphBatches[i].many.length;
  }
  var animateIndex = 0;
  for (var i = 0; i < morphBatches.length; i++) {
    morphOneBatch(morphBatches[i], fromIsMany, animateIndex, animateCount);
    animateIndex += morphBatches[i].many.length;
  }
}
function getPathList(elements) {
  if (!elements) {
    return [];
  }
  if ((0,util.isArray)(elements)) {
    var pathList_1 = [];
    for (var i = 0; i < elements.length; i++) {
      pathList_1.push(getPathList(elements[i]));
    }
    return pathList_1;
  }
  var pathList = [];
  elements.traverse(function (el) {
    if (el instanceof Path["default"] && !el.disableMorphing && !el.invisible && !el.ignore) {
      pathList.push(el);
    }
  });
  return pathList;
}
;// CONCATENATED MODULE: ./node_modules/echarts/lib/animation/universalTransition.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Universal transitions that can animate between any shapes(series) and any properties in any amounts.










var DATA_COUNT_THRESHOLD = 1e4;
var TRANSITION_NONE = 0;
var TRANSITION_P2C = 1;
var TRANSITION_C2P = 2;
;
var getUniversalTransitionGlobalStore = (0,util_model.makeInner)();
function getDimension(data, visualDimension) {
  var dimensions = data.dimensions;
  for (var i = 0; i < dimensions.length; i++) {
    var dimInfo = data.getDimensionInfo(dimensions[i]);
    if (dimInfo && dimInfo.otherDims[visualDimension] === 0) {
      return dimensions[i];
    }
  }
}
// get value by dimension. (only get value of itemGroupId or childGroupId, so convert it to string)
function getValueByDimension(data, dataIndex, dimension) {
  var dimInfo = data.getDimensionInfo(dimension);
  var dimOrdinalMeta = dimInfo && dimInfo.ordinalMeta;
  if (dimInfo) {
    var value = data.get(dimInfo.name, dataIndex);
    if (dimOrdinalMeta) {
      return dimOrdinalMeta.categories[value] || value + '';
    }
    return value + '';
  }
}
function getGroupId(data, dataIndex, dataGroupId, isChild) {
  // try to get groupId from encode
  var visualDimension = isChild ? 'itemChildGroupId' : 'itemGroupId';
  var groupIdDim = getDimension(data, visualDimension);
  if (groupIdDim) {
    var groupId = getValueByDimension(data, dataIndex, groupIdDim);
    return groupId;
  }
  // try to get groupId from raw data item
  var rawDataItem = data.getRawDataItem(dataIndex);
  var property = isChild ? 'childGroupId' : 'groupId';
  if (rawDataItem && rawDataItem[property]) {
    return rawDataItem[property] + '';
  }
  // fallback
  if (isChild) {
    return;
  }
  // try to use series.dataGroupId as groupId, otherwise use dataItem's id as groupId
  return dataGroupId || data.getId(dataIndex);
}
// flatten all data items from different serieses into one arrary
function flattenDataDiffItems(list) {
  var items = [];
  (0,util.each)(list, function (seriesInfo) {
    var data = seriesInfo.data;
    var dataGroupId = seriesInfo.dataGroupId;
    if (data.count() > DATA_COUNT_THRESHOLD) {
      if (true) {
        (0,log.warn)('Universal transition is disabled on large data > 10k.');
      }
      return;
    }
    var indices = data.getIndices();
    for (var dataIndex = 0; dataIndex < indices.length; dataIndex++) {
      items.push({
        data: data,
        groupId: getGroupId(data, dataIndex, dataGroupId, false),
        childGroupId: getGroupId(data, dataIndex, dataGroupId, true),
        divide: seriesInfo.divide,
        dataIndex: dataIndex
      });
    }
  });
  return items;
}
function fadeInElement(newEl, newSeries, newIndex) {
  newEl.traverse(function (el) {
    if (el instanceof Path["default"]) {
      // TODO use fade in animation for target element.
      (0,basicTransition.initProps)(el, {
        style: {
          opacity: 0
        }
      }, newSeries, {
        dataIndex: newIndex,
        isFrom: true
      });
    }
  });
}
function removeEl(el) {
  if (el.parent) {
    // Bake parent transform to element.
    // So it can still have proper transform to transition after it's removed.
    var computedTransform = el.getComputedTransform();
    el.setLocalTransform(computedTransform);
    el.parent.remove(el);
  }
}
function stopAnimation(el) {
  el.stopAnimation();
  if (el.isGroup) {
    el.traverse(function (child) {
      child.stopAnimation();
    });
  }
}
function animateElementStyles(el, dataIndex, seriesModel) {
  var animationConfig = (0,basicTransition.getAnimationConfig)('update', seriesModel, dataIndex);
  animationConfig && el.traverse(function (child) {
    if (child instanceof Displayable["default"]) {
      var oldStyle = (0,basicTransition.getOldStyle)(child);
      if (oldStyle) {
        child.animateFrom({
          style: oldStyle
        }, animationConfig);
      }
    }
  });
}
function isAllIdSame(oldDiffItems, newDiffItems) {
  var len = oldDiffItems.length;
  if (len !== newDiffItems.length) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    var oldItem = oldDiffItems[i];
    var newItem = newDiffItems[i];
    if (oldItem.data.getId(oldItem.dataIndex) !== newItem.data.getId(newItem.dataIndex)) {
      return false;
    }
  }
  return true;
}
function transitionBetween(oldList, newList, api) {
  var oldDiffItems = flattenDataDiffItems(oldList);
  var newDiffItems = flattenDataDiffItems(newList);
  function updateMorphingPathProps(from, to, rawFrom, rawTo, animationCfg) {
    if (rawFrom || from) {
      to.animateFrom({
        style: rawFrom && rawFrom !== from
        // dividingMethod like clone may override the style(opacity)
        // So extend it to raw style.
        ? (0,util.extend)((0,util.extend)({}, rawFrom.style), from.style) : from.style
      }, animationCfg);
    }
  }
  var hasMorphAnimation = false;
  /**
   * With groupId and childGroupId, we can build parent-child relationships between dataItems.
   * However, we should mind the parent-child "direction" between old and new options.
   *
   * For example, suppose we have two dataItems from two series.data:
   *
   * dataA: [                          dataB: [
   *   {                                 {
   *     value: 5,                         value: 3,
   *     groupId: 'creatures',             groupId: 'animals',
   *     childGroupId: 'animals'           childGroupId: 'dogs'
   *   },                                },
   *   ...                               ...
   * ]                                 ]
   *
   * where dataA is belong to optionA and dataB is belong to optionB.
   *
   * When we `setOption(optionB)` from optionA, we choose childGroupId of dataItemA and groupId of
   * dataItemB as keys so the two keys are matched (both are 'animals'), then universalTransition
   * will work. This derection is "parent -> child".
   *
   * If we `setOption(optionA)` from optionB, we also choose groupId of dataItemB and childGroupId
   * of dataItemA as keys and universalTransition will work. This derection is "child -> parent".
   *
   * If there is no childGroupId specified, which means no multiLevelDrillDown/Up is needed and no
   * parent-child relationship exists. This direction is "none".
   *
   * So we need to know whether to use groupId or childGroupId as the key when we call the keyGetter
   * functions. Thus, we need to decide the direction first.
   *
   * The rule is:
   *
   * if (all childGroupIds in oldDiffItems and all groupIds in newDiffItems have common value) {
   *   direction = 'parent -> child';
   * } else if (all groupIds in oldDiffItems and all childGroupIds in newDiffItems have common value) {
   *   direction = 'child -> parent';
   * } else {
   *   direction = 'none';
   * }
   */
  var direction = TRANSITION_NONE;
  // find all groupIds and childGroupIds from oldDiffItems
  var oldGroupIds = (0,util.createHashMap)();
  var oldChildGroupIds = (0,util.createHashMap)();
  oldDiffItems.forEach(function (item) {
    item.groupId && oldGroupIds.set(item.groupId, true);
    item.childGroupId && oldChildGroupIds.set(item.childGroupId, true);
  });
  // traverse newDiffItems and decide the direction according to the rule
  for (var i = 0; i < newDiffItems.length; i++) {
    var newGroupId = newDiffItems[i].groupId;
    if (oldChildGroupIds.get(newGroupId)) {
      direction = TRANSITION_P2C;
      break;
    }
    var newChildGroupId = newDiffItems[i].childGroupId;
    if (newChildGroupId && oldGroupIds.get(newChildGroupId)) {
      direction = TRANSITION_C2P;
      break;
    }
  }
  function createKeyGetter(isOld, onlyGetId) {
    return function (diffItem) {
      var data = diffItem.data;
      var dataIndex = diffItem.dataIndex;
      // TODO if specified dim
      if (onlyGetId) {
        return data.getId(dataIndex);
      }
      if (isOld) {
        return direction === TRANSITION_P2C ? diffItem.childGroupId : diffItem.groupId;
      } else {
        return direction === TRANSITION_C2P ? diffItem.childGroupId : diffItem.groupId;
      }
    };
  }
  // Use id if it's very likely to be an one to one animation
  // It's more robust than groupId
  // TODO Check if key dimension is specified.
  var useId = isAllIdSame(oldDiffItems, newDiffItems);
  var isElementStillInChart = {};
  if (!useId) {
    // We may have different diff strategy with basicTransition if we use other dimension as key.
    // If so, we can't simply check if oldEl is same with newEl. We need a map to check if oldEl is still being used in the new chart.
    // We can't use the elements that already being morphed. Let it keep it's original basic transition.
    for (var i = 0; i < newDiffItems.length; i++) {
      var newItem = newDiffItems[i];
      var el = newItem.data.getItemGraphicEl(newItem.dataIndex);
      if (el) {
        isElementStillInChart[el.id] = true;
      }
    }
  }
  function updateOneToOne(newIndex, oldIndex) {
    var oldItem = oldDiffItems[oldIndex];
    var newItem = newDiffItems[newIndex];
    var newSeries = newItem.data.hostModel;
    // TODO Mark this elements is morphed and don't morph them anymore
    var oldEl = oldItem.data.getItemGraphicEl(oldItem.dataIndex);
    var newEl = newItem.data.getItemGraphicEl(newItem.dataIndex);
    // Can't handle same elements.
    if (oldEl === newEl) {
      newEl && animateElementStyles(newEl, newItem.dataIndex, newSeries);
      return;
    }
    if (
    // We can't use the elements that already being morphed
    oldEl && isElementStillInChart[oldEl.id]) {
      return;
    }
    if (newEl) {
      // TODO: If keep animating the group in case
      // some of the elements don't want to be morphed.
      // TODO Label?
      stopAnimation(newEl);
      if (oldEl) {
        stopAnimation(oldEl);
        // If old element is doing leaving animation. stop it and remove it immediately.
        removeEl(oldEl);
        hasMorphAnimation = true;
        applyMorphAnimation(getPathList(oldEl), getPathList(newEl), newItem.divide, newSeries, newIndex, updateMorphingPathProps);
      } else {
        fadeInElement(newEl, newSeries, newIndex);
      }
    }
    // else keep oldEl leaving animation.
  }
  new DataDiffer["default"](oldDiffItems, newDiffItems, createKeyGetter(true, useId), createKeyGetter(false, useId), null, 'multiple').update(updateOneToOne).updateManyToOne(function (newIndex, oldIndices) {
    var newItem = newDiffItems[newIndex];
    var newData = newItem.data;
    var newSeries = newData.hostModel;
    var newEl = newData.getItemGraphicEl(newItem.dataIndex);
    var oldElsList = (0,util.filter)((0,util.map)(oldIndices, function (idx) {
      return oldDiffItems[idx].data.getItemGraphicEl(oldDiffItems[idx].dataIndex);
    }), function (oldEl) {
      return oldEl && oldEl !== newEl && !isElementStillInChart[oldEl.id];
    });
    if (newEl) {
      stopAnimation(newEl);
      if (oldElsList.length) {
        // If old element is doing leaving animation. stop it and remove it immediately.
        (0,util.each)(oldElsList, function (oldEl) {
          stopAnimation(oldEl);
          removeEl(oldEl);
        });
        hasMorphAnimation = true;
        applyMorphAnimation(getPathList(oldElsList), getPathList(newEl), newItem.divide, newSeries, newIndex, updateMorphingPathProps);
      } else {
        fadeInElement(newEl, newSeries, newItem.dataIndex);
      }
    }
    // else keep oldEl leaving animation.
  }).updateOneToMany(function (newIndices, oldIndex) {
    var oldItem = oldDiffItems[oldIndex];
    var oldEl = oldItem.data.getItemGraphicEl(oldItem.dataIndex);
    // We can't use the elements that already being morphed
    if (oldEl && isElementStillInChart[oldEl.id]) {
      return;
    }
    var newElsList = (0,util.filter)((0,util.map)(newIndices, function (idx) {
      return newDiffItems[idx].data.getItemGraphicEl(newDiffItems[idx].dataIndex);
    }), function (el) {
      return el && el !== oldEl;
    });
    var newSeris = newDiffItems[newIndices[0]].data.hostModel;
    if (newElsList.length) {
      (0,util.each)(newElsList, function (newEl) {
        return stopAnimation(newEl);
      });
      if (oldEl) {
        stopAnimation(oldEl);
        // If old element is doing leaving animation. stop it and remove it immediately.
        removeEl(oldEl);
        hasMorphAnimation = true;
        applyMorphAnimation(getPathList(oldEl), getPathList(newElsList), oldItem.divide,
        // Use divide on old.
        newSeris, newIndices[0], updateMorphingPathProps);
      } else {
        (0,util.each)(newElsList, function (newEl) {
          return fadeInElement(newEl, newSeris, newIndices[0]);
        });
      }
    }
    // else keep oldEl leaving animation.
  }).updateManyToMany(function (newIndices, oldIndices) {
    // If two data are same and both have groupId.
    // Normally they should be diff by id.
    new DataDiffer["default"](oldIndices, newIndices, function (rawIdx) {
      return oldDiffItems[rawIdx].data.getId(oldDiffItems[rawIdx].dataIndex);
    }, function (rawIdx) {
      return newDiffItems[rawIdx].data.getId(newDiffItems[rawIdx].dataIndex);
    }).update(function (newIndex, oldIndex) {
      // Use the original index
      updateOneToOne(newIndices[newIndex], oldIndices[oldIndex]);
    }).execute();
  }).execute();
  if (hasMorphAnimation) {
    (0,util.each)(newList, function (_a) {
      var data = _a.data;
      var seriesModel = data.hostModel;
      var view = seriesModel && api.getViewOfSeriesModel(seriesModel);
      var animationCfg = (0,basicTransition.getAnimationConfig)('update', seriesModel, 0); // use 0 index.
      if (view && seriesModel.isAnimationEnabled() && animationCfg && animationCfg.duration > 0) {
        view.group.traverse(function (el) {
          if (el instanceof Path["default"] && !el.animators.length) {
            // We can't accept there still exists element that has no animation
            // if universalTransition is enabled
            el.animateFrom({
              style: {
                opacity: 0
              }
            }, animationCfg);
          }
        });
      }
    });
  }
}
function getSeriesTransitionKey(series) {
  var seriesKey = series.getModel('universalTransition').get('seriesKey');
  if (!seriesKey) {
    // Use series id by default.
    return series.id;
  }
  return seriesKey;
}
function convertArraySeriesKeyToString(seriesKey) {
  if ((0,util.isArray)(seriesKey)) {
    // Order independent.
    return seriesKey.sort().join(',');
  }
  return seriesKey;
}
function getDivideShapeFromData(data) {
  if (data.hostModel) {
    return data.hostModel.getModel('universalTransition').get('divideShape');
  }
}
function findTransitionSeriesBatches(globalStore, params) {
  var updateBatches = (0,util.createHashMap)();
  var oldDataMap = (0,util.createHashMap)();
  // Map that only store key in array seriesKey.
  // Which is used to query the old data when transition from one to multiple series.
  var oldDataMapForSplit = (0,util.createHashMap)();
  (0,util.each)(globalStore.oldSeries, function (series, idx) {
    var oldDataGroupId = globalStore.oldDataGroupIds[idx];
    var oldData = globalStore.oldData[idx];
    var transitionKey = getSeriesTransitionKey(series);
    var transitionKeyStr = convertArraySeriesKeyToString(transitionKey);
    oldDataMap.set(transitionKeyStr, {
      dataGroupId: oldDataGroupId,
      data: oldData
    });
    if ((0,util.isArray)(transitionKey)) {
      // Same key can't in different array seriesKey.
      (0,util.each)(transitionKey, function (key) {
        oldDataMapForSplit.set(key, {
          key: transitionKeyStr,
          dataGroupId: oldDataGroupId,
          data: oldData
        });
      });
    }
  });
  function checkTransitionSeriesKeyDuplicated(transitionKeyStr) {
    if (updateBatches.get(transitionKeyStr)) {
      (0,log.warn)("Duplicated seriesKey in universalTransition " + transitionKeyStr);
    }
  }
  (0,util.each)(params.updatedSeries, function (series) {
    if (series.isUniversalTransitionEnabled() && series.isAnimationEnabled()) {
      var newDataGroupId = series.get('dataGroupId');
      var newData = series.getData();
      var transitionKey = getSeriesTransitionKey(series);
      var transitionKeyStr = convertArraySeriesKeyToString(transitionKey);
      // Only transition between series with same id.
      var oldData = oldDataMap.get(transitionKeyStr);
      // string transition key is the best match.
      if (oldData) {
        if (true) {
          checkTransitionSeriesKeyDuplicated(transitionKeyStr);
        }
        // TODO check if data is same?
        updateBatches.set(transitionKeyStr, {
          oldSeries: [{
            dataGroupId: oldData.dataGroupId,
            divide: getDivideShapeFromData(oldData.data),
            data: oldData.data
          }],
          newSeries: [{
            dataGroupId: newDataGroupId,
            divide: getDivideShapeFromData(newData),
            data: newData
          }]
        });
      } else {
        // Transition from multiple series.
        // e.g. 'female', 'male' -> ['female', 'male']
        if ((0,util.isArray)(transitionKey)) {
          if (true) {
            checkTransitionSeriesKeyDuplicated(transitionKeyStr);
          }
          var oldSeries_1 = [];
          (0,util.each)(transitionKey, function (key) {
            var oldData = oldDataMap.get(key);
            if (oldData.data) {
              oldSeries_1.push({
                dataGroupId: oldData.dataGroupId,
                divide: getDivideShapeFromData(oldData.data),
                data: oldData.data
              });
            }
          });
          if (oldSeries_1.length) {
            updateBatches.set(transitionKeyStr, {
              oldSeries: oldSeries_1,
              newSeries: [{
                dataGroupId: newDataGroupId,
                data: newData,
                divide: getDivideShapeFromData(newData)
              }]
            });
          }
        } else {
          // Try transition to multiple series.
          // e.g. ['female', 'male'] -> 'female', 'male'
          var oldData_1 = oldDataMapForSplit.get(transitionKey);
          if (oldData_1) {
            var batch = updateBatches.get(oldData_1.key);
            if (!batch) {
              batch = {
                oldSeries: [{
                  dataGroupId: oldData_1.dataGroupId,
                  data: oldData_1.data,
                  divide: getDivideShapeFromData(oldData_1.data)
                }],
                newSeries: []
              };
              updateBatches.set(oldData_1.key, batch);
            }
            batch.newSeries.push({
              dataGroupId: newDataGroupId,
              data: newData,
              divide: getDivideShapeFromData(newData)
            });
          }
        }
      }
    }
  });
  return updateBatches;
}
function querySeries(series, finder) {
  for (var i = 0; i < series.length; i++) {
    var found = finder.seriesIndex != null && finder.seriesIndex === series[i].seriesIndex || finder.seriesId != null && finder.seriesId === series[i].id;
    if (found) {
      return i;
    }
  }
}
function transitionSeriesFromOpt(transitionOpt, globalStore, params, api) {
  var from = [];
  var to = [];
  (0,util.each)((0,util_model.normalizeToArray)(transitionOpt.from), function (finder) {
    var idx = querySeries(globalStore.oldSeries, finder);
    if (idx >= 0) {
      from.push({
        dataGroupId: globalStore.oldDataGroupIds[idx],
        data: globalStore.oldData[idx],
        // TODO can specify divideShape in transition.
        divide: getDivideShapeFromData(globalStore.oldData[idx]),
        groupIdDim: finder.dimension
      });
    }
  });
  (0,util.each)((0,util_model.normalizeToArray)(transitionOpt.to), function (finder) {
    var idx = querySeries(params.updatedSeries, finder);
    if (idx >= 0) {
      var data = params.updatedSeries[idx].getData();
      to.push({
        dataGroupId: globalStore.oldDataGroupIds[idx],
        data: data,
        divide: getDivideShapeFromData(data),
        groupIdDim: finder.dimension
      });
    }
  });
  if (from.length > 0 && to.length > 0) {
    transitionBetween(from, to, api);
  }
}
function installUniversalTransition(registers) {
  registers.registerUpdateLifecycle('series:beforeupdate', function (ecMOdel, api, params) {
    (0,util.each)((0,util_model.normalizeToArray)(params.seriesTransition), function (transOpt) {
      (0,util.each)((0,util_model.normalizeToArray)(transOpt.to), function (finder) {
        var series = params.updatedSeries;
        for (var i = 0; i < series.length; i++) {
          if (finder.seriesIndex != null && finder.seriesIndex === series[i].seriesIndex || finder.seriesId != null && finder.seriesId === series[i].id) {
            series[i][Series.SERIES_UNIVERSAL_TRANSITION_PROP] = true;
          }
        }
      });
    });
  });
  registers.registerUpdateLifecycle('series:transition', function (ecModel, api, params) {
    // TODO api provide an namespace that can save stuff per instance
    var globalStore = getUniversalTransitionGlobalStore(api);
    // TODO multiple to multiple series.
    if (globalStore.oldSeries && params.updatedSeries && params.optionChanged) {
      // TODO transitionOpt was used in an old implementation and can be removed now
      // Use give transition config if its' give;
      var transitionOpt = params.seriesTransition;
      if (transitionOpt) {
        (0,util.each)((0,util_model.normalizeToArray)(transitionOpt), function (opt) {
          transitionSeriesFromOpt(opt, globalStore, params, api);
        });
      } else {
        // Else guess from series based on transition series key.
        var updateBatches_1 = findTransitionSeriesBatches(globalStore, params);
        (0,util.each)(updateBatches_1.keys(), function (key) {
          var batch = updateBatches_1.get(key);
          transitionBetween(batch.oldSeries, batch.newSeries, api);
        });
      }
      // Reset
      (0,util.each)(params.updatedSeries, function (series) {
        // Reset;
        if (series[Series.SERIES_UNIVERSAL_TRANSITION_PROP]) {
          series[Series.SERIES_UNIVERSAL_TRANSITION_PROP] = false;
        }
      });
    }
    // Save all series of current update. Not only the updated one.
    var allSeries = ecModel.getSeries();
    var savedSeries = globalStore.oldSeries = [];
    var savedDataGroupIds = globalStore.oldDataGroupIds = [];
    var savedData = globalStore.oldData = [];
    for (var i = 0; i < allSeries.length; i++) {
      var data = allSeries[i].getData();
      // Only save the data that can have transition.
      // Avoid large data costing too much extra memory
      if (data.count() < DATA_COUNT_THRESHOLD) {
        savedSeries.push(allSeries[i]);
        savedDataGroupIds.push(allSeries[i].get('dataGroupId'));
        savedData.push(data);
      }
    }
  });
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/label/installLabelLayout.js + 1 modules
var installLabelLayout = __webpack_require__(60083);
// EXTERNAL MODULE: ./node_modules/echarts/lib/component/axis/installBreak.js + 1 modules
var installBreak = __webpack_require__(71017);
// EXTERNAL MODULE: ./node_modules/echarts/lib/coord/cartesian/legacyContainLabel.js
var legacyContainLabel = __webpack_require__(91948);
;// CONCATENATED MODULE: ./node_modules/echarts/index.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


// ----------------------------------------------
// All of the modules that are allowed to be
// imported are listed below.
//
// Users MUST NOT import other modules that are
// not included in this list.
// ----------------------------------------------




// -----------------
// Render engines
// -----------------
// Render via Canvas.
// echarts.init(dom, null, { renderer: 'canvas' })
(0,extension.use)([installCanvasRenderer.install]);
// Render via SVG.
// echarts.init(dom, null, { renderer: 'svg' })
(0,extension.use)([installSVGRenderer.install]);
// ----------------
// Charts (series)
// ----------------
// All of the series types, for example:
// chart.setOption({
//     series: [{
//         type: 'line' // or 'bar', 'pie', ...
//     }]
// });
(0,extension.use)([install.install, install_install, pie_install.install, scatter_install.install, radar_install.install, map_install.install, tree_install.install, treemap_install.install, graph_install.install, chord_install_install, gauge_install.install, funnel_install.install, parallel_install.install, sankey_install.install, boxplot_install_install, candlestick_install_install, effectScatter_install.install, lines_install.install, heatmap_install.install, installPictorialBar_install, themeRiver_install.install, sunburst_install.install, custom_install_install]);
// -------------------
// Coordinate systems
// -------------------
// All of the axis modules have been included in the
// coordinate system module below, do not need to
// make extra import.
// `cartesian` coordinate system. For some historical
// reasons, it is named as grid, for example:
// chart.setOption({
//     grid: {...},
//     xAxis: {...},
//     yAxis: {...},
//     series: [{...}]
// });
(0,extension.use)(grid_install.install);
// `polar` coordinate system, for example:
// chart.setOption({
//     polar: {...},
//     radiusAxis: {...},
//     angleAxis: {...},
//     series: [{
//         coordinateSystem: 'polar'
//     }]
// });
(0,extension.use)(polar_install.install);
// `geo` coordinate system, for example:
// chart.setOption({
//     geo: {...},
//     series: [{
//         coordinateSystem: 'geo'
//     }]
// });
(0,extension.use)(geo_install.install);
// `singleAxis` coordinate system (notice, it is a coordinate system
// with only one axis, work for chart like theme river), for example:
// chart.setOption({
//     singleAxis: {...}
//     series: [{type: 'themeRiver', ...}]
// });
(0,extension.use)(singleAxis_install.install);
// `parallel` coordinate system, only work for parallel series, for example:
// chart.setOption({
//     parallel: {...},
//     parallelAxis: [{...}, ...],
//     series: [{
//         type: 'parallel'
//     }]
// });
(0,extension.use)(component_parallel_install.install);
// `calendar` coordinate system. for example,
// chart.setOption({
//     calendar: {...},
//     series: [{
//         coordinateSystem: 'calendar'
//     }]
// );
(0,extension.use)(calendar_install.install);
// `matrix` coordinate system. for example,
// chart.setOption({
//     matrix: {...},
//     series: [{
//         coordinateSystem: 'matrix'
//     }]
// );
(0,extension.use)(matrix_install.install);
// ------------------
// Other components
// ------------------
// `graphic` component, for example:
// chart.setOption({
//     graphic: {...}
// });
(0,extension.use)(graphic_install.install);
// `toolbox` component, for example:
// chart.setOption({
//     toolbox: {...}
// });
(0,extension.use)(toolbox_install.install);
// `tooltip` component, for example:
// chart.setOption({
//     tooltip: {...}
// });
(0,extension.use)(tooltip_install.install);
// `axisPointer` component, for example:
// chart.setOption({
//     tooltip: {axisPointer: {...}, ...}
// });
// Or
// chart.setOption({
//     axisPointer: {...}
// });
(0,extension.use)(axisPointer_install.install);
// `brush` component, for example:
// chart.setOption({
//     brush: {...}
// });
// Or
// chart.setOption({
//     tooltip: {feature: {brush: {...}}
// })
(0,extension.use)(brush_install.install);
// `title` component, for example:
// chart.setOption({
//     title: {...}
// });
(0,extension.use)(title_install.install);
// `timeline` component, for example:
// chart.setOption({
//     timeline: {...}
// });
(0,extension.use)(timeline_install.install);
// `markPoint` component, for example:
// chart.setOption({
//     series: [{markPoint: {...}}]
// });
(0,extension.use)(installMarkPoint.install);
// `markLine` component, for example:
// chart.setOption({
//     series: [{markLine: {...}}]
// });
(0,extension.use)(installMarkLine.install);
// `markArea` component, for example:
// chart.setOption({
//     series: [{markArea: {...}}]
// });
(0,extension.use)(installMarkArea.install);
// `legend` component not scrollable. for example:
// chart.setOption({
//     legend: {...}
// });
(0,extension.use)(legend_install.install);
// `dataZoom` component including both `dataZoomInside` and `dataZoomSlider`.
(0,extension.use)(dataZoom_install.install);
// `dataZoom` component providing drag, pinch, wheel behaviors
// inside coordinate system, for example:
// chart.setOption({
//     dataZoom: {type: 'inside'}
// });
(0,extension.use)(installDataZoomInside.install);
// `dataZoom` component providing a slider bar, for example:
// chart.setOption({
//     dataZoom: {type: 'slider'}
// });
(0,extension.use)(installDataZoomSlider.install);
// `visualMap` component including both `visualMapContinuous` and `visualMapPiecewise`.
(0,extension.use)(visualMap_install.install);
// `visualMap` component providing continuous bar, for example:
// chart.setOption({
//     visualMap: {type: 'continuous'}
// });
(0,extension.use)(installVisualMapContinuous.install);
// `visualMap` component providing pieces bar, for example:
// chart.setOption({
//     visualMap: {type: 'piecewise'}
// });
(0,extension.use)(installVisualMapPiecewise.install);
(0,extension.use)(thumbnail_install.install);
// `aria` component providing aria, for example:
// chart.setOption({
//     aria: {...}
// });
(0,extension.use)(aria_install.install);
// dataset transform
// chart.setOption({
//     dataset: {
//          transform: []
//     }
// });
(0,extension.use)(transform_install.install);
(0,extension.use)(dataset_install.install);
// universal transition
// chart.setOption({
//     series: {
//         universalTransition: { enabled: true }
//     }
// })
(0,extension.use)(installUniversalTransition);
// label layout
// chart.setOption({
//     series: {
//         labelLayout: { hideOverlap: true }
//     }
// })
(0,extension.use)(installLabelLayout.installLabelLayout);
(0,extension.use)(installBreak.installAxisBreak);
(0,extension.use)(legacyContainLabel.installLegacyGridContainLabel);
(0,extension.use)(scatter_install.installScatterJitter);

}),
5638: (function (__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getAnimationConfig: function() { return getAnimationConfig; },
  getOldStyle: function() { return getOldStyle; },
  initProps: function() { return initProps; },
  isElementRemoved: function() { return isElementRemoved; },
  removeElement: function() { return removeElement; },
  removeElementWithFadeOut: function() { return removeElementWithFadeOut; },
  saveOldStyle: function() { return saveOldStyle; },
  transitionStore: function() { return transitionStore; },
  updateProps: function() { return updateProps; }
});
/* import */ var zrender_lib_core_util_js__rspack_import_1 = __webpack_require__(98026);
/* import */ var _util_model_js__rspack_import_0 = __webpack_require__(48170);

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


// Stored properties for further transition.
var transitionStore = (0,_util_model_js__rspack_import_0.makeInner)();
/**
 * Return null if animation is disabled.
 */
function getAnimationConfig(animationType, animatableModel, dataIndex,
// Extra opts can override the option in animatable model.
extraOpts,
// TODO It's only for pictorial bar now.
extraDelayParams) {
  var animationPayload;
  // Check if there is global animation configuration from dataZoom/resize can override the config in option.
  // If animation is enabled. Will use this animation config in payload.
  // If animation is disabled. Just ignore it.
  if (animatableModel && animatableModel.ecModel) {
    var updatePayload = animatableModel.ecModel.getUpdatePayload();
    animationPayload = updatePayload && updatePayload.animation;
  }
  var animationEnabled = animatableModel && animatableModel.isAnimationEnabled();
  var isUpdate = animationType === 'update';
  if (animationEnabled) {
    var duration = void 0;
    var easing = void 0;
    var delay = void 0;
    if (extraOpts) {
      duration = (0,zrender_lib_core_util_js__rspack_import_1.retrieve2)(extraOpts.duration, 200);
      easing = (0,zrender_lib_core_util_js__rspack_import_1.retrieve2)(extraOpts.easing, 'cubicOut');
      delay = 0;
    } else {
      duration = animatableModel.getShallow(isUpdate ? 'animationDurationUpdate' : 'animationDuration');
      easing = animatableModel.getShallow(isUpdate ? 'animationEasingUpdate' : 'animationEasing');
      delay = animatableModel.getShallow(isUpdate ? 'animationDelayUpdate' : 'animationDelay');
    }
    // animation from payload has highest priority.
    if (animationPayload) {
      animationPayload.duration != null && (duration = animationPayload.duration);
      animationPayload.easing != null && (easing = animationPayload.easing);
      animationPayload.delay != null && (delay = animationPayload.delay);
    }
    if ((0,zrender_lib_core_util_js__rspack_import_1.isFunction)(delay)) {
      delay = delay(dataIndex, extraDelayParams);
    }
    if ((0,zrender_lib_core_util_js__rspack_import_1.isFunction)(duration)) {
      duration = duration(dataIndex);
    }
    var config = {
      duration: duration || 0,
      delay: delay,
      easing: easing
    };
    return config;
  } else {
    return null;
  }
}
function animateOrSetProps(animationType, el, props, animatableModel, dataIndex, cb, during) {
  var isFrom = false;
  var removeOpt;
  if ((0,zrender_lib_core_util_js__rspack_import_1.isFunction)(dataIndex)) {
    during = cb;
    cb = dataIndex;
    dataIndex = null;
  } else if ((0,zrender_lib_core_util_js__rspack_import_1.isObject)(dataIndex)) {
    cb = dataIndex.cb;
    during = dataIndex.during;
    isFrom = dataIndex.isFrom;
    removeOpt = dataIndex.removeOpt;
    dataIndex = dataIndex.dataIndex;
  }
  var isRemove = animationType === 'leave';
  if (!isRemove) {
    // Must stop the remove animation.
    el.stopAnimation('leave');
  }
  var animationConfig = getAnimationConfig(animationType, animatableModel, dataIndex, isRemove ? removeOpt || {} : null, animatableModel && animatableModel.getAnimationDelayParams ? animatableModel.getAnimationDelayParams(el, dataIndex) : null);
  if (animationConfig && animationConfig.duration > 0) {
    var duration = animationConfig.duration;
    var animationDelay = animationConfig.delay;
    var animationEasing = animationConfig.easing;
    var animateConfig = {
      duration: duration,
      delay: animationDelay || 0,
      easing: animationEasing,
      done: cb,
      force: !!cb || !!during,
      // Set to final state in update/init animation.
      // So the post processing based on the path shape can be done correctly.
      setToFinal: !isRemove,
      scope: animationType,
      during: during
    };
    isFrom ? el.animateFrom(props, animateConfig) : el.animateTo(props, animateConfig);
  } else {
    el.stopAnimation();
    // If `isFrom`, the props is the "from" props.
    !isFrom && el.attr(props);
    // Call during at least once.
    during && during(1);
    cb && cb();
  }
}
/**
 * Update graphic element properties with or without animation according to the
 * configuration in series.
 *
 * Caution: this method will stop previous animation.
 * So do not use this method to one element twice before
 * animation starts, unless you know what you are doing.
 * @example
 *     graphic.updateProps(el, {
 *         position: [100, 100]
 *     }, seriesModel, dataIndex, function () { console.log('Animation done!'); });
 *     // Or
 *     graphic.updateProps(el, {
 *         position: [100, 100]
 *     }, seriesModel, function () { console.log('Animation done!'); });
 */
function updateProps(el, props,
// TODO: TYPE AnimatableModel
animatableModel, dataIndex, cb, during) {
  animateOrSetProps('update', el, props, animatableModel, dataIndex, cb, during);
}

/**
 * Init graphic element properties with or without animation according to the
 * configuration in series.
 *
 * Caution: this method will stop previous animation.
 * So do not use this method to one element twice before
 * animation starts, unless you know what you are doing.
 */
function initProps(el, props, animatableModel, dataIndex, cb, during) {
  animateOrSetProps('enter', el, props, animatableModel, dataIndex, cb, during);
}
/**
 * If element is removed.
 * It can determine if element is having remove animation.
 */
function isElementRemoved(el) {
  if (!el.__zr) {
    return true;
  }
  for (var i = 0; i < el.animators.length; i++) {
    var animator = el.animators[i];
    if (animator.scope === 'leave') {
      return true;
    }
  }
  return false;
}
/**
 * Remove graphic element
 */
function removeElement(el, props, animatableModel, dataIndex, cb, during) {
  // Don't do remove animation twice.
  if (isElementRemoved(el)) {
    return;
  }
  animateOrSetProps('leave', el, props, animatableModel, dataIndex, cb, during);
}
function fadeOutDisplayable(el, animatableModel, dataIndex, done) {
  el.removeTextContent();
  el.removeTextGuideLine();
  removeElement(el, {
    style: {
      opacity: 0
    }
  }, animatableModel, dataIndex, done);
}
function removeElementWithFadeOut(el, animatableModel, dataIndex) {
  function doRemove() {
    el.parent && el.parent.remove(el);
  }
  // Hide label and labelLine first
  // TODO Also use fade out animation?
  if (!el.isGroup) {
    fadeOutDisplayable(el, animatableModel, dataIndex, doRemove);
  } else {
    el.traverse(function (disp) {
      if (!disp.isGroup) {
        // Can invoke doRemove multiple times.
        fadeOutDisplayable(disp, animatableModel, dataIndex, doRemove);
      }
    });
  }
}
/**
 * Save old style for style transition in universalTransition module.
 * It's used when element will be reused in each render.
 * For chart like map, heatmap, which will always create new element.
 * We don't need to save this because universalTransition can get old style from the old element
 */
function saveOldStyle(el) {
  transitionStore(el).oldStyle = el.style;
}
function getOldStyle(el) {
  return transitionStore(el).oldStyle;
}

}),
92606: (function (__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  applyKeyframeAnimation: function() { return applyKeyframeAnimation; },
  stopPreviousKeyframeAnimationAndRestore: function() { return stopPreviousKeyframeAnimationAndRestore; }
});
/* import */ var zrender_lib_core_util_js__rspack_import_1 = __webpack_require__(98026);
/* import */ var _customGraphicTransition_js__rspack_import_3 = __webpack_require__(57625);
/* import */ var _basicTransition_js__rspack_import_2 = __webpack_require__(5638);
/* import */ var _util_log_js__rspack_import_4 = __webpack_require__(41025);
/* import */ var _util_model_js__rspack_import_0 = __webpack_require__(48170);

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/





var getStateToRestore = (0,_util_model_js__rspack_import_0.makeInner)();
var KEYFRAME_EXCLUDE_KEYS = ['percent', 'easing', 'shape', 'style', 'extra'];
/**
 * Stop previous keyframe animation and restore the attributes.
 * Avoid new keyframe animation starts with wrong internal state when the percent: 0 is not set.
 */
function stopPreviousKeyframeAnimationAndRestore(el) {
  // Stop previous keyframe animation.
  el.stopAnimation('keyframe');
  // Restore
  el.attr(getStateToRestore(el));
}
function applyKeyframeAnimation(el, animationOpts, animatableModel) {
  if (!animatableModel.isAnimationEnabled() || !animationOpts) {
    return;
  }
  if ((0,zrender_lib_core_util_js__rspack_import_1.isArray)(animationOpts)) {
    (0,zrender_lib_core_util_js__rspack_import_1.each)(animationOpts, function (singleAnimationOpts) {
      applyKeyframeAnimation(el, singleAnimationOpts, animatableModel);
    });
    return;
  }
  var keyframes = animationOpts.keyframes;
  var duration = animationOpts.duration;
  if (animatableModel && duration == null) {
    // Default to use duration of config.
    // NOTE: animation config from payload will be ignored because they are mainly for transitions.
    var config = (0,_basicTransition_js__rspack_import_2.getAnimationConfig)('enter', animatableModel, 0);
    duration = config && config.duration;
  }
  if (!keyframes || !duration) {
    return;
  }
  var stateToRestore = getStateToRestore(el);
  (0,zrender_lib_core_util_js__rspack_import_1.each)(_customGraphicTransition_js__rspack_import_3.ELEMENT_ANIMATABLE_PROPS, function (targetPropName) {
    if (targetPropName && !el[targetPropName]) {
      return;
    }
    var animator;
    var endFrameIsSet = false;
    // Sort keyframes by percent.
    keyframes.sort(function (a, b) {
      return a.percent - b.percent;
    });
    (0,zrender_lib_core_util_js__rspack_import_1.each)(keyframes, function (kf) {
      // Stop current animation.
      var animators = el.animators;
      var kfValues = targetPropName ? kf[targetPropName] : kf;
      if (true) {
        if (kf.percent >= 1) {
          endFrameIsSet = true;
        }
      }
      if (!kfValues) {
        return;
      }
      var propKeys = (0,zrender_lib_core_util_js__rspack_import_1.keys)(kfValues);
      if (!targetPropName) {
        // PENDING performance?
        propKeys = (0,zrender_lib_core_util_js__rspack_import_1.filter)(propKeys, function (key) {
          return (0,zrender_lib_core_util_js__rspack_import_1.indexOf)(KEYFRAME_EXCLUDE_KEYS, key) < 0;
        });
      }
      if (!propKeys.length) {
        return;
      }
      if (!animator) {
        animator = el.animate(targetPropName, animationOpts.loop, true);
        animator.scope = 'keyframe';
      }
      for (var i = 0; i < animators.length; i++) {
        // Stop all other animation that is not keyframe.
        if (animators[i] !== animator && animators[i].targetName === animator.targetName) {
          animators[i].stopTracks(propKeys);
        }
      }
      targetPropName && (stateToRestore[targetPropName] = stateToRestore[targetPropName] || {});
      var savedTarget = targetPropName ? stateToRestore[targetPropName] : stateToRestore;
      (0,zrender_lib_core_util_js__rspack_import_1.each)(propKeys, function (key) {
        // Save original value.
        savedTarget[key] = ((targetPropName ? el[targetPropName] : el) || {})[key];
      });
      animator.whenWithKeys(duration * kf.percent, kfValues, propKeys, kf.easing);
    });
    if (!animator) {
      return;
    }
    if (true) {
      if (!endFrameIsSet) {
        (0,_util_log_js__rspack_import_4.warn)('End frame with percent: 1 is missing in the keyframeAnimation.', true);
      }
    }
    animator.delay(animationOpts.delay || 0).duration(duration).start(animationOpts.easing);
  });
}

}),
57625: (function (__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ELEMENT_ANIMATABLE_PROPS: function() { return ELEMENT_ANIMATABLE_PROPS; },
  applyLeaveTransition: function() { return applyLeaveTransition; },
  applyUpdateTransition: function() { return applyUpdateTransition; },
  isTransitionAll: function() { return isTransitionAll; },
  updateLeaveTo: function() { return updateLeaveTo; }
});
/* import */ var _util_model_js__rspack_import_2 = __webpack_require__(48170);
/* import */ var zrender_lib_core_util_js__rspack_import_0 = __webpack_require__(98026);
/* import */ var zrender_lib_animation_Animator_js__rspack_import_7 = __webpack_require__(18565);
/* import */ var zrender_lib_graphic_Displayable_js__rspack_import_4 = __webpack_require__(71519);
/* import */ var _basicTransition_js__rspack_import_3 = __webpack_require__(5638);
/* import */ var _util_graphic_js__rspack_import_5 = __webpack_require__(18149);
/* import */ var _util_log_js__rspack_import_6 = __webpack_require__(41025);
/* import */ var zrender_lib_core_Transformable_js__rspack_import_1 = __webpack_require__(92836);

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/








var LEGACY_TRANSFORM_PROPS_MAP = {
  position: ['x', 'y'],
  scale: ['scaleX', 'scaleY'],
  origin: ['originX', 'originY']
};
var LEGACY_TRANSFORM_PROPS = (0,zrender_lib_core_util_js__rspack_import_0.keys)(LEGACY_TRANSFORM_PROPS_MAP);
var TRANSFORM_PROPS_MAP = (0,zrender_lib_core_util_js__rspack_import_0.reduce)(zrender_lib_core_Transformable_js__rspack_import_1.TRANSFORMABLE_PROPS, function (obj, key) {
  obj[key] = 1;
  return obj;
}, {});
var transformPropNamesStr = zrender_lib_core_Transformable_js__rspack_import_1.TRANSFORMABLE_PROPS.join(', ');
// '' means root
var ELEMENT_ANIMATABLE_PROPS = ['', 'style', 'shape', 'extra'];
;
var transitionInnerStore = (0,_util_model_js__rspack_import_2.makeInner)();
;
function getElementAnimationConfig(animationType, el, elOption, parentModel, dataIndex) {
  var animationProp = animationType + "Animation";
  var config = (0,_basicTransition_js__rspack_import_3.getAnimationConfig)(animationType, parentModel, dataIndex) || {};
  var userDuring = transitionInnerStore(el).userDuring;
  // Only set when duration is > 0 and it's need to be animated.
  if (config.duration > 0) {
    // For simplicity, if during not specified, the previous during will not work any more.
    config.during = userDuring ? (0,zrender_lib_core_util_js__rspack_import_0.bind)(duringCall, {
      el: el,
      userDuring: userDuring
    }) : null;
    config.setToFinal = true;
    config.scope = animationType;
  }
  (0,zrender_lib_core_util_js__rspack_import_0.extend)(config, elOption[animationProp]);
  return config;
}
function applyUpdateTransition(el, elOption, animatableModel, opts) {
  opts = opts || {};
  var dataIndex = opts.dataIndex,
    isInit = opts.isInit,
    clearStyle = opts.clearStyle;
  var hasAnimation = animatableModel.isAnimationEnabled();
  // Save the meta info for further morphing. Like apply on the sub morphing elements.
  var store = transitionInnerStore(el);
  var styleOpt = elOption.style;
  store.userDuring = elOption.during;
  var transFromProps = {};
  var propsToSet = {};
  prepareTransformAllPropsFinal(el, elOption, propsToSet);
  if (el.type === 'compound') {
    /**
     * We cannot directly clone shape for compoundPath,
     * because it makes the path to be an object instead of a Path instance,
     * and thus missing `buildPath` method.
     */
    var paths = el.shape.paths;
    var optionPaths = elOption.shape.paths;
    for (var i = 0; i < optionPaths.length; i++) {
      var path = optionPaths[i];
      prepareShapeOrExtraAllPropsFinal('shape', path, paths[i]);
    }
  } else {
    prepareShapeOrExtraAllPropsFinal('shape', elOption, propsToSet);
    prepareShapeOrExtraAllPropsFinal('extra', elOption, propsToSet);
  }
  if (!isInit && hasAnimation) {
    prepareTransformTransitionFrom(el, elOption, transFromProps);
    prepareShapeOrExtraTransitionFrom('shape', el, elOption, transFromProps);
    prepareShapeOrExtraTransitionFrom('extra', el, elOption, transFromProps);
    prepareStyleTransitionFrom(el, elOption, styleOpt, transFromProps);
  }
  propsToSet.style = styleOpt;
  applyPropsDirectly(el, propsToSet, clearStyle);
  applyMiscProps(el, elOption);
  if (hasAnimation) {
    if (isInit) {
      var enterFromProps_1 = {};
      (0,zrender_lib_core_util_js__rspack_import_0.each)(ELEMENT_ANIMATABLE_PROPS, function (propName) {
        var prop = propName ? elOption[propName] : elOption;
        if (prop && prop.enterFrom) {
          if (propName) {
            enterFromProps_1[propName] = enterFromProps_1[propName] || {};
          }
          (0,zrender_lib_core_util_js__rspack_import_0.extend)(propName ? enterFromProps_1[propName] : enterFromProps_1, prop.enterFrom);
        }
      });
      var config = getElementAnimationConfig('enter', el, elOption, animatableModel, dataIndex);
      if (config.duration > 0) {
        el.animateFrom(enterFromProps_1, config);
      }
    } else {
      applyPropsTransition(el, elOption, dataIndex || 0, animatableModel, transFromProps);
    }
  }
  // Store leave to be used in leave transition.
  updateLeaveTo(el, elOption);
  styleOpt ? el.dirty() : el.markRedraw();
}
function updateLeaveTo(el, elOption) {
  // Try merge to previous set leaveTo
  var leaveToProps = transitionInnerStore(el).leaveToProps;
  for (var i = 0; i < ELEMENT_ANIMATABLE_PROPS.length; i++) {
    var propName = ELEMENT_ANIMATABLE_PROPS[i];
    var prop = propName ? elOption[propName] : elOption;
    if (prop && prop.leaveTo) {
      if (!leaveToProps) {
        leaveToProps = transitionInnerStore(el).leaveToProps = {};
      }
      if (propName) {
        leaveToProps[propName] = leaveToProps[propName] || {};
      }
      (0,zrender_lib_core_util_js__rspack_import_0.extend)(propName ? leaveToProps[propName] : leaveToProps, prop.leaveTo);
    }
  }
}
function applyLeaveTransition(el, elOption, animatableModel, onRemove) {
  if (el) {
    var parent_1 = el.parent;
    var leaveToProps = transitionInnerStore(el).leaveToProps;
    if (leaveToProps) {
      // TODO TODO use leave after leaveAnimation in series is introduced
      // TODO Data index?
      var config = getElementAnimationConfig('update', el, elOption, animatableModel, 0);
      config.done = function () {
        parent_1 && parent_1.remove(el);
        onRemove && onRemove();
      };
      el.animateTo(leaveToProps, config);
    } else {
      parent_1 && parent_1.remove(el);
      onRemove && onRemove();
    }
  }
}
function isTransitionAll(transition) {
  return transition === 'all';
}
function applyPropsDirectly(el,
// Can be null/undefined
allPropsFinal, clearStyle) {
  var styleOpt = allPropsFinal.style;
  if (!el.isGroup && styleOpt) {
    if (clearStyle) {
      el.useStyle({});
      // When style object changed, how to trade the existing animation?
      // It is probably complicated and not needed to cover all the cases.
      // But still need consider the case:
      // (1) When using init animation on `style.opacity`, and before the animation
      //     ended users triggers an update by mousewhel. At that time the init
      //     animation should better be continued rather than terminated.
      //     So after `useStyle` called, we should change the animation target manually
      //     to continue the effect of the init animation.
      // (2) PENDING: If the previous animation targeted at a `val1`, and currently we need
      //     to update the value to `val2` and no animation declared, should be terminate
      //     the previous animation or just modify the target of the animation?
      //     Therotically That will happen not only on `style` but also on `shape` and
      //     `transfrom` props. But we haven't handle this case at present yet.
      // (3) PENDING: Is it proper to visit `animators` and `targetName`?
      var animators = el.animators;
      for (var i = 0; i < animators.length; i++) {
        var animator = animators[i];
        // targetName is the "topKey".
        if (animator.targetName === 'style') {
          animator.changeTarget(el.style);
        }
      }
    }
    el.setStyle(styleOpt);
  }
  if (allPropsFinal) {
    // Not set style here.
    allPropsFinal.style = null;
    // Set el to the final state firstly.
    allPropsFinal && el.attr(allPropsFinal);
    allPropsFinal.style = styleOpt;
  }
}
function applyPropsTransition(el, elOption, dataIndex, model,
// Can be null/undefined
transFromProps) {
  if (transFromProps) {
    var config = getElementAnimationConfig('update', el, elOption, model, dataIndex);
    if (config.duration > 0) {
      el.animateFrom(transFromProps, config);
    }
  }
}
function applyMiscProps(el, elOption) {
  // Merge by default.
  (0,zrender_lib_core_util_js__rspack_import_0.hasOwn)(elOption, 'silent') && (el.silent = elOption.silent);
  (0,zrender_lib_core_util_js__rspack_import_0.hasOwn)(elOption, 'ignore') && (el.ignore = elOption.ignore);
  if (el instanceof zrender_lib_graphic_Displayable_js__rspack_import_4["default"]) {
    (0,zrender_lib_core_util_js__rspack_import_0.hasOwn)(elOption, 'invisible') && (el.invisible = elOption.invisible);
  }
  if (el instanceof _util_graphic_js__rspack_import_5["default"]) {
    (0,zrender_lib_core_util_js__rspack_import_0.hasOwn)(elOption, 'autoBatch') && (el.autoBatch = elOption.autoBatch);
  }
}
// Use it to avoid it be exposed to user.
var tmpDuringScope = {};
var transitionDuringAPI = {
  // Usually other props do not need to be changed in animation during.
  setTransform: function (key, val) {
    if (true) {
      (0,zrender_lib_core_util_js__rspack_import_0.assert)((0,zrender_lib_core_util_js__rspack_import_0.hasOwn)(TRANSFORM_PROPS_MAP, key), 'Only ' + transformPropNamesStr + ' available in `setTransform`.');
    }
    tmpDuringScope.el[key] = val;
    return this;
  },
  getTransform: function (key) {
    if (true) {
      (0,zrender_lib_core_util_js__rspack_import_0.assert)((0,zrender_lib_core_util_js__rspack_import_0.hasOwn)(TRANSFORM_PROPS_MAP, key), 'Only ' + transformPropNamesStr + ' available in `getTransform`.');
    }
    return tmpDuringScope.el[key];
  },
  setShape: function (key, val) {
    if (true) {
      assertNotReserved(key);
    }
    var el = tmpDuringScope.el;
    var shape = el.shape || (el.shape = {});
    shape[key] = val;
    el.dirtyShape && el.dirtyShape();
    return this;
  },
  getShape: function (key) {
    if (true) {
      assertNotReserved(key);
    }
    var shape = tmpDuringScope.el.shape;
    if (shape) {
      return shape[key];
    }
  },
  setStyle: function (key, val) {
    if (true) {
      assertNotReserved(key);
    }
    var el = tmpDuringScope.el;
    var style = el.style;
    if (style) {
      if (true) {
        if ((0,zrender_lib_core_util_js__rspack_import_0.eqNaN)(val)) {
          (0,_util_log_js__rspack_import_6.warn)('style.' + key + ' must not be assigned with NaN.');
        }
      }
      style[key] = val;
      el.dirtyStyle && el.dirtyStyle();
    }
    return this;
  },
  getStyle: function (key) {
    if (true) {
      assertNotReserved(key);
    }
    var style = tmpDuringScope.el.style;
    if (style) {
      return style[key];
    }
  },
  setExtra: function (key, val) {
    if (true) {
      assertNotReserved(key);
    }
    var extra = tmpDuringScope.el.extra || (tmpDuringScope.el.extra = {});
    extra[key] = val;
    return this;
  },
  getExtra: function (key) {
    if (true) {
      assertNotReserved(key);
    }
    var extra = tmpDuringScope.el.extra;
    if (extra) {
      return extra[key];
    }
  }
};
function assertNotReserved(key) {
  if (true) {
    if (key === 'transition' || key === 'enterFrom' || key === 'leaveTo') {
      throw new Error('key must not be "' + key + '"');
    }
  }
}
function duringCall() {
  // Do not provide "percent" until some requirements come.
  // Because consider thies case:
  // enterFrom: {x: 100, y: 30}, transition: 'x'.
  // And enter duration is different from update duration.
  // Thus it might be confused about the meaning of "percent" in during callback.
  var scope = this;
  var el = scope.el;
  if (!el) {
    return;
  }
  // If el is remove from zr by reason like legend, during still need to called,
  // because el will be added back to zr and the prop value should not be incorrect.
  var latestUserDuring = transitionInnerStore(el).userDuring;
  var scopeUserDuring = scope.userDuring;
  // Ensured a during is only called once in each animation frame.
  // If a during is called multiple times in one frame, maybe some users' calculation logic
  // might be wrong (not sure whether this usage exists).
  // The case of a during might be called twice can be: by default there is a animator for
  // 'x', 'y' when init. Before the init animation finished, call `setOption` to start
  // another animators for 'style'/'shape'/'extra'.
  if (latestUserDuring !== scopeUserDuring) {
    // release
    scope.el = scope.userDuring = null;
    return;
  }
  tmpDuringScope.el = el;
  // Give no `this` to user in "during" calling.
  scopeUserDuring(transitionDuringAPI);
  // FIXME: if in future meet the case that some prop will be both modified in `during` and `state`,
  // consider the issue that the prop might be incorrect when return to "normal" state.
}
function prepareShapeOrExtraTransitionFrom(mainAttr, fromEl, elOption, transFromProps) {
  var attrOpt = elOption[mainAttr];
  if (!attrOpt) {
    return;
  }
  var elPropsInAttr = fromEl[mainAttr];
  var transFromPropsInAttr;
  if (elPropsInAttr) {
    var transition = elOption.transition;
    var attrTransition = attrOpt.transition;
    if (attrTransition) {
      !transFromPropsInAttr && (transFromPropsInAttr = transFromProps[mainAttr] = {});
      if (isTransitionAll(attrTransition)) {
        (0,zrender_lib_core_util_js__rspack_import_0.extend)(transFromPropsInAttr, elPropsInAttr);
      } else {
        var transitionKeys = (0,_util_model_js__rspack_import_2.normalizeToArray)(attrTransition);
        for (var i = 0; i < transitionKeys.length; i++) {
          var key = transitionKeys[i];
          var elVal = elPropsInAttr[key];
          transFromPropsInAttr[key] = elVal;
        }
      }
    } else if (isTransitionAll(transition) || (0,zrender_lib_core_util_js__rspack_import_0.indexOf)(transition, mainAttr) >= 0) {
      !transFromPropsInAttr && (transFromPropsInAttr = transFromProps[mainAttr] = {});
      var elPropsInAttrKeys = (0,zrender_lib_core_util_js__rspack_import_0.keys)(elPropsInAttr);
      for (var i = 0; i < elPropsInAttrKeys.length; i++) {
        var key = elPropsInAttrKeys[i];
        var elVal = elPropsInAttr[key];
        if (isNonStyleTransitionEnabled(attrOpt[key], elVal)) {
          transFromPropsInAttr[key] = elVal;
        }
      }
    }
  }
}
function prepareShapeOrExtraAllPropsFinal(mainAttr, elOption, allProps) {
  var attrOpt = elOption[mainAttr];
  if (!attrOpt) {
    return;
  }
  var allPropsInAttr = allProps[mainAttr] = {};
  var keysInAttr = (0,zrender_lib_core_util_js__rspack_import_0.keys)(attrOpt);
  for (var i = 0; i < keysInAttr.length; i++) {
    var key = keysInAttr[i];
    // To avoid share one object with different element, and
    // to avoid user modify the object inexpectedly, have to clone.
    allPropsInAttr[key] = (0,zrender_lib_animation_Animator_js__rspack_import_7.cloneValue)(attrOpt[key]);
  }
}
function prepareTransformTransitionFrom(el, elOption, transFromProps) {
  var transition = elOption.transition;
  var transitionKeys = isTransitionAll(transition) ? zrender_lib_core_Transformable_js__rspack_import_1.TRANSFORMABLE_PROPS : (0,_util_model_js__rspack_import_2.normalizeToArray)(transition || []);
  for (var i = 0; i < transitionKeys.length; i++) {
    var key = transitionKeys[i];
    if (key === 'style' || key === 'shape' || key === 'extra') {
      continue;
    }
    var elVal = el[key];
    if (true) {
      checkTransformPropRefer(key, 'el.transition');
    }
    // Do not clone, animator will perform that clone.
    transFromProps[key] = elVal;
  }
}
function prepareTransformAllPropsFinal(el, elOption, allProps) {
  for (var i = 0; i < LEGACY_TRANSFORM_PROPS.length; i++) {
    var legacyName = LEGACY_TRANSFORM_PROPS[i];
    var xyName = LEGACY_TRANSFORM_PROPS_MAP[legacyName];
    var legacyArr = elOption[legacyName];
    if (legacyArr) {
      allProps[xyName[0]] = legacyArr[0];
      allProps[xyName[1]] = legacyArr[1];
    }
  }
  for (var i = 0; i < zrender_lib_core_Transformable_js__rspack_import_1.TRANSFORMABLE_PROPS.length; i++) {
    var key = zrender_lib_core_Transformable_js__rspack_import_1.TRANSFORMABLE_PROPS[i];
    if (elOption[key] != null) {
      allProps[key] = elOption[key];
    }
  }
}
function prepareStyleTransitionFrom(fromEl, elOption, styleOpt, transFromProps) {
  if (!styleOpt) {
    return;
  }
  var fromElStyle = fromEl.style;
  var transFromStyleProps;
  if (fromElStyle) {
    var styleTransition = styleOpt.transition;
    var elTransition = elOption.transition;
    if (styleTransition && !isTransitionAll(styleTransition)) {
      var transitionKeys = (0,_util_model_js__rspack_import_2.normalizeToArray)(styleTransition);
      !transFromStyleProps && (transFromStyleProps = transFromProps.style = {});
      for (var i = 0; i < transitionKeys.length; i++) {
        var key = transitionKeys[i];
        var elVal = fromElStyle[key];
        // Do not clone, see `checkNonStyleTansitionRefer`.
        transFromStyleProps[key] = elVal;
      }
    } else if (fromEl.getAnimationStyleProps && (isTransitionAll(elTransition) || isTransitionAll(styleTransition) || (0,zrender_lib_core_util_js__rspack_import_0.indexOf)(elTransition, 'style') >= 0)) {
      var animationProps = fromEl.getAnimationStyleProps();
      var animationStyleProps = animationProps ? animationProps.style : null;
      if (animationStyleProps) {
        !transFromStyleProps && (transFromStyleProps = transFromProps.style = {});
        var styleKeys = (0,zrender_lib_core_util_js__rspack_import_0.keys)(styleOpt);
        for (var i = 0; i < styleKeys.length; i++) {
          var key = styleKeys[i];
          if (animationStyleProps[key]) {
            var elVal = fromElStyle[key];
            transFromStyleProps[key] = elVal;
          }
        }
      }
    }
  }
}
function isNonStyleTransitionEnabled(optVal, elVal) {
  // The same as `checkNonStyleTansitionRefer`.
  return !(0,zrender_lib_core_util_js__rspack_import_0.isArrayLike)(optVal) ? optVal != null && isFinite(optVal) : optVal !== elVal;
}
var checkTransformPropRefer;
if (true) {
  checkTransformPropRefer = function (key, usedIn) {
    if (!(0,zrender_lib_core_util_js__rspack_import_0.hasOwn)(TRANSFORM_PROPS_MAP, key)) {
      (0,_util_log_js__rspack_import_6.warn)('Prop `' + key + '` is not a permitted in `' + usedIn + '`. ' + 'Only `' + (0,zrender_lib_core_util_js__rspack_import_0.keys)(TRANSFORM_PROPS_MAP).join('`, `') + '` are permitted.');
    }
  };
}

}),
49310: (function (__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getCustomSeries: function() { return getCustomSeries; },
  registerCustomSeries: function() { return registerCustomSeries; }
});

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var customRenderers = {};
function registerCustomSeries(type, renderItem) {
  customRenderers[type] = renderItem;
}
function getCustomSeries(type) {
  return customRenderers[type];
}

}),

}]);