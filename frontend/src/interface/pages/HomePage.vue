<script setup>
import ScreenWrapper from '@/interface/layout/ScreenWrapper.vue'
import LineWrapper from '@/interface/layout/LineWrapper.vue'
import ButtonUi from '@/interface/ui/ButtonUi.vue'
import { useNavigation } from '@/interface/composables/useNavigation.js'

const { goToRoute } = useNavigation()
</script>

<template>
  <ScreenWrapper>
    <h1>Little Forest Survival</h1>

    <LineWrapper
      tag="nav"
      aria-label="Main menu"
    >
      <ButtonUi
        text="Play"
        variant="primary"
        @click="goToRoute('game')"
      />
      <ButtonUi
        text="About"
        @click="goToRoute('about')"
      />
    </LineWrapper>
  </ScreenWrapper>
</template>
