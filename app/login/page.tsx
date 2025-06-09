"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      router.push("/verification")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4a4a6a]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center">
          <Image
            src="/images/word-sanctuary-logo-black.png"
            alt="Word Sanctuary Logo"
            width={200}
            height={100}
            className="mx-auto"
          />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-center text-gray-700">Leadership Sign In</h2>

        <p className="text-center text-gray-600">Enter your email address to recieve a one-time passcode</p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email adress"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">New to the training process? </span>
            <Link href="/register" className="text-purple-600 hover:text-purple-500 font-medium">
              Register
            </Link>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Get Code
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
