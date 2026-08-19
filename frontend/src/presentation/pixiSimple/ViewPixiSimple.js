import { Application } from 'pixi.js'
import { PIXI_SIMPLE_CONFIG } from '@/presentation/pixiSimple/pixi_simple_config'
import { TerrainLayer } from '@/presentation/pixiSimple/TerrainLayer'

export class ViewPixiSimple {
  app = null
  terrainLayer = null

  async init({ container }) {
    if (!container) throw new Error('ViewPixiSimple: container is required')

    this.app = new Application()

    await this.app.init({
      resizeTo: container,
      backgroundColor: PIXI_SIMPLE_CONFIG.TERRAIN_COLORS[0],
      antialias: true,
      resolution: Math.min(window.devicePixelRatio, PIXI_SIMPLE_CONFIG.MAX_RESOLUTION),
      autoDensity: true,
    })

    container.appendChild(this.app.canvas)

    this.terrainLayer = new TerrainLayer(this.app.screen)
    this.app.renderer.on('resize', this.handleResize)
    this.app.stage.addChild(this.terrainLayer)
  }

  handleResize = () => this.terrainLayer.resize()

  destroy() {
    if (!this.app) return

    this.app.renderer.off('resize', this.handleResize)
    this.app.destroy({ removeView: true }, { children: true })

    this.terrainLayer = null
    this.app = null
  }
}
