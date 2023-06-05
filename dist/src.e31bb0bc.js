// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"warnings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  warn: 'Заполните',
  error: 'Поправь ошибки',
  success: 'Заявка успешно отправлена'
};
exports.default = _default;
},{}],"classNames.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  inputError: 'cta__form-input--error',
  modalActive: 'modal--active',
  modalError: 'modal--error',
  modalWarn: 'modal--warn',
  modalSuccess: 'modal--success'
};
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _warnings = _interopRequireDefault(require("./warnings"));
var _classNames = _interopRequireDefault(require("./classNames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var body = document.getElementsByTagName('body');
var modal = document.querySelector('.js-modal');
var form = document.querySelector('.js-form');
var inputs = document.querySelectorAll('.js-input');
var span = document.querySelectorAll('.js-span');

// состояние контента в попапчиках

var modalText = "".concat(_warnings.default.warn, " \u043F\u043E\u043B\u044F");

// показываем body после полной загрузки страницы

window.addEventListener('load', function () {
  return body[0].style.opacity = 1;
});

// сабмит формы

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  showModal(modalText);
});

// делаем из псевдомассива массив и перебираем, находим наши елементы из DOM и вызываем фун-цию валидации при каждом расфокусе

Array.from(inputs).forEach(function (input, i, arr) {
  input.addEventListener('change', handleInput);
  if (input.value === '') modalText = "".concat(_warnings.default.warn, " \u043F\u043E\u043B\u044F");
  function handleInput(evt) {
    var input = evt.target;
    validation(input, span[i]);

    // текст для попала с ошибкой или без

    modalText = arr.every(function (a) {
      return !a.className.includes('error');
    }) ? _warnings.default.success : _warnings.default.error;

    // текст для попапа если одно из полей пустое

    // if (input.value === '') {
    //     console.log(inputs[i].name)
    // }

    // if (arr.some((a) => a.value === '')) {
    //     const emptyInputName = arr.filter((a) => a.value === '')[0]?.name
    //     modalText = `${warnings.warn} поле ${emptyInputName}`
    // }

    // if (input.value === '') {
    //     if (input.name === 'name') {
    //         console.log('name')
    //     }
    //     if (input.name === 'email') {
    //         console.log('email')
    //     }
    //     if (input.name === 'domain') {
    //         console.log('domain')
    //     }
    // }

    // switch (input.name) {
    //     case input['name'] === '':
    //         alert(input.name)
    //         break
    //     case input['email'] === '':
    //         alert(input.name)
    //         break
    //     case input['domain'] === '':
    //         alert(input.name)
    //         break
    //     default:
    //         break
    // }

    // текст для попала если оба поля пустых
  }
});

// проверяем длинну набраного текста и на латыницу

function validation(input, span) {
  var inputValueLength = input.value.length;
  if (inputValueLength === 0) {
    input.classList.remove(_classNames.default.inputError);
    modalText = _warnings.default.warn;
  } else if (inputValueLength < 2 || inputValueLength > 10) {
    input.classList.add(_classNames.default.inputError);
    span.innerText = "\u0412 \u043F\u043E\u043B\u0435 ".concat(input.name, " \u043E\u0442 2 \u0434\u043E 10 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432");
  } else {
    input.classList.remove(_classNames.default.inputError);
  }
  if (input.value.match(/[А-яЁё]/)) {
    input.classList.add(_classNames.default.inputError);
    span.innerText = "\u0422\u043E\u043B\u044C\u043A\u043E \u043B\u0430\u0442\u0438\u043D\u0438\u0446\u0430";
  }
}

// фун-ция отвечающая за попапы с предупреждениями

function showModal(value) {
  modal.innerHTML = value;
  modal.classList.add(_classNames.default.modalActive);
  removeClass(modal, _classNames.default.modalActive);
  if (value === _warnings.default.error) {
    modal.classList.add(_classNames.default.modalError);
    removeClass(modal, _classNames.default.modalError);
  }
  if (value === _warnings.default.warn) {
    modal.classList.add(_classNames.default.modalWarn);
    removeClass(modal, _classNames.default.modalWarn);
  }
  if (value === _warnings.default.success) {
    inputs.forEach(function (input) {
      return input.value = '';
    });
    modalText = "".concat(_warnings.default.warn, " \u043F\u043E\u043B\u044F");
    modal.classList.add(_classNames.default.modalSuccess);
    removeClass(modal, _classNames.default.modalSuccess);
  }
}

// удаляем класы через какое-то время

function removeClass(item, className) {
  setTimeout(function () {
    item.classList.remove(className);
  }, 2000);
}
},{"./warnings":"warnings.js","./classNames":"classNames.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58279" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map