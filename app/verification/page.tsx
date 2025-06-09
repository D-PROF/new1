"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function VerificationPage() {
  const [code, setCode] = useState(["", "", "", ""])
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  const router = useRouter()

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Move to next input if current input is filled
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const verificationCode = code.join("")
    if (verificationCode.length === 4) {
      router.push("/role-selection")
    }
  }

  const handleResend = () => {
    // Logic to resend verification code
    alert("Verification code resent!")
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
        <h2 className="mt-6 text-3xl font-bold text-center text-gray-700">Account Verification</h2>

        <p className="text-center text-gray-600">4-digit verification code has been sent to your email.</p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-4">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={code[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            ))}
          </div>

          <div className="text-center">
            <button type="button" onClick={handleResend} className="text-sm text-gray-600 hover:text-gray-500">
              Didn't receive the code? <span className="text-purple-600 font-medium">Resend it</span>
            </button>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Enter Code
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
