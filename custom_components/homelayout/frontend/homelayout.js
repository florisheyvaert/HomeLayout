var By = Object.defineProperty;
var Wy = (t, e, n) => e in t ? By(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Id = (t, e, n) => Wy(t, typeof e != "symbol" ? e + "" : e, n);
var X4 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pc(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var X7 = { exports: {} }, gc = {}, $7 = { exports: {} }, qe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e1 = Symbol.for("react.element"), Zy = Symbol.for("react.portal"), Yy = Symbol.for("react.fragment"), Ky = Symbol.for("react.strict_mode"), Xy = Symbol.for("react.profiler"), $y = Symbol.for("react.provider"), Qy = Symbol.for("react.context"), qy = Symbol.for("react.forward_ref"), Jy = Symbol.for("react.suspense"), ev = Symbol.for("react.memo"), tv = Symbol.for("react.lazy"), $4 = Symbol.iterator;
function nv(t) {
  return t === null || typeof t != "object" ? null : (t = $4 && t[$4] || t["@@iterator"], typeof t == "function" ? t : null);
}
var Q7 = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, q7 = Object.assign, J7 = {};
function Sa(t, e, n) {
  this.props = t, this.context = e, this.refs = J7, this.updater = n || Q7;
}
Sa.prototype.isReactComponent = {};
Sa.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, e, "setState");
};
Sa.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function ep() {
}
ep.prototype = Sa.prototype;
function K5(t, e, n) {
  this.props = t, this.context = e, this.refs = J7, this.updater = n || Q7;
}
var X5 = K5.prototype = new ep();
X5.constructor = K5;
q7(X5, Sa.prototype);
X5.isPureReactComponent = !0;
var Q4 = Array.isArray, tp = Object.prototype.hasOwnProperty, $5 = { current: null }, np = { key: !0, ref: !0, __self: !0, __source: !0 };
function rp(t, e, n) {
  var r, o = {}, a = null, l = null;
  if (e != null) for (r in e.ref !== void 0 && (l = e.ref), e.key !== void 0 && (a = "" + e.key), e) tp.call(e, r) && !np.hasOwnProperty(r) && (o[r] = e[r]);
  var c = arguments.length - 2;
  if (c === 1) o.children = n;
  else if (1 < c) {
    for (var d = Array(c), p = 0; p < c; p++) d[p] = arguments[p + 2];
    o.children = d;
  }
  if (t && t.defaultProps) for (r in c = t.defaultProps, c) o[r] === void 0 && (o[r] = c[r]);
  return { $$typeof: e1, type: t, key: a, ref: l, props: o, _owner: $5.current };
}
function rv(t, e) {
  return { $$typeof: e1, type: t.type, key: e, ref: t.ref, props: t.props, _owner: t._owner };
}
function Q5(t) {
  return typeof t == "object" && t !== null && t.$$typeof === e1;
}
function iv(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(n) {
    return e[n];
  });
}
var q4 = /\/+/g;
function Dd(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? iv("" + t.key) : e.toString(36);
}
function cu(t, e, n, r, o) {
  var a = typeof t;
  (a === "undefined" || a === "boolean") && (t = null);
  var l = !1;
  if (t === null) l = !0;
  else switch (a) {
    case "string":
    case "number":
      l = !0;
      break;
    case "object":
      switch (t.$$typeof) {
        case e1:
        case Zy:
          l = !0;
      }
  }
  if (l) return l = t, o = o(l), t = r === "" ? "." + Dd(l, 0) : r, Q4(o) ? (n = "", t != null && (n = t.replace(q4, "$&/") + "/"), cu(o, e, n, "", function(p) {
    return p;
  })) : o != null && (Q5(o) && (o = rv(o, n + (!o.key || l && l.key === o.key ? "" : ("" + o.key).replace(q4, "$&/") + "/") + t)), e.push(o)), 1;
  if (l = 0, r = r === "" ? "." : r + ":", Q4(t)) for (var c = 0; c < t.length; c++) {
    a = t[c];
    var d = r + Dd(a, c);
    l += cu(a, e, n, d, o);
  }
  else if (d = nv(t), typeof d == "function") for (t = d.call(t), c = 0; !(a = t.next()).done; ) a = a.value, d = r + Dd(a, c++), l += cu(a, e, n, d, o);
  else if (a === "object") throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  return l;
}
function H0(t, e, n) {
  if (t == null) return t;
  var r = [], o = 0;
  return cu(t, r, "", "", function(a) {
    return e.call(n, a, o++);
  }), r;
}
function ov(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(function(n) {
      (t._status === 0 || t._status === -1) && (t._status = 1, t._result = n);
    }, function(n) {
      (t._status === 0 || t._status === -1) && (t._status = 2, t._result = n);
    }), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var An = { current: null }, du = { transition: null }, sv = { ReactCurrentDispatcher: An, ReactCurrentBatchConfig: du, ReactCurrentOwner: $5 };
function ip() {
  throw Error("act(...) is not supported in production builds of React.");
}
qe.Children = { map: H0, forEach: function(t, e, n) {
  H0(t, function() {
    e.apply(this, arguments);
  }, n);
}, count: function(t) {
  var e = 0;
  return H0(t, function() {
    e++;
  }), e;
}, toArray: function(t) {
  return H0(t, function(e) {
    return e;
  }) || [];
}, only: function(t) {
  if (!Q5(t)) throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
qe.Component = Sa;
qe.Fragment = Yy;
qe.Profiler = Xy;
qe.PureComponent = K5;
qe.StrictMode = Ky;
qe.Suspense = Jy;
qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sv;
qe.act = ip;
qe.cloneElement = function(t, e, n) {
  if (t == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
  var r = q7({}, t.props), o = t.key, a = t.ref, l = t._owner;
  if (e != null) {
    if (e.ref !== void 0 && (a = e.ref, l = $5.current), e.key !== void 0 && (o = "" + e.key), t.type && t.type.defaultProps) var c = t.type.defaultProps;
    for (d in e) tp.call(e, d) && !np.hasOwnProperty(d) && (r[d] = e[d] === void 0 && c !== void 0 ? c[d] : e[d]);
  }
  var d = arguments.length - 2;
  if (d === 1) r.children = n;
  else if (1 < d) {
    c = Array(d);
    for (var p = 0; p < d; p++) c[p] = arguments[p + 2];
    r.children = c;
  }
  return { $$typeof: e1, type: t.type, key: o, ref: a, props: r, _owner: l };
};
qe.createContext = function(t) {
  return t = { $$typeof: Qy, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: $y, _context: t }, t.Consumer = t;
};
qe.createElement = rp;
qe.createFactory = function(t) {
  var e = rp.bind(null, t);
  return e.type = t, e;
};
qe.createRef = function() {
  return { current: null };
};
qe.forwardRef = function(t) {
  return { $$typeof: qy, render: t };
};
qe.isValidElement = Q5;
qe.lazy = function(t) {
  return { $$typeof: tv, _payload: { _status: -1, _result: t }, _init: ov };
};
qe.memo = function(t, e) {
  return { $$typeof: ev, type: t, compare: e === void 0 ? null : e };
};
qe.startTransition = function(t) {
  var e = du.transition;
  du.transition = {};
  try {
    t();
  } finally {
    du.transition = e;
  }
};
qe.unstable_act = ip;
qe.useCallback = function(t, e) {
  return An.current.useCallback(t, e);
};
qe.useContext = function(t) {
  return An.current.useContext(t);
};
qe.useDebugValue = function() {
};
qe.useDeferredValue = function(t) {
  return An.current.useDeferredValue(t);
};
qe.useEffect = function(t, e) {
  return An.current.useEffect(t, e);
};
qe.useId = function() {
  return An.current.useId();
};
qe.useImperativeHandle = function(t, e, n) {
  return An.current.useImperativeHandle(t, e, n);
};
qe.useInsertionEffect = function(t, e) {
  return An.current.useInsertionEffect(t, e);
};
qe.useLayoutEffect = function(t, e) {
  return An.current.useLayoutEffect(t, e);
};
qe.useMemo = function(t, e) {
  return An.current.useMemo(t, e);
};
qe.useReducer = function(t, e, n) {
  return An.current.useReducer(t, e, n);
};
qe.useRef = function(t) {
  return An.current.useRef(t);
};
qe.useState = function(t) {
  return An.current.useState(t);
};
qe.useSyncExternalStore = function(t, e, n) {
  return An.current.useSyncExternalStore(t, e, n);
};
qe.useTransition = function() {
  return An.current.useTransition();
};
qe.version = "18.3.1";
$7.exports = qe;
var z = $7.exports;
const kn = /* @__PURE__ */ pc(z);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var av = z, lv = Symbol.for("react.element"), uv = Symbol.for("react.fragment"), cv = Object.prototype.hasOwnProperty, dv = av.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, fv = { key: !0, ref: !0, __self: !0, __source: !0 };
function op(t, e, n) {
  var r, o = {}, a = null, l = null;
  n !== void 0 && (a = "" + n), e.key !== void 0 && (a = "" + e.key), e.ref !== void 0 && (l = e.ref);
  for (r in e) cv.call(e, r) && !fv.hasOwnProperty(r) && (o[r] = e[r]);
  if (t && t.defaultProps) for (r in e = t.defaultProps, e) o[r] === void 0 && (o[r] = e[r]);
  return { $$typeof: lv, type: t, key: a, ref: l, props: o, _owner: dv.current };
}
gc.Fragment = uv;
gc.jsx = op;
gc.jsxs = op;
X7.exports = gc;
var v = X7.exports, sp = { exports: {} }, Kn = {}, ap = { exports: {} }, lp = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(t) {
  function e(G, Y) {
    var D = G.length;
    G.push(Y);
    e: for (; 0 < D; ) {
      var ee = D - 1 >>> 1, re = G[ee];
      if (0 < o(re, Y)) G[ee] = Y, G[D] = re, D = ee;
      else break e;
    }
  }
  function n(G) {
    return G.length === 0 ? null : G[0];
  }
  function r(G) {
    if (G.length === 0) return null;
    var Y = G[0], D = G.pop();
    if (D !== Y) {
      G[0] = D;
      e: for (var ee = 0, re = G.length, we = re >>> 1; ee < we; ) {
        var Re = 2 * (ee + 1) - 1, ie = G[Re], ce = Re + 1, H = G[ce];
        if (0 > o(ie, D)) ce < re && 0 > o(H, ie) ? (G[ee] = H, G[ce] = D, ee = ce) : (G[ee] = ie, G[Re] = D, ee = Re);
        else if (ce < re && 0 > o(H, D)) G[ee] = H, G[ce] = D, ee = ce;
        else break e;
      }
    }
    return Y;
  }
  function o(G, Y) {
    var D = G.sortIndex - Y.sortIndex;
    return D !== 0 ? D : G.id - Y.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var a = performance;
    t.unstable_now = function() {
      return a.now();
    };
  } else {
    var l = Date, c = l.now();
    t.unstable_now = function() {
      return l.now() - c;
    };
  }
  var d = [], p = [], y = 1, k = null, x = 3, w = !1, m = !1, S = !1, b = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, M = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(G) {
    for (var Y = n(p); Y !== null; ) {
      if (Y.callback === null) r(p);
      else if (Y.startTime <= G) r(p), Y.sortIndex = Y.expirationTime, e(d, Y);
      else break;
      Y = n(p);
    }
  }
  function C(G) {
    if (S = !1, g(G), !m) if (n(d) !== null) m = !0, oe(A);
    else {
      var Y = n(p);
      Y !== null && q(C, Y.startTime - G);
    }
  }
  function A(G, Y) {
    m = !1, S && (S = !1, L(P), P = -1), w = !0;
    var D = x;
    try {
      for (g(Y), k = n(d); k !== null && (!(k.expirationTime > Y) || G && !F()); ) {
        var ee = k.callback;
        if (typeof ee == "function") {
          k.callback = null, x = k.priorityLevel;
          var re = ee(k.expirationTime <= Y);
          Y = t.unstable_now(), typeof re == "function" ? k.callback = re : k === n(d) && r(d), g(Y);
        } else r(d);
        k = n(d);
      }
      if (k !== null) var we = !0;
      else {
        var Re = n(p);
        Re !== null && q(C, Re.startTime - Y), we = !1;
      }
      return we;
    } finally {
      k = null, x = D, w = !1;
    }
  }
  var E = !1, T = null, P = -1, R = 5, V = -1;
  function F() {
    return !(t.unstable_now() - V < R);
  }
  function W() {
    if (T !== null) {
      var G = t.unstable_now();
      V = G;
      var Y = !0;
      try {
        Y = T(!0, G);
      } finally {
        Y ? U() : (E = !1, T = null);
      }
    } else E = !1;
  }
  var U;
  if (typeof M == "function") U = function() {
    M(W);
  };
  else if (typeof MessageChannel < "u") {
    var $ = new MessageChannel(), Q = $.port2;
    $.port1.onmessage = W, U = function() {
      Q.postMessage(null);
    };
  } else U = function() {
    b(W, 0);
  };
  function oe(G) {
    T = G, E || (E = !0, U());
  }
  function q(G, Y) {
    P = b(function() {
      G(t.unstable_now());
    }, Y);
  }
  t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(G) {
    G.callback = null;
  }, t.unstable_continueExecution = function() {
    m || w || (m = !0, oe(A));
  }, t.unstable_forceFrameRate = function(G) {
    0 > G || 125 < G ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : R = 0 < G ? Math.floor(1e3 / G) : 5;
  }, t.unstable_getCurrentPriorityLevel = function() {
    return x;
  }, t.unstable_getFirstCallbackNode = function() {
    return n(d);
  }, t.unstable_next = function(G) {
    switch (x) {
      case 1:
      case 2:
      case 3:
        var Y = 3;
        break;
      default:
        Y = x;
    }
    var D = x;
    x = Y;
    try {
      return G();
    } finally {
      x = D;
    }
  }, t.unstable_pauseExecution = function() {
  }, t.unstable_requestPaint = function() {
  }, t.unstable_runWithPriority = function(G, Y) {
    switch (G) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        G = 3;
    }
    var D = x;
    x = G;
    try {
      return Y();
    } finally {
      x = D;
    }
  }, t.unstable_scheduleCallback = function(G, Y, D) {
    var ee = t.unstable_now();
    switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? ee + D : ee) : D = ee, G) {
      case 1:
        var re = -1;
        break;
      case 2:
        re = 250;
        break;
      case 5:
        re = 1073741823;
        break;
      case 4:
        re = 1e4;
        break;
      default:
        re = 5e3;
    }
    return re = D + re, G = { id: y++, callback: Y, priorityLevel: G, startTime: D, expirationTime: re, sortIndex: -1 }, D > ee ? (G.sortIndex = D, e(p, G), n(d) === null && G === n(p) && (S ? (L(P), P = -1) : S = !0, q(C, D - ee))) : (G.sortIndex = re, e(d, G), m || w || (m = !0, oe(A))), G;
  }, t.unstable_shouldYield = F, t.unstable_wrapCallback = function(G) {
    var Y = x;
    return function() {
      var D = x;
      x = Y;
      try {
        return G.apply(this, arguments);
      } finally {
        x = D;
      }
    };
  };
})(lp);
ap.exports = lp;
var kl = ap.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hv = z, Yn = kl;
function se(t) {
  for (var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, n = 1; n < arguments.length; n++) e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var up = /* @__PURE__ */ new Set(), Tl = {};
function is(t, e) {
  ca(t, e), ca(t + "Capture", e);
}
function ca(t, e) {
  for (Tl[t] = e, t = 0; t < e.length; t++) up.add(e[t]);
}
var Ci = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Uf = Object.prototype.hasOwnProperty, pv = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, J4 = {}, e8 = {};
function gv(t) {
  return Uf.call(e8, t) ? !0 : Uf.call(J4, t) ? !1 : pv.test(t) ? e8[t] = !0 : (J4[t] = !0, !1);
}
function mv(t, e, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof e) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (t = t.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-");
    default:
      return !1;
  }
}
function yv(t, e, n, r) {
  if (e === null || typeof e > "u" || mv(t, e, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !e;
    case 4:
      return e === !1;
    case 5:
      return isNaN(e);
    case 6:
      return isNaN(e) || 1 > e;
  }
  return !1;
}
function bn(t, e, n, r, o, a, l) {
  this.acceptsBooleans = e === 2 || e === 3 || e === 4, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = t, this.type = e, this.sanitizeURL = a, this.removeEmptyString = l;
}
var ln = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t) {
  ln[t] = new bn(t, 0, !1, t, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(t) {
  var e = t[0];
  ln[e] = new bn(e, 1, !1, t[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(t) {
  ln[t] = new bn(t, 2, !1, t.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(t) {
  ln[t] = new bn(t, 2, !1, t, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t) {
  ln[t] = new bn(t, 3, !1, t.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(t) {
  ln[t] = new bn(t, 3, !0, t, null, !1, !1);
});
["capture", "download"].forEach(function(t) {
  ln[t] = new bn(t, 4, !1, t, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(t) {
  ln[t] = new bn(t, 6, !1, t, null, !1, !1);
});
["rowSpan", "start"].forEach(function(t) {
  ln[t] = new bn(t, 5, !1, t.toLowerCase(), null, !1, !1);
});
var q5 = /[\-:]([a-z])/g;
function J5(t) {
  return t[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t) {
  var e = t.replace(
    q5,
    J5
  );
  ln[e] = new bn(e, 1, !1, t, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t) {
  var e = t.replace(q5, J5);
  ln[e] = new bn(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(t) {
  var e = t.replace(q5, J5);
  ln[e] = new bn(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(t) {
  ln[t] = new bn(t, 1, !1, t.toLowerCase(), null, !1, !1);
});
ln.xlinkHref = new bn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(t) {
  ln[t] = new bn(t, 1, !1, t.toLowerCase(), null, !0, !0);
});
function eh(t, e, n, r) {
  var o = ln.hasOwnProperty(e) ? ln[e] : null;
  (o !== null ? o.type !== 0 : r || !(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (yv(e, n, o, r) && (n = null), r || o === null ? gv(e) && (n === null ? t.removeAttribute(e) : t.setAttribute(e, "" + n)) : o.mustUseProperty ? t[o.propertyName] = n === null ? o.type === 3 ? !1 : "" : n : (e = o.attributeName, r = o.attributeNamespace, n === null ? t.removeAttribute(e) : (o = o.type, n = o === 3 || o === 4 && n === !0 ? "" : "" + n, r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n))));
}
var Mi = hv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, V0 = Symbol.for("react.element"), Us = Symbol.for("react.portal"), Bs = Symbol.for("react.fragment"), th = Symbol.for("react.strict_mode"), Bf = Symbol.for("react.profiler"), cp = Symbol.for("react.provider"), dp = Symbol.for("react.context"), nh = Symbol.for("react.forward_ref"), Wf = Symbol.for("react.suspense"), Zf = Symbol.for("react.suspense_list"), rh = Symbol.for("react.memo"), $i = Symbol.for("react.lazy"), fp = Symbol.for("react.offscreen"), t8 = Symbol.iterator;
function ol(t) {
  return t === null || typeof t != "object" ? null : (t = t8 && t[t8] || t["@@iterator"], typeof t == "function" ? t : null);
}
var Pt = Object.assign, Gd;
function vl(t) {
  if (Gd === void 0) try {
    throw Error();
  } catch (n) {
    var e = n.stack.trim().match(/\n( *(at )?)/);
    Gd = e && e[1] || "";
  }
  return `
` + Gd + t;
}
var Ud = !1;
function Bd(t, e) {
  if (!t || Ud) return "";
  Ud = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (e) if (e = function() {
      throw Error();
    }, Object.defineProperty(e.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(e, []);
      } catch (p) {
        var r = p;
      }
      Reflect.construct(t, [], e);
    } else {
      try {
        e.call();
      } catch (p) {
        r = p;
      }
      t.call(e.prototype);
    }
    else {
      try {
        throw Error();
      } catch (p) {
        r = p;
      }
      t();
    }
  } catch (p) {
    if (p && r && typeof p.stack == "string") {
      for (var o = p.stack.split(`
`), a = r.stack.split(`
`), l = o.length - 1, c = a.length - 1; 1 <= l && 0 <= c && o[l] !== a[c]; ) c--;
      for (; 1 <= l && 0 <= c; l--, c--) if (o[l] !== a[c]) {
        if (l !== 1 || c !== 1)
          do
            if (l--, c--, 0 > c || o[l] !== a[c]) {
              var d = `
` + o[l].replace(" at new ", " at ");
              return t.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", t.displayName)), d;
            }
          while (1 <= l && 0 <= c);
        break;
      }
    }
  } finally {
    Ud = !1, Error.prepareStackTrace = n;
  }
  return (t = t ? t.displayName || t.name : "") ? vl(t) : "";
}
function vv(t) {
  switch (t.tag) {
    case 5:
      return vl(t.type);
    case 16:
      return vl("Lazy");
    case 13:
      return vl("Suspense");
    case 19:
      return vl("SuspenseList");
    case 0:
    case 2:
    case 15:
      return t = Bd(t.type, !1), t;
    case 11:
      return t = Bd(t.type.render, !1), t;
    case 1:
      return t = Bd(t.type, !0), t;
    default:
      return "";
  }
}
function Yf(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case Bs:
      return "Fragment";
    case Us:
      return "Portal";
    case Bf:
      return "Profiler";
    case th:
      return "StrictMode";
    case Wf:
      return "Suspense";
    case Zf:
      return "SuspenseList";
  }
  if (typeof t == "object") switch (t.$$typeof) {
    case dp:
      return (t.displayName || "Context") + ".Consumer";
    case cp:
      return (t._context.displayName || "Context") + ".Provider";
    case nh:
      var e = t.render;
      return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
    case rh:
      return e = t.displayName || null, e !== null ? e : Yf(t.type) || "Memo";
    case $i:
      e = t._payload, t = t._init;
      try {
        return Yf(t(e));
      } catch {
      }
  }
  return null;
}
function xv(t) {
  var e = t.type;
  switch (t.tag) {
    case 24:
      return "Cache";
    case 9:
      return (e.displayName || "Context") + ".Consumer";
    case 10:
      return (e._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return t = e.render, t = t.displayName || t.name || "", e.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return e;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Yf(e);
    case 8:
      return e === th ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
  }
  return null;
}
function po(t) {
  switch (typeof t) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function hp(t) {
  var e = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
}
function _v(t) {
  var e = hp(t) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e), r = "" + t[e];
  if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var o = n.get, a = n.set;
    return Object.defineProperty(t, e, { configurable: !0, get: function() {
      return o.call(this);
    }, set: function(l) {
      r = "" + l, a.call(this, l);
    } }), Object.defineProperty(t, e, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(l) {
      r = "" + l;
    }, stopTracking: function() {
      t._valueTracker = null, delete t[e];
    } };
  }
}
function T0(t) {
  t._valueTracker || (t._valueTracker = _v(t));
}
function pp(t) {
  if (!t) return !1;
  var e = t._valueTracker;
  if (!e) return !0;
  var n = e.getValue(), r = "";
  return t && (r = hp(t) ? t.checked ? "true" : "false" : t.value), t = r, t !== n ? (e.setValue(t), !0) : !1;
}
function ku(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
function Kf(t, e) {
  var n = e.checked;
  return Pt({}, e, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? t._wrapperState.initialChecked });
}
function n8(t, e) {
  var n = e.defaultValue == null ? "" : e.defaultValue, r = e.checked != null ? e.checked : e.defaultChecked;
  n = po(e.value != null ? e.value : n), t._wrapperState = { initialChecked: r, initialValue: n, controlled: e.type === "checkbox" || e.type === "radio" ? e.checked != null : e.value != null };
}
function gp(t, e) {
  e = e.checked, e != null && eh(t, "checked", e, !1);
}
function Xf(t, e) {
  gp(t, e);
  var n = po(e.value), r = e.type;
  if (n != null) r === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + n) : t.value !== "" + n && (t.value = "" + n);
  else if (r === "submit" || r === "reset") {
    t.removeAttribute("value");
    return;
  }
  e.hasOwnProperty("value") ? $f(t, e.type, n) : e.hasOwnProperty("defaultValue") && $f(t, e.type, po(e.defaultValue)), e.checked == null && e.defaultChecked != null && (t.defaultChecked = !!e.defaultChecked);
}
function r8(t, e, n) {
  if (e.hasOwnProperty("value") || e.hasOwnProperty("defaultValue")) {
    var r = e.type;
    if (!(r !== "submit" && r !== "reset" || e.value !== void 0 && e.value !== null)) return;
    e = "" + t._wrapperState.initialValue, n || e === t.value || (t.value = e), t.defaultValue = e;
  }
  n = t.name, n !== "" && (t.name = ""), t.defaultChecked = !!t._wrapperState.initialChecked, n !== "" && (t.name = n);
}
function $f(t, e, n) {
  (e !== "number" || ku(t.ownerDocument) !== t) && (n == null ? t.defaultValue = "" + t._wrapperState.initialValue : t.defaultValue !== "" + n && (t.defaultValue = "" + n));
}
var xl = Array.isArray;
function ta(t, e, n, r) {
  if (t = t.options, e) {
    e = {};
    for (var o = 0; o < n.length; o++) e["$" + n[o]] = !0;
    for (n = 0; n < t.length; n++) o = e.hasOwnProperty("$" + t[n].value), t[n].selected !== o && (t[n].selected = o), o && r && (t[n].defaultSelected = !0);
  } else {
    for (n = "" + po(n), e = null, o = 0; o < t.length; o++) {
      if (t[o].value === n) {
        t[o].selected = !0, r && (t[o].defaultSelected = !0);
        return;
      }
      e !== null || t[o].disabled || (e = t[o]);
    }
    e !== null && (e.selected = !0);
  }
}
function Qf(t, e) {
  if (e.dangerouslySetInnerHTML != null) throw Error(se(91));
  return Pt({}, e, { value: void 0, defaultValue: void 0, children: "" + t._wrapperState.initialValue });
}
function i8(t, e) {
  var n = e.value;
  if (n == null) {
    if (n = e.children, e = e.defaultValue, n != null) {
      if (e != null) throw Error(se(92));
      if (xl(n)) {
        if (1 < n.length) throw Error(se(93));
        n = n[0];
      }
      e = n;
    }
    e == null && (e = ""), n = e;
  }
  t._wrapperState = { initialValue: po(n) };
}
function mp(t, e) {
  var n = po(e.value), r = po(e.defaultValue);
  n != null && (n = "" + n, n !== t.value && (t.value = n), e.defaultValue == null && t.defaultValue !== n && (t.defaultValue = n)), r != null && (t.defaultValue = "" + r);
}
function o8(t) {
  var e = t.textContent;
  e === t._wrapperState.initialValue && e !== "" && e !== null && (t.value = e);
}
function yp(t) {
  switch (t) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function qf(t, e) {
  return t == null || t === "http://www.w3.org/1999/xhtml" ? yp(e) : t === "http://www.w3.org/2000/svg" && e === "foreignObject" ? "http://www.w3.org/1999/xhtml" : t;
}
var R0, vp = function(t) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(e, n, r, o) {
    MSApp.execUnsafeLocalFunction(function() {
      return t(e, n, r, o);
    });
  } : t;
}(function(t, e) {
  if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t) t.innerHTML = e;
  else {
    for (R0 = R0 || document.createElement("div"), R0.innerHTML = "<svg>" + e.valueOf().toString() + "</svg>", e = R0.firstChild; t.firstChild; ) t.removeChild(t.firstChild);
    for (; e.firstChild; ) t.appendChild(e.firstChild);
  }
});
function Rl(t, e) {
  if (e) {
    var n = t.firstChild;
    if (n && n === t.lastChild && n.nodeType === 3) {
      n.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var Ml = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, Cv = ["Webkit", "ms", "Moz", "O"];
Object.keys(Ml).forEach(function(t) {
  Cv.forEach(function(e) {
    e = e + t.charAt(0).toUpperCase() + t.substring(1), Ml[e] = Ml[t];
  });
});
function xp(t, e, n) {
  return e == null || typeof e == "boolean" || e === "" ? "" : n || typeof e != "number" || e === 0 || Ml.hasOwnProperty(t) && Ml[t] ? ("" + e).trim() : e + "px";
}
function _p(t, e) {
  t = t.style;
  for (var n in e) if (e.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, o = xp(n, e[n], r);
    n === "float" && (n = "cssFloat"), r ? t.setProperty(n, o) : t[n] = o;
  }
}
var wv = Pt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Jf(t, e) {
  if (e) {
    if (wv[t] && (e.children != null || e.dangerouslySetInnerHTML != null)) throw Error(se(137, t));
    if (e.dangerouslySetInnerHTML != null) {
      if (e.children != null) throw Error(se(60));
      if (typeof e.dangerouslySetInnerHTML != "object" || !("__html" in e.dangerouslySetInnerHTML)) throw Error(se(61));
    }
    if (e.style != null && typeof e.style != "object") throw Error(se(62));
  }
}
function e5(t, e) {
  if (t.indexOf("-") === -1) return typeof e.is == "string";
  switch (t) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var t5 = null;
function ih(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
}
var n5 = null, na = null, ra = null;
function s8(t) {
  if (t = r1(t)) {
    if (typeof n5 != "function") throw Error(se(280));
    var e = t.stateNode;
    e && (e = _c(e), n5(t.stateNode, t.type, e));
  }
}
function Cp(t) {
  na ? ra ? ra.push(t) : ra = [t] : na = t;
}
function wp() {
  if (na) {
    var t = na, e = ra;
    if (ra = na = null, s8(t), e) for (t = 0; t < e.length; t++) s8(e[t]);
  }
}
function Sp(t, e) {
  return t(e);
}
function kp() {
}
var Wd = !1;
function Mp(t, e, n) {
  if (Wd) return t(e, n);
  Wd = !0;
  try {
    return Sp(t, e, n);
  } finally {
    Wd = !1, (na !== null || ra !== null) && (kp(), wp());
  }
}
function zl(t, e) {
  var n = t.stateNode;
  if (n === null) return null;
  var r = _c(n);
  if (r === null) return null;
  n = r[e];
  e: switch (e) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (t = t.type, r = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !r;
      break e;
    default:
      t = !1;
  }
  if (t) return null;
  if (n && typeof n != "function") throw Error(se(231, e, typeof n));
  return n;
}
var r5 = !1;
if (Ci) try {
  var sl = {};
  Object.defineProperty(sl, "passive", { get: function() {
    r5 = !0;
  } }), window.addEventListener("test", sl, sl), window.removeEventListener("test", sl, sl);
} catch {
  r5 = !1;
}
function Sv(t, e, n, r, o, a, l, c, d) {
  var p = Array.prototype.slice.call(arguments, 3);
  try {
    e.apply(n, p);
  } catch (y) {
    this.onError(y);
  }
}
var Ll = !1, Mu = null, Lu = !1, i5 = null, kv = { onError: function(t) {
  Ll = !0, Mu = t;
} };
function Mv(t, e, n, r, o, a, l, c, d) {
  Ll = !1, Mu = null, Sv.apply(kv, arguments);
}
function Lv(t, e, n, r, o, a, l, c, d) {
  if (Mv.apply(this, arguments), Ll) {
    if (Ll) {
      var p = Mu;
      Ll = !1, Mu = null;
    } else throw Error(se(198));
    Lu || (Lu = !0, i5 = p);
  }
}
function os(t) {
  var e = t, n = t;
  if (t.alternate) for (; e.return; ) e = e.return;
  else {
    t = e;
    do
      e = t, e.flags & 4098 && (n = e.return), t = e.return;
    while (t);
  }
  return e.tag === 3 ? n : null;
}
function Lp(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
  }
  return null;
}
function a8(t) {
  if (os(t) !== t) throw Error(se(188));
}
function Av(t) {
  var e = t.alternate;
  if (!e) {
    if (e = os(t), e === null) throw Error(se(188));
    return e !== t ? null : t;
  }
  for (var n = t, r = e; ; ) {
    var o = n.return;
    if (o === null) break;
    var a = o.alternate;
    if (a === null) {
      if (r = o.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === a.child) {
      for (a = o.child; a; ) {
        if (a === n) return a8(o), t;
        if (a === r) return a8(o), e;
        a = a.sibling;
      }
      throw Error(se(188));
    }
    if (n.return !== r.return) n = o, r = a;
    else {
      for (var l = !1, c = o.child; c; ) {
        if (c === n) {
          l = !0, n = o, r = a;
          break;
        }
        if (c === r) {
          l = !0, r = o, n = a;
          break;
        }
        c = c.sibling;
      }
      if (!l) {
        for (c = a.child; c; ) {
          if (c === n) {
            l = !0, n = a, r = o;
            break;
          }
          if (c === r) {
            l = !0, r = a, n = o;
            break;
          }
          c = c.sibling;
        }
        if (!l) throw Error(se(189));
      }
    }
    if (n.alternate !== r) throw Error(se(190));
  }
  if (n.tag !== 3) throw Error(se(188));
  return n.stateNode.current === n ? t : e;
}
function Ap(t) {
  return t = Av(t), t !== null ? bp(t) : null;
}
function bp(t) {
  if (t.tag === 5 || t.tag === 6) return t;
  for (t = t.child; t !== null; ) {
    var e = bp(t);
    if (e !== null) return e;
    t = t.sibling;
  }
  return null;
}
var Pp = Yn.unstable_scheduleCallback, l8 = Yn.unstable_cancelCallback, bv = Yn.unstable_shouldYield, Pv = Yn.unstable_requestPaint, Ft = Yn.unstable_now, Ev = Yn.unstable_getCurrentPriorityLevel, oh = Yn.unstable_ImmediatePriority, Ep = Yn.unstable_UserBlockingPriority, Au = Yn.unstable_NormalPriority, Nv = Yn.unstable_LowPriority, Np = Yn.unstable_IdlePriority, mc = null, Yr = null;
function Hv(t) {
  if (Yr && typeof Yr.onCommitFiberRoot == "function") try {
    Yr.onCommitFiberRoot(mc, t, void 0, (t.current.flags & 128) === 128);
  } catch {
  }
}
var Mr = Math.clz32 ? Math.clz32 : Rv, Vv = Math.log, Tv = Math.LN2;
function Rv(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (Vv(t) / Tv | 0) | 0;
}
var z0 = 64, F0 = 4194304;
function _l(t) {
  switch (t & -t) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return t & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return t;
  }
}
function bu(t, e) {
  var n = t.pendingLanes;
  if (n === 0) return 0;
  var r = 0, o = t.suspendedLanes, a = t.pingedLanes, l = n & 268435455;
  if (l !== 0) {
    var c = l & ~o;
    c !== 0 ? r = _l(c) : (a &= l, a !== 0 && (r = _l(a)));
  } else l = n & ~o, l !== 0 ? r = _l(l) : a !== 0 && (r = _l(a));
  if (r === 0) return 0;
  if (e !== 0 && e !== r && !(e & o) && (o = r & -r, a = e & -e, o >= a || o === 16 && (a & 4194240) !== 0)) return e;
  if (r & 4 && (r |= n & 16), e = t.entangledLanes, e !== 0) for (t = t.entanglements, e &= r; 0 < e; ) n = 31 - Mr(e), o = 1 << n, r |= t[n], e &= ~o;
  return r;
}
function zv(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
      return e + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Fv(t, e) {
  for (var n = t.suspendedLanes, r = t.pingedLanes, o = t.expirationTimes, a = t.pendingLanes; 0 < a; ) {
    var l = 31 - Mr(a), c = 1 << l, d = o[l];
    d === -1 ? (!(c & n) || c & r) && (o[l] = zv(c, e)) : d <= e && (t.expiredLanes |= c), a &= ~c;
  }
}
function o5(t) {
  return t = t.pendingLanes & -1073741825, t !== 0 ? t : t & 1073741824 ? 1073741824 : 0;
}
function Hp() {
  var t = z0;
  return z0 <<= 1, !(z0 & 4194240) && (z0 = 64), t;
}
function Zd(t) {
  for (var e = [], n = 0; 31 > n; n++) e.push(t);
  return e;
}
function t1(t, e, n) {
  t.pendingLanes |= e, e !== 536870912 && (t.suspendedLanes = 0, t.pingedLanes = 0), t = t.eventTimes, e = 31 - Mr(e), t[e] = n;
}
function jv(t, e) {
  var n = t.pendingLanes & ~e;
  t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.expiredLanes &= e, t.mutableReadLanes &= e, t.entangledLanes &= e, e = t.entanglements;
  var r = t.eventTimes;
  for (t = t.expirationTimes; 0 < n; ) {
    var o = 31 - Mr(n), a = 1 << o;
    e[o] = 0, r[o] = -1, t[o] = -1, n &= ~a;
  }
}
function sh(t, e) {
  var n = t.entangledLanes |= e;
  for (t = t.entanglements; n; ) {
    var r = 31 - Mr(n), o = 1 << r;
    o & e | t[r] & e && (t[r] |= e), n &= ~o;
  }
}
var ut = 0;
function Vp(t) {
  return t &= -t, 1 < t ? 4 < t ? t & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Tp, ah, Rp, zp, Fp, s5 = !1, j0 = [], ro = null, io = null, oo = null, Fl = /* @__PURE__ */ new Map(), jl = /* @__PURE__ */ new Map(), qi = [], Ov = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function u8(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      ro = null;
      break;
    case "dragenter":
    case "dragleave":
      io = null;
      break;
    case "mouseover":
    case "mouseout":
      oo = null;
      break;
    case "pointerover":
    case "pointerout":
      Fl.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      jl.delete(e.pointerId);
  }
}
function al(t, e, n, r, o, a) {
  return t === null || t.nativeEvent !== a ? (t = { blockedOn: e, domEventName: n, eventSystemFlags: r, nativeEvent: a, targetContainers: [o] }, e !== null && (e = r1(e), e !== null && ah(e)), t) : (t.eventSystemFlags |= r, e = t.targetContainers, o !== null && e.indexOf(o) === -1 && e.push(o), t);
}
function Iv(t, e, n, r, o) {
  switch (e) {
    case "focusin":
      return ro = al(ro, t, e, n, r, o), !0;
    case "dragenter":
      return io = al(io, t, e, n, r, o), !0;
    case "mouseover":
      return oo = al(oo, t, e, n, r, o), !0;
    case "pointerover":
      var a = o.pointerId;
      return Fl.set(a, al(Fl.get(a) || null, t, e, n, r, o)), !0;
    case "gotpointercapture":
      return a = o.pointerId, jl.set(a, al(jl.get(a) || null, t, e, n, r, o)), !0;
  }
  return !1;
}
function jp(t) {
  var e = Zo(t.target);
  if (e !== null) {
    var n = os(e);
    if (n !== null) {
      if (e = n.tag, e === 13) {
        if (e = Lp(n), e !== null) {
          t.blockedOn = e, Fp(t.priority, function() {
            Rp(n);
          });
          return;
        }
      } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function fu(t) {
  if (t.blockedOn !== null) return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var n = a5(t.domEventName, t.eventSystemFlags, e[0], t.nativeEvent);
    if (n === null) {
      n = t.nativeEvent;
      var r = new n.constructor(n.type, n);
      t5 = r, n.target.dispatchEvent(r), t5 = null;
    } else return e = r1(n), e !== null && ah(e), t.blockedOn = n, !1;
    e.shift();
  }
  return !0;
}
function c8(t, e, n) {
  fu(t) && n.delete(e);
}
function Dv() {
  s5 = !1, ro !== null && fu(ro) && (ro = null), io !== null && fu(io) && (io = null), oo !== null && fu(oo) && (oo = null), Fl.forEach(c8), jl.forEach(c8);
}
function ll(t, e) {
  t.blockedOn === e && (t.blockedOn = null, s5 || (s5 = !0, Yn.unstable_scheduleCallback(Yn.unstable_NormalPriority, Dv)));
}
function Ol(t) {
  function e(o) {
    return ll(o, t);
  }
  if (0 < j0.length) {
    ll(j0[0], t);
    for (var n = 1; n < j0.length; n++) {
      var r = j0[n];
      r.blockedOn === t && (r.blockedOn = null);
    }
  }
  for (ro !== null && ll(ro, t), io !== null && ll(io, t), oo !== null && ll(oo, t), Fl.forEach(e), jl.forEach(e), n = 0; n < qi.length; n++) r = qi[n], r.blockedOn === t && (r.blockedOn = null);
  for (; 0 < qi.length && (n = qi[0], n.blockedOn === null); ) jp(n), n.blockedOn === null && qi.shift();
}
var ia = Mi.ReactCurrentBatchConfig, Pu = !0;
function Gv(t, e, n, r) {
  var o = ut, a = ia.transition;
  ia.transition = null;
  try {
    ut = 1, lh(t, e, n, r);
  } finally {
    ut = o, ia.transition = a;
  }
}
function Uv(t, e, n, r) {
  var o = ut, a = ia.transition;
  ia.transition = null;
  try {
    ut = 4, lh(t, e, n, r);
  } finally {
    ut = o, ia.transition = a;
  }
}
function lh(t, e, n, r) {
  if (Pu) {
    var o = a5(t, e, n, r);
    if (o === null) nf(t, e, r, Eu, n), u8(t, r);
    else if (Iv(o, t, e, n, r)) r.stopPropagation();
    else if (u8(t, r), e & 4 && -1 < Ov.indexOf(t)) {
      for (; o !== null; ) {
        var a = r1(o);
        if (a !== null && Tp(a), a = a5(t, e, n, r), a === null && nf(t, e, r, Eu, n), a === o) break;
        o = a;
      }
      o !== null && r.stopPropagation();
    } else nf(t, e, r, null, n);
  }
}
var Eu = null;
function a5(t, e, n, r) {
  if (Eu = null, t = ih(r), t = Zo(t), t !== null) if (e = os(t), e === null) t = null;
  else if (n = e.tag, n === 13) {
    if (t = Lp(e), t !== null) return t;
    t = null;
  } else if (n === 3) {
    if (e.stateNode.current.memoizedState.isDehydrated) return e.tag === 3 ? e.stateNode.containerInfo : null;
    t = null;
  } else e !== t && (t = null);
  return Eu = t, null;
}
function Op(t) {
  switch (t) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Ev()) {
        case oh:
          return 1;
        case Ep:
          return 4;
        case Au:
        case Nv:
          return 16;
        case Np:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var eo = null, uh = null, hu = null;
function Ip() {
  if (hu) return hu;
  var t, e = uh, n = e.length, r, o = "value" in eo ? eo.value : eo.textContent, a = o.length;
  for (t = 0; t < n && e[t] === o[t]; t++) ;
  var l = n - t;
  for (r = 1; r <= l && e[n - r] === o[a - r]; r++) ;
  return hu = o.slice(t, 1 < r ? 1 - r : void 0);
}
function pu(t) {
  var e = t.keyCode;
  return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
}
function O0() {
  return !0;
}
function d8() {
  return !1;
}
function Xn(t) {
  function e(n, r, o, a, l) {
    this._reactName = n, this._targetInst = o, this.type = r, this.nativeEvent = a, this.target = l, this.currentTarget = null;
    for (var c in t) t.hasOwnProperty(c) && (n = t[c], this[c] = n ? n(a) : a[c]);
    return this.isDefaultPrevented = (a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1) ? O0 : d8, this.isPropagationStopped = d8, this;
  }
  return Pt(e.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = O0);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = O0);
  }, persist: function() {
  }, isPersistent: O0 }), e;
}
var ka = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
  return t.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, ch = Xn(ka), n1 = Pt({}, ka, { view: 0, detail: 0 }), Bv = Xn(n1), Yd, Kd, ul, yc = Pt({}, n1, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: dh, button: 0, buttons: 0, relatedTarget: function(t) {
  return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
}, movementX: function(t) {
  return "movementX" in t ? t.movementX : (t !== ul && (ul && t.type === "mousemove" ? (Yd = t.screenX - ul.screenX, Kd = t.screenY - ul.screenY) : Kd = Yd = 0, ul = t), Yd);
}, movementY: function(t) {
  return "movementY" in t ? t.movementY : Kd;
} }), f8 = Xn(yc), Wv = Pt({}, yc, { dataTransfer: 0 }), Zv = Xn(Wv), Yv = Pt({}, n1, { relatedTarget: 0 }), Xd = Xn(Yv), Kv = Pt({}, ka, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Xv = Xn(Kv), $v = Pt({}, ka, { clipboardData: function(t) {
  return "clipboardData" in t ? t.clipboardData : window.clipboardData;
} }), Qv = Xn($v), qv = Pt({}, ka, { data: 0 }), h8 = Xn(qv), Jv = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, ex = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, tx = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function nx(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = tx[t]) ? !!e[t] : !1;
}
function dh() {
  return nx;
}
var rx = Pt({}, n1, { key: function(t) {
  if (t.key) {
    var e = Jv[t.key] || t.key;
    if (e !== "Unidentified") return e;
  }
  return t.type === "keypress" ? (t = pu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? ex[t.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: dh, charCode: function(t) {
  return t.type === "keypress" ? pu(t) : 0;
}, keyCode: function(t) {
  return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
}, which: function(t) {
  return t.type === "keypress" ? pu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
} }), ix = Xn(rx), ox = Pt({}, yc, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), p8 = Xn(ox), sx = Pt({}, n1, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: dh }), ax = Xn(sx), lx = Pt({}, ka, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ux = Xn(lx), cx = Pt({}, yc, {
  deltaX: function(t) {
    return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
  },
  deltaY: function(t) {
    return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), dx = Xn(cx), fx = [9, 13, 27, 32], fh = Ci && "CompositionEvent" in window, Al = null;
Ci && "documentMode" in document && (Al = document.documentMode);
var hx = Ci && "TextEvent" in window && !Al, Dp = Ci && (!fh || Al && 8 < Al && 11 >= Al), g8 = " ", m8 = !1;
function Gp(t, e) {
  switch (t) {
    case "keyup":
      return fx.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Up(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
}
var Ws = !1;
function px(t, e) {
  switch (t) {
    case "compositionend":
      return Up(e);
    case "keypress":
      return e.which !== 32 ? null : (m8 = !0, g8);
    case "textInput":
      return t = e.data, t === g8 && m8 ? null : t;
    default:
      return null;
  }
}
function gx(t, e) {
  if (Ws) return t === "compositionend" || !fh && Gp(t, e) ? (t = Ip(), hu = uh = eo = null, Ws = !1, t) : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
        if (e.char && 1 < e.char.length) return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return Dp && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var mx = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function y8(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!mx[t.type] : e === "textarea";
}
function Bp(t, e, n, r) {
  Cp(r), e = Nu(e, "onChange"), 0 < e.length && (n = new ch("onChange", "change", null, n, r), t.push({ event: n, listeners: e }));
}
var bl = null, Il = null;
function yx(t) {
  t9(t, 0);
}
function vc(t) {
  var e = Ks(t);
  if (pp(e)) return t;
}
function vx(t, e) {
  if (t === "change") return e;
}
var Wp = !1;
if (Ci) {
  var $d;
  if (Ci) {
    var Qd = "oninput" in document;
    if (!Qd) {
      var v8 = document.createElement("div");
      v8.setAttribute("oninput", "return;"), Qd = typeof v8.oninput == "function";
    }
    $d = Qd;
  } else $d = !1;
  Wp = $d && (!document.documentMode || 9 < document.documentMode);
}
function x8() {
  bl && (bl.detachEvent("onpropertychange", Zp), Il = bl = null);
}
function Zp(t) {
  if (t.propertyName === "value" && vc(Il)) {
    var e = [];
    Bp(e, Il, t, ih(t)), Mp(yx, e);
  }
}
function xx(t, e, n) {
  t === "focusin" ? (x8(), bl = e, Il = n, bl.attachEvent("onpropertychange", Zp)) : t === "focusout" && x8();
}
function _x(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown") return vc(Il);
}
function Cx(t, e) {
  if (t === "click") return vc(e);
}
function wx(t, e) {
  if (t === "input" || t === "change") return vc(e);
}
function Sx(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var Pr = typeof Object.is == "function" ? Object.is : Sx;
function Dl(t, e) {
  if (Pr(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null) return !1;
  var n = Object.keys(t), r = Object.keys(e);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!Uf.call(e, o) || !Pr(t[o], e[o])) return !1;
  }
  return !0;
}
function _8(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function C8(t, e) {
  var n = _8(t);
  t = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = t + n.textContent.length, t <= e && r >= e) return { node: n, offset: e - t };
      t = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = _8(n);
  }
}
function Yp(t, e) {
  return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Yp(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
}
function Kp() {
  for (var t = window, e = ku(); e instanceof t.HTMLIFrameElement; ) {
    try {
      var n = typeof e.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) t = e.contentWindow;
    else break;
    e = ku(t.document);
  }
  return e;
}
function hh(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
}
function kx(t) {
  var e = Kp(), n = t.focusedElem, r = t.selectionRange;
  if (e !== n && n && n.ownerDocument && Yp(n.ownerDocument.documentElement, n)) {
    if (r !== null && hh(n)) {
      if (e = r.start, t = r.end, t === void 0 && (t = e), "selectionStart" in n) n.selectionStart = e, n.selectionEnd = Math.min(t, n.value.length);
      else if (t = (e = n.ownerDocument || document) && e.defaultView || window, t.getSelection) {
        t = t.getSelection();
        var o = n.textContent.length, a = Math.min(r.start, o);
        r = r.end === void 0 ? a : Math.min(r.end, o), !t.extend && a > r && (o = r, r = a, a = o), o = C8(n, a);
        var l = C8(
          n,
          r
        );
        o && l && (t.rangeCount !== 1 || t.anchorNode !== o.node || t.anchorOffset !== o.offset || t.focusNode !== l.node || t.focusOffset !== l.offset) && (e = e.createRange(), e.setStart(o.node, o.offset), t.removeAllRanges(), a > r ? (t.addRange(e), t.extend(l.node, l.offset)) : (e.setEnd(l.node, l.offset), t.addRange(e)));
      }
    }
    for (e = [], t = n; t = t.parentNode; ) t.nodeType === 1 && e.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < e.length; n++) t = e[n], t.element.scrollLeft = t.left, t.element.scrollTop = t.top;
  }
}
var Mx = Ci && "documentMode" in document && 11 >= document.documentMode, Zs = null, l5 = null, Pl = null, u5 = !1;
function w8(t, e, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  u5 || Zs == null || Zs !== ku(r) || (r = Zs, "selectionStart" in r && hh(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Pl && Dl(Pl, r) || (Pl = r, r = Nu(l5, "onSelect"), 0 < r.length && (e = new ch("onSelect", "select", null, e, n), t.push({ event: e, listeners: r }), e.target = Zs)));
}
function I0(t, e) {
  var n = {};
  return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
}
var Ys = { animationend: I0("Animation", "AnimationEnd"), animationiteration: I0("Animation", "AnimationIteration"), animationstart: I0("Animation", "AnimationStart"), transitionend: I0("Transition", "TransitionEnd") }, qd = {}, Xp = {};
Ci && (Xp = document.createElement("div").style, "AnimationEvent" in window || (delete Ys.animationend.animation, delete Ys.animationiteration.animation, delete Ys.animationstart.animation), "TransitionEvent" in window || delete Ys.transitionend.transition);
function xc(t) {
  if (qd[t]) return qd[t];
  if (!Ys[t]) return t;
  var e = Ys[t], n;
  for (n in e) if (e.hasOwnProperty(n) && n in Xp) return qd[t] = e[n];
  return t;
}
var $p = xc("animationend"), Qp = xc("animationiteration"), qp = xc("animationstart"), Jp = xc("transitionend"), e9 = /* @__PURE__ */ new Map(), S8 = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function yo(t, e) {
  e9.set(t, e), is(e, [t]);
}
for (var Jd = 0; Jd < S8.length; Jd++) {
  var ef = S8[Jd], Lx = ef.toLowerCase(), Ax = ef[0].toUpperCase() + ef.slice(1);
  yo(Lx, "on" + Ax);
}
yo($p, "onAnimationEnd");
yo(Qp, "onAnimationIteration");
yo(qp, "onAnimationStart");
yo("dblclick", "onDoubleClick");
yo("focusin", "onFocus");
yo("focusout", "onBlur");
yo(Jp, "onTransitionEnd");
ca("onMouseEnter", ["mouseout", "mouseover"]);
ca("onMouseLeave", ["mouseout", "mouseover"]);
ca("onPointerEnter", ["pointerout", "pointerover"]);
ca("onPointerLeave", ["pointerout", "pointerover"]);
is("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
is("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
is("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
is("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
is("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
is("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Cl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), bx = new Set("cancel close invalid load scroll toggle".split(" ").concat(Cl));
function k8(t, e, n) {
  var r = t.type || "unknown-event";
  t.currentTarget = n, Lv(r, e, void 0, t), t.currentTarget = null;
}
function t9(t, e) {
  e = (e & 4) !== 0;
  for (var n = 0; n < t.length; n++) {
    var r = t[n], o = r.event;
    r = r.listeners;
    e: {
      var a = void 0;
      if (e) for (var l = r.length - 1; 0 <= l; l--) {
        var c = r[l], d = c.instance, p = c.currentTarget;
        if (c = c.listener, d !== a && o.isPropagationStopped()) break e;
        k8(o, c, p), a = d;
      }
      else for (l = 0; l < r.length; l++) {
        if (c = r[l], d = c.instance, p = c.currentTarget, c = c.listener, d !== a && o.isPropagationStopped()) break e;
        k8(o, c, p), a = d;
      }
    }
  }
  if (Lu) throw t = i5, Lu = !1, i5 = null, t;
}
function vt(t, e) {
  var n = e[p5];
  n === void 0 && (n = e[p5] = /* @__PURE__ */ new Set());
  var r = t + "__bubble";
  n.has(r) || (n9(e, t, 2, !1), n.add(r));
}
function tf(t, e, n) {
  var r = 0;
  e && (r |= 4), n9(n, t, r, e);
}
var D0 = "_reactListening" + Math.random().toString(36).slice(2);
function Gl(t) {
  if (!t[D0]) {
    t[D0] = !0, up.forEach(function(n) {
      n !== "selectionchange" && (bx.has(n) || tf(n, !1, t), tf(n, !0, t));
    });
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[D0] || (e[D0] = !0, tf("selectionchange", !1, e));
  }
}
function n9(t, e, n, r) {
  switch (Op(e)) {
    case 1:
      var o = Gv;
      break;
    case 4:
      o = Uv;
      break;
    default:
      o = lh;
  }
  n = o.bind(null, e, n, t), o = void 0, !r5 || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (o = !0), r ? o !== void 0 ? t.addEventListener(e, n, { capture: !0, passive: o }) : t.addEventListener(e, n, !0) : o !== void 0 ? t.addEventListener(e, n, { passive: o }) : t.addEventListener(e, n, !1);
}
function nf(t, e, n, r, o) {
  var a = r;
  if (!(e & 1) && !(e & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var l = r.tag;
    if (l === 3 || l === 4) {
      var c = r.stateNode.containerInfo;
      if (c === o || c.nodeType === 8 && c.parentNode === o) break;
      if (l === 4) for (l = r.return; l !== null; ) {
        var d = l.tag;
        if ((d === 3 || d === 4) && (d = l.stateNode.containerInfo, d === o || d.nodeType === 8 && d.parentNode === o)) return;
        l = l.return;
      }
      for (; c !== null; ) {
        if (l = Zo(c), l === null) return;
        if (d = l.tag, d === 5 || d === 6) {
          r = a = l;
          continue e;
        }
        c = c.parentNode;
      }
    }
    r = r.return;
  }
  Mp(function() {
    var p = a, y = ih(n), k = [];
    e: {
      var x = e9.get(t);
      if (x !== void 0) {
        var w = ch, m = t;
        switch (t) {
          case "keypress":
            if (pu(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = ix;
            break;
          case "focusin":
            m = "focus", w = Xd;
            break;
          case "focusout":
            m = "blur", w = Xd;
            break;
          case "beforeblur":
          case "afterblur":
            w = Xd;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = f8;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = Zv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = ax;
            break;
          case $p:
          case Qp:
          case qp:
            w = Xv;
            break;
          case Jp:
            w = ux;
            break;
          case "scroll":
            w = Bv;
            break;
          case "wheel":
            w = dx;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = Qv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = p8;
        }
        var S = (e & 4) !== 0, b = !S && t === "scroll", L = S ? x !== null ? x + "Capture" : null : x;
        S = [];
        for (var M = p, g; M !== null; ) {
          g = M;
          var C = g.stateNode;
          if (g.tag === 5 && C !== null && (g = C, L !== null && (C = zl(M, L), C != null && S.push(Ul(M, C, g)))), b) break;
          M = M.return;
        }
        0 < S.length && (x = new w(x, m, null, n, y), k.push({ event: x, listeners: S }));
      }
    }
    if (!(e & 7)) {
      e: {
        if (x = t === "mouseover" || t === "pointerover", w = t === "mouseout" || t === "pointerout", x && n !== t5 && (m = n.relatedTarget || n.fromElement) && (Zo(m) || m[wi])) break e;
        if ((w || x) && (x = y.window === y ? y : (x = y.ownerDocument) ? x.defaultView || x.parentWindow : window, w ? (m = n.relatedTarget || n.toElement, w = p, m = m ? Zo(m) : null, m !== null && (b = os(m), m !== b || m.tag !== 5 && m.tag !== 6) && (m = null)) : (w = null, m = p), w !== m)) {
          if (S = f8, C = "onMouseLeave", L = "onMouseEnter", M = "mouse", (t === "pointerout" || t === "pointerover") && (S = p8, C = "onPointerLeave", L = "onPointerEnter", M = "pointer"), b = w == null ? x : Ks(w), g = m == null ? x : Ks(m), x = new S(C, M + "leave", w, n, y), x.target = b, x.relatedTarget = g, C = null, Zo(y) === p && (S = new S(L, M + "enter", m, n, y), S.target = g, S.relatedTarget = b, C = S), b = C, w && m) t: {
            for (S = w, L = m, M = 0, g = S; g; g = Vs(g)) M++;
            for (g = 0, C = L; C; C = Vs(C)) g++;
            for (; 0 < M - g; ) S = Vs(S), M--;
            for (; 0 < g - M; ) L = Vs(L), g--;
            for (; M--; ) {
              if (S === L || L !== null && S === L.alternate) break t;
              S = Vs(S), L = Vs(L);
            }
            S = null;
          }
          else S = null;
          w !== null && M8(k, x, w, S, !1), m !== null && b !== null && M8(k, b, m, S, !0);
        }
      }
      e: {
        if (x = p ? Ks(p) : window, w = x.nodeName && x.nodeName.toLowerCase(), w === "select" || w === "input" && x.type === "file") var A = vx;
        else if (y8(x)) if (Wp) A = wx;
        else {
          A = _x;
          var E = xx;
        }
        else (w = x.nodeName) && w.toLowerCase() === "input" && (x.type === "checkbox" || x.type === "radio") && (A = Cx);
        if (A && (A = A(t, p))) {
          Bp(k, A, n, y);
          break e;
        }
        E && E(t, x, p), t === "focusout" && (E = x._wrapperState) && E.controlled && x.type === "number" && $f(x, "number", x.value);
      }
      switch (E = p ? Ks(p) : window, t) {
        case "focusin":
          (y8(E) || E.contentEditable === "true") && (Zs = E, l5 = p, Pl = null);
          break;
        case "focusout":
          Pl = l5 = Zs = null;
          break;
        case "mousedown":
          u5 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          u5 = !1, w8(k, n, y);
          break;
        case "selectionchange":
          if (Mx) break;
        case "keydown":
        case "keyup":
          w8(k, n, y);
      }
      var T;
      if (fh) e: {
        switch (t) {
          case "compositionstart":
            var P = "onCompositionStart";
            break e;
          case "compositionend":
            P = "onCompositionEnd";
            break e;
          case "compositionupdate":
            P = "onCompositionUpdate";
            break e;
        }
        P = void 0;
      }
      else Ws ? Gp(t, n) && (P = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (Dp && n.locale !== "ko" && (Ws || P !== "onCompositionStart" ? P === "onCompositionEnd" && Ws && (T = Ip()) : (eo = y, uh = "value" in eo ? eo.value : eo.textContent, Ws = !0)), E = Nu(p, P), 0 < E.length && (P = new h8(P, t, null, n, y), k.push({ event: P, listeners: E }), T ? P.data = T : (T = Up(n), T !== null && (P.data = T)))), (T = hx ? px(t, n) : gx(t, n)) && (p = Nu(p, "onBeforeInput"), 0 < p.length && (y = new h8("onBeforeInput", "beforeinput", null, n, y), k.push({ event: y, listeners: p }), y.data = T));
    }
    t9(k, e);
  });
}
function Ul(t, e, n) {
  return { instance: t, listener: e, currentTarget: n };
}
function Nu(t, e) {
  for (var n = e + "Capture", r = []; t !== null; ) {
    var o = t, a = o.stateNode;
    o.tag === 5 && a !== null && (o = a, a = zl(t, n), a != null && r.unshift(Ul(t, a, o)), a = zl(t, e), a != null && r.push(Ul(t, a, o))), t = t.return;
  }
  return r;
}
function Vs(t) {
  if (t === null) return null;
  do
    t = t.return;
  while (t && t.tag !== 5);
  return t || null;
}
function M8(t, e, n, r, o) {
  for (var a = e._reactName, l = []; n !== null && n !== r; ) {
    var c = n, d = c.alternate, p = c.stateNode;
    if (d !== null && d === r) break;
    c.tag === 5 && p !== null && (c = p, o ? (d = zl(n, a), d != null && l.unshift(Ul(n, d, c))) : o || (d = zl(n, a), d != null && l.push(Ul(n, d, c)))), n = n.return;
  }
  l.length !== 0 && t.push({ event: e, listeners: l });
}
var Px = /\r\n?/g, Ex = /\u0000|\uFFFD/g;
function L8(t) {
  return (typeof t == "string" ? t : "" + t).replace(Px, `
`).replace(Ex, "");
}
function G0(t, e, n) {
  if (e = L8(e), L8(t) !== e && n) throw Error(se(425));
}
function Hu() {
}
var c5 = null, d5 = null;
function f5(t, e) {
  return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
}
var h5 = typeof setTimeout == "function" ? setTimeout : void 0, Nx = typeof clearTimeout == "function" ? clearTimeout : void 0, A8 = typeof Promise == "function" ? Promise : void 0, Hx = typeof queueMicrotask == "function" ? queueMicrotask : typeof A8 < "u" ? function(t) {
  return A8.resolve(null).then(t).catch(Vx);
} : h5;
function Vx(t) {
  setTimeout(function() {
    throw t;
  });
}
function rf(t, e) {
  var n = e, r = 0;
  do {
    var o = n.nextSibling;
    if (t.removeChild(n), o && o.nodeType === 8) if (n = o.data, n === "/$") {
      if (r === 0) {
        t.removeChild(o), Ol(e);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = o;
  } while (n);
  Ol(e);
}
function so(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3) break;
    if (e === 8) {
      if (e = t.data, e === "$" || e === "$!" || e === "$?") break;
      if (e === "/$") return null;
    }
  }
  return t;
}
function b8(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var n = t.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (e === 0) return t;
        e--;
      } else n === "/$" && e++;
    }
    t = t.previousSibling;
  }
  return null;
}
var Ma = Math.random().toString(36).slice(2), Wr = "__reactFiber$" + Ma, Bl = "__reactProps$" + Ma, wi = "__reactContainer$" + Ma, p5 = "__reactEvents$" + Ma, Tx = "__reactListeners$" + Ma, Rx = "__reactHandles$" + Ma;
function Zo(t) {
  var e = t[Wr];
  if (e) return e;
  for (var n = t.parentNode; n; ) {
    if (e = n[wi] || n[Wr]) {
      if (n = e.alternate, e.child !== null || n !== null && n.child !== null) for (t = b8(t); t !== null; ) {
        if (n = t[Wr]) return n;
        t = b8(t);
      }
      return e;
    }
    t = n, n = t.parentNode;
  }
  return null;
}
function r1(t) {
  return t = t[Wr] || t[wi], !t || t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3 ? null : t;
}
function Ks(t) {
  if (t.tag === 5 || t.tag === 6) return t.stateNode;
  throw Error(se(33));
}
function _c(t) {
  return t[Bl] || null;
}
var g5 = [], Xs = -1;
function vo(t) {
  return { current: t };
}
function xt(t) {
  0 > Xs || (t.current = g5[Xs], g5[Xs] = null, Xs--);
}
function gt(t, e) {
  Xs++, g5[Xs] = t.current, t.current = e;
}
var go = {}, xn = vo(go), On = vo(!1), qo = go;
function da(t, e) {
  var n = t.type.contextTypes;
  if (!n) return go;
  var r = t.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === e) return r.__reactInternalMemoizedMaskedChildContext;
  var o = {}, a;
  for (a in n) o[a] = e[a];
  return r && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = e, t.__reactInternalMemoizedMaskedChildContext = o), o;
}
function In(t) {
  return t = t.childContextTypes, t != null;
}
function Vu() {
  xt(On), xt(xn);
}
function P8(t, e, n) {
  if (xn.current !== go) throw Error(se(168));
  gt(xn, e), gt(On, n);
}
function r9(t, e, n) {
  var r = t.stateNode;
  if (e = e.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in e)) throw Error(se(108, xv(t) || "Unknown", o));
  return Pt({}, n, r);
}
function Tu(t) {
  return t = (t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext || go, qo = xn.current, gt(xn, t), gt(On, On.current), !0;
}
function E8(t, e, n) {
  var r = t.stateNode;
  if (!r) throw Error(se(169));
  n ? (t = r9(t, e, qo), r.__reactInternalMemoizedMergedChildContext = t, xt(On), xt(xn), gt(xn, t)) : xt(On), gt(On, n);
}
var hi = null, Cc = !1, of = !1;
function i9(t) {
  hi === null ? hi = [t] : hi.push(t);
}
function zx(t) {
  Cc = !0, i9(t);
}
function xo() {
  if (!of && hi !== null) {
    of = !0;
    var t = 0, e = ut;
    try {
      var n = hi;
      for (ut = 1; t < n.length; t++) {
        var r = n[t];
        do
          r = r(!0);
        while (r !== null);
      }
      hi = null, Cc = !1;
    } catch (o) {
      throw hi !== null && (hi = hi.slice(t + 1)), Pp(oh, xo), o;
    } finally {
      ut = e, of = !1;
    }
  }
  return null;
}
var $s = [], Qs = 0, Ru = null, zu = 0, ar = [], lr = 0, Jo = null, pi = 1, gi = "";
function Go(t, e) {
  $s[Qs++] = zu, $s[Qs++] = Ru, Ru = t, zu = e;
}
function o9(t, e, n) {
  ar[lr++] = pi, ar[lr++] = gi, ar[lr++] = Jo, Jo = t;
  var r = pi;
  t = gi;
  var o = 32 - Mr(r) - 1;
  r &= ~(1 << o), n += 1;
  var a = 32 - Mr(e) + o;
  if (30 < a) {
    var l = o - o % 5;
    a = (r & (1 << l) - 1).toString(32), r >>= l, o -= l, pi = 1 << 32 - Mr(e) + o | n << o | r, gi = a + t;
  } else pi = 1 << a | n << o | r, gi = t;
}
function ph(t) {
  t.return !== null && (Go(t, 1), o9(t, 1, 0));
}
function gh(t) {
  for (; t === Ru; ) Ru = $s[--Qs], $s[Qs] = null, zu = $s[--Qs], $s[Qs] = null;
  for (; t === Jo; ) Jo = ar[--lr], ar[lr] = null, gi = ar[--lr], ar[lr] = null, pi = ar[--lr], ar[lr] = null;
}
var Zn = null, Wn = null, St = !1, kr = null;
function s9(t, e) {
  var n = ur(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = e, n.return = t, e = t.deletions, e === null ? (t.deletions = [n], t.flags |= 16) : e.push(n);
}
function N8(t, e) {
  switch (t.tag) {
    case 5:
      var n = t.type;
      return e = e.nodeType !== 1 || n.toLowerCase() !== e.nodeName.toLowerCase() ? null : e, e !== null ? (t.stateNode = e, Zn = t, Wn = so(e.firstChild), !0) : !1;
    case 6:
      return e = t.pendingProps === "" || e.nodeType !== 3 ? null : e, e !== null ? (t.stateNode = e, Zn = t, Wn = null, !0) : !1;
    case 13:
      return e = e.nodeType !== 8 ? null : e, e !== null ? (n = Jo !== null ? { id: pi, overflow: gi } : null, t.memoizedState = { dehydrated: e, treeContext: n, retryLane: 1073741824 }, n = ur(18, null, null, 0), n.stateNode = e, n.return = t, t.child = n, Zn = t, Wn = null, !0) : !1;
    default:
      return !1;
  }
}
function m5(t) {
  return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
}
function y5(t) {
  if (St) {
    var e = Wn;
    if (e) {
      var n = e;
      if (!N8(t, e)) {
        if (m5(t)) throw Error(se(418));
        e = so(n.nextSibling);
        var r = Zn;
        e && N8(t, e) ? s9(r, n) : (t.flags = t.flags & -4097 | 2, St = !1, Zn = t);
      }
    } else {
      if (m5(t)) throw Error(se(418));
      t.flags = t.flags & -4097 | 2, St = !1, Zn = t;
    }
  }
}
function H8(t) {
  for (t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13; ) t = t.return;
  Zn = t;
}
function U0(t) {
  if (t !== Zn) return !1;
  if (!St) return H8(t), St = !0, !1;
  var e;
  if ((e = t.tag !== 3) && !(e = t.tag !== 5) && (e = t.type, e = e !== "head" && e !== "body" && !f5(t.type, t.memoizedProps)), e && (e = Wn)) {
    if (m5(t)) throw a9(), Error(se(418));
    for (; e; ) s9(t, e), e = so(e.nextSibling);
  }
  if (H8(t), t.tag === 13) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(se(317));
    e: {
      for (t = t.nextSibling, e = 0; t; ) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "/$") {
            if (e === 0) {
              Wn = so(t.nextSibling);
              break e;
            }
            e--;
          } else n !== "$" && n !== "$!" && n !== "$?" || e++;
        }
        t = t.nextSibling;
      }
      Wn = null;
    }
  } else Wn = Zn ? so(t.stateNode.nextSibling) : null;
  return !0;
}
function a9() {
  for (var t = Wn; t; ) t = so(t.nextSibling);
}
function fa() {
  Wn = Zn = null, St = !1;
}
function mh(t) {
  kr === null ? kr = [t] : kr.push(t);
}
var Fx = Mi.ReactCurrentBatchConfig;
function cl(t, e, n) {
  if (t = n.ref, t !== null && typeof t != "function" && typeof t != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(se(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(se(147, t));
      var o = r, a = "" + t;
      return e !== null && e.ref !== null && typeof e.ref == "function" && e.ref._stringRef === a ? e.ref : (e = function(l) {
        var c = o.refs;
        l === null ? delete c[a] : c[a] = l;
      }, e._stringRef = a, e);
    }
    if (typeof t != "string") throw Error(se(284));
    if (!n._owner) throw Error(se(290, t));
  }
  return t;
}
function B0(t, e) {
  throw t = Object.prototype.toString.call(e), Error(se(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
}
function V8(t) {
  var e = t._init;
  return e(t._payload);
}
function l9(t) {
  function e(L, M) {
    if (t) {
      var g = L.deletions;
      g === null ? (L.deletions = [M], L.flags |= 16) : g.push(M);
    }
  }
  function n(L, M) {
    if (!t) return null;
    for (; M !== null; ) e(L, M), M = M.sibling;
    return null;
  }
  function r(L, M) {
    for (L = /* @__PURE__ */ new Map(); M !== null; ) M.key !== null ? L.set(M.key, M) : L.set(M.index, M), M = M.sibling;
    return L;
  }
  function o(L, M) {
    return L = co(L, M), L.index = 0, L.sibling = null, L;
  }
  function a(L, M, g) {
    return L.index = g, t ? (g = L.alternate, g !== null ? (g = g.index, g < M ? (L.flags |= 2, M) : g) : (L.flags |= 2, M)) : (L.flags |= 1048576, M);
  }
  function l(L) {
    return t && L.alternate === null && (L.flags |= 2), L;
  }
  function c(L, M, g, C) {
    return M === null || M.tag !== 6 ? (M = ff(g, L.mode, C), M.return = L, M) : (M = o(M, g), M.return = L, M);
  }
  function d(L, M, g, C) {
    var A = g.type;
    return A === Bs ? y(L, M, g.props.children, C, g.key) : M !== null && (M.elementType === A || typeof A == "object" && A !== null && A.$$typeof === $i && V8(A) === M.type) ? (C = o(M, g.props), C.ref = cl(L, M, g), C.return = L, C) : (C = Cu(g.type, g.key, g.props, null, L.mode, C), C.ref = cl(L, M, g), C.return = L, C);
  }
  function p(L, M, g, C) {
    return M === null || M.tag !== 4 || M.stateNode.containerInfo !== g.containerInfo || M.stateNode.implementation !== g.implementation ? (M = hf(g, L.mode, C), M.return = L, M) : (M = o(M, g.children || []), M.return = L, M);
  }
  function y(L, M, g, C, A) {
    return M === null || M.tag !== 7 ? (M = Qo(g, L.mode, C, A), M.return = L, M) : (M = o(M, g), M.return = L, M);
  }
  function k(L, M, g) {
    if (typeof M == "string" && M !== "" || typeof M == "number") return M = ff("" + M, L.mode, g), M.return = L, M;
    if (typeof M == "object" && M !== null) {
      switch (M.$$typeof) {
        case V0:
          return g = Cu(M.type, M.key, M.props, null, L.mode, g), g.ref = cl(L, null, M), g.return = L, g;
        case Us:
          return M = hf(M, L.mode, g), M.return = L, M;
        case $i:
          var C = M._init;
          return k(L, C(M._payload), g);
      }
      if (xl(M) || ol(M)) return M = Qo(M, L.mode, g, null), M.return = L, M;
      B0(L, M);
    }
    return null;
  }
  function x(L, M, g, C) {
    var A = M !== null ? M.key : null;
    if (typeof g == "string" && g !== "" || typeof g == "number") return A !== null ? null : c(L, M, "" + g, C);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case V0:
          return g.key === A ? d(L, M, g, C) : null;
        case Us:
          return g.key === A ? p(L, M, g, C) : null;
        case $i:
          return A = g._init, x(
            L,
            M,
            A(g._payload),
            C
          );
      }
      if (xl(g) || ol(g)) return A !== null ? null : y(L, M, g, C, null);
      B0(L, g);
    }
    return null;
  }
  function w(L, M, g, C, A) {
    if (typeof C == "string" && C !== "" || typeof C == "number") return L = L.get(g) || null, c(M, L, "" + C, A);
    if (typeof C == "object" && C !== null) {
      switch (C.$$typeof) {
        case V0:
          return L = L.get(C.key === null ? g : C.key) || null, d(M, L, C, A);
        case Us:
          return L = L.get(C.key === null ? g : C.key) || null, p(M, L, C, A);
        case $i:
          var E = C._init;
          return w(L, M, g, E(C._payload), A);
      }
      if (xl(C) || ol(C)) return L = L.get(g) || null, y(M, L, C, A, null);
      B0(M, C);
    }
    return null;
  }
  function m(L, M, g, C) {
    for (var A = null, E = null, T = M, P = M = 0, R = null; T !== null && P < g.length; P++) {
      T.index > P ? (R = T, T = null) : R = T.sibling;
      var V = x(L, T, g[P], C);
      if (V === null) {
        T === null && (T = R);
        break;
      }
      t && T && V.alternate === null && e(L, T), M = a(V, M, P), E === null ? A = V : E.sibling = V, E = V, T = R;
    }
    if (P === g.length) return n(L, T), St && Go(L, P), A;
    if (T === null) {
      for (; P < g.length; P++) T = k(L, g[P], C), T !== null && (M = a(T, M, P), E === null ? A = T : E.sibling = T, E = T);
      return St && Go(L, P), A;
    }
    for (T = r(L, T); P < g.length; P++) R = w(T, L, P, g[P], C), R !== null && (t && R.alternate !== null && T.delete(R.key === null ? P : R.key), M = a(R, M, P), E === null ? A = R : E.sibling = R, E = R);
    return t && T.forEach(function(F) {
      return e(L, F);
    }), St && Go(L, P), A;
  }
  function S(L, M, g, C) {
    var A = ol(g);
    if (typeof A != "function") throw Error(se(150));
    if (g = A.call(g), g == null) throw Error(se(151));
    for (var E = A = null, T = M, P = M = 0, R = null, V = g.next(); T !== null && !V.done; P++, V = g.next()) {
      T.index > P ? (R = T, T = null) : R = T.sibling;
      var F = x(L, T, V.value, C);
      if (F === null) {
        T === null && (T = R);
        break;
      }
      t && T && F.alternate === null && e(L, T), M = a(F, M, P), E === null ? A = F : E.sibling = F, E = F, T = R;
    }
    if (V.done) return n(
      L,
      T
    ), St && Go(L, P), A;
    if (T === null) {
      for (; !V.done; P++, V = g.next()) V = k(L, V.value, C), V !== null && (M = a(V, M, P), E === null ? A = V : E.sibling = V, E = V);
      return St && Go(L, P), A;
    }
    for (T = r(L, T); !V.done; P++, V = g.next()) V = w(T, L, P, V.value, C), V !== null && (t && V.alternate !== null && T.delete(V.key === null ? P : V.key), M = a(V, M, P), E === null ? A = V : E.sibling = V, E = V);
    return t && T.forEach(function(W) {
      return e(L, W);
    }), St && Go(L, P), A;
  }
  function b(L, M, g, C) {
    if (typeof g == "object" && g !== null && g.type === Bs && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case V0:
          e: {
            for (var A = g.key, E = M; E !== null; ) {
              if (E.key === A) {
                if (A = g.type, A === Bs) {
                  if (E.tag === 7) {
                    n(L, E.sibling), M = o(E, g.props.children), M.return = L, L = M;
                    break e;
                  }
                } else if (E.elementType === A || typeof A == "object" && A !== null && A.$$typeof === $i && V8(A) === E.type) {
                  n(L, E.sibling), M = o(E, g.props), M.ref = cl(L, E, g), M.return = L, L = M;
                  break e;
                }
                n(L, E);
                break;
              } else e(L, E);
              E = E.sibling;
            }
            g.type === Bs ? (M = Qo(g.props.children, L.mode, C, g.key), M.return = L, L = M) : (C = Cu(g.type, g.key, g.props, null, L.mode, C), C.ref = cl(L, M, g), C.return = L, L = C);
          }
          return l(L);
        case Us:
          e: {
            for (E = g.key; M !== null; ) {
              if (M.key === E) if (M.tag === 4 && M.stateNode.containerInfo === g.containerInfo && M.stateNode.implementation === g.implementation) {
                n(L, M.sibling), M = o(M, g.children || []), M.return = L, L = M;
                break e;
              } else {
                n(L, M);
                break;
              }
              else e(L, M);
              M = M.sibling;
            }
            M = hf(g, L.mode, C), M.return = L, L = M;
          }
          return l(L);
        case $i:
          return E = g._init, b(L, M, E(g._payload), C);
      }
      if (xl(g)) return m(L, M, g, C);
      if (ol(g)) return S(L, M, g, C);
      B0(L, g);
    }
    return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g, M !== null && M.tag === 6 ? (n(L, M.sibling), M = o(M, g), M.return = L, L = M) : (n(L, M), M = ff(g, L.mode, C), M.return = L, L = M), l(L)) : n(L, M);
  }
  return b;
}
var ha = l9(!0), u9 = l9(!1), Fu = vo(null), ju = null, qs = null, yh = null;
function vh() {
  yh = qs = ju = null;
}
function xh(t) {
  var e = Fu.current;
  xt(Fu), t._currentValue = e;
}
function v5(t, e, n) {
  for (; t !== null; ) {
    var r = t.alternate;
    if ((t.childLanes & e) !== e ? (t.childLanes |= e, r !== null && (r.childLanes |= e)) : r !== null && (r.childLanes & e) !== e && (r.childLanes |= e), t === n) break;
    t = t.return;
  }
}
function oa(t, e) {
  ju = t, yh = qs = null, t = t.dependencies, t !== null && t.firstContext !== null && (t.lanes & e && (jn = !0), t.firstContext = null);
}
function dr(t) {
  var e = t._currentValue;
  if (yh !== t) if (t = { context: t, memoizedValue: e, next: null }, qs === null) {
    if (ju === null) throw Error(se(308));
    qs = t, ju.dependencies = { lanes: 0, firstContext: t };
  } else qs = qs.next = t;
  return e;
}
var Yo = null;
function _h(t) {
  Yo === null ? Yo = [t] : Yo.push(t);
}
function c9(t, e, n, r) {
  var o = e.interleaved;
  return o === null ? (n.next = n, _h(e)) : (n.next = o.next, o.next = n), e.interleaved = n, Si(t, r);
}
function Si(t, e) {
  t.lanes |= e;
  var n = t.alternate;
  for (n !== null && (n.lanes |= e), n = t, t = t.return; t !== null; ) t.childLanes |= e, n = t.alternate, n !== null && (n.childLanes |= e), n = t, t = t.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Qi = !1;
function Ch(t) {
  t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function d9(t, e) {
  t = t.updateQueue, e.updateQueue === t && (e.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, effects: t.effects });
}
function yi(t, e) {
  return { eventTime: t, lane: e, tag: 0, payload: null, callback: null, next: null };
}
function ao(t, e, n) {
  var r = t.updateQueue;
  if (r === null) return null;
  if (r = r.shared, nt & 2) {
    var o = r.pending;
    return o === null ? e.next = e : (e.next = o.next, o.next = e), r.pending = e, Si(t, n);
  }
  return o = r.interleaved, o === null ? (e.next = e, _h(r)) : (e.next = o.next, o.next = e), r.interleaved = e, Si(t, n);
}
function gu(t, e, n) {
  if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194240) !== 0)) {
    var r = e.lanes;
    r &= t.pendingLanes, n |= r, e.lanes = n, sh(t, n);
  }
}
function T8(t, e) {
  var n = t.updateQueue, r = t.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var o = null, a = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var l = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        a === null ? o = a = l : a = a.next = l, n = n.next;
      } while (n !== null);
      a === null ? o = a = e : a = a.next = e;
    } else o = a = e;
    n = { baseState: r.baseState, firstBaseUpdate: o, lastBaseUpdate: a, shared: r.shared, effects: r.effects }, t.updateQueue = n;
    return;
  }
  t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
}
function Ou(t, e, n, r) {
  var o = t.updateQueue;
  Qi = !1;
  var a = o.firstBaseUpdate, l = o.lastBaseUpdate, c = o.shared.pending;
  if (c !== null) {
    o.shared.pending = null;
    var d = c, p = d.next;
    d.next = null, l === null ? a = p : l.next = p, l = d;
    var y = t.alternate;
    y !== null && (y = y.updateQueue, c = y.lastBaseUpdate, c !== l && (c === null ? y.firstBaseUpdate = p : c.next = p, y.lastBaseUpdate = d));
  }
  if (a !== null) {
    var k = o.baseState;
    l = 0, y = p = d = null, c = a;
    do {
      var x = c.lane, w = c.eventTime;
      if ((r & x) === x) {
        y !== null && (y = y.next = {
          eventTime: w,
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        });
        e: {
          var m = t, S = c;
          switch (x = e, w = n, S.tag) {
            case 1:
              if (m = S.payload, typeof m == "function") {
                k = m.call(w, k, x);
                break e;
              }
              k = m;
              break e;
            case 3:
              m.flags = m.flags & -65537 | 128;
            case 0:
              if (m = S.payload, x = typeof m == "function" ? m.call(w, k, x) : m, x == null) break e;
              k = Pt({}, k, x);
              break e;
            case 2:
              Qi = !0;
          }
        }
        c.callback !== null && c.lane !== 0 && (t.flags |= 64, x = o.effects, x === null ? o.effects = [c] : x.push(c));
      } else w = { eventTime: w, lane: x, tag: c.tag, payload: c.payload, callback: c.callback, next: null }, y === null ? (p = y = w, d = k) : y = y.next = w, l |= x;
      if (c = c.next, c === null) {
        if (c = o.shared.pending, c === null) break;
        x = c, c = x.next, x.next = null, o.lastBaseUpdate = x, o.shared.pending = null;
      }
    } while (!0);
    if (y === null && (d = k), o.baseState = d, o.firstBaseUpdate = p, o.lastBaseUpdate = y, e = o.shared.interleaved, e !== null) {
      o = e;
      do
        l |= o.lane, o = o.next;
      while (o !== e);
    } else a === null && (o.shared.lanes = 0);
    ts |= l, t.lanes = l, t.memoizedState = k;
  }
}
function R8(t, e, n) {
  if (t = e.effects, e.effects = null, t !== null) for (e = 0; e < t.length; e++) {
    var r = t[e], o = r.callback;
    if (o !== null) {
      if (r.callback = null, r = n, typeof o != "function") throw Error(se(191, o));
      o.call(r);
    }
  }
}
var i1 = {}, Kr = vo(i1), Wl = vo(i1), Zl = vo(i1);
function Ko(t) {
  if (t === i1) throw Error(se(174));
  return t;
}
function wh(t, e) {
  switch (gt(Zl, e), gt(Wl, t), gt(Kr, i1), t = e.nodeType, t) {
    case 9:
    case 11:
      e = (e = e.documentElement) ? e.namespaceURI : qf(null, "");
      break;
    default:
      t = t === 8 ? e.parentNode : e, e = t.namespaceURI || null, t = t.tagName, e = qf(e, t);
  }
  xt(Kr), gt(Kr, e);
}
function pa() {
  xt(Kr), xt(Wl), xt(Zl);
}
function f9(t) {
  Ko(Zl.current);
  var e = Ko(Kr.current), n = qf(e, t.type);
  e !== n && (gt(Wl, t), gt(Kr, n));
}
function Sh(t) {
  Wl.current === t && (xt(Kr), xt(Wl));
}
var At = vo(0);
function Iu(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return e;
    } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
      if (e.flags & 128) return e;
    } else if (e.child !== null) {
      e.child.return = e, e = e.child;
      continue;
    }
    if (e === t) break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t) return null;
      e = e.return;
    }
    e.sibling.return = e.return, e = e.sibling;
  }
  return null;
}
var sf = [];
function kh() {
  for (var t = 0; t < sf.length; t++) sf[t]._workInProgressVersionPrimary = null;
  sf.length = 0;
}
var mu = Mi.ReactCurrentDispatcher, af = Mi.ReactCurrentBatchConfig, es = 0, bt = null, Wt = null, en = null, Du = !1, El = !1, Yl = 0, jx = 0;
function mn() {
  throw Error(se(321));
}
function Mh(t, e) {
  if (e === null) return !1;
  for (var n = 0; n < e.length && n < t.length; n++) if (!Pr(t[n], e[n])) return !1;
  return !0;
}
function Lh(t, e, n, r, o, a) {
  if (es = a, bt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, mu.current = t === null || t.memoizedState === null ? Gx : Ux, t = n(r, o), El) {
    a = 0;
    do {
      if (El = !1, Yl = 0, 25 <= a) throw Error(se(301));
      a += 1, en = Wt = null, e.updateQueue = null, mu.current = Bx, t = n(r, o);
    } while (El);
  }
  if (mu.current = Gu, e = Wt !== null && Wt.next !== null, es = 0, en = Wt = bt = null, Du = !1, e) throw Error(se(300));
  return t;
}
function Ah() {
  var t = Yl !== 0;
  return Yl = 0, t;
}
function Ur() {
  var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return en === null ? bt.memoizedState = en = t : en = en.next = t, en;
}
function fr() {
  if (Wt === null) {
    var t = bt.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = Wt.next;
  var e = en === null ? bt.memoizedState : en.next;
  if (e !== null) en = e, Wt = t;
  else {
    if (t === null) throw Error(se(310));
    Wt = t, t = { memoizedState: Wt.memoizedState, baseState: Wt.baseState, baseQueue: Wt.baseQueue, queue: Wt.queue, next: null }, en === null ? bt.memoizedState = en = t : en = en.next = t;
  }
  return en;
}
function Kl(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function lf(t) {
  var e = fr(), n = e.queue;
  if (n === null) throw Error(se(311));
  n.lastRenderedReducer = t;
  var r = Wt, o = r.baseQueue, a = n.pending;
  if (a !== null) {
    if (o !== null) {
      var l = o.next;
      o.next = a.next, a.next = l;
    }
    r.baseQueue = o = a, n.pending = null;
  }
  if (o !== null) {
    a = o.next, r = r.baseState;
    var c = l = null, d = null, p = a;
    do {
      var y = p.lane;
      if ((es & y) === y) d !== null && (d = d.next = { lane: 0, action: p.action, hasEagerState: p.hasEagerState, eagerState: p.eagerState, next: null }), r = p.hasEagerState ? p.eagerState : t(r, p.action);
      else {
        var k = {
          lane: y,
          action: p.action,
          hasEagerState: p.hasEagerState,
          eagerState: p.eagerState,
          next: null
        };
        d === null ? (c = d = k, l = r) : d = d.next = k, bt.lanes |= y, ts |= y;
      }
      p = p.next;
    } while (p !== null && p !== a);
    d === null ? l = r : d.next = c, Pr(r, e.memoizedState) || (jn = !0), e.memoizedState = r, e.baseState = l, e.baseQueue = d, n.lastRenderedState = r;
  }
  if (t = n.interleaved, t !== null) {
    o = t;
    do
      a = o.lane, bt.lanes |= a, ts |= a, o = o.next;
    while (o !== t);
  } else o === null && (n.lanes = 0);
  return [e.memoizedState, n.dispatch];
}
function uf(t) {
  var e = fr(), n = e.queue;
  if (n === null) throw Error(se(311));
  n.lastRenderedReducer = t;
  var r = n.dispatch, o = n.pending, a = e.memoizedState;
  if (o !== null) {
    n.pending = null;
    var l = o = o.next;
    do
      a = t(a, l.action), l = l.next;
    while (l !== o);
    Pr(a, e.memoizedState) || (jn = !0), e.memoizedState = a, e.baseQueue === null && (e.baseState = a), n.lastRenderedState = a;
  }
  return [a, r];
}
function h9() {
}
function p9(t, e) {
  var n = bt, r = fr(), o = e(), a = !Pr(r.memoizedState, o);
  if (a && (r.memoizedState = o, jn = !0), r = r.queue, bh(y9.bind(null, n, r, t), [t]), r.getSnapshot !== e || a || en !== null && en.memoizedState.tag & 1) {
    if (n.flags |= 2048, Xl(9, m9.bind(null, n, r, o, e), void 0, null), tn === null) throw Error(se(349));
    es & 30 || g9(n, e, o);
  }
  return o;
}
function g9(t, e, n) {
  t.flags |= 16384, t = { getSnapshot: e, value: n }, e = bt.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, bt.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
}
function m9(t, e, n, r) {
  e.value = n, e.getSnapshot = r, v9(e) && x9(t);
}
function y9(t, e, n) {
  return n(function() {
    v9(e) && x9(t);
  });
}
function v9(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Pr(t, n);
  } catch {
    return !0;
  }
}
function x9(t) {
  var e = Si(t, 1);
  e !== null && Lr(e, t, 1, -1);
}
function z8(t) {
  var e = Ur();
  return typeof t == "function" && (t = t()), e.memoizedState = e.baseState = t, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Kl, lastRenderedState: t }, e.queue = t, t = t.dispatch = Dx.bind(null, bt, t), [e.memoizedState, t];
}
function Xl(t, e, n, r) {
  return t = { tag: t, create: e, destroy: n, deps: r, next: null }, e = bt.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, bt.updateQueue = e, e.lastEffect = t.next = t) : (n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (r = n.next, n.next = t, t.next = r, e.lastEffect = t)), t;
}
function _9() {
  return fr().memoizedState;
}
function yu(t, e, n, r) {
  var o = Ur();
  bt.flags |= t, o.memoizedState = Xl(1 | e, n, void 0, r === void 0 ? null : r);
}
function wc(t, e, n, r) {
  var o = fr();
  r = r === void 0 ? null : r;
  var a = void 0;
  if (Wt !== null) {
    var l = Wt.memoizedState;
    if (a = l.destroy, r !== null && Mh(r, l.deps)) {
      o.memoizedState = Xl(e, n, a, r);
      return;
    }
  }
  bt.flags |= t, o.memoizedState = Xl(1 | e, n, a, r);
}
function F8(t, e) {
  return yu(8390656, 8, t, e);
}
function bh(t, e) {
  return wc(2048, 8, t, e);
}
function C9(t, e) {
  return wc(4, 2, t, e);
}
function w9(t, e) {
  return wc(4, 4, t, e);
}
function S9(t, e) {
  if (typeof e == "function") return t = t(), e(t), function() {
    e(null);
  };
  if (e != null) return t = t(), e.current = t, function() {
    e.current = null;
  };
}
function k9(t, e, n) {
  return n = n != null ? n.concat([t]) : null, wc(4, 4, S9.bind(null, e, t), n);
}
function Ph() {
}
function M9(t, e) {
  var n = fr();
  e = e === void 0 ? null : e;
  var r = n.memoizedState;
  return r !== null && e !== null && Mh(e, r[1]) ? r[0] : (n.memoizedState = [t, e], t);
}
function L9(t, e) {
  var n = fr();
  e = e === void 0 ? null : e;
  var r = n.memoizedState;
  return r !== null && e !== null && Mh(e, r[1]) ? r[0] : (t = t(), n.memoizedState = [t, e], t);
}
function A9(t, e, n) {
  return es & 21 ? (Pr(n, e) || (n = Hp(), bt.lanes |= n, ts |= n, t.baseState = !0), e) : (t.baseState && (t.baseState = !1, jn = !0), t.memoizedState = n);
}
function Ox(t, e) {
  var n = ut;
  ut = n !== 0 && 4 > n ? n : 4, t(!0);
  var r = af.transition;
  af.transition = {};
  try {
    t(!1), e();
  } finally {
    ut = n, af.transition = r;
  }
}
function b9() {
  return fr().memoizedState;
}
function Ix(t, e, n) {
  var r = uo(t);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, P9(t)) E9(e, n);
  else if (n = c9(t, e, n, r), n !== null) {
    var o = Mn();
    Lr(n, t, r, o), N9(n, e, r);
  }
}
function Dx(t, e, n) {
  var r = uo(t), o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (P9(t)) E9(e, o);
  else {
    var a = t.alternate;
    if (t.lanes === 0 && (a === null || a.lanes === 0) && (a = e.lastRenderedReducer, a !== null)) try {
      var l = e.lastRenderedState, c = a(l, n);
      if (o.hasEagerState = !0, o.eagerState = c, Pr(c, l)) {
        var d = e.interleaved;
        d === null ? (o.next = o, _h(e)) : (o.next = d.next, d.next = o), e.interleaved = o;
        return;
      }
    } catch {
    } finally {
    }
    n = c9(t, e, o, r), n !== null && (o = Mn(), Lr(n, t, r, o), N9(n, e, r));
  }
}
function P9(t) {
  var e = t.alternate;
  return t === bt || e !== null && e === bt;
}
function E9(t, e) {
  El = Du = !0;
  var n = t.pending;
  n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
}
function N9(t, e, n) {
  if (n & 4194240) {
    var r = e.lanes;
    r &= t.pendingLanes, n |= r, e.lanes = n, sh(t, n);
  }
}
var Gu = { readContext: dr, useCallback: mn, useContext: mn, useEffect: mn, useImperativeHandle: mn, useInsertionEffect: mn, useLayoutEffect: mn, useMemo: mn, useReducer: mn, useRef: mn, useState: mn, useDebugValue: mn, useDeferredValue: mn, useTransition: mn, useMutableSource: mn, useSyncExternalStore: mn, useId: mn, unstable_isNewReconciler: !1 }, Gx = { readContext: dr, useCallback: function(t, e) {
  return Ur().memoizedState = [t, e === void 0 ? null : e], t;
}, useContext: dr, useEffect: F8, useImperativeHandle: function(t, e, n) {
  return n = n != null ? n.concat([t]) : null, yu(
    4194308,
    4,
    S9.bind(null, e, t),
    n
  );
}, useLayoutEffect: function(t, e) {
  return yu(4194308, 4, t, e);
}, useInsertionEffect: function(t, e) {
  return yu(4, 2, t, e);
}, useMemo: function(t, e) {
  var n = Ur();
  return e = e === void 0 ? null : e, t = t(), n.memoizedState = [t, e], t;
}, useReducer: function(t, e, n) {
  var r = Ur();
  return e = n !== void 0 ? n(e) : e, r.memoizedState = r.baseState = e, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: e }, r.queue = t, t = t.dispatch = Ix.bind(null, bt, t), [r.memoizedState, t];
}, useRef: function(t) {
  var e = Ur();
  return t = { current: t }, e.memoizedState = t;
}, useState: z8, useDebugValue: Ph, useDeferredValue: function(t) {
  return Ur().memoizedState = t;
}, useTransition: function() {
  var t = z8(!1), e = t[0];
  return t = Ox.bind(null, t[1]), Ur().memoizedState = t, [e, t];
}, useMutableSource: function() {
}, useSyncExternalStore: function(t, e, n) {
  var r = bt, o = Ur();
  if (St) {
    if (n === void 0) throw Error(se(407));
    n = n();
  } else {
    if (n = e(), tn === null) throw Error(se(349));
    es & 30 || g9(r, e, n);
  }
  o.memoizedState = n;
  var a = { value: n, getSnapshot: e };
  return o.queue = a, F8(y9.bind(
    null,
    r,
    a,
    t
  ), [t]), r.flags |= 2048, Xl(9, m9.bind(null, r, a, n, e), void 0, null), n;
}, useId: function() {
  var t = Ur(), e = tn.identifierPrefix;
  if (St) {
    var n = gi, r = pi;
    n = (r & ~(1 << 32 - Mr(r) - 1)).toString(32) + n, e = ":" + e + "R" + n, n = Yl++, 0 < n && (e += "H" + n.toString(32)), e += ":";
  } else n = jx++, e = ":" + e + "r" + n.toString(32) + ":";
  return t.memoizedState = e;
}, unstable_isNewReconciler: !1 }, Ux = {
  readContext: dr,
  useCallback: M9,
  useContext: dr,
  useEffect: bh,
  useImperativeHandle: k9,
  useInsertionEffect: C9,
  useLayoutEffect: w9,
  useMemo: L9,
  useReducer: lf,
  useRef: _9,
  useState: function() {
    return lf(Kl);
  },
  useDebugValue: Ph,
  useDeferredValue: function(t) {
    var e = fr();
    return A9(e, Wt.memoizedState, t);
  },
  useTransition: function() {
    var t = lf(Kl)[0], e = fr().memoizedState;
    return [t, e];
  },
  useMutableSource: h9,
  useSyncExternalStore: p9,
  useId: b9,
  unstable_isNewReconciler: !1
}, Bx = { readContext: dr, useCallback: M9, useContext: dr, useEffect: bh, useImperativeHandle: k9, useInsertionEffect: C9, useLayoutEffect: w9, useMemo: L9, useReducer: uf, useRef: _9, useState: function() {
  return uf(Kl);
}, useDebugValue: Ph, useDeferredValue: function(t) {
  var e = fr();
  return Wt === null ? e.memoizedState = t : A9(e, Wt.memoizedState, t);
}, useTransition: function() {
  var t = uf(Kl)[0], e = fr().memoizedState;
  return [t, e];
}, useMutableSource: h9, useSyncExternalStore: p9, useId: b9, unstable_isNewReconciler: !1 };
function wr(t, e) {
  if (t && t.defaultProps) {
    e = Pt({}, e), t = t.defaultProps;
    for (var n in t) e[n] === void 0 && (e[n] = t[n]);
    return e;
  }
  return e;
}
function x5(t, e, n, r) {
  e = t.memoizedState, n = n(r, e), n = n == null ? e : Pt({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
}
var Sc = { isMounted: function(t) {
  return (t = t._reactInternals) ? os(t) === t : !1;
}, enqueueSetState: function(t, e, n) {
  t = t._reactInternals;
  var r = Mn(), o = uo(t), a = yi(r, o);
  a.payload = e, n != null && (a.callback = n), e = ao(t, a, o), e !== null && (Lr(e, t, o, r), gu(e, t, o));
}, enqueueReplaceState: function(t, e, n) {
  t = t._reactInternals;
  var r = Mn(), o = uo(t), a = yi(r, o);
  a.tag = 1, a.payload = e, n != null && (a.callback = n), e = ao(t, a, o), e !== null && (Lr(e, t, o, r), gu(e, t, o));
}, enqueueForceUpdate: function(t, e) {
  t = t._reactInternals;
  var n = Mn(), r = uo(t), o = yi(n, r);
  o.tag = 2, e != null && (o.callback = e), e = ao(t, o, r), e !== null && (Lr(e, t, r, n), gu(e, t, r));
} };
function j8(t, e, n, r, o, a, l) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(r, a, l) : e.prototype && e.prototype.isPureReactComponent ? !Dl(n, r) || !Dl(o, a) : !0;
}
function H9(t, e, n) {
  var r = !1, o = go, a = e.contextType;
  return typeof a == "object" && a !== null ? a = dr(a) : (o = In(e) ? qo : xn.current, r = e.contextTypes, a = (r = r != null) ? da(t, o) : go), e = new e(n, a), t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = Sc, t.stateNode = e, e._reactInternals = t, r && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = o, t.__reactInternalMemoizedMaskedChildContext = a), e;
}
function O8(t, e, n, r) {
  t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, r), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, r), e.state !== t && Sc.enqueueReplaceState(e, e.state, null);
}
function _5(t, e, n, r) {
  var o = t.stateNode;
  o.props = n, o.state = t.memoizedState, o.refs = {}, Ch(t);
  var a = e.contextType;
  typeof a == "object" && a !== null ? o.context = dr(a) : (a = In(e) ? qo : xn.current, o.context = da(t, a)), o.state = t.memoizedState, a = e.getDerivedStateFromProps, typeof a == "function" && (x5(t, e, a, n), o.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (e = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), e !== o.state && Sc.enqueueReplaceState(o, o.state, null), Ou(t, n, o, r), o.state = t.memoizedState), typeof o.componentDidMount == "function" && (t.flags |= 4194308);
}
function ga(t, e) {
  try {
    var n = "", r = e;
    do
      n += vv(r), r = r.return;
    while (r);
    var o = n;
  } catch (a) {
    o = `
Error generating stack: ` + a.message + `
` + a.stack;
  }
  return { value: t, source: e, stack: o, digest: null };
}
function cf(t, e, n) {
  return { value: t, source: null, stack: n ?? null, digest: e ?? null };
}
function C5(t, e) {
  try {
    console.error(e.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Wx = typeof WeakMap == "function" ? WeakMap : Map;
function V9(t, e, n) {
  n = yi(-1, n), n.tag = 3, n.payload = { element: null };
  var r = e.value;
  return n.callback = function() {
    Bu || (Bu = !0, N5 = r), C5(t, e);
  }, n;
}
function T9(t, e, n) {
  n = yi(-1, n), n.tag = 3;
  var r = t.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = e.value;
    n.payload = function() {
      return r(o);
    }, n.callback = function() {
      C5(t, e);
    };
  }
  var a = t.stateNode;
  return a !== null && typeof a.componentDidCatch == "function" && (n.callback = function() {
    C5(t, e), typeof r != "function" && (lo === null ? lo = /* @__PURE__ */ new Set([this]) : lo.add(this));
    var l = e.stack;
    this.componentDidCatch(e.value, { componentStack: l !== null ? l : "" });
  }), n;
}
function I8(t, e, n) {
  var r = t.pingCache;
  if (r === null) {
    r = t.pingCache = new Wx();
    var o = /* @__PURE__ */ new Set();
    r.set(e, o);
  } else o = r.get(e), o === void 0 && (o = /* @__PURE__ */ new Set(), r.set(e, o));
  o.has(n) || (o.add(n), t = o_.bind(null, t, e, n), e.then(t, t));
}
function D8(t) {
  do {
    var e;
    if ((e = t.tag === 13) && (e = t.memoizedState, e = e !== null ? e.dehydrated !== null : !0), e) return t;
    t = t.return;
  } while (t !== null);
  return null;
}
function G8(t, e, n, r, o) {
  return t.mode & 1 ? (t.flags |= 65536, t.lanes = o, t) : (t === e ? t.flags |= 65536 : (t.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (e = yi(-1, 1), e.tag = 2, ao(n, e, 1))), n.lanes |= 1), t);
}
var Zx = Mi.ReactCurrentOwner, jn = !1;
function Sn(t, e, n, r) {
  e.child = t === null ? u9(e, null, n, r) : ha(e, t.child, n, r);
}
function U8(t, e, n, r, o) {
  n = n.render;
  var a = e.ref;
  return oa(e, o), r = Lh(t, e, n, r, a, o), n = Ah(), t !== null && !jn ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~o, ki(t, e, o)) : (St && n && ph(e), e.flags |= 1, Sn(t, e, r, o), e.child);
}
function B8(t, e, n, r, o) {
  if (t === null) {
    var a = n.type;
    return typeof a == "function" && !Fh(a) && a.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (e.tag = 15, e.type = a, R9(t, e, a, r, o)) : (t = Cu(n.type, null, r, e, e.mode, o), t.ref = e.ref, t.return = e, e.child = t);
  }
  if (a = t.child, !(t.lanes & o)) {
    var l = a.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Dl, n(l, r) && t.ref === e.ref) return ki(t, e, o);
  }
  return e.flags |= 1, t = co(a, r), t.ref = e.ref, t.return = e, e.child = t;
}
function R9(t, e, n, r, o) {
  if (t !== null) {
    var a = t.memoizedProps;
    if (Dl(a, r) && t.ref === e.ref) if (jn = !1, e.pendingProps = r = a, (t.lanes & o) !== 0) t.flags & 131072 && (jn = !0);
    else return e.lanes = t.lanes, ki(t, e, o);
  }
  return w5(t, e, n, r, o);
}
function z9(t, e, n) {
  var r = e.pendingProps, o = r.children, a = t !== null ? t.memoizedState : null;
  if (r.mode === "hidden") if (!(e.mode & 1)) e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, gt(ea, Bn), Bn |= n;
  else {
    if (!(n & 1073741824)) return t = a !== null ? a.baseLanes | n : n, e.lanes = e.childLanes = 1073741824, e.memoizedState = { baseLanes: t, cachePool: null, transitions: null }, e.updateQueue = null, gt(ea, Bn), Bn |= t, null;
    e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = a !== null ? a.baseLanes : n, gt(ea, Bn), Bn |= r;
  }
  else a !== null ? (r = a.baseLanes | n, e.memoizedState = null) : r = n, gt(ea, Bn), Bn |= r;
  return Sn(t, e, o, n), e.child;
}
function F9(t, e) {
  var n = e.ref;
  (t === null && n !== null || t !== null && t.ref !== n) && (e.flags |= 512, e.flags |= 2097152);
}
function w5(t, e, n, r, o) {
  var a = In(n) ? qo : xn.current;
  return a = da(e, a), oa(e, o), n = Lh(t, e, n, r, a, o), r = Ah(), t !== null && !jn ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~o, ki(t, e, o)) : (St && r && ph(e), e.flags |= 1, Sn(t, e, n, o), e.child);
}
function W8(t, e, n, r, o) {
  if (In(n)) {
    var a = !0;
    Tu(e);
  } else a = !1;
  if (oa(e, o), e.stateNode === null) vu(t, e), H9(e, n, r), _5(e, n, r, o), r = !0;
  else if (t === null) {
    var l = e.stateNode, c = e.memoizedProps;
    l.props = c;
    var d = l.context, p = n.contextType;
    typeof p == "object" && p !== null ? p = dr(p) : (p = In(n) ? qo : xn.current, p = da(e, p));
    var y = n.getDerivedStateFromProps, k = typeof y == "function" || typeof l.getSnapshotBeforeUpdate == "function";
    k || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (c !== r || d !== p) && O8(e, l, r, p), Qi = !1;
    var x = e.memoizedState;
    l.state = x, Ou(e, r, l, o), d = e.memoizedState, c !== r || x !== d || On.current || Qi ? (typeof y == "function" && (x5(e, n, y, r), d = e.memoizedState), (c = Qi || j8(e, n, c, r, x, d, p)) ? (k || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = r, e.memoizedState = d), l.props = r, l.state = d, l.context = p, r = c) : (typeof l.componentDidMount == "function" && (e.flags |= 4194308), r = !1);
  } else {
    l = e.stateNode, d9(t, e), c = e.memoizedProps, p = e.type === e.elementType ? c : wr(e.type, c), l.props = p, k = e.pendingProps, x = l.context, d = n.contextType, typeof d == "object" && d !== null ? d = dr(d) : (d = In(n) ? qo : xn.current, d = da(e, d));
    var w = n.getDerivedStateFromProps;
    (y = typeof w == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (c !== k || x !== d) && O8(e, l, r, d), Qi = !1, x = e.memoizedState, l.state = x, Ou(e, r, l, o);
    var m = e.memoizedState;
    c !== k || x !== m || On.current || Qi ? (typeof w == "function" && (x5(e, n, w, r), m = e.memoizedState), (p = Qi || j8(e, n, p, r, x, m, d) || !1) ? (y || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(r, m, d), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(r, m, d)), typeof l.componentDidUpdate == "function" && (e.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || c === t.memoizedProps && x === t.memoizedState || (e.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && x === t.memoizedState || (e.flags |= 1024), e.memoizedProps = r, e.memoizedState = m), l.props = r, l.state = m, l.context = d, r = p) : (typeof l.componentDidUpdate != "function" || c === t.memoizedProps && x === t.memoizedState || (e.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && x === t.memoizedState || (e.flags |= 1024), r = !1);
  }
  return S5(t, e, n, r, a, o);
}
function S5(t, e, n, r, o, a) {
  F9(t, e);
  var l = (e.flags & 128) !== 0;
  if (!r && !l) return o && E8(e, n, !1), ki(t, e, a);
  r = e.stateNode, Zx.current = e;
  var c = l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return e.flags |= 1, t !== null && l ? (e.child = ha(e, t.child, null, a), e.child = ha(e, null, c, a)) : Sn(t, e, c, a), e.memoizedState = r.state, o && E8(e, n, !0), e.child;
}
function j9(t) {
  var e = t.stateNode;
  e.pendingContext ? P8(t, e.pendingContext, e.pendingContext !== e.context) : e.context && P8(t, e.context, !1), wh(t, e.containerInfo);
}
function Z8(t, e, n, r, o) {
  return fa(), mh(o), e.flags |= 256, Sn(t, e, n, r), e.child;
}
var k5 = { dehydrated: null, treeContext: null, retryLane: 0 };
function M5(t) {
  return { baseLanes: t, cachePool: null, transitions: null };
}
function O9(t, e, n) {
  var r = e.pendingProps, o = At.current, a = !1, l = (e.flags & 128) !== 0, c;
  if ((c = l) || (c = t !== null && t.memoizedState === null ? !1 : (o & 2) !== 0), c ? (a = !0, e.flags &= -129) : (t === null || t.memoizedState !== null) && (o |= 1), gt(At, o & 1), t === null)
    return y5(e), t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null) ? (e.mode & 1 ? t.data === "$!" ? e.lanes = 8 : e.lanes = 1073741824 : e.lanes = 1, null) : (l = r.children, t = r.fallback, a ? (r = e.mode, a = e.child, l = { mode: "hidden", children: l }, !(r & 1) && a !== null ? (a.childLanes = 0, a.pendingProps = l) : a = Lc(l, r, 0, null), t = Qo(t, r, n, null), a.return = e, t.return = e, a.sibling = t, e.child = a, e.child.memoizedState = M5(n), e.memoizedState = k5, t) : Eh(e, l));
  if (o = t.memoizedState, o !== null && (c = o.dehydrated, c !== null)) return Yx(t, e, l, r, c, o, n);
  if (a) {
    a = r.fallback, l = e.mode, o = t.child, c = o.sibling;
    var d = { mode: "hidden", children: r.children };
    return !(l & 1) && e.child !== o ? (r = e.child, r.childLanes = 0, r.pendingProps = d, e.deletions = null) : (r = co(o, d), r.subtreeFlags = o.subtreeFlags & 14680064), c !== null ? a = co(c, a) : (a = Qo(a, l, n, null), a.flags |= 2), a.return = e, r.return = e, r.sibling = a, e.child = r, r = a, a = e.child, l = t.child.memoizedState, l = l === null ? M5(n) : { baseLanes: l.baseLanes | n, cachePool: null, transitions: l.transitions }, a.memoizedState = l, a.childLanes = t.childLanes & ~n, e.memoizedState = k5, r;
  }
  return a = t.child, t = a.sibling, r = co(a, { mode: "visible", children: r.children }), !(e.mode & 1) && (r.lanes = n), r.return = e, r.sibling = null, t !== null && (n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t)), e.child = r, e.memoizedState = null, r;
}
function Eh(t, e) {
  return e = Lc({ mode: "visible", children: e }, t.mode, 0, null), e.return = t, t.child = e;
}
function W0(t, e, n, r) {
  return r !== null && mh(r), ha(e, t.child, null, n), t = Eh(e, e.pendingProps.children), t.flags |= 2, e.memoizedState = null, t;
}
function Yx(t, e, n, r, o, a, l) {
  if (n)
    return e.flags & 256 ? (e.flags &= -257, r = cf(Error(se(422))), W0(t, e, l, r)) : e.memoizedState !== null ? (e.child = t.child, e.flags |= 128, null) : (a = r.fallback, o = e.mode, r = Lc({ mode: "visible", children: r.children }, o, 0, null), a = Qo(a, o, l, null), a.flags |= 2, r.return = e, a.return = e, r.sibling = a, e.child = r, e.mode & 1 && ha(e, t.child, null, l), e.child.memoizedState = M5(l), e.memoizedState = k5, a);
  if (!(e.mode & 1)) return W0(t, e, l, null);
  if (o.data === "$!") {
    if (r = o.nextSibling && o.nextSibling.dataset, r) var c = r.dgst;
    return r = c, a = Error(se(419)), r = cf(a, r, void 0), W0(t, e, l, r);
  }
  if (c = (l & t.childLanes) !== 0, jn || c) {
    if (r = tn, r !== null) {
      switch (l & -l) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      o = o & (r.suspendedLanes | l) ? 0 : o, o !== 0 && o !== a.retryLane && (a.retryLane = o, Si(t, o), Lr(r, t, o, -1));
    }
    return zh(), r = cf(Error(se(421))), W0(t, e, l, r);
  }
  return o.data === "$?" ? (e.flags |= 128, e.child = t.child, e = s_.bind(null, t), o._reactRetry = e, null) : (t = a.treeContext, Wn = so(o.nextSibling), Zn = e, St = !0, kr = null, t !== null && (ar[lr++] = pi, ar[lr++] = gi, ar[lr++] = Jo, pi = t.id, gi = t.overflow, Jo = e), e = Eh(e, r.children), e.flags |= 4096, e);
}
function Y8(t, e, n) {
  t.lanes |= e;
  var r = t.alternate;
  r !== null && (r.lanes |= e), v5(t.return, e, n);
}
function df(t, e, n, r, o) {
  var a = t.memoizedState;
  a === null ? t.memoizedState = { isBackwards: e, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: o } : (a.isBackwards = e, a.rendering = null, a.renderingStartTime = 0, a.last = r, a.tail = n, a.tailMode = o);
}
function I9(t, e, n) {
  var r = e.pendingProps, o = r.revealOrder, a = r.tail;
  if (Sn(t, e, r.children, n), r = At.current, r & 2) r = r & 1 | 2, e.flags |= 128;
  else {
    if (t !== null && t.flags & 128) e: for (t = e.child; t !== null; ) {
      if (t.tag === 13) t.memoizedState !== null && Y8(t, n, e);
      else if (t.tag === 19) Y8(t, n, e);
      else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break e;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) break e;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    r &= 1;
  }
  if (gt(At, r), !(e.mode & 1)) e.memoizedState = null;
  else switch (o) {
    case "forwards":
      for (n = e.child, o = null; n !== null; ) t = n.alternate, t !== null && Iu(t) === null && (o = n), n = n.sibling;
      n = o, n === null ? (o = e.child, e.child = null) : (o = n.sibling, n.sibling = null), df(e, !1, o, n, a);
      break;
    case "backwards":
      for (n = null, o = e.child, e.child = null; o !== null; ) {
        if (t = o.alternate, t !== null && Iu(t) === null) {
          e.child = o;
          break;
        }
        t = o.sibling, o.sibling = n, n = o, o = t;
      }
      df(e, !0, n, null, a);
      break;
    case "together":
      df(e, !1, null, null, void 0);
      break;
    default:
      e.memoizedState = null;
  }
  return e.child;
}
function vu(t, e) {
  !(e.mode & 1) && t !== null && (t.alternate = null, e.alternate = null, e.flags |= 2);
}
function ki(t, e, n) {
  if (t !== null && (e.dependencies = t.dependencies), ts |= e.lanes, !(n & e.childLanes)) return null;
  if (t !== null && e.child !== t.child) throw Error(se(153));
  if (e.child !== null) {
    for (t = e.child, n = co(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; ) t = t.sibling, n = n.sibling = co(t, t.pendingProps), n.return = e;
    n.sibling = null;
  }
  return e.child;
}
function Kx(t, e, n) {
  switch (e.tag) {
    case 3:
      j9(e), fa();
      break;
    case 5:
      f9(e);
      break;
    case 1:
      In(e.type) && Tu(e);
      break;
    case 4:
      wh(e, e.stateNode.containerInfo);
      break;
    case 10:
      var r = e.type._context, o = e.memoizedProps.value;
      gt(Fu, r._currentValue), r._currentValue = o;
      break;
    case 13:
      if (r = e.memoizedState, r !== null)
        return r.dehydrated !== null ? (gt(At, At.current & 1), e.flags |= 128, null) : n & e.child.childLanes ? O9(t, e, n) : (gt(At, At.current & 1), t = ki(t, e, n), t !== null ? t.sibling : null);
      gt(At, At.current & 1);
      break;
    case 19:
      if (r = (n & e.childLanes) !== 0, t.flags & 128) {
        if (r) return I9(t, e, n);
        e.flags |= 128;
      }
      if (o = e.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), gt(At, At.current), r) break;
      return null;
    case 22:
    case 23:
      return e.lanes = 0, z9(t, e, n);
  }
  return ki(t, e, n);
}
var D9, L5, G9, U9;
D9 = function(t, e) {
  for (var n = e.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) t.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === e) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === e) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
L5 = function() {
};
G9 = function(t, e, n, r) {
  var o = t.memoizedProps;
  if (o !== r) {
    t = e.stateNode, Ko(Kr.current);
    var a = null;
    switch (n) {
      case "input":
        o = Kf(t, o), r = Kf(t, r), a = [];
        break;
      case "select":
        o = Pt({}, o, { value: void 0 }), r = Pt({}, r, { value: void 0 }), a = [];
        break;
      case "textarea":
        o = Qf(t, o), r = Qf(t, r), a = [];
        break;
      default:
        typeof o.onClick != "function" && typeof r.onClick == "function" && (t.onclick = Hu);
    }
    Jf(n, r);
    var l;
    n = null;
    for (p in o) if (!r.hasOwnProperty(p) && o.hasOwnProperty(p) && o[p] != null) if (p === "style") {
      var c = o[p];
      for (l in c) c.hasOwnProperty(l) && (n || (n = {}), n[l] = "");
    } else p !== "dangerouslySetInnerHTML" && p !== "children" && p !== "suppressContentEditableWarning" && p !== "suppressHydrationWarning" && p !== "autoFocus" && (Tl.hasOwnProperty(p) ? a || (a = []) : (a = a || []).push(p, null));
    for (p in r) {
      var d = r[p];
      if (c = o != null ? o[p] : void 0, r.hasOwnProperty(p) && d !== c && (d != null || c != null)) if (p === "style") if (c) {
        for (l in c) !c.hasOwnProperty(l) || d && d.hasOwnProperty(l) || (n || (n = {}), n[l] = "");
        for (l in d) d.hasOwnProperty(l) && c[l] !== d[l] && (n || (n = {}), n[l] = d[l]);
      } else n || (a || (a = []), a.push(
        p,
        n
      )), n = d;
      else p === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, c = c ? c.__html : void 0, d != null && c !== d && (a = a || []).push(p, d)) : p === "children" ? typeof d != "string" && typeof d != "number" || (a = a || []).push(p, "" + d) : p !== "suppressContentEditableWarning" && p !== "suppressHydrationWarning" && (Tl.hasOwnProperty(p) ? (d != null && p === "onScroll" && vt("scroll", t), a || c === d || (a = [])) : (a = a || []).push(p, d));
    }
    n && (a = a || []).push("style", n);
    var p = a;
    (e.updateQueue = p) && (e.flags |= 4);
  }
};
U9 = function(t, e, n, r) {
  n !== r && (e.flags |= 4);
};
function dl(t, e) {
  if (!St) switch (t.tailMode) {
    case "hidden":
      e = t.tail;
      for (var n = null; e !== null; ) e.alternate !== null && (n = e), e = e.sibling;
      n === null ? t.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = t.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : r.sibling = null;
  }
}
function yn(t) {
  var e = t.alternate !== null && t.alternate.child === t.child, n = 0, r = 0;
  if (e) for (var o = t.child; o !== null; ) n |= o.lanes | o.childLanes, r |= o.subtreeFlags & 14680064, r |= o.flags & 14680064, o.return = t, o = o.sibling;
  else for (o = t.child; o !== null; ) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, o.return = t, o = o.sibling;
  return t.subtreeFlags |= r, t.childLanes = n, e;
}
function Xx(t, e, n) {
  var r = e.pendingProps;
  switch (gh(e), e.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return yn(e), null;
    case 1:
      return In(e.type) && Vu(), yn(e), null;
    case 3:
      return r = e.stateNode, pa(), xt(On), xt(xn), kh(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (t === null || t.child === null) && (U0(e) ? e.flags |= 4 : t === null || t.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, kr !== null && (T5(kr), kr = null))), L5(t, e), yn(e), null;
    case 5:
      Sh(e);
      var o = Ko(Zl.current);
      if (n = e.type, t !== null && e.stateNode != null) G9(t, e, n, r, o), t.ref !== e.ref && (e.flags |= 512, e.flags |= 2097152);
      else {
        if (!r) {
          if (e.stateNode === null) throw Error(se(166));
          return yn(e), null;
        }
        if (t = Ko(Kr.current), U0(e)) {
          r = e.stateNode, n = e.type;
          var a = e.memoizedProps;
          switch (r[Wr] = e, r[Bl] = a, t = (e.mode & 1) !== 0, n) {
            case "dialog":
              vt("cancel", r), vt("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              vt("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Cl.length; o++) vt(Cl[o], r);
              break;
            case "source":
              vt("error", r);
              break;
            case "img":
            case "image":
            case "link":
              vt(
                "error",
                r
              ), vt("load", r);
              break;
            case "details":
              vt("toggle", r);
              break;
            case "input":
              n8(r, a), vt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!a.multiple }, vt("invalid", r);
              break;
            case "textarea":
              i8(r, a), vt("invalid", r);
          }
          Jf(n, a), o = null;
          for (var l in a) if (a.hasOwnProperty(l)) {
            var c = a[l];
            l === "children" ? typeof c == "string" ? r.textContent !== c && (a.suppressHydrationWarning !== !0 && G0(r.textContent, c, t), o = ["children", c]) : typeof c == "number" && r.textContent !== "" + c && (a.suppressHydrationWarning !== !0 && G0(
              r.textContent,
              c,
              t
            ), o = ["children", "" + c]) : Tl.hasOwnProperty(l) && c != null && l === "onScroll" && vt("scroll", r);
          }
          switch (n) {
            case "input":
              T0(r), r8(r, a, !0);
              break;
            case "textarea":
              T0(r), o8(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof a.onClick == "function" && (r.onclick = Hu);
          }
          r = o, e.updateQueue = r, r !== null && (e.flags |= 4);
        } else {
          l = o.nodeType === 9 ? o : o.ownerDocument, t === "http://www.w3.org/1999/xhtml" && (t = yp(n)), t === "http://www.w3.org/1999/xhtml" ? n === "script" ? (t = l.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild)) : typeof r.is == "string" ? t = l.createElement(n, { is: r.is }) : (t = l.createElement(n), n === "select" && (l = t, r.multiple ? l.multiple = !0 : r.size && (l.size = r.size))) : t = l.createElementNS(t, n), t[Wr] = e, t[Bl] = r, D9(t, e, !1, !1), e.stateNode = t;
          e: {
            switch (l = e5(n, r), n) {
              case "dialog":
                vt("cancel", t), vt("close", t), o = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                vt("load", t), o = r;
                break;
              case "video":
              case "audio":
                for (o = 0; o < Cl.length; o++) vt(Cl[o], t);
                o = r;
                break;
              case "source":
                vt("error", t), o = r;
                break;
              case "img":
              case "image":
              case "link":
                vt(
                  "error",
                  t
                ), vt("load", t), o = r;
                break;
              case "details":
                vt("toggle", t), o = r;
                break;
              case "input":
                n8(t, r), o = Kf(t, r), vt("invalid", t);
                break;
              case "option":
                o = r;
                break;
              case "select":
                t._wrapperState = { wasMultiple: !!r.multiple }, o = Pt({}, r, { value: void 0 }), vt("invalid", t);
                break;
              case "textarea":
                i8(t, r), o = Qf(t, r), vt("invalid", t);
                break;
              default:
                o = r;
            }
            Jf(n, o), c = o;
            for (a in c) if (c.hasOwnProperty(a)) {
              var d = c[a];
              a === "style" ? _p(t, d) : a === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, d != null && vp(t, d)) : a === "children" ? typeof d == "string" ? (n !== "textarea" || d !== "") && Rl(t, d) : typeof d == "number" && Rl(t, "" + d) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (Tl.hasOwnProperty(a) ? d != null && a === "onScroll" && vt("scroll", t) : d != null && eh(t, a, d, l));
            }
            switch (n) {
              case "input":
                T0(t), r8(t, r, !1);
                break;
              case "textarea":
                T0(t), o8(t);
                break;
              case "option":
                r.value != null && t.setAttribute("value", "" + po(r.value));
                break;
              case "select":
                t.multiple = !!r.multiple, a = r.value, a != null ? ta(t, !!r.multiple, a, !1) : r.defaultValue != null && ta(
                  t,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof o.onClick == "function" && (t.onclick = Hu);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (e.flags |= 4);
        }
        e.ref !== null && (e.flags |= 512, e.flags |= 2097152);
      }
      return yn(e), null;
    case 6:
      if (t && e.stateNode != null) U9(t, e, t.memoizedProps, r);
      else {
        if (typeof r != "string" && e.stateNode === null) throw Error(se(166));
        if (n = Ko(Zl.current), Ko(Kr.current), U0(e)) {
          if (r = e.stateNode, n = e.memoizedProps, r[Wr] = e, (a = r.nodeValue !== n) && (t = Zn, t !== null)) switch (t.tag) {
            case 3:
              G0(r.nodeValue, n, (t.mode & 1) !== 0);
              break;
            case 5:
              t.memoizedProps.suppressHydrationWarning !== !0 && G0(r.nodeValue, n, (t.mode & 1) !== 0);
          }
          a && (e.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Wr] = e, e.stateNode = r;
      }
      return yn(e), null;
    case 13:
      if (xt(At), r = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (St && Wn !== null && e.mode & 1 && !(e.flags & 128)) a9(), fa(), e.flags |= 98560, a = !1;
        else if (a = U0(e), r !== null && r.dehydrated !== null) {
          if (t === null) {
            if (!a) throw Error(se(318));
            if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(se(317));
            a[Wr] = e;
          } else fa(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
          yn(e), a = !1;
        } else kr !== null && (T5(kr), kr = null), a = !0;
        if (!a) return e.flags & 65536 ? e : null;
      }
      return e.flags & 128 ? (e.lanes = n, e) : (r = r !== null, r !== (t !== null && t.memoizedState !== null) && r && (e.child.flags |= 8192, e.mode & 1 && (t === null || At.current & 1 ? Zt === 0 && (Zt = 3) : zh())), e.updateQueue !== null && (e.flags |= 4), yn(e), null);
    case 4:
      return pa(), L5(t, e), t === null && Gl(e.stateNode.containerInfo), yn(e), null;
    case 10:
      return xh(e.type._context), yn(e), null;
    case 17:
      return In(e.type) && Vu(), yn(e), null;
    case 19:
      if (xt(At), a = e.memoizedState, a === null) return yn(e), null;
      if (r = (e.flags & 128) !== 0, l = a.rendering, l === null) if (r) dl(a, !1);
      else {
        if (Zt !== 0 || t !== null && t.flags & 128) for (t = e.child; t !== null; ) {
          if (l = Iu(t), l !== null) {
            for (e.flags |= 128, dl(a, !1), r = l.updateQueue, r !== null && (e.updateQueue = r, e.flags |= 4), e.subtreeFlags = 0, r = n, n = e.child; n !== null; ) a = n, t = r, a.flags &= 14680066, l = a.alternate, l === null ? (a.childLanes = 0, a.lanes = t, a.child = null, a.subtreeFlags = 0, a.memoizedProps = null, a.memoizedState = null, a.updateQueue = null, a.dependencies = null, a.stateNode = null) : (a.childLanes = l.childLanes, a.lanes = l.lanes, a.child = l.child, a.subtreeFlags = 0, a.deletions = null, a.memoizedProps = l.memoizedProps, a.memoizedState = l.memoizedState, a.updateQueue = l.updateQueue, a.type = l.type, t = l.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), n = n.sibling;
            return gt(At, At.current & 1 | 2), e.child;
          }
          t = t.sibling;
        }
        a.tail !== null && Ft() > ma && (e.flags |= 128, r = !0, dl(a, !1), e.lanes = 4194304);
      }
      else {
        if (!r) if (t = Iu(l), t !== null) {
          if (e.flags |= 128, r = !0, n = t.updateQueue, n !== null && (e.updateQueue = n, e.flags |= 4), dl(a, !0), a.tail === null && a.tailMode === "hidden" && !l.alternate && !St) return yn(e), null;
        } else 2 * Ft() - a.renderingStartTime > ma && n !== 1073741824 && (e.flags |= 128, r = !0, dl(a, !1), e.lanes = 4194304);
        a.isBackwards ? (l.sibling = e.child, e.child = l) : (n = a.last, n !== null ? n.sibling = l : e.child = l, a.last = l);
      }
      return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = Ft(), e.sibling = null, n = At.current, gt(At, r ? n & 1 | 2 : n & 1), e) : (yn(e), null);
    case 22:
    case 23:
      return Rh(), r = e.memoizedState !== null, t !== null && t.memoizedState !== null !== r && (e.flags |= 8192), r && e.mode & 1 ? Bn & 1073741824 && (yn(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : yn(e), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(se(156, e.tag));
}
function $x(t, e) {
  switch (gh(e), e.tag) {
    case 1:
      return In(e.type) && Vu(), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 3:
      return pa(), xt(On), xt(xn), kh(), t = e.flags, t & 65536 && !(t & 128) ? (e.flags = t & -65537 | 128, e) : null;
    case 5:
      return Sh(e), null;
    case 13:
      if (xt(At), t = e.memoizedState, t !== null && t.dehydrated !== null) {
        if (e.alternate === null) throw Error(se(340));
        fa();
      }
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 19:
      return xt(At), null;
    case 4:
      return pa(), null;
    case 10:
      return xh(e.type._context), null;
    case 22:
    case 23:
      return Rh(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Z0 = !1, vn = !1, Qx = typeof WeakSet == "function" ? WeakSet : Set, Me = null;
function Js(t, e) {
  var n = t.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Ht(t, e, r);
  }
  else n.current = null;
}
function A5(t, e, n) {
  try {
    n();
  } catch (r) {
    Ht(t, e, r);
  }
}
var K8 = !1;
function qx(t, e) {
  if (c5 = Pu, t = Kp(), hh(t)) {
    if ("selectionStart" in t) var n = { start: t.selectionStart, end: t.selectionEnd };
    else e: {
      n = (n = t.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var o = r.anchorOffset, a = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, a.nodeType;
        } catch {
          n = null;
          break e;
        }
        var l = 0, c = -1, d = -1, p = 0, y = 0, k = t, x = null;
        t: for (; ; ) {
          for (var w; k !== n || o !== 0 && k.nodeType !== 3 || (c = l + o), k !== a || r !== 0 && k.nodeType !== 3 || (d = l + r), k.nodeType === 3 && (l += k.nodeValue.length), (w = k.firstChild) !== null; )
            x = k, k = w;
          for (; ; ) {
            if (k === t) break t;
            if (x === n && ++p === o && (c = l), x === a && ++y === r && (d = l), (w = k.nextSibling) !== null) break;
            k = x, x = k.parentNode;
          }
          k = w;
        }
        n = c === -1 || d === -1 ? null : { start: c, end: d };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (d5 = { focusedElem: t, selectionRange: n }, Pu = !1, Me = e; Me !== null; ) if (e = Me, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null) t.return = e, Me = t;
  else for (; Me !== null; ) {
    e = Me;
    try {
      var m = e.alternate;
      if (e.flags & 1024) switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (m !== null) {
            var S = m.memoizedProps, b = m.memoizedState, L = e.stateNode, M = L.getSnapshotBeforeUpdate(e.elementType === e.type ? S : wr(e.type, S), b);
            L.__reactInternalSnapshotBeforeUpdate = M;
          }
          break;
        case 3:
          var g = e.stateNode.containerInfo;
          g.nodeType === 1 ? g.textContent = "" : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(se(163));
      }
    } catch (C) {
      Ht(e, e.return, C);
    }
    if (t = e.sibling, t !== null) {
      t.return = e.return, Me = t;
      break;
    }
    Me = e.return;
  }
  return m = K8, K8 = !1, m;
}
function Nl(t, e, n) {
  var r = e.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var o = r = r.next;
    do {
      if ((o.tag & t) === t) {
        var a = o.destroy;
        o.destroy = void 0, a !== void 0 && A5(e, n, a);
      }
      o = o.next;
    } while (o !== r);
  }
}
function kc(t, e) {
  if (e = e.updateQueue, e = e !== null ? e.lastEffect : null, e !== null) {
    var n = e = e.next;
    do {
      if ((n.tag & t) === t) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== e);
  }
}
function b5(t) {
  var e = t.ref;
  if (e !== null) {
    var n = t.stateNode;
    switch (t.tag) {
      case 5:
        t = n;
        break;
      default:
        t = n;
    }
    typeof e == "function" ? e(t) : e.current = t;
  }
}
function B9(t) {
  var e = t.alternate;
  e !== null && (t.alternate = null, B9(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && (delete e[Wr], delete e[Bl], delete e[p5], delete e[Tx], delete e[Rx])), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
}
function W9(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 4;
}
function X8(t) {
  e: for (; ; ) {
    for (; t.sibling === null; ) {
      if (t.return === null || W9(t.return)) return null;
      t = t.return;
    }
    for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
      if (t.flags & 2 || t.child === null || t.tag === 4) continue e;
      t.child.return = t, t = t.child;
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function P5(t, e, n) {
  var r = t.tag;
  if (r === 5 || r === 6) t = t.stateNode, e ? n.nodeType === 8 ? n.parentNode.insertBefore(t, e) : n.insertBefore(t, e) : (n.nodeType === 8 ? (e = n.parentNode, e.insertBefore(t, n)) : (e = n, e.appendChild(t)), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Hu));
  else if (r !== 4 && (t = t.child, t !== null)) for (P5(t, e, n), t = t.sibling; t !== null; ) P5(t, e, n), t = t.sibling;
}
function E5(t, e, n) {
  var r = t.tag;
  if (r === 5 || r === 6) t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
  else if (r !== 4 && (t = t.child, t !== null)) for (E5(t, e, n), t = t.sibling; t !== null; ) E5(t, e, n), t = t.sibling;
}
var on = null, Sr = !1;
function Bi(t, e, n) {
  for (n = n.child; n !== null; ) Z9(t, e, n), n = n.sibling;
}
function Z9(t, e, n) {
  if (Yr && typeof Yr.onCommitFiberUnmount == "function") try {
    Yr.onCommitFiberUnmount(mc, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      vn || Js(n, e);
    case 6:
      var r = on, o = Sr;
      on = null, Bi(t, e, n), on = r, Sr = o, on !== null && (Sr ? (t = on, n = n.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n)) : on.removeChild(n.stateNode));
      break;
    case 18:
      on !== null && (Sr ? (t = on, n = n.stateNode, t.nodeType === 8 ? rf(t.parentNode, n) : t.nodeType === 1 && rf(t, n), Ol(t)) : rf(on, n.stateNode));
      break;
    case 4:
      r = on, o = Sr, on = n.stateNode.containerInfo, Sr = !0, Bi(t, e, n), on = r, Sr = o;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!vn && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        o = r = r.next;
        do {
          var a = o, l = a.destroy;
          a = a.tag, l !== void 0 && (a & 2 || a & 4) && A5(n, e, l), o = o.next;
        } while (o !== r);
      }
      Bi(t, e, n);
      break;
    case 1:
      if (!vn && (Js(n, e), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (c) {
        Ht(n, e, c);
      }
      Bi(t, e, n);
      break;
    case 21:
      Bi(t, e, n);
      break;
    case 22:
      n.mode & 1 ? (vn = (r = vn) || n.memoizedState !== null, Bi(t, e, n), vn = r) : Bi(t, e, n);
      break;
    default:
      Bi(t, e, n);
  }
}
function $8(t) {
  var e = t.updateQueue;
  if (e !== null) {
    t.updateQueue = null;
    var n = t.stateNode;
    n === null && (n = t.stateNode = new Qx()), e.forEach(function(r) {
      var o = a_.bind(null, t, r);
      n.has(r) || (n.add(r), r.then(o, o));
    });
  }
}
function _r(t, e) {
  var n = e.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var o = n[r];
    try {
      var a = t, l = e, c = l;
      e: for (; c !== null; ) {
        switch (c.tag) {
          case 5:
            on = c.stateNode, Sr = !1;
            break e;
          case 3:
            on = c.stateNode.containerInfo, Sr = !0;
            break e;
          case 4:
            on = c.stateNode.containerInfo, Sr = !0;
            break e;
        }
        c = c.return;
      }
      if (on === null) throw Error(se(160));
      Z9(a, l, o), on = null, Sr = !1;
      var d = o.alternate;
      d !== null && (d.return = null), o.return = null;
    } catch (p) {
      Ht(o, e, p);
    }
  }
  if (e.subtreeFlags & 12854) for (e = e.child; e !== null; ) Y9(e, t), e = e.sibling;
}
function Y9(t, e) {
  var n = t.alternate, r = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (_r(e, t), Gr(t), r & 4) {
        try {
          Nl(3, t, t.return), kc(3, t);
        } catch (S) {
          Ht(t, t.return, S);
        }
        try {
          Nl(5, t, t.return);
        } catch (S) {
          Ht(t, t.return, S);
        }
      }
      break;
    case 1:
      _r(e, t), Gr(t), r & 512 && n !== null && Js(n, n.return);
      break;
    case 5:
      if (_r(e, t), Gr(t), r & 512 && n !== null && Js(n, n.return), t.flags & 32) {
        var o = t.stateNode;
        try {
          Rl(o, "");
        } catch (S) {
          Ht(t, t.return, S);
        }
      }
      if (r & 4 && (o = t.stateNode, o != null)) {
        var a = t.memoizedProps, l = n !== null ? n.memoizedProps : a, c = t.type, d = t.updateQueue;
        if (t.updateQueue = null, d !== null) try {
          c === "input" && a.type === "radio" && a.name != null && gp(o, a), e5(c, l);
          var p = e5(c, a);
          for (l = 0; l < d.length; l += 2) {
            var y = d[l], k = d[l + 1];
            y === "style" ? _p(o, k) : y === "dangerouslySetInnerHTML" ? vp(o, k) : y === "children" ? Rl(o, k) : eh(o, y, k, p);
          }
          switch (c) {
            case "input":
              Xf(o, a);
              break;
            case "textarea":
              mp(o, a);
              break;
            case "select":
              var x = o._wrapperState.wasMultiple;
              o._wrapperState.wasMultiple = !!a.multiple;
              var w = a.value;
              w != null ? ta(o, !!a.multiple, w, !1) : x !== !!a.multiple && (a.defaultValue != null ? ta(
                o,
                !!a.multiple,
                a.defaultValue,
                !0
              ) : ta(o, !!a.multiple, a.multiple ? [] : "", !1));
          }
          o[Bl] = a;
        } catch (S) {
          Ht(t, t.return, S);
        }
      }
      break;
    case 6:
      if (_r(e, t), Gr(t), r & 4) {
        if (t.stateNode === null) throw Error(se(162));
        o = t.stateNode, a = t.memoizedProps;
        try {
          o.nodeValue = a;
        } catch (S) {
          Ht(t, t.return, S);
        }
      }
      break;
    case 3:
      if (_r(e, t), Gr(t), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Ol(e.containerInfo);
      } catch (S) {
        Ht(t, t.return, S);
      }
      break;
    case 4:
      _r(e, t), Gr(t);
      break;
    case 13:
      _r(e, t), Gr(t), o = t.child, o.flags & 8192 && (a = o.memoizedState !== null, o.stateNode.isHidden = a, !a || o.alternate !== null && o.alternate.memoizedState !== null || (Vh = Ft())), r & 4 && $8(t);
      break;
    case 22:
      if (y = n !== null && n.memoizedState !== null, t.mode & 1 ? (vn = (p = vn) || y, _r(e, t), vn = p) : _r(e, t), Gr(t), r & 8192) {
        if (p = t.memoizedState !== null, (t.stateNode.isHidden = p) && !y && t.mode & 1) for (Me = t, y = t.child; y !== null; ) {
          for (k = Me = y; Me !== null; ) {
            switch (x = Me, w = x.child, x.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Nl(4, x, x.return);
                break;
              case 1:
                Js(x, x.return);
                var m = x.stateNode;
                if (typeof m.componentWillUnmount == "function") {
                  r = x, n = x.return;
                  try {
                    e = r, m.props = e.memoizedProps, m.state = e.memoizedState, m.componentWillUnmount();
                  } catch (S) {
                    Ht(r, n, S);
                  }
                }
                break;
              case 5:
                Js(x, x.return);
                break;
              case 22:
                if (x.memoizedState !== null) {
                  q8(k);
                  continue;
                }
            }
            w !== null ? (w.return = x, Me = w) : q8(k);
          }
          y = y.sibling;
        }
        e: for (y = null, k = t; ; ) {
          if (k.tag === 5) {
            if (y === null) {
              y = k;
              try {
                o = k.stateNode, p ? (a = o.style, typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none") : (c = k.stateNode, d = k.memoizedProps.style, l = d != null && d.hasOwnProperty("display") ? d.display : null, c.style.display = xp("display", l));
              } catch (S) {
                Ht(t, t.return, S);
              }
            }
          } else if (k.tag === 6) {
            if (y === null) try {
              k.stateNode.nodeValue = p ? "" : k.memoizedProps;
            } catch (S) {
              Ht(t, t.return, S);
            }
          } else if ((k.tag !== 22 && k.tag !== 23 || k.memoizedState === null || k === t) && k.child !== null) {
            k.child.return = k, k = k.child;
            continue;
          }
          if (k === t) break e;
          for (; k.sibling === null; ) {
            if (k.return === null || k.return === t) break e;
            y === k && (y = null), k = k.return;
          }
          y === k && (y = null), k.sibling.return = k.return, k = k.sibling;
        }
      }
      break;
    case 19:
      _r(e, t), Gr(t), r & 4 && $8(t);
      break;
    case 21:
      break;
    default:
      _r(
        e,
        t
      ), Gr(t);
  }
}
function Gr(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      e: {
        for (var n = t.return; n !== null; ) {
          if (W9(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(se(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (Rl(o, ""), r.flags &= -33);
          var a = X8(t);
          E5(t, a, o);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo, c = X8(t);
          P5(t, c, l);
          break;
        default:
          throw Error(se(161));
      }
    } catch (d) {
      Ht(t, t.return, d);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function Jx(t, e, n) {
  Me = t, K9(t);
}
function K9(t, e, n) {
  for (var r = (t.mode & 1) !== 0; Me !== null; ) {
    var o = Me, a = o.child;
    if (o.tag === 22 && r) {
      var l = o.memoizedState !== null || Z0;
      if (!l) {
        var c = o.alternate, d = c !== null && c.memoizedState !== null || vn;
        c = Z0;
        var p = vn;
        if (Z0 = l, (vn = d) && !p) for (Me = o; Me !== null; ) l = Me, d = l.child, l.tag === 22 && l.memoizedState !== null ? J8(o) : d !== null ? (d.return = l, Me = d) : J8(o);
        for (; a !== null; ) Me = a, K9(a), a = a.sibling;
        Me = o, Z0 = c, vn = p;
      }
      Q8(t);
    } else o.subtreeFlags & 8772 && a !== null ? (a.return = o, Me = a) : Q8(t);
  }
}
function Q8(t) {
  for (; Me !== null; ) {
    var e = Me;
    if (e.flags & 8772) {
      var n = e.alternate;
      try {
        if (e.flags & 8772) switch (e.tag) {
          case 0:
          case 11:
          case 15:
            vn || kc(5, e);
            break;
          case 1:
            var r = e.stateNode;
            if (e.flags & 4 && !vn) if (n === null) r.componentDidMount();
            else {
              var o = e.elementType === e.type ? n.memoizedProps : wr(e.type, n.memoizedProps);
              r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var a = e.updateQueue;
            a !== null && R8(e, a, r);
            break;
          case 3:
            var l = e.updateQueue;
            if (l !== null) {
              if (n = null, e.child !== null) switch (e.child.tag) {
                case 5:
                  n = e.child.stateNode;
                  break;
                case 1:
                  n = e.child.stateNode;
              }
              R8(e, l, n);
            }
            break;
          case 5:
            var c = e.stateNode;
            if (n === null && e.flags & 4) {
              n = c;
              var d = e.memoizedProps;
              switch (e.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d.autoFocus && n.focus();
                  break;
                case "img":
                  d.src && (n.src = d.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (e.memoizedState === null) {
              var p = e.alternate;
              if (p !== null) {
                var y = p.memoizedState;
                if (y !== null) {
                  var k = y.dehydrated;
                  k !== null && Ol(k);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(se(163));
        }
        vn || e.flags & 512 && b5(e);
      } catch (x) {
        Ht(e, e.return, x);
      }
    }
    if (e === t) {
      Me = null;
      break;
    }
    if (n = e.sibling, n !== null) {
      n.return = e.return, Me = n;
      break;
    }
    Me = e.return;
  }
}
function q8(t) {
  for (; Me !== null; ) {
    var e = Me;
    if (e === t) {
      Me = null;
      break;
    }
    var n = e.sibling;
    if (n !== null) {
      n.return = e.return, Me = n;
      break;
    }
    Me = e.return;
  }
}
function J8(t) {
  for (; Me !== null; ) {
    var e = Me;
    try {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          var n = e.return;
          try {
            kc(4, e);
          } catch (d) {
            Ht(e, n, d);
          }
          break;
        case 1:
          var r = e.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = e.return;
            try {
              r.componentDidMount();
            } catch (d) {
              Ht(e, o, d);
            }
          }
          var a = e.return;
          try {
            b5(e);
          } catch (d) {
            Ht(e, a, d);
          }
          break;
        case 5:
          var l = e.return;
          try {
            b5(e);
          } catch (d) {
            Ht(e, l, d);
          }
      }
    } catch (d) {
      Ht(e, e.return, d);
    }
    if (e === t) {
      Me = null;
      break;
    }
    var c = e.sibling;
    if (c !== null) {
      c.return = e.return, Me = c;
      break;
    }
    Me = e.return;
  }
}
var e_ = Math.ceil, Uu = Mi.ReactCurrentDispatcher, Nh = Mi.ReactCurrentOwner, cr = Mi.ReactCurrentBatchConfig, nt = 0, tn = null, It = null, sn = 0, Bn = 0, ea = vo(0), Zt = 0, $l = null, ts = 0, Mc = 0, Hh = 0, Hl = null, Fn = null, Vh = 0, ma = 1 / 0, fi = null, Bu = !1, N5 = null, lo = null, Y0 = !1, to = null, Wu = 0, Vl = 0, H5 = null, xu = -1, _u = 0;
function Mn() {
  return nt & 6 ? Ft() : xu !== -1 ? xu : xu = Ft();
}
function uo(t) {
  return t.mode & 1 ? nt & 2 && sn !== 0 ? sn & -sn : Fx.transition !== null ? (_u === 0 && (_u = Hp()), _u) : (t = ut, t !== 0 || (t = window.event, t = t === void 0 ? 16 : Op(t.type)), t) : 1;
}
function Lr(t, e, n, r) {
  if (50 < Vl) throw Vl = 0, H5 = null, Error(se(185));
  t1(t, n, r), (!(nt & 2) || t !== tn) && (t === tn && (!(nt & 2) && (Mc |= n), Zt === 4 && Ji(t, sn)), Dn(t, r), n === 1 && nt === 0 && !(e.mode & 1) && (ma = Ft() + 500, Cc && xo()));
}
function Dn(t, e) {
  var n = t.callbackNode;
  Fv(t, e);
  var r = bu(t, t === tn ? sn : 0);
  if (r === 0) n !== null && l8(n), t.callbackNode = null, t.callbackPriority = 0;
  else if (e = r & -r, t.callbackPriority !== e) {
    if (n != null && l8(n), e === 1) t.tag === 0 ? zx(e6.bind(null, t)) : i9(e6.bind(null, t)), Hx(function() {
      !(nt & 6) && xo();
    }), n = null;
    else {
      switch (Vp(r)) {
        case 1:
          n = oh;
          break;
        case 4:
          n = Ep;
          break;
        case 16:
          n = Au;
          break;
        case 536870912:
          n = Np;
          break;
        default:
          n = Au;
      }
      n = ng(n, X9.bind(null, t));
    }
    t.callbackPriority = e, t.callbackNode = n;
  }
}
function X9(t, e) {
  if (xu = -1, _u = 0, nt & 6) throw Error(se(327));
  var n = t.callbackNode;
  if (sa() && t.callbackNode !== n) return null;
  var r = bu(t, t === tn ? sn : 0);
  if (r === 0) return null;
  if (r & 30 || r & t.expiredLanes || e) e = Zu(t, r);
  else {
    e = r;
    var o = nt;
    nt |= 2;
    var a = Q9();
    (tn !== t || sn !== e) && (fi = null, ma = Ft() + 500, $o(t, e));
    do
      try {
        r_();
        break;
      } catch (c) {
        $9(t, c);
      }
    while (!0);
    vh(), Uu.current = a, nt = o, It !== null ? e = 0 : (tn = null, sn = 0, e = Zt);
  }
  if (e !== 0) {
    if (e === 2 && (o = o5(t), o !== 0 && (r = o, e = V5(t, o))), e === 1) throw n = $l, $o(t, 0), Ji(t, r), Dn(t, Ft()), n;
    if (e === 6) Ji(t, r);
    else {
      if (o = t.current.alternate, !(r & 30) && !t_(o) && (e = Zu(t, r), e === 2 && (a = o5(t), a !== 0 && (r = a, e = V5(t, a))), e === 1)) throw n = $l, $o(t, 0), Ji(t, r), Dn(t, Ft()), n;
      switch (t.finishedWork = o, t.finishedLanes = r, e) {
        case 0:
        case 1:
          throw Error(se(345));
        case 2:
          Uo(t, Fn, fi);
          break;
        case 3:
          if (Ji(t, r), (r & 130023424) === r && (e = Vh + 500 - Ft(), 10 < e)) {
            if (bu(t, 0) !== 0) break;
            if (o = t.suspendedLanes, (o & r) !== r) {
              Mn(), t.pingedLanes |= t.suspendedLanes & o;
              break;
            }
            t.timeoutHandle = h5(Uo.bind(null, t, Fn, fi), e);
            break;
          }
          Uo(t, Fn, fi);
          break;
        case 4:
          if (Ji(t, r), (r & 4194240) === r) break;
          for (e = t.eventTimes, o = -1; 0 < r; ) {
            var l = 31 - Mr(r);
            a = 1 << l, l = e[l], l > o && (o = l), r &= ~a;
          }
          if (r = o, r = Ft() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * e_(r / 1960)) - r, 10 < r) {
            t.timeoutHandle = h5(Uo.bind(null, t, Fn, fi), r);
            break;
          }
          Uo(t, Fn, fi);
          break;
        case 5:
          Uo(t, Fn, fi);
          break;
        default:
          throw Error(se(329));
      }
    }
  }
  return Dn(t, Ft()), t.callbackNode === n ? X9.bind(null, t) : null;
}
function V5(t, e) {
  var n = Hl;
  return t.current.memoizedState.isDehydrated && ($o(t, e).flags |= 256), t = Zu(t, e), t !== 2 && (e = Fn, Fn = n, e !== null && T5(e)), t;
}
function T5(t) {
  Fn === null ? Fn = t : Fn.push.apply(Fn, t);
}
function t_(t) {
  for (var e = t; ; ) {
    if (e.flags & 16384) {
      var n = e.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var o = n[r], a = o.getSnapshot;
        o = o.value;
        try {
          if (!Pr(a(), o)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = e.child, e.subtreeFlags & 16384 && n !== null) n.return = e, e = n;
    else {
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return !0;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
  }
  return !0;
}
function Ji(t, e) {
  for (e &= ~Hh, e &= ~Mc, t.suspendedLanes |= e, t.pingedLanes &= ~e, t = t.expirationTimes; 0 < e; ) {
    var n = 31 - Mr(e), r = 1 << n;
    t[n] = -1, e &= ~r;
  }
}
function e6(t) {
  if (nt & 6) throw Error(se(327));
  sa();
  var e = bu(t, 0);
  if (!(e & 1)) return Dn(t, Ft()), null;
  var n = Zu(t, e);
  if (t.tag !== 0 && n === 2) {
    var r = o5(t);
    r !== 0 && (e = r, n = V5(t, r));
  }
  if (n === 1) throw n = $l, $o(t, 0), Ji(t, e), Dn(t, Ft()), n;
  if (n === 6) throw Error(se(345));
  return t.finishedWork = t.current.alternate, t.finishedLanes = e, Uo(t, Fn, fi), Dn(t, Ft()), null;
}
function Th(t, e) {
  var n = nt;
  nt |= 1;
  try {
    return t(e);
  } finally {
    nt = n, nt === 0 && (ma = Ft() + 500, Cc && xo());
  }
}
function ns(t) {
  to !== null && to.tag === 0 && !(nt & 6) && sa();
  var e = nt;
  nt |= 1;
  var n = cr.transition, r = ut;
  try {
    if (cr.transition = null, ut = 1, t) return t();
  } finally {
    ut = r, cr.transition = n, nt = e, !(nt & 6) && xo();
  }
}
function Rh() {
  Bn = ea.current, xt(ea);
}
function $o(t, e) {
  t.finishedWork = null, t.finishedLanes = 0;
  var n = t.timeoutHandle;
  if (n !== -1 && (t.timeoutHandle = -1, Nx(n)), It !== null) for (n = It.return; n !== null; ) {
    var r = n;
    switch (gh(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Vu();
        break;
      case 3:
        pa(), xt(On), xt(xn), kh();
        break;
      case 5:
        Sh(r);
        break;
      case 4:
        pa();
        break;
      case 13:
        xt(At);
        break;
      case 19:
        xt(At);
        break;
      case 10:
        xh(r.type._context);
        break;
      case 22:
      case 23:
        Rh();
    }
    n = n.return;
  }
  if (tn = t, It = t = co(t.current, null), sn = Bn = e, Zt = 0, $l = null, Hh = Mc = ts = 0, Fn = Hl = null, Yo !== null) {
    for (e = 0; e < Yo.length; e++) if (n = Yo[e], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var o = r.next, a = n.pending;
      if (a !== null) {
        var l = a.next;
        a.next = o, r.next = l;
      }
      n.pending = r;
    }
    Yo = null;
  }
  return t;
}
function $9(t, e) {
  do {
    var n = It;
    try {
      if (vh(), mu.current = Gu, Du) {
        for (var r = bt.memoizedState; r !== null; ) {
          var o = r.queue;
          o !== null && (o.pending = null), r = r.next;
        }
        Du = !1;
      }
      if (es = 0, en = Wt = bt = null, El = !1, Yl = 0, Nh.current = null, n === null || n.return === null) {
        Zt = 1, $l = e, It = null;
        break;
      }
      e: {
        var a = t, l = n.return, c = n, d = e;
        if (e = sn, c.flags |= 32768, d !== null && typeof d == "object" && typeof d.then == "function") {
          var p = d, y = c, k = y.tag;
          if (!(y.mode & 1) && (k === 0 || k === 11 || k === 15)) {
            var x = y.alternate;
            x ? (y.updateQueue = x.updateQueue, y.memoizedState = x.memoizedState, y.lanes = x.lanes) : (y.updateQueue = null, y.memoizedState = null);
          }
          var w = D8(l);
          if (w !== null) {
            w.flags &= -257, G8(w, l, c, a, e), w.mode & 1 && I8(a, p, e), e = w, d = p;
            var m = e.updateQueue;
            if (m === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(d), e.updateQueue = S;
            } else m.add(d);
            break e;
          } else {
            if (!(e & 1)) {
              I8(a, p, e), zh();
              break e;
            }
            d = Error(se(426));
          }
        } else if (St && c.mode & 1) {
          var b = D8(l);
          if (b !== null) {
            !(b.flags & 65536) && (b.flags |= 256), G8(b, l, c, a, e), mh(ga(d, c));
            break e;
          }
        }
        a = d = ga(d, c), Zt !== 4 && (Zt = 2), Hl === null ? Hl = [a] : Hl.push(a), a = l;
        do {
          switch (a.tag) {
            case 3:
              a.flags |= 65536, e &= -e, a.lanes |= e;
              var L = V9(a, d, e);
              T8(a, L);
              break e;
            case 1:
              c = d;
              var M = a.type, g = a.stateNode;
              if (!(a.flags & 128) && (typeof M.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (lo === null || !lo.has(g)))) {
                a.flags |= 65536, e &= -e, a.lanes |= e;
                var C = T9(a, c, e);
                T8(a, C);
                break e;
              }
          }
          a = a.return;
        } while (a !== null);
      }
      J9(n);
    } catch (A) {
      e = A, It === n && n !== null && (It = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Q9() {
  var t = Uu.current;
  return Uu.current = Gu, t === null ? Gu : t;
}
function zh() {
  (Zt === 0 || Zt === 3 || Zt === 2) && (Zt = 4), tn === null || !(ts & 268435455) && !(Mc & 268435455) || Ji(tn, sn);
}
function Zu(t, e) {
  var n = nt;
  nt |= 2;
  var r = Q9();
  (tn !== t || sn !== e) && (fi = null, $o(t, e));
  do
    try {
      n_();
      break;
    } catch (o) {
      $9(t, o);
    }
  while (!0);
  if (vh(), nt = n, Uu.current = r, It !== null) throw Error(se(261));
  return tn = null, sn = 0, Zt;
}
function n_() {
  for (; It !== null; ) q9(It);
}
function r_() {
  for (; It !== null && !bv(); ) q9(It);
}
function q9(t) {
  var e = tg(t.alternate, t, Bn);
  t.memoizedProps = t.pendingProps, e === null ? J9(t) : It = e, Nh.current = null;
}
function J9(t) {
  var e = t;
  do {
    var n = e.alternate;
    if (t = e.return, e.flags & 32768) {
      if (n = $x(n, e), n !== null) {
        n.flags &= 32767, It = n;
        return;
      }
      if (t !== null) t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null;
      else {
        Zt = 6, It = null;
        return;
      }
    } else if (n = Xx(n, e, Bn), n !== null) {
      It = n;
      return;
    }
    if (e = e.sibling, e !== null) {
      It = e;
      return;
    }
    It = e = t;
  } while (e !== null);
  Zt === 0 && (Zt = 5);
}
function Uo(t, e, n) {
  var r = ut, o = cr.transition;
  try {
    cr.transition = null, ut = 1, i_(t, e, n, r);
  } finally {
    cr.transition = o, ut = r;
  }
  return null;
}
function i_(t, e, n, r) {
  do
    sa();
  while (to !== null);
  if (nt & 6) throw Error(se(327));
  n = t.finishedWork;
  var o = t.finishedLanes;
  if (n === null) return null;
  if (t.finishedWork = null, t.finishedLanes = 0, n === t.current) throw Error(se(177));
  t.callbackNode = null, t.callbackPriority = 0;
  var a = n.lanes | n.childLanes;
  if (jv(t, a), t === tn && (It = tn = null, sn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Y0 || (Y0 = !0, ng(Au, function() {
    return sa(), null;
  })), a = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || a) {
    a = cr.transition, cr.transition = null;
    var l = ut;
    ut = 1;
    var c = nt;
    nt |= 4, Nh.current = null, qx(t, n), Y9(n, t), kx(d5), Pu = !!c5, d5 = c5 = null, t.current = n, Jx(n), Pv(), nt = c, ut = l, cr.transition = a;
  } else t.current = n;
  if (Y0 && (Y0 = !1, to = t, Wu = o), a = t.pendingLanes, a === 0 && (lo = null), Hv(n.stateNode), Dn(t, Ft()), e !== null) for (r = t.onRecoverableError, n = 0; n < e.length; n++) o = e[n], r(o.value, { componentStack: o.stack, digest: o.digest });
  if (Bu) throw Bu = !1, t = N5, N5 = null, t;
  return Wu & 1 && t.tag !== 0 && sa(), a = t.pendingLanes, a & 1 ? t === H5 ? Vl++ : (Vl = 0, H5 = t) : Vl = 0, xo(), null;
}
function sa() {
  if (to !== null) {
    var t = Vp(Wu), e = cr.transition, n = ut;
    try {
      if (cr.transition = null, ut = 16 > t ? 16 : t, to === null) var r = !1;
      else {
        if (t = to, to = null, Wu = 0, nt & 6) throw Error(se(331));
        var o = nt;
        for (nt |= 4, Me = t.current; Me !== null; ) {
          var a = Me, l = a.child;
          if (Me.flags & 16) {
            var c = a.deletions;
            if (c !== null) {
              for (var d = 0; d < c.length; d++) {
                var p = c[d];
                for (Me = p; Me !== null; ) {
                  var y = Me;
                  switch (y.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Nl(8, y, a);
                  }
                  var k = y.child;
                  if (k !== null) k.return = y, Me = k;
                  else for (; Me !== null; ) {
                    y = Me;
                    var x = y.sibling, w = y.return;
                    if (B9(y), y === p) {
                      Me = null;
                      break;
                    }
                    if (x !== null) {
                      x.return = w, Me = x;
                      break;
                    }
                    Me = w;
                  }
                }
              }
              var m = a.alternate;
              if (m !== null) {
                var S = m.child;
                if (S !== null) {
                  m.child = null;
                  do {
                    var b = S.sibling;
                    S.sibling = null, S = b;
                  } while (S !== null);
                }
              }
              Me = a;
            }
          }
          if (a.subtreeFlags & 2064 && l !== null) l.return = a, Me = l;
          else e: for (; Me !== null; ) {
            if (a = Me, a.flags & 2048) switch (a.tag) {
              case 0:
              case 11:
              case 15:
                Nl(9, a, a.return);
            }
            var L = a.sibling;
            if (L !== null) {
              L.return = a.return, Me = L;
              break e;
            }
            Me = a.return;
          }
        }
        var M = t.current;
        for (Me = M; Me !== null; ) {
          l = Me;
          var g = l.child;
          if (l.subtreeFlags & 2064 && g !== null) g.return = l, Me = g;
          else e: for (l = M; Me !== null; ) {
            if (c = Me, c.flags & 2048) try {
              switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  kc(9, c);
              }
            } catch (A) {
              Ht(c, c.return, A);
            }
            if (c === l) {
              Me = null;
              break e;
            }
            var C = c.sibling;
            if (C !== null) {
              C.return = c.return, Me = C;
              break e;
            }
            Me = c.return;
          }
        }
        if (nt = o, xo(), Yr && typeof Yr.onPostCommitFiberRoot == "function") try {
          Yr.onPostCommitFiberRoot(mc, t);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      ut = n, cr.transition = e;
    }
  }
  return !1;
}
function t6(t, e, n) {
  e = ga(n, e), e = V9(t, e, 1), t = ao(t, e, 1), e = Mn(), t !== null && (t1(t, 1, e), Dn(t, e));
}
function Ht(t, e, n) {
  if (t.tag === 3) t6(t, t, n);
  else for (; e !== null; ) {
    if (e.tag === 3) {
      t6(e, t, n);
      break;
    } else if (e.tag === 1) {
      var r = e.stateNode;
      if (typeof e.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (lo === null || !lo.has(r))) {
        t = ga(n, t), t = T9(e, t, 1), e = ao(e, t, 1), t = Mn(), e !== null && (t1(e, 1, t), Dn(e, t));
        break;
      }
    }
    e = e.return;
  }
}
function o_(t, e, n) {
  var r = t.pingCache;
  r !== null && r.delete(e), e = Mn(), t.pingedLanes |= t.suspendedLanes & n, tn === t && (sn & n) === n && (Zt === 4 || Zt === 3 && (sn & 130023424) === sn && 500 > Ft() - Vh ? $o(t, 0) : Hh |= n), Dn(t, e);
}
function eg(t, e) {
  e === 0 && (t.mode & 1 ? (e = F0, F0 <<= 1, !(F0 & 130023424) && (F0 = 4194304)) : e = 1);
  var n = Mn();
  t = Si(t, e), t !== null && (t1(t, e, n), Dn(t, n));
}
function s_(t) {
  var e = t.memoizedState, n = 0;
  e !== null && (n = e.retryLane), eg(t, n);
}
function a_(t, e) {
  var n = 0;
  switch (t.tag) {
    case 13:
      var r = t.stateNode, o = t.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = t.stateNode;
      break;
    default:
      throw Error(se(314));
  }
  r !== null && r.delete(e), eg(t, n);
}
var tg;
tg = function(t, e, n) {
  if (t !== null) if (t.memoizedProps !== e.pendingProps || On.current) jn = !0;
  else {
    if (!(t.lanes & n) && !(e.flags & 128)) return jn = !1, Kx(t, e, n);
    jn = !!(t.flags & 131072);
  }
  else jn = !1, St && e.flags & 1048576 && o9(e, zu, e.index);
  switch (e.lanes = 0, e.tag) {
    case 2:
      var r = e.type;
      vu(t, e), t = e.pendingProps;
      var o = da(e, xn.current);
      oa(e, n), o = Lh(null, e, r, t, o, n);
      var a = Ah();
      return e.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (e.tag = 1, e.memoizedState = null, e.updateQueue = null, In(r) ? (a = !0, Tu(e)) : a = !1, e.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Ch(e), o.updater = Sc, e.stateNode = o, o._reactInternals = e, _5(e, r, t, n), e = S5(null, e, r, !0, a, n)) : (e.tag = 0, St && a && ph(e), Sn(null, e, o, n), e = e.child), e;
    case 16:
      r = e.elementType;
      e: {
        switch (vu(t, e), t = e.pendingProps, o = r._init, r = o(r._payload), e.type = r, o = e.tag = u_(r), t = wr(r, t), o) {
          case 0:
            e = w5(null, e, r, t, n);
            break e;
          case 1:
            e = W8(null, e, r, t, n);
            break e;
          case 11:
            e = U8(null, e, r, t, n);
            break e;
          case 14:
            e = B8(null, e, r, wr(r.type, t), n);
            break e;
        }
        throw Error(se(
          306,
          r,
          ""
        ));
      }
      return e;
    case 0:
      return r = e.type, o = e.pendingProps, o = e.elementType === r ? o : wr(r, o), w5(t, e, r, o, n);
    case 1:
      return r = e.type, o = e.pendingProps, o = e.elementType === r ? o : wr(r, o), W8(t, e, r, o, n);
    case 3:
      e: {
        if (j9(e), t === null) throw Error(se(387));
        r = e.pendingProps, a = e.memoizedState, o = a.element, d9(t, e), Ou(e, r, null, n);
        var l = e.memoizedState;
        if (r = l.element, a.isDehydrated) if (a = { element: r, isDehydrated: !1, cache: l.cache, pendingSuspenseBoundaries: l.pendingSuspenseBoundaries, transitions: l.transitions }, e.updateQueue.baseState = a, e.memoizedState = a, e.flags & 256) {
          o = ga(Error(se(423)), e), e = Z8(t, e, r, n, o);
          break e;
        } else if (r !== o) {
          o = ga(Error(se(424)), e), e = Z8(t, e, r, n, o);
          break e;
        } else for (Wn = so(e.stateNode.containerInfo.firstChild), Zn = e, St = !0, kr = null, n = u9(e, null, r, n), e.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (fa(), r === o) {
            e = ki(t, e, n);
            break e;
          }
          Sn(t, e, r, n);
        }
        e = e.child;
      }
      return e;
    case 5:
      return f9(e), t === null && y5(e), r = e.type, o = e.pendingProps, a = t !== null ? t.memoizedProps : null, l = o.children, f5(r, o) ? l = null : a !== null && f5(r, a) && (e.flags |= 32), F9(t, e), Sn(t, e, l, n), e.child;
    case 6:
      return t === null && y5(e), null;
    case 13:
      return O9(t, e, n);
    case 4:
      return wh(e, e.stateNode.containerInfo), r = e.pendingProps, t === null ? e.child = ha(e, null, r, n) : Sn(t, e, r, n), e.child;
    case 11:
      return r = e.type, o = e.pendingProps, o = e.elementType === r ? o : wr(r, o), U8(t, e, r, o, n);
    case 7:
      return Sn(t, e, e.pendingProps, n), e.child;
    case 8:
      return Sn(t, e, e.pendingProps.children, n), e.child;
    case 12:
      return Sn(t, e, e.pendingProps.children, n), e.child;
    case 10:
      e: {
        if (r = e.type._context, o = e.pendingProps, a = e.memoizedProps, l = o.value, gt(Fu, r._currentValue), r._currentValue = l, a !== null) if (Pr(a.value, l)) {
          if (a.children === o.children && !On.current) {
            e = ki(t, e, n);
            break e;
          }
        } else for (a = e.child, a !== null && (a.return = e); a !== null; ) {
          var c = a.dependencies;
          if (c !== null) {
            l = a.child;
            for (var d = c.firstContext; d !== null; ) {
              if (d.context === r) {
                if (a.tag === 1) {
                  d = yi(-1, n & -n), d.tag = 2;
                  var p = a.updateQueue;
                  if (p !== null) {
                    p = p.shared;
                    var y = p.pending;
                    y === null ? d.next = d : (d.next = y.next, y.next = d), p.pending = d;
                  }
                }
                a.lanes |= n, d = a.alternate, d !== null && (d.lanes |= n), v5(
                  a.return,
                  n,
                  e
                ), c.lanes |= n;
                break;
              }
              d = d.next;
            }
          } else if (a.tag === 10) l = a.type === e.type ? null : a.child;
          else if (a.tag === 18) {
            if (l = a.return, l === null) throw Error(se(341));
            l.lanes |= n, c = l.alternate, c !== null && (c.lanes |= n), v5(l, n, e), l = a.sibling;
          } else l = a.child;
          if (l !== null) l.return = a;
          else for (l = a; l !== null; ) {
            if (l === e) {
              l = null;
              break;
            }
            if (a = l.sibling, a !== null) {
              a.return = l.return, l = a;
              break;
            }
            l = l.return;
          }
          a = l;
        }
        Sn(t, e, o.children, n), e = e.child;
      }
      return e;
    case 9:
      return o = e.type, r = e.pendingProps.children, oa(e, n), o = dr(o), r = r(o), e.flags |= 1, Sn(t, e, r, n), e.child;
    case 14:
      return r = e.type, o = wr(r, e.pendingProps), o = wr(r.type, o), B8(t, e, r, o, n);
    case 15:
      return R9(t, e, e.type, e.pendingProps, n);
    case 17:
      return r = e.type, o = e.pendingProps, o = e.elementType === r ? o : wr(r, o), vu(t, e), e.tag = 1, In(r) ? (t = !0, Tu(e)) : t = !1, oa(e, n), H9(e, r, o), _5(e, r, o, n), S5(null, e, r, !0, t, n);
    case 19:
      return I9(t, e, n);
    case 22:
      return z9(t, e, n);
  }
  throw Error(se(156, e.tag));
};
function ng(t, e) {
  return Pp(t, e);
}
function l_(t, e, n, r) {
  this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ur(t, e, n, r) {
  return new l_(t, e, n, r);
}
function Fh(t) {
  return t = t.prototype, !(!t || !t.isReactComponent);
}
function u_(t) {
  if (typeof t == "function") return Fh(t) ? 1 : 0;
  if (t != null) {
    if (t = t.$$typeof, t === nh) return 11;
    if (t === rh) return 14;
  }
  return 2;
}
function co(t, e) {
  var n = t.alternate;
  return n === null ? (n = ur(t.tag, e, t.key, t.mode), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 14680064, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n;
}
function Cu(t, e, n, r, o, a) {
  var l = 2;
  if (r = t, typeof t == "function") Fh(t) && (l = 1);
  else if (typeof t == "string") l = 5;
  else e: switch (t) {
    case Bs:
      return Qo(n.children, o, a, e);
    case th:
      l = 8, o |= 8;
      break;
    case Bf:
      return t = ur(12, n, e, o | 2), t.elementType = Bf, t.lanes = a, t;
    case Wf:
      return t = ur(13, n, e, o), t.elementType = Wf, t.lanes = a, t;
    case Zf:
      return t = ur(19, n, e, o), t.elementType = Zf, t.lanes = a, t;
    case fp:
      return Lc(n, o, a, e);
    default:
      if (typeof t == "object" && t !== null) switch (t.$$typeof) {
        case cp:
          l = 10;
          break e;
        case dp:
          l = 9;
          break e;
        case nh:
          l = 11;
          break e;
        case rh:
          l = 14;
          break e;
        case $i:
          l = 16, r = null;
          break e;
      }
      throw Error(se(130, t == null ? t : typeof t, ""));
  }
  return e = ur(l, n, e, o), e.elementType = t, e.type = r, e.lanes = a, e;
}
function Qo(t, e, n, r) {
  return t = ur(7, t, r, e), t.lanes = n, t;
}
function Lc(t, e, n, r) {
  return t = ur(22, t, r, e), t.elementType = fp, t.lanes = n, t.stateNode = { isHidden: !1 }, t;
}
function ff(t, e, n) {
  return t = ur(6, t, null, e), t.lanes = n, t;
}
function hf(t, e, n) {
  return e = ur(4, t.children !== null ? t.children : [], t.key, e), e.lanes = n, e.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, e;
}
function c_(t, e, n, r, o) {
  this.tag = e, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Zd(0), this.expirationTimes = Zd(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zd(0), this.identifierPrefix = r, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null;
}
function jh(t, e, n, r, o, a, l, c, d) {
  return t = new c_(t, e, n, c, d), e === 1 ? (e = 1, a === !0 && (e |= 8)) : e = 0, a = ur(3, null, null, e), t.current = a, a.stateNode = t, a.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ch(a), t;
}
function d_(t, e, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Us, key: r == null ? null : "" + r, children: t, containerInfo: e, implementation: n };
}
function rg(t) {
  if (!t) return go;
  t = t._reactInternals;
  e: {
    if (os(t) !== t || t.tag !== 1) throw Error(se(170));
    var e = t;
    do {
      switch (e.tag) {
        case 3:
          e = e.stateNode.context;
          break e;
        case 1:
          if (In(e.type)) {
            e = e.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      e = e.return;
    } while (e !== null);
    throw Error(se(171));
  }
  if (t.tag === 1) {
    var n = t.type;
    if (In(n)) return r9(t, n, e);
  }
  return e;
}
function ig(t, e, n, r, o, a, l, c, d) {
  return t = jh(n, r, !0, t, o, a, l, c, d), t.context = rg(null), n = t.current, r = Mn(), o = uo(n), a = yi(r, o), a.callback = e ?? null, ao(n, a, o), t.current.lanes = o, t1(t, o, r), Dn(t, r), t;
}
function Ac(t, e, n, r) {
  var o = e.current, a = Mn(), l = uo(o);
  return n = rg(n), e.context === null ? e.context = n : e.pendingContext = n, e = yi(a, l), e.payload = { element: t }, r = r === void 0 ? null : r, r !== null && (e.callback = r), t = ao(o, e, l), t !== null && (Lr(t, o, l, a), gu(t, o, l)), l;
}
function Yu(t) {
  if (t = t.current, !t.child) return null;
  switch (t.child.tag) {
    case 5:
      return t.child.stateNode;
    default:
      return t.child.stateNode;
  }
}
function n6(t, e) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
    var n = t.retryLane;
    t.retryLane = n !== 0 && n < e ? n : e;
  }
}
function Oh(t, e) {
  n6(t, e), (t = t.alternate) && n6(t, e);
}
function f_() {
  return null;
}
var og = typeof reportError == "function" ? reportError : function(t) {
  console.error(t);
};
function Ih(t) {
  this._internalRoot = t;
}
bc.prototype.render = Ih.prototype.render = function(t) {
  var e = this._internalRoot;
  if (e === null) throw Error(se(409));
  Ac(t, e, null, null);
};
bc.prototype.unmount = Ih.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    ns(function() {
      Ac(null, t, null, null);
    }), e[wi] = null;
  }
};
function bc(t) {
  this._internalRoot = t;
}
bc.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
    var e = zp();
    t = { blockedOn: null, target: t, priority: e };
    for (var n = 0; n < qi.length && e !== 0 && e < qi[n].priority; n++) ;
    qi.splice(n, 0, t), n === 0 && jp(t);
  }
};
function Dh(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
}
function Pc(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 && (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "));
}
function r6() {
}
function h_(t, e, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var a = r;
      r = function() {
        var p = Yu(l);
        a.call(p);
      };
    }
    var l = ig(e, r, t, 0, null, !1, !1, "", r6);
    return t._reactRootContainer = l, t[wi] = l.current, Gl(t.nodeType === 8 ? t.parentNode : t), ns(), l;
  }
  for (; o = t.lastChild; ) t.removeChild(o);
  if (typeof r == "function") {
    var c = r;
    r = function() {
      var p = Yu(d);
      c.call(p);
    };
  }
  var d = jh(t, 0, !1, null, null, !1, !1, "", r6);
  return t._reactRootContainer = d, t[wi] = d.current, Gl(t.nodeType === 8 ? t.parentNode : t), ns(function() {
    Ac(e, d, n, r);
  }), d;
}
function Ec(t, e, n, r, o) {
  var a = n._reactRootContainer;
  if (a) {
    var l = a;
    if (typeof o == "function") {
      var c = o;
      o = function() {
        var d = Yu(l);
        c.call(d);
      };
    }
    Ac(e, l, t, o);
  } else l = h_(n, e, t, o, r);
  return Yu(l);
}
Tp = function(t) {
  switch (t.tag) {
    case 3:
      var e = t.stateNode;
      if (e.current.memoizedState.isDehydrated) {
        var n = _l(e.pendingLanes);
        n !== 0 && (sh(e, n | 1), Dn(e, Ft()), !(nt & 6) && (ma = Ft() + 500, xo()));
      }
      break;
    case 13:
      ns(function() {
        var r = Si(t, 1);
        if (r !== null) {
          var o = Mn();
          Lr(r, t, 1, o);
        }
      }), Oh(t, 1);
  }
};
ah = function(t) {
  if (t.tag === 13) {
    var e = Si(t, 134217728);
    if (e !== null) {
      var n = Mn();
      Lr(e, t, 134217728, n);
    }
    Oh(t, 134217728);
  }
};
Rp = function(t) {
  if (t.tag === 13) {
    var e = uo(t), n = Si(t, e);
    if (n !== null) {
      var r = Mn();
      Lr(n, t, e, r);
    }
    Oh(t, e);
  }
};
zp = function() {
  return ut;
};
Fp = function(t, e) {
  var n = ut;
  try {
    return ut = t, e();
  } finally {
    ut = n;
  }
};
n5 = function(t, e, n) {
  switch (e) {
    case "input":
      if (Xf(t, n), e = n.name, n.type === "radio" && e != null) {
        for (n = t; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + e) + '][type="radio"]'), e = 0; e < n.length; e++) {
          var r = n[e];
          if (r !== t && r.form === t.form) {
            var o = _c(r);
            if (!o) throw Error(se(90));
            pp(r), Xf(r, o);
          }
        }
      }
      break;
    case "textarea":
      mp(t, n);
      break;
    case "select":
      e = n.value, e != null && ta(t, !!n.multiple, e, !1);
  }
};
Sp = Th;
kp = ns;
var p_ = { usingClientEntryPoint: !1, Events: [r1, Ks, _c, Cp, wp, Th] }, fl = { findFiberByHostInstance: Zo, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, g_ = { bundleType: fl.bundleType, version: fl.version, rendererPackageName: fl.rendererPackageName, rendererConfig: fl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Mi.ReactCurrentDispatcher, findHostInstanceByFiber: function(t) {
  return t = Ap(t), t === null ? null : t.stateNode;
}, findFiberByHostInstance: fl.findFiberByHostInstance || f_, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var K0 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!K0.isDisabled && K0.supportsFiber) try {
    mc = K0.inject(g_), Yr = K0;
  } catch {
  }
}
Kn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = p_;
Kn.createPortal = function(t, e) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Dh(e)) throw Error(se(200));
  return d_(t, e, null, n);
};
Kn.createRoot = function(t, e) {
  if (!Dh(t)) throw Error(se(299));
  var n = !1, r = "", o = og;
  return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (r = e.identifierPrefix), e.onRecoverableError !== void 0 && (o = e.onRecoverableError)), e = jh(t, 1, !1, null, null, n, !1, r, o), t[wi] = e.current, Gl(t.nodeType === 8 ? t.parentNode : t), new Ih(e);
};
Kn.findDOMNode = function(t) {
  if (t == null) return null;
  if (t.nodeType === 1) return t;
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function" ? Error(se(188)) : (t = Object.keys(t).join(","), Error(se(268, t)));
  return t = Ap(e), t = t === null ? null : t.stateNode, t;
};
Kn.flushSync = function(t) {
  return ns(t);
};
Kn.hydrate = function(t, e, n) {
  if (!Pc(e)) throw Error(se(200));
  return Ec(null, t, e, !0, n);
};
Kn.hydrateRoot = function(t, e, n) {
  if (!Dh(t)) throw Error(se(405));
  var r = n != null && n.hydratedSources || null, o = !1, a = "", l = og;
  if (n != null && (n.unstable_strictMode === !0 && (o = !0), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), e = ig(e, null, t, 1, n ?? null, o, !1, a, l), t[wi] = e.current, Gl(t), r) for (t = 0; t < r.length; t++) n = r[t], o = n._getVersion, o = o(n._source), e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [n, o] : e.mutableSourceEagerHydrationData.push(
    n,
    o
  );
  return new bc(e);
};
Kn.render = function(t, e, n) {
  if (!Pc(e)) throw Error(se(200));
  return Ec(null, t, e, !1, n);
};
Kn.unmountComponentAtNode = function(t) {
  if (!Pc(t)) throw Error(se(40));
  return t._reactRootContainer ? (ns(function() {
    Ec(null, null, t, !1, function() {
      t._reactRootContainer = null, t[wi] = null;
    });
  }), !0) : !1;
};
Kn.unstable_batchedUpdates = Th;
Kn.unstable_renderSubtreeIntoContainer = function(t, e, n, r) {
  if (!Pc(n)) throw Error(se(200));
  if (t == null || t._reactInternals === void 0) throw Error(se(38));
  return Ec(t, e, n, !1, r);
};
Kn.version = "18.3.1-next-f1338f8080-20240426";
function sg() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sg);
    } catch (t) {
      console.error(t);
    }
}
sg(), sp.exports = Kn;
var m_ = sp.exports, ag, i6 = m_;
ag = i6.createRoot, i6.hydrateRoot;
var Gh = { exports: {} }, Nc = {}, Ku = {}, Xe = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t._registerNode = t.Konva = t.glob = void 0;
  const e = Math.PI / 180;
  function n() {
    return typeof window < "u" && ({}.toString.call(window) === "[object Window]" || {}.toString.call(window) === "[object global]");
  }
  t.glob = typeof X4 < "u" ? X4 : typeof window < "u" ? window : typeof WorkerGlobalScope < "u" ? self : {}, t.Konva = {
    _global: t.glob,
    version: "9.3.22",
    isBrowser: n(),
    isUnminified: /param/.test((function(o) {
    }).toString()),
    dblClickWindow: 400,
    getAngle(o) {
      return t.Konva.angleDeg ? o * e : o;
    },
    enableTrace: !1,
    pointerEventsEnabled: !0,
    autoDrawEnabled: !0,
    hitOnDragEnabled: !1,
    capturePointerEventsEnabled: !1,
    _mouseListenClick: !1,
    _touchListenClick: !1,
    _pointerListenClick: !1,
    _mouseInDblClickWindow: !1,
    _touchInDblClickWindow: !1,
    _pointerInDblClickWindow: !1,
    _mouseDblClickPointerId: null,
    _touchDblClickPointerId: null,
    _pointerDblClickPointerId: null,
    _fixTextRendering: !1,
    pixelRatio: typeof window < "u" && window.devicePixelRatio || 1,
    dragDistance: 3,
    angleDeg: !0,
    showWarnings: !0,
    dragButtons: [0, 1],
    isDragging() {
      return t.Konva.DD.isDragging;
    },
    isTransforming() {
      var o;
      return (o = t.Konva.Transformer) === null || o === void 0 ? void 0 : o.isTransforming();
    },
    isDragReady() {
      return !!t.Konva.DD.node;
    },
    releaseCanvasOnDestroy: !0,
    document: t.glob.document,
    _injectGlobal(o) {
      t.glob.Konva = o;
    }
  };
  const r = (o) => {
    t.Konva[o.prototype.getClassName()] = o;
  };
  t._registerNode = r, t.Konva._injectGlobal(t.Konva);
})(Xe);
var Et = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Util = t.Transform = void 0;
  const e = Xe;
  class n {
    constructor(C = [1, 0, 0, 1, 0, 0]) {
      this.dirty = !1, this.m = C && C.slice() || [1, 0, 0, 1, 0, 0];
    }
    reset() {
      this.m[0] = 1, this.m[1] = 0, this.m[2] = 0, this.m[3] = 1, this.m[4] = 0, this.m[5] = 0;
    }
    copy() {
      return new n(this.m);
    }
    copyInto(C) {
      C.m[0] = this.m[0], C.m[1] = this.m[1], C.m[2] = this.m[2], C.m[3] = this.m[3], C.m[4] = this.m[4], C.m[5] = this.m[5];
    }
    point(C) {
      const A = this.m;
      return {
        x: A[0] * C.x + A[2] * C.y + A[4],
        y: A[1] * C.x + A[3] * C.y + A[5]
      };
    }
    translate(C, A) {
      return this.m[4] += this.m[0] * C + this.m[2] * A, this.m[5] += this.m[1] * C + this.m[3] * A, this;
    }
    scale(C, A) {
      return this.m[0] *= C, this.m[1] *= C, this.m[2] *= A, this.m[3] *= A, this;
    }
    rotate(C) {
      const A = Math.cos(C), E = Math.sin(C), T = this.m[0] * A + this.m[2] * E, P = this.m[1] * A + this.m[3] * E, R = this.m[0] * -E + this.m[2] * A, V = this.m[1] * -E + this.m[3] * A;
      return this.m[0] = T, this.m[1] = P, this.m[2] = R, this.m[3] = V, this;
    }
    getTranslation() {
      return {
        x: this.m[4],
        y: this.m[5]
      };
    }
    skew(C, A) {
      const E = this.m[0] + this.m[2] * A, T = this.m[1] + this.m[3] * A, P = this.m[2] + this.m[0] * C, R = this.m[3] + this.m[1] * C;
      return this.m[0] = E, this.m[1] = T, this.m[2] = P, this.m[3] = R, this;
    }
    multiply(C) {
      const A = this.m[0] * C.m[0] + this.m[2] * C.m[1], E = this.m[1] * C.m[0] + this.m[3] * C.m[1], T = this.m[0] * C.m[2] + this.m[2] * C.m[3], P = this.m[1] * C.m[2] + this.m[3] * C.m[3], R = this.m[0] * C.m[4] + this.m[2] * C.m[5] + this.m[4], V = this.m[1] * C.m[4] + this.m[3] * C.m[5] + this.m[5];
      return this.m[0] = A, this.m[1] = E, this.m[2] = T, this.m[3] = P, this.m[4] = R, this.m[5] = V, this;
    }
    invert() {
      const C = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]), A = this.m[3] * C, E = -this.m[1] * C, T = -this.m[2] * C, P = this.m[0] * C, R = C * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), V = C * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
      return this.m[0] = A, this.m[1] = E, this.m[2] = T, this.m[3] = P, this.m[4] = R, this.m[5] = V, this;
    }
    getMatrix() {
      return this.m;
    }
    decompose() {
      const C = this.m[0], A = this.m[1], E = this.m[2], T = this.m[3], P = this.m[4], R = this.m[5], V = C * T - A * E, F = {
        x: P,
        y: R,
        rotation: 0,
        scaleX: 0,
        scaleY: 0,
        skewX: 0,
        skewY: 0
      };
      if (C != 0 || A != 0) {
        const W = Math.sqrt(C * C + A * A);
        F.rotation = A > 0 ? Math.acos(C / W) : -Math.acos(C / W), F.scaleX = W, F.scaleY = V / W, F.skewX = (C * E + A * T) / V, F.skewY = 0;
      } else if (E != 0 || T != 0) {
        const W = Math.sqrt(E * E + T * T);
        F.rotation = Math.PI / 2 - (T > 0 ? Math.acos(-E / W) : -Math.acos(E / W)), F.scaleX = V / W, F.scaleY = W, F.skewX = 0, F.skewY = (C * E + A * T) / V;
      }
      return F.rotation = t.Util._getRotation(F.rotation), F;
    }
  }
  t.Transform = n;
  const r = "[object Array]", o = "[object Number]", a = "[object String]", l = "[object Boolean]", c = Math.PI / 180, d = 180 / Math.PI, p = "#", y = "", k = "0", x = "Konva warning: ", w = "Konva error: ", m = "rgb(", S = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 132, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 255, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 203],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [119, 128, 144],
    slategrey: [119, 128, 144],
    snow: [255, 255, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    transparent: [255, 255, 255, 0],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 5]
  }, b = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
  let L = [];
  const M = typeof requestAnimationFrame < "u" && requestAnimationFrame || function(g) {
    setTimeout(g, 60);
  };
  t.Util = {
    _isElement(g) {
      return !!(g && g.nodeType == 1);
    },
    _isFunction(g) {
      return !!(g && g.constructor && g.call && g.apply);
    },
    _isPlainObject(g) {
      return !!g && g.constructor === Object;
    },
    _isArray(g) {
      return Object.prototype.toString.call(g) === r;
    },
    _isNumber(g) {
      return Object.prototype.toString.call(g) === o && !isNaN(g) && isFinite(g);
    },
    _isString(g) {
      return Object.prototype.toString.call(g) === a;
    },
    _isBoolean(g) {
      return Object.prototype.toString.call(g) === l;
    },
    isObject(g) {
      return g instanceof Object;
    },
    isValidSelector(g) {
      if (typeof g != "string")
        return !1;
      const C = g[0];
      return C === "#" || C === "." || C === C.toUpperCase();
    },
    _sign(g) {
      return g === 0 || g > 0 ? 1 : -1;
    },
    requestAnimFrame(g) {
      L.push(g), L.length === 1 && M(function() {
        const C = L;
        L = [], C.forEach(function(A) {
          A();
        });
      });
    },
    createCanvasElement() {
      const g = document.createElement("canvas");
      try {
        g.style = g.style || {};
      } catch {
      }
      return g;
    },
    createImageElement() {
      return document.createElement("img");
    },
    _isInDocument(g) {
      for (; g = g.parentNode; )
        if (g == document)
          return !0;
      return !1;
    },
    _urlToImage(g, C) {
      const A = t.Util.createImageElement();
      A.onload = function() {
        C(A);
      }, A.src = g;
    },
    _rgbToHex(g, C, A) {
      return ((1 << 24) + (g << 16) + (C << 8) + A).toString(16).slice(1);
    },
    _hexToRgb(g) {
      g = g.replace(p, y);
      const C = parseInt(g, 16);
      return {
        r: C >> 16 & 255,
        g: C >> 8 & 255,
        b: C & 255
      };
    },
    getRandomColor() {
      let g = (Math.random() * 16777215 << 0).toString(16);
      for (; g.length < 6; )
        g = k + g;
      return p + g;
    },
    getRGB(g) {
      let C;
      return g in S ? (C = S[g], {
        r: C[0],
        g: C[1],
        b: C[2]
      }) : g[0] === p ? this._hexToRgb(g.substring(1)) : g.substr(0, 4) === m ? (C = b.exec(g.replace(/ /g, "")), {
        r: parseInt(C[1], 10),
        g: parseInt(C[2], 10),
        b: parseInt(C[3], 10)
      }) : {
        r: 0,
        g: 0,
        b: 0
      };
    },
    colorToRGBA(g) {
      return g = g || "black", t.Util._namedColorToRBA(g) || t.Util._hex3ColorToRGBA(g) || t.Util._hex4ColorToRGBA(g) || t.Util._hex6ColorToRGBA(g) || t.Util._hex8ColorToRGBA(g) || t.Util._rgbColorToRGBA(g) || t.Util._rgbaColorToRGBA(g) || t.Util._hslColorToRGBA(g);
    },
    _namedColorToRBA(g) {
      const C = S[g.toLowerCase()];
      return C ? {
        r: C[0],
        g: C[1],
        b: C[2],
        a: 1
      } : null;
    },
    _rgbColorToRGBA(g) {
      if (g.indexOf("rgb(") === 0) {
        g = g.match(/rgb\(([^)]+)\)/)[1];
        const C = g.split(/ *, */).map(Number);
        return {
          r: C[0],
          g: C[1],
          b: C[2],
          a: 1
        };
      }
    },
    _rgbaColorToRGBA(g) {
      if (g.indexOf("rgba(") === 0) {
        g = g.match(/rgba\(([^)]+)\)/)[1];
        const C = g.split(/ *, */).map((A, E) => A.slice(-1) === "%" ? E === 3 ? parseInt(A) / 100 : parseInt(A) / 100 * 255 : Number(A));
        return {
          r: C[0],
          g: C[1],
          b: C[2],
          a: C[3]
        };
      }
    },
    _hex8ColorToRGBA(g) {
      if (g[0] === "#" && g.length === 9)
        return {
          r: parseInt(g.slice(1, 3), 16),
          g: parseInt(g.slice(3, 5), 16),
          b: parseInt(g.slice(5, 7), 16),
          a: parseInt(g.slice(7, 9), 16) / 255
        };
    },
    _hex6ColorToRGBA(g) {
      if (g[0] === "#" && g.length === 7)
        return {
          r: parseInt(g.slice(1, 3), 16),
          g: parseInt(g.slice(3, 5), 16),
          b: parseInt(g.slice(5, 7), 16),
          a: 1
        };
    },
    _hex4ColorToRGBA(g) {
      if (g[0] === "#" && g.length === 5)
        return {
          r: parseInt(g[1] + g[1], 16),
          g: parseInt(g[2] + g[2], 16),
          b: parseInt(g[3] + g[3], 16),
          a: parseInt(g[4] + g[4], 16) / 255
        };
    },
    _hex3ColorToRGBA(g) {
      if (g[0] === "#" && g.length === 4)
        return {
          r: parseInt(g[1] + g[1], 16),
          g: parseInt(g[2] + g[2], 16),
          b: parseInt(g[3] + g[3], 16),
          a: 1
        };
    },
    _hslColorToRGBA(g) {
      if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(g)) {
        const [C, ...A] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(g), E = Number(A[0]) / 360, T = Number(A[1]) / 100, P = Number(A[2]) / 100;
        let R, V, F;
        if (T === 0)
          return F = P * 255, {
            r: Math.round(F),
            g: Math.round(F),
            b: Math.round(F),
            a: 1
          };
        P < 0.5 ? R = P * (1 + T) : R = P + T - P * T;
        const W = 2 * P - R, U = [0, 0, 0];
        for (let $ = 0; $ < 3; $++)
          V = E + 1 / 3 * -($ - 1), V < 0 && V++, V > 1 && V--, 6 * V < 1 ? F = W + (R - W) * 6 * V : 2 * V < 1 ? F = R : 3 * V < 2 ? F = W + (R - W) * (2 / 3 - V) * 6 : F = W, U[$] = F * 255;
        return {
          r: Math.round(U[0]),
          g: Math.round(U[1]),
          b: Math.round(U[2]),
          a: 1
        };
      }
    },
    haveIntersection(g, C) {
      return !(C.x > g.x + g.width || C.x + C.width < g.x || C.y > g.y + g.height || C.y + C.height < g.y);
    },
    cloneObject(g) {
      const C = {};
      for (const A in g)
        this._isPlainObject(g[A]) ? C[A] = this.cloneObject(g[A]) : this._isArray(g[A]) ? C[A] = this.cloneArray(g[A]) : C[A] = g[A];
      return C;
    },
    cloneArray(g) {
      return g.slice(0);
    },
    degToRad(g) {
      return g * c;
    },
    radToDeg(g) {
      return g * d;
    },
    _degToRad(g) {
      return t.Util.warn("Util._degToRad is removed. Please use public Util.degToRad instead."), t.Util.degToRad(g);
    },
    _radToDeg(g) {
      return t.Util.warn("Util._radToDeg is removed. Please use public Util.radToDeg instead."), t.Util.radToDeg(g);
    },
    _getRotation(g) {
      return e.Konva.angleDeg ? t.Util.radToDeg(g) : g;
    },
    _capitalize(g) {
      return g.charAt(0).toUpperCase() + g.slice(1);
    },
    throw(g) {
      throw new Error(w + g);
    },
    error(g) {
      console.error(w + g);
    },
    warn(g) {
      e.Konva.showWarnings && console.warn(x + g);
    },
    each(g, C) {
      for (const A in g)
        C(A, g[A]);
    },
    _inRange(g, C, A) {
      return C <= g && g < A;
    },
    _getProjectionToSegment(g, C, A, E, T, P) {
      let R, V, F;
      const W = (g - A) * (g - A) + (C - E) * (C - E);
      if (W == 0)
        R = g, V = C, F = (T - A) * (T - A) + (P - E) * (P - E);
      else {
        const U = ((T - g) * (A - g) + (P - C) * (E - C)) / W;
        U < 0 ? (R = g, V = C, F = (g - T) * (g - T) + (C - P) * (C - P)) : U > 1 ? (R = A, V = E, F = (A - T) * (A - T) + (E - P) * (E - P)) : (R = g + U * (A - g), V = C + U * (E - C), F = (R - T) * (R - T) + (V - P) * (V - P));
      }
      return [R, V, F];
    },
    _getProjectionToLine(g, C, A) {
      const E = t.Util.cloneObject(g);
      let T = Number.MAX_VALUE;
      return C.forEach(function(P, R) {
        if (!A && R === C.length - 1)
          return;
        const V = C[(R + 1) % C.length], F = t.Util._getProjectionToSegment(P.x, P.y, V.x, V.y, g.x, g.y), W = F[0], U = F[1], $ = F[2];
        $ < T && (E.x = W, E.y = U, T = $);
      }), E;
    },
    _prepareArrayForTween(g, C, A) {
      const E = [], T = [];
      if (g.length > C.length) {
        const R = C;
        C = g, g = R;
      }
      for (let R = 0; R < g.length; R += 2)
        E.push({
          x: g[R],
          y: g[R + 1]
        });
      for (let R = 0; R < C.length; R += 2)
        T.push({
          x: C[R],
          y: C[R + 1]
        });
      const P = [];
      return T.forEach(function(R) {
        const V = t.Util._getProjectionToLine(R, E, A);
        P.push(V.x), P.push(V.y);
      }), P;
    },
    _prepareToStringify(g) {
      let C;
      g.visitedByCircularReferenceRemoval = !0;
      for (const A in g)
        if (g.hasOwnProperty(A) && g[A] && typeof g[A] == "object") {
          if (C = Object.getOwnPropertyDescriptor(g, A), g[A].visitedByCircularReferenceRemoval || t.Util._isElement(g[A]))
            if (C.configurable)
              delete g[A];
            else
              return null;
          else if (t.Util._prepareToStringify(g[A]) === null)
            if (C.configurable)
              delete g[A];
            else
              return null;
        }
      return delete g.visitedByCircularReferenceRemoval, g;
    },
    _assign(g, C) {
      for (const A in C)
        g[A] = C[A];
      return g;
    },
    _getFirstPointerId(g) {
      return g.touches ? g.changedTouches[0].identifier : g.pointerId || 999;
    },
    releaseCanvas(...g) {
      e.Konva.releaseCanvasOnDestroy && g.forEach((C) => {
        C.width = 0, C.height = 0;
      });
    },
    drawRoundedRectPath(g, C, A, E) {
      let T = 0, P = 0, R = 0, V = 0;
      typeof E == "number" ? T = P = R = V = Math.min(E, C / 2, A / 2) : (T = Math.min(E[0] || 0, C / 2, A / 2), P = Math.min(E[1] || 0, C / 2, A / 2), V = Math.min(E[2] || 0, C / 2, A / 2), R = Math.min(E[3] || 0, C / 2, A / 2)), g.moveTo(T, 0), g.lineTo(C - P, 0), g.arc(C - P, P, P, Math.PI * 3 / 2, 0, !1), g.lineTo(C, A - V), g.arc(C - V, A - V, V, 0, Math.PI / 2, !1), g.lineTo(R, A), g.arc(R, A - R, R, Math.PI / 2, Math.PI, !1), g.lineTo(0, T), g.arc(T, T, T, Math.PI, Math.PI * 3 / 2, !1);
    }
  };
})(Et);
var kt = {}, Ar = {}, vi = {};
Object.defineProperty(vi, "__esModule", { value: !0 });
vi.HitContext = vi.SceneContext = vi.Context = void 0;
const lg = Et, y_ = Xe;
function v_(t) {
  const e = [], n = t.length, r = lg.Util;
  for (let o = 0; o < n; o++) {
    let a = t[o];
    r._isNumber(a) ? a = Math.round(a * 1e3) / 1e3 : r._isString(a) || (a = a + ""), e.push(a);
  }
  return e;
}
const o6 = ",", x_ = "(", __ = ")", C_ = "([", w_ = "])", S_ = ";", k_ = "()", M_ = "=", s6 = [
  "arc",
  "arcTo",
  "beginPath",
  "bezierCurveTo",
  "clearRect",
  "clip",
  "closePath",
  "createLinearGradient",
  "createPattern",
  "createRadialGradient",
  "drawImage",
  "ellipse",
  "fill",
  "fillText",
  "getImageData",
  "createImageData",
  "lineTo",
  "moveTo",
  "putImageData",
  "quadraticCurveTo",
  "rect",
  "roundRect",
  "restore",
  "rotate",
  "save",
  "scale",
  "setLineDash",
  "setTransform",
  "stroke",
  "strokeText",
  "transform",
  "translate"
], L_ = [
  "fillStyle",
  "strokeStyle",
  "shadowColor",
  "shadowBlur",
  "shadowOffsetX",
  "shadowOffsetY",
  "letterSpacing",
  "lineCap",
  "lineDashOffset",
  "lineJoin",
  "lineWidth",
  "miterLimit",
  "direction",
  "font",
  "textAlign",
  "textBaseline",
  "globalAlpha",
  "globalCompositeOperation",
  "imageSmoothingEnabled"
], A_ = 100;
class Hc {
  constructor(e) {
    this.canvas = e, y_.Konva.enableTrace && (this.traceArr = [], this._enableTrace());
  }
  fillShape(e) {
    e.fillEnabled() && this._fill(e);
  }
  _fill(e) {
  }
  strokeShape(e) {
    e.hasStroke() && this._stroke(e);
  }
  _stroke(e) {
  }
  fillStrokeShape(e) {
    e.attrs.fillAfterStrokeEnabled ? (this.strokeShape(e), this.fillShape(e)) : (this.fillShape(e), this.strokeShape(e));
  }
  getTrace(e, n) {
    let r = this.traceArr, o = r.length, a = "", l, c, d, p;
    for (l = 0; l < o; l++)
      c = r[l], d = c.method, d ? (p = c.args, a += d, e ? a += k_ : lg.Util._isArray(p[0]) ? a += C_ + p.join(o6) + w_ : (n && (p = p.map((y) => typeof y == "number" ? Math.floor(y) : y)), a += x_ + p.join(o6) + __)) : (a += c.property, e || (a += M_ + c.val)), a += S_;
    return a;
  }
  clearTrace() {
    this.traceArr = [];
  }
  _trace(e) {
    let n = this.traceArr, r;
    n.push(e), r = n.length, r >= A_ && n.shift();
  }
  reset() {
    const e = this.getCanvas().getPixelRatio();
    this.setTransform(1 * e, 0, 0, 1 * e, 0, 0);
  }
  getCanvas() {
    return this.canvas;
  }
  clear(e) {
    const n = this.getCanvas();
    e ? this.clearRect(e.x || 0, e.y || 0, e.width || 0, e.height || 0) : this.clearRect(0, 0, n.getWidth() / n.pixelRatio, n.getHeight() / n.pixelRatio);
  }
  _applyLineCap(e) {
    const n = e.attrs.lineCap;
    n && this.setAttr("lineCap", n);
  }
  _applyOpacity(e) {
    const n = e.getAbsoluteOpacity();
    n !== 1 && this.setAttr("globalAlpha", n);
  }
  _applyLineJoin(e) {
    const n = e.attrs.lineJoin;
    n && this.setAttr("lineJoin", n);
  }
  setAttr(e, n) {
    this._context[e] = n;
  }
  arc(e, n, r, o, a, l) {
    this._context.arc(e, n, r, o, a, l);
  }
  arcTo(e, n, r, o, a) {
    this._context.arcTo(e, n, r, o, a);
  }
  beginPath() {
    this._context.beginPath();
  }
  bezierCurveTo(e, n, r, o, a, l) {
    this._context.bezierCurveTo(e, n, r, o, a, l);
  }
  clearRect(e, n, r, o) {
    this._context.clearRect(e, n, r, o);
  }
  clip(...e) {
    this._context.clip.apply(this._context, e);
  }
  closePath() {
    this._context.closePath();
  }
  createImageData(e, n) {
    const r = arguments;
    if (r.length === 2)
      return this._context.createImageData(e, n);
    if (r.length === 1)
      return this._context.createImageData(e);
  }
  createLinearGradient(e, n, r, o) {
    return this._context.createLinearGradient(e, n, r, o);
  }
  createPattern(e, n) {
    return this._context.createPattern(e, n);
  }
  createRadialGradient(e, n, r, o, a, l) {
    return this._context.createRadialGradient(e, n, r, o, a, l);
  }
  drawImage(e, n, r, o, a, l, c, d, p) {
    const y = arguments, k = this._context;
    y.length === 3 ? k.drawImage(e, n, r) : y.length === 5 ? k.drawImage(e, n, r, o, a) : y.length === 9 && k.drawImage(e, n, r, o, a, l, c, d, p);
  }
  ellipse(e, n, r, o, a, l, c, d) {
    this._context.ellipse(e, n, r, o, a, l, c, d);
  }
  isPointInPath(e, n, r, o) {
    return r ? this._context.isPointInPath(r, e, n, o) : this._context.isPointInPath(e, n, o);
  }
  fill(...e) {
    this._context.fill.apply(this._context, e);
  }
  fillRect(e, n, r, o) {
    this._context.fillRect(e, n, r, o);
  }
  strokeRect(e, n, r, o) {
    this._context.strokeRect(e, n, r, o);
  }
  fillText(e, n, r, o) {
    o ? this._context.fillText(e, n, r, o) : this._context.fillText(e, n, r);
  }
  measureText(e) {
    return this._context.measureText(e);
  }
  getImageData(e, n, r, o) {
    return this._context.getImageData(e, n, r, o);
  }
  lineTo(e, n) {
    this._context.lineTo(e, n);
  }
  moveTo(e, n) {
    this._context.moveTo(e, n);
  }
  rect(e, n, r, o) {
    this._context.rect(e, n, r, o);
  }
  roundRect(e, n, r, o, a) {
    this._context.roundRect(e, n, r, o, a);
  }
  putImageData(e, n, r) {
    this._context.putImageData(e, n, r);
  }
  quadraticCurveTo(e, n, r, o) {
    this._context.quadraticCurveTo(e, n, r, o);
  }
  restore() {
    this._context.restore();
  }
  rotate(e) {
    this._context.rotate(e);
  }
  save() {
    this._context.save();
  }
  scale(e, n) {
    this._context.scale(e, n);
  }
  setLineDash(e) {
    this._context.setLineDash ? this._context.setLineDash(e) : "mozDash" in this._context ? this._context.mozDash = e : "webkitLineDash" in this._context && (this._context.webkitLineDash = e);
  }
  getLineDash() {
    return this._context.getLineDash();
  }
  setTransform(e, n, r, o, a, l) {
    this._context.setTransform(e, n, r, o, a, l);
  }
  stroke(e) {
    e ? this._context.stroke(e) : this._context.stroke();
  }
  strokeText(e, n, r, o) {
    this._context.strokeText(e, n, r, o);
  }
  transform(e, n, r, o, a, l) {
    this._context.transform(e, n, r, o, a, l);
  }
  translate(e, n) {
    this._context.translate(e, n);
  }
  _enableTrace() {
    let e = this, n = s6.length, r = this.setAttr, o, a;
    const l = function(c) {
      let d = e[c], p;
      e[c] = function() {
        return a = v_(Array.prototype.slice.call(arguments, 0)), p = d.apply(e, arguments), e._trace({
          method: c,
          args: a
        }), p;
      };
    };
    for (o = 0; o < n; o++)
      l(s6[o]);
    e.setAttr = function() {
      r.apply(e, arguments);
      const c = arguments[0];
      let d = arguments[1];
      (c === "shadowOffsetX" || c === "shadowOffsetY" || c === "shadowBlur") && (d = d / this.canvas.getPixelRatio()), e._trace({
        property: c,
        val: d
      });
    };
  }
  _applyGlobalCompositeOperation(e) {
    const n = e.attrs.globalCompositeOperation;
    !n || n === "source-over" || this.setAttr("globalCompositeOperation", n);
  }
}
vi.Context = Hc;
L_.forEach(function(t) {
  Object.defineProperty(Hc.prototype, t, {
    get() {
      return this._context[t];
    },
    set(e) {
      this._context[t] = e;
    }
  });
});
class b_ extends Hc {
  constructor(e, { willReadFrequently: n = !1 } = {}) {
    super(e), this._context = e._canvas.getContext("2d", {
      willReadFrequently: n
    });
  }
  _fillColor(e) {
    const n = e.fill();
    this.setAttr("fillStyle", n), e._fillFunc(this);
  }
  _fillPattern(e) {
    this.setAttr("fillStyle", e._getFillPattern()), e._fillFunc(this);
  }
  _fillLinearGradient(e) {
    const n = e._getLinearGradient();
    n && (this.setAttr("fillStyle", n), e._fillFunc(this));
  }
  _fillRadialGradient(e) {
    const n = e._getRadialGradient();
    n && (this.setAttr("fillStyle", n), e._fillFunc(this));
  }
  _fill(e) {
    const n = e.fill(), r = e.getFillPriority();
    if (n && r === "color") {
      this._fillColor(e);
      return;
    }
    const o = e.getFillPatternImage();
    if (o && r === "pattern") {
      this._fillPattern(e);
      return;
    }
    const a = e.getFillLinearGradientColorStops();
    if (a && r === "linear-gradient") {
      this._fillLinearGradient(e);
      return;
    }
    const l = e.getFillRadialGradientColorStops();
    if (l && r === "radial-gradient") {
      this._fillRadialGradient(e);
      return;
    }
    n ? this._fillColor(e) : o ? this._fillPattern(e) : a ? this._fillLinearGradient(e) : l && this._fillRadialGradient(e);
  }
  _strokeLinearGradient(e) {
    const n = e.getStrokeLinearGradientStartPoint(), r = e.getStrokeLinearGradientEndPoint(), o = e.getStrokeLinearGradientColorStops(), a = this.createLinearGradient(n.x, n.y, r.x, r.y);
    if (o) {
      for (let l = 0; l < o.length; l += 2)
        a.addColorStop(o[l], o[l + 1]);
      this.setAttr("strokeStyle", a);
    }
  }
  _stroke(e) {
    const n = e.dash(), r = e.getStrokeScaleEnabled();
    if (e.hasStroke()) {
      if (!r) {
        this.save();
        const a = this.getCanvas().getPixelRatio();
        this.setTransform(a, 0, 0, a, 0, 0);
      }
      this._applyLineCap(e), n && e.dashEnabled() && (this.setLineDash(n), this.setAttr("lineDashOffset", e.dashOffset())), this.setAttr("lineWidth", e.strokeWidth()), e.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)"), e.getStrokeLinearGradientColorStops() ? this._strokeLinearGradient(e) : this.setAttr("strokeStyle", e.stroke()), e._strokeFunc(this), r || this.restore();
    }
  }
  _applyShadow(e) {
    var n, r, o;
    const a = (n = e.getShadowRGBA()) !== null && n !== void 0 ? n : "black", l = (r = e.getShadowBlur()) !== null && r !== void 0 ? r : 5, c = (o = e.getShadowOffset()) !== null && o !== void 0 ? o : {
      x: 0,
      y: 0
    }, d = e.getAbsoluteScale(), p = this.canvas.getPixelRatio(), y = d.x * p, k = d.y * p;
    this.setAttr("shadowColor", a), this.setAttr("shadowBlur", l * Math.min(Math.abs(y), Math.abs(k))), this.setAttr("shadowOffsetX", c.x * y), this.setAttr("shadowOffsetY", c.y * k);
  }
}
vi.SceneContext = b_;
class P_ extends Hc {
  constructor(e) {
    super(e), this._context = e._canvas.getContext("2d", {
      willReadFrequently: !0
    });
  }
  _fill(e) {
    this.save(), this.setAttr("fillStyle", e.colorKey), e._fillFuncHit(this), this.restore();
  }
  strokeShape(e) {
    e.hasHitStroke() && this._stroke(e);
  }
  _stroke(e) {
    if (e.hasHitStroke()) {
      const n = e.getStrokeScaleEnabled();
      if (!n) {
        this.save();
        const a = this.getCanvas().getPixelRatio();
        this.setTransform(a, 0, 0, a, 0, 0);
      }
      this._applyLineCap(e);
      const r = e.hitStrokeWidth(), o = r === "auto" ? e.strokeWidth() : r;
      this.setAttr("lineWidth", o), this.setAttr("strokeStyle", e.colorKey), e._strokeFuncHit(this), n || this.restore();
    }
  }
}
vi.HitContext = P_;
Object.defineProperty(Ar, "__esModule", { value: !0 });
Ar.HitCanvas = Ar.SceneCanvas = Ar.Canvas = void 0;
const Xu = Et, ug = vi, cg = Xe;
let X0;
function E_() {
  if (X0)
    return X0;
  const t = Xu.Util.createCanvasElement(), e = t.getContext("2d");
  return X0 = function() {
    const n = cg.Konva._global.devicePixelRatio || 1, r = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
    return n / r;
  }(), Xu.Util.releaseCanvas(t), X0;
}
class Uh {
  constructor(e) {
    this.pixelRatio = 1, this.width = 0, this.height = 0, this.isCache = !1;
    const r = (e || {}).pixelRatio || cg.Konva.pixelRatio || E_();
    this.pixelRatio = r, this._canvas = Xu.Util.createCanvasElement(), this._canvas.style.padding = "0", this._canvas.style.margin = "0", this._canvas.style.border = "0", this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = "0", this._canvas.style.left = "0";
  }
  getContext() {
    return this.context;
  }
  getPixelRatio() {
    return this.pixelRatio;
  }
  setPixelRatio(e) {
    const n = this.pixelRatio;
    this.pixelRatio = e, this.setSize(this.getWidth() / n, this.getHeight() / n);
  }
  setWidth(e) {
    this.width = this._canvas.width = e * this.pixelRatio, this._canvas.style.width = e + "px";
    const n = this.pixelRatio;
    this.getContext()._context.scale(n, n);
  }
  setHeight(e) {
    this.height = this._canvas.height = e * this.pixelRatio, this._canvas.style.height = e + "px";
    const n = this.pixelRatio;
    this.getContext()._context.scale(n, n);
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  setSize(e, n) {
    this.setWidth(e || 0), this.setHeight(n || 0);
  }
  toDataURL(e, n) {
    try {
      return this._canvas.toDataURL(e, n);
    } catch {
      try {
        return this._canvas.toDataURL();
      } catch (o) {
        return Xu.Util.error("Unable to get data URL. " + o.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."), "";
      }
    }
  }
}
Ar.Canvas = Uh;
class N_ extends Uh {
  constructor(e = { width: 0, height: 0, willReadFrequently: !1 }) {
    super(e), this.context = new ug.SceneContext(this, {
      willReadFrequently: e.willReadFrequently
    }), this.setSize(e.width, e.height);
  }
}
Ar.SceneCanvas = N_;
class H_ extends Uh {
  constructor(e = { width: 0, height: 0 }) {
    super(e), this.hitCanvas = !0, this.context = new ug.HitContext(this), this.setSize(e.width, e.height);
  }
}
Ar.HitCanvas = H_;
var Vc = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.DD = void 0;
  const e = Xe, n = Et;
  t.DD = {
    get isDragging() {
      let r = !1;
      return t.DD._dragElements.forEach((o) => {
        o.dragStatus === "dragging" && (r = !0);
      }), r;
    },
    justDragged: !1,
    get node() {
      let r;
      return t.DD._dragElements.forEach((o) => {
        r = o.node;
      }), r;
    },
    _dragElements: /* @__PURE__ */ new Map(),
    _drag(r) {
      const o = [];
      t.DD._dragElements.forEach((a, l) => {
        const { node: c } = a, d = c.getStage();
        d.setPointersPositions(r), a.pointerId === void 0 && (a.pointerId = n.Util._getFirstPointerId(r));
        const p = d._changedPointerPositions.find((y) => y.id === a.pointerId);
        if (p) {
          if (a.dragStatus !== "dragging") {
            const y = c.dragDistance();
            if (Math.max(Math.abs(p.x - a.startPointerPos.x), Math.abs(p.y - a.startPointerPos.y)) < y || (c.startDrag({ evt: r }), !c.isDragging()))
              return;
          }
          c._setDragPosition(r, a), o.push(c);
        }
      }), o.forEach((a) => {
        a.fire("dragmove", {
          type: "dragmove",
          target: a,
          evt: r
        }, !0);
      });
    },
    _endDragBefore(r) {
      const o = [];
      t.DD._dragElements.forEach((a) => {
        const { node: l } = a, c = l.getStage();
        if (r && c.setPointersPositions(r), !c._changedPointerPositions.find((y) => y.id === a.pointerId))
          return;
        (a.dragStatus === "dragging" || a.dragStatus === "stopped") && (t.DD.justDragged = !0, e.Konva._mouseListenClick = !1, e.Konva._touchListenClick = !1, e.Konva._pointerListenClick = !1, a.dragStatus = "stopped");
        const p = a.node.getLayer() || a.node instanceof e.Konva.Stage && a.node;
        p && o.indexOf(p) === -1 && o.push(p);
      }), o.forEach((a) => {
        a.draw();
      });
    },
    _endDragAfter(r) {
      t.DD._dragElements.forEach((o, a) => {
        o.dragStatus === "stopped" && o.node.fire("dragend", {
          type: "dragend",
          target: o.node,
          evt: r
        }, !0), o.dragStatus !== "dragging" && t.DD._dragElements.delete(a);
      });
    }
  }, e.Konva.isBrowser && (window.addEventListener("mouseup", t.DD._endDragBefore, !0), window.addEventListener("touchend", t.DD._endDragBefore, !0), window.addEventListener("touchcancel", t.DD._endDragBefore, !0), window.addEventListener("mousemove", t.DD._drag), window.addEventListener("touchmove", t.DD._drag), window.addEventListener("mouseup", t.DD._endDragAfter, !1), window.addEventListener("touchend", t.DD._endDragAfter, !1), window.addEventListener("touchcancel", t.DD._endDragAfter, !1));
})(Vc);
var Qe = {}, Ie = {};
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.RGBComponent = V_;
Ie.alphaComponent = T_;
Ie.getNumberValidator = R_;
Ie.getNumberOrArrayOfNumbersValidator = z_;
Ie.getNumberOrAutoValidator = F_;
Ie.getStringValidator = j_;
Ie.getStringOrGradientValidator = O_;
Ie.getFunctionValidator = I_;
Ie.getNumberArrayValidator = D_;
Ie.getBooleanValidator = G_;
Ie.getComponentValidator = U_;
const Li = Xe, Tt = Et;
function Ai(t) {
  return Tt.Util._isString(t) ? '"' + t + '"' : Object.prototype.toString.call(t) === "[object Number]" || Tt.Util._isBoolean(t) ? t : Object.prototype.toString.call(t);
}
function V_(t) {
  return t > 255 ? 255 : t < 0 ? 0 : Math.round(t);
}
function T_(t) {
  return t > 1 ? 1 : t < 1e-4 ? 1e-4 : t;
}
function R_() {
  if (Li.Konva.isUnminified)
    return function(t, e) {
      return Tt.Util._isNumber(t) || Tt.Util.warn(Ai(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number.'), t;
    };
}
function z_(t) {
  if (Li.Konva.isUnminified)
    return function(e, n) {
      let r = Tt.Util._isNumber(e), o = Tt.Util._isArray(e) && e.length == t;
      return !r && !o && Tt.Util.warn(Ai(e) + ' is a not valid value for "' + n + '" attribute. The value should be a number or Array<number>(' + t + ")"), e;
    };
}
function F_() {
  if (Li.Konva.isUnminified)
    return function(t, e) {
      return Tt.Util._isNumber(t) || t === "auto" || Tt.Util.warn(Ai(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number or "auto".'), t;
    };
}
function j_() {
  if (Li.Konva.isUnminified)
    return function(t, e) {
      return Tt.Util._isString(t) || Tt.Util.warn(Ai(t) + ' is a not valid value for "' + e + '" attribute. The value should be a string.'), t;
    };
}
function O_() {
  if (Li.Konva.isUnminified)
    return function(t, e) {
      const n = Tt.Util._isString(t), r = Object.prototype.toString.call(t) === "[object CanvasGradient]" || t && t.addColorStop;
      return n || r || Tt.Util.warn(Ai(t) + ' is a not valid value for "' + e + '" attribute. The value should be a string or a native gradient.'), t;
    };
}
function I_() {
  if (Li.Konva.isUnminified)
    return function(t, e) {
      return Tt.Util._isFunction(t) || Tt.Util.warn(Ai(t) + ' is a not valid value for "' + e + '" attribute. The value should be a function.'), t;
    };
}
function D_() {
  if (Li.Konva.isUnminified)
    return function(t, e) {
      const n = Int8Array ? Object.getPrototypeOf(Int8Array) : null;
      return n && t instanceof n || (Tt.Util._isArray(t) ? t.forEach(function(r) {
        Tt.Util._isNumber(r) || Tt.Util.warn('"' + e + '" attribute has non numeric element ' + r + ". Make sure that all elements are numbers.");
      }) : Tt.Util.warn(Ai(t) + ' is a not valid value for "' + e + '" attribute. The value should be a array of numbers.')), t;
    };
}
function G_() {
  if (Li.Konva.isUnminified)
    return function(t, e) {
      return t === !0 || t === !1 || Tt.Util.warn(Ai(t) + ' is a not valid value for "' + e + '" attribute. The value should be a boolean.'), t;
    };
}
function U_(t) {
  if (Li.Konva.isUnminified)
    return function(e, n) {
      return e == null || Tt.Util.isObject(e) || Tt.Util.warn(Ai(e) + ' is a not valid value for "' + n + '" attribute. The value should be an object with properties ' + t), e;
    };
}
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Factory = void 0;
  const e = Et, n = Ie, r = "get", o = "set";
  t.Factory = {
    addGetterSetter(a, l, c, d, p) {
      t.Factory.addGetter(a, l, c), t.Factory.addSetter(a, l, d, p), t.Factory.addOverloadedGetterSetter(a, l);
    },
    addGetter(a, l, c) {
      const d = r + e.Util._capitalize(l);
      a.prototype[d] = a.prototype[d] || function() {
        const p = this.attrs[l];
        return p === void 0 ? c : p;
      };
    },
    addSetter(a, l, c, d) {
      const p = o + e.Util._capitalize(l);
      a.prototype[p] || t.Factory.overWriteSetter(a, l, c, d);
    },
    overWriteSetter(a, l, c, d) {
      const p = o + e.Util._capitalize(l);
      a.prototype[p] = function(y) {
        return c && y !== void 0 && y !== null && (y = c.call(this, y, l)), this._setAttr(l, y), d && d.call(this), this;
      };
    },
    addComponentsGetterSetter(a, l, c, d, p) {
      const y = c.length, k = e.Util._capitalize, x = r + k(l), w = o + k(l);
      a.prototype[x] = function() {
        const S = {};
        for (let b = 0; b < y; b++) {
          const L = c[b];
          S[L] = this.getAttr(l + k(L));
        }
        return S;
      };
      const m = (0, n.getComponentValidator)(c);
      a.prototype[w] = function(S) {
        const b = this.attrs[l];
        d && (S = d.call(this, S, l)), m && m.call(this, S, l);
        for (const L in S)
          S.hasOwnProperty(L) && this._setAttr(l + k(L), S[L]);
        return S || c.forEach((L) => {
          this._setAttr(l + k(L), void 0);
        }), this._fireChangeEvent(l, b, S), p && p.call(this), this;
      }, t.Factory.addOverloadedGetterSetter(a, l);
    },
    addOverloadedGetterSetter(a, l) {
      const c = e.Util._capitalize(l), d = o + c, p = r + c;
      a.prototype[l] = function() {
        return arguments.length ? (this[d](arguments[0]), this) : this[p]();
      };
    },
    addDeprecatedGetterSetter(a, l, c, d) {
      e.Util.error("Adding deprecated " + l);
      const p = r + e.Util._capitalize(l), y = l + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
      a.prototype[p] = function() {
        e.Util.error(y);
        const k = this.attrs[l];
        return k === void 0 ? c : k;
      }, t.Factory.addSetter(a, l, d, function() {
        e.Util.error(y);
      }), t.Factory.addOverloadedGetterSetter(a, l);
    },
    backCompat(a, l) {
      e.Util.each(l, function(c, d) {
        const p = a.prototype[d], y = r + e.Util._capitalize(c), k = o + e.Util._capitalize(c);
        function x() {
          p.apply(this, arguments), e.Util.error('"' + c + '" method is deprecated and will be removed soon. Use ""' + d + '" instead.');
        }
        a.prototype[c] = x, a.prototype[y] = x, a.prototype[k] = x;
      });
    },
    afterSetFilter() {
      this._filterUpToDate = !1;
    }
  };
})(Qe);
Object.defineProperty(kt, "__esModule", { value: !0 });
kt.Node = void 0;
const Ts = Ar, sr = Vc, o1 = Qe, Wi = Xe, Je = Et, jt = Ie, wu = "absoluteOpacity", $0 = "allEventListeners", di = "absoluteTransform", a6 = "absoluteScale", Io = "canvas", B_ = "Change", W_ = "children", Z_ = "konva", R5 = "listening", Y_ = "mouseenter", K_ = "mouseleave", X_ = "pointerenter", $_ = "pointerleave", Q_ = "touchenter", q_ = "touchleave", l6 = "set", u6 = "Shape", Su = " ", c6 = "stage", Xi = "transform", J_ = "Stage", z5 = "visible", eC = [
  "xChange.konva",
  "yChange.konva",
  "scaleXChange.konva",
  "scaleYChange.konva",
  "skewXChange.konva",
  "skewYChange.konva",
  "rotationChange.konva",
  "offsetXChange.konva",
  "offsetYChange.konva",
  "transformsEnabledChange.konva"
].join(Su);
let tC = 1;
class Ge {
  constructor(e) {
    this._id = tC++, this.eventListeners = {}, this.attrs = {}, this.index = 0, this._allEventListeners = null, this.parent = null, this._cache = /* @__PURE__ */ new Map(), this._attachedDepsListeners = /* @__PURE__ */ new Map(), this._lastPos = null, this._batchingTransformChange = !1, this._needClearTransformCache = !1, this._filterUpToDate = !1, this._isUnderCache = !1, this._dragEventId = null, this._shouldFireChangeEvents = !1, this.setAttrs(e), this._shouldFireChangeEvents = !0;
  }
  hasChildren() {
    return !1;
  }
  _clearCache(e) {
    (e === Xi || e === di) && this._cache.get(e) ? this._cache.get(e).dirty = !0 : e ? this._cache.delete(e) : this._cache.clear();
  }
  _getCache(e, n) {
    let r = this._cache.get(e);
    return (r === void 0 || (e === Xi || e === di) && r.dirty === !0) && (r = n.call(this), this._cache.set(e, r)), r;
  }
  _calculate(e, n, r) {
    if (!this._attachedDepsListeners.get(e)) {
      const o = n.map((a) => a + "Change.konva").join(Su);
      this.on(o, () => {
        this._clearCache(e);
      }), this._attachedDepsListeners.set(e, !0);
    }
    return this._getCache(e, r);
  }
  _getCanvasCache() {
    return this._cache.get(Io);
  }
  _clearSelfAndDescendantCache(e) {
    this._clearCache(e), e === di && this.fire("absoluteTransformChange");
  }
  clearCache() {
    if (this._cache.has(Io)) {
      const { scene: e, filter: n, hit: r, buffer: o } = this._cache.get(Io);
      Je.Util.releaseCanvas(e, n, r, o), this._cache.delete(Io);
    }
    return this._clearSelfAndDescendantCache(), this._requestDraw(), this;
  }
  cache(e) {
    const n = e || {};
    let r = {};
    (n.x === void 0 || n.y === void 0 || n.width === void 0 || n.height === void 0) && (r = this.getClientRect({
      skipTransform: !0,
      relativeTo: this.getParent() || void 0
    }));
    let o = Math.ceil(n.width || r.width), a = Math.ceil(n.height || r.height), l = n.pixelRatio, c = n.x === void 0 ? Math.floor(r.x) : n.x, d = n.y === void 0 ? Math.floor(r.y) : n.y, p = n.offset || 0, y = n.drawBorder || !1, k = n.hitCanvasPixelRatio || 1;
    if (!o || !a) {
      Je.Util.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.");
      return;
    }
    const x = Math.abs(Math.round(r.x) - c) > 0.5 ? 1 : 0, w = Math.abs(Math.round(r.y) - d) > 0.5 ? 1 : 0;
    o += p * 2 + x, a += p * 2 + w, c -= p, d -= p;
    const m = new Ts.SceneCanvas({
      pixelRatio: l,
      width: o,
      height: a
    }), S = new Ts.SceneCanvas({
      pixelRatio: l,
      width: 0,
      height: 0,
      willReadFrequently: !0
    }), b = new Ts.HitCanvas({
      pixelRatio: k,
      width: o,
      height: a
    }), L = m.getContext(), M = b.getContext(), g = new Ts.SceneCanvas({
      width: m.width / m.pixelRatio + Math.abs(c),
      height: m.height / m.pixelRatio + Math.abs(d),
      pixelRatio: m.pixelRatio
    }), C = g.getContext();
    return b.isCache = !0, m.isCache = !0, this._cache.delete(Io), this._filterUpToDate = !1, n.imageSmoothingEnabled === !1 && (m.getContext()._context.imageSmoothingEnabled = !1, S.getContext()._context.imageSmoothingEnabled = !1), L.save(), M.save(), C.save(), L.translate(-c, -d), M.translate(-c, -d), C.translate(-c, -d), g.x = c, g.y = d, this._isUnderCache = !0, this._clearSelfAndDescendantCache(wu), this._clearSelfAndDescendantCache(a6), this.drawScene(m, this, g), this.drawHit(b, this), this._isUnderCache = !1, L.restore(), M.restore(), y && (L.save(), L.beginPath(), L.rect(0, 0, o, a), L.closePath(), L.setAttr("strokeStyle", "red"), L.setAttr("lineWidth", 5), L.stroke(), L.restore()), this._cache.set(Io, {
      scene: m,
      filter: S,
      hit: b,
      buffer: g,
      x: c,
      y: d
    }), this._requestDraw(), this;
  }
  isCached() {
    return this._cache.has(Io);
  }
  getClientRect(e) {
    throw new Error('abstract "getClientRect" method call');
  }
  _transformedRect(e, n) {
    const r = [
      { x: e.x, y: e.y },
      { x: e.x + e.width, y: e.y },
      { x: e.x + e.width, y: e.y + e.height },
      { x: e.x, y: e.y + e.height }
    ];
    let o = 1 / 0, a = 1 / 0, l = -1 / 0, c = -1 / 0;
    const d = this.getAbsoluteTransform(n);
    return r.forEach(function(p) {
      const y = d.point(p);
      o === void 0 && (o = l = y.x, a = c = y.y), o = Math.min(o, y.x), a = Math.min(a, y.y), l = Math.max(l, y.x), c = Math.max(c, y.y);
    }), {
      x: o,
      y: a,
      width: l - o,
      height: c - a
    };
  }
  _drawCachedSceneCanvas(e) {
    e.save(), e._applyOpacity(this), e._applyGlobalCompositeOperation(this);
    const n = this._getCanvasCache();
    e.translate(n.x, n.y);
    const r = this._getCachedSceneCanvas(), o = r.pixelRatio;
    e.drawImage(r._canvas, 0, 0, r.width / o, r.height / o), e.restore();
  }
  _drawCachedHitCanvas(e) {
    const n = this._getCanvasCache(), r = n.hit;
    e.save(), e.translate(n.x, n.y), e.drawImage(r._canvas, 0, 0, r.width / r.pixelRatio, r.height / r.pixelRatio), e.restore();
  }
  _getCachedSceneCanvas() {
    let e = this.filters(), n = this._getCanvasCache(), r = n.scene, o = n.filter, a = o.getContext(), l, c, d, p;
    if (e) {
      if (!this._filterUpToDate) {
        const y = r.pixelRatio;
        o.setSize(r.width / r.pixelRatio, r.height / r.pixelRatio);
        try {
          for (l = e.length, a.clear(), a.drawImage(r._canvas, 0, 0, r.getWidth() / y, r.getHeight() / y), c = a.getImageData(0, 0, o.getWidth(), o.getHeight()), d = 0; d < l; d++) {
            if (p = e[d], typeof p != "function") {
              Je.Util.error("Filter should be type of function, but got " + typeof p + " instead. Please check correct filters");
              continue;
            }
            p.call(this, c), a.putImageData(c, 0, 0);
          }
        } catch (k) {
          Je.Util.error("Unable to apply filter. " + k.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.");
        }
        this._filterUpToDate = !0;
      }
      return o;
    }
    return r;
  }
  on(e, n) {
    if (this._cache && this._cache.delete($0), arguments.length === 3)
      return this._delegate.apply(this, arguments);
    const r = e.split(Su);
    for (let o = 0; o < r.length; o++) {
      const l = r[o].split("."), c = l[0], d = l[1] || "";
      this.eventListeners[c] || (this.eventListeners[c] = []), this.eventListeners[c].push({ name: d, handler: n });
    }
    return this;
  }
  off(e, n) {
    let r = (e || "").split(Su), o = r.length, a, l, c, d, p, y;
    if (this._cache && this._cache.delete($0), !e)
      for (l in this.eventListeners)
        this._off(l);
    for (a = 0; a < o; a++)
      if (c = r[a], d = c.split("."), p = d[0], y = d[1], p)
        this.eventListeners[p] && this._off(p, y, n);
      else
        for (l in this.eventListeners)
          this._off(l, y, n);
    return this;
  }
  dispatchEvent(e) {
    const n = {
      target: this,
      type: e.type,
      evt: e
    };
    return this.fire(e.type, n), this;
  }
  addEventListener(e, n) {
    return this.on(e, function(r) {
      n.call(this, r.evt);
    }), this;
  }
  removeEventListener(e) {
    return this.off(e), this;
  }
  _delegate(e, n, r) {
    const o = this;
    this.on(e, function(a) {
      const l = a.target.findAncestors(n, !0, o);
      for (let c = 0; c < l.length; c++)
        a = Je.Util.cloneObject(a), a.currentTarget = l[c], r.call(l[c], a);
    });
  }
  remove() {
    return this.isDragging() && this.stopDrag(), sr.DD._dragElements.delete(this._id), this._remove(), this;
  }
  _clearCaches() {
    this._clearSelfAndDescendantCache(di), this._clearSelfAndDescendantCache(wu), this._clearSelfAndDescendantCache(a6), this._clearSelfAndDescendantCache(c6), this._clearSelfAndDescendantCache(z5), this._clearSelfAndDescendantCache(R5);
  }
  _remove() {
    this._clearCaches();
    const e = this.getParent();
    e && e.children && (e.children.splice(this.index, 1), e._setChildrenIndices(), this.parent = null);
  }
  destroy() {
    return this.remove(), this.clearCache(), this;
  }
  getAttr(e) {
    const n = "get" + Je.Util._capitalize(e);
    return Je.Util._isFunction(this[n]) ? this[n]() : this.attrs[e];
  }
  getAncestors() {
    let e = this.getParent(), n = [];
    for (; e; )
      n.push(e), e = e.getParent();
    return n;
  }
  getAttrs() {
    return this.attrs || {};
  }
  setAttrs(e) {
    return this._batchTransformChanges(() => {
      let n, r;
      if (!e)
        return this;
      for (n in e)
        n !== W_ && (r = l6 + Je.Util._capitalize(n), Je.Util._isFunction(this[r]) ? this[r](e[n]) : this._setAttr(n, e[n]));
    }), this;
  }
  isListening() {
    return this._getCache(R5, this._isListening);
  }
  _isListening(e) {
    if (!this.listening())
      return !1;
    const r = this.getParent();
    return r && r !== e && this !== e ? r._isListening(e) : !0;
  }
  isVisible() {
    return this._getCache(z5, this._isVisible);
  }
  _isVisible(e) {
    if (!this.visible())
      return !1;
    const r = this.getParent();
    return r && r !== e && this !== e ? r._isVisible(e) : !0;
  }
  shouldDrawHit(e, n = !1) {
    if (e)
      return this._isVisible(e) && this._isListening(e);
    const r = this.getLayer();
    let o = !1;
    sr.DD._dragElements.forEach((l) => {
      l.dragStatus === "dragging" && (l.node.nodeType === "Stage" || l.node.getLayer() === r) && (o = !0);
    });
    const a = !n && !Wi.Konva.hitOnDragEnabled && (o || Wi.Konva.isTransforming());
    return this.isListening() && this.isVisible() && !a;
  }
  show() {
    return this.visible(!0), this;
  }
  hide() {
    return this.visible(!1), this;
  }
  getZIndex() {
    return this.index || 0;
  }
  getAbsoluteZIndex() {
    let e = this.getDepth(), n = this, r = 0, o, a, l, c;
    function d(y) {
      for (o = [], a = y.length, l = 0; l < a; l++)
        c = y[l], r++, c.nodeType !== u6 && (o = o.concat(c.getChildren().slice())), c._id === n._id && (l = a);
      o.length > 0 && o[0].getDepth() <= e && d(o);
    }
    const p = this.getStage();
    return n.nodeType !== J_ && p && d(p.getChildren()), r;
  }
  getDepth() {
    let e = 0, n = this.parent;
    for (; n; )
      e++, n = n.parent;
    return e;
  }
  _batchTransformChanges(e) {
    this._batchingTransformChange = !0, e(), this._batchingTransformChange = !1, this._needClearTransformCache && (this._clearCache(Xi), this._clearSelfAndDescendantCache(di)), this._needClearTransformCache = !1;
  }
  setPosition(e) {
    return this._batchTransformChanges(() => {
      this.x(e.x), this.y(e.y);
    }), this;
  }
  getPosition() {
    return {
      x: this.x(),
      y: this.y()
    };
  }
  getRelativePointerPosition() {
    const e = this.getStage();
    if (!e)
      return null;
    const n = e.getPointerPosition();
    if (!n)
      return null;
    const r = this.getAbsoluteTransform().copy();
    return r.invert(), r.point(n);
  }
  getAbsolutePosition(e) {
    let n = !1, r = this.parent;
    for (; r; ) {
      if (r.isCached()) {
        n = !0;
        break;
      }
      r = r.parent;
    }
    n && !e && (e = !0);
    const o = this.getAbsoluteTransform(e).getMatrix(), a = new Je.Transform(), l = this.offset();
    return a.m = o.slice(), a.translate(l.x, l.y), a.getTranslation();
  }
  setAbsolutePosition(e) {
    const { x: n, y: r, ...o } = this._clearTransform();
    this.attrs.x = n, this.attrs.y = r, this._clearCache(Xi);
    const a = this._getAbsoluteTransform().copy();
    return a.invert(), a.translate(e.x, e.y), e = {
      x: this.attrs.x + a.getTranslation().x,
      y: this.attrs.y + a.getTranslation().y
    }, this._setTransform(o), this.setPosition({ x: e.x, y: e.y }), this._clearCache(Xi), this._clearSelfAndDescendantCache(di), this;
  }
  _setTransform(e) {
    let n;
    for (n in e)
      this.attrs[n] = e[n];
  }
  _clearTransform() {
    const e = {
      x: this.x(),
      y: this.y(),
      rotation: this.rotation(),
      scaleX: this.scaleX(),
      scaleY: this.scaleY(),
      offsetX: this.offsetX(),
      offsetY: this.offsetY(),
      skewX: this.skewX(),
      skewY: this.skewY()
    };
    return this.attrs.x = 0, this.attrs.y = 0, this.attrs.rotation = 0, this.attrs.scaleX = 1, this.attrs.scaleY = 1, this.attrs.offsetX = 0, this.attrs.offsetY = 0, this.attrs.skewX = 0, this.attrs.skewY = 0, e;
  }
  move(e) {
    let n = e.x, r = e.y, o = this.x(), a = this.y();
    return n !== void 0 && (o += n), r !== void 0 && (a += r), this.setPosition({ x: o, y: a }), this;
  }
  _eachAncestorReverse(e, n) {
    let r = [], o = this.getParent(), a, l;
    if (!(n && n._id === this._id)) {
      for (r.unshift(this); o && (!n || o._id !== n._id); )
        r.unshift(o), o = o.parent;
      for (a = r.length, l = 0; l < a; l++)
        e(r[l]);
    }
  }
  rotate(e) {
    return this.rotation(this.rotation() + e), this;
  }
  moveToTop() {
    if (!this.parent)
      return Je.Util.warn("Node has no parent. moveToTop function is ignored."), !1;
    const e = this.index, n = this.parent.getChildren().length;
    return e < n - 1 ? (this.parent.children.splice(e, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), !0) : !1;
  }
  moveUp() {
    if (!this.parent)
      return Je.Util.warn("Node has no parent. moveUp function is ignored."), !1;
    const e = this.index, n = this.parent.getChildren().length;
    return e < n - 1 ? (this.parent.children.splice(e, 1), this.parent.children.splice(e + 1, 0, this), this.parent._setChildrenIndices(), !0) : !1;
  }
  moveDown() {
    if (!this.parent)
      return Je.Util.warn("Node has no parent. moveDown function is ignored."), !1;
    const e = this.index;
    return e > 0 ? (this.parent.children.splice(e, 1), this.parent.children.splice(e - 1, 0, this), this.parent._setChildrenIndices(), !0) : !1;
  }
  moveToBottom() {
    if (!this.parent)
      return Je.Util.warn("Node has no parent. moveToBottom function is ignored."), !1;
    const e = this.index;
    return e > 0 ? (this.parent.children.splice(e, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), !0) : !1;
  }
  setZIndex(e) {
    if (!this.parent)
      return Je.Util.warn("Node has no parent. zIndex parameter is ignored."), this;
    (e < 0 || e >= this.parent.children.length) && Je.Util.warn("Unexpected value " + e + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
    const n = this.index;
    return this.parent.children.splice(n, 1), this.parent.children.splice(e, 0, this), this.parent._setChildrenIndices(), this;
  }
  getAbsoluteOpacity() {
    return this._getCache(wu, this._getAbsoluteOpacity);
  }
  _getAbsoluteOpacity() {
    let e = this.opacity();
    const n = this.getParent();
    return n && !n._isUnderCache && (e *= n.getAbsoluteOpacity()), e;
  }
  moveTo(e) {
    return this.getParent() !== e && (this._remove(), e.add(this)), this;
  }
  toObject() {
    let e = this.getAttrs(), n, r, o, a, l;
    const c = {
      attrs: {},
      className: this.getClassName()
    };
    for (n in e)
      r = e[n], l = Je.Util.isObject(r) && !Je.Util._isPlainObject(r) && !Je.Util._isArray(r), !l && (o = typeof this[n] == "function" && this[n], delete e[n], a = o ? o.call(this) : null, e[n] = r, a !== r && (c.attrs[n] = r));
    return Je.Util._prepareToStringify(c);
  }
  toJSON() {
    return JSON.stringify(this.toObject());
  }
  getParent() {
    return this.parent;
  }
  findAncestors(e, n, r) {
    const o = [];
    n && this._isMatch(e) && o.push(this);
    let a = this.parent;
    for (; a; ) {
      if (a === r)
        return o;
      a._isMatch(e) && o.push(a), a = a.parent;
    }
    return o;
  }
  isAncestorOf(e) {
    return !1;
  }
  findAncestor(e, n, r) {
    return this.findAncestors(e, n, r)[0];
  }
  _isMatch(e) {
    if (!e)
      return !1;
    if (typeof e == "function")
      return e(this);
    let n = e.replace(/ /g, "").split(","), r = n.length, o, a;
    for (o = 0; o < r; o++)
      if (a = n[o], Je.Util.isValidSelector(a) || (Je.Util.warn('Selector "' + a + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), Je.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), Je.Util.warn("Konva is awesome, right?")), a.charAt(0) === "#") {
        if (this.id() === a.slice(1))
          return !0;
      } else if (a.charAt(0) === ".") {
        if (this.hasName(a.slice(1)))
          return !0;
      } else if (this.className === a || this.nodeType === a)
        return !0;
    return !1;
  }
  getLayer() {
    const e = this.getParent();
    return e ? e.getLayer() : null;
  }
  getStage() {
    return this._getCache(c6, this._getStage);
  }
  _getStage() {
    const e = this.getParent();
    return e ? e.getStage() : null;
  }
  fire(e, n = {}, r) {
    return n.target = n.target || this, r ? this._fireAndBubble(e, n) : this._fire(e, n), this;
  }
  getAbsoluteTransform(e) {
    return e ? this._getAbsoluteTransform(e) : this._getCache(di, this._getAbsoluteTransform);
  }
  _getAbsoluteTransform(e) {
    let n;
    if (e)
      return n = new Je.Transform(), this._eachAncestorReverse(function(r) {
        const o = r.transformsEnabled();
        o === "all" ? n.multiply(r.getTransform()) : o === "position" && n.translate(r.x() - r.offsetX(), r.y() - r.offsetY());
      }, e), n;
    {
      n = this._cache.get(di) || new Je.Transform(), this.parent ? this.parent.getAbsoluteTransform().copyInto(n) : n.reset();
      const r = this.transformsEnabled();
      if (r === "all")
        n.multiply(this.getTransform());
      else if (r === "position") {
        const o = this.attrs.x || 0, a = this.attrs.y || 0, l = this.attrs.offsetX || 0, c = this.attrs.offsetY || 0;
        n.translate(o - l, a - c);
      }
      return n.dirty = !1, n;
    }
  }
  getAbsoluteScale(e) {
    let n = this;
    for (; n; )
      n._isUnderCache && (e = n), n = n.getParent();
    const o = this.getAbsoluteTransform(e).decompose();
    return {
      x: o.scaleX,
      y: o.scaleY
    };
  }
  getAbsoluteRotation() {
    return this.getAbsoluteTransform().decompose().rotation;
  }
  getTransform() {
    return this._getCache(Xi, this._getTransform);
  }
  _getTransform() {
    var e, n;
    const r = this._cache.get(Xi) || new Je.Transform();
    r.reset();
    const o = this.x(), a = this.y(), l = Wi.Konva.getAngle(this.rotation()), c = (e = this.attrs.scaleX) !== null && e !== void 0 ? e : 1, d = (n = this.attrs.scaleY) !== null && n !== void 0 ? n : 1, p = this.attrs.skewX || 0, y = this.attrs.skewY || 0, k = this.attrs.offsetX || 0, x = this.attrs.offsetY || 0;
    return (o !== 0 || a !== 0) && r.translate(o, a), l !== 0 && r.rotate(l), (p !== 0 || y !== 0) && r.skew(p, y), (c !== 1 || d !== 1) && r.scale(c, d), (k !== 0 || x !== 0) && r.translate(-1 * k, -1 * x), r.dirty = !1, r;
  }
  clone(e) {
    let n = Je.Util.cloneObject(this.attrs), r, o, a, l, c;
    for (r in e)
      n[r] = e[r];
    const d = new this.constructor(n);
    for (r in this.eventListeners)
      for (o = this.eventListeners[r], a = o.length, l = 0; l < a; l++)
        c = o[l], c.name.indexOf(Z_) < 0 && (d.eventListeners[r] || (d.eventListeners[r] = []), d.eventListeners[r].push(c));
    return d;
  }
  _toKonvaCanvas(e) {
    e = e || {};
    const n = this.getClientRect(), r = this.getStage(), o = e.x !== void 0 ? e.x : Math.floor(n.x), a = e.y !== void 0 ? e.y : Math.floor(n.y), l = e.pixelRatio || 1, c = new Ts.SceneCanvas({
      width: e.width || Math.ceil(n.width) || (r ? r.width() : 0),
      height: e.height || Math.ceil(n.height) || (r ? r.height() : 0),
      pixelRatio: l
    }), d = c.getContext(), p = new Ts.SceneCanvas({
      width: c.width / c.pixelRatio + Math.abs(o),
      height: c.height / c.pixelRatio + Math.abs(a),
      pixelRatio: c.pixelRatio
    });
    return e.imageSmoothingEnabled === !1 && (d._context.imageSmoothingEnabled = !1), d.save(), (o || a) && d.translate(-1 * o, -1 * a), this.drawScene(c, void 0, p), d.restore(), c;
  }
  toCanvas(e) {
    return this._toKonvaCanvas(e)._canvas;
  }
  toDataURL(e) {
    e = e || {};
    const n = e.mimeType || null, r = e.quality || null, o = this._toKonvaCanvas(e).toDataURL(n, r);
    return e.callback && e.callback(o), o;
  }
  toImage(e) {
    return new Promise((n, r) => {
      try {
        const o = e == null ? void 0 : e.callback;
        o && delete e.callback, Je.Util._urlToImage(this.toDataURL(e), function(a) {
          n(a), o == null || o(a);
        });
      } catch (o) {
        r(o);
      }
    });
  }
  toBlob(e) {
    return new Promise((n, r) => {
      try {
        const o = e == null ? void 0 : e.callback;
        o && delete e.callback, this.toCanvas(e).toBlob((a) => {
          n(a), o == null || o(a);
        }, e == null ? void 0 : e.mimeType, e == null ? void 0 : e.quality);
      } catch (o) {
        r(o);
      }
    });
  }
  setSize(e) {
    return this.width(e.width), this.height(e.height), this;
  }
  getSize() {
    return {
      width: this.width(),
      height: this.height()
    };
  }
  getClassName() {
    return this.className || this.nodeType;
  }
  getType() {
    return this.nodeType;
  }
  getDragDistance() {
    return this.attrs.dragDistance !== void 0 ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : Wi.Konva.dragDistance;
  }
  _off(e, n, r) {
    let o = this.eventListeners[e], a, l, c;
    for (a = 0; a < o.length; a++)
      if (l = o[a].name, c = o[a].handler, (l !== "konva" || n === "konva") && (!n || l === n) && (!r || r === c)) {
        if (o.splice(a, 1), o.length === 0) {
          delete this.eventListeners[e];
          break;
        }
        a--;
      }
  }
  _fireChangeEvent(e, n, r) {
    this._fire(e + B_, {
      oldVal: n,
      newVal: r
    });
  }
  addName(e) {
    if (!this.hasName(e)) {
      const n = this.name(), r = n ? n + " " + e : e;
      this.name(r);
    }
    return this;
  }
  hasName(e) {
    if (!e)
      return !1;
    const n = this.name();
    return n ? (n || "").split(/\s/g).indexOf(e) !== -1 : !1;
  }
  removeName(e) {
    const n = (this.name() || "").split(/\s/g), r = n.indexOf(e);
    return r !== -1 && (n.splice(r, 1), this.name(n.join(" "))), this;
  }
  setAttr(e, n) {
    const r = this[l6 + Je.Util._capitalize(e)];
    return Je.Util._isFunction(r) ? r.call(this, n) : this._setAttr(e, n), this;
  }
  _requestDraw() {
    if (Wi.Konva.autoDrawEnabled) {
      const e = this.getLayer() || this.getStage();
      e == null || e.batchDraw();
    }
  }
  _setAttr(e, n) {
    const r = this.attrs[e];
    r === n && !Je.Util.isObject(n) || (n == null ? delete this.attrs[e] : this.attrs[e] = n, this._shouldFireChangeEvents && this._fireChangeEvent(e, r, n), this._requestDraw());
  }
  _setComponentAttr(e, n, r) {
    let o;
    r !== void 0 && (o = this.attrs[e], o || (this.attrs[e] = this.getAttr(e)), this.attrs[e][n] = r, this._fireChangeEvent(e, o, r));
  }
  _fireAndBubble(e, n, r) {
    n && this.nodeType === u6 && (n.target = this);
    const o = [
      Y_,
      K_,
      X_,
      $_,
      Q_,
      q_
    ];
    if (!(o.indexOf(e) !== -1 && (r && (this === r || this.isAncestorOf && this.isAncestorOf(r)) || this.nodeType === "Stage" && !r))) {
      this._fire(e, n);
      const l = o.indexOf(e) !== -1 && r && r.isAncestorOf && r.isAncestorOf(this) && !r.isAncestorOf(this.parent);
      (n && !n.cancelBubble || !n) && this.parent && this.parent.isListening() && !l && (r && r.parent ? this._fireAndBubble.call(this.parent, e, n, r) : this._fireAndBubble.call(this.parent, e, n));
    }
  }
  _getProtoListeners(e) {
    var n, r, o;
    const a = (n = this._cache.get($0)) !== null && n !== void 0 ? n : {};
    let l = a == null ? void 0 : a[e];
    if (l === void 0) {
      l = [];
      let c = Object.getPrototypeOf(this);
      for (; c; ) {
        const d = (o = (r = c.eventListeners) === null || r === void 0 ? void 0 : r[e]) !== null && o !== void 0 ? o : [];
        l.push(...d), c = Object.getPrototypeOf(c);
      }
      a[e] = l, this._cache.set($0, a);
    }
    return l;
  }
  _fire(e, n) {
    n = n || {}, n.currentTarget = this, n.type = e;
    const r = this._getProtoListeners(e);
    if (r)
      for (let a = 0; a < r.length; a++)
        r[a].handler.call(this, n);
    const o = this.eventListeners[e];
    if (o)
      for (let a = 0; a < o.length; a++)
        o[a].handler.call(this, n);
  }
  draw() {
    return this.drawScene(), this.drawHit(), this;
  }
  _createDragElement(e) {
    const n = e ? e.pointerId : void 0, r = this.getStage(), o = this.getAbsolutePosition();
    if (!r)
      return;
    const a = r._getPointerById(n) || r._changedPointerPositions[0] || o;
    sr.DD._dragElements.set(this._id, {
      node: this,
      startPointerPos: a,
      offset: {
        x: a.x - o.x,
        y: a.y - o.y
      },
      dragStatus: "ready",
      pointerId: n
    });
  }
  startDrag(e, n = !0) {
    sr.DD._dragElements.has(this._id) || this._createDragElement(e);
    const r = sr.DD._dragElements.get(this._id);
    r.dragStatus = "dragging", this.fire("dragstart", {
      type: "dragstart",
      target: this,
      evt: e && e.evt
    }, n);
  }
  _setDragPosition(e, n) {
    const r = this.getStage()._getPointerById(n.pointerId);
    if (!r)
      return;
    let o = {
      x: r.x - n.offset.x,
      y: r.y - n.offset.y
    };
    const a = this.dragBoundFunc();
    if (a !== void 0) {
      const l = a.call(this, o, e);
      l ? o = l : Je.Util.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.");
    }
    (!this._lastPos || this._lastPos.x !== o.x || this._lastPos.y !== o.y) && (this.setAbsolutePosition(o), this._requestDraw()), this._lastPos = o;
  }
  stopDrag(e) {
    const n = sr.DD._dragElements.get(this._id);
    n && (n.dragStatus = "stopped"), sr.DD._endDragBefore(e), sr.DD._endDragAfter(e);
  }
  setDraggable(e) {
    this._setAttr("draggable", e), this._dragChange();
  }
  isDragging() {
    const e = sr.DD._dragElements.get(this._id);
    return e ? e.dragStatus === "dragging" : !1;
  }
  _listenDrag() {
    this._dragCleanup(), this.on("mousedown.konva touchstart.konva", function(e) {
      if (!(!(e.evt.button !== void 0) || Wi.Konva.dragButtons.indexOf(e.evt.button) >= 0) || this.isDragging())
        return;
      let o = !1;
      sr.DD._dragElements.forEach((a) => {
        this.isAncestorOf(a.node) && (o = !0);
      }), o || this._createDragElement(e);
    });
  }
  _dragChange() {
    if (this.attrs.draggable)
      this._listenDrag();
    else {
      if (this._dragCleanup(), !this.getStage())
        return;
      const n = sr.DD._dragElements.get(this._id), r = n && n.dragStatus === "dragging", o = n && n.dragStatus === "ready";
      r ? this.stopDrag() : o && sr.DD._dragElements.delete(this._id);
    }
  }
  _dragCleanup() {
    this.off("mousedown.konva"), this.off("touchstart.konva");
  }
  isClientRectOnScreen(e = { x: 0, y: 0 }) {
    const n = this.getStage();
    if (!n)
      return !1;
    const r = {
      x: -e.x,
      y: -e.y,
      width: n.width() + 2 * e.x,
      height: n.height() + 2 * e.y
    };
    return Je.Util.haveIntersection(r, this.getClientRect());
  }
  static create(e, n) {
    return Je.Util._isString(e) && (e = JSON.parse(e)), this._createNode(e, n);
  }
  static _createNode(e, n) {
    let r = Ge.prototype.getClassName.call(e), o = e.children, a, l, c;
    n && (e.attrs.container = n), Wi.Konva[r] || (Je.Util.warn('Can not find a node with class name "' + r + '". Fallback to "Shape".'), r = "Shape");
    const d = Wi.Konva[r];
    if (a = new d(e.attrs), o)
      for (l = o.length, c = 0; c < l; c++)
        a.add(Ge._createNode(o[c]));
    return a;
  }
}
kt.Node = Ge;
Ge.prototype.nodeType = "Node";
Ge.prototype._attrsAffectingSize = [];
Ge.prototype.eventListeners = {};
Ge.prototype.on.call(Ge.prototype, eC, function() {
  if (this._batchingTransformChange) {
    this._needClearTransformCache = !0;
    return;
  }
  this._clearCache(Xi), this._clearSelfAndDescendantCache(di);
});
Ge.prototype.on.call(Ge.prototype, "visibleChange.konva", function() {
  this._clearSelfAndDescendantCache(z5);
});
Ge.prototype.on.call(Ge.prototype, "listeningChange.konva", function() {
  this._clearSelfAndDescendantCache(R5);
});
Ge.prototype.on.call(Ge.prototype, "opacityChange.konva", function() {
  this._clearSelfAndDescendantCache(wu);
});
const ht = o1.Factory.addGetterSetter;
ht(Ge, "zIndex");
ht(Ge, "absolutePosition");
ht(Ge, "position");
ht(Ge, "x", 0, (0, jt.getNumberValidator)());
ht(Ge, "y", 0, (0, jt.getNumberValidator)());
ht(Ge, "globalCompositeOperation", "source-over", (0, jt.getStringValidator)());
ht(Ge, "opacity", 1, (0, jt.getNumberValidator)());
ht(Ge, "name", "", (0, jt.getStringValidator)());
ht(Ge, "id", "", (0, jt.getStringValidator)());
ht(Ge, "rotation", 0, (0, jt.getNumberValidator)());
o1.Factory.addComponentsGetterSetter(Ge, "scale", ["x", "y"]);
ht(Ge, "scaleX", 1, (0, jt.getNumberValidator)());
ht(Ge, "scaleY", 1, (0, jt.getNumberValidator)());
o1.Factory.addComponentsGetterSetter(Ge, "skew", ["x", "y"]);
ht(Ge, "skewX", 0, (0, jt.getNumberValidator)());
ht(Ge, "skewY", 0, (0, jt.getNumberValidator)());
o1.Factory.addComponentsGetterSetter(Ge, "offset", ["x", "y"]);
ht(Ge, "offsetX", 0, (0, jt.getNumberValidator)());
ht(Ge, "offsetY", 0, (0, jt.getNumberValidator)());
ht(Ge, "dragDistance", void 0, (0, jt.getNumberValidator)());
ht(Ge, "width", 0, (0, jt.getNumberValidator)());
ht(Ge, "height", 0, (0, jt.getNumberValidator)());
ht(Ge, "listening", !0, (0, jt.getBooleanValidator)());
ht(Ge, "preventDefault", !0, (0, jt.getBooleanValidator)());
ht(Ge, "filters", void 0, function(t) {
  return this._filterUpToDate = !1, t;
});
ht(Ge, "visible", !0, (0, jt.getBooleanValidator)());
ht(Ge, "transformsEnabled", "all", (0, jt.getStringValidator)());
ht(Ge, "size");
ht(Ge, "dragBoundFunc");
ht(Ge, "draggable", !1, (0, jt.getBooleanValidator)());
o1.Factory.backCompat(Ge, {
  rotateDeg: "rotate",
  setRotationDeg: "setRotation",
  getRotationDeg: "getRotation"
});
var ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.Container = void 0;
const La = Qe, pf = kt, Tc = Ie;
class as extends pf.Node {
  constructor() {
    super(...arguments), this.children = [];
  }
  getChildren(e) {
    const n = this.children || [];
    return e ? n.filter(e) : n;
  }
  hasChildren() {
    return this.getChildren().length > 0;
  }
  removeChildren() {
    return this.getChildren().forEach((e) => {
      e.parent = null, e.index = 0, e.remove();
    }), this.children = [], this._requestDraw(), this;
  }
  destroyChildren() {
    return this.getChildren().forEach((e) => {
      e.parent = null, e.index = 0, e.destroy();
    }), this.children = [], this._requestDraw(), this;
  }
  add(...e) {
    if (e.length === 0)
      return this;
    if (e.length > 1) {
      for (let r = 0; r < e.length; r++)
        this.add(e[r]);
      return this;
    }
    const n = e[0];
    return n.getParent() ? (n.moveTo(this), this) : (this._validateAdd(n), n.index = this.getChildren().length, n.parent = this, n._clearCaches(), this.getChildren().push(n), this._fire("add", {
      child: n
    }), this._requestDraw(), this);
  }
  destroy() {
    return this.hasChildren() && this.destroyChildren(), super.destroy(), this;
  }
  find(e) {
    return this._generalFind(e, !1);
  }
  findOne(e) {
    const n = this._generalFind(e, !0);
    return n.length > 0 ? n[0] : void 0;
  }
  _generalFind(e, n) {
    const r = [];
    return this._descendants((o) => {
      const a = o._isMatch(e);
      return a && r.push(o), !!(a && n);
    }), r;
  }
  _descendants(e) {
    let n = !1;
    const r = this.getChildren();
    for (const o of r) {
      if (n = e(o), n)
        return !0;
      if (o.hasChildren() && (n = o._descendants(e), n))
        return !0;
    }
    return !1;
  }
  toObject() {
    const e = pf.Node.prototype.toObject.call(this);
    return e.children = [], this.getChildren().forEach((n) => {
      e.children.push(n.toObject());
    }), e;
  }
  isAncestorOf(e) {
    let n = e.getParent();
    for (; n; ) {
      if (n._id === this._id)
        return !0;
      n = n.getParent();
    }
    return !1;
  }
  clone(e) {
    const n = pf.Node.prototype.clone.call(this, e);
    return this.getChildren().forEach(function(r) {
      n.add(r.clone());
    }), n;
  }
  getAllIntersections(e) {
    const n = [];
    return this.find("Shape").forEach((r) => {
      r.isVisible() && r.intersects(e) && n.push(r);
    }), n;
  }
  _clearSelfAndDescendantCache(e) {
    var n;
    super._clearSelfAndDescendantCache(e), !this.isCached() && ((n = this.children) === null || n === void 0 || n.forEach(function(r) {
      r._clearSelfAndDescendantCache(e);
    }));
  }
  _setChildrenIndices() {
    var e;
    (e = this.children) === null || e === void 0 || e.forEach(function(n, r) {
      n.index = r;
    }), this._requestDraw();
  }
  drawScene(e, n, r) {
    const o = this.getLayer(), a = e || o && o.getCanvas(), l = a && a.getContext(), c = this._getCanvasCache(), d = c && c.scene, p = a && a.isCache;
    if (!this.isVisible() && !p)
      return this;
    if (d) {
      l.save();
      const y = this.getAbsoluteTransform(n).getMatrix();
      l.transform(y[0], y[1], y[2], y[3], y[4], y[5]), this._drawCachedSceneCanvas(l), l.restore();
    } else
      this._drawChildren("drawScene", a, n, r);
    return this;
  }
  drawHit(e, n) {
    if (!this.shouldDrawHit(n))
      return this;
    const r = this.getLayer(), o = e || r && r.hitCanvas, a = o && o.getContext(), l = this._getCanvasCache();
    if (l && l.hit) {
      a.save();
      const d = this.getAbsoluteTransform(n).getMatrix();
      a.transform(d[0], d[1], d[2], d[3], d[4], d[5]), this._drawCachedHitCanvas(a), a.restore();
    } else
      this._drawChildren("drawHit", o, n);
    return this;
  }
  _drawChildren(e, n, r, o) {
    var a;
    const l = n && n.getContext(), c = this.clipWidth(), d = this.clipHeight(), p = this.clipFunc(), y = typeof c == "number" && typeof d == "number" || p, k = r === this;
    if (y) {
      l.save();
      const w = this.getAbsoluteTransform(r);
      let m = w.getMatrix();
      l.transform(m[0], m[1], m[2], m[3], m[4], m[5]), l.beginPath();
      let S;
      if (p)
        S = p.call(this, l, this);
      else {
        const b = this.clipX(), L = this.clipY();
        l.rect(b || 0, L || 0, c, d);
      }
      l.clip.apply(l, S), m = w.copy().invert().getMatrix(), l.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    }
    const x = !k && this.globalCompositeOperation() !== "source-over" && e === "drawScene";
    x && (l.save(), l._applyGlobalCompositeOperation(this)), (a = this.children) === null || a === void 0 || a.forEach(function(w) {
      w[e](n, r, o);
    }), x && l.restore(), y && l.restore();
  }
  getClientRect(e = {}) {
    var n;
    const r = e.skipTransform, o = e.relativeTo;
    let a, l, c, d, p = {
      x: 1 / 0,
      y: 1 / 0,
      width: 0,
      height: 0
    };
    const y = this;
    (n = this.children) === null || n === void 0 || n.forEach(function(w) {
      if (!w.visible())
        return;
      const m = w.getClientRect({
        relativeTo: y,
        skipShadow: e.skipShadow,
        skipStroke: e.skipStroke
      });
      m.width === 0 && m.height === 0 || (a === void 0 ? (a = m.x, l = m.y, c = m.x + m.width, d = m.y + m.height) : (a = Math.min(a, m.x), l = Math.min(l, m.y), c = Math.max(c, m.x + m.width), d = Math.max(d, m.y + m.height)));
    });
    const k = this.find("Shape");
    let x = !1;
    for (let w = 0; w < k.length; w++)
      if (k[w]._isVisible(this)) {
        x = !0;
        break;
      }
    return x && a !== void 0 ? p = {
      x: a,
      y: l,
      width: c - a,
      height: d - l
    } : p = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }, r ? p : this._transformedRect(p, o);
  }
}
ss.Container = as;
La.Factory.addComponentsGetterSetter(as, "clip", [
  "x",
  "y",
  "width",
  "height"
]);
La.Factory.addGetterSetter(as, "clipX", void 0, (0, Tc.getNumberValidator)());
La.Factory.addGetterSetter(as, "clipY", void 0, (0, Tc.getNumberValidator)());
La.Factory.addGetterSetter(as, "clipWidth", void 0, (0, Tc.getNumberValidator)());
La.Factory.addGetterSetter(as, "clipHeight", void 0, (0, Tc.getNumberValidator)());
La.Factory.addGetterSetter(as, "clipFunc");
var dg = {}, _o = {};
Object.defineProperty(_o, "__esModule", { value: !0 });
_o.getCapturedShape = rC;
_o.createEvent = Bh;
_o.hasPointerCapture = iC;
_o.setPointerCapture = oC;
_o.releaseCapture = hg;
const nC = Xe, Ql = /* @__PURE__ */ new Map(), fg = nC.Konva._global.PointerEvent !== void 0;
function rC(t) {
  return Ql.get(t);
}
function Bh(t) {
  return {
    evt: t,
    pointerId: t.pointerId
  };
}
function iC(t, e) {
  return Ql.get(t) === e;
}
function oC(t, e) {
  hg(t), e.getStage() && (Ql.set(t, e), fg && e._fire("gotpointercapture", Bh(new PointerEvent("gotpointercapture"))));
}
function hg(t, e) {
  const n = Ql.get(t);
  if (!n)
    return;
  const r = n.getStage();
  r && r.content, Ql.delete(t), fg && n._fire("lostpointercapture", Bh(new PointerEvent("lostpointercapture")));
}
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Stage = t.stages = void 0;
  const e = Et, n = Qe, r = ss, o = Xe, a = Ar, l = Vc, c = Xe, d = _o, p = "Stage", y = "string", k = "px", x = "mouseout", w = "mouseleave", m = "mouseover", S = "mouseenter", b = "mousemove", L = "mousedown", M = "mouseup", g = "pointermove", C = "pointerdown", A = "pointerup", E = "pointercancel", T = "lostpointercapture", P = "pointerout", R = "pointerleave", V = "pointerover", F = "pointerenter", W = "contextmenu", U = "touchstart", $ = "touchend", Q = "touchmove", oe = "touchcancel", q = "wheel", G = 5, Y = [
    [S, "_pointerenter"],
    [L, "_pointerdown"],
    [b, "_pointermove"],
    [M, "_pointerup"],
    [w, "_pointerleave"],
    [U, "_pointerdown"],
    [Q, "_pointermove"],
    [$, "_pointerup"],
    [oe, "_pointercancel"],
    [m, "_pointerover"],
    [q, "_wheel"],
    [W, "_contextmenu"],
    [C, "_pointerdown"],
    [g, "_pointermove"],
    [A, "_pointerup"],
    [E, "_pointercancel"],
    [R, "_pointerleave"],
    [T, "_lostpointercapture"]
  ], D = {
    mouse: {
      [P]: x,
      [R]: w,
      [V]: m,
      [F]: S,
      [g]: b,
      [C]: L,
      [A]: M,
      [E]: "mousecancel",
      pointerclick: "click",
      pointerdblclick: "dblclick"
    },
    touch: {
      [P]: "touchout",
      [R]: "touchleave",
      [V]: "touchover",
      [F]: "touchenter",
      [g]: Q,
      [C]: U,
      [A]: $,
      [E]: oe,
      pointerclick: "tap",
      pointerdblclick: "dbltap"
    },
    pointer: {
      [P]: P,
      [R]: R,
      [V]: V,
      [F]: F,
      [g]: g,
      [C]: C,
      [A]: A,
      [E]: E,
      pointerclick: "pointerclick",
      pointerdblclick: "pointerdblclick"
    }
  }, ee = (ce) => ce.indexOf("pointer") >= 0 ? "pointer" : ce.indexOf("touch") >= 0 ? "touch" : "mouse", re = (ce) => {
    const H = ee(ce);
    if (H === "pointer")
      return o.Konva.pointerEventsEnabled && D.pointer;
    if (H === "touch")
      return D.touch;
    if (H === "mouse")
      return D.mouse;
  };
  function we(ce = {}) {
    return (ce.clipFunc || ce.clipWidth || ce.clipHeight) && e.Util.warn("Stage does not support clipping. Please use clip for Layers or Groups."), ce;
  }
  const Re = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);";
  t.stages = [];
  class ie extends r.Container {
    constructor(H) {
      super(we(H)), this._pointerPositions = [], this._changedPointerPositions = [], this._buildDOM(), this._bindContentEvents(), t.stages.push(this), this.on("widthChange.konva heightChange.konva", this._resizeDOM), this.on("visibleChange.konva", this._checkVisibility), this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", () => {
        we(this.attrs);
      }), this._checkVisibility();
    }
    _validateAdd(H) {
      const I = H.getType() === "Layer", te = H.getType() === "FastLayer";
      I || te || e.Util.throw("You may only add layers to the stage.");
    }
    _checkVisibility() {
      if (!this.content)
        return;
      const H = this.visible() ? "" : "none";
      this.content.style.display = H;
    }
    setContainer(H) {
      if (typeof H === y) {
        let I;
        if (H.charAt(0) === ".") {
          const te = H.slice(1);
          H = document.getElementsByClassName(te)[0];
        } else
          H.charAt(0) !== "#" ? I = H : I = H.slice(1), H = document.getElementById(I);
        if (!H)
          throw "Can not find container in document with id " + I;
      }
      return this._setAttr("container", H), this.content && (this.content.parentElement && this.content.parentElement.removeChild(this.content), H.appendChild(this.content)), this;
    }
    shouldDrawHit() {
      return !0;
    }
    clear() {
      const H = this.children, I = H.length;
      for (let te = 0; te < I; te++)
        H[te].clear();
      return this;
    }
    clone(H) {
      return H || (H = {}), H.container = typeof document < "u" && document.createElement("div"), r.Container.prototype.clone.call(this, H);
    }
    destroy() {
      super.destroy();
      const H = this.content;
      H && e.Util._isInDocument(H) && this.container().removeChild(H);
      const I = t.stages.indexOf(this);
      return I > -1 && t.stages.splice(I, 1), e.Util.releaseCanvas(this.bufferCanvas._canvas, this.bufferHitCanvas._canvas), this;
    }
    getPointerPosition() {
      const H = this._pointerPositions[0] || this._changedPointerPositions[0];
      return H ? {
        x: H.x,
        y: H.y
      } : (e.Util.warn(Re), null);
    }
    _getPointerById(H) {
      return this._pointerPositions.find((I) => I.id === H);
    }
    getPointersPositions() {
      return this._pointerPositions;
    }
    getStage() {
      return this;
    }
    getContent() {
      return this.content;
    }
    _toKonvaCanvas(H) {
      H = H || {}, H.x = H.x || 0, H.y = H.y || 0, H.width = H.width || this.width(), H.height = H.height || this.height();
      const I = new a.SceneCanvas({
        width: H.width,
        height: H.height,
        pixelRatio: H.pixelRatio || 1
      }), te = I.getContext()._context, ze = this.children;
      return (H.x || H.y) && te.translate(-1 * H.x, -1 * H.y), ze.forEach(function(K) {
        if (!K.isVisible())
          return;
        const ae = K._toKonvaCanvas(H);
        te.drawImage(ae._canvas, H.x, H.y, ae.getWidth() / ae.getPixelRatio(), ae.getHeight() / ae.getPixelRatio());
      }), I;
    }
    getIntersection(H) {
      if (!H)
        return null;
      const I = this.children, te = I.length, ze = te - 1;
      for (let K = ze; K >= 0; K--) {
        const ae = I[K].getIntersection(H);
        if (ae)
          return ae;
      }
      return null;
    }
    _resizeDOM() {
      const H = this.width(), I = this.height();
      this.content && (this.content.style.width = H + k, this.content.style.height = I + k), this.bufferCanvas.setSize(H, I), this.bufferHitCanvas.setSize(H, I), this.children.forEach((te) => {
        te.setSize({ width: H, height: I }), te.draw();
      });
    }
    add(H, ...I) {
      if (arguments.length > 1) {
        for (let ze = 0; ze < arguments.length; ze++)
          this.add(arguments[ze]);
        return this;
      }
      super.add(H);
      const te = this.children.length;
      return te > G && e.Util.warn("The stage has " + te + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."), H.setSize({ width: this.width(), height: this.height() }), H.draw(), o.Konva.isBrowser && this.content.appendChild(H.canvas._canvas), this;
    }
    getParent() {
      return null;
    }
    getLayer() {
      return null;
    }
    hasPointerCapture(H) {
      return d.hasPointerCapture(H, this);
    }
    setPointerCapture(H) {
      d.setPointerCapture(H, this);
    }
    releaseCapture(H) {
      d.releaseCapture(H, this);
    }
    getLayers() {
      return this.children;
    }
    _bindContentEvents() {
      o.Konva.isBrowser && Y.forEach(([H, I]) => {
        this.content.addEventListener(H, (te) => {
          this[I](te);
        }, { passive: !1 });
      });
    }
    _pointerenter(H) {
      this.setPointersPositions(H);
      const I = re(H.type);
      I && this._fire(I.pointerenter, {
        evt: H,
        target: this,
        currentTarget: this
      });
    }
    _pointerover(H) {
      this.setPointersPositions(H);
      const I = re(H.type);
      I && this._fire(I.pointerover, {
        evt: H,
        target: this,
        currentTarget: this
      });
    }
    _getTargetShape(H) {
      let I = this[H + "targetShape"];
      return I && !I.getStage() && (I = null), I;
    }
    _pointerleave(H) {
      const I = re(H.type), te = ee(H.type);
      if (!I)
        return;
      this.setPointersPositions(H);
      const ze = this._getTargetShape(te), K = !(o.Konva.isDragging() || o.Konva.isTransforming()) || o.Konva.hitOnDragEnabled;
      ze && K ? (ze._fireAndBubble(I.pointerout, { evt: H }), ze._fireAndBubble(I.pointerleave, { evt: H }), this._fire(I.pointerleave, {
        evt: H,
        target: this,
        currentTarget: this
      }), this[te + "targetShape"] = null) : K && (this._fire(I.pointerleave, {
        evt: H,
        target: this,
        currentTarget: this
      }), this._fire(I.pointerout, {
        evt: H,
        target: this,
        currentTarget: this
      })), this.pointerPos = null, this._pointerPositions = [];
    }
    _pointerdown(H) {
      const I = re(H.type), te = ee(H.type);
      if (!I)
        return;
      this.setPointersPositions(H);
      let ze = !1;
      this._changedPointerPositions.forEach((K) => {
        const ae = this.getIntersection(K);
        if (l.DD.justDragged = !1, o.Konva["_" + te + "ListenClick"] = !0, !ae || !ae.isListening()) {
          this[te + "ClickStartShape"] = void 0;
          return;
        }
        o.Konva.capturePointerEventsEnabled && ae.setPointerCapture(K.id), this[te + "ClickStartShape"] = ae, ae._fireAndBubble(I.pointerdown, {
          evt: H,
          pointerId: K.id
        }), ze = !0;
        const pe = H.type.indexOf("touch") >= 0;
        ae.preventDefault() && H.cancelable && pe && H.preventDefault();
      }), ze || this._fire(I.pointerdown, {
        evt: H,
        target: this,
        currentTarget: this,
        pointerId: this._pointerPositions[0].id
      });
    }
    _pointermove(H) {
      const I = re(H.type), te = ee(H.type);
      if (!I || (o.Konva.isDragging() && l.DD.node.preventDefault() && H.cancelable && H.preventDefault(), this.setPointersPositions(H), !(!(o.Konva.isDragging() || o.Konva.isTransforming()) || o.Konva.hitOnDragEnabled)))
        return;
      const K = {};
      let ae = !1;
      const pe = this._getTargetShape(te);
      this._changedPointerPositions.forEach((de) => {
        const be = d.getCapturedShape(de.id) || this.getIntersection(de), et = de.id, Ne = { evt: H, pointerId: et }, Ye = pe !== be;
        if (Ye && pe && (pe._fireAndBubble(I.pointerout, { ...Ne }, be), pe._fireAndBubble(I.pointerleave, { ...Ne }, be)), be) {
          if (K[be._id])
            return;
          K[be._id] = !0;
        }
        be && be.isListening() ? (ae = !0, Ye && (be._fireAndBubble(I.pointerover, { ...Ne }, pe), be._fireAndBubble(I.pointerenter, { ...Ne }, pe), this[te + "targetShape"] = be), be._fireAndBubble(I.pointermove, { ...Ne })) : pe && (this._fire(I.pointerover, {
          evt: H,
          target: this,
          currentTarget: this,
          pointerId: et
        }), this[te + "targetShape"] = null);
      }), ae || this._fire(I.pointermove, {
        evt: H,
        target: this,
        currentTarget: this,
        pointerId: this._changedPointerPositions[0].id
      });
    }
    _pointerup(H) {
      const I = re(H.type), te = ee(H.type);
      if (!I)
        return;
      this.setPointersPositions(H);
      const ze = this[te + "ClickStartShape"], K = this[te + "ClickEndShape"], ae = {};
      let pe = !1;
      this._changedPointerPositions.forEach((de) => {
        const be = d.getCapturedShape(de.id) || this.getIntersection(de);
        if (be) {
          if (be.releaseCapture(de.id), ae[be._id])
            return;
          ae[be._id] = !0;
        }
        const et = de.id, Ne = { evt: H, pointerId: et };
        let Ye = !1;
        o.Konva["_" + te + "InDblClickWindow"] ? (Ye = !0, clearTimeout(this[te + "DblTimeout"])) : l.DD.justDragged || (o.Konva["_" + te + "InDblClickWindow"] = !0, clearTimeout(this[te + "DblTimeout"])), this[te + "DblTimeout"] = setTimeout(function() {
          o.Konva["_" + te + "InDblClickWindow"] = !1;
        }, o.Konva.dblClickWindow), be && be.isListening() ? (pe = !0, this[te + "ClickEndShape"] = be, be._fireAndBubble(I.pointerup, { ...Ne }), o.Konva["_" + te + "ListenClick"] && ze && ze === be && (be._fireAndBubble(I.pointerclick, { ...Ne }), Ye && K && K === be && be._fireAndBubble(I.pointerdblclick, { ...Ne }))) : (this[te + "ClickEndShape"] = null, o.Konva["_" + te + "ListenClick"] && this._fire(I.pointerclick, {
          evt: H,
          target: this,
          currentTarget: this,
          pointerId: et
        }), Ye && this._fire(I.pointerdblclick, {
          evt: H,
          target: this,
          currentTarget: this,
          pointerId: et
        }));
      }), pe || this._fire(I.pointerup, {
        evt: H,
        target: this,
        currentTarget: this,
        pointerId: this._changedPointerPositions[0].id
      }), o.Konva["_" + te + "ListenClick"] = !1, H.cancelable && te !== "touch" && te !== "pointer" && H.preventDefault();
    }
    _contextmenu(H) {
      this.setPointersPositions(H);
      const I = this.getIntersection(this.getPointerPosition());
      I && I.isListening() ? I._fireAndBubble(W, { evt: H }) : this._fire(W, {
        evt: H,
        target: this,
        currentTarget: this
      });
    }
    _wheel(H) {
      this.setPointersPositions(H);
      const I = this.getIntersection(this.getPointerPosition());
      I && I.isListening() ? I._fireAndBubble(q, { evt: H }) : this._fire(q, {
        evt: H,
        target: this,
        currentTarget: this
      });
    }
    _pointercancel(H) {
      this.setPointersPositions(H);
      const I = d.getCapturedShape(H.pointerId) || this.getIntersection(this.getPointerPosition());
      I && I._fireAndBubble(A, d.createEvent(H)), d.releaseCapture(H.pointerId);
    }
    _lostpointercapture(H) {
      d.releaseCapture(H.pointerId);
    }
    setPointersPositions(H) {
      const I = this._getContentPosition();
      let te = null, ze = null;
      H = H || window.event, H.touches !== void 0 ? (this._pointerPositions = [], this._changedPointerPositions = [], Array.prototype.forEach.call(H.touches, (K) => {
        this._pointerPositions.push({
          id: K.identifier,
          x: (K.clientX - I.left) / I.scaleX,
          y: (K.clientY - I.top) / I.scaleY
        });
      }), Array.prototype.forEach.call(H.changedTouches || H.touches, (K) => {
        this._changedPointerPositions.push({
          id: K.identifier,
          x: (K.clientX - I.left) / I.scaleX,
          y: (K.clientY - I.top) / I.scaleY
        });
      })) : (te = (H.clientX - I.left) / I.scaleX, ze = (H.clientY - I.top) / I.scaleY, this.pointerPos = {
        x: te,
        y: ze
      }, this._pointerPositions = [{ x: te, y: ze, id: e.Util._getFirstPointerId(H) }], this._changedPointerPositions = [
        { x: te, y: ze, id: e.Util._getFirstPointerId(H) }
      ]);
    }
    _setPointerPosition(H) {
      e.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'), this.setPointersPositions(H);
    }
    _getContentPosition() {
      if (!this.content || !this.content.getBoundingClientRect)
        return {
          top: 0,
          left: 0,
          scaleX: 1,
          scaleY: 1
        };
      const H = this.content.getBoundingClientRect();
      return {
        top: H.top,
        left: H.left,
        scaleX: H.width / this.content.clientWidth || 1,
        scaleY: H.height / this.content.clientHeight || 1
      };
    }
    _buildDOM() {
      if (this.bufferCanvas = new a.SceneCanvas({
        width: this.width(),
        height: this.height()
      }), this.bufferHitCanvas = new a.HitCanvas({
        pixelRatio: 1,
        width: this.width(),
        height: this.height()
      }), !o.Konva.isBrowser)
        return;
      const H = this.container();
      if (!H)
        throw "Stage has no container. A container is required.";
      H.innerHTML = "", this.content = document.createElement("div"), this.content.style.position = "relative", this.content.style.userSelect = "none", this.content.className = "konvajs-content", this.content.setAttribute("role", "presentation"), H.appendChild(this.content), this._resizeDOM();
    }
    cache() {
      return e.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."), this;
    }
    clearCache() {
      return this;
    }
    batchDraw() {
      return this.getChildren().forEach(function(H) {
        H.batchDraw();
      }), this;
    }
  }
  t.Stage = ie, ie.prototype.nodeType = p, (0, c._registerNode)(ie), n.Factory.addGetterSetter(ie, "container"), o.Konva.isBrowser && document.addEventListener("visibilitychange", () => {
    t.stages.forEach((ce) => {
      ce.batchDraw();
    });
  });
})(dg);
var s1 = {}, Yt = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Shape = t.shapes = void 0;
  const e = Xe, n = Et, r = Qe, o = kt, a = Ie, l = Xe, c = _o, d = "hasShadow", p = "shadowRGBA", y = "patternImage", k = "linearGradient", x = "radialGradient";
  let w;
  function m() {
    return w || (w = n.Util.createCanvasElement().getContext("2d"), w);
  }
  t.shapes = {};
  function S(R) {
    const V = this.attrs.fillRule;
    V ? R.fill(V) : R.fill();
  }
  function b(R) {
    R.stroke();
  }
  function L(R) {
    const V = this.attrs.fillRule;
    V ? R.fill(V) : R.fill();
  }
  function M(R) {
    R.stroke();
  }
  function g() {
    this._clearCache(d);
  }
  function C() {
    this._clearCache(p);
  }
  function A() {
    this._clearCache(y);
  }
  function E() {
    this._clearCache(k);
  }
  function T() {
    this._clearCache(x);
  }
  class P extends o.Node {
    constructor(V) {
      super(V);
      let F;
      for (; F = n.Util.getRandomColor(), !(F && !(F in t.shapes)); )
        ;
      this.colorKey = F, t.shapes[F] = this;
    }
    getContext() {
      return n.Util.warn("shape.getContext() method is deprecated. Please do not use it."), this.getLayer().getContext();
    }
    getCanvas() {
      return n.Util.warn("shape.getCanvas() method is deprecated. Please do not use it."), this.getLayer().getCanvas();
    }
    getSceneFunc() {
      return this.attrs.sceneFunc || this._sceneFunc;
    }
    getHitFunc() {
      return this.attrs.hitFunc || this._hitFunc;
    }
    hasShadow() {
      return this._getCache(d, this._hasShadow);
    }
    _hasShadow() {
      return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
    }
    _getFillPattern() {
      return this._getCache(y, this.__getFillPattern);
    }
    __getFillPattern() {
      if (this.fillPatternImage()) {
        const F = m().createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
        if (F && F.setTransform) {
          const W = new n.Transform();
          W.translate(this.fillPatternX(), this.fillPatternY()), W.rotate(e.Konva.getAngle(this.fillPatternRotation())), W.scale(this.fillPatternScaleX(), this.fillPatternScaleY()), W.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
          const U = W.getMatrix(), $ = typeof DOMMatrix > "u" ? {
            a: U[0],
            b: U[1],
            c: U[2],
            d: U[3],
            e: U[4],
            f: U[5]
          } : new DOMMatrix(U);
          F.setTransform($);
        }
        return F;
      }
    }
    _getLinearGradient() {
      return this._getCache(k, this.__getLinearGradient);
    }
    __getLinearGradient() {
      const V = this.fillLinearGradientColorStops();
      if (V) {
        const F = m(), W = this.fillLinearGradientStartPoint(), U = this.fillLinearGradientEndPoint(), $ = F.createLinearGradient(W.x, W.y, U.x, U.y);
        for (let Q = 0; Q < V.length; Q += 2)
          $.addColorStop(V[Q], V[Q + 1]);
        return $;
      }
    }
    _getRadialGradient() {
      return this._getCache(x, this.__getRadialGradient);
    }
    __getRadialGradient() {
      const V = this.fillRadialGradientColorStops();
      if (V) {
        const F = m(), W = this.fillRadialGradientStartPoint(), U = this.fillRadialGradientEndPoint(), $ = F.createRadialGradient(W.x, W.y, this.fillRadialGradientStartRadius(), U.x, U.y, this.fillRadialGradientEndRadius());
        for (let Q = 0; Q < V.length; Q += 2)
          $.addColorStop(V[Q], V[Q + 1]);
        return $;
      }
    }
    getShadowRGBA() {
      return this._getCache(p, this._getShadowRGBA);
    }
    _getShadowRGBA() {
      if (!this.hasShadow())
        return;
      const V = n.Util.colorToRGBA(this.shadowColor());
      if (V)
        return "rgba(" + V.r + "," + V.g + "," + V.b + "," + V.a * (this.shadowOpacity() || 1) + ")";
    }
    hasFill() {
      return this._calculate("hasFill", [
        "fillEnabled",
        "fill",
        "fillPatternImage",
        "fillLinearGradientColorStops",
        "fillRadialGradientColorStops"
      ], () => this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops()));
    }
    hasStroke() {
      return this._calculate("hasStroke", [
        "strokeEnabled",
        "strokeWidth",
        "stroke",
        "strokeLinearGradientColorStops"
      ], () => this.strokeEnabled() && this.strokeWidth() && !!(this.stroke() || this.strokeLinearGradientColorStops()));
    }
    hasHitStroke() {
      const V = this.hitStrokeWidth();
      return V === "auto" ? this.hasStroke() : this.strokeEnabled() && !!V;
    }
    intersects(V) {
      const F = this.getStage();
      if (!F)
        return !1;
      const W = F.bufferHitCanvas;
      return W.getContext().clear(), this.drawHit(W, void 0, !0), W.context.getImageData(Math.round(V.x), Math.round(V.y), 1, 1).data[3] > 0;
    }
    destroy() {
      return o.Node.prototype.destroy.call(this), delete t.shapes[this.colorKey], delete this.colorKey, this;
    }
    _useBufferCanvas(V) {
      var F;
      if (!((F = this.attrs.perfectDrawEnabled) !== null && F !== void 0 ? F : !0))
        return !1;
      const U = V || this.hasFill(), $ = this.hasStroke(), Q = this.getAbsoluteOpacity() !== 1;
      if (U && $ && Q)
        return !0;
      const oe = this.hasShadow(), q = this.shadowForStrokeEnabled();
      return !!(U && $ && oe && q);
    }
    setStrokeHitEnabled(V) {
      n.Util.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."), V ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0);
    }
    getStrokeHitEnabled() {
      return this.hitStrokeWidth() !== 0;
    }
    getSelfRect() {
      const V = this.size();
      return {
        x: this._centroid ? -V.width / 2 : 0,
        y: this._centroid ? -V.height / 2 : 0,
        width: V.width,
        height: V.height
      };
    }
    getClientRect(V = {}) {
      let F = !1, W = this.getParent();
      for (; W; ) {
        if (W.isCached()) {
          F = !0;
          break;
        }
        W = W.getParent();
      }
      const U = V.skipTransform, $ = V.relativeTo || F && this.getStage() || void 0, Q = this.getSelfRect(), q = !V.skipStroke && this.hasStroke() && this.strokeWidth() || 0, G = Q.width + q, Y = Q.height + q, D = !V.skipShadow && this.hasShadow(), ee = D ? this.shadowOffsetX() : 0, re = D ? this.shadowOffsetY() : 0, we = G + Math.abs(ee), Re = Y + Math.abs(re), ie = D && this.shadowBlur() || 0, ce = we + ie * 2, H = Re + ie * 2, I = {
        width: ce,
        height: H,
        x: -(q / 2 + ie) + Math.min(ee, 0) + Q.x,
        y: -(q / 2 + ie) + Math.min(re, 0) + Q.y
      };
      return U ? I : this._transformedRect(I, $);
    }
    drawScene(V, F, W) {
      const U = this.getLayer(), $ = V || U.getCanvas(), Q = $.getContext(), oe = this._getCanvasCache(), q = this.getSceneFunc(), G = this.hasShadow();
      let Y;
      const D = F === this;
      if (!this.isVisible() && !D)
        return this;
      if (oe) {
        Q.save();
        const ee = this.getAbsoluteTransform(F).getMatrix();
        return Q.transform(ee[0], ee[1], ee[2], ee[3], ee[4], ee[5]), this._drawCachedSceneCanvas(Q), Q.restore(), this;
      }
      if (!q)
        return this;
      if (Q.save(), this._useBufferCanvas()) {
        Y = this.getStage();
        const ee = W || Y.bufferCanvas, re = ee.getContext();
        re.clear(), re.save(), re._applyLineJoin(this);
        const we = this.getAbsoluteTransform(F).getMatrix();
        re.transform(we[0], we[1], we[2], we[3], we[4], we[5]), q.call(this, re, this), re.restore();
        const Re = ee.pixelRatio;
        G && Q._applyShadow(this), Q._applyOpacity(this), Q._applyGlobalCompositeOperation(this), Q.drawImage(ee._canvas, ee.x || 0, ee.y || 0, ee.width / Re, ee.height / Re);
      } else {
        if (Q._applyLineJoin(this), !D) {
          const ee = this.getAbsoluteTransform(F).getMatrix();
          Q.transform(ee[0], ee[1], ee[2], ee[3], ee[4], ee[5]), Q._applyOpacity(this), Q._applyGlobalCompositeOperation(this);
        }
        G && Q._applyShadow(this), q.call(this, Q, this);
      }
      return Q.restore(), this;
    }
    drawHit(V, F, W = !1) {
      if (!this.shouldDrawHit(F, W))
        return this;
      const U = this.getLayer(), $ = V || U.hitCanvas, Q = $ && $.getContext(), oe = this.hitFunc() || this.sceneFunc(), q = this._getCanvasCache(), G = q && q.hit;
      if (this.colorKey || n.Util.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()"), G) {
        Q.save();
        const D = this.getAbsoluteTransform(F).getMatrix();
        return Q.transform(D[0], D[1], D[2], D[3], D[4], D[5]), this._drawCachedHitCanvas(Q), Q.restore(), this;
      }
      if (!oe)
        return this;
      if (Q.save(), Q._applyLineJoin(this), !(this === F)) {
        const D = this.getAbsoluteTransform(F).getMatrix();
        Q.transform(D[0], D[1], D[2], D[3], D[4], D[5]);
      }
      return oe.call(this, Q, this), Q.restore(), this;
    }
    drawHitFromCache(V = 0) {
      const F = this._getCanvasCache(), W = this._getCachedSceneCanvas(), U = F.hit, $ = U.getContext(), Q = U.getWidth(), oe = U.getHeight();
      $.clear(), $.drawImage(W._canvas, 0, 0, Q, oe);
      try {
        const q = $.getImageData(0, 0, Q, oe), G = q.data, Y = G.length, D = n.Util._hexToRgb(this.colorKey);
        for (let ee = 0; ee < Y; ee += 4)
          G[ee + 3] > V ? (G[ee] = D.r, G[ee + 1] = D.g, G[ee + 2] = D.b, G[ee + 3] = 255) : G[ee + 3] = 0;
        $.putImageData(q, 0, 0);
      } catch (q) {
        n.Util.error("Unable to draw hit graph from cached scene canvas. " + q.message);
      }
      return this;
    }
    hasPointerCapture(V) {
      return c.hasPointerCapture(V, this);
    }
    setPointerCapture(V) {
      c.setPointerCapture(V, this);
    }
    releaseCapture(V) {
      c.releaseCapture(V, this);
    }
  }
  t.Shape = P, P.prototype._fillFunc = S, P.prototype._strokeFunc = b, P.prototype._fillFuncHit = L, P.prototype._strokeFuncHit = M, P.prototype._centroid = !1, P.prototype.nodeType = "Shape", (0, l._registerNode)(P), P.prototype.eventListeners = {}, P.prototype.on.call(P.prototype, "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", g), P.prototype.on.call(P.prototype, "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", C), P.prototype.on.call(P.prototype, "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva", A), P.prototype.on.call(P.prototype, "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", E), P.prototype.on.call(P.prototype, "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", T), r.Factory.addGetterSetter(P, "stroke", void 0, (0, a.getStringOrGradientValidator)()), r.Factory.addGetterSetter(P, "strokeWidth", 2, (0, a.getNumberValidator)()), r.Factory.addGetterSetter(P, "fillAfterStrokeEnabled", !1), r.Factory.addGetterSetter(P, "hitStrokeWidth", "auto", (0, a.getNumberOrAutoValidator)()), r.Factory.addGetterSetter(P, "strokeHitEnabled", !0, (0, a.getBooleanValidator)()), r.Factory.addGetterSetter(P, "perfectDrawEnabled", !0, (0, a.getBooleanValidator)()), r.Factory.addGetterSetter(P, "shadowForStrokeEnabled", !0, (0, a.getBooleanValidator)()), r.Factory.addGetterSetter(P, "lineJoin"), r.Factory.addGetterSetter(P, "lineCap"), r.Factory.addGetterSetter(P, "sceneFunc"), r.Factory.addGetterSetter(P, "hitFunc"), r.Factory.addGetterSetter(P, "dash"), r.Factory.addGetterSetter(P, "dashOffset", 0, (0, a.getNumberValidator)()), r.Factory.addGetterSetter(P, "shadowColor", void 0, (0, a.getStringValidator)()), r.Factory.addGetterSetter(P, "shadowBlur", 0, (0, a.getNumberValidator)()), r.Factory.addGetterSetter(P, "shadowOpacity", 1, (0, a.getNumberValidator)()), r.Factory.addComponentsGetterSetter(P, "shadowOffset", ["x", "y"]), r.Factory.addGetterSetter(P, "shadowOffsetX", 0, (0, a.getNumberValidator)()), r.Factory.addGetterSetter(P, "shadowOffsetY", 0, (0, a.getNumberValidator)()), r.Factory.addGetterSetter(P, "fillPatternImage"), r.Factory.addGetterSetter(P, "fill", void 0, (0, a.getStringOrGradientValidator)()), r.Factory.addGetterSetter(P, "fillPatternX", 0, (0, a.getNumberValidator)()), r.Factory.addGetterSetter(P, "fillPatternY", 0, (0, a.getNumberValidator)()), r.Factory.addGetterSetter(P, "fillLinearGradientColorStops"), r.Factory.addGetterSetter(P, "strokeLinearGradientColorStops"), r.Factory.addGetterSetter(P, "fillRadialGradientStartRadius", 0), r.Factory.addGetterSetter(P, "fillRadialGradientEndRadius", 0), r.Factory.addGetterSetter(P, "fillRadialGradientColorStops"), r.Factory.addGetterSetter(P, "fillPatternRepeat", "repeat"), r.Factory.addGetterSetter(P, "fillEnabled", !0), r.Factory.addGetterSetter(P, "strokeEnabled", !0), r.Factory.addGetterSetter(P, "shadowEnabled", !0), r.Factory.addGetterSetter(P, "dashEnabled", !0), r.Factory.addGetterSetter(P, "strokeScaleEnabled", !0), r.Factory.addGetterSetter(P, "fillPriority", "color"), r.Factory.addComponentsGetterSetter(P, "fillPatternOffset", ["x", "y"]), r.Factory.addGetterSetter(P, "fillPatternOffsetX", 0, (0, a.getNumberValidator)()), r.Factory.addGetterSetter(P, "fillPatternOffsetY", 0, (0, a.getNumberValidator)()), r.Factory.addComponentsGetterSetter(P, "fillPatternScale", ["x", "y"]), r.Factory.addGetterSetter(P, "fillPatternScaleX", 1, (0, a.getNumberValidator)()), r.Factory.addGetterSetter(P, "fillPatternScaleY", 1, (0, a.getNumberValidator)()), r.Factory.addComponentsGetterSetter(P, "fillLinearGradientStartPoint", [
    "x",
    "y"
  ]), r.Factory.addComponentsGetterSetter(P, "strokeLinearGradientStartPoint", [
    "x",
    "y"
  ]), r.Factory.addGetterSetter(P, "fillLinearGradientStartPointX", 0), r.Factory.addGetterSetter(P, "strokeLinearGradientStartPointX", 0), r.Factory.addGetterSetter(P, "fillLinearGradientStartPointY", 0), r.Factory.addGetterSetter(P, "strokeLinearGradientStartPointY", 0), r.Factory.addComponentsGetterSetter(P, "fillLinearGradientEndPoint", [
    "x",
    "y"
  ]), r.Factory.addComponentsGetterSetter(P, "strokeLinearGradientEndPoint", [
    "x",
    "y"
  ]), r.Factory.addGetterSetter(P, "fillLinearGradientEndPointX", 0), r.Factory.addGetterSetter(P, "strokeLinearGradientEndPointX", 0), r.Factory.addGetterSetter(P, "fillLinearGradientEndPointY", 0), r.Factory.addGetterSetter(P, "strokeLinearGradientEndPointY", 0), r.Factory.addComponentsGetterSetter(P, "fillRadialGradientStartPoint", [
    "x",
    "y"
  ]), r.Factory.addGetterSetter(P, "fillRadialGradientStartPointX", 0), r.Factory.addGetterSetter(P, "fillRadialGradientStartPointY", 0), r.Factory.addComponentsGetterSetter(P, "fillRadialGradientEndPoint", [
    "x",
    "y"
  ]), r.Factory.addGetterSetter(P, "fillRadialGradientEndPointX", 0), r.Factory.addGetterSetter(P, "fillRadialGradientEndPointY", 0), r.Factory.addGetterSetter(P, "fillPatternRotation", 0), r.Factory.addGetterSetter(P, "fillRule", void 0, (0, a.getStringValidator)()), r.Factory.backCompat(P, {
    dashArray: "dash",
    getDashArray: "getDash",
    setDashArray: "getDash",
    drawFunc: "sceneFunc",
    getDrawFunc: "getSceneFunc",
    setDrawFunc: "setSceneFunc",
    drawHitFunc: "hitFunc",
    getDrawHitFunc: "getHitFunc",
    setDrawHitFunc: "setHitFunc"
  });
})(Yt);
Object.defineProperty(s1, "__esModule", { value: !0 });
s1.Layer = void 0;
const ui = Et, gf = ss, Rs = kt, Wh = Qe, d6 = Ar, sC = Ie, aC = Yt, lC = Xe, uC = "#", cC = "beforeDraw", dC = "draw", pg = [
  { x: 0, y: 0 },
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: -1, y: 1 }
], fC = pg.length;
let Aa = class extends gf.Container {
  constructor(e) {
    super(e), this.canvas = new d6.SceneCanvas(), this.hitCanvas = new d6.HitCanvas({
      pixelRatio: 1
    }), this._waitingForDraw = !1, this.on("visibleChange.konva", this._checkVisibility), this._checkVisibility(), this.on("imageSmoothingEnabledChange.konva", this._setSmoothEnabled), this._setSmoothEnabled();
  }
  createPNGStream() {
    return this.canvas._canvas.createPNGStream();
  }
  getCanvas() {
    return this.canvas;
  }
  getNativeCanvasElement() {
    return this.canvas._canvas;
  }
  getHitCanvas() {
    return this.hitCanvas;
  }
  getContext() {
    return this.getCanvas().getContext();
  }
  clear(e) {
    return this.getContext().clear(e), this.getHitCanvas().getContext().clear(e), this;
  }
  setZIndex(e) {
    super.setZIndex(e);
    const n = this.getStage();
    return n && n.content && (n.content.removeChild(this.getNativeCanvasElement()), e < n.children.length - 1 ? n.content.insertBefore(this.getNativeCanvasElement(), n.children[e + 1].getCanvas()._canvas) : n.content.appendChild(this.getNativeCanvasElement())), this;
  }
  moveToTop() {
    Rs.Node.prototype.moveToTop.call(this);
    const e = this.getStage();
    return e && e.content && (e.content.removeChild(this.getNativeCanvasElement()), e.content.appendChild(this.getNativeCanvasElement())), !0;
  }
  moveUp() {
    if (!Rs.Node.prototype.moveUp.call(this))
      return !1;
    const n = this.getStage();
    return !n || !n.content ? !1 : (n.content.removeChild(this.getNativeCanvasElement()), this.index < n.children.length - 1 ? n.content.insertBefore(this.getNativeCanvasElement(), n.children[this.index + 1].getCanvas()._canvas) : n.content.appendChild(this.getNativeCanvasElement()), !0);
  }
  moveDown() {
    if (Rs.Node.prototype.moveDown.call(this)) {
      const e = this.getStage();
      if (e) {
        const n = e.children;
        e.content && (e.content.removeChild(this.getNativeCanvasElement()), e.content.insertBefore(this.getNativeCanvasElement(), n[this.index + 1].getCanvas()._canvas));
      }
      return !0;
    }
    return !1;
  }
  moveToBottom() {
    if (Rs.Node.prototype.moveToBottom.call(this)) {
      const e = this.getStage();
      if (e) {
        const n = e.children;
        e.content && (e.content.removeChild(this.getNativeCanvasElement()), e.content.insertBefore(this.getNativeCanvasElement(), n[1].getCanvas()._canvas));
      }
      return !0;
    }
    return !1;
  }
  getLayer() {
    return this;
  }
  remove() {
    const e = this.getNativeCanvasElement();
    return Rs.Node.prototype.remove.call(this), e && e.parentNode && ui.Util._isInDocument(e) && e.parentNode.removeChild(e), this;
  }
  getStage() {
    return this.parent;
  }
  setSize({ width: e, height: n }) {
    return this.canvas.setSize(e, n), this.hitCanvas.setSize(e, n), this._setSmoothEnabled(), this;
  }
  _validateAdd(e) {
    const n = e.getType();
    n !== "Group" && n !== "Shape" && ui.Util.throw("You may only add groups and shapes to a layer.");
  }
  _toKonvaCanvas(e) {
    return e = e || {}, e.width = e.width || this.getWidth(), e.height = e.height || this.getHeight(), e.x = e.x !== void 0 ? e.x : this.x(), e.y = e.y !== void 0 ? e.y : this.y(), Rs.Node.prototype._toKonvaCanvas.call(this, e);
  }
  _checkVisibility() {
    this.visible() ? this.canvas._canvas.style.display = "block" : this.canvas._canvas.style.display = "none";
  }
  _setSmoothEnabled() {
    this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
  }
  getWidth() {
    if (this.parent)
      return this.parent.width();
  }
  setWidth() {
    ui.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
  }
  getHeight() {
    if (this.parent)
      return this.parent.height();
  }
  setHeight() {
    ui.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
  }
  batchDraw() {
    return this._waitingForDraw || (this._waitingForDraw = !0, ui.Util.requestAnimFrame(() => {
      this.draw(), this._waitingForDraw = !1;
    })), this;
  }
  getIntersection(e) {
    if (!this.isListening() || !this.isVisible())
      return null;
    let n = 1, r = !1;
    for (; ; ) {
      for (let o = 0; o < fC; o++) {
        const a = pg[o], l = this._getIntersection({
          x: e.x + a.x * n,
          y: e.y + a.y * n
        }), c = l.shape;
        if (c)
          return c;
        if (r = !!l.antialiased, !l.antialiased)
          break;
      }
      if (r)
        n += 1;
      else
        return null;
    }
  }
  _getIntersection(e) {
    const n = this.hitCanvas.pixelRatio, r = this.hitCanvas.context.getImageData(Math.round(e.x * n), Math.round(e.y * n), 1, 1).data, o = r[3];
    if (o === 255) {
      const a = ui.Util._rgbToHex(r[0], r[1], r[2]), l = aC.shapes[uC + a];
      return l ? {
        shape: l
      } : {
        antialiased: !0
      };
    } else if (o > 0)
      return {
        antialiased: !0
      };
    return {};
  }
  drawScene(e, n, r) {
    const o = this.getLayer(), a = e || o && o.getCanvas();
    return this._fire(cC, {
      node: this
    }), this.clearBeforeDraw() && a.getContext().clear(), gf.Container.prototype.drawScene.call(this, a, n, r), this._fire(dC, {
      node: this
    }), this;
  }
  drawHit(e, n) {
    const r = this.getLayer(), o = e || r && r.hitCanvas;
    return r && r.clearBeforeDraw() && r.getHitCanvas().getContext().clear(), gf.Container.prototype.drawHit.call(this, o, n), this;
  }
  enableHitGraph() {
    return this.hitGraphEnabled(!0), this;
  }
  disableHitGraph() {
    return this.hitGraphEnabled(!1), this;
  }
  setHitGraphEnabled(e) {
    ui.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening(e);
  }
  getHitGraphEnabled(e) {
    return ui.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening();
  }
  toggleHitCanvas() {
    if (!this.parent || !this.parent.content)
      return;
    const e = this.parent;
    !!this.hitCanvas._canvas.parentNode ? e.content.removeChild(this.hitCanvas._canvas) : e.content.appendChild(this.hitCanvas._canvas);
  }
  destroy() {
    return ui.Util.releaseCanvas(this.getNativeCanvasElement(), this.getHitCanvas()._canvas), super.destroy();
  }
};
s1.Layer = Aa;
Aa.prototype.nodeType = "Layer";
(0, lC._registerNode)(Aa);
Wh.Factory.addGetterSetter(Aa, "imageSmoothingEnabled", !0);
Wh.Factory.addGetterSetter(Aa, "clearBeforeDraw", !0);
Wh.Factory.addGetterSetter(Aa, "hitGraphEnabled", !0, (0, sC.getBooleanValidator)());
var Rc = {};
Object.defineProperty(Rc, "__esModule", { value: !0 });
Rc.FastLayer = void 0;
const hC = Et, pC = s1, gC = Xe;
class Zh extends pC.Layer {
  constructor(e) {
    super(e), this.listening(!1), hC.Util.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.');
  }
}
Rc.FastLayer = Zh;
Zh.prototype.nodeType = "FastLayer";
(0, gC._registerNode)(Zh);
var ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
ba.Group = void 0;
const mC = Et, yC = ss, vC = Xe;
let Yh = class extends yC.Container {
  _validateAdd(e) {
    const n = e.getType();
    n !== "Group" && n !== "Shape" && mC.Util.throw("You may only add groups and shapes to groups.");
  }
};
ba.Group = Yh;
Yh.prototype.nodeType = "Group";
(0, vC._registerNode)(Yh);
var Pa = {};
Object.defineProperty(Pa, "__esModule", { value: !0 });
Pa.Animation = void 0;
const mf = Xe, f6 = Et, yf = function() {
  return mf.glob.performance && mf.glob.performance.now ? function() {
    return mf.glob.performance.now();
  } : function() {
    return (/* @__PURE__ */ new Date()).getTime();
  };
}();
class Zr {
  constructor(e, n) {
    this.id = Zr.animIdCounter++, this.frame = {
      time: 0,
      timeDiff: 0,
      lastTime: yf(),
      frameRate: 0
    }, this.func = e, this.setLayers(n);
  }
  setLayers(e) {
    let n = [];
    return e && (n = Array.isArray(e) ? e : [e]), this.layers = n, this;
  }
  getLayers() {
    return this.layers;
  }
  addLayer(e) {
    const n = this.layers, r = n.length;
    for (let o = 0; o < r; o++)
      if (n[o]._id === e._id)
        return !1;
    return this.layers.push(e), !0;
  }
  isRunning() {
    const n = Zr.animations, r = n.length;
    for (let o = 0; o < r; o++)
      if (n[o].id === this.id)
        return !0;
    return !1;
  }
  start() {
    return this.stop(), this.frame.timeDiff = 0, this.frame.lastTime = yf(), Zr._addAnimation(this), this;
  }
  stop() {
    return Zr._removeAnimation(this), this;
  }
  _updateFrameObject(e) {
    this.frame.timeDiff = e - this.frame.lastTime, this.frame.lastTime = e, this.frame.time += this.frame.timeDiff, this.frame.frameRate = 1e3 / this.frame.timeDiff;
  }
  static _addAnimation(e) {
    this.animations.push(e), this._handleAnimation();
  }
  static _removeAnimation(e) {
    const n = e.id, r = this.animations, o = r.length;
    for (let a = 0; a < o; a++)
      if (r[a].id === n) {
        this.animations.splice(a, 1);
        break;
      }
  }
  static _runFrames() {
    const e = {}, n = this.animations;
    for (let r = 0; r < n.length; r++) {
      const o = n[r], a = o.layers, l = o.func;
      o._updateFrameObject(yf());
      const c = a.length;
      let d;
      if (l ? d = l.call(o, o.frame) !== !1 : d = !0, !!d)
        for (let p = 0; p < c; p++) {
          const y = a[p];
          y._id !== void 0 && (e[y._id] = y);
        }
    }
    for (const r in e)
      e.hasOwnProperty(r) && e[r].batchDraw();
  }
  static _animationLoop() {
    const e = Zr;
    e.animations.length ? (e._runFrames(), f6.Util.requestAnimFrame(e._animationLoop)) : e.animRunning = !1;
  }
  static _handleAnimation() {
    this.animRunning || (this.animRunning = !0, f6.Util.requestAnimFrame(this._animationLoop));
  }
}
Pa.Animation = Zr;
Zr.animations = [];
Zr.animIdCounter = 0;
Zr.animRunning = !1;
var gg = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Easings = t.Tween = void 0;
  const e = Et, n = Pa, r = kt, o = Xe, a = {
    node: 1,
    duration: 1,
    easing: 1,
    onFinish: 1,
    yoyo: 1
  }, l = 1, c = 2, d = 3, p = ["fill", "stroke", "shadowColor"];
  let y = 0;
  class k {
    constructor(m, S, b, L, M, g, C) {
      this.prop = m, this.propFunc = S, this.begin = L, this._pos = L, this.duration = g, this._change = 0, this.prevPos = 0, this.yoyo = C, this._time = 0, this._position = 0, this._startTime = 0, this._finish = 0, this.func = b, this._change = M - this.begin, this.pause();
    }
    fire(m) {
      const S = this[m];
      S && S();
    }
    setTime(m) {
      m > this.duration ? this.yoyo ? (this._time = this.duration, this.reverse()) : this.finish() : m < 0 ? this.yoyo ? (this._time = 0, this.play()) : this.reset() : (this._time = m, this.update());
    }
    getTime() {
      return this._time;
    }
    setPosition(m) {
      this.prevPos = this._pos, this.propFunc(m), this._pos = m;
    }
    getPosition(m) {
      return m === void 0 && (m = this._time), this.func(m, this.begin, this._change, this.duration);
    }
    play() {
      this.state = c, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onPlay");
    }
    reverse() {
      this.state = d, this._time = this.duration - this._time, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onReverse");
    }
    seek(m) {
      this.pause(), this._time = m, this.update(), this.fire("onSeek");
    }
    reset() {
      this.pause(), this._time = 0, this.update(), this.fire("onReset");
    }
    finish() {
      this.pause(), this._time = this.duration, this.update(), this.fire("onFinish");
    }
    update() {
      this.setPosition(this.getPosition(this._time)), this.fire("onUpdate");
    }
    onEnterFrame() {
      const m = this.getTimer() - this._startTime;
      this.state === c ? this.setTime(m) : this.state === d && this.setTime(this.duration - m);
    }
    pause() {
      this.state = l, this.fire("onPause");
    }
    getTimer() {
      return (/* @__PURE__ */ new Date()).getTime();
    }
  }
  class x {
    constructor(m) {
      const S = this, b = m.node, L = b._id, M = m.easing || t.Easings.Linear, g = !!m.yoyo;
      let C, A;
      typeof m.duration > "u" ? C = 0.3 : m.duration === 0 ? C = 1e-3 : C = m.duration, this.node = b, this._id = y++;
      const E = b.getLayer() || (b instanceof o.Konva.Stage ? b.getLayers() : null);
      E || e.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."), this.anim = new n.Animation(function() {
        S.tween.onEnterFrame();
      }, E), this.tween = new k(A, function(T) {
        S._tweenFunc(T);
      }, M, 0, 1, C * 1e3, g), this._addListeners(), x.attrs[L] || (x.attrs[L] = {}), x.attrs[L][this._id] || (x.attrs[L][this._id] = {}), x.tweens[L] || (x.tweens[L] = {});
      for (A in m)
        a[A] === void 0 && this._addAttr(A, m[A]);
      this.reset(), this.onFinish = m.onFinish, this.onReset = m.onReset, this.onUpdate = m.onUpdate;
    }
    _addAttr(m, S) {
      const b = this.node, L = b._id;
      let M, g, C, A, E;
      const T = x.tweens[L][m];
      T && delete x.attrs[L][T][m];
      let P = b.getAttr(m);
      if (e.Util._isArray(S))
        if (M = [], g = Math.max(S.length, P.length), m === "points" && S.length !== P.length && (S.length > P.length ? (A = P, P = e.Util._prepareArrayForTween(P, S, b.closed())) : (C = S, S = e.Util._prepareArrayForTween(S, P, b.closed()))), m.indexOf("fill") === 0)
          for (let R = 0; R < g; R++)
            if (R % 2 === 0)
              M.push(S[R] - P[R]);
            else {
              const V = e.Util.colorToRGBA(P[R]);
              E = e.Util.colorToRGBA(S[R]), P[R] = V, M.push({
                r: E.r - V.r,
                g: E.g - V.g,
                b: E.b - V.b,
                a: E.a - V.a
              });
            }
        else
          for (let R = 0; R < g; R++)
            M.push(S[R] - P[R]);
      else p.indexOf(m) !== -1 ? (P = e.Util.colorToRGBA(P), E = e.Util.colorToRGBA(S), M = {
        r: E.r - P.r,
        g: E.g - P.g,
        b: E.b - P.b,
        a: E.a - P.a
      }) : M = S - P;
      x.attrs[L][this._id][m] = {
        start: P,
        diff: M,
        end: S,
        trueEnd: C,
        trueStart: A
      }, x.tweens[L][m] = this._id;
    }
    _tweenFunc(m) {
      const S = this.node, b = x.attrs[S._id][this._id];
      let L, M, g, C, A, E, T, P;
      for (L in b) {
        if (M = b[L], g = M.start, C = M.diff, P = M.end, e.Util._isArray(g))
          if (A = [], T = Math.max(g.length, P.length), L.indexOf("fill") === 0)
            for (E = 0; E < T; E++)
              E % 2 === 0 ? A.push((g[E] || 0) + C[E] * m) : A.push("rgba(" + Math.round(g[E].r + C[E].r * m) + "," + Math.round(g[E].g + C[E].g * m) + "," + Math.round(g[E].b + C[E].b * m) + "," + (g[E].a + C[E].a * m) + ")");
          else
            for (E = 0; E < T; E++)
              A.push((g[E] || 0) + C[E] * m);
        else p.indexOf(L) !== -1 ? A = "rgba(" + Math.round(g.r + C.r * m) + "," + Math.round(g.g + C.g * m) + "," + Math.round(g.b + C.b * m) + "," + (g.a + C.a * m) + ")" : A = g + C * m;
        S.setAttr(L, A);
      }
    }
    _addListeners() {
      this.tween.onPlay = () => {
        this.anim.start();
      }, this.tween.onReverse = () => {
        this.anim.start();
      }, this.tween.onPause = () => {
        this.anim.stop();
      }, this.tween.onFinish = () => {
        const m = this.node, S = x.attrs[m._id][this._id];
        S.points && S.points.trueEnd && m.setAttr("points", S.points.trueEnd), this.onFinish && this.onFinish.call(this);
      }, this.tween.onReset = () => {
        const m = this.node, S = x.attrs[m._id][this._id];
        S.points && S.points.trueStart && m.points(S.points.trueStart), this.onReset && this.onReset();
      }, this.tween.onUpdate = () => {
        this.onUpdate && this.onUpdate.call(this);
      };
    }
    play() {
      return this.tween.play(), this;
    }
    reverse() {
      return this.tween.reverse(), this;
    }
    reset() {
      return this.tween.reset(), this;
    }
    seek(m) {
      return this.tween.seek(m * 1e3), this;
    }
    pause() {
      return this.tween.pause(), this;
    }
    finish() {
      return this.tween.finish(), this;
    }
    destroy() {
      const m = this.node._id, S = this._id, b = x.tweens[m];
      this.pause(), this.anim && this.anim.stop();
      for (const L in b)
        delete x.tweens[m][L];
      delete x.attrs[m][S], x.tweens[m] && (Object.keys(x.tweens[m]).length === 0 && delete x.tweens[m], Object.keys(x.attrs[m]).length === 0 && delete x.attrs[m]);
    }
  }
  t.Tween = x, x.attrs = {}, x.tweens = {}, r.Node.prototype.to = function(w) {
    const m = w.onFinish;
    w.node = this, w.onFinish = function() {
      this.destroy(), m && m();
    }, new x(w).play();
  }, t.Easings = {
    BackEaseIn(w, m, S, b) {
      return S * (w /= b) * w * ((1.70158 + 1) * w - 1.70158) + m;
    },
    BackEaseOut(w, m, S, b) {
      return S * ((w = w / b - 1) * w * ((1.70158 + 1) * w + 1.70158) + 1) + m;
    },
    BackEaseInOut(w, m, S, b) {
      let L = 1.70158;
      return (w /= b / 2) < 1 ? S / 2 * (w * w * (((L *= 1.525) + 1) * w - L)) + m : S / 2 * ((w -= 2) * w * (((L *= 1.525) + 1) * w + L) + 2) + m;
    },
    ElasticEaseIn(w, m, S, b, L, M) {
      let g = 0;
      return w === 0 ? m : (w /= b) === 1 ? m + S : (M || (M = b * 0.3), !L || L < Math.abs(S) ? (L = S, g = M / 4) : g = M / (2 * Math.PI) * Math.asin(S / L), -(L * Math.pow(2, 10 * (w -= 1)) * Math.sin((w * b - g) * (2 * Math.PI) / M)) + m);
    },
    ElasticEaseOut(w, m, S, b, L, M) {
      let g = 0;
      return w === 0 ? m : (w /= b) === 1 ? m + S : (M || (M = b * 0.3), !L || L < Math.abs(S) ? (L = S, g = M / 4) : g = M / (2 * Math.PI) * Math.asin(S / L), L * Math.pow(2, -10 * w) * Math.sin((w * b - g) * (2 * Math.PI) / M) + S + m);
    },
    ElasticEaseInOut(w, m, S, b, L, M) {
      let g = 0;
      return w === 0 ? m : (w /= b / 2) === 2 ? m + S : (M || (M = b * (0.3 * 1.5)), !L || L < Math.abs(S) ? (L = S, g = M / 4) : g = M / (2 * Math.PI) * Math.asin(S / L), w < 1 ? -0.5 * (L * Math.pow(2, 10 * (w -= 1)) * Math.sin((w * b - g) * (2 * Math.PI) / M)) + m : L * Math.pow(2, -10 * (w -= 1)) * Math.sin((w * b - g) * (2 * Math.PI) / M) * 0.5 + S + m);
    },
    BounceEaseOut(w, m, S, b) {
      return (w /= b) < 1 / 2.75 ? S * (7.5625 * w * w) + m : w < 2 / 2.75 ? S * (7.5625 * (w -= 1.5 / 2.75) * w + 0.75) + m : w < 2.5 / 2.75 ? S * (7.5625 * (w -= 2.25 / 2.75) * w + 0.9375) + m : S * (7.5625 * (w -= 2.625 / 2.75) * w + 0.984375) + m;
    },
    BounceEaseIn(w, m, S, b) {
      return S - t.Easings.BounceEaseOut(b - w, 0, S, b) + m;
    },
    BounceEaseInOut(w, m, S, b) {
      return w < b / 2 ? t.Easings.BounceEaseIn(w * 2, 0, S, b) * 0.5 + m : t.Easings.BounceEaseOut(w * 2 - b, 0, S, b) * 0.5 + S * 0.5 + m;
    },
    EaseIn(w, m, S, b) {
      return S * (w /= b) * w + m;
    },
    EaseOut(w, m, S, b) {
      return -S * (w /= b) * (w - 2) + m;
    },
    EaseInOut(w, m, S, b) {
      return (w /= b / 2) < 1 ? S / 2 * w * w + m : -S / 2 * (--w * (w - 2) - 1) + m;
    },
    StrongEaseIn(w, m, S, b) {
      return S * (w /= b) * w * w * w * w + m;
    },
    StrongEaseOut(w, m, S, b) {
      return S * ((w = w / b - 1) * w * w * w * w + 1) + m;
    },
    StrongEaseInOut(w, m, S, b) {
      return (w /= b / 2) < 1 ? S / 2 * w * w * w * w * w + m : S / 2 * ((w -= 2) * w * w * w * w + 2) + m;
    },
    Linear(w, m, S, b) {
      return S * w / b + m;
    }
  };
})(gg);
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Konva = void 0;
  const e = Xe, n = Et, r = kt, o = ss, a = dg, l = s1, c = Rc, d = ba, p = Vc, y = Yt, k = Pa, x = gg, w = vi, m = Ar;
  t.Konva = n.Util._assign(e.Konva, {
    Util: n.Util,
    Transform: n.Transform,
    Node: r.Node,
    Container: o.Container,
    Stage: a.Stage,
    stages: a.stages,
    Layer: l.Layer,
    FastLayer: c.FastLayer,
    Group: d.Group,
    DD: p.DD,
    Shape: y.Shape,
    shapes: y.shapes,
    Animation: k.Animation,
    Tween: x.Tween,
    Easings: x.Easings,
    Context: w.Context,
    Canvas: m.Canvas
  }), t.default = t.Konva;
})(Ku);
var zc = {};
Object.defineProperty(zc, "__esModule", { value: !0 });
zc.Arc = void 0;
const Fc = Qe, xC = Yt, h6 = Xe, jc = Ie, _C = Xe;
class bi extends xC.Shape {
  _sceneFunc(e) {
    const n = h6.Konva.getAngle(this.angle()), r = this.clockwise();
    e.beginPath(), e.arc(0, 0, this.outerRadius(), 0, n, r), e.arc(0, 0, this.innerRadius(), n, 0, !r), e.closePath(), e.fillStrokeShape(this);
  }
  getWidth() {
    return this.outerRadius() * 2;
  }
  getHeight() {
    return this.outerRadius() * 2;
  }
  setWidth(e) {
    this.outerRadius(e / 2);
  }
  setHeight(e) {
    this.outerRadius(e / 2);
  }
  getSelfRect() {
    const e = this.innerRadius(), n = this.outerRadius(), r = this.clockwise(), o = h6.Konva.getAngle(r ? 360 - this.angle() : this.angle()), a = Math.cos(Math.min(o, Math.PI)), l = 1, c = Math.sin(Math.min(Math.max(Math.PI, o), 3 * Math.PI / 2)), d = Math.sin(Math.min(o, Math.PI / 2)), p = a * (a > 0 ? e : n), y = l * n, k = c * (c > 0 ? e : n), x = d * (d > 0 ? n : e);
    return {
      x: p,
      y: r ? -1 * x : k,
      width: y - p,
      height: x - k
    };
  }
}
zc.Arc = bi;
bi.prototype._centroid = !0;
bi.prototype.className = "Arc";
bi.prototype._attrsAffectingSize = [
  "innerRadius",
  "outerRadius",
  "angle",
  "clockwise"
];
(0, _C._registerNode)(bi);
Fc.Factory.addGetterSetter(bi, "innerRadius", 0, (0, jc.getNumberValidator)());
Fc.Factory.addGetterSetter(bi, "outerRadius", 0, (0, jc.getNumberValidator)());
Fc.Factory.addGetterSetter(bi, "angle", 0, (0, jc.getNumberValidator)());
Fc.Factory.addGetterSetter(bi, "clockwise", !1, (0, jc.getBooleanValidator)());
var Oc = {}, a1 = {};
Object.defineProperty(a1, "__esModule", { value: !0 });
a1.Line = void 0;
const Ic = Qe, CC = Xe, wC = Yt, mg = Ie;
function F5(t, e, n, r, o, a, l) {
  const c = Math.sqrt(Math.pow(n - t, 2) + Math.pow(r - e, 2)), d = Math.sqrt(Math.pow(o - n, 2) + Math.pow(a - r, 2)), p = l * c / (c + d), y = l * d / (c + d), k = n - p * (o - t), x = r - p * (a - e), w = n + y * (o - t), m = r + y * (a - e);
  return [k, x, w, m];
}
function p6(t, e) {
  const n = t.length, r = [];
  for (let o = 2; o < n - 2; o += 2) {
    const a = F5(t[o - 2], t[o - 1], t[o], t[o + 1], t[o + 2], t[o + 3], e);
    isNaN(a[0]) || (r.push(a[0]), r.push(a[1]), r.push(t[o]), r.push(t[o + 1]), r.push(a[2]), r.push(a[3]));
  }
  return r;
}
let Co = class extends wC.Shape {
  constructor(e) {
    super(e), this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
      this._clearCache("tensionPoints");
    });
  }
  _sceneFunc(e) {
    const n = this.points(), r = n.length, o = this.tension(), a = this.closed(), l = this.bezier();
    if (!r)
      return;
    let c = 0;
    if (e.beginPath(), e.moveTo(n[0], n[1]), o !== 0 && r > 4) {
      const d = this.getTensionPoints(), p = d.length;
      for (c = a ? 0 : 4, a || e.quadraticCurveTo(d[0], d[1], d[2], d[3]); c < p - 2; )
        e.bezierCurveTo(d[c++], d[c++], d[c++], d[c++], d[c++], d[c++]);
      a || e.quadraticCurveTo(d[p - 2], d[p - 1], n[r - 2], n[r - 1]);
    } else if (l)
      for (c = 2; c < r; )
        e.bezierCurveTo(n[c++], n[c++], n[c++], n[c++], n[c++], n[c++]);
    else
      for (c = 2; c < r; c += 2)
        e.lineTo(n[c], n[c + 1]);
    a ? (e.closePath(), e.fillStrokeShape(this)) : e.strokeShape(this);
  }
  getTensionPoints() {
    return this._getCache("tensionPoints", this._getTensionPoints);
  }
  _getTensionPoints() {
    return this.closed() ? this._getTensionPointsClosed() : p6(this.points(), this.tension());
  }
  _getTensionPointsClosed() {
    const e = this.points(), n = e.length, r = this.tension(), o = F5(e[n - 2], e[n - 1], e[0], e[1], e[2], e[3], r), a = F5(e[n - 4], e[n - 3], e[n - 2], e[n - 1], e[0], e[1], r), l = p6(e, r);
    return [o[2], o[3]].concat(l).concat([
      a[0],
      a[1],
      e[n - 2],
      e[n - 1],
      a[2],
      a[3],
      o[0],
      o[1],
      e[0],
      e[1]
    ]);
  }
  getWidth() {
    return this.getSelfRect().width;
  }
  getHeight() {
    return this.getSelfRect().height;
  }
  getSelfRect() {
    let e = this.points();
    if (e.length < 4)
      return {
        x: e[0] || 0,
        y: e[1] || 0,
        width: 0,
        height: 0
      };
    this.tension() !== 0 ? e = [
      e[0],
      e[1],
      ...this._getTensionPoints(),
      e[e.length - 2],
      e[e.length - 1]
    ] : e = this.points();
    let n = e[0], r = e[0], o = e[1], a = e[1], l, c;
    for (let d = 0; d < e.length / 2; d++)
      l = e[d * 2], c = e[d * 2 + 1], n = Math.min(n, l), r = Math.max(r, l), o = Math.min(o, c), a = Math.max(a, c);
    return {
      x: n,
      y: o,
      width: r - n,
      height: a - o
    };
  }
};
a1.Line = Co;
Co.prototype.className = "Line";
Co.prototype._attrsAffectingSize = ["points", "bezier", "tension"];
(0, CC._registerNode)(Co);
Ic.Factory.addGetterSetter(Co, "closed", !1);
Ic.Factory.addGetterSetter(Co, "bezier", !1);
Ic.Factory.addGetterSetter(Co, "tension", 0, (0, mg.getNumberValidator)());
Ic.Factory.addGetterSetter(Co, "points", [], (0, mg.getNumberArrayValidator)());
var Ea = {}, yg = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.t2length = t.getQuadraticArcLength = t.getCubicArcLength = t.binomialCoefficients = t.cValues = t.tValues = void 0, t.tValues = [
    [],
    [],
    [
      -0.5773502691896257,
      0.5773502691896257
    ],
    [
      0,
      -0.7745966692414834,
      0.7745966692414834
    ],
    [
      -0.33998104358485626,
      0.33998104358485626,
      -0.8611363115940526,
      0.8611363115940526
    ],
    [
      0,
      -0.5384693101056831,
      0.5384693101056831,
      -0.906179845938664,
      0.906179845938664
    ],
    [
      0.6612093864662645,
      -0.6612093864662645,
      -0.2386191860831969,
      0.2386191860831969,
      -0.932469514203152,
      0.932469514203152
    ],
    [
      0,
      0.4058451513773972,
      -0.4058451513773972,
      -0.7415311855993945,
      0.7415311855993945,
      -0.9491079123427585,
      0.9491079123427585
    ],
    [
      -0.1834346424956498,
      0.1834346424956498,
      -0.525532409916329,
      0.525532409916329,
      -0.7966664774136267,
      0.7966664774136267,
      -0.9602898564975363,
      0.9602898564975363
    ],
    [
      0,
      -0.8360311073266358,
      0.8360311073266358,
      -0.9681602395076261,
      0.9681602395076261,
      -0.3242534234038089,
      0.3242534234038089,
      -0.6133714327005904,
      0.6133714327005904
    ],
    [
      -0.14887433898163122,
      0.14887433898163122,
      -0.4333953941292472,
      0.4333953941292472,
      -0.6794095682990244,
      0.6794095682990244,
      -0.8650633666889845,
      0.8650633666889845,
      -0.9739065285171717,
      0.9739065285171717
    ],
    [
      0,
      -0.26954315595234496,
      0.26954315595234496,
      -0.5190961292068118,
      0.5190961292068118,
      -0.7301520055740494,
      0.7301520055740494,
      -0.8870625997680953,
      0.8870625997680953,
      -0.978228658146057,
      0.978228658146057
    ],
    [
      -0.1252334085114689,
      0.1252334085114689,
      -0.3678314989981802,
      0.3678314989981802,
      -0.5873179542866175,
      0.5873179542866175,
      -0.7699026741943047,
      0.7699026741943047,
      -0.9041172563704749,
      0.9041172563704749,
      -0.9815606342467192,
      0.9815606342467192
    ],
    [
      0,
      -0.2304583159551348,
      0.2304583159551348,
      -0.44849275103644687,
      0.44849275103644687,
      -0.6423493394403402,
      0.6423493394403402,
      -0.8015780907333099,
      0.8015780907333099,
      -0.9175983992229779,
      0.9175983992229779,
      -0.9841830547185881,
      0.9841830547185881
    ],
    [
      -0.10805494870734367,
      0.10805494870734367,
      -0.31911236892788974,
      0.31911236892788974,
      -0.5152486363581541,
      0.5152486363581541,
      -0.6872929048116855,
      0.6872929048116855,
      -0.827201315069765,
      0.827201315069765,
      -0.9284348836635735,
      0.9284348836635735,
      -0.9862838086968123,
      0.9862838086968123
    ],
    [
      0,
      -0.20119409399743451,
      0.20119409399743451,
      -0.3941513470775634,
      0.3941513470775634,
      -0.5709721726085388,
      0.5709721726085388,
      -0.7244177313601701,
      0.7244177313601701,
      -0.8482065834104272,
      0.8482065834104272,
      -0.937273392400706,
      0.937273392400706,
      -0.9879925180204854,
      0.9879925180204854
    ],
    [
      -0.09501250983763744,
      0.09501250983763744,
      -0.2816035507792589,
      0.2816035507792589,
      -0.45801677765722737,
      0.45801677765722737,
      -0.6178762444026438,
      0.6178762444026438,
      -0.755404408355003,
      0.755404408355003,
      -0.8656312023878318,
      0.8656312023878318,
      -0.9445750230732326,
      0.9445750230732326,
      -0.9894009349916499,
      0.9894009349916499
    ],
    [
      0,
      -0.17848418149584785,
      0.17848418149584785,
      -0.3512317634538763,
      0.3512317634538763,
      -0.5126905370864769,
      0.5126905370864769,
      -0.6576711592166907,
      0.6576711592166907,
      -0.7815140038968014,
      0.7815140038968014,
      -0.8802391537269859,
      0.8802391537269859,
      -0.9506755217687678,
      0.9506755217687678,
      -0.9905754753144174,
      0.9905754753144174
    ],
    [
      -0.0847750130417353,
      0.0847750130417353,
      -0.2518862256915055,
      0.2518862256915055,
      -0.41175116146284263,
      0.41175116146284263,
      -0.5597708310739475,
      0.5597708310739475,
      -0.6916870430603532,
      0.6916870430603532,
      -0.8037049589725231,
      0.8037049589725231,
      -0.8926024664975557,
      0.8926024664975557,
      -0.9558239495713977,
      0.9558239495713977,
      -0.9915651684209309,
      0.9915651684209309
    ],
    [
      0,
      -0.16035864564022537,
      0.16035864564022537,
      -0.31656409996362983,
      0.31656409996362983,
      -0.46457074137596094,
      0.46457074137596094,
      -0.600545304661681,
      0.600545304661681,
      -0.7209661773352294,
      0.7209661773352294,
      -0.8227146565371428,
      0.8227146565371428,
      -0.9031559036148179,
      0.9031559036148179,
      -0.96020815213483,
      0.96020815213483,
      -0.9924068438435844,
      0.9924068438435844
    ],
    [
      -0.07652652113349734,
      0.07652652113349734,
      -0.22778585114164507,
      0.22778585114164507,
      -0.37370608871541955,
      0.37370608871541955,
      -0.5108670019508271,
      0.5108670019508271,
      -0.636053680726515,
      0.636053680726515,
      -0.7463319064601508,
      0.7463319064601508,
      -0.8391169718222188,
      0.8391169718222188,
      -0.912234428251326,
      0.912234428251326,
      -0.9639719272779138,
      0.9639719272779138,
      -0.9931285991850949,
      0.9931285991850949
    ],
    [
      0,
      -0.1455618541608951,
      0.1455618541608951,
      -0.2880213168024011,
      0.2880213168024011,
      -0.4243421202074388,
      0.4243421202074388,
      -0.5516188358872198,
      0.5516188358872198,
      -0.6671388041974123,
      0.6671388041974123,
      -0.7684399634756779,
      0.7684399634756779,
      -0.8533633645833173,
      0.8533633645833173,
      -0.9200993341504008,
      0.9200993341504008,
      -0.9672268385663063,
      0.9672268385663063,
      -0.9937521706203895,
      0.9937521706203895
    ],
    [
      -0.06973927331972223,
      0.06973927331972223,
      -0.20786042668822127,
      0.20786042668822127,
      -0.34193582089208424,
      0.34193582089208424,
      -0.469355837986757,
      0.469355837986757,
      -0.5876404035069116,
      0.5876404035069116,
      -0.6944872631866827,
      0.6944872631866827,
      -0.7878168059792081,
      0.7878168059792081,
      -0.8658125777203002,
      0.8658125777203002,
      -0.926956772187174,
      0.926956772187174,
      -0.9700604978354287,
      0.9700604978354287,
      -0.9942945854823992,
      0.9942945854823992
    ],
    [
      0,
      -0.1332568242984661,
      0.1332568242984661,
      -0.26413568097034495,
      0.26413568097034495,
      -0.3903010380302908,
      0.3903010380302908,
      -0.5095014778460075,
      0.5095014778460075,
      -0.6196098757636461,
      0.6196098757636461,
      -0.7186613631319502,
      0.7186613631319502,
      -0.8048884016188399,
      0.8048884016188399,
      -0.8767523582704416,
      0.8767523582704416,
      -0.9329710868260161,
      0.9329710868260161,
      -0.9725424712181152,
      0.9725424712181152,
      -0.9947693349975522,
      0.9947693349975522
    ],
    [
      -0.06405689286260563,
      0.06405689286260563,
      -0.1911188674736163,
      0.1911188674736163,
      -0.3150426796961634,
      0.3150426796961634,
      -0.4337935076260451,
      0.4337935076260451,
      -0.5454214713888396,
      0.5454214713888396,
      -0.6480936519369755,
      0.6480936519369755,
      -0.7401241915785544,
      0.7401241915785544,
      -0.820001985973903,
      0.820001985973903,
      -0.8864155270044011,
      0.8864155270044011,
      -0.9382745520027328,
      0.9382745520027328,
      -0.9747285559713095,
      0.9747285559713095,
      -0.9951872199970213,
      0.9951872199970213
    ]
  ], t.cValues = [
    [],
    [],
    [1, 1],
    [
      0.8888888888888888,
      0.5555555555555556,
      0.5555555555555556
    ],
    [
      0.6521451548625461,
      0.6521451548625461,
      0.34785484513745385,
      0.34785484513745385
    ],
    [
      0.5688888888888889,
      0.47862867049936647,
      0.47862867049936647,
      0.23692688505618908,
      0.23692688505618908
    ],
    [
      0.3607615730481386,
      0.3607615730481386,
      0.46791393457269104,
      0.46791393457269104,
      0.17132449237917036,
      0.17132449237917036
    ],
    [
      0.4179591836734694,
      0.3818300505051189,
      0.3818300505051189,
      0.27970539148927664,
      0.27970539148927664,
      0.1294849661688697,
      0.1294849661688697
    ],
    [
      0.362683783378362,
      0.362683783378362,
      0.31370664587788727,
      0.31370664587788727,
      0.22238103445337448,
      0.22238103445337448,
      0.10122853629037626,
      0.10122853629037626
    ],
    [
      0.3302393550012598,
      0.1806481606948574,
      0.1806481606948574,
      0.08127438836157441,
      0.08127438836157441,
      0.31234707704000286,
      0.31234707704000286,
      0.26061069640293544,
      0.26061069640293544
    ],
    [
      0.29552422471475287,
      0.29552422471475287,
      0.26926671930999635,
      0.26926671930999635,
      0.21908636251598204,
      0.21908636251598204,
      0.1494513491505806,
      0.1494513491505806,
      0.06667134430868814,
      0.06667134430868814
    ],
    [
      0.2729250867779006,
      0.26280454451024665,
      0.26280454451024665,
      0.23319376459199048,
      0.23319376459199048,
      0.18629021092773426,
      0.18629021092773426,
      0.1255803694649046,
      0.1255803694649046,
      0.05566856711617366,
      0.05566856711617366
    ],
    [
      0.24914704581340277,
      0.24914704581340277,
      0.2334925365383548,
      0.2334925365383548,
      0.20316742672306592,
      0.20316742672306592,
      0.16007832854334622,
      0.16007832854334622,
      0.10693932599531843,
      0.10693932599531843,
      0.04717533638651183,
      0.04717533638651183
    ],
    [
      0.2325515532308739,
      0.22628318026289723,
      0.22628318026289723,
      0.2078160475368885,
      0.2078160475368885,
      0.17814598076194574,
      0.17814598076194574,
      0.13887351021978725,
      0.13887351021978725,
      0.09212149983772845,
      0.09212149983772845,
      0.04048400476531588,
      0.04048400476531588
    ],
    [
      0.2152638534631578,
      0.2152638534631578,
      0.2051984637212956,
      0.2051984637212956,
      0.18553839747793782,
      0.18553839747793782,
      0.15720316715819355,
      0.15720316715819355,
      0.12151857068790319,
      0.12151857068790319,
      0.08015808715976021,
      0.08015808715976021,
      0.03511946033175186,
      0.03511946033175186
    ],
    [
      0.2025782419255613,
      0.19843148532711158,
      0.19843148532711158,
      0.1861610000155622,
      0.1861610000155622,
      0.16626920581699392,
      0.16626920581699392,
      0.13957067792615432,
      0.13957067792615432,
      0.10715922046717194,
      0.10715922046717194,
      0.07036604748810812,
      0.07036604748810812,
      0.03075324199611727,
      0.03075324199611727
    ],
    [
      0.1894506104550685,
      0.1894506104550685,
      0.18260341504492358,
      0.18260341504492358,
      0.16915651939500254,
      0.16915651939500254,
      0.14959598881657674,
      0.14959598881657674,
      0.12462897125553388,
      0.12462897125553388,
      0.09515851168249279,
      0.09515851168249279,
      0.062253523938647894,
      0.062253523938647894,
      0.027152459411754096,
      0.027152459411754096
    ],
    [
      0.17944647035620653,
      0.17656270536699264,
      0.17656270536699264,
      0.16800410215645004,
      0.16800410215645004,
      0.15404576107681028,
      0.15404576107681028,
      0.13513636846852548,
      0.13513636846852548,
      0.11188384719340397,
      0.11188384719340397,
      0.08503614831717918,
      0.08503614831717918,
      0.0554595293739872,
      0.0554595293739872,
      0.02414830286854793,
      0.02414830286854793
    ],
    [
      0.1691423829631436,
      0.1691423829631436,
      0.16427648374583273,
      0.16427648374583273,
      0.15468467512626524,
      0.15468467512626524,
      0.14064291467065065,
      0.14064291467065065,
      0.12255520671147846,
      0.12255520671147846,
      0.10094204410628717,
      0.10094204410628717,
      0.07642573025488905,
      0.07642573025488905,
      0.0497145488949698,
      0.0497145488949698,
      0.02161601352648331,
      0.02161601352648331
    ],
    [
      0.1610544498487837,
      0.15896884339395434,
      0.15896884339395434,
      0.15276604206585967,
      0.15276604206585967,
      0.1426067021736066,
      0.1426067021736066,
      0.12875396253933621,
      0.12875396253933621,
      0.11156664554733399,
      0.11156664554733399,
      0.09149002162245,
      0.09149002162245,
      0.06904454273764123,
      0.06904454273764123,
      0.0448142267656996,
      0.0448142267656996,
      0.019461788229726478,
      0.019461788229726478
    ],
    [
      0.15275338713072584,
      0.15275338713072584,
      0.14917298647260374,
      0.14917298647260374,
      0.14209610931838204,
      0.14209610931838204,
      0.13168863844917664,
      0.13168863844917664,
      0.11819453196151841,
      0.11819453196151841,
      0.10193011981724044,
      0.10193011981724044,
      0.08327674157670475,
      0.08327674157670475,
      0.06267204833410907,
      0.06267204833410907,
      0.04060142980038694,
      0.04060142980038694,
      0.017614007139152118,
      0.017614007139152118
    ],
    [
      0.14608113364969041,
      0.14452440398997005,
      0.14452440398997005,
      0.13988739479107315,
      0.13988739479107315,
      0.13226893863333747,
      0.13226893863333747,
      0.12183141605372853,
      0.12183141605372853,
      0.10879729916714838,
      0.10879729916714838,
      0.09344442345603386,
      0.09344442345603386,
      0.0761001136283793,
      0.0761001136283793,
      0.057134425426857205,
      0.057134425426857205,
      0.036953789770852494,
      0.036953789770852494,
      0.016017228257774335,
      0.016017228257774335
    ],
    [
      0.13925187285563198,
      0.13925187285563198,
      0.13654149834601517,
      0.13654149834601517,
      0.13117350478706238,
      0.13117350478706238,
      0.12325237681051242,
      0.12325237681051242,
      0.11293229608053922,
      0.11293229608053922,
      0.10041414444288096,
      0.10041414444288096,
      0.08594160621706773,
      0.08594160621706773,
      0.06979646842452049,
      0.06979646842452049,
      0.052293335152683286,
      0.052293335152683286,
      0.03377490158481415,
      0.03377490158481415,
      0.0146279952982722,
      0.0146279952982722
    ],
    [
      0.13365457218610619,
      0.1324620394046966,
      0.1324620394046966,
      0.12890572218808216,
      0.12890572218808216,
      0.12304908430672953,
      0.12304908430672953,
      0.11499664022241136,
      0.11499664022241136,
      0.10489209146454141,
      0.10489209146454141,
      0.09291576606003515,
      0.09291576606003515,
      0.07928141177671895,
      0.07928141177671895,
      0.06423242140852585,
      0.06423242140852585,
      0.04803767173108467,
      0.04803767173108467,
      0.030988005856979445,
      0.030988005856979445,
      0.013411859487141771,
      0.013411859487141771
    ],
    [
      0.12793819534675216,
      0.12793819534675216,
      0.1258374563468283,
      0.1258374563468283,
      0.12167047292780339,
      0.12167047292780339,
      0.1155056680537256,
      0.1155056680537256,
      0.10744427011596563,
      0.10744427011596563,
      0.09761865210411388,
      0.09761865210411388,
      0.08619016153195327,
      0.08619016153195327,
      0.0733464814110803,
      0.0733464814110803,
      0.05929858491543678,
      0.05929858491543678,
      0.04427743881741981,
      0.04427743881741981,
      0.028531388628933663,
      0.028531388628933663,
      0.0123412297999872,
      0.0123412297999872
    ]
  ], t.binomialCoefficients = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]];
  const e = (l, c, d) => {
    let p, y;
    const x = d / 2;
    p = 0;
    for (let w = 0; w < 20; w++)
      y = x * t.tValues[20][w] + x, p += t.cValues[20][w] * r(l, c, y);
    return x * p;
  };
  t.getCubicArcLength = e;
  const n = (l, c, d) => {
    d === void 0 && (d = 1);
    const p = l[0] - 2 * l[1] + l[2], y = c[0] - 2 * c[1] + c[2], k = 2 * l[1] - 2 * l[0], x = 2 * c[1] - 2 * c[0], w = 4 * (p * p + y * y), m = 4 * (p * k + y * x), S = k * k + x * x;
    if (w === 0)
      return d * Math.sqrt(Math.pow(l[2] - l[0], 2) + Math.pow(c[2] - c[0], 2));
    const b = m / (2 * w), L = S / w, M = d + b, g = L - b * b, C = M * M + g > 0 ? Math.sqrt(M * M + g) : 0, A = b * b + g > 0 ? Math.sqrt(b * b + g) : 0, E = b + Math.sqrt(b * b + g) !== 0 ? g * Math.log(Math.abs((M + C) / (b + A))) : 0;
    return Math.sqrt(w) / 2 * (M * C - b * A + E);
  };
  t.getQuadraticArcLength = n;
  function r(l, c, d) {
    const p = o(1, d, l), y = o(1, d, c), k = p * p + y * y;
    return Math.sqrt(k);
  }
  const o = (l, c, d) => {
    const p = d.length - 1;
    let y, k;
    if (p === 0)
      return 0;
    if (l === 0) {
      k = 0;
      for (let x = 0; x <= p; x++)
        k += t.binomialCoefficients[p][x] * Math.pow(1 - c, p - x) * Math.pow(c, x) * d[x];
      return k;
    } else {
      y = new Array(p);
      for (let x = 0; x < p; x++)
        y[x] = p * (d[x + 1] - d[x]);
      return o(l - 1, c, y);
    }
  }, a = (l, c, d) => {
    let p = 1, y = l / c, k = (l - d(y)) / c, x = 0;
    for (; p > 1e-3; ) {
      const w = d(y + k), m = Math.abs(l - w) / c;
      if (m < p)
        p = m, y += k;
      else {
        const S = d(y - k), b = Math.abs(l - S) / c;
        b < p ? (p = b, y -= k) : k /= 2;
      }
      if (x++, x > 500)
        break;
    }
    return y;
  };
  t.t2length = a;
})(yg);
Object.defineProperty(Ea, "__esModule", { value: !0 });
Ea.Path = void 0;
const SC = Qe, kC = Xe, MC = Yt, zs = yg;
let l1 = class zn extends MC.Shape {
  constructor(e) {
    super(e), this.dataArray = [], this.pathLength = 0, this._readDataAttribute(), this.on("dataChange.konva", function() {
      this._readDataAttribute();
    });
  }
  _readDataAttribute() {
    this.dataArray = zn.parsePathData(this.data()), this.pathLength = zn.getPathLength(this.dataArray);
  }
  _sceneFunc(e) {
    const n = this.dataArray;
    e.beginPath();
    let r = !1;
    for (let o = 0; o < n.length; o++) {
      const a = n[o].command, l = n[o].points;
      switch (a) {
        case "L":
          e.lineTo(l[0], l[1]);
          break;
        case "M":
          e.moveTo(l[0], l[1]);
          break;
        case "C":
          e.bezierCurveTo(l[0], l[1], l[2], l[3], l[4], l[5]);
          break;
        case "Q":
          e.quadraticCurveTo(l[0], l[1], l[2], l[3]);
          break;
        case "A":
          const c = l[0], d = l[1], p = l[2], y = l[3], k = l[4], x = l[5], w = l[6], m = l[7], S = p > y ? p : y, b = p > y ? 1 : p / y, L = p > y ? y / p : 1;
          e.translate(c, d), e.rotate(w), e.scale(b, L), e.arc(0, 0, S, k, k + x, 1 - m), e.scale(1 / b, 1 / L), e.rotate(-w), e.translate(-c, -d);
          break;
        case "z":
          r = !0, e.closePath();
          break;
      }
    }
    !r && !this.hasFill() ? e.strokeShape(this) : e.fillStrokeShape(this);
  }
  getSelfRect() {
    let e = [];
    this.dataArray.forEach(function(d) {
      if (d.command === "A") {
        const p = d.points[4], y = d.points[5], k = d.points[4] + y;
        let x = Math.PI / 180;
        if (Math.abs(p - k) < x && (x = Math.abs(p - k)), y < 0)
          for (let w = p - x; w > k; w -= x) {
            const m = zn.getPointOnEllipticalArc(d.points[0], d.points[1], d.points[2], d.points[3], w, 0);
            e.push(m.x, m.y);
          }
        else
          for (let w = p + x; w < k; w += x) {
            const m = zn.getPointOnEllipticalArc(d.points[0], d.points[1], d.points[2], d.points[3], w, 0);
            e.push(m.x, m.y);
          }
      } else if (d.command === "C")
        for (let p = 0; p <= 1; p += 0.01) {
          const y = zn.getPointOnCubicBezier(p, d.start.x, d.start.y, d.points[0], d.points[1], d.points[2], d.points[3], d.points[4], d.points[5]);
          e.push(y.x, y.y);
        }
      else
        e = e.concat(d.points);
    });
    let n = e[0], r = e[0], o = e[1], a = e[1], l, c;
    for (let d = 0; d < e.length / 2; d++)
      l = e[d * 2], c = e[d * 2 + 1], isNaN(l) || (n = Math.min(n, l), r = Math.max(r, l)), isNaN(c) || (o = Math.min(o, c), a = Math.max(a, c));
    return {
      x: n,
      y: o,
      width: r - n,
      height: a - o
    };
  }
  getLength() {
    return this.pathLength;
  }
  getPointAtLength(e) {
    return zn.getPointAtLengthOfDataArray(e, this.dataArray);
  }
  static getLineLength(e, n, r, o) {
    return Math.sqrt((r - e) * (r - e) + (o - n) * (o - n));
  }
  static getPathLength(e) {
    let n = 0;
    for (let r = 0; r < e.length; ++r)
      n += e[r].pathLength;
    return n;
  }
  static getPointAtLengthOfDataArray(e, n) {
    let r, o = 0, a = n.length;
    if (!a)
      return null;
    for (; o < a && e > n[o].pathLength; )
      e -= n[o].pathLength, ++o;
    if (o === a)
      return r = n[o - 1].points.slice(-2), {
        x: r[0],
        y: r[1]
      };
    if (e < 0.01)
      return n[o].command === "M" ? (r = n[o].points.slice(0, 2), {
        x: r[0],
        y: r[1]
      }) : {
        x: n[o].start.x,
        y: n[o].start.y
      };
    const l = n[o], c = l.points;
    switch (l.command) {
      case "L":
        return zn.getPointOnLine(e, l.start.x, l.start.y, c[0], c[1]);
      case "C":
        return zn.getPointOnCubicBezier((0, zs.t2length)(e, zn.getPathLength(n), (S) => (0, zs.getCubicArcLength)([l.start.x, c[0], c[2], c[4]], [l.start.y, c[1], c[3], c[5]], S)), l.start.x, l.start.y, c[0], c[1], c[2], c[3], c[4], c[5]);
      case "Q":
        return zn.getPointOnQuadraticBezier((0, zs.t2length)(e, zn.getPathLength(n), (S) => (0, zs.getQuadraticArcLength)([l.start.x, c[0], c[2]], [l.start.y, c[1], c[3]], S)), l.start.x, l.start.y, c[0], c[1], c[2], c[3]);
      case "A":
        const d = c[0], p = c[1], y = c[2], k = c[3], x = c[5], w = c[6];
        let m = c[4];
        return m += x * e / l.pathLength, zn.getPointOnEllipticalArc(d, p, y, k, m, w);
    }
    return null;
  }
  static getPointOnLine(e, n, r, o, a, l, c) {
    l = l ?? n, c = c ?? r;
    const d = this.getLineLength(n, r, o, a);
    if (d < 1e-10)
      return { x: n, y: r };
    if (o === n)
      return { x: l, y: c + (a > r ? e : -e) };
    const p = (a - r) / (o - n), y = Math.sqrt(e * e / (1 + p * p)) * (o < n ? -1 : 1), k = p * y;
    if (Math.abs(c - r - p * (l - n)) < 1e-10)
      return { x: l + y, y: c + k };
    const x = ((l - n) * (o - n) + (c - r) * (a - r)) / (d * d), w = n + x * (o - n), m = r + x * (a - r), S = this.getLineLength(l, c, w, m), b = Math.sqrt(e * e - S * S), L = Math.sqrt(b * b / (1 + p * p)) * (o < n ? -1 : 1), M = p * L;
    return { x: w + L, y: m + M };
  }
  static getPointOnCubicBezier(e, n, r, o, a, l, c, d, p) {
    function y(b) {
      return b * b * b;
    }
    function k(b) {
      return 3 * b * b * (1 - b);
    }
    function x(b) {
      return 3 * b * (1 - b) * (1 - b);
    }
    function w(b) {
      return (1 - b) * (1 - b) * (1 - b);
    }
    const m = d * y(e) + l * k(e) + o * x(e) + n * w(e), S = p * y(e) + c * k(e) + a * x(e) + r * w(e);
    return { x: m, y: S };
  }
  static getPointOnQuadraticBezier(e, n, r, o, a, l, c) {
    function d(w) {
      return w * w;
    }
    function p(w) {
      return 2 * w * (1 - w);
    }
    function y(w) {
      return (1 - w) * (1 - w);
    }
    const k = l * d(e) + o * p(e) + n * y(e), x = c * d(e) + a * p(e) + r * y(e);
    return { x: k, y: x };
  }
  static getPointOnEllipticalArc(e, n, r, o, a, l) {
    const c = Math.cos(l), d = Math.sin(l), p = {
      x: r * Math.cos(a),
      y: o * Math.sin(a)
    };
    return {
      x: e + (p.x * c - p.y * d),
      y: n + (p.x * d + p.y * c)
    };
  }
  static parsePathData(e) {
    if (!e)
      return [];
    let n = e;
    const r = [
      "m",
      "M",
      "l",
      "L",
      "v",
      "V",
      "h",
      "H",
      "z",
      "Z",
      "c",
      "C",
      "q",
      "Q",
      "t",
      "T",
      "s",
      "S",
      "a",
      "A"
    ];
    n = n.replace(new RegExp(" ", "g"), ",");
    for (let k = 0; k < r.length; k++)
      n = n.replace(new RegExp(r[k], "g"), "|" + r[k]);
    const o = n.split("|"), a = [], l = [];
    let c = 0, d = 0;
    const p = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
    let y;
    for (let k = 1; k < o.length; k++) {
      let x = o[k], w = x.charAt(0);
      for (x = x.slice(1), l.length = 0; y = p.exec(x); )
        l.push(y[0]);
      const m = [];
      for (let S = 0, b = l.length; S < b; S++) {
        if (l[S] === "00") {
          m.push(0, 0);
          continue;
        }
        const L = parseFloat(l[S]);
        isNaN(L) ? m.push(0) : m.push(L);
      }
      for (; m.length > 0 && !isNaN(m[0]); ) {
        let S = "", b = [];
        const L = c, M = d;
        let g, C, A, E, T, P, R, V, F, W;
        switch (w) {
          case "l":
            c += m.shift(), d += m.shift(), S = "L", b.push(c, d);
            break;
          case "L":
            c = m.shift(), d = m.shift(), b.push(c, d);
            break;
          case "m":
            const U = m.shift(), $ = m.shift();
            if (c += U, d += $, S = "M", a.length > 2 && a[a.length - 1].command === "z") {
              for (let Q = a.length - 2; Q >= 0; Q--)
                if (a[Q].command === "M") {
                  c = a[Q].points[0] + U, d = a[Q].points[1] + $;
                  break;
                }
            }
            b.push(c, d), w = "l";
            break;
          case "M":
            c = m.shift(), d = m.shift(), S = "M", b.push(c, d), w = "L";
            break;
          case "h":
            c += m.shift(), S = "L", b.push(c, d);
            break;
          case "H":
            c = m.shift(), S = "L", b.push(c, d);
            break;
          case "v":
            d += m.shift(), S = "L", b.push(c, d);
            break;
          case "V":
            d = m.shift(), S = "L", b.push(c, d);
            break;
          case "C":
            b.push(m.shift(), m.shift(), m.shift(), m.shift()), c = m.shift(), d = m.shift(), b.push(c, d);
            break;
          case "c":
            b.push(c + m.shift(), d + m.shift(), c + m.shift(), d + m.shift()), c += m.shift(), d += m.shift(), S = "C", b.push(c, d);
            break;
          case "S":
            C = c, A = d, g = a[a.length - 1], g.command === "C" && (C = c + (c - g.points[2]), A = d + (d - g.points[3])), b.push(C, A, m.shift(), m.shift()), c = m.shift(), d = m.shift(), S = "C", b.push(c, d);
            break;
          case "s":
            C = c, A = d, g = a[a.length - 1], g.command === "C" && (C = c + (c - g.points[2]), A = d + (d - g.points[3])), b.push(C, A, c + m.shift(), d + m.shift()), c += m.shift(), d += m.shift(), S = "C", b.push(c, d);
            break;
          case "Q":
            b.push(m.shift(), m.shift()), c = m.shift(), d = m.shift(), b.push(c, d);
            break;
          case "q":
            b.push(c + m.shift(), d + m.shift()), c += m.shift(), d += m.shift(), S = "Q", b.push(c, d);
            break;
          case "T":
            C = c, A = d, g = a[a.length - 1], g.command === "Q" && (C = c + (c - g.points[0]), A = d + (d - g.points[1])), c = m.shift(), d = m.shift(), S = "Q", b.push(C, A, c, d);
            break;
          case "t":
            C = c, A = d, g = a[a.length - 1], g.command === "Q" && (C = c + (c - g.points[0]), A = d + (d - g.points[1])), c += m.shift(), d += m.shift(), S = "Q", b.push(C, A, c, d);
            break;
          case "A":
            E = m.shift(), T = m.shift(), P = m.shift(), R = m.shift(), V = m.shift(), F = c, W = d, c = m.shift(), d = m.shift(), S = "A", b = this.convertEndpointToCenterParameterization(F, W, c, d, R, V, E, T, P);
            break;
          case "a":
            E = m.shift(), T = m.shift(), P = m.shift(), R = m.shift(), V = m.shift(), F = c, W = d, c += m.shift(), d += m.shift(), S = "A", b = this.convertEndpointToCenterParameterization(F, W, c, d, R, V, E, T, P);
            break;
        }
        a.push({
          command: S || w,
          points: b,
          start: {
            x: L,
            y: M
          },
          pathLength: this.calcLength(L, M, S || w, b)
        });
      }
      (w === "z" || w === "Z") && a.push({
        command: "z",
        points: [],
        start: void 0,
        pathLength: 0
      });
    }
    return a;
  }
  static calcLength(e, n, r, o) {
    let a, l, c, d;
    const p = zn;
    switch (r) {
      case "L":
        return p.getLineLength(e, n, o[0], o[1]);
      case "C":
        return (0, zs.getCubicArcLength)([e, o[0], o[2], o[4]], [n, o[1], o[3], o[5]], 1);
      case "Q":
        return (0, zs.getQuadraticArcLength)([e, o[0], o[2]], [n, o[1], o[3]], 1);
      case "A":
        a = 0;
        const y = o[4], k = o[5], x = o[4] + k;
        let w = Math.PI / 180;
        if (Math.abs(y - x) < w && (w = Math.abs(y - x)), l = p.getPointOnEllipticalArc(o[0], o[1], o[2], o[3], y, 0), k < 0)
          for (d = y - w; d > x; d -= w)
            c = p.getPointOnEllipticalArc(o[0], o[1], o[2], o[3], d, 0), a += p.getLineLength(l.x, l.y, c.x, c.y), l = c;
        else
          for (d = y + w; d < x; d += w)
            c = p.getPointOnEllipticalArc(o[0], o[1], o[2], o[3], d, 0), a += p.getLineLength(l.x, l.y, c.x, c.y), l = c;
        return c = p.getPointOnEllipticalArc(o[0], o[1], o[2], o[3], x, 0), a += p.getLineLength(l.x, l.y, c.x, c.y), a;
    }
    return 0;
  }
  static convertEndpointToCenterParameterization(e, n, r, o, a, l, c, d, p) {
    const y = p * (Math.PI / 180), k = Math.cos(y) * (e - r) / 2 + Math.sin(y) * (n - o) / 2, x = -1 * Math.sin(y) * (e - r) / 2 + Math.cos(y) * (n - o) / 2, w = k * k / (c * c) + x * x / (d * d);
    w > 1 && (c *= Math.sqrt(w), d *= Math.sqrt(w));
    let m = Math.sqrt((c * c * (d * d) - c * c * (x * x) - d * d * (k * k)) / (c * c * (x * x) + d * d * (k * k)));
    a === l && (m *= -1), isNaN(m) && (m = 0);
    const S = m * c * x / d, b = m * -d * k / c, L = (e + r) / 2 + Math.cos(y) * S - Math.sin(y) * b, M = (n + o) / 2 + Math.sin(y) * S + Math.cos(y) * b, g = function(V) {
      return Math.sqrt(V[0] * V[0] + V[1] * V[1]);
    }, C = function(V, F) {
      return (V[0] * F[0] + V[1] * F[1]) / (g(V) * g(F));
    }, A = function(V, F) {
      return (V[0] * F[1] < V[1] * F[0] ? -1 : 1) * Math.acos(C(V, F));
    }, E = A([1, 0], [(k - S) / c, (x - b) / d]), T = [(k - S) / c, (x - b) / d], P = [(-1 * k - S) / c, (-1 * x - b) / d];
    let R = A(T, P);
    return C(T, P) <= -1 && (R = Math.PI), C(T, P) >= 1 && (R = 0), l === 0 && R > 0 && (R = R - 2 * Math.PI), l === 1 && R < 0 && (R = R + 2 * Math.PI), [L, M, c, d, E, R, y, l];
  }
};
Ea.Path = l1;
l1.prototype.className = "Path";
l1.prototype._attrsAffectingSize = ["data"];
(0, kC._registerNode)(l1);
SC.Factory.addGetterSetter(l1, "data");
Object.defineProperty(Oc, "__esModule", { value: !0 });
Oc.Arrow = void 0;
const Dc = Qe, LC = a1, vg = Ie, AC = Xe, g6 = Ea;
class ls extends LC.Line {
  _sceneFunc(e) {
    super._sceneFunc(e);
    const n = Math.PI * 2, r = this.points();
    let o = r;
    const a = this.tension() !== 0 && r.length > 4;
    a && (o = this.getTensionPoints());
    const l = this.pointerLength(), c = r.length;
    let d, p;
    if (a) {
      const x = [
        o[o.length - 4],
        o[o.length - 3],
        o[o.length - 2],
        o[o.length - 1],
        r[c - 2],
        r[c - 1]
      ], w = g6.Path.calcLength(o[o.length - 4], o[o.length - 3], "C", x), m = g6.Path.getPointOnQuadraticBezier(Math.min(1, 1 - l / w), x[0], x[1], x[2], x[3], x[4], x[5]);
      d = r[c - 2] - m.x, p = r[c - 1] - m.y;
    } else
      d = r[c - 2] - r[c - 4], p = r[c - 1] - r[c - 3];
    const y = (Math.atan2(p, d) + n) % n, k = this.pointerWidth();
    this.pointerAtEnding() && (e.save(), e.beginPath(), e.translate(r[c - 2], r[c - 1]), e.rotate(y), e.moveTo(0, 0), e.lineTo(-l, k / 2), e.lineTo(-l, -k / 2), e.closePath(), e.restore(), this.__fillStroke(e)), this.pointerAtBeginning() && (e.save(), e.beginPath(), e.translate(r[0], r[1]), a ? (d = (o[0] + o[2]) / 2 - r[0], p = (o[1] + o[3]) / 2 - r[1]) : (d = r[2] - r[0], p = r[3] - r[1]), e.rotate((Math.atan2(-p, -d) + n) % n), e.moveTo(0, 0), e.lineTo(-l, k / 2), e.lineTo(-l, -k / 2), e.closePath(), e.restore(), this.__fillStroke(e));
  }
  __fillStroke(e) {
    const n = this.dashEnabled();
    n && (this.attrs.dashEnabled = !1, e.setLineDash([])), e.fillStrokeShape(this), n && (this.attrs.dashEnabled = !0);
  }
  getSelfRect() {
    const e = super.getSelfRect(), n = this.pointerWidth() / 2;
    return {
      x: e.x,
      y: e.y - n,
      width: e.width,
      height: e.height + n * 2
    };
  }
}
Oc.Arrow = ls;
ls.prototype.className = "Arrow";
(0, AC._registerNode)(ls);
Dc.Factory.addGetterSetter(ls, "pointerLength", 10, (0, vg.getNumberValidator)());
Dc.Factory.addGetterSetter(ls, "pointerWidth", 10, (0, vg.getNumberValidator)());
Dc.Factory.addGetterSetter(ls, "pointerAtBeginning", !1);
Dc.Factory.addGetterSetter(ls, "pointerAtEnding", !0);
var Gc = {};
Object.defineProperty(Gc, "__esModule", { value: !0 });
Gc.Circle = void 0;
const bC = Qe, PC = Yt, EC = Ie, NC = Xe;
let Na = class extends PC.Shape {
  _sceneFunc(e) {
    e.beginPath(), e.arc(0, 0, this.attrs.radius || 0, 0, Math.PI * 2, !1), e.closePath(), e.fillStrokeShape(this);
  }
  getWidth() {
    return this.radius() * 2;
  }
  getHeight() {
    return this.radius() * 2;
  }
  setWidth(e) {
    this.radius() !== e / 2 && this.radius(e / 2);
  }
  setHeight(e) {
    this.radius() !== e / 2 && this.radius(e / 2);
  }
};
Gc.Circle = Na;
Na.prototype._centroid = !0;
Na.prototype.className = "Circle";
Na.prototype._attrsAffectingSize = ["radius"];
(0, NC._registerNode)(Na);
bC.Factory.addGetterSetter(Na, "radius", 0, (0, EC.getNumberValidator)());
var Uc = {};
Object.defineProperty(Uc, "__esModule", { value: !0 });
Uc.Ellipse = void 0;
const Kh = Qe, HC = Yt, xg = Ie, VC = Xe;
class wo extends HC.Shape {
  _sceneFunc(e) {
    const n = this.radiusX(), r = this.radiusY();
    e.beginPath(), e.save(), n !== r && e.scale(1, r / n), e.arc(0, 0, n, 0, Math.PI * 2, !1), e.restore(), e.closePath(), e.fillStrokeShape(this);
  }
  getWidth() {
    return this.radiusX() * 2;
  }
  getHeight() {
    return this.radiusY() * 2;
  }
  setWidth(e) {
    this.radiusX(e / 2);
  }
  setHeight(e) {
    this.radiusY(e / 2);
  }
}
Uc.Ellipse = wo;
wo.prototype.className = "Ellipse";
wo.prototype._centroid = !0;
wo.prototype._attrsAffectingSize = ["radiusX", "radiusY"];
(0, VC._registerNode)(wo);
Kh.Factory.addComponentsGetterSetter(wo, "radius", ["x", "y"]);
Kh.Factory.addGetterSetter(wo, "radiusX", 0, (0, xg.getNumberValidator)());
Kh.Factory.addGetterSetter(wo, "radiusY", 0, (0, xg.getNumberValidator)());
var Bc = {};
Object.defineProperty(Bc, "__esModule", { value: !0 });
Bc.Image = void 0;
const vf = Et, us = Qe, TC = Yt, RC = Xe, u1 = Ie;
let Jr = class _g extends TC.Shape {
  constructor(e) {
    super(e), this._loadListener = () => {
      this._requestDraw();
    }, this.on("imageChange.konva", (n) => {
      this._removeImageLoad(n.oldVal), this._setImageLoad();
    }), this._setImageLoad();
  }
  _setImageLoad() {
    const e = this.image();
    e && e.complete || e && e.readyState === 4 || e && e.addEventListener && e.addEventListener("load", this._loadListener);
  }
  _removeImageLoad(e) {
    e && e.removeEventListener && e.removeEventListener("load", this._loadListener);
  }
  destroy() {
    return this._removeImageLoad(this.image()), super.destroy(), this;
  }
  _useBufferCanvas() {
    const e = !!this.cornerRadius(), n = this.hasShadow();
    return e && n ? !0 : super._useBufferCanvas(!0);
  }
  _sceneFunc(e) {
    const n = this.getWidth(), r = this.getHeight(), o = this.cornerRadius(), a = this.attrs.image;
    let l;
    if (a) {
      const c = this.attrs.cropWidth, d = this.attrs.cropHeight;
      c && d ? l = [
        a,
        this.cropX(),
        this.cropY(),
        c,
        d,
        0,
        0,
        n,
        r
      ] : l = [a, 0, 0, n, r];
    }
    (this.hasFill() || this.hasStroke() || o) && (e.beginPath(), o ? vf.Util.drawRoundedRectPath(e, n, r, o) : e.rect(0, 0, n, r), e.closePath(), e.fillStrokeShape(this)), a && (o && e.clip(), e.drawImage.apply(e, l));
  }
  _hitFunc(e) {
    const n = this.width(), r = this.height(), o = this.cornerRadius();
    e.beginPath(), o ? vf.Util.drawRoundedRectPath(e, n, r, o) : e.rect(0, 0, n, r), e.closePath(), e.fillStrokeShape(this);
  }
  getWidth() {
    var e, n;
    return (e = this.attrs.width) !== null && e !== void 0 ? e : (n = this.image()) === null || n === void 0 ? void 0 : n.width;
  }
  getHeight() {
    var e, n;
    return (e = this.attrs.height) !== null && e !== void 0 ? e : (n = this.image()) === null || n === void 0 ? void 0 : n.height;
  }
  static fromURL(e, n, r = null) {
    const o = vf.Util.createImageElement();
    o.onload = function() {
      const a = new _g({
        image: o
      });
      n(a);
    }, o.onerror = r, o.crossOrigin = "Anonymous", o.src = e;
  }
};
Bc.Image = Jr;
Jr.prototype.className = "Image";
(0, RC._registerNode)(Jr);
us.Factory.addGetterSetter(Jr, "cornerRadius", 0, (0, u1.getNumberOrArrayOfNumbersValidator)(4));
us.Factory.addGetterSetter(Jr, "image");
us.Factory.addComponentsGetterSetter(Jr, "crop", ["x", "y", "width", "height"]);
us.Factory.addGetterSetter(Jr, "cropX", 0, (0, u1.getNumberValidator)());
us.Factory.addGetterSetter(Jr, "cropY", 0, (0, u1.getNumberValidator)());
us.Factory.addGetterSetter(Jr, "cropWidth", 0, (0, u1.getNumberValidator)());
us.Factory.addGetterSetter(Jr, "cropHeight", 0, (0, u1.getNumberValidator)());
var ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
ya.Tag = ya.Label = void 0;
const Wc = Qe, zC = Yt, FC = ba, Xh = Ie, Cg = Xe, wg = [
  "fontFamily",
  "fontSize",
  "fontStyle",
  "padding",
  "lineHeight",
  "text",
  "width",
  "height",
  "pointerDirection",
  "pointerWidth",
  "pointerHeight"
], jC = "Change.konva", OC = "none", j5 = "up", O5 = "right", I5 = "down", D5 = "left", IC = wg.length;
class $h extends FC.Group {
  constructor(e) {
    super(e), this.on("add.konva", function(n) {
      this._addListeners(n.child), this._sync();
    });
  }
  getText() {
    return this.find("Text")[0];
  }
  getTag() {
    return this.find("Tag")[0];
  }
  _addListeners(e) {
    let n = this, r;
    const o = function() {
      n._sync();
    };
    for (r = 0; r < IC; r++)
      e.on(wg[r] + jC, o);
  }
  getWidth() {
    return this.getText().width();
  }
  getHeight() {
    return this.getText().height();
  }
  _sync() {
    let e = this.getText(), n = this.getTag(), r, o, a, l, c, d, p;
    if (e && n) {
      switch (r = e.width(), o = e.height(), a = n.pointerDirection(), l = n.pointerWidth(), p = n.pointerHeight(), c = 0, d = 0, a) {
        case j5:
          c = r / 2, d = -1 * p;
          break;
        case O5:
          c = r + l, d = o / 2;
          break;
        case I5:
          c = r / 2, d = o + p;
          break;
        case D5:
          c = -1 * l, d = o / 2;
          break;
      }
      n.setAttrs({
        x: -1 * c,
        y: -1 * d,
        width: r,
        height: o
      }), e.setAttrs({
        x: -1 * c,
        y: -1 * d
      });
    }
  }
}
ya.Label = $h;
$h.prototype.className = "Label";
(0, Cg._registerNode)($h);
class cs extends zC.Shape {
  _sceneFunc(e) {
    const n = this.width(), r = this.height(), o = this.pointerDirection(), a = this.pointerWidth(), l = this.pointerHeight(), c = this.cornerRadius();
    let d = 0, p = 0, y = 0, k = 0;
    typeof c == "number" ? d = p = y = k = Math.min(c, n / 2, r / 2) : (d = Math.min(c[0] || 0, n / 2, r / 2), p = Math.min(c[1] || 0, n / 2, r / 2), k = Math.min(c[2] || 0, n / 2, r / 2), y = Math.min(c[3] || 0, n / 2, r / 2)), e.beginPath(), e.moveTo(d, 0), o === j5 && (e.lineTo((n - a) / 2, 0), e.lineTo(n / 2, -1 * l), e.lineTo((n + a) / 2, 0)), e.lineTo(n - p, 0), e.arc(n - p, p, p, Math.PI * 3 / 2, 0, !1), o === O5 && (e.lineTo(n, (r - l) / 2), e.lineTo(n + a, r / 2), e.lineTo(n, (r + l) / 2)), e.lineTo(n, r - k), e.arc(n - k, r - k, k, 0, Math.PI / 2, !1), o === I5 && (e.lineTo((n + a) / 2, r), e.lineTo(n / 2, r + l), e.lineTo((n - a) / 2, r)), e.lineTo(y, r), e.arc(y, r - y, y, Math.PI / 2, Math.PI, !1), o === D5 && (e.lineTo(0, (r + l) / 2), e.lineTo(-1 * a, r / 2), e.lineTo(0, (r - l) / 2)), e.lineTo(0, d), e.arc(d, d, d, Math.PI, Math.PI * 3 / 2, !1), e.closePath(), e.fillStrokeShape(this);
  }
  getSelfRect() {
    let e = 0, n = 0, r = this.pointerWidth(), o = this.pointerHeight(), a = this.pointerDirection(), l = this.width(), c = this.height();
    return a === j5 ? (n -= o, c += o) : a === I5 ? c += o : a === D5 ? (e -= r * 1.5, l += r) : a === O5 && (l += r * 1.5), {
      x: e,
      y: n,
      width: l,
      height: c
    };
  }
}
ya.Tag = cs;
cs.prototype.className = "Tag";
(0, Cg._registerNode)(cs);
Wc.Factory.addGetterSetter(cs, "pointerDirection", OC);
Wc.Factory.addGetterSetter(cs, "pointerWidth", 0, (0, Xh.getNumberValidator)());
Wc.Factory.addGetterSetter(cs, "pointerHeight", 0, (0, Xh.getNumberValidator)());
Wc.Factory.addGetterSetter(cs, "cornerRadius", 0, (0, Xh.getNumberOrArrayOfNumbersValidator)(4));
var c1 = {};
Object.defineProperty(c1, "__esModule", { value: !0 });
c1.Rect = void 0;
const DC = Qe, GC = Yt, UC = Xe, BC = Et, WC = Ie;
let Zc = class extends GC.Shape {
  _sceneFunc(e) {
    const n = this.cornerRadius(), r = this.width(), o = this.height();
    e.beginPath(), n ? BC.Util.drawRoundedRectPath(e, r, o, n) : e.rect(0, 0, r, o), e.closePath(), e.fillStrokeShape(this);
  }
};
c1.Rect = Zc;
Zc.prototype.className = "Rect";
(0, UC._registerNode)(Zc);
DC.Factory.addGetterSetter(Zc, "cornerRadius", 0, (0, WC.getNumberOrArrayOfNumbersValidator)(4));
var Yc = {};
Object.defineProperty(Yc, "__esModule", { value: !0 });
Yc.RegularPolygon = void 0;
const Sg = Qe, ZC = Yt, kg = Ie, YC = Xe;
class ds extends ZC.Shape {
  _sceneFunc(e) {
    const n = this._getPoints();
    e.beginPath(), e.moveTo(n[0].x, n[0].y);
    for (let r = 1; r < n.length; r++)
      e.lineTo(n[r].x, n[r].y);
    e.closePath(), e.fillStrokeShape(this);
  }
  _getPoints() {
    const e = this.attrs.sides, n = this.attrs.radius || 0, r = [];
    for (let o = 0; o < e; o++)
      r.push({
        x: n * Math.sin(o * 2 * Math.PI / e),
        y: -1 * n * Math.cos(o * 2 * Math.PI / e)
      });
    return r;
  }
  getSelfRect() {
    const e = this._getPoints();
    let n = e[0].x, r = e[0].y, o = e[0].x, a = e[0].y;
    return e.forEach((l) => {
      n = Math.min(n, l.x), r = Math.max(r, l.x), o = Math.min(o, l.y), a = Math.max(a, l.y);
    }), {
      x: n,
      y: o,
      width: r - n,
      height: a - o
    };
  }
  getWidth() {
    return this.radius() * 2;
  }
  getHeight() {
    return this.radius() * 2;
  }
  setWidth(e) {
    this.radius(e / 2);
  }
  setHeight(e) {
    this.radius(e / 2);
  }
}
Yc.RegularPolygon = ds;
ds.prototype.className = "RegularPolygon";
ds.prototype._centroid = !0;
ds.prototype._attrsAffectingSize = ["radius"];
(0, YC._registerNode)(ds);
Sg.Factory.addGetterSetter(ds, "radius", 0, (0, kg.getNumberValidator)());
Sg.Factory.addGetterSetter(ds, "sides", 0, (0, kg.getNumberValidator)());
var Kc = {};
Object.defineProperty(Kc, "__esModule", { value: !0 });
Kc.Ring = void 0;
const Mg = Qe, KC = Yt, Lg = Ie, XC = Xe, m6 = Math.PI * 2;
class fs extends KC.Shape {
  _sceneFunc(e) {
    e.beginPath(), e.arc(0, 0, this.innerRadius(), 0, m6, !1), e.moveTo(this.outerRadius(), 0), e.arc(0, 0, this.outerRadius(), m6, 0, !0), e.closePath(), e.fillStrokeShape(this);
  }
  getWidth() {
    return this.outerRadius() * 2;
  }
  getHeight() {
    return this.outerRadius() * 2;
  }
  setWidth(e) {
    this.outerRadius(e / 2);
  }
  setHeight(e) {
    this.outerRadius(e / 2);
  }
}
Kc.Ring = fs;
fs.prototype.className = "Ring";
fs.prototype._centroid = !0;
fs.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
(0, XC._registerNode)(fs);
Mg.Factory.addGetterSetter(fs, "innerRadius", 0, (0, Lg.getNumberValidator)());
Mg.Factory.addGetterSetter(fs, "outerRadius", 0, (0, Lg.getNumberValidator)());
var Xc = {};
Object.defineProperty(Xc, "__esModule", { value: !0 });
Xc.Sprite = void 0;
const hs = Qe, $C = Yt, QC = Pa, Ag = Ie, qC = Xe;
class ei extends $C.Shape {
  constructor(e) {
    super(e), this._updated = !0, this.anim = new QC.Animation(() => {
      const n = this._updated;
      return this._updated = !1, n;
    }), this.on("animationChange.konva", function() {
      this.frameIndex(0);
    }), this.on("frameIndexChange.konva", function() {
      this._updated = !0;
    }), this.on("frameRateChange.konva", function() {
      this.anim.isRunning() && (clearInterval(this.interval), this._setInterval());
    });
  }
  _sceneFunc(e) {
    const n = this.animation(), r = this.frameIndex(), o = r * 4, a = this.animations()[n], l = this.frameOffsets(), c = a[o + 0], d = a[o + 1], p = a[o + 2], y = a[o + 3], k = this.image();
    if ((this.hasFill() || this.hasStroke()) && (e.beginPath(), e.rect(0, 0, p, y), e.closePath(), e.fillStrokeShape(this)), k)
      if (l) {
        const x = l[n], w = r * 2;
        e.drawImage(k, c, d, p, y, x[w + 0], x[w + 1], p, y);
      } else
        e.drawImage(k, c, d, p, y, 0, 0, p, y);
  }
  _hitFunc(e) {
    const n = this.animation(), r = this.frameIndex(), o = r * 4, a = this.animations()[n], l = this.frameOffsets(), c = a[o + 2], d = a[o + 3];
    if (e.beginPath(), l) {
      const p = l[n], y = r * 2;
      e.rect(p[y + 0], p[y + 1], c, d);
    } else
      e.rect(0, 0, c, d);
    e.closePath(), e.fillShape(this);
  }
  _useBufferCanvas() {
    return super._useBufferCanvas(!0);
  }
  _setInterval() {
    const e = this;
    this.interval = setInterval(function() {
      e._updateIndex();
    }, 1e3 / this.frameRate());
  }
  start() {
    if (this.isRunning())
      return;
    const e = this.getLayer();
    this.anim.setLayers(e), this._setInterval(), this.anim.start();
  }
  stop() {
    this.anim.stop(), clearInterval(this.interval);
  }
  isRunning() {
    return this.anim.isRunning();
  }
  _updateIndex() {
    const e = this.frameIndex(), n = this.animation(), r = this.animations(), o = r[n], a = o.length / 4;
    e < a - 1 ? this.frameIndex(e + 1) : this.frameIndex(0);
  }
}
Xc.Sprite = ei;
ei.prototype.className = "Sprite";
(0, qC._registerNode)(ei);
hs.Factory.addGetterSetter(ei, "animation");
hs.Factory.addGetterSetter(ei, "animations");
hs.Factory.addGetterSetter(ei, "frameOffsets");
hs.Factory.addGetterSetter(ei, "image");
hs.Factory.addGetterSetter(ei, "frameIndex", 0, (0, Ag.getNumberValidator)());
hs.Factory.addGetterSetter(ei, "frameRate", 17, (0, Ag.getNumberValidator)());
hs.Factory.backCompat(ei, {
  index: "frameIndex",
  getIndex: "getFrameIndex",
  setIndex: "setFrameIndex"
});
var $c = {};
Object.defineProperty($c, "__esModule", { value: !0 });
$c.Star = void 0;
const Qh = Qe, JC = Yt, qh = Ie, ew = Xe;
class So extends JC.Shape {
  _sceneFunc(e) {
    const n = this.innerRadius(), r = this.outerRadius(), o = this.numPoints();
    e.beginPath(), e.moveTo(0, 0 - r);
    for (let a = 1; a < o * 2; a++) {
      const l = a % 2 === 0 ? r : n, c = l * Math.sin(a * Math.PI / o), d = -1 * l * Math.cos(a * Math.PI / o);
      e.lineTo(c, d);
    }
    e.closePath(), e.fillStrokeShape(this);
  }
  getWidth() {
    return this.outerRadius() * 2;
  }
  getHeight() {
    return this.outerRadius() * 2;
  }
  setWidth(e) {
    this.outerRadius(e / 2);
  }
  setHeight(e) {
    this.outerRadius(e / 2);
  }
}
$c.Star = So;
So.prototype.className = "Star";
So.prototype._centroid = !0;
So.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
(0, ew._registerNode)(So);
Qh.Factory.addGetterSetter(So, "numPoints", 5, (0, qh.getNumberValidator)());
Qh.Factory.addGetterSetter(So, "innerRadius", 0, (0, qh.getNumberValidator)());
Qh.Factory.addGetterSetter(So, "outerRadius", 0, (0, qh.getNumberValidator)());
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
Ha.Text = void 0;
Ha.stringToArray = Bo;
const G5 = Et, _n = Qe, tw = Yt, xf = Xe, ko = Ie, nw = Xe;
function Bo(t) {
  return [...t].reduce((e, n, r, o) => {
    if (new RegExp("\\p{Emoji}", "u").test(n)) {
      const a = o[r + 1];
      a && new RegExp("\\p{Emoji_Modifier}|\\u200D", "u").test(a) ? (e.push(n + a), o[r + 1] = "") : e.push(n);
    } else new RegExp("\\p{Regional_Indicator}{2}", "u").test(n + (o[r + 1] || "")) ? e.push(n + o[r + 1]) : r > 0 && new RegExp("\\p{Mn}|\\p{Me}|\\p{Mc}", "u").test(n) ? e[e.length - 1] += n : n && e.push(n);
    return e;
  }, []);
}
const Fs = "auto", rw = "center", bg = "inherit", hl = "justify", iw = "Change.konva", ow = "2d", y6 = "-", Pg = "left", sw = "text", aw = "Text", lw = "top", uw = "bottom", v6 = "middle", Eg = "normal", cw = "px ", Q0 = " ", dw = "right", x6 = "rtl", fw = "word", hw = "char", _6 = "none", _f = "…", Ng = [
  "direction",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontVariant",
  "padding",
  "align",
  "verticalAlign",
  "lineHeight",
  "text",
  "width",
  "height",
  "wrap",
  "ellipsis",
  "letterSpacing"
], pw = Ng.length;
function gw(t) {
  return t.split(",").map((e) => {
    e = e.trim();
    const n = e.indexOf(" ") >= 0, r = e.indexOf('"') >= 0 || e.indexOf("'") >= 0;
    return n && !r && (e = `"${e}"`), e;
  }).join(", ");
}
let q0;
function Cf() {
  return q0 || (q0 = G5.Util.createCanvasElement().getContext(ow), q0);
}
function mw(t) {
  t.fillText(this._partialText, this._partialTextX, this._partialTextY);
}
function yw(t) {
  t.setAttr("miterLimit", 2), t.strokeText(this._partialText, this._partialTextX, this._partialTextY);
}
function vw(t) {
  return t = t || {}, !t.fillLinearGradientColorStops && !t.fillRadialGradientColorStops && !t.fillPatternImage && (t.fill = t.fill || "black"), t;
}
let Rt = class extends tw.Shape {
  constructor(e) {
    super(vw(e)), this._partialTextX = 0, this._partialTextY = 0;
    for (let n = 0; n < pw; n++)
      this.on(Ng[n] + iw, this._setTextData);
    this._setTextData();
  }
  _sceneFunc(e) {
    const n = this.textArr, r = n.length;
    if (!this.text())
      return;
    let o = this.padding(), a = this.fontSize(), l = this.lineHeight() * a, c = this.verticalAlign(), d = this.direction(), p = 0, y = this.align(), k = this.getWidth(), x = this.letterSpacing(), w = this.fill(), m = this.textDecoration(), S = m.indexOf("underline") !== -1, b = m.indexOf("line-through") !== -1, L;
    d = d === bg ? e.direction : d;
    let M = l / 2, g = v6;
    if (xf.Konva._fixTextRendering) {
      const C = this.measureSize("M");
      g = "alphabetic", M = (C.fontBoundingBoxAscent - C.fontBoundingBoxDescent) / 2 + l / 2;
    }
    for (d === x6 && e.setAttr("direction", d), e.setAttr("font", this._getContextFont()), e.setAttr("textBaseline", g), e.setAttr("textAlign", Pg), c === v6 ? p = (this.getHeight() - r * l - o * 2) / 2 : c === uw && (p = this.getHeight() - r * l - o * 2), e.translate(o, p + o), L = 0; L < r; L++) {
      let C = 0, A = 0;
      const E = n[L], T = E.text, P = E.width, R = E.lastInParagraph;
      if (e.save(), y === dw ? C += k - P - o * 2 : y === rw && (C += (k - P - o * 2) / 2), S) {
        e.save(), e.beginPath();
        const V = xf.Konva._fixTextRendering ? Math.round(a / 4) : Math.round(a / 2), F = C, W = M + A + V;
        e.moveTo(F, W);
        const U = y === hl && !R ? k - o * 2 : P;
        e.lineTo(F + Math.round(U), W), e.lineWidth = a / 15;
        const $ = this._getLinearGradient();
        e.strokeStyle = $ || w, e.stroke(), e.restore();
      }
      if (b) {
        e.save(), e.beginPath();
        const V = xf.Konva._fixTextRendering ? -Math.round(a / 4) : 0;
        e.moveTo(C, M + A + V);
        const F = y === hl && !R ? k - o * 2 : P;
        e.lineTo(C + Math.round(F), M + A + V), e.lineWidth = a / 15;
        const W = this._getLinearGradient();
        e.strokeStyle = W || w, e.stroke(), e.restore();
      }
      if (d !== x6 && (x !== 0 || y === hl)) {
        const V = T.split(" ").length - 1, F = Bo(T);
        for (let W = 0; W < F.length; W++) {
          const U = F[W];
          U === " " && !R && y === hl && (C += (k - o * 2 - P) / V), this._partialTextX = C, this._partialTextY = M + A, this._partialText = U, e.fillStrokeShape(this), C += this.measureSize(U).width + x;
        }
      } else
        x !== 0 && e.setAttr("letterSpacing", `${x}px`), this._partialTextX = C, this._partialTextY = M + A, this._partialText = T, e.fillStrokeShape(this);
      e.restore(), r > 1 && (M += l);
    }
  }
  _hitFunc(e) {
    const n = this.getWidth(), r = this.getHeight();
    e.beginPath(), e.rect(0, 0, n, r), e.closePath(), e.fillStrokeShape(this);
  }
  setText(e) {
    const n = G5.Util._isString(e) ? e : e == null ? "" : e + "";
    return this._setAttr(sw, n), this;
  }
  getWidth() {
    return this.attrs.width === Fs || this.attrs.width === void 0 ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
  }
  getHeight() {
    return this.attrs.height === Fs || this.attrs.height === void 0 ? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2 : this.attrs.height;
  }
  getTextWidth() {
    return this.textWidth;
  }
  getTextHeight() {
    return G5.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight;
  }
  measureSize(e) {
    var n, r, o, a, l, c, d, p, y, k, x;
    let w = Cf(), m = this.fontSize(), S;
    w.save(), w.font = this._getContextFont(), S = w.measureText(e), w.restore();
    const b = m / 100;
    return {
      actualBoundingBoxAscent: (n = S.actualBoundingBoxAscent) !== null && n !== void 0 ? n : 71.58203125 * b,
      actualBoundingBoxDescent: (r = S.actualBoundingBoxDescent) !== null && r !== void 0 ? r : 0,
      actualBoundingBoxLeft: (o = S.actualBoundingBoxLeft) !== null && o !== void 0 ? o : -7.421875 * b,
      actualBoundingBoxRight: (a = S.actualBoundingBoxRight) !== null && a !== void 0 ? a : 75.732421875 * b,
      alphabeticBaseline: (l = S.alphabeticBaseline) !== null && l !== void 0 ? l : 0,
      emHeightAscent: (c = S.emHeightAscent) !== null && c !== void 0 ? c : 100 * b,
      emHeightDescent: (d = S.emHeightDescent) !== null && d !== void 0 ? d : -20 * b,
      fontBoundingBoxAscent: (p = S.fontBoundingBoxAscent) !== null && p !== void 0 ? p : 91 * b,
      fontBoundingBoxDescent: (y = S.fontBoundingBoxDescent) !== null && y !== void 0 ? y : 21 * b,
      hangingBaseline: (k = S.hangingBaseline) !== null && k !== void 0 ? k : 72.80000305175781 * b,
      ideographicBaseline: (x = S.ideographicBaseline) !== null && x !== void 0 ? x : -21 * b,
      width: S.width,
      height: m
    };
  }
  _getContextFont() {
    return this.fontStyle() + Q0 + this.fontVariant() + Q0 + (this.fontSize() + cw) + gw(this.fontFamily());
  }
  _addTextLine(e) {
    this.align() === hl && (e = e.trim());
    const r = this._getTextWidth(e);
    return this.textArr.push({
      text: e,
      width: r,
      lastInParagraph: !1
    });
  }
  _getTextWidth(e) {
    const n = this.letterSpacing(), r = e.length;
    return Cf().measureText(e).width + n * r;
  }
  _setTextData() {
    let e = this.text().split(`
`), n = +this.fontSize(), r = 0, o = this.lineHeight() * n, a = this.attrs.width, l = this.attrs.height, c = a !== Fs && a !== void 0, d = l !== Fs && l !== void 0, p = this.padding(), y = a - p * 2, k = l - p * 2, x = 0, w = this.wrap(), m = w !== _6, S = w !== hw && m, b = this.ellipsis();
    this.textArr = [], Cf().font = this._getContextFont();
    const L = b ? this._getTextWidth(_f) : 0;
    for (let M = 0, g = e.length; M < g; ++M) {
      let C = e[M], A = this._getTextWidth(C);
      if (c && A > y)
        for (; C.length > 0; ) {
          let E = 0, T = Bo(C).length, P = "", R = 0;
          for (; E < T; ) {
            const V = E + T >>> 1, F = Bo(C), W = F.slice(0, V + 1).join(""), U = this._getTextWidth(W);
            (b && d && x + o > k ? U + L : U) <= y ? (E = V + 1, P = W, R = U) : T = V;
          }
          if (P) {
            if (S) {
              const W = Bo(C), U = Bo(P), $ = W[U.length], Q = $ === Q0 || $ === y6;
              let oe;
              if (Q && R <= y)
                oe = U.length;
              else {
                const q = U.lastIndexOf(Q0), G = U.lastIndexOf(y6);
                oe = Math.max(q, G) + 1;
              }
              oe > 0 && (E = oe, P = W.slice(0, E).join(""), R = this._getTextWidth(P));
            }
            if (P = P.trimRight(), this._addTextLine(P), r = Math.max(r, R), x += o, this._shouldHandleEllipsis(x)) {
              this._tryToAddEllipsisToLastLine();
              break;
            }
            if (C = Bo(C).slice(E).join("").trimLeft(), C.length > 0 && (A = this._getTextWidth(C), A <= y)) {
              this._addTextLine(C), x += o, r = Math.max(r, A);
              break;
            }
          } else
            break;
        }
      else
        this._addTextLine(C), x += o, r = Math.max(r, A), this._shouldHandleEllipsis(x) && M < g - 1 && this._tryToAddEllipsisToLastLine();
      if (this.textArr[this.textArr.length - 1] && (this.textArr[this.textArr.length - 1].lastInParagraph = !0), d && x + o > k)
        break;
    }
    this.textHeight = n, this.textWidth = r;
  }
  _shouldHandleEllipsis(e) {
    const n = +this.fontSize(), r = this.lineHeight() * n, o = this.attrs.height, a = o !== Fs && o !== void 0, l = this.padding(), c = o - l * 2;
    return !(this.wrap() !== _6) || a && e + r > c;
  }
  _tryToAddEllipsisToLastLine() {
    const e = this.attrs.width, n = e !== Fs && e !== void 0, r = this.padding(), o = e - r * 2, a = this.ellipsis(), l = this.textArr[this.textArr.length - 1];
    !l || !a || (n && (this._getTextWidth(l.text + _f) < o || (l.text = l.text.slice(0, l.text.length - 3))), this.textArr.splice(this.textArr.length - 1, 1), this._addTextLine(l.text + _f));
  }
  getStrokeScaleEnabled() {
    return !0;
  }
  _useBufferCanvas() {
    const e = this.textDecoration().indexOf("underline") !== -1 || this.textDecoration().indexOf("line-through") !== -1, n = this.hasShadow();
    return e && n ? !0 : super._useBufferCanvas();
  }
};
Ha.Text = Rt;
Rt.prototype._fillFunc = mw;
Rt.prototype._strokeFunc = yw;
Rt.prototype.className = aw;
Rt.prototype._attrsAffectingSize = [
  "text",
  "fontSize",
  "padding",
  "wrap",
  "lineHeight",
  "letterSpacing"
];
(0, nw._registerNode)(Rt);
_n.Factory.overWriteSetter(Rt, "width", (0, ko.getNumberOrAutoValidator)());
_n.Factory.overWriteSetter(Rt, "height", (0, ko.getNumberOrAutoValidator)());
_n.Factory.addGetterSetter(Rt, "direction", bg);
_n.Factory.addGetterSetter(Rt, "fontFamily", "Arial");
_n.Factory.addGetterSetter(Rt, "fontSize", 12, (0, ko.getNumberValidator)());
_n.Factory.addGetterSetter(Rt, "fontStyle", Eg);
_n.Factory.addGetterSetter(Rt, "fontVariant", Eg);
_n.Factory.addGetterSetter(Rt, "padding", 0, (0, ko.getNumberValidator)());
_n.Factory.addGetterSetter(Rt, "align", Pg);
_n.Factory.addGetterSetter(Rt, "verticalAlign", lw);
_n.Factory.addGetterSetter(Rt, "lineHeight", 1, (0, ko.getNumberValidator)());
_n.Factory.addGetterSetter(Rt, "wrap", fw);
_n.Factory.addGetterSetter(Rt, "ellipsis", !1, (0, ko.getBooleanValidator)());
_n.Factory.addGetterSetter(Rt, "letterSpacing", 0, (0, ko.getNumberValidator)());
_n.Factory.addGetterSetter(Rt, "text", "", (0, ko.getStringValidator)());
_n.Factory.addGetterSetter(Rt, "textDecoration", "");
var Qc = {};
Object.defineProperty(Qc, "__esModule", { value: !0 });
Qc.TextPath = void 0;
const wf = Et, Er = Qe, xw = Yt, pl = Ea, Sf = Ha, Hg = Ie, _w = Xe, Cw = "", Vg = "normal";
function Tg(t) {
  t.fillText(this.partialText, 0, 0);
}
function Rg(t) {
  t.strokeText(this.partialText, 0, 0);
}
class Kt extends xw.Shape {
  constructor(e) {
    super(e), this.dummyCanvas = wf.Util.createCanvasElement(), this.dataArray = [], this._readDataAttribute(), this.on("dataChange.konva", function() {
      this._readDataAttribute(), this._setTextData();
    }), this.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva fontSizeChange.konva fontFamilyChange.konva", this._setTextData), this._setTextData();
  }
  _getTextPathLength() {
    return pl.Path.getPathLength(this.dataArray);
  }
  _getPointAtLength(e) {
    if (!this.attrs.data)
      return null;
    const n = this.pathLength;
    return e - 1 > n ? null : pl.Path.getPointAtLengthOfDataArray(e, this.dataArray);
  }
  _readDataAttribute() {
    this.dataArray = pl.Path.parsePathData(this.attrs.data), this.pathLength = this._getTextPathLength();
  }
  _sceneFunc(e) {
    e.setAttr("font", this._getContextFont()), e.setAttr("textBaseline", this.textBaseline()), e.setAttr("textAlign", "left"), e.save();
    const n = this.textDecoration(), r = this.fill(), o = this.fontSize(), a = this.glyphInfo;
    n === "underline" && e.beginPath();
    for (let l = 0; l < a.length; l++) {
      e.save();
      const c = a[l].p0;
      e.translate(c.x, c.y), e.rotate(a[l].rotation), this.partialText = a[l].text, e.fillStrokeShape(this), n === "underline" && (l === 0 && e.moveTo(0, o / 2 + 1), e.lineTo(o, o / 2 + 1)), e.restore();
    }
    n === "underline" && (e.strokeStyle = r, e.lineWidth = o / 20, e.stroke()), e.restore();
  }
  _hitFunc(e) {
    e.beginPath();
    const n = this.glyphInfo;
    if (n.length >= 1) {
      const r = n[0].p0;
      e.moveTo(r.x, r.y);
    }
    for (let r = 0; r < n.length; r++) {
      const o = n[r].p1;
      e.lineTo(o.x, o.y);
    }
    e.setAttr("lineWidth", this.fontSize()), e.setAttr("strokeStyle", this.colorKey), e.stroke();
  }
  getTextWidth() {
    return this.textWidth;
  }
  getTextHeight() {
    return wf.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight;
  }
  setText(e) {
    return Sf.Text.prototype.setText.call(this, e);
  }
  _getContextFont() {
    return Sf.Text.prototype._getContextFont.call(this);
  }
  _getTextSize(e) {
    const r = this.dummyCanvas.getContext("2d");
    r.save(), r.font = this._getContextFont();
    const o = r.measureText(e);
    return r.restore(), {
      width: o.width,
      height: parseInt(`${this.fontSize()}`, 10)
    };
  }
  _setTextData() {
    const { width: e, height: n } = this._getTextSize(this.attrs.text);
    if (this.textWidth = e, this.textHeight = n, this.glyphInfo = [], !this.attrs.data)
      return null;
    const r = this.letterSpacing(), o = this.align(), a = this.kerningFunc(), l = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * r, 0);
    let c = 0;
    o === "center" && (c = Math.max(0, this.pathLength / 2 - l / 2)), o === "right" && (c = Math.max(0, this.pathLength - l));
    const d = (0, Sf.stringToArray)(this.text());
    let p = c;
    for (let y = 0; y < d.length; y++) {
      const k = this._getPointAtLength(p);
      if (!k)
        return;
      let x = this._getTextSize(d[y]).width + r;
      if (d[y] === " " && o === "justify") {
        const M = this.text().split(" ").length - 1;
        x += (this.pathLength - l) / M;
      }
      const w = this._getPointAtLength(p + x);
      if (!w)
        return;
      const m = pl.Path.getLineLength(k.x, k.y, w.x, w.y);
      let S = 0;
      if (a)
        try {
          S = a(d[y - 1], d[y]) * this.fontSize();
        } catch {
          S = 0;
        }
      k.x += S, w.x += S, this.textWidth += S;
      const b = pl.Path.getPointOnLine(S + m / 2, k.x, k.y, w.x, w.y), L = Math.atan2(w.y - k.y, w.x - k.x);
      this.glyphInfo.push({
        transposeX: b.x,
        transposeY: b.y,
        text: d[y],
        rotation: L,
        p0: k,
        p1: w
      }), p += x;
    }
  }
  getSelfRect() {
    if (!this.glyphInfo.length)
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    const e = [];
    this.glyphInfo.forEach(function(p) {
      e.push(p.p0.x), e.push(p.p0.y), e.push(p.p1.x), e.push(p.p1.y);
    });
    let n = e[0] || 0, r = e[0] || 0, o = e[1] || 0, a = e[1] || 0, l, c;
    for (let p = 0; p < e.length / 2; p++)
      l = e[p * 2], c = e[p * 2 + 1], n = Math.min(n, l), r = Math.max(r, l), o = Math.min(o, c), a = Math.max(a, c);
    const d = this.fontSize();
    return {
      x: n - d / 2,
      y: o - d / 2,
      width: r - n + d,
      height: a - o + d
    };
  }
  destroy() {
    return wf.Util.releaseCanvas(this.dummyCanvas), super.destroy();
  }
}
Qc.TextPath = Kt;
Kt.prototype._fillFunc = Tg;
Kt.prototype._strokeFunc = Rg;
Kt.prototype._fillFuncHit = Tg;
Kt.prototype._strokeFuncHit = Rg;
Kt.prototype.className = "TextPath";
Kt.prototype._attrsAffectingSize = ["text", "fontSize", "data"];
(0, _w._registerNode)(Kt);
Er.Factory.addGetterSetter(Kt, "data");
Er.Factory.addGetterSetter(Kt, "fontFamily", "Arial");
Er.Factory.addGetterSetter(Kt, "fontSize", 12, (0, Hg.getNumberValidator)());
Er.Factory.addGetterSetter(Kt, "fontStyle", Vg);
Er.Factory.addGetterSetter(Kt, "align", "left");
Er.Factory.addGetterSetter(Kt, "letterSpacing", 0, (0, Hg.getNumberValidator)());
Er.Factory.addGetterSetter(Kt, "textBaseline", "middle");
Er.Factory.addGetterSetter(Kt, "fontVariant", Vg);
Er.Factory.addGetterSetter(Kt, "text", Cw);
Er.Factory.addGetterSetter(Kt, "textDecoration", "");
Er.Factory.addGetterSetter(Kt, "kerningFunc", void 0);
var qc = {};
Object.defineProperty(qc, "__esModule", { value: !0 });
qc.Transformer = void 0;
const dt = Et, st = Qe, C6 = kt, ww = Yt, Sw = c1, w6 = ba, Cr = Xe, Mo = Ie, kw = Xe, zg = "tr-konva", Mw = [
  "resizeEnabledChange",
  "rotateAnchorOffsetChange",
  "rotateEnabledChange",
  "enabledAnchorsChange",
  "anchorSizeChange",
  "borderEnabledChange",
  "borderStrokeChange",
  "borderStrokeWidthChange",
  "borderDashChange",
  "anchorStrokeChange",
  "anchorStrokeWidthChange",
  "anchorFillChange",
  "anchorCornerRadiusChange",
  "ignoreStrokeChange",
  "anchorStyleFuncChange"
].map((t) => t + `.${zg}`).join(" "), S6 = "nodesRect", Lw = [
  "widthChange",
  "heightChange",
  "scaleXChange",
  "scaleYChange",
  "skewXChange",
  "skewYChange",
  "rotationChange",
  "offsetXChange",
  "offsetYChange",
  "transformsEnabledChange",
  "strokeWidthChange"
], Aw = {
  "top-left": -45,
  "top-center": 0,
  "top-right": 45,
  "middle-right": -90,
  "middle-left": 90,
  "bottom-left": -135,
  "bottom-center": 180,
  "bottom-right": 135
}, bw = "ontouchstart" in Cr.Konva._global;
function Pw(t, e, n) {
  if (t === "rotater")
    return n;
  e += dt.Util.degToRad(Aw[t] || 0);
  const r = (dt.Util.radToDeg(e) % 360 + 360) % 360;
  return dt.Util._inRange(r, 315 + 22.5, 360) || dt.Util._inRange(r, 0, 22.5) ? "ns-resize" : dt.Util._inRange(r, 45 - 22.5, 45 + 22.5) ? "nesw-resize" : dt.Util._inRange(r, 90 - 22.5, 90 + 22.5) ? "ew-resize" : dt.Util._inRange(r, 135 - 22.5, 135 + 22.5) ? "nwse-resize" : dt.Util._inRange(r, 180 - 22.5, 180 + 22.5) ? "ns-resize" : dt.Util._inRange(r, 225 - 22.5, 225 + 22.5) ? "nesw-resize" : dt.Util._inRange(r, 270 - 22.5, 270 + 22.5) ? "ew-resize" : dt.Util._inRange(r, 315 - 22.5, 315 + 22.5) ? "nwse-resize" : (dt.Util.error("Transformer has unknown angle for cursor detection: " + r), "pointer");
}
const $u = [
  "top-left",
  "top-center",
  "top-right",
  "middle-right",
  "middle-left",
  "bottom-left",
  "bottom-center",
  "bottom-right"
];
function Ew(t) {
  return {
    x: t.x + t.width / 2 * Math.cos(t.rotation) + t.height / 2 * Math.sin(-t.rotation),
    y: t.y + t.height / 2 * Math.cos(t.rotation) + t.width / 2 * Math.sin(t.rotation)
  };
}
function Fg(t, e, n) {
  const r = n.x + (t.x - n.x) * Math.cos(e) - (t.y - n.y) * Math.sin(e), o = n.y + (t.x - n.x) * Math.sin(e) + (t.y - n.y) * Math.cos(e);
  return {
    ...t,
    rotation: t.rotation + e,
    x: r,
    y: o
  };
}
function Nw(t, e) {
  const n = Ew(t);
  return Fg(t, e, n);
}
function Hw(t, e, n) {
  let r = e;
  for (let o = 0; o < t.length; o++) {
    const a = Cr.Konva.getAngle(t[o]), l = Math.abs(a - e) % (Math.PI * 2);
    Math.min(l, Math.PI * 2 - l) < n && (r = a);
  }
  return r;
}
let U5 = 0;
class tt extends w6.Group {
  constructor(e) {
    super(e), this._movingAnchorName = null, this._transforming = !1, this._createElements(), this._handleMouseMove = this._handleMouseMove.bind(this), this._handleMouseUp = this._handleMouseUp.bind(this), this.update = this.update.bind(this), this.on(Mw, this.update), this.getNode() && this.update();
  }
  attachTo(e) {
    return this.setNode(e), this;
  }
  setNode(e) {
    return dt.Util.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead."), this.setNodes([e]);
  }
  getNode() {
    return this._nodes && this._nodes[0];
  }
  _getEventNamespace() {
    return zg + this._id;
  }
  setNodes(e = []) {
    this._nodes && this._nodes.length && this.detach();
    const n = e.filter((o) => o.isAncestorOf(this) ? (dt.Util.error("Konva.Transformer cannot be an a child of the node you are trying to attach"), !1) : !0);
    return this._nodes = e = n, e.length === 1 && this.useSingleNodeRotation() ? this.rotation(e[0].getAbsoluteRotation()) : this.rotation(0), this._nodes.forEach((o) => {
      const a = () => {
        this.nodes().length === 1 && this.useSingleNodeRotation() && this.rotation(this.nodes()[0].getAbsoluteRotation()), this._resetTransformCache(), !this._transforming && !this.isDragging() && this.update();
      };
      if (o._attrsAffectingSize.length) {
        const l = o._attrsAffectingSize.map((c) => c + "Change." + this._getEventNamespace()).join(" ");
        o.on(l, a);
      }
      o.on(Lw.map((l) => l + `.${this._getEventNamespace()}`).join(" "), a), o.on(`absoluteTransformChange.${this._getEventNamespace()}`, a), this._proxyDrag(o);
    }), this._resetTransformCache(), !!this.findOne(".top-left") && this.update(), this;
  }
  _proxyDrag(e) {
    let n;
    e.on(`dragstart.${this._getEventNamespace()}`, (r) => {
      n = e.getAbsolutePosition(), !this.isDragging() && e !== this.findOne(".back") && this.startDrag(r, !1);
    }), e.on(`dragmove.${this._getEventNamespace()}`, (r) => {
      if (!n)
        return;
      const o = e.getAbsolutePosition(), a = o.x - n.x, l = o.y - n.y;
      this.nodes().forEach((c) => {
        if (c === e || c.isDragging())
          return;
        const d = c.getAbsolutePosition();
        c.setAbsolutePosition({
          x: d.x + a,
          y: d.y + l
        }), c.startDrag(r);
      }), n = null;
    });
  }
  getNodes() {
    return this._nodes || [];
  }
  getActiveAnchor() {
    return this._movingAnchorName;
  }
  detach() {
    this._nodes && this._nodes.forEach((e) => {
      e.off("." + this._getEventNamespace());
    }), this._nodes = [], this._resetTransformCache();
  }
  _resetTransformCache() {
    this._clearCache(S6), this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform");
  }
  _getNodeRect() {
    return this._getCache(S6, this.__getNodeRect);
  }
  __getNodeShape(e, n = this.rotation(), r) {
    const o = e.getClientRect({
      skipTransform: !0,
      skipShadow: !0,
      skipStroke: this.ignoreStroke()
    }), a = e.getAbsoluteScale(r), l = e.getAbsolutePosition(r), c = o.x * a.x - e.offsetX() * a.x, d = o.y * a.y - e.offsetY() * a.y, p = (Cr.Konva.getAngle(e.getAbsoluteRotation()) + Math.PI * 2) % (Math.PI * 2), y = {
      x: l.x + c * Math.cos(p) + d * Math.sin(-p),
      y: l.y + d * Math.cos(p) + c * Math.sin(p),
      width: o.width * a.x,
      height: o.height * a.y,
      rotation: p
    };
    return Fg(y, -Cr.Konva.getAngle(n), {
      x: 0,
      y: 0
    });
  }
  __getNodeRect() {
    if (!this.getNode())
      return {
        x: -1e8,
        y: -1e8,
        width: 0,
        height: 0,
        rotation: 0
      };
    const n = [];
    this.nodes().map((p) => {
      const y = p.getClientRect({
        skipTransform: !0,
        skipShadow: !0,
        skipStroke: this.ignoreStroke()
      }), k = [
        { x: y.x, y: y.y },
        { x: y.x + y.width, y: y.y },
        { x: y.x + y.width, y: y.y + y.height },
        { x: y.x, y: y.y + y.height }
      ], x = p.getAbsoluteTransform();
      k.forEach(function(w) {
        const m = x.point(w);
        n.push(m);
      });
    });
    const r = new dt.Transform();
    r.rotate(-Cr.Konva.getAngle(this.rotation()));
    let o = 1 / 0, a = 1 / 0, l = -1 / 0, c = -1 / 0;
    n.forEach(function(p) {
      const y = r.point(p);
      o === void 0 && (o = l = y.x, a = c = y.y), o = Math.min(o, y.x), a = Math.min(a, y.y), l = Math.max(l, y.x), c = Math.max(c, y.y);
    }), r.invert();
    const d = r.point({ x: o, y: a });
    return {
      x: d.x,
      y: d.y,
      width: l - o,
      height: c - a,
      rotation: Cr.Konva.getAngle(this.rotation())
    };
  }
  getX() {
    return this._getNodeRect().x;
  }
  getY() {
    return this._getNodeRect().y;
  }
  getWidth() {
    return this._getNodeRect().width;
  }
  getHeight() {
    return this._getNodeRect().height;
  }
  _createElements() {
    this._createBack(), $u.forEach((e) => {
      this._createAnchor(e);
    }), this._createAnchor("rotater");
  }
  _createAnchor(e) {
    const n = new Sw.Rect({
      stroke: "rgb(0, 161, 255)",
      fill: "white",
      strokeWidth: 1,
      name: e + " _anchor",
      dragDistance: 0,
      draggable: !0,
      hitStrokeWidth: bw ? 10 : "auto"
    }), r = this;
    n.on("mousedown touchstart", function(o) {
      r._handleMouseDown(o);
    }), n.on("dragstart", (o) => {
      n.stopDrag(), o.cancelBubble = !0;
    }), n.on("dragend", (o) => {
      o.cancelBubble = !0;
    }), n.on("mouseenter", () => {
      const o = Cr.Konva.getAngle(this.rotation()), a = this.rotateAnchorCursor(), l = Pw(e, o, a);
      n.getStage().content && (n.getStage().content.style.cursor = l), this._cursorChange = !0;
    }), n.on("mouseout", () => {
      n.getStage().content && (n.getStage().content.style.cursor = ""), this._cursorChange = !1;
    }), this.add(n);
  }
  _createBack() {
    const e = new ww.Shape({
      name: "back",
      width: 0,
      height: 0,
      draggable: !0,
      sceneFunc(n, r) {
        const o = r.getParent(), a = o.padding();
        n.beginPath(), n.rect(-a, -a, r.width() + a * 2, r.height() + a * 2), n.moveTo(r.width() / 2, -a), o.rotateEnabled() && o.rotateLineVisible() && n.lineTo(r.width() / 2, -o.rotateAnchorOffset() * dt.Util._sign(r.height()) - a), n.fillStrokeShape(r);
      },
      hitFunc: (n, r) => {
        if (!this.shouldOverdrawWholeArea())
          return;
        const o = this.padding();
        n.beginPath(), n.rect(-o, -o, r.width() + o * 2, r.height() + o * 2), n.fillStrokeShape(r);
      }
    });
    this.add(e), this._proxyDrag(e), e.on("dragstart", (n) => {
      n.cancelBubble = !0;
    }), e.on("dragmove", (n) => {
      n.cancelBubble = !0;
    }), e.on("dragend", (n) => {
      n.cancelBubble = !0;
    }), this.on("dragmove", (n) => {
      this.update();
    });
  }
  _handleMouseDown(e) {
    if (this._transforming)
      return;
    this._movingAnchorName = e.target.name().split(" ")[0];
    const n = this._getNodeRect(), r = n.width, o = n.height, a = Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2));
    this.sin = Math.abs(o / a), this.cos = Math.abs(r / a), typeof window < "u" && (window.addEventListener("mousemove", this._handleMouseMove), window.addEventListener("touchmove", this._handleMouseMove), window.addEventListener("mouseup", this._handleMouseUp, !0), window.addEventListener("touchend", this._handleMouseUp, !0)), this._transforming = !0;
    const l = e.target.getAbsolutePosition(), c = e.target.getStage().getPointerPosition();
    this._anchorDragOffset = {
      x: c.x - l.x,
      y: c.y - l.y
    }, U5++, this._fire("transformstart", { evt: e.evt, target: this.getNode() }), this._nodes.forEach((d) => {
      d._fire("transformstart", { evt: e.evt, target: d });
    });
  }
  _handleMouseMove(e) {
    let n, r, o;
    const a = this.findOne("." + this._movingAnchorName), l = a.getStage();
    l.setPointersPositions(e);
    const c = l.getPointerPosition();
    let d = {
      x: c.x - this._anchorDragOffset.x,
      y: c.y - this._anchorDragOffset.y
    };
    const p = a.getAbsolutePosition();
    this.anchorDragBoundFunc() && (d = this.anchorDragBoundFunc()(p, d, e)), a.setAbsolutePosition(d);
    const y = a.getAbsolutePosition();
    if (p.x === y.x && p.y === y.y)
      return;
    if (this._movingAnchorName === "rotater") {
      const M = this._getNodeRect();
      n = a.x() - M.width / 2, r = -a.y() + M.height / 2;
      let g = Math.atan2(-r, n) + Math.PI / 2;
      M.height < 0 && (g -= Math.PI);
      const A = Cr.Konva.getAngle(this.rotation()) + g, E = Cr.Konva.getAngle(this.rotationSnapTolerance()), P = Hw(this.rotationSnaps(), A, E) - M.rotation, R = Nw(M, P);
      this._fitNodesInto(R, e);
      return;
    }
    const k = this.shiftBehavior();
    let x;
    k === "inverted" ? x = this.keepRatio() && !e.shiftKey : k === "none" ? x = this.keepRatio() : x = this.keepRatio() || e.shiftKey;
    let w = this.centeredScaling() || e.altKey;
    if (this._movingAnchorName === "top-left") {
      if (x) {
        const M = w ? {
          x: this.width() / 2,
          y: this.height() / 2
        } : {
          x: this.findOne(".bottom-right").x(),
          y: this.findOne(".bottom-right").y()
        };
        o = Math.sqrt(Math.pow(M.x - a.x(), 2) + Math.pow(M.y - a.y(), 2));
        const g = this.findOne(".top-left").x() > M.x ? -1 : 1, C = this.findOne(".top-left").y() > M.y ? -1 : 1;
        n = o * this.cos * g, r = o * this.sin * C, this.findOne(".top-left").x(M.x - n), this.findOne(".top-left").y(M.y - r);
      }
    } else if (this._movingAnchorName === "top-center")
      this.findOne(".top-left").y(a.y());
    else if (this._movingAnchorName === "top-right") {
      if (x) {
        const M = w ? {
          x: this.width() / 2,
          y: this.height() / 2
        } : {
          x: this.findOne(".bottom-left").x(),
          y: this.findOne(".bottom-left").y()
        };
        o = Math.sqrt(Math.pow(a.x() - M.x, 2) + Math.pow(M.y - a.y(), 2));
        const g = this.findOne(".top-right").x() < M.x ? -1 : 1, C = this.findOne(".top-right").y() > M.y ? -1 : 1;
        n = o * this.cos * g, r = o * this.sin * C, this.findOne(".top-right").x(M.x + n), this.findOne(".top-right").y(M.y - r);
      }
      var m = a.position();
      this.findOne(".top-left").y(m.y), this.findOne(".bottom-right").x(m.x);
    } else if (this._movingAnchorName === "middle-left")
      this.findOne(".top-left").x(a.x());
    else if (this._movingAnchorName === "middle-right")
      this.findOne(".bottom-right").x(a.x());
    else if (this._movingAnchorName === "bottom-left") {
      if (x) {
        const M = w ? {
          x: this.width() / 2,
          y: this.height() / 2
        } : {
          x: this.findOne(".top-right").x(),
          y: this.findOne(".top-right").y()
        };
        o = Math.sqrt(Math.pow(M.x - a.x(), 2) + Math.pow(a.y() - M.y, 2));
        const g = M.x < a.x() ? -1 : 1, C = a.y() < M.y ? -1 : 1;
        n = o * this.cos * g, r = o * this.sin * C, a.x(M.x - n), a.y(M.y + r);
      }
      m = a.position(), this.findOne(".top-left").x(m.x), this.findOne(".bottom-right").y(m.y);
    } else if (this._movingAnchorName === "bottom-center")
      this.findOne(".bottom-right").y(a.y());
    else if (this._movingAnchorName === "bottom-right") {
      if (x) {
        const M = w ? {
          x: this.width() / 2,
          y: this.height() / 2
        } : {
          x: this.findOne(".top-left").x(),
          y: this.findOne(".top-left").y()
        };
        o = Math.sqrt(Math.pow(a.x() - M.x, 2) + Math.pow(a.y() - M.y, 2));
        const g = this.findOne(".bottom-right").x() < M.x ? -1 : 1, C = this.findOne(".bottom-right").y() < M.y ? -1 : 1;
        n = o * this.cos * g, r = o * this.sin * C, this.findOne(".bottom-right").x(M.x + n), this.findOne(".bottom-right").y(M.y + r);
      }
    } else
      console.error(new Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
    if (w = this.centeredScaling() || e.altKey, w) {
      const M = this.findOne(".top-left"), g = this.findOne(".bottom-right"), C = M.x(), A = M.y(), E = this.getWidth() - g.x(), T = this.getHeight() - g.y();
      g.move({
        x: -C,
        y: -A
      }), M.move({
        x: E,
        y: T
      });
    }
    const S = this.findOne(".top-left").getAbsolutePosition();
    n = S.x, r = S.y;
    const b = this.findOne(".bottom-right").x() - this.findOne(".top-left").x(), L = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
    this._fitNodesInto({
      x: n,
      y: r,
      width: b,
      height: L,
      rotation: Cr.Konva.getAngle(this.rotation())
    }, e);
  }
  _handleMouseUp(e) {
    this._removeEvents(e);
  }
  getAbsoluteTransform() {
    return this.getTransform();
  }
  _removeEvents(e) {
    var n;
    if (this._transforming) {
      this._transforming = !1, typeof window < "u" && (window.removeEventListener("mousemove", this._handleMouseMove), window.removeEventListener("touchmove", this._handleMouseMove), window.removeEventListener("mouseup", this._handleMouseUp, !0), window.removeEventListener("touchend", this._handleMouseUp, !0));
      const r = this.getNode();
      U5--, this._fire("transformend", { evt: e, target: r }), (n = this.getLayer()) === null || n === void 0 || n.batchDraw(), r && this._nodes.forEach((o) => {
        var a;
        o._fire("transformend", { evt: e, target: o }), (a = o.getLayer()) === null || a === void 0 || a.batchDraw();
      }), this._movingAnchorName = null;
    }
  }
  _fitNodesInto(e, n) {
    const r = this._getNodeRect(), o = 1;
    if (dt.Util._inRange(e.width, -this.padding() * 2 - o, o)) {
      this.update();
      return;
    }
    if (dt.Util._inRange(e.height, -this.padding() * 2 - o, o)) {
      this.update();
      return;
    }
    const a = new dt.Transform();
    if (a.rotate(Cr.Konva.getAngle(this.rotation())), this._movingAnchorName && e.width < 0 && this._movingAnchorName.indexOf("left") >= 0) {
      const x = a.point({
        x: -this.padding() * 2,
        y: 0
      });
      e.x += x.x, e.y += x.y, e.width += this.padding() * 2, this._movingAnchorName = this._movingAnchorName.replace("left", "right"), this._anchorDragOffset.x -= x.x, this._anchorDragOffset.y -= x.y;
    } else if (this._movingAnchorName && e.width < 0 && this._movingAnchorName.indexOf("right") >= 0) {
      const x = a.point({
        x: this.padding() * 2,
        y: 0
      });
      this._movingAnchorName = this._movingAnchorName.replace("right", "left"), this._anchorDragOffset.x -= x.x, this._anchorDragOffset.y -= x.y, e.width += this.padding() * 2;
    }
    if (this._movingAnchorName && e.height < 0 && this._movingAnchorName.indexOf("top") >= 0) {
      const x = a.point({
        x: 0,
        y: -this.padding() * 2
      });
      e.x += x.x, e.y += x.y, this._movingAnchorName = this._movingAnchorName.replace("top", "bottom"), this._anchorDragOffset.x -= x.x, this._anchorDragOffset.y -= x.y, e.height += this.padding() * 2;
    } else if (this._movingAnchorName && e.height < 0 && this._movingAnchorName.indexOf("bottom") >= 0) {
      const x = a.point({
        x: 0,
        y: this.padding() * 2
      });
      this._movingAnchorName = this._movingAnchorName.replace("bottom", "top"), this._anchorDragOffset.x -= x.x, this._anchorDragOffset.y -= x.y, e.height += this.padding() * 2;
    }
    if (this.boundBoxFunc()) {
      const x = this.boundBoxFunc()(r, e);
      x ? e = x : dt.Util.warn("boundBoxFunc returned falsy. You should return new bound rect from it!");
    }
    const l = 1e7, c = new dt.Transform();
    c.translate(r.x, r.y), c.rotate(r.rotation), c.scale(r.width / l, r.height / l);
    const d = new dt.Transform(), p = e.width / l, y = e.height / l;
    this.flipEnabled() === !1 ? (d.translate(e.x, e.y), d.rotate(e.rotation), d.translate(e.width < 0 ? e.width : 0, e.height < 0 ? e.height : 0), d.scale(Math.abs(p), Math.abs(y))) : (d.translate(e.x, e.y), d.rotate(e.rotation), d.scale(p, y));
    const k = d.multiply(c.invert());
    this._nodes.forEach((x) => {
      var w;
      const m = x.getParent().getAbsoluteTransform(), S = x.getTransform().copy();
      S.translate(x.offsetX(), x.offsetY());
      const b = new dt.Transform();
      b.multiply(m.copy().invert()).multiply(k).multiply(m).multiply(S);
      const L = b.decompose();
      x.setAttrs(L), (w = x.getLayer()) === null || w === void 0 || w.batchDraw();
    }), this.rotation(dt.Util._getRotation(e.rotation)), this._nodes.forEach((x) => {
      this._fire("transform", { evt: n, target: x }), x._fire("transform", { evt: n, target: x });
    }), this._resetTransformCache(), this.update(), this.getLayer().batchDraw();
  }
  forceUpdate() {
    this._resetTransformCache(), this.update();
  }
  _batchChangeChild(e, n) {
    this.findOne(e).setAttrs(n);
  }
  update() {
    var e;
    const n = this._getNodeRect();
    this.rotation(dt.Util._getRotation(n.rotation));
    const r = n.width, o = n.height, a = this.enabledAnchors(), l = this.resizeEnabled(), c = this.padding(), d = this.anchorSize(), p = this.find("._anchor");
    p.forEach((k) => {
      k.setAttrs({
        width: d,
        height: d,
        offsetX: d / 2,
        offsetY: d / 2,
        stroke: this.anchorStroke(),
        strokeWidth: this.anchorStrokeWidth(),
        fill: this.anchorFill(),
        cornerRadius: this.anchorCornerRadius()
      });
    }), this._batchChangeChild(".top-left", {
      x: 0,
      y: 0,
      offsetX: d / 2 + c,
      offsetY: d / 2 + c,
      visible: l && a.indexOf("top-left") >= 0
    }), this._batchChangeChild(".top-center", {
      x: r / 2,
      y: 0,
      offsetY: d / 2 + c,
      visible: l && a.indexOf("top-center") >= 0
    }), this._batchChangeChild(".top-right", {
      x: r,
      y: 0,
      offsetX: d / 2 - c,
      offsetY: d / 2 + c,
      visible: l && a.indexOf("top-right") >= 0
    }), this._batchChangeChild(".middle-left", {
      x: 0,
      y: o / 2,
      offsetX: d / 2 + c,
      visible: l && a.indexOf("middle-left") >= 0
    }), this._batchChangeChild(".middle-right", {
      x: r,
      y: o / 2,
      offsetX: d / 2 - c,
      visible: l && a.indexOf("middle-right") >= 0
    }), this._batchChangeChild(".bottom-left", {
      x: 0,
      y: o,
      offsetX: d / 2 + c,
      offsetY: d / 2 - c,
      visible: l && a.indexOf("bottom-left") >= 0
    }), this._batchChangeChild(".bottom-center", {
      x: r / 2,
      y: o,
      offsetY: d / 2 - c,
      visible: l && a.indexOf("bottom-center") >= 0
    }), this._batchChangeChild(".bottom-right", {
      x: r,
      y: o,
      offsetX: d / 2 - c,
      offsetY: d / 2 - c,
      visible: l && a.indexOf("bottom-right") >= 0
    }), this._batchChangeChild(".rotater", {
      x: r / 2,
      y: -this.rotateAnchorOffset() * dt.Util._sign(o) - c,
      visible: this.rotateEnabled()
    }), this._batchChangeChild(".back", {
      width: r,
      height: o,
      visible: this.borderEnabled(),
      stroke: this.borderStroke(),
      strokeWidth: this.borderStrokeWidth(),
      dash: this.borderDash(),
      x: 0,
      y: 0
    });
    const y = this.anchorStyleFunc();
    y && p.forEach((k) => {
      y(k);
    }), (e = this.getLayer()) === null || e === void 0 || e.batchDraw();
  }
  isTransforming() {
    return this._transforming;
  }
  stopTransform() {
    if (this._transforming) {
      this._removeEvents();
      const e = this.findOne("." + this._movingAnchorName);
      e && e.stopDrag();
    }
  }
  destroy() {
    return this.getStage() && this._cursorChange && this.getStage().content && (this.getStage().content.style.cursor = ""), w6.Group.prototype.destroy.call(this), this.detach(), this._removeEvents(), this;
  }
  toObject() {
    return C6.Node.prototype.toObject.call(this);
  }
  clone(e) {
    return C6.Node.prototype.clone.call(this, e);
  }
  getClientRect() {
    return this.nodes().length > 0 ? super.getClientRect() : { x: 0, y: 0, width: 0, height: 0 };
  }
}
qc.Transformer = tt;
tt.isTransforming = () => U5 > 0;
function Vw(t) {
  return t instanceof Array || dt.Util.warn("enabledAnchors value should be an array"), t instanceof Array && t.forEach(function(e) {
    $u.indexOf(e) === -1 && dt.Util.warn("Unknown anchor name: " + e + ". Available names are: " + $u.join(", "));
  }), t || [];
}
tt.prototype.className = "Transformer";
(0, kw._registerNode)(tt);
st.Factory.addGetterSetter(tt, "enabledAnchors", $u, Vw);
st.Factory.addGetterSetter(tt, "flipEnabled", !0, (0, Mo.getBooleanValidator)());
st.Factory.addGetterSetter(tt, "resizeEnabled", !0);
st.Factory.addGetterSetter(tt, "anchorSize", 10, (0, Mo.getNumberValidator)());
st.Factory.addGetterSetter(tt, "rotateEnabled", !0);
st.Factory.addGetterSetter(tt, "rotateLineVisible", !0);
st.Factory.addGetterSetter(tt, "rotationSnaps", []);
st.Factory.addGetterSetter(tt, "rotateAnchorOffset", 50, (0, Mo.getNumberValidator)());
st.Factory.addGetterSetter(tt, "rotateAnchorCursor", "crosshair");
st.Factory.addGetterSetter(tt, "rotationSnapTolerance", 5, (0, Mo.getNumberValidator)());
st.Factory.addGetterSetter(tt, "borderEnabled", !0);
st.Factory.addGetterSetter(tt, "anchorStroke", "rgb(0, 161, 255)");
st.Factory.addGetterSetter(tt, "anchorStrokeWidth", 1, (0, Mo.getNumberValidator)());
st.Factory.addGetterSetter(tt, "anchorFill", "white");
st.Factory.addGetterSetter(tt, "anchorCornerRadius", 0, (0, Mo.getNumberValidator)());
st.Factory.addGetterSetter(tt, "borderStroke", "rgb(0, 161, 255)");
st.Factory.addGetterSetter(tt, "borderStrokeWidth", 1, (0, Mo.getNumberValidator)());
st.Factory.addGetterSetter(tt, "borderDash");
st.Factory.addGetterSetter(tt, "keepRatio", !0);
st.Factory.addGetterSetter(tt, "shiftBehavior", "default");
st.Factory.addGetterSetter(tt, "centeredScaling", !1);
st.Factory.addGetterSetter(tt, "ignoreStroke", !1);
st.Factory.addGetterSetter(tt, "padding", 0, (0, Mo.getNumberValidator)());
st.Factory.addGetterSetter(tt, "nodes");
st.Factory.addGetterSetter(tt, "node");
st.Factory.addGetterSetter(tt, "boundBoxFunc");
st.Factory.addGetterSetter(tt, "anchorDragBoundFunc");
st.Factory.addGetterSetter(tt, "anchorStyleFunc");
st.Factory.addGetterSetter(tt, "shouldOverdrawWholeArea", !1);
st.Factory.addGetterSetter(tt, "useSingleNodeRotation", !0);
st.Factory.backCompat(tt, {
  lineEnabled: "borderEnabled",
  rotateHandlerOffset: "rotateAnchorOffset",
  enabledHandlers: "enabledAnchors"
});
var Jc = {};
Object.defineProperty(Jc, "__esModule", { value: !0 });
Jc.Wedge = void 0;
const e2 = Qe, Tw = Yt, Rw = Xe, jg = Ie, zw = Xe;
class Pi extends Tw.Shape {
  _sceneFunc(e) {
    e.beginPath(), e.arc(0, 0, this.radius(), 0, Rw.Konva.getAngle(this.angle()), this.clockwise()), e.lineTo(0, 0), e.closePath(), e.fillStrokeShape(this);
  }
  getWidth() {
    return this.radius() * 2;
  }
  getHeight() {
    return this.radius() * 2;
  }
  setWidth(e) {
    this.radius(e / 2);
  }
  setHeight(e) {
    this.radius(e / 2);
  }
}
Jc.Wedge = Pi;
Pi.prototype.className = "Wedge";
Pi.prototype._centroid = !0;
Pi.prototype._attrsAffectingSize = ["radius"];
(0, zw._registerNode)(Pi);
e2.Factory.addGetterSetter(Pi, "radius", 0, (0, jg.getNumberValidator)());
e2.Factory.addGetterSetter(Pi, "angle", 0, (0, jg.getNumberValidator)());
e2.Factory.addGetterSetter(Pi, "clockwise", !1);
e2.Factory.backCompat(Pi, {
  angleDeg: "angle",
  getAngleDeg: "getAngle",
  setAngleDeg: "setAngle"
});
var t2 = {};
Object.defineProperty(t2, "__esModule", { value: !0 });
t2.Blur = void 0;
const k6 = Qe, Fw = kt, jw = Ie;
function M6() {
  this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null;
}
const Ow = [
  512,
  512,
  456,
  512,
  328,
  456,
  335,
  512,
  405,
  328,
  271,
  456,
  388,
  335,
  292,
  512,
  454,
  405,
  364,
  328,
  298,
  271,
  496,
  456,
  420,
  388,
  360,
  335,
  312,
  292,
  273,
  512,
  482,
  454,
  428,
  405,
  383,
  364,
  345,
  328,
  312,
  298,
  284,
  271,
  259,
  496,
  475,
  456,
  437,
  420,
  404,
  388,
  374,
  360,
  347,
  335,
  323,
  312,
  302,
  292,
  282,
  273,
  265,
  512,
  497,
  482,
  468,
  454,
  441,
  428,
  417,
  405,
  394,
  383,
  373,
  364,
  354,
  345,
  337,
  328,
  320,
  312,
  305,
  298,
  291,
  284,
  278,
  271,
  265,
  259,
  507,
  496,
  485,
  475,
  465,
  456,
  446,
  437,
  428,
  420,
  412,
  404,
  396,
  388,
  381,
  374,
  367,
  360,
  354,
  347,
  341,
  335,
  329,
  323,
  318,
  312,
  307,
  302,
  297,
  292,
  287,
  282,
  278,
  273,
  269,
  265,
  261,
  512,
  505,
  497,
  489,
  482,
  475,
  468,
  461,
  454,
  447,
  441,
  435,
  428,
  422,
  417,
  411,
  405,
  399,
  394,
  389,
  383,
  378,
  373,
  368,
  364,
  359,
  354,
  350,
  345,
  341,
  337,
  332,
  328,
  324,
  320,
  316,
  312,
  309,
  305,
  301,
  298,
  294,
  291,
  287,
  284,
  281,
  278,
  274,
  271,
  268,
  265,
  262,
  259,
  257,
  507,
  501,
  496,
  491,
  485,
  480,
  475,
  470,
  465,
  460,
  456,
  451,
  446,
  442,
  437,
  433,
  428,
  424,
  420,
  416,
  412,
  408,
  404,
  400,
  396,
  392,
  388,
  385,
  381,
  377,
  374,
  370,
  367,
  363,
  360,
  357,
  354,
  350,
  347,
  344,
  341,
  338,
  335,
  332,
  329,
  326,
  323,
  320,
  318,
  315,
  312,
  310,
  307,
  304,
  302,
  299,
  297,
  294,
  292,
  289,
  287,
  285,
  282,
  280,
  278,
  275,
  273,
  271,
  269,
  267,
  265,
  263,
  261,
  259
], Iw = [
  9,
  11,
  12,
  13,
  13,
  14,
  14,
  15,
  15,
  15,
  15,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  18,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24
];
function Dw(t, e) {
  const n = t.data, r = t.width, o = t.height;
  let a, l, c, d, p, y, k, x, w, m, S, b, L, M, g, C, A, E, T, P;
  const R = e + e + 1, V = r - 1, F = o - 1, W = e + 1, U = W * (W + 1) / 2, $ = new M6(), Q = Ow[e], oe = Iw[e];
  let q = null, G = $, Y = null, D = null;
  for (let ee = 1; ee < R; ee++)
    G = G.next = new M6(), ee === W && (q = G);
  G.next = $, c = l = 0;
  for (let ee = 0; ee < o; ee++) {
    b = L = M = g = d = p = y = k = 0, x = W * (C = n[l]), w = W * (A = n[l + 1]), m = W * (E = n[l + 2]), S = W * (T = n[l + 3]), d += U * C, p += U * A, y += U * E, k += U * T, G = $;
    for (let re = 0; re < W; re++)
      G.r = C, G.g = A, G.b = E, G.a = T, G = G.next;
    for (let re = 1; re < W; re++)
      a = l + ((V < re ? V : re) << 2), d += (G.r = C = n[a]) * (P = W - re), p += (G.g = A = n[a + 1]) * P, y += (G.b = E = n[a + 2]) * P, k += (G.a = T = n[a + 3]) * P, b += C, L += A, M += E, g += T, G = G.next;
    Y = $, D = q;
    for (let re = 0; re < r; re++)
      n[l + 3] = T = k * Q >> oe, T !== 0 ? (T = 255 / T, n[l] = (d * Q >> oe) * T, n[l + 1] = (p * Q >> oe) * T, n[l + 2] = (y * Q >> oe) * T) : n[l] = n[l + 1] = n[l + 2] = 0, d -= x, p -= w, y -= m, k -= S, x -= Y.r, w -= Y.g, m -= Y.b, S -= Y.a, a = c + ((a = re + e + 1) < V ? a : V) << 2, b += Y.r = n[a], L += Y.g = n[a + 1], M += Y.b = n[a + 2], g += Y.a = n[a + 3], d += b, p += L, y += M, k += g, Y = Y.next, x += C = D.r, w += A = D.g, m += E = D.b, S += T = D.a, b -= C, L -= A, M -= E, g -= T, D = D.next, l += 4;
    c += r;
  }
  for (let ee = 0; ee < r; ee++) {
    L = M = g = b = p = y = k = d = 0, l = ee << 2, x = W * (C = n[l]), w = W * (A = n[l + 1]), m = W * (E = n[l + 2]), S = W * (T = n[l + 3]), d += U * C, p += U * A, y += U * E, k += U * T, G = $;
    for (let we = 0; we < W; we++)
      G.r = C, G.g = A, G.b = E, G.a = T, G = G.next;
    let re = r;
    for (let we = 1; we <= e; we++)
      l = re + ee << 2, d += (G.r = C = n[l]) * (P = W - we), p += (G.g = A = n[l + 1]) * P, y += (G.b = E = n[l + 2]) * P, k += (G.a = T = n[l + 3]) * P, b += C, L += A, M += E, g += T, G = G.next, we < F && (re += r);
    l = ee, Y = $, D = q;
    for (let we = 0; we < o; we++)
      a = l << 2, n[a + 3] = T = k * Q >> oe, T > 0 ? (T = 255 / T, n[a] = (d * Q >> oe) * T, n[a + 1] = (p * Q >> oe) * T, n[a + 2] = (y * Q >> oe) * T) : n[a] = n[a + 1] = n[a + 2] = 0, d -= x, p -= w, y -= m, k -= S, x -= Y.r, w -= Y.g, m -= Y.b, S -= Y.a, a = ee + ((a = we + W) < F ? a : F) * r << 2, d += b += Y.r = n[a], p += L += Y.g = n[a + 1], y += M += Y.b = n[a + 2], k += g += Y.a = n[a + 3], Y = Y.next, x += C = D.r, w += A = D.g, m += E = D.b, S += T = D.a, b -= C, L -= A, M -= E, g -= T, D = D.next, l += r;
  }
}
const Gw = function(e) {
  const n = Math.round(this.blurRadius());
  n > 0 && Dw(e, n);
};
t2.Blur = Gw;
k6.Factory.addGetterSetter(Fw.Node, "blurRadius", 0, (0, jw.getNumberValidator)(), k6.Factory.afterSetFilter);
var n2 = {};
Object.defineProperty(n2, "__esModule", { value: !0 });
n2.Brighten = void 0;
const L6 = Qe, Uw = kt, Bw = Ie, Ww = function(t) {
  const e = this.brightness() * 255, n = t.data, r = n.length;
  for (let o = 0; o < r; o += 4)
    n[o] += e, n[o + 1] += e, n[o + 2] += e;
};
n2.Brighten = Ww;
L6.Factory.addGetterSetter(Uw.Node, "brightness", 0, (0, Bw.getNumberValidator)(), L6.Factory.afterSetFilter);
var r2 = {};
Object.defineProperty(r2, "__esModule", { value: !0 });
r2.Contrast = void 0;
const A6 = Qe, Zw = kt, Yw = Ie, Kw = function(t) {
  const e = Math.pow((this.contrast() + 100) / 100, 2), n = t.data, r = n.length;
  let o = 150, a = 150, l = 150;
  for (let c = 0; c < r; c += 4)
    o = n[c], a = n[c + 1], l = n[c + 2], o /= 255, o -= 0.5, o *= e, o += 0.5, o *= 255, a /= 255, a -= 0.5, a *= e, a += 0.5, a *= 255, l /= 255, l -= 0.5, l *= e, l += 0.5, l *= 255, o = o < 0 ? 0 : o > 255 ? 255 : o, a = a < 0 ? 0 : a > 255 ? 255 : a, l = l < 0 ? 0 : l > 255 ? 255 : l, n[c] = o, n[c + 1] = a, n[c + 2] = l;
};
r2.Contrast = Kw;
A6.Factory.addGetterSetter(Zw.Node, "contrast", 0, (0, Yw.getNumberValidator)(), A6.Factory.afterSetFilter);
var i2 = {};
Object.defineProperty(i2, "__esModule", { value: !0 });
i2.Emboss = void 0;
const mo = Qe, o2 = kt, Xw = Et, Og = Ie, $w = function(t) {
  const e = this.embossStrength() * 10, n = this.embossWhiteLevel() * 255, r = this.embossDirection(), o = this.embossBlend(), a = t.data, l = t.width, c = t.height, d = l * 4;
  let p = 0, y = 0, k = c;
  switch (r) {
    case "top-left":
      p = -1, y = -1;
      break;
    case "top":
      p = -1, y = 0;
      break;
    case "top-right":
      p = -1, y = 1;
      break;
    case "right":
      p = 0, y = 1;
      break;
    case "bottom-right":
      p = 1, y = 1;
      break;
    case "bottom":
      p = 1, y = 0;
      break;
    case "bottom-left":
      p = 1, y = -1;
      break;
    case "left":
      p = 0, y = -1;
      break;
    default:
      Xw.Util.error("Unknown emboss direction: " + r);
  }
  do {
    const x = (k - 1) * d;
    let w = p;
    k + w < 1 && (w = 0), k + w > c && (w = 0);
    const m = (k - 1 + w) * l * 4;
    let S = l;
    do {
      const b = x + (S - 1) * 4;
      let L = y;
      S + L < 1 && (L = 0), S + L > l && (L = 0);
      const M = m + (S - 1 + L) * 4, g = a[b] - a[M], C = a[b + 1] - a[M + 1], A = a[b + 2] - a[M + 2];
      let E = g;
      const T = E > 0 ? E : -E, P = C > 0 ? C : -C, R = A > 0 ? A : -A;
      if (P > T && (E = C), R > T && (E = A), E *= e, o) {
        const V = a[b] + E, F = a[b + 1] + E, W = a[b + 2] + E;
        a[b] = V > 255 ? 255 : V < 0 ? 0 : V, a[b + 1] = F > 255 ? 255 : F < 0 ? 0 : F, a[b + 2] = W > 255 ? 255 : W < 0 ? 0 : W;
      } else {
        let V = n - E;
        V < 0 ? V = 0 : V > 255 && (V = 255), a[b] = a[b + 1] = a[b + 2] = V;
      }
    } while (--S);
  } while (--k);
};
i2.Emboss = $w;
mo.Factory.addGetterSetter(o2.Node, "embossStrength", 0.5, (0, Og.getNumberValidator)(), mo.Factory.afterSetFilter);
mo.Factory.addGetterSetter(o2.Node, "embossWhiteLevel", 0.5, (0, Og.getNumberValidator)(), mo.Factory.afterSetFilter);
mo.Factory.addGetterSetter(o2.Node, "embossDirection", "top-left", void 0, mo.Factory.afterSetFilter);
mo.Factory.addGetterSetter(o2.Node, "embossBlend", !1, void 0, mo.Factory.afterSetFilter);
var s2 = {};
Object.defineProperty(s2, "__esModule", { value: !0 });
s2.Enhance = void 0;
const b6 = Qe, Qw = kt, qw = Ie;
function kf(t, e, n, r, o) {
  const a = n - e, l = o - r;
  if (a === 0)
    return r + l / 2;
  if (l === 0)
    return r;
  let c = (t - e) / a;
  return c = l * c + r, c;
}
const Jw = function(t) {
  const e = t.data, n = e.length;
  let r = e[0], o = r, a, l = e[1], c = l, d, p = e[2], y = p, k;
  const x = this.enhance();
  if (x === 0)
    return;
  for (let g = 0; g < n; g += 4)
    a = e[g + 0], a < r ? r = a : a > o && (o = a), d = e[g + 1], d < l ? l = d : d > c && (c = d), k = e[g + 2], k < p ? p = k : k > y && (y = k);
  o === r && (o = 255, r = 0), c === l && (c = 255, l = 0), y === p && (y = 255, p = 0);
  let w, m, S, b, L, M;
  if (x > 0)
    w = o + x * (255 - o), m = r - x * (r - 0), S = c + x * (255 - c), b = l - x * (l - 0), L = y + x * (255 - y), M = p - x * (p - 0);
  else {
    const g = (o + r) * 0.5;
    w = o + x * (o - g), m = r + x * (r - g);
    const C = (c + l) * 0.5;
    S = c + x * (c - C), b = l + x * (l - C);
    const A = (y + p) * 0.5;
    L = y + x * (y - A), M = p + x * (p - A);
  }
  for (let g = 0; g < n; g += 4)
    e[g + 0] = kf(e[g + 0], r, o, m, w), e[g + 1] = kf(e[g + 1], l, c, b, S), e[g + 2] = kf(e[g + 2], p, y, M, L);
};
s2.Enhance = Jw;
b6.Factory.addGetterSetter(Qw.Node, "enhance", 0, (0, qw.getNumberValidator)(), b6.Factory.afterSetFilter);
var a2 = {};
Object.defineProperty(a2, "__esModule", { value: !0 });
a2.Grayscale = void 0;
const eS = function(t) {
  const e = t.data, n = e.length;
  for (let r = 0; r < n; r += 4) {
    const o = 0.34 * e[r] + 0.5 * e[r + 1] + 0.16 * e[r + 2];
    e[r] = o, e[r + 1] = o, e[r + 2] = o;
  }
};
a2.Grayscale = eS;
var l2 = {};
Object.defineProperty(l2, "__esModule", { value: !0 });
l2.HSL = void 0;
const va = Qe, Jh = kt, e3 = Ie;
va.Factory.addGetterSetter(Jh.Node, "hue", 0, (0, e3.getNumberValidator)(), va.Factory.afterSetFilter);
va.Factory.addGetterSetter(Jh.Node, "saturation", 0, (0, e3.getNumberValidator)(), va.Factory.afterSetFilter);
va.Factory.addGetterSetter(Jh.Node, "luminance", 0, (0, e3.getNumberValidator)(), va.Factory.afterSetFilter);
const tS = function(t) {
  const e = t.data, n = e.length, r = 1, o = Math.pow(2, this.saturation()), a = Math.abs(this.hue() + 360) % 360, l = this.luminance() * 127, c = r * o * Math.cos(a * Math.PI / 180), d = r * o * Math.sin(a * Math.PI / 180), p = 0.299 * r + 0.701 * c + 0.167 * d, y = 0.587 * r - 0.587 * c + 0.33 * d, k = 0.114 * r - 0.114 * c - 0.497 * d, x = 0.299 * r - 0.299 * c - 0.328 * d, w = 0.587 * r + 0.413 * c + 0.035 * d, m = 0.114 * r - 0.114 * c + 0.293 * d, S = 0.299 * r - 0.3 * c + 1.25 * d, b = 0.587 * r - 0.586 * c - 1.05 * d, L = 0.114 * r + 0.886 * c - 0.2 * d;
  let M, g, C, A;
  for (let E = 0; E < n; E += 4)
    M = e[E + 0], g = e[E + 1], C = e[E + 2], A = e[E + 3], e[E + 0] = p * M + y * g + k * C + l, e[E + 1] = x * M + w * g + m * C + l, e[E + 2] = S * M + b * g + L * C + l, e[E + 3] = A;
};
l2.HSL = tS;
var u2 = {};
Object.defineProperty(u2, "__esModule", { value: !0 });
u2.HSV = void 0;
const xa = Qe, t3 = kt, n3 = Ie, nS = function(t) {
  const e = t.data, n = e.length, r = Math.pow(2, this.value()), o = Math.pow(2, this.saturation()), a = Math.abs(this.hue() + 360) % 360, l = r * o * Math.cos(a * Math.PI / 180), c = r * o * Math.sin(a * Math.PI / 180), d = 0.299 * r + 0.701 * l + 0.167 * c, p = 0.587 * r - 0.587 * l + 0.33 * c, y = 0.114 * r - 0.114 * l - 0.497 * c, k = 0.299 * r - 0.299 * l - 0.328 * c, x = 0.587 * r + 0.413 * l + 0.035 * c, w = 0.114 * r - 0.114 * l + 0.293 * c, m = 0.299 * r - 0.3 * l + 1.25 * c, S = 0.587 * r - 0.586 * l - 1.05 * c, b = 0.114 * r + 0.886 * l - 0.2 * c;
  for (let L = 0; L < n; L += 4) {
    const M = e[L + 0], g = e[L + 1], C = e[L + 2], A = e[L + 3];
    e[L + 0] = d * M + p * g + y * C, e[L + 1] = k * M + x * g + w * C, e[L + 2] = m * M + S * g + b * C, e[L + 3] = A;
  }
};
u2.HSV = nS;
xa.Factory.addGetterSetter(t3.Node, "hue", 0, (0, n3.getNumberValidator)(), xa.Factory.afterSetFilter);
xa.Factory.addGetterSetter(t3.Node, "saturation", 0, (0, n3.getNumberValidator)(), xa.Factory.afterSetFilter);
xa.Factory.addGetterSetter(t3.Node, "value", 0, (0, n3.getNumberValidator)(), xa.Factory.afterSetFilter);
var c2 = {};
Object.defineProperty(c2, "__esModule", { value: !0 });
c2.Invert = void 0;
const rS = function(t) {
  const e = t.data, n = e.length;
  for (let r = 0; r < n; r += 4)
    e[r] = 255 - e[r], e[r + 1] = 255 - e[r + 1], e[r + 2] = 255 - e[r + 2];
};
c2.Invert = rS;
var d2 = {};
Object.defineProperty(d2, "__esModule", { value: !0 });
d2.Kaleidoscope = void 0;
const Qu = Qe, Ig = kt, P6 = Et, Dg = Ie, iS = function(t, e, n) {
  const r = t.data, o = e.data, a = t.width, l = t.height, c = n.polarCenterX || a / 2, d = n.polarCenterY || l / 2;
  let p = Math.sqrt(c * c + d * d), y = a - c, k = l - d;
  const x = Math.sqrt(y * y + k * k);
  p = x > p ? x : p;
  const w = l, m = a, S = 360 / m * Math.PI / 180;
  for (let b = 0; b < m; b += 1) {
    const L = Math.sin(b * S), M = Math.cos(b * S);
    for (let g = 0; g < w; g += 1) {
      y = Math.floor(c + p * g / w * M), k = Math.floor(d + p * g / w * L);
      let C = (k * a + y) * 4;
      const A = r[C + 0], E = r[C + 1], T = r[C + 2], P = r[C + 3];
      C = (b + g * a) * 4, o[C + 0] = A, o[C + 1] = E, o[C + 2] = T, o[C + 3] = P;
    }
  }
}, oS = function(t, e, n) {
  const r = t.data, o = e.data, a = t.width, l = t.height, c = n.polarCenterX || a / 2, d = n.polarCenterY || l / 2;
  let p = Math.sqrt(c * c + d * d), y = a - c, k = l - d;
  const x = Math.sqrt(y * y + k * k);
  p = x > p ? x : p;
  const w = l, m = a, S = 0;
  let b, L;
  for (y = 0; y < a; y += 1)
    for (k = 0; k < l; k += 1) {
      const M = y - c, g = k - d, C = Math.sqrt(M * M + g * g) * w / p;
      let A = (Math.atan2(g, M) * 180 / Math.PI + 360 + S) % 360;
      A = A * m / 360, b = Math.floor(A), L = Math.floor(C);
      let E = (L * a + b) * 4;
      const T = r[E + 0], P = r[E + 1], R = r[E + 2], V = r[E + 3];
      E = (k * a + y) * 4, o[E + 0] = T, o[E + 1] = P, o[E + 2] = R, o[E + 3] = V;
    }
}, sS = function(t) {
  const e = t.width, n = t.height;
  let r, o, a, l, c, d, p, y, k, x, w = Math.round(this.kaleidoscopePower());
  const m = Math.round(this.kaleidoscopeAngle()), S = Math.floor(e * (m % 360) / 360);
  if (w < 1)
    return;
  const b = P6.Util.createCanvasElement();
  b.width = e, b.height = n;
  const L = b.getContext("2d").getImageData(0, 0, e, n);
  P6.Util.releaseCanvas(b), iS(t, L, {
    polarCenterX: e / 2,
    polarCenterY: n / 2
  });
  let M = e / Math.pow(2, w);
  for (; M <= 8; )
    M = M * 2, w -= 1;
  M = Math.ceil(M);
  let g = M, C = 0, A = g, E = 1;
  for (S + M > e && (C = g, A = 0, E = -1), o = 0; o < n; o += 1)
    for (r = C; r !== A; r += E)
      a = Math.round(r + S) % e, k = (e * o + a) * 4, c = L.data[k + 0], d = L.data[k + 1], p = L.data[k + 2], y = L.data[k + 3], x = (e * o + r) * 4, L.data[x + 0] = c, L.data[x + 1] = d, L.data[x + 2] = p, L.data[x + 3] = y;
  for (o = 0; o < n; o += 1)
    for (g = Math.floor(M), l = 0; l < w; l += 1) {
      for (r = 0; r < g + 1; r += 1)
        k = (e * o + r) * 4, c = L.data[k + 0], d = L.data[k + 1], p = L.data[k + 2], y = L.data[k + 3], x = (e * o + g * 2 - r - 1) * 4, L.data[x + 0] = c, L.data[x + 1] = d, L.data[x + 2] = p, L.data[x + 3] = y;
      g *= 2;
    }
  oS(L, t, {});
};
d2.Kaleidoscope = sS;
Qu.Factory.addGetterSetter(Ig.Node, "kaleidoscopePower", 2, (0, Dg.getNumberValidator)(), Qu.Factory.afterSetFilter);
Qu.Factory.addGetterSetter(Ig.Node, "kaleidoscopeAngle", 0, (0, Dg.getNumberValidator)(), Qu.Factory.afterSetFilter);
var f2 = {};
Object.defineProperty(f2, "__esModule", { value: !0 });
f2.Mask = void 0;
const E6 = Qe, aS = kt, lS = Ie;
function J0(t, e, n) {
  let r = (n * t.width + e) * 4;
  const o = [];
  return o.push(t.data[r++], t.data[r++], t.data[r++], t.data[r++]), o;
}
function gl(t, e) {
  return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2) + Math.pow(t[2] - e[2], 2));
}
function uS(t) {
  const e = [0, 0, 0];
  for (let n = 0; n < t.length; n++)
    e[0] += t[n][0], e[1] += t[n][1], e[2] += t[n][2];
  return e[0] /= t.length, e[1] /= t.length, e[2] /= t.length, e;
}
function cS(t, e) {
  const n = J0(t, 0, 0), r = J0(t, t.width - 1, 0), o = J0(t, 0, t.height - 1), a = J0(t, t.width - 1, t.height - 1), l = e || 10;
  if (gl(n, r) < l && gl(r, a) < l && gl(a, o) < l && gl(o, n) < l) {
    const c = uS([r, n, a, o]), d = [];
    for (let p = 0; p < t.width * t.height; p++) {
      const y = gl(c, [
        t.data[p * 4],
        t.data[p * 4 + 1],
        t.data[p * 4 + 2]
      ]);
      d[p] = y < l ? 0 : 255;
    }
    return d;
  }
}
function dS(t, e) {
  for (let n = 0; n < t.width * t.height; n++)
    t.data[4 * n + 3] = e[n];
}
function fS(t, e, n) {
  const r = [1, 1, 1, 1, 0, 1, 1, 1, 1], o = Math.round(Math.sqrt(r.length)), a = Math.floor(o / 2), l = [];
  for (let c = 0; c < n; c++)
    for (let d = 0; d < e; d++) {
      const p = c * e + d;
      let y = 0;
      for (let k = 0; k < o; k++)
        for (let x = 0; x < o; x++) {
          const w = c + k - a, m = d + x - a;
          if (w >= 0 && w < n && m >= 0 && m < e) {
            const S = w * e + m, b = r[k * o + x];
            y += t[S] * b;
          }
        }
      l[p] = y === 255 * 8 ? 255 : 0;
    }
  return l;
}
function hS(t, e, n) {
  const r = [1, 1, 1, 1, 1, 1, 1, 1, 1], o = Math.round(Math.sqrt(r.length)), a = Math.floor(o / 2), l = [];
  for (let c = 0; c < n; c++)
    for (let d = 0; d < e; d++) {
      const p = c * e + d;
      let y = 0;
      for (let k = 0; k < o; k++)
        for (let x = 0; x < o; x++) {
          const w = c + k - a, m = d + x - a;
          if (w >= 0 && w < n && m >= 0 && m < e) {
            const S = w * e + m, b = r[k * o + x];
            y += t[S] * b;
          }
        }
      l[p] = y >= 255 * 4 ? 255 : 0;
    }
  return l;
}
function pS(t, e, n) {
  const r = [0.1111111111111111, 0.1111111111111111, 0.1111111111111111, 0.1111111111111111, 0.1111111111111111, 0.1111111111111111, 0.1111111111111111, 0.1111111111111111, 0.1111111111111111], o = Math.round(Math.sqrt(r.length)), a = Math.floor(o / 2), l = [];
  for (let c = 0; c < n; c++)
    for (let d = 0; d < e; d++) {
      const p = c * e + d;
      let y = 0;
      for (let k = 0; k < o; k++)
        for (let x = 0; x < o; x++) {
          const w = c + k - a, m = d + x - a;
          if (w >= 0 && w < n && m >= 0 && m < e) {
            const S = w * e + m, b = r[k * o + x];
            y += t[S] * b;
          }
        }
      l[p] = y;
    }
  return l;
}
const gS = function(t) {
  const e = this.threshold();
  let n = cS(t, e);
  return n && (n = fS(n, t.width, t.height), n = hS(n, t.width, t.height), n = pS(n, t.width, t.height), dS(t, n)), t;
};
f2.Mask = gS;
E6.Factory.addGetterSetter(aS.Node, "threshold", 0, (0, lS.getNumberValidator)(), E6.Factory.afterSetFilter);
var h2 = {};
Object.defineProperty(h2, "__esModule", { value: !0 });
h2.Noise = void 0;
const N6 = Qe, mS = kt, yS = Ie, vS = function(t) {
  const e = this.noise() * 255, n = t.data, r = n.length, o = e / 2;
  for (let a = 0; a < r; a += 4)
    n[a + 0] += o - 2 * o * Math.random(), n[a + 1] += o - 2 * o * Math.random(), n[a + 2] += o - 2 * o * Math.random();
};
h2.Noise = vS;
N6.Factory.addGetterSetter(mS.Node, "noise", 0.2, (0, yS.getNumberValidator)(), N6.Factory.afterSetFilter);
var p2 = {};
Object.defineProperty(p2, "__esModule", { value: !0 });
p2.Pixelate = void 0;
const H6 = Qe, xS = Et, _S = kt, CS = Ie, wS = function(t) {
  let e = Math.ceil(this.pixelSize()), n = t.width, r = t.height, o = Math.ceil(n / e), a = Math.ceil(r / e), l = t.data;
  if (e <= 0) {
    xS.Util.error("pixelSize value can not be <= 0");
    return;
  }
  for (let c = 0; c < o; c += 1)
    for (let d = 0; d < a; d += 1) {
      let p = 0, y = 0, k = 0, x = 0;
      const w = c * e, m = w + e, S = d * e, b = S + e;
      let L = 0;
      for (let M = w; M < m; M += 1)
        if (!(M >= n))
          for (let g = S; g < b; g += 1) {
            if (g >= r)
              continue;
            const C = (n * g + M) * 4;
            p += l[C + 0], y += l[C + 1], k += l[C + 2], x += l[C + 3], L += 1;
          }
      p = p / L, y = y / L, k = k / L, x = x / L;
      for (let M = w; M < m; M += 1)
        if (!(M >= n))
          for (let g = S; g < b; g += 1) {
            if (g >= r)
              continue;
            const C = (n * g + M) * 4;
            l[C + 0] = p, l[C + 1] = y, l[C + 2] = k, l[C + 3] = x;
          }
    }
};
p2.Pixelate = wS;
H6.Factory.addGetterSetter(_S.Node, "pixelSize", 8, (0, CS.getNumberValidator)(), H6.Factory.afterSetFilter);
var g2 = {};
Object.defineProperty(g2, "__esModule", { value: !0 });
g2.Posterize = void 0;
const V6 = Qe, SS = kt, kS = Ie, MS = function(t) {
  const e = Math.round(this.levels() * 254) + 1, n = t.data, r = n.length, o = 255 / e;
  for (let a = 0; a < r; a += 1)
    n[a] = Math.floor(n[a] / o) * o;
};
g2.Posterize = MS;
V6.Factory.addGetterSetter(SS.Node, "levels", 0.5, (0, kS.getNumberValidator)(), V6.Factory.afterSetFilter);
var m2 = {};
Object.defineProperty(m2, "__esModule", { value: !0 });
m2.RGB = void 0;
const qu = Qe, r3 = kt, LS = Ie, AS = function(t) {
  const e = t.data, n = e.length, r = this.red(), o = this.green(), a = this.blue();
  for (let l = 0; l < n; l += 4) {
    const c = (0.34 * e[l] + 0.5 * e[l + 1] + 0.16 * e[l + 2]) / 255;
    e[l] = c * r, e[l + 1] = c * o, e[l + 2] = c * a, e[l + 3] = e[l + 3];
  }
};
m2.RGB = AS;
qu.Factory.addGetterSetter(r3.Node, "red", 0, function(t) {
  return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t);
});
qu.Factory.addGetterSetter(r3.Node, "green", 0, function(t) {
  return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t);
});
qu.Factory.addGetterSetter(r3.Node, "blue", 0, LS.RGBComponent, qu.Factory.afterSetFilter);
var y2 = {};
Object.defineProperty(y2, "__esModule", { value: !0 });
y2.RGBA = void 0;
const ql = Qe, v2 = kt, bS = Ie, PS = function(t) {
  const e = t.data, n = e.length, r = this.red(), o = this.green(), a = this.blue(), l = this.alpha();
  for (let c = 0; c < n; c += 4) {
    const d = 1 - l;
    e[c] = r * l + e[c] * d, e[c + 1] = o * l + e[c + 1] * d, e[c + 2] = a * l + e[c + 2] * d;
  }
};
y2.RGBA = PS;
ql.Factory.addGetterSetter(v2.Node, "red", 0, function(t) {
  return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t);
});
ql.Factory.addGetterSetter(v2.Node, "green", 0, function(t) {
  return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t);
});
ql.Factory.addGetterSetter(v2.Node, "blue", 0, bS.RGBComponent, ql.Factory.afterSetFilter);
ql.Factory.addGetterSetter(v2.Node, "alpha", 1, function(t) {
  return this._filterUpToDate = !1, t > 1 ? 1 : t < 0 ? 0 : t;
});
var x2 = {};
Object.defineProperty(x2, "__esModule", { value: !0 });
x2.Sepia = void 0;
const ES = function(t) {
  const e = t.data, n = e.length;
  for (let r = 0; r < n; r += 4) {
    const o = e[r + 0], a = e[r + 1], l = e[r + 2];
    e[r + 0] = Math.min(255, o * 0.393 + a * 0.769 + l * 0.189), e[r + 1] = Math.min(255, o * 0.349 + a * 0.686 + l * 0.168), e[r + 2] = Math.min(255, o * 0.272 + a * 0.534 + l * 0.131);
  }
};
x2.Sepia = ES;
var _2 = {};
Object.defineProperty(_2, "__esModule", { value: !0 });
_2.Solarize = void 0;
const NS = function(t) {
  const e = t.data, n = t.width, r = t.height, o = n * 4;
  let a = r;
  do {
    const l = (a - 1) * o;
    let c = n;
    do {
      const d = l + (c - 1) * 4;
      let p = e[d], y = e[d + 1], k = e[d + 2];
      p > 127 && (p = 255 - p), y > 127 && (y = 255 - y), k > 127 && (k = 255 - k), e[d] = p, e[d + 1] = y, e[d + 2] = k;
    } while (--c);
  } while (--a);
};
_2.Solarize = NS;
var C2 = {};
Object.defineProperty(C2, "__esModule", { value: !0 });
C2.Threshold = void 0;
const T6 = Qe, HS = kt, VS = Ie, TS = function(t) {
  const e = this.threshold() * 255, n = t.data, r = n.length;
  for (let o = 0; o < r; o += 1)
    n[o] = n[o] < e ? 0 : 255;
};
C2.Threshold = TS;
T6.Factory.addGetterSetter(HS.Node, "threshold", 0.5, (0, VS.getNumberValidator)(), T6.Factory.afterSetFilter);
Object.defineProperty(Nc, "__esModule", { value: !0 });
Nc.Konva = void 0;
const R6 = Ku, RS = zc, zS = Oc, FS = Gc, jS = Uc, OS = Bc, z6 = ya, IS = a1, DS = Ea, GS = c1, US = Yc, BS = Kc, WS = Xc, ZS = $c, YS = Ha, KS = Qc, XS = qc, $S = Jc, QS = t2, qS = n2, JS = r2, ek = i2, tk = s2, nk = a2, rk = l2, ik = u2, ok = c2, sk = d2, ak = f2, lk = h2, uk = p2, ck = g2, dk = m2, fk = y2, hk = x2, pk = _2, gk = C2;
Nc.Konva = R6.Konva.Util._assign(R6.Konva, {
  Arc: RS.Arc,
  Arrow: zS.Arrow,
  Circle: FS.Circle,
  Ellipse: jS.Ellipse,
  Image: OS.Image,
  Label: z6.Label,
  Tag: z6.Tag,
  Line: IS.Line,
  Path: DS.Path,
  Rect: GS.Rect,
  RegularPolygon: US.RegularPolygon,
  Ring: BS.Ring,
  Sprite: WS.Sprite,
  Star: ZS.Star,
  Text: YS.Text,
  TextPath: KS.TextPath,
  Transformer: XS.Transformer,
  Wedge: $S.Wedge,
  Filters: {
    Blur: QS.Blur,
    Brighten: qS.Brighten,
    Contrast: JS.Contrast,
    Emboss: ek.Emboss,
    Enhance: tk.Enhance,
    Grayscale: nk.Grayscale,
    HSL: rk.HSL,
    HSV: ik.HSV,
    Invert: ok.Invert,
    Kaleidoscope: sk.Kaleidoscope,
    Mask: ak.Mask,
    Noise: lk.Noise,
    Pixelate: uk.Pixelate,
    Posterize: ck.Posterize,
    RGB: dk.RGB,
    RGBA: fk.RGBA,
    Sepia: hk.Sepia,
    Solarize: pk.Solarize,
    Threshold: gk.Threshold
  }
});
var mk = Gh.exports;
Object.defineProperty(mk, "__esModule", { value: !0 });
const yk = Nc;
Gh.exports = yk.Konva;
var vk = Gh.exports;
const Br = /* @__PURE__ */ pc(vk);
var B5 = { exports: {} };
(function(t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.Konva = void 0;
  var n = Ku;
  Object.defineProperty(e, "Konva", { enumerable: !0, get: function() {
    return n.Konva;
  } });
  const r = Ku;
  t.exports = r.Konva;
})(B5, B5.exports);
var xk = B5.exports;
const Jl = /* @__PURE__ */ pc(xk);
var Gg = { exports: {} };
/**
 * @license React
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _k = function(e) {
  var n = {}, r = z, o = kl, a = Object.assign;
  function l(i) {
    for (var s = "https://reactjs.org/docs/error-decoder.html?invariant=" + i, u = 1; u < arguments.length; u++) s += "&args[]=" + encodeURIComponent(arguments[u]);
    return "Minified React error #" + i + "; visit " + s + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var c = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, d = Symbol.for("react.element"), p = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), m = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), M = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), A = Symbol.iterator;
  function E(i) {
    return i === null || typeof i != "object" ? null : (i = A && i[A] || i["@@iterator"], typeof i == "function" ? i : null);
  }
  function T(i) {
    if (i == null) return null;
    if (typeof i == "function") return i.displayName || i.name || null;
    if (typeof i == "string") return i;
    switch (i) {
      case y:
        return "Fragment";
      case p:
        return "Portal";
      case x:
        return "Profiler";
      case k:
        return "StrictMode";
      case b:
        return "Suspense";
      case L:
        return "SuspenseList";
    }
    if (typeof i == "object") switch (i.$$typeof) {
      case m:
        return (i.displayName || "Context") + ".Consumer";
      case w:
        return (i._context.displayName || "Context") + ".Provider";
      case S:
        var s = i.render;
        return i = i.displayName, i || (i = s.displayName || s.name || "", i = i !== "" ? "ForwardRef(" + i + ")" : "ForwardRef"), i;
      case M:
        return s = i.displayName || null, s !== null ? s : T(i.type) || "Memo";
      case g:
        s = i._payload, i = i._init;
        try {
          return T(i(s));
        } catch {
        }
    }
    return null;
  }
  function P(i) {
    var s = i.type;
    switch (i.tag) {
      case 24:
        return "Cache";
      case 9:
        return (s.displayName || "Context") + ".Consumer";
      case 10:
        return (s._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return i = s.render, i = i.displayName || i.name || "", s.displayName || (i !== "" ? "ForwardRef(" + i + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return s;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return T(s);
      case 8:
        return s === k ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof s == "function") return s.displayName || s.name || null;
        if (typeof s == "string") return s;
    }
    return null;
  }
  function R(i) {
    var s = i, u = i;
    if (i.alternate) for (; s.return; ) s = s.return;
    else {
      i = s;
      do
        s = i, s.flags & 4098 && (u = s.return), i = s.return;
      while (i);
    }
    return s.tag === 3 ? u : null;
  }
  function V(i) {
    if (R(i) !== i) throw Error(l(188));
  }
  function F(i) {
    var s = i.alternate;
    if (!s) {
      if (s = R(i), s === null) throw Error(l(188));
      return s !== i ? null : i;
    }
    for (var u = i, f = s; ; ) {
      var h = u.return;
      if (h === null) break;
      var _ = h.alternate;
      if (_ === null) {
        if (f = h.return, f !== null) {
          u = f;
          continue;
        }
        break;
      }
      if (h.child === _.child) {
        for (_ = h.child; _; ) {
          if (_ === u) return V(h), i;
          if (_ === f) return V(h), s;
          _ = _.sibling;
        }
        throw Error(l(188));
      }
      if (u.return !== f.return) u = h, f = _;
      else {
        for (var N = !1, j = h.child; j; ) {
          if (j === u) {
            N = !0, u = h, f = _;
            break;
          }
          if (j === f) {
            N = !0, f = h, u = _;
            break;
          }
          j = j.sibling;
        }
        if (!N) {
          for (j = _.child; j; ) {
            if (j === u) {
              N = !0, u = _, f = h;
              break;
            }
            if (j === f) {
              N = !0, f = _, u = h;
              break;
            }
            j = j.sibling;
          }
          if (!N) throw Error(l(189));
        }
      }
      if (u.alternate !== f) throw Error(l(190));
    }
    if (u.tag !== 3) throw Error(l(188));
    return u.stateNode.current === u ? i : s;
  }
  function W(i) {
    return i = F(i), i !== null ? U(i) : null;
  }
  function U(i) {
    if (i.tag === 5 || i.tag === 6) return i;
    for (i = i.child; i !== null; ) {
      var s = U(i);
      if (s !== null) return s;
      i = i.sibling;
    }
    return null;
  }
  function $(i) {
    if (i.tag === 5 || i.tag === 6) return i;
    for (i = i.child; i !== null; ) {
      if (i.tag !== 4) {
        var s = $(i);
        if (s !== null) return s;
      }
      i = i.sibling;
    }
    return null;
  }
  var Q = Array.isArray, oe = e.getPublicInstance, q = e.getRootHostContext, G = e.getChildHostContext, Y = e.prepareForCommit, D = e.resetAfterCommit, ee = e.createInstance, re = e.appendInitialChild, we = e.finalizeInitialChildren, Re = e.prepareUpdate, ie = e.shouldSetTextContent, ce = e.createTextInstance, H = e.scheduleTimeout, I = e.cancelTimeout, te = e.noTimeout, ze = e.isPrimaryRenderer, K = e.supportsMutation, ae = e.supportsPersistence, pe = e.supportsHydration, de = e.getInstanceFromNode, be = e.preparePortalMount, et = e.getCurrentEventPriority, Ne = e.detachDeletedInstance, Ye = e.supportsMicrotasks, Nt = e.scheduleMicrotask, _t = e.supportsTestSelectors, Pn = e.findFiberRoot, $n = e.getBoundingRect, ti = e.getTextContent, Qn = e.isHiddenSubtree, Va = e.matchAccessibilityRole, Ao = e.setFocusIfFocusable, gs = e.setupIntersectionObserver, Ta = e.appendChild, ms = e.appendChildToContainer, Ra = e.commitTextUpdate, za = e.commitMount, Fa = e.commitUpdate, ja = e.insertBefore, ys = e.insertInContainerBefore, Ei = e.removeChild, vs = e.removeChildFromContainer, bo = e.resetTextContent, Oa = e.hideInstance, Ni = e.hideTextInstance, Nr = e.unhideInstance, Hr = e.unhideTextInstance, Po = e.clearContainer, Hi = e.cloneInstance, Vi = e.createContainerChildSet, ne = e.appendChildToContainerChildSet, je = e.finalizeContainerChildren, Ae = e.replaceContainerChildren, Ve = e.cloneHiddenInstance, Fe = e.cloneHiddenTextInstance, Oe = e.canHydrateInstance, Ze = e.canHydrateTextInstance, lt = e.canHydrateSuspenseInstance, Gt = e.isSuspenseInstancePending, Cn = e.isSuspenseInstanceFallback, cn = e.getSuspenseInstanceFallbackErrorDetails, Vr = e.registerSuspenseInstanceRetry, J = e.getNextHydratableSibling, xe = e.getFirstHydratableChild, De = e.getFirstHydratableChildWithinContainer, Ue = e.getFirstHydratableChildWithinSuspenseInstance, ct = e.hydrateInstance, at = e.hydrateTextInstance, hr = e.hydrateSuspenseInstance, Bm = e.getNextHydratableInstanceAfterSuspenseInstance, Wm = e.commitHydratedContainer, Zm = e.commitHydratedSuspenseInstance, Ym = e.clearSuspenseBoundary, Km = e.clearSuspenseBoundaryFromContainer, Xm = e.shouldDeleteUnhydratedTailInstances, $m = e.didNotMatchHydratedContainerTextInstance, Qm = e.didNotMatchHydratedTextInstance, b2;
  function Ia(i) {
    if (b2 === void 0) try {
      throw Error();
    } catch (u) {
      var s = u.stack.trim().match(/\n( *(at )?)/);
      b2 = s && s[1] || "";
    }
    return `
` + b2 + i;
  }
  var P2 = !1;
  function E2(i, s) {
    if (!i || P2) return "";
    P2 = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (s) if (s = function() {
        throw Error();
      }, Object.defineProperty(s.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(s, []);
        } catch (le) {
          var f = le;
        }
        Reflect.construct(i, [], s);
      } else {
        try {
          s.call();
        } catch (le) {
          f = le;
        }
        i.call(s.prototype);
      }
      else {
        try {
          throw Error();
        } catch (le) {
          f = le;
        }
        i();
      }
    } catch (le) {
      if (le && f && typeof le.stack == "string") {
        for (var h = le.stack.split(`
`), _ = f.stack.split(`
`), N = h.length - 1, j = _.length - 1; 1 <= N && 0 <= j && h[N] !== _[j]; ) j--;
        for (; 1 <= N && 0 <= j; N--, j--) if (h[N] !== _[j]) {
          if (N !== 1 || j !== 1)
            do
              if (N--, j--, 0 > j || h[N] !== _[j]) {
                var Z = `
` + h[N].replace(" at new ", " at ");
                return i.displayName && Z.includes("<anonymous>") && (Z = Z.replace("<anonymous>", i.displayName)), Z;
              }
            while (1 <= N && 0 <= j);
          break;
        }
      }
    } finally {
      P2 = !1, Error.prepareStackTrace = u;
    }
    return (i = i ? i.displayName || i.name : "") ? Ia(i) : "";
  }
  var qm = Object.prototype.hasOwnProperty, N2 = [], xs = -1;
  function Ti(i) {
    return { current: i };
  }
  function mt(i) {
    0 > xs || (i.current = N2[xs], N2[xs] = null, xs--);
  }
  function pt(i, s) {
    xs++, N2[xs] = i.current, i.current = s;
  }
  var Ri = {}, dn = Ti(Ri), En = Ti(!1), Eo = Ri;
  function _s(i, s) {
    var u = i.type.contextTypes;
    if (!u) return Ri;
    var f = i.stateNode;
    if (f && f.__reactInternalMemoizedUnmaskedChildContext === s) return f.__reactInternalMemoizedMaskedChildContext;
    var h = {}, _;
    for (_ in u) h[_] = s[_];
    return f && (i = i.stateNode, i.__reactInternalMemoizedUnmaskedChildContext = s, i.__reactInternalMemoizedMaskedChildContext = h), h;
  }
  function Nn(i) {
    return i = i.childContextTypes, i != null;
  }
  function D1() {
    mt(En), mt(dn);
  }
  function p3(i, s, u) {
    if (dn.current !== Ri) throw Error(l(168));
    pt(dn, s), pt(En, u);
  }
  function g3(i, s, u) {
    var f = i.stateNode;
    if (s = s.childContextTypes, typeof f.getChildContext != "function") return u;
    f = f.getChildContext();
    for (var h in f) if (!(h in s)) throw Error(l(108, P(i) || "Unknown", h));
    return a({}, u, f);
  }
  function G1(i) {
    return i = (i = i.stateNode) && i.__reactInternalMemoizedMergedChildContext || Ri, Eo = dn.current, pt(dn, i), pt(En, En.current), !0;
  }
  function m3(i, s, u) {
    var f = i.stateNode;
    if (!f) throw Error(l(169));
    u ? (i = g3(i, s, Eo), f.__reactInternalMemoizedMergedChildContext = i, mt(En), mt(dn), pt(dn, i)) : mt(En), pt(En, u);
  }
  var pr = Math.clz32 ? Math.clz32 : ty, Jm = Math.log, ey = Math.LN2;
  function ty(i) {
    return i >>>= 0, i === 0 ? 32 : 31 - (Jm(i) / ey | 0) | 0;
  }
  var U1 = 64, B1 = 4194304;
  function Da(i) {
    switch (i & -i) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return i & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return i & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return i;
    }
  }
  function W1(i, s) {
    var u = i.pendingLanes;
    if (u === 0) return 0;
    var f = 0, h = i.suspendedLanes, _ = i.pingedLanes, N = u & 268435455;
    if (N !== 0) {
      var j = N & ~h;
      j !== 0 ? f = Da(j) : (_ &= N, _ !== 0 && (f = Da(_)));
    } else N = u & ~h, N !== 0 ? f = Da(N) : _ !== 0 && (f = Da(_));
    if (f === 0) return 0;
    if (s !== 0 && s !== f && !(s & h) && (h = f & -f, _ = s & -s, h >= _ || h === 16 && (_ & 4194240) !== 0)) return s;
    if (f & 4 && (f |= u & 16), s = i.entangledLanes, s !== 0) for (i = i.entanglements, s &= f; 0 < s; ) u = 31 - pr(s), h = 1 << u, f |= i[u], s &= ~h;
    return f;
  }
  function ny(i, s) {
    switch (i) {
      case 1:
      case 2:
      case 4:
        return s + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return s + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ry(i, s) {
    for (var u = i.suspendedLanes, f = i.pingedLanes, h = i.expirationTimes, _ = i.pendingLanes; 0 < _; ) {
      var N = 31 - pr(_), j = 1 << N, Z = h[N];
      Z === -1 ? (!(j & u) || j & f) && (h[N] = ny(j, s)) : Z <= s && (i.expiredLanes |= j), _ &= ~j;
    }
  }
  function H2(i) {
    return i = i.pendingLanes & -1073741825, i !== 0 ? i : i & 1073741824 ? 1073741824 : 0;
  }
  function y3() {
    var i = U1;
    return U1 <<= 1, !(U1 & 4194240) && (U1 = 64), i;
  }
  function V2(i) {
    for (var s = [], u = 0; 31 > u; u++) s.push(i);
    return s;
  }
  function Ga(i, s, u) {
    i.pendingLanes |= s, s !== 536870912 && (i.suspendedLanes = 0, i.pingedLanes = 0), i = i.eventTimes, s = 31 - pr(s), i[s] = u;
  }
  function iy(i, s) {
    var u = i.pendingLanes & ~s;
    i.pendingLanes = s, i.suspendedLanes = 0, i.pingedLanes = 0, i.expiredLanes &= s, i.mutableReadLanes &= s, i.entangledLanes &= s, s = i.entanglements;
    var f = i.eventTimes;
    for (i = i.expirationTimes; 0 < u; ) {
      var h = 31 - pr(u), _ = 1 << h;
      s[h] = 0, f[h] = -1, i[h] = -1, u &= ~_;
    }
  }
  function T2(i, s) {
    var u = i.entangledLanes |= s;
    for (i = i.entanglements; u; ) {
      var f = 31 - pr(u), h = 1 << f;
      h & s | i[f] & s && (i[f] |= s), u &= ~h;
    }
  }
  var rt = 0;
  function v3(i) {
    return i &= -i, 1 < i ? 4 < i ? i & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var R2 = o.unstable_scheduleCallback, x3 = o.unstable_cancelCallback, oy = o.unstable_shouldYield, sy = o.unstable_requestPaint, Xt = o.unstable_now, z2 = o.unstable_ImmediatePriority, ay = o.unstable_UserBlockingPriority, F2 = o.unstable_NormalPriority, ly = o.unstable_IdlePriority, Z1 = null, Tr = null;
  function uy(i) {
    if (Tr && typeof Tr.onCommitFiberRoot == "function") try {
      Tr.onCommitFiberRoot(Z1, i, void 0, (i.current.flags & 128) === 128);
    } catch {
    }
  }
  function cy(i, s) {
    return i === s && (i !== 0 || 1 / i === 1 / s) || i !== i && s !== s;
  }
  var gr = typeof Object.is == "function" ? Object.is : cy, ni = null, Y1 = !1, j2 = !1;
  function _3(i) {
    ni === null ? ni = [i] : ni.push(i);
  }
  function dy(i) {
    Y1 = !0, _3(i);
  }
  function Rr() {
    if (!j2 && ni !== null) {
      j2 = !0;
      var i = 0, s = rt;
      try {
        var u = ni;
        for (rt = 1; i < u.length; i++) {
          var f = u[i];
          do
            f = f(!0);
          while (f !== null);
        }
        ni = null, Y1 = !1;
      } catch (h) {
        throw ni !== null && (ni = ni.slice(i + 1)), R2(z2, Rr), h;
      } finally {
        rt = s, j2 = !1;
      }
    }
    return null;
  }
  var Cs = [], ws = 0, K1 = null, X1 = 0, qn = [], Jn = 0, No = null, ri = 1, ii = "";
  function Ho(i, s) {
    Cs[ws++] = X1, Cs[ws++] = K1, K1 = i, X1 = s;
  }
  function C3(i, s, u) {
    qn[Jn++] = ri, qn[Jn++] = ii, qn[Jn++] = No, No = i;
    var f = ri;
    i = ii;
    var h = 32 - pr(f) - 1;
    f &= ~(1 << h), u += 1;
    var _ = 32 - pr(s) + h;
    if (30 < _) {
      var N = h - h % 5;
      _ = (f & (1 << N) - 1).toString(32), f >>= N, h -= N, ri = 1 << 32 - pr(s) + h | u << h | f, ii = _ + i;
    } else ri = 1 << _ | u << h | f, ii = i;
  }
  function O2(i) {
    i.return !== null && (Ho(i, 1), C3(i, 1, 0));
  }
  function I2(i) {
    for (; i === K1; ) K1 = Cs[--ws], Cs[ws] = null, X1 = Cs[--ws], Cs[ws] = null;
    for (; i === No; ) No = qn[--Jn], qn[Jn] = null, ii = qn[--Jn], qn[Jn] = null, ri = qn[--Jn], qn[Jn] = null;
  }
  var Gn = null, er = null, Ct = !1, Ua = !1, mr = null;
  function w3(i, s) {
    var u = or(5, null, null, 0);
    u.elementType = "DELETED", u.stateNode = s, u.return = i, s = i.deletions, s === null ? (i.deletions = [u], i.flags |= 16) : s.push(u);
  }
  function S3(i, s) {
    switch (i.tag) {
      case 5:
        return s = Oe(s, i.type, i.pendingProps), s !== null ? (i.stateNode = s, Gn = i, er = xe(s), !0) : !1;
      case 6:
        return s = Ze(s, i.pendingProps), s !== null ? (i.stateNode = s, Gn = i, er = null, !0) : !1;
      case 13:
        if (s = lt(s), s !== null) {
          var u = No !== null ? { id: ri, overflow: ii } : null;
          return i.memoizedState = { dehydrated: s, treeContext: u, retryLane: 1073741824 }, u = or(18, null, null, 0), u.stateNode = s, u.return = i, i.child = u, Gn = i, er = null, !0;
        }
        return !1;
      default:
        return !1;
    }
  }
  function D2(i) {
    return (i.mode & 1) !== 0 && (i.flags & 128) === 0;
  }
  function G2(i) {
    if (Ct) {
      var s = er;
      if (s) {
        var u = s;
        if (!S3(i, s)) {
          if (D2(i)) throw Error(l(418));
          s = J(u);
          var f = Gn;
          s && S3(i, s) ? w3(f, u) : (i.flags = i.flags & -4097 | 2, Ct = !1, Gn = i);
        }
      } else {
        if (D2(i)) throw Error(l(418));
        i.flags = i.flags & -4097 | 2, Ct = !1, Gn = i;
      }
    }
  }
  function k3(i) {
    for (i = i.return; i !== null && i.tag !== 5 && i.tag !== 3 && i.tag !== 13; ) i = i.return;
    Gn = i;
  }
  function $1(i) {
    if (!pe || i !== Gn) return !1;
    if (!Ct) return k3(i), Ct = !0, !1;
    if (i.tag !== 3 && (i.tag !== 5 || Xm(i.type) && !ie(i.type, i.memoizedProps))) {
      var s = er;
      if (s) {
        if (D2(i)) throw M3(), Error(l(418));
        for (; s; ) w3(i, s), s = J(s);
      }
    }
    if (k3(i), i.tag === 13) {
      if (!pe) throw Error(l(316));
      if (i = i.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(l(317));
      er = Bm(i);
    } else er = Gn ? J(i.stateNode) : null;
    return !0;
  }
  function M3() {
    for (var i = er; i; ) i = J(i);
  }
  function Ss() {
    pe && (er = Gn = null, Ua = Ct = !1);
  }
  function U2(i) {
    mr === null ? mr = [i] : mr.push(i);
  }
  var fy = c.ReactCurrentBatchConfig;
  function Q1(i, s) {
    if (gr(i, s)) return !0;
    if (typeof i != "object" || i === null || typeof s != "object" || s === null) return !1;
    var u = Object.keys(i), f = Object.keys(s);
    if (u.length !== f.length) return !1;
    for (f = 0; f < u.length; f++) {
      var h = u[f];
      if (!qm.call(s, h) || !gr(i[h], s[h])) return !1;
    }
    return !0;
  }
  function hy(i) {
    switch (i.tag) {
      case 5:
        return Ia(i.type);
      case 16:
        return Ia("Lazy");
      case 13:
        return Ia("Suspense");
      case 19:
        return Ia("SuspenseList");
      case 0:
      case 2:
      case 15:
        return i = E2(i.type, !1), i;
      case 11:
        return i = E2(i.type.render, !1), i;
      case 1:
        return i = E2(i.type, !0), i;
      default:
        return "";
    }
  }
  function Ba(i, s, u) {
    if (i = u.ref, i !== null && typeof i != "function" && typeof i != "object") {
      if (u._owner) {
        if (u = u._owner, u) {
          if (u.tag !== 1) throw Error(l(309));
          var f = u.stateNode;
        }
        if (!f) throw Error(l(147, i));
        var h = f, _ = "" + i;
        return s !== null && s.ref !== null && typeof s.ref == "function" && s.ref._stringRef === _ ? s.ref : (s = function(N) {
          var j = h.refs;
          N === null ? delete j[_] : j[_] = N;
        }, s._stringRef = _, s);
      }
      if (typeof i != "string") throw Error(l(284));
      if (!u._owner) throw Error(l(290, i));
    }
    return i;
  }
  function q1(i, s) {
    throw i = Object.prototype.toString.call(s), Error(l(31, i === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : i));
  }
  function L3(i) {
    var s = i._init;
    return s(i._payload);
  }
  function A3(i) {
    function s(B, O) {
      if (i) {
        var X = B.deletions;
        X === null ? (B.deletions = [O], B.flags |= 16) : X.push(O);
      }
    }
    function u(B, O) {
      if (!i) return null;
      for (; O !== null; ) s(B, O), O = O.sibling;
      return null;
    }
    function f(B, O) {
      for (B = /* @__PURE__ */ new Map(); O !== null; ) O.key !== null ? B.set(O.key, O) : B.set(O.index, O), O = O.sibling;
      return B;
    }
    function h(B, O) {
      return B = Gi(B, O), B.index = 0, B.sibling = null, B;
    }
    function _(B, O, X) {
      return B.index = X, i ? (X = B.alternate, X !== null ? (X = X.index, X < O ? (B.flags |= 2, O) : X) : (B.flags |= 2, O)) : (B.flags |= 1048576, O);
    }
    function N(B) {
      return i && B.alternate === null && (B.flags |= 2), B;
    }
    function j(B, O, X, Se) {
      return O === null || O.tag !== 6 ? (O = jd(X, B.mode, Se), O.return = B, O) : (O = h(O, X), O.return = B, O);
    }
    function Z(B, O, X, Se) {
      var Te = X.type;
      return Te === y ? Le(B, O, X.props.children, Se, X.key) : O !== null && (O.elementType === Te || typeof Te == "object" && Te !== null && Te.$$typeof === g && L3(Te) === O.type) ? (Se = h(O, X.props), Se.ref = Ba(B, O, X), Se.return = B, Se) : (Se = P0(X.type, X.key, X.props, null, B.mode, Se), Se.ref = Ba(B, O, X), Se.return = B, Se);
    }
    function le(B, O, X, Se) {
      return O === null || O.tag !== 4 || O.stateNode.containerInfo !== X.containerInfo || O.stateNode.implementation !== X.implementation ? (O = Od(X, B.mode, Se), O.return = B, O) : (O = h(O, X.children || []), O.return = B, O);
    }
    function Le(B, O, X, Se, Te) {
      return O === null || O.tag !== 7 ? (O = Oo(X, B.mode, Se, Te), O.return = B, O) : (O = h(O, X), O.return = B, O);
    }
    function Be(B, O, X) {
      if (typeof O == "string" && O !== "" || typeof O == "number") return O = jd("" + O, B.mode, X), O.return = B, O;
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case d:
            return X = P0(O.type, O.key, O.props, null, B.mode, X), X.ref = Ba(B, null, O), X.return = B, X;
          case p:
            return O = Od(O, B.mode, X), O.return = B, O;
          case g:
            var Se = O._init;
            return Be(B, Se(O._payload), X);
        }
        if (Q(O) || E(O)) return O = Oo(O, B.mode, X, null), O.return = B, O;
        q1(B, O);
      }
      return null;
    }
    function _e(B, O, X, Se) {
      var Te = O !== null ? O.key : null;
      if (typeof X == "string" && X !== "" || typeof X == "number") return Te !== null ? null : j(B, O, "" + X, Se);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case d:
            return X.key === Te ? Z(B, O, X, Se) : null;
          case p:
            return X.key === Te ? le(B, O, X, Se) : null;
          case g:
            return Te = X._init, _e(
              B,
              O,
              Te(X._payload),
              Se
            );
        }
        if (Q(X) || E(X)) return Te !== null ? null : Le(B, O, X, Se, null);
        q1(B, X);
      }
      return null;
    }
    function yt(B, O, X, Se, Te) {
      if (typeof Se == "string" && Se !== "" || typeof Se == "number") return B = B.get(X) || null, j(O, B, "" + Se, Te);
      if (typeof Se == "object" && Se !== null) {
        switch (Se.$$typeof) {
          case d:
            return B = B.get(Se.key === null ? X : Se.key) || null, Z(O, B, Se, Te);
          case p:
            return B = B.get(Se.key === null ? X : Se.key) || null, le(O, B, Se, Te);
          case g:
            var Ke = Se._init;
            return yt(B, O, X, Ke(Se._payload), Te);
        }
        if (Q(Se) || E(Se)) return B = B.get(X) || null, Le(O, B, Se, Te, null);
        q1(O, Se);
      }
      return null;
    }
    function ft(B, O, X, Se) {
      for (var Te = null, Ke = null, We = O, it = O = 0, qt = null; We !== null && it < X.length; it++) {
        We.index > it ? (qt = We, We = null) : qt = We.sibling;
        var ot = _e(B, We, X[it], Se);
        if (ot === null) {
          We === null && (We = qt);
          break;
        }
        i && We && ot.alternate === null && s(B, We), O = _(ot, O, it), Ke === null ? Te = ot : Ke.sibling = ot, Ke = ot, We = qt;
      }
      if (it === X.length) return u(B, We), Ct && Ho(B, it), Te;
      if (We === null) {
        for (; it < X.length; it++) We = Be(B, X[it], Se), We !== null && (O = _(We, O, it), Ke === null ? Te = We : Ke.sibling = We, Ke = We);
        return Ct && Ho(B, it), Te;
      }
      for (We = f(B, We); it < X.length; it++) qt = yt(We, B, it, X[it], Se), qt !== null && (i && qt.alternate !== null && We.delete(qt.key === null ? it : qt.key), O = _(qt, O, it), Ke === null ? Te = qt : Ke.sibling = qt, Ke = qt);
      return i && We.forEach(function(Ui) {
        return s(B, Ui);
      }), Ct && Ho(B, it), Te;
    }
    function Rn(B, O, X, Se) {
      var Te = E(X);
      if (typeof Te != "function") throw Error(l(150));
      if (X = Te.call(X), X == null) throw Error(l(151));
      for (var Ke = Te = null, We = O, it = O = 0, qt = null, ot = X.next(); We !== null && !ot.done; it++, ot = X.next()) {
        We.index > it ? (qt = We, We = null) : qt = We.sibling;
        var Ui = _e(B, We, ot.value, Se);
        if (Ui === null) {
          We === null && (We = qt);
          break;
        }
        i && We && Ui.alternate === null && s(B, We), O = _(Ui, O, it), Ke === null ? Te = Ui : Ke.sibling = Ui, Ke = Ui, We = qt;
      }
      if (ot.done) return u(
        B,
        We
      ), Ct && Ho(B, it), Te;
      if (We === null) {
        for (; !ot.done; it++, ot = X.next()) ot = Be(B, ot.value, Se), ot !== null && (O = _(ot, O, it), Ke === null ? Te = ot : Ke.sibling = ot, Ke = ot);
        return Ct && Ho(B, it), Te;
      }
      for (We = f(B, We); !ot.done; it++, ot = X.next()) ot = yt(We, B, it, ot.value, Se), ot !== null && (i && ot.alternate !== null && We.delete(ot.key === null ? it : ot.key), O = _(ot, O, it), Ke === null ? Te = ot : Ke.sibling = ot, Ke = ot);
      return i && We.forEach(function(Uy) {
        return s(B, Uy);
      }), Ct && Ho(B, it), Te;
    }
    function li(B, O, X, Se) {
      if (typeof X == "object" && X !== null && X.type === y && X.key === null && (X = X.props.children), typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case d:
            e: {
              for (var Te = X.key, Ke = O; Ke !== null; ) {
                if (Ke.key === Te) {
                  if (Te = X.type, Te === y) {
                    if (Ke.tag === 7) {
                      u(B, Ke.sibling), O = h(Ke, X.props.children), O.return = B, B = O;
                      break e;
                    }
                  } else if (Ke.elementType === Te || typeof Te == "object" && Te !== null && Te.$$typeof === g && L3(Te) === Ke.type) {
                    u(B, Ke.sibling), O = h(Ke, X.props), O.ref = Ba(B, Ke, X), O.return = B, B = O;
                    break e;
                  }
                  u(B, Ke);
                  break;
                } else s(B, Ke);
                Ke = Ke.sibling;
              }
              X.type === y ? (O = Oo(X.props.children, B.mode, Se, X.key), O.return = B, B = O) : (Se = P0(X.type, X.key, X.props, null, B.mode, Se), Se.ref = Ba(B, O, X), Se.return = B, B = Se);
            }
            return N(B);
          case p:
            e: {
              for (Ke = X.key; O !== null; ) {
                if (O.key === Ke) if (O.tag === 4 && O.stateNode.containerInfo === X.containerInfo && O.stateNode.implementation === X.implementation) {
                  u(B, O.sibling), O = h(O, X.children || []), O.return = B, B = O;
                  break e;
                } else {
                  u(B, O);
                  break;
                }
                else s(B, O);
                O = O.sibling;
              }
              O = Od(X, B.mode, Se), O.return = B, B = O;
            }
            return N(B);
          case g:
            return Ke = X._init, li(B, O, Ke(X._payload), Se);
        }
        if (Q(X)) return ft(B, O, X, Se);
        if (E(X)) return Rn(B, O, X, Se);
        q1(B, X);
      }
      return typeof X == "string" && X !== "" || typeof X == "number" ? (X = "" + X, O !== null && O.tag === 6 ? (u(B, O.sibling), O = h(O, X), O.return = B, B = O) : (u(B, O), O = jd(X, B.mode, Se), O.return = B, B = O), N(B)) : u(B, O);
    }
    return li;
  }
  var ks = A3(!0), b3 = A3(!1), J1 = Ti(null), e0 = null, Ms = null, B2 = null;
  function W2() {
    B2 = Ms = e0 = null;
  }
  function P3(i, s, u) {
    ze ? (pt(J1, s._currentValue), s._currentValue = u) : (pt(J1, s._currentValue2), s._currentValue2 = u);
  }
  function Z2(i) {
    var s = J1.current;
    mt(J1), ze ? i._currentValue = s : i._currentValue2 = s;
  }
  function Y2(i, s, u) {
    for (; i !== null; ) {
      var f = i.alternate;
      if ((i.childLanes & s) !== s ? (i.childLanes |= s, f !== null && (f.childLanes |= s)) : f !== null && (f.childLanes & s) !== s && (f.childLanes |= s), i === u) break;
      i = i.return;
    }
  }
  function Ls(i, s) {
    e0 = i, B2 = Ms = null, i = i.dependencies, i !== null && i.firstContext !== null && (i.lanes & s && (Hn = !0), i.firstContext = null);
  }
  function tr(i) {
    var s = ze ? i._currentValue : i._currentValue2;
    if (B2 !== i) if (i = { context: i, memoizedValue: s, next: null }, Ms === null) {
      if (e0 === null) throw Error(l(308));
      Ms = i, e0.dependencies = { lanes: 0, firstContext: i };
    } else Ms = Ms.next = i;
    return s;
  }
  var Vo = null;
  function K2(i) {
    Vo === null ? Vo = [i] : Vo.push(i);
  }
  function E3(i, s, u, f) {
    var h = s.interleaved;
    return h === null ? (u.next = u, K2(s)) : (u.next = h.next, h.next = u), s.interleaved = u, zr(i, f);
  }
  function zr(i, s) {
    i.lanes |= s;
    var u = i.alternate;
    for (u !== null && (u.lanes |= s), u = i, i = i.return; i !== null; ) i.childLanes |= s, u = i.alternate, u !== null && (u.childLanes |= s), u = i, i = i.return;
    return u.tag === 3 ? u.stateNode : null;
  }
  var zi = !1;
  function X2(i) {
    i.updateQueue = { baseState: i.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function N3(i, s) {
    i = i.updateQueue, s.updateQueue === i && (s.updateQueue = { baseState: i.baseState, firstBaseUpdate: i.firstBaseUpdate, lastBaseUpdate: i.lastBaseUpdate, shared: i.shared, effects: i.effects });
  }
  function oi(i, s) {
    return { eventTime: i, lane: s, tag: 0, payload: null, callback: null, next: null };
  }
  function Fi(i, s, u) {
    var f = i.updateQueue;
    if (f === null) return null;
    if (f = f.shared, $e & 2) {
      var h = f.pending;
      return h === null ? s.next = s : (s.next = h.next, h.next = s), f.pending = s, zr(i, u);
    }
    return h = f.interleaved, h === null ? (s.next = s, K2(f)) : (s.next = h.next, h.next = s), f.interleaved = s, zr(i, u);
  }
  function t0(i, s, u) {
    if (s = s.updateQueue, s !== null && (s = s.shared, (u & 4194240) !== 0)) {
      var f = s.lanes;
      f &= i.pendingLanes, u |= f, s.lanes = u, T2(i, u);
    }
  }
  function H3(i, s) {
    var u = i.updateQueue, f = i.alternate;
    if (f !== null && (f = f.updateQueue, u === f)) {
      var h = null, _ = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var N = { eventTime: u.eventTime, lane: u.lane, tag: u.tag, payload: u.payload, callback: u.callback, next: null };
          _ === null ? h = _ = N : _ = _.next = N, u = u.next;
        } while (u !== null);
        _ === null ? h = _ = s : _ = _.next = s;
      } else h = _ = s;
      u = { baseState: f.baseState, firstBaseUpdate: h, lastBaseUpdate: _, shared: f.shared, effects: f.effects }, i.updateQueue = u;
      return;
    }
    i = u.lastBaseUpdate, i === null ? u.firstBaseUpdate = s : i.next = s, u.lastBaseUpdate = s;
  }
  function n0(i, s, u, f) {
    var h = i.updateQueue;
    zi = !1;
    var _ = h.firstBaseUpdate, N = h.lastBaseUpdate, j = h.shared.pending;
    if (j !== null) {
      h.shared.pending = null;
      var Z = j, le = Z.next;
      Z.next = null, N === null ? _ = le : N.next = le, N = Z;
      var Le = i.alternate;
      Le !== null && (Le = Le.updateQueue, j = Le.lastBaseUpdate, j !== N && (j === null ? Le.firstBaseUpdate = le : j.next = le, Le.lastBaseUpdate = Z));
    }
    if (_ !== null) {
      var Be = h.baseState;
      N = 0, Le = le = Z = null, j = _;
      do {
        var _e = j.lane, yt = j.eventTime;
        if ((f & _e) === _e) {
          Le !== null && (Le = Le.next = {
            eventTime: yt,
            lane: 0,
            tag: j.tag,
            payload: j.payload,
            callback: j.callback,
            next: null
          });
          e: {
            var ft = i, Rn = j;
            switch (_e = s, yt = u, Rn.tag) {
              case 1:
                if (ft = Rn.payload, typeof ft == "function") {
                  Be = ft.call(yt, Be, _e);
                  break e;
                }
                Be = ft;
                break e;
              case 3:
                ft.flags = ft.flags & -65537 | 128;
              case 0:
                if (ft = Rn.payload, _e = typeof ft == "function" ? ft.call(yt, Be, _e) : ft, _e == null) break e;
                Be = a({}, Be, _e);
                break e;
              case 2:
                zi = !0;
            }
          }
          j.callback !== null && j.lane !== 0 && (i.flags |= 64, _e = h.effects, _e === null ? h.effects = [j] : _e.push(j));
        } else yt = { eventTime: yt, lane: _e, tag: j.tag, payload: j.payload, callback: j.callback, next: null }, Le === null ? (le = Le = yt, Z = Be) : Le = Le.next = yt, N |= _e;
        if (j = j.next, j === null) {
          if (j = h.shared.pending, j === null) break;
          _e = j, j = _e.next, _e.next = null, h.lastBaseUpdate = _e, h.shared.pending = null;
        }
      } while (!0);
      if (Le === null && (Z = Be), h.baseState = Z, h.firstBaseUpdate = le, h.lastBaseUpdate = Le, s = h.shared.interleaved, s !== null) {
        h = s;
        do
          N |= h.lane, h = h.next;
        while (h !== s);
      } else _ === null && (h.shared.lanes = 0);
      Ro |= N, i.lanes = N, i.memoizedState = Be;
    }
  }
  function V3(i, s, u) {
    if (i = s.effects, s.effects = null, i !== null) for (s = 0; s < i.length; s++) {
      var f = i[s], h = f.callback;
      if (h !== null) {
        if (f.callback = null, f = u, typeof h != "function") throw Error(l(191, h));
        h.call(f);
      }
    }
  }
  var Wa = {}, nr = Ti(Wa), Za = Ti(Wa), As = Ti(Wa);
  function Fr(i) {
    if (i === Wa) throw Error(l(174));
    return i;
  }
  function $2(i, s) {
    pt(As, s), pt(Za, i), pt(nr, Wa), i = q(s), mt(nr), pt(nr, i);
  }
  function bs() {
    mt(nr), mt(Za), mt(As);
  }
  function T3(i) {
    var s = Fr(As.current), u = Fr(nr.current);
    s = G(u, i.type, s), u !== s && (pt(Za, i), pt(nr, s));
  }
  function Q2(i) {
    Za.current === i && (mt(nr), mt(Za));
  }
  var Mt = Ti(0);
  function r0(i) {
    for (var s = i; s !== null; ) {
      if (s.tag === 13) {
        var u = s.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || Gt(u) || Cn(u))) return s;
      } else if (s.tag === 19 && s.memoizedProps.revealOrder !== void 0) {
        if (s.flags & 128) return s;
      } else if (s.child !== null) {
        s.child.return = s, s = s.child;
        continue;
      }
      if (s === i) break;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === i) return null;
        s = s.return;
      }
      s.sibling.return = s.return, s = s.sibling;
    }
    return null;
  }
  var q2 = [];
  function J2() {
    for (var i = 0; i < q2.length; i++) {
      var s = q2[i];
      ze ? s._workInProgressVersionPrimary = null : s._workInProgressVersionSecondary = null;
    }
    q2.length = 0;
  }
  var i0 = c.ReactCurrentDispatcher, ed = c.ReactCurrentBatchConfig, To = 0, Lt = null, Ut = null, $t = null, o0 = !1, Ya = !1, Ka = 0, py = 0;
  function fn() {
    throw Error(l(321));
  }
  function td(i, s) {
    if (s === null) return !1;
    for (var u = 0; u < s.length && u < i.length; u++) if (!gr(i[u], s[u])) return !1;
    return !0;
  }
  function nd(i, s, u, f, h, _) {
    if (To = _, Lt = s, s.memoizedState = null, s.updateQueue = null, s.lanes = 0, i0.current = i === null || i.memoizedState === null ? vy : xy, i = u(f, h), Ya) {
      _ = 0;
      do {
        if (Ya = !1, Ka = 0, 25 <= _) throw Error(l(301));
        _ += 1, $t = Ut = null, s.updateQueue = null, i0.current = _y, i = u(f, h);
      } while (Ya);
    }
    if (i0.current = l0, s = Ut !== null && Ut.next !== null, To = 0, $t = Ut = Lt = null, o0 = !1, s) throw Error(l(300));
    return i;
  }
  function rd() {
    var i = Ka !== 0;
    return Ka = 0, i;
  }
  function jr() {
    var i = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return $t === null ? Lt.memoizedState = $t = i : $t = $t.next = i, $t;
  }
  function rr() {
    if (Ut === null) {
      var i = Lt.alternate;
      i = i !== null ? i.memoizedState : null;
    } else i = Ut.next;
    var s = $t === null ? Lt.memoizedState : $t.next;
    if (s !== null) $t = s, Ut = i;
    else {
      if (i === null) throw Error(l(310));
      Ut = i, i = { memoizedState: Ut.memoizedState, baseState: Ut.baseState, baseQueue: Ut.baseQueue, queue: Ut.queue, next: null }, $t === null ? Lt.memoizedState = $t = i : $t = $t.next = i;
    }
    return $t;
  }
  function Xa(i, s) {
    return typeof s == "function" ? s(i) : s;
  }
  function id(i) {
    var s = rr(), u = s.queue;
    if (u === null) throw Error(l(311));
    u.lastRenderedReducer = i;
    var f = Ut, h = f.baseQueue, _ = u.pending;
    if (_ !== null) {
      if (h !== null) {
        var N = h.next;
        h.next = _.next, _.next = N;
      }
      f.baseQueue = h = _, u.pending = null;
    }
    if (h !== null) {
      _ = h.next, f = f.baseState;
      var j = N = null, Z = null, le = _;
      do {
        var Le = le.lane;
        if ((To & Le) === Le) Z !== null && (Z = Z.next = { lane: 0, action: le.action, hasEagerState: le.hasEagerState, eagerState: le.eagerState, next: null }), f = le.hasEagerState ? le.eagerState : i(f, le.action);
        else {
          var Be = {
            lane: Le,
            action: le.action,
            hasEagerState: le.hasEagerState,
            eagerState: le.eagerState,
            next: null
          };
          Z === null ? (j = Z = Be, N = f) : Z = Z.next = Be, Lt.lanes |= Le, Ro |= Le;
        }
        le = le.next;
      } while (le !== null && le !== _);
      Z === null ? N = f : Z.next = j, gr(f, s.memoizedState) || (Hn = !0), s.memoizedState = f, s.baseState = N, s.baseQueue = Z, u.lastRenderedState = f;
    }
    if (i = u.interleaved, i !== null) {
      h = i;
      do
        _ = h.lane, Lt.lanes |= _, Ro |= _, h = h.next;
      while (h !== i);
    } else h === null && (u.lanes = 0);
    return [s.memoizedState, u.dispatch];
  }
  function od(i) {
    var s = rr(), u = s.queue;
    if (u === null) throw Error(l(311));
    u.lastRenderedReducer = i;
    var f = u.dispatch, h = u.pending, _ = s.memoizedState;
    if (h !== null) {
      u.pending = null;
      var N = h = h.next;
      do
        _ = i(_, N.action), N = N.next;
      while (N !== h);
      gr(_, s.memoizedState) || (Hn = !0), s.memoizedState = _, s.baseQueue === null && (s.baseState = _), u.lastRenderedState = _;
    }
    return [_, f];
  }
  function R3() {
  }
  function z3(i, s) {
    var u = Lt, f = rr(), h = s(), _ = !gr(f.memoizedState, h);
    if (_ && (f.memoizedState = h, Hn = !0), f = f.queue, sd(O3.bind(null, u, f, i), [i]), f.getSnapshot !== s || _ || $t !== null && $t.memoizedState.tag & 1) {
      if (u.flags |= 2048, $a(9, j3.bind(null, u, f, h, s), void 0, null), Qt === null) throw Error(l(349));
      To & 30 || F3(u, s, h);
    }
    return h;
  }
  function F3(i, s, u) {
    i.flags |= 16384, i = { getSnapshot: s, value: u }, s = Lt.updateQueue, s === null ? (s = { lastEffect: null, stores: null }, Lt.updateQueue = s, s.stores = [i]) : (u = s.stores, u === null ? s.stores = [i] : u.push(i));
  }
  function j3(i, s, u, f) {
    s.value = u, s.getSnapshot = f, I3(s) && D3(i);
  }
  function O3(i, s, u) {
    return u(function() {
      I3(s) && D3(i);
    });
  }
  function I3(i) {
    var s = i.getSnapshot;
    i = i.value;
    try {
      var u = s();
      return !gr(i, u);
    } catch {
      return !0;
    }
  }
  function D3(i) {
    var s = zr(i, 1);
    s !== null && ir(s, i, 1, -1);
  }
  function G3(i) {
    var s = jr();
    return typeof i == "function" && (i = i()), s.memoizedState = s.baseState = i, i = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Xa, lastRenderedState: i }, s.queue = i, i = i.dispatch = yy.bind(null, Lt, i), [s.memoizedState, i];
  }
  function $a(i, s, u, f) {
    return i = { tag: i, create: s, destroy: u, deps: f, next: null }, s = Lt.updateQueue, s === null ? (s = { lastEffect: null, stores: null }, Lt.updateQueue = s, s.lastEffect = i.next = i) : (u = s.lastEffect, u === null ? s.lastEffect = i.next = i : (f = u.next, u.next = i, i.next = f, s.lastEffect = i)), i;
  }
  function U3() {
    return rr().memoizedState;
  }
  function s0(i, s, u, f) {
    var h = jr();
    Lt.flags |= i, h.memoizedState = $a(1 | s, u, void 0, f === void 0 ? null : f);
  }
  function a0(i, s, u, f) {
    var h = rr();
    f = f === void 0 ? null : f;
    var _ = void 0;
    if (Ut !== null) {
      var N = Ut.memoizedState;
      if (_ = N.destroy, f !== null && td(f, N.deps)) {
        h.memoizedState = $a(s, u, _, f);
        return;
      }
    }
    Lt.flags |= i, h.memoizedState = $a(1 | s, u, _, f);
  }
  function B3(i, s) {
    return s0(8390656, 8, i, s);
  }
  function sd(i, s) {
    return a0(2048, 8, i, s);
  }
  function W3(i, s) {
    return a0(4, 2, i, s);
  }
  function Z3(i, s) {
    return a0(4, 4, i, s);
  }
  function Y3(i, s) {
    if (typeof s == "function") return i = i(), s(i), function() {
      s(null);
    };
    if (s != null) return i = i(), s.current = i, function() {
      s.current = null;
    };
  }
  function K3(i, s, u) {
    return u = u != null ? u.concat([i]) : null, a0(4, 4, Y3.bind(null, s, i), u);
  }
  function ad() {
  }
  function X3(i, s) {
    var u = rr();
    s = s === void 0 ? null : s;
    var f = u.memoizedState;
    return f !== null && s !== null && td(s, f[1]) ? f[0] : (u.memoizedState = [i, s], i);
  }
  function $3(i, s) {
    var u = rr();
    s = s === void 0 ? null : s;
    var f = u.memoizedState;
    return f !== null && s !== null && td(s, f[1]) ? f[0] : (i = i(), u.memoizedState = [i, s], i);
  }
  function Q3(i, s, u) {
    return To & 21 ? (gr(u, s) || (u = y3(), Lt.lanes |= u, Ro |= u, i.baseState = !0), s) : (i.baseState && (i.baseState = !1, Hn = !0), i.memoizedState = u);
  }
  function gy(i, s) {
    var u = rt;
    rt = u !== 0 && 4 > u ? u : 4, i(!0);
    var f = ed.transition;
    ed.transition = {};
    try {
      i(!1), s();
    } finally {
      rt = u, ed.transition = f;
    }
  }
  function q3() {
    return rr().memoizedState;
  }
  function my(i, s, u) {
    var f = Ii(i);
    if (u = { lane: f, action: u, hasEagerState: !1, eagerState: null, next: null }, J3(i)) e4(s, u);
    else if (u = E3(i, s, u, f), u !== null) {
      var h = gn();
      ir(u, i, f, h), t4(u, s, f);
    }
  }
  function yy(i, s, u) {
    var f = Ii(i), h = { lane: f, action: u, hasEagerState: !1, eagerState: null, next: null };
    if (J3(i)) e4(s, h);
    else {
      var _ = i.alternate;
      if (i.lanes === 0 && (_ === null || _.lanes === 0) && (_ = s.lastRenderedReducer, _ !== null)) try {
        var N = s.lastRenderedState, j = _(N, u);
        if (h.hasEagerState = !0, h.eagerState = j, gr(j, N)) {
          var Z = s.interleaved;
          Z === null ? (h.next = h, K2(s)) : (h.next = Z.next, Z.next = h), s.interleaved = h;
          return;
        }
      } catch {
      } finally {
      }
      u = E3(i, s, h, f), u !== null && (h = gn(), ir(u, i, f, h), t4(u, s, f));
    }
  }
  function J3(i) {
    var s = i.alternate;
    return i === Lt || s !== null && s === Lt;
  }
  function e4(i, s) {
    Ya = o0 = !0;
    var u = i.pending;
    u === null ? s.next = s : (s.next = u.next, u.next = s), i.pending = s;
  }
  function t4(i, s, u) {
    if (u & 4194240) {
      var f = s.lanes;
      f &= i.pendingLanes, u |= f, s.lanes = u, T2(i, u);
    }
  }
  var l0 = { readContext: tr, useCallback: fn, useContext: fn, useEffect: fn, useImperativeHandle: fn, useInsertionEffect: fn, useLayoutEffect: fn, useMemo: fn, useReducer: fn, useRef: fn, useState: fn, useDebugValue: fn, useDeferredValue: fn, useTransition: fn, useMutableSource: fn, useSyncExternalStore: fn, useId: fn, unstable_isNewReconciler: !1 }, vy = { readContext: tr, useCallback: function(i, s) {
    return jr().memoizedState = [i, s === void 0 ? null : s], i;
  }, useContext: tr, useEffect: B3, useImperativeHandle: function(i, s, u) {
    return u = u != null ? u.concat([i]) : null, s0(
      4194308,
      4,
      Y3.bind(null, s, i),
      u
    );
  }, useLayoutEffect: function(i, s) {
    return s0(4194308, 4, i, s);
  }, useInsertionEffect: function(i, s) {
    return s0(4, 2, i, s);
  }, useMemo: function(i, s) {
    var u = jr();
    return s = s === void 0 ? null : s, i = i(), u.memoizedState = [i, s], i;
  }, useReducer: function(i, s, u) {
    var f = jr();
    return s = u !== void 0 ? u(s) : s, f.memoizedState = f.baseState = s, i = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: i, lastRenderedState: s }, f.queue = i, i = i.dispatch = my.bind(null, Lt, i), [f.memoizedState, i];
  }, useRef: function(i) {
    var s = jr();
    return i = { current: i }, s.memoizedState = i;
  }, useState: G3, useDebugValue: ad, useDeferredValue: function(i) {
    return jr().memoizedState = i;
  }, useTransition: function() {
    var i = G3(!1), s = i[0];
    return i = gy.bind(null, i[1]), jr().memoizedState = i, [s, i];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(i, s, u) {
    var f = Lt, h = jr();
    if (Ct) {
      if (u === void 0) throw Error(l(407));
      u = u();
    } else {
      if (u = s(), Qt === null) throw Error(l(349));
      To & 30 || F3(f, s, u);
    }
    h.memoizedState = u;
    var _ = { value: u, getSnapshot: s };
    return h.queue = _, B3(O3.bind(
      null,
      f,
      _,
      i
    ), [i]), f.flags |= 2048, $a(9, j3.bind(null, f, _, u, s), void 0, null), u;
  }, useId: function() {
    var i = jr(), s = Qt.identifierPrefix;
    if (Ct) {
      var u = ii, f = ri;
      u = (f & ~(1 << 32 - pr(f) - 1)).toString(32) + u, s = ":" + s + "R" + u, u = Ka++, 0 < u && (s += "H" + u.toString(32)), s += ":";
    } else u = py++, s = ":" + s + "r" + u.toString(32) + ":";
    return i.memoizedState = s;
  }, unstable_isNewReconciler: !1 }, xy = {
    readContext: tr,
    useCallback: X3,
    useContext: tr,
    useEffect: sd,
    useImperativeHandle: K3,
    useInsertionEffect: W3,
    useLayoutEffect: Z3,
    useMemo: $3,
    useReducer: id,
    useRef: U3,
    useState: function() {
      return id(Xa);
    },
    useDebugValue: ad,
    useDeferredValue: function(i) {
      var s = rr();
      return Q3(s, Ut.memoizedState, i);
    },
    useTransition: function() {
      var i = id(Xa)[0], s = rr().memoizedState;
      return [i, s];
    },
    useMutableSource: R3,
    useSyncExternalStore: z3,
    useId: q3,
    unstable_isNewReconciler: !1
  }, _y = { readContext: tr, useCallback: X3, useContext: tr, useEffect: sd, useImperativeHandle: K3, useInsertionEffect: W3, useLayoutEffect: Z3, useMemo: $3, useReducer: od, useRef: U3, useState: function() {
    return od(Xa);
  }, useDebugValue: ad, useDeferredValue: function(i) {
    var s = rr();
    return Ut === null ? s.memoizedState = i : Q3(s, Ut.memoizedState, i);
  }, useTransition: function() {
    var i = od(Xa)[0], s = rr().memoizedState;
    return [i, s];
  }, useMutableSource: R3, useSyncExternalStore: z3, useId: q3, unstable_isNewReconciler: !1 };
  function yr(i, s) {
    if (i && i.defaultProps) {
      s = a({}, s), i = i.defaultProps;
      for (var u in i) s[u] === void 0 && (s[u] = i[u]);
      return s;
    }
    return s;
  }
  function ld(i, s, u, f) {
    s = i.memoizedState, u = u(f, s), u = u == null ? s : a({}, s, u), i.memoizedState = u, i.lanes === 0 && (i.updateQueue.baseState = u);
  }
  var u0 = { isMounted: function(i) {
    return (i = i._reactInternals) ? R(i) === i : !1;
  }, enqueueSetState: function(i, s, u) {
    i = i._reactInternals;
    var f = gn(), h = Ii(i), _ = oi(f, h);
    _.payload = s, u != null && (_.callback = u), s = Fi(i, _, h), s !== null && (ir(s, i, h, f), t0(s, i, h));
  }, enqueueReplaceState: function(i, s, u) {
    i = i._reactInternals;
    var f = gn(), h = Ii(i), _ = oi(f, h);
    _.tag = 1, _.payload = s, u != null && (_.callback = u), s = Fi(i, _, h), s !== null && (ir(s, i, h, f), t0(s, i, h));
  }, enqueueForceUpdate: function(i, s) {
    i = i._reactInternals;
    var u = gn(), f = Ii(i), h = oi(u, f);
    h.tag = 2, s != null && (h.callback = s), s = Fi(i, h, f), s !== null && (ir(s, i, f, u), t0(s, i, f));
  } };
  function n4(i, s, u, f, h, _, N) {
    return i = i.stateNode, typeof i.shouldComponentUpdate == "function" ? i.shouldComponentUpdate(f, _, N) : s.prototype && s.prototype.isPureReactComponent ? !Q1(u, f) || !Q1(h, _) : !0;
  }
  function r4(i, s, u) {
    var f = !1, h = Ri, _ = s.contextType;
    return typeof _ == "object" && _ !== null ? _ = tr(_) : (h = Nn(s) ? Eo : dn.current, f = s.contextTypes, _ = (f = f != null) ? _s(i, h) : Ri), s = new s(u, _), i.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = u0, i.stateNode = s, s._reactInternals = i, f && (i = i.stateNode, i.__reactInternalMemoizedUnmaskedChildContext = h, i.__reactInternalMemoizedMaskedChildContext = _), s;
  }
  function i4(i, s, u, f) {
    i = s.state, typeof s.componentWillReceiveProps == "function" && s.componentWillReceiveProps(u, f), typeof s.UNSAFE_componentWillReceiveProps == "function" && s.UNSAFE_componentWillReceiveProps(u, f), s.state !== i && u0.enqueueReplaceState(s, s.state, null);
  }
  function ud(i, s, u, f) {
    var h = i.stateNode;
    h.props = u, h.state = i.memoizedState, h.refs = {}, X2(i);
    var _ = s.contextType;
    typeof _ == "object" && _ !== null ? h.context = tr(_) : (_ = Nn(s) ? Eo : dn.current, h.context = _s(i, _)), h.state = i.memoizedState, _ = s.getDerivedStateFromProps, typeof _ == "function" && (ld(i, s, _, u), h.state = i.memoizedState), typeof s.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (s = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), s !== h.state && u0.enqueueReplaceState(h, h.state, null), n0(i, u, h, f), h.state = i.memoizedState), typeof h.componentDidMount == "function" && (i.flags |= 4194308);
  }
  function Ps(i, s) {
    try {
      var u = "", f = s;
      do
        u += hy(f), f = f.return;
      while (f);
      var h = u;
    } catch (_) {
      h = `
Error generating stack: ` + _.message + `
` + _.stack;
    }
    return { value: i, source: s, stack: h, digest: null };
  }
  function cd(i, s, u) {
    return { value: i, source: null, stack: u ?? null, digest: s ?? null };
  }
  function dd(i, s) {
    try {
      console.error(s.value);
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  var Cy = typeof WeakMap == "function" ? WeakMap : Map;
  function o4(i, s, u) {
    u = oi(-1, u), u.tag = 3, u.payload = { element: null };
    var f = s.value;
    return u.callback = function() {
      S0 || (S0 = !0, Nd = f), dd(i, s);
    }, u;
  }
  function s4(i, s, u) {
    u = oi(-1, u), u.tag = 3;
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = s.value;
      u.payload = function() {
        return f(h);
      }, u.callback = function() {
        dd(i, s);
      };
    }
    var _ = i.stateNode;
    return _ !== null && typeof _.componentDidCatch == "function" && (u.callback = function() {
      dd(i, s), typeof f != "function" && (ji === null ? ji = /* @__PURE__ */ new Set([this]) : ji.add(this));
      var N = s.stack;
      this.componentDidCatch(s.value, { componentStack: N !== null ? N : "" });
    }), u;
  }
  function a4(i, s, u) {
    var f = i.pingCache;
    if (f === null) {
      f = i.pingCache = new Cy();
      var h = /* @__PURE__ */ new Set();
      f.set(s, h);
    } else h = f.get(s), h === void 0 && (h = /* @__PURE__ */ new Set(), f.set(s, h));
    h.has(u) || (h.add(u), i = Ry.bind(null, i, s, u), s.then(i, i));
  }
  function l4(i) {
    do {
      var s;
      if ((s = i.tag === 13) && (s = i.memoizedState, s = s !== null ? s.dehydrated !== null : !0), s) return i;
      i = i.return;
    } while (i !== null);
    return null;
  }
  function u4(i, s, u, f, h) {
    return i.mode & 1 ? (i.flags |= 65536, i.lanes = h, i) : (i === s ? i.flags |= 65536 : (i.flags |= 128, u.flags |= 131072, u.flags &= -52805, u.tag === 1 && (u.alternate === null ? u.tag = 17 : (s = oi(-1, 1), s.tag = 2, Fi(u, s, 1))), u.lanes |= 1), i);
  }
  var wy = c.ReactCurrentOwner, Hn = !1;
  function wn(i, s, u, f) {
    s.child = i === null ? b3(s, null, u, f) : ks(s, i.child, u, f);
  }
  function c4(i, s, u, f, h) {
    u = u.render;
    var _ = s.ref;
    return Ls(s, h), f = nd(i, s, u, f, _, h), u = rd(), i !== null && !Hn ? (s.updateQueue = i.updateQueue, s.flags &= -2053, i.lanes &= ~h, si(i, s, h)) : (Ct && u && O2(s), s.flags |= 1, wn(i, s, f, h), s.child);
  }
  function d4(i, s, u, f, h) {
    if (i === null) {
      var _ = u.type;
      return typeof _ == "function" && !Fd(_) && _.defaultProps === void 0 && u.compare === null && u.defaultProps === void 0 ? (s.tag = 15, s.type = _, f4(i, s, _, f, h)) : (i = P0(u.type, null, f, s, s.mode, h), i.ref = s.ref, i.return = s, s.child = i);
    }
    if (_ = i.child, !(i.lanes & h)) {
      var N = _.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Q1, u(N, f) && i.ref === s.ref) return si(i, s, h);
    }
    return s.flags |= 1, i = Gi(_, f), i.ref = s.ref, i.return = s, s.child = i;
  }
  function f4(i, s, u, f, h) {
    if (i !== null) {
      var _ = i.memoizedProps;
      if (Q1(_, f) && i.ref === s.ref) if (Hn = !1, s.pendingProps = f = _, (i.lanes & h) !== 0) i.flags & 131072 && (Hn = !0);
      else return s.lanes = i.lanes, si(i, s, h);
    }
    return fd(i, s, u, f, h);
  }
  function h4(i, s, u) {
    var f = s.pendingProps, h = f.children, _ = i !== null ? i.memoizedState : null;
    if (f.mode === "hidden") if (!(s.mode & 1)) s.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, pt(Ns, Un), Un |= u;
    else {
      if (!(u & 1073741824)) return i = _ !== null ? _.baseLanes | u : u, s.lanes = s.childLanes = 1073741824, s.memoizedState = { baseLanes: i, cachePool: null, transitions: null }, s.updateQueue = null, pt(Ns, Un), Un |= i, null;
      s.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, f = _ !== null ? _.baseLanes : u, pt(Ns, Un), Un |= f;
    }
    else _ !== null ? (f = _.baseLanes | u, s.memoizedState = null) : f = u, pt(Ns, Un), Un |= f;
    return wn(i, s, h, u), s.child;
  }
  function p4(i, s) {
    var u = s.ref;
    (i === null && u !== null || i !== null && i.ref !== u) && (s.flags |= 512, s.flags |= 2097152);
  }
  function fd(i, s, u, f, h) {
    var _ = Nn(u) ? Eo : dn.current;
    return _ = _s(s, _), Ls(s, h), u = nd(i, s, u, f, _, h), f = rd(), i !== null && !Hn ? (s.updateQueue = i.updateQueue, s.flags &= -2053, i.lanes &= ~h, si(i, s, h)) : (Ct && f && O2(s), s.flags |= 1, wn(i, s, u, h), s.child);
  }
  function g4(i, s, u, f, h) {
    if (Nn(u)) {
      var _ = !0;
      G1(s);
    } else _ = !1;
    if (Ls(s, h), s.stateNode === null) d0(i, s), r4(s, u, f), ud(s, u, f, h), f = !0;
    else if (i === null) {
      var N = s.stateNode, j = s.memoizedProps;
      N.props = j;
      var Z = N.context, le = u.contextType;
      typeof le == "object" && le !== null ? le = tr(le) : (le = Nn(u) ? Eo : dn.current, le = _s(s, le));
      var Le = u.getDerivedStateFromProps, Be = typeof Le == "function" || typeof N.getSnapshotBeforeUpdate == "function";
      Be || typeof N.UNSAFE_componentWillReceiveProps != "function" && typeof N.componentWillReceiveProps != "function" || (j !== f || Z !== le) && i4(s, N, f, le), zi = !1;
      var _e = s.memoizedState;
      N.state = _e, n0(s, f, N, h), Z = s.memoizedState, j !== f || _e !== Z || En.current || zi ? (typeof Le == "function" && (ld(s, u, Le, f), Z = s.memoizedState), (j = zi || n4(s, u, j, f, _e, Z, le)) ? (Be || typeof N.UNSAFE_componentWillMount != "function" && typeof N.componentWillMount != "function" || (typeof N.componentWillMount == "function" && N.componentWillMount(), typeof N.UNSAFE_componentWillMount == "function" && N.UNSAFE_componentWillMount()), typeof N.componentDidMount == "function" && (s.flags |= 4194308)) : (typeof N.componentDidMount == "function" && (s.flags |= 4194308), s.memoizedProps = f, s.memoizedState = Z), N.props = f, N.state = Z, N.context = le, f = j) : (typeof N.componentDidMount == "function" && (s.flags |= 4194308), f = !1);
    } else {
      N = s.stateNode, N3(i, s), j = s.memoizedProps, le = s.type === s.elementType ? j : yr(s.type, j), N.props = le, Be = s.pendingProps, _e = N.context, Z = u.contextType, typeof Z == "object" && Z !== null ? Z = tr(Z) : (Z = Nn(u) ? Eo : dn.current, Z = _s(s, Z));
      var yt = u.getDerivedStateFromProps;
      (Le = typeof yt == "function" || typeof N.getSnapshotBeforeUpdate == "function") || typeof N.UNSAFE_componentWillReceiveProps != "function" && typeof N.componentWillReceiveProps != "function" || (j !== Be || _e !== Z) && i4(s, N, f, Z), zi = !1, _e = s.memoizedState, N.state = _e, n0(s, f, N, h);
      var ft = s.memoizedState;
      j !== Be || _e !== ft || En.current || zi ? (typeof yt == "function" && (ld(s, u, yt, f), ft = s.memoizedState), (le = zi || n4(s, u, le, f, _e, ft, Z) || !1) ? (Le || typeof N.UNSAFE_componentWillUpdate != "function" && typeof N.componentWillUpdate != "function" || (typeof N.componentWillUpdate == "function" && N.componentWillUpdate(f, ft, Z), typeof N.UNSAFE_componentWillUpdate == "function" && N.UNSAFE_componentWillUpdate(f, ft, Z)), typeof N.componentDidUpdate == "function" && (s.flags |= 4), typeof N.getSnapshotBeforeUpdate == "function" && (s.flags |= 1024)) : (typeof N.componentDidUpdate != "function" || j === i.memoizedProps && _e === i.memoizedState || (s.flags |= 4), typeof N.getSnapshotBeforeUpdate != "function" || j === i.memoizedProps && _e === i.memoizedState || (s.flags |= 1024), s.memoizedProps = f, s.memoizedState = ft), N.props = f, N.state = ft, N.context = Z, f = le) : (typeof N.componentDidUpdate != "function" || j === i.memoizedProps && _e === i.memoizedState || (s.flags |= 4), typeof N.getSnapshotBeforeUpdate != "function" || j === i.memoizedProps && _e === i.memoizedState || (s.flags |= 1024), f = !1);
    }
    return hd(i, s, u, f, _, h);
  }
  function hd(i, s, u, f, h, _) {
    p4(i, s);
    var N = (s.flags & 128) !== 0;
    if (!f && !N) return h && m3(s, u, !1), si(i, s, _);
    f = s.stateNode, wy.current = s;
    var j = N && typeof u.getDerivedStateFromError != "function" ? null : f.render();
    return s.flags |= 1, i !== null && N ? (s.child = ks(s, i.child, null, _), s.child = ks(s, null, j, _)) : wn(i, s, j, _), s.memoizedState = f.state, h && m3(s, u, !0), s.child;
  }
  function m4(i) {
    var s = i.stateNode;
    s.pendingContext ? p3(i, s.pendingContext, s.pendingContext !== s.context) : s.context && p3(i, s.context, !1), $2(i, s.containerInfo);
  }
  function y4(i, s, u, f, h) {
    return Ss(), U2(h), s.flags |= 256, wn(i, s, u, f), s.child;
  }
  var pd = { dehydrated: null, treeContext: null, retryLane: 0 };
  function gd(i) {
    return { baseLanes: i, cachePool: null, transitions: null };
  }
  function v4(i, s, u) {
    var f = s.pendingProps, h = Mt.current, _ = !1, N = (s.flags & 128) !== 0, j;
    if ((j = N) || (j = i !== null && i.memoizedState === null ? !1 : (h & 2) !== 0), j ? (_ = !0, s.flags &= -129) : (i === null || i.memoizedState !== null) && (h |= 1), pt(Mt, h & 1), i === null)
      return G2(s), i = s.memoizedState, i !== null && (i = i.dehydrated, i !== null) ? (s.mode & 1 ? Cn(i) ? s.lanes = 8 : s.lanes = 1073741824 : s.lanes = 1, null) : (N = f.children, i = f.fallback, _ ? (f = s.mode, _ = s.child, N = { mode: "hidden", children: N }, !(f & 1) && _ !== null ? (_.childLanes = 0, _.pendingProps = N) : _ = E0(N, f, 0, null), i = Oo(i, f, u, null), _.return = s, i.return = s, _.sibling = i, s.child = _, s.child.memoizedState = gd(u), s.memoizedState = pd, i) : md(s, N));
    if (h = i.memoizedState, h !== null && (j = h.dehydrated, j !== null)) return Sy(i, s, N, f, j, h, u);
    if (_) {
      _ = f.fallback, N = s.mode, h = i.child, j = h.sibling;
      var Z = { mode: "hidden", children: f.children };
      return !(N & 1) && s.child !== h ? (f = s.child, f.childLanes = 0, f.pendingProps = Z, s.deletions = null) : (f = Gi(h, Z), f.subtreeFlags = h.subtreeFlags & 14680064), j !== null ? _ = Gi(j, _) : (_ = Oo(_, N, u, null), _.flags |= 2), _.return = s, f.return = s, f.sibling = _, s.child = f, f = _, _ = s.child, N = i.child.memoizedState, N = N === null ? gd(u) : { baseLanes: N.baseLanes | u, cachePool: null, transitions: N.transitions }, _.memoizedState = N, _.childLanes = i.childLanes & ~u, s.memoizedState = pd, f;
    }
    return _ = i.child, i = _.sibling, f = Gi(_, { mode: "visible", children: f.children }), !(s.mode & 1) && (f.lanes = u), f.return = s, f.sibling = null, i !== null && (u = s.deletions, u === null ? (s.deletions = [i], s.flags |= 16) : u.push(i)), s.child = f, s.memoizedState = null, f;
  }
  function md(i, s) {
    return s = E0({ mode: "visible", children: s }, i.mode, 0, null), s.return = i, i.child = s;
  }
  function c0(i, s, u, f) {
    return f !== null && U2(f), ks(s, i.child, null, u), i = md(s, s.pendingProps.children), i.flags |= 2, s.memoizedState = null, i;
  }
  function Sy(i, s, u, f, h, _, N) {
    if (u)
      return s.flags & 256 ? (s.flags &= -257, f = cd(Error(l(422))), c0(i, s, N, f)) : s.memoizedState !== null ? (s.child = i.child, s.flags |= 128, null) : (_ = f.fallback, h = s.mode, f = E0({ mode: "visible", children: f.children }, h, 0, null), _ = Oo(_, h, N, null), _.flags |= 2, f.return = s, _.return = s, f.sibling = _, s.child = f, s.mode & 1 && ks(s, i.child, null, N), s.child.memoizedState = gd(N), s.memoizedState = pd, _);
    if (!(s.mode & 1)) return c0(i, s, N, null);
    if (Cn(h)) return f = cn(h).digest, _ = Error(l(419)), f = cd(
      _,
      f,
      void 0
    ), c0(i, s, N, f);
    if (u = (N & i.childLanes) !== 0, Hn || u) {
      if (f = Qt, f !== null) {
        switch (N & -N) {
          case 4:
            h = 2;
            break;
          case 16:
            h = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            h = 32;
            break;
          case 536870912:
            h = 268435456;
            break;
          default:
            h = 0;
        }
        h = h & (f.suspendedLanes | N) ? 0 : h, h !== 0 && h !== _.retryLane && (_.retryLane = h, zr(i, h), ir(
          f,
          i,
          h,
          -1
        ));
      }
      return zd(), f = cd(Error(l(421))), c0(i, s, N, f);
    }
    return Gt(h) ? (s.flags |= 128, s.child = i.child, s = zy.bind(null, i), Vr(h, s), null) : (i = _.treeContext, pe && (er = Ue(h), Gn = s, Ct = !0, mr = null, Ua = !1, i !== null && (qn[Jn++] = ri, qn[Jn++] = ii, qn[Jn++] = No, ri = i.id, ii = i.overflow, No = s)), s = md(s, f.children), s.flags |= 4096, s);
  }
  function x4(i, s, u) {
    i.lanes |= s;
    var f = i.alternate;
    f !== null && (f.lanes |= s), Y2(i.return, s, u);
  }
  function yd(i, s, u, f, h) {
    var _ = i.memoizedState;
    _ === null ? i.memoizedState = { isBackwards: s, rendering: null, renderingStartTime: 0, last: f, tail: u, tailMode: h } : (_.isBackwards = s, _.rendering = null, _.renderingStartTime = 0, _.last = f, _.tail = u, _.tailMode = h);
  }
  function _4(i, s, u) {
    var f = s.pendingProps, h = f.revealOrder, _ = f.tail;
    if (wn(i, s, f.children, u), f = Mt.current, f & 2) f = f & 1 | 2, s.flags |= 128;
    else {
      if (i !== null && i.flags & 128) e: for (i = s.child; i !== null; ) {
        if (i.tag === 13) i.memoizedState !== null && x4(i, u, s);
        else if (i.tag === 19) x4(i, u, s);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === s) break e;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === s) break e;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
      f &= 1;
    }
    if (pt(Mt, f), !(s.mode & 1)) s.memoizedState = null;
    else switch (h) {
      case "forwards":
        for (u = s.child, h = null; u !== null; ) i = u.alternate, i !== null && r0(i) === null && (h = u), u = u.sibling;
        u = h, u === null ? (h = s.child, s.child = null) : (h = u.sibling, u.sibling = null), yd(s, !1, h, u, _);
        break;
      case "backwards":
        for (u = null, h = s.child, s.child = null; h !== null; ) {
          if (i = h.alternate, i !== null && r0(i) === null) {
            s.child = h;
            break;
          }
          i = h.sibling, h.sibling = u, u = h, h = i;
        }
        yd(s, !0, u, null, _);
        break;
      case "together":
        yd(s, !1, null, null, void 0);
        break;
      default:
        s.memoizedState = null;
    }
    return s.child;
  }
  function d0(i, s) {
    !(s.mode & 1) && i !== null && (i.alternate = null, s.alternate = null, s.flags |= 2);
  }
  function si(i, s, u) {
    if (i !== null && (s.dependencies = i.dependencies), Ro |= s.lanes, !(u & s.childLanes)) return null;
    if (i !== null && s.child !== i.child) throw Error(l(153));
    if (s.child !== null) {
      for (i = s.child, u = Gi(i, i.pendingProps), s.child = u, u.return = s; i.sibling !== null; ) i = i.sibling, u = u.sibling = Gi(i, i.pendingProps), u.return = s;
      u.sibling = null;
    }
    return s.child;
  }
  function ky(i, s, u) {
    switch (s.tag) {
      case 3:
        m4(s), Ss();
        break;
      case 5:
        T3(s);
        break;
      case 1:
        Nn(s.type) && G1(s);
        break;
      case 4:
        $2(s, s.stateNode.containerInfo);
        break;
      case 10:
        P3(s, s.type._context, s.memoizedProps.value);
        break;
      case 13:
        var f = s.memoizedState;
        if (f !== null)
          return f.dehydrated !== null ? (pt(Mt, Mt.current & 1), s.flags |= 128, null) : u & s.child.childLanes ? v4(i, s, u) : (pt(Mt, Mt.current & 1), i = si(i, s, u), i !== null ? i.sibling : null);
        pt(Mt, Mt.current & 1);
        break;
      case 19:
        if (f = (u & s.childLanes) !== 0, i.flags & 128) {
          if (f) return _4(
            i,
            s,
            u
          );
          s.flags |= 128;
        }
        var h = s.memoizedState;
        if (h !== null && (h.rendering = null, h.tail = null, h.lastEffect = null), pt(Mt, Mt.current), f) break;
        return null;
      case 22:
      case 23:
        return s.lanes = 0, h4(i, s, u);
    }
    return si(i, s, u);
  }
  function Or(i) {
    i.flags |= 4;
  }
  function C4(i, s) {
    if (i !== null && i.child === s.child) return !0;
    if (s.flags & 16) return !1;
    for (i = s.child; i !== null; ) {
      if (i.flags & 12854 || i.subtreeFlags & 12854) return !1;
      i = i.sibling;
    }
    return !0;
  }
  var Qa, qa, f0, h0;
  if (K) Qa = function(i, s) {
    for (var u = s.child; u !== null; ) {
      if (u.tag === 5 || u.tag === 6) re(i, u.stateNode);
      else if (u.tag !== 4 && u.child !== null) {
        u.child.return = u, u = u.child;
        continue;
      }
      if (u === s) break;
      for (; u.sibling === null; ) {
        if (u.return === null || u.return === s) return;
        u = u.return;
      }
      u.sibling.return = u.return, u = u.sibling;
    }
  }, qa = function() {
  }, f0 = function(i, s, u, f, h) {
    if (i = i.memoizedProps, i !== f) {
      var _ = s.stateNode, N = Fr(nr.current);
      u = Re(_, u, i, f, h, N), (s.updateQueue = u) && Or(s);
    }
  }, h0 = function(i, s, u, f) {
    u !== f && Or(s);
  };
  else if (ae) {
    Qa = function(i, s, u, f) {
      for (var h = s.child; h !== null; ) {
        if (h.tag === 5) {
          var _ = h.stateNode;
          u && f && (_ = Ve(_, h.type, h.memoizedProps, h)), re(i, _);
        } else if (h.tag === 6) _ = h.stateNode, u && f && (_ = Fe(_, h.memoizedProps, h)), re(i, _);
        else if (h.tag !== 4) {
          if (h.tag === 22 && h.memoizedState !== null) _ = h.child, _ !== null && (_.return = h), Qa(i, h, !0, !0);
          else if (h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
        }
        if (h === s) break;
        for (; h.sibling === null; ) {
          if (h.return === null || h.return === s) return;
          h = h.return;
        }
        h.sibling.return = h.return, h = h.sibling;
      }
    };
    var w4 = function(i, s, u, f) {
      for (var h = s.child; h !== null; ) {
        if (h.tag === 5) {
          var _ = h.stateNode;
          u && f && (_ = Ve(_, h.type, h.memoizedProps, h)), ne(i, _);
        } else if (h.tag === 6) _ = h.stateNode, u && f && (_ = Fe(_, h.memoizedProps, h)), ne(i, _);
        else if (h.tag !== 4) {
          if (h.tag === 22 && h.memoizedState !== null) _ = h.child, _ !== null && (_.return = h), w4(i, h, !0, !0);
          else if (h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
        }
        if (h === s) break;
        for (; h.sibling === null; ) {
          if (h.return === null || h.return === s) return;
          h = h.return;
        }
        h.sibling.return = h.return, h = h.sibling;
      }
    };
    qa = function(i, s) {
      var u = s.stateNode;
      if (!C4(i, s)) {
        i = u.containerInfo;
        var f = Vi(i);
        w4(f, s, !1, !1), u.pendingChildren = f, Or(s), je(i, f);
      }
    }, f0 = function(i, s, u, f, h) {
      var _ = i.stateNode, N = i.memoizedProps;
      if ((i = C4(i, s)) && N === f) s.stateNode = _;
      else {
        var j = s.stateNode, Z = Fr(nr.current), le = null;
        N !== f && (le = Re(j, u, N, f, h, Z)), i && le === null ? s.stateNode = _ : (_ = Hi(_, le, u, N, f, s, i, j), we(_, u, f, h, Z) && Or(s), s.stateNode = _, i ? Or(s) : Qa(_, s, !1, !1));
      }
    }, h0 = function(i, s, u, f) {
      u !== f ? (i = Fr(As.current), u = Fr(nr.current), s.stateNode = ce(f, i, u, s), Or(s)) : s.stateNode = i.stateNode;
    };
  } else qa = function() {
  }, f0 = function() {
  }, h0 = function() {
  };
  function Ja(i, s) {
    if (!Ct) switch (i.tailMode) {
      case "hidden":
        s = i.tail;
        for (var u = null; s !== null; ) s.alternate !== null && (u = s), s = s.sibling;
        u === null ? i.tail = null : u.sibling = null;
        break;
      case "collapsed":
        u = i.tail;
        for (var f = null; u !== null; ) u.alternate !== null && (f = u), u = u.sibling;
        f === null ? s || i.tail === null ? i.tail = null : i.tail.sibling = null : f.sibling = null;
    }
  }
  function hn(i) {
    var s = i.alternate !== null && i.alternate.child === i.child, u = 0, f = 0;
    if (s) for (var h = i.child; h !== null; ) u |= h.lanes | h.childLanes, f |= h.subtreeFlags & 14680064, f |= h.flags & 14680064, h.return = i, h = h.sibling;
    else for (h = i.child; h !== null; ) u |= h.lanes | h.childLanes, f |= h.subtreeFlags, f |= h.flags, h.return = i, h = h.sibling;
    return i.subtreeFlags |= f, i.childLanes = u, s;
  }
  function My(i, s, u) {
    var f = s.pendingProps;
    switch (I2(s), s.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return hn(s), null;
      case 1:
        return Nn(s.type) && D1(), hn(s), null;
      case 3:
        return u = s.stateNode, bs(), mt(En), mt(dn), J2(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (i === null || i.child === null) && ($1(s) ? Or(s) : i === null || i.memoizedState.isDehydrated && !(s.flags & 256) || (s.flags |= 1024, mr !== null && (Td(mr), mr = null))), qa(i, s), hn(s), null;
      case 5:
        Q2(s), u = Fr(As.current);
        var h = s.type;
        if (i !== null && s.stateNode != null) f0(i, s, h, f, u), i.ref !== s.ref && (s.flags |= 512, s.flags |= 2097152);
        else {
          if (!f) {
            if (s.stateNode === null) throw Error(l(166));
            return hn(s), null;
          }
          if (i = Fr(nr.current), $1(s)) {
            if (!pe) throw Error(l(175));
            i = ct(s.stateNode, s.type, s.memoizedProps, u, i, s, !Ua), s.updateQueue = i, i !== null && Or(s);
          } else {
            var _ = ee(h, f, u, i, s);
            Qa(_, s, !1, !1), s.stateNode = _, we(_, h, f, u, i) && Or(s);
          }
          s.ref !== null && (s.flags |= 512, s.flags |= 2097152);
        }
        return hn(s), null;
      case 6:
        if (i && s.stateNode != null) h0(i, s, i.memoizedProps, f);
        else {
          if (typeof f != "string" && s.stateNode === null) throw Error(l(166));
          if (i = Fr(As.current), u = Fr(nr.current), $1(s)) {
            if (!pe) throw Error(l(176));
            if (i = s.stateNode, u = s.memoizedProps, (f = at(i, u, s, !Ua)) && (h = Gn, h !== null)) switch (h.tag) {
              case 3:
                $m(h.stateNode.containerInfo, i, u, (h.mode & 1) !== 0);
                break;
              case 5:
                Qm(h.type, h.memoizedProps, h.stateNode, i, u, (h.mode & 1) !== 0);
            }
            f && Or(s);
          } else s.stateNode = ce(f, i, u, s);
        }
        return hn(s), null;
      case 13:
        if (mt(Mt), f = s.memoizedState, i === null || i.memoizedState !== null && i.memoizedState.dehydrated !== null) {
          if (Ct && er !== null && s.mode & 1 && !(s.flags & 128)) M3(), Ss(), s.flags |= 98560, h = !1;
          else if (h = $1(s), f !== null && f.dehydrated !== null) {
            if (i === null) {
              if (!h) throw Error(l(318));
              if (!pe) throw Error(l(344));
              if (h = s.memoizedState, h = h !== null ? h.dehydrated : null, !h) throw Error(l(317));
              hr(h, s);
            } else Ss(), !(s.flags & 128) && (s.memoizedState = null), s.flags |= 4;
            hn(s), h = !1;
          } else mr !== null && (Td(mr), mr = null), h = !0;
          if (!h) return s.flags & 65536 ? s : null;
        }
        return s.flags & 128 ? (s.lanes = u, s) : (u = f !== null, u !== (i !== null && i.memoizedState !== null) && u && (s.child.flags |= 8192, s.mode & 1 && (i === null || Mt.current & 1 ? Bt === 0 && (Bt = 3) : zd())), s.updateQueue !== null && (s.flags |= 4), hn(s), null);
      case 4:
        return bs(), qa(i, s), i === null && be(s.stateNode.containerInfo), hn(s), null;
      case 10:
        return Z2(s.type._context), hn(s), null;
      case 17:
        return Nn(s.type) && D1(), hn(s), null;
      case 19:
        if (mt(Mt), h = s.memoizedState, h === null) return hn(s), null;
        if (f = (s.flags & 128) !== 0, _ = h.rendering, _ === null) if (f) Ja(h, !1);
        else {
          if (Bt !== 0 || i !== null && i.flags & 128) for (i = s.child; i !== null; ) {
            if (_ = r0(i), _ !== null) {
              for (s.flags |= 128, Ja(h, !1), i = _.updateQueue, i !== null && (s.updateQueue = i, s.flags |= 4), s.subtreeFlags = 0, i = u, u = s.child; u !== null; ) f = u, h = i, f.flags &= 14680066, _ = f.alternate, _ === null ? (f.childLanes = 0, f.lanes = h, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = _.childLanes, f.lanes = _.lanes, f.child = _.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = _.memoizedProps, f.memoizedState = _.memoizedState, f.updateQueue = _.updateQueue, f.type = _.type, h = _.dependencies, f.dependencies = h === null ? null : { lanes: h.lanes, firstContext: h.firstContext }), u = u.sibling;
              return pt(Mt, Mt.current & 1 | 2), s.child;
            }
            i = i.sibling;
          }
          h.tail !== null && Xt() > Ed && (s.flags |= 128, f = !0, Ja(h, !1), s.lanes = 4194304);
        }
        else {
          if (!f) if (i = r0(_), i !== null) {
            if (s.flags |= 128, f = !0, i = i.updateQueue, i !== null && (s.updateQueue = i, s.flags |= 4), Ja(h, !0), h.tail === null && h.tailMode === "hidden" && !_.alternate && !Ct) return hn(s), null;
          } else 2 * Xt() - h.renderingStartTime > Ed && u !== 1073741824 && (s.flags |= 128, f = !0, Ja(h, !1), s.lanes = 4194304);
          h.isBackwards ? (_.sibling = s.child, s.child = _) : (i = h.last, i !== null ? i.sibling = _ : s.child = _, h.last = _);
        }
        return h.tail !== null ? (s = h.tail, h.rendering = s, h.tail = s.sibling, h.renderingStartTime = Xt(), s.sibling = null, i = Mt.current, pt(Mt, f ? i & 1 | 2 : i & 1), s) : (hn(s), null);
      case 22:
      case 23:
        return Rd(), u = s.memoizedState !== null, i !== null && i.memoizedState !== null !== u && (s.flags |= 8192), u && s.mode & 1 ? Un & 1073741824 && (hn(s), K && s.subtreeFlags & 6 && (s.flags |= 8192)) : hn(s), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(l(
      156,
      s.tag
    ));
  }
  function Ly(i, s) {
    switch (I2(s), s.tag) {
      case 1:
        return Nn(s.type) && D1(), i = s.flags, i & 65536 ? (s.flags = i & -65537 | 128, s) : null;
      case 3:
        return bs(), mt(En), mt(dn), J2(), i = s.flags, i & 65536 && !(i & 128) ? (s.flags = i & -65537 | 128, s) : null;
      case 5:
        return Q2(s), null;
      case 13:
        if (mt(Mt), i = s.memoizedState, i !== null && i.dehydrated !== null) {
          if (s.alternate === null) throw Error(l(340));
          Ss();
        }
        return i = s.flags, i & 65536 ? (s.flags = i & -65537 | 128, s) : null;
      case 19:
        return mt(Mt), null;
      case 4:
        return bs(), null;
      case 10:
        return Z2(s.type._context), null;
      case 22:
      case 23:
        return Rd(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var p0 = !1, pn = !1, Ay = typeof WeakSet == "function" ? WeakSet : Set, ke = null;
  function Es(i, s) {
    var u = i.ref;
    if (u !== null) if (typeof u == "function") try {
      u(null);
    } catch (f) {
      wt(i, s, f);
    }
    else u.current = null;
  }
  function vd(i, s, u) {
    try {
      u();
    } catch (f) {
      wt(i, s, f);
    }
  }
  var S4 = !1;
  function by(i, s) {
    for (Y(i.containerInfo), ke = s; ke !== null; ) if (i = ke, s = i.child, (i.subtreeFlags & 1028) !== 0 && s !== null) s.return = i, ke = s;
    else for (; ke !== null; ) {
      i = ke;
      try {
        var u = i.alternate;
        if (i.flags & 1024) switch (i.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (u !== null) {
              var f = u.memoizedProps, h = u.memoizedState, _ = i.stateNode, N = _.getSnapshotBeforeUpdate(i.elementType === i.type ? f : yr(i.type, f), h);
              _.__reactInternalSnapshotBeforeUpdate = N;
            }
            break;
          case 3:
            K && Po(i.stateNode.containerInfo);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(l(163));
        }
      } catch (j) {
        wt(i, i.return, j);
      }
      if (s = i.sibling, s !== null) {
        s.return = i.return, ke = s;
        break;
      }
      ke = i.return;
    }
    return u = S4, S4 = !1, u;
  }
  function el(i, s, u) {
    var f = s.updateQueue;
    if (f = f !== null ? f.lastEffect : null, f !== null) {
      var h = f = f.next;
      do {
        if ((h.tag & i) === i) {
          var _ = h.destroy;
          h.destroy = void 0, _ !== void 0 && vd(s, u, _);
        }
        h = h.next;
      } while (h !== f);
    }
  }
  function g0(i, s) {
    if (s = s.updateQueue, s = s !== null ? s.lastEffect : null, s !== null) {
      var u = s = s.next;
      do {
        if ((u.tag & i) === i) {
          var f = u.create;
          u.destroy = f();
        }
        u = u.next;
      } while (u !== s);
    }
  }
  function xd(i) {
    var s = i.ref;
    if (s !== null) {
      var u = i.stateNode;
      switch (i.tag) {
        case 5:
          i = oe(u);
          break;
        default:
          i = u;
      }
      typeof s == "function" ? s(i) : s.current = i;
    }
  }
  function k4(i) {
    var s = i.alternate;
    s !== null && (i.alternate = null, k4(s)), i.child = null, i.deletions = null, i.sibling = null, i.tag === 5 && (s = i.stateNode, s !== null && Ne(s)), i.stateNode = null, i.return = null, i.dependencies = null, i.memoizedProps = null, i.memoizedState = null, i.pendingProps = null, i.stateNode = null, i.updateQueue = null;
  }
  function M4(i) {
    return i.tag === 5 || i.tag === 3 || i.tag === 4;
  }
  function L4(i) {
    e: for (; ; ) {
      for (; i.sibling === null; ) {
        if (i.return === null || M4(i.return)) return null;
        i = i.return;
      }
      for (i.sibling.return = i.return, i = i.sibling; i.tag !== 5 && i.tag !== 6 && i.tag !== 18; ) {
        if (i.flags & 2 || i.child === null || i.tag === 4) continue e;
        i.child.return = i, i = i.child;
      }
      if (!(i.flags & 2)) return i.stateNode;
    }
  }
  function _d(i, s, u) {
    var f = i.tag;
    if (f === 5 || f === 6) i = i.stateNode, s ? ys(u, i, s) : ms(u, i);
    else if (f !== 4 && (i = i.child, i !== null)) for (_d(i, s, u), i = i.sibling; i !== null; ) _d(i, s, u), i = i.sibling;
  }
  function Cd(i, s, u) {
    var f = i.tag;
    if (f === 5 || f === 6) i = i.stateNode, s ? ja(u, i, s) : Ta(u, i);
    else if (f !== 4 && (i = i.child, i !== null)) for (Cd(i, s, u), i = i.sibling; i !== null; ) Cd(i, s, u), i = i.sibling;
  }
  var nn = null, vr = !1;
  function Ir(i, s, u) {
    for (u = u.child; u !== null; ) wd(i, s, u), u = u.sibling;
  }
  function wd(i, s, u) {
    if (Tr && typeof Tr.onCommitFiberUnmount == "function") try {
      Tr.onCommitFiberUnmount(Z1, u);
    } catch {
    }
    switch (u.tag) {
      case 5:
        pn || Es(u, s);
      case 6:
        if (K) {
          var f = nn, h = vr;
          nn = null, Ir(i, s, u), nn = f, vr = h, nn !== null && (vr ? vs(nn, u.stateNode) : Ei(nn, u.stateNode));
        } else Ir(i, s, u);
        break;
      case 18:
        K && nn !== null && (vr ? Km(nn, u.stateNode) : Ym(nn, u.stateNode));
        break;
      case 4:
        K ? (f = nn, h = vr, nn = u.stateNode.containerInfo, vr = !0, Ir(i, s, u), nn = f, vr = h) : (ae && (f = u.stateNode.containerInfo, h = Vi(f), Ae(f, h)), Ir(i, s, u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!pn && (f = u.updateQueue, f !== null && (f = f.lastEffect, f !== null))) {
          h = f = f.next;
          do {
            var _ = h, N = _.destroy;
            _ = _.tag, N !== void 0 && (_ & 2 || _ & 4) && vd(u, s, N), h = h.next;
          } while (h !== f);
        }
        Ir(i, s, u);
        break;
      case 1:
        if (!pn && (Es(u, s), f = u.stateNode, typeof f.componentWillUnmount == "function")) try {
          f.props = u.memoizedProps, f.state = u.memoizedState, f.componentWillUnmount();
        } catch (j) {
          wt(u, s, j);
        }
        Ir(i, s, u);
        break;
      case 21:
        Ir(i, s, u);
        break;
      case 22:
        u.mode & 1 ? (pn = (f = pn) || u.memoizedState !== null, Ir(i, s, u), pn = f) : Ir(i, s, u);
        break;
      default:
        Ir(
          i,
          s,
          u
        );
    }
  }
  function A4(i) {
    var s = i.updateQueue;
    if (s !== null) {
      i.updateQueue = null;
      var u = i.stateNode;
      u === null && (u = i.stateNode = new Ay()), s.forEach(function(f) {
        var h = Fy.bind(null, i, f);
        u.has(f) || (u.add(f), f.then(h, h));
      });
    }
  }
  function xr(i, s) {
    var u = s.deletions;
    if (u !== null) for (var f = 0; f < u.length; f++) {
      var h = u[f];
      try {
        var _ = i, N = s;
        if (K) {
          var j = N;
          e: for (; j !== null; ) {
            switch (j.tag) {
              case 5:
                nn = j.stateNode, vr = !1;
                break e;
              case 3:
                nn = j.stateNode.containerInfo, vr = !0;
                break e;
              case 4:
                nn = j.stateNode.containerInfo, vr = !0;
                break e;
            }
            j = j.return;
          }
          if (nn === null) throw Error(l(160));
          wd(_, N, h), nn = null, vr = !1;
        } else wd(_, N, h);
        var Z = h.alternate;
        Z !== null && (Z.return = null), h.return = null;
      } catch (le) {
        wt(h, s, le);
      }
    }
    if (s.subtreeFlags & 12854) for (s = s.child; s !== null; ) b4(s, i), s = s.sibling;
  }
  function b4(i, s) {
    var u = i.alternate, f = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (xr(s, i), Dr(i), f & 4) {
          try {
            el(3, i, i.return), g0(3, i);
          } catch (_e) {
            wt(i, i.return, _e);
          }
          try {
            el(5, i, i.return);
          } catch (_e) {
            wt(i, i.return, _e);
          }
        }
        break;
      case 1:
        xr(s, i), Dr(i), f & 512 && u !== null && Es(u, u.return);
        break;
      case 5:
        if (xr(s, i), Dr(i), f & 512 && u !== null && Es(u, u.return), K) {
          if (i.flags & 32) {
            var h = i.stateNode;
            try {
              bo(h);
            } catch (_e) {
              wt(i, i.return, _e);
            }
          }
          if (f & 4 && (h = i.stateNode, h != null)) {
            var _ = i.memoizedProps;
            if (u = u !== null ? u.memoizedProps : _, f = i.type, s = i.updateQueue, i.updateQueue = null, s !== null) try {
              Fa(h, s, f, u, _, i);
            } catch (_e) {
              wt(i, i.return, _e);
            }
          }
        }
        break;
      case 6:
        if (xr(s, i), Dr(i), f & 4 && K) {
          if (i.stateNode === null) throw Error(l(162));
          h = i.stateNode, _ = i.memoizedProps, u = u !== null ? u.memoizedProps : _;
          try {
            Ra(h, u, _);
          } catch (_e) {
            wt(i, i.return, _e);
          }
        }
        break;
      case 3:
        if (xr(s, i), Dr(i), f & 4) {
          if (K && pe && u !== null && u.memoizedState.isDehydrated) try {
            Wm(s.containerInfo);
          } catch (_e) {
            wt(i, i.return, _e);
          }
          if (ae) {
            h = s.containerInfo, _ = s.pendingChildren;
            try {
              Ae(h, _);
            } catch (_e) {
              wt(i, i.return, _e);
            }
          }
        }
        break;
      case 4:
        if (xr(
          s,
          i
        ), Dr(i), f & 4 && ae) {
          _ = i.stateNode, h = _.containerInfo, _ = _.pendingChildren;
          try {
            Ae(h, _);
          } catch (_e) {
            wt(i, i.return, _e);
          }
        }
        break;
      case 13:
        xr(s, i), Dr(i), h = i.child, h.flags & 8192 && (_ = h.memoizedState !== null, h.stateNode.isHidden = _, !_ || h.alternate !== null && h.alternate.memoizedState !== null || (Pd = Xt())), f & 4 && A4(i);
        break;
      case 22:
        var N = u !== null && u.memoizedState !== null;
        if (i.mode & 1 ? (pn = (u = pn) || N, xr(s, i), pn = u) : xr(s, i), Dr(i), f & 8192) {
          if (u = i.memoizedState !== null, (i.stateNode.isHidden = u) && !N && i.mode & 1) for (ke = i, f = i.child; f !== null; ) {
            for (s = ke = f; ke !== null; ) {
              N = ke;
              var j = N.child;
              switch (N.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  el(4, N, N.return);
                  break;
                case 1:
                  Es(N, N.return);
                  var Z = N.stateNode;
                  if (typeof Z.componentWillUnmount == "function") {
                    var le = N, Le = N.return;
                    try {
                      var Be = le;
                      Z.props = Be.memoizedProps, Z.state = Be.memoizedState, Z.componentWillUnmount();
                    } catch (_e) {
                      wt(le, Le, _e);
                    }
                  }
                  break;
                case 5:
                  Es(N, N.return);
                  break;
                case 22:
                  if (N.memoizedState !== null) {
                    N4(s);
                    continue;
                  }
              }
              j !== null ? (j.return = N, ke = j) : N4(s);
            }
            f = f.sibling;
          }
          if (K) {
            e: if (f = null, K) for (s = i; ; ) {
              if (s.tag === 5) {
                if (f === null) {
                  f = s;
                  try {
                    h = s.stateNode, u ? Oa(h) : Nr(s.stateNode, s.memoizedProps);
                  } catch (_e) {
                    wt(i, i.return, _e);
                  }
                }
              } else if (s.tag === 6) {
                if (f === null) try {
                  _ = s.stateNode, u ? Ni(_) : Hr(_, s.memoizedProps);
                } catch (_e) {
                  wt(i, i.return, _e);
                }
              } else if ((s.tag !== 22 && s.tag !== 23 || s.memoizedState === null || s === i) && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === i) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === i) break e;
                f === s && (f = null), s = s.return;
              }
              f === s && (f = null), s.sibling.return = s.return, s = s.sibling;
            }
          }
        }
        break;
      case 19:
        xr(s, i), Dr(i), f & 4 && A4(i);
        break;
      case 21:
        break;
      default:
        xr(s, i), Dr(i);
    }
  }
  function Dr(i) {
    var s = i.flags;
    if (s & 2) {
      try {
        if (K) {
          e: {
            for (var u = i.return; u !== null; ) {
              if (M4(u)) {
                var f = u;
                break e;
              }
              u = u.return;
            }
            throw Error(l(160));
          }
          switch (f.tag) {
            case 5:
              var h = f.stateNode;
              f.flags & 32 && (bo(h), f.flags &= -33);
              var _ = L4(i);
              Cd(i, _, h);
              break;
            case 3:
            case 4:
              var N = f.stateNode.containerInfo, j = L4(i);
              _d(i, j, N);
              break;
            default:
              throw Error(l(161));
          }
        }
      } catch (Z) {
        wt(i, i.return, Z);
      }
      i.flags &= -3;
    }
    s & 4096 && (i.flags &= -4097);
  }
  function Py(i, s, u) {
    ke = i, P4(i);
  }
  function P4(i, s, u) {
    for (var f = (i.mode & 1) !== 0; ke !== null; ) {
      var h = ke, _ = h.child;
      if (h.tag === 22 && f) {
        var N = h.memoizedState !== null || p0;
        if (!N) {
          var j = h.alternate, Z = j !== null && j.memoizedState !== null || pn;
          j = p0;
          var le = pn;
          if (p0 = N, (pn = Z) && !le) for (ke = h; ke !== null; ) N = ke, Z = N.child, N.tag === 22 && N.memoizedState !== null ? H4(h) : Z !== null ? (Z.return = N, ke = Z) : H4(h);
          for (; _ !== null; ) ke = _, P4(_), _ = _.sibling;
          ke = h, p0 = j, pn = le;
        }
        E4(i);
      } else h.subtreeFlags & 8772 && _ !== null ? (_.return = h, ke = _) : E4(i);
    }
  }
  function E4(i) {
    for (; ke !== null; ) {
      var s = ke;
      if (s.flags & 8772) {
        var u = s.alternate;
        try {
          if (s.flags & 8772) switch (s.tag) {
            case 0:
            case 11:
            case 15:
              pn || g0(5, s);
              break;
            case 1:
              var f = s.stateNode;
              if (s.flags & 4 && !pn) if (u === null) f.componentDidMount();
              else {
                var h = s.elementType === s.type ? u.memoizedProps : yr(s.type, u.memoizedProps);
                f.componentDidUpdate(h, u.memoizedState, f.__reactInternalSnapshotBeforeUpdate);
              }
              var _ = s.updateQueue;
              _ !== null && V3(s, _, f);
              break;
            case 3:
              var N = s.updateQueue;
              if (N !== null) {
                if (u = null, s.child !== null) switch (s.child.tag) {
                  case 5:
                    u = oe(s.child.stateNode);
                    break;
                  case 1:
                    u = s.child.stateNode;
                }
                V3(s, N, u);
              }
              break;
            case 5:
              var j = s.stateNode;
              u === null && s.flags & 4 && za(j, s.type, s.memoizedProps, s);
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (pe && s.memoizedState === null) {
                var Z = s.alternate;
                if (Z !== null) {
                  var le = Z.memoizedState;
                  if (le !== null) {
                    var Le = le.dehydrated;
                    Le !== null && Zm(Le);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(l(163));
          }
          pn || s.flags & 512 && xd(s);
        } catch (Be) {
          wt(s, s.return, Be);
        }
      }
      if (s === i) {
        ke = null;
        break;
      }
      if (u = s.sibling, u !== null) {
        u.return = s.return, ke = u;
        break;
      }
      ke = s.return;
    }
  }
  function N4(i) {
    for (; ke !== null; ) {
      var s = ke;
      if (s === i) {
        ke = null;
        break;
      }
      var u = s.sibling;
      if (u !== null) {
        u.return = s.return, ke = u;
        break;
      }
      ke = s.return;
    }
  }
  function H4(i) {
    for (; ke !== null; ) {
      var s = ke;
      try {
        switch (s.tag) {
          case 0:
          case 11:
          case 15:
            var u = s.return;
            try {
              g0(4, s);
            } catch (Z) {
              wt(s, u, Z);
            }
            break;
          case 1:
            var f = s.stateNode;
            if (typeof f.componentDidMount == "function") {
              var h = s.return;
              try {
                f.componentDidMount();
              } catch (Z) {
                wt(s, h, Z);
              }
            }
            var _ = s.return;
            try {
              xd(s);
            } catch (Z) {
              wt(s, _, Z);
            }
            break;
          case 5:
            var N = s.return;
            try {
              xd(s);
            } catch (Z) {
              wt(s, N, Z);
            }
        }
      } catch (Z) {
        wt(s, s.return, Z);
      }
      if (s === i) {
        ke = null;
        break;
      }
      var j = s.sibling;
      if (j !== null) {
        j.return = s.return, ke = j;
        break;
      }
      ke = s.return;
    }
  }
  var m0 = 0, y0 = 1, v0 = 2, x0 = 3, _0 = 4;
  if (typeof Symbol == "function" && Symbol.for) {
    var tl = Symbol.for;
    m0 = tl("selector.component"), y0 = tl("selector.has_pseudo_class"), v0 = tl("selector.role"), x0 = tl("selector.test_id"), _0 = tl("selector.text");
  }
  function Sd(i) {
    var s = de(i);
    if (s != null) {
      if (typeof s.memoizedProps["data-testname"] != "string") throw Error(l(364));
      return s;
    }
    if (i = Pn(i), i === null) throw Error(l(362));
    return i.stateNode.current;
  }
  function kd(i, s) {
    switch (s.$$typeof) {
      case m0:
        if (i.type === s.value) return !0;
        break;
      case y0:
        e: {
          s = s.value, i = [i, 0];
          for (var u = 0; u < i.length; ) {
            var f = i[u++], h = i[u++], _ = s[h];
            if (f.tag !== 5 || !Qn(f)) {
              for (; _ != null && kd(f, _); ) h++, _ = s[h];
              if (h === s.length) {
                s = !0;
                break e;
              } else for (f = f.child; f !== null; ) i.push(f, h), f = f.sibling;
            }
          }
          s = !1;
        }
        return s;
      case v0:
        if (i.tag === 5 && Va(i.stateNode, s.value)) return !0;
        break;
      case _0:
        if ((i.tag === 5 || i.tag === 6) && (i = ti(i), i !== null && 0 <= i.indexOf(s.value))) return !0;
        break;
      case x0:
        if (i.tag === 5 && (i = i.memoizedProps["data-testname"], typeof i == "string" && i.toLowerCase() === s.value.toLowerCase())) return !0;
        break;
      default:
        throw Error(l(365));
    }
    return !1;
  }
  function Md(i) {
    switch (i.$$typeof) {
      case m0:
        return "<" + (T(i.value) || "Unknown") + ">";
      case y0:
        return ":has(" + (Md(i) || "") + ")";
      case v0:
        return '[role="' + i.value + '"]';
      case _0:
        return '"' + i.value + '"';
      case x0:
        return '[data-testname="' + i.value + '"]';
      default:
        throw Error(l(365));
    }
  }
  function V4(i, s) {
    var u = [];
    i = [i, 0];
    for (var f = 0; f < i.length; ) {
      var h = i[f++], _ = i[f++], N = s[_];
      if (h.tag !== 5 || !Qn(h)) {
        for (; N != null && kd(h, N); ) _++, N = s[_];
        if (_ === s.length) u.push(h);
        else for (h = h.child; h !== null; ) i.push(h, _), h = h.sibling;
      }
    }
    return u;
  }
  function Ld(i, s) {
    if (!_t) throw Error(l(363));
    i = Sd(i), i = V4(i, s), s = [], i = Array.from(i);
    for (var u = 0; u < i.length; ) {
      var f = i[u++];
      if (f.tag === 5) Qn(f) || s.push(f.stateNode);
      else for (f = f.child; f !== null; ) i.push(f), f = f.sibling;
    }
    return s;
  }
  var Ey = Math.ceil, C0 = c.ReactCurrentDispatcher, Ad = c.ReactCurrentOwner, zt = c.ReactCurrentBatchConfig, $e = 0, Qt = null, Ot = null, rn = 0, Un = 0, Ns = Ti(0), Bt = 0, nl = null, Ro = 0, w0 = 0, bd = 0, rl = null, Vn = null, Pd = 0, Ed = 1 / 0, ai = null;
  function Hs() {
    Ed = Xt() + 500;
  }
  var S0 = !1, Nd = null, ji = null, k0 = !1, Oi = null, M0 = 0, il = 0, Hd = null, L0 = -1, A0 = 0;
  function gn() {
    return $e & 6 ? Xt() : L0 !== -1 ? L0 : L0 = Xt();
  }
  function Ii(i) {
    return i.mode & 1 ? $e & 2 && rn !== 0 ? rn & -rn : fy.transition !== null ? (A0 === 0 && (A0 = y3()), A0) : (i = rt, i !== 0 ? i : et()) : 1;
  }
  function ir(i, s, u, f) {
    if (50 < il) throw il = 0, Hd = null, Error(l(185));
    Ga(i, u, f), (!($e & 2) || i !== Qt) && (i === Qt && (!($e & 2) && (w0 |= u), Bt === 4 && Di(i, rn)), Tn(i, f), u === 1 && $e === 0 && !(s.mode & 1) && (Hs(), Y1 && Rr()));
  }
  function Tn(i, s) {
    var u = i.callbackNode;
    ry(i, s);
    var f = W1(i, i === Qt ? rn : 0);
    if (f === 0) u !== null && x3(u), i.callbackNode = null, i.callbackPriority = 0;
    else if (s = f & -f, i.callbackPriority !== s) {
      if (u != null && x3(u), s === 1) i.tag === 0 ? dy(R4.bind(null, i)) : _3(R4.bind(null, i)), Ye ? Nt(function() {
        !($e & 6) && Rr();
      }) : R2(z2, Rr), u = null;
      else {
        switch (v3(f)) {
          case 1:
            u = z2;
            break;
          case 4:
            u = ay;
            break;
          case 16:
            u = F2;
            break;
          case 536870912:
            u = ly;
            break;
          default:
            u = F2;
        }
        u = B4(u, T4.bind(null, i));
      }
      i.callbackPriority = s, i.callbackNode = u;
    }
  }
  function T4(i, s) {
    if (L0 = -1, A0 = 0, $e & 6) throw Error(l(327));
    var u = i.callbackNode;
    if (jo() && i.callbackNode !== u) return null;
    var f = W1(i, i === Qt ? rn : 0);
    if (f === 0) return null;
    if (f & 30 || f & i.expiredLanes || s) s = b0(i, f);
    else {
      s = f;
      var h = $e;
      $e |= 2;
      var _ = j4();
      (Qt !== i || rn !== s) && (ai = null, Hs(), zo(i, s));
      do
        try {
          Vy();
          break;
        } catch (j) {
          F4(i, j);
        }
      while (!0);
      W2(), C0.current = _, $e = h, Ot !== null ? s = 0 : (Qt = null, rn = 0, s = Bt);
    }
    if (s !== 0) {
      if (s === 2 && (h = H2(i), h !== 0 && (f = h, s = Vd(i, h))), s === 1) throw u = nl, zo(i, 0), Di(i, f), Tn(i, Xt()), u;
      if (s === 6) Di(i, f);
      else {
        if (h = i.current.alternate, !(f & 30) && !Ny(h) && (s = b0(i, f), s === 2 && (_ = H2(i), _ !== 0 && (f = _, s = Vd(i, _))), s === 1)) throw u = nl, zo(i, 0), Di(i, f), Tn(i, Xt()), u;
        switch (i.finishedWork = h, i.finishedLanes = f, s) {
          case 0:
          case 1:
            throw Error(l(345));
          case 2:
            Fo(i, Vn, ai);
            break;
          case 3:
            if (Di(i, f), (f & 130023424) === f && (s = Pd + 500 - Xt(), 10 < s)) {
              if (W1(i, 0) !== 0) break;
              if (h = i.suspendedLanes, (h & f) !== f) {
                gn(), i.pingedLanes |= i.suspendedLanes & h;
                break;
              }
              i.timeoutHandle = H(Fo.bind(null, i, Vn, ai), s);
              break;
            }
            Fo(i, Vn, ai);
            break;
          case 4:
            if (Di(i, f), (f & 4194240) === f) break;
            for (s = i.eventTimes, h = -1; 0 < f; ) {
              var N = 31 - pr(f);
              _ = 1 << N, N = s[N], N > h && (h = N), f &= ~_;
            }
            if (f = h, f = Xt() - f, f = (120 > f ? 120 : 480 > f ? 480 : 1080 > f ? 1080 : 1920 > f ? 1920 : 3e3 > f ? 3e3 : 4320 > f ? 4320 : 1960 * Ey(f / 1960)) - f, 10 < f) {
              i.timeoutHandle = H(Fo.bind(null, i, Vn, ai), f);
              break;
            }
            Fo(i, Vn, ai);
            break;
          case 5:
            Fo(i, Vn, ai);
            break;
          default:
            throw Error(l(329));
        }
      }
    }
    return Tn(i, Xt()), i.callbackNode === u ? T4.bind(null, i) : null;
  }
  function Vd(i, s) {
    var u = rl;
    return i.current.memoizedState.isDehydrated && (zo(i, s).flags |= 256), i = b0(i, s), i !== 2 && (s = Vn, Vn = u, s !== null && Td(s)), i;
  }
  function Td(i) {
    Vn === null ? Vn = i : Vn.push.apply(Vn, i);
  }
  function Ny(i) {
    for (var s = i; ; ) {
      if (s.flags & 16384) {
        var u = s.updateQueue;
        if (u !== null && (u = u.stores, u !== null)) for (var f = 0; f < u.length; f++) {
          var h = u[f], _ = h.getSnapshot;
          h = h.value;
          try {
            if (!gr(_(), h)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (u = s.child, s.subtreeFlags & 16384 && u !== null) u.return = s, s = u;
      else {
        if (s === i) break;
        for (; s.sibling === null; ) {
          if (s.return === null || s.return === i) return !0;
          s = s.return;
        }
        s.sibling.return = s.return, s = s.sibling;
      }
    }
    return !0;
  }
  function Di(i, s) {
    for (s &= ~bd, s &= ~w0, i.suspendedLanes |= s, i.pingedLanes &= ~s, i = i.expirationTimes; 0 < s; ) {
      var u = 31 - pr(s), f = 1 << u;
      i[u] = -1, s &= ~f;
    }
  }
  function R4(i) {
    if ($e & 6) throw Error(l(327));
    jo();
    var s = W1(i, 0);
    if (!(s & 1)) return Tn(i, Xt()), null;
    var u = b0(i, s);
    if (i.tag !== 0 && u === 2) {
      var f = H2(i);
      f !== 0 && (s = f, u = Vd(i, f));
    }
    if (u === 1) throw u = nl, zo(i, 0), Di(i, s), Tn(i, Xt()), u;
    if (u === 6) throw Error(l(345));
    return i.finishedWork = i.current.alternate, i.finishedLanes = s, Fo(i, Vn, ai), Tn(i, Xt()), null;
  }
  function z4(i) {
    Oi !== null && Oi.tag === 0 && !($e & 6) && jo();
    var s = $e;
    $e |= 1;
    var u = zt.transition, f = rt;
    try {
      if (zt.transition = null, rt = 1, i) return i();
    } finally {
      rt = f, zt.transition = u, $e = s, !($e & 6) && Rr();
    }
  }
  function Rd() {
    Un = Ns.current, mt(Ns);
  }
  function zo(i, s) {
    i.finishedWork = null, i.finishedLanes = 0;
    var u = i.timeoutHandle;
    if (u !== te && (i.timeoutHandle = te, I(u)), Ot !== null) for (u = Ot.return; u !== null; ) {
      var f = u;
      switch (I2(f), f.tag) {
        case 1:
          f = f.type.childContextTypes, f != null && D1();
          break;
        case 3:
          bs(), mt(En), mt(dn), J2();
          break;
        case 5:
          Q2(f);
          break;
        case 4:
          bs();
          break;
        case 13:
          mt(Mt);
          break;
        case 19:
          mt(Mt);
          break;
        case 10:
          Z2(f.type._context);
          break;
        case 22:
        case 23:
          Rd();
      }
      u = u.return;
    }
    if (Qt = i, Ot = i = Gi(i.current, null), rn = Un = s, Bt = 0, nl = null, bd = w0 = Ro = 0, Vn = rl = null, Vo !== null) {
      for (s = 0; s < Vo.length; s++) if (u = Vo[s], f = u.interleaved, f !== null) {
        u.interleaved = null;
        var h = f.next, _ = u.pending;
        if (_ !== null) {
          var N = _.next;
          _.next = h, f.next = N;
        }
        u.pending = f;
      }
      Vo = null;
    }
    return i;
  }
  function F4(i, s) {
    do {
      var u = Ot;
      try {
        if (W2(), i0.current = l0, o0) {
          for (var f = Lt.memoizedState; f !== null; ) {
            var h = f.queue;
            h !== null && (h.pending = null), f = f.next;
          }
          o0 = !1;
        }
        if (To = 0, $t = Ut = Lt = null, Ya = !1, Ka = 0, Ad.current = null, u === null || u.return === null) {
          Bt = 1, nl = s, Ot = null;
          break;
        }
        e: {
          var _ = i, N = u.return, j = u, Z = s;
          if (s = rn, j.flags |= 32768, Z !== null && typeof Z == "object" && typeof Z.then == "function") {
            var le = Z, Le = j, Be = Le.tag;
            if (!(Le.mode & 1) && (Be === 0 || Be === 11 || Be === 15)) {
              var _e = Le.alternate;
              _e ? (Le.updateQueue = _e.updateQueue, Le.memoizedState = _e.memoizedState, Le.lanes = _e.lanes) : (Le.updateQueue = null, Le.memoizedState = null);
            }
            var yt = l4(N);
            if (yt !== null) {
              yt.flags &= -257, u4(yt, N, j, _, s), yt.mode & 1 && a4(_, le, s), s = yt, Z = le;
              var ft = s.updateQueue;
              if (ft === null) {
                var Rn = /* @__PURE__ */ new Set();
                Rn.add(Z), s.updateQueue = Rn;
              } else ft.add(Z);
              break e;
            } else {
              if (!(s & 1)) {
                a4(_, le, s), zd();
                break e;
              }
              Z = Error(l(426));
            }
          } else if (Ct && j.mode & 1) {
            var li = l4(N);
            if (li !== null) {
              !(li.flags & 65536) && (li.flags |= 256), u4(li, N, j, _, s), U2(Ps(Z, j));
              break e;
            }
          }
          _ = Z = Ps(Z, j), Bt !== 4 && (Bt = 2), rl === null ? rl = [_] : rl.push(_), _ = N;
          do {
            switch (_.tag) {
              case 3:
                _.flags |= 65536, s &= -s, _.lanes |= s;
                var B = o4(_, Z, s);
                H3(_, B);
                break e;
              case 1:
                j = Z;
                var O = _.type, X = _.stateNode;
                if (!(_.flags & 128) && (typeof O.getDerivedStateFromError == "function" || X !== null && typeof X.componentDidCatch == "function" && (ji === null || !ji.has(X)))) {
                  _.flags |= 65536, s &= -s, _.lanes |= s;
                  var Se = s4(_, j, s);
                  H3(_, Se);
                  break e;
                }
            }
            _ = _.return;
          } while (_ !== null);
        }
        I4(u);
      } catch (Te) {
        s = Te, Ot === u && u !== null && (Ot = u = u.return);
        continue;
      }
      break;
    } while (!0);
  }
  function j4() {
    var i = C0.current;
    return C0.current = l0, i === null ? l0 : i;
  }
  function zd() {
    (Bt === 0 || Bt === 3 || Bt === 2) && (Bt = 4), Qt === null || !(Ro & 268435455) && !(w0 & 268435455) || Di(Qt, rn);
  }
  function b0(i, s) {
    var u = $e;
    $e |= 2;
    var f = j4();
    (Qt !== i || rn !== s) && (ai = null, zo(i, s));
    do
      try {
        Hy();
        break;
      } catch (h) {
        F4(i, h);
      }
    while (!0);
    if (W2(), $e = u, C0.current = f, Ot !== null) throw Error(l(261));
    return Qt = null, rn = 0, Bt;
  }
  function Hy() {
    for (; Ot !== null; ) O4(Ot);
  }
  function Vy() {
    for (; Ot !== null && !oy(); ) O4(Ot);
  }
  function O4(i) {
    var s = U4(i.alternate, i, Un);
    i.memoizedProps = i.pendingProps, s === null ? I4(i) : Ot = s, Ad.current = null;
  }
  function I4(i) {
    var s = i;
    do {
      var u = s.alternate;
      if (i = s.return, s.flags & 32768) {
        if (u = Ly(u, s), u !== null) {
          u.flags &= 32767, Ot = u;
          return;
        }
        if (i !== null) i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null;
        else {
          Bt = 6, Ot = null;
          return;
        }
      } else if (u = My(u, s, Un), u !== null) {
        Ot = u;
        return;
      }
      if (s = s.sibling, s !== null) {
        Ot = s;
        return;
      }
      Ot = s = i;
    } while (s !== null);
    Bt === 0 && (Bt = 5);
  }
  function Fo(i, s, u) {
    var f = rt, h = zt.transition;
    try {
      zt.transition = null, rt = 1, Ty(i, s, u, f);
    } finally {
      zt.transition = h, rt = f;
    }
    return null;
  }
  function Ty(i, s, u, f) {
    do
      jo();
    while (Oi !== null);
    if ($e & 6) throw Error(l(327));
    u = i.finishedWork;
    var h = i.finishedLanes;
    if (u === null) return null;
    if (i.finishedWork = null, i.finishedLanes = 0, u === i.current) throw Error(l(177));
    i.callbackNode = null, i.callbackPriority = 0;
    var _ = u.lanes | u.childLanes;
    if (iy(i, _), i === Qt && (Ot = Qt = null, rn = 0), !(u.subtreeFlags & 2064) && !(u.flags & 2064) || k0 || (k0 = !0, B4(F2, function() {
      return jo(), null;
    })), _ = (u.flags & 15990) !== 0, u.subtreeFlags & 15990 || _) {
      _ = zt.transition, zt.transition = null;
      var N = rt;
      rt = 1;
      var j = $e;
      $e |= 4, Ad.current = null, by(i, u), b4(u, i), D(i.containerInfo), i.current = u, Py(u), sy(), $e = j, rt = N, zt.transition = _;
    } else i.current = u;
    if (k0 && (k0 = !1, Oi = i, M0 = h), _ = i.pendingLanes, _ === 0 && (ji = null), uy(u.stateNode), Tn(i, Xt()), s !== null) for (f = i.onRecoverableError, u = 0; u < s.length; u++) h = s[u], f(h.value, { componentStack: h.stack, digest: h.digest });
    if (S0) throw S0 = !1, i = Nd, Nd = null, i;
    return M0 & 1 && i.tag !== 0 && jo(), _ = i.pendingLanes, _ & 1 ? i === Hd ? il++ : (il = 0, Hd = i) : il = 0, Rr(), null;
  }
  function jo() {
    if (Oi !== null) {
      var i = v3(M0), s = zt.transition, u = rt;
      try {
        if (zt.transition = null, rt = 16 > i ? 16 : i, Oi === null) var f = !1;
        else {
          if (i = Oi, Oi = null, M0 = 0, $e & 6) throw Error(l(331));
          var h = $e;
          for ($e |= 4, ke = i.current; ke !== null; ) {
            var _ = ke, N = _.child;
            if (ke.flags & 16) {
              var j = _.deletions;
              if (j !== null) {
                for (var Z = 0; Z < j.length; Z++) {
                  var le = j[Z];
                  for (ke = le; ke !== null; ) {
                    var Le = ke;
                    switch (Le.tag) {
                      case 0:
                      case 11:
                      case 15:
                        el(8, Le, _);
                    }
                    var Be = Le.child;
                    if (Be !== null) Be.return = Le, ke = Be;
                    else for (; ke !== null; ) {
                      Le = ke;
                      var _e = Le.sibling, yt = Le.return;
                      if (k4(Le), Le === le) {
                        ke = null;
                        break;
                      }
                      if (_e !== null) {
                        _e.return = yt, ke = _e;
                        break;
                      }
                      ke = yt;
                    }
                  }
                }
                var ft = _.alternate;
                if (ft !== null) {
                  var Rn = ft.child;
                  if (Rn !== null) {
                    ft.child = null;
                    do {
                      var li = Rn.sibling;
                      Rn.sibling = null, Rn = li;
                    } while (Rn !== null);
                  }
                }
                ke = _;
              }
            }
            if (_.subtreeFlags & 2064 && N !== null) N.return = _, ke = N;
            else e: for (; ke !== null; ) {
              if (_ = ke, _.flags & 2048) switch (_.tag) {
                case 0:
                case 11:
                case 15:
                  el(9, _, _.return);
              }
              var B = _.sibling;
              if (B !== null) {
                B.return = _.return, ke = B;
                break e;
              }
              ke = _.return;
            }
          }
          var O = i.current;
          for (ke = O; ke !== null; ) {
            N = ke;
            var X = N.child;
            if (N.subtreeFlags & 2064 && X !== null) X.return = N, ke = X;
            else e: for (N = O; ke !== null; ) {
              if (j = ke, j.flags & 2048) try {
                switch (j.tag) {
                  case 0:
                  case 11:
                  case 15:
                    g0(9, j);
                }
              } catch (Te) {
                wt(j, j.return, Te);
              }
              if (j === N) {
                ke = null;
                break e;
              }
              var Se = j.sibling;
              if (Se !== null) {
                Se.return = j.return, ke = Se;
                break e;
              }
              ke = j.return;
            }
          }
          if ($e = h, Rr(), Tr && typeof Tr.onPostCommitFiberRoot == "function") try {
            Tr.onPostCommitFiberRoot(Z1, i);
          } catch {
          }
          f = !0;
        }
        return f;
      } finally {
        rt = u, zt.transition = s;
      }
    }
    return !1;
  }
  function D4(i, s, u) {
    s = Ps(u, s), s = o4(i, s, 1), i = Fi(i, s, 1), s = gn(), i !== null && (Ga(i, 1, s), Tn(i, s));
  }
  function wt(i, s, u) {
    if (i.tag === 3) D4(i, i, u);
    else for (; s !== null; ) {
      if (s.tag === 3) {
        D4(s, i, u);
        break;
      } else if (s.tag === 1) {
        var f = s.stateNode;
        if (typeof s.type.getDerivedStateFromError == "function" || typeof f.componentDidCatch == "function" && (ji === null || !ji.has(f))) {
          i = Ps(u, i), i = s4(s, i, 1), s = Fi(s, i, 1), i = gn(), s !== null && (Ga(s, 1, i), Tn(s, i));
          break;
        }
      }
      s = s.return;
    }
  }
  function Ry(i, s, u) {
    var f = i.pingCache;
    f !== null && f.delete(s), s = gn(), i.pingedLanes |= i.suspendedLanes & u, Qt === i && (rn & u) === u && (Bt === 4 || Bt === 3 && (rn & 130023424) === rn && 500 > Xt() - Pd ? zo(i, 0) : bd |= u), Tn(i, s);
  }
  function G4(i, s) {
    s === 0 && (i.mode & 1 ? (s = B1, B1 <<= 1, !(B1 & 130023424) && (B1 = 4194304)) : s = 1);
    var u = gn();
    i = zr(i, s), i !== null && (Ga(i, s, u), Tn(i, u));
  }
  function zy(i) {
    var s = i.memoizedState, u = 0;
    s !== null && (u = s.retryLane), G4(i, u);
  }
  function Fy(i, s) {
    var u = 0;
    switch (i.tag) {
      case 13:
        var f = i.stateNode, h = i.memoizedState;
        h !== null && (u = h.retryLane);
        break;
      case 19:
        f = i.stateNode;
        break;
      default:
        throw Error(l(314));
    }
    f !== null && f.delete(s), G4(i, u);
  }
  var U4;
  U4 = function(i, s, u) {
    if (i !== null) if (i.memoizedProps !== s.pendingProps || En.current) Hn = !0;
    else {
      if (!(i.lanes & u) && !(s.flags & 128)) return Hn = !1, ky(i, s, u);
      Hn = !!(i.flags & 131072);
    }
    else Hn = !1, Ct && s.flags & 1048576 && C3(s, X1, s.index);
    switch (s.lanes = 0, s.tag) {
      case 2:
        var f = s.type;
        d0(i, s), i = s.pendingProps;
        var h = _s(s, dn.current);
        Ls(s, u), h = nd(null, s, f, i, h, u);
        var _ = rd();
        return s.flags |= 1, typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0 ? (s.tag = 1, s.memoizedState = null, s.updateQueue = null, Nn(f) ? (_ = !0, G1(s)) : _ = !1, s.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, X2(s), h.updater = u0, s.stateNode = h, h._reactInternals = s, ud(s, f, i, u), s = hd(null, s, f, !0, _, u)) : (s.tag = 0, Ct && _ && O2(s), wn(null, s, h, u), s = s.child), s;
      case 16:
        f = s.elementType;
        e: {
          switch (d0(i, s), i = s.pendingProps, h = f._init, f = h(f._payload), s.type = f, h = s.tag = Oy(f), i = yr(f, i), h) {
            case 0:
              s = fd(null, s, f, i, u);
              break e;
            case 1:
              s = g4(null, s, f, i, u);
              break e;
            case 11:
              s = c4(null, s, f, i, u);
              break e;
            case 14:
              s = d4(null, s, f, yr(f.type, i), u);
              break e;
          }
          throw Error(l(
            306,
            f,
            ""
          ));
        }
        return s;
      case 0:
        return f = s.type, h = s.pendingProps, h = s.elementType === f ? h : yr(f, h), fd(i, s, f, h, u);
      case 1:
        return f = s.type, h = s.pendingProps, h = s.elementType === f ? h : yr(f, h), g4(i, s, f, h, u);
      case 3:
        e: {
          if (m4(s), i === null) throw Error(l(387));
          f = s.pendingProps, _ = s.memoizedState, h = _.element, N3(i, s), n0(s, f, null, u);
          var N = s.memoizedState;
          if (f = N.element, pe && _.isDehydrated) if (_ = { element: f, isDehydrated: !1, cache: N.cache, pendingSuspenseBoundaries: N.pendingSuspenseBoundaries, transitions: N.transitions }, s.updateQueue.baseState = _, s.memoizedState = _, s.flags & 256) {
            h = Ps(Error(l(423)), s), s = y4(i, s, f, u, h);
            break e;
          } else if (f !== h) {
            h = Ps(Error(l(424)), s), s = y4(i, s, f, u, h);
            break e;
          } else for (pe && (er = De(s.stateNode.containerInfo), Gn = s, Ct = !0, mr = null, Ua = !1), u = b3(s, null, f, u), s.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (Ss(), f === h) {
              s = si(i, s, u);
              break e;
            }
            wn(i, s, f, u);
          }
          s = s.child;
        }
        return s;
      case 5:
        return T3(s), i === null && G2(s), f = s.type, h = s.pendingProps, _ = i !== null ? i.memoizedProps : null, N = h.children, ie(f, h) ? N = null : _ !== null && ie(f, _) && (s.flags |= 32), p4(i, s), wn(i, s, N, u), s.child;
      case 6:
        return i === null && G2(s), null;
      case 13:
        return v4(i, s, u);
      case 4:
        return $2(s, s.stateNode.containerInfo), f = s.pendingProps, i === null ? s.child = ks(s, null, f, u) : wn(i, s, f, u), s.child;
      case 11:
        return f = s.type, h = s.pendingProps, h = s.elementType === f ? h : yr(f, h), c4(i, s, f, h, u);
      case 7:
        return wn(i, s, s.pendingProps, u), s.child;
      case 8:
        return wn(i, s, s.pendingProps.children, u), s.child;
      case 12:
        return wn(i, s, s.pendingProps.children, u), s.child;
      case 10:
        e: {
          if (f = s.type._context, h = s.pendingProps, _ = s.memoizedProps, N = h.value, P3(s, f, N), _ !== null) if (gr(_.value, N)) {
            if (_.children === h.children && !En.current) {
              s = si(i, s, u);
              break e;
            }
          } else for (_ = s.child, _ !== null && (_.return = s); _ !== null; ) {
            var j = _.dependencies;
            if (j !== null) {
              N = _.child;
              for (var Z = j.firstContext; Z !== null; ) {
                if (Z.context === f) {
                  if (_.tag === 1) {
                    Z = oi(-1, u & -u), Z.tag = 2;
                    var le = _.updateQueue;
                    if (le !== null) {
                      le = le.shared;
                      var Le = le.pending;
                      Le === null ? Z.next = Z : (Z.next = Le.next, Le.next = Z), le.pending = Z;
                    }
                  }
                  _.lanes |= u, Z = _.alternate, Z !== null && (Z.lanes |= u), Y2(_.return, u, s), j.lanes |= u;
                  break;
                }
                Z = Z.next;
              }
            } else if (_.tag === 10) N = _.type === s.type ? null : _.child;
            else if (_.tag === 18) {
              if (N = _.return, N === null) throw Error(l(341));
              N.lanes |= u, j = N.alternate, j !== null && (j.lanes |= u), Y2(N, u, s), N = _.sibling;
            } else N = _.child;
            if (N !== null) N.return = _;
            else for (N = _; N !== null; ) {
              if (N === s) {
                N = null;
                break;
              }
              if (_ = N.sibling, _ !== null) {
                _.return = N.return, N = _;
                break;
              }
              N = N.return;
            }
            _ = N;
          }
          wn(i, s, h.children, u), s = s.child;
        }
        return s;
      case 9:
        return h = s.type, f = s.pendingProps.children, Ls(s, u), h = tr(h), f = f(h), s.flags |= 1, wn(i, s, f, u), s.child;
      case 14:
        return f = s.type, h = yr(f, s.pendingProps), h = yr(f.type, h), d4(i, s, f, h, u);
      case 15:
        return f4(i, s, s.type, s.pendingProps, u);
      case 17:
        return f = s.type, h = s.pendingProps, h = s.elementType === f ? h : yr(f, h), d0(i, s), s.tag = 1, Nn(f) ? (i = !0, G1(s)) : i = !1, Ls(s, u), r4(s, f, h), ud(s, f, h, u), hd(null, s, f, !0, i, u);
      case 19:
        return _4(i, s, u);
      case 22:
        return h4(i, s, u);
    }
    throw Error(l(156, s.tag));
  };
  function B4(i, s) {
    return R2(i, s);
  }
  function jy(i, s, u, f) {
    this.tag = i, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = s, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = f, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function or(i, s, u, f) {
    return new jy(i, s, u, f);
  }
  function Fd(i) {
    return i = i.prototype, !(!i || !i.isReactComponent);
  }
  function Oy(i) {
    if (typeof i == "function") return Fd(i) ? 1 : 0;
    if (i != null) {
      if (i = i.$$typeof, i === S) return 11;
      if (i === M) return 14;
    }
    return 2;
  }
  function Gi(i, s) {
    var u = i.alternate;
    return u === null ? (u = or(i.tag, s, i.key, i.mode), u.elementType = i.elementType, u.type = i.type, u.stateNode = i.stateNode, u.alternate = i, i.alternate = u) : (u.pendingProps = s, u.type = i.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = i.flags & 14680064, u.childLanes = i.childLanes, u.lanes = i.lanes, u.child = i.child, u.memoizedProps = i.memoizedProps, u.memoizedState = i.memoizedState, u.updateQueue = i.updateQueue, s = i.dependencies, u.dependencies = s === null ? null : { lanes: s.lanes, firstContext: s.firstContext }, u.sibling = i.sibling, u.index = i.index, u.ref = i.ref, u;
  }
  function P0(i, s, u, f, h, _) {
    var N = 2;
    if (f = i, typeof i == "function") Fd(i) && (N = 1);
    else if (typeof i == "string") N = 5;
    else e: switch (i) {
      case y:
        return Oo(u.children, h, _, s);
      case k:
        N = 8, h |= 8;
        break;
      case x:
        return i = or(12, u, s, h | 2), i.elementType = x, i.lanes = _, i;
      case b:
        return i = or(13, u, s, h), i.elementType = b, i.lanes = _, i;
      case L:
        return i = or(19, u, s, h), i.elementType = L, i.lanes = _, i;
      case C:
        return E0(u, h, _, s);
      default:
        if (typeof i == "object" && i !== null) switch (i.$$typeof) {
          case w:
            N = 10;
            break e;
          case m:
            N = 9;
            break e;
          case S:
            N = 11;
            break e;
          case M:
            N = 14;
            break e;
          case g:
            N = 16, f = null;
            break e;
        }
        throw Error(l(130, i == null ? i : typeof i, ""));
    }
    return s = or(N, u, s, h), s.elementType = i, s.type = f, s.lanes = _, s;
  }
  function Oo(i, s, u, f) {
    return i = or(7, i, f, s), i.lanes = u, i;
  }
  function E0(i, s, u, f) {
    return i = or(22, i, f, s), i.elementType = C, i.lanes = u, i.stateNode = { isHidden: !1 }, i;
  }
  function jd(i, s, u) {
    return i = or(6, i, null, s), i.lanes = u, i;
  }
  function Od(i, s, u) {
    return s = or(4, i.children !== null ? i.children : [], i.key, s), s.lanes = u, s.stateNode = { containerInfo: i.containerInfo, pendingChildren: null, implementation: i.implementation }, s;
  }
  function Iy(i, s, u, f, h) {
    this.tag = s, this.containerInfo = i, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = te, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = V2(0), this.expirationTimes = V2(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = V2(0), this.identifierPrefix = f, this.onRecoverableError = h, pe && (this.mutableSourceEagerHydrationData = null);
  }
  function W4(i, s, u, f, h, _, N, j, Z) {
    return i = new Iy(i, s, u, j, Z), s === 1 ? (s = 1, _ === !0 && (s |= 8)) : s = 0, _ = or(3, null, null, s), i.current = _, _.stateNode = i, _.memoizedState = { element: f, isDehydrated: u, cache: null, transitions: null, pendingSuspenseBoundaries: null }, X2(_), i;
  }
  function Z4(i) {
    if (!i) return Ri;
    i = i._reactInternals;
    e: {
      if (R(i) !== i || i.tag !== 1) throw Error(l(170));
      var s = i;
      do {
        switch (s.tag) {
          case 3:
            s = s.stateNode.context;
            break e;
          case 1:
            if (Nn(s.type)) {
              s = s.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        s = s.return;
      } while (s !== null);
      throw Error(l(171));
    }
    if (i.tag === 1) {
      var u = i.type;
      if (Nn(u)) return g3(i, u, s);
    }
    return s;
  }
  function Y4(i) {
    var s = i._reactInternals;
    if (s === void 0)
      throw typeof i.render == "function" ? Error(l(188)) : (i = Object.keys(i).join(","), Error(l(268, i)));
    return i = W(s), i === null ? null : i.stateNode;
  }
  function K4(i, s) {
    if (i = i.memoizedState, i !== null && i.dehydrated !== null) {
      var u = i.retryLane;
      i.retryLane = u !== 0 && u < s ? u : s;
    }
  }
  function N0(i, s) {
    K4(i, s), (i = i.alternate) && K4(i, s);
  }
  function Dy(i) {
    return i = W(i), i === null ? null : i.stateNode;
  }
  function Gy() {
    return null;
  }
  return n.attemptContinuousHydration = function(i) {
    if (i.tag === 13) {
      var s = zr(i, 134217728);
      if (s !== null) {
        var u = gn();
        ir(s, i, 134217728, u);
      }
      N0(i, 134217728);
    }
  }, n.attemptDiscreteHydration = function(i) {
    if (i.tag === 13) {
      var s = zr(i, 1);
      if (s !== null) {
        var u = gn();
        ir(s, i, 1, u);
      }
      N0(i, 1);
    }
  }, n.attemptHydrationAtCurrentPriority = function(i) {
    if (i.tag === 13) {
      var s = Ii(i), u = zr(i, s);
      if (u !== null) {
        var f = gn();
        ir(u, i, s, f);
      }
      N0(i, s);
    }
  }, n.attemptSynchronousHydration = function(i) {
    switch (i.tag) {
      case 3:
        var s = i.stateNode;
        if (s.current.memoizedState.isDehydrated) {
          var u = Da(s.pendingLanes);
          u !== 0 && (T2(s, u | 1), Tn(s, Xt()), !($e & 6) && (Hs(), Rr()));
        }
        break;
      case 13:
        z4(function() {
          var f = zr(i, 1);
          if (f !== null) {
            var h = gn();
            ir(f, i, 1, h);
          }
        }), N0(i, 1);
    }
  }, n.batchedUpdates = function(i, s) {
    var u = $e;
    $e |= 1;
    try {
      return i(s);
    } finally {
      $e = u, $e === 0 && (Hs(), Y1 && Rr());
    }
  }, n.createComponentSelector = function(i) {
    return { $$typeof: m0, value: i };
  }, n.createContainer = function(i, s, u, f, h, _, N) {
    return W4(i, s, !1, null, u, f, h, _, N);
  }, n.createHasPseudoClassSelector = function(i) {
    return { $$typeof: y0, value: i };
  }, n.createHydrationContainer = function(i, s, u, f, h, _, N, j, Z) {
    return i = W4(u, f, !0, i, h, _, N, j, Z), i.context = Z4(null), u = i.current, f = gn(), h = Ii(u), _ = oi(f, h), _.callback = s ?? null, Fi(u, _, h), i.current.lanes = h, Ga(i, h, f), Tn(i, f), i;
  }, n.createPortal = function(i, s, u) {
    var f = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: p, key: f == null ? null : "" + f, children: i, containerInfo: s, implementation: u };
  }, n.createRoleSelector = function(i) {
    return { $$typeof: v0, value: i };
  }, n.createTestNameSelector = function(i) {
    return { $$typeof: x0, value: i };
  }, n.createTextSelector = function(i) {
    return { $$typeof: _0, value: i };
  }, n.deferredUpdates = function(i) {
    var s = rt, u = zt.transition;
    try {
      return zt.transition = null, rt = 16, i();
    } finally {
      rt = s, zt.transition = u;
    }
  }, n.discreteUpdates = function(i, s, u, f, h) {
    var _ = rt, N = zt.transition;
    try {
      return zt.transition = null, rt = 1, i(s, u, f, h);
    } finally {
      rt = _, zt.transition = N, $e === 0 && Hs();
    }
  }, n.findAllNodes = Ld, n.findBoundingRects = function(i, s) {
    if (!_t) throw Error(l(363));
    s = Ld(i, s), i = [];
    for (var u = 0; u < s.length; u++) i.push($n(s[u]));
    for (s = i.length - 1; 0 < s; s--) {
      u = i[s];
      for (var f = u.x, h = f + u.width, _ = u.y, N = _ + u.height, j = s - 1; 0 <= j; j--) if (s !== j) {
        var Z = i[j], le = Z.x, Le = le + Z.width, Be = Z.y, _e = Be + Z.height;
        if (f >= le && _ >= Be && h <= Le && N <= _e) {
          i.splice(s, 1);
          break;
        } else if (f !== le || u.width !== Z.width || _e < _ || Be > N) {
          if (!(_ !== Be || u.height !== Z.height || Le < f || le > h)) {
            le > f && (Z.width += le - f, Z.x = f), Le < h && (Z.width = h - le), i.splice(s, 1);
            break;
          }
        } else {
          Be > _ && (Z.height += Be - _, Z.y = _), _e < N && (Z.height = N - Be), i.splice(s, 1);
          break;
        }
      }
    }
    return i;
  }, n.findHostInstance = Y4, n.findHostInstanceWithNoPortals = function(i) {
    return i = F(i), i = i !== null ? $(i) : null, i === null ? null : i.stateNode;
  }, n.findHostInstanceWithWarning = function(i) {
    return Y4(i);
  }, n.flushControlled = function(i) {
    var s = $e;
    $e |= 1;
    var u = zt.transition, f = rt;
    try {
      zt.transition = null, rt = 1, i();
    } finally {
      rt = f, zt.transition = u, $e = s, $e === 0 && (Hs(), Rr());
    }
  }, n.flushPassiveEffects = jo, n.flushSync = z4, n.focusWithin = function(i, s) {
    if (!_t) throw Error(l(363));
    for (i = Sd(i), s = V4(i, s), s = Array.from(s), i = 0; i < s.length; ) {
      var u = s[i++];
      if (!Qn(u)) {
        if (u.tag === 5 && Ao(u.stateNode)) return !0;
        for (u = u.child; u !== null; ) s.push(u), u = u.sibling;
      }
    }
    return !1;
  }, n.getCurrentUpdatePriority = function() {
    return rt;
  }, n.getFindAllNodesFailureDescription = function(i, s) {
    if (!_t) throw Error(l(363));
    var u = 0, f = [];
    i = [Sd(i), 0];
    for (var h = 0; h < i.length; ) {
      var _ = i[h++], N = i[h++], j = s[N];
      if ((_.tag !== 5 || !Qn(_)) && (kd(_, j) && (f.push(Md(j)), N++, N > u && (u = N)), N < s.length)) for (_ = _.child; _ !== null; ) i.push(_, N), _ = _.sibling;
    }
    if (u < s.length) {
      for (i = []; u < s.length; u++) i.push(Md(s[u]));
      return `findAllNodes was able to match part of the selector:
  ` + (f.join(" > ") + `

No matching component was found for:
  `) + i.join(" > ");
    }
    return null;
  }, n.getPublicRootInstance = function(i) {
    if (i = i.current, !i.child) return null;
    switch (i.child.tag) {
      case 5:
        return oe(i.child.stateNode);
      default:
        return i.child.stateNode;
    }
  }, n.injectIntoDevTools = function(i) {
    if (i = { bundleType: i.bundleType, version: i.version, rendererPackageName: i.rendererPackageName, rendererConfig: i.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: c.ReactCurrentDispatcher, findHostInstanceByFiber: Dy, findFiberByHostInstance: i.findFiberByHostInstance || Gy, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1" }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") i = !1;
    else {
      var s = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (s.isDisabled || !s.supportsFiber) i = !0;
      else {
        try {
          Z1 = s.inject(i), Tr = s;
        } catch {
        }
        i = !!s.checkDCE;
      }
    }
    return i;
  }, n.isAlreadyRendering = function() {
    return !1;
  }, n.observeVisibleRects = function(i, s, u, f) {
    if (!_t) throw Error(l(363));
    i = Ld(i, s);
    var h = gs(i, u, f).disconnect;
    return { disconnect: function() {
      h();
    } };
  }, n.registerMutableSourceForHydration = function(i, s) {
    var u = s._getVersion;
    u = u(s._source), i.mutableSourceEagerHydrationData == null ? i.mutableSourceEagerHydrationData = [s, u] : i.mutableSourceEagerHydrationData.push(s, u);
  }, n.runWithPriority = function(i, s) {
    var u = rt;
    try {
      return rt = i, s();
    } finally {
      rt = u;
    }
  }, n.shouldError = function() {
    return null;
  }, n.shouldSuspend = function() {
    return !1;
  }, n.updateContainer = function(i, s, u, f) {
    var h = s.current, _ = gn(), N = Ii(h);
    return u = Z4(u), s.context === null ? s.context = u : s.pendingContext = u, s = oi(_, N), s.payload = { element: i }, f = f === void 0 ? null : f, f !== null && (s.callback = f), i = Fi(h, s, N), i !== null && (ir(i, h, N, _), t0(i, h, N)), N;
  }, n;
};
Gg.exports = _k;
var Ck = Gg.exports;
const wk = /* @__PURE__ */ pc(Ck);
var Ug = { exports: {} }, ps = {};
/**
 * @license React
 * react-reconciler-constants.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
ps.ConcurrentRoot = 1;
ps.ContinuousEventPriority = 4;
ps.DefaultEventPriority = 16;
ps.DiscreteEventPriority = 1;
ps.IdleEventPriority = 536870912;
ps.LegacyRoot = 0;
Ug.exports = ps;
var Bg = Ug.exports;
const F6 = {
  children: !0,
  ref: !0,
  key: !0,
  style: !0,
  forwardedRef: !0,
  unstable_applyCache: !0,
  unstable_applyDrawHitFromCache: !0
};
let j6 = !1, O6 = !1;
const i3 = ".react-konva-event", Sk = `ReactKonva: You have a Konva node with draggable = true and position defined but no onDragMove or onDragEnd events are handled.
Position of a node will be changed during drag&drop, so you should update state of the react app as well.
Consider to add onDragMove or onDragEnd events.
For more info see: https://github.com/konvajs/react-konva/issues/256
`, kk = `ReactKonva: You are using "zIndex" attribute for a Konva node.
react-konva may get confused with ordering. Just define correct order of elements in your render function of a component.
For more info see: https://github.com/konvajs/react-konva/issues/194
`, Mk = {};
function w2(t, e, n = Mk) {
  if (!j6 && "zIndex" in e && (console.warn(kk), j6 = !0), !O6 && e.draggable) {
    var r = e.x !== void 0 || e.y !== void 0, o = e.onDragEnd || e.onDragMove;
    r && !o && (console.warn(Sk), O6 = !0);
  }
  for (var a in n)
    if (!F6[a]) {
      var l = a.slice(0, 2) === "on", c = n[a] !== e[a];
      if (l && c) {
        var d = a.substr(2).toLowerCase();
        d.substr(0, 7) === "content" && (d = "content" + d.substr(7, 1).toUpperCase() + d.substr(8)), t.off(d, n[a]);
      }
      var p = !e.hasOwnProperty(a);
      p && t.setAttr(a, void 0);
    }
  var y = e._useStrictMode, k = {}, x = !1;
  const w = {};
  for (var a in e)
    if (!F6[a]) {
      var l = a.slice(0, 2) === "on", m = n[a] !== e[a];
      if (l && m) {
        var d = a.substr(2).toLowerCase();
        d.substr(0, 7) === "content" && (d = "content" + d.substr(7, 1).toUpperCase() + d.substr(8)), e[a] && (w[d] = e[a]);
      }
      !l && (e[a] !== n[a] || y && e[a] !== t.getAttr(a)) && (x = !0, k[a] = e[a]);
    }
  x && (t.setAttrs(k), Lo(t));
  for (var d in w)
    t.on(d + i3, w[d]);
}
function Lo(t) {
  if (!Xe.Konva.autoDrawEnabled) {
    var e = t.getLayer() || t.getStage();
    e && e.batchDraw();
  }
}
const Wg = {}, Lk = {};
Jl.Node.prototype._applyProps = w2;
function Ak(t, e) {
  if (typeof e == "string") {
    console.error(`Do not use plain text as child of Konva.Node. You are using text: ${e}`);
    return;
  }
  t.add(e), Lo(t);
}
function bk(t, e, n) {
  let r = Jl[t];
  r || (console.error(`Konva has no node with the type ${t}. Group will be used instead. If you use minimal version of react-konva, just import required nodes into Konva: "import "konva/lib/shapes/${t}"  If you want to render DOM elements as part of canvas tree take a look into this demo: https://konvajs.github.io/docs/react/DOM_Portal.html`), r = Jl.Group);
  const o = {}, a = {};
  for (var l in e) {
    var c = l.slice(0, 2) === "on";
    c ? a[l] = e[l] : o[l] = e[l];
  }
  const d = new r(o);
  return w2(d, a), d;
}
function Pk(t, e, n) {
  console.error(`Text components are not supported for now in ReactKonva. Your text is: "${t}"`);
}
function Ek(t, e, n) {
  return !1;
}
function Nk(t) {
  return t;
}
function Hk() {
  return null;
}
function Vk() {
  return null;
}
function Tk(t, e, n, r) {
  return Lk;
}
function Rk() {
}
function zk(t) {
}
function Fk(t, e) {
  return !1;
}
function jk() {
  return Wg;
}
function Ok() {
  return Wg;
}
const Ik = setTimeout, Dk = clearTimeout, Gk = -1;
function Uk(t, e) {
  return !1;
}
const Bk = !1, Wk = !0, Zk = !0;
function Yk(t, e) {
  e.parent === t ? e.moveToTop() : t.add(e), Lo(t);
}
function Kk(t, e) {
  e.parent === t ? e.moveToTop() : t.add(e), Lo(t);
}
function Zg(t, e, n) {
  e._remove(), t.add(e), e.setZIndex(n.getZIndex()), Lo(t);
}
function Xk(t, e, n) {
  Zg(t, e, n);
}
function $k(t, e) {
  e.destroy(), e.off(i3), Lo(t);
}
function Qk(t, e) {
  e.destroy(), e.off(i3), Lo(t);
}
function qk(t, e, n) {
  console.error(`Text components are not yet supported in ReactKonva. You text is: "${n}"`);
}
function Jk(t, e, n) {
}
function eM(t, e, n, r, o) {
  w2(t, o, r);
}
function tM(t) {
  t.hide(), Lo(t);
}
function nM(t) {
}
function rM(t, e) {
  (e.visible == null || e.visible) && t.show();
}
function iM(t, e) {
}
function oM(t) {
}
function sM() {
}
const aM = () => Bg.DefaultEventPriority, lM = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appendChild: Yk,
  appendChildToContainer: Kk,
  appendInitialChild: Ak,
  cancelTimeout: Dk,
  clearContainer: oM,
  commitMount: Jk,
  commitTextUpdate: qk,
  commitUpdate: eM,
  createInstance: bk,
  createTextInstance: Pk,
  detachDeletedInstance: sM,
  finalizeInitialChildren: Ek,
  getChildHostContext: Ok,
  getCurrentEventPriority: aM,
  getPublicInstance: Nk,
  getRootHostContext: jk,
  hideInstance: tM,
  hideTextInstance: nM,
  idlePriority: kl.unstable_IdlePriority,
  insertBefore: Zg,
  insertInContainerBefore: Xk,
  isPrimaryRenderer: Bk,
  noTimeout: Gk,
  now: kl.unstable_now,
  prepareForCommit: Hk,
  preparePortalMount: Vk,
  prepareUpdate: Tk,
  removeChild: $k,
  removeChildFromContainer: Qk,
  resetAfterCommit: Rk,
  resetTextContent: zk,
  run: kl.unstable_runWithPriority,
  scheduleTimeout: Ik,
  shouldDeprioritizeSubtree: Fk,
  shouldSetTextContent: Uk,
  supportsMutation: Zk,
  unhideInstance: rM,
  unhideTextInstance: iM,
  warnsIfNotActing: Wk
}, Symbol.toStringTag, { value: "Module" }));
var uM = Object.defineProperty, cM = Object.defineProperties, dM = Object.getOwnPropertyDescriptors, I6 = Object.getOwnPropertySymbols, fM = Object.prototype.hasOwnProperty, hM = Object.prototype.propertyIsEnumerable, D6 = (t, e, n) => e in t ? uM(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, G6 = (t, e) => {
  for (var n in e || (e = {}))
    fM.call(e, n) && D6(t, n, e[n]);
  if (I6)
    for (var n of I6(e))
      hM.call(e, n) && D6(t, n, e[n]);
  return t;
}, pM = (t, e) => cM(t, dM(e)), U6, B6;
typeof window < "u" && ((U6 = window.document) != null && U6.createElement || ((B6 = window.navigator) == null ? void 0 : B6.product) === "ReactNative") ? z.useLayoutEffect : z.useEffect;
function Yg(t, e, n) {
  if (!t)
    return;
  if (n(t) === !0)
    return t;
  let r = t.child;
  for (; r; ) {
    const o = Yg(r, e, n);
    if (o)
      return o;
    r = r.sibling;
  }
}
function Kg(t) {
  try {
    return Object.defineProperties(t, {
      _currentRenderer: {
        get() {
          return null;
        },
        set() {
        }
      },
      _currentRenderer2: {
        get() {
          return null;
        },
        set() {
        }
      }
    });
  } catch {
    return t;
  }
}
const W6 = console.error;
console.error = function() {
  const t = [...arguments].join("");
  if (t != null && t.startsWith("Warning:") && t.includes("useContext")) {
    console.error = W6;
    return;
  }
  return W6.apply(this, arguments);
};
const o3 = Kg(z.createContext(null));
class Xg extends z.Component {
  render() {
    return /* @__PURE__ */ z.createElement(o3.Provider, {
      value: this._reactInternals
    }, this.props.children);
  }
}
function gM() {
  const t = z.useContext(o3);
  if (t === null)
    throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
  const e = z.useId();
  return z.useMemo(() => {
    for (const r of [t, t == null ? void 0 : t.alternate]) {
      if (!r)
        continue;
      const o = Yg(r, !1, (a) => {
        let l = a.memoizedState;
        for (; l; ) {
          if (l.memoizedState === e)
            return !0;
          l = l.next;
        }
      });
      if (o)
        return o;
    }
  }, [t, e]);
}
function mM() {
  const t = gM(), [e] = z.useState(() => /* @__PURE__ */ new Map());
  e.clear();
  let n = t;
  for (; n; ) {
    if (n.type && typeof n.type == "object") {
      const o = n.type._context === void 0 && n.type.Provider === n.type ? n.type : n.type._context;
      o && o !== o3 && !e.has(o) && e.set(o, z.useContext(Kg(o)));
    }
    n = n.return;
  }
  return e;
}
function yM() {
  const t = mM();
  return z.useMemo(
    () => Array.from(t.keys()).reduce(
      (e, n) => (r) => /* @__PURE__ */ z.createElement(e, null, /* @__PURE__ */ z.createElement(n.Provider, pM(G6({}, r), {
        value: t.get(n)
      }))),
      (e) => /* @__PURE__ */ z.createElement(Xg, G6({}, e))
    ),
    [t]
  );
}
function vM(t) {
  const e = kn.useRef({});
  return kn.useLayoutEffect(() => {
    e.current = t;
  }), kn.useLayoutEffect(() => () => {
    e.current = {};
  }, []), e.current;
}
const xM = (t) => {
  const e = kn.useRef(null), n = kn.useRef(null), r = kn.useRef(null), o = vM(t), a = yM(), l = (c) => {
    const { forwardedRef: d } = t;
    d && (typeof d == "function" ? d(c) : d.current = c);
  };
  return kn.useLayoutEffect(() => (n.current = new Jl.Stage({
    width: t.width,
    height: t.height,
    container: e.current
  }), l(n.current), r.current = wl.createContainer(n.current, Bg.LegacyRoot, !1, null), wl.updateContainer(kn.createElement(a, {}, t.children), r.current), () => {
    Jl.isBrowser && (l(null), wl.updateContainer(null, r.current, null), n.current.destroy());
  }), []), kn.useLayoutEffect(() => {
    l(n.current), w2(n.current, t, o), wl.updateContainer(kn.createElement(a, {}, t.children), r.current, null);
  }), kn.createElement("div", {
    ref: e,
    id: t.id,
    accessKey: t.accessKey,
    className: t.className,
    role: t.role,
    style: t.style,
    tabIndex: t.tabIndex,
    title: t.title
  });
}, js = "Layer", br = "Group", W5 = "Rect", fo = "Circle", _a = "Line", _M = "Image", Ju = "Text", CM = "Path", wl = wk(lM);
wl.injectIntoDevTools({
  // @ts-ignore
  findHostInstanceByFiber: () => null,
  bundleType: 0,
  version: kn.version,
  rendererPackageName: "react-konva"
});
const wM = kn.forwardRef((t, e) => kn.createElement(Xg, {}, kn.createElement(xM, { ...t, forwardedRef: e })));
function SM({
  viewportWidth: t,
  viewportHeight: e,
  stageX: n,
  stageY: r,
  stageScale: o,
  gridSize: a,
  visible: l,
  isDark: c
}) {
  const d = c ? "#333333" : "#e0e0e0", p = [];
  if (l) {
    const y = -n / o, k = -r / o, x = y + t / o, w = k + e / o, m = Math.floor(y / a) * a, S = Math.ceil(x / a) * a, b = Math.floor(k / a) * a, L = Math.ceil(w / a) * a;
    for (let M = m; M <= S; M += a)
      p.push(
        /* @__PURE__ */ v.jsx(
          _a,
          {
            points: [M, b, M, L],
            stroke: d,
            strokeWidth: 0.5,
            listening: !1
          },
          `v-${M}`
        )
      );
    for (let M = b; M <= L; M += a)
      p.push(
        /* @__PURE__ */ v.jsx(
          _a,
          {
            points: [m, M, S, M],
            stroke: d,
            strokeWidth: 0.5,
            listening: !1
          },
          `h-${M}`
        )
      );
  }
  return /* @__PURE__ */ v.jsx(br, { listening: !1, children: p });
}
function Xo(t, e, n, r) {
  var c, d, p, y, k, x;
  const o = t.domains[e];
  let a;
  o && (r && ((p = (d = (c = o.deviceClasses) == null ? void 0 : c[r]) == null ? void 0 : d.states) != null && p[n]) && (a = o.deviceClasses[r].states[n]), !a && r && ((y = o.deviceClasses) != null && y[r]) && (a = o.deviceClasses[r].default), !a && ((k = o.states) != null && k[n]) && (a = o.states[n]), a || (a = o.default)), a || (a = t.fallback);
  const l = ((x = a.stateStyles) == null ? void 0 : x[n]) ?? a.defaultStyle ?? { opacity: 1, colorMode: "static" };
  return { icon: a.icon, style: l };
}
function kM(t, e, n, r) {
  let o = t.opacity ?? 1, a;
  return e === "on" && (n !== void 0 && n < 255 && (o = 0.3 + n / 255 * 0.7), t.colorMode === "entity_rgb" && r && (a = `rgb(${r[0]}, ${r[1]}, ${r[2]})`)), { opacity: o, fillColor: a };
}
const Vt = "#00bf63", MM = {
  id: "default",
  name: "Default",
  colors: {
    light: "#ffb74d",
    switch: "#4caf50",
    sensor: "#2196f3",
    binary_sensor: "#ff9800",
    climate_heating: "#ef4444",
    climate_cooling: "#3b82f6",
    cover: "#9c27b0",
    lock: "#ff5722",
    media_player: "#e91e63",
    fan: "#00bcd4",
    vacuum: "#8bc34a",
    automation: "#ff9800",
    camera: "#607d8b",
    stateInactive: "#6b7280",
    stateWarning: "#fbbf24",
    fallback: "#34d399"
  }
}, LM = {
  id: "warm-amber",
  name: "Warm Amber",
  colors: {
    light: "#fbbf24",
    switch: "#f59e0b",
    sensor: "#d97706",
    binary_sensor: "#f97316",
    climate_heating: "#dc2626",
    climate_cooling: "#0ea5e9",
    cover: "#b45309",
    lock: "#ea580c",
    media_player: "#c2410c",
    fan: "#0891b2",
    vacuum: "#65a30d",
    automation: "#e67e22",
    camera: "#78716c",
    stateInactive: "#78716c",
    stateWarning: "#f97316",
    fallback: "#fbbf24"
  }
}, AM = {
  id: "cool-ocean",
  name: "Cool Ocean",
  colors: {
    light: "#fcd34d",
    switch: "#2dd4bf",
    sensor: "#38bdf8",
    binary_sensor: "#a78bfa",
    climate_heating: "#f43f5e",
    climate_cooling: "#38bdf8",
    cover: "#8b5cf6",
    lock: "#f472b6",
    media_player: "#c084fc",
    fan: "#22d3ee",
    vacuum: "#34d399",
    automation: "#fb923c",
    camera: "#64748b",
    stateInactive: "#64748b",
    stateWarning: "#eab308",
    fallback: "#2dd4bf"
  }
}, bM = {
  id: "monochrome",
  name: "Monochrome",
  colors: {
    light: "#d4d4d4",
    switch: "#a3a3a3",
    sensor: "#a3a3a3",
    binary_sensor: "#a3a3a3",
    climate_heating: "#737373",
    climate_cooling: "#a3a3a3",
    cover: "#737373",
    lock: "#737373",
    media_player: "#737373",
    fan: "#a3a3a3",
    vacuum: "#a3a3a3",
    automation: "#737373",
    camera: "#737373",
    stateInactive: "#525252",
    stateWarning: "#737373",
    fallback: "#a3a3a3"
  }
}, PM = {
  id: "pastel",
  name: "Pastel",
  colors: {
    light: "#f5d0a9",
    switch: "#a8d8b9",
    sensor: "#a0c4e8",
    binary_sensor: "#d4b5e8",
    climate_heating: "#e8a0a0",
    climate_cooling: "#a0c4e8",
    cover: "#c4a0e8",
    lock: "#e8bfa0",
    media_player: "#e8a0c4",
    fan: "#a0d8e8",
    vacuum: "#b8e8a0",
    automation: "#e8d0a0",
    camera: "#b0aeb5",
    stateInactive: "#b0aeb5",
    stateWarning: "#f0d9a0",
    fallback: "#a8d8b9"
  }
}, EM = {
  id: "color-blind",
  name: "Color Blind",
  colors: {
    light: "#ee7733",
    switch: "#009988",
    sensor: "#0077bb",
    binary_sensor: "#cc3311",
    climate_heating: "#cc3311",
    climate_cooling: "#0077bb",
    cover: "#aa3377",
    lock: "#ee3377",
    media_player: "#aa3377",
    fan: "#33bbee",
    vacuum: "#009988",
    automation: "#ee7733",
    camera: "#888888",
    stateInactive: "#888888",
    stateWarning: "#ccbb44",
    fallback: "#ee7733"
  }
}, ec = {
  default: MM,
  "warm-amber": LM,
  "cool-ocean": AM,
  pastel: PM,
  monochrome: bM,
  "color-blind": EM
};
function Ce(t, e) {
  return {
    icon: { type: "emoji", value: t },
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const NM = {
  id: "emoji",
  name: "Emoji",
  description: "Default emoji icons — zero extra bundle size",
  fallback: Ce("⬡"),
  domains: {
    light: {
      default: {
        icon: { type: "emoji", value: "💡" },
        defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
        stateStyles: {
          on: { opacity: 1, colorMode: "entity_rgb" },
          off: { opacity: 0.5, colorMode: "static" },
          unavailable: { opacity: 0.3, colorMode: "static" }
        }
      }
    },
    switch: { default: Ce("⚡") },
    cover: {
      default: Ce("🪟"),
      states: {
        open: Ce("🪟"),
        opening: Ce("🪟"),
        closed: Ce("🪟"),
        closing: Ce("🪟")
      }
    },
    sensor: {
      default: Ce("📊"),
      deviceClasses: {
        temperature: { default: Ce("🌡") },
        humidity: { default: Ce("💧") },
        pressure: { default: Ce("🌀") },
        power: { default: Ce("⚡") },
        energy: { default: Ce("🔋") },
        battery: { default: Ce("🔋") },
        illuminance: { default: Ce("☀️") },
        carbon_dioxide: { default: Ce("🫧") },
        carbon_monoxide: { default: Ce("⚠️") },
        gas: { default: Ce("🫧") },
        moisture: { default: Ce("💧") },
        plug: { default: Ce("🔌") }
      }
    },
    binary_sensor: {
      default: Ce("◉"),
      deviceClasses: {
        motion: { default: Ce("🚶") },
        door: { default: Ce("🚪") },
        window: { default: Ce("🪟") },
        vibration: { default: Ce("📳") },
        smoke: { default: Ce("🔥") },
        occupancy: { default: Ce("👤") },
        opening: { default: Ce("🚪") },
        presence: { default: Ce("📡") },
        problem: { default: Ce("⚠️") },
        safety: { default: Ce("🛡") },
        sound: { default: Ce("🔊") }
      }
    },
    climate: {
      default: Ce("🌡"),
      states: {
        heat: Ce("🔥"),
        cool: Ce("❄️"),
        heat_cool: Ce("🔄"),
        auto: Ce("🔄"),
        dry: Ce("💧"),
        fan_only: Ce("🌀"),
        off: Ce("⏻")
      }
    },
    fan: { default: Ce("🌀") },
    camera: { default: Ce("📷") },
    media_player: {
      default: Ce("🔊"),
      states: {
        playing: Ce("▶️"),
        paused: Ce("⏸️")
      }
    },
    lock: {
      default: Ce("🔒"),
      states: {
        locked: Ce("🔒"),
        unlocked: Ce("🔓")
      }
    },
    scene: { default: Ce("🎬") },
    script: { default: Ce("📜") },
    automation: { default: Ce("⚙️") },
    button: { default: Ce("🔘") },
    furniture: {
      default: Ce("🪑"),
      deviceClasses: {
        sofa: { default: Ce("🛋️") },
        bed: { default: Ce("🛏️") },
        table: { default: Ce("🪑") },
        chair: { default: Ce("💺") },
        desk: { default: Ce("🖥️") },
        plant: { default: Ce("🪴") },
        door: { default: Ce("🚪") },
        window: { default: Ce("🪟") },
        toilet: { default: Ce("🚽") },
        shower: { default: Ce("🚿") },
        sink: { default: Ce("🚰") },
        bathtub: { default: Ce("🛁") },
        fridge: { default: Ce("🧊") },
        oven: { default: Ce("♨️") },
        dishwasher: { default: Ce("🍽️") },
        tv: { default: Ce("📺") },
        wardrobe: { default: Ce("🗄️") },
        bookshelf: { default: Ce("📚") }
      }
    }
  }
};
var S2 = "M4.93,4.93C3.12,6.74 2,9.24 2,12C2,14.76 3.12,17.26 4.93,19.07L6.34,17.66C4.89,16.22 4,14.22 4,12C4,9.79 4.89,7.78 6.34,6.34L4.93,4.93M19.07,4.93L17.66,6.34C19.11,7.78 20,9.79 20,12C20,14.22 19.11,16.22 17.66,17.66L19.07,19.07C20.88,17.26 22,14.76 22,12C22,9.24 20.88,6.74 19.07,4.93M7.76,7.76C6.67,8.85 6,10.35 6,12C6,13.65 6.67,15.15 7.76,16.24L9.17,14.83C8.45,14.11 8,13.11 8,12C8,10.89 8.45,9.89 9.17,9.17L7.76,7.76M16.24,7.76L14.83,9.17C15.55,9.89 16,10.89 16,12C16,13.11 15.55,14.11 14.83,14.83L16.24,16.24C17.33,15.15 18,13.65 18,12C18,10.35 17.33,8.85 16.24,7.76M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z", HM = "M4.93,3.93C3.12,5.74 2,8.24 2,11C2,13.76 3.12,16.26 4.93,18.07L6.34,16.66C4.89,15.22 4,13.22 4,11C4,8.79 4.89,6.78 6.34,5.34L4.93,3.93M19.07,3.93L17.66,5.34C19.11,6.78 20,8.79 20,11C20,13.22 19.11,15.22 17.66,16.66L19.07,18.07C20.88,16.26 22,13.76 22,11C22,8.24 20.88,5.74 19.07,3.93M7.76,6.76C6.67,7.85 6,9.35 6,11C6,12.65 6.67,14.15 7.76,15.24L9.17,13.83C8.45,13.11 8,12.11 8,11C8,9.89 8.45,8.89 9.17,8.17L7.76,6.76M16.24,6.76L14.83,8.17C15.55,8.89 16,9.89 16,11C16,12.11 15.55,13.11 14.83,13.83L16.24,15.24C17.33,14.15 18,12.65 18,11C18,9.35 17.33,7.85 16.24,6.76M12,9A2,2 0 0,0 10,11A2,2 0 0,0 12,13A2,2 0 0,0 14,11A2,2 0 0,0 12,9M11,15V19H10A1,1 0 0,0 9,20H2V22H9A1,1 0 0,0 10,23H14A1,1 0 0,0 15,22H22V20H15A1,1 0 0,0 14,19H13V15H11Z", s3 = "M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z", $g = "M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z", VM = "M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z", Mf = "M11,9A4,4 0 0,1 15,13A4,4 0 0,1 11,17A4,4 0 0,1 7,13A4,4 0 0,1 11,9M11,11A2,2 0 0,0 9,13A2,2 0 0,0 11,15A2,2 0 0,0 13,13A2,2 0 0,0 11,11M7,4H14A4,4 0 0,1 18,8V9H16V8A2,2 0 0,0 14,6H7A2,2 0 0,0 5,8V20H16V18H18V22H3V8A4,4 0 0,1 7,4M16,11C18.5,11 18.5,9 21,9V11C18.5,11 18.5,13 16,13V11M16,15C18.5,15 18.5,13 21,13V15C18.5,15 18.5,17 16,17V15Z", TM = "M21 11C18.6 11 18.5 12.9 16.2 13L16 12.8V11C18.5 11 18.5 9 21 9V11M22.1 21.5L20.8 22.8L18 19.9V22H3V8C3 7.1 3.3 6.3 3.8 5.7L1.1 3L2.4 1.7L22.1 21.5M9 13C9 14.1 9.9 15 11 15C11.6 15 12.1 14.7 12.5 14.4L9.7 11.6C9.3 11.9 9 12.4 9 13M16 17.9L13.9 15.8C13.2 16.5 12.1 17 11 17C8.8 17 7 15.2 7 13C7 11.9 7.5 10.8 8.2 10.1L5.2 7.1C5.1 7.4 5 7.7 5 8V20H16V17.9M21 15V13C19.3 13 18.7 14 17.7 14.5L18.8 15.6C19.4 15.3 20 15 21 15M14 6C15.1 6 16 6.9 16 8V9H18V8C18 5.8 16.2 4 14 4H7.2L9.2 6H14Z", ho = "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", aa = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z", d1 = "M7 5C8.11 5 9 5.9 9 7S8.11 9 7 9 5 8.11 5 7 5.9 5 7 5M20 13V4.83C20 3.27 18.73 2 17.17 2C16.42 2 15.7 2.3 15.17 2.83L13.92 4.08C13.76 4.03 13.59 4 13.41 4C13 4 12.64 4.12 12.33 4.32L15.09 7.08C15.29 6.77 15.41 6.4 15.41 6C15.41 5.82 15.38 5.66 15.34 5.5L16.59 4.24C16.74 4.09 16.95 4 17.17 4C17.63 4 18 4.37 18 4.83V13H11.15C10.85 12.79 10.58 12.55 10.33 12.28L8.93 10.73C8.74 10.5 8.5 10.35 8.24 10.23C7.93 10.08 7.59 10 7.24 10C6 10 5 11 5 12.25V13H2V19C2 20.1 2.9 21 4 21C4 21.55 4.45 22 5 22H19C19.55 22 20 21.55 20 21C21.1 21 22 20.1 22 19V13H20Z", k2 = "M16 20H8V6H16M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.41 22 18 21.41 18 20.67V5.33C18 4.6 17.4 4 16.67 4M15 16H9V19H15V16M15 7H9V10H15V7M15 11.5H9V14.5H15V11.5Z", RM = "M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z", f1 = "M19,7H11V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7M7,13A3,3 0 0,0 10,10A3,3 0 0,0 7,7A3,3 0 0,0 4,10A3,3 0 0,0 7,13Z", h1 = "M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z", Qg = "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z", zM = "M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z", FM = "M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3Z", jM = "M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M19,7H5V8.63C8.96,9.91 12.09,13.04 13.37,17H19M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18Z", OM = "M8,9H11V4H13V9H16L20,17H4L8,9M14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18H14Z", Xr = "M22 10V13H19V10H22M2 13H5V10H2V13M17 5C17 3.9 16.1 3 15 3H9C7.9 3 7 3.9 7 5V13H17V5M7 15H6V17H11V18L7 22H9.8L12 19.8L14.2 22H17L13 18V17H18V15H7Z", a3 = "M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z", qg = "M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V17H22V21M18,14H22V16H18V14M12,6H16V9H12V6M16,15H12V10H16V15M6,10H10V12H6V10M10,16H6V13H10V16Z", Z6 = "M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z", Lf = "M23 3H1V1H23V3M2 22H11V4H2V22M22 4H13V22H22V4Z", p1 = "M3 6H21C21.55 6 22 6.45 22 7C22 7.55 21.55 8 21 8V19H19V17H15V19H13V8H5V19H3V8C2.45 8 2 7.55 2 7C2 6.45 2.45 6 3 6M16 10.5V11H18V10.5C18 10.22 17.78 10 17.5 10H16.5C16.22 10 16 10.22 16 10.5M16 14.5V15H18V14.5C18 14.22 17.78 14 17.5 14H16.5C16.22 14 16 14.22 16 14.5Z", g1 = "M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33", Dt = "M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z", Ln = "M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z", xi = "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z", IM = "M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z", M2 = "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z", L2 = "M7,2V13H10V22L17,10H13L17,2H7Z", DM = "M7,2H17L13.5,9H17L10,22V14H7V2M9,4V12H12V14.66L14,11H10.24L13.76,4H9Z", GM = "M15,2L17,9H7L9,2M11,10H13V20H16V22H8V20H11V10Z", m1 = "M3,13A9,9 0 0,0 12,22C12,17 7.97,13 3,13M12,5.5A2.5,2.5 0 0,1 14.5,8A2.5,2.5 0 0,1 12,10.5A2.5,2.5 0 0,1 9.5,8A2.5,2.5 0 0,1 12,5.5M5.6,10.25A2.5,2.5 0 0,0 8.1,12.75C8.63,12.75 9.12,12.58 9.5,12.31C9.5,12.37 9.5,12.43 9.5,12.5A2.5,2.5 0 0,0 12,15A2.5,2.5 0 0,0 14.5,12.5C14.5,12.43 14.5,12.37 14.5,12.31C14.88,12.58 15.37,12.75 15.9,12.75C17.28,12.75 18.4,11.63 18.4,10.25C18.4,9.25 17.81,8.4 16.97,8C17.81,7.6 18.4,6.74 18.4,5.75C18.4,4.37 17.28,3.25 15.9,3.25C15.37,3.25 14.88,3.41 14.5,3.69C14.5,3.63 14.5,3.56 14.5,3.5A2.5,2.5 0 0,0 12,1A2.5,2.5 0 0,0 9.5,3.5C9.5,3.56 9.5,3.63 9.5,3.69C9.12,3.41 8.63,3.25 8.1,3.25A2.5,2.5 0 0,0 5.6,5.75C5.6,6.74 6.19,7.6 7.03,8C6.19,8.4 5.6,9.25 5.6,10.25M12,22A9,9 0 0,0 21,13C16,13 12,17 12,22Z", y1 = "M7,2H17A2,2 0 0,1 19,4V9H5V4A2,2 0 0,1 7,2M19,19A2,2 0 0,1 17,21V22H15V21H9V22H7V21A2,2 0 0,1 5,19V10H19V19M8,5V7H10V5H8M8,12V15H10V12H8Z", Y6 = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", UM = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z", v1 = "M16,9V14L16,20A2,2 0 0,1 14,22H10A2,2 0 0,1 8,20V14L8,9C8,7.14 9.27,5.57 11,5.13V4H9V2H15V4H13V5.13C14.73,5.57 16,7.14 16,9Z", l3 = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z", BM = "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,14.4 5,16.5 6.7,18C8.1,16.7 10,16 12,16C14,16 15.8,16.7 17.3,18C19,16.5 20,14.4 20,12A8,8 0 0,0 12,4M14,6A1,1 0 0,1 15,7A1,1 0 0,1 14,8A1,1 0 0,1 13,7A1,1 0 0,1 14,6M10,6A1,1 0 0,1 11,7A1,1 0 0,1 10,8A1,1 0 0,1 9,7A1,1 0 0,1 10,6M6.91,8.94C7.04,8.94 7.16,8.97 7.3,9L10.5,10.32L10.77,10.43C11.33,10 12.09,9.88 12.75,10.15C13.77,10.56 14.27,11.73 13.85,12.75C13.44,13.77 12.27,14.27 11.25,13.85C10.59,13.59 10.12,13 10,12.28L9.77,12.18L6.55,10.88L6.53,10.87C6,10.66 5.77,10.08 5.97,9.56C6.13,9.18 6.5,8.93 6.91,8.94V8.94M17,9A1,1 0 0,1 18,10A1,1 0 0,1 17,11A1,1 0 0,1 16,10A1,1 0 0,1 17,9Z", WM = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M14,6A1,1 0 0,0 13,7A1,1 0 0,0 14,8A1,1 0 0,0 15,7A1,1 0 0,0 14,6M17.09,8.94C16.96,8.94 16.84,8.97 16.7,9L13.5,10.32L13.23,10.43C12.67,10 11.91,9.88 11.25,10.15C10.23,10.56 9.73,11.73 10.15,12.75C10.56,13.77 11.73,14.27 12.75,13.85C13.41,13.59 13.88,13 14,12.28L14.23,12.18L17.45,10.88L17.47,10.87C18,10.66 18.23,10.08 18.03,9.56C17.87,9.18 17.5,8.93 17.09,8.94M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9Z", x1 = "M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z", ZM = "M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4", _1 = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z", YM = "M5 20V12H2L12 3L22 12H19V20H5M12 5.69L7 10.19V18H17V10.19L12 5.69M11 17V16H13V17H11M11 15C10.72 15 10.5 14.78 10.5 14.5V13.6C9.6 13.08 9 12.11 9 11C9 9.34 10.34 8 12 8C13.66 8 15 9.34 15 11C15 12.11 14.4 13.08 13.5 13.6V14.5C13.5 14.78 13.28 15 13 15H11Z", K6 = "M19 8C20.11 8 21 8.9 21 10V16.76C21.61 17.31 22 18.11 22 19C22 20.66 20.66 22 19 22C17.34 22 16 20.66 16 19C16 18.11 16.39 17.31 17 16.76V10C17 8.9 17.9 8 19 8M19 9C18.45 9 18 9.45 18 10V11H20V10C20 9.45 19.55 9 19 9M5 20V12H2L12 3L16.4 6.96C15.54 7.69 15 8.78 15 10V16C14.37 16.83 14 17.87 14 19L14.1 20H5Z", KM = "M19 8C20.11 8 21 8.9 21 10V16.76C21.61 17.31 22 18.11 22 19C22 20.66 20.66 22 19 22C17.34 22 16 20.66 16 19C16 18.11 16.39 17.31 17 16.76V10C17 8.9 17.9 8 19 8M19 9C18.45 9 18 9.45 18 10V11H20V10C20 9.45 19.55 9 19 9M12 5.69L7 10.19V18H14.1L14 19L14.1 20H5V12H2L12 3L16.4 6.96C15.89 7.4 15.5 7.97 15.25 8.61L12 5.69Z", XM = "M8,2H16L20,14H4L8,2M11,15H13V20H18V22H6V20H11V15Z", $M = "M14.56 4L17.23 12H6.78L9.44 4H14.56M16 2H8L4 14H20L16 2M11 15H13V20H18V22H6V20H11V15Z", QM = "M2.81,8.46L14.83,20.5L15.54,19.78L16.95,21.19L18.36,19.78L16.95,18.36L18.36,16.95L19.78,18.36L21.19,16.95L19.78,15.54L20.5,14.83L8.46,2.81L2.81,8.46M5.64,8.46L8.46,5.64L17.66,14.83L14.83,17.66L5.64,8.46M7.05,8.46L8.46,9.88L9.88,8.46L8.46,7.05L7.05,8.46M9.17,10.59L10.59,12L12,10.59L10.59,9.17L9.17,10.59M11.29,12.71L12.71,14.12L14.12,12.71L12.71,11.29L11.29,12.71M13.41,14.83L14.83,16.24L16.24,14.83L14.83,13.41L13.41,14.83Z", Jg = "M8 6V18H16V6H8M14 10H10V8H14V10M19.4 1.6C19 1.2 18.5 1 18 1H6C5.5 1 5 1.2 4.6 1.6C4.2 2 4 2.5 4 3V21C4 21.5 4.2 22 4.6 22.4C5 22.8 5.5 23 6 23H18C18.5 23 19 22.8 19.4 22.4C19.8 22 20 21.5 20 21V3C20 2.5 19.8 2 19.4 1.6M18 21H6V3H18V21Z", qM = "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z", JM = "M15 14V16A1 1 0 0 1 14 17H10A1 1 0 0 1 9 16V14A5 5 0 1 1 15 14M14 18H10V19A1 1 0 0 0 11 20H13A1 1 0 0 0 14 19M7 19V18H5V19A1 1 0 0 0 6 20H7.17A2.93 2.93 0 0 1 7 19M5 10A6.79 6.79 0 0 1 5.68 7A4 4 0 0 0 4 14.45V16A1 1 0 0 0 5 17H7V14.88A6.92 6.92 0 0 1 5 10M17 18V19A2.93 2.93 0 0 1 16.83 20H18A1 1 0 0 0 19 19V18M18.32 7A6.79 6.79 0 0 1 19 10A6.92 6.92 0 0 1 17 14.88V17H19A1 1 0 0 0 20 16V14.45A4 4 0 0 0 18.32 7Z", eL = "M20.84 22.73L18.09 20C18.06 20 18.03 20 18 20H16.83C16.94 19.68 17 19.34 17 19V18.89L14.75 16.64C14.57 16.86 14.31 17 14 17H10C9.45 17 9 16.55 9 16V14C7.4 12.8 6.74 10.84 7.12 9L5.5 7.4C5.18 8.23 5 9.11 5 10C5 11.83 5.72 13.58 7 14.88V17H5C4.45 17 4 16.55 4 16V14.45C2.86 13.79 2.12 12.62 2 11.31C1.85 9.27 3.25 7.5 5.2 7.09L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M15 6C13.22 4.67 10.86 4.72 9.13 5.93L16.08 12.88C17.63 10.67 17.17 7.63 15 6M19.79 16.59C19.91 16.42 20 16.22 20 16V14.45C21.91 13.34 22.57 10.9 21.46 9C20.8 7.85 19.63 7.11 18.32 7C18.77 7.94 19 8.96 19 10C19 11.57 18.47 13.09 17.5 14.31L19.79 16.59M10 19C10 19.55 10.45 20 11 20H13C13.55 20 14 19.55 14 19V18H10V19M7 18H5V19C5 19.55 5.45 20 6 20H7.17C7.06 19.68 7 19.34 7 19V18Z", em = "M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", tL = "M12,2C9.76,2 7.78,3.05 6.5,4.68L7.93,6.11C8.84,4.84 10.32,4 12,4A5,5 0 0,1 17,9C17,10.68 16.16,12.16 14.89,13.06L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M7.23,10.5L12.73,16H10V13.58C8.68,13 7.66,11.88 7.23,10.5M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", nL = "M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z", C1 = "M11 15H6L13 1V9H18L11 23V15Z", tc = "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z", tm = "M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z", nm = "M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17Z", nc = "M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z", w1 = "M5,7A2,2 0 0,0 3,9V15A2,2 0 0,0 5,17H8V15H5V9H8V7H5M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9M16,10.5V12H19V13.5H17.5A1.5,1.5 0 0,0 16,15V18H20.5V16.5H17.5V15H19A1.5,1.5 0 0,0 20.5,13.5V12A1.5,1.5 0 0,0 19,10.5H16Z", S1 = "M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z", k1 = "M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z", M1 = "M14,19H18V5H14M6,19H10V5H6V19Z", u3 = "M8,5.14V19.14L19,12.14L8,5.14Z", rL = "M8.5,8.64L13.77,12L8.5,15.36V8.64M6.5,5V19L17.5,12", L1 = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13", c3 = "M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z", rm = "M16 7V3H14V7H10V3H8V7C7 7 6 8 6 9V14.5L9.5 18V21H14.5V18L18 14.5V9C18 8 17 7 16 7M16 13.67L13.09 16.59L12.67 17H11.33L10.92 16.59L8 13.67V9.09C8 9.06 8.06 9 8.09 9H15.92C15.95 9 16 9.06 16 9.09V13.67Z", iL = "M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5C6.66,13.5 6,12.83 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5M4.22,2H19.78C21,2 22,3 22,4.22V19.78A2.22,2.22 0 0,1 19.78,22H4.22C3,22 2,21 2,19.78V4.22A2.22,2.22 0 0,1 4.22,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z", oL = "M7.95,3L6.53,5.19L7.95,7.4H7.94L5.95,10.5L4.22,9.6L5.64,7.39L4.22,5.19L6.22,2.09L7.95,3M13.95,2.89L12.53,5.1L13.95,7.3L13.94,7.31L11.95,10.4L10.22,9.5L11.64,7.3L10.22,5.1L12.22,2L13.95,2.89M20,2.89L18.56,5.1L20,7.3V7.31L18,10.4L16.25,9.5L17.67,7.3L16.25,5.1L18.25,2L20,2.89M2,22V14A2,2 0 0,1 4,12H20A2,2 0 0,1 22,14V22H20V20H4V22H2M6,14A1,1 0 0,0 5,15V17A1,1 0 0,0 6,18A1,1 0 0,0 7,17V15A1,1 0 0,0 6,14M10,14A1,1 0 0,0 9,15V17A1,1 0 0,0 10,18A1,1 0 0,0 11,17V15A1,1 0 0,0 10,14M14,14A1,1 0 0,0 13,15V17A1,1 0 0,0 14,18A1,1 0 0,0 15,17V15A1,1 0 0,0 14,14M18,14A1,1 0 0,0 17,15V17A1,1 0 0,0 18,18A1,1 0 0,0 19,17V15A1,1 0 0,0 18,14Z", A1 = "M22 14H21C21 10.13 17.87 7 14 7H13V5.73C13.6 5.39 14 4.74 14 4C14 2.9 13.11 2 12 2S10 2.9 10 4C10 4.74 10.4 5.39 11 5.73V7H10C6.13 7 3 10.13 3 14H2C1.45 14 1 14.45 1 15V18C1 18.55 1.45 19 2 19H3V20C3 21.11 3.9 22 5 22H19C20.11 22 21 21.11 21 20V19H22C22.55 19 23 18.55 23 18V15C23 14.45 22.55 14 22 14M9.79 16.5C9.4 15.62 8.53 15 7.5 15S5.6 15.62 5.21 16.5C5.08 16.19 5 15.86 5 15.5C5 14.12 6.12 13 7.5 13S10 14.12 10 15.5C10 15.86 9.92 16.19 9.79 16.5M18.79 16.5C18.4 15.62 17.5 15 16.5 15S14.6 15.62 14.21 16.5C14.08 16.19 14 15.86 14 15.5C14 14.12 15.12 13 16.5 13S19 14.12 19 15.5C19 15.86 18.92 16.19 18.79 16.5Z", X6 = "M20 19V3H4V19H2V21H22V19H20M6 19V13H11V14.8C10.6 15.1 10.2 15.6 10.2 16.2C10.2 17.2 11 18 12 18S13.8 17.2 13.8 16.2C13.8 15.6 13.5 15.1 13 14.8V13H18V19H6Z", Af = "M20 19V3H4V19H2V21H10.25C10.25 21.97 11.03 22.75 12 22.75S13.75 21.97 13.75 21H22V19H20M6 19V17H11V19H6M13 19V17H18V19H13Z", b1 = "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z", d3 = "M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z", $6 = "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z", sL = "M12 1L3 5V11C3 16.5 6.8 21.7 12 23C17.2 21.7 21 16.5 21 11V5L12 1M16 15.8C16 16.4 15.4 17 14.7 17H9.2C8.6 17 8 16.4 8 15.7V12.2C8 11.6 8.6 11 9.2 11V8.5C9.2 7.1 10.6 6 12 6S14.8 7.1 14.8 8.5V9H13.5V8.5C13.5 7.7 12.8 7.2 12 7.2S10.5 7.7 10.5 8.5V11H14.8C15.4 11 16 11.6 16 12.3V15.8Z", im = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21Z", P1 = "M21,14V15C21,16.91 19.93,18.57 18.35,19.41L19,22H17L16.5,20C16.33,20 16.17,20 16,20H8C7.83,20 7.67,20 7.5,20L7,22H5L5.65,19.41C4.07,18.57 3,16.91 3,15V14H2V12H20V5A1,1 0 0,0 19,4C18.5,4 18.12,4.34 18,4.79C18.63,5.33 19,6.13 19,7H13A3,3 0 0,1 16,4C16.06,4 16.11,4 16.17,4C16.58,2.84 17.69,2 19,2A3,3 0 0,1 22,5V14H21V14M19,14H5V15A3,3 0 0,0 8,18H16A3,3 0 0,0 19,15V14Z", aL = "M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V5H19V19M12 18C15.31 18 18 15.31 18 12C18 8.68 15.31 6 12 6C8.68 6 6 8.68 6 12C6 15.31 8.69 18 12 18M12 8C14.21 8 16 9.79 16 12S14.21 16 12 16 8 14.21 8 12 9.79 8 12 8Z", A2 = "M12 4C16.41 4 20 7.59 20 12S16.41 20 12 20 4 16.41 4 12 7.59 4 12 4M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 11C11.45 11 11 11.45 11 12S11.45 13 12 13 13 12.55 13 12 12.55 11 12 11M10.72 9.3C11.11 9.11 11.54 9 12 9S12.89 9.11 13.29 9.3L14 8.57C13.43 8.22 12.74 8 12 8S10.58 8.22 10 8.57L10.72 9.3M15 12C15 12.46 14.89 12.89 14.7 13.29L15.43 14C15.79 13.43 16 12.74 16 12S15.79 10.58 15.43 10L14.7 10.72C14.89 11.11 15 11.54 15 12M9 12C9 11.54 9.11 11.11 9.3 10.72L8.57 10C8.22 10.58 8 11.26 8 12S8.22 13.43 8.57 14L9.3 13.29C9.11 12.89 9 12.46 9 12M13.29 14.7C12.89 14.89 12.46 15 12 15S11.11 14.89 10.72 14.7L10 15.43C10.58 15.79 11.26 16 12 16S13.43 15.79 14 15.43L13.29 14.7M16.89 8.53L16.17 9.25C16.69 10.04 17 11 17 12S16.69 13.96 16.17 14.75L16.89 15.47C17.59 14.5 18 13.3 18 12S17.59 9.5 16.89 8.53M9.25 7.83C10.04 7.31 11 7 12 7S13.96 7.31 14.75 7.83L15.47 7.11C14.5 6.42 13.3 6 12 6S9.5 6.42 8.53 7.11L9.25 7.83M14.75 16.17C13.96 16.69 13 17 12 17S10.04 16.69 9.25 16.17L8.53 16.89C9.5 17.59 10.7 18 12 18S14.5 17.59 15.47 16.89L14.75 16.17M7.83 14.75C7.31 13.96 7 13 7 12S7.31 10.04 7.83 9.25L7.11 8.53C6.42 9.5 6 10.7 6 12S6.42 14.5 7.11 15.47L7.83 14.75Z", E1 = "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z", N1 = "M12.5 7C12.5 5.89 13.39 5 14.5 5H18C19.1 5 20 5.9 20 7V9.16C18.84 9.57 18 10.67 18 11.97V14H12.5V7M6 11.96V14H11.5V7C11.5 5.89 10.61 5 9.5 5H6C4.9 5 4 5.9 4 7V9.15C5.16 9.56 6 10.67 6 11.96M20.66 10.03C19.68 10.19 19 11.12 19 12.12V15H5V12C5 10.9 4.11 10 3 10S1 10.9 1 12V17C1 18.1 1.9 19 3 19V21H5V19H19V21H21V19C22.1 19 23 18.1 23 17V12C23 10.79 21.91 9.82 20.66 10.03Z", f3 = "M12,12A3,3 0 0,0 9,15A3,3 0 0,0 12,18A3,3 0 0,0 15,15A3,3 0 0,0 12,12M12,20A5,5 0 0,1 7,15A5,5 0 0,1 12,10A5,5 0 0,1 17,15A5,5 0 0,1 12,20M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8C10.89,8 10,7.1 10,6C10,4.89 10.89,4 12,4M17,2H7C5.89,2 5,2.89 5,4V20A2,2 0 0,0 7,22H17A2,2 0 0,0 19,20V4C19,2.89 18.1,2 17,2Z", H1 = "M6,14H8L11,17H9L6,14M4,4H5V3A1,1 0 0,1 6,2H10A1,1 0 0,1 11,3V4H13V3A1,1 0 0,1 14,2H18A1,1 0 0,1 19,3V4H20A2,2 0 0,1 22,6V19A2,2 0 0,1 20,21V22H17V21H7V22H4V21A2,2 0 0,1 2,19V6A2,2 0 0,1 4,4M18,7A1,1 0 0,1 19,8A1,1 0 0,1 18,9A1,1 0 0,1 17,8A1,1 0 0,1 18,7M14,7A1,1 0 0,1 15,8A1,1 0 0,1 14,9A1,1 0 0,1 13,8A1,1 0 0,1 14,7M20,6H4V10H20V6M4,19H20V12H4V19M6,7A1,1 0 0,1 7,8A1,1 0 0,1 6,9A1,1 0 0,1 5,8A1,1 0 0,1 6,7M13,14H15L18,17H16L13,14Z", $r = "M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z", V1 = "M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z", Ca = "M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z", lL = "M0.5,2.77L1.78,1.5L21,20.72L19.73,22L16.73,19H16V21H8V19H3A2,2 0 0,1 1,17V5C1,4.5 1.17,4.07 1.46,3.73L0.5,2.77M21,17V5H7.82L5.82,3H21A2,2 0 0,1 23,5V17C23,17.85 22.45,18.59 21.7,18.87L19.82,17H21M3,17H14.73L3,5.27V17Z", Q6 = "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z", Z5 = "M17 3H21V5H17V3M17 7H21V9H17V7M17 11H21V13H17.75L17 12.1V11M21 15V17H19C19 16.31 18.9 15.63 18.71 15H21M7 3V5H3V3H7M7 7V9H3V7H7M7 11V12.1L6.25 13H3V11H7M3 15H5.29C5.1 15.63 5 16.31 5 17H3V15M15 13V5C15 3.34 13.66 2 12 2S9 3.34 9 5V13C6.79 14.66 6.34 17.79 8 20S12.79 22.66 15 21 17.66 16.21 16 14C15.72 13.62 15.38 13.28 15 13M12 4C12.55 4 13 4.45 13 5V8H11V5C11 4.45 11.45 4 12 4Z", uL = "M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4zM7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z", q6 = "M17 6H7C3.69 6 1 8.69 1 12S3.69 18 7 18H17C20.31 18 23 15.31 23 12S20.31 6 17 6M17 16H7C4.79 16 3 14.21 3 12S4.79 8 7 8H17C19.21 8 21 9.79 21 12S19.21 16 17 16M17 9C15.34 9 14 10.34 14 12S15.34 15 17 15 20 13.66 20 12 18.66 9 17 9Z", J6 = "M18.4 1.6C18 1.2 17.5 1 17 1H7C6.5 1 6 1.2 5.6 1.6C5.2 2 5 2.5 5 3V21C5 21.5 5.2 22 5.6 22.4C6 22.8 6.5 23 7 23H17C17.5 23 18 22.8 18.4 22.4C18.8 22 19 21.5 19 21V3C19 2.5 18.8 2 18.4 1.6M16 7C16 7.6 15.6 8 15 8H9C8.4 8 8 7.6 8 7V5C8 4.4 8.4 4 9 4H15C15.6 4 16 4.4 16 5V7Z", cL = "M5.6 1.6C6 1.2 6.5 1 7 1H17C17.5 1 18 1.2 18.4 1.6C18.8 2 19 2.5 19 3V21C19 21.5 18.8 22 18.4 22.4C18 22.8 17.5 23 17 23H7C6.5 23 6 22.8 5.6 22.4C5.2 22 5 21.5 5 21V3C5 2.5 5.2 2 5.6 1.6M8 3C7.4 3 7 3.4 7 4V20C7 20.6 7.4 21 8 21H16C16.6 21 17 20.6 17 20V4C17 3.4 16.6 3 16 3H8M8 17C8 16.4 8.4 16 9 16H15C15.6 16 16 16.4 16 17V19C16 19.6 15.6 20 15 20H9C8.4 20 8 19.6 8 19V17Z", T1 = "M9,22H17V19.5C19.41,17.87 21,15.12 21,12V4A2,2 0 0,0 19,2H15C13.89,2 13,2.9 13,4V12H3C3,15.09 5,18 9,19.5V22M5.29,14H18.71C18.14,15.91 16.77,17.5 15,18.33V20H11V18.33C9,18 5.86,15.91 5.29,14M15,4H19V12H15V4M16,5V8H18V5H16Z", R1 = "M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z", z1 = "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z", dL = "M11,4L7,13H19L15,4H11M4,14V22H6V19H14V14H12V17H6V14H4Z", F1 = "M4 4V19C4 20.1 4.9 21 6 21V22H8V21H11.5V2H6C4.9 2 4 2.9 4 4M8 10H10V13H8V10M18 2H12.5V21H16V22H18V21C19.1 21 20 20.1 20 19V4C20 2.9 19.1 2 18 2M16 13H14V10H16V13Z", h3 = "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z", rs = "M12,3.77L11.25,4.61C11.25,4.61 9.97,6.06 8.68,7.94C7.39,9.82 6,12.07 6,14.23A6,6 0 0,0 12,20.23A6,6 0 0,0 18,14.23C18,12.07 16.61,9.82 15.32,7.94C14.03,6.06 12.75,4.61 12.75,4.61L12,3.77M12,6.9C12.44,7.42 12.84,7.85 13.68,9.07C14.89,10.83 16,13.07 16,14.23C16,16.45 14.22,18.23 12,18.23C9.78,18.23 8,16.45 8,14.23C8,13.07 9.11,10.83 10.32,9.07C11.16,7.85 11.56,7.42 12,6.9Z", j1 = "M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z", O1 = "M19,14.5C19,14.5 21,16.67 21,18A2,2 0 0,1 19,20A2,2 0 0,1 17,18C17,16.67 19,14.5 19,14.5M5,18V9A2,2 0 0,1 3,7A2,2 0 0,1 5,5V4A2,2 0 0,1 7,2H9A2,2 0 0,1 11,4V5H19A2,2 0 0,1 21,7V9L21,11A1,1 0 0,1 22,12A1,1 0 0,1 21,13H17A1,1 0 0,1 16,12A1,1 0 0,1 17,11V9H11V18H12A2,2 0 0,1 14,20V22H2V20A2,2 0 0,1 4,18H5Z", I1 = "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z", om = "M12,2A7,7 0 0,1 19,9A7,7 0 0,1 12,16A7,7 0 0,1 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9A5,5 0 0,0 12,14A5,5 0 0,0 17,9A5,5 0 0,0 12,4M12,6A3,3 0 0,1 15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6M6,22A2,2 0 0,1 4,20C4,19.62 4.1,19.27 4.29,18.97L6.11,15.81C7.69,17.17 9.75,18 12,18C14.25,18 16.31,17.17 17.89,15.81L19.71,18.97C19.9,19.27 20,19.62 20,20A2,2 0 0,1 18,22H6Z", fL = "M12 6C13.66 6 15 7.34 15 9C15 9.78 14.7 10.5 14.21 11L10 6.79C10.5 6.3 11.22 6 12 6M12 4C14.76 4 17 6.24 17 9C17 10.33 16.47 11.53 15.62 12.42L17.04 13.84C18.25 12.59 19 10.88 19 9C19 5.13 15.87 2 12 2C10.12 2 8.41 2.75 7.16 3.96L8.58 5.38C9.47 4.53 10.67 4 12 4M22.11 21.46L20.84 22.73L19.46 21.35C19.1 21.75 18.58 22 18 22H6C4.89 22 4 21.11 4 20C4 19.62 4.1 19.27 4.29 18.97L6.11 15.81C7.69 17.17 9.75 18 12 18C13.21 18 14.37 17.75 15.43 17.32L13.85 15.74C13.26 15.91 12.64 16 12 16C8.13 16 5 12.87 5 9C5 8.36 5.09 7.74 5.26 7.15L1.11 3L2.39 1.73L22.11 21.46M12.1 14L7 8.9C7 8.93 7 8.97 7 9C7 11.76 9.24 14 12 14C12.03 14 12.07 14 12.1 14Z", Qr = "M21 20V2H3V20H1V23H23V20M19 4V11H13V4M5 4H11V11H5M5 20V13H11V20M13 20V13H19V20Z", qr = "M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z", _i = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9M8 12H16V14H8V12M8 15H16V17H8V15M8 18H16V20H8V18Z", wa = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9Z";
function ge(t, e) {
  return {
    icon: { type: "path", value: t },
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
function e7(t) {
  return {
    icon: { type: "path", value: t },
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const hL = {
  id: "mdi",
  name: "Material Design",
  description: "Material Design Icons — the same icons Home Assistant uses",
  fallback: ge(_1),
  domains: {
    light: {
      default: e7(qM),
      states: {
        off: e7(em)
      }
    },
    switch: { default: ge(Jg) },
    cover: {
      default: ge(_i),
      states: {
        open: ge(wa),
        opening: ge(wa),
        closed: ge(_i),
        closing: ge(_i)
      }
    },
    sensor: {
      default: ge(a3),
      deviceClasses: {
        temperature: { default: ge(Q6) },
        humidity: { default: ge(j1) },
        pressure: { default: ge(l3) },
        power: { default: ge(L2) },
        energy: { default: ge(C1) },
        battery: { default: ge(k2) },
        illuminance: { default: ge(I1) },
        carbon_dioxide: { default: ge(w1) },
        carbon_monoxide: { default: ge(ho) },
        gas: { default: ge(v1) },
        moisture: { default: ge(h3) },
        plug: { default: ge(c3) }
      }
    },
    binary_sensor: {
      default: ge(ho),
      deviceClasses: {
        motion: { default: ge(S1) },
        door: {
          default: ge(Dt),
          states: {
            on: ge(Ln),
            off: ge(Dt)
          }
        },
        window: {
          default: ge(Qr),
          states: {
            on: ge(qr),
            off: ge(Qr)
          }
        },
        vibration: { default: ge(R1) },
        smoke: { default: ge(A2) },
        occupancy: { default: ge(s3) },
        opening: {
          default: ge(Dt),
          states: {
            on: ge(Ln),
            off: ge(Dt)
          }
        },
        presence: { default: ge(S2) },
        problem: { default: ge(ho) },
        safety: { default: ge(d3) },
        sound: { default: ge(z1) }
      }
    },
    climate: {
      default: ge(Q6),
      states: {
        heat: ge(M2),
        cool: ge(E1),
        heat_cool: ge($r),
        auto: ge($r),
        dry: ge(rs),
        fan_only: ge(xi),
        off: ge(L1)
      }
    },
    fan: { default: ge(xi) },
    camera: { default: ge(Qg) },
    media_player: {
      default: ge(f3),
      states: {
        playing: ge(u3),
        paused: ge(M1)
      }
    },
    lock: {
      default: ge(tc),
      states: {
        locked: ge(tc),
        unlocked: ge(tm)
      }
    },
    scene: { default: ge(k1) },
    script: { default: ge(b1) },
    automation: { default: ge(A1) },
    button: { default: ge(x1) },
    furniture: {
      default: ge(Xr),
      deviceClasses: {
        sofa: { default: ge(N1) },
        bed: { default: ge(f1) },
        table: { default: ge(V1) },
        chair: { default: ge(Xr) },
        desk: { default: ge(p1) },
        plant: { default: ge(m1) },
        door: { default: ge(Ln) },
        window: { default: ge(qr) },
        toilet: { default: ge(T1) },
        shower: { default: ge(P1) },
        sink: { default: ge(O1) },
        bathtub: { default: ge(d1) },
        fridge: { default: ge(y1) },
        oven: { default: ge(H1) },
        dishwasher: { default: ge(g1) },
        tv: { default: ge(Ca) },
        wardrobe: { default: ge(F1) },
        bookshelf: { default: ge(h1) }
      }
    }
  }
};
function he(t, e) {
  return {
    icon: { type: "path", value: t },
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
function t7(t) {
  return {
    icon: { type: "path", value: t },
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const pL = {
  id: "mdi-outline",
  name: "Material Outline",
  description: "Lighter outline-style Material Design Icons",
  fallback: he(_1),
  domains: {
    light: {
      default: t7(nL),
      states: {
        off: t7(tL)
      }
    },
    switch: {
      default: he(q6),
      states: {
        on: he(q6),
        off: he(uL)
      }
    },
    cover: {
      default: he(_i),
      states: {
        open: he(wa),
        opening: he(wa),
        closed: he(_i),
        closing: he(_i)
      }
    },
    sensor: {
      default: he(qg),
      deviceClasses: {
        temperature: { default: he(Z5) },
        humidity: { default: he(j1) },
        pressure: { default: he(BM) },
        power: { default: he(DM) },
        energy: { default: he(C1) },
        battery: { default: he(RM) },
        illuminance: { default: he(I1) },
        carbon_dioxide: { default: he(w1) },
        carbon_monoxide: { default: he(aa) },
        gas: { default: he(v1) },
        moisture: { default: he(rs) },
        plug: { default: he(rm) }
      }
    },
    binary_sensor: {
      default: he(aa),
      deviceClasses: {
        motion: { default: he(S1) },
        door: {
          default: he(Dt),
          states: { on: he(Ln), off: he(Dt) }
        },
        window: {
          default: he(Qr),
          states: { on: he(qr), off: he(Qr) }
        },
        vibration: { default: he(R1) },
        smoke: { default: he(aL) },
        occupancy: { default: he($g) },
        opening: {
          default: he(Dt),
          states: { on: he(Ln), off: he(Dt) }
        },
        presence: { default: he(S2) },
        problem: { default: he(aa) },
        safety: { default: he(im) },
        sound: { default: he(z1) }
      }
    },
    climate: {
      default: he(Z5),
      states: {
        heat: he(M2),
        cool: he(E1),
        heat_cool: he($r),
        auto: he($r),
        dry: he(rs),
        fan_only: he(xi),
        off: he(L1)
      }
    },
    fan: { default: he(xi) },
    camera: { default: he(zM) },
    media_player: {
      default: he(f3),
      states: {
        playing: he(rL),
        paused: he(M1)
      }
    },
    lock: {
      default: he(nc),
      states: {
        locked: he(nc),
        unlocked: he(nm)
      }
    },
    scene: { default: he(k1) },
    script: { default: he(b1) },
    automation: { default: he(A1) },
    button: { default: he(x1) },
    furniture: {
      default: he(Xr),
      deviceClasses: {
        sofa: { default: he(N1) },
        bed: { default: he(f1) },
        table: { default: he(V1) },
        chair: { default: he(Xr) },
        desk: { default: he(p1) },
        plant: { default: he(m1) },
        door: { default: he(Ln) },
        window: { default: he(qr) },
        toilet: { default: he(T1) },
        shower: { default: he(P1) },
        sink: { default: he(O1) },
        bathtub: { default: he(d1) },
        fridge: { default: he(y1) },
        oven: { default: he(H1) },
        dishwasher: { default: he(g1) },
        tv: { default: he(Ca) },
        wardrobe: { default: he(F1) },
        bookshelf: { default: he(h1) }
      }
    }
  }
};
function me(t, e) {
  return {
    icon: { type: "path", value: t },
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
function ml(t) {
  return {
    icon: { type: "path", value: t },
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const gL = {
  id: "mdi-home",
  name: "Home Style",
  description: "Home-focused icons — ceiling lights, floor lamps, wall sconces",
  fallback: me(_1),
  domains: {
    light: {
      default: ml(OM),
      states: {
        off: ml(em)
      },
      deviceClasses: {
        floor_lamp: { default: ml(GM) },
        wall_light: { default: ml(dL) },
        led_strip: { default: ml(QM) }
      }
    },
    switch: { default: me(Jg) },
    cover: {
      default: me(_i),
      states: {
        open: me(wa),
        opening: me(wa),
        closed: me(_i),
        closing: me(_i)
      }
    },
    sensor: {
      default: me(a3),
      deviceClasses: {
        temperature: { default: me(K6) },
        humidity: { default: me(j1) },
        pressure: { default: me(l3) },
        power: { default: me(L2) },
        energy: { default: me(C1) },
        battery: { default: me(k2) },
        illuminance: { default: me(I1) },
        carbon_dioxide: { default: me(w1) },
        carbon_monoxide: { default: me(ho) },
        gas: { default: me(v1) },
        moisture: { default: me(h3) },
        plug: { default: me(c3) }
      }
    },
    binary_sensor: {
      default: me(YM),
      deviceClasses: {
        motion: { default: me(S1) },
        door: {
          default: me(Dt),
          states: { on: me(Ln), off: me(Dt) }
        },
        window: {
          default: me(Qr),
          states: { on: me(qr), off: me(Qr) }
        },
        vibration: { default: me(R1) },
        smoke: { default: me(A2) },
        occupancy: { default: me(s3) },
        opening: {
          default: me(Dt),
          states: { on: me(Ln), off: me(Dt) }
        },
        presence: { default: me(S2) },
        problem: { default: me(ho) },
        safety: { default: me(d3) },
        sound: { default: me(z1) }
      }
    },
    climate: {
      default: me(K6),
      states: {
        heat: me(M2),
        cool: me(E1),
        heat_cool: me($r),
        auto: me($r),
        dry: me(rs),
        fan_only: me(xi),
        off: me(L1)
      }
    },
    fan: { default: me(xi) },
    camera: { default: me(Qg) },
    media_player: {
      default: me(f3),
      states: {
        playing: me(u3),
        paused: me(M1)
      }
    },
    lock: {
      default: me(tc),
      states: {
        locked: me(tc),
        unlocked: me(tm)
      }
    },
    scene: { default: me(k1) },
    script: { default: me(b1) },
    automation: { default: me(A1) },
    button: { default: me(x1) },
    furniture: {
      default: me(Xr),
      deviceClasses: {
        sofa: { default: me(N1) },
        bed: { default: me(f1) },
        table: { default: me(V1) },
        chair: { default: me(Xr) },
        desk: { default: me(p1) },
        plant: { default: me(m1) },
        door: { default: me(Ln) },
        window: { default: me(qr) },
        toilet: { default: me(T1) },
        shower: { default: me(P1) },
        sink: { default: me(O1) },
        bathtub: { default: me(d1) },
        fridge: { default: me(y1) },
        oven: { default: me(H1) },
        dishwasher: { default: me(g1) },
        tv: { default: me(Ca) },
        wardrobe: { default: me(F1) },
        bookshelf: { default: me(h1) }
      }
    }
  }
};
function fe(t, e) {
  return {
    icon: { type: "path", value: t },
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
function n7(t) {
  return {
    icon: { type: "path", value: t },
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const mL = {
  id: "mdi-cozy",
  name: "Cozy Home",
  description: "Warm, cozy icons — table lamps, curtains, radiators, cast devices",
  fallback: fe(_1),
  domains: {
    light: {
      default: n7(XM),
      states: {
        off: n7($M)
      }
    },
    switch: {
      default: fe(J6),
      states: {
        on: fe(J6),
        off: fe(cL)
      }
    },
    cover: {
      default: fe(Lf),
      states: {
        open: fe(Z6),
        opening: fe(Z6),
        closed: fe(Lf),
        closing: fe(Lf)
      }
    },
    sensor: {
      default: fe(a3),
      deviceClasses: {
        temperature: { default: fe(KM) },
        humidity: { default: fe(j1) },
        pressure: { default: fe(l3) },
        power: { default: fe(L2) },
        energy: { default: fe(C1) },
        battery: { default: fe(k2) },
        illuminance: { default: fe(I1) },
        carbon_dioxide: { default: fe(w1) },
        carbon_monoxide: { default: fe(ho) },
        gas: { default: fe(v1) },
        moisture: { default: fe(h3) },
        plug: { default: fe(c3) }
      }
    },
    binary_sensor: {
      default: fe(ho),
      deviceClasses: {
        motion: { default: fe(S1) },
        door: {
          default: fe(Dt),
          states: { on: fe(Ln), off: fe(Dt) }
        },
        window: {
          default: fe(Qr),
          states: { on: fe(qr), off: fe(Qr) }
        },
        vibration: { default: fe(R1) },
        smoke: { default: fe(A2) },
        occupancy: { default: fe(s3) },
        opening: {
          default: fe(Dt),
          states: { on: fe(Ln), off: fe(Dt) }
        },
        presence: { default: fe(S2) },
        problem: { default: fe(ho) },
        safety: { default: fe(d3) },
        sound: { default: fe(z1) }
      }
    },
    climate: {
      default: fe(oL),
      states: {
        heat: fe(ZM),
        cool: fe(E1),
        heat_cool: fe($r),
        auto: fe($r),
        dry: fe(rs),
        fan_only: fe(Mf),
        off: fe(L1)
      }
    },
    fan: {
      default: fe(Mf),
      states: {
        on: fe(Mf),
        off: fe(TM)
      }
    },
    camera: { default: fe(om) },
    media_player: {
      default: fe(FM),
      states: {
        playing: fe(jM),
        paused: fe(M1)
      }
    },
    lock: {
      default: fe($6),
      states: {
        locked: fe($6),
        unlocked: fe(sL)
      }
    },
    scene: { default: fe(k1) },
    script: { default: fe(b1) },
    automation: { default: fe(A1) },
    button: { default: fe(x1) },
    furniture: {
      default: fe(Xr),
      deviceClasses: {
        sofa: { default: fe(N1) },
        bed: { default: fe(f1) },
        table: { default: fe(V1) },
        chair: { default: fe(Xr) },
        desk: { default: fe(p1) },
        plant: { default: fe(m1) },
        door: { default: fe(Ln) },
        window: { default: fe(qr) },
        toilet: { default: fe(T1) },
        shower: { default: fe(P1) },
        sink: { default: fe(O1) },
        bathtub: { default: fe(d1) },
        fridge: { default: fe(y1) },
        oven: { default: fe(H1) },
        dishwasher: { default: fe(g1) },
        tv: { default: fe(Ca) },
        wardrobe: { default: fe(F1) },
        bookshelf: { default: fe(h1) }
      }
    }
  }
};
function ue(t, e) {
  return {
    icon: { type: "path", value: t },
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
function r7(t) {
  return {
    icon: { type: "path", value: t },
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const yL = {
  id: "mdi-tech",
  name: "Smart Tech",
  description: "Tech-forward — light groups, smart plugs, roller shades, TVs",
  fallback: ue(_1),
  domains: {
    light: {
      default: r7(JM),
      states: {
        off: r7(eL)
      }
    },
    switch: { default: ue(iL) },
    cover: {
      default: ue(Af),
      states: {
        open: ue(X6),
        opening: ue(X6),
        closed: ue(Af),
        closing: ue(Af)
      },
      deviceClasses: {
        garage: {
          default: ue(Y6),
          states: { open: ue(UM), closed: ue(Y6) }
        }
      }
    },
    sensor: {
      default: ue(qg),
      deviceClasses: {
        temperature: { default: ue(Z5) },
        humidity: { default: ue(j1) },
        pressure: { default: ue(WM) },
        power: { default: ue(L2) },
        energy: { default: ue(C1) },
        battery: { default: ue(k2) },
        illuminance: { default: ue(I1) },
        carbon_dioxide: { default: ue(w1) },
        carbon_monoxide: { default: ue(aa) },
        gas: { default: ue(v1) },
        moisture: { default: ue(rs) },
        plug: { default: ue(rm) }
      }
    },
    binary_sensor: {
      default: ue(aa),
      deviceClasses: {
        motion: { default: ue(S1) },
        door: {
          default: ue(Dt),
          states: { on: ue(Ln), off: ue(Dt) }
        },
        window: {
          default: ue(Qr),
          states: { on: ue(qr), off: ue(Qr) }
        },
        vibration: { default: ue(R1) },
        smoke: { default: ue(A2) },
        occupancy: { default: ue($g) },
        opening: {
          default: ue(Dt),
          states: { on: ue(Ln), off: ue(Dt) }
        },
        presence: { default: ue(HM) },
        problem: { default: ue(aa) },
        safety: { default: ue(im) },
        sound: { default: ue(z1) }
      }
    },
    climate: {
      default: ue(VM),
      states: {
        heat: ue(M2),
        cool: ue(E1),
        heat_cool: ue($r),
        auto: ue($r),
        dry: ue(rs),
        fan_only: ue(xi),
        off: ue(L1)
      }
    },
    fan: {
      default: ue(xi),
      states: {
        on: ue(xi),
        off: ue(IM)
      }
    },
    camera: {
      default: ue(om),
      states: {
        off: ue(fL)
      }
    },
    media_player: {
      default: ue(Ca),
      states: {
        playing: ue(u3),
        paused: ue(M1),
        off: ue(lL)
      }
    },
    lock: {
      default: ue(nc),
      states: {
        locked: ue(nc),
        unlocked: ue(nm)
      }
    },
    scene: { default: ue(k1) },
    script: { default: ue(b1) },
    automation: { default: ue(A1) },
    button: { default: ue(x1) },
    furniture: {
      default: ue(Xr),
      deviceClasses: {
        sofa: { default: ue(N1) },
        bed: { default: ue(f1) },
        table: { default: ue(V1) },
        chair: { default: ue(Xr) },
        desk: { default: ue(p1) },
        plant: { default: ue(m1) },
        door: { default: ue(Ln) },
        window: { default: ue(qr) },
        toilet: { default: ue(T1) },
        shower: { default: ue(P1) },
        sink: { default: ue(O1) },
        bathtub: { default: ue(d1) },
        fridge: { default: ue(y1) },
        oven: { default: ue(H1) },
        dishwasher: { default: ue(g1) },
        tv: { default: ue(Ca) },
        wardrobe: { default: ue(F1) },
        bookshelf: { default: ue(h1) }
      }
    }
  }
};
/*!
 * Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2026 Fonticons, Inc.
 */
var vL = {
  icon: [448, 512, [128276, 61602], "f0f3", "M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z"]
}, sm = {
  icon: [576, 512, [], "f204", "M384 128c70.7 0 128 57.3 128 128S454.7 384 384 384l-192 0c-70.7 0-128-57.3-128-128s57.3-128 128-128l192 0zM576 256c0-106-86-192-192-192L192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192zM192 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"]
}, am = {
  icon: [512, 512, [9211], "f011", "M288 0c0-17.7-14.3-32-32-32S224-17.7 224 0l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32L288 0zM146.3 98.4c14.5-10.1 18-30.1 7.9-44.6s-30.1-18-44.6-7.9C43.4 92.1 0 169 0 256 0 397.4 114.6 512 256 512S512 397.4 512 256c0-87-43.4-163.9-109.7-210.1-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6c49.8 34.8 82.3 92.4 82.3 157.6 0 106-86 192-192 192S64 362 64 256c0-65.2 32.5-122.9 82.3-157.6z"]
}, rc = {
  icon: [576, 512, [], "f75f", "M176 288C96.5 288 32 223.5 32 144S96.5 0 176 0c27.2 0 52.6 7.5 74.3 20.6 20.1-13 44-20.6 69.7-20.6 47.4 0 88.7 25.7 110.9 64l1.1 0c61.9 0 112 50.1 112 112 0 60.3-47.6 109.4-107.2 111.9-22.6 20-52.3 32.1-84.8 32.1-32.5 0-62.1-12.1-84.7-32L176 288zM512 392c0 13.3-10.7 24-24 24L24 416c-13.3 0-24-10.7-24-24s10.7-24 24-24l464 0c13.3 0 24 10.7 24 24zM88 464l80 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm176 0l288 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"]
}, la = {
  icon: [448, 512, [], "f52b", "M288 64l64 0 0 416c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-384c0-35.3-28.7-64-64-64l-96 0 0 0-160 0C60.7 0 32 28.7 32 64l0 384c-17.7 0-32 14.3-32 32s14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-416zM160 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]
}, lm = {
  icon: [512, 512, [62258, "camera-alt"], "f030", "M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0-10.4-31.2C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"]
}, xL = {
  icon: [576, 512, [128065], "f06e", "M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"]
}, um = {
  icon: [512, 512, [], "f773", "M410.6 124.1c20.7 15.6 46 30.7 74.2 34.5 13.1 1.8 25.2-7.5 27-20.6s-7.5-25.2-20.6-27c-15.9-2.1-33.2-11.3-51.7-25.2-38.4-29-90.5-29-129 0-24 18.1-40.7 26.3-54.5 26.3s-30.5-8.2-54.5-26.3c-38.4-29-90.5-29-129 0-18.5 13.9-35.8 23.1-51.7 25.2-13.1 1.8-22.4 13.8-20.6 27s13.8 22.4 27 20.6c28.2-3.8 53.6-18.9 74.2-34.5 21.3-16.1 49.9-16.1 71.2 0 24.2 18.3 52.3 35.9 83.4 35.9s59.1-17.7 83.4-35.9c21.3-16.1 49.9-16.1 71.2 0zm0 144c20.7 15.6 46 30.7 74.2 34.5 13.1 1.8 25.2-7.5 27-20.6s-7.5-25.2-20.6-27c-15.9-2.1-33.2-11.3-51.7-25.2-38.4-29-90.5-29-129 0-24 18.1-40.7 26.3-54.5 26.3s-30.5-8.2-54.5-26.3c-38.4-29-90.5-29-129 0-18.5 13.9-35.8 23.1-51.7 25.2-13.1 1.7-22.4 13.8-20.6 27s13.8 22.4 27 20.6c28.2-3.8 53.6-18.9 74.2-34.5 21.3-16.1 49.9-16.1 71.2 0 24.2 18.3 52.3 35.9 83.4 35.9s59.1-17.7 83.4-35.9c21.3-16.1 49.9-16.1 71.2 0zm-71.2 144c21.3-16.1 49.9-16.1 71.2 0 20.7 15.6 46 30.7 74.2 34.5 13.1 1.8 25.2-7.5 27-20.6s-7.5-25.2-20.6-27c-15.9-2.1-33.2-11.3-51.7-25.2-38.4-29-90.5-29-129 0-24 18.1-40.7 26.3-54.5 26.3s-30.5-8.2-54.5-26.3c-38.4-29-90.5-29-129 0-18.5 13.9-35.8 23.1-51.7 25.2-13.1 1.8-22.4 13.8-20.6 27s13.8 22.4 27 20.6c28.2-3.8 53.6-18.9 74.2-34.5 21.3-16.1 49.9-16.1 71.2 0 24.2 18.3 52.3 35.9 83.4 35.9s59.1-17.7 83.4-35.9z"]
}, ic = {
  icon: [512, 512, [], "f769", "M96 96c0-53 43-96 96-96s96 43 96 96l0 164.7c29.5 26.4 48 64.7 48 107.3 0 79.5-64.5 144-144 144S48 447.5 48 368c0-42.6 18.5-81 48-107.3L96 96zm96 336c35.3 0 64-28.7 64-64 0-26.9-16.5-49.9-40-59.3L216 96c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 212.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64zM464 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM352 80a80 80 0 1 1 160 0 80 80 0 1 1 -160 0z"]
}, cm = {
  icon: [448, 512, [128212], "f02d", "M384 512L96 512c-53 0-96-43-96-96L0 96C0 43 43 0 96 0L400 0c26.5 0 48 21.5 48 48l0 288c0 20.9-13.4 38.7-32 45.3l0 66.7c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0zM96 384c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0 0-64-256 0zm32-232c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0c-13.3 0-24 10.7-24 24zm24 72c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0z"]
}, dm = {
  icon: [512, 512, [127793, "sprout"], "f4d8", "M512 32C512 140.1 435.4 230.3 333.6 251.4 325.7 193.3 299.6 141 261.1 100.5 301.2 40 369.9 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z"]
}, oc = {
  icon: [448, 512, [128293], "f06d", "M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"]
}, fm = {
  icon: [512, 512, [128705, "bathtub"], "f2cd", "M96 77.3c0-7.3 5.9-13.3 13.3-13.3 3.5 0 6.9 1.4 9.4 3.9l14.9 14.9c-3.6 9.1-5.5 18.9-5.5 29.2 0 19.9 7.2 38 19.2 52-5.3 9.2-4 21.1 3.8 29 9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9-7.8-7.9-19.8-9.1-29-3.8-14-12-32.1-19.2-52-19.2-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0 66.6 0 32 34.6 32 77.3L32 256c-17.7 0-32 14.3-32 32s14.3 32 32 32l0 48c0 28.4 12.4 54 32 71.6L64 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-16 256 0 0 16c0 17.7 14.3 32 32 32s32-14.3 32-32l0-40.4c19.6-17.6 32-43.1 32-71.6l0-48c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 256 96 77.3z"]
}, hm = {
  icon: [384, 512, [], "f130", "M192 0C139 0 96 43 96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96zM48 184c0-13.3-10.7-24-24-24S0 170.7 0 184l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c94.7-11.8 168-92.6 168-190.5l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 79.5-64.5 144-144 144S48 303.5 48 224l0-40z"]
}, pm = {
  icon: [512, 512, [128703], "f2cc", "M64 131.9c0-19.8 16.1-35.9 35.9-35.9 9.5 0 18.6 3.8 25.4 10.5l16.2 16.2c-21 38.9-17.4 87.5 10.9 123L151 247c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L345 121c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-1.3 1.3c-35.5-28.3-84.1-31.9-123-10.9L170.5 61.3C151.8 42.5 126.4 32 99.9 32 44.7 32 0 76.7 0 131.9L0 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-316.1zM256 352a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32-32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]
}, _L = {
  icon: [576, 512, [9728], "f185", "M288-32c8.4 0 16.3 4.4 20.6 11.7L364.1 72.3 468.9 46c8.2-2 16.9 .4 22.8 6.3S500 67 498 75.1l-26.3 104.7 92.7 55.5c7.2 4.3 11.7 12.2 11.7 20.6s-4.4 16.3-11.7 20.6L471.7 332.1 498 436.8c2 8.2-.4 16.9-6.3 22.8S477 468 468.9 466l-104.7-26.3-55.5 92.7c-4.3 7.2-12.2 11.7-20.6 11.7s-16.3-4.4-20.6-11.7L211.9 439.7 107.2 466c-8.2 2-16.8-.4-22.8-6.3S76 445 78 436.8l26.2-104.7-92.6-55.5C4.4 272.2 0 264.4 0 256s4.4-16.3 11.7-20.6L104.3 179.9 78 75.1c-2-8.2 .3-16.8 6.3-22.8S99 44 107.2 46l104.7 26.2 55.5-92.6 1.8-2.6c4.5-5.7 11.4-9.1 18.8-9.1zm0 144a144 144 0 1 0 0 288 144 144 0 1 0 0-288zm0 240a96 96 0 1 1 0-192 96 96 0 1 1 0 192z"]
}, CL = {
  icon: [384, 512, [128161], "f0eb", "M292.9 384c7.3-22.3 21.9-42.5 38.4-59.9 32.7-34.4 52.7-80.9 52.7-132.1 0-106-86-192-192-192S0 86 0 192c0 51.2 20 97.7 52.7 132.1 16.5 17.4 31.2 37.6 38.4 59.9l201.7 0zM288 432l-192 0 0 16c0 44.2 35.8 80 80 80l32 0c44.2 0 80-35.8 80-80l0-16zM184 112c-39.8 0-72 32.2-72 72 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-66.3 53.7-120 120-120 13.3 0 24 10.7 24 24s-10.7 24-24 24z"]
}, gm = {
  icon: [384, 512, [], "e0b7", "M0 256L28.5 28c2-16 15.6-28 31.8-28L228.9 0c15 0 27.1 12.1 27.1 27.1 0 3.2-.6 6.5-1.7 9.5L208 160 347.3 160c20.2 0 36.7 16.4 36.7 36.7 0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7l-2.9 0c-15.7 0-28.5-12.8-28.5-28.5 0-2.3 .3-4.6 .9-6.9L176 288 32 288c-17.7 0-32-14.3-32-32z"]
}, mm = {
  icon: [512, 512, [9881, "cog"], "f013", "M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"]
}, ym = {
  icon: [576, 512, [128101, "user-friends"], "f500", "M64 128a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zM0 464c0-97.2 78.8-176 176-176s176 78.8 176 176l0 6c0 23.2-18.8 42-42 42L42 512c-23.2 0-42-18.8-42-42l0-6zM432 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240c79.5 0 144 64.5 144 144l0 22.4c0 23-18.6 41.6-41.6 41.6l-144.8 0c6.6-12.5 10.4-26.8 10.4-42l0-6c0-51.5-17.4-98.9-46.5-136.7 22.6-14.7 49.6-23.3 78.5-23.3z"]
}, wL = {
  icon: [448, 512, [9654], "f04b", "M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"]
}, vm = {
  icon: [448, 512, [128701], "f7d8", "M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48l8 0 0 148.9c-1.9 1.4-3.8 2.9-5.6 4.4-15.5 13.2-26.4 31.6-26.4 54.6 0 46.9 14.3 84.1 37 112.5 14.2 17.7 31.1 31.3 48.5 41.8L65.6 469.9c-3.3 9.8-1.6 20.5 4.4 28.8S85.7 512 96 512l256 0c10.3 0 19.9-4.9 26-13.3s7.7-19.1 4.4-28.8l-19.8-59.5c17.4-10.5 34.3-24.1 48.5-41.8 22.7-28.4 37-65.5 37-112.5 0-23.1-10.9-41.5-26.4-54.6-1.8-1.5-3.7-3-5.6-4.4l0-148.9 8 0c13.3 0 24-10.7 24-24S437.3 0 424 0L24 0zM96 80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16zM224 288c-88.4 0-160-14.3-160-32s71.6-32 160-32 160 14.3 160 32-71.6 32-160 32z"]
}, SL = {
  icon: [512, 512, ["bar-chart"], "f080", "M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zm96 64c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32zm32 80l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 112l256 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"]
}, xm = {
  icon: [384, 512, [128694, "walking"], "f554", "M192 80a56 56 0 1 0 0-112 56 56 0 1 0 0 112zM105.4 227.9l22.6-22.6 0 69.3c0 28 12.2 54.7 33.5 72.9l71.4 61.2c5.9 5.1 9.8 12.1 10.9 19.8l12.6 88.1c2.5 17.5 18.7 29.7 36.2 27.2s29.7-18.7 27.2-36.2l-12.6-88.1c-3.3-23.1-14.9-44.1-32.6-59.3l-34.5-29.6 0-115.2 3.8 4.7c18.2 22.8 45.8 36 75 36l33.2 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-33.2 0c-9.7 0-18.9-4.4-25-12l-17.9-22.4c-23-28.8-57.9-45.6-94.8-45.6-32.2 0-63.1 12.8-85.8 35.6L60.1 182.6C42.1 200.6 32 225 32 250.5L32 288c0 17.7 14.3 32 32 32s32-14.3 32-32l0-37.5c0-8.5 3.4-16.6 9.4-22.6zm12.4 179.4c-1.5 5.2-4.3 10-8.1 13.8L41.4 489.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l68.3-68.3c11.5-11.5 19.9-25.8 24.4-41.5l2.2-7.6-46-39.4c-2.5-2.2-5-4.4-7.4-6.8l-10.4 36.2z"]
}, _m = {
  icon: [512, 512, [], "e06d", "M288 96c0-17.7 14.3-32 32-32s32 14.3 32 32 14.3 32 32 32 32-14.3 32-32c0-53-43-96-96-96s-96 43-96 96l0 192-64 0 0-40c0-30.9-25.1-56-56-56l-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0c4.4 0 8 3.6 8 8l0 40-80 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c17.7 0 32-14.3 32-32s-14.3-32-32-32l-80 0 0-40c0-4.4 3.6-8 8-8l56 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-56 0c-30.9 0-56 25.1-56 56l0 40-64 0 0-192z"]
}, kL = {
  icon: [512, 512, [10052, 10054], "f2dc", "M288.2 0c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 62.1-15-15c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l49 49 0 70.6-61.2-35.3-17.9-66.9c-3.4-12.8-16.6-20.4-29.4-17S95.3 98 98.7 110.8l5.5 20.5-53.7-31C35.2 91.5 15.6 96.7 6.8 112s-3.6 34.9 11.7 43.7l53.7 31-20.5 5.5c-12.8 3.4-20.4 16.6-17 29.4s16.6 20.4 29.4 17l66.9-17.9 61.2 35.3-61.2 35.3-66.9-17.9c-12.8-3.4-26 4.2-29.4 17s4.2 26 17 29.4l20.5 5.5-53.7 31C3.2 365.1-2 384.7 6.8 400s28.4 20.6 43.7 11.7l53.7-31-5.5 20.5c-3.4 12.8 4.2 26 17 29.4s26-4.2 29.4-17l17.9-66.9 61.2-35.3 0 70.6-49 49c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l15-15 0 62.1c0 17.7 14.3 32 32 32s32-14.3 32-32l0-62.1 15 15c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-49-49 0-70.6 61.2 35.3 17.9 66.9c3.4 12.8 16.6 20.4 29.4 17s20.4-16.6 17-29.4l-5.5-20.5 53.7 31c15.3 8.8 34.9 3.6 43.7-11.7s3.6-34.9-11.7-43.7l-53.7-31 20.5-5.5c12.8-3.4 20.4-16.6 17-29.4s-16.6-20.4-29.4-17l-66.9 17.9-61.2-35.3 61.2-35.3 66.9 17.9c12.8 3.4 26-4.2 29.4-17s-4.2-26-17-29.4l-20.5-5.5 53.7-31c15.3-8.8 20.6-28.4 11.7-43.7s-28.4-20.5-43.7-11.7l-53.7 31 5.5-20.5c3.4-12.8-4.2-26-17-29.4s-26 4.2-29.4 17l-17.9 66.9-61.2 35.3 0-70.6 49-49c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-15 15 0-62.1z"]
}, Cm = {
  icon: [512, 512, [62461, "tachometer-alt", "tachometer-alt-fast"], "f625", "M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64 0-16.2-6-31.1-16-42.3l69.5-138.9c5.9-11.9 1.1-26.3-10.7-32.2s-26.3-1.1-32.2 10.7L261.1 288.2c-1.7-.1-3.4-.2-5.1-.2-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"]
}, wm = {
  icon: [576, 512, [], "f3c1", "M384 96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-70.7-57.3-128-128-128S320 25.3 320 96l0 64-160 0c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64l-32 0 0-64z"]
}, sc = {
  icon: [384, 512, [128167, "tint"], "f043", "M192 512C86 512 0 426 0 320 0 228.8 130.2 45.9 166.6-3.5 172.5-11.5 181.8-16 191.8-16l.4 0c10 0 19.3 4.5 25.2 12.5 36.4 49.4 166.6 232.3 166.6 323.5 0 106-86 192-192 192zM112 312c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 75.1 60.9 136 136 136 13.3 0 24-10.7 24-24s-10.7-24-24-24c-48.6 0-88-39.4-88-88z"]
}, Sm = {
  icon: [448, 512, [127902, 62368, "film-alt", "film-simple"], "f008", "M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM48 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm304-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm304-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16L64 96c-8.8 0-16 7.2-16 16zM352 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0z"]
}, km = {
  icon: [448, 512, [128268], "f1e6", "M128-32c17.7 0 32 14.3 32 32l0 96 128 0 0-96c0-17.7 14.3-32 32-32s32 14.3 32 32l0 96 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 95.1-69.2 174.1-160 189.3l0 66.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-66.7C101.2 398.1 32 319.1 32 224l0-64c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0 0-96c0-17.7 14.3-32 32-32z"]
}, i7 = {
  icon: [512, 512, [128470], "f2d0", "M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm24 64l336 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L88 176c-13.3 0-24-10.7-24-24s10.7-24 24-24z"]
}, ac = {
  icon: [576, 512, [63717, "television", "tv-alt"], "f26c", "M64 96l0 240 448 0 0-240-448 0zM0 96C0 60.7 28.7 32 64 32l448 0c35.3 0 64 28.7 64 64l0 240c0 35.3-28.7 64-64 64L64 400c-35.3 0-64-28.7-64-64L0 96zM160 448l256 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"]
}, lc = {
  icon: [512, 512, [9888, "exclamation-triangle", "warning"], "f071", "M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"]
}, uc = {
  icon: [384, 512, [128274], "f023", "M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"]
}, Mm = {
  icon: [640, 512, [], "f4b8", "M144 272C144 224.7 109.8 185.4 64.8 177.5 72 113.6 126.2 64 192 64l256 0c65.8 0 120 49.6 127.2 113.5-45 8-79.2 47.2-79.2 94.5l0 32-352 0 0-32zM0 384L0 272c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 448 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64z"]
}, cc = {
  icon: [576, 512, [], "f205", "M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192S490 64 384 64L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"]
}, Lm = {
  icon: [640, 512, [128267, "battery", "battery-5"], "f240", "M528 128c8.8 0 16 7.2 16 16l0 224c0 8.8-7.2 16-16 16l-416 0c-8.8 0-16-7.2-16-16l0-224c0-8.8 7.2-16 16-16l416 0zM112 64c-44.2 0-80 35.8-80 80l0 224c0 44.2 35.8 80 80 80l416 0c44.2 0 80-35.8 80-80l0-48c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l0-48c0-44.2-35.8-80-80-80L112 64zm56 112c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24l304 0c13.3 0 24-10.7 24-24l0-112c0-13.3-10.7-24-24-24l-304 0z"]
}, dc = {
  icon: [512, 512, ["shield-alt"], "f3ed", "M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"]
}, Am = {
  icon: [576, 512, [128716], "f236", "M32 32c17.7 0 32 14.3 32 32l0 224 224 0 0-128c0-17.7 14.3-32 32-32l160 0c53 0 96 43 96 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64-448 0 0 64c0 17.7-14.3 32-32 32S0 465.7 0 448L0 64C0 46.3 14.3 32 32 32zm80 160a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"]
}, ua = {
  icon: [512, 512, [], "f863", "M160 144c0-79.5 64.5-144 144-144 8.8 0 16 7.2 16 16l0 152.2c15-5.3 31.2-8.2 48-8.2 79.5 0 144 64.5 144 144 0 8.8-7.2 16-16 16l-152.2 0c5.3 15 8.2 31.2 8.2 48 0 79.5-64.5 144-144 144-8.8 0-16-7.2-16-16l0-152.2c-15 5.3-31.2 8.2-48 8.2-79.5 0-144-64.5-144-144 0-8.8 7.2-16 16-16l152.2 0c-5.3-15-8.2-31.2-8.2-48zm96 144a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]
}, no = {
  icon: [448, 512, [128682], "f52a", "M32 64C32 28.7 60.7 0 96 0L352 0c35.3 0 64 28.7 64 64l0 384c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32L32 64zM320 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]
}, bm = {
  icon: [384, 512, [], "f1c9", "M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM154.2 295.6c8.6-10.1 7.5-25.2-2.6-33.8s-25.2-7.5-33.8 2.6l-48 56c-7.7 9-7.7 22.2 0 31.2l48 56c8.6 10.1 23.8 11.2 33.8 2.6s11.2-23.8 2.6-33.8l-34.6-40.4 34.6-40.4zm112-31.2c-8.6-10.1-23.8-11.2-33.8-2.6s-11.2 23.8-2.6 33.8l34.6 40.4-34.6 40.4c-8.6 10.1-7.5 25.2 2.6 33.8s25.2 7.5 33.8-2.6l48-56c7.7-9 7.7-22.2 0-31.2l-48-56z"]
}, Pm = {
  icon: [448, 512, [9889, "zap"], "f0e7", "M338.8-9.9c11.9 8.6 16.3 24.2 10.9 37.8L271.3 224 416 224c13.5 0 25.5 8.4 30.1 21.1s.7 26.9-9.6 35.5l-288 240c-11.3 9.4-27.4 9.9-39.3 1.3s-16.3-24.2-10.9-37.8L176.7 288 32 288c-13.5 0-25.5-8.4-30.1-21.1s-.7-26.9 9.6-35.5l288-240c11.3-9.4 27.4-9.9 39.3-1.3z"]
}, ML = {
  icon: [384, 512, [9208], "f04c", "M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"]
}, Em = {
  icon: [512, 512, [128225], "f7c0", "M232 0c154.6 0 280 125.4 280 280 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-128.1-103.9-232-232-232-13.3 0-24-10.7-24-24S218.7 0 232 0zM208 120c0-13.3 10.7-24 24-24 101.6 0 184 82.4 184 184 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-75.1-60.9-136-136-136-13.3 0-24-10.7-24-24zM26.4 142.7c8.8-17.9 32.4-19.9 46.5-5.8l128.5 128.5 32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32 128.5 128.5c14.1 14.1 12 37.6-5.8 46.5-34.2 16.9-72.6 26.4-113.3 26.4-141.4 0-256-114.6-256-256 0-40.7 9.5-79.2 26.4-113.3z"]
}, Nm = {
  icon: [512, 512, [128280, "dot-circle"], "f192", "M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"]
}, fc = {
  icon: [512, 512, [128472, "refresh", "sync"], "f021", "M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z"]
}, Jt = {
  icon: [448, 512, [129681], "f6c0", "M152 256l0-181.8c-24.5 20.5-40 51.4-40 85.8l0 96 40 0zm48 0l48 0 0-205.4c-7.7-1.7-15.8-2.6-24-2.6s-16.3 .9-24 2.6L200 256zM296 74.2l0 181.8 40 0 0-96c0-34.4-15.5-65.2-40-85.8zM32 256l32 0 0-96C64 71.6 135.6 0 224 0S384 71.6 384 160l0 96 32 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-256 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32z"]
}, Hm = {
  icon: [512, 512, [], "f72e", "M288 32c0 17.7 14.3 32 32 32l40 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L32 112c-17.7 0-32 14.3-32 32s14.3 32 32 32l328 0c48.6 0 88-39.4 88-88S408.6 0 360 0L320 0c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32l32 0c53 0 96-43 96-96s-43-96-96-96L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32zM128 512l40 0c48.6 0 88-39.4 88-88s-39.4-88-88-88L32 336c-17.7 0-32 14.3-32 32s14.3 32 32 32l136 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-40 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z"]
};
function Vm(t) {
  return {
    type: "path",
    value: t.icon[4],
    viewBox: { w: t.icon[0], h: t.icon[1] }
  };
}
function ye(t, e) {
  return {
    icon: Vm(t),
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
function LL(t) {
  return {
    icon: Vm(t),
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const AL = {
  id: "fa-solid",
  name: "Font Awesome",
  description: "Font Awesome solid icons — bold, recognizable shapes",
  fallback: ye(dc),
  domains: {
    light: {
      default: LL(CL)
    },
    switch: {
      default: ye(cc),
      states: {
        on: ye(cc),
        off: ye(sm)
      }
    },
    cover: {
      default: ye(i7)
    },
    sensor: {
      default: ye(SL),
      deviceClasses: {
        temperature: { default: ye(ic) },
        humidity: { default: ye(sc) },
        pressure: { default: ye(Cm) },
        power: { default: ye(Pm) },
        energy: { default: ye(gm) },
        battery: { default: ye(Lm) },
        illuminance: { default: ye(_L) },
        carbon_dioxide: { default: ye(rc) },
        carbon_monoxide: { default: ye(lc) },
        gas: { default: ye(rc) },
        moisture: { default: ye(um) },
        plug: { default: ye(km) }
      }
    },
    binary_sensor: {
      default: ye(xL),
      deviceClasses: {
        motion: { default: ye(xm) },
        door: {
          default: ye(no),
          states: { on: ye(la), off: ye(no) }
        },
        window: { default: ye(i7) },
        vibration: { default: ye(vL) },
        smoke: { default: ye(oc) },
        occupancy: { default: ye(ym) },
        opening: {
          default: ye(no),
          states: { on: ye(la), off: ye(no) }
        },
        presence: { default: ye(Em) },
        problem: { default: ye(lc) },
        safety: { default: ye(dc) },
        sound: { default: ye(hm) }
      }
    },
    climate: {
      default: ye(ic),
      states: {
        heat: ye(oc),
        cool: ye(kL),
        heat_cool: ye(fc),
        auto: ye(fc),
        dry: ye(sc),
        fan_only: ye(ua),
        off: ye(am)
      }
    },
    fan: {
      default: ye(ua),
      states: {
        on: ye(ua),
        off: ye(Hm)
      }
    },
    camera: { default: ye(lm) },
    media_player: {
      default: ye(ac),
      states: {
        playing: ye(wL),
        paused: ye(ML)
      }
    },
    lock: {
      default: ye(uc),
      states: {
        locked: ye(uc),
        unlocked: ye(wm)
      }
    },
    scene: { default: ye(Sm) },
    script: { default: ye(bm) },
    automation: { default: ye(mm) },
    button: { default: ye(Nm) },
    furniture: {
      default: ye(Jt),
      deviceClasses: {
        sofa: { default: ye(Mm) },
        bed: { default: ye(Am) },
        table: { default: ye(Jt) },
        chair: { default: ye(Jt) },
        desk: { default: ye(Jt) },
        plant: { default: ye(dm) },
        door: { default: ye(la) },
        window: { default: ye(Jt) },
        toilet: { default: ye(vm) },
        shower: { default: ye(pm) },
        sink: { default: ye(_m) },
        bathtub: { default: ye(fm) },
        fridge: { default: ye(Jt) },
        oven: { default: ye(Jt) },
        dishwasher: { default: ye(Jt) },
        tv: { default: ye(ac) },
        wardrobe: { default: ye(Jt) },
        bookshelf: { default: ye(cm) }
      }
    }
  }
};
/*!
 * Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2026 Fonticons, Inc.
 */
var bL = {
  icon: [448, 512, [128276, 61602], "f0f3", "M224 0c-13.3 0-24 10.7-24 24l0 9.7C118.6 45.3 56 115.4 56 200l0 14.5c0 37.7-10 74.7-29 107.3L5.1 359.2C1.8 365 0 371.5 0 378.2 0 399.1 16.9 416 37.8 416l372.4 0c20.9 0 37.8-16.9 37.8-37.8 0-6.7-1.8-13.3-5.1-19L421 321.7c-19-32.6-29-69.6-29-107.3l0-14.5c0-84.6-62.6-154.7-144-166.3l0-9.7c0-13.3-10.7-24-24-24zM392.4 368l-336.9 0 12.9-22.1C91.7 306 104 260.6 104 214.5l0-14.5c0-66.3 53.7-120 120-120s120 53.7 120 120l0 14.5c0 46.2 12.3 91.5 35.5 131.4L392.4 368zM156.1 464c9.9 28 36.6 48 67.9 48s58-20 67.9-48l-135.8 0z"]
}, PL = {
  icon: [512, 512, [62092, "pause-circle"], "f28b", "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 184c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 144c0 13.3 10.7 24 24 24s24-10.7 24-24l0-144zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 144c0 13.3 10.7 24 24 24s24-10.7 24-24l0-144z"]
}, EL = {
  icon: [576, 512, [128065], "f06e", "M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"]
}, NL = {
  icon: [576, 512, [9728], "f185", "M288-32c8 0 15.4 4 19.9 10.6l58.8 87.4 103.4-20.2c7.8-1.5 15.9 .9 21.6 6.6s8.1 13.8 6.6 21.6L478 177.3 565.4 236.1C572 240.5 576 248 576 256s-4 15.4-10.6 19.9L478 334.7 498.2 438c1.5 7.8-.9 15.9-6.6 21.6s-13.8 8.1-21.6 6.6L366.7 446 307.9 533.4C303.4 540 296 544 288 544s-15.4-4-19.9-10.6L209.3 446 105.9 466.2c-7.8 1.5-15.9-.9-21.6-6.6s-8.1-13.8-6.6-21.6L98 334.7 10.6 275.9C4 271.4 0 264 0 256s4-15.4 10.6-19.9L98 177.3 77.8 73.9c-1.5-7.8 .9-15.9 6.6-21.6s13.8-8.1 21.6-6.6l103.3 20.2 58.8-87.4 1.8-2.3C274.4-29 281-32 288-32zm-47.8 138c-5.4 8-15 12-24.5 10.2l-84-16.4 16.4 84c1.8 9.5-2.2 19.1-10.2 24.5L67 256 138 303.8c8 5.4 12 15 10.2 24.5l-16.4 84 84-16.4 3.5-.4c8.3-.4 16.3 3.6 21 10.6l47.8 71 47.8-71 2.2-2.8c5.6-6.1 14-9 22.3-7.3l84 16.4-16.4-84c-1.8-9.5 2.2-19.1 10.2-24.5l71-47.8-71-47.8c-8-5.4-12-15-10.2-24.5l16.4-84-84 16.4c-9.5 1.8-19.1-2.2-24.5-10.2l-47.8-71-47.8 71zM288 376a120 120 0 1 1 0-240 120 120 0 1 1 0 240zm0-192a72 72 0 1 0 0 144 72 72 0 1 0 0-144z"]
}, HL = {
  icon: [384, 512, [128161], "f0eb", "M296.5 291.1C321 265.2 336 230.4 336 192 336 112.5 271.5 48 192 48S48 112.5 48 192c0 38.4 15 73.2 39.5 99.1 21.3 22.4 44.9 54 53.3 92.9l102.4 0c8.4-39 32-70.5 53.3-92.9zm34.8 33C307.7 349 288 379.4 288 413.7l0 18.3c0 44.2-35.8 80-80 80l-32 0c-44.2 0-80-35.8-80-80l0-18.3C96 379.4 76.3 349 52.7 324.1 20 289.7 0 243.2 0 192 0 86 86 0 192 0S384 86 384 192c0 51.2-20 97.7-52.7 132.1zM144 184c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6 39.4-88 88-88 13.3 0 24 10.7 24 24s-10.7 24-24 24c-22.1 0-40 17.9-40 40z"]
}, VL = {
  icon: [512, 512, ["bar-chart"], "f080", "M48 56c0-13.3-10.7-24-24-24S0 42.7 0 56L0 400c0 44.2 35.8 80 80 80l408 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L80 432c-17.7 0-32-14.3-32-32L48 56zm104 72l208 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L152 80c-13.3 0-24 10.7-24 24s10.7 24 24 24zm0 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0zm0 112c-13.3 0-24 10.7-24 24s10.7 24 24 24l272 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-272 0z"]
}, TL = {
  icon: [512, 512, [10052, 10054], "f2dc", "M280.1-8c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 78.1-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l57 57 0 76.5-66.2-38.2-20.9-77.8c-3.4-12.8-16.6-20.4-29.4-17S95.2 98 98.7 110.8l8.4 31.5-67.6-39C28 96.6 13.3 100.5 6.7 112S4 138.2 15.5 144.8l67.6 39-31.5 8.4c-12.8 3.4-20.4 16.6-17 29.4s16.6 20.4 29.4 17l77.8-20.9 66.2 38.2-66.2 38.2-77.8-20.9c-12.8-3.4-26 4.2-29.4 17s4.2 26 17 29.4l31.5 8.4-67.6 39C4 373.8 .1 388.5 6.7 400s21.3 15.4 32.8 8.8l67.6-39-8.4 31.5c-3.4 12.8 4.2 26 17 29.4s26-4.2 29.4-17l20.9-77.8 66.2-38.2 0 76.5-57 57c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l23-23 0 78.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-78.1 23 23c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-57-57 0-76.5 66.2 38.2 20.9 77.8c3.4 12.8 16.6 20.4 29.4 17s20.4-16.6 17-29.4l-8.4-31.5 67.6 39c11.5 6.6 26.2 2.7 32.8-8.8s2.7-26.2-8.8-32.8l-67.6-39 31.5-8.4c12.8-3.4 20.4-16.6 17-29.4s-16.6-20.4-29.4-17l-77.8 20.9-66.2-38.2 66.2-38.2 77.8 20.9c12.8 3.4 26-4.2 29.4-17s-4.2-26-17-29.4l-31.5-8.4 67.6-39c11.5-6.6 15.4-21.3 8.8-32.8s-21.3-15.4-32.8-8.8l-67.6 39 8.4-31.5c3.4-12.8-4.2-26-17-29.4s-26 4.2-29.4 17l-20.9 77.8-66.2 38.2 0-76.5 57-57c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23 0-78.1z"]
}, RL = {
  icon: [512, 512, [61469, "play-circle"], "f144", "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM212.5 147.5c-7.4-4.5-16.7-4.7-24.3-.5S176 159.3 176 168l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88zM298 256l-74 45.2 0-90.4 74 45.2z"]
}, o7 = {
  icon: [512, 512, [128470], "f2d0", "M48 224l0 160c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-160-416 0zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"]
};
function Tm(t) {
  return {
    type: "path",
    value: t.icon[4],
    viewBox: { w: t.icon[0], h: t.icon[1] }
  };
}
function ve(t, e) {
  return {
    icon: Tm(t),
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
function zL(t) {
  return {
    icon: Tm(t),
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const FL = {
  id: "fa-regular",
  name: "Font Awesome Light",
  description: "Font Awesome outline icons — clean, lighter weight",
  fallback: ve(dc),
  domains: {
    light: {
      default: zL(HL)
    },
    switch: {
      default: ve(cc),
      states: {
        on: ve(cc),
        off: ve(sm)
      }
    },
    cover: {
      default: ve(o7)
    },
    sensor: {
      default: ve(VL),
      deviceClasses: {
        temperature: { default: ve(ic) },
        humidity: { default: ve(sc) },
        pressure: { default: ve(Cm) },
        power: { default: ve(Pm) },
        energy: { default: ve(gm) },
        battery: { default: ve(Lm) },
        illuminance: { default: ve(NL) },
        carbon_dioxide: { default: ve(rc) },
        carbon_monoxide: { default: ve(lc) },
        gas: { default: ve(rc) },
        moisture: { default: ve(um) },
        plug: { default: ve(km) }
      }
    },
    binary_sensor: {
      default: ve(EL),
      deviceClasses: {
        motion: { default: ve(xm) },
        door: {
          default: ve(no),
          states: { on: ve(la), off: ve(no) }
        },
        window: { default: ve(o7) },
        vibration: { default: ve(bL) },
        smoke: { default: ve(oc) },
        occupancy: { default: ve(ym) },
        opening: {
          default: ve(no),
          states: { on: ve(la), off: ve(no) }
        },
        presence: { default: ve(Em) },
        problem: { default: ve(lc) },
        safety: { default: ve(dc) },
        sound: { default: ve(hm) }
      }
    },
    climate: {
      default: ve(ic),
      states: {
        heat: ve(oc),
        cool: ve(TL),
        heat_cool: ve(fc),
        auto: ve(fc),
        dry: ve(sc),
        fan_only: ve(ua),
        off: ve(am)
      }
    },
    fan: {
      default: ve(ua),
      states: {
        on: ve(ua),
        off: ve(Hm)
      }
    },
    camera: { default: ve(lm) },
    media_player: {
      default: ve(ac),
      states: {
        playing: ve(RL),
        paused: ve(PL)
      }
    },
    lock: {
      default: ve(uc),
      states: {
        locked: ve(uc),
        unlocked: ve(wm)
      }
    },
    scene: { default: ve(Sm) },
    script: { default: ve(bm) },
    automation: { default: ve(mm) },
    button: { default: ve(Nm) },
    furniture: {
      default: ve(Jt),
      deviceClasses: {
        sofa: { default: ve(Mm) },
        bed: { default: ve(Am) },
        table: { default: ve(Jt) },
        chair: { default: ve(Jt) },
        desk: { default: ve(Jt) },
        plant: { default: ve(dm) },
        door: { default: ve(la) },
        window: { default: ve(Jt) },
        toilet: { default: ve(vm) },
        shower: { default: ve(pm) },
        sink: { default: ve(_m) },
        bathtub: { default: ve(fm) },
        fridge: { default: ve(Jt) },
        oven: { default: ve(Jt) },
        dishwasher: { default: ve(Jt) },
        tv: { default: ve(ac) },
        wardrobe: { default: ve(Jt) },
        bookshelf: { default: ve(cm) }
      }
    }
  }
}, jL = "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5", s7 = "M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8", OL = "M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5", a7 = "M3 3.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1 M.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5zM1 5V2h14v3zm0 1h14v8H1z", IL = "M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z", l7 = "M9.5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585a1.5 1.5 0 0 1 1 1.415 M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1", u7 = "M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13", DL = "M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3", GL = "M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z", UL = "M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z", BL = "M2 6h10v4H2z M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8", WL = "M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708", c7 = "M4 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m2 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M13.405 4.027a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973", d7 = "M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2", ZL = "M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267", YL = "M6 0a.5.5 0 0 1 .5.5V3h3V.5a.5.5 0 0 1 1 0V3h1a.5.5 0 0 1 .5.5v3A3.5 3.5 0 0 1 8.5 10c-.002.434-.01.845-.04 1.22-.041.514-.126 1.003-.317 1.424a2.08 2.08 0 0 1-.97 1.028C6.725 13.9 6.169 14 5.5 14c-.998 0-1.61.33-1.974.718A1.92 1.92 0 0 0 3 16H2c0-.616.232-1.367.797-1.968C3.374 13.42 4.261 13 5.5 13c.581 0 .962-.088 1.218-.219.241-.123.4-.3.514-.55.121-.266.193-.621.23-1.09.027-.34.035-.718.037-1.141A3.5 3.5 0 0 1 4 6.5v-3a.5.5 0 0 1 .5-.5h1V.5A.5.5 0 0 1 6 0", KL = "M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0 M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7", XL = "M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z", f7 = "M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1", eu = "M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2", bf = "M10 3c0 1.313-.304 2.508-.8 3.4a2 2 0 0 0-1.484-.38c-.28-.982-.91-2.04-1.838-2.969a8 8 0 0 0-.491-.454A6 6 0 0 1 8 2c.691 0 1.355.117 1.973.332Q10 2.661 10 3m0 5q0 .11-.012.217c1.018-.019 2.2-.353 3.331-1.006a8 8 0 0 0 .57-.361 6 6 0 0 0-2.53-3.823 9 9 0 0 1-.145.64c-.34 1.269-.944 2.346-1.656 3.079.277.343.442.78.442 1.254m-.137.728a2 2 0 0 1-1.07 1.109c.525.87 1.405 1.725 2.535 2.377q.3.174.605.317a6 6 0 0 0 2.053-4.111q-.311.11-.641.199c-1.264.339-2.493.356-3.482.11ZM8 10c-.45 0-.866-.149-1.2-.4-.494.89-.796 2.082-.796 3.391q0 .346.027.678A6 6 0 0 0 8 14c.94 0 1.83-.216 2.623-.602a8 8 0 0 1-.497-.458c-.925-.926-1.555-1.981-1.836-2.96Q8.149 10 8 10M6 8q0-.12.014-.239c-1.02.017-2.205.351-3.34 1.007a8 8 0 0 0-.568.359 6 6 0 0 0 2.525 3.839 8 8 0 0 1 .148-.653c.34-1.267.94-2.342 1.65-3.075A2 2 0 0 1 6 8m-3.347-.632c1.267-.34 2.498-.355 3.488-.107.196-.494.583-.89 1.07-1.1-.524-.874-1.406-1.733-2.541-2.388a8 8 0 0 0-.594-.312 6 6 0 0 0-2.06 4.106q.309-.11.637-.199M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2 M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16", $L = "M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z", QL = "m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393", qL = "M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5", h7 = "M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3", JL = "M12 0a4 4 0 0 1 4 4v2.5h-1V4a3 3 0 1 0-6 0v2h.5A2.5 2.5 0 0 1 12 8.5v5A2.5 2.5 0 0 1 9.5 16h-7A2.5 2.5 0 0 1 0 13.5v-5A2.5 2.5 0 0 1 2.5 6H8V4a4 4 0 0 1 4-4", p7 = "M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15", eA = "M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z", g7 = "M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9 M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z", tA = "M7.5 1v7h1V1z M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812", nA = "M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5", Pf = "M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z", rA = "M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901", iA = "M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5", oA = "M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708m5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708m2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0", sA = "M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2", aA = "M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5", lA = "M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z", uA = "M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708m-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708", cA = "M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z", dA = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16 M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0", fA = { w: 16, h: 16 };
function Rm(t) {
  return { type: "path", value: t, viewBox: fA };
}
function Pe(t, e) {
  return {
    icon: Rm(t),
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
function hA(t) {
  return {
    icon: Rm(t),
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const pA = {
  id: "bs-icons",
  name: "Bootstrap Icons",
  description: "Bootstrap Icons — crisp, geometric fill icons",
  fallback: Pe(Pf),
  domains: {
    light: {
      default: hA(jL)
    },
    switch: {
      default: Pe(s7),
      states: {
        on: Pe(s7),
        off: Pe(OL)
      }
    },
    cover: {
      default: Pe(a7)
    },
    sensor: {
      default: Pe(IL),
      deviceClasses: {
        temperature: { default: Pe(l7) },
        humidity: { default: Pe(u7) },
        pressure: { default: Pe(DL) },
        power: { default: Pe(GL) },
        energy: { default: Pe(UL) },
        battery: { default: Pe(BL) },
        illuminance: { default: Pe(WL) },
        carbon_dioxide: { default: Pe(c7) },
        carbon_monoxide: { default: Pe(d7) },
        gas: { default: Pe(c7) },
        moisture: { default: Pe(ZL) },
        plug: { default: Pe(YL) }
      }
    },
    binary_sensor: {
      default: Pe(KL),
      deviceClasses: {
        motion: { default: Pe(XL) },
        door: {
          default: Pe(eu),
          states: { on: Pe(f7), off: Pe(eu) }
        },
        window: { default: Pe(a7) },
        vibration: { default: Pe(rA) },
        smoke: { default: Pe(p7) },
        occupancy: { default: Pe(iA) },
        opening: {
          default: Pe(eu),
          states: { on: Pe(f7), off: Pe(eu) }
        },
        presence: { default: Pe(oA) },
        problem: { default: Pe(d7) },
        safety: { default: Pe(Pf) },
        sound: { default: Pe(aA) }
      }
    },
    climate: {
      default: Pe(l7),
      states: {
        heat: Pe(p7),
        cool: Pe(eA),
        heat_cool: Pe(g7),
        auto: Pe(g7),
        dry: Pe(u7),
        fan_only: Pe(bf),
        off: Pe(tA)
      }
    },
    fan: {
      default: Pe(bf),
      states: {
        on: Pe(bf),
        off: Pe(nA)
      }
    },
    camera: { default: Pe($L) },
    media_player: {
      default: Pe(sA),
      states: {
        playing: Pe(QL),
        paused: Pe(qL)
      }
    },
    lock: {
      default: Pe(h7),
      states: {
        locked: Pe(h7),
        unlocked: Pe(JL)
      }
    },
    scene: { default: Pe(lA) },
    script: { default: Pe(uA) },
    automation: { default: Pe(cA) },
    button: { default: Pe(dA) },
    furniture: {
      default: Pe(Pf)
    }
  }
}, gA = "M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z", tu = "M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z", m7 = "M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm18 3H3.75v9a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V9Zm-15-3.75A.75.75 0 0 0 4.5 6v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H5.25Zm1.5.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V6Zm3-.75A.75.75 0 0 0 9 6v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H9.75Z", mA = "M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z", ci = "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z", nu = "M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z", Os = "M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z", Ef = "M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z", yA = "M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z", vA = "M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z", Nf = "M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z", Hf = "M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z", y7 = "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z", xA = "M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z", _A = "M19.5 6h-15v9h15V6Z M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z", CA = "M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z", wA = "M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z", SA = "M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z", v7 = "M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z", kA = "M5.636 4.575a.75.75 0 0 1 0 1.061 9 9 0 0 0 0 12.728.75.75 0 1 1-1.06 1.06c-4.101-4.1-4.101-10.748 0-14.849a.75.75 0 0 1 1.06 0Zm12.728 0a.75.75 0 0 1 1.06 0c4.101 4.1 4.101 10.75 0 14.85a.75.75 0 1 1-1.06-1.061 9 9 0 0 0 0-12.728.75.75 0 0 1 0-1.06ZM7.757 6.697a.75.75 0 0 1 0 1.06 6 6 0 0 0 0 8.486.75.75 0 0 1-1.06 1.06 7.5 7.5 0 0 1 0-10.606.75.75 0 0 1 1.06 0Zm8.486 0a.75.75 0 0 1 1.06 0 7.5 7.5 0 0 1 0 10.606.75.75 0 0 1-1.06-1.06 6 6 0 0 0 0-8.486.75.75 0 0 1 0-1.06ZM9.879 8.818a.75.75 0 0 1 0 1.06 3 3 0 0 0 0 4.243.75.75 0 1 1-1.061 1.061 4.5 4.5 0 0 1 0-6.364.75.75 0 0 1 1.06 0Zm4.242 0a.75.75 0 0 1 1.061 0 4.5 4.5 0 0 1 0 6.364.75.75 0 0 1-1.06-1.06 3 3 0 0 0 0-4.243.75.75 0 0 1 0-1.061ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z", ru = "M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z", MA = "M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Zm0 7.5C2.339 10.5 1.5 11.34 1.5 12.375v.75c0 1.035.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75c0-1.036-.84-1.875-1.875-1.875H3.375Zm0 7.5C2.339 18 1.5 18.84 1.5 19.875v.75c0 1.035.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75c0-1.036-.84-1.875-1.875-1.875H3.375Z", LA = "M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z", AA = "M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.463 7.463 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.849-1.567h-1.844ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z", bA = "M15 11.25l-3.375 8.25-1.5-4.875L5.25 13.125l8.25-3.375zM12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75zM7.5 12a4.5 4.5 0 1 1 4.34 4.498l.46-1.125A3 3 0 1 0 9 12a.75.75 0 0 1-1.5 0zm10.125.75H18.75a.75.75 0 0 0 0-1.5h-2.25a.75.75 0 0 0 0 1.5zm-1.469-4.219a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591zM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591zM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12z", PA = { w: 24, h: 24 };
function zm(t) {
  return { type: "path", value: t, viewBox: PA };
}
function He(t, e) {
  return {
    icon: zm(t),
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
function EA(t) {
  return {
    icon: zm(t),
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const NA = {
  id: "heroicons",
  name: "Heroicons",
  description: "Heroicons — Tailwind's official icon set, bold solid style",
  fallback: He(Hf),
  domains: {
    light: {
      default: EA(gA)
    },
    switch: {
      default: He(tu),
      states: {
        on: He(tu),
        off: He(Nf)
      }
    },
    cover: {
      default: He(m7)
    },
    sensor: {
      default: He(mA),
      deviceClasses: {
        temperature: { default: He(nu) },
        humidity: { default: He(ci) },
        pressure: { default: He(ci) },
        power: { default: He(tu) },
        energy: { default: He(tu) },
        battery: { default: He(ci) },
        illuminance: { default: He(v7) },
        carbon_dioxide: { default: He(ci) },
        carbon_monoxide: { default: He(y7) },
        gas: { default: He(ci) },
        moisture: { default: He(ci) },
        plug: { default: He(ci) }
      }
    },
    binary_sensor: {
      default: He(ci),
      deviceClasses: {
        motion: { default: He(ci) },
        door: {
          default: He(Os),
          states: { on: He(Ef), off: He(Os) }
        },
        window: { default: He(m7) },
        vibration: { default: He(CA) },
        smoke: { default: He(nu) },
        occupancy: { default: He(xA) },
        opening: {
          default: He(Os),
          states: { on: He(Ef), off: He(Os) }
        },
        presence: { default: He(kA) },
        problem: { default: He(y7) },
        safety: { default: He(Hf) },
        sound: { default: He(wA) }
      }
    },
    climate: {
      default: He(nu),
      states: {
        heat: He(nu),
        cool: He(v7),
        heat_cool: He(ru),
        auto: He(ru),
        off: He(Nf)
      }
    },
    fan: {
      default: He(ru),
      states: {
        on: He(ru),
        off: He(Nf)
      }
    },
    camera: { default: He(SA) },
    media_player: {
      default: He(_A),
      states: {
        playing: He(yA),
        paused: He(vA)
      }
    },
    lock: {
      default: He(Os),
      states: {
        locked: He(Os),
        unlocked: He(Ef)
      }
    },
    scene: { default: He(MA) },
    script: { default: He(LA) },
    automation: { default: He(AA) },
    button: { default: He(bA) },
    furniture: {
      default: He(Hf)
    }
  }
}, HA = "M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-50.34,2.34a8,8,0,0,0-11.32,0L128,132.69l-26.34-26.35a8,8,0,0,0-11.32,11.32L120,147.31V184a8,8,0,0,0,16,0V147.31l29.66-29.65A8,8,0,0,0,165.66,106.34Z", x7 = "M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,176,168Z", VA = "M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144ZM80,168a40,40,0,1,1,40-40A40,40,0,0,1,80,168Z", TA = "M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z", _7 = "M152,146.08V40a32,32,0,0,0-64,0V146.08a56,56,0,1,0,64,0ZM136,56H104V40a16,16,0,0,1,32,0Zm41.3,24.77a8,8,0,0,1,2.33-11.07c15-9.79,26.87-4.75,35.51-1.06C223,72,227.76,74,235.63,68.89a8,8,0,0,1,8.74,13.41C237.88,86.53,232,88,226.69,88c-7,0-12.92-2.54-17.83-4.63C201,80,196.24,78,188.37,83.11A8,8,0,0,1,177.3,80.77Zm69.4,22.46a8,8,0,0,1-2.33,11.07C237.88,118.53,232,120,226.69,120c-7,0-12.92-2.54-17.83-4.63-7.87-3.36-12.62-5.38-20.49-.25a8,8,0,0,1-8.74-13.41c15-9.79,26.87-4.75,35.51-1.06,7.87,3.36,12.62,5.39,20.49.25A8,8,0,0,1,246.7,103.23Z", C7 = "M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75Zm9.85,105.59a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z", RA = "M240,152v24a16,16,0,0,1-16,16H115.93a4,4,0,0,1-3.24-6.35L174.27,101a8.21,8.21,0,0,0-1.37-11.3,8,8,0,0,0-11.37,1.61l-72,99.06A4,4,0,0,1,86.25,192H32a16,16,0,0,1-16-16V153.13c0-1.79,0-3.57.13-5.33a4,4,0,0,1,4-3.8H48a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,47.73,128H23.92a4,4,0,0,1-3.87-5c12-43.84,49.66-77.13,95.52-82.28a4,4,0,0,1,4.43,4V72a8,8,0,0,0,8.53,8A8.17,8.17,0,0,0,136,71.73V44.67a4,4,0,0,1,4.43-4A112.18,112.18,0,0,1,236.23,123a4,4,0,0,1-3.88,5H208.27a8.17,8.17,0,0,0-8.25,7.47,8,8,0,0,0,8,8.53h27.92a4,4,0,0,1,4,3.86C240,149.23,240,150.61,240,152Z", w7 = "M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z", zA = "M200,56H32A24,24,0,0,0,8,80v96a24,24,0,0,0,24,24H200a24,24,0,0,0,24-24V80A24,24,0,0,0,200,56Zm8,120a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H200a8,8,0,0,1,8,8ZM192,96v64a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H184A8,8,0,0,1,192,96Zm64,0v64a8,8,0,0,1-16,0V96a8,8,0,0,1,16,0Z", FA = "M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z", S7 = "M160.06,40A88.1,88.1,0,0,0,81.29,88.67h0A87.48,87.48,0,0,0,72,127.73,8.18,8.18,0,0,1,64.57,136,8,8,0,0,1,56,128a103.66,103.66,0,0,1,5.34-32.92,4,4,0,0,0-4.75-5.18A64.09,64.09,0,0,0,8,152c0,35.19,29.75,64,65,64H160a88.09,88.09,0,0,0,87.93-91.48C246.11,77.54,207.07,40,160.06,40Z", jA = "M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,26c14.16,11.1,56.86,47.74,68.84,94H59.16C71.14,73.76,113.84,37.12,128,26Z", OA = "M237.66,77.66,203.31,112l26.35,26.34a8,8,0,0,1-11.32,11.32L212,143.31l-53,53a40,40,0,0,1-56.57,0L86.75,180.57,37.66,229.66a8,8,0,0,1-11.32-11.32l49.09-49.09L59.72,153.54a40,40,0,0,1,0-56.57l53-53-6.35-6.34a8,8,0,0,1,11.32-11.32L144,52.69l34.34-34.35a8,8,0,1,1,11.32,11.32L155.31,64,192,100.69l34.34-34.35a8,8,0,0,1,11.32,11.32Z", IA = "M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z", DA = "M100,36a28,28,0,1,1,28,28A28,28,0,0,1,100,36ZM215.42,140.78l-45.25-51.3a28,28,0,0,0-21-9.48H106.83a28,28,0,0,0-21,9.48l-45.25,51.3a16,16,0,0,0,22.56,22.69L89,142.7l-19.7,74.88a16,16,0,0,0,29.08,13.35L128,180l29.58,51a16,16,0,0,0,29.08-13.35L167,142.7l25.9,20.77a16,16,0,0,0,22.56-22.69Z", k7 = "M232,216H208V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V216H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-64,0H64V40H168Zm-40-84a12,12,0,1,1,12,12A12,12,0,0,1,128,132Z", Is = "M232,216H208V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V216H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-68-72a12,12,0,1,1,12-12A12,12,0,0,1,164,144Z", Vf = "M233,135a60,60,0,0,0-89.62-35.45l16.39-65.44a8,8,0,0,0-3.45-8.68A60,60,0,1,0,95.69,128.91L30.82,147.44a8,8,0,0,0-5.8,7.32,60,60,0,0,0,44.42,60.66,60.52,60.52,0,0,0,15.62,2.07,60.07,60.07,0,0,0,59.88-62l48.48,46.92a8,8,0,0,0,9.25,1.35A60,60,0,0,0,233,135ZM130.44,147.85a20,20,0,1,1,17.41-22.29A20,20,0,0,1,130.44,147.85Z", GA = "M192,72V184a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V72A16,16,0,0,1,32,56H176A16,16,0,0,1,192,72Zm58,.25a8.23,8.23,0,0,0-6.63,1.22L209.78,95.86A4,4,0,0,0,208,99.19v57.62a4,4,0,0,0,1.78,3.33l33.78,22.52a8,8,0,0,0,8.58.19,8.33,8.33,0,0,0,3.86-7.17V80A8,8,0,0,0,250,72.25Z", UA = "M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z", BA = "M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z", M7 = "M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-80,84a12,12,0,1,1,12-12A12,12,0,0,1,128,164Zm32-84H96V56a32,32,0,0,1,64,0Z", WA = "M208,80H96V56a32,32,0,0,1,32-32c15.37,0,29.2,11,32.16,25.59a8,8,0,0,0,15.68-3.18C171.32,24.15,151.2,8,128,8A48.05,48.05,0,0,0,80,56V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-80,84a12,12,0,1,1,12-12A12,12,0,0,1,128,164Z", L7 = "M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z", ZA = "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm42.37,119.22,18.94-6.76a8,8,0,1,1,5.38,15.08l-15.48,5.52,4.52,16.87a8,8,0,0,1-5.66,9.8A8.23,8.23,0,0,1,176,184a8,8,0,0,1-7.73-5.93l-5.57-20.8L136,141.86v30.83l13.66,13.65a8,8,0,0,1-11.32,11.32L128,187.31l-10.34,10.35a8,8,0,0,1-11.32-11.32L120,172.69V141.86L93.3,157.27l-5.57,20.8A8,8,0,0,1,80,184a8.23,8.23,0,0,1-2.07-.27,8,8,0,0,1-5.66-9.8l4.52-16.87-15.48-5.52a8,8,0,0,1,5.38-15.08l18.94,6.76L112,128,85.63,112.78l-18.94,6.76A8.18,8.18,0,0,1,64,120a8,8,0,0,1-2.69-15.54l15.48-5.52L72.27,82.07a8,8,0,0,1,15.46-4.14l5.57,20.8L120,114.14V83.31L106.34,69.66a8,8,0,0,1,11.32-11.32L128,68.69l10.34-10.35a8,8,0,0,1,11.32,11.32L136,83.31v30.83l26.7-15.41,5.57-20.8a8,8,0,0,1,15.46,4.14l-4.52,16.87,15.48,5.52A8,8,0,0,1,192,120a8.18,8.18,0,0,1-2.69-.46l-18.94-6.76L144,128Z", A7 = "M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L180.65,72a79.48,79.48,0,0,0-54.72-22.09h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27,96,96,0,0,1,192,60.7l18.36-18.36A8,8,0,0,1,224,48ZM186.41,183.29A80,80,0,0,1,75.35,184l18.31-18.31A8,8,0,0,0,88,152H40a8,8,0,0,0-8,8v48a8,8,0,0,0,13.66,5.66L64,195.3a95.42,95.42,0,0,0,66,26.76h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z", YA = "M128,24A104,104,0,1,0,232,128,104,104,0,0,0,128,24Zm-8,40a8,8,0,0,1,16,0v64a8,8,0,0,1-16,0Zm8,144A80,80,0,0,1,83.55,61.48a8,8,0,1,1,8.9,13.29,64,64,0,1,0,71.1,0,8,8,0,1,1,8.9-13.29A80,80,0,0,1,128,208Z", KA = "M120,104H24a8,8,0,0,1-8-8.53A8.17,8.17,0,0,1,24.27,88H112a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,111.73,72H92.29a4,4,0,0,1-4-4.58A32,32,0,1,1,120,104Zm119.92-2.29a32,32,0,0,0-63.59-2.29,4,4,0,0,0,4,4.58h19.44a8.17,8.17,0,0,1,8.25,7.47,8,8,0,0,1-8,8.53H32.27A8.17,8.17,0,0,0,24,127.47,8,8,0,0,0,32,136H208A32,32,0,0,0,239.92,101.71ZM152,152H40.27A8.17,8.17,0,0,0,32,159.47,8,8,0,0,0,40,168H143.73a8.17,8.17,0,0,1,8.25,7.47,8,8,0,0,1-8,8.53H124.29a4,4,0,0,0-4,4.58A32,32,0,1,0,152,152Z", Tf = "M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm-34.32,69.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z", b7 = "M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z", XA = "M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z", $A = "M168,128a40,40,0,1,1-40-40A40,40,0,0,1,168,128Zm40,0a79.74,79.74,0,0,0-20.37-53.33,8,8,0,1,0-11.92,10.67,64,64,0,0,1,0,85.33,8,8,0,0,0,11.92,10.67A79.79,79.79,0,0,0,208,128ZM80.29,85.34A8,8,0,1,0,68.37,74.67a79.94,79.94,0,0,0,0,106.67,8,8,0,0,0,11.92-10.67,63.95,63.95,0,0,1,0-85.33Zm158.28-4A119.48,119.48,0,0,0,213.71,44a8,8,0,1,0-11.42,11.2,103.9,103.9,0,0,1,0,145.56A8,8,0,1,0,213.71,212,120.12,120.12,0,0,0,238.57,81.29ZM32.17,168.48A103.9,103.9,0,0,1,53.71,55.22,8,8,0,1,0,42.29,44a119.87,119.87,0,0,0,0,168,8,8,0,1,0,11.42-11.2A103.61,103.61,0,0,1,32.17,168.48Z", QA = "M216,64H147.31l34.35-34.34a8,8,0,1,0-11.32-11.32L128,60.69,85.66,18.34A8,8,0,0,0,74.34,29.66L108.69,64H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm0,136H160V80h56V200Zm-16-84a12,12,0,1,1-12-12A12,12,0,0,1,200,116Zm0,48a12,12,0,1,1-12-12A12,12,0,0,1,200,164Z", qA = "M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z", JA = "M80,128V64a48,48,0,0,1,96,0v64a48,48,0,0,1-96,0Zm128,0a8,8,0,0,0-16,0,64,64,0,0,1-128,0,8,8,0,0,0-16,0,80.11,80.11,0,0,0,72,79.6V240a8,8,0,0,0,16,0V207.6A80.11,80.11,0,0,0,208,128Z", eb = "M184,32H72A16,16,0,0,0,56,48V64.4L207.64,39.51A16,16,0,0,0,184,32ZM56,216a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V104H56Zm108.12-91.47a8,8,0,0,1,11.35-.6l.6.53a8,8,0,1,1-10.62,12l-.6-.53A8,8,0,0,1,164.12,124.53ZM56,80H200V96H56ZM211.36,52.46,56,80V68.79l155.43-26.7Z", tb = "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48Zm-45.54-48.85a8,8,0,0,1-.23,11.31l-24,22.67a8,8,0,0,1-5.54,2.2,8.13,8.13,0,0,1-5.33-2l-24-21.34a8,8,0,0,1,10.64-12l18.69,16.61,18.46-17.44A8,8,0,0,1,154.46,167.15Z", nb = "M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,42.28,97.91,25a8,8,0,0,0-6.47-.6A111.92,111.92,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.63a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,213.72,158.09,231a7.94,7.94,0,0,0,3.87,1,8.15,8.15,0,0,0,2.59-.43,111.92,111.92,0,0,0,36.71-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Z", rb = "M215.16,81.89,126.93,57.37a8,8,0,0,0-9.93,5.54L92.48,148.82,68.29,124.63a8,8,0,0,0-13.08,2.54l-32,80a8,8,0,0,0,10.63,10.62l80-32a8,8,0,0,0,2.54-13.07L92.17,148.48l85.91-24.52a8,8,0,0,0,5.55-9.93l-1.12-3.93Z";
function Fm(t) {
  return {
    type: "path",
    value: t,
    viewBox: { w: 256, h: 256 }
  };
}
function Ee(t, e) {
  return {
    icon: Fm(t),
    defaultStyle: { opacity: 1, colorMode: "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" }
    }
  };
}
function ib(t) {
  return {
    icon: Fm(t),
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" }
    }
  };
}
const ob = {
  id: "phosphor",
  name: "Phosphor Icons",
  description: "Phosphor Icons — versatile, consistent fill icons",
  fallback: Ee(Tf),
  domains: {
    light: {
      default: ib(HA)
    },
    switch: {
      default: Ee(x7),
      states: {
        on: Ee(x7),
        off: Ee(VA)
      }
    },
    cover: {
      default: Ee(Is)
    },
    sensor: {
      default: Ee(TA),
      deviceClasses: {
        temperature: { default: Ee(_7) },
        humidity: { default: Ee(C7) },
        pressure: { default: Ee(RA) },
        power: { default: Ee(w7) },
        energy: { default: Ee(w7) },
        battery: { default: Ee(zA) },
        illuminance: { default: Ee(FA) },
        carbon_dioxide: { default: Ee(S7) },
        carbon_monoxide: { default: Ee(b7) },
        gas: { default: Ee(S7) },
        moisture: { default: Ee(jA) },
        plug: { default: Ee(OA) }
      }
    },
    binary_sensor: {
      default: Ee(IA),
      deviceClasses: {
        motion: { default: Ee(DA) },
        door: {
          default: Ee(Is),
          states: { on: Ee(k7), off: Ee(Is) }
        },
        window: { default: Ee(Is) },
        vibration: { default: Ee(qA) },
        smoke: { default: Ee(L7) },
        occupancy: { default: Ee(XA) },
        opening: {
          default: Ee(Is),
          states: { on: Ee(k7), off: Ee(Is) }
        },
        presence: { default: Ee($A) },
        problem: { default: Ee(b7) },
        safety: { default: Ee(Tf) },
        sound: { default: Ee(JA) }
      }
    },
    climate: {
      default: Ee(_7),
      states: {
        heat: Ee(L7),
        cool: Ee(ZA),
        heat_cool: Ee(A7),
        auto: Ee(A7),
        dry: Ee(C7),
        fan_only: Ee(Vf),
        off: Ee(YA)
      }
    },
    fan: {
      default: Ee(Vf),
      states: {
        on: Ee(Vf),
        off: Ee(KA)
      }
    },
    camera: { default: Ee(GA) },
    media_player: {
      default: Ee(QA),
      states: {
        playing: Ee(UA),
        paused: Ee(BA)
      }
    },
    lock: {
      default: Ee(M7),
      states: {
        locked: Ee(M7),
        unlocked: Ee(WA)
      }
    },
    scene: { default: Ee(eb) },
    script: { default: Ee(tb) },
    automation: { default: Ee(nb) },
    button: { default: Ee(rb) },
    furniture: {
      default: Ee(Tf)
    }
  }
}, mi = {
  emoji: NM,
  mdi: hL,
  "mdi-outline": pL,
  "mdi-home": gL,
  "mdi-cozy": mL,
  "mdi-tech": yL,
  "fa-solid": AL,
  "fa-regular": FL,
  "bs-icons": pA,
  heroicons: NA,
  phosphor: ob
}, sb = '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', jm = z.createContext(null);
function ab(t) {
  const e = {
    light: t.light,
    switch: t.switch,
    sensor: t.sensor,
    binary_sensor: t.binary_sensor,
    climate: t.climate_heating,
    cover: t.cover,
    lock: t.lock,
    media_player: t.media_player,
    fan: t.fan,
    vacuum: t.vacuum,
    automation: t.automation,
    script: t.automation,
    scene: t.automation,
    button: t.automation,
    camera: t.camera
  };
  return (n) => e[n] ?? t.fallback;
}
function P7(t, e) {
  const n = mi[t.pack_id];
  return n ? Xo(n, t.domain, e, t.device_class) : null;
}
function lb({
  themeConfigId: t,
  iconPackId: e,
  domainColors: n,
  domainIcons: r,
  furnitureIcons: o,
  children: a
}) {
  const l = z.useMemo(() => {
    const c = ec[t] ?? ec.default, d = mi[e] ?? mi.emoji, p = n ? { ...c.colors, ...n } : c.colors, y = (w, m, S) => {
      if (r != null && r[w]) {
        const b = P7(r[w], m);
        if (b) return b;
      }
      return Xo(d, w, m, S);
    }, k = (w) => {
      if (o != null && o[w]) {
        const m = P7(o[w], "on");
        if (m) return m;
      }
      return Xo(d, "furniture", "on", w);
    }, x = ab(p);
    return {
      themeConfig: c,
      iconPack: d,
      colors: p,
      fontFamily: sb,
      getDomainColor: x,
      resolveEntityIcon: y,
      resolveFurnitureIcon: k,
      computeLightStyle: kM
    };
  }, [t, e, n, r, o]);
  return /* @__PURE__ */ v.jsx(jm.Provider, { value: l, children: a });
}
function un() {
  const t = z.useContext(jm);
  if (!t)
    throw new Error("useThemeConfig must be used within a ThemeProvider");
  return t;
}
function ub(t, e) {
  const n = document.createElement("canvas"), r = Math.ceil(e * 1.4);
  n.width = r, n.height = r;
  const o = n.getContext("2d");
  return o.font = `${e}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`, o.textAlign = "center", o.textBaseline = "middle", o.fillText(t, r / 2, r / 2), n;
}
const E7 = /* @__PURE__ */ new Map();
function cb(t, e) {
  const n = `${t}:${e}`;
  let r = E7.get(n);
  return r || (r = ub(t, e), E7.set(n, r)), r;
}
function Om({ icon: t, size: e, fill: n, opacity: r = 1, x: o = 0, y: a = 0 }) {
  var x, w;
  if (t.type === "emoji") {
    const m = Math.round(e * 0.55), S = cb(t.value, m), b = S.width;
    return /* @__PURE__ */ v.jsx(
      _M,
      {
        x: o - b / 2,
        y: a - b / 2,
        width: b,
        height: b,
        image: S,
        opacity: r,
        listening: !1
      }
    );
  }
  const l = ((x = t.viewBox) == null ? void 0 : x.w) ?? 24, c = ((w = t.viewBox) == null ? void 0 : w.h) ?? 24, p = e * 0.5 / Math.max(l, c), y = l * p / 2, k = c * p / 2;
  return /* @__PURE__ */ v.jsx(br, { x: o, y: a, opacity: r, children: /* @__PURE__ */ v.jsx(
    CM,
    {
      x: -y,
      y: -k,
      data: t.value,
      fill: n ?? "#ffffff",
      scaleX: p,
      scaleY: p,
      listening: !1
    }
  ) });
}
function an({ icon: t, size: e = 24, fill: n, opacity: r = 1, className: o }) {
  var c, d;
  if (t.type === "emoji")
    return /* @__PURE__ */ v.jsx(
      "span",
      {
        className: o,
        style: { fontSize: e, lineHeight: 1, opacity: r },
        role: "img",
        children: t.value
      }
    );
  const a = ((c = t.viewBox) == null ? void 0 : c.w) ?? 24, l = ((d = t.viewBox) == null ? void 0 : d.h) ?? 24;
  return /* @__PURE__ */ v.jsx(
    "svg",
    {
      className: o,
      viewBox: `0 0 ${a} ${l}`,
      width: e,
      height: e,
      style: { opacity: r },
      children: /* @__PURE__ */ v.jsx("path", { d: t.value, fill: n ?? "currentColor" })
    }
  );
}
function Sl(t, e, n) {
  return n ? Math.round(t / e) * e : t;
}
function Zi(t, e, n, r) {
  return r ? Sl(e + t, n, !0) - e : t;
}
function db(t) {
  let e = 1 / 0, n = -1 / 0, r = 1 / 0, o = -1 / 0;
  for (const a of t)
    a.x < e && (e = a.x), a.x > n && (n = a.x), a.y < r && (r = a.y), a.y > o && (o = a.y);
  return { minX: e, maxX: n, minY: r, maxY: o };
}
const iu = 8;
function fb(t, e, n, r) {
  const { minX: o, maxX: a, minY: l, maxY: c } = db(t), d = (o + a) / 2, p = (l + c) / 2;
  let y;
  n === "left" ? y = o + iu : n === "right" ? y = a - iu - r : y = d - r / 2;
  let k;
  return e === "top" ? k = l + iu : e === "bottom" ? k = c - iu - 14 : k = p - 7, { x: y, y: k };
}
function Rf(t, e, n) {
  let r = t.points;
  return e && e.roomId === t.id && (r = r.map(
    (o, a) => a === e.pointIndex ? { x: e.x, y: e.y } : o
  )), n && n.roomId === t.id && (r = r.map(
    (o, a) => a === n.idxA || a === n.idxB ? { x: o.x + n.dx, y: o.y + n.dy } : o
  )), r;
}
function hb({
  rooms: t,
  selectedRoomIds: e,
  mode: n,
  activeTool: r,
  drawingPoints: o,
  onSelectRoom: a,
  onMoveRoom: l,
  onMoveRoomPoint: c,
  onMoveRoomEdge: d,
  gridSize: p,
  gridEnabled: y,
  isDark: k,
  stageRotation: x,
  groupDragOffset: w,
  onGroupDragMove: m,
  onGroupDragEnd: S
}) {
  const { fontFamily: b } = un(), L = n === "edit", M = k ? "#2a2a2a" : "#e8e8e8", g = k ? "#888888" : "#000000", C = k ? "#cccccc" : "#333333", A = Vt, [E, T] = z.useState(null), [P, R] = z.useState(null), [V, F] = z.useState(null), W = e.length === 1 ? e[0] : null;
  return /* @__PURE__ */ v.jsxs(br, { children: [
    t.map((U) => {
      const $ = e.includes(U.id), Q = V === U.id, oe = Rf(U, E, P), q = $ && !Q && w ? oe.map((Y) => ({ x: Y.x + w.x, y: Y.y + w.y })) : oe, G = q.flatMap((Y) => [Y.x, Y.y]);
      return /* @__PURE__ */ v.jsxs(
        br,
        {
          listening: L && (r === "select" || r === "multiselect"),
          draggable: L && (r === "select" || r === "multiselect") && !E,
          onDragStart: () => F(U.id),
          onDragMove: (Y) => {
            if (y) {
              const D = U.points[0] ?? { x: 0, y: 0 };
              Y.target.position({
                x: Zi(Y.target.x(), D.x, p, !0),
                y: Zi(Y.target.y(), D.y, p, !0)
              });
            }
            m && $ && m({ x: Y.target.x(), y: Y.target.y() });
          },
          onClick: (Y) => {
            L && (r === "select" || r === "multiselect") && a(U.id, r === "multiselect" || Y.evt.shiftKey);
          },
          onTap: () => {
            L && (r === "select" || r === "multiselect") && a(U.id, r === "multiselect");
          },
          onDragEnd: (Y) => {
            if (!L) return;
            const D = Y.target.x(), ee = Y.target.y();
            Y.target.position({ x: 0, y: 0 }), F(null), S && S();
            const re = U.points[0] ?? { x: 0, y: 0 };
            l(
              U.id,
              Zi(D, re.x, p, y),
              Zi(ee, re.y, p, y)
            );
          },
          children: [
            /* @__PURE__ */ v.jsx(
              _a,
              {
                points: G,
                closed: !0,
                fill: M,
                opacity: 1,
                stroke: $ && L ? A : g,
                strokeWidth: $ && L ? 2.5 : 1.5,
                hitStrokeWidth: 10
              }
            ),
            U.label_visible !== !1 && (() => {
              const Y = U.label_v ?? "middle", D = U.label_h ?? "center", ee = U.name.length * 7, re = fb(q, Y, D, ee), we = re.x + ee / 2, Re = re.y + 7;
              return /* @__PURE__ */ v.jsx(br, { x: we, y: Re, rotation: -x, children: /* @__PURE__ */ v.jsx(
                Ju,
                {
                  x: -ee / 2,
                  y: -7,
                  text: U.name,
                  fontSize: 14,
                  fontFamily: b,
                  fill: C,
                  opacity: 0.5,
                  listening: !1
                }
              ) });
            })()
          ]
        },
        U.id
      );
    }),
    L && r === "select" && W && t.filter((U) => U.id === W).map((U) => Rf(U, E, P).map((Q, oe) => /* @__PURE__ */ v.jsx(
      fo,
      {
        x: Q.x,
        y: Q.y,
        radius: 5,
        fill: A,
        stroke: "#fff",
        strokeWidth: 2,
        draggable: !0,
        onMouseEnter: (q) => {
          var Y;
          const G = (Y = q.target.getStage()) == null ? void 0 : Y.container();
          G && (G.style.cursor = "crosshair");
        },
        onMouseLeave: (q) => {
          var Y;
          const G = (Y = q.target.getStage()) == null ? void 0 : Y.container();
          G && (G.style.cursor = "");
        },
        onDragMove: (q) => {
          const G = Sl(q.target.x(), p, y), Y = Sl(q.target.y(), p, y);
          q.target.position({ x: G, y: Y }), T({
            roomId: U.id,
            pointIndex: oe,
            x: G,
            y: Y
          });
        },
        onDragEnd: (q) => {
          const G = Sl(q.target.x(), p, y), Y = Sl(q.target.y(), p, y);
          q.target.position({ x: Q.x, y: Q.y }), T(null), c(U.id, oe, G, Y);
        }
      },
      `handle-${U.id}-${oe}`
    ))),
    L && r === "select" && W && t.filter((U) => U.id === W).map((U) => {
      const $ = Rf(U, E, null), Q = $.length;
      return $.map((oe, q) => {
        const G = (q + 1) % Q, Y = $[G], D = (oe.x + Y.x) / 2, ee = (oe.y + Y.y) / 2, re = P && P.roomId === U.id && P.idxA === q && P.idxB === G, we = re ? D + P.dx : D, Re = re ? ee + P.dy : ee;
        return /* @__PURE__ */ v.jsx(
          fo,
          {
            x: we,
            y: Re,
            radius: 4,
            fill: "#fff",
            stroke: A,
            strokeWidth: 1.5,
            draggable: !0,
            onMouseEnter: (ie) => {
              var H;
              const ce = (H = ie.target.getStage()) == null ? void 0 : H.container();
              ce && (ce.style.cursor = "move");
            },
            onMouseLeave: (ie) => {
              var H;
              const ce = (H = ie.target.getStage()) == null ? void 0 : H.container();
              ce && (ce.style.cursor = "");
            },
            onDragMove: (ie) => {
              const ce = ie.target.x() - D, H = ie.target.y() - ee, I = Zi(ce, oe.x, p, y), te = Zi(H, oe.y, p, y);
              ie.target.position({ x: D + I, y: ee + te }), R({
                roomId: U.id,
                idxA: q,
                idxB: G,
                dx: I,
                dy: te
              });
            },
            onDragEnd: (ie) => {
              const ce = ie.target.x() - D, H = ie.target.y() - ee, I = Zi(ce, oe.x, p, y), te = Zi(H, oe.y, p, y);
              ie.target.position({ x: D, y: ee }), R(null), d(U.id, q, G, I, te);
            }
          },
          `edge-${U.id}-${q}`
        );
      });
    }),
    L && o.length > 0 && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx(
        _a,
        {
          points: o.flatMap((U) => [U.x, U.y]),
          stroke: A,
          strokeWidth: 2,
          dash: [5, 5],
          listening: !1
        }
      ),
      o.map((U, $) => /* @__PURE__ */ v.jsx(
        fo,
        {
          x: U.x,
          y: U.y,
          radius: 4,
          fill: A,
          listening: !1
        },
        `draw-${$}`
      ))
    ] })
  ] });
}
const pb = 36;
function N7(t, e, n) {
  return n ? Math.round(t / e) * e : t;
}
function gb(t) {
  return t.split(".")[0];
}
function mb({
  placement: t,
  entity: e,
  isSelected: n,
  isEditMode: r,
  activeTool: o,
  onSelect: a,
  onMove: l,
  gridSize: c,
  gridEnabled: d,
  isDark: p,
  stageRotation: y,
  groupDragOffset: k,
  onGroupDragMove: x,
  onGroupDragEnd: w,
  onDragStarted: m,
  onDragEnded: S,
  effectiveIconSize: b
}) {
  var we, Re, ie, ce;
  const { resolveEntityIcon: L, computeLightStyle: M, getDomainColor: g, fontFamily: C } = un(), A = gb(t.entity_id), E = (e == null ? void 0 : e.state) ?? "unknown", T = (we = e == null ? void 0 : e.attributes) == null ? void 0 : we.device_class, { icon: P, style: R } = L(A, E, T);
  let V = R.opacity ?? 1, F;
  const W = E === "on" || E === "open" || E === "playing" || E === "unlocked", U = E === "unavailable" || E === "unknown";
  if (A === "light") {
    const H = (Re = e == null ? void 0 : e.attributes) == null ? void 0 : Re.brightness, I = (ie = e == null ? void 0 : e.attributes) == null ? void 0 : ie.rgb_color, te = M(R, E, H, I);
    V = te.opacity, F = U ? p ? "#555" : "#bbb" : W ? te.fillColor ?? g("light") : p ? "#888" : "#999";
  } else
    F = U ? p ? "#555" : "#bbb" : W ? g(A) : p ? "#888" : "#999";
  const $ = t.icon_size ?? b ?? pb, [Q, oe] = z.useState(!1), q = z.useRef(null), G = z.useRef(E), Y = z.useRef(null);
  z.useEffect(() => {
    var K;
    const H = G.current;
    if (G.current = E, H === E) return;
    const I = q.current;
    if (!I || Q) return;
    const te = H === "on" || H === "open" || H === "playing" || H === "unlocked", ze = E === "on" || E === "open" || E === "playing" || E === "unlocked";
    if (te !== ze)
      return (K = Y.current) == null || K.destroy(), ze ? (Y.current = new Br.Tween({
        node: I,
        duration: 0.15,
        scaleX: 1.12,
        scaleY: 1.12,
        easing: Br.Easings.EaseOut,
        onFinish: () => {
          Y.current = new Br.Tween({
            node: I,
            duration: 0.15,
            scaleX: 1,
            scaleY: 1,
            easing: Br.Easings.EaseIn
          }), Y.current.play();
        }
      }), Y.current.play()) : (Y.current = new Br.Tween({
        node: I,
        duration: 0.15,
        scaleX: 0.92,
        scaleY: 0.92,
        easing: Br.Easings.EaseOut,
        onFinish: () => {
          Y.current = new Br.Tween({
            node: I,
            duration: 0.15,
            scaleX: 1,
            scaleY: 1,
            easing: Br.Easings.EaseIn
          }), Y.current.play();
        }
      }), Y.current.play()), () => {
        var ae;
        (ae = Y.current) == null || ae.destroy();
      };
  }, [E, Q]);
  const D = ((ce = e == null ? void 0 : e.attributes) == null ? void 0 : ce.friendly_name) ?? t.entity_id.split(".")[1], ee = (() => {
    var te, ze;
    if (!e) return "unknown";
    const H = e.state, I = (te = e.attributes) == null ? void 0 : te.unit_of_measurement;
    if (I) return `${H} ${I}`;
    if (A === "climate") {
      const K = (ze = e.attributes) == null ? void 0 : ze.current_temperature;
      if (K != null) return `${H} · ${K}°`;
    }
    return H;
  })(), re = Vt;
  return /* @__PURE__ */ v.jsxs(
    br,
    {
      ref: q,
      x: t.x + ((k == null ? void 0 : k.x) ?? 0),
      y: t.y + ((k == null ? void 0 : k.y) ?? 0),
      draggable: r,
      onClick: (H) => a(t.id, o === "multiselect" || H.evt.shiftKey),
      onTap: () => a(t.id, o === "multiselect"),
      onDragStart: () => {
        oe(!0), m == null || m();
      },
      onDragMove: (H) => {
        x && x({
          x: H.target.x() - t.x,
          y: H.target.y() - t.y
        });
      },
      onDragEnd: (H) => {
        oe(!1), S == null || S(), w && w();
        const I = N7(H.target.x(), c, d), te = N7(H.target.y(), c, d);
        l(t.id, I, te);
      },
      onMouseEnter: (H) => {
        var te;
        const I = (te = H.target.getStage()) == null ? void 0 : te.container();
        I && (I.style.cursor = "pointer");
      },
      onMouseLeave: (H) => {
        var I;
        if (!Q) {
          const te = (I = H.target.getStage()) == null ? void 0 : I.container();
          te && (te.style.cursor = "");
        }
      },
      scaleX: Q ? 1.25 : 1,
      scaleY: Q ? 1.25 : 1,
      opacity: Q ? 0.7 : 1,
      children: [
        /* @__PURE__ */ v.jsx(
          fo,
          {
            x: 0,
            y: 0,
            radius: $ * 0.42,
            hitFunc: (H, I) => {
              const te = I.radius();
              H.beginPath(), H.arc(0, 0, te, 0, Math.PI * 2, !0), H.closePath(), H.fillStrokeShape(I);
            }
          }
        ),
        Q && /* @__PURE__ */ v.jsx(
          fo,
          {
            x: 0,
            y: 0,
            radius: $ * 0.4,
            fill: p ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
            listening: !1
          }
        ),
        n && !Q && /* @__PURE__ */ v.jsx(
          fo,
          {
            x: 0,
            y: 0,
            radius: $ * 0.42,
            stroke: re,
            strokeWidth: 1.5,
            dash: [4, 3],
            listening: !1
          }
        ),
        /* @__PURE__ */ v.jsx(br, { rotation: -y, children: (() => {
          const H = t.show_icon !== !1, I = t.label_visible, te = !!t.show_state, ze = 10, K = 9, ae = 2, pe = [];
          I && pe.push(ze), te && pe.push(K);
          const de = pe.reduce((Nt, _t) => Nt + _t, 0) + Math.max(0, pe.length - 1) * ae, be = H ? $ * 0.38 : 0, et = -de / 2, Ne = 200, Ye = Ne / 2;
          return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
            H && /* @__PURE__ */ v.jsx(
              Om,
              {
                icon: P,
                size: $,
                fill: F,
                opacity: V
              }
            ),
            I && /* @__PURE__ */ v.jsx(
              Ju,
              {
                x: be,
                y: et,
                width: H ? void 0 : Ne,
                align: H ? "left" : "center",
                offsetX: H ? 0 : Ye,
                text: D,
                fontSize: ze,
                fontFamily: C,
                fill: p ? "#ccc" : "#333",
                opacity: 0.8,
                listening: !1
              }
            ),
            te && /* @__PURE__ */ v.jsx(
              Ju,
              {
                x: be,
                y: et + (I ? ze + ae : 0),
                width: H ? void 0 : Ne,
                align: H ? "left" : "center",
                offsetX: H ? 0 : Ye,
                text: ee,
                fontSize: K,
                fontFamily: C,
                fill: W ? F : p ? "#999" : "#777",
                opacity: 0.8,
                listening: !1
              }
            )
          ] });
        })() })
      ]
    }
  );
}
function yb({
  entities: t,
  hass: e,
  selectedEntityIds: n,
  mode: r,
  activeTool: o,
  onSelectEntity: a,
  onMoveEntity: l,
  gridSize: c,
  gridEnabled: d,
  isDark: p,
  stageRotation: y,
  groupDragOffset: k,
  onGroupDragMove: x,
  onGroupDragEnd: w,
  defaultIconSize: m,
  domainIconSizes: S
}) {
  const b = r === "edit", [L, M] = z.useState(null);
  return /* @__PURE__ */ v.jsx(br, { children: t.map((g) => {
    const C = n.includes(g.id), A = L === g.id, E = C && !A ? k : null, T = g.entity_id.split(".")[0], P = (S == null ? void 0 : S[T]) ?? m;
    return /* @__PURE__ */ v.jsx(
      mb,
      {
        placement: g,
        entity: e.states[g.entity_id],
        isSelected: C,
        isEditMode: b,
        activeTool: o,
        onSelect: a,
        onMove: l,
        gridSize: c,
        gridEnabled: d,
        isDark: p,
        stageRotation: y,
        groupDragOffset: E,
        onGroupDragMove: C ? x : void 0,
        onGroupDragEnd: C ? w : void 0,
        onDragStarted: C ? () => M(g.id) : void 0,
        onDragEnded: C ? () => M(null) : void 0,
        effectiveIconSize: P
      },
      g.id
    );
  }) });
}
function Yi(t, e, n) {
  return n ? Math.round(t / e) * e : t;
}
function vb({
  placement: t,
  isSelected: e,
  isEditMode: n,
  activeTool: r,
  onSelect: o,
  onMove: a,
  onUpdate: l,
  gridSize: c,
  gridEnabled: d,
  isDark: p,
  stageRotation: y,
  groupDragOffset: k,
  onGroupDragMove: x,
  onGroupDragEnd: w,
  onDragStarted: m,
  onDragEnded: S
}) {
  const { resolveEntityIcon: b } = un(), { icon: L } = b("furniture", "on", t.type), [M, g] = z.useState(!1), [C, A] = z.useState(null), E = z.useRef(!1), T = z.useRef(null), P = z.useRef(n);
  z.useEffect(() => {
    if (P.current === n) return;
    P.current = n;
    const ie = T.current;
    ie && new Br.Tween({
      node: ie,
      duration: 0.3,
      opacity: n ? 1 : 0.35,
      easing: Br.Easings.EaseOut
    }).play();
  }, [n]);
  const R = t.width, V = t.height, F = Vt, W = 5, U = c, $ = C ? R + C.dw : R, Q = C ? V + C.dh : V, oe = C ? C.localDx : 0, q = C ? C.localDy : 0, G = t.rotation * Math.PI / 180, Y = Math.cos(G), D = Math.sin(G), ee = oe * Y - q * D, re = oe * D + q * Y, we = z.useMemo(() => [
    { x: 0, y: -Q / 2, axis: "v", sign: -1, cursor: "ns-resize" },
    { x: $ / 2, y: 0, axis: "h", sign: 1, cursor: "ew-resize" },
    { x: 0, y: Q / 2, axis: "v", sign: 1, cursor: "ns-resize" },
    { x: -$ / 2, y: 0, axis: "h", sign: -1, cursor: "ew-resize" }
  ], [$, Q]), Re = z.useCallback((ie, ce) => {
    if (ie.axis === "h") {
      const H = ie.sign === 1 ? R / 2 : -R / 2, I = Yi(ce.x - H, c, d), te = Math.max(U, R + I * ie.sign), K = Yi(te, c, d) - R;
      return { dw: K, dh: 0, localDx: K / 2 * ie.sign, localDy: 0 };
    } else {
      const H = ie.sign === 1 ? V / 2 : -V / 2, I = Yi(ce.y - H, c, d), te = Math.max(U, V + I * ie.sign), K = Yi(te, c, d) - V;
      return { dw: 0, dh: K, localDx: 0, localDy: K / 2 * ie.sign };
    }
  }, [R, V, c, d, U]);
  return /* @__PURE__ */ v.jsxs(
    br,
    {
      ref: T,
      x: t.x + ((k == null ? void 0 : k.x) ?? 0) + ee,
      y: t.y + ((k == null ? void 0 : k.y) ?? 0) + re,
      rotation: t.rotation,
      draggable: n && !E.current,
      listening: n,
      opacity: n ? 1 : 0.35,
      onClick: (ie) => {
        E.current || o(t.id, r === "multiselect" || ie.evt.shiftKey);
      },
      onTap: () => {
        E.current || o(t.id, r === "multiselect");
      },
      onDragStart: () => {
        E.current || (g(!0), m == null || m());
      },
      onDragMove: (ie) => {
        if (!E.current) {
          if (d) {
            const ce = $ / 2, H = Q / 2;
            ie.target.position({
              x: Yi(ie.target.x() - ce, c, !0) + ce,
              y: Yi(ie.target.y() - H, c, !0) + H
            });
          }
          x && x({
            x: ie.target.x() - t.x,
            y: ie.target.y() - t.y
          });
        }
      },
      onDragEnd: (ie) => {
        if (E.current) return;
        g(!1), S == null || S(), w && w();
        const ce = $ / 2, H = Q / 2, I = d ? Yi(ie.target.x() - ce, c, !0) + ce : ie.target.x(), te = d ? Yi(ie.target.y() - H, c, !0) + H : ie.target.y();
        a(t.id, I, te);
      },
      onMouseEnter: (ie) => {
        var ce;
        if (n) {
          const H = (ce = ie.target.getStage()) == null ? void 0 : ce.container();
          H && (H.style.cursor = "pointer");
        }
      },
      onMouseLeave: (ie) => {
        var ce;
        if (!M) {
          const H = (ce = ie.target.getStage()) == null ? void 0 : ce.container();
          H && (H.style.cursor = "");
        }
      },
      children: [
        /* @__PURE__ */ v.jsx(
          W5,
          {
            x: -$ / 2,
            y: -Q / 2,
            width: $,
            height: Q,
            fill: p ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
            stroke: p ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
            strokeWidth: 1,
            cornerRadius: 4
          }
        ),
        /* @__PURE__ */ v.jsx(br, { rotation: -y, children: /* @__PURE__ */ v.jsx(
          Om,
          {
            icon: L,
            size: Math.max($, Q) * 0.85,
            fill: p ? "#aaa" : "#666",
            opacity: 1
          }
        ) }),
        e && !M && /* @__PURE__ */ v.jsx(
          W5,
          {
            x: -$ / 2,
            y: -Q / 2,
            width: $,
            height: Q,
            stroke: F,
            strokeWidth: 1.5,
            dash: [4, 3],
            listening: !1
          }
        ),
        e && n && we.map((ie, ce) => /* @__PURE__ */ v.jsx(
          fo,
          {
            x: ie.x,
            y: ie.y,
            radius: W,
            fill: F,
            stroke: "#fff",
            strokeWidth: 1,
            draggable: !0,
            onMouseEnter: (H) => {
              var te;
              const I = (te = H.target.getStage()) == null ? void 0 : te.container();
              I && (I.style.cursor = ie.cursor);
            },
            onMouseLeave: (H) => {
              var te;
              const I = (te = H.target.getStage()) == null ? void 0 : te.container();
              I && (I.style.cursor = "");
            },
            onDragStart: (H) => {
              H.cancelBubble = !0, E.current = !0;
            },
            onDragMove: (H) => {
              H.cancelBubble = !0, ie.axis === "h" ? H.target.y(ie.y) : H.target.x(ie.x), A(Re(ie, { x: H.target.x(), y: H.target.y() }));
            },
            onDragEnd: (H) => {
              H.cancelBubble = !0;
              const I = Re(ie, { x: H.target.x(), y: H.target.y() }), te = R + I.dw, ze = V + I.dh, K = I.localDx * Y - I.localDy * D, ae = I.localDx * D + I.localDy * Y;
              A(null), l(t.id, {
                width: te,
                height: ze,
                x: t.x + K,
                y: t.y + ae
              }), H.target.x(ie.x), H.target.y(ie.y), setTimeout(() => {
                E.current = !1;
              }, 50);
            }
          },
          ce
        ))
      ]
    }
  );
}
function xb({
  furniture: t,
  selectedFurnitureIds: e,
  mode: n,
  activeTool: r,
  onSelectFurniture: o,
  onMoveFurniture: a,
  onUpdateFurniture: l,
  gridSize: c,
  gridEnabled: d,
  isDark: p,
  stageRotation: y,
  groupDragOffset: k,
  onGroupDragMove: x,
  onGroupDragEnd: w
}) {
  const m = n === "edit", [S, b] = z.useState(null);
  return /* @__PURE__ */ v.jsx(br, { children: t.map((L) => {
    const M = e.includes(L.id), g = S === L.id, C = M && !g ? k : null;
    return /* @__PURE__ */ v.jsx(
      vb,
      {
        placement: L,
        isSelected: M,
        isEditMode: m,
        activeTool: r,
        onSelect: o,
        onMove: a,
        onUpdate: l,
        gridSize: c,
        gridEnabled: d,
        isDark: p,
        stageRotation: y,
        groupDragOffset: C,
        onGroupDragMove: M ? x : void 0,
        onGroupDragEnd: M ? w : void 0,
        onDragStarted: M ? () => b(L.id) : void 0,
        onDragEnded: M ? () => b(null) : void 0
      },
      L.id
    );
  }) });
}
const H7 = 1.3, V7 = 4, _b = 400;
function zf() {
  try {
    const t = new URLSearchParams(window.location.search), e = t.has("x") ? Number(t.get("x")) : null, n = t.has("y") ? Number(t.get("y")) : null, r = t.has("scale") ? Number(t.get("scale")) : null, o = t.has("r") ? Number(t.get("r")) : null;
    return {
      x: e !== null && Number.isFinite(e) ? e : null,
      y: n !== null && Number.isFinite(n) ? n : null,
      scale: r !== null && Number.isFinite(r) && r > 0 ? r : null,
      rotation: o !== null && [0, 90, 180, 270].includes(o) ? o : null
    };
  } catch {
    return { x: null, y: null, scale: null, rotation: null };
  }
}
function Cb(t, e, n, r) {
  try {
    const o = new URL(window.location.href);
    o.searchParams.set("x", t.toFixed(1)), o.searchParams.set("y", e.toFixed(1)), o.searchParams.set("scale", n.toFixed(3)), r !== 0 ? o.searchParams.set("r", String(r)) : o.searchParams.delete("r"), window.history.replaceState(window.history.state, "", o.toString());
  } catch {
  }
}
function Do(t, e, n, r, o, a) {
  const l = t - n, c = e - r, d = a * Math.PI / 180, p = Math.cos(d), y = Math.sin(d);
  return {
    x: (l * p + c * y) / o,
    y: (-l * y + c * p) / o
  };
}
function ou(t, e, n, r, o, a) {
  const l = a * Math.PI / 180, c = Math.cos(l), d = Math.sin(l);
  return {
    x: n - o * (t * c - e * d),
    y: r - o * (t * d + e * c)
  };
}
function wb(t, e) {
  const n = parseInt(t.slice(1, 3), 16), r = parseInt(t.slice(3, 5), 16), o = parseInt(t.slice(5, 7), 16);
  return `rgba(${n}, ${r}, ${o}, ${e})`;
}
function Sb(t) {
  const e = t.reduce((r, o) => r + o.x, 0) / t.length, n = t.reduce((r, o) => r + o.y, 0) / t.length;
  return { x: e, y: n };
}
function Ff(t, e, n, r, o, a) {
  const l = Math.min(t, n), c = Math.max(t, n), d = Math.min(e, r), p = Math.max(e, r);
  return o >= l && o <= c && a >= d && a <= p;
}
function kb(t, e) {
  return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
const Mb = z.forwardRef(
  function({
    floor: e,
    mode: n,
    activeTool: r,
    selectedRoomIds: o,
    selectedEntityIds: a,
    onSelectRoom: l,
    onSelectEntity: c,
    onClearSelection: d,
    onMarqueeSelect: p,
    onAddRoom: y,
    onMoveRoom: k,
    onMoveEntity: x,
    onUpdateRoom: w,
    onDropEntity: m,
    selectedFurnitureIds: S,
    onSelectFurniture: b,
    onMoveFurniture: L,
    onUpdateFurniture: M,
    onDropFurniture: g,
    onDefaultViewChange: C,
    hass: A,
    gridSize: E,
    gridEnabled: T,
    isDark: P,
    defaultIconSize: R,
    domainIconSizes: V
  }, F) {
    var Hi, Vi;
    un();
    const [W, U] = z.useState(() => {
      const ne = zf();
      return ne.x !== null && ne.y !== null ? { x: ne.x, y: ne.y } : null;
    }), [$, Q] = z.useState(() => zf().scale ?? 1), [oe, q] = z.useState(() => zf().rotation ?? 0), [G, Y] = z.useState([]), [D, ee] = z.useState(!1), re = z.useRef(null), we = z.useRef(null), Re = z.useRef({ x: 0, y: 0 }), ie = z.useRef(!1), [ce, H] = z.useState(null), [I, te] = z.useState(null), ze = ce !== null && I !== null, K = z.useRef(!1), ae = z.useRef(null), [pe, de] = z.useState(null), be = o.length + a.length + S.length > 1;
    z.useEffect(() => {
      if (W !== null) return;
      const ne = re.current;
      ne && U({ x: ne.clientWidth / 2, y: ne.clientHeight / 2 });
    }), z.useEffect(() => {
      if (!C || W === null) return;
      const ne = re.current;
      if (!ne) return;
      const je = ne.clientWidth / 2, Ae = ne.clientHeight / 2, Ve = oe === 0 && Math.abs($ - 1) < 0.01 && Math.abs(W.x - je) < 2 && Math.abs(W.y - Ae) < 2;
      C(Ve);
    }, [W, $, oe, C]);
    const et = z.useRef(null);
    z.useEffect(() => {
      if (W !== null)
        return et.current && clearTimeout(et.current), et.current = setTimeout(() => {
          Cb(W.x, W.y, $, oe);
        }, _b), () => {
          et.current && clearTimeout(et.current);
        };
    }, [W, $, oe]);
    const Ne = W ?? { x: 0, y: 0 };
    function Ye(ne) {
      return T ? Math.round(ne / E) * E : ne;
    }
    function Nt(ne, je) {
      return Do(ne, je, Ne.x, Ne.y, $, oe);
    }
    const _t = z.useCallback(
      (ne, je, Ae) => {
        var Cn, cn;
        const Ve = Math.max(0.1, Math.min(5, ne)), Fe = ((Cn = re.current) == null ? void 0 : Cn.clientWidth) ?? 800, Oe = ((cn = re.current) == null ? void 0 : cn.clientHeight) ?? 600, Ze = je ?? Fe / 2, lt = Ae ?? Oe / 2, Gt = Do(Ze, lt, Ne.x, Ne.y, $, oe);
        Q(Ve), U(ou(Gt.x, Gt.y, Ze, lt, Ve, oe));
      },
      [$, W, oe]
    ), Pn = z.useCallback(() => _t($ * H7), [$, _t]), $n = z.useCallback(
      () => _t($ / H7),
      [$, _t]
    ), ti = z.useCallback(() => {
      const ne = re.current, je = ne ? ne.clientWidth / 2 : 400, Ae = ne ? ne.clientHeight / 2 : 300;
      Q(1), q(0), U({ x: je, y: Ae });
    }, []), Qn = z.useCallback(() => {
      const ne = re.current, je = ne ? ne.clientWidth : 800, Ae = ne ? ne.clientHeight : 600, Ve = je / 2, Fe = Ae / 2, Oe = Do(Ve, Fe, Ne.x, Ne.y, $, oe), Ze = (oe + 90) % 360;
      q(Ze), U(ou(Oe.x, Oe.y, Ve, Fe, $, Ze));
    }, [oe, $, Ne]);
    z.useImperativeHandle(
      F,
      () => ({
        zoomIn: Pn,
        zoomOut: $n,
        resetView: ti,
        rotateView: Qn,
        rotation: oe
      }),
      [Pn, $n, ti, Qn, oe]
    );
    const Va = z.useCallback(
      (ne) => {
        ne.evt.preventDefault();
        const je = ne.target.getStage();
        if (!je) return;
        const Ae = 1.03, Ve = je.getPointerPosition();
        if (!Ve) return;
        const Fe = $, Oe = ne.evt.deltaY < 0 ? Fe * Ae : Fe / Ae, Ze = Math.max(0.1, Math.min(5, Oe)), lt = Do(Ve.x, Ve.y, Ne.x, Ne.y, Fe, oe);
        Q(Ze), U(ou(lt.x, lt.y, Ve.x, Ve.y, Ze, oe));
      },
      [$, W, oe]
    ), Ao = z.useCallback(
      (ne) => {
        var Ze;
        if (!(ne.target === ne.target.getStage())) return;
        const Ae = ne.evt;
        if ("button" in Ae && Ae.button !== 0) return;
        ie.current = !1;
        let Ve, Fe;
        if ("touches" in ne.evt && ne.evt.touches.length > 0) {
          const lt = ne.evt.touches[0];
          Ve = lt.clientX, Fe = lt.clientY;
        } else
          Ve = ne.evt.clientX, Fe = ne.evt.clientY;
        if (r === "draw") return;
        if (n === "edit" && (r === "multiselect" || r === "select" && "shiftKey" in Ae && Ae.shiftKey)) {
          const lt = (Ze = re.current) == null ? void 0 : Ze.getBoundingClientRect();
          if (lt) {
            const Gt = Nt(Ve - lt.left, Fe - lt.top);
            H(Gt), te(Gt), K.current = !0;
          }
          return;
        }
        ee(!0), we.current = { x: Ve, y: Fe }, Re.current = { x: Ve, y: Fe };
      },
      [n, r, Ne, $, oe]
    ), gs = z.useCallback(
      (ne) => {
        if (D && we.current) {
          const je = ne.clientX - Re.current.x, Ae = ne.clientY - Re.current.y;
          Re.current = { x: ne.clientX, y: ne.clientY };
          const Ve = ne.clientX - we.current.x, Fe = ne.clientY - we.current.y;
          !ie.current && Math.abs(Ve) + Math.abs(Fe) > V7 && (ie.current = !0), ie.current && U((Oe) => ({
            x: ((Oe == null ? void 0 : Oe.x) ?? 0) + je,
            y: ((Oe == null ? void 0 : Oe.y) ?? 0) + Ae
          }));
          return;
        }
        if (K.current && ce && re.current) {
          const je = re.current.getBoundingClientRect(), Ae = Nt(
            ne.clientX - je.left,
            ne.clientY - je.top
          );
          te(Ae), ie.current = !0;
        }
      },
      [D, ce, Ne, $, oe]
    ), Ta = z.useCallback(
      (ne) => {
        if (D && (ee(!1), we.current = null), K.current && ce && I) {
          K.current = !1;
          const je = ce.x, Ae = ce.y, Ve = I.x, Fe = I.y;
          if (Math.abs(Ve - je) + Math.abs(Fe - Ae) > 5) {
            const Ze = (e == null ? void 0 : e.rooms) ?? [], lt = (e == null ? void 0 : e.entities) ?? [], Gt = (e == null ? void 0 : e.furniture) ?? [], Cn = Ze.filter((J) => {
              const xe = Sb(J.points);
              return Ff(je, Ae, Ve, Fe, xe.x, xe.y);
            }).map((J) => J.id), cn = lt.filter((J) => Ff(je, Ae, Ve, Fe, J.x, J.y)).map((J) => J.id), Vr = Gt.filter((J) => Ff(je, Ae, Ve, Fe, J.x, J.y)).map((J) => J.id);
            (Cn.length > 0 || cn.length > 0 || Vr.length > 0) && p(Cn, cn, r === "multiselect" || ne.shiftKey, Vr);
          }
          H(null), te(null);
        }
      },
      [D, ce, I, e, r, p]
    ), ms = z.useCallback(() => {
      D && (ee(!1), we.current = null), K.current && (K.current = !1, H(null), te(null));
    }, [D]), Ra = z.useCallback(
      (ne) => {
        var je;
        if (ne.touches.length >= 2) {
          ne.preventDefault(), D && (ee(!1), we.current = null);
          const Ae = { x: ne.touches[0].clientX, y: ne.touches[0].clientY }, Ve = { x: ne.touches[1].clientX, y: ne.touches[1].clientY }, Fe = kb(Ae, Ve), Oe = (Ae.x + Ve.x) / 2, Ze = (Ae.y + Ve.y) / 2;
          if (ae.current) {
            const lt = Fe / ae.current.dist, Gt = Oe - ae.current.midX, Cn = Ze - ae.current.midY, cn = (je = re.current) == null ? void 0 : je.getBoundingClientRect();
            if (cn) {
              const Vr = Oe - cn.left, J = Ze - cn.top, xe = Math.max(0.1, Math.min(5, $ * lt)), De = Do(Vr, J, Ne.x, Ne.y, $, oe), Ue = ou(De.x, De.y, Vr, J, xe, oe);
              Q(xe), U({
                x: Ue.x + Gt,
                y: Ue.y + Cn
              });
            }
          }
          ae.current = { dist: Fe, midX: Oe, midY: Ze }, ie.current = !0;
        } else if (ne.touches.length === 1 && D) {
          const Ae = ne.touches[0], Ve = Ae.clientX - Re.current.x, Fe = Ae.clientY - Re.current.y;
          if (Re.current = { x: Ae.clientX, y: Ae.clientY }, we.current) {
            const Oe = Ae.clientX - we.current.x, Ze = Ae.clientY - we.current.y;
            !ie.current && Math.abs(Oe) + Math.abs(Ze) > V7 && (ie.current = !0);
          }
          ie.current && U((Oe) => ({
            x: ((Oe == null ? void 0 : Oe.x) ?? 0) + Ve,
            y: ((Oe == null ? void 0 : Oe.y) ?? 0) + Fe
          }));
        }
      },
      [D, $, Ne, oe]
    ), za = z.useCallback(
      (ne) => {
        ne.touches.length < 2 && (ae.current = null), ne.touches.length === 0 && D && (ee(!1), we.current = null);
      },
      [D]
    ), Fa = z.useCallback(
      (ne) => {
        if (!ie.current && !("button" in ne.evt && ne.evt.button !== 0)) {
          if (r === "draw") {
            const je = ne.target.getStage();
            if (!je) return;
            const Ae = je.getPointerPosition();
            if (!Ae) return;
            const Ve = Do(Ae.x, Ae.y, Ne.x, Ne.y, $, oe), Fe = Ye(Ve.x), Oe = Ye(Ve.y);
            Y((Ze) => [...Ze, { x: Fe, y: Oe }]);
            return;
          }
          ne.target === ne.target.getStage() && r !== "multiselect" && d();
        }
      },
      [r, Ne, $, oe, E, T, d]
    ), ja = z.useCallback(
      (ne) => {
        if (!ie.current) {
          if (r === "draw") {
            const je = ne.target.getStage();
            if (!je) return;
            const Ae = je.getPointerPosition();
            if (!Ae) return;
            const Ve = Do(Ae.x, Ae.y, Ne.x, Ne.y, $, oe), Fe = Ye(Ve.x), Oe = Ye(Ve.y);
            Y((Ze) => [...Ze, { x: Fe, y: Oe }]);
            return;
          }
          ne.target === ne.target.getStage() && r !== "multiselect" && d();
        }
      },
      [r, Ne, $, oe, E, T, d]
    ), ys = z.useCallback(() => {
      r !== "draw" || G.length < 3 || (y(G), Y([]));
    }, [r, G, y]), Ei = z.useCallback(
      (ne, je, Ae, Ve) => {
        const Fe = e == null ? void 0 : e.rooms.find((Ze) => Ze.id === ne);
        if (!Fe) return;
        const Oe = Fe.points.map(
          (Ze, lt) => lt === je ? { x: Ae, y: Ve } : Ze
        );
        w(ne, { points: Oe });
      },
      [e, w]
    ), vs = z.useCallback(
      (ne, je, Ae, Ve, Fe) => {
        const Oe = e == null ? void 0 : e.rooms.find((lt) => lt.id === ne);
        if (!Oe) return;
        const Ze = Oe.points.map(
          (lt, Gt) => Gt === je || Gt === Ae ? { x: lt.x + Ve, y: lt.y + Fe } : lt
        );
        w(ne, { points: Ze });
      },
      [e, w]
    ), bo = z.useCallback((ne) => {
      (ne.dataTransfer.types.includes("application/entity-id") || ne.dataTransfer.types.includes("application/furniture-type")) && (ne.preventDefault(), ne.dataTransfer.dropEffect = "copy");
    }, []), Oa = z.useCallback(
      (ne) => {
        if (!re.current) return;
        const je = re.current.getBoundingClientRect(), Ae = Nt(ne.clientX - je.left, ne.clientY - je.top), Ve = T ? Math.round(Ae.x / E) * E : Ae.x, Fe = T ? Math.round(Ae.y / E) * E : Ae.y, Oe = ne.dataTransfer.getData("application/entity-id");
        if (Oe) {
          ne.preventDefault(), m(Oe, Ve, Fe);
          return;
        }
        const Ze = ne.dataTransfer.getData("application/furniture-type");
        if (Ze) {
          ne.preventDefault(), g(Ze, Ve, Fe);
          return;
        }
      },
      [W, $, oe, E, T, m, g]
    ), Ni = ((Hi = re.current) == null ? void 0 : Hi.clientWidth) ?? 800, Nr = ((Vi = re.current) == null ? void 0 : Vi.clientHeight) ?? 600, Hr = ze ? {
      x: Math.min(ce.x, I.x),
      y: Math.min(ce.y, I.y),
      width: Math.abs(I.x - ce.x),
      height: Math.abs(I.y - ce.y)
    } : null, Po = D ? "move" : ze || r === "draw" || r === "multiselect" ? "crosshair" : "default";
    return /* @__PURE__ */ v.jsx(
      "div",
      {
        ref: re,
        className: "flex-1 overflow-hidden relative",
        style: {
          cursor: Po,
          backgroundColor: "var(--fp-bg)",
          touchAction: "none"
          // prevent browser handling touch (scroll, zoom)
        },
        onPointerMove: gs,
        onPointerUp: Ta,
        onPointerLeave: ms,
        onTouchMove: Ra,
        onTouchEnd: za,
        onContextMenu: (ne) => ne.preventDefault(),
        onDragOver: bo,
        onDrop: Oa,
        children: /* @__PURE__ */ v.jsxs(
          wM,
          {
            width: Ni,
            height: Nr,
            scaleX: $,
            scaleY: $,
            x: Ne.x,
            y: Ne.y,
            rotation: oe,
            onWheel: Va,
            onMouseDown: Ao,
            onTouchStart: Ao,
            onClick: Fa,
            onTap: ja,
            onDblClick: ys,
            onDblTap: ys,
            children: [
              /* @__PURE__ */ v.jsx(js, { children: /* @__PURE__ */ v.jsx(
                SM,
                {
                  viewportWidth: Ni,
                  viewportHeight: Nr,
                  stageX: Ne.x,
                  stageY: Ne.y,
                  stageScale: $,
                  gridSize: E,
                  visible: T,
                  isDark: P
                }
              ) }),
              /* @__PURE__ */ v.jsx(js, { children: /* @__PURE__ */ v.jsx(
                hb,
                {
                  rooms: (e == null ? void 0 : e.rooms) ?? [],
                  selectedRoomIds: o,
                  mode: n,
                  activeTool: r,
                  drawingPoints: G,
                  onSelectRoom: l,
                  onMoveRoom: k,
                  onMoveRoomPoint: Ei,
                  onMoveRoomEdge: vs,
                  gridSize: E,
                  gridEnabled: T,
                  isDark: P,
                  stageRotation: oe,
                  groupDragOffset: be ? pe : null,
                  onGroupDragMove: be ? de : void 0,
                  onGroupDragEnd: be ? () => de(null) : void 0
                }
              ) }),
              /* @__PURE__ */ v.jsx(js, { children: /* @__PURE__ */ v.jsx(
                xb,
                {
                  furniture: (e == null ? void 0 : e.furniture) ?? [],
                  selectedFurnitureIds: S,
                  mode: n,
                  activeTool: r,
                  onSelectFurniture: b,
                  onMoveFurniture: L,
                  onUpdateFurniture: M,
                  gridSize: E,
                  gridEnabled: T,
                  isDark: P,
                  stageRotation: oe,
                  groupDragOffset: be ? pe : null,
                  onGroupDragMove: be ? de : void 0,
                  onGroupDragEnd: be ? () => de(null) : void 0
                }
              ) }),
              /* @__PURE__ */ v.jsx(js, { children: /* @__PURE__ */ v.jsx(
                yb,
                {
                  entities: (e == null ? void 0 : e.entities) ?? [],
                  hass: A,
                  selectedEntityIds: a,
                  mode: n,
                  activeTool: r,
                  onSelectEntity: c,
                  onMoveEntity: x,
                  gridSize: E,
                  gridEnabled: T,
                  isDark: P,
                  stageRotation: oe,
                  groupDragOffset: be ? pe : null,
                  onGroupDragMove: be ? de : void 0,
                  onGroupDragEnd: be ? () => de(null) : void 0,
                  defaultIconSize: R,
                  domainIconSizes: V
                }
              ) }),
              n === "edit" && (() => {
                const ne = -Ne.x / $, je = -Ne.y / $, Ae = ne + Ni / $, Ve = je + Nr / $, Fe = 200, Oe = P ? "rgba(239,68,68,0.25)" : "rgba(239,68,68,0.2)", Ze = 1.5 / $;
                return /* @__PURE__ */ v.jsxs(js, { listening: !1, children: [
                  /* @__PURE__ */ v.jsx(
                    _a,
                    {
                      points: [ne - Fe, 0, Ae + Fe, 0],
                      stroke: Oe,
                      strokeWidth: Ze,
                      listening: !1
                    }
                  ),
                  /* @__PURE__ */ v.jsx(
                    _a,
                    {
                      points: [0, je - Fe, 0, Ve + Fe],
                      stroke: Oe,
                      strokeWidth: Ze,
                      listening: !1
                    }
                  ),
                  /* @__PURE__ */ v.jsx(fo, { x: 0, y: 0, radius: 3.5, fill: "#ef4444", opacity: 0.75, listening: !1 }),
                  /* @__PURE__ */ v.jsx(Ju, { x: 6, y: -4, text: "0,0", fontSize: 9, fill: P ? "#666" : "#aaa", listening: !1 })
                ] });
              })(),
              /* @__PURE__ */ v.jsx(js, { children: Hr && /* @__PURE__ */ v.jsx(
                W5,
                {
                  x: Hr.x,
                  y: Hr.y,
                  width: Hr.width,
                  height: Hr.height,
                  fill: wb(Vt, 0.08),
                  stroke: Vt,
                  strokeWidth: 1 / $,
                  dash: [6 / $, 4 / $],
                  listening: !1
                }
              ) })
            ]
          }
        )
      }
    );
  }
), Lb = 180, Ab = 0.45, bb = 0.85;
function su(t, e) {
  switch (t) {
    case "hidden":
      return 0;
    case "peek":
      return Lb;
    case "half":
      return e * Ab;
    case "full":
      return e * bb;
  }
}
function Pb({ children: t, targetSnap: e, isDark: n }) {
  const [r, o] = z.useState(0), [a, l] = z.useState(!1), c = z.useRef({ startY: 0, startHeight: 0 }), d = z.useRef(e), p = typeof window < "u" ? window.innerHeight : 800;
  z.useEffect(() => {
    e !== d.current && (d.current = e, o(su(e, p)));
  }, [e, p]), z.useEffect(() => {
    o(su(e, p));
  }, []);
  const y = z.useCallback(
    (b) => {
      l(!0), c.current = { startY: b.clientY, startHeight: r }, b.currentTarget.setPointerCapture(b.pointerId);
    },
    [r]
  ), k = z.useCallback(
    (b) => {
      if (!a) return;
      const L = c.current.startY - b.clientY, M = Math.max(0, Math.min(p * 0.92, c.current.startHeight + L));
      o(M);
    },
    [a, p]
  ), x = z.useCallback(() => {
    if (!a) return;
    l(!1);
    const b = ["hidden", "peek", "half", "full"];
    let L = "peek", M = 1 / 0;
    for (const g of b) {
      const C = Math.abs(r - su(g, p));
      C < M && (M = C, L = g);
    }
    o(su(L, p));
  }, [a, r, p]);
  if (!(r > 0 || e !== "hidden")) return null;
  const m = n ? "rgba(30, 30, 30, 0.96)" : "rgba(255, 255, 255, 0.96)", S = n ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  return /* @__PURE__ */ v.jsx(
    "div",
    {
      style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 30,
        padding: "0 8px 8px"
      },
      children: /* @__PURE__ */ v.jsxs(
        "div",
        {
          style: {
            width: "100%",
            maxWidth: 520,
            height: Math.max(r, 0),
            borderRadius: 16,
            backgroundColor: m,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 -2px 20px rgba(0,0,0,0.10), 0 0 1px rgba(0,0,0,0.15)",
            border: `1px solid ${S}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            transition: a ? "none" : "height 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
            pointerEvents: "auto"
          },
          children: [
            /* @__PURE__ */ v.jsx(
              "div",
              {
                onPointerDown: y,
                onPointerMove: k,
                onPointerUp: x,
                onPointerCancel: x,
                style: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px 0 4px",
                  cursor: a ? "grabbing" : "grab",
                  touchAction: "none",
                  flexShrink: 0,
                  userSelect: "none"
                },
                children: /* @__PURE__ */ v.jsx(
                  "div",
                  {
                    style: {
                      width: 36,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: n ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ v.jsx(
              "div",
              {
                style: {
                  flex: 1,
                  overflowY: "auto",
                  overflowX: "hidden",
                  minHeight: 0
                },
                children: t
              }
            )
          ]
        }
      )
    }
  );
}
function Eb({ children: t, targetSnap: e, isDark: n }) {
  const r = e !== "hidden", o = n ? "rgba(30, 30, 30, 0.96)" : "rgba(255, 255, 255, 0.96)", a = n ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  return /* @__PURE__ */ v.jsx(
    "div",
    {
      style: {
        position: "absolute",
        top: 64,
        right: 12,
        bottom: 12,
        width: 360,
        borderRadius: 16,
        backgroundColor: o,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.10), 0 0 1px rgba(0,0,0,0.15)",
        border: `1px solid ${a}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        pointerEvents: "auto",
        transform: r ? "translateX(0)" : "translateX(calc(100% + 24px))",
        transition: "transform 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
        zIndex: 30
      },
      children: /* @__PURE__ */ v.jsx(
        "div",
        {
          style: {
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            minHeight: 0
          },
          children: t
        }
      )
    }
  );
}
const Nb = ["top", "middle", "bottom"], Hb = ["left", "center", "right"], Vb = [
  "light",
  "switch",
  "cover",
  "sensor",
  "binary_sensor",
  "climate",
  "fan",
  "camera",
  "media_player",
  "lock"
];
function Tb({
  v: t,
  h: e,
  onChange: n,
  isDark: r
}) {
  return /* @__PURE__ */ v.jsx(
    "div",
    {
      style: {
        display: "inline-grid",
        gridTemplateColumns: "repeat(3, 28px)",
        gridTemplateRows: "repeat(3, 28px)",
        gap: 3,
        borderRadius: 8,
        padding: 3,
        backgroundColor: r ? "#2a2a2a" : "#f0f0f0"
      },
      children: Nb.map(
        (o) => Hb.map((a) => {
          const l = t === o && e === a;
          return /* @__PURE__ */ v.jsx(
            "button",
            {
              onClick: () => n(o, a),
              title: `${o} ${a}`,
              style: {
                width: 28,
                height: 28,
                borderRadius: 5,
                border: "none",
                cursor: "pointer",
                backgroundColor: l ? "var(--fp-accent)" : r ? "#3a3a3a" : "#e0e0e0",
                transition: "background 0.15s",
                outline: "none"
              },
              children: /* @__PURE__ */ v.jsx(
                "span",
                {
                  style: {
                    display: "block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    margin: "auto",
                    backgroundColor: l ? "#fff" : r ? "#777" : "#999"
                  }
                }
              )
            },
            `${o}-${a}`
          );
        })
      )
    }
  );
}
function Rb(t) {
  let e = 1 / 0, n = 1 / 0, r = -1 / 0, o = -1 / 0;
  for (const a of t)
    a.x < e && (e = a.x), a.y < n && (n = a.y), a.x > r && (r = a.x), a.y > o && (o = a.y);
  return { minX: e, minY: n, maxX: r, maxY: o };
}
function T7(t, e, n) {
  const r = Rb(t.points), o = 30, a = r.minX + o, l = r.minY + o, c = r.maxX - o, d = r.maxY - o, p = e.filter(
    (w) => w.x >= r.minX && w.x <= r.maxX && w.y >= r.minY && w.y <= r.maxY
  ), y = Math.max(n, 30);
  for (let w = l; w <= d; w += y)
    for (let m = a; m <= c; m += y) {
      const S = Math.round(m / n) * n, b = Math.round(w / n) * n;
      if (!p.some(
        (M) => Math.abs(M.x - S) < y * 0.8 && Math.abs(M.y - b) < y * 0.8
      )) return { x: S, y: b };
    }
  const k = (r.minX + r.maxX) / 2, x = (r.minY + r.maxY) / 2;
  return { x: Math.round(k / n) * n, y: Math.round(x / n) * n };
}
function R7(t, e) {
  var r;
  const n = e.states[t];
  return ((r = n == null ? void 0 : n.attributes) == null ? void 0 : r.friendly_name) ?? t.split(".")[1];
}
function zb({
  room: t,
  floor: e,
  onUpdate: n,
  onDelete: r,
  haAreas: o,
  hass: a,
  isDark: l,
  getEntitiesForArea: c,
  onAddEntity: d
}) {
  const { resolveEntityIcon: p } = un(), y = {
    backgroundColor: l ? "#333" : "#fff",
    borderColor: l ? "#555" : "#d1d5db",
    color: "var(--fp-text)"
  }, { placedIds: k, unplacedEntities: x } = z.useMemo(() => {
    const b = c(t.ha_area_id).filter(
      (C) => Vb.includes(C.entity_id.split(".")[0])
    ), L = new Set(e.entities.map((C) => C.entity_id)), M = /* @__PURE__ */ new Set(), g = [];
    for (const C of b)
      L.has(C.entity_id) ? M.add(C.entity_id) : g.push(C);
    return { placedIds: M, unplacedEntities: g };
  }, [t.ha_area_id, c, e.entities]), w = (S) => {
    const b = T7(t, e.entities, 20);
    d(S, b.x, b.y);
  }, m = () => {
    let S = [...e.entities];
    for (const b of x) {
      const L = T7(t, S, 20), M = d(b.entity_id, L.x, L.y);
      M && S.push(M);
    }
  };
  return /* @__PURE__ */ v.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ v.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide", children: "Edit Room" }),
    /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1", style: { color: "var(--fp-text-secondary)" }, children: "Name" }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "text",
          value: t.name,
          onChange: (S) => n(t.id, { name: S.target.value }),
          className: "w-full px-3 py-2 rounded border text-sm focus:outline-none focus:border-blue-500",
          style: y
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1", style: { color: "var(--fp-text-secondary)" }, children: "Home Assistant Area" }),
      /* @__PURE__ */ v.jsxs(
        "select",
        {
          value: t.ha_area_id ?? "",
          onChange: (S) => {
            var b;
            return n(t.id, {
              ha_area_id: S.target.value || null,
              name: S.target.value ? ((b = o.find((L) => L.area_id === S.target.value)) == null ? void 0 : b.name) ?? t.name : t.name
            });
          },
          className: "w-full px-3 py-2 rounded border text-sm focus:outline-none focus:border-blue-500",
          style: y,
          children: [
            /* @__PURE__ */ v.jsx("option", { value: "", children: "-- Not linked --" }),
            o.map((S) => /* @__PURE__ */ v.jsx("option", { value: S.area_id, children: S.name }, S.area_id))
          ]
        }
      )
    ] }),
    t.ha_area_id && (x.length > 0 || k.size > 0) && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx("hr", { style: { borderColor: "var(--fp-border)" } }),
      /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ v.jsx("h4", { className: "text-xs font-semibold uppercase", style: { color: "var(--fp-text-secondary)" }, children: "Area Entities" }),
          x.length > 1 && /* @__PURE__ */ v.jsxs(
            "button",
            {
              onClick: m,
              className: "text-xs px-2 py-0.5 rounded",
              style: {
                backgroundColor: "var(--fp-accent)",
                color: "#fff"
              },
              children: [
                "Add All (",
                x.length,
                ")"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "space-y-0.5", style: { maxHeight: 280, overflowY: "auto" }, children: [
          x.map((S) => {
            var g;
            const b = S.entity_id.split(".")[0], L = ((g = a.states[S.entity_id]) == null ? void 0 : g.state) ?? "unknown", { icon: M } = p(b, L);
            return /* @__PURE__ */ v.jsxs(
              "div",
              {
                className: "flex items-center gap-2 px-2 py-1.5 rounded text-sm",
                style: { color: "var(--fp-text)" },
                children: [
                  /* @__PURE__ */ v.jsx(an, { icon: M, size: 16 }),
                  /* @__PURE__ */ v.jsx("span", { className: "truncate flex-1", children: R7(S.entity_id, a) }),
                  /* @__PURE__ */ v.jsx(
                    "button",
                    {
                      onClick: () => w(S.entity_id),
                      className: "flex-shrink-0 text-xs px-2 py-0.5 rounded",
                      style: {
                        backgroundColor: l ? "#333" : "#e8e8e8",
                        color: "var(--fp-text)"
                      },
                      onMouseEnter: (C) => C.currentTarget.style.backgroundColor = "var(--fp-accent)",
                      onMouseLeave: (C) => C.currentTarget.style.backgroundColor = l ? "#333" : "#e8e8e8",
                      children: "Add"
                    }
                  )
                ]
              },
              S.entity_id
            );
          }),
          Array.from(k).map((S) => {
            var g;
            const b = S.split(".")[0], L = ((g = a.states[S]) == null ? void 0 : g.state) ?? "unknown", { icon: M } = p(b, L);
            return /* @__PURE__ */ v.jsxs(
              "div",
              {
                className: "flex items-center gap-2 px-2 py-1.5 rounded text-sm",
                style: { color: "var(--fp-text-secondary)", opacity: 0.6 },
                children: [
                  /* @__PURE__ */ v.jsx(an, { icon: M, size: 16 }),
                  /* @__PURE__ */ v.jsx("span", { className: "truncate flex-1", children: R7(S, a) }),
                  /* @__PURE__ */ v.jsx("span", { className: "flex-shrink-0 text-xs", style: { color: Vt }, children: "Placed" })
                ]
              },
              S
            );
          })
        ] }),
        x.length === 0 && k.size > 0 && /* @__PURE__ */ v.jsx("p", { className: "text-xs mt-1", style: { color: "var(--fp-text-secondary)" }, children: "All area entities are placed." })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "checkbox",
          checked: t.label_visible !== !1,
          onChange: (S) => n(t.id, { label_visible: S.target.checked })
        }
      ),
      "Show label"
    ] }),
    t.label_visible !== !1 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1.5", style: { color: "var(--fp-text-secondary)" }, children: "Label position" }),
      /* @__PURE__ */ v.jsx(
        Tb,
        {
          v: t.label_v ?? "middle",
          h: t.label_h ?? "center",
          onChange: (S, b) => n(t.id, { label_v: S, label_h: b }),
          isDark: l
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: [
      t.points.length,
      " vertices"
    ] }),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        onClick: () => r(t.id),
        className: "w-full px-3 py-2 rounded text-sm bg-red-600/10 text-red-500 hover:bg-red-600/20",
        children: "Delete Room"
      }
    )
  ] });
}
const jf = [
  "light",
  "switch",
  "cover",
  "sensor",
  "binary_sensor",
  "climate",
  "fan",
  "camera",
  "media_player",
  "lock"
], Fb = {
  light: "Lights",
  switch: "Switches",
  cover: "Covers",
  sensor: "Sensors",
  binary_sensor: "Binary Sensors",
  climate: "Climate",
  fan: "Fans",
  camera: "Cameras",
  media_player: "Media Players",
  lock: "Locks"
};
function au(t) {
  var e;
  return ((e = t.attributes) == null ? void 0 : e.friendly_name) ?? t.entity_id.split(".")[1];
}
function jb({ hass: t, isDark: e }) {
  const [n, r] = z.useState(""), [o, a] = z.useState(null), { resolveEntityIcon: l, colors: c, getDomainColor: d } = un(), p = z.useMemo(() => {
    const w = Object.values(t.states), m = {};
    for (const S of w) {
      const b = S.entity_id.split(".")[0];
      if (!jf.includes(b)) continue;
      const L = au(S).toLowerCase(), M = S.entity_id.toLowerCase(), g = n.toLowerCase();
      g && !L.includes(g) && !M.includes(g) || o && b !== o || (m[b] || (m[b] = []), m[b].push(S));
    }
    for (const S of Object.keys(m))
      m[S].sort(
        (b, L) => au(b).localeCompare(au(L))
      );
    return m;
  }, [t.states, n, o]), y = Object.values(p).reduce(
    (w, m) => w + m.length,
    0
  ), k = {
    backgroundColor: e ? "#333" : "#fff",
    borderColor: e ? "#555" : "#d1d5db",
    color: "var(--fp-text)"
  }, x = (w, m) => {
    w.dataTransfer.setData("application/entity-id", m), w.dataTransfer.effectAllowed = "copy";
  };
  return /* @__PURE__ */ v.jsxs("div", { className: "p-4 space-y-3", children: [
    /* @__PURE__ */ v.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide", children: "Entities" }),
    /* @__PURE__ */ v.jsx("p", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: "Drag an entity onto the floor plan." }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        type: "text",
        value: n,
        onChange: (w) => r(w.target.value),
        placeholder: "Search entities...",
        className: "w-full px-3 py-2 rounded border text-sm focus:outline-none focus:border-blue-500",
        style: k
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: "flex flex-wrap gap-1", children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          onClick: () => a(null),
          className: "px-2 py-0.5 rounded text-xs",
          style: {
            backgroundColor: o ? e ? "#333" : "#e8e8e8" : Vt,
            color: o ? "var(--fp-text)" : "#fff"
          },
          children: "All"
        }
      ),
      jf.map((w) => {
        const { icon: m } = l(w, "on");
        return /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: () => a(o === w ? null : w),
            className: "px-2 py-0.5 rounded text-xs",
            style: {
              backgroundColor: o === w ? Vt : e ? "#333" : "#e8e8e8",
              color: o === w ? "#fff" : "var(--fp-text)"
            },
            children: /* @__PURE__ */ v.jsx(an, { icon: m, size: 14 })
          },
          w
        );
      })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: [
      y,
      " entities"
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "space-y-3", children: jf.filter((w) => {
      var m;
      return (m = p[w]) == null ? void 0 : m.length;
    }).map(
      (w) => {
        const { icon: m } = l(w, "on");
        return /* @__PURE__ */ v.jsxs("div", { children: [
          /* @__PURE__ */ v.jsxs(
            "h4",
            {
              className: "text-xs font-semibold uppercase mb-1 sticky top-0 py-1 flex items-center gap-1",
              style: {
                color: "var(--fp-text-secondary)",
                backgroundColor: "var(--fp-card)"
              },
              children: [
                /* @__PURE__ */ v.jsx(an, { icon: m, size: 14 }),
                " ",
                Fb[w],
                " (",
                p[w].length,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ v.jsx("div", { className: "space-y-0.5", children: p[w].map((S) => /* @__PURE__ */ v.jsxs(
            "div",
            {
              draggable: !0,
              onDragStart: (b) => x(b, S.entity_id),
              className: "w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 cursor-grab active:cursor-grabbing select-none",
              style: {
                backgroundColor: "transparent",
                color: "var(--fp-text)"
              },
              onMouseEnter: (b) => b.currentTarget.style.backgroundColor = "var(--fp-hover)",
              onMouseLeave: (b) => b.currentTarget.style.backgroundColor = "transparent",
              children: [
                /* @__PURE__ */ v.jsx(
                  "span",
                  {
                    className: "w-2 h-2 rounded-full flex-shrink-0",
                    style: {
                      backgroundColor: S.state === "on" || S.state === "open" || S.state === "playing" ? d(S.entity_id.split(".")[0]) : c.stateInactive
                    }
                  }
                ),
                /* @__PURE__ */ v.jsx("span", { className: "truncate", children: au(S) }),
                /* @__PURE__ */ v.jsx(
                  "span",
                  {
                    className: "text-xs ml-auto flex-shrink-0",
                    style: { color: "var(--fp-text-secondary)" },
                    children: S.state
                  }
                )
              ]
            },
            S.entity_id
          )) })
        ] }, w);
      }
    ) })
  ] });
}
function Ob({ entityId: t, entity: e, hass: n, isDark: r }) {
  const { resolveEntityIcon: o, colors: a } = un(), l = (e == null ? void 0 : e.state) ?? "unknown", c = l === "on", d = (e == null ? void 0 : e.attributes) ?? {}, p = Array.isArray(d.supported_color_modes) ? d.supported_color_modes : [], y = p.length > 0, k = p.some(
    (F) => ["color_temp", "hs", "xy", "rgb", "rgbw", "rgbww"].includes(F)
  ), x = p.includes("color_temp"), [w, m] = z.useState(
    d.brightness ?? 255
  ), [S, b] = z.useState(
    d.color_temp ?? 300
  );
  z.useEffect(() => {
    d.brightness !== void 0 && m(d.brightness), d.color_temp !== void 0 && b(d.color_temp);
  }, [d.brightness, d.color_temp]);
  const L = d.min_mireds ?? 153, M = d.max_mireds ?? 500, g = () => {
    n.callService("light", c ? "turn_off" : "turn_on", {}, { entity_id: t });
  }, C = (F) => {
    m(F), n.callService("light", "turn_on", { brightness: F }, { entity_id: t });
  }, A = (F) => {
    b(F), n.callService("light", "turn_on", { color_temp: F }, { entity_id: t });
  }, E = Math.round(w / 255 * 100), T = "#ffa726", P = "#90caf9", R = a.light, { icon: V } = o("light", l);
  return /* @__PURE__ */ v.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        onClick: g,
        className: "w-full rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 py-3",
        style: {
          backgroundColor: c ? z7(R, 0.2) : r ? "#333" : "#e8e8e8",
          color: c ? R : "var(--fp-text)",
          border: `1px solid ${c ? z7(R, 0.3) : "transparent"}`
        },
        children: [
          /* @__PURE__ */ v.jsx(an, { icon: V, size: 20 }),
          c ? "Turn Off" : "Turn On"
        ]
      }
    ),
    y && c && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
        /* @__PURE__ */ v.jsx("label", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: "Brightness" }),
        /* @__PURE__ */ v.jsxs("span", { className: "text-xs font-medium", children: [
          E,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: "relative", children: /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "range",
          min: 1,
          max: 255,
          value: w,
          onChange: (F) => C(Number(F.target.value)),
          className: "w-full accent-amber-400",
          style: {
            background: `linear-gradient(to right, #333 0%, ${R} ${E}%, ${r ? "#444" : "#ddd"} ${E}%)`,
            borderRadius: "4px",
            height: "6px"
          }
        }
      ) })
    ] }),
    x && c && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
        /* @__PURE__ */ v.jsx("label", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: "Color Temperature" }),
        /* @__PURE__ */ v.jsxs("span", { className: "text-xs font-medium", children: [
          S,
          " mireds"
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            min: L,
            max: M,
            value: S,
            onChange: (F) => A(Number(F.target.value)),
            className: "w-full",
            style: {
              background: `linear-gradient(to right, ${P}, ${T})`,
              borderRadius: "4px",
              height: "6px"
            }
          }
        ),
        /* @__PURE__ */ v.jsxs("div", { className: "flex justify-between mt-0.5", children: [
          /* @__PURE__ */ v.jsx("span", { className: "text-[10px]", style: { color: "var(--fp-text-secondary)" }, children: "Cool" }),
          /* @__PURE__ */ v.jsx("span", { className: "text-[10px]", style: { color: "var(--fp-text-secondary)" }, children: "Warm" })
        ] })
      ] })
    ] }),
    k && c && !!d.color_mode && /* @__PURE__ */ v.jsxs("div", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: [
      "Mode: ",
      String(d.color_mode),
      " ",
      Array.isArray(d.rgb_color) && /* @__PURE__ */ v.jsx("span", { className: "ml-2 inline-flex items-center gap-1", children: /* @__PURE__ */ v.jsx(
        "span",
        {
          className: "w-3 h-3 rounded-full inline-block border",
          style: {
            backgroundColor: `rgb(${d.rgb_color.join(",")})`,
            borderColor: r ? "#555" : "#ccc"
          }
        }
      ) })
    ] })
  ] });
}
function z7(t, e) {
  const n = parseInt(t.slice(1, 3), 16), r = parseInt(t.slice(3, 5), 16), o = parseInt(t.slice(5, 7), 16);
  return `rgba(${n}, ${r}, ${o}, ${e})`;
}
function Ib({ entityId: t, entity: e, hass: n, isDark: r }) {
  const { colors: o, getDomainColor: a } = un(), l = (e == null ? void 0 : e.state) ?? "unknown", c = (e == null ? void 0 : e.attributes) ?? {}, d = c.current_position, p = c.current_tilt_position, y = l === "open" || l === "opening", k = l === "opening" || l === "closing", x = () => n.callService("cover", "open_cover", {}, { entity_id: t }), w = () => n.callService("cover", "close_cover", {}, { entity_id: t }), m = () => n.callService("cover", "stop_cover", {}, { entity_id: t }), S = (C) => {
    n.callService("cover", "set_cover_position", { position: C }, { entity_id: t });
  }, b = (C) => {
    n.callService("cover", "set_cover_tilt_position", { tilt_position: C }, { entity_id: t });
  }, L = "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all", M = a("cover"), g = o.stateWarning;
  return /* @__PURE__ */ v.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          onClick: x,
          className: L,
          style: {
            backgroundColor: y && !k ? lu(M, 0.15) : r ? "#333" : "#e8e8e8",
            color: y && !k ? M : "var(--fp-text)"
          },
          children: "▲ Open"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          onClick: m,
          className: L,
          style: {
            backgroundColor: k ? lu(g, 0.15) : r ? "#333" : "#e8e8e8",
            color: k ? g : "var(--fp-text)"
          },
          children: "■ Stop"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          onClick: w,
          className: L,
          style: {
            backgroundColor: l === "closed" ? lu(M, 0.15) : r ? "#333" : "#e8e8e8",
            color: l === "closed" ? M : "var(--fp-text)"
          },
          children: "▼ Close"
        }
      )
    ] }),
    d !== void 0 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
        /* @__PURE__ */ v.jsx("label", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: "Position" }),
        /* @__PURE__ */ v.jsxs("span", { className: "text-xs font-medium", children: [
          d,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 100,
          value: d,
          onChange: (C) => S(Number(C.target.value)),
          className: "w-full accent-blue-500"
        }
      ),
      /* @__PURE__ */ v.jsxs("div", { className: "flex justify-between mt-0.5", children: [
        /* @__PURE__ */ v.jsx("span", { className: "text-[10px]", style: { color: "var(--fp-text-secondary)" }, children: "Closed" }),
        /* @__PURE__ */ v.jsx("span", { className: "text-[10px]", style: { color: "var(--fp-text-secondary)" }, children: "Open" })
      ] })
    ] }),
    p !== void 0 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
        /* @__PURE__ */ v.jsx("label", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: "Tilt" }),
        /* @__PURE__ */ v.jsxs("span", { className: "text-xs font-medium", children: [
          p,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 100,
          value: p,
          onChange: (C) => b(Number(C.target.value)),
          className: "w-full accent-blue-500"
        }
      )
    ] }),
    k && /* @__PURE__ */ v.jsx(
      "div",
      {
        className: "text-xs text-center py-1.5 rounded",
        style: { backgroundColor: lu(g, 0.1), color: g },
        children: l === "opening" ? "Opening..." : "Closing..."
      }
    )
  ] });
}
function lu(t, e) {
  const n = parseInt(t.slice(1, 3), 16), r = parseInt(t.slice(3, 5), 16), o = parseInt(t.slice(5, 7), 16);
  return `rgba(${n}, ${r}, ${o}, ${e})`;
}
function Db({ entityId: t, entity: e, hass: n, isDark: r }) {
  const { resolveEntityIcon: o, colors: a, getDomainColor: l } = un(), c = (e == null ? void 0 : e.state) ?? "unknown", d = (e == null ? void 0 : e.attributes) ?? {}, p = d.hvac_modes ?? [], y = d.fan_modes ?? [], k = d.current_temperature, x = d.temperature, w = d.min_temp ?? 7, m = d.max_temp ?? 35, S = d.target_temp_step ?? 0.5, b = d.unit_of_measurement ?? "°C", L = d.fan_mode, M = d.hvac_action, [g, C] = z.useState(x ?? 20);
  z.useEffect(() => {
    x !== void 0 && C(x);
  }, [x]);
  const A = (F) => {
    C(F), n.callService("climate", "set_temperature", { temperature: F }, { entity_id: t });
  }, E = (F) => {
    n.callService("climate", "set_hvac_mode", { hvac_mode: F }, { entity_id: t });
  }, T = (F) => {
    n.callService("climate", "set_fan_mode", { fan_mode: F }, { entity_id: t });
  }, P = c !== "off" && c !== "unknown" && c !== "unavailable", R = {
    heating: a.climate_heating,
    cooling: a.climate_cooling,
    drying: "#f59e0b",
    idle: a.stateInactive,
    off: a.stateInactive,
    fan: "#06b6d4"
  }, V = l("climate");
  return /* @__PURE__ */ v.jsxs("div", { className: "space-y-3", children: [
    k !== void 0 && /* @__PURE__ */ v.jsxs(
      "div",
      {
        className: "p-3 rounded-lg text-center",
        style: { backgroundColor: r ? "#333" : "#f0f0f0" },
        children: [
          /* @__PURE__ */ v.jsx("div", { className: "text-xs mb-1", style: { color: "var(--fp-text-secondary)" }, children: "Current" }),
          /* @__PURE__ */ v.jsxs("div", { className: "text-3xl font-light", children: [
            k,
            /* @__PURE__ */ v.jsx("span", { className: "text-base ml-0.5", children: b })
          ] }),
          M && M !== "off" && /* @__PURE__ */ v.jsx(
            "div",
            {
              className: "text-xs mt-1 capitalize",
              style: { color: R[M] ?? "var(--fp-text-secondary)" },
              children: M
            }
          )
        ]
      }
    ),
    P && x !== void 0 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
        /* @__PURE__ */ v.jsx("label", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: "Target" }),
        /* @__PURE__ */ v.jsxs("span", { className: "text-sm font-medium", children: [
          g,
          b
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: () => A(Math.max(w, g - S)),
            className: "w-8 h-8 rounded-lg text-lg flex items-center justify-center",
            style: { backgroundColor: r ? "#333" : "#e8e8e8" },
            children: "−"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            min: w,
            max: m,
            step: S,
            value: g,
            onChange: (F) => A(Number(F.target.value)),
            className: "flex-1 accent-orange-400"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: () => A(Math.min(m, g + S)),
            className: "w-8 h-8 rounded-lg text-lg flex items-center justify-center",
            style: { backgroundColor: r ? "#333" : "#e8e8e8" },
            children: "+"
          }
        )
      ] })
    ] }),
    p.length > 0 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1.5", style: { color: "var(--fp-text-secondary)" }, children: "Mode" }),
      /* @__PURE__ */ v.jsx("div", { className: "flex flex-wrap gap-1", children: p.map((F) => {
        const { icon: W } = o("climate", F);
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            onClick: () => E(F),
            className: "px-2.5 py-1.5 rounded text-xs font-medium capitalize transition-all flex items-center gap-1",
            style: {
              backgroundColor: c === F ? F7(V, 0.15) : r ? "#333" : "#e8e8e8",
              color: c === F ? V : "var(--fp-text)"
            },
            children: [
              /* @__PURE__ */ v.jsx(an, { icon: W, size: 14 }),
              " ",
              F.replace("_", " ")
            ]
          },
          F
        );
      }) })
    ] }),
    y.length > 0 && P && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1.5", style: { color: "var(--fp-text-secondary)" }, children: "Fan" }),
      /* @__PURE__ */ v.jsx("div", { className: "flex flex-wrap gap-1", children: y.map((F) => /* @__PURE__ */ v.jsx(
        "button",
        {
          onClick: () => T(F),
          className: "px-2.5 py-1.5 rounded text-xs font-medium capitalize transition-all",
          style: {
            backgroundColor: L === F ? F7(V, 0.15) : r ? "#333" : "#e8e8e8",
            color: L === F ? V : "var(--fp-text)"
          },
          children: F.replace("_", " ")
        },
        F
      )) })
    ] })
  ] });
}
function F7(t, e) {
  const n = parseInt(t.slice(1, 3), 16), r = parseInt(t.slice(3, 5), 16), o = parseInt(t.slice(5, 7), 16);
  return `rgba(${n}, ${r}, ${o}, ${e})`;
}
function Gb({ entityId: t, entity: e, hass: n, isDark: r, domain: o }) {
  var A, E, T, P, R, V, F, W;
  const { resolveEntityIcon: a, getDomainColor: l } = un(), c = (e == null ? void 0 : e.state) ?? "unknown", d = c === "on" || c === "open" || c === "playing" || c === "unlocked", p = () => {
    o === "lock" ? n.callService("lock", d ? "lock" : "unlock", {}, { entity_id: t }) : o === "media_player" ? n.callService("media_player", d ? "media_pause" : "media_play", {}, { entity_id: t }) : n.callService(o, d ? "turn_off" : "turn_on", {}, { entity_id: t });
  }, y = {
    switch: ["Turn Off", "Turn On"],
    fan: ["Turn Off", "Turn On"],
    lock: ["Lock", "Unlock"],
    media_player: ["Pause", "Play"]
  }, [k, x] = y[o] ?? ["Turn Off", "Turn On"], w = o === "lock" ? "unlocked" : o === "media_player" ? "playing" : "on", m = o === "lock" ? "locked" : o === "media_player" ? "paused" : "off", { icon: S } = a(o, w), { icon: b } = a(o, m), L = (A = e == null ? void 0 : e.attributes) == null ? void 0 : A.percentage, M = (E = e == null ? void 0 : e.attributes) == null ? void 0 : E.preset_modes, g = (T = e == null ? void 0 : e.attributes) == null ? void 0 : T.preset_mode, C = l(o);
  return /* @__PURE__ */ v.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        onClick: p,
        className: "w-full rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 py-3",
        style: {
          backgroundColor: d ? Of(C, 0.15) : r ? "#333" : "#e8e8e8",
          color: d ? C : "var(--fp-text)",
          border: `1px solid ${d ? Of(C, 0.2) : "transparent"}`
        },
        children: [
          /* @__PURE__ */ v.jsx(an, { icon: d ? S : b, size: 20 }),
          d ? k : x
        ]
      }
    ),
    o === "fan" && d && L !== void 0 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
        /* @__PURE__ */ v.jsx("label", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: "Speed" }),
        /* @__PURE__ */ v.jsxs("span", { className: "text-xs font-medium", children: [
          L,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 100,
          value: L,
          onChange: (U) => n.callService("fan", "set_percentage", { percentage: Number(U.target.value) }, { entity_id: t }),
          className: "w-full accent-blue-500"
        }
      )
    ] }),
    o === "fan" && d && M && M.length > 0 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1.5", style: { color: "var(--fp-text-secondary)" }, children: "Preset" }),
      /* @__PURE__ */ v.jsx("div", { className: "flex flex-wrap gap-1", children: M.map((U) => /* @__PURE__ */ v.jsx(
        "button",
        {
          onClick: () => n.callService("fan", "set_preset_mode", { preset_mode: U }, { entity_id: t }),
          className: "px-2.5 py-1.5 rounded text-xs font-medium capitalize",
          style: {
            backgroundColor: g === U ? Of(C, 0.15) : r ? "#333" : "#e8e8e8",
            color: g === U ? C : "var(--fp-text)"
          },
          children: U.replace("_", " ")
        },
        U
      )) })
    ] }),
    o === "media_player" && d && /* @__PURE__ */ v.jsxs("div", { className: "space-y-2", children: [
      !!((P = e == null ? void 0 : e.attributes) != null && P.media_title) && /* @__PURE__ */ v.jsxs(
        "div",
        {
          className: "p-2 rounded text-xs",
          style: { backgroundColor: r ? "#333" : "#f0f0f0" },
          children: [
            /* @__PURE__ */ v.jsx("div", { className: "font-medium truncate", children: String((R = e == null ? void 0 : e.attributes) == null ? void 0 : R.media_title) }),
            !!((V = e == null ? void 0 : e.attributes) != null && V.media_artist) && /* @__PURE__ */ v.jsx("div", { className: "truncate", style: { color: "var(--fp-text-secondary)" }, children: String((F = e == null ? void 0 : e.attributes) == null ? void 0 : F.media_artist) })
          ]
        }
      ),
      ((W = e == null ? void 0 : e.attributes) == null ? void 0 : W.volume_level) !== void 0 && /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
          /* @__PURE__ */ v.jsx("label", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: "Volume" }),
          /* @__PURE__ */ v.jsxs("span", { className: "text-xs font-medium", children: [
            Math.round(e.attributes.volume_level * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: e.attributes.volume_level,
            onChange: (U) => n.callService("media_player", "volume_set", { volume_level: Number(U.target.value) }, { entity_id: t }),
            className: "w-full accent-blue-500"
          }
        )
      ] })
    ] })
  ] });
}
function Of(t, e) {
  const n = parseInt(t.slice(1, 3), 16), r = parseInt(t.slice(3, 5), 16), o = parseInt(t.slice(5, 7), 16);
  return `rgba(${n}, ${r}, ${o}, ${e})`;
}
function Ub({ entity: t, isDark: e, domain: n }) {
  const { resolveEntityIcon: r, colors: o, getDomainColor: a } = un(), l = (t == null ? void 0 : t.state) ?? "unknown", c = (t == null ? void 0 : t.attributes) ?? {}, d = c.unit_of_measurement, p = c.device_class, { icon: y } = r(n, l, p), k = n === "binary_sensor", x = l === "on", w = parseFloat(l), S = !isNaN(w) ? w.toLocaleString() : l;
  return /* @__PURE__ */ v.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ v.jsxs(
      "div",
      {
        className: "p-4 rounded-lg text-center",
        style: { backgroundColor: e ? "#333" : "#f0f0f0" },
        children: [
          /* @__PURE__ */ v.jsx("div", { className: "text-2xl mb-1 flex justify-center", children: /* @__PURE__ */ v.jsx(an, { icon: y, size: 28 }) }),
          k ? /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ v.jsx(
              "span",
              {
                className: "w-3 h-3 rounded-full",
                style: {
                  backgroundColor: x ? a(n) : o.stateInactive,
                  boxShadow: x ? `0 0 8px ${Bb(a(n), 0.5)}` : "none"
                }
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: "text-xl font-semibold capitalize", children: l })
          ] }) : /* @__PURE__ */ v.jsxs("div", { className: "text-3xl font-light", children: [
            S,
            d && /* @__PURE__ */ v.jsx("span", { className: "text-sm ml-1", style: { color: "var(--fp-text-secondary)" }, children: d })
          ] }),
          p && /* @__PURE__ */ v.jsx("div", { className: "text-xs mt-1 capitalize", style: { color: "var(--fp-text-secondary)" }, children: p.replace("_", " ") })
        ]
      }
    ),
    (t == null ? void 0 : t.last_changed) && /* @__PURE__ */ v.jsxs("div", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: [
      "Last changed: ",
      new Date(t.last_changed).toLocaleString()
    ] })
  ] });
}
function Bb(t, e) {
  const n = parseInt(t.slice(1, 3), 16), r = parseInt(t.slice(3, 5), 16), o = parseInt(t.slice(5, 7), 16);
  return `rgba(${n}, ${r}, ${o}, ${e})`;
}
function Wb(t) {
  return t.split(".")[0];
}
function Zb(t, e) {
  var n;
  return ((n = t == null ? void 0 : t.attributes) == null ? void 0 : n.friendly_name) ?? e.split(".")[1];
}
function j7({
  placement: t,
  entity: e,
  hass: n,
  onUpdate: r,
  onRemove: o,
  isDark: a,
  isEditMode: l,
  effectiveIconSize: c
}) {
  const { colors: d, getDomainColor: p } = un(), y = Wb(t.entity_id), k = (e == null ? void 0 : e.state) ?? "unknown", x = Zb(e, t.entity_id), w = k === "on" || k === "open" || k === "playing" || k === "unlocked", m = {
    backgroundColor: a ? "#333" : "#fff",
    borderColor: a ? "#555" : "#d1d5db",
    color: "var(--fp-text)"
  };
  return /* @__PURE__ */ v.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ v.jsx("div", { className: "text-base font-medium", children: x }),
      /* @__PURE__ */ v.jsx("div", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: t.entity_id }),
      /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ v.jsx(
          "span",
          {
            className: "w-2 h-2 rounded-full",
            style: { backgroundColor: w ? p(y) : d.stateInactive }
          }
        ),
        /* @__PURE__ */ v.jsx("span", { className: "text-sm capitalize", children: k })
      ] })
    ] }),
    !l && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      y === "light" && /* @__PURE__ */ v.jsx(Ob, { entityId: t.entity_id, entity: e, hass: n, isDark: a }),
      y === "cover" && /* @__PURE__ */ v.jsx(Ib, { entityId: t.entity_id, entity: e, hass: n, isDark: a }),
      y === "climate" && /* @__PURE__ */ v.jsx(Db, { entityId: t.entity_id, entity: e, hass: n, isDark: a }),
      (y === "switch" || y === "fan" || y === "lock" || y === "media_player") && /* @__PURE__ */ v.jsx(Gb, { entityId: t.entity_id, entity: e, hass: n, isDark: a, domain: y }),
      (y === "sensor" || y === "binary_sensor") && /* @__PURE__ */ v.jsx(Ub, { entityId: t.entity_id, entity: e, isDark: a, domain: y }),
      e && Object.keys(e.attributes).length > 0 && /* @__PURE__ */ v.jsxs("details", { className: "text-xs", children: [
        /* @__PURE__ */ v.jsx(
          "summary",
          {
            className: "cursor-pointer py-1",
            style: { color: "var(--fp-text-secondary)" },
            children: "Attributes"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "div",
          {
            className: "mt-1 p-2 rounded space-y-1 max-h-40 overflow-y-auto",
            style: { backgroundColor: a ? "#222" : "#f5f5f5" },
            children: Object.entries(e.attributes).filter(([S]) => S !== "friendly_name" && S !== "icon").map(([S, b]) => /* @__PURE__ */ v.jsxs("div", { className: "flex justify-between gap-2", children: [
              /* @__PURE__ */ v.jsx("span", { style: { color: "var(--fp-text-secondary)" }, children: S }),
              /* @__PURE__ */ v.jsx("span", { className: "text-right truncate", children: String(b) })
            ] }, S))
          }
        )
      ] })
    ] }),
    l && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx("hr", { style: { borderColor: "var(--fp-border)" } }),
      /* @__PURE__ */ v.jsx("h4", { className: "text-xs font-semibold uppercase", style: { color: "var(--fp-text-secondary)" }, children: "Placement Settings" }),
      /* @__PURE__ */ v.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "checkbox",
            checked: t.show_icon !== !1,
            onChange: (S) => r(t.id, { show_icon: S.target.checked })
          }
        ),
        "Show icon"
      ] }),
      /* @__PURE__ */ v.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "checkbox",
            checked: t.label_visible,
            onChange: (S) => r(t.id, { label_visible: S.target.checked })
          }
        ),
        "Show name"
      ] }),
      /* @__PURE__ */ v.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "checkbox",
            checked: t.show_state !== !1 && !!t.show_state,
            onChange: (S) => r(t.id, { show_state: S.target.checked })
          }
        ),
        "Show state"
      ] }),
      /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ v.jsxs("label", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: [
            "Icon size (",
            t.icon_size ?? c ?? 36,
            "px)"
          ] }),
          t.icon_size != null && /* @__PURE__ */ v.jsx(
            "button",
            {
              onClick: () => r(t.id, { icon_size: void 0 }),
              className: "text-xs px-1.5 py-0.5 rounded",
              style: {
                backgroundColor: a ? "#444" : "#ddd",
                fontSize: 10,
                border: "none",
                cursor: "pointer",
                color: "var(--fp-text)"
              },
              children: "Reset"
            }
          )
        ] }),
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            min: 16,
            max: 80,
            value: t.icon_size ?? c ?? 36,
            onChange: (S) => r(t.id, { icon_size: Number(S.target.value) }),
            className: "w-full",
            style: m
          }
        )
      ] }),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          onClick: () => o(t.id),
          className: "w-full px-3 py-2 rounded text-sm bg-red-600/10 text-red-500 hover:bg-red-600/20",
          children: "Remove from Floor Plan"
        }
      )
    ] })
  ] });
}
function yl(t) {
  return t.split(".")[0];
}
function Yb(t, e) {
  var n;
  return ((n = t == null ? void 0 : t.attributes) == null ? void 0 : n.friendly_name) ?? e.split(".")[1];
}
function O7({
  floor: t,
  selectedRoomIds: e,
  selectedEntityIds: n,
  hass: r,
  onDeleteSelected: o,
  isDark: a,
  isEditMode: l
}) {
  const { colors: c, getDomainColor: d } = un(), p = t.rooms.filter((P) => e.includes(P.id)), y = t.entities.filter((P) => n.includes(P.id)), k = /* @__PURE__ */ new Set(), x = [];
  for (const P of y)
    k.has(P.entity_id) || (k.add(P.entity_id), x.push(P));
  const w = p.length + x.length, m = {};
  for (const P of x) {
    const R = yl(P.entity_id);
    m[R] || (m[R] = []), m[R].push(P);
  }
  const S = m.light ?? [], b = m.cover ?? [], L = ["light", "switch", "fan", "media_player", "lock"], M = x.filter(
    (P) => L.includes(yl(P.entity_id))
  ), g = () => {
    for (const P of M) {
      const R = yl(P.entity_id);
      R === "cover" ? r.callService("cover", "open_cover", {}, { entity_id: P.entity_id }) : R === "lock" ? r.callService("lock", "unlock", {}, { entity_id: P.entity_id }) : r.callService(R, "turn_on", {}, { entity_id: P.entity_id });
    }
  }, C = () => {
    for (const P of M) {
      const R = yl(P.entity_id);
      R === "cover" ? r.callService("cover", "close_cover", {}, { entity_id: P.entity_id }) : R === "lock" ? r.callService("lock", "lock", {}, { entity_id: P.entity_id }) : r.callService(R, "turn_off", {}, { entity_id: P.entity_id });
    }
  }, A = (P) => {
    for (const R of S)
      r.callService("light", "turn_on", { brightness: P }, { entity_id: R.entity_id });
  }, E = (P) => {
    for (const R of b)
      r.callService("cover", "set_cover_position", { position: P }, { entity_id: R.entity_id });
  }, T = "flex-1 py-2 rounded-lg text-sm font-medium transition-all";
  return /* @__PURE__ */ v.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ v.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide", children: "Selection" }),
    /* @__PURE__ */ v.jsxs("div", { className: "text-sm", style: { color: "var(--fp-text-secondary)" }, children: [
      w,
      " items selected"
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "space-y-1.5", children: [
      p.length > 0 && /* @__PURE__ */ v.jsxs("div", { className: "text-xs", children: [
        /* @__PURE__ */ v.jsxs("span", { className: "font-medium", children: [
          p.length,
          " room",
          p.length > 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ v.jsx("div", { className: "ml-2 mt-0.5 space-y-0.5", style: { color: "var(--fp-text-secondary)" }, children: p.map((P) => /* @__PURE__ */ v.jsx("div", { children: P.name }, P.id)) })
      ] }),
      x.length > 0 && /* @__PURE__ */ v.jsxs("div", { className: "text-xs", children: [
        /* @__PURE__ */ v.jsxs("span", { className: "font-medium", children: [
          x.length,
          " entit",
          x.length > 1 ? "ies" : "y",
          y.length > x.length && /* @__PURE__ */ v.jsxs("span", { style: { color: "var(--fp-text-secondary)", fontWeight: 400 }, children: [
            " ",
            "(",
            y.length,
            " placements)"
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "ml-2 mt-0.5 space-y-0.5", style: { color: "var(--fp-text-secondary)" }, children: [
          x.slice(0, 8).map((P) => {
            var R, V;
            return /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ v.jsx(
                "span",
                {
                  className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
                  style: {
                    backgroundColor: ((R = r.states[P.entity_id]) == null ? void 0 : R.state) === "on" || ((V = r.states[P.entity_id]) == null ? void 0 : V.state) === "open" ? d(yl(P.entity_id)) : c.stateInactive
                  }
                }
              ),
              Yb(r.states[P.entity_id], P.entity_id)
            ] }, P.entity_id);
          }),
          x.length > 8 && /* @__PURE__ */ v.jsxs("div", { style: { color: "var(--fp-text-secondary)" }, children: [
            "+",
            x.length - 8,
            " more"
          ] })
        ] })
      ] })
    ] }),
    !l && M.length > 0 && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx("hr", { style: { borderColor: "var(--fp-border)" } }),
      /* @__PURE__ */ v.jsx("h4", { className: "text-xs font-semibold uppercase", style: { color: "var(--fp-text-secondary)" }, children: "Bulk Actions" }),
      /* @__PURE__ */ v.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: g,
            className: T,
            style: {
              backgroundColor: Kb(c.fallback, 0.15),
              color: c.fallback
            },
            children: "All On"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: C,
            className: T,
            style: {
              backgroundColor: a ? "#333" : "#e8e8e8",
              color: "var(--fp-text)"
            },
            children: "All Off"
          }
        )
      ] })
    ] }),
    !l && S.length > 0 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("div", { className: "flex justify-between items-center mb-1.5", children: /* @__PURE__ */ v.jsxs("label", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: [
        "Brightness (",
        S.length,
        " light",
        S.length > 1 ? "s" : "",
        ")"
      ] }) }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "range",
          min: 1,
          max: 255,
          defaultValue: 128,
          onChange: (P) => A(Number(P.target.value)),
          className: "w-full accent-amber-400"
        }
      )
    ] }),
    !l && b.length > 0 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("div", { className: "flex justify-between items-center mb-1.5", children: /* @__PURE__ */ v.jsxs("label", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: [
        "Cover Position (",
        b.length,
        " cover",
        b.length > 1 ? "s" : "",
        ")"
      ] }) }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 100,
          defaultValue: 50,
          onChange: (P) => E(Number(P.target.value)),
          className: "w-full accent-blue-500"
        }
      )
    ] }),
    l && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx("p", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: "Drag to move all selected items together." }),
      /* @__PURE__ */ v.jsx("hr", { style: { borderColor: "var(--fp-border)" } }),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          onClick: o,
          className: "w-full px-3 py-2 rounded text-sm bg-red-600/10 text-red-500 hover:bg-red-600/20",
          children: [
            "Delete Selected (",
            w,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("p", { className: "text-[10px]", style: { color: "var(--fp-text-secondary)" }, children: "Shift+click to add/remove items. Ctrl+A to select all." })
    ] })
  ] });
}
function Kb(t, e) {
  const n = parseInt(t.slice(1, 3), 16), r = parseInt(t.slice(3, 5), 16), o = parseInt(t.slice(5, 7), 16);
  return `rgba(${n}, ${r}, ${o}, ${e})`;
}
const I7 = "default", D7 = "emoji", Xb = [
  {
    label: "Vivid",
    colors: [
      "#ef4444",
      "#f97316",
      "#f59e0b",
      "#eab308",
      "#84cc16",
      "#22c55e",
      "#10b981",
      "#14b8a6",
      "#06b6d4",
      "#0ea5e9",
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
      "#d946ef",
      "#ec4899",
      "#f43f5e",
      "#78716c",
      "#6b7280",
      "#a3a3a3"
    ]
  },
  {
    label: "Pastel",
    colors: [
      "#fca5a5",
      "#fdba74",
      "#fcd34d",
      "#fde68a",
      "#bef264",
      "#86efac",
      "#6ee7b7",
      "#99f6e4",
      "#a5f3fc",
      "#93c5fd",
      "#a5b4fc",
      "#c4b5fd",
      "#d8b4fe",
      "#e9d5ff",
      "#f0abfc",
      "#f9a8d4",
      "#fda4af",
      "#d6d3d1",
      "#d4d4d8",
      "#e5e5e5"
    ]
  },
  {
    label: "Mono",
    colors: [
      "#fafafa",
      "#e5e5e5",
      "#d4d4d4",
      "#a3a3a3",
      "#737373",
      "#525252",
      "#404040",
      "#262626",
      "#171717",
      "#0a0a0a"
    ]
  },
  {
    label: "Color Blind",
    colors: [
      "#ee7733",
      "#0077bb",
      "#33bbee",
      "#ee3377",
      "#cc3311",
      "#009988",
      "#aa3377",
      "#ccbb44",
      "#888888",
      "#000000"
    ]
  }
], $b = {
  system: "System",
  light: "Light",
  dark: "Dark"
}, Qb = {
  light: "Lights",
  switch: "Switches",
  sensor: "Sensors",
  binary_sensor: "Binary Sensors",
  climate_heating: "Heating",
  climate_cooling: "Cooling",
  cover: "Covers",
  lock: "Locks",
  media_player: "Media",
  fan: "Fans",
  vacuum: "Vacuums",
  automation: "Automations",
  camera: "Cameras"
}, Y5 = {
  light: "Lights",
  switch: "Switches",
  sensor: "Sensors",
  binary_sensor: "Binary Sensors",
  climate: "Climate",
  cover: "Covers",
  lock: "Locks",
  media_player: "Media",
  fan: "Fans",
  vacuum: "Vacuums",
  automation: "Automations",
  camera: "Cameras"
}, qb = [
  "sofa",
  "chair",
  "table",
  "desk",
  "bed",
  "wardrobe",
  "bookshelf",
  "tv",
  "plant",
  "door",
  "window",
  "toilet",
  "shower",
  "sink",
  "bathtub",
  "fridge",
  "oven",
  "dishwasher"
], Im = {
  sofa: "Sofa",
  chair: "Chair",
  table: "Table",
  desk: "Desk",
  bed: "Bed",
  wardrobe: "Wardrobe",
  bookshelf: "Bookshelf",
  tv: "TV",
  plant: "Plant",
  door: "Door",
  window: "Window",
  toilet: "Toilet",
  shower: "Shower",
  sink: "Sink",
  bathtub: "Bathtub",
  fridge: "Fridge",
  oven: "Oven",
  dishwasher: "Dishwasher"
};
function Jb() {
  const t = [], e = /* @__PURE__ */ new Set();
  for (const n of Object.values(mi)) {
    const r = `${n.id}::__fallback__`;
    e.has(r) || (e.add(r), t.push({
      packId: n.id,
      packName: n.name,
      domain: "__fallback__",
      icon: n.fallback.icon,
      keywords: `${n.name} ${n.id} fallback`.toLowerCase()
    }));
    for (const [o, a] of Object.entries(n.domains)) {
      const l = `${n.id}::${o}`;
      if (e.has(l) || (e.add(l), t.push({
        packId: n.id,
        packName: n.name,
        domain: o,
        icon: a.default.icon,
        keywords: `${n.name} ${n.id} ${o.replace(/_/g, " ")}`.toLowerCase()
      })), a.states)
        for (const [c, d] of Object.entries(a.states)) {
          const p = `${n.id}::${o}::state::${c}`;
          e.has(p) || JSON.stringify(d.icon) !== JSON.stringify(a.default.icon) && (e.add(p), t.push({
            packId: n.id,
            packName: n.name,
            domain: o,
            icon: d.icon,
            keywords: `${n.name} ${n.id} ${o.replace(/_/g, " ")} ${c}`.toLowerCase()
          }));
        }
      if (a.deviceClasses)
        for (const [c, d] of Object.entries(a.deviceClasses)) {
          const p = `${n.id}::${o}::${c}`;
          if (!e.has(p) && (e.add(p), t.push({
            packId: n.id,
            packName: n.name,
            domain: o,
            deviceClass: c,
            icon: d.default.icon,
            keywords: `${n.name} ${n.id} ${o.replace(/_/g, " ")} ${c.replace(/_/g, " ")}`.toLowerCase()
          }), d.states))
            for (const [y, k] of Object.entries(d.states)) {
              const x = `${n.id}::${o}::${c}::${y}`;
              e.has(x) || JSON.stringify(k.icon) !== JSON.stringify(d.default.icon) && (e.add(x), t.push({
                packId: n.id,
                packName: n.name,
                domain: o,
                deviceClass: c,
                icon: k.icon,
                keywords: `${n.name} ${n.id} ${o.replace(/_/g, " ")} ${c.replace(/_/g, " ")} ${y}`.toLowerCase()
              }));
            }
        }
    }
  }
  return t;
}
let If = null;
function eP() {
  return If || (If = Jb()), If;
}
function tP({
  target: t,
  isDark: e,
  onSelect: n,
  onClose: r
}) {
  const [o, a] = z.useState(""), l = z.useRef(null), c = z.useMemo(() => eP(), []);
  z.useEffect(() => {
    setTimeout(() => {
      var x;
      return (x = l.current) == null ? void 0 : x.focus();
    }, 50);
  }, []);
  const d = z.useMemo(() => {
    const x = o.trim().toLowerCase();
    if (!x) return c;
    const w = x.split(/\s+/);
    return c.filter((m) => w.every((S) => m.keywords.includes(S)));
  }, [o, c]), p = z.useMemo(() => {
    const x = /* @__PURE__ */ new Map();
    for (const w of d) {
      const m = x.get(w.packId) ?? [];
      m.push(w), x.set(w.packId, m);
    }
    return x;
  }, [d]), y = z.useCallback(
    (x) => {
      const w = {
        pack_id: x.packId,
        domain: x.domain,
        device_class: x.deviceClass
      };
      n(w), r();
    },
    [n, r]
  ), k = t.type === "domain" ? Y5[t.domain] ?? t.domain : Im[t.furnitureType] ?? t.furnitureType;
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 20,
        backgroundColor: e ? "#1e1e1e" : "#fff",
        display: "flex",
        flexDirection: "column"
      },
      children: [
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-3 py-2",
            style: { borderBottom: `1px solid ${e ? "#333" : "#e0e0e0"}` },
            children: [
              /* @__PURE__ */ v.jsx(
                "button",
                {
                  onClick: r,
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                    color: "var(--fp-text)",
                    padding: "2px 4px"
                  },
                  children: /* @__PURE__ */ v.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ v.jsx("path", { d: "M19 12H5m7-7-7 7 7 7" }) })
                }
              ),
              /* @__PURE__ */ v.jsxs("span", { className: "text-sm font-medium flex-1", children: [
                "Icon for ",
                k
              ] })
            ]
          }
        ),
        /* @__PURE__ */ v.jsxs("div", { className: "px-3 py-2", children: [
          /* @__PURE__ */ v.jsx(
            "input",
            {
              ref: l,
              type: "text",
              value: o,
              onChange: (x) => a(x.target.value),
              placeholder: "Search icons... (e.g. light, mdi, temperature)",
              className: "w-full px-3 py-2 rounded-lg text-sm outline-none",
              style: {
                backgroundColor: e ? "#2a2a2a" : "#f0f0f0",
                color: "var(--fp-text)",
                border: `1px solid ${e ? "#444" : "#ddd"}`
              }
            }
          ),
          /* @__PURE__ */ v.jsxs("div", { className: "text-xs mt-1", style: { color: "var(--fp-text-secondary)" }, children: [
            d.length,
            " icons found"
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "flex-1 overflow-y-auto px-3 pb-3", style: { scrollbarWidth: "thin" }, children: [
          Array.from(p.entries()).map(([x, w]) => {
            var m;
            return /* @__PURE__ */ v.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ v.jsx(
                "div",
                {
                  className: "text-xs font-semibold mb-1.5 sticky top-0 py-1 px-1",
                  style: {
                    color: "var(--fp-text-secondary)",
                    backgroundColor: e ? "#1e1e1e" : "#fff"
                  },
                  children: ((m = mi[x]) == null ? void 0 : m.name) ?? x
                }
              ),
              /* @__PURE__ */ v.jsx(
                "div",
                {
                  className: "grid gap-1",
                  style: { gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))" },
                  children: w.map((S, b) => {
                    const L = [S.domain, S.deviceClass].filter(Boolean).join(" / ");
                    return /* @__PURE__ */ v.jsx(
                      "button",
                      {
                        onClick: () => y(S),
                        title: L,
                        className: "flex items-center justify-center rounded-lg transition-colors",
                        style: {
                          width: "100%",
                          aspectRatio: "1",
                          backgroundColor: e ? "#2a2a2a" : "#f5f5f5",
                          border: "1.5px solid transparent",
                          cursor: "pointer"
                        },
                        onMouseEnter: (M) => {
                          M.currentTarget.style.borderColor = Vt, M.currentTarget.style.backgroundColor = e ? "#333" : "#e8e8e8";
                        },
                        onMouseLeave: (M) => {
                          M.currentTarget.style.borderColor = "transparent", M.currentTarget.style.backgroundColor = e ? "#2a2a2a" : "#f5f5f5";
                        },
                        children: /* @__PURE__ */ v.jsx(an, { icon: S.icon, size: 22 })
                      },
                      b
                    );
                  })
                }
              )
            ] }, x);
          }),
          d.length === 0 && /* @__PURE__ */ v.jsxs("div", { className: "text-center py-8 text-sm", style: { color: "var(--fp-text-secondary)" }, children: [
            'No icons match "',
            o,
            '"'
          ] })
        ] })
      ]
    }
  );
}
function nP({
  colorKey: t,
  label: e,
  effectiveColor: n,
  isOverridden: r,
  isDark: o,
  isExpanded: a,
  onToggle: l,
  onChange: c,
  onReset: d
}) {
  const p = o ? "#2a2a2a" : "#f5f5f5";
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer",
        style: { backgroundColor: p },
        onClick: l,
        children: [
          /* @__PURE__ */ v.jsx(
            "span",
            {
              style: {
                width: 22,
                height: 22,
                borderRadius: 5,
                backgroundColor: n,
                border: `2px solid ${o ? "#555" : "#ccc"}`,
                flexShrink: 0
              }
            }
          ),
          /* @__PURE__ */ v.jsx("span", { className: "text-xs flex-1", children: e }),
          r && /* @__PURE__ */ v.jsx(
            "button",
            {
              onClick: (y) => {
                y.stopPropagation(), d();
              },
              className: "text-xs px-1.5 py-0.5 rounded",
              style: {
                backgroundColor: o ? "#444" : "#ddd",
                fontSize: 10,
                border: "none",
                cursor: "pointer",
                color: "var(--fp-text)"
              },
              children: "Reset"
            }
          ),
          /* @__PURE__ */ v.jsx(
            "svg",
            {
              width: "10",
              height: "10",
              viewBox: "0 0 10 10",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              style: {
                transform: a ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.15s",
                color: "var(--fp-text-secondary)"
              },
              children: /* @__PURE__ */ v.jsx("path", { d: "M2 3.5l3 3 3-3" })
            }
          )
        ]
      }
    ),
    a && /* @__PURE__ */ v.jsxs(
      "div",
      {
        className: "px-2 py-2 rounded-b",
        style: { backgroundColor: o ? "#252525" : "#f0f0f0" },
        children: [
          Xb.map((y) => /* @__PURE__ */ v.jsxs("div", { className: "mb-2", children: [
            /* @__PURE__ */ v.jsx("div", { className: "text-xs mb-1", style: { fontSize: 9, color: "var(--fp-text-secondary)", letterSpacing: 0.5 }, children: y.label }),
            /* @__PURE__ */ v.jsx(
              "div",
              {
                className: "grid gap-1",
                style: { gridTemplateColumns: "repeat(auto-fill, minmax(22px, 1fr))" },
                children: y.colors.map((k) => /* @__PURE__ */ v.jsx(
                  "button",
                  {
                    onClick: () => c(k),
                    style: {
                      width: "100%",
                      aspectRatio: "1",
                      borderRadius: 4,
                      backgroundColor: k,
                      border: n === k ? `2px solid ${o ? "#fff" : "#000"}` : "2px solid transparent",
                      cursor: "pointer",
                      outline: "none"
                    }
                  },
                  k
                ))
              }
            )
          ] }, y.label)),
          /* @__PURE__ */ v.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer",
              style: { fontSize: 11, color: "var(--fp-text-secondary)" },
              children: [
                /* @__PURE__ */ v.jsx(
                  "input",
                  {
                    type: "color",
                    value: n,
                    onChange: (y) => c(y.target.value),
                    style: {
                      width: 24,
                      height: 24,
                      padding: 0,
                      border: `2px solid ${o ? "#555" : "#ccc"}`,
                      borderRadius: 4,
                      cursor: "pointer",
                      backgroundColor: "transparent"
                    }
                  }
                ),
                "Custom"
              ]
            }
          )
        ]
      }
    )
  ] }, t);
}
function rP({
  settings: t,
  onUpdateSettings: e,
  isDark: n,
  themePreference: r,
  onSetTheme: o
}) {
  const [a, l] = z.useState(null), [c, d] = z.useState(null), p = ec[t.theme_config_id ?? I7] ?? ec[I7], y = mi[t.icon_pack_id ?? D7] ?? mi[D7], k = (A) => {
    var E;
    return ((E = t.domain_colors) == null ? void 0 : E[A]) ?? p.colors[A] ?? "#888888";
  }, x = (A, E) => {
    const T = t.domain_colors ?? {};
    e({ domain_colors: { ...T, [A]: E } });
  }, w = (A) => {
    if (!t.domain_colors) return;
    const E = { ...t.domain_colors };
    delete E[A], e({ domain_colors: Object.keys(E).length > 0 ? E : void 0 });
  }, m = z.useCallback(
    (A) => {
      if (a)
        if (a.type === "domain") {
          const E = t.domain_icons ?? {};
          e({ domain_icons: { ...E, [a.domain]: A } });
        } else {
          const E = t.furniture_icons ?? {};
          e({ furniture_icons: { ...E, [a.furnitureType]: A } });
        }
    },
    [a, t, e]
  ), S = (A) => {
    if (!t.domain_icons) return;
    const E = { ...t.domain_icons };
    delete E[A], e({ domain_icons: Object.keys(E).length > 0 ? E : void 0 });
  }, b = (A) => {
    if (!t.furniture_icons) return;
    const E = { ...t.furniture_icons };
    delete E[A], e({ furniture_icons: Object.keys(E).length > 0 ? E : void 0 });
  }, L = (A) => {
    var E;
    if ((E = t.domain_icons) != null && E[A]) {
      const T = t.domain_icons[A], P = mi[T.pack_id];
      if (P) return Xo(P, T.domain, "on", T.device_class);
    }
    return Xo(y, A, "on");
  }, M = (A) => {
    var E;
    if ((E = t.furniture_icons) != null && E[A]) {
      const T = t.furniture_icons[A], P = mi[T.pack_id];
      if (P) return Xo(P, T.domain, "on", T.device_class);
    }
    return Xo(y, "furniture", "on", A);
  };
  if (a)
    return /* @__PURE__ */ v.jsx("div", { style: { position: "relative", height: "100%", minHeight: 400 }, children: /* @__PURE__ */ v.jsx(
      tP,
      {
        target: a,
        isDark: n,
        onSelect: m,
        onClose: () => l(null)
      }
    ) });
  const g = n ? "#2a2a2a" : "#f5f5f5", C = (A, E, T, P, R, V) => /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: "flex items-center gap-2 px-2 py-1.5 rounded",
      style: { backgroundColor: g },
      children: [
        /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: R,
            style: {
              background: "none",
              border: `1.5px solid ${n ? "#555" : "#ccc"}`,
              borderRadius: 6,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0
            },
            title: "Change icon",
            children: /* @__PURE__ */ v.jsx(an, { icon: T, size: 18 })
          }
        ),
        /* @__PURE__ */ v.jsx("span", { className: "text-xs flex-1", children: E }),
        P && /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: V,
            className: "text-xs px-1.5 py-0.5 rounded",
            style: {
              backgroundColor: n ? "#444" : "#ddd",
              fontSize: 10,
              border: "none",
              cursor: "pointer",
              color: "var(--fp-text)"
            },
            children: "Reset"
          }
        )
      ]
    },
    A
  );
  return /* @__PURE__ */ v.jsxs("div", { className: "p-4 space-y-5", children: [
    /* @__PURE__ */ v.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide", children: "Appearance" }),
    /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1.5", style: { color: "var(--fp-text-secondary)" }, children: "Mode" }),
      /* @__PURE__ */ v.jsx("div", { className: "flex gap-1", children: ["system", "light", "dark"].map((A) => /* @__PURE__ */ v.jsx(
        "button",
        {
          onClick: () => o(A),
          className: "flex-1 py-1.5 rounded text-xs font-medium capitalize",
          style: {
            backgroundColor: r === A ? "var(--fp-accent)" : n ? "#333" : "#e8e8e8",
            color: r === A ? "#fff" : "var(--fp-text)"
          },
          children: $b[A]
        },
        A
      )) })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1.5", style: { color: "var(--fp-text-secondary)" }, children: "Icon Sizes" }),
      /* @__PURE__ */ v.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5 rounded", style: { backgroundColor: g }, children: [
          /* @__PURE__ */ v.jsx("span", { className: "text-xs flex-1", children: "All entities" }),
          /* @__PURE__ */ v.jsxs("span", { className: "text-xs tabular-nums", style: { color: "var(--fp-text-secondary)", minWidth: 28, textAlign: "right" }, children: [
            t.default_icon_size ?? 36,
            "px"
          ] }),
          t.default_icon_size != null && /* @__PURE__ */ v.jsx(
            "button",
            {
              onClick: () => e({ default_icon_size: void 0 }),
              className: "text-xs px-1.5 py-0.5 rounded",
              style: {
                backgroundColor: n ? "#444" : "#ddd",
                fontSize: 10,
                border: "none",
                cursor: "pointer",
                color: "var(--fp-text)"
              },
              children: "Reset"
            }
          )
        ] }),
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            min: 16,
            max: 80,
            value: t.default_icon_size ?? 36,
            onChange: (A) => e({ default_icon_size: Number(A.target.value) }),
            className: "w-full",
            style: { accentColor: Vt }
          }
        ),
        Object.entries(Y5).map(([A, E]) => {
          var V;
          const T = (V = t.domain_icon_sizes) == null ? void 0 : V[A], P = T ?? t.default_icon_size ?? 36, R = T != null;
          return /* @__PURE__ */ v.jsxs("div", { children: [
            /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-2 px-2 py-1 rounded", style: { backgroundColor: g }, children: [
              /* @__PURE__ */ v.jsx("span", { className: "text-xs flex-1", children: E }),
              /* @__PURE__ */ v.jsxs("span", { className: "text-xs tabular-nums", style: { color: "var(--fp-text-secondary)", minWidth: 28, textAlign: "right" }, children: [
                P,
                "px"
              ] }),
              R && /* @__PURE__ */ v.jsx(
                "button",
                {
                  onClick: () => {
                    const F = { ...t.domain_icon_sizes };
                    delete F[A], e({ domain_icon_sizes: Object.keys(F).length > 0 ? F : void 0 });
                  },
                  className: "text-xs px-1.5 py-0.5 rounded",
                  style: {
                    backgroundColor: n ? "#444" : "#ddd",
                    fontSize: 10,
                    border: "none",
                    cursor: "pointer",
                    color: "var(--fp-text)"
                  },
                  children: "Reset"
                }
              )
            ] }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                type: "range",
                min: 16,
                max: 80,
                value: P,
                onChange: (F) => {
                  const W = t.domain_icon_sizes ?? {};
                  e({ domain_icon_sizes: { ...W, [A]: Number(F.target.value) } });
                },
                className: "w-full",
                style: { accentColor: R ? Vt : n ? "#555" : "#ccc" }
              }
            )
          ] }, A);
        })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1.5", style: { color: "var(--fp-text-secondary)" }, children: "Entity Colors" }),
      /* @__PURE__ */ v.jsx("div", { className: "space-y-1", children: Object.entries(Qb).map(([A, E]) => {
        var T;
        return /* @__PURE__ */ v.jsx(
          nP,
          {
            colorKey: A,
            label: E,
            effectiveColor: k(A),
            isOverridden: !!((T = t.domain_colors) != null && T[A]),
            isDark: n,
            isExpanded: c === A,
            onToggle: () => d(c === A ? null : A),
            onChange: (P) => x(A, P),
            onReset: () => w(A)
          },
          A
        );
      }) })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1.5", style: { color: "var(--fp-text-secondary)" }, children: "Entity Icons" }),
      /* @__PURE__ */ v.jsx("div", { className: "space-y-1", children: Object.entries(Y5).map(([A, E]) => {
        var R;
        const T = L(A), P = !!((R = t.domain_icons) != null && R[A]);
        return C(
          A,
          E,
          T.icon,
          P,
          () => l({ type: "domain", domain: A }),
          () => S(A)
        );
      }) })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("label", { className: "block text-xs mb-1.5", style: { color: "var(--fp-text-secondary)" }, children: "Furniture Icons" }),
      /* @__PURE__ */ v.jsx("div", { className: "space-y-1", children: qb.map((A) => {
        var P;
        const E = M(A), T = !!((P = t.furniture_icons) != null && P[A]);
        return C(
          A,
          Im[A],
          E.icon,
          T,
          () => l({ type: "furniture", furnitureType: A }),
          () => b(A)
        );
      }) })
    ] })
  ] });
}
function iP(t, e) {
  const n = parseInt(t.slice(1, 3), 16), r = parseInt(t.slice(3, 5), 16), o = parseInt(t.slice(5, 7), 16);
  return `rgba(${n}, ${r}, ${o}, ${e})`;
}
const oP = ["scene", "script", "automation", "button"], sP = ["sensor", "binary_sensor"];
function aP(t) {
  return t.split(".")[0];
}
function lP({ item: t, entity: e, hass: n, isDark: r, editMode: o, onRemove: a }) {
  var T, P;
  const { resolveEntityIcon: l, getDomainColor: c } = un(), [d, p] = z.useState(!1), y = aP(t.entity_id), k = (e == null ? void 0 : e.state) ?? "unknown", x = oP.includes(y), w = sP.includes(y), m = k === "on" || k === "open" || k === "playing" || k === "unlocked", S = ((T = e == null ? void 0 : e.attributes) == null ? void 0 : T.device_class) ?? void 0, { icon: b } = l(y, k, S), L = ((P = e == null ? void 0 : e.attributes) == null ? void 0 : P.unit_of_measurement) ?? "", M = () => {
    if (!o)
      if (x) {
        const V = {
          scene: "turn_on",
          script: "turn_on",
          automation: "trigger",
          button: "press"
        }[y];
        V && n.callService(y, V, {}, { entity_id: t.entity_id });
      } else w || (y === "lock" ? n.callService("lock", m ? "lock" : "unlock", {}, { entity_id: t.entity_id }) : y === "media_player" ? n.callService("media_player", m ? "media_pause" : "media_play", {}, { entity_id: t.entity_id }) : n.callService(y, m ? "turn_off" : "turn_on", {}, { entity_id: t.entity_id }));
  }, g = c(y), C = !w && !x && m ? iP(g, 0.12) : r ? "#2a2a2a" : "#f0f0f0", A = {
    display: "flex",
    alignItems: "center",
    justifyContent: x ? "center" : "flex-start",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    height: 64,
    backgroundColor: C,
    cursor: w ? "default" : "pointer",
    position: "relative",
    transition: "transform 0.1s, background 0.2s",
    transform: d && !w ? "scale(0.97)" : "scale(1)",
    userSelect: "none",
    overflow: "hidden"
  }, E = !w && !x && m ? g : void 0;
  return x ? /* @__PURE__ */ v.jsxs(
    "div",
    {
      style: A,
      onPointerDown: () => p(!0),
      onPointerUp: () => p(!1),
      onPointerLeave: () => p(!1),
      onClick: M,
      children: [
        o && /* @__PURE__ */ v.jsx(Df, { onRemove: () => a(t.id) }),
        /* @__PURE__ */ v.jsx(an, { icon: b, size: 22, fill: E }),
        /* @__PURE__ */ v.jsx("span", { style: { fontSize: 13, fontWeight: 500, color: "var(--fp-text)" }, children: t.label })
      ]
    }
  ) : w ? /* @__PURE__ */ v.jsxs("div", { style: A, children: [
    o && /* @__PURE__ */ v.jsx(Df, { onRemove: () => a(t.id) }),
    /* @__PURE__ */ v.jsx(an, { icon: b, size: 22 }),
    /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }, children: [
      /* @__PURE__ */ v.jsx("span", { style: { fontSize: 11, color: "var(--fp-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: t.label }),
      /* @__PURE__ */ v.jsxs("span", { style: { fontSize: 16, fontWeight: 600, color: "var(--fp-text)" }, children: [
        k,
        L ? ` ${L}` : ""
      ] })
    ] })
  ] }) : /* @__PURE__ */ v.jsxs(
    "div",
    {
      style: A,
      onPointerDown: () => p(!0),
      onPointerUp: () => p(!1),
      onPointerLeave: () => p(!1),
      onClick: M,
      children: [
        o && /* @__PURE__ */ v.jsx(Df, { onRemove: () => a(t.id) }),
        /* @__PURE__ */ v.jsx(an, { icon: b, size: 22, fill: E, opacity: m ? 1 : 0.5 }),
        /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ v.jsx("span", { style: { fontSize: 13, fontWeight: 500, color: "var(--fp-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: t.label }),
          /* @__PURE__ */ v.jsx("span", { style: { fontSize: 11, color: m ? g : "var(--fp-text-secondary)" }, children: k })
        ] })
      ]
    }
  );
}
function Df({ onRemove: t }) {
  return /* @__PURE__ */ v.jsx(
    "button",
    {
      onClick: (e) => {
        e.stopPropagation(), t();
      },
      style: {
        position: "absolute",
        top: 4,
        right: 4,
        width: 20,
        height: 20,
        borderRadius: 10,
        border: "none",
        backgroundColor: "#e53935",
        color: "#fff",
        fontSize: 12,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        lineHeight: 1,
        zIndex: 2
      },
      children: "×"
    }
  );
}
function uP({ favorites: t, hass: e, isDark: n, onRemoveFavorite: r, onShowEditor: o }) {
  const [a, l] = z.useState(!1), c = [...t].sort((d, p) => d.order - p.order);
  return /* @__PURE__ */ v.jsxs("div", { style: { padding: 16 }, children: [
    /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }, children: [
      /* @__PURE__ */ v.jsx("h3", { style: { fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--fp-text)", margin: 0 }, children: "Quick Access" }),
      /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", gap: 4 }, children: [
        /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: o,
            title: "Add favorite",
            style: {
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              backgroundColor: n ? "#333" : "#e8e8e8",
              color: "var(--fp-text)",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: "+"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: () => l((d) => !d),
            title: a ? "Done editing" : "Edit favorites",
            style: {
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              backgroundColor: a ? "var(--fp-accent)" : n ? "#333" : "#e8e8e8",
              color: a ? "#fff" : "var(--fp-text)",
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: "✎"
          }
        )
      ] })
    ] }),
    c.length === 0 ? /* @__PURE__ */ v.jsx(
      "div",
      {
        onClick: o,
        style: {
          padding: 24,
          textAlign: "center",
          borderRadius: 12,
          backgroundColor: n ? "#2a2a2a" : "#f0f0f0",
          cursor: "pointer"
        },
        children: /* @__PURE__ */ v.jsx("p", { style: { fontSize: 13, color: "var(--fp-text-secondary)", margin: 0 }, children: "Tap + to add your favorite entities" })
      }
    ) : /* @__PURE__ */ v.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: c.map((d) => /* @__PURE__ */ v.jsx(
      lP,
      {
        item: d,
        entity: e.states[d.entity_id],
        hass: e,
        isDark: n,
        editMode: a,
        onRemove: r
      },
      d.id
    )) })
  ] });
}
const Gf = [
  "light",
  "switch",
  "cover",
  "sensor",
  "binary_sensor",
  "climate",
  "fan",
  "camera",
  "media_player",
  "lock",
  "scene",
  "script",
  "automation",
  "button"
], cP = {
  light: "Lights",
  switch: "Switches",
  cover: "Covers",
  sensor: "Sensors",
  binary_sensor: "Binary Sensors",
  climate: "Climate",
  fan: "Fans",
  camera: "Cameras",
  media_player: "Media Players",
  lock: "Locks",
  scene: "Scenes",
  script: "Scripts",
  automation: "Automations",
  button: "Buttons"
};
function uu(t) {
  var e;
  return ((e = t.attributes) == null ? void 0 : e.friendly_name) ?? t.entity_id.split(".")[1];
}
function dP(t) {
  return t === "scene" ? "scene" : t === "script" ? "script" : t === "automation" ? "automation" : t === "button" ? "button" : "entity";
}
function fP({ hass: t, isDark: e, favorites: n, onAddFavorite: r, onClose: o }) {
  const [a, l] = z.useState(""), [c, d] = z.useState(null), { resolveEntityIcon: p } = un(), y = z.useMemo(
    () => new Set(n.map((m) => m.entity_id)),
    [n]
  ), k = z.useMemo(() => {
    const m = Object.values(t.states), S = {};
    for (const b of m) {
      const L = b.entity_id.split(".")[0];
      if (!Gf.includes(L)) continue;
      const M = uu(b).toLowerCase(), g = b.entity_id.toLowerCase(), C = a.toLowerCase();
      C && !M.includes(C) && !g.includes(C) || c && L !== c || (S[L] || (S[L] = []), S[L].push(b));
    }
    for (const b of Object.keys(S))
      S[b].sort(
        (L, M) => uu(L).localeCompare(uu(M))
      );
    return S;
  }, [t.states, a, c]), x = Object.values(k).reduce(
    (m, S) => m + S.length,
    0
  ), w = {
    backgroundColor: e ? "#333" : "#fff",
    borderColor: e ? "#555" : "#d1d5db",
    color: "var(--fp-text)"
  };
  return /* @__PURE__ */ v.jsxs("div", { className: "p-4 space-y-3", children: [
    /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          onClick: o,
          style: {
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "none",
            backgroundColor: e ? "#333" : "#e8e8e8",
            color: "var(--fp-text)",
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: "←"
        }
      ),
      /* @__PURE__ */ v.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide", style: { margin: 0 }, children: "Add Favorites" })
    ] }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        type: "text",
        value: a,
        onChange: (m) => l(m.target.value),
        placeholder: "Search entities...",
        className: "w-full px-3 py-2 rounded border text-sm focus:outline-none focus:border-blue-500",
        style: w
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: "flex flex-wrap gap-1", children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          onClick: () => d(null),
          className: "px-2 py-0.5 rounded text-xs",
          style: {
            backgroundColor: c ? e ? "#333" : "#e8e8e8" : Vt,
            color: c ? "var(--fp-text)" : "#fff"
          },
          children: "All"
        }
      ),
      Gf.map((m) => {
        const { icon: S } = p(m, "on");
        return /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: () => d(c === m ? null : m),
            className: "px-2 py-0.5 rounded text-xs",
            style: {
              backgroundColor: c === m ? Vt : e ? "#333" : "#e8e8e8",
              color: c === m ? "#fff" : "var(--fp-text)"
            },
            children: /* @__PURE__ */ v.jsx(an, { icon: S, size: 14 })
          },
          m
        );
      })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: [
      x,
      " entities"
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "space-y-3", children: Gf.filter((m) => {
      var S;
      return (S = k[m]) == null ? void 0 : S.length;
    }).map((m) => {
      const { icon: S } = p(m, "on");
      return /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsxs(
          "h4",
          {
            className: "text-xs font-semibold uppercase mb-1 sticky top-0 py-1 flex items-center gap-1",
            style: {
              color: "var(--fp-text-secondary)",
              backgroundColor: "var(--fp-card)"
            },
            children: [
              /* @__PURE__ */ v.jsx(an, { icon: S, size: 14 }),
              " ",
              cP[m],
              " (",
              k[m].length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ v.jsx("div", { className: "space-y-0.5", children: k[m].map((b) => {
          const L = y.has(b.entity_id), M = uu(b);
          return /* @__PURE__ */ v.jsxs(
            "div",
            {
              className: "w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2",
              style: {
                backgroundColor: "transparent",
                color: "var(--fp-text)"
              },
              children: [
                /* @__PURE__ */ v.jsx("span", { className: "truncate flex-1", children: M }),
                L ? /* @__PURE__ */ v.jsx(
                  "span",
                  {
                    style: { color: Vt, fontSize: 16, flexShrink: 0 },
                    children: "✓"
                  }
                ) : /* @__PURE__ */ v.jsx(
                  "button",
                  {
                    onClick: () => {
                      const g = dP(m);
                      r(b.entity_id, g, M);
                    },
                    className: "px-2 py-0.5 rounded text-xs font-medium",
                    style: {
                      backgroundColor: Vt,
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      flexShrink: 0
                    },
                    children: "Add"
                  }
                )
              ]
            },
            b.entity_id
          );
        }) })
      ] }, m);
    }) })
  ] });
}
const hP = ["Living", "Bedroom", "Bathroom", "Kitchen", "Other"], hc = [
  // Living
  { type: "sofa", label: "Sofa", category: "Living", defaultGridW: 6, defaultGridH: 3 },
  { type: "chair", label: "Chair", category: "Living", defaultGridW: 2, defaultGridH: 2 },
  { type: "table", label: "Table", category: "Living", defaultGridW: 4, defaultGridH: 3 },
  { type: "tv", label: "TV", category: "Living", defaultGridW: 4, defaultGridH: 1 },
  { type: "bookshelf", label: "Bookshelf", category: "Living", defaultGridW: 4, defaultGridH: 1 },
  { type: "plant", label: "Plant", category: "Living", defaultGridW: 2, defaultGridH: 2 },
  // Bedroom
  { type: "bed", label: "Bed", category: "Bedroom", defaultGridW: 5, defaultGridH: 7 },
  { type: "desk", label: "Desk", category: "Bedroom", defaultGridW: 4, defaultGridH: 2 },
  { type: "wardrobe", label: "Wardrobe", category: "Bedroom", defaultGridW: 4, defaultGridH: 2 },
  // Bathroom
  { type: "toilet", label: "Toilet", category: "Bathroom", defaultGridW: 2, defaultGridH: 2 },
  { type: "shower", label: "Shower", category: "Bathroom", defaultGridW: 3, defaultGridH: 3 },
  { type: "sink", label: "Sink", category: "Bathroom", defaultGridW: 2, defaultGridH: 2 },
  { type: "bathtub", label: "Bathtub", category: "Bathroom", defaultGridW: 3, defaultGridH: 6 },
  // Kitchen
  { type: "fridge", label: "Fridge", category: "Kitchen", defaultGridW: 2, defaultGridH: 2 },
  { type: "oven", label: "Oven", category: "Kitchen", defaultGridW: 2, defaultGridH: 2 },
  { type: "dishwasher", label: "Dishwasher", category: "Kitchen", defaultGridW: 2, defaultGridH: 2 },
  // Other
  { type: "door", label: "Door", category: "Other", defaultGridW: 3, defaultGridH: 1 },
  { type: "window", label: "Window", category: "Other", defaultGridW: 3, defaultGridH: 1 }
];
function Dm(t) {
  return hc.find((e) => e.type === t) ?? hc[0];
}
function pP({ isDark: t }) {
  const [e, n] = z.useState(""), { resolveEntityIcon: r } = un(), o = z.useMemo(() => {
    const c = e.toLowerCase(), d = c ? hc.filter(
      (y) => y.label.toLowerCase().includes(c) || y.type.toLowerCase().includes(c)
    ) : hc, p = {};
    for (const y of d)
      p[y.category] || (p[y.category] = []), p[y.category].push(y);
    return p;
  }, [e]), a = (c, d) => {
    c.dataTransfer.setData("application/furniture-type", d), c.dataTransfer.effectAllowed = "copy";
  }, l = {
    backgroundColor: t ? "#333" : "#fff",
    borderColor: t ? "#555" : "#d1d5db",
    color: "var(--fp-text)"
  };
  return /* @__PURE__ */ v.jsxs("div", { className: "p-4 space-y-3", children: [
    /* @__PURE__ */ v.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide", children: "Furniture" }),
    /* @__PURE__ */ v.jsx("p", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: "Drag furniture onto the floor plan." }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        type: "text",
        value: e,
        onChange: (c) => n(c.target.value),
        placeholder: "Search furniture...",
        className: "w-full px-3 py-2 rounded border text-sm focus:outline-none focus:border-blue-500",
        style: l
      }
    ),
    /* @__PURE__ */ v.jsx("div", { className: "space-y-3", children: hP.filter((c) => {
      var d;
      return (d = o[c]) == null ? void 0 : d.length;
    }).map(
      (c) => /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsxs(
          "h4",
          {
            className: "text-xs font-semibold uppercase mb-1 sticky top-0 py-1",
            style: {
              color: "var(--fp-text-secondary)",
              backgroundColor: "var(--fp-card)"
            },
            children: [
              c,
              " (",
              o[c].length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ v.jsx("div", { className: "space-y-0.5", children: o[c].map((d) => {
          const { icon: p } = r("furniture", "on", d.type);
          return /* @__PURE__ */ v.jsxs(
            "div",
            {
              draggable: !0,
              onDragStart: (y) => a(y, d.type),
              className: "w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 cursor-grab active:cursor-grabbing select-none",
              style: {
                backgroundColor: "transparent",
                color: "var(--fp-text)"
              },
              onMouseEnter: (y) => y.currentTarget.style.backgroundColor = "var(--fp-hover)",
              onMouseLeave: (y) => y.currentTarget.style.backgroundColor = "transparent",
              children: [
                /* @__PURE__ */ v.jsx(an, { icon: p, size: 20 }),
                /* @__PURE__ */ v.jsx("span", { className: "truncate", children: d.label }),
                /* @__PURE__ */ v.jsxs(
                  "span",
                  {
                    className: "text-xs ml-auto flex-shrink-0",
                    style: { color: "var(--fp-text-secondary)" },
                    children: [
                      d.defaultGridW,
                      "×",
                      d.defaultGridH
                    ]
                  }
                )
              ]
            },
            d.type
          );
        }) })
      ] }, c)
    ) })
  ] });
}
function gP({
  placement: t,
  gridSize: e,
  onUpdate: n,
  onRemove: r,
  isDark: o
}) {
  const a = Dm(t.type), { resolveEntityIcon: l } = un(), { icon: c } = l("furniture", "on", t.type), d = Math.round(t.width / e), p = Math.round(t.height / e), y = (S) => {
    const b = Math.max(1, S);
    n(t.id, { width: b * e });
  }, k = (S) => {
    const b = Math.max(1, S);
    n(t.id, { height: b * e });
  }, x = () => {
    n(t.id, {
      rotation: (t.rotation + 90) % 360
    });
  }, w = {
    backgroundColor: o ? "#333" : "#fff",
    borderColor: o ? "#555" : "#d1d5db",
    color: "var(--fp-text)"
  }, m = {
    backgroundColor: o ? "#333" : "#e8e8e8",
    color: "var(--fp-text)",
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 13
  };
  return /* @__PURE__ */ v.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ v.jsx(an, { icon: c, size: 28 }),
      /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsx("h3", { className: "text-sm font-semibold", children: a.label }),
        /* @__PURE__ */ v.jsx("p", { className: "text-xs", style: { color: "var(--fp-text-secondary)" }, children: a.category })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ v.jsx("label", { className: "text-xs font-medium block", style: { color: "var(--fp-text-secondary)" }, children: "Size (grid units)" }),
      /* @__PURE__ */ v.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ v.jsx("label", { className: "text-xs block mb-1", children: "Width" }),
          /* @__PURE__ */ v.jsx(
            "input",
            {
              type: "number",
              min: 1,
              value: d,
              onChange: (S) => y(parseInt(S.target.value) || 1),
              className: "w-full px-2 py-1.5 rounded border text-sm",
              style: w
            }
          )
        ] }),
        /* @__PURE__ */ v.jsx("span", { className: "text-xs mt-5", style: { color: "var(--fp-text-secondary)" }, children: "×" }),
        /* @__PURE__ */ v.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ v.jsx("label", { className: "text-xs block mb-1", children: "Height" }),
          /* @__PURE__ */ v.jsx(
            "input",
            {
              type: "number",
              min: 1,
              value: p,
              onChange: (S) => k(parseInt(S.target.value) || 1),
              className: "w-full px-2 py-1.5 rounded border text-sm",
              style: w
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        onClick: x,
        style: m,
        className: "w-full flex items-center justify-center gap-2",
        children: [
          /* @__PURE__ */ v.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ v.jsx("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }),
            /* @__PURE__ */ v.jsx("path", { d: "M21 3v5h-5" })
          ] }),
          "Rotate 90°"
        ]
      }
    ),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        onClick: () => r(t.id),
        style: {
          ...m,
          backgroundColor: o ? "#442222" : "#fee2e2",
          color: o ? "#ff8888" : "#dc2626"
        },
        className: "w-full",
        children: "Remove"
      }
    )
  ] });
}
function G7({
  mode: t,
  activeTool: e,
  floor: n,
  selectedRoomIds: r,
  selectedEntityIds: o,
  onUpdateRoom: a,
  onDeleteRoom: l,
  onUpdateEntity: c,
  onRemoveEntity: d,
  onDeleteSelected: p,
  haAreas: y,
  hass: k,
  isDark: x,
  showAppearance: w,
  settings: m,
  onUpdateSettings: S,
  themePreference: b,
  onSetTheme: L,
  getEntitiesForArea: M,
  onAddEntity: g,
  favorites: C,
  onAddFavorite: A,
  onRemoveFavorite: E,
  selectedFurnitureIds: T,
  onUpdateFurniture: P,
  onRemoveFurniture: R
}) {
  var ee;
  const [V, F] = z.useState(!1), W = r.length + o.length + T.length, U = r.length === 1 ? r[0] : null, $ = o.length === 1 ? o[0] : null, Q = T.length === 1 ? T[0] : null, oe = n == null ? void 0 : n.rooms.find((re) => re.id === U), q = n == null ? void 0 : n.entities.find((re) => re.id === $), G = ((n == null ? void 0 : n.furniture) ?? []).find((re) => re.id === Q), Y = q ? q.entity_id.split(".")[0] : null, D = Y ? ((ee = m.domain_icon_sizes) == null ? void 0 : ee[Y]) ?? m.default_icon_size : m.default_icon_size;
  return w ? /* @__PURE__ */ v.jsx(
    rP,
    {
      settings: m,
      onUpdateSettings: S,
      isDark: x,
      themePreference: b,
      onSetTheme: L
    }
  ) : t === "view" ? W > 1 && n ? /* @__PURE__ */ v.jsx(
    O7,
    {
      floor: n,
      selectedRoomIds: r,
      selectedEntityIds: o,
      hass: k,
      onDeleteSelected: p,
      isDark: x,
      isEditMode: !1
    }
  ) : q ? /* @__PURE__ */ v.jsx(
    j7,
    {
      placement: q,
      entity: k.states[q.entity_id],
      hass: k,
      onUpdate: c,
      onRemove: d,
      isDark: x,
      isEditMode: !1,
      effectiveIconSize: D
    }
  ) : V ? /* @__PURE__ */ v.jsx(
    fP,
    {
      hass: k,
      isDark: x,
      favorites: C,
      onAddFavorite: A,
      onClose: () => F(!1)
    }
  ) : /* @__PURE__ */ v.jsx(
    uP,
    {
      favorites: C,
      hass: k,
      isDark: x,
      onRemoveFavorite: E,
      onShowEditor: () => F(!0)
    }
  ) : e === "place" ? /* @__PURE__ */ v.jsx(jb, { hass: k, isDark: x }) : e === "furniture" ? /* @__PURE__ */ v.jsx(pP, { isDark: x }) : W > 1 && n ? /* @__PURE__ */ v.jsx(
    O7,
    {
      floor: n,
      selectedRoomIds: r,
      selectedEntityIds: o,
      hass: k,
      onDeleteSelected: p,
      isDark: x,
      isEditMode: !0
    }
  ) : oe && n ? /* @__PURE__ */ v.jsx(
    zb,
    {
      room: oe,
      floor: n,
      onUpdate: a,
      onDelete: l,
      haAreas: y,
      hass: k,
      isDark: x,
      getEntitiesForArea: M,
      onAddEntity: g
    }
  ) : q ? /* @__PURE__ */ v.jsx(
    j7,
    {
      placement: q,
      entity: k.states[q.entity_id],
      hass: k,
      onUpdate: c,
      onRemove: d,
      isDark: x,
      isEditMode: !0,
      effectiveIconSize: D
    }
  ) : G && n ? /* @__PURE__ */ v.jsx(
    gP,
    {
      placement: G,
      gridSize: m.grid_size,
      onUpdate: P,
      onRemove: R,
      isDark: x
    }
  ) : null;
}
const U7 = {
  version: 1,
  floors: [],
  favorites: [],
  settings: {
    default_floor_id: null,
    grid_enabled: !0,
    grid_size: 20,
    show_entity_labels: !0,
    theme: "system",
    theme_config_id: "default",
    icon_pack_id: "emoji",
    font_id: "roboto"
  }
}, Ds = 160, B7 = 20, W7 = 4, Z7 = 0, Y7 = 50, Gm = "homelayout_config";
function Gs() {
  return typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
    const e = Math.random() * 16 | 0;
    return (t === "x" ? e : e & 3 | 8).toString(16);
  });
}
function mP() {
  try {
    const t = localStorage.getItem(Gm);
    return t ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}
function yP(t) {
  try {
    localStorage.setItem(Gm, JSON.stringify(t));
  } catch {
  }
}
function vP(t) {
  return t.map((e, n) => {
    const r = n % W7, o = Math.floor(n / W7), a = Z7 + r * (Ds + B7), l = Z7 + o * (Ds + B7);
    return {
      id: Gs(),
      name: e.name,
      ha_area_id: e.area_id,
      label_visible: !0,
      points: [
        { x: a, y: l },
        { x: a + Ds, y: l },
        { x: a + Ds, y: l + Ds },
        { x: a, y: l + Ds }
      ]
    };
  });
}
function xP(t) {
  const [e, n] = z.useState(U7), [r, o] = z.useState(null), [a, l] = z.useState([]), [c, d] = z.useState([]), [p, y] = z.useState([]), [k, x] = z.useState(!1), w = z.useRef(null), m = z.useRef([]), S = z.useRef(-1), [b, L] = z.useState(!1), [M, g] = z.useState(!1), C = z.useCallback(() => {
    L(S.current > 0), g(S.current < m.current.length - 1);
  }, []), A = e.floors.find((K) => K.id === r) ?? null;
  z.useEffect(() => {
    !t || k || Promise.all([
      t.callWS({ type: "config/floor_registry/list" }),
      t.callWS({ type: "config/area_registry/list" }),
      t.callWS({ type: "config/entity_registry/list" }).catch(() => []),
      t.callWS({ type: "homelayout/config/get" }).catch(() => mP() ?? U7)
    ]).then(([K, ae, pe, de]) => {
      l(K), d(ae), y(pe);
      const et = [...K].sort(
        (Ye, Nt) => (Ye.level ?? 0) - (Nt.level ?? 0)
      ).map((Ye, Nt) => {
        const _t = de.floors.find(
          ($n) => $n.ha_floor_id === Ye.floor_id
        );
        if (_t)
          return { ..._t, name: Ye.name, order: Nt, furniture: _t.furniture ?? [] };
        const Pn = ae.filter(
          ($n) => $n.floor_id === Ye.floor_id
        );
        return {
          id: Gs(),
          ha_floor_id: Ye.floor_id,
          name: Ye.name,
          order: Nt,
          rooms: vP(Pn),
          entities: [],
          furniture: []
        };
      }), Ne = {
        ...de,
        floors: et
      };
      if (n(Ne), m.current = [Ne], S.current = 0, C(), et.length > 0) {
        const Ye = Ne.settings.default_floor_id ?? et[0].id, Nt = et.find((_t) => _t.id === Ye) ? Ye : et[0].id;
        o(Nt);
      }
      x(!0);
    });
  }, [t, k]);
  const E = z.useCallback(
    (K) => {
      w.current && clearTimeout(w.current), w.current = setTimeout(() => {
        yP(K), t == null || t.callWS({
          type: "homelayout/config/save",
          config: K
        }).catch(() => {
        });
      }, 500);
    },
    [t]
  ), T = z.useCallback(
    (K) => {
      n(K);
      const ae = S.current;
      m.current = m.current.slice(0, ae + 1), m.current.push(K), m.current.length > Y7 && (m.current = m.current.slice(-Y7)), S.current = m.current.length - 1, C(), E(K);
    },
    [E, C]
  ), P = z.useCallback(() => {
    if (S.current <= 0) return;
    S.current -= 1;
    const K = m.current[S.current];
    n(K), C(), E(K);
  }, [E, C]), R = z.useCallback(() => {
    if (S.current >= m.current.length - 1) return;
    S.current += 1;
    const K = m.current[S.current];
    n(K), C(), E(K);
  }, [E, C]), V = z.useCallback(
    (K, ae) => {
      const pe = {
        ...e,
        floors: e.floors.map(
          (de) => de.id === K ? { ...de, ...ae } : de
        )
      };
      T(pe);
    },
    [e, T]
  ), F = z.useCallback(
    (K) => {
      if (!r) return;
      const ae = {
        id: Gs(),
        name: "New room",
        ha_area_id: null,
        label_visible: !0,
        points: K
      }, pe = e.floors.find((de) => de.id === r);
      if (pe)
        return V(r, { rooms: [...pe.rooms, ae] }), ae;
    },
    [r, e, V]
  ), W = z.useCallback(
    (K, ae) => {
      A && V(A.id, {
        rooms: A.rooms.map(
          (pe) => pe.id === K ? { ...pe, ...ae } : pe
        )
      });
    },
    [A, V]
  ), U = z.useCallback(
    (K) => {
      A && V(A.id, {
        rooms: A.rooms.filter((ae) => ae.id !== K)
      });
    },
    [A, V]
  ), $ = z.useCallback(
    (K, ae, pe) => {
      A && V(A.id, {
        rooms: A.rooms.map(
          (de) => de.id === K ? { ...de, points: de.points.map((be) => ({ x: be.x + ae, y: be.y + pe })) } : de
        )
      });
    },
    [A, V]
  ), Q = z.useCallback(
    (K, ae, pe) => {
      A && V(A.id, {
        rooms: A.rooms.map(
          (de) => K.includes(de.id) ? { ...de, points: de.points.map((be) => ({ x: be.x + ae, y: be.y + pe })) } : de
        )
      });
    },
    [A, V]
  ), oe = z.useCallback(
    (K, ae, pe) => {
      A && V(A.id, {
        entities: A.entities.map(
          (de) => K.includes(de.id) ? { ...de, x: de.x + ae, y: de.y + pe } : de
        )
      });
    },
    [A, V]
  ), q = z.useCallback(
    (K) => K ? c.filter((ae) => ae.floor_id === K) : [],
    [c]
  ), G = z.useCallback(
    (K) => K ? p.filter((ae) => ae.area_id === K) : [],
    [p]
  ), Y = z.useCallback(
    (K, ae, pe) => {
      if (!r) return;
      const de = e.floors.find((et) => et.id === r);
      if (!de) return;
      const be = {
        id: Gs(),
        entity_id: K,
        x: ae,
        y: pe,
        label_visible: !1,
        show_icon: !0,
        show_state: !1
      };
      return V(r, {
        entities: [...de.entities, be]
      }), be;
    },
    [r, e, V]
  ), D = z.useCallback(
    (K, ae, pe) => {
      A && V(A.id, {
        entities: A.entities.map(
          (de) => de.id === K ? { ...de, x: ae, y: pe } : de
        )
      });
    },
    [A, V]
  ), ee = z.useCallback(
    (K, ae) => {
      A && V(A.id, {
        entities: A.entities.map(
          (pe) => pe.id === K ? { ...pe, ...ae } : pe
        )
      });
    },
    [A, V]
  ), re = z.useCallback(
    (K) => {
      A && V(A.id, {
        entities: A.entities.filter((ae) => ae.id !== K)
      });
    },
    [A, V]
  ), we = z.useCallback(
    (K, ae, pe, de, be) => {
      if (!r) return;
      const et = e.floors.find((Qn) => Qn.id === r);
      if (!et) return;
      const Ne = Dm(K), Ye = be && be > 0 ? be : e.settings.grid_size, Nt = (de == null ? void 0 : de.width) ?? Ne.defaultGridW * Ye, _t = (de == null ? void 0 : de.height) ?? Ne.defaultGridH * Ye, Pn = Math.round((ae - Nt / 2) / Ye) * Ye + Nt / 2, $n = Math.round((pe - _t / 2) / Ye) * Ye + _t / 2, ti = {
        id: Gs(),
        type: K,
        x: Pn,
        y: $n,
        width: Nt,
        height: _t,
        rotation: (de == null ? void 0 : de.rotation) ?? 0
      };
      return V(r, {
        furniture: [...et.furniture, ti]
      }), ti;
    },
    [r, e, V]
  ), Re = z.useCallback(
    (K, ae, pe) => {
      A && V(A.id, {
        furniture: A.furniture.map(
          (de) => de.id === K ? { ...de, x: ae, y: pe } : de
        )
      });
    },
    [A, V]
  ), ie = z.useCallback(
    (K, ae) => {
      A && V(A.id, {
        furniture: A.furniture.map(
          (pe) => pe.id === K ? { ...pe, ...ae } : pe
        )
      });
    },
    [A, V]
  ), ce = z.useCallback(
    (K) => {
      A && V(A.id, {
        furniture: A.furniture.filter((ae) => ae.id !== K)
      });
    },
    [A, V]
  ), H = z.useCallback(
    (K, ae, pe) => {
      A && V(A.id, {
        furniture: A.furniture.map(
          (de) => K.includes(de.id) ? { ...de, x: de.x + ae, y: de.y + pe } : de
        )
      });
    },
    [A, V]
  ), I = z.useCallback(
    (K, ae, pe) => {
      const de = e.favorites.reduce((Ne, Ye) => Math.max(Ne, Ye.order), -1), be = {
        id: Gs(),
        type: ae,
        entity_id: K,
        label: pe,
        icon: "",
        order: de + 1
      }, et = { ...e, favorites: [...e.favorites, be] };
      T(et);
    },
    [e, T]
  ), te = z.useCallback(
    (K) => {
      const ae = { ...e, favorites: e.favorites.filter((pe) => pe.id !== K) };
      T(ae);
    },
    [e, T]
  ), ze = z.useCallback(
    (K) => {
      const ae = {
        ...e,
        settings: { ...e.settings, ...K }
      };
      T(ae);
    },
    [e, T]
  );
  return {
    store: e,
    currentFloor: A,
    currentFloorId: r,
    setCurrentFloorId: o,
    haFloors: a,
    haAreas: c,
    getAreasForFloor: q,
    getEntitiesForArea: G,
    loaded: k,
    updateFloor: V,
    addRoom: F,
    updateRoom: W,
    deleteRoom: U,
    moveRoom: $,
    moveRooms: Q,
    moveEntities: oe,
    addEntity: Y,
    moveEntity: D,
    updateEntity: ee,
    removeEntity: re,
    addFurniture: we,
    moveFurniture: Re,
    updateFurniture: ie,
    removeFurniture: ce,
    moveFurnitureItems: H,
    addFavorite: I,
    removeFavorite: te,
    updateSettings: ze,
    undo: P,
    redo: R,
    canUndo: b,
    canRedo: M
  };
}
function _P() {
  const [t, e] = z.useState("select"), n = z.useCallback((r) => {
    e(r);
  }, []);
  return { activeTool: t, selectTool: n };
}
function Um() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function CP(t) {
  return t === "system" ? Um() : t;
}
function wP(t) {
  const [e, n] = z.useState(t), [r, o] = z.useState(
    () => CP(t)
  );
  z.useEffect(() => {
    if (e !== "system") {
      o(e);
      return;
    }
    o(Um());
    const c = window.matchMedia("(prefers-color-scheme: dark)"), d = (p) => {
      o(p.matches ? "dark" : "light");
    };
    return c.addEventListener("change", d), () => c.removeEventListener("change", d);
  }, [e]);
  const a = z.useCallback((c) => {
    n(c);
  }, []);
  return { preference: e, resolved: r, isDark: r === "dark", setTheme: a };
}
const K7 = 768;
function SP() {
  const [t, e] = z.useState(
    () => typeof window < "u" && window.innerWidth < K7
  );
  return z.useEffect(() => {
    const n = window.matchMedia(`(max-width: ${K7 - 1}px)`), r = (o) => e(o.matches);
    return n.addEventListener("change", r), () => n.removeEventListener("change", r);
  }, []), t;
}
const Wo = (t) => ({
  backgroundColor: t ? "rgba(30, 30, 30, 0.92)" : "rgba(255, 255, 255, 0.92)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${t ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
  boxShadow: "0 2px 12px rgba(0,0,0,0.10)"
}), Ki = (t) => ({
  width: 44,
  height: 44,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  cursor: "pointer",
  color: t ? "#e1e1e1" : "#212121",
  pointerEvents: "auto",
  outline: "none",
  transition: "all 0.2s cubic-bezier(0.32, 0.72, 0, 1)",
  ...Wo(t)
});
function kP({ hass: t }) {
  const {
    store: e,
    currentFloor: n,
    currentFloorId: r,
    setCurrentFloorId: o,
    getAreasForFloor: a,
    getEntitiesForArea: l,
    loaded: c,
    addRoom: d,
    updateRoom: p,
    deleteRoom: y,
    moveRoom: k,
    moveRooms: x,
    moveEntities: w,
    addEntity: m,
    moveEntity: S,
    updateEntity: b,
    removeEntity: L,
    addFurniture: M,
    moveFurniture: g,
    updateFurniture: C,
    removeFurniture: A,
    moveFurnitureItems: E,
    addFavorite: T,
    removeFavorite: P,
    updateSettings: R,
    undo: V,
    redo: F,
    canUndo: W,
    canRedo: U
  } = xP(t), $ = SP(), { activeTool: Q, selectTool: oe } = _P(), { isDark: q, preference: G, setTheme: Y } = wP(e.settings.theme), [D, ee] = z.useState("view"), [re, we] = z.useState([]), [Re, ie] = z.useState([]), [ce, H] = z.useState([]), I = { none: 0, xsmall: 5, small: 10, medium: 20, large: 40 }, te = ["none", "xsmall", "small", "medium", "large"], ze = { none: "", xsmall: "XS", small: "S", medium: "M", large: "L" }, [K, ae] = z.useState(
    e.settings.grid_enabled ? "medium" : "none"
  ), pe = I[K], de = K !== "none", [be, et] = z.useState(!1), [Ne, Ye] = z.useState(!1), [Nt, _t] = z.useState(!0), Pn = z.useRef(null), $n = z.useCallback((J, xe) => {
    xe ? we(
      (De) => De.includes(J) ? De.filter((Ue) => Ue !== J) : [...De, J]
    ) : (we([J]), ie([]), H([]));
  }, []), ti = z.useCallback((J, xe) => {
    if (D === "view") {
      Ye(!1);
      const De = (n == null ? void 0 : n.entities) ?? [], Ue = De.find((at) => at.id === J), ct = Ue ? De.filter((at) => at.entity_id === Ue.entity_id).map((at) => at.id) : [J];
      ie(
        (at) => at.includes(J) ? at.filter((hr) => !ct.includes(hr)) : [.../* @__PURE__ */ new Set([...at, ...ct])]
      );
    } else
      xe ? ie(
        (De) => De.includes(J) ? De.filter((Ue) => Ue !== J) : [...De, J]
      ) : (ie([J]), we([]), H([]));
  }, [D, n]), Qn = z.useCallback(() => {
    we([]), ie([]), H([]);
  }, []), Va = z.useCallback(
    (J, xe, De, Ue) => {
      De ? (we((ct) => [.../* @__PURE__ */ new Set([...ct, ...J])]), ie((ct) => [.../* @__PURE__ */ new Set([...ct, ...xe])]), Ue && H((ct) => [.../* @__PURE__ */ new Set([...ct, ...Ue])])) : (we(J), ie(xe), H(Ue ?? []));
    },
    []
  ), Ao = z.useCallback(
    (J) => {
      y(J), we([]);
    },
    [y]
  ), gs = z.useCallback(
    (J) => {
      L(J), ie([]);
    },
    [L]
  ), Ta = z.useCallback((J, xe) => {
    xe ? H(
      (De) => De.includes(J) ? De.filter((Ue) => Ue !== J) : [...De, J]
    ) : (H([J]), we([]), ie([]));
  }, []), ms = z.useCallback(
    (J) => {
      A(J), H([]);
    },
    [A]
  ), Ra = z.useCallback(
    (J, xe, De) => {
      if (ce.length > 1 && ce.includes(J)) {
        const Ue = ((n == null ? void 0 : n.furniture) ?? []).find((hr) => hr.id === J);
        if (!Ue) return;
        const ct = xe - Ue.x, at = De - Ue.y;
        E(ce, ct, at);
      } else
        g(J, xe, De);
    },
    [ce, n, g, E]
  ), za = z.useCallback(
    (J, xe, De) => {
      const Ue = M(J, xe, De, void 0, de ? pe : void 0);
      Ue && (H([Ue.id]), we([]), ie([]));
    },
    [M]
  ), Fa = z.useCallback(
    (J, xe, De) => {
      const Ue = m(J, xe, De);
      Ue && (ie([Ue.id]), we([]));
    },
    [m]
  ), ja = z.useCallback(
    (J, xe, De) => {
      re.length > 1 && re.includes(J) ? x(re, xe, De) : k(J, xe, De);
    },
    [re, k, x]
  ), ys = z.useCallback(
    (J, xe, De) => {
      if (Re.length > 1 && Re.includes(J)) {
        const Ue = n == null ? void 0 : n.entities.find((hr) => hr.id === J);
        if (!Ue) return;
        const ct = xe - Ue.x, at = De - Ue.y;
        w(Re, ct, at);
      } else
        S(J, xe, De);
    },
    [Re, n, S, w]
  ), Ei = z.useCallback(() => {
    if (D === "edit") {
      for (const J of re) y(J);
      for (const J of Re) L(J);
      for (const J of ce) A(J);
      we([]), ie([]), H([]);
    }
  }, [D, re, Re, ce, y, L, A]), vs = z.useRef([]), bo = z.useRef([]);
  z.useEffect(() => {
    const J = (xe) => {
      if (!(xe.target instanceof HTMLInputElement || xe.target instanceof HTMLTextAreaElement || xe.target instanceof HTMLSelectElement)) {
        if ((xe.ctrlKey || xe.metaKey) && !xe.shiftKey && xe.key === "z" && (xe.preventDefault(), V()), (xe.ctrlKey || xe.metaKey) && (xe.key === "y" || xe.shiftKey && xe.key === "z" || xe.shiftKey && xe.key === "Z") && (xe.preventDefault(), F()), (xe.key === "Delete" || xe.key === "Backspace") && (xe.preventDefault(), Ei()), xe.key === "Escape" && (we([]), ie([]), H([]), et(!1), Ye(!1)), (xe.ctrlKey || xe.metaKey) && xe.key === "a" && D === "edit") {
          xe.preventDefault();
          const De = (n == null ? void 0 : n.rooms.map((at) => at.id)) ?? [], Ue = (n == null ? void 0 : n.entities.map((at) => at.id)) ?? [], ct = ((n == null ? void 0 : n.furniture) ?? []).map((at) => at.id);
          we(De), ie(Ue), H(ct);
        }
        if ((xe.ctrlKey || xe.metaKey) && xe.key === "c" && D === "edit") {
          const Ue = ((n == null ? void 0 : n.entities) ?? []).filter((hr) => Re.includes(hr.id));
          Ue.length > 0 && (vs.current = Ue);
          const at = ((n == null ? void 0 : n.furniture) ?? []).filter((hr) => ce.includes(hr.id));
          at.length > 0 && (bo.current = at);
        }
        if ((xe.ctrlKey || xe.metaKey) && xe.key === "v" && D === "edit") {
          xe.preventDefault();
          const De = [];
          for (const ct of vs.current) {
            const at = m(ct.entity_id, ct.x + 20, ct.y + 20);
            at && De.push(at.id);
          }
          const Ue = [];
          for (const ct of bo.current) {
            const at = M(ct.type, ct.x + 20, ct.y + 20, {
              width: ct.width,
              height: ct.height,
              rotation: ct.rotation
            }, de ? pe : void 0);
            at && Ue.push(at.id);
          }
          (De.length > 0 || Ue.length > 0) && (ie(De), H(Ue), we([]));
        }
      }
    };
    return window.addEventListener("keydown", J), () => window.removeEventListener("keydown", J);
  }, [V, F, Ei, D, n, Re, ce, m, M]);
  const Oa = z.useCallback(() => {
    ee((J) => {
      const xe = J === "view" ? "edit" : "view";
      return xe === "view" && (oe("select"), we([]), ie([]), H([]), et(!1)), Ye(!1), xe;
    });
  }, [oe]), Ni = z.useCallback(
    (J) => {
      Y(J), R({ theme: J });
    },
    [Y, R]
  ), Nr = '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', Hr = {
    "--fp-accent": Vt,
    "--fp-font": Nr
  }, Po = q ? {
    "--fp-bg": "#1c1c1c",
    "--fp-card": "#252525",
    "--fp-text": "#e1e1e1",
    "--fp-text-secondary": "#9e9e9e",
    "--fp-border": "#3a3a3a",
    "--fp-hover": "#333333",
    "--fp-room-fill": "#2a2a2a",
    "--fp-room-stroke": "#888888",
    "--fp-room-label": "#cccccc",
    "--fp-grid": "#333333",
    ...Hr
  } : {
    "--fp-bg": "#f5f5f5",
    "--fp-card": "#ffffff",
    "--fp-text": "#212121",
    "--fp-text-secondary": "#727272",
    "--fp-border": "#e0e0e0",
    "--fp-hover": "#f0f0f0",
    "--fp-room-fill": "#e8e8e8",
    "--fp-room-stroke": "#000000",
    "--fp-room-label": "#333333",
    "--fp-grid": "#e0e0e0",
    ...Hr
  }, Hi = (J) => /* @__PURE__ */ v.jsx(
    lb,
    {
      themeConfigId: e.settings.theme_config_id,
      iconPackId: e.settings.icon_pack_id,
      domainColors: e.settings.domain_colors,
      domainIcons: e.settings.domain_icons,
      furnitureIcons: e.settings.furniture_icons,
      children: J
    }
  );
  if (!c)
    return Hi(
      /* @__PURE__ */ v.jsx(
        "div",
        {
          style: {
            ...Po,
            fontFamily: Nr,
            backgroundColor: "var(--fp-bg)",
            color: "var(--fp-text)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: /* @__PURE__ */ v.jsx("p", { style: { color: "var(--fp-text-secondary)" }, children: "Loading..." })
        }
      )
    );
  if (e.floors.length === 0)
    return Hi(
      /* @__PURE__ */ v.jsxs(
        "div",
        {
          style: {
            ...Po,
            fontFamily: Nr,
            backgroundColor: "var(--fp-bg)",
            color: "var(--fp-text)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16
          },
          children: [
            /* @__PURE__ */ v.jsx("h1", { style: { fontSize: 20, fontWeight: 600 }, children: "HomeLayout" }),
            /* @__PURE__ */ v.jsx("p", { style: { color: "var(--fp-text-secondary)" }, children: "No floors found in Home Assistant." }),
            /* @__PURE__ */ v.jsx("p", { style: { fontSize: 13, color: "var(--fp-text-secondary)" }, children: "Go to Settings → Areas & zones → Floors to create floors." })
          ]
        }
      )
    );
  const Vi = a((n == null ? void 0 : n.ha_floor_id) ?? null), ne = re.length + Re.length + ce.length, je = Re.length === 1, Ae = re.length === 1, Ve = ce.length === 1, Fe = D === "view" && (je || ne > 1), Oe = D === "view" && !Fe && Ne, Ze = D === "edit" && be, lt = Ze ? "half" : Fe || Oe ? "peek" : D === "edit" && (Q === "place" || Q === "furniture") ? "half" : D === "edit" && ne > 1 || D === "edit" && (Ae || je || Ve) ? "peek" : "hidden", Gt = Ze || Fe || Oe || D === "edit" && (Q === "place" || Q === "furniture" || ne > 1 || Ae || je || Ve), Cn = D === "edit" && Q === "draw" ? "Click to place vertices, double-click to finish" : D === "edit" && Q === "place" ? "Drag an entity from the list onto the canvas" : D === "edit" && Q === "furniture" ? "Drag furniture from the list onto the canvas" : D === "edit" && Q === "multiselect" ? "Drag to select, click items to add/remove" : null, cn = (J, xe, De, Ue) => /* @__PURE__ */ v.jsx(
    "button",
    {
      onClick: () => oe(Q === J ? "select" : J),
      title: De,
      style: {
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 17,
        cursor: "pointer",
        border: "none",
        outline: "none",
        backgroundColor: Ue ? Vt : "transparent",
        color: Ue ? "#fff" : q ? "#e1e1e1" : "#212121",
        transition: "all 0.15s"
      },
      children: xe
    },
    J
  ), Vr = (J, xe, De, Ue) => /* @__PURE__ */ v.jsx(
    "button",
    {
      onClick: J,
      disabled: De,
      title: Ue,
      style: {
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 17,
        cursor: De ? "not-allowed" : "pointer",
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        color: q ? "#e1e1e1" : "#212121",
        opacity: De ? 0.3 : 1,
        transition: "opacity 0.15s"
      },
      children: xe
    }
  );
  return Hi(
    /* @__PURE__ */ v.jsxs(
      "div",
      {
        style: {
          ...Po,
          fontFamily: Nr,
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "var(--fp-bg)",
          color: "var(--fp-text)"
        },
        children: [
          /* @__PURE__ */ v.jsx("div", { style: { position: "absolute", inset: 0, display: "flex" }, children: /* @__PURE__ */ v.jsx(
            Mb,
            {
              ref: Pn,
              floor: n,
              mode: D,
              activeTool: Q,
              selectedRoomIds: re,
              selectedEntityIds: Re,
              onSelectRoom: $n,
              onSelectEntity: ti,
              onClearSelection: Qn,
              onMarqueeSelect: Va,
              onAddRoom: d,
              onMoveRoom: ja,
              onMoveEntity: ys,
              onUpdateRoom: p,
              onDropEntity: Fa,
              selectedFurnitureIds: ce,
              onSelectFurniture: Ta,
              onMoveFurniture: Ra,
              onUpdateFurniture: C,
              onDropFurniture: za,
              onDefaultViewChange: _t,
              hass: t,
              gridSize: de ? pe : 20,
              gridEnabled: D === "edit" && de,
              isDark: q,
              defaultIconSize: e.settings.default_icon_size,
              domainIconSizes: e.settings.domain_icon_sizes
            }
          ) }),
          /* @__PURE__ */ v.jsxs("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }, children: [
            /* @__PURE__ */ v.jsxs(
              "div",
              {
                style: {
                  position: "absolute",
                  top: 12,
                  left: 12,
                  right: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8
                },
                children: [
                  /* @__PURE__ */ v.jsx(
                    "div",
                    {
                      style: {
                        display: "flex",
                        gap: 2,
                        padding: 3,
                        borderRadius: 14,
                        pointerEvents: "auto",
                        flexShrink: 1,
                        minWidth: 0,
                        overflow: "auto",
                        ...Wo(q)
                      },
                      children: e.floors.map((J) => {
                        const xe = J.id === r;
                        return /* @__PURE__ */ v.jsx(
                          "button",
                          {
                            onClick: () => o(J.id),
                            style: {
                              padding: "7px 14px",
                              borderRadius: 11,
                              border: "none",
                              outline: "none",
                              fontSize: 13,
                              fontWeight: xe ? 600 : 400,
                              fontFamily: "inherit",
                              backgroundColor: xe ? Vt : "transparent",
                              color: xe ? "#fff" : q ? "#e1e1e1" : "#212121",
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                              transition: "all 0.2s",
                              flexShrink: 0
                            },
                            children: J.name
                          },
                          J.id
                        );
                      })
                    }
                  ),
                  /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", gap: 6, flexShrink: 0 }, children: [
                    D === "view" && /* @__PURE__ */ v.jsx(
                      "button",
                      {
                        onClick: () => {
                          Ye((J) => !J), et(!1);
                        },
                        title: "Quick Access",
                        style: {
                          ...Ki(q),
                          width: 40,
                          height: 40,
                          fontSize: 16,
                          backgroundColor: Ne ? Vt : Ki(q).backgroundColor,
                          color: Ne ? "#fff" : Ki(q).color
                        },
                        children: /* @__PURE__ */ v.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ v.jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z" }) })
                      }
                    ),
                    /* @__PURE__ */ v.jsx(
                      "button",
                      {
                        onClick: Oa,
                        title: D === "edit" ? "Done" : "Edit",
                        style: {
                          ...Ki(q),
                          width: 40,
                          height: 40,
                          fontSize: 16,
                          backgroundColor: D === "edit" ? Vt : Ki(q).backgroundColor,
                          color: D === "edit" ? "#fff" : Ki(q).color
                        },
                        children: D === "edit" ? "✓" : "✎"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ v.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  top: 64,
                  left: "50%",
                  transform: `translateX(-50%) translateY(${Cn ? 0 : -8}px)`,
                  padding: "6px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  whiteSpace: "nowrap",
                  color: q ? "#9e9e9e" : "#727272",
                  pointerEvents: "none",
                  opacity: Cn ? 1 : 0,
                  transition: "opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1), transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                  ...Wo(q)
                },
                children: Cn ?? " "
              }
            ),
            /* @__PURE__ */ v.jsxs(
              "div",
              {
                style: {
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: `translateY(-50%) translateX(${D === "edit" ? 0 : -20}px)`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  pointerEvents: D === "edit" ? "auto" : "none",
                  opacity: D === "edit" ? 1 : 0,
                  transition: "opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1), transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)"
                },
                children: [
                  /* @__PURE__ */ v.jsxs(
                    "div",
                    {
                      style: {
                        borderRadius: 12,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        ...Wo(q)
                      },
                      children: [
                        cn("draw", /* @__PURE__ */ v.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ v.jsx("polygon", { points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" }) }), "Draw Room", Q === "draw"),
                        /* @__PURE__ */ v.jsx(
                          "div",
                          {
                            style: {
                              height: 1,
                              backgroundColor: q ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
                            }
                          }
                        ),
                        cn("place", /* @__PURE__ */ v.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                          /* @__PURE__ */ v.jsx("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }),
                          /* @__PURE__ */ v.jsx("circle", { cx: "12", cy: "10", r: "3" })
                        ] }), "Place Entity", Q === "place"),
                        /* @__PURE__ */ v.jsx(
                          "div",
                          {
                            style: {
                              height: 1,
                              backgroundColor: q ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
                            }
                          }
                        ),
                        cn("furniture", /* @__PURE__ */ v.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                          /* @__PURE__ */ v.jsx("path", { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" }),
                          /* @__PURE__ */ v.jsx("path", { d: "M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" }),
                          /* @__PURE__ */ v.jsx("path", { d: "M4 18v2" }),
                          /* @__PURE__ */ v.jsx("path", { d: "M20 18v2" })
                        ] }), "Furniture", Q === "furniture"),
                        /* @__PURE__ */ v.jsx(
                          "div",
                          {
                            style: {
                              height: 1,
                              backgroundColor: q ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
                            }
                          }
                        ),
                        cn("multiselect", "⬚", "Multi Select", Q === "multiselect"),
                        /* @__PURE__ */ v.jsx(
                          "div",
                          {
                            style: {
                              height: 1,
                              backgroundColor: q ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
                            }
                          }
                        ),
                        /* @__PURE__ */ v.jsxs(
                          "button",
                          {
                            onClick: () => {
                              const J = te.indexOf(K);
                              ae(te[(J + 1) % te.length]);
                            },
                            title: `Grid: ${K}`,
                            style: {
                              width: 44,
                              height: 44,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1,
                              cursor: "pointer",
                              border: "none",
                              outline: "none",
                              backgroundColor: de ? Vt : "transparent",
                              color: de ? "#fff" : q ? "#e1e1e1" : "#212121",
                              transition: "all 0.15s"
                            },
                            children: [
                              /* @__PURE__ */ v.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ v.jsx("path", { d: "M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" }) }),
                              de && /* @__PURE__ */ v.jsx("span", { style: { fontSize: 7, fontWeight: 600, lineHeight: 1, letterSpacing: 0.3, textTransform: "uppercase" }, children: ze[K] })
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ v.jsxs(
                    "div",
                    {
                      style: {
                        borderRadius: 12,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        ...Wo(q)
                      },
                      children: [
                        Vr(V, "↩", !W, "Undo (Ctrl+Z)"),
                        /* @__PURE__ */ v.jsx(
                          "div",
                          {
                            style: {
                              height: 1,
                              backgroundColor: q ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
                            }
                          }
                        ),
                        Vr(F, "↪", !U, "Redo (Ctrl+Y)")
                      ]
                    }
                  ),
                  /* @__PURE__ */ v.jsx(
                    "div",
                    {
                      style: {
                        borderRadius: 12,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        ...Wo(q)
                      },
                      children: /* @__PURE__ */ v.jsx(
                        "button",
                        {
                          onClick: () => et((J) => !J),
                          title: "Appearance",
                          style: {
                            width: 44,
                            height: 44,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 17,
                            cursor: "pointer",
                            border: "none",
                            outline: "none",
                            backgroundColor: be ? Vt : "transparent",
                            color: be ? "#fff" : q ? "#e1e1e1" : "#212121",
                            transition: "all 0.15s"
                          },
                          children: /* @__PURE__ */ v.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                            /* @__PURE__ */ v.jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
                            /* @__PURE__ */ v.jsx("circle", { cx: "12", cy: "12", r: "3" })
                          ] })
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ v.jsxs(
              "div",
              {
                style: {
                  position: "absolute",
                  right: !$ && Gt ? 388 : 12,
                  bottom: $ ? 100 : 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  pointerEvents: "auto",
                  transition: "right 0.32s cubic-bezier(0.32, 0.72, 0, 1)"
                },
                children: [
                  /* @__PURE__ */ v.jsx(
                    "button",
                    {
                      onClick: () => {
                        var J;
                        return (J = Pn.current) == null ? void 0 : J.resetView();
                      },
                      title: "Reset view",
                      style: {
                        ...Ki(q),
                        width: 40,
                        height: 40,
                        fontSize: 16,
                        opacity: Nt ? 0 : 1,
                        transform: `scale(${Nt ? 0.8 : 1})`,
                        transition: "opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1), transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                        pointerEvents: Nt ? "none" : "auto"
                      },
                      children: /* @__PURE__ */ v.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                        /* @__PURE__ */ v.jsx("path", { d: "M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" }),
                        /* @__PURE__ */ v.jsx("circle", { cx: "12", cy: "12", r: "3" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ v.jsx(
                    "button",
                    {
                      onClick: () => {
                        var J;
                        return (J = Pn.current) == null ? void 0 : J.rotateView();
                      },
                      title: "Rotate 90°",
                      style: {
                        ...Ki(q),
                        width: 40,
                        height: 40,
                        fontSize: 16
                      },
                      children: /* @__PURE__ */ v.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                        /* @__PURE__ */ v.jsx("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }),
                        /* @__PURE__ */ v.jsx("path", { d: "M21 3v5h-5" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ v.jsxs(
                    "div",
                    {
                      style: {
                        borderRadius: 12,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        ...Wo(q)
                      },
                      children: [
                        /* @__PURE__ */ v.jsx(
                          "button",
                          {
                            onClick: () => {
                              var J;
                              return (J = Pn.current) == null ? void 0 : J.zoomIn();
                            },
                            title: "Zoom in",
                            style: {
                              width: 40,
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 20,
                              fontWeight: 300,
                              cursor: "pointer",
                              border: "none",
                              outline: "none",
                              backgroundColor: "transparent",
                              color: q ? "#e1e1e1" : "#212121"
                            },
                            children: "+"
                          }
                        ),
                        /* @__PURE__ */ v.jsx(
                          "div",
                          {
                            style: {
                              height: 1,
                              backgroundColor: q ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
                            }
                          }
                        ),
                        /* @__PURE__ */ v.jsx(
                          "button",
                          {
                            onClick: () => {
                              var J;
                              return (J = Pn.current) == null ? void 0 : J.zoomOut();
                            },
                            title: "Zoom out",
                            style: {
                              width: 40,
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 20,
                              fontWeight: 300,
                              cursor: "pointer",
                              border: "none",
                              outline: "none",
                              backgroundColor: "transparent",
                              color: q ? "#e1e1e1" : "#212121"
                            },
                            children: "−"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ v.jsxs(
              "a",
              {
                href: "https://github.com/florisheyvaert/HomeLayout",
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  pointerEvents: "auto",
                  opacity: 0.7,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textDecoration: "none",
                  gap: 2
                },
                children: [
                  /* @__PURE__ */ v.jsx(
                    "img",
                    {
                      src: "/homelayout_panel/logo.svg",
                      alt: "HomeLayout",
                      style: { height: 32, width: "auto" }
                    }
                  ),
                  /* @__PURE__ */ v.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 8,
                        fontWeight: 600,
                        letterSpacing: 1.5,
                        color: q ? "#555" : "#bbb",
                        textTransform: "uppercase"
                      },
                      children: "HomeLayout"
                    }
                  )
                ]
              }
            ),
            $ ? /* @__PURE__ */ v.jsx(Pb, { targetSnap: lt, isDark: q, children: Gt && /* @__PURE__ */ v.jsx(
              G7,
              {
                mode: D,
                activeTool: Q,
                floor: n,
                selectedRoomIds: re,
                selectedEntityIds: Re,
                onUpdateRoom: p,
                onDeleteRoom: Ao,
                onUpdateEntity: b,
                onRemoveEntity: gs,
                onDeleteSelected: Ei,
                haAreas: Vi,
                hass: t,
                isDark: q,
                showAppearance: Ze,
                settings: e.settings,
                onUpdateSettings: R,
                themePreference: G,
                onSetTheme: Ni,
                getEntitiesForArea: l,
                onAddEntity: m,
                favorites: e.favorites,
                onAddFavorite: T,
                onRemoveFavorite: P,
                selectedFurnitureIds: ce,
                onUpdateFurniture: C,
                onRemoveFurniture: ms
              }
            ) }) : /* @__PURE__ */ v.jsx(Eb, { targetSnap: lt, isDark: q, children: Gt && /* @__PURE__ */ v.jsx(
              G7,
              {
                mode: D,
                activeTool: Q,
                floor: n,
                selectedRoomIds: re,
                selectedEntityIds: Re,
                onUpdateRoom: p,
                onDeleteRoom: Ao,
                onUpdateEntity: b,
                onRemoveEntity: gs,
                onDeleteSelected: Ei,
                haAreas: Vi,
                hass: t,
                isDark: q,
                showAppearance: Ze,
                settings: e.settings,
                onUpdateSettings: R,
                themePreference: G,
                onSetTheme: Ni,
                getEntitiesForArea: l,
                onAddEntity: m,
                favorites: e.favorites,
                onAddFavorite: T,
                onRemoveFavorite: P,
                selectedFurnitureIds: ce,
                onUpdateFurniture: C,
                onRemoveFurniture: ms
              }
            ) })
          ] })
        ]
      }
    )
  );
}
function MP({ hass: t }) {
  return /* @__PURE__ */ v.jsx(kP, { hass: t });
}
const LP = '*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.top-0{top:0}.mb-1{margin-bottom:.25rem}.mb-1\\.5{margin-bottom:.375rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.ml-0\\.5{margin-left:.125rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.ml-auto{margin-left:auto}.mr-2{margin-right:.5rem}.mr-4{margin-right:1rem}.mt-0\\.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-5{margin-top:1.25rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.inline-grid{display:inline-grid}.hidden{display:none}.h-1\\.5{height:.375rem}.h-2{height:.5rem}.h-3{height:.75rem}.h-6{height:1.5rem}.h-8{height:2rem}.max-h-40{max-height:10rem}.w-1\\.5{width:.375rem}.w-2{width:.5rem}.w-3{width:.75rem}.w-8{width:2rem}.w-full{width:100%}.w-px{width:1px}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.shrink{flex-shrink:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-grab{cursor:grab}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.resize{resize:both}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.space-y-0\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.125rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.125rem * var(--tw-space-y-reverse))}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.25rem * var(--tw-space-y-reverse))}.space-y-1\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.375rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.375rem * var(--tw-space-y-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.25rem * var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-b{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}.border{border-width:1px}.border-b{border-bottom-width:1px}.bg-amber-500{--tw-bg-opacity: 1;background-color:rgb(245 158 11 / var(--tw-bg-opacity, 1))}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.bg-neutral-700{--tw-bg-opacity: 1;background-color:rgb(64 64 64 / var(--tw-bg-opacity, 1))}.bg-red-600\\/10{background-color:#dc26261a}.p-2{padding:.5rem}.p-3{padding:.75rem}.p-4{padding:1rem}.px-1{padding-left:.25rem;padding-right:.25rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-8{padding-top:2rem;padding-bottom:2rem}.pb-3{padding-bottom:.75rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-\\[10px\\]{font-size:10px}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-light{font-weight:300}.font-medium{font-weight:500}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.capitalize{text-transform:capitalize}.tabular-nums{--tw-numeric-spacing: tabular-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.tracking-wide{letter-spacing:.025em}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity, 1))}.text-neutral-200{--tw-text-opacity: 1;color:rgb(229 229 229 / var(--tw-text-opacity, 1))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.accent-amber-400{accent-color:#fbbf24}.accent-blue-500{accent-color:#3b82f6}.accent-orange-400{accent-color:#fb923c}.opacity-40{opacity:.4}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.outline{outline-style:solid}.ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.hover\\:bg-amber-600:hover{--tw-bg-opacity: 1;background-color:rgb(217 119 6 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-200:hover{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity, 1))}.hover\\:bg-neutral-600:hover{--tw-bg-opacity: 1;background-color:rgb(82 82 82 / var(--tw-bg-opacity, 1))}.hover\\:bg-red-600\\/20:hover{background-color:#dc262633}.focus\\:border-blue-500:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:cursor-grabbing:active{cursor:grabbing}';
class AP extends HTMLElement {
  constructor() {
    super(...arguments);
    Id(this, "_root", null);
    Id(this, "_hass", null);
  }
  set hass(n) {
    this._hass = n, this._render();
  }
  set panel(n) {
  }
  connectedCallback() {
    const n = this.attachShadow({ mode: "open" }), r = document.createElement("style");
    r.textContent = LP, n.appendChild(r);
    const o = document.createElement("div");
    o.id = "root", o.style.height = "100%", o.style.width = "100%", o.style.overflow = "hidden", n.appendChild(o), this._root = ag(o), this._render();
  }
  disconnectedCallback() {
    var n;
    (n = this._root) == null || n.unmount(), this._root = null;
  }
  _render() {
    !this._root || !this._hass || this._root.render(/* @__PURE__ */ v.jsx(MP, { hass: this._hass }));
  }
}
customElements.define("homelayout-panel", AP);
