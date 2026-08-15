import { ViewPixi } from '@/presentation/views/ViewPixi'

export interface GameViewI {
  init(options: { container: HTMLElement }): Promise<void>
  destroy(): void
}

type GameViewFactory = () => GameViewI

const createViewByRenderer = {
  pixi: () => new ViewPixi(),
  // three: () => new ViewThree(),
} as const satisfies Record<string, GameViewFactory>

export type RendererType = keyof typeof createViewByRenderer

export function createGameView(rendererType: RendererType): GameViewI {
  const createView = createViewByRenderer?.[rendererType]

  if (!createView) throw new Error(`Unknown renderer type: ${rendererType}`)

  return createView()
}
