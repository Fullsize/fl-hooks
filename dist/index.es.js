import { useState as r, useReducer as t, useEffect as e } from "react";
import o from "axios";
let n = o;
const a = (r, t) => {
  switch (t.type) {
    case "FETCH_INIT":
      return { ...r, loading: !0, error: !1 };
    case "FETCH_SUCCESS":
      return { ...r, loading: !1, error: !1, data: t.payload };
    case "FETCH_FAILURE":
      return { ...r, loading: !1, error: !0 };
    default:
      throw new Error();
  }
};
function c(c) {
  const [l, s] = r(c),
    [i, d] = t(a, { loading: !1, error: !1, data: null });
  e(() => {
    const r = new AbortController();
    return (
      (async () => {
        d({ type: "FETCH_INIT" });
        try {
          null;
          const t = await n({ ...c, cancelToken: undefined });
          r.signal.aborted || d({ type: "FETCH_SUCCESS", payload: t.data });
        } catch (r) {
          o.isCancel(r) || d({ type: "FETCH_FAILURE" });
        }
      })(),
      () => { }
    );
  }, [l]);
  return [
    i,
    (r) => {
      s({ ...l, ...r });
    },
  ];
}
function l(t, o) {
  const [n, a] = r(() => {
    try {
      const r = window.localStorage.getItem(t);
      return r ? JSON.parse(r) : o ?? "";
    } catch (r) {
      return console.error(r), o;
    }
  });
  e(() => {
    try {
      window.localStorage.setItem(t, JSON.stringify(n));
    } catch (r) {
      console.error(r);
    }
  }, [t, n]);
  return [
    n,
    a,
    () => {
      try {
        window.localStorage.removeItem(t), a("");
      } catch (r) {
        console.error(r);
      }
    },
  ];
}
c.extend = (r) => {
  n = r;
};
export { c as useAxios, l as useLocalStorage };
