<script setup>
defineProps({
  text: {
    type: [String, Number],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: /** @type {import('vue').PropType<'button' | 'submit' | 'reset'>} */ (String),
    default: 'button',
  },
  variant: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <button
    class="button-ui"
    :class="`button-ui--${variant}`"
    :type="type"
    :disabled="disabled"
  >
    <span v-if="text !== ''">
      {{ text }}
    </span>
    <slot v-else />
  </button>
</template>

<style scoped>
.button-ui {
  min-width: 44px;
  min-height: 44px;
  padding: 10px 18px;

  border: 3px solid var(--button-border-color);
  background: var(--button-color);
  box-shadow: 0 3px 0 var(--button-border-color);

  font: inherit;
  font-weight: 900;
  color: var(--button-border-color);

  cursor: pointer;

  border-radius: 6px;

  transition: all 40ms ease;
}


.button-ui:hover:not(:disabled) {
  background: #e6d79d;
}

.button-ui:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 0 0 0 var(--button-border-color);
}

.button-ui:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
}

.button-ui:disabled {
  cursor: default;
  opacity: 0.4;
}

/* **** variants **** */

.button-ui--primary {
  background: #8fba72;
}

.button-ui--primary:hover:not(:disabled) {
  background: #a2ca82;
}

.button-ui--danger {
  background: #c97867;
}

.button-ui--danger:hover:not(:disabled) {
  background: #da8977;
}
</style>