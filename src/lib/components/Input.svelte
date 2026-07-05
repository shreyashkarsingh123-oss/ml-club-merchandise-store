<script lang="ts">
  export let label = '';
  export let value: string | number = '';
  export let type = 'text';
  export let placeholder = '';
  export let required = false;
  export let disabled = false;
  export let error = '';
  export let id = '';
  export let autocomplete = '';
  export let min: string | number | null = null;
  export let max: string | number | null = null;
  export let maxlength: number | null = null;
  export let inputmode: 'text' | 'numeric' | 'email' | 'tel' | null = null;

  const inputId = id || `in_${Math.random().toString(36).slice(2, 8)}`;

  function onInput(e: Event) {
    const t = e.target as HTMLInputElement;
    value = type === 'number' ? (t.value === '' ? '' : Number(t.value)) as any : t.value;
  }
</script>

<div class="field">
  {#if label}
    <label for={inputId} class="field-label">{label}{#if required}<span class="req" aria-hidden="true">*</span>{/if}</label>
  {/if}
  <input
    id={inputId}
    {type}
    {placeholder}
    {required}
    {disabled}
    {autocomplete}
    {inputmode}
    value={value}
    on:input={onInput}
    class="field-input"
    class:has-error={!!error}
    aria-invalid={!!error}
    aria-describedby={error ? `${inputId}-err` : undefined}
    {...(min !== null ? { min } : {})}
    {...(max !== null ? { max } : {})}
    {...(maxlength !== null ? { maxlength } : {})}
  />
  {#if error}
    <p id={`${inputId}-err`} class="field-error" role="alert">{error}</p>
  {/if}
</div>

<style>
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field-label {
    font-size: 0.8125rem; font-weight: 500; color: var(--text-muted);
    letter-spacing: -0.01em;
  }
  .req { color: var(--primary); margin-left: 2px; }
  .field-input {
    width: 100%;
    height: 44px;
    padding: 0 14px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    color: var(--text);
    transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease), background var(--dur) var(--ease);
  }
  .field-input::placeholder { color: var(--text-subtle); }
  .field-input:hover { border-color: var(--border-strong); }
  .field-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-glow);
    background: var(--bg-elevated);
  }
  .field-input.has-error { border-color: var(--error); }
  .field-input.has-error:focus { box-shadow: 0 0 0 3px var(--error-glow); }
  .field-input:disabled { opacity: 0.5; cursor: not-allowed; }
  .field-error { font-size: 0.75rem; color: var(--error); }
</style>
