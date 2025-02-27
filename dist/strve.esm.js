const e = i(
		'html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot'
	),
	t = i(
		'svg,animate,circle,clippath,cursor,image,defs,desc,ellipse,filter,font-faceforeignobject,g,glyph,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feFlood,feGaussianBlur,feImage,feMerge,feMorphology,feOffset,feSpecularLighting,feTile,feTurbulence,feDistantLight,fePointLight,feSpotLight,linearGradient,stop,radialGradient,animateTransform,animateMotion'
	);
function n(e) {
	return ':' === e.charAt(5) && 'xlink' === e.slice(0, 5);
}
function r(e) {
	return (
		-1 !==
		['object', 'array', 'function', 'regexp', 'date', 'math'].indexOf(o(e))
	);
}
function o(e) {
	return Object.prototype.toString
		.call(e)
		.match(/\[object (.+?)\]/)[1]
		.toLowerCase();
}
const l = i(
	'function,regexp,date,math,undefined,null,boolean,string,number,symbol,bigInt'
);
function i(e) {
	const t = Object.create(null),
		n = e.split(',');
	for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return function (e) {
		return t[e];
	};
}
function s(e) {
	if (
		e.hasOwnProperty('tag') &&
		e.hasOwnProperty('props') &&
		e.hasOwnProperty('children')
	)
		return !0;
}
function a(e, t) {
	return e && e.hasOwnProperty(t);
}
function c(e) {
	if ('array' === o(e)) {
		for (let t = 0; t < e.length; t++) if (s(e[t])) return !0;
	} else if ('object' === o(e)) return s(e);
}
function u(e, t) {
	if (!y(e) || !y(t)) return e === t;
	if (e === t) return !0;
	const n = Object.keys(e),
		r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (const n in e) {
		if (!u(e[n], t[n])) return !1;
	}
	return !0;
}
const f = {
		svg: 'http://www.w3.org/2000/svg',
		math: 'http://www.w3.org/1998/Math/MathML',
	},
	p = 'http://www.w3.org/1999/xlink';
function h(e, t) {
	for (let n in t) e.style[n] = t[n];
}
function d(e, t, r) {
	var o;
	if (
		(n(t)
			? e.removeAttributeNS(p, n((o = t)) ? o.slice(6, o.length) : '')
			: e.removeAttribute(t),
		t.startsWith('on'))
	) {
		const n = t.split('on')[1][0].toLowerCase() + t.split('on')[1].substring(1);
		e.removeEventListener(n, r[t]);
	}
}
function g(n) {
	return e(n)
		? document.createElement(n)
		: t(n)
		? ((r = (function (e) {
				return t(e) ? 'svg' : 'math' === e ? 'math' : void 0;
		  })(n)),
		  (o = n),
		  document.createElementNS(f[r], o))
		: 'fragment' === n || 'component' === n
		? document.createDocumentFragment()
		: 'comment' === n || 'null' === n
		? document.createComment(n)
		: 'textnode' === n
		? document.createTextNode('')
		: void 0;
	var r, o;
}
function m(e) {
	return e.tag
		? e
		: (function (e) {
				return { tag: 'fragment', props: null, children: e };
		  })(e);
}
function b(e, t, n) {
	const r = new CustomEvent(e, t);
	r && n && document.querySelector(n).dispatchEvent(r);
}
function w(e, t, n) {
	if (e) {
		const r = document.querySelector(e);
		return (
			null === D.observer && (D.observer = new MutationObserver(n)),
			{
				start() {
					D.observer && D.observer.observe(r, t);
				},
				stop() {
					let e = D.observer.takeRecords();
					D.observer.disconnect(),
						'array' === o(e) && 0 === e.length && (D.observer = null);
				},
			}
		);
	}
	console.error(
		'[Strve warn]: Please check whether the element exists or need to put watchDOMChange on the mount node.'
	);
}
const y = (e) => ('object' == typeof e || 'function' == typeof e) && null !== e;
function v(e, t = new WeakMap()) {
	if (e.constructor === Date) return new Date(e);
	if (e.constructor === RegExp) return new RegExp(e);
	if (t.has(e)) return t.get(e);
	const n = Object.getOwnPropertyDescriptors(e),
		r = Object.create(Object.getPrototypeOf(e), n);
	t.set(e, r);
	for (let n of Reflect.ownKeys(e))
		r[n] = y(e[n]) && 'function' != typeof e[n] ? v(e[n], t) : e[n];
	return r;
}
const x = Object.create(null),
	O = new WeakMap(),
	M = ['$key', '$name'];
let S = '';
function j(e, t, r) {
	if (e.tag) {
		const l = g(e.tag);
		if (e.props) {
			!(function (e, t) {
				for (let n = 0; n < Object.keys(t).length; n++) {
					const r = Object.keys(t)[n].toString();
					if (r.startsWith('on')) {
						const n =
							r.split('on')[1][0].toLowerCase() + r.split('on')[1].substring(1);
						e.addEventListener(n, t[r]);
					}
				}
			})(l, e.props),
				a(e.props, M[0]) && (e.el = l),
				e.props[M[1]] &&
					((x[e.props[M[1]]] = Object.create(null)),
					O.set(x[e.props[M[1]]], e.children[0]));
			for (const t in e.props)
				e.props.hasOwnProperty(t) &&
					('function' !== o(e.props[t]) &&
						(n(t)
							? l.setAttributeNS(p, t, e.props[t])
							: t !== M[0] && t !== M[1] && l.setAttribute(t, e.props[t])),
					'object' === o(e.props[t]) && h(l, e.props[t]));
		}
		if (e.children) {
			L(e.children, l, function () {
				'array' === o(e.children[0])
					? e.children[0].forEach((e) => {
							s(e) && j(e, l);
					  })
					: 'array' === o(e.children) &&
					  e.children.forEach((e) => {
							s(e) && j(e, l);
					  });
			});
		}
		r ? t.insertBefore(l, r) : t.appendChild(l);
	}
}
function k(e, t, r) {
	const l = e.props || {};
	if (a(l, M[0]) && e.tag !== t.tag) {
		const n = e.el.parentNode,
			r = e.el.nextSibling;
		n.removeChild(e.el), j(t, n, r);
	} else {
		let i = null;
		if (a(l, M[0])) {
			const r = t.props || {};
			i = t.el = e.el;
			for (const e in r) {
				let [t, s] = [r[e], l[e]];
				if (t !== s)
					if (null !== t) {
						if ('function' !== o(t) && e !== M[0])
							i[e] && (i[e] = t),
								n(e) ? i.setAttributeNS(p, e, t) : i.setAttribute(e, t),
								'object' === o(t) && h(i, t);
						else if (e.startsWith('on')) {
							const n =
								e.split('on')[1][0].toLowerCase() +
								e.split('on')[1].substring(1);
							i.addEventListener(n, t, !1);
						}
					} else d(i, e, l);
			}
			for (const e in l) e in r || d(i, e, l);
		}
		const s = e.children[0],
			c = t.children[0],
			f = e.children,
			g = t.children;
		if (!u(f, g)) {
			L(g, i, function () {
				'array' !== o(s) && 'array' === o(c)
					? ((i.innerHTML = ''), c.forEach((e) => j(e, i)))
					: 'array' === o(s) && 'array' === o(c)
					? C(s, c, i, r)
					: C(f, g, i, r);
			});
		}
	}
}
function C(e, t, n, r) {
	if ('useFirstKey' === r)
		for (let o = 1; o <= Math.max(e.length, t.length); o++)
			e[e.length - o]
				? t[t.length - o]
					? k(e[e.length - o], t[t.length - o], r)
					: n.removeChild(e[e.length - o].el)
				: j(t[t.length - o], e[e.length - 1].el.parentNode, e[0].el);
	else {
		for (let n = 0; n < Math.min(e.length, t.length); n++) k(e[n], t[n], r);
		t.length > e.length
			? t.slice(e.length).forEach((e) => j(e, n))
			: e.length > t.length &&
			  e.slice(t.length).forEach((e) => {
					n.removeChild(e.el);
			  });
	}
}
function L(e, t, n) {
	1 !== e.length || r(e[0])
		? e.length > 1 && !c(e)
			? t && E(e.join().replace(/,/g, ''), t)
			: !r(e[0]) || e[0].tag || c(e[0])
			? n()
			: t && E(e[0], t)
		: t && E(e, t);
}
function E(e, t) {
	r(e)
		? 'function' === o(e) || 'regexp' === o(e) || 'array' === o(e)
			? (t.textContent = String(e))
			: (t.textContent = JSON.stringify(e, null, 2))
		: (t.textContent = e ? e.toString() : String(e));
}
function T(e, t, n, r) {
	if (D.isMounted) {
		const t = m(e);
		k(D.oldTree, t, n), (D.oldTree = t), r && O.set(x[r], e);
	} else {
		const n = m(e);
		j(n, t), (D.oldTree = n), (D.isMounted = !0);
	}
}
function _(e, t) {
	if ('function' === o(e) && 'undefined' !== o(Promise))
		return Promise.resolve()
			.then(() => {
				e();
			})
			.then(() => {
				if (t && 'useRouter' === t.status)
					(D._el.innerHTML = ''), j((D.oldTree = R(D._template())), D._el);
				else if (t && 'function' == typeof t.name) {
					const e = t.name.name,
						n = t.name();
					S !== e && ((S = e), (D.oldTree = m(O.get(x[e])))),
						T(n, D._el, t.status, e);
				} else {
					const e = t && t.status ? t.status : null;
					T(R(D._template()), D._el, e);
				}
			})
			.catch((e) => console.error(e));
}
const P = '3.1.0',
	D = {
		_el: null,
		_template: null,
		oldTree: null,
		isMounted: !1,
		observer: null,
	};
function N(e) {
	for (let t = 0; t < e.length; t++) {
		const n = e[t];
		'array' === o(n) && N(n),
			'' === n
				? e.splice(t, 1, { tag: 'comment', children: [], props: null })
				: l(o(n))
				? e.splice(t, 1, { tag: 'textnode', children: [n], props: null })
				: n.children && c(n.children) && N(n.children);
	}
	return e;
}
function R(e) {
	return 'array' === o(e)
		? N(e)
		: c(e) && 'object' === o(e)
		? ((e.children = N(e.children)), e)
		: { tag: 'textnode', children: [e], props: null };
}
function A(e) {
	if ('string' == typeof e) {
		const t = document.querySelector(e);
		return (
			t ||
				console.warn(
					`[Strve warn]: Failed to mount app: mount target selector "${e}" returned null.`
				),
			t
		);
	}
	return window.ShadowRoot &&
		e instanceof window.ShadowRoot &&
		'closed' === e.mode
		? (console.warn(
				'[Strve warn]: mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs.'
		  ),
		  null)
		: e instanceof HTMLElement
		? e
		: null;
}
function W(e) {
	return {
		mount(t) {
			if (A(t)) {
				(D._el = A(t)), (D._template = e);
				const n = R(e());
				D._el && T(n, D._el);
			} else console.warn('[Strve warn]: There must be a mount element node.');
		},
	};
}
let q = function (e, t, n, r) {
		let o;
		t[0] = 0;
		for (let l = 1; l < t.length; l++) {
			let i = t[l++],
				s = t[l] ? ((t[0] |= i ? 1 : 2), n[t[l++]]) : t[++l];
			(void 0 === s && null === s) ||
				(3 === i
					? (r[0] = s)
					: 4 === i
					? (r[1] = Object.assign(r[1] || {}, s))
					: 5 === i
					? ((r[1] = r[1] || {})[t[++l]] = s)
					: 6 === i
					? (r[1][t[++l]] += s + '')
					: i
					? ((o = e.apply(s, q(e, s, n, ['', null]))),
					  r.push(o),
					  s[0] ? (t[0] |= 2) : ((t[l - 2] = 0), (t[l] = o)))
					: r.push(s));
		}
		return r;
	},
	F = new WeakMap();
const $ = function (e) {
	let t = F.get(this);
	return (
		t || ((t = new WeakMap()), F.set(this, t)),
		(t = q(
			this,
			t.get(e) ||
				(t.set(
					e,
					(t = (function (e) {
						let t,
							n,
							r,
							o = 1,
							l = '',
							i = '',
							s = [0],
							a = 0;
						for (
							r = function (e) {
								1 === o && (e || (l = l.replace(/^\s*\n\s*|\s*\n\s*$/g, '')))
									? s.push(0, e, l)
									: 3 === o && (e || l)
									? (s.push(3, e, l), (o = 2))
									: 2 === o && '...' === l && e
									? s.push(4, e, 0)
									: 2 === o && l && !e
									? s.push(5, 0, !0, l)
									: o >= 5 &&
									  ((l || (!e && 5 === o)) && (s.push(o, 0, l, n), (o = 6)),
									  e && (s.push(o, e, 0, n), (o = 6))),
									(l = '');
							};
							a < e.length;
							a++
						) {
							a && (1 === o && r(), r(a));
							for (let c = 0; c < e[a].length; c++)
								(t = e[a][c]),
									1 === o
										? '<' === t
											? (r(), (s = [s]), (o = 3))
											: (l += t)
										: 4 === o
										? '--' === l && '>' === t
											? ((o = 1), (l = ''))
											: (l = t + l[0])
										: i
										? t === i
											? (i = '')
											: (l += t)
										: '"' === t || "'" === t
										? (i = t)
										: '>' === t
										? (r(), (o = 1))
										: o &&
										  ('=' === t
												? ((o = 5), (n = l), (l = ''))
												: '/' === t && (o < 5 || '>' === e[a][c + 1])
												? (r(),
												  3 === o && (s = s[0]),
												  (o = s),
												  (s = s[0]).push(2, 0, o),
												  (o = 0))
												: ' ' === t || '\t' === t || '\n' === t || '\r' === t
												? (r(), (o = 2))
												: (l += t)),
									3 === o && '!--' === l && ((o = 4), (s = s[0]));
						}
						return r(), s;
					})(e))
				),
				t),
			arguments,
			[]
		)).length > 1
			? t
			: t[0]
	);
}.bind(function (e, t, ...n) {
	return { tag: e, props: t, children: n };
});
export {
	v as clone,
	W as createApp,
	b as emit,
	$ as h,
	_ as setData,
	P as version,
	w as watchDom,
};
