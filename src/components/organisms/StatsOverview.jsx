import { useMemo } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const StatsOverview = ({ tasks = [], categories = [], className }) => {
  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(task => task.status === "completed").length
    const inProgress = tasks.filter(task => task.status === "in-progress").length
    const pending = tasks.filter(task => task.status === "pending").length
    const highPriority = tasks.filter(task => task.priority === "high" && task.status !== "completed").length
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
    
    return {
      total,
      completed,
      inProgress,
      pending,
      highPriority,
      completionRate
    }
  }, [tasks])
  
  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: "List",
      color: "text-primary-600",
      bg: "bg-primary-50",
      border: "border-primary-200"
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "CheckCircle",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200"
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: "Clock",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      title: "High Priority",
      value: stats.highPriority,
      icon: "AlertTriangle",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200"
    }
  ]
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Completion Rate */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold font-display mb-2">
              Daily Progress
            </h3>
            <p className="text-primary-100">
              Keep up the great work!
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold font-display mb-1">
              {stats.completionRate}%
            </div>
            <div className="text-sm text-primary-200">
              Completion Rate
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 bg-primary-400 bg-opacity-30 rounded-full h-2">
          <motion.div
            className="bg-white rounded-full h-2"
            initial={{ width: 0 }}
            animate={{ width: `${stats.completionRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`bg-white rounded-xl border p-4 hover:shadow-md transition-all duration-200 ${stat.border}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold font-display text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <ApperIcon 
                  name={stat.icon} 
                  size={24} 
                  className={stat.color} 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Categories Overview */}
      {categories.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
            Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => {
              const categoryTasks = tasks.filter(task => 
                task.categoryId?.toString() === category.Id.toString()
              )
              const completedInCategory = categoryTasks.filter(task => 
                task.status === "completed"
              ).length
              
              return (
                <div
                  key={category.Id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
                  style={{ 
                    backgroundColor: `${category.color}10`,
                    borderColor: `${category.color}30`
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-gray-900">
                      {category.name}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    {completedInCategory}/{categoryTasks.length}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default StatsOverview