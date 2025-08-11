import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const badgeVariants = {
  variant: {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border-primary-300",
    secondary: "bg-secondary-100 text-secondary-800 border-secondary-200",
    accent: "bg-accent-100 text-accent-800 border-accent-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
  },
  size: {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-2.5 py-1.5",
    lg: "text-base px-3 py-2"
  }
}

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "sm",
  children,
  ...props 
}, ref) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border transition-smooth",
        badgeVariants.variant[variant],
        badgeVariants.size[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge