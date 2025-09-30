import Image from "next/image"
import Link from "next/link"

export default function SignupHeader() {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto pr-4 sm:pr-6 lg:pr-8">
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="flex items-center space-x-4 pl-4">
            <Image src="/images/ISE_Agri_Logo.png" alt="ISE Agri" width={120} height={60} />
            <div className="h-12 w-px bg-gray-300"></div>
            <Image src="/images/ksb-logo.jpg" alt="Kenya Sugar Board" width={120} height={60} />
          </Link>
          <Link href="/" className="text-sm text-green-600 hover:text-green-700 font-medium">
            Back To Login
          </Link>
        </div>
      </div>
    </div>
  )
}
