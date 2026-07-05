import { c as create_ssr_component, f as each, d as add_attribute, e as escape } from "./ssr.js";
import "./stores2.js";
/* empty css                                         */
const css = {
  code: ".crumbs.svelte-ae0zd7{display:flex;align-items:center;flex-wrap:wrap;gap:6px;font-size:0.8125rem}.crumb.svelte-ae0zd7{color:var(--text-subtle);transition:color var(--dur) var(--ease)}a.crumb.svelte-ae0zd7:hover{color:var(--text)}.crumb.current.svelte-ae0zd7{color:var(--text-muted)}.sep.svelte-ae0zd7{width:14px;height:14px;color:var(--text-subtle)}",
  map: '{"version":3,"file":"Breadcrumb.svelte","sources":["Breadcrumb.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let items = [];\\nimport { navigate } from \\"../router\\";\\n<\/script>\\n\\n<nav class=\\"crumbs\\" aria-label=\\"Breadcrumb\\">\\n  {#each items as item, i}\\n    {#if i > 0}\\n      <svg class=\\"sep\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" aria-hidden=\\"true\\"><path d=\\"M9 18l6-6-6-6\\"/></svg>\\n    {/if}\\n    {#if item.href && !item.current}\\n      <a href={item.href} class=\\"crumb\\">{item.label}</a>\\n    {:else}\\n      <span class=\\"crumb current\\" aria-current=\\"page\\">{item.label}</span>\\n    {/if}\\n  {/each}\\n</nav>\\n\\n<style>\\n  .crumbs { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; font-size: 0.8125rem; }\\n  .crumb { color: var(--text-subtle); transition: color var(--dur) var(--ease); }\\n  a.crumb:hover { color: var(--text); }\\n  .crumb.current { color: var(--text-muted); }\\n  .sep { width: 14px; height: 14px; color: var(--text-subtle); }\\n</style>\\n"],"names":[],"mappings":"AAkBE,qBAAQ,CAAE,OAAO,CAAE,IAAI,CAAE,WAAW,CAAE,MAAM,CAAE,SAAS,CAAE,IAAI,CAAE,GAAG,CAAE,GAAG,CAAE,SAAS,CAAE,SAAW,CAC/F,oBAAO,CAAE,KAAK,CAAE,IAAI,aAAa,CAAC,CAAE,UAAU,CAAE,KAAK,CAAC,IAAI,KAAK,CAAC,CAAC,IAAI,MAAM,CAAG,CAC9E,CAAC,oBAAM,MAAO,CAAE,KAAK,CAAE,IAAI,MAAM,CAAG,CACpC,MAAM,sBAAS,CAAE,KAAK,CAAE,IAAI,YAAY,CAAG,CAC3C,kBAAK,CAAE,KAAK,CAAE,IAAI,CAAE,MAAM,CAAE,IAAI,CAAE,KAAK,CAAE,IAAI,aAAa,CAAG"}'
};
const Breadcrumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = [] } = $$props;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  $$result.css.add(css);
  return `<nav class="crumbs svelte-ae0zd7" aria-label="Breadcrumb">${each(items, (item, i) => {
    return `${i > 0 ? `<svg class="sep svelte-ae0zd7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 18l6-6-6-6"></path></svg>` : ``} ${item.href && !item.current ? `<a${add_attribute("href", item.href, 0)} class="crumb svelte-ae0zd7">${escape(item.label)}</a>` : `<span class="crumb current svelte-ae0zd7" aria-current="page">${escape(item.label)}</span>`}`;
  })} </nav>`;
});
export {
  Breadcrumb as B
};
