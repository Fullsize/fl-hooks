!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? t(exports, require("react"), require("axios"))
		: "function" == typeof define && define.amd
			? define(["exports", "react", "axios"], t)
			: t(
				((e = "undefined" != typeof globalThis ? globalThis : e || self)[
					"fl-hooks"
				] = {}),
				e.react,
				e.axios
			);
})(this, function (e, t, r) {
	"use strict";
	let o = r;
	const n = (e, t) => {
		switch (t.type) {
			case "FETCH_INIT":
				return { ...e, loading: !0, error: !1 };
			case "FETCH_SUCCESS":
				return { ...e, loading: !1, error: !1, data: t.payload };
			case "FETCH_FAILURE":
				return { ...e, loading: !1, error: !0 };
			default:
				throw new Error();
		}
	};
	function a(e) {
		const [a, c] = t.useState(e),
			[s, i] = t.useReducer(n, { loading: !1, error: !1, data: null });
		t.useEffect(() => {
			const t = new AbortController();
			return (
				(async () => {
					i({ type: "FETCH_INIT" });
					try {
						null;
						const r = await o({ ...e, cancelToken: undefined });
						t.signal.aborted || i({ type: "FETCH_SUCCESS", payload: r.data });
					} catch (e) {
						r.isCancel(e) || i({ type: "FETCH_FAILURE" });
					}
				})(),
				() => { }
			);
		}, [a]);
		return [
			s,
			(e) => {
				c({ ...a, ...e });
			},
		];
	}
	(a.extend = (e) => {
		o = e;
	}),
		(e.useAxios = a),
		(e.useLocalStorage = function (e, r) {
			const [o, n] = t.useState(() => {
				try {
					const t = window.localStorage.getItem(e);
					return t ? JSON.parse(t) : r ?? "";
				} catch (e) {
					return console.error(e), r;
				}
			});
			return (
				t.useEffect(() => {
					try {
						window.localStorage.setItem(e, JSON.stringify(o));
					} catch (e) {
						console.error(e);
					}
				}, [e, o]),
				[
					o,
					n,
					() => {
						try {
							window.localStorage.removeItem(e), n("");
						} catch (e) {
							console.error(e);
						}
					},
				]
			);
		});
});
