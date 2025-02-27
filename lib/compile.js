// Version:3.1.0
function vnode(tag, props, ...children) {
	return {
		tag,
		props,
		children,
	};
}
let n = function (t, s, r, e) {
	let u;
	s[0] = 0;
	for (let h = 1; h < s.length; h++) {
		let p = s[h++],
			a = s[h] ? ((s[0] |= p ? 1 : 2), r[s[h++]]) : s[++h];
		if (a !== undefined || a !== null) {
			3 === p
				? (e[0] = a)
				: 4 === p
				? (e[1] = Object.assign(e[1] || {}, a))
				: 5 === p
				? ((e[1] = e[1] || {})[s[++h]] = a)
				: 6 === p
				? (e[1][s[++h]] += a + '')
				: p
				? ((u = t.apply(a, n(t, a, r, ['', null]))),
				  e.push(u),
				  a[0] ? (s[0] |= 2) : ((s[h - 2] = 0), (s[h] = u)))
				: e.push(a);
		}
	}
	return e;
};
let t = new WeakMap();
function compile(s) {
	let r = t.get(this);
	return (
		r || ((r = new WeakMap()), t.set(this, r)),
		(r = n(
			this,
			r.get(s) ||
				(r.set(
					s,
					(r = (function (n) {
						let t,
							s,
							r = 1,
							e = '',
							u = '',
							h = [0],
							p,
							a = 0;
						for (
							t,
								s,
								r,
								e,
								u,
								h,
								p = function (n) {
									1 === r && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, '')))
										? h.push(0, n, e)
										: 3 === r && (n || e)
										? (h.push(3, n, e), (r = 2))
										: 2 === r && '...' === e && n
										? h.push(4, n, 0)
										: 2 === r && e && !n
										? h.push(5, 0, !0, e)
										: r >= 5 &&
										  ((e || (!n && 5 === r)) && (h.push(r, 0, e, s), (r = 6)),
										  n && (h.push(r, n, 0, s), (r = 6))),
										(e = '');
								},
								a;
							a < n.length;
							a++
						) {
							a && (1 === r && p(), p(a));
							for (let l = 0; l < n[a].length; l++)
								(t = n[a][l]),
									1 === r
										? '<' === t
											? (p(), (h = [h]), (r = 3))
											: (e += t)
										: 4 === r
										? '--' === e && '>' === t
											? ((r = 1), (e = ''))
											: (e = t + e[0])
										: u
										? t === u
											? (u = '')
											: (e += t)
										: '"' === t || "'" === t
										? (u = t)
										: '>' === t
										? (p(), (r = 1))
										: r &&
										  ('=' === t
												? ((r = 5), (s = e), (e = ''))
												: '/' === t && (r < 5 || '>' === n[a][l + 1])
												? (p(),
												  3 === r && (h = h[0]),
												  (r = h),
												  (h = h[0]).push(2, 0, r),
												  (r = 0))
												: ' ' === t || '\t' === t || '\n' === t || '\r' === t
												? (p(), (r = 2))
												: (e += t)),
									3 === r && '!--' === e && ((r = 4), (h = h[0]));
						}
						return p(), h;
					})(s))
				),
				r),
			arguments,
			[]
		)).length > 1
			? r
			: r[0]
	);
}
export const h = compile.bind(vnode);
