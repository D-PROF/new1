"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function RoleSelectionPage() {
  const router = useRouter()

  const handleRoleSelect = (role: string) => {
    // Store the selected role in localStorage or context
    localStorage.setItem("userRole", role)

    // Redirect based on role
    if (role === "leadership") {
      router.push("/dashboard/leadership")
    } else if (role === "admin") {
      router.push("/dashboard/admin")
    } else if (role === "superadmin") {
      router.push("/dashboard/superadmin")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4a4a6a]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/word-sanctuary-logo-black.png"
            alt="Word Sanctuary Logo"
            width={200}
            height={100}
            className="mx-auto"
          />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-center text-gray-700">Role Backend Getway</h2>

        <div className="mt-8 space-y-12">
          <div className="space-y-4">
            <p className="text-center text-lg font-medium">If User - Leadership</p>
            <Button
              onClick={() => handleRoleSelect("leadership")}
              className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Leadership Dashboard
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-center text-lg font-medium">If User - Admin</p>
            <Button
              onClick={() => handleRoleSelect("admin")}
              className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Admin Dashboard
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-center text-lg font-medium">If User - SuperAdmin</p>
            <Button
              onClick={() => handleRoleSelect("superadmin")}
              className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Super-Admin Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
