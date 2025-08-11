import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ error, onRetry, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}
    >
      <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" size={32} className="text-accent-500" />
      </div>
      
      <h3 className="text-lg font-semibold font-display text-gray-900 mb-2">
        Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {error || "We encountered an unexpected error while loading your tasks. Please try again."}
      </p>
      
      {onRetry && (
        <Button
          variant="primary"
          onClick={onRetry}
          icon="RefreshCw"
          className="shadow-md"
        >
          Try Again
        </Button>
      )}
    </motion.div>
  )
}

export default Error