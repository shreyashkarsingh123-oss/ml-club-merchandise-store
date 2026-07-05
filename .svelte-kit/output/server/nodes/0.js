import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.d9WHoAa5.js","_app/immutable/chunks/qqjDhm0B.js","_app/immutable/chunks/DS9YRGbX.js","_app/immutable/chunks/DZN4eofw.js","_app/immutable/chunks/Be21lRLK.js","_app/immutable/chunks/Blaloabf.js","_app/immutable/chunks/D3B5XFRw.js","_app/immutable/chunks/7oamOqmp.js","_app/immutable/chunks/CaRbwPCu.js"];
export const stylesheets = ["_app/immutable/assets/Button.CbTB0w3K.css","_app/immutable/assets/0.CnU-su5u.css"];
export const fonts = [];
