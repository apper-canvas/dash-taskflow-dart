import { useState } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Update time every minute
  setTimeout(() => {
    setCurrentTime(new Date())
  }, 60000)
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg">
              <ApperIcon name="CheckSquare" size={24} className="text-white" />
            </div>
            <div>
<h1 className="text-lg sm:text-xl lg:text-2xl font-bold font-display gradient-text">
                TaskFlow
              </h1>
              <p className="text-xs text-gray-500 font-medium">
<span className="hidden sm:inline">Organize Your Day</span>
                <span className="sm:hidden">TaskFlow</span>
              </p>
            </div>
          </div>
          
          {/* Center - Current Time and Date */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold font-display text-gray-900">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
          
          {/* Right side - Quick Stats */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg">
                <ApperIcon name="Target" size={16} className="text-primary-600" />
                <span className="text-sm font-medium text-primary-700">
                  Stay Focused
                </span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-primary-600 hover:bg-primary-50"
            >
              <ApperIcon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header