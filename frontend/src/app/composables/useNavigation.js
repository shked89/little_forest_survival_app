import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()

  function goToRoute(routeName) {
    return router.push({ name: routeName })
  }

  return {
    goToRoute,
  }
}
