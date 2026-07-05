<script lang="ts">
  export let code = '404';
  export let title = 'Page not found';
  export let message = 'The page you are looking for may have moved or never existed.';
</script>

<div class="error-page">
  <div class="glow" aria-hidden="true"></div>
  <div class="content">
    <span class="code gradient-accent">{code}</span>
    <h1>{title}</h1>
    <p>{message}</p>
    <div class="actions">
      <a href="/" class="btn-primary">Back to home</a>
      <a href="/products" class="btn-secondary">Browse products</a>
    </div>
  </div>
</div>

<style>
  .error-page { position: relative; min-height: 70vh; display: grid; place-items: center; padding: var(--s-8) var(--s-5); overflow: hidden; }
  .glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 600px; background: radial-gradient(circle, var(--primary-subtle) 0%, transparent 60%); pointer-events: none; }
  .content { position: relative; text-align: center; max-width: 480px; display: flex; flex-direction: column; align-items: center; gap: var(--s-3); }
  .code { font-family: var(--font-display); font-size: clamp(5rem, 15vw, 8rem); font-weight: 800; line-height: 1; letter-spacing: -0.04em; }
  h1 { font-size: 1.75rem; }
  p { font-size: 0.9375rem; color: var(--text-muted); }
  .actions { display: flex; gap: 10px; margin-top: var(--s-4); flex-wrap: wrap; justify-content: center; }
  .btn-primary, .btn-secondary { display: inline-flex; align-items: center; justify-content: center; height: 44px; padding: 0 20px; border-radius: var(--r-md); font-size: 0.875rem; font-weight: 600; transition: all var(--dur) var(--ease); }
  .btn-primary { background: var(--grad-primary); color: #fff; box-shadow: 0 2px 8px var(--primary-glow); }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px var(--primary-glow); }
  .btn-secondary { background: var(--bg-surface-2); color: var(--text); border: 1px solid var(--border-strong); }
  .btn-secondary:hover { background: var(--bg-surface-3); border-color: var(--text-subtle); }
</style>
