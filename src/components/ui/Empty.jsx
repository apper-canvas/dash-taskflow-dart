import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ className, onCreateTask }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="CheckSquare" size={40} className="text-primary-600" />
      </div>
      
      <h3 className="text-xl font-semibold font-display text-gray-900 mb-3">
        Ready to get organized?
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        Create your first task and start building productive habits. Every great achievement begins with a simple task.
      </p>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Plus" size={16} className="text-primary-500" />
            <span>Add tasks</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Tag" size={16} className="text-primary-500" />
            <span>Organize</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Check" size={16} className="text-primary-500" />
            <span>Complete</span>
          </div>
        </div>
        
        {onCreateTask && (
          <Button
            variant="primary"
            onClick={onCreateTask}
            icon="Plus"
            className="mt-4 shadow-md hover:shadow-lg"
          >
            Create Your First Task
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default Empty