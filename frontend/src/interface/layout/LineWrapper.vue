<script setup>
defineProps({
  tag: {
    type: String,
    default: 'div',
  },
  variant: {
    default: 'vertical',
  },
})
</script>

<template>
  <component
    :is="tag"
    class="line-wrapper"
    :class="`line-wrapper--${variant}`"
  >
    <slot />
  </component>
</template>

<style scoped>
.line-wrapper {
  display: flex;
  gap: 20px;
  width: 100%;
}

.line-wrapper--vertical {
  flex-direction: column;
}

.line-wrapper--horizontal {
  flex-direction: row;
}
</style>
