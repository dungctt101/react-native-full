!(function (e, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define([], n)
    : 'object' == typeof exports
    ? (exports.tweenState = n())
    : (e.tweenState = n());
})(this, function () {
  return (function (e) {
    function n(r) {
      if (t[r]) return t[r].exports;
      var a = (t[r] = {exports: {}, id: r, loaded: !1});
      return e[r].call(a.exports, a, a.exports, n), (a.loaded = !0), a.exports;
    }
    var t = {};
    return (n.m = e), (n.c = t), (n.p = ''), n(0);
  })({
    0: function (e, n, t) {
      e.exports = t(90);
    },
    1: function (e, n) {
      function t() {
        (c = !1), o.length ? (s = o.concat(s)) : (f = -1), s.length && r();
      }
      function r() {
        if (!c) {
          var e = setTimeout(t);
          c = !0;
          for (var n = s.length; n; ) {
            for (o = s, s = []; ++f < n; ) o && o[f].run();
            (f = -1), (n = s.length);
          }
          (o = null), (c = !1), clearTimeout(e);
        }
      }
      function a(e, n) {
        (this.fun = e), (this.array = n);
      }
      function u() {}
      var o,
        i = (e.exports = {}),
        s = [],
        c = !1,
        f = -1;
      (i.nextTick = function (e) {
        var n = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var t = 1; t < arguments.length; t++) n[t - 1] = arguments[t];
        s.push(new a(e, n)), 1 !== s.length || c || setTimeout(r, 0);
      }),
        (a.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (i.title = 'browser'),
        (i.browser = !0),
        (i.env = {}),
        (i.argv = []),
        (i.version = ''),
        (i.versions = {}),
        (i.on = u),
        (i.addListener = u),
        (i.once = u),
        (i.off = u),
        (i.removeListener = u),
        (i.removeAllListeners = u),
        (i.emit = u),
        (i.binding = function (e) {
          throw new Error('process.binding is not supported');
        }),
        (i.cwd = function () {
          return '/';
        }),
        (i.chdir = function (e) {
          throw new Error('process.chdir is not supported');
        }),
        (i.umask = function () {
          return 0;
        });
    },
    90: function (e, n, t) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : {default: e};
      }
      Object.defineProperty(n, '__esModule', {value: !0});
      var a = t(165),
        u = r(a),
        o = t(91),
        i = r(o),
        s = 'ADDITIVE',
        c = a.easeInOutQuad,
        f = 300,
        l = 0,
        h = {ADDITIVE: 'ADDITIVE', DESTRUCTIVE: 'DESTRUCTIVE'},
        v = {
          _rafID: null,
          getInitialState: function () {
            return {tweenQueue: []};
          },
          componentWillUnmount: function () {
            i['default'].cancel(this._rafID), (this._rafID = -1);
          },
          tweenState: function (e, n) {
            var t = this,
              r = n.easing,
              a = n.duration,
              u = n.delay,
              o = n.beginValue,
              v = n.endValue,
              d = n.onEnd,
              p = n.stackBehavior;
            this.setState(function (n) {
              var I = n,
                w = void 0,
                g = void 0;
              if ('string' == typeof e) (w = e), (g = e);
              else {
                for (var M = 0; M < e.length - 1; M++) I = I[e[M]];
                (w = e[e.length - 1]), (g = e.join('|'));
              }
              var m = {
                  easing: r || c,
                  duration: null == a ? f : a,
                  delay: null == u ? l : u,
                  beginValue: null == o ? I[w] : o,
                  endValue: v,
                  onEnd: d,
                  stackBehavior: p || s,
                },
                x = n.tweenQueue;
              return (
                m.stackBehavior === h.DESTRUCTIVE &&
                  (x = n.tweenQueue.filter(function (e) {
                    return e.pathHash !== g;
                  })),
                x.push({
                  pathHash: g,
                  config: m,
                  initTime: Date.now() + m.delay,
                }),
                (I[w] = m.endValue),
                1 === x.length && (t._rafID = (0, i['default'])(t._rafCb)),
                {tweenQueue: x}
              );
            });
          },
          getTweeningValue: function (e) {
            var n = this.state,
              t = void 0,
              r = void 0;
            if ('string' == typeof e) (t = n[e]), (r = e);
            else {
              t = n;
              for (var a = 0; a < e.length; a++) t = t[e[a]];
              r = e.join('|');
            }
            for (var u = Date.now(), a = 0; a < n.tweenQueue.length; a++) {
              var o = n.tweenQueue[a],
                i = o.pathHash,
                s = o.initTime,
                c = o.config;
              if (i === r) {
                var f = u - s > c.duration ? c.duration : Math.max(0, u - s),
                  l =
                    0 === c.duration
                      ? c.endValue
                      : c.easing(f, c.beginValue, c.endValue, c.duration),
                  h = l - c.endValue;
                t += h;
              }
            }
            return t;
          },
          _rafCb: function () {
            var e = this.state;
            if (0 !== e.tweenQueue.length) {
              for (
                var n = Date.now(), t = [], r = 0;
                r < e.tweenQueue.length;
                r++
              ) {
                var a = e.tweenQueue[r],
                  u = a.initTime,
                  o = a.config;
                n - u < o.duration ? t.push(a) : o.onEnd && o.onEnd();
              }
              -1 !== this._rafID &&
                (this.setState({tweenQueue: t}),
                (this._rafID = (0, i['default'])(this._rafCb)));
            }
          },
        };
      (n['default'] = {Mixin: v, easingTypes: u['default'], stackBehavior: h}),
        (e.exports = n['default']);
    },
    91: function (e, n, t) {
      for (
        var r = t(92),
          a = 'undefined' == typeof window ? {} : window,
          u = ['moz', 'webkit'],
          o = 'AnimationFrame',
          i = a['request' + o],
          s = a['cancel' + o] || a['cancelRequest' + o],
          c = 0;
        c < u.length && !i;
        c++
      )
        (i = a[u[c] + 'Request' + o]),
          (s = a[u[c] + 'Cancel' + o] || a[u[c] + 'CancelRequest' + o]);
      if (!i || !s) {
        var f = 0,
          l = 0,
          h = [],
          v = 1e3 / 60;
        (i = function (e) {
          if (0 === h.length) {
            var n = r(),
              t = Math.max(0, v - (n - f));
            (f = t + n),
              setTimeout(function () {
                var e = h.slice(0);
                h.length = 0;
                for (var n = 0; n < e.length; n++)
                  if (!e[n].cancelled)
                    try {
                      e[n].callback(f);
                    } catch (t) {
                      setTimeout(function () {
                        throw t;
                      }, 0);
                    }
              }, Math.round(t));
          }
          return h.push({handle: ++l, callback: e, cancelled: !1}), l;
        }),
          (s = function (e) {
            for (var n = 0; n < h.length; n++)
              h[n].handle === e && (h[n].cancelled = !0);
          });
      }
      (e.exports = function (e) {
        return i.call(a, e);
      }),
        (e.exports.cancel = function () {
          s.apply(a, arguments);
        });
    },
    92: function (e, n, t) {
      (function (n) {
        (function () {
          var t, r, a;
          'undefined' != typeof performance &&
          null !== performance &&
          performance.now
            ? (e.exports = function () {
                return performance.now();
              })
            : 'undefined' != typeof n && null !== n && n.hrtime
            ? ((e.exports = function () {
                return (t() - a) / 1e6;
              }),
              (r = n.hrtime),
              (t = function () {
                var e;
                return (e = r()), 1e9 * e[0] + e[1];
              }),
              (a = t()))
            : Date.now
            ? ((e.exports = function () {
                return Date.now() - a;
              }),
              (a = Date.now()))
            : ((e.exports = function () {
                return new Date().getTime() - a;
              }),
              (a = new Date().getTime()));
        }.call(this));
      }.call(n, t(1)));
    },
    165: function (e, n) {
      'use strict';
      var t = {
        linear: function (e, n, t, r) {
          var a = t - n;
          return (a * e) / r + n;
        },
        easeInQuad: function (e, n, t, r) {
          var a = t - n;
          return a * (e /= r) * e + n;
        },
        easeOutQuad: function (e, n, t, r) {
          var a = t - n;
          return -a * (e /= r) * (e - 2) + n;
        },
        easeInOutQuad: function (e, n, t, r) {
          var a = t - n;
          return (e /= r / 2) < 1
            ? (a / 2) * e * e + n
            : (-a / 2) * (--e * (e - 2) - 1) + n;
        },
        easeInCubic: function (e, n, t, r) {
          var a = t - n;
          return a * (e /= r) * e * e + n;
        },
        easeOutCubic: function (e, n, t, r) {
          var a = t - n;
          return a * ((e = e / r - 1) * e * e + 1) + n;
        },
        easeInOutCubic: function (e, n, t, r) {
          var a = t - n;
          return (e /= r / 2) < 1
            ? (a / 2) * e * e * e + n
            : (a / 2) * ((e -= 2) * e * e + 2) + n;
        },
        easeInQuart: function (e, n, t, r) {
          var a = t - n;
          return a * (e /= r) * e * e * e + n;
        },
        easeOutQuart: function (e, n, t, r) {
          var a = t - n;
          return -a * ((e = e / r - 1) * e * e * e - 1) + n;
        },
        easeInOutQuart: function (e, n, t, r) {
          var a = t - n;
          return (e /= r / 2) < 1
            ? (a / 2) * e * e * e * e + n
            : (-a / 2) * ((e -= 2) * e * e * e - 2) + n;
        },
        easeInQuint: function (e, n, t, r) {
          var a = t - n;
          return a * (e /= r) * e * e * e * e + n;
        },
        easeOutQuint: function (e, n, t, r) {
          var a = t - n;
          return a * ((e = e / r - 1) * e * e * e * e + 1) + n;
        },
        easeInOutQuint: function (e, n, t, r) {
          var a = t - n;
          return (e /= r / 2) < 1
            ? (a / 2) * e * e * e * e * e + n
            : (a / 2) * ((e -= 2) * e * e * e * e + 2) + n;
        },
        easeInSine: function (e, n, t, r) {
          var a = t - n;
          return -a * Math.cos((e / r) * (Math.PI / 2)) + a + n;
        },
        easeOutSine: function (e, n, t, r) {
          var a = t - n;
          return a * Math.sin((e / r) * (Math.PI / 2)) + n;
        },
        easeInOutSine: function (e, n, t, r) {
          var a = t - n;
          return (-a / 2) * (Math.cos((Math.PI * e) / r) - 1) + n;
        },
        easeInExpo: function (e, n, t, r) {
          var a = t - n;
          return 0 == e ? n : a * Math.pow(2, 10 * (e / r - 1)) + n;
        },
        easeOutExpo: function (e, n, t, r) {
          var a = t - n;
          return e == r ? n + a : a * (-Math.pow(2, (-10 * e) / r) + 1) + n;
        },
        easeInOutExpo: function (e, n, t, r) {
          var a = t - n;
          return 0 === e
            ? n
            : e === r
            ? n + a
            : (e /= r / 2) < 1
            ? (a / 2) * Math.pow(2, 10 * (e - 1)) + n
            : (a / 2) * (-Math.pow(2, -10 * --e) + 2) + n;
        },
        easeInCirc: function (e, n, t, r) {
          var a = t - n;
          return -a * (Math.sqrt(1 - (e /= r) * e) - 1) + n;
        },
        easeOutCirc: function (e, n, t, r) {
          var a = t - n;
          return a * Math.sqrt(1 - (e = e / r - 1) * e) + n;
        },
        easeInOutCirc: function (e, n, t, r) {
          var a = t - n;
          return (e /= r / 2) < 1
            ? (-a / 2) * (Math.sqrt(1 - e * e) - 1) + n
            : (a / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + n;
        },
        easeInElastic: function (e, n, t, r) {
          var a,
            u,
            o,
            i = t - n;
          return (
            (o = 1.70158),
            (u = 0),
            (a = i),
            0 === e
              ? n
              : 1 === (e /= r)
              ? n + i
              : (u || (u = 0.3 * r),
                a < Math.abs(i)
                  ? ((a = i), (o = u / 4))
                  : (o = (u / (2 * Math.PI)) * Math.asin(i / a)),
                -(
                  a *
                  Math.pow(2, 10 * (e -= 1)) *
                  Math.sin(((e * r - o) * (2 * Math.PI)) / u)
                ) + n)
          );
        },
        easeOutElastic: function (e, n, t, r) {
          var a,
            u,
            o,
            i = t - n;
          return (
            (o = 1.70158),
            (u = 0),
            (a = i),
            0 === e
              ? n
              : 1 === (e /= r)
              ? n + i
              : (u || (u = 0.3 * r),
                a < Math.abs(i)
                  ? ((a = i), (o = u / 4))
                  : (o = (u / (2 * Math.PI)) * Math.asin(i / a)),
                a *
                  Math.pow(2, -10 * e) *
                  Math.sin(((e * r - o) * (2 * Math.PI)) / u) +
                  i +
                  n)
          );
        },
        easeInOutElastic: function (e, n, t, r) {
          var a,
            u,
            o,
            i = t - n;
          return (
            (o = 1.70158),
            (u = 0),
            (a = i),
            0 === e
              ? n
              : 2 === (e /= r / 2)
              ? n + i
              : (u || (u = r * (0.3 * 1.5)),
                a < Math.abs(i)
                  ? ((a = i), (o = u / 4))
                  : (o = (u / (2 * Math.PI)) * Math.asin(i / a)),
                1 > e
                  ? -0.5 *
                      (a *
                        Math.pow(2, 10 * (e -= 1)) *
                        Math.sin(((e * r - o) * (2 * Math.PI)) / u)) +
                    n
                  : a *
                      Math.pow(2, -10 * (e -= 1)) *
                      Math.sin(((e * r - o) * (2 * Math.PI)) / u) *
                      0.5 +
                    i +
                    n)
          );
        },
        easeInBack: function (e, n, t, r, a) {
          var u = t - n;
          return (
            void 0 === a && (a = 1.70158),
            u * (e /= r) * e * ((a + 1) * e - a) + n
          );
        },
        easeOutBack: function (e, n, t, r, a) {
          var u = t - n;
          return (
            void 0 === a && (a = 1.70158),
            u * ((e = e / r - 1) * e * ((a + 1) * e + a) + 1) + n
          );
        },
        easeInOutBack: function (e, n, t, r, a) {
          var u = t - n;
          return (
            void 0 === a && (a = 1.70158),
            (e /= r / 2) < 1
              ? (u / 2) * (e * e * (((a *= 1.525) + 1) * e - a)) + n
              : (u / 2) * ((e -= 2) * e * (((a *= 1.525) + 1) * e + a) + 2) + n
          );
        },
        easeInBounce: function (e, n, r, a) {
          var u,
            o = r - n;
          return (u = t.easeOutBounce(a - e, 0, o, a)), o - u + n;
        },
        easeOutBounce: function (e, n, t, r) {
          var a = t - n;
          return (e /= r) < 1 / 2.75
            ? a * (7.5625 * e * e) + n
            : 2 / 2.75 > e
            ? a * (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) + n
            : 2.5 / 2.75 > e
            ? a * (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) + n
            : a * (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375) + n;
        },
        easeInOutBounce: function (e, n, r, a) {
          var u,
            o = r - n;
          return a / 2 > e
            ? ((u = t.easeInBounce(2 * e, 0, o, a)), 0.5 * u + n)
            : ((u = t.easeOutBounce(2 * e - a, 0, o, a)),
              0.5 * u + 0.5 * o + n);
        },
      };
      e.exports = t;
    },
  });
});
