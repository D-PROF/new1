"use client"

import { useEffect, useRef } from "react"

export function useVisibilityDetection(onVisibilityChange: (isVisible: boolean) => void) {
  const isActiveRef = useRef(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden
      isActiveRef.current = isVisible
      onVisibilityChange(isVisible)
    }

    const handleFocus = () => {
      isActiveRef.current = true
      onVisibilityChange(true)
    }

    const handleBlur = () => {
      isActiveRef.current = false
      onVisibilityChange(false)
    }

    const handleBeforeUnload = () => {
      isActiveRef.current = false
      onVisibilityChange(false)
    }

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)
    window.addEventListener("blur", handleBlur)
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("blur", handleBlur)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [onVisibilityChange])

  return isActiveRef.current
}
