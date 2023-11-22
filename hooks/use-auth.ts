import React from 'react';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import { authApi } from '@/api-client';
import { LoginModelProps } from '@/models/login';

export function useAuth(option?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  }: any = useSWR('/me/info', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...option,
  })
  const fistLoading = profile === undefined && error === undefined
  async function login(data: LoginModelProps) {
    await authApi.login(data)
    await mutate()
  }

  async function logout() {
    await authApi.logout()
    await mutate({}, false)
  }

  return {
    fistLoading,
    profile,
    error,
    login,
    logout,
    mutate
  }
}
