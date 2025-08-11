import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Input = forwardRef(({ 
  className, 
  type = "text", 
  label,
  error,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="h-4 w-4 text-gray-400" />
          </div>
        )}
        
        <input
          type={type}
          className={cn(
            "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm",
            "placeholder:text-gray-400 focus:outline-none focus:ring-2",
            "focus:ring-primary-500 focus:border-primary-500 transition-smooth",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            error && "border-accent-500 focus:ring-accent-500 focus:border-accent-500",
            className
          )}
          ref={ref}
          {...props}
        />
        
        {icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-accent-500">{error}</p>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input