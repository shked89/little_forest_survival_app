<script setup lang="ts">
interface Props {
  text?: string | number | null
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'primary' | 'transparent' | 'danger'
}

withDefaults(defineProps<Props>(), {
  text: '',
  disabled: false,
  type: 'button',
  variant: 'default',
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

.button-ui--transparent {
  background: #8888885d;

  border: 1px solid #646464b2;
  box-shadow: 0 1px 0 #646464b2;
}

.button-ui--danger {
  background: #c97867;
}

.button-ui--danger:hover:not(:disabled) {
  background: #da8977;
}
</style>