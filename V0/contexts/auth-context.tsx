"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  resetPassword: (email: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar usuário salvo no carregamento inicial
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Função de login simulada
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simular chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Para fins de demonstração, qualquer email/senha não vazio é válido
    if (email && password) {
      const newUser = {
        id: "user-1",
        name: email.split("@")[0],
        email,
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Função de registro simulada
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simular chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Para fins de demonstração, qualquer entrada válida terá sucesso
    if (name && email && password) {
      const newUser = {
        id: "user-1",
        name,
        email,
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Função de logout simulada
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Função de redefinição de senha simulada
  const resetPassword = async (email: string) => {
    setIsLoading(true)

    // Simular chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Para fins de demonstração, qualquer email terá sucesso
    setIsLoading(false)
    return !!email
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
