import { Check, Edit } from "lucide-react"

interface ProgressBarProps {
  currentStep: number
  totalSteps?: number
}

export default function ProgressBar({ currentStep, totalSteps = 6 }: ProgressBarProps) {
  const steps = [
    { id: 1, name: "Account Type", description: "Select user type" },
    { id: 2, name: "Verify Registration", description: "Company/ID verification" },
    { id: 3, name: "User Verification", description: "Personal details" },
    { id: 4, name: "OTP Submission", description: "Phone verification" },
    { id: 5, name: "OTP Verification", description: "Code confirmation" },
    { id: 6, name: "Create Password", description: "Account setup" }
  ]

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
          
          {/* Dynamic Green Lines */}
          {steps.map((step, index) => (
            index < steps.length - 1 && step.id < currentStep && (
              <div 
                key={`line-${step.id}`}
                className="absolute top-6 h-0.5 bg-green-600 z-10 transition-all duration-500"
                style={{
                  left: `calc(${(index / (steps.length - 1)) * 100}% + 24px)`,
                  width: `calc(${(1 / (steps.length - 1)) * 100}% - 48px)`
                }}
              ></div>
            )
          ))}
          
          {/* Line to current step */}
          {currentStep > 1 && (
            <div 
              className="absolute top-6 h-0.5 bg-green-600 z-10 transition-all duration-500"
              style={{
                left: `calc(${((currentStep - 2) / (steps.length - 1)) * 100}% + 24px)`,
                width: `calc(${(1 / (steps.length - 1)) * 100}% - 48px)`
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
                      step.id < currentStep
                        ? "bg-green-600 text-white"
                        : step.id === currentStep
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-white text-gray-600 border-2 border-gray-300"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-6 h-6" />
                    ) : step.id === currentStep ? (
                      <Edit className="w-6 h-6" />
                    ) : (
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                </div>
                
                {/* Step Label - Removed description */}
                <div className="mt-3 text-center">
                  <div
                    className={`text-sm font-semibold ${
                      step.id <= currentStep ? "text-gray-900" : "text-gray-500"
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
