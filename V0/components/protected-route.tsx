"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user) {
      // Armazenar o destino pretendido para redirecionar após o login
      sessionStorage.setItem("redirectAfterLogin", pathname)
      router.push("/login")
    }
  }, [user, isLoading, router, pathname])

  // Mostrar estado de carregamento ou nada enquanto verifica a autenticação
  if (isLoading || !user) {
    return null
  }

  return <>{children}</>
}
