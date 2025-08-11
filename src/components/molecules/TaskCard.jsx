import { useState } from "react"
import { format, isToday, isTomorrow, isPast } from "date-fns"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"

const TaskCard = ({ 
  task, 
  category,
  onToggleComplete,
  onEdit,
  onDelete,
  className 
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-accent-500"
      case "medium":
        return "text-warning"
      case "low":
        return "text-success"
      default:
        return "text-gray-400"
    }
  }
  
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return { variant: "error", label: "High" }
      case "medium":
        return { variant: "warning", label: "Medium" }
      case "low":
        return { variant: "success", label: "Low" }
      default:
        return { variant: "default", label: "None" }
    }
  }
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return { variant: "success", label: "Completed" }
      case "in-progress":
        return { variant: "primary", label: "In Progress" }
      default:
        return { variant: "default", label: "Pending" }
    }
  }
  
  const formatDueDate = (date) => {
    if (!date) return null
    
    const dueDate = new Date(date)
    if (isToday(dueDate)) return "Today"
    if (isTomorrow(dueDate)) return "Tomorrow"
    return format(dueDate, "MMM d")
  }
  
  const isDueSoon = (date) => {
    if (!date) return false
    const dueDate = new Date(date)
    return isToday(dueDate) || isTomorrow(dueDate)
  }
  
  const isOverdue = (date) => {
    if (!date) return false
    const dueDate = new Date(date)
    return isPast(dueDate) && !isToday(dueDate)
  }
  
  const handleToggleComplete = async () => {
    if (task.status !== "completed") {
      setIsAnimating(true)
      setTimeout(() => {
        onToggleComplete(task.Id)
        setIsAnimating(false)
      }, 200)
    } else {
      onToggleComplete(task.Id)
    }
  }
  
  const dueDateText = formatDueDate(task.dueDate)
  const priorityBadge = getPriorityBadge(task.priority)
  const statusBadge = getStatusBadge(task.status)
  
  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 p-4 transition-all duration-300",
      "hover:shadow-hover hover:border-primary-200 group",
      "transform hover:scale-[1.02] active:scale-[0.98]",
      task.status === "completed" && "opacity-60",
      isAnimating && "animate-slide-out",
      className
    )}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 pt-0.5">
          <Checkbox
            checked={task.status === "completed"}
            onChange={handleToggleComplete}
            size="md"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={cn(
              "font-medium text-gray-900 font-display",
              task.status === "completed" && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(task)}
                className="h-8 w-8 text-gray-400 hover:text-primary-500"
              >
                <ApperIcon name="Edit2" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.Id)}
                className="h-8 w-8 text-gray-400 hover:text-accent-500"
              >
                <ApperIcon name="Trash2" size={14} />
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-sm text-gray-600 mb-3 line-clamp-2",
              task.status === "completed" && "text-gray-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={statusBadge.variant} size="sm">
                {statusBadge.label}
              </Badge>
              
              <Badge variant={priorityBadge.variant} size="sm">
                <ApperIcon 
                  name="Flag" 
                  size={12} 
                  className="mr-1" 
                />
                {priorityBadge.label}
              </Badge>
              
              {category && (
                <Badge 
                  variant="default" 
                  size="sm"
                  className="text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </Badge>
              )}
            </div>
            
            {dueDateText && (
              <div className={cn(
                "flex items-center text-xs font-medium",
                isOverdue(task.dueDate) && "text-accent-500",
                isDueSoon(task.dueDate) && !isOverdue(task.dueDate) && "text-warning",
                !isDueSoon(task.dueDate) && !isOverdue(task.dueDate) && "text-gray-500"
              )}>
                <ApperIcon 
                  name={isOverdue(task.dueDate) ? "AlertCircle" : "Calendar"} 
                  size={12} 
                  className="mr-1" 
                />
                {dueDateText}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard