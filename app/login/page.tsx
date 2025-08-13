"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import toast, { Toaster } from 'react-hot-toast'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    pin: "",
    rememberMe: false,
  })
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const { login, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check for signup success parameter
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("signup") === "success") {
      setShowSuccessMessage(true)
      // Remove the parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname)
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    // For PIN field, only allow numeric input and limit to 4 digits
    if (name === "pin") {
      if (/^\d*$/.test(value) && value.length <= 4) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }

    // Clear error when user starts typing
    if (error) {
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

    // Validate PIN format
    if (formData.pin.length !== 4 || !/^\d{4}$/.test(formData.pin)) {
      setError("PIN must be exactly 4 digits")
      return
    }

    // Use the existing auth system
    const success = await login(formData.email, formData.pin)
    if (success) {
      toast.success('Login successful!')
      router.push("/portal/today")
    } else {
      setError("Invalid credentials. Please check your email and PIN.")
    }
  }

  const fillDemoCredentials = () => {
    setFormData(prev => ({
      ...prev,
      email: "9davidmuia@gmail.com",
      pin: "1234"
    }))
  }

  return (
    <div className="min-h-screen flex">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span>Account created successfully! You can now sign in.</span>
        </div>
      )}

      {/* Left Column - Branding */}
      <div className="w-1/2 p-4 flex items-center justify-center">
        <div
          className="w-full h-full rounded-l-2xl rounded-tr-2xl rounded-br-2xl flex flex-col items-center justify-center p-12 relative overflow-hidden"
          style={{
            backgroundImage: "url(/images/login_image.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>

      {/* Right Column - Sign In Form */}
      <div className="w-1/2 bg-white flex items-center justify-center p-12 pl-0">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Logo above Sign In */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4">
                <Image src="/images/ISEAGRILOGO.png" alt="ISE Agriculture" width={100} height={100} className="" />
                <div className="h-12 w-px bg-gray-300"></div>
                <Image src="/images/ksb-logo.jpg" alt="Kenya Sugar Board" width={140} height={90} className="" />
              </div>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div
                    className={`absolute left-1 top-1 bottom-1 w-10 flex items-center justify-center rounded-l-md ${
                      focusedField === "email" ? "bg-gray-100" : "bg-gray-100"
                    }`}
                  >
                    <Mail className={`h-5 w-5 ${focusedField === "email" ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* PIN Field */}
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                  4-Digit PIN
                </label>
                <div className="relative">
                  <div
                    className={`absolute left-1 top-1 bottom-1 w-10 flex items-center justify-center rounded-l-md ${
                      focusedField === "pin" ? "bg-gray-100" : "bg-gray-100"
                    }`}
                  >
                    <Lock className={`h-5 w-5 ${focusedField === "pin" ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <input
                    type={showPin ? "text" : "password"}
                    id="pin"
                    name="pin"
                    value={formData.pin}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("pin")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your 4-digit PIN"
                    maxLength={4}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Options Row */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember Me</span>
                </label>
                <Link href="/forgot-pin" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Forgot PIN?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {/* Demo Credentials Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Use Demo Credentials
                </button>
              </div>
            </form>

            {/* Create Account Link */}
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">{"Don't have an account? "}</span>
              <Link href="/signup" className="text-sm text-green-600 hover:text-green-700 font-medium">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}