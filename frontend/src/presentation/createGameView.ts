import { ViewPixiSimple } from '@/presentation/pixiSimple/ViewPixiSimple'

export interface GameViewI {
  init(options: { container: HTMLElement }): Promise<void>
  destroy(): void
}

type GameViewFactory = () => GameViewI

const createViewByRenderer = {
  pixi_simple: () => new ViewPixiSimple(),
  // pixi_isometry: () => new ViewPixiIsometry(),
  // three: () => new ViewThree(),
} as const satisfies Record<string, GameViewFactory>

export type RendererType = keyof typeof createViewByRenderer

export function createGameView(rendererType: RendererType): GameViewI {
  const createView = createViewByRenderer?.[rendererType]

  if (!createView) throw new Error(`Unknown renderer type: ${rendererType}`)

  return createView()
}
