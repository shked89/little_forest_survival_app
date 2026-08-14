<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: '_blank',
  },
  rel: {
    type: String,
    default: 'noopener noreferrer',
  },
  variant: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <a
    :href="href"
    class="link-ui"
    :class="`link-ui--${variant}`"
    :target="target"
    :rel="rel"
  >
    <slot />
  </a>
</template>

<style scoped>
.link-ui {
  color: rgb(70, 33, 3);
  font-weight: 600;
  display: inline-flex;
  gap: 6px;
}

.link-ui:hover {
  color: var(--button-border-color);
}

/* **** variants **** */

.link-ui--default {
  text-shadow: 1px 2px 12px rgba(136, 136, 136, 0.666);
}
</style>