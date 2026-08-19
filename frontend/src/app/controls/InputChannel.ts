export interface InputState {
  readonly moveX: number
  readonly moveY: number
  readonly pointerDeltaX: number
  readonly pointerDeltaY: number
  readonly pointerDown: boolean
}

export class InputChannel {
  #element: HTMLElement
  #pressedKeys = new Set<string>()

  #pointerDown = false
  #pointerDeltaX = 0
  #pointerDeltaY = 0

  constructor(element: HTMLElement) {
    this.#element = element

    window.addEventListener('keydown', this.#handleKeyDown)
    window.addEventListener('keyup', this.#handleKeyUp)
    window.addEventListener('blur', this.#handleBlur)

    this.#element.addEventListener('pointerdown', this.#handlePointerDown)
    this.#element.addEventListener('pointermove', this.#handlePointerMove)
    this.#element.addEventListener('pointerup', this.#handlePointerUp)
    this.#element.addEventListener('pointercancel', this.#handlePointerUp)
  }

  read(): InputState {
    const moveX = Number(this.#pressedKeys.has('KeyD')) - Number(this.#pressedKeys.has('KeyA'))

    const moveY = Number(this.#pressedKeys.has('KeyS')) - Number(this.#pressedKeys.has('KeyW'))

    const state: InputState = {
      moveX,
      moveY,
      pointerDeltaX: this.#pointerDeltaX,
      pointerDeltaY: this.#pointerDeltaY,
      pointerDown: this.#pointerDown,
    }

    this.#pointerDeltaX = 0
    this.#pointerDeltaY = 0

    return state
  }

  #handleKeyDown = (event: KeyboardEvent) => {
    this.#pressedKeys.add(event.code)
  }

  #handleKeyUp = (event: KeyboardEvent) => {
    this.#pressedKeys.delete(event.code)
  }

  #handleBlur = () => {
    this.#pressedKeys.clear()

    this.#pointerDown = false
    this.#pointerDeltaX = 0
    this.#pointerDeltaY = 0
  }

  #handlePointerDown = (event: PointerEvent) => {
    this.#pointerDown = true
    this.#pointerDeltaX = 0
    this.#pointerDeltaY = 0

    this.#element.setPointerCapture(event.pointerId)
  }

  #handlePointerMove = (event: PointerEvent) => {
    if (!this.#pointerDown) return

    this.#pointerDeltaX += event.movementX
    this.#pointerDeltaY += event.movementY
  }

  #handlePointerUp = (event: PointerEvent) => {
    this.#pointerDown = false

    if (this.#element.hasPointerCapture(event.pointerId)) {
      this.#element.releasePointerCapture(event.pointerId)
    }
  }

  destroy() {
    window.removeEventListener('keydown', this.#handleKeyDown)
    window.removeEventListener('keyup', this.#handleKeyUp)
    window.removeEventListener('blur', this.#handleBlur)

    this.#element.removeEventListener('pointerdown', this.#handlePointerDown)
    this.#element.removeEventListener('pointermove', this.#handlePointerMove)
    this.#element.removeEventListener('pointerup', this.#handlePointerUp)
    this.#element.removeEventListener('pointercancel', this.#handlePointerUp)

    this.#pressedKeys.clear()

    this.#pointerDown = false
    this.#pointerDeltaX = 0
    this.#pointerDeltaY = 0
  }
}
