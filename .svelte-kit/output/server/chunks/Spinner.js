import { c as create_ssr_component, e as escape } from "./ssr.js";
const css = {
  code: ".spinner.svelte-5kahg.svelte-5kahg{display:inline-flex;align-items:center;justify-content:center;color:var(--primary)}.spinner.svelte-5kahg svg.svelte-5kahg{animation:spin 0.7s linear infinite}.spinner-sm.svelte-5kahg svg.svelte-5kahg{width:16px;height:16px}.spinner-md.svelte-5kahg svg.svelte-5kahg{width:24px;height:24px}.spinner-lg.svelte-5kahg svg.svelte-5kahg{width:40px;height:40px}",
  map: '{"version":3,"file":"Spinner.svelte","sources":["Spinner.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let size = \\"md\\";\\n<\/script>\\n\\n<div class=\\"spinner spinner-{size}\\" role=\\"status\\" aria-label=\\"Loading\\">\\n  <svg viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2.5\\" stroke-linecap=\\"round\\">\\n    <path d=\\"M21 12a9 9 0 11-6.219-8.56\\" />\\n  </svg>\\n</div>\\n\\n<style>\\n  .spinner { display: inline-flex; align-items: center; justify-content: center; color: var(--primary); }\\n  .spinner svg { animation: spin 0.7s linear infinite; }\\n  .spinner-sm svg { width: 16px; height: 16px; }\\n  .spinner-md svg { width: 24px; height: 24px; }\\n  .spinner-lg svg { width: 40px; height: 40px; }\\n</style>\\n"],"names":[],"mappings":"AAUE,kCAAS,CAAE,OAAO,CAAE,WAAW,CAAE,WAAW,CAAE,MAAM,CAAE,eAAe,CAAE,MAAM,CAAE,KAAK,CAAE,IAAI,SAAS,CAAG,CACtG,qBAAQ,CAAC,gBAAI,CAAE,SAAS,CAAE,IAAI,CAAC,IAAI,CAAC,MAAM,CAAC,QAAU,CACrD,wBAAW,CAAC,gBAAI,CAAE,KAAK,CAAE,IAAI,CAAE,MAAM,CAAE,IAAM,CAC7C,wBAAW,CAAC,gBAAI,CAAE,KAAK,CAAE,IAAI,CAAE,MAAM,CAAE,IAAM,CAC7C,wBAAW,CAAC,gBAAI,CAAE,KAAK,CAAE,IAAI,CAAE,MAAM,CAAE,IAAM"}'
};
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = "md" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  $$result.css.add(css);
  return `<div class="${"spinner spinner-" + escape(size, true) + " svelte-5kahg"}" role="status" aria-label="Loading"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="svelte-5kahg"><path d="M21 12a9 9 0 11-6.219-8.56"></path></svg> </div>`;
});
export {
  Spinner as S
};
