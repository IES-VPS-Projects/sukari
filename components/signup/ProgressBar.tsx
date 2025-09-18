interface ProgressBarProps {
  currentStep: number
  totalSteps?: number
}

export default function ProgressBar({ currentStep, totalSteps = 5 }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 h-2">
      <div
        className="bg-green-600 h-2 transition-all duration-300 ease-in-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  )
}
