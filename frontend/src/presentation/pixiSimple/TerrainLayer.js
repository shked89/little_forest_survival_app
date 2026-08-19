import { Container, Graphics, Text } from 'pixi.js'

import { CONFIG } from '@/app/config'
import { PIXI_SIMPLE_CONFIG } from '@/presentation/pixiSimple/pixi_simple_config'

const { TILE_SIZE, TERRAIN_COLORS } = PIXI_SIMPLE_CONFIG
const TERRAIN_COLOR_COUNT = TERRAIN_COLORS.length

const DEV_MODE = CONFIG.DEV_MODE

const TILE_LABEL_STYLE_DEV = {
  fill: 0x173d1c,
  fontFamily: 'monospace',
  fontSize: 13,
}

export class TerrainLayer extends Container {
  #screen
  #graphics
  #camera = { x: 0, y: 0 }

  #lastStartTileX = null
  #lastStartTileY = null
  #lastEndTileX = null
  #lastEndTileY = null

  #tileLabelsLayer = null
  #tileLabelPool = []
  #visibleTileLabelCount = 0

  constructor(screen) {
    super()

    this.#screen = screen
    this.#graphics = new Graphics()
    this.addChild(this.#graphics)

    if (DEV_MODE) {
      this.#tileLabelsLayer = new Container()
      this.addChild(this.#tileLabelsLayer)
    }

    this.#updateViewport()
  }

  moveTo(x, y) {
    if (x === this.#camera.x && y === this.#camera.y) return

    this.#camera.x = x
    this.#camera.y = y

    this.#updateViewport()
  }

  resize() {
    this.#updateViewport()
  }

  #updateViewport() {
    const startTileX = Math.floor(this.#camera.x / TILE_SIZE)
    const startTileY = Math.floor(this.#camera.y / TILE_SIZE)

    const cols = Math.ceil(this.#screen.width / TILE_SIZE) + 1
    const rows = Math.ceil(this.#screen.height / TILE_SIZE) + 1

    const endTileX = startTileX + cols
    const endTileY = startTileY + rows

    const offsetX = startTileX * TILE_SIZE - this.#camera.x
    const offsetY = startTileY * TILE_SIZE - this.#camera.y

    this.#graphics.position.set(offsetX, offsetY)
    if (DEV_MODE) {
      this.#tileLabelsLayer.position.set(offsetX, offsetY)
    }

    if (!this.#needsRedrawTiles(startTileX, startTileY, endTileX, endTileY)) return

    this.#lastStartTileX = startTileX
    this.#lastStartTileY = startTileY
    this.#lastEndTileX = endTileX
    this.#lastEndTileY = endTileY

    this.#redrawTiles(startTileX, startTileY, cols, rows)
  }

  #needsRedrawTiles(startTileX, startTileY, endTileX, endTileY) {
    return (
      startTileX !== this.#lastStartTileX ||
      startTileY !== this.#lastStartTileY ||
      endTileX !== this.#lastEndTileX ||
      endTileY !== this.#lastEndTileY
    )
  }

  #redrawTiles(startTileX, startTileY, cols, rows) {
    this.#graphics.clear()

    // Reuse Text instances because frequent allocations cause noticeable GC spikes while dragging the camera
    let visibleTileIndex = 0

    for (let row = 0; row < rows; row += 1) {
      const tileY = startTileY + row
      const y = row * TILE_SIZE

      for (let col = 0; col < cols; col += 1) {
        const tileX = startTileX + col
        const x = col * TILE_SIZE
        const colorIndex = Math.abs(tileX + tileY) % TERRAIN_COLOR_COUNT

        this.#graphics.rect(x, y, TILE_SIZE, TILE_SIZE).fill(TERRAIN_COLORS[colorIndex])

        if (DEV_MODE) {
          this.#updateTileLabel(visibleTileIndex, tileX, tileY, x, y)
          visibleTileIndex += 1
        }
      }
    }

    if (DEV_MODE) {
      this.#hideUnusedTileLabels(visibleTileIndex)
      console.log('redraw map tiles')
    }
  }

  #updateTileLabel(index, tileX, tileY, x, y) {
    const label = this.#getTileLabel(index)
    const text = `x${tileX}\ny${tileY}`

    if (label.text !== text) label.text = text

    label.position.set(x + 4, y + 3)
    label.visible = true
  }

  #getTileLabel(index) {
    let label = this.#tileLabelPool[index]

    if (!label) {
      label = new Text({
        text: '',
        style: TILE_LABEL_STYLE_DEV,
      })

      this.#tileLabelPool.push(label)
      this.#tileLabelsLayer.addChild(label)
    }

    return label
  }

  #hideUnusedTileLabels(visibleCount) {
    for (let index = visibleCount; index < this.#visibleTileLabelCount; index += 1) {
      this.#tileLabelPool[index].visible = false
    }

    this.#visibleTileLabelCount = visibleCount
  }

  getCameraPosition() {
    return {
      x: this.#camera.x,
      y: this.#camera.y,
    }
  }

  destroy() {
    this.#tileLabelPool.length = 0
    super.destroy({ children: true })
  }
}
