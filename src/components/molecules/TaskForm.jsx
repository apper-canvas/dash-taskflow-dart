import { useState, useEffect } from "react"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"

const TaskForm = ({ 
  task = null, 
  categories = [],
  onSubmit, 
  onCancel,
  className 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    categoryId: "",
    dueDate: ""
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        categoryId: task.categoryId || "",
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
      })
    }
  }, [task])
  
  const priorityOptions = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" }
  ]
  
  const categoryOptions = [
    { value: "", label: "No Category" },
    ...categories.map(cat => ({ value: cat.Id.toString(), label: cat.name }))
  ]
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required"
    }
    
    if (formData.dueDate && new Date(formData.dueDate) < new Date().setHours(0,0,0,0)) {
      newErrors.dueDate = "Due date cannot be in the past"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const taskData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        categoryId: formData.categoryId || null,
        dueDate: formData.dueDate || null
      }
      
      await onSubmit(taskData)
      
      if (!task) {
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          categoryId: "",
          dueDate: ""
        })
      }
    } catch (error) {
      console.error("Error submitting task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <Input
          label="Task Title"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={handleChange("title")}
          error={errors.title}
          required
        />
        
        <Textarea
          label="Description"
          placeholder="Add more details about this task..."
          value={formData.description}
          onChange={handleChange("description")}
          rows={3}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Priority"
            value={formData.priority}
            onChange={handleChange("priority")}
            options={priorityOptions}
          />
          
          <Select
            label="Category"
            value={formData.categoryId}
            onChange={handleChange("categoryId")}
            options={categoryOptions}
            placeholder="Select a category"
          />
        </div>
        
        <Input
          type="date"
          label="Due Date"
          value={formData.dueDate}
          onChange={handleChange("dueDate")}
          error={errors.dueDate}
        />
      </div>
      
      <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        
        <Button
          type="submit"
          loading={isSubmitting}
          icon={task ? "Save" : "Plus"}
        >
          {task ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm