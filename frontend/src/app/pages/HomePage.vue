<script setup>
import ScreenWrapper from '@/app/layout/ScreenWrapper.vue'
import LineWrapper from '@/app/layout/LineWrapper.vue'
import ButtonUi from '@/app/ui/ButtonUi.vue'
import { useNavigation } from '@/app/composables/useNavigation.js'

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
        text="Singleplayer"
        variant="primary"
        @click="goToRoute('game')"
      />
      <ButtonUi
        text="Multiplayer"
        disabled
      />
      <ButtonUi
        text="About"
        @click="goToRoute('about')"
      />
    </LineWrapper>
  </ScreenWrapper>
</template>
