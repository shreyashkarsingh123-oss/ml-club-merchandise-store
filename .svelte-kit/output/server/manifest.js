export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DE9BL8Iv.js",app:"_app/immutable/entry/app.D0SPh3CT.js",imports:["_app/immutable/entry/start.DE9BL8Iv.js","_app/immutable/chunks/DI13amzq.js","_app/immutable/chunks/qqjDhm0B.js","_app/immutable/entry/app.D0SPh3CT.js","_app/immutable/chunks/qqjDhm0B.js","_app/immutable/chunks/DS9YRGbX.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/orders",
				pattern: /^\/api\/orders\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/orders/_server.ts.js'))
			},
			{
				id: "/api/orders/[id]",
				pattern: /^\/api\/orders\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/orders/_id_/_server.ts.js'))
			},
			{
				id: "/api/otp/send",
				pattern: /^\/api\/otp\/send\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/otp/send/_server.ts.js'))
			},
			{
				id: "/api/otp/verify",
				pattern: /^\/api\/otp\/verify\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/otp/verify/_server.ts.js'))
			},
			{
				id: "/api/payment/create",
				pattern: /^\/api\/payment\/create\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/payment/create/_server.ts.js'))
			},
			{
				id: "/api/products",
				pattern: /^\/api\/products\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/products/_server.ts.js'))
			},
			{
				id: "/api/products/[slug]",
				pattern: /^\/api\/products\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/products/_slug_/_server.ts.js'))
			},
			{
				id: "/cart",
				pattern: /^\/cart\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/checkout",
				pattern: /^\/checkout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/orders",
				pattern: /^\/orders\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/order/[id]",
				pattern: /^\/order\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/otp/[email]",
				pattern: /^\/otp\/([^/]+?)\/?$/,
				params: [{"name":"email","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/products",
				pattern: /^\/products\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/product/[slug]",
				pattern: /^\/product\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/success/[id]",
				pattern: /^\/success\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
