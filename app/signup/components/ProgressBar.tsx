import { Check, Edit } from "lucide-react"
import { useEffect, useState } from "react"

interface ProgressBarProps {
  currentStep: number
  totalSteps?: number
  userType?: 'individual' | 'company'
}

export default function ProgressBar({ currentStep, totalSteps, userType }: ProgressBarProps) {
  const [animatedStep, setAnimatedStep] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  // Define steps for different flows
  const individualSteps = [
    { id: 1, name: "Account Type", description: "Select user type" },
    { id: 2, name: "Verify Registration", description: "ID verification" },
    { id: 3, name: "Authentication", description: "Contact details" },
    { id: 4, name: "OTP Submission", description: "Choose method" },
    { id: 5, name: "OTP Verification", description: "Code confirmation" },
    { id: 6, name: "Create Password", description: "Account setup" }
  ]

  const companySteps = [
    { id: 1, name: "Account Type", description: "Select user type" },
    { id: 2, name: "Verify Registration", description: "Company verification" },
    { id: 3, name: "User Verification", description: "Personal details" },
    { id: 4, name: "OTP Submission", description: "Choose method" },
    { id: 5, name: "OTP Verification", description: "Code confirmation" },
    { id: 6, name: "Create Password", description: "Account setup" }
  ]

  // Determine which steps to use and total steps
  let steps = companySteps // default
  let effectiveTotalSteps = 6 // default

  // If userType is provided, use it to determine the flow
  if (userType === 'individual') {
    steps = individualSteps
    effectiveTotalSteps = 6
  } else if (userType === 'company') {
    steps = companySteps
    effectiveTotalSteps = 6
  }
  // If totalSteps is explicitly provided, use it (for backward compatibility)
  else if (totalSteps) {
    effectiveTotalSteps = totalSteps
    // Use appropriate steps based on totalSteps
    if (totalSteps === 5) {
      // Legacy 5-step flow (remove one step for compatibility)
      steps = individualSteps.slice(0, 5).map((step, index) => ({
        ...step,
        id: index + 1
      }))
    }
  }
  // Try to infer from localStorage if available
  else {
    try {
      const signupData = typeof window !== 'undefined' ? localStorage.getItem("signupData") : null
      if (signupData) {
        const parsedData = JSON.parse(signupData)
        if (parsedData.userType === 'individual') {
          steps = individualSteps
          effectiveTotalSteps = 6
        } else if (parsedData.userType === 'company') {
          steps = companySteps
          effectiveTotalSteps = 6
        }
      }
    } catch (error) {
      // If localStorage is not available or parsing fails, use default
      console.warn('Could not access localStorage for user type, using default steps')
    }
  }

  // Handle step changes and animations
  useEffect(() => {
    if (currentStep > animatedStep) {
      setIsAnimating(true)
      // Create a flowing animation by incrementally updating animatedStep
      const animationInterval = setInterval(() => {
        setAnimatedStep(prev => {
          if (prev >= currentStep) {
            clearInterval(animationInterval)
            setIsAnimating(false)
            return currentStep
          }
          return prev + 1
        })
      }, 300) // 300ms delay between each step animation

      return () => clearInterval(animationInterval)
    } else if (currentStep < animatedStep) {
      // If going backwards, update immediately
      setAnimatedStep(currentStep)
    }
  }, [currentStep, animatedStep])

  // Initialize animatedStep on mount
  useEffect(() => {
    setAnimatedStep(currentStep)
  }, [])

  return (
    <div className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
          {/* Connector Lines Background - positioned between first and last circles */}
          <div
            className="absolute top-6 h-0.5 bg-gray-300 z-0"
            style={{
              left: '24px',  // Half of circle width (48px / 2)
              right: '24px'  // Half of circle width (48px / 2)
            }}
          ></div>

          {/* Completed Green Lines (for completed steps) */}
          {steps.map((step, index) => {
            // Only render lines for completed steps (before current animatedStep)
            const shouldRenderLine = index < effectiveTotalSteps - 1 && step.id < animatedStep
            if (!shouldRenderLine) return null

            return (
              <div
                key={`completed-line-${step.id}`}
                className="absolute top-6 h-0.5 bg-green-600 z-10 transition-all duration-500 ease-out"
                style={{
                  left: `calc(${(index / (effectiveTotalSteps - 1)) * 100}% + 24px)`,
                  width: `calc(${(1 / (effectiveTotalSteps - 1)) * 100}% - 48px)`
                }}
              ></div>
            )
          })}

          {/* Currently Animating Line (flowing effect) */}
          {isAnimating && animatedStep <= effectiveTotalSteps && (
            <div
              key={`animating-line-${animatedStep}`}
              className="absolute top-6 h-0.5 z-15 overflow-hidden"
              style={{
                left: `calc(${((animatedStep - 2) / (effectiveTotalSteps - 1)) * 100}% + 24px)`,
                width: `calc(${(1 / (effectiveTotalSteps - 1)) * 100}% - 48px)`
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 animate-pulse"
                style={{
                  animation: 'width 600ms ease-out forwards, pulse 1s infinite'
                }}
              ></div>
            </div>
          )}

          {/* Active Step Line (static for current step) */}
          {!isAnimating && animatedStep > 1 && animatedStep <= effectiveTotalSteps && (
            <div
              className="absolute top-6 h-0.5 bg-green-600 z-10 transition-all duration-300"
              style={{
                left: `calc(${((animatedStep - 2) / (effectiveTotalSteps - 1)) * 100}% + 24px)`,
                width: `calc(${(1 / (effectiveTotalSteps - 1)) * 100}% - 48px)`
              }}
            ></div>
          )}
          
          {/* Steps */}
          <div className="flex justify-between relative z-20">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 shadow-lg ${
                      step.id < animatedStep
                        ? "bg-green-600 text-white transform scale-105"
                        : step.id === animatedStep
                        ? "bg-yellow-400 text-gray-900 transform scale-110"
                        : "bg-white text-gray-600 border-2 border-gray-300"
                    }`}
                  >
                    {step.id < animatedStep ? (
                      <Check className="w-6 h-6" />
                    ) : step.id === animatedStep ? (
                      <Edit className="w-6 h-6" />
                    ) : (
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                </div>
                
                {/* Step Label - Removed description */}
                <div className="mt-3 text-center">
                  <div
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      step.id <= animatedStep ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
