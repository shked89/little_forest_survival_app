import { Application, Graphics } from 'pixi.js'

export class ViewPixiSimple {
  app = null

  async init({ container }) {
    if (!container) throw new Error('ViewPixiSimple: container is required')

    this.app = new Application()

    await this.app.init({
      resizeTo: container,
      backgroundColor: 0x10d98b,
      antialias: true,
      resolution: window.devicePixelRatio,
      autoDensity: true,
    })

    container.appendChild(this.app.canvas)
    const square = new Graphics().rect(0, 0, 100, 100).fill(0xffff00)
    square.position.set(Math.random() * 200, Math.random() * 200)

    this.app.stage.addChild(square)
  }

  destroy() {
    if (!this.app) return console.warn('ViewPixi: app does not exist on destroy')

    this.app.destroy({ removeView: true }, { children: true })
    this.app = null
  }
}
