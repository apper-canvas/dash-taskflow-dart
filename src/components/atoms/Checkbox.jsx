import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className, 
  children,
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  }
  
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }
  
  return (
    <label className={cn(
      "inline-flex items-center cursor-pointer",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        
        <div className={cn(
          "border-2 rounded transition-all duration-200 flex items-center justify-center",
          "transform hover:scale-105 active:scale-95",
          sizeClasses[size],
          checked 
            ? "bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 animate-scale-in" 
            : "border-gray-300 bg-white hover:border-primary-300",
          disabled && "hover:scale-100 active:scale-100"
        )}>
          {checked && (
            <ApperIcon 
              name="Check" 
              size={iconSizes[size]} 
              className="text-white animate-scale-in" 
            />
          )}
        </div>
      </div>
      
      {children && (
        <span className="ml-2 text-sm text-gray-700 select-none">
          {children}
        </span>
      )}
    </label>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox