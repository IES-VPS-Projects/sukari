"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import { User, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
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

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // For demo purposes, map phone number to email for existing auth system
    const emailToUse = formData.identifier === "0700111123" 
      ? "executive@ksb.go.ke" 
      : formData.identifier

    const success = await login(emailToUse, formData.password)
    if (success) {
      // Redirect based on user type will be handled by the portal layout
      router.push("/portal")
    } else {
      setError("Invalid credentials. Please check your phone number and password.")
    }
  }

  const fillCEOCredentials = () => {
    setFormData(prev => ({
      ...prev,
      identifier: "0700111123",
      password: "KSB2024!"
    }))
  }

  const fillImporterCredentials = () => {
    setFormData(prev => ({
      ...prev,
      identifier: "0700222234",
      password: "Import2024!"
    }))
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span>Account created successfully! You can now sign in.</span>
        </div>
      )}

      {/* Left Column - Branding */}
      <div className="w-full lg:w-1/2 p-4 flex items-center justify-center">
        <div
          className="w-full h-64 lg:h-full rounded-l-2xl rounded-tr-2xl rounded-br-2xl flex flex-col items-center justify-center p-12 relative overflow-hidden"
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
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12 lg:pl-0">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            {/* Logo above Sign In */}
            <div className="text-center mb-6 lg:mb-8">
              <div className="flex items-center justify-center space-x-2 lg:space-x-4">
                <Image src="/images/ISE_Agri_Logo.png" alt="ISE Agriculture" width={80} height={60} className="lg:w-[100px] lg:h-[60px]" />
                <div className="h-8 lg:h-12 w-px bg-gray-300"></div>
                <Image src="/images/ksb-logo.jpg" alt="Kenya Sugar Board" width={110} height={60} className="lg:w-[140px] lg:h-[60px]" />
              </div>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Identifier Field */}
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div
                    className={`absolute left-1 top-1 bottom-1 w-10 flex items-center justify-center rounded-l-md ${
                      focusedField === "identifier" ? "bg-gray-100" : "bg-gray-100"
                    }`}
                  >
                    <User className={`h-5 w-5 ${focusedField === "identifier" ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("identifier")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your phone number"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div
                    className={`absolute left-1 top-1 bottom-1 w-10 flex items-center justify-center rounded-l-md ${
                      focusedField === "password" ? "bg-gray-100" : "bg-gray-100"
                    }`}
                  >
                    <Lock className={`h-5 w-5 ${focusedField === "password" ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Forgot Password?
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

              {/* Demo Credentials Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={fillCEOCredentials}
                  className="text-sm text-green-600 hover:text-green-700 font-medium border border-green-600 px-4 py-2 rounded-lg hover:bg-green-50"
                >
                  Demo CEO
                </button>
                <button
                  type="button"
                  onClick={fillImporterCredentials}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
                >
                  Demo Importer
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