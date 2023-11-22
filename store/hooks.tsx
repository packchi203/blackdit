import { useContext } from 'react'
import { AppContext } from '@/store'
export const useStore = () => {
  const [state, dispatch] = useContext(AppContext)
  return [state, dispatch]
}
