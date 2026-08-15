<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import ButtonUi from '@/app/ui/ButtonUi.vue'
import { useNavigation } from '@/app/composables/useNavigation'
import {
  createGameView,
  type GameViewI,
} from '@/presentation/createGameView'

const { goToRoute } = useNavigation()

const gameContainerRef = ref<HTMLDivElement | null>(null)
let gameView: GameViewI | null = null

onMounted(async () => {
  const container = gameContainerRef.value

  if (!container)
    throw new Error('Game container is not mounted')

  gameView = createGameView('pixi')

  await gameView.init({
    container,
  })
})

onBeforeUnmount(() => {
  gameView?.destroy()
  gameView = null
})
</script>

<template>
  <ButtonUi
    text="X"
    class="button-exit"
    variant="transparent"
    @click="goToRoute('home')"
  />
  <div
    ref="gameContainerRef"
    class="game-canvas"
  />
</template>

<style scoped>
.button-exit {
  position: absolute;
  right: 0;
  margin: 10px;
}

.game-canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.game-canvas :deep(canvas) {
  display: block;
}
</style>
