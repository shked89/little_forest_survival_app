<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import ButtonUi from '@/app/ui/ButtonUi.vue'
import { useNavigation } from '@/app/composables/useNavigation'
import { CameraController } from '@/app/controls/CameraController'
import { InputChannel } from '@/app/controls/InputChannel'
import {
  createGameView,
  type GameViewI,
} from '@/presentation/createGameView'

const { goToRoute } = useNavigation()

const gameContainerRef = ref<HTMLDivElement | null>(null)
let gameView: GameViewI | null = null
let inputChannel: InputChannel | null = null
let cameraController: CameraController | null = null
let animationFrameId: number | null = null

const tick = () => {
  if (!inputChannel || !cameraController) return

  const input = inputChannel.read()
  cameraController.update(input)

  animationFrameId = requestAnimationFrame(tick)
}

onMounted(async () => {
  const container = gameContainerRef.value

  if (!container)
    throw new Error('Game container is not mounted')

  gameView = createGameView('pixi_simple')

  await gameView.init({
    container,
  })

  inputChannel = new InputChannel(container)
  cameraController = new CameraController(gameView)
  animationFrameId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
  if (inputChannel) inputChannel.destroy()
  if (gameView) gameView.destroy()

  animationFrameId = null
  cameraController = null
  inputChannel = null
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
