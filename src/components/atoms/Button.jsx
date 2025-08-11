import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const buttonVariants = {
  variant: {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-secondary-100 hover:bg-secondary-200 text-secondary-700 border border-secondary-200",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-md hover:shadow-lg",
    ghost: "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
  },
  size: {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10"
  }
}

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  icon, 
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const isDisabled = disabled || loading
  
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-smooth",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      ref={ref}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="w-4 h-4 mr-2 animate-spin" 
        />
      )}
      
      {icon && iconPosition === "left" && !loading && (
        <ApperIcon 
          name={icon} 
          className="w-4 h-4 mr-2" 
        />
      )}
      
      {children}
      
      {icon && iconPosition === "right" && !loading && (
        <ApperIcon 
          name={icon} 
          className="w-4 h-4 ml-2" 
        />
      )}
    </button>
  )
})

Button.displayName = "Button"

export default Button