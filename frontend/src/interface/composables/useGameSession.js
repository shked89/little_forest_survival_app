import { onMounted, onBeforeUnmount } from 'vue'
import { GameSession } from '@/app/common/GameSession'

export function useGameSession() {
  const session = new GameSession()

  onMounted(() => {
    session.start()
  })

  onBeforeUnmount(() => {
    session.destroy()
  })

  return session
}
