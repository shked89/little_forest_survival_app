<script setup>
import ScreenWrapper from '@/interface/layout/ScreenWrapper.vue'
import ButtonUi from '@/interface/ui/ButtonUi.vue'
import { useNavigation } from '@/interface/composables/useNavigation.js'

const { goToRoute } = useNavigation()
</script>

<template>
  <ScreenWrapper>
    <h1>Game</h1>
    <ButtonUi
      text="Back to menu"
      @click="goToRoute('home')"
    />
  </ScreenWrapper>
</template>
