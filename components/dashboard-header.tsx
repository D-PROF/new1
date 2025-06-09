"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"

interface DashboardHeaderProps {
  userName: string
  userEmail: string
}

export function DashboardHeader({ userName, userEmail }: DashboardHeaderProps) {
  const router = useRouter()
  const isMobile = useMobile()

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 p-4 md:p-6 bg-white shadow-sm rounded-lg">
      <div className="flex items-center space-x-4">
        <Image
          src="/images/word-sanctuary-logo-black.png"
          alt="Word Sanctuary Logo"
          width={120}
          height={60}
          className="h-10 md:h-12 w-auto"
        />
        <div className="hidden md:block border-l border-gray-300 h-10 mx-2"></div>
        <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-3 w-full md:w-auto">
        <div className="text-right hidden md:block">
          <p className="font-medium">{userName}</p>
          <p className="text-sm text-gray-500">{userEmail}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-green-500 flex-shrink-0"></div>

        {isMobile && (
          <Button variant="destructive" className="ml-auto" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  )
}
