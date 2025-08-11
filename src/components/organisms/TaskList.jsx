import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/molecules/TaskCard"
import Empty from "@/components/ui/Empty"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"

const TaskList = ({ 
  tasks = [], 
  categories = [],
  loading = false,
  error = null,
  onToggleComplete,
  onEdit,
  onDelete,
  onRetry,
  className 
}) => {
  if (loading) {
    return <Loading />
  }
  
  if (error) {
    return <Error error={error} onRetry={onRetry} />
  }
  
  if (tasks.length === 0) {
    return <Empty />
  }
  
  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id.toString() === categoryId?.toString())
  }
  
  return (
    <div className={`space-y-3 ${className}`}>
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            layout
          >
            <TaskCard
              task={task}
              category={getCategoryById(task.categoryId)}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList