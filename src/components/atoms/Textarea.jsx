import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({ 
  className, 
  label,
  error,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <textarea
        rows={rows}
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm",
          "placeholder:text-gray-400 focus:outline-none focus:ring-2 resize-none",
          "focus:ring-primary-500 focus:border-primary-500 transition-smooth",
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
          error && "border-accent-500 focus:ring-accent-500 focus:border-accent-500",
          className
        )}
        ref={ref}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-accent-500">{error}</p>
      )}
    </div>
  )
})

Textarea.displayName = "Textarea"

export default Textarea