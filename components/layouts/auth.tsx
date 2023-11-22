import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { LayoutProps } from '@/models'
import { useAuth } from '@/hooks'

export function AuthLayout({ children }: LayoutProps) {
  const router = useRouter()
  const { profile, fistLoading } = useAuth()
  useEffect(() => {
    if (!fistLoading && !profile) router.push('/')
  }, [router, profile, fistLoading])
  if (!profile) return <p>Loading</p>
  return <>{children}</>
}
