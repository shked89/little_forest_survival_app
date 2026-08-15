<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  name: {
    type: String,
    required: true,
  },

  width: {
    type: String,
    default: '24px',
  },

  height: {
    type: String,
    default: '24px',
  },
})
</script>

<template>
  <Icon
    :icon="name"
    :width="width"
    :height="height"
  />
</template>