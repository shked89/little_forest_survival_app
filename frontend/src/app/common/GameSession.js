import { DrawBus } from '@/app/common/DrawBus'
import { GameCore } from '@/game/GameCore.js'

export class GameSession {
  core = null
  drawBus = null

  start() {
    if (this.core || this.drawBus)
      return console.warn('there is either an active core or a drawBus instance.')

    this.drawBus = new DrawBus()
    this.core = new GameCore({
      drawBus: this.drawBus,
    })
  }

  destroy() {
    this.core.destroy()
    this.drawBus.destroy()

    this.core = null
    this.drawBus = null
  }
}
