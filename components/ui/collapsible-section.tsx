import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapsibleSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

export function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
  className,
  ...props
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className={cn("w-full space-y-2", className)} {...props}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md bg-white border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-3">{children}</div>
      </div>
    </div>
  )
}
