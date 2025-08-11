import { useState, useEffect, useMemo } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { isToday, isTomorrow, isPast, parseISO, compareAsc, compareDesc } from "date-fns"

import TaskFormSection from "@/components/organisms/TaskFormSection"
import TaskList from "@/components/organisms/TaskList"
import StatsOverview from "@/components/organisms/StatsOverview"
import SearchBar from "@/components/molecules/SearchBar"
import FilterBar from "@/components/molecules/FilterBar"
import CategoryPill from "@/components/molecules/CategoryPill"

import TaskService from "@/services/api/TaskService"
import CategoryService from "@/services/api/CategoryService"

const HomePage = () => {
  // State management
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState(null)
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
    sortBy: "dueDate"
  })
  
  // Load initial data
  useEffect(() => {
    loadData()
  }, [])
  
  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      
      const [tasksData, categoriesData] = await Promise.all([
        TaskService.getAll(),
        CategoryService.getAll()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError("Failed to load data. Please try again.")
      console.error("Error loading data:", err)
    } finally {
      setLoading(false)
    }
  }
  
  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!task.title.toLowerCase().includes(query) && 
            !task.description.toLowerCase().includes(query)) {
          return false
        }
      }
      
      // Status filter
      if (filters.status !== "all" && task.status !== filters.status) {
        return false
      }
      
      // Priority filter
      if (filters.priority !== "all" && task.priority !== filters.priority) {
        return false
      }
      
      // Category filter
      if (filters.category !== "all") {
        if (filters.category === "none" && task.categoryId) {
          return false
        }
        if (filters.category !== "none" && task.categoryId?.toString() !== filters.category) {
          return false
        }
      }
      
      // Active category filter
      if (activeCategory && task.categoryId?.toString() !== activeCategory.Id.toString()) {
        return false
      }
      
      return true
    })
    
    // Sort tasks
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))
        
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        
        case "createdAt":
          return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
        
        case "title":
          return a.title.localeCompare(b.title)
        
        default:
          return 0
      }
    })
    
    return filtered
  }, [tasks, searchQuery, filters, activeCategory])
  
  // Category task counts
  const categoryStats = useMemo(() => {
    const stats = {}
    categories.forEach(category => {
      stats[category.Id] = tasks.filter(task => 
        task.categoryId?.toString() === category.Id.toString()
      ).length
    })
    return stats
  }, [tasks, categories])
  
  // Task operations
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await TaskService.create({
        ...taskData,
        status: "pending",
        createdAt: new Date().toISOString(),
        completedAt: null
      })
      
      setTasks(prev => [newTask, ...prev])
      toast.success("Task created successfully!")
    } catch (err) {
      toast.error("Failed to create task")
      console.error("Error creating task:", err)
    }
  }
  
  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      if (!task) return
      
      const updatedTask = await TaskService.update(taskId, {
        status: task.status === "completed" ? "pending" : "completed",
        completedAt: task.status === "completed" ? null : new Date().toISOString()
      })
      
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t))
      
      if (updatedTask.status === "completed") {
        toast.success("Great job! Task completed! 🎉")
      } else {
        toast.info("Task marked as pending")
      }
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Error updating task:", err)
    }
  }
  
  const handleEditTask = async (task) => {
    // For now, we'll just show a toast. In a real app, you'd open a modal or navigate to edit page
    toast.info("Edit functionality would open here")
  }
  
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }
    
    try {
      await TaskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
      console.error("Error deleting task:", err)
    }
  }
  
  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory?.Id === category.Id ? null : category)
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Task Form and Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 space-y-6"
        >
          <TaskFormSection
            categories={categories}
            onSubmit={handleCreateTask}
          />
          
          <StatsOverview
            tasks={tasks}
            categories={categories}
          />
        </motion.div>
        
        {/* Right Column - Task List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Search and Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search tasks..."
            />
            
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
            />
            
            {/* Category Pills */}
            {categories.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">
                  Filter by Category:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <CategoryPill
                      key={category.Id}
                      category={category}
                      active={activeCategory?.Id === category.Id}
                      onClick={handleCategoryClick}
                      count={categoryStats[category.Id]}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Task List Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-display text-gray-900">
                Your Tasks
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredTasks.length === 0 
                  ? "No tasks match your current filters" 
                  : `${filteredTasks.length} task${filteredTasks.length !== 1 ? "s" : ""} found`
                }
              </p>
            </div>
          </div>
          
          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            categories={categories}
            loading={loading}
            error={error}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onRetry={loadData}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage