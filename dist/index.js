import { useState as r, useReducer as t, useEffect as n } from "react";
import e from "axios";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var o =
  function () {
    return (
      (o =
        Object.assign ||
        function (r) {
          for (var t, n = 1, e = arguments.length; n < e; n++)
            for (var o in (t = arguments[n]))
              Object.prototype.hasOwnProperty.call(t, o) && (r[o] = t[o]);
          return r;
        }),
      o.apply(this, arguments)
    );
  };
function a(r, t, n, e) {
  return new (n || (n = Promise))(function (o, a) {
    function c(r) {
      try {
        u(e.next(r));
      } catch (r) {
        a(r);
      }
    }
    function i(r) {
      try {
        u(e.throw(r));
      } catch (r) {
        a(r);
      }
    }
    function u(r) {
      var t;
      r.done
        ? o(r.value)
        : ((t = r.value),
          t instanceof n
            ? t
            : new n(function (r) {
              r(t);
            })).then(c, i);
    }
    u((e = e.apply(r, t || [])).next());
  });
}
function c(r, t) {
  var n,
    e,
    o,
    a,
    c = {
      label: 0,
      sent: function () {
        if (1 & o[0]) throw o[1];
        return o[1];
      },
      trys: [],
      ops: [],
    };
  return (
    (a = { next: i(0), throw: i(1), return: i(2) }),
    "function" == typeof Symbol &&
    (a[Symbol.iterator] = function () {
      return this;
    }),
    a
  );
  function i(a) {
    return function (i) {
      return (function (a) {
        if (n) throw new TypeError("Generator is already executing.");
        for (; c;)
          try {
            if (
              ((n = 1),
                e &&
                (o =
                  2 & a[0]
                    ? e.return
                    : a[0]
                      ? e.throw || ((o = e.return) && o.call(e), 0)
                      : e.next) &&
                !(o = o.call(e, a[1])).done)
            )
              return o;
            switch (((e = 0), o && (a = [2 & a[0], o.value]), a[0])) {
              case 0:
              case 1:
                o = a;
                break;
              case 4:
                return c.label++, { value: a[1], done: !1 };
              case 5:
                c.label++, (e = a[1]), (a = [0]);
                continue;
              case 7:
                (a = c.ops.pop()), c.trys.pop();
                continue;
              default:
                if (
                  !((o = c.trys),
                    (o = o.length > 0 && o[o.length - 1]) ||
                    (6 !== a[0] && 2 !== a[0]))
                ) {
                  c = 0;
                  continue;
                }
                if (3 === a[0] && (!o || (a[1] > o[0] && a[1] < o[3]))) {
                  c.label = a[1];
                  break;
                }
                if (6 === a[0] && c.label < o[1]) {
                  (c.label = o[1]), (o = a);
                  break;
                }
                if (o && c.label < o[2]) {
                  (c.label = o[2]), c.ops.push(a);
                  break;
                }
                o[2] && c.ops.pop(), c.trys.pop();
                continue;
            }
            a = t.call(r, c);
          } catch (r) {
            (a = [6, r]), (e = 0);
          } finally {
            n = o = 0;
          }
        if (5 & a[0]) throw a[1];
        return { value: a[0] ? a[1] : void 0, done: !0 };
      })([a, i]);
    };
  }
}
var i = e,
  u = function (r, t) {
    switch (t.type) {
      case "FETCH_INIT":
        return o(o({}, r), { loading: !0, error: !1 });
      case "FETCH_SUCCESS":
        return o(o({}, r), { loading: !1, error: !1, data: t.payload });
      case "FETCH_FAILURE":
        return o(o({}, r), { loading: !1, error: !0 });
      default:
        throw new Error();
    }
  };
function l(l) {
  var s = this,
    f = r(l),
    p = f[0],
    y = f[1],
    h = t(u, { loading: !1, error: !1, data: null }),
    d = h[0],
    w = h[1];
  n(
    function () {
      var r = new AbortController();
      return (
        a(s, void 0, void 0, function () {
          var t, n;
          return c(this, function (a) {
            switch (a.label) {
              case 0:
                w({ type: "FETCH_INIT" }), (a.label = 1);
              case 1:
                return (
                  a.trys.push([1, 3, , 4]),
                  [4, i(o(o({}, l), { cancelToken: void 0 }))]
                );
              case 2:
                return (
                  (t = a.sent()),
                  r.signal.aborted ||
                  w({ type: "FETCH_SUCCESS", payload: t.data }),
                  [3, 4]
                );
              case 3:
                return (
                  (n = a.sent()),
                  e.isCancel(n) || w({ type: "FETCH_FAILURE" }),
                  [3, 4]
                );
              case 4:
                return [2];
            }
          });
        }),
        function () { }
      );
    },
    [p]
  );
  return [
    d,
    function (r) {
      y(o(o({}, p), r));
    },
  ];
}
function s(t, e) {
  var o = r(function () {
    try {
      var r = window.localStorage.getItem(t);
      return r ? JSON.parse(r) : null != e ? e : "";
    } catch (r) {
      return console.error(r), e;
    }
  }),
    a = o[0],
    c = o[1];
  n(
    function () {
      try {
        window.localStorage.setItem(t, JSON.stringify(a));
      } catch (r) {
        console.error(r);
      }
    },
    [t, a]
  );
  return [
    a,
    c,
    function () {
      try {
        window.localStorage.removeItem(t), c("");
      } catch (r) {
        console.error(r);
      }
    },
  ];
}
l.extend = function (r) {
  i = r;
};
export { l as useAxios, s as useLocalStorage };
