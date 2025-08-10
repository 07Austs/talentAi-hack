"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { mockDataService, type MockProfile } from "@/lib/mock-data"

interface AuthContextType {
  user: MockProfile | null
  profile: MockProfile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: "candidate" | "recruiter",
  ) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockProfile | null>(null)
  const [profile, setProfile] = useState<MockProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (simulate session persistence)
    const savedUser = localStorage.getItem("talentai_user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setProfile(userData)
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("talentai_user")
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { user: userData, error } = await mockDataService.signIn(email, password)

      if (userData && !error) {
        setUser(userData)
        setProfile(userData)
        localStorage.setItem("talentai_user", JSON.stringify(userData))
        return { error: null }
      }

      return { error: error || "Sign in failed" }
    } catch (error) {
      return { error: "Network error" }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName: string, role: "candidate" | "recruiter") => {
    setLoading(true)
    try {
      const { user: userData, error } = await mockDataService.signUp(email, password, fullName, role)

      if (userData && !error) {
        setUser(userData)
        setProfile(userData)
        localStorage.setItem("talentai_user", JSON.stringify(userData))
        return { error: null }
      }

      return { error: error || "Sign up failed" }
    } catch (error) {
      return { error: "Network error" }
    } finally {
      setLoading(false)
    }
  }

  const refreshProfile = async () => {
    // In mock mode, profile is always in sync
    return Promise.resolve()
  }

  const signOut = async () => {
    mockDataService.signOut()
    setUser(null)
    setProfile(null)
    localStorage.removeItem("talentai_user")
  }

  const value = {
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
    signIn,
    signUp,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
