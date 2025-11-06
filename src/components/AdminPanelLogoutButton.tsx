'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@payloadcms/ui'

export const AdminPanelLogoutButton: React.FC = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        router.push('/admin/login')
        router.refresh()
      } else {
        console.error('Logout failed')
        setIsLoggingOut(false)
      }
    } catch (error) {
      console.error('Error during logout:', error)
      setIsLoggingOut(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="logout-button-container">
      <button
        type="button"
        className="logout-button"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  )
}
