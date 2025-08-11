import { useState } from "react"
import { motion } from "framer-motion"
import TaskForm from "@/components/molecules/TaskForm"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TaskFormSection = ({ 
  categories = [],
  onSubmit,
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleSubmit = async (taskData) => {
    await onSubmit(taskData)
    setIsExpanded(false)
  }
  
  return (
<div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
<div className="p-4 sm:p-6">
        {!isExpanded ? (
          <Button
            onClick={() => setIsExpanded(true)}
            variant="primary"
            icon="Plus"
className="w-full justify-center h-10 sm:h-12 text-sm sm:text-base font-semibold"
          >
            Add New Task
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold font-display text-gray-900">
                Create New Task
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>
            
            <TaskForm
              categories={categories}
              onSubmit={handleSubmit}
              onCancel={() => setIsExpanded(false)}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TaskFormSection