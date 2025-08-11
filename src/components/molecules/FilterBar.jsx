import Select from "@/components/atoms/Select"

const FilterBar = ({ 
  filters, 
  onFiltersChange,
  categories = [],
  className 
}) => {
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" }
  ]
  
  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ]
  
  const sortOptions = [
    { value: "dueDate", label: "Sort by Due Date" },
    { value: "priority", label: "Sort by Priority" },
    { value: "createdAt", label: "Sort by Created" },
    { value: "title", label: "Sort by Title" }
  ]
  
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map(cat => ({ value: cat.Id.toString(), label: cat.name }))
  ]
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${className}`}>
      <Select
        placeholder="Filter by status"
        value={filters.status}
        onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
        options={statusOptions}
      />
      
      <Select
        placeholder="Filter by priority"
        value={filters.priority}
        onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value })}
        options={priorityOptions}
      />
      
      <Select
        placeholder="Filter by category"
        value={filters.category}
        onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
        options={categoryOptions}
      />
      
      <Select
        placeholder="Sort tasks"
        value={filters.sortBy}
        onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value })}
        options={sortOptions}
      />
    </div>
  )
}

export default FilterBar