
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/orders" | "/api/orders/[id]" | "/api/otp" | "/api/otp/send" | "/api/otp/verify" | "/api/payment" | "/api/payment/create" | "/api/products" | "/api/products/[slug]" | "/cart" | "/checkout" | "/orders" | "/order" | "/order/[id]" | "/otp" | "/otp/[email]" | "/products" | "/product" | "/product/[slug]" | "/success" | "/success/[id]";
		RouteParams(): {
			"/api/orders/[id]": { id: string };
			"/api/products/[slug]": { slug: string };
			"/order/[id]": { id: string };
			"/otp/[email]": { email: string };
			"/product/[slug]": { slug: string };
			"/success/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string | undefined; slug?: string | undefined; email?: string | undefined };
			"/api": { id?: string | undefined; slug?: string | undefined };
			"/api/orders": { id?: string | undefined };
			"/api/orders/[id]": { id: string };
			"/api/otp": Record<string, never>;
			"/api/otp/send": Record<string, never>;
			"/api/otp/verify": Record<string, never>;
			"/api/payment": Record<string, never>;
			"/api/payment/create": Record<string, never>;
			"/api/products": { slug?: string | undefined };
			"/api/products/[slug]": { slug: string };
			"/cart": Record<string, never>;
			"/checkout": Record<string, never>;
			"/orders": Record<string, never>;
			"/order": { id?: string | undefined };
			"/order/[id]": { id: string };
			"/otp": { email?: string | undefined };
			"/otp/[email]": { email: string };
			"/products": Record<string, never>;
			"/product": { slug?: string | undefined };
			"/product/[slug]": { slug: string };
			"/success": { id?: string | undefined };
			"/success/[id]": { id: string }
		};
		Pathname(): "/" | "/api/orders" | `/api/orders/${string}` & {} | "/api/otp/send" | "/api/otp/verify" | "/api/payment/create" | "/api/products" | `/api/products/${string}` & {} | "/cart" | "/checkout" | "/orders" | `/order/${string}` & {} | `/otp/${string}` & {} | "/products" | `/product/${string}` & {} | `/success/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}