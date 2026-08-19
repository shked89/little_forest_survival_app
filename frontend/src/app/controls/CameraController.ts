import type { GameViewI } from '@/presentation/createGameView'
import type { InputState } from './InputChannel'

const CAMERA_SPEED = 500

export class CameraController {
  #view
  #lastUpdateTime: number | null = null

  constructor(view: GameViewI) {
    this.#view = view
  }

  update(input: InputState) {
    const now = performance.now()

    if (this.#lastUpdateTime === null) return (this.#lastUpdateTime = now)

    const deltaTime = (now - this.#lastUpdateTime) / 1000
    this.#lastUpdateTime = now

    let { x, y } = this.#view.getCurrentCameraPosition()

    x += input.moveX * CAMERA_SPEED * deltaTime
    y += input.moveY * CAMERA_SPEED * deltaTime

    if (input.pointerDown) {
      x -= input.pointerDeltaX
      y -= input.pointerDeltaY
    }

    this.#view.moveCameraTo(x, y)
  }
}
