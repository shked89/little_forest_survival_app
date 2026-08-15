<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'p',
  },
})
</script>

<template>
  <component
    :is="tag"
    class="text-ui"
  >
    {{ text }}
  </component>
</template>