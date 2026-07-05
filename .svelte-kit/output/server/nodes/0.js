import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.X2Xfzg3e.js","_app/immutable/chunks/qqjDhm0B.js","_app/immutable/chunks/DS9YRGbX.js","_app/immutable/chunks/hhzXkGW9.js","_app/immutable/chunks/DI13amzq.js","_app/immutable/chunks/COlygbly.js","_app/immutable/chunks/D3B5XFRw.js","_app/immutable/chunks/7oamOqmp.js","_app/immutable/chunks/CaRbwPCu.js"];
export const stylesheets = ["_app/immutable/assets/Button.CbTB0w3K.css","_app/immutable/assets/0.CnU-su5u.css"];
export const fonts = [];
